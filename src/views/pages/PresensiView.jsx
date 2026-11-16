import React, { useState, useMemo } from 'react';
import { 
  CalendarCheck, 
  Sparkles, 
  Plus, 
  Trash2, 
  Award, 
  CheckCircle,
  FileText,
  Printer,
  School,
  Table,
  MessageSquareText,
  UserCheck
} from 'lucide-react';

const BULAN_LIST = [
  { key: 'juli', label: 'JULI' },
  { key: 'agustus', label: 'AGUSTUS' },
  { key: 'september', label: 'SEPTEMBER' },
  { key: 'oktober', label: 'OKTOBER' },
  { key: 'november', label: 'NOVEMBER' },
  { key: 'desember', label: 'DESEMBER' }
];

export function PresensiView({ 
  siswaList, 
  presensiList, 
  onSavePresensi, 
  settings 
}) {
  // Tabs: 'DAFTAR_HADIR' (Image 1) | 'SARAN' (Image 4) | 'DETAIL_SISWA'
  const [activeSubTab, setActiveSubTab] = useState('DAFTAR_HADIR');
  const [selectedRombel, setSelectedRombel] = useState('1 Abdullah Ibnu Abbas');
  const [selectedSiswaId, setSelectedSiswaId] = useState(siswaList[0]?.id || 'S_1ABBAS_01');
  const [toastMessage, setToastMessage] = useState(null);

  const filteredSiswa = useMemo(() => {
    if (selectedRombel === 'SEMUA') return siswaList;
    return siswaList.filter(s => 
      (s.kelas && s.kelas.toLowerCase().includes(selectedRombel.toLowerCase())) ||
      (s.rombel && s.rombel.toLowerCase().includes(selectedRombel.toLowerCase()))
    );
  }, [siswaList, selectedRombel]);

  const currentSiswa = siswaList.find(s => s.id === selectedSiswaId) || filteredSiswa[0] || siswaList[0];

  const getRecord = (siswaId) => {
    const found = presensiList.find(p => p.siswaId === siswaId);
    if (found) return found;
    return {
      id: `PRES_${siswaId}`,
      siswaId,
      sakit: 0,
      izin: 0,
      alpa: 0,
      terlambat: 0,
      hariEfektif: 75,
      jumlahHadir: 75,
      persentaseHadir: '100,0%',
      bulanan: {
        juli: { t: 0, s: 0, i: 0, a: 0 },
        agustus: { t: 0, s: 0, i: 0, a: 0 },
        september: { t: 0, s: 0, i: 0, a: 0 },
        oktober: { t: 0, s: 0, i: 0, a: 0 },
        november: { t: 0, s: 0, i: 0, a: 0 },
        desember: { t: 0, s: 0, i: 0, a: 0 }
      },
      catatanWaliKelas: "Alhamdulilah Ananda sudah baik dalam mengikuti pembelajaran selama 3 bulan, teruslah berusaha lebih giat dalam belajar jangan mudah menyerah.",
      ekstrakurikuler: [],
      prestasi: []
    };
  };

  const currentRecord = getRecord(currentSiswa?.id);

  const handleFieldChange = (siswaId, field, val) => {
    const rec = getRecord(siswaId);
    const updated = {
      ...rec,
      [field]: val
    };
    // Recompute jumlahHadir & persentaseHadir if S/I/A changed
    if (['sakit', 'izin', 'alpa'].includes(field)) {
      const he = Number(updated.hariEfektif) || 75;
      const totalAbsen = (Number(updated.sakit) || 0) + (Number(updated.izin) || 0) + (Number(updated.alpa) || 0);
      const jmlHadir = Math.max(0, he - totalAbsen);
      const pct = ((jmlHadir / he) * 100).toFixed(1).replace('.', ',') + '%';
      updated.jumlahHadir = jmlHadir;
      updated.persentaseHadir = pct;
    }
    onSavePresensi(updated);
  };

  const handleBulananChange = (siswaId, bulanKey, subField, rawVal) => {
    const rec = getRecord(siswaId);
    const val = rawVal === '' ? 0 : Math.max(0, Number(rawVal) || 0);
    const bulanan = {
      ...(rec.bulanan || {}),
      [bulanKey]: {
        ...(rec.bulanan?.[bulanKey] || { t: 0, s: 0, i: 0, a: 0 }),
        [subField]: val
      }
    };

    // Hitung ulang total T, S, I, A dari 6 bulan
    let totalT = 0, totalS = 0, totalI = 0, totalA = 0;
    BULAN_LIST.forEach(b => {
      const m = bulanan[b.key] || { t: 0, s: 0, i: 0, a: 0 };
      totalT += Number(m.t) || 0;
      totalS += Number(m.s) || 0;
      totalI += Number(m.i) || 0;
      totalA += Number(m.a) || 0;
    });

    const he = Number(rec.hariEfektif) || 75;
    const jmlHadir = Math.max(0, he - (totalS + totalI + totalA));
    const pct = ((jmlHadir / he) * 100).toFixed(1).replace('.', ',') + '%';

    onSavePresensi({
      ...rec,
      bulanan,
      terlambat: totalT,
      sakit: totalS,
      izin: totalI,
      alpa: totalA,
      jumlahHadir: jmlHadir,
      persentaseHadir: pct
    });
  };

  const handleAddEkstra = () => {
    const currentEkstra = currentRecord.ekstrakurikuler || [];
    onSavePresensi({
      ...currentRecord,
      ekstrakurikuler: [
        ...currentEkstra,
        { nama: 'Ekstrakurikuler Baru', predikat: 'A', keterangan: 'Aktif mengikuti kegiatan' }
      ]
    });
    showToast("Ekstrakurikuler baru ditambahkan.");
  };

  const handleUpdateEkstra = (index, key, val) => {
    const currentEkstra = [...(currentRecord.ekstrakurikuler || [])];
    currentEkstra[index] = { ...currentEkstra[index], [key]: val };
    onSavePresensi({ ...currentRecord, ekstrakurikuler: currentEkstra });
  };

  const handleDeleteEkstra = (index) => {
    const currentEkstra = (currentRecord.ekstrakurikuler || []).filter((_, idx) => idx !== index);
    onSavePresensi({ ...currentRecord, ekstrakurikuler: currentEkstra });
    showToast("Ekstrakurikuler dihapus.");
  };

  const handleAddPrestasi = () => {
    const currentPrestasi = currentRecord.prestasi || [];
    onSavePresensi({
      ...currentRecord,
      prestasi: [
        ...currentPrestasi,
        { nama: 'Juara Lomba Akademik/Tahfidz', tahun: new Date().getFullYear().toString() }
      ]
    });
    showToast("Prestasi baru ditambahkan.");
  };

  const handleUpdatePrestasi = (index, key, val) => {
    const currentPrestasi = [...(currentRecord.prestasi || [])];
    currentPrestasi[index] = { ...currentPrestasi[index], [key]: val };
    onSavePresensi({ ...currentRecord, prestasi: currentPrestasi });
  };

  const handleDeletePrestasi = (index) => {
    const currentPrestasi = (currentRecord.prestasi || []).filter((_, idx) => idx !== index);
    onSavePresensi({ ...currentRecord, prestasi: currentPrestasi });
    showToast("Prestasi dihapus.");
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Summary Statistik Daftar Hadir Kelas
  const summaryStats = useMemo(() => {
    let sumT = 0, sumS = 0, sumI = 0, sumA = 0;
    const hariEfektif = 75;
    const jmlSiswa = filteredSiswa.length || 1;
    filteredSiswa.forEach(s => {
      const r = getRecord(s.id);
      sumT += Number(r.terlambat) || 0;
      sumS += Number(r.sakit) || 0;
      sumI += Number(r.izin) || 0;
      sumA += Number(r.alpa) || 0;
    });
    const totalHariSekolah = jmlSiswa * hariEfektif;
    const pctT = ((sumT / totalHariSekolah) * 100).toFixed(2).replace('.', ',') + '%';
    const pctS = ((sumS / totalHariSekolah) * 100).toFixed(2).replace('.', ',') + '%';
    const pctI = ((sumI / totalHariSekolah) * 100).toFixed(2).replace('.', ',') + '%';
    const pctA = ((sumA / totalHariSekolah) * 100).toFixed(2).replace('.', ',') + '%';
    const tingkatKehadiran = (100 - ((sumS + sumI + sumA) / totalHariSekolah) * 100).toFixed(2).replace('.', ',') + '%';

    return {
      sumT, sumS, sumI, sumA,
      pctT, pctS, pctI, pctA,
      tingkatKehadiran,
      jmlSiswa: filteredSiswa.length,
      hariEfektif
    };
  }, [filteredSiswa, presensiList]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-2xl flex items-center space-x-2 animate-in slide-in-from-bottom">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Toolbar & Spreadsheet Tab Switcher */}
      <div className="no-print p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-emerald-800 text-amber-300 shadow-xs">
              <CalendarCheck className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Daftar Hadir Bulanan, Saran Wali Kelas & Ekstrakurikuler
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Sesuai Sheet <strong className="text-slate-700">Daftar Hadir</strong> & <strong className="text-slate-700">SARAN</strong> Master Spreadsheet SD Al-Imam Islamic School
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Rombel */}
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <School className="w-4 h-4 text-emerald-700" />
              <select
                value={selectedRombel}
                onChange={(e) => setSelectedRombel(e.target.value)}
                className="bg-transparent text-xs font-extrabold text-slate-800 focus:outline-hidden cursor-pointer"
              >
                <option value="1 Abdullah Ibnu Abbas">1 Abdullah Ibnu Abbas (21 Santri)</option>
                <option value="1 Abdullah Ibnu Umar">1 Abdullah Ibnu Umar (20 Santri)</option>
                <option value="SEMUA">Semua Rombel</option>
              </select>
            </div>

            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-amber-300" />
              <span>Cetak Lembar</span>
            </button>
          </div>
        </div>

        {/* 3 Spreadsheet Sub-Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100">
          {[
            { id: 'DAFTAR_HADIR', label: 'Sheet Daftar Hadir (Rekap Bulanan Juli–Des)', icon: Table, badge: `${summaryStats.tingkatKehadiran} Hadir` },
            { id: 'SARAN', label: 'Sheet SARAN - SARAN Wali Kelas', icon: MessageSquareText, badge: `${filteredSiswa.length} Deskripsi` },
            { id: 'DETAIL_SISWA', label: 'Input Per Siswa & Ekstrakurikuler', icon: UserCheck, badge: 'Detail' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-2 border cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-emerald-700'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-md ${
                  isActive ? 'bg-emerald-950 text-emerald-200' : 'bg-white text-slate-600 border border-slate-200'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
       * TAB 1: SHEET DAFTAR HADIR (REKAP ABSENSI SISWA BULANAN JULI - DESEMBER)
       * Persis Gambar 1: "REKAP ABSENSI SISWA" + "REKAPITULASI BULANAN"
       * ========================================================================= */}
      {activeSubTab === 'DAFTAR_HADIR' && (
        <div className="bg-white rounded-3xl border-2 border-slate-800 shadow-xl p-4 sm:p-6 lg:p-8 space-y-6 print:border-none print:shadow-none print:p-0">
          
          {/* Kop Rekap Absensi Siswa */}
          <div className="text-center border-b-2 border-blue-700 pb-3 space-y-0.5">
            <h2 className="text-lg sm:text-xl font-black text-blue-700 tracking-wide uppercase">
              SD AL-IMAM ISLAMIC SCHOOL
            </h2>
            <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase">
              REKAP ABSENSI SISWA • {selectedRombel.toUpperCase()}
            </h3>
          </div>

          {/* Tabel Matriks Bulanan (Juli - Desember) + Rekapitulasi Bulanan */}
          <div className="overflow-x-auto rounded-xl border-2 border-slate-900">
            <table className="w-full text-center text-[11px] border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-950 font-black border-b border-slate-900 uppercase">
                  <th rowSpan={2} className="py-2 px-1.5 border-r border-slate-900 w-8">NO</th>
                  <th rowSpan={2} className="py-2 px-3 border-r-2 border-slate-900 text-left min-w-[190px]">NAMA SISWA</th>
                  {BULAN_LIST.map((b) => (
                    <th key={b.key} colSpan={4} className="py-1 px-1 border-r border-slate-900 bg-slate-50">
                      {b.label}
                    </th>
                  ))}
                  <th colSpan={6} className="py-1 px-2 bg-amber-50 text-slate-950 border-l border-slate-900">
                    REKAPITULASI BULANAN
                  </th>
                </tr>
                <tr className="bg-slate-50 text-slate-900 font-bold border-b-2 border-slate-900 text-[10px]">
                  {BULAN_LIST.map((b) => (
                    <React.Fragment key={b.key}>
                      <th className="py-1 px-1 border-r border-slate-400 w-7">T</th>
                      <th className="py-1 px-1 border-r border-slate-400 w-7">S</th>
                      <th className="py-1 px-1 border-r border-slate-400 w-7">I</th>
                      <th className="py-1 px-1 border-r border-slate-900 w-7">A</th>
                    </React.Fragment>
                  ))}
                  <th className="py-1 px-1.5 border-r border-slate-800 bg-amber-50/60">Terlambat (t)</th>
                  <th className="py-1 px-1.5 border-r border-slate-800 bg-amber-50/60">Sakit (s)</th>
                  <th className="py-1 px-1.5 border-r border-slate-800 bg-amber-50/60">Izin (i)</th>
                  <th className="py-1 px-1.5 border-r border-slate-800 bg-amber-50/60">Alpa (a)</th>
                  <th className="py-1 px-2 border-r border-slate-800 bg-emerald-50 font-black">Jumlah</th>
                  <th className="py-1 px-2 bg-emerald-50 font-black">%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-400 text-slate-900 font-semibold">
                {filteredSiswa.map((siswa, idx) => {
                  const rec = getRecord(siswa.id);
                  const bulanan = rec.bulanan || {};
                  const he = Number(rec.hariEfektif) || 75;
                  const jmlHadir = rec.jumlahHadir !== undefined
                    ? rec.jumlahHadir
                    : Math.max(0, he - ((Number(rec.sakit) || 0) + (Number(rec.izin) || 0) + (Number(rec.alpa) || 0)));
                  const pctHadir = rec.persentaseHadir || (((jmlHadir / he) * 100).toFixed(1).replace('.', ',') + '%');

                  return (
                    <tr key={siswa.id} className="hover:bg-slate-50">
                      <td className="py-1 px-1.5 border-r border-slate-800 font-bold bg-slate-50">{idx + 1}</td>
                      <td className="py-1 px-2.5 border-r-2 border-slate-900 text-left font-bold text-slate-950 whitespace-nowrap">
                        {siswa.nama}
                      </td>
                      {BULAN_LIST.map((b) => {
                        const m = bulanan[b.key] || { t: 0, s: 0, i: 0, a: 0 };
                        return (
                          <React.Fragment key={b.key}>
                            {['t', 's', 'i', 'a'].map((sub, sIdx) => (
                              <td
                                key={sub}
                                className={`p-0.5 ${sIdx === 3 ? 'border-r border-slate-900' : 'border-r border-slate-300'}`}
                              >
                                <input
                                  type="number"
                                  min="0"
                                  max="31"
                                  value={m[sub] > 0 ? m[sub] : ''}
                                  onChange={(e) => handleBulananChange(siswa.id, b.key, sub, e.target.value)}
                                  className="w-6 text-center font-bold text-[11px] bg-transparent focus:bg-amber-50 focus:outline-hidden"
                                />
                              </td>
                            ))}
                          </React.Fragment>
                        );
                      })}
                      {/* Rekapitulasi Bulanan */}
                      <td className="py-1 px-1.5 border-r border-slate-800 font-bold bg-amber-50/20">
                        {rec.terlambat > 0 ? rec.terlambat : ''}
                      </td>
                      <td className="py-1 px-1.5 border-r border-slate-800 font-bold bg-amber-50/20">
                        {rec.sakit > 0 ? rec.sakit : ''}
                      </td>
                      <td className="py-1 px-1.5 border-r border-slate-800 font-bold bg-amber-50/20">
                        {rec.izin > 0 ? rec.izin : ''}
                      </td>
                      <td className="py-1 px-1.5 border-r border-slate-800 font-bold bg-amber-50/20">
                        {rec.alpa > 0 ? rec.alpa : ''}
                      </td>
                      <td className="py-1 px-2 border-r border-slate-800 font-black bg-emerald-50/40">
                        {jmlHadir}
                      </td>
                      <td className="py-1 px-2 font-black bg-emerald-50/40 text-emerald-950">
                        {pctHadir}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Ringkasan Bawah Persis Gambar 1 */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pt-2">
            <div className="text-xs text-slate-500 font-semibold">
              * Klik pada sel kolom bulan (T/S/I/A) untuk mengubah nilai absensi bulanan secara langsung.
            </div>

            <div className="border-2 border-slate-900 rounded-xl overflow-hidden text-xs font-black min-w-[320px]">
              <div className="grid grid-cols-5 bg-slate-100 border-b border-slate-900 text-center">
                <div className="p-1.5 border-r border-slate-900">JUMLAH</div>
                <div className="p-1.5 border-r border-slate-900">{summaryStats.sumT}</div>
                <div className="p-1.5 border-r border-slate-900">{summaryStats.sumS}</div>
                <div className="p-1.5 border-r border-slate-900">{summaryStats.sumI}</div>
                <div className="p-1.5">{summaryStats.sumA}</div>
              </div>
              <div className="grid grid-cols-5 bg-slate-50 border-b border-slate-900 text-center text-[11px]">
                <div className="p-1.5 border-r border-slate-900">%</div>
                <div className="p-1.5 border-r border-slate-900">{summaryStats.pctT}</div>
                <div className="p-1.5 border-r border-slate-900">{summaryStats.pctS}</div>
                <div className="p-1.5 border-r border-slate-900">{summaryStats.pctI}</div>
                <div className="p-1.5">{summaryStats.pctA}</div>
              </div>
              <div className="grid grid-cols-2 border-b border-slate-900 bg-white">
                <div className="p-1.5 px-3 border-r border-slate-900 text-rose-600">Tingkat Kehadiran</div>
                <div className="p-1.5 px-3 text-center text-rose-600">{summaryStats.tingkatKehadiran}</div>
              </div>
              <div className="grid grid-cols-2 border-b border-slate-900 bg-white">
                <div className="p-1.5 px-3 border-r border-slate-900">JUMLAH SISWA</div>
                <div className="p-1.5 px-3 text-center text-rose-600">{summaryStats.jmlSiswa}</div>
              </div>
              <div className="grid grid-cols-2 bg-white">
                <div className="p-1.5 px-3 border-r border-slate-900">HARI EFEKTIF</div>
                <div className="p-1.5 px-3 text-center text-rose-600">{summaryStats.hariEfektif}</div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
       * TAB 2: SHEET SARAN - SARAN WALI KELAS (PERSIS GAMBAR 4)
       * ========================================================================= */}
      {activeSubTab === 'SARAN' && (
        <div className="bg-[#92d050] rounded-3xl p-4 sm:p-6 border-2 border-slate-800 shadow-xl space-y-4 print:bg-white print:border-none print:shadow-none print:p-0">
          <div className="bg-yellow-300 border-2 border-slate-900 py-2 px-4 text-center font-black text-slate-950 text-sm sm:text-base uppercase tracking-wider shadow-2xs">
            SARAN - SARAN
          </div>

          <div className="bg-white rounded-xl border-2 border-slate-900 overflow-hidden">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-[#9bc2e6] text-slate-950 font-black border-b-2 border-slate-900">
                  <th className="py-2.5 px-2 border-r border-slate-900 w-12 text-center">No.</th>
                  <th className="py-2.5 px-3 border-r border-slate-900 w-64 text-center">Nama Siswa</th>
                  <th className="py-2.5 px-4 text-center">Deskripsi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-900">
                {filteredSiswa.map((siswa, idx) => {
                  const rec = getRecord(siswa.id);
                  return (
                    <tr key={siswa.id} className="border-b border-slate-800 hover:bg-slate-50">
                      <td className="py-2 px-2 border-r border-slate-800 text-center font-bold">{idx + 1}</td>
                      <td className="py-2 px-3 border-r border-slate-800 font-bold uppercase">{siswa.nama}</td>
                      <td className="p-1.5">
                        <textarea
                          rows={2}
                          value={rec.catatanWaliKelas || ''}
                          onChange={(e) => handleFieldChange(siswa.id, 'catatanWaliKelas', e.target.value)}
                          className="w-full p-1.5 rounded-lg border border-transparent hover:border-slate-300 focus:border-emerald-600 focus:bg-emerald-50/20 text-xs text-slate-900 leading-relaxed resize-none focus:outline-hidden font-serif"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
       * TAB 3: INPUT DETAIL PER SISWA & EKSTRAKURIKULER
       * ========================================================================= */}
      {activeSubTab === 'DETAIL_SISWA' && (
        <div className="space-y-6">
          {/* Siswa Selector Bar */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Pilih Siswa ({filteredSiswa.length} Santri):
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              {filteredSiswa.map(s => {
                const isSelected = currentSiswa?.id === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSiswaId(s.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center space-x-2 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-800 text-white border-emerald-900 shadow-2xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-emerald-50'
                    }`}
                  >
                    <img 
                      src={s.foto} 
                      alt={s.nama} 
                      className="w-5 h-5 rounded-full object-cover border border-white"
                    />
                    <span>{s.nama.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Rekap Presensi & Catatan (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                  <CalendarCheck className="w-4 h-4 text-emerald-700" />
                  <span>Rekapitulasi Ketidakhadiran: {currentSiswa?.nama}</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 text-center">
                    <span className="text-xs font-bold text-amber-800 block">Sakit (S)</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={currentRecord.sakit}
                      onChange={(e) => handleFieldChange(currentSiswa.id, 'sakit', Number(e.target.value) || 0)}
                      className="w-16 mx-auto text-center font-extrabold text-xl py-1 rounded-lg border border-amber-300 mt-2 bg-white"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">Hari</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-200 text-center">
                    <span className="text-xs font-bold text-sky-800 block">Izin (I)</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={currentRecord.izin}
                      onChange={(e) => handleFieldChange(currentSiswa.id, 'izin', Number(e.target.value) || 0)}
                      className="w-16 mx-auto text-center font-extrabold text-xl py-1 rounded-lg border border-sky-300 mt-2 bg-white"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">Hari</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 text-center">
                    <span className="text-xs font-bold text-rose-800 block">Tanpa Ket. (A)</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={currentRecord.alpa}
                      onChange={(e) => handleFieldChange(currentSiswa.id, 'alpa', Number(e.target.value) || 0)}
                      className="w-16 mx-auto text-center font-extrabold text-xl py-1 rounded-lg border border-rose-300 mt-2 bg-white"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">Hari</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-xs font-bold text-slate-700 block">Terlambat (T)</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={currentRecord.terlambat}
                      onChange={(e) => handleFieldChange(currentSiswa.id, 'terlambat', Number(e.target.value) || 0)}
                      className="w-16 mx-auto text-center font-extrabold text-xl py-1 rounded-lg border border-slate-300 mt-2 bg-white"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">Kali</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <span>Catatan & Saran Wali Kelas</span>
                </h3>
                <textarea
                  rows="4"
                  value={currentRecord.catatanWaliKelas || ''}
                  onChange={(e) => handleFieldChange(currentSiswa.id, 'catatanWaliKelas', e.target.value)}
                  className="w-full p-3 rounded-2xl border border-slate-200 text-xs text-slate-800 leading-relaxed focus:outline-hidden focus:border-emerald-500 resize-none font-medium"
                />
              </div>
            </div>

            {/* Right Column: Ekstrakurikuler & Prestasi (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Kegiatan Ekstrakurikuler Siswa</span>
                  </h3>
                  <button
                    onClick={handleAddEkstra}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200 transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Ekstra</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(currentRecord.ekstrakurikuler || []).map((ekstra, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={ekstra.nama}
                          onChange={(e) => handleUpdateEkstra(idx, 'nama', e.target.value)}
                          className="flex-1 p-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 bg-white"
                        />
                        <select
                          value={ekstra.predikat}
                          onChange={(e) => handleUpdateEkstra(idx, 'predikat', e.target.value)}
                          className="p-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 bg-white"
                        >
                          <option value="A">Sangat Baik (A)</option>
                          <option value="B">Baik (B)</option>
                          <option value="C">Cukup (C)</option>
                        </select>
                        <button
                          onClick={() => handleDeleteEkstra(idx)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={ekstra.keterangan}
                        onChange={(e) => handleUpdateEkstra(idx, 'keterangan', e.target.value)}
                        className="w-full p-1.5 rounded-lg border border-slate-200 text-[11px] text-slate-600 bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Prestasi & Penghargaan Siswa</span>
                  </h3>
                  <button
                    onClick={handleAddPrestasi}
                    className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Prestasi</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(currentRecord.prestasi || []).length === 0 ? (
                    <p className="text-xs text-slate-400 italic">Belum ada catatan prestasi yang ditambahkan.</p>
                  ) : (
                    (currentRecord.prestasi || []).map((prestasi, idx) => (
                      <div key={idx} className="p-3 rounded-2xl bg-amber-50/30 border border-amber-200 flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={prestasi.nama}
                          onChange={(e) => handleUpdatePrestasi(idx, 'nama', e.target.value)}
                          className="flex-1 p-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                        />
                        <input
                          type="text"
                          value={prestasi.tahun}
                          onChange={(e) => handleUpdatePrestasi(idx, 'tahun', e.target.value)}
                          className="w-16 p-1.5 rounded-lg border border-slate-200 text-xs text-center font-bold text-slate-800 bg-white"
                        />
                        <button
                          onClick={() => handleDeletePrestasi(idx)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
