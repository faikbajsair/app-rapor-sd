import React, { useState } from 'react';
import {
  Calculator,
  Save,
  Sparkles,
  PlusCircle,
  AlertCircle,
  CheckCircle,
  BookOpen,
  FileSpreadsheet,
  RefreshCw,
  Search
} from 'lucide-react';
import { NilaiController } from '../../controllers/NilaiController';
import { QRCodeSVG } from 'qrcode.react';
import { LEGGER_MURNI_SUMMARY_ABBAS } from '../../config/data1Abbas';
import { NA_RAPOR_SUMMARY_4_ALI, LEGGER_MURNI_SUMMARY_4_ALI } from '../../config/data4Ali';

const NA_COLUMNS = [
  { colNo: 3, id: 'PP', label: 'Pendidikan Pancasila', kkm: 75, activeInKelas1: true },
  { colNo: 4, id: 'BIN', label: 'Bahasa Indonesia', kkm: 75, activeInKelas1: true },
  { colNo: 5, id: 'IPAS', label: 'Ilmu Pengetahuan Alam dan Sosial', kkm: 75, activeInKelas1: false },
  { colNo: 6, id: 'SB', label: 'Seni Rupa', kkm: 75, activeInKelas1: true },
  { colNo: 7, id: 'PJOK', label: 'Pendidikan Jasmani Olahraga dan Kesehatan', kkm: 75, activeInKelas1: true },
  { colNo: 8, id: 'MAT', label: 'Mathematics', kkm: 75, activeInKelas1: true },
  { colNo: 9, id: 'BS', label: 'Bahasa Sunda', kkm: 75, activeInKelas1: false },
  { colNo: 10, id: 'AKD', label: 'Akidah Akhlak', kkm: 80, activeInKelas1: true },
  { colNo: 11, id: 'FQH', label: 'Fiqih Ibadah', kkm: 80, activeInKelas1: true },
  { colNo: 12, id: 'SKI', label: 'Sejarah Islam', kkm: 75, activeInKelas1: false },
  { colNo: 13, id: 'ADB', label: 'Adab Akhlak', kkm: 80, activeInKelas1: true },
  { colNo: 14, id: 'BAR', label: 'Bahasa Arab', kkm: 75, activeInKelas1: true },
  { colNo: 15, id: 'BIG', label: 'Bahasa Inggris', kkm: 80, activeInKelas1: true },
  { colNo: 16, id: 'INF', label: 'Informatika', kkm: 75, activeInKelas1: true }
];

export function NilaiView({
  siswaList,
  mapelList,
  nilaiList,
  onSaveNilai,
  onAddMapel,
  settings,
  currentUser
}) {
  // Filter mapel yang boleh diakses berdasarkan penugasan guru yang sedang login
  const isGuruMapel = currentUser?.role === 'guru_mapel';
  const isGuruQuran = currentUser?.role === 'guru_quran';
  const isWaliKelas = currentUser?.role === 'wali_kelas';

  const accessibleMapelList = mapelList.filter(m => {
    if (isGuruMapel && currentUser?.mapelDiampu && currentUser.mapelDiampu.length > 0) {
      return currentUser.mapelDiampu.includes(m.id);
    }
    if (isGuruQuran) {
      return m.id === 'TFZ';
    }
    return true;
  });

  const activeMapels = accessibleMapelList.length > 0 ? accessibleMapelList : mapelList;

  const [selectedMapelId, setSelectedMapelId] = useState(() => {
    return activeMapels[0]?.id || 'MAT';
  });

  // Normalisasi nama kelas dari sesi guru ke nama rombel resmi
  const resolveRombelFromUser = (user) => {
    const raw = user?.kelasDiampu?.[0] || '';
    const lower = raw.toLowerCase();
    if (!raw || lower === 'semua kelas' || lower === 'semua' || lower === '1-a' || lower === 'kelas 1-a' || lower.includes('abbas')) {
      return '1 Abdullah Ibnu Abbas';
    }
    if (lower === '1-b' || lower === 'kelas 1-b' || lower.includes('umar')) {
      return '1 Abdullah Ibnu Umar';
    }
    if (lower === '4-a' || lower === 'kelas 4-a' || lower.includes('4 ali') || lower.includes('ali bin')) {
      return '4 Ali Bin Abi Thalib';
    }
    return '1 Abdullah Ibnu Abbas';
  };

  const defaultKelas = isWaliKelas ? resolveRombelFromUser(currentUser) : '1 Abdullah Ibnu Abbas';

  const [selectedKelas, setSelectedKelas] = useState(defaultKelas);

  // Sinkronkan filter kelas saat berganti peran atau akun guru
  React.useEffect(() => {
    if (isWaliKelas) {
      setSelectedKelas(resolveRombelFromUser(currentUser));
    }
  }, [currentUser?.id, currentUser?.role, currentUser?.nama]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddMapelModal, setShowAddMapelModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [viewLayout, setViewLayout] = useState('NA_SHEET'); // 'NA_SHEET' | 'TABLE' | 'CARDS'

  // New Mapel State
  const [newMapelKode, setNewMapelKode] = useState('');
  const [newMapelNama, setNewMapelNama] = useState('');
  const [newMapelKelompok, setNewMapelKelompok] = useState('Wajib');
  const [newMapelKkm, setNewMapelKkm] = useState(75);
  const [newMapelGuru, setNewMapelGuru] = useState('');

  const currentMapel = activeMapels.find(m => m.id === selectedMapelId) || activeMapels[0] || mapelList[0];

  // Helper untuk mendapatkan atau membuat record nilai siswa
  const getRecord = (siswaId) => {
    return nilaiList.find(n => n.siswaId === siswaId && n.mapelId === selectedMapelId) || {
      siswaId,
      mapelId: selectedMapelId,
      f1: '', f2: '', f3: '', f4: '',
      sumatifLingkup: '',
      pts: '',
      pas: '',
      deskripsiCapaian: ''
    };
  };

  const handleInputChange = (siswaId, field, value) => {
    const cleanVal = value === '' ? '' : Math.max(0, Math.min(100, Number(value)));
    const current = getRecord(siswaId);
    const updated = {
      ...current,
      [field]: cleanVal
    };

    // Auto update deskripsi jika nilai akhir berubah
    const na = NilaiController.hitungNilaiAkhir(updated, settings);
    if (!updated.deskripsiCapaian) {
      const siswa = siswaList.find(s => s.id === siswaId);
      updated.deskripsiCapaian = NilaiController.generateDeskripsi(
        siswa?.nama,
        currentMapel?.nama || 'Mata Pelajaran',
        na,
        currentMapel?.kkm || 75
      );
    }

    onSaveNilai(updated);
  };

  const handleAutoGenerateDeskripsi = (siswaId) => {
    const current = getRecord(siswaId);
    const siswa = siswaList.find(s => s.id === siswaId);
    const na = NilaiController.hitungNilaiAkhir(current, settings);
    const deskripsi = NilaiController.generateDeskripsi(
      siswa?.nama,
      currentMapel?.nama || 'Mata Pelajaran',
      na,
      currentMapel?.kkm || 75
    );

    const updated = { ...current, deskripsiCapaian: deskripsi };
    onSaveNilai(updated);

    showToast(`Deskripsi naratif untuk ${siswa?.nama} berhasil diperbarui.`);
  };

  const handleGenerateAllDeskripsi = () => {
    siswaList.forEach(s => {
      handleAutoGenerateDeskripsi(s.id);
    });
    showToast(`Semua deskripsi naratif mata pelajaran ${currentMapel?.nama} berhasil dibuat!`);
  };

  const handleCreateMapel = (e) => {
    e.preventDefault();
    if (!newMapelKode || !newMapelNama) return;

    const newMapel = {
      id: newMapelKode.toUpperCase().trim(),
      kode: newMapelKode.toUpperCase().trim(),
      nama: newMapelNama.trim(),
      kelompok: newMapelKelompok,
      kkm: Number(newMapelKkm) || 75,
      guru: newMapelGuru.trim() || 'Guru Pengampu'
    };

    onAddMapel(newMapel);
    setSelectedMapelId(newMapel.id);
    setShowAddMapelModal(false);
    setNewMapelKode('');
    setNewMapelNama('');
    setNewMapelGuru('');
    showToast(`Mata pelajaran baru "${newMapel.nama}" berhasil didaftarkan!`);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter Siswa berdasarkan Kelas yang diampu & Pencarian
  const filteredSiswa = siswaList.filter(s => {
    const k = (selectedKelas || '').toLowerCase();
    const isAll = !selectedKelas || k === 'semua' || k === 'semua kelas';
    const matchKelas = isAll ||
      s.kelas === selectedKelas ||
      (s.kelas && s.kelas.toLowerCase().includes(k)) ||
      (s.rombel && s.rombel.toLowerCase().includes(k));
    const matchSearch = s.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.nis && s.nis.includes(searchQuery)) ||
      (s.nisn && s.nisn.includes(searchQuery));
    return matchKelas && matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-2xl flex items-center space-x-2 animate-in slide-in-from-bottom">
          <CheckCircle className="w-4 h-4 text-pastel-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Teacher Context Info (Jika login sebagai Guru) */}
      {currentUser && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <img
              src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
              alt={currentUser.nama}
              className="w-10 h-10 rounded-xl object-cover border border-emerald-300 shrink-0"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-slate-800 text-sm">{currentUser.nama}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {currentUser.roleLabel || currentUser.jabatan}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                {currentUser.kelasDiampu?.length ? `Penugasan Kelas: ${currentUser.kelasDiampu.join(', ')}` : ''}
                {currentUser.mapelDiampu?.length ? ` • Mapel: ${currentUser.mapelDiampu.join(', ')}` : ''}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">Tahun Pelajaran:</span>
            <span className="text-xs font-extrabold text-emerald-800">{settings.tahunAjaran} • {settings.semester}</span>
          </div>
        </div>
      )}

      {/* Header & Mapel Selector */}
      <div className="p-6 rounded-3xl bg-white border border-pastel-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-pastel-200 text-pastel-800">
                <Calculator className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-extrabold text-slate-800">Pengolahan Nilai Formatif & Sumatif</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dinamis per mapel & kelas • Perhitungan otomatis Nilai Akhir & Narasi Capaian Pembelajaran
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => setShowAddMapelModal(true)}
              className="px-3.5 py-2 rounded-xl bg-pastel-100 hover:bg-pastel-200 text-pastel-900 text-xs font-bold border border-pastel-300 transition-colors flex items-center space-x-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-pastel-700" />
              <span>Tambah Mapel</span>
            </button>

            <button
              onClick={handleGenerateAllDeskripsi}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Auto-Generate Narasi</span>
            </button>
          </div>
        </div>

        {/* Dynamic Mapel Tabs Bar */}
        <div className="pt-2 border-t border-slate-100">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>
              {isGuruMapel ? 'Mata Pelajaran yang Anda Ampu:' : `Pilih Mata Pelajaran (${activeMapels.length} Mapel):`}
            </span>
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {activeMapels.map((m) => {
              const isSelected = selectedMapelId === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMapelId(m.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${isSelected
                    ? 'bg-pastel-300 text-pastel-950 border-pastel-400 shadow-2xs ring-2 ring-pastel-400/50'
                    : 'bg-pastel-50/60 text-slate-600 border-slate-200 hover:bg-pastel-100/70 hover:border-pastel-300'
                    }`}
                >
                  {m.kode} - {m.nama}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Mapel Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-pastel-100/80 to-white border border-pastel-300/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <span className="font-extrabold text-slate-800 text-sm">{currentMapel?.nama}</span>
            <span className="px-2 py-0.5 rounded-md bg-white text-pastel-900 border border-pastel-300 font-semibold text-[11px]">
              KKM: {currentMapel?.kkm}
            </span>
            <span className="text-slate-500">Guru: {currentMapel?.guru}</span>
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-slate-500">
            <span>Bobot: Formatif ({settings.bobotFormatif}%) • Sumatif Lingkup ({settings.bobotSumatifLingkup}%) • Sumatif Akhir ({settings.bobotSumatifAkhir}%)</span>
          </div>
        </div>
      </div>

      {/* Grade Table Card */}
      <div className="bg-white rounded-3xl border border-pastel-200 shadow-2xs overflow-hidden">

        {/* Table Toolbar: Filter Kelas & Pencarian */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Class Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-600 shrink-0">Filter Rombel:</span>
              <select
                value={selectedKelas}
                onChange={(e) => setSelectedKelas(e.target.value)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="SEMUA">Semua Rombel ({siswaList.length} Siswa)</option>
                <option value="1 Abdullah Ibnu Abbas">1 Abdullah Ibnu Abbas (21 Santri)</option>
                <option value="1 Abdullah Ibnu Umar">1 Abdullah Ibnu Umar (20 Santri)</option>
                <option value="4 Ali Bin Abi Thalib">4 Ali Bin Abi Thalib (21 Santri)</option>
              </select>
            </div>

            {/* Search Box */}
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2" />
              <input
                type="text"
                placeholder="Cari nama santri atau NIS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* View Layout Switcher (Sheet NA vs Sheet LEGGER vs Tabel vs Kartu Input Cepat) */}
            <div className="inline-flex flex-wrap rounded-xl p-1 bg-slate-200/70 text-[11px] font-bold gap-0.5">
              <button
                type="button"
                onClick={() => setViewLayout('NA_SHEET')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${viewLayout === 'NA_SHEET' ? 'bg-emerald-800 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Sheet NA (Nilai Rapor)
              </button>
              <button
                type="button"
                onClick={() => setViewLayout('LEGGER_SHEET')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${viewLayout === 'LEGGER_SHEET' ? 'bg-emerald-800 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Sheet LEGGER (Nilai Murni)
              </button>
              <button
                type="button"
                onClick={() => setViewLayout('TABLE')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${viewLayout === 'TABLE' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Input Per Mapel
              </button>
              <button
                type="button"
                onClick={() => setViewLayout('CARDS')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${viewLayout === 'CARDS' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Kartu Mobile
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Menampilkan <span className="font-bold text-slate-800">{filteredSiswa.length}</span> Santri {selectedKelas !== 'SEMUA' && `(${selectedKelas})`}
          </div>
        </div>

        {/* =========================================================================
         * MODE 1: SHEET NA (NILAI AKHIR ASESMEN SUMATIF - PERSIS GAMBAR 5)
         * ========================================================================= */}
        {viewLayout === 'NA_SHEET' && (
          <div className="p-4 sm:p-6 bg-amber-300/30 space-y-6">
            <div className="bg-white rounded-2xl border-2 border-slate-900 p-4 sm:p-6 space-y-4 shadow-md">
              {/* Header Sheet NA Persis Gambar 5 */}
              <div className="text-center space-y-1">
                <div className="bg-yellow-300 border-2 border-slate-900 py-1.5 px-4 font-black text-base sm:text-lg text-slate-950 uppercase tracking-wide">
                  NILAI AKHIR ASESMEN SUMATIF
                </div>
                <div className="text-xs sm:text-sm font-black text-slate-900 uppercase pt-1">
                  ANALISIS PENCAPAIAN KRITERIA KETUNTASAN MINIMAL NILAI RAPOR
                </div>
                <div className="text-xs font-black text-slate-900 uppercase">
                  TAHUN AJARAN {settings.tahunAjaran || '2026/2027'}
                </div>
              </div>

              <div className="text-xs font-bold text-slate-900 space-y-0.5 max-w-xs">
                <div className="grid grid-cols-3">
                  <span>Kelas</span>
                  <span className="col-span-2">
                    : {selectedKelas.includes('4 Ali') ? 'IV (empat)' : 'I (satu)'} • {selectedKelas === 'SEMUA' ? '1 Abdullah Ibnu Abbas' : selectedKelas}
                  </span>
                </div>
                <div className="grid grid-cols-3">
                  <span>Semester</span>
                  <span className="col-span-2">: I (Satu)</span>
                </div>
              </div>

              {/* Tabel Matriks NA 14 Mapel */}
              <div className="overflow-x-auto border-2 border-slate-900">
                <table className="w-full text-center text-[11px] border-collapse">
                  <thead>
                    <tr className="bg-white text-slate-950 font-bold border-b border-slate-900 text-[10px]">
                      <th className="py-2 px-1.5 border-r border-slate-900 w-9">No</th>
                      <th className="py-2 px-2.5 border-r border-slate-900 min-w-[185px]">Nama</th>
                      {NA_COLUMNS.map((col) => (
                        <th key={col.id} className="py-1.5 px-1 border-r border-slate-900 w-16 leading-tight">
                          {col.label}
                        </th>
                      ))}
                    </tr>
                    <tr className="bg-slate-50 text-slate-800 font-bold border-b-2 border-slate-900 text-[10px]">
                      <th className="py-0.5 px-1 border-r border-slate-900">1</th>
                      <th className="py-0.5 px-2 border-r border-slate-900">2</th>
                      {NA_COLUMNS.map((col, idx) => (
                        <th key={col.id} className="py-0.5 px-1 border-r border-slate-900">
                          {selectedKelas.includes('4 Ali') && idx >= 13 ? 15 : col.colNo}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-400 text-slate-950 font-semibold">
                    {filteredSiswa.map((siswa, idx) => (
                      <tr key={siswa.id} className="hover:bg-slate-50">
                        <td className="py-1 px-1.5 border-r border-slate-800">{idx + 1}</td>
                        <td className="py-1 px-2.5 border-r border-slate-800 text-left font-bold uppercase whitespace-nowrap">
                          {siswa.nama}
                        </td>
                        {NA_COLUMNS.map((col) => {
                          const rec = nilaiList.find(n => n.siswaId === siswa.id && n.mapelId === col.id);
                          const val = rec ? Number(rec.nilaiAkhir || NilaiController.hitungNilaiAkhir(rec, settings) || 0) : 0;
                          const isInactive = !selectedKelas.includes('4 Ali') && !col.activeInKelas1 && val === 0;
                          return (
                            <td
                              key={col.id}
                              className={`py-1 px-1.5 border-r border-slate-800 font-mono ${isInactive ? 'bg-yellow-300' : ''
                                }`}
                            >
                              {val > 0 ? Math.round(val) : ''}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                  {/* 9 Baris Statistik Bawah Persis Gambar 5 */}
                  {(() => {
                    const isKelas4Ali = selectedKelas.includes('4 Ali');
                    const colStats = isKelas4Ali
                      ? NA_RAPOR_SUMMARY_4_ALI
                      : NA_COLUMNS.map((col) => {
                          const vals = filteredSiswa
                            .map((s) => {
                              const r = nilaiList.find((n) => n.siswaId === s.id && n.mapelId === col.id);
                              return r ? Number(r.nilaiAkhir || NilaiController.hitungNilaiAkhir(r, settings) || 0) : 0;
                            })
                            .filter((v) => v > 0);

                          if (vals.length === 0) {
                            return { active: false };
                          }
                          const sum = vals.reduce((a, b) => a + b, 0);
                          const avg = Math.round(sum / vals.length);
                          const max = Math.max(...vals);
                          const min = Math.min(...vals);
                          const belowKkm = vals.filter((v) => v < col.kkm).length;
                          const tuntasCount = vals.length;
                          const dayaSerap = 100;

                          return {
                            active: true,
                            sum: sum.toLocaleString('id-ID'),
                            avg,
                            max,
                            min,
                            belowKkm: belowKkm > 0 ? belowKkm : '-',
                            tuntasCount,
                            dayaSerap
                          };
                        });

                    const summaryRows = [
                      { label: 'Jumlah', key: 'sum' },
                      { label: 'Nilai Rata-Rata', key: 'avg' },
                      { label: 'Nilai Tertinggi', key: 'max' },
                      { label: 'Nilai Terendah', key: 'min' },
                      { label: '< KKM', key: 'belowKkm' },
                      { label: 'KKM - 100', key: 'tuntasCount' },
                      { label: 'Daya Serap %', key: 'dayaSerap' },
                      { label: 'Nilai Minimum', key: 'min' },
                      { label: 'Nilai Maksimum', key: 'max' }
                    ];

                    return (
                      <tfoot className="bg-[#bdd7ee] text-slate-950 font-bold text-[10.5px] border-t-2 border-slate-900 divide-y divide-slate-700">
                        {summaryRows.map((sRow) => (
                          <tr key={sRow.label}>
                            <td colSpan={2} className="py-1 px-3 border-r border-slate-800 text-center font-bold">
                              {sRow.label}
                            </td>
                            {colStats.map((st, cIdx) => (
                              <td key={cIdx} className="py-1 px-1.5 border-r border-slate-800 text-right font-mono">
                                {st.active ? st[sRow.key] : '-'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tfoot>
                    );
                  })()}
                </table>
              </div>

              {/* Blok Tanda Tangan & QR Code Persis Gambar 5 */}
              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 text-xs text-slate-900 px-2">
                <div className="space-y-2">
                  <div>
                    <div>Mengetahui,</div>
                    <div className="font-semibold">Kepala Sekolah SD Al-Imam Islamic School</div>
                  </div>
                  <div className="py-1">
                    <QRCodeSVG
                      value="https://app-rapor-sd.vercel.app/verify/SD-ALIMAM-NA-2026"
                      size={68}
                      bgColor="#FFFFFF"
                      fgColor="#0f172a"
                      level="M"
                    />
                  </div>
                  <div className="font-bold underline">Kholid Hasan, S.Pd</div>
                </div>

                <div className="space-y-12 sm:min-w-[220px]">
                  <div>
                    <div>Cileungsi, 25 September 2026</div>
                    <div className="font-semibold">Wali Kelas</div>
                  </div>
                  <div className="font-bold underline">
                    {selectedKelas.includes('4 Ali')
                      ? 'Zahra Aulia, S.Pd'
                      : selectedKelas.includes('Umar')
                      ? 'Siti Habzah Diniyanti, S.Sos'
                      : 'Putri Hidayah, S.Pd'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
         * MODE 1B: SHEET LEGGER (ANALISIS KKM NILAI MURNI - PERSIS GAMBAR 1 BARU)
         * ========================================================================= */}
        {viewLayout === 'LEGGER_SHEET' && (
          <div className="p-4 sm:p-6 bg-amber-400/30 space-y-6">
            <div className="bg-white rounded-2xl border-2 border-slate-900 p-4 sm:p-6 space-y-4 shadow-md">
              {/* Header Sheet LEGGER Persis Gambar 1 */}
              <div className="text-center space-y-1">
                <div className="bg-yellow-300 border-2 border-slate-900 py-1.5 px-4 font-black text-base sm:text-lg text-slate-950 uppercase tracking-wide">
                  NILAI AKHIR ASESMEN SUMATIF
                </div>
                <div className="text-xs sm:text-sm font-black text-slate-900 uppercase pt-1">
                  ANALISIS PENCAPAIAN KRITERIA KETUNTASAN MINIMAL NILAI MURNI
                </div>
                <div className="text-xs font-black text-slate-900 uppercase">
                  TAHUN AJARAN 2026-2027
                </div>
              </div>

              <div className="text-xs font-bold text-slate-900 space-y-0.5 max-w-xs">
                <div className="grid grid-cols-3">
                  <span>Kelas</span>
                  <span className="col-span-2">
                    : {selectedKelas.includes('4 Ali') ? 'IV (empat)' : 'I (satu)'} • {selectedKelas === 'SEMUA' ? '1 Abdullah Ibnu Abbas' : selectedKelas}
                  </span>
                </div>
                <div className="grid grid-cols-3">
                  <span>Semester</span>
                  <span className="col-span-2">: I (Satu)</span>
                </div>
              </div>

              {/* Tabel Matriks LEGGER Nilai Murni 14 Mapel */}
              <div className="overflow-x-auto border-2 border-slate-900">
                <table className="w-full text-center text-[11px] border-collapse">
                  <thead>
                    <tr className="bg-white text-slate-950 font-bold border-b border-slate-900 text-[10px]">
                      <th className="py-2 px-1.5 border-r border-slate-900 w-9">No</th>
                      <th className="py-2 px-2.5 border-r border-slate-900 min-w-[185px]">Nama</th>
                      {NA_COLUMNS.map((col) => (
                        <th key={col.id} className="py-1.5 px-1 border-r border-slate-900 w-16 leading-tight">
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-400 text-slate-950 font-semibold">
                    {filteredSiswa.map((siswa, idx) => (
                      <tr key={siswa.id} className="hover:bg-slate-50">
                        <td className="py-1 px-1.5 border-r border-slate-800">{idx + 1}</td>
                        <td className="py-1 px-2.5 border-r border-slate-800 text-left font-bold uppercase whitespace-nowrap">
                          {siswa.nama}
                        </td>
                        {NA_COLUMNS.map((col) => {
                          const rec = nilaiList.find(n => n.siswaId === siswa.id && n.mapelId === col.id);
                          const val = rec ? Number(rec.nilaiMurni !== undefined ? rec.nilaiMurni : (rec.nilaiAkhir || 0)) : 0;
                          const isInactive = !selectedKelas.includes('4 Ali') && !col.activeInKelas1 && val === 0;
                          return (
                            <td
                              key={col.id}
                              className={`py-1 px-1.5 border-r border-slate-800 font-mono ${isInactive ? 'bg-yellow-300' : (val > 0 && val < col.kkm ? 'text-rose-700 font-black bg-rose-50/40' : '')
                                }`}
                            >
                              {val > 0 ? Math.round(val) : ''}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                  {/* 9 Baris Statistik Bawah Persis Gambar 1 (LEGGER Nilai Murni) */}
                  <tfoot className="bg-[#bdd7ee] text-slate-950 font-bold text-[10.5px] border-t-2 border-slate-900 divide-y divide-slate-700">
                    {[
                      { label: 'Jumlah', key: 'sum' },
                      { label: 'Nilai Rata-Rata', key: 'avg' },
                      { label: 'Nilai Tertinggi', key: 'max' },
                      { label: 'Nilai Terendah', key: 'min' },
                      { label: '< KKM', key: 'belowKkm' },
                      { label: 'KKM - 100', key: 'kkm100' },
                      { label: 'Daya Serap %', key: 'dayaSerap' },
                      { label: 'Nilai Minimum', key: 'min' },
                      { label: 'Nilai Maksimum', key: 'max' }
                    ].map((sRow) => {
                      const activeSummaryList = selectedKelas.includes('4 Ali')
                        ? LEGGER_MURNI_SUMMARY_4_ALI
                        : LEGGER_MURNI_SUMMARY_ABBAS;
                      return (
                        <tr key={sRow.label}>
                          <td colSpan={2} className="py-1 px-3 border-r border-slate-800 text-center font-bold">
                            {sRow.label}
                          </td>
                          {activeSummaryList.map((st) => (
                            <td key={st.id} className="py-1 px-1.5 border-r border-slate-800 text-right font-mono">
                              {st[sRow.key] !== undefined && (st.active || sRow.key === 'belowKkm') ? st[sRow.key] : '-'}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tfoot>
                </table>
              </div>

              {/* Blok Tanda Tangan & QR Code */}
              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 text-xs text-slate-900 px-2">
                <div className="space-y-2">
                  <div>
                    <div>Mengetahui,</div>
                    <div className="font-semibold">Kepala Sekolah SD Al-Imam Islamic School</div>
                  </div>
                  <div className="py-1">
                    <QRCodeSVG
                      value="https://app-rapor-sd.vercel.app/verify/SD-ALIMAM-LEGGER-1ABBAS-2026"
                      size={68}
                      bgColor="#FFFFFF"
                      fgColor="#0f172a"
                      level="M"
                    />
                  </div>
                  <div className="font-bold underline">Kholid Hasan, S.Pd</div>
                </div>

                <div className="space-y-12 sm:min-w-[220px]">
                  <div>
                    <div>Cileungsi, 25 September 2026</div>
                    <div className="font-semibold">Wali Kelas</div>
                  </div>
                  <div className="font-bold underline">
                    {selectedKelas.includes('4 Ali')
                      ? 'Zahra Aulia, S.Pd'
                      : selectedKelas.includes('Umar')
                      ? 'Siti Habzah Diniyanti, S.Sos'
                      : 'Putri Hidayah, S.Pd'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MOBILE / CARD INPUT MODE */}
        {viewLayout === 'CARDS' && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/50">
            {filteredSiswa.map((siswa, idx) => {
              const rec = getRecord(siswa.id);
              const rataF = NilaiController.hitungRataFormatif(rec.f1, rec.f2, rec.f3, rec.f4);
              const na = NilaiController.hitungNilaiAkhir(rec, settings);
              const pred = NilaiController.getPredikat(na, currentMapel?.kkm || 75);
              return (
                <div key={siswa.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400">#{idx + 1} • NIS: {siswa.nis || siswa.nisn}</span>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900">{siswa.nama}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-emerald-900">{na > 0 ? na : '-'}</span>
                      <span className={`ml-1.5 px-2 py-0.5 rounded text-[10px] font-bold border ${pred.color}`}>
                        {pred.label}
                      </span>
                    </div>
                  </div>

                  {/* Quick Grid Inputs */}
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                    {['f1', 'f2', 'f3', 'f4'].map((fField, fIdx) => (
                      <div key={fField}>
                        <label className="text-slate-500 block mb-0.5">F{fIdx + 1}</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={rec[fField] ?? ''}
                          onChange={(e) => handleInputChange(siswa.id, fField, e.target.value)}
                          className="w-full py-1.5 text-center rounded-lg border border-slate-200 bg-slate-50 font-extrabold text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold pt-1">
                    <div>
                      <label className="text-slate-400 block mb-0.5">Rata F</label>
                      <div className="py-1.5 rounded-lg bg-slate-100 text-slate-700 font-extrabold text-xs">
                        {rataF > 0 ? rataF : '-'}
                      </div>
                    </div>
                    <div>
                      <label className="text-teal-700 block mb-0.5">Sumatif</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={rec.sumatifLingkup ?? ''}
                        onChange={(e) => handleInputChange(siswa.id, 'sumatifLingkup', e.target.value)}
                        className="w-full py-1.5 text-center rounded-lg border border-teal-200 bg-teal-50/40 font-extrabold text-xs text-slate-900 focus:bg-white focus:border-teal-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="text-teal-700 block mb-0.5">PTS</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={rec.pts ?? ''}
                        onChange={(e) => handleInputChange(siswa.id, 'pts', e.target.value)}
                        className="w-full py-1.5 text-center rounded-lg border border-teal-200 bg-teal-50/40 font-extrabold text-xs text-slate-900 focus:bg-white focus:border-teal-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="text-teal-700 block mb-0.5">PAS</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={rec.pas ?? ''}
                        onChange={(e) => handleInputChange(siswa.id, 'pas', e.target.value)}
                        className="w-full py-1.5 text-center rounded-lg border border-teal-200 bg-teal-50/40 font-extrabold text-xs text-slate-900 focus:bg-white focus:border-teal-500 focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Table Data */}
        <div className={`${viewLayout !== 'TABLE' ? 'hidden' : 'block'} overflow-x-auto`}>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-pastel-100/70 border-b border-pastel-200 text-slate-800">
                <th className="py-3 px-3 font-bold w-10 text-center">No</th>
                <th className="py-3 px-3 font-bold min-w-[180px]">Nama Siswa & NISN</th>

                {/* Asesmen Formatif (Lingkup Materi) */}
                <th className="py-2 px-1.5 font-bold text-center bg-pastel-200/50 w-12" title="Formatif TP 1">F1</th>
                <th className="py-2 px-1.5 font-bold text-center bg-pastel-200/50 w-12" title="Formatif TP 2">F2</th>
                <th className="py-2 px-1.5 font-bold text-center bg-pastel-200/50 w-12" title="Formatif TP 3">F3</th>
                <th className="py-2 px-1.5 font-bold text-center bg-pastel-200/50 w-12" title="Formatif TP 4">F4</th>
                <th className="py-2 px-2 font-bold text-center bg-pastel-300/40 w-16" title="Rata-rata Formatif">Rata F</th>

                {/* Asesmen Sumatif */}
                <th className="py-2 px-2 font-bold text-center bg-teal-50 w-16" title="Sumatif Lingkup Materi">Sum. Lingkup</th>
                <th className="py-2 px-1.5 font-bold text-center bg-teal-50 w-14" title="Sumatif Tengah Semester">PTS</th>
                <th className="py-2 px-1.5 font-bold text-center bg-teal-50 w-14" title="Sumatif Akhir Semester">PAS</th>

                {/* Nilai Akhir & Predikat */}
                <th className="py-2 px-2 font-extrabold text-center bg-emerald-100/70 text-emerald-950 w-16">Nilai Akhir</th>
                <th className="py-2 px-1.5 font-bold text-center w-12">Predikat</th>
                <th className="py-2 px-3 font-bold min-w-[240px]">Deskripsi Capaian Kompetensi</th>
                <th className="py-2 px-2 font-bold text-center w-12">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSiswa.map((siswa, idx) => {
                const rec = getRecord(siswa.id);
                const rataF = NilaiController.hitungRataFormatif(rec.f1, rec.f2, rec.f3, rec.f4);
                const na = NilaiController.hitungNilaiAkhir(rec, settings);
                const pred = NilaiController.getPredikat(na, currentMapel?.kkm || 75);
                const tuntas = NilaiController.isTuntas(na, currentMapel?.kkm || 75);

                return (
                  <tr key={siswa.id} className="hover:bg-pastel-50/40 transition-colors group">
                    <td className="py-2.5 px-3 text-center text-slate-400 font-medium">{idx + 1}</td>

                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-800">{siswa.nama}</div>
                      <div className="text-[10px] text-slate-400">NISN: {siswa.nisn}</div>
                    </td>

                    {/* Inputs Formatif */}
                    {['f1', 'f2', 'f3', 'f4'].map((fField) => (
                      <td key={fField} className="py-1 px-1 text-center bg-pastel-50/30">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={rec[fField] !== undefined && rec[fField] !== null ? rec[fField] : ''}
                          onChange={(e) => handleInputChange(siswa.id, fField, e.target.value)}
                          placeholder="-"
                          className="w-11 text-center py-1 rounded-md border border-pastel-200 font-medium text-slate-800 focus:outline-hidden focus:border-pastel-500 focus:bg-white"
                        />
                      </td>
                    ))}

                    {/* Rata Formatif (Otomatis & Bebas #DIV/0!) */}
                    <td className="py-2 px-2 text-center font-bold text-slate-700 bg-pastel-100/40">
                      {rataF > 0 ? rataF : '-'}
                    </td>

                    {/* Sumatif Lingkup */}
                    <td className="py-1 px-1 text-center bg-teal-50/30">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={rec.sumatifLingkup !== undefined && rec.sumatifLingkup !== null ? rec.sumatifLingkup : ''}
                        onChange={(e) => handleInputChange(siswa.id, 'sumatifLingkup', e.target.value)}
                        placeholder="-"
                        className="w-13 text-center py-1 rounded-md border border-teal-200 font-medium text-slate-800 focus:outline-hidden focus:border-teal-500 focus:bg-white"
                      />
                    </td>

                    {/* PTS */}
                    <td className="py-1 px-1 text-center bg-teal-50/30">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={rec.pts !== undefined && rec.pts !== null ? rec.pts : ''}
                        onChange={(e) => handleInputChange(siswa.id, 'pts', e.target.value)}
                        placeholder="-"
                        className="w-11 text-center py-1 rounded-md border border-teal-200 font-medium text-slate-800 focus:outline-hidden focus:border-teal-500 focus:bg-white"
                      />
                    </td>

                    {/* PAS */}
                    <td className="py-1 px-1 text-center bg-teal-50/30">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={rec.pas !== undefined && rec.pas !== null ? rec.pas : ''}
                        onChange={(e) => handleInputChange(siswa.id, 'pas', e.target.value)}
                        placeholder="-"
                        className="w-11 text-center py-1 rounded-md border border-teal-200 font-medium text-slate-800 focus:outline-hidden focus:border-teal-500 focus:bg-white"
                      />
                    </td>

                    {/* Nilai Akhir (Kalkulasi Bobot Otomatis) */}
                    <td className="py-2 px-2 text-center bg-emerald-50/80">
                      <div className={`font-extrabold text-sm ${tuntas ? 'text-emerald-900' : 'text-rose-700'}`}>
                        {na > 0 ? na : '-'}
                      </div>
                      <div className="text-[9px] text-slate-400">
                        {tuntas ? 'Tuntas' : 'Remidi'}
                      </div>
                    </td>

                    {/* Predikat */}
                    <td className="py-2 px-1.5 text-center">
                      <span className={`px-2 py-0.5 rounded-md font-bold text-xs border ${pred.color}`}>
                        {pred.label}
                      </span>
                    </td>

                    {/* Deskripsi Capaian Naratif */}
                    <td className="py-1 px-3">
                      <textarea
                        rows="2"
                        value={rec.deskripsiCapaian || ''}
                        onChange={(e) => handleInputChange(siswa.id, 'deskripsiCapaian', e.target.value)}
                        placeholder="Deskripsi capaian pembelajaran..."
                        className="w-full p-1.5 rounded-lg border border-slate-200 text-[11px] text-slate-700 leading-tight focus:outline-hidden focus:border-pastel-400 focus:bg-white resize-none"
                      />
                    </td>

                    {/* Action */}
                    <td className="py-2 px-2 text-center">
                      <button
                        onClick={() => handleAutoGenerateDeskripsi(siswa.id)}
                        title="Auto-Generate Deskripsi Naratif"
                        className="p-1.5 rounded-lg bg-pastel-100 hover:bg-pastel-200 text-pastel-900 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Null Handling Notice */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Null-Safe Engine: Kolom kosong dihitung aman tanpa error #DIV/0! atau #ERROR!.</span>
          </div>
          <div>
            Data otomatis disimpan ke penyimpanan lokal & siap disinkronkan ke GAS Web App.
          </div>
        </div>

      </div>

      {/* Modal Tambah Mapel Baru */}
      {showAddMapelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-pastel-300 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">Tambah Mata Pelajaran Baru</h3>
              <button
                onClick={() => setShowAddMapelModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateMapel} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Kode Mapel (Singkat):</label>
                <input
                  type="text"
                  placeholder="Contoh: KOD, ROBOT, TIK"
                  value={newMapelKode}
                  onChange={(e) => setNewMapelKode(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400 uppercase font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Lengkap Mata Pelajaran:</label>
                <input
                  type="text"
                  placeholder="Contoh: Robotika & Coding Anak"
                  value={newMapelNama}
                  onChange={(e) => setNewMapelNama(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kelompok:</label>
                  <select
                    value={newMapelKelompok}
                    onChange={(e) => setNewMapelKelompok(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400"
                  >
                    <option value="Wajib">Wajib</option>
                    <option value="Pilihan">Pilihan</option>
                    <option value="Muatan Lokal">Muatan Lokal</option>
                    <option value="Kekhasan">Kekhasan</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">KKM / Ketuntasan:</label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={newMapelKkm}
                    onChange={(e) => setNewMapelKkm(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Guru Pengampu:</label>
                <input
                  type="text"
                  placeholder="Ustadz / Ustadzah..."
                  value={newMapelGuru}
                  onChange={(e) => setNewMapelGuru(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400"
                />
              </div>

              <div className="pt-3 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddMapelModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Daftarkan Mapel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
