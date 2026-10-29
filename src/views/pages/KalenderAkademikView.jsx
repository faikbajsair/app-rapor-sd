import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  Printer, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Award, 
  ShieldCheck, 
  Layers, 
  Info,
  CalendarCheck2,
  FileSpreadsheet,
  GraduationCap,
  ListChecks,
  Search,
  Filter,
  CheckCircle2,
  BookMarked,
  HeartHandshake,
  Users,
  Compass,
  Download
} from 'lucide-react';
import { 
  KALDIK_META, 
  KALDIK_SHEET_TABS,
  getKaldikSemester,
  REKAP_ANALISIS_HEK,
  DAFTAR_KEGIATAN_TERPROGRAM
} from '../../config/kaldikData';

export function KalenderAkademikView({ settings }) {
  // 4 Spreadsheet Tabs: 'gabungan' | 'kelas_1_5' | 'kelas_6' | 'program'
  const [activeSheetTab, setActiveSheetTab] = useState('gabungan');
  
  // Semester Filter: 'ALL' | 'SEM_1' | 'SEM_2'
  const [selectedSemester, setSelectedSemester] = useState('ALL');
  
  // View Modes (untuk Tab Kaldik Kalender): 'KALENDER' | 'AGENDA' | 'ANALISIS'
  const [activeViewMode, setActiveViewMode] = useState('KALENDER');
  
  // Modal Popup Tanggal
  const [selectedEventDate, setSelectedEventDate] = useState(null);

  // Search & Filter untuk Tab "0. Kegiatan Terprogram"
  const [programSearch, setProgramSearch] = useState('');
  const [programCategoryFilter, setProgramCategoryFilter] = useState('ALL');
  const [programSemesterFilter, setProgramSemesterFilter] = useState('ALL');

  // Ambil data bulan yang disesuaikan dengan Sheet yang aktif
  const monthsSem1 = useMemo(() => getKaldikSemester(1, activeSheetTab), [activeSheetTab]);
  const monthsSem2 = useMemo(() => getKaldikSemester(2, activeSheetTab), [activeSheetTab]);

  const monthsToDisplay = useMemo(() => {
    if (selectedSemester === 'SEM_1') return monthsSem1;
    if (selectedSemester === 'SEM_2') return monthsSem2;
    return [...monthsSem1, ...monthsSem2];
  }, [selectedSemester, monthsSem1, monthsSem2]);

  // Filter kegiatan terprogram untuk Sheet "0. Kegiatan Terprogram"
  const filteredPrograms = useMemo(() => {
    return DAFTAR_KEGIATAN_TERPROGRAM.filter((prog) => {
      const matchSearch = programSearch === '' || 
        prog.namaKegiatan.toLowerCase().includes(programSearch.toLowerCase()) ||
        prog.pj.toLowerCase().includes(programSearch.toLowerCase()) ||
        prog.sasaran.toLowerCase().includes(programSearch.toLowerCase()) ||
        prog.keterangan.toLowerCase().includes(programSearch.toLowerCase());

      const matchCategory = programCategoryFilter === 'ALL' || prog.kategori.toLowerCase().includes(programCategoryFilter.toLowerCase());
      const matchSemester = programSemesterFilter === 'ALL' || prog.semester === programSemesterFilter;

      return matchSearch && matchCategory && matchSemester;
    });
  }, [programSearch, programCategoryFilter, programSemesterFilter]);

  // Helper warna sel tanggal di kalender
  const getDateStyle = (dateData) => {
    if (!dateData) return 'bg-white text-slate-800 hover:bg-slate-100 border-slate-100';

    switch (dateData.tipe) {
      case 'hln':
      case 'libur':
      case 'pekan_tenang':
        return 'bg-red-600 text-white font-black shadow-2xs border-red-700 ring-1 ring-red-400';
      case 'ujian':
        return 'bg-amber-400 text-amber-950 font-black shadow-2xs border-amber-500';
      case 'rapor':
        return 'bg-blue-600 text-white font-black shadow-2xs border-blue-700 ring-2 ring-blue-300';
      case 'hef':
      case 'fakultatif':
        return 'bg-emerald-300 text-emerald-950 font-bold border-emerald-400';
      case 'ramadhan':
        return 'bg-teal-300 text-teal-950 font-bold border-teal-400';
      case 'quran':
        return 'bg-purple-300 text-purple-950 font-black border-purple-400';
      case 'tka':
      case 'kelas6':
        return 'bg-indigo-300 text-indigo-950 font-bold border-indigo-400';
      case 'rihlah':
        return 'bg-orange-400 text-white font-black border-orange-500 ring-2 ring-orange-200';
      case 'wisuda':
        return 'bg-cyan-600 text-white font-black border-cyan-700 ring-2 ring-cyan-300 animate-pulse';
      default:
        return 'bg-white text-slate-800 hover:bg-emerald-50 border-slate-200';
    }
  };

  const getCategoryBadgeClass = (kategori) => {
    switch (kategori) {
      case 'Kurikulum':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Al-Qur\'an':
      case 'Al-Qur\'an & Keagamaan':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Kesiswaan':
      case 'Kesiswaan & Bahasa':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Humas & Parenting':
      case 'Humas & PMB':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'GTK & Manajemen':
      case 'Evaluasi & Mutu':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'Kesehatan':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner Kaldik Resmi */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold text-emerald-100 border border-white/20">
              <CalendarCheck2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Kalender Pendidikan (Kaldik) & Agenda Terprogram Resmi 2026/2027</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {KALDIK_META.sekolah}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Panduan terintegrasi kalender akademik seluruh jenjang, jadwal khusus Fase A-C (Kelas 1-5), program intensif Kelas VI (US, Rihlah & Wisuda), serta katalog master kegiatan terprogram tahunan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-2xl bg-white text-emerald-950 font-black text-xs sm:text-sm shadow-md hover:bg-emerald-50 transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-emerald-700" />
              <span>Cetak Kaldik Resmi</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* =========================================================================
       * GOOGLE SPREADSHEET TABS BAR (4 LEMBAR RESMI SEKOLAH)
       * ========================================================================= */}
      <div className="bg-white p-2.5 rounded-3xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2 px-2 text-xs font-bold text-slate-500">
          <div className="flex items-center space-x-1.5">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Lembar Dokumen Resmi Spreadsheet (Pilih Tab):</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-400">
            Ditetapkan: {KALDIK_META.tempatPenetapan}, {KALDIK_META.tanggalPenetapan} oleh {KALDIK_META.kepalaSekolah}
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {KALDIK_SHEET_TABS.map((tab) => {
            const isActive = activeSheetTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSheetTab(tab.id)}
                className={`p-3 rounded-2xl text-left transition-all border cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-500 text-emerald-950 shadow-xs ring-2 ring-emerald-500/20'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isActive ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tab.badge}
                  </span>
                  {isActive && <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0" />}
                </div>

                <div className="font-extrabold text-xs sm:text-sm tracking-tight truncate">
                  {tab.sheetName}
                </div>
                
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                  {tab.description}
                </p>

                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
       * KONTEN SHEET 1, 2, DAN 3: KALDIK (GABUNGAN / KELAS 1-5 / KELAS 6)
       * ========================================================================= */}
      {activeSheetTab !== 'program' && (
        <div className="space-y-6">

          {/* Sub Controls: Filter Semester & Sub-Mode Tampilan */}
          <div className="bg-white p-3.5 rounded-3xl border border-slate-200 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Semester Filter */}
            <div className="flex items-center space-x-1.5 p-1 bg-slate-100 rounded-2xl">
              {[
                { id: 'ALL', label: '1 Tahun Penuh (2026/2027)' },
                { id: 'SEM_1', label: 'Semester 1 (Ganjil)' },
                { id: 'SEM_2', label: 'Semester 2 (Genap)' }
              ].map((sem) => (
                <button
                  key={sem.id}
                  onClick={() => setSelectedSemester(sem.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                    selectedSemester === sem.id
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {sem.label}
                </button>
              ))}
            </div>

            {/* View Mode Tabs */}
            <div className="flex items-center space-x-1.5 p-1 bg-slate-100 rounded-2xl">
              {[
                { id: 'KALENDER', label: 'Kalender Bulanan', icon: CalendarIcon },
                { id: 'AGENDA', label: 'Daftar Agenda Kegiatan', icon: Clock },
                { id: 'ANALISIS', label: 'Tabel Analisis HEK (Resmi)', icon: FileSpreadsheet }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveViewMode(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
                      activeViewMode === tab.id
                        ? 'bg-white text-slate-800 shadow-xs border border-slate-200'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Banner Informasi Penyesuaian Jenjang */}
          {activeSheetTab === 'kelas_6' && (
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 flex items-start space-x-3 text-xs">
              <GraduationCap className="w-5 h-5 text-indigo-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-black block text-sm">Mode Khusus: Kaldik Siswa Kelas VI (Akhir Jenjang)</span>
                <p className="mt-0.5 text-indigo-800 leading-relaxed">
                  Menampilkan agenda intensif: Pendalaman Materi TKA (Okt, Nov, Jan, Feb), Perkiraan Ujian Praktik (12-20 Apr), <strong>Pekan Tenang (21-23 Apr - Berwarna Merah)</strong>, Perkiraan US (3-14 Mei), Rihlah Kelas VI (27 Mei), serta <strong>Wisuda Kelulusan Kelas VI (22 Juni - Berwarna Biru)</strong>.
                </p>
              </div>
            </div>
          )}

          {activeSheetTab === 'kelas_1_5' && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start space-x-3 text-xs">
              <BookOpen className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-black block text-sm">Mode Khusus: Kaldik Fase A, B & C (Kelas 1 s.d 5)</span>
                <p className="mt-0.5 text-emerald-800 leading-relaxed">
                  Fokus pada pembelajaran reguler, Kunjungan Tematik Siswa (22 Apr), Asesmen Sumatif Akhir Tahun/Fase (2-11 Jun), Class Meeting II (16-18 Jun), dan Libur Akhir Tahun Pelajaran (28 Jun - 9 Jul).
                </p>
              </div>
            </div>
          )}

          {/* Color Legend */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-wrap items-center gap-3 text-xs">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px] mr-1">
              Keterangan Warna Kalender:
            </span>
            <div className="flex items-center space-x-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-red-600 border border-red-700 shrink-0" />
              <span className="font-semibold text-slate-700">Libur Nasional / Cuti / Pekan Tenang</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-amber-400 border border-amber-500 shrink-0" />
              <span className="font-semibold text-slate-700">Asesmen Sumatif (PTS / PAS / US)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-emerald-300 border border-emerald-400 shrink-0" />
              <span className="font-semibold text-slate-700">Hari Efektif Fakultatif (HEF)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-blue-600 border border-blue-700 shrink-0" />
              <span className="font-semibold text-slate-700">Pembagian Rapor & Parenting</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-purple-300 border border-purple-400 shrink-0" />
              <span className="font-semibold text-slate-700">Munaqasyah / Al-Qur'an</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-cyan-600 border border-cyan-700 shrink-0" />
              <span className="font-semibold text-slate-700">Wisuda Kelas VI</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-white border border-slate-300 shrink-0" />
              <span className="font-semibold text-slate-700">Hari Efektif Belajar (HEB)</span>
            </div>
          </div>

          {/* =========================================================================
           * SUB-VIEW 1: KALENDER BULANAN (GRID RESMI)
           * ========================================================================= */}
          {activeViewMode === 'KALENDER' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {monthsToDisplay.map((m) => {
                const daysInMonth = m.daysInMonth;
                const startDay = m.startDayOfWeek;
                const adjustedStart = (startDay + 6) % 7; 
                const blankCells = Array.from({ length: adjustedStart });
                const dayCells = Array.from({ length: daysInMonth }, (_, i) => i + 1);

                return (
                  <div 
                    key={m.id}
                    className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between hover:border-emerald-300 transition-all"
                  >
                    <div>
                      {/* Month Card Header */}
                      <div className="p-4 bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex items-center justify-between">
                        <div>
                          <h3 className="font-black text-sm uppercase tracking-wider">{m.bulan}</h3>
                          <span className="text-[11px] text-emerald-200 font-medium">
                            HEB: {m.analisis.heb.jml} Hari • HEF: {m.analisis.hef.jml} Hari
                          </span>
                        </div>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 font-bold">
                          {m.analisis.persenHek} HEK
                        </span>
                      </div>

                      {/* Day of Week Headers */}
                      <div className="grid grid-cols-7 text-center py-2 bg-slate-100 text-[11px] font-black border-b border-slate-200 text-slate-700">
                        <span className="text-slate-800">Sn</span>
                        <span className="text-slate-800">Sl</span>
                        <span className="text-slate-800">Rb</span>
                        <span className="text-slate-800">Km</span>
                        <span className="text-slate-800">Jm</span>
                        <span className="text-red-700 font-extrabold">Sb</span>
                        <span className="text-red-700 font-extrabold">Mg</span>
                      </div>

                      {/* Calendar Matrix Days */}
                      <div className="p-3 grid grid-cols-7 gap-1 text-center text-xs">
                        {blankCells.map((_, idx) => (
                          <div key={`blank-${idx}`} className="h-9 w-full" />
                        ))}

                        {dayCells.map((dayNum) => {
                          const dateKey = String(dayNum);
                          const isSpecial = m.specialDates?.[dateKey];
                          const style = getDateStyle(isSpecial);

                          return (
                            <div
                              key={`day-${dayNum}`}
                              onClick={() => setSelectedEventDate({ day: dayNum, bulan: m.bulan, info: isSpecial })}
                              title={isSpecial ? `${isSpecial.note || 'Kegiatan Terprogram'}` : `Hari Efektif Belajar`}
                              className={`h-9 w-full rounded-xl flex items-center justify-center font-bold border transition-all cursor-pointer relative group ${style}`}
                            >
                              <span>{dayNum}</span>
                              {isSpecial && (
                                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                              )}
                            </div>
                          );
                        })}
                      </div>

                    </div>

                    {/* Monthly Activity List / Agenda */}
                    <div className="p-3.5 bg-slate-50 border-t border-slate-100 text-xs space-y-2">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center justify-between">
                        <span>Agenda {m.bulan.split(' ')[0]}:</span>
                        <span className="text-emerald-700 font-semibold">{m.kegiatan.length} Kegiatan</span>
                      </div>
                      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                        {m.kegiatan.map((keg, idx) => (
                          <div key={idx} className="flex items-start space-x-2 text-[11px] leading-tight">
                            <span className="font-extrabold text-emerald-900 bg-emerald-100 px-1.5 py-0.5 rounded text-[10px] shrink-0">
                              {keg.tgl}
                            </span>
                            <span className="text-slate-700 font-medium">
                              {keg.nama}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

          {/* =========================================================================
           * SUB-VIEW 2: DAFTAR AGENDA KEGIATAN PER BULAN
           * ========================================================================= */}
          {activeViewMode === 'AGENDA' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div>
                  <h2 className="text-base font-extrabold text-slate-800">
                    Agenda Kegiatan Terjadwal - {activeSheetTab === 'kelas_6' ? 'Khusus Kelas VI' : activeSheetTab === 'kelas_1_5' ? 'Fase A-C (Kelas 1-5)' : 'Seluruh Jenjang'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Rangkaian pelaksanaan asesmen sumatif, kegiatan Al-Qur'an, agenda kesiswaan, dan hari libur resmi
                  </p>
                </div>
                <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs">
                  T.P 2026/2027
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {monthsToDisplay.map((m) => (
                  <div key={m.id} className="p-5 space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                      <h3 className="font-black text-sm text-slate-800 uppercase tracking-wide">
                        {m.bulan}
                      </h3>
                      <span className="text-xs text-slate-400">({m.kegiatan.length} Agenda)</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pl-4">
                      {m.kegiatan.map((keg, idx) => (
                        <div 
                          key={idx}
                          className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 transition-all flex items-start space-x-3 text-xs"
                        >
                          <span className="px-2 py-1 rounded-lg bg-emerald-800 text-white font-extrabold text-[10px] shrink-0">
                            {keg.tgl}
                          </span>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-800">
                              {keg.nama}
                            </div>
                            {keg.sasaran && (
                              <div className="text-[10px] text-slate-500 mt-0.5">
                                Sasaran: <span className="font-medium text-slate-700">{keg.sasaran}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
           * SUB-VIEW 3: TABEL ANALISIS HARI EFEKTIF BELAJAR (HEK)
           * ========================================================================= */}
          {activeViewMode === 'ANALISIS' && (
            <div className="space-y-6">
              
              {/* Semester 1 Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="p-4 bg-emerald-950 text-white flex items-center justify-between">
                  <h2 className="font-extrabold text-sm sm:text-base">
                    ANALISIS HARI EFEKTIF KERJA SDM PENDIDIKAN AI IS SEMESTER-1 T.P 2026/2027
                  </h2>
                  <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold">
                    Total HEB: 78 Hari
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-center text-[11px]">
                        <th rowSpan="2" className="py-2.5 px-3 text-left w-36">Bulan</th>
                        <th colSpan="7" className="py-1 px-2 bg-emerald-100 text-emerald-900 border-r border-slate-200">
                          ∑ Hari Efektif Belajar (HEB)
                        </th>
                        <th colSpan="7" className="py-1 px-2 bg-yellow-100 text-yellow-900 border-r border-slate-200">
                          ∑ Hari Efektif Fakultatif (HEF)
                        </th>
                        <th colSpan="7" className="py-1 px-2 bg-red-100 text-red-900 border-r border-slate-200">
                          ∑ Hari Libur Nasional (HLN)
                        </th>
                        <th rowSpan="2" className="py-2.5 px-2 bg-slate-200 text-slate-800 w-16">% HEK</th>
                      </tr>
                      <tr className="bg-slate-50 text-[10px] text-slate-600 font-black border-b border-slate-200 text-center">
                        <th>Sn</th><th>Sl</th><th>Rb</th><th>Km</th><th>Jm</th><th>Sb</th><th className="bg-emerald-200/80 font-black">Jml</th>
                        <th>Sn</th><th>Sl</th><th>Rb</th><th>Km</th><th>Jm</th><th>Sb</th><th className="bg-yellow-200/80 font-black">Jml</th>
                        <th>Sn</th><th>Sl</th><th>Rb</th><th>Km</th><th>Jm</th><th>Sb</th><th className="bg-red-200/80 font-black">Jml</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-center text-xs text-slate-700">
                      {monthsSem1.map((m) => (
                        <tr key={m.id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 text-left font-bold text-slate-800">{m.bulan}</td>
                          <td>{m.analisis.heb.sn}</td><td>{m.analisis.heb.sl}</td><td>{m.analisis.heb.rb}</td><td>{m.analisis.heb.km}</td><td>{m.analisis.heb.jm}</td><td>{m.analisis.heb.sb}</td>
                          <td className="font-black bg-emerald-50 text-emerald-900">{m.analisis.heb.jml}</td>
                          <td>{m.analisis.hef.sn}</td><td>{m.analisis.hef.sl}</td><td>{m.analisis.hef.rb}</td><td>{m.analisis.hef.km}</td><td>{m.analisis.hef.jm}</td><td>{m.analisis.hef.sb}</td>
                          <td className="font-black bg-yellow-50 text-yellow-900">{m.analisis.hef.jml}</td>
                          <td>{m.analisis.hln.sn}</td><td>{m.analisis.hln.sl}</td><td>{m.analisis.hln.rb}</td><td>{m.analisis.hln.km}</td><td>{m.analisis.hln.jm}</td><td>{m.analisis.hln.sb}</td>
                          <td className="font-black bg-red-50 text-red-900">{m.analisis.hln.jml}</td>
                          <td className="font-extrabold bg-slate-100">{m.analisis.persenHek}</td>
                        </tr>
                      ))}
                      <tr className="bg-slate-100 font-black text-slate-800 border-t-2 border-slate-300">
                        <td className="py-2.5 px-3 text-left">JUMLAH SEMESTER 1</td>
                        <td>13</td><td>15</td><td>17</td><td>16</td><td>17</td><td>0</td>
                        <td className="bg-emerald-200 text-emerald-950 font-black">78</td>
                        <td>10</td><td>8</td><td>6</td><td>7</td><td>6</td><td>0</td>
                        <td className="bg-yellow-200 text-yellow-950 font-black">37</td>
                        <td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td>
                        <td className="bg-red-200 text-red-950 font-black">4</td>
                        <td className="bg-slate-200">100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Semester 2 Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="p-4 bg-teal-950 text-white flex items-center justify-between">
                  <h2 className="font-extrabold text-sm sm:text-base">
                    ANALISIS HARI EFEKTIF KERJA SDM PENDIDIKAN AI IS SEMESTER-2 T.P 2026/2027
                  </h2>
                  <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold">
                    Total HEB: 72 Hari
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-center text-[11px]">
                        <th rowSpan="2" className="py-2.5 px-3 text-left w-36">Bulan</th>
                        <th colSpan="7" className="py-1 px-2 bg-teal-100 text-teal-900 border-r border-slate-200">
                          ∑ Hari Efektif Belajar (HEB)
                        </th>
                        <th colSpan="7" className="py-1 px-2 bg-yellow-100 text-yellow-900 border-r border-slate-200">
                          ∑ Hari Efektif Fakultatif (HEF)
                        </th>
                        <th colSpan="7" className="py-1 px-2 bg-red-100 text-red-900 border-r border-slate-200">
                          ∑ Hari Libur Nasional (HLN)
                        </th>
                        <th rowSpan="2" className="py-2.5 px-2 bg-slate-200 text-slate-800 w-16">% HEK</th>
                      </tr>
                      <tr className="bg-slate-50 text-[10px] text-slate-600 font-black border-b border-slate-200 text-center">
                        <th>Sn</th><th>Sl</th><th>Rb</th><th>Km</th><th>Jm</th><th>Sb</th><th className="bg-teal-200/80 font-black">Jml</th>
                        <th>Sn</th><th>Sl</th><th>Rb</th><th>Km</th><th>Jm</th><th>Sb</th><th className="bg-yellow-200/80 font-black">Jml</th>
                        <th>Sn</th><th>Sl</th><th>Rb</th><th>Km</th><th>Jm</th><th>Sb</th><th className="bg-red-200/80 font-black">Jml</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-center text-xs text-slate-700">
                      {monthsSem2.map((m) => (
                        <tr key={m.id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 text-left font-bold text-slate-800">{m.bulan}</td>
                          <td>{m.analisis.heb.sn}</td><td>{m.analisis.heb.sl}</td><td>{m.analisis.heb.rb}</td><td>{m.analisis.heb.km}</td><td>{m.analisis.heb.jm}</td><td>{m.analisis.heb.sb}</td>
                          <td className="font-black bg-teal-50 text-teal-900">{m.analisis.heb.jml}</td>
                          <td>{m.analisis.hef.sn}</td><td>{m.analisis.hef.sl}</td><td>{m.analisis.hef.rb}</td><td>{m.analisis.hef.km}</td><td>{m.analisis.hef.jm}</td><td>{m.analisis.hef.sb}</td>
                          <td className="font-black bg-yellow-50 text-yellow-900">{m.analisis.hef.jml}</td>
                          <td>{m.analisis.hln.sn}</td><td>{m.analisis.hln.sl}</td><td>{m.analisis.hln.rb}</td><td>{m.analisis.hln.km}</td><td>{m.analisis.hln.jm}</td><td>{m.analisis.hln.sb}</td>
                          <td className="font-black bg-red-50 text-red-900">{m.analisis.hln.jml}</td>
                          <td className="font-extrabold bg-slate-100">{m.analisis.persenHek}</td>
                        </tr>
                      ))}
                      <tr className="bg-slate-100 font-black text-slate-800 border-t-2 border-slate-300">
                        <td className="py-2.5 px-3 text-left">JUMLAH SEMESTER 2</td>
                        <td>13</td><td>14</td><td>16</td><td>15</td><td>14</td><td>0</td>
                        <td className="bg-teal-200 text-teal-950 font-black">72</td>
                        <td>8</td><td>5</td><td>5</td><td>6</td><td>6</td><td>0</td>
                        <td className="bg-yellow-200 text-yellow-950 font-black">30</td>
                        <td>4</td><td>5</td><td>3</td><td>2</td><td>3</td><td>0</td>
                        <td className="bg-red-200 text-red-950 font-black">17</td>
                        <td className="bg-slate-200">100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Rekapitulasi Tahunan & Pengesahan Resmi */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-xs text-slate-600">
                  <div className="font-bold text-slate-800 text-sm">Ringkasan Beban Belajar Tahunan AI IS:</div>
                  <p>• Hari Efektif Belajar (HEB): <strong>150 Hari</strong> (78 Sem 1 + 72 Sem 2)</p>
                  <p>• Hari Efektif Fakultatif (HEF): <strong>67 Hari</strong> (37 Sem 1 + 30 Sem 2)</p>
                  <p>• Hari Libur Nasional (HLN): <strong>21 Hari</strong> (4 Sem 1 + 17 Sem 2)</p>
                  <p className="text-emerald-700 font-semibold pt-1">
                    Memenuhi standar minimal kalender akademik kurikulum nasional (136 - 152 hari).
                  </p>
                </div>

                <div className="text-right text-xs">
                  <span className="text-slate-500 block">{KALDIK_META.tempatPenetapan}, {KALDIK_META.tanggalPenetapan}</span>
                  <span className="font-bold text-slate-700 block mb-10">Kepala Sekolah,</span>
                  <span className="font-black text-sm text-slate-900 underline block">{KALDIK_META.kepalaSekolah}</span>
                  <span className="text-[11px] text-emerald-700 font-semibold block mt-1">✓ Ditetapkan & Berlaku Resmi</span>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* =========================================================================
       * KONTEN SHEET 4: "0. Kegiatan Terprogram" (KATALOG MASTER AGENDA TAHUNAN)
       * ========================================================================= */}
      {activeSheetTab === 'program' && (
        <div className="space-y-6">

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-400 font-bold uppercase">Total Agenda</span>
              <div className="text-2xl font-black text-slate-800 mt-1">
                {DAFTAR_KEGIATAN_TERPROGRAM.length}
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold">Tahun Pelajaran 2026/2027</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-400 font-bold uppercase">Semester 1</span>
              <div className="text-2xl font-black text-emerald-700 mt-1">
                {DAFTAR_KEGIATAN_TERPROGRAM.filter(p => p.semester === 'Semester 1').length}
              </div>
              <span className="text-[11px] text-slate-500 font-semibold">Juli s.d Desember 2026</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-400 font-bold uppercase">Semester 2</span>
              <div className="text-2xl font-black text-teal-700 mt-1">
                {DAFTAR_KEGIATAN_TERPROGRAM.filter(p => p.semester === 'Semester 2').length}
              </div>
              <span className="text-[11px] text-slate-500 font-semibold">Januari s.d Juni 2027</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-400 font-bold uppercase">Program Qur'an</span>
              <div className="text-2xl font-black text-purple-700 mt-1">
                {DAFTAR_KEGIATAN_TERPROGRAM.filter(p => p.kategori.includes('Qur\'an')).length}
              </div>
              <span className="text-[11px] text-purple-600 font-semibold">Camp, Munaqasyah & Tasmi'</span>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
            
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={programSearch}
                onChange={(e) => setProgramSearch(e.target.value)}
                placeholder="Cari program, penanggung jawab, sasaran..."
                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-emerald-600 focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {/* Filter Semester */}
              <select
                value={programSemesterFilter}
                onChange={(e) => setProgramSemesterFilter(e.target.value)}
                className="px-3 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
              >
                <option value="ALL">Semua Semester</option>
                <option value="Semester 1">Semester 1 (Ganjil)</option>
                <option value="Semester 2">Semester 2 (Genap)</option>
              </select>

              {/* Filter Kategori */}
              <select
                value={programCategoryFilter}
                onChange={(e) => setProgramCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
              >
                <option value="ALL">Semua Kategori</option>
                <option value="Kurikulum">Kurikulum</option>
                <option value="Kesiswaan">Kesiswaan</option>
                <option value="Al-Qur'an">Al-Qur'an</option>
                <option value="Humas">Humas & Parenting</option>
                <option value="GTK">GTK & Manajemen</option>
                <option value="Kesehatan">Kesehatan</option>
              </select>
            </div>

          </div>

          {/* Table of Program Terprogram */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-4 bg-slate-800 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ListChecks className="w-5 h-5 text-emerald-400" />
                <h2 className="font-extrabold text-sm sm:text-base">
                  MASTER JADWAL KEGIATAN TERPROGRAM AL-IMAM ISLAMIC SCHOOL
                </h2>
              </div>
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold">
                {filteredPrograms.length} Kegiatan Ditemukan
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px]">
                    <th className="py-3 px-3 text-center w-12">No</th>
                    <th className="py-3 px-3 w-40">Waktu / Tanggal</th>
                    <th className="py-3 px-3 min-w-56">Nama Program / Kegiatan</th>
                    <th className="py-3 px-3 w-32">Kategori</th>
                    <th className="py-3 px-3 w-44">Sasaran Peserta</th>
                    <th className="py-3 px-3 w-40">Penanggung Jawab</th>
                    <th className="py-3 px-3 min-w-48">Rincian & Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredPrograms.map((prog) => (
                    <tr key={prog.no} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 text-center font-bold text-slate-400">
                        {prog.no}
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-extrabold text-slate-800 block">
                          {prog.tanggal}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {prog.semester}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-900 block text-xs">
                          {prog.namaKegiatan}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-block ${getCategoryBadgeClass(prog.kategori)}`}>
                          {prog.kategori}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[11px] font-medium text-slate-600">
                        {prog.sasaran}
                      </td>
                      <td className="py-3 px-3 text-[11px] font-semibold text-emerald-800">
                        {prog.pj}
                      </td>
                      <td className="py-3 px-3 text-[11px] text-slate-500 leading-relaxed">
                        {prog.keterangan}
                      </td>
                    </tr>
                  ))}
                  {filteredPrograms.length === 0 && (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-slate-400 font-medium">
                        Tidak ada kegiatan yang sesuai dengan kriteria pencarian.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Summary */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span>Menampilkan {filteredPrograms.length} dari {DAFTAR_KEGIATAN_TERPROGRAM.length} kegiatan terprogram resmi.</span>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-900 transition-all flex items-center space-x-1.5 cursor-pointer text-xs"
              >
                <Printer className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cetak Lembar Program Kerja</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
       * POPUP MODAL DETAIL TANGGAL KALENDER
       * ========================================================================= */}
      {selectedEventDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-2xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Detail Kalender</span>
                <h3 className="text-base font-black text-slate-800">
                  {selectedEventDate.day} {selectedEventDate.bulan}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEventDate(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="font-black text-slate-900 text-sm">
                {selectedEventDate.info?.note || 'Hari Efektif Belajar (HEB)'}
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {selectedEventDate.info?.note 
                  ? 'Agenda resmi terprogram berdasarkan kalender pendidikan Al-Imam Islamic School (AI IS).'
                  : 'Kegiatan Pembelajaran Tatap Muka Aktif Normal.'}
              </p>
              {selectedEventDate.info?.tipe && (
                <div className="pt-1">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Tipe: {selectedEventDate.info.tipe.toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedEventDate(null)}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer transition-all"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
export default KalenderAkademikView;
