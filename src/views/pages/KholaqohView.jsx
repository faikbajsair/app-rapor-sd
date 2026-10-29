import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Save, 
  CheckCircle, 
  AlertCircle, 
  Search, 
  Award, 
  Users, 
  Printer, 
  RefreshCw, 
  BookMarked,
  Layers,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { ROLES } from '../../config/roles';

export function KholaqohView({ 
  kholaqohList = [], 
  kholaqohNilaiList = [], 
  siswaList = [], 
  currentUser, 
  onSaveKholaqohNilai, 
  onSyncToRaporTFZ,
  settings 
}) {
  // Tentukan kholaqoh awal berdasarkan login
  const isSuperAccess = currentUser?.role === ROLES.ADMIN || 
                        currentUser?.role === ROLES.KEPSEK || 
                        currentUser?.jabatan?.includes('Kepala Bidang') ||
                        currentUser?.kholaqohDiampu?.includes('Semua Kholaqoh');

  const defaultKholaqohId = isSuperAccess 
    ? (kholaqohList[0]?.id || 'KH_01')
    : (currentUser?.kholaqohDiampu?.[0] || kholaqohList[0]?.id || 'KH_01');

  const [selectedKholaqohId, setSelectedKholaqohId] = useState(defaultKholaqohId);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Ambil data kholaqoh terpilih
  const currentKholaqoh = kholaqohList.find(k => k.id === selectedKholaqohId) || kholaqohList[0];

  // Filter santri yang berada di kholaqoh ini
  const santriList = siswaList.filter(s => {
    const inKholaqoh = s.kholaqohId === selectedKholaqohId || (!s.kholaqohId && selectedKholaqohId === 'KH_01');
    const matchSearch = s.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (s.nisn && s.nisn.includes(searchQuery));
    return inKholaqoh && matchSearch;
  });

  // Helper mendapatkan record nilai santri
  const getRecord = (siswaId) => {
    return kholaqohNilaiList.find(n => n.siswaId === siswaId && n.kholaqohId === selectedKholaqohId) || {
      siswaId,
      kholaqohId: selectedKholaqohId,
      pembimbingId: currentKholaqoh?.pembimbingId || currentUser?.gtkId,
      tahsinJilid: 'Al-Qur\'an Tartil',
      tahsinHalaman: 'Halaman 1',
      nilaiMakhraj: 85,
      nilaiTajwid: 85,
      nilaiFashahah: 85,
      surahHafalan: 'Juz 30',
      juzHafalan: 'Juz 30',
      statusHafalan: 'Jayyid Jiddan',
      nilaiKelancaran: 88,
      adab: 'Sangat Baik',
      kehadiranPersen: 95,
      catatan: ''
    };
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleInputChange = (siswaId, field, value) => {
    const current = getRecord(siswaId);
    let val = value;
    if (['nilaiMakhraj', 'nilaiTajwid', 'nilaiFashahah', 'nilaiKelancaran', 'kehadiranPersen'].includes(field)) {
      val = value === '' ? '' : Math.max(0, Math.min(100, Number(value)));
    }

    const updated = {
      ...current,
      [field]: val
    };

    onSaveKholaqohNilai(updated);
  };

  // Hitung Nilai Akhir Al-Qur'an Santri (Rata-rata berbobot Tahsin + Tahfidz + Adab)
  const hitungNilaiQuran = (rec) => {
    const makhraj = Number(rec.nilaiMakhraj) || 0;
    const tajwid = Number(rec.nilaiTajwid) || 0;
    const fashahah = Number(rec.nilaiFashahah) || 0;
    const kelancaran = Number(rec.nilaiKelancaran) || 0;

    const rataTahsin = (makhraj + tajwid + fashahah) / 3;
    const nilaiAkhir = Math.round((rataTahsin * 0.4) + (kelancaran * 0.6));
    return isNaN(nilaiAkhir) ? 0 : nilaiAkhir;
  };

  // Predikat Hafalan Al-Qur'an
  const getPredikatQuran = (nilai) => {
    if (nilai >= 93) return { label: 'Mumtaz (Istimewa)', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    if (nilai >= 85) return { label: 'Jayyid Jiddan (Amat Baik)', color: 'bg-teal-100 text-teal-800 border-teal-300' };
    if (nilai >= 75) return { label: 'Jayyid (Baik)', color: 'bg-blue-100 text-blue-800 border-blue-300' };
    return { label: 'Maqbul (Cukup)', color: 'bg-amber-100 text-amber-800 border-amber-300' };
  };

  // Auto Generate Catatan Pembimbing Kholaqoh
  const handleGenerateCatatan = (siswaId) => {
    const current = getRecord(siswaId);
    const siswa = siswaList.find(s => s.id === siswaId);
    const na = hitungNilaiQuran(current);

    let catatan = '';
    if (na >= 92) {
      catatan = `Masya Allah, ananda ${siswa?.nama} menunjukkan hafalan ${current.surahHafalan} yang sangat mutqin dan fasih. Makharijul huruf dan tajwid sangat tertib.`;
    } else if (na >= 84) {
      catatan = `Alhamdulillah capaian hafalan ${current.surahHafalan} ananda ${siswa?.nama} baik dan lancar. Pertahankan istiqomah murojaah harian di rumah.`;
    } else {
      catatan = `Ananda ${siswa?.nama} bersemangat dalam tilawah, tingkatkan murojaah pada surat yang baru dihafal serta ketepatan panjang mad.`;
    }

    const updated = { ...current, catatan };
    onSaveKholaqohNilai(updated);
    showToast(`Catatan kholaqoh untuk ${siswa?.nama} diperbarui.`);
  };

  // Sinkronisasi otomatis nilai Al-Qur'an ke Mapel TFZ di Rapor
  const handleSyncToRapor = () => {
    setIsSyncing(true);
    let count = 0;

    santriList.forEach(s => {
      const rec = getRecord(s.id);
      const na = hitungNilaiQuran(rec);
      const deskripsi = `Capaian Tahfidz ${rec.surahHafalan || 'Juz 30'} predikat ${rec.statusHafalan || 'Jayyid Jiddan'}. ${rec.catatan || 'Hafalan lancar dan tartil.'}`;
      
      if (onSyncToRaporTFZ) {
        onSyncToRaporTFZ({
          siswaId: s.id,
          mapelId: 'TFZ',
          f1: rec.nilaiMakhraj || 85,
          f2: rec.nilaiTajwid || 85,
          f3: rec.nilaiFashahah || 85,
          f4: rec.nilaiKelancaran || 88,
          sumatifLingkup: na,
          pts: na,
          pas: na,
          deskripsiCapaian: deskripsi
        });
        count++;
      }
    });

    setTimeout(() => {
      setIsSyncing(false);
      showToast(`Sukses! ${count} nilai santri kholaqoh berhasil disinkronkan ke Mata Pelajaran TFZ Rapor.`);
    }, 600);
  };

  // Hitung Statistik Kholaqoh
  const totalSantri = santriList.length;
  const avgKelancaran = totalSantri > 0 
    ? Math.round(santriList.reduce((acc, s) => acc + (Number(getRecord(s.id).nilaiKelancaran) || 0), 0) / totalSantri)
    : 0;
  const countMumtaz = santriList.filter(s => hitungNilaiQuran(getRecord(s.id)) >= 90).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-emerald-700 flex items-center space-x-3 text-sm animate-in slide-in-from-top-2">
          <CheckCircle className="w-5 h-5 text-emerald-300" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-purple-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold text-purple-100 border border-white/20">
              <BookMarked className="w-3.5 h-3.5 text-purple-200" />
              <span>Modul Penilaian Al-Qur'an, Tahsin & Tahfidz</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Kholaqoh Al-Qur'an & Setoran Hafalan
            </h1>
            <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
              Pembaruan berkala makharijul huruf, kaidah tajwid, kelancaran hafalan juz/surah, serta adab kholaqoh untuk 10 kelompok pembinaan Al-Qur'an SD Al-Imam.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleSyncToRapor}
              disabled={isSyncing || totalSantri === 0}
              className="px-4 py-2.5 rounded-2xl bg-white text-purple-900 font-bold text-xs sm:text-sm shadow-md hover:bg-purple-50 transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-purple-700 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Sinkron ke Rapor (TFZ)</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-2xl bg-purple-700/70 hover:bg-purple-700 text-white font-semibold text-xs sm:text-sm border border-purple-500/50 shadow-xs transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-purple-200" />
              <span>Cetak Rekap</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Selector & Info Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Kholaqoh Selector Card */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
            <span>Pilih Kelompok Kholaqoh:</span>
            {!isSuperAccess && (
              <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full font-semibold border border-purple-200">
                Kholaqoh Anda
              </span>
            )}
          </label>
          
          <select
            value={selectedKholaqohId}
            onChange={(e) => setSelectedKholaqohId(e.target.value)}
            disabled={!isSuperAccess && currentUser?.kholaqohDiampu?.length === 1}
            className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 font-bold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
          >
            {kholaqohList.map((kh) => (
              <option key={kh.id} value={kh.id}>
                {kh.nama} ({kh.gender} - {kh.pembimbingNama})
              </option>
            ))}
          </select>

          {/* Search Box */}
          <div className="relative pt-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Cari nama santri atau NISN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>

        {/* Kholaqoh Profile Details */}
        <div className="lg:col-span-2 bg-gradient-to-br from-purple-50/70 via-white to-slate-50 p-5 rounded-3xl border border-purple-200 shadow-2xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-purple-100">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black text-purple-800 bg-purple-200/80 px-2 py-0.5 rounded-md">
                  {currentKholaqoh?.kode || 'KH-01'}
                </span>
                <h3 className="text-base font-extrabold text-slate-800">
                  {currentKholaqoh?.nama}
                </h3>
              </div>
              <p className="text-xs text-slate-600 mt-1 flex items-center">
                <span>Pembimbing: <strong>{currentKholaqoh?.pembimbingNama}</strong></span>
                <span className="mx-2">•</span>
                <span>Ruangan: {currentKholaqoh?.ruangan}</span>
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 block">Jadwal Halaqoh:</span>
              <span className="text-xs font-bold text-slate-800">{currentKholaqoh?.jadwal}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3 text-center">
            <div className="p-2.5 rounded-2xl bg-white border border-slate-200">
              <span className="text-[11px] text-slate-500 block font-medium">Santri Binaan</span>
              <span className="text-lg font-black text-slate-800">{totalSantri} Santri</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white border border-purple-200">
              <span className="text-[11px] text-purple-700 block font-medium">Rerata Mutqin</span>
              <span className="text-lg font-black text-purple-700">{avgKelancaran} / 100</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white border border-emerald-200">
              <span className="text-[11px] text-emerald-700 block font-medium">Predikat Mumtaz</span>
              <span className="text-lg font-black text-emerald-700">{countMumtaz} Santri</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Data Table of Santri */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h2 className="text-base font-bold text-slate-800">
              Formulir Penilaian Santri Kholaqoh
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Input langsung nilai aspek Makhraj, Tajwid, Fashahah, serta Kelancaran hafalan
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500">
              Menampilkan <strong>{santriList.length}</strong> santri
            </span>
          </div>
        </div>

        {santriList.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Users className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700">Belum Ada Santri di Kholaqoh Ini</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Silakan periksa penugasan kelompok kholaqoh siswa pada menu Administrasi GTK / Siswa.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/90 text-slate-700 uppercase font-black tracking-wider text-[11px] border-b border-slate-200">
                  <th className="py-3 px-3 w-10 text-center">No</th>
                  <th className="py-3 px-3 min-w-[170px]">Identitas Santri</th>
                  <th className="py-3 px-2 text-center w-20">Makhraj</th>
                  <th className="py-3 px-2 text-center w-20">Tajwid</th>
                  <th className="py-3 px-2 text-center w-20">Fashahah</th>
                  <th className="py-3 px-3 min-w-[180px]">Surah / Juz Hafalan</th>
                  <th className="py-3 px-2 text-center w-24">Kelancaran</th>
                  <th className="py-3 px-2 text-center w-20">NA Qur'an</th>
                  <th className="py-3 px-3 min-w-[240px]">Catatan Pembimbing</th>
                  <th className="py-3 px-2 text-center w-16">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {santriList.map((santri, idx) => {
                  const rec = getRecord(santri.id);
                  const na = hitungNilaiQuran(rec);
                  const predikat = getPredikatQuran(na);

                  return (
                    <tr key={santri.id} className="hover:bg-purple-50/30 transition-colors">
                      <td className="py-3 px-3 text-center font-bold text-slate-500">
                        {idx + 1}
                      </td>
                      
                      {/* Santri Info */}
                      <td className="py-3 px-3">
                        <div className="flex items-center space-x-2.5">
                          <img
                            src={santri.foto || "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&auto=format&fit=crop&q=80"}
                            alt={santri.nama}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-slate-800 truncate">
                              {santri.nama}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              NISN: {santri.nisn || '-'} • {santri.kelas || 'SD Al-Imam'}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Makhraj */}
                      <td className="py-3 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={rec.nilaiMakhraj ?? ''}
                          onChange={(e) => handleInputChange(santri.id, 'nilaiMakhraj', e.target.value)}
                          className="w-16 py-1.5 px-1 rounded-xl text-center font-bold border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-400 focus:outline-none"
                        />
                      </td>

                      {/* Tajwid */}
                      <td className="py-3 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={rec.nilaiTajwid ?? ''}
                          onChange={(e) => handleInputChange(santri.id, 'nilaiTajwid', e.target.value)}
                          className="w-16 py-1.5 px-1 rounded-xl text-center font-bold border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-400 focus:outline-none"
                        />
                      </td>

                      {/* Fashahah */}
                      <td className="py-3 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={rec.nilaiFashahah ?? ''}
                          onChange={(e) => handleInputChange(santri.id, 'nilaiFashahah', e.target.value)}
                          className="w-16 py-1.5 px-1 rounded-xl text-center font-bold border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-400 focus:outline-none"
                        />
                      </td>

                      {/* Surah / Juz Hafalan */}
                      <td className="py-3 px-3">
                        <input
                          type="text"
                          placeholder="e.g. Juz 30 (An-Naba - Al-Lail)"
                          value={rec.surahHafalan || ''}
                          onChange={(e) => handleInputChange(santri.id, 'surahHafalan', e.target.value)}
                          className="w-full py-1.5 px-2.5 rounded-xl text-xs font-semibold border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-400 focus:outline-none"
                        />
                      </td>

                      {/* Kelancaran / Mutqin */}
                      <td className="py-3 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={rec.nilaiKelancaran ?? ''}
                          onChange={(e) => handleInputChange(santri.id, 'nilaiKelancaran', e.target.value)}
                          className="w-16 py-1.5 px-1 rounded-xl text-center font-black text-purple-700 border border-purple-200 bg-purple-50/50 focus:bg-white focus:ring-2 focus:ring-purple-400 focus:outline-none"
                        />
                      </td>

                      {/* NA Qur'an */}
                      <td className="py-3 px-2 text-center">
                        <div className="font-black text-sm text-slate-800">
                          {na}
                        </div>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold border block mt-0.5 truncate ${predikat.color}`}>
                          {predikat.label.split(' ')[0]}
                        </span>
                      </td>

                      {/* Catatan Pembimbing */}
                      <td className="py-3 px-3">
                        <textarea
                          rows="2"
                          placeholder="Tulis capaian atau catatan murojaah santri..."
                          value={rec.catatan || ''}
                          onChange={(e) => handleInputChange(santri.id, 'catatan', e.target.value)}
                          className="w-full py-1.5 px-2.5 rounded-xl text-xs border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-400 focus:outline-none resize-none"
                        />
                      </td>

                      {/* Action Smart Generator */}
                      <td className="py-3 px-2 text-center">
                        <button
                          onClick={() => handleGenerateCatatan(santri.id)}
                          title="Generate Catatan Otomatis"
                          className="p-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-colors cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer info note */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>
            *Nilai tersimpan secara otomatis setiap kali Anda mengisi atau mengubah angka di tabel.
          </span>
          <span className="font-semibold text-purple-700">
            Terhubung dengan Standar Penilaian Al-Imam Islamic School
          </span>
        </div>

      </div>

    </div>
  );
}
