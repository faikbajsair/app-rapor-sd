import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Users,
  Award,
  CalendarCheck,
  CheckCircle2,
  FileText,
  Printer,
  ChevronRight,
  Sparkles,
  School,
  HeartPulse,
  Package,
  FileSpreadsheet,
  Building2,
  Clock,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Search,
  Plus,
  Trash2,
  Filter,
  ArrowRight,
  Compass,
  Smile,
  GraduationCap,
  Calendar,
  Layers,
  Info
} from 'lucide-react';
import { SEKOLAH_IDENTITAS, DAFTAR_KELAS } from '../../config/jadwalData';
import {
  SISWA_KELAS_1_UMAR,
  WALI_KELAS_ADMINISTRASI,
  KATA_PENGANTAR_TEXT,
  VISI_MISI,
  PEMBIASAAN_SEKOLAH,
  PEMBIASAAN_GURU,
  TATA_TERTIB,
  TATA_TERTIB_GURU,
  TATA_TERTIB_KELAS,
  GOALS_PROGRAM_KELAS_2026_2027,
  PIKET_KELAS_DEFAULT,
  SARPRAS_KELAS_DEFAULT,
  CATATAN_ANEKDOT_DEFAULT,
  DAFTAR_PARENTING_DEFAULT,
  MAPEL_ADMINISTRASI
} from '../../config/administrasiData';

export function AdministrasiWaliKelasView({ currentUser, currentRole, settings, onNavigate }) {
  // Main Navigation Tab
  // 'HOME' | 'COVER' | 'PENGANTAR' | 'IDENTITAS' | 'DATA_SISWA' | 'VISI_MISI' | 
  // 'PEMBIASAAN' | 'TATA_TERTIB' | 'PROGRAM_KELAS' | 'PIKET' | 'KESEHATAN' | 
  // 'SARPRAS' | 'ANECDOTED' | 'PARENTING'
  const [activeTab, setActiveTab] = useState('HOME');

  // Selected Class (Default to 1Umar or matching currentUser)
  const [selectedKelasId, setSelectedKelasId] = useState(() => {
    if (currentUser?.kelasDiampu && currentUser.kelasDiampu.length > 0) {
      const match = DAFTAR_KELAS.find(k => 
        currentUser.kelasDiampu.some(kd => k.nama.toLowerCase().includes(kd.toLowerCase()) || kd.toLowerCase().includes(k.nama.toLowerCase()))
      );
      if (match) return match.id;
    }
    return '1Umar';
  });

  // Search in Data Siswa
  const [searchSiswa, setSearchSiswa] = useState('');
  const [filterJk, setFilterJk] = useState('ALL');

  // Anecdote dynamic list state
  const [anecdoteList, setAnecdoteList] = useState(CATATAN_ANEKDOT_DEFAULT);
  const [isAddingAnecdote, setIsAddingAnecdote] = useState(false);
  const [newAnecdote, setNewAnecdote] = useState({
    tanggal: new Date().toISOString().split('T')[0],
    namaSiswa: '',
    peristiwa: '',
    analisis: '',
    tindakLanjut: ''
  });

  // Current Class & Wali Kelas Information
  const currentKelasObj = useMemo(() => {
    return DAFTAR_KELAS.find(k => k.id === selectedKelasId) || DAFTAR_KELAS[0];
  }, [selectedKelasId]);

  const currentWaliKelas = useMemo(() => {
    return WALI_KELAS_ADMINISTRASI[selectedKelasId] || {
      kelas: currentKelasObj.nama,
      waliKelas: currentKelasObj.wali || currentKelasObj.waliKelas || "Wali Kelas",
      nip: "-",
      nuptk: "-",
      tempatLahir: "Bogor",
      tanggalLahir: "01 Januari 1995",
      pendidikanTerakhir: "S1",
      jabatanGuru: "Guru Kelas",
      pangkatGol: "-",
      tugasMengajarKelas: currentKelasObj.tingkat,
      tahunAjaran: "2026-2027",
      namaSekolah: "SD Al Imam Islamic School",
      npsn: SEKOLAH_IDENTITAS.npsn,
      nss: SEKOLAH_IDENTITAS.nss,
      alamat: SEKOLAH_IDENTITAS.alamat,
      kelurahanDesa: "Limusnunggal",
      kecamatan: "Cileungsi",
      kabupaten: "Bogor",
      provinsi: "Jawa Barat"
    };
  }, [selectedKelasId, currentKelasObj]);

  // Filtered Siswa
  const filteredSiswa = useMemo(() => {
    return SISWA_KELAS_1_UMAR.filter(s => {
      const matchName = s.nama.toLowerCase().includes(searchSiswa.toLowerCase()) || s.nis.includes(searchSiswa);
      const matchJk = filterJk === 'ALL' || s.jk === filterJk;
      return matchName && matchJk;
    });
  }, [searchSiswa, filterJk]);

  // Handle add anecdote
  const handleSaveAnecdote = (e) => {
    e.preventDefault();
    if (!newAnecdote.namaSiswa || !newAnecdote.peristiwa) return;

    const entry = {
      id: `AN_${Date.now()}`,
      ...newAnecdote,
      pencatat: currentWaliKelas.waliKelas
    };

    setAnecdoteList([entry, ...anecdoteList]);
    setNewAnecdote({
      tanggal: new Date().toISOString().split('T')[0],
      namaSiswa: '',
      peristiwa: '',
      analisis: '',
      tindakLanjut: ''
    });
    setIsAddingAnecdote(false);
  };

  return (
    <div className="space-y-6">

      {/* =========================================================================
       * BANNER HEADER: ADMINISTRASI WALI KELAS SD AL-IMAM
       * ========================================================================= */}
      <div className="no-print relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 text-white p-6 sm:p-8 shadow-xl border border-emerald-800">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-700/80 text-emerald-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Buku Kerja Guru & Administrasi Resmi T.P 2026/2027</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight flex items-center gap-3">
              <span>ADMINISTRASI WALI KELAS</span>
            </h1>

            <p className="text-emerald-100 text-xs sm:text-sm max-w-2xl font-medium leading-relaxed">
              Panduan lengkap tata kelola administrasi wali kelas, buku kerja I & II, data santri, profil kelas, dan pembiasaan adab islami mengacu pada dokumen master spreadsheet SD Al-Imam Islamic School.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-200">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-800/60 border border-emerald-700">
                Wali Kelas: <strong className="text-white">{currentWaliKelas.waliKelas}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-800/60 border border-emerald-700">
                Rombel: <strong className="text-white">{currentWaliKelas.kelas}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-800/60 border border-emerald-700">
                Motto: <strong className="text-amber-300">BERAQIDAH - BERAKHLAK - BERPRESTASI</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Class Selector Dropdown */}
            <div className="flex items-center space-x-1.5 bg-white/10 p-1.5 rounded-2xl border border-emerald-700/60 backdrop-blur-md">
              <School className="w-4 h-4 text-emerald-300 ml-1.5" />
              <select
                value={selectedKelasId}
                onChange={(e) => setSelectedKelasId(e.target.value)}
                className="bg-transparent text-white font-black text-xs sm:text-sm px-2 py-1 focus:outline-none cursor-pointer"
              >
                {DAFTAR_KELAS.map((k) => (
                  <option key={k.id} value={k.id} className="text-slate-900 font-bold">
                    {k.nama} ({((k.wali || k.waliKelas || '')).split(',')[0]})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-2xl bg-white text-emerald-950 font-black text-xs sm:text-sm shadow-md hover:bg-emerald-50 transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-emerald-700" />
              <span>Cetak Lembar Dokumen</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* =========================================================================
       * BILAH TAB NAVIGASI ADMINISTRASI WALI KELAS (PERSIS SPREADSHEET TABS)
       * ========================================================================= */}
      <div className="no-print bg-white p-2.5 rounded-3xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2 px-2 text-xs font-bold text-slate-500">
          <div className="flex items-center space-x-1.5">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Pilih Lembar Administrasi (Sesuai Spreadsheet Plan Guru 2026/2027):</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-400">
            NPSN: {SEKOLAH_IDENTITAS.npsn} • SD Al-Imam
          </span>
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'HOME', label: 'Dashboard Hub', badge: 'Menu Utama' },
            { id: 'COVER', label: 'Cover Sampul', badge: 'Format Cetak' },
            { id: 'PENGANTAR', label: 'Kata Pengantar', badge: 'Resmi' },
            { id: 'IDENTITAS', label: 'Identitas Wali Kelas', badge: 'Profil' },
            { id: 'DATA_SISWA', label: 'Data Siswa (20 Santri)', badge: 'Kelas 1-A' },
            { id: 'VISI_MISI', label: 'Visi Misi & Tujuan', badge: 'Nilai Islam' },
            { id: 'PEMBIASAAN', label: 'Pembiasaan Guru', badge: 'Daily Habit' },
            { id: 'TATA_TERTIB', label: 'Tata Tertib Guru', badge: '4 Kategori' },
            { id: 'TATA_TERTIB_KELAS', label: 'Tata Tertib Kelas', badge: '15 Aturan' },
            { id: 'PROGRAM_KELAS', label: 'Program Kelas', badge: 'Goals 26/27' },
            { id: 'PIKET', label: 'Jadwal Piket', badge: '5 Regu' },
            { id: 'KESEHATAN', label: 'Riwayat Kesehatan', badge: 'Medis Siswa' },
            { id: 'SARPRAS', label: 'Sarpras Kelas', badge: 'Inventaris' },
            { id: 'ANECDOTED', label: 'Catatan Anekdot', badge: 'Observasi' },
            { id: 'PARENTING', label: 'Parenting & Rapor', badge: 'Wali Murid' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-2xl font-black text-xs whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs ring-2 ring-emerald-500/20'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`ml-1.5 text-[9px] px-1.5 py-0.5 rounded-md ${
                  isActive ? 'bg-emerald-950 text-emerald-200' : 'bg-slate-200 text-slate-600'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
       * TAB 1: HOME / DASHBOARD HUB ADMINISTRASI (PERSIS TAMPILAN IMAGE 3)
       * ========================================================================= */}
      {activeTab === 'HOME' && (
        <div className="space-y-6">

          {/* HUB HEADER PERSIS SPREADSHEET */}
          <div className="bg-white rounded-3xl border-2 border-slate-800 shadow-xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-slate-800 pb-4 gap-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-950 p-1.5 text-white flex flex-col items-center justify-center shadow-md border border-emerald-950 shrink-0">
                  <span className="font-serif text-lg font-black leading-none text-amber-300">الإمام</span>
                  <span className="text-[6.5px] font-black uppercase tracking-widest text-center mt-0.5">Al-Imam</span>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-wider text-slate-900 uppercase">
                    ADMINISTRASI WALI KELAS
                  </h2>
                  <div className="text-xs sm:text-sm font-extrabold text-emerald-800 uppercase tracking-wide">
                    SD AL-IMAM ISLAMIC SCHOOL
                  </div>
                  <div className="text-[11px] font-bold text-slate-600">
                    TAHUN PELAJARAN 2026/2027 • {currentWaliKelas.kelas}
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons (Cover & Pengantar) */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab('COVER')}
                  className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-black text-xs shadow-xs border border-sky-600 cursor-pointer transition-all"
                >
                  COVER
                </button>
                <button
                  onClick={() => setActiveTab('PENGANTAR')}
                  className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-black text-xs shadow-xs border border-sky-600 cursor-pointer transition-all"
                >
                  PENGANTAR
                </button>
              </div>
            </div>

            {/* 3 PILAR UTAMA: BUKU KERJA I, BUKU KERJA II, MATA PELAJARAN */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* PILAR 1: BUKU KERJA I */}
              <div className="bg-slate-50 rounded-2xl border-2 border-slate-700 overflow-hidden flex flex-col">
                <div className="bg-sky-600 text-white font-black text-center py-2.5 text-xs sm:text-sm uppercase tracking-wider shadow-xs">
                  BUKU KERJA I
                </div>
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    {[
                      { id: 'IDENTITAS', label: 'IDENTITAS GURU' },
                      { id: 'DATA_SISWA', label: 'DATA SISWA' },
                      { id: 'VISI_MISI', label: 'VISI MISI' },
                      { id: 'PEMBIASAAN', label: 'PEMBIASAAN GURU' },
                      { id: 'TATA_TERTIB', label: 'TATA TERTIB GURU' },
                      { id: 'TATA_TERTIB_KELAS', label: 'TATA TERTIB KELAS' }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTab(item.id)}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-black text-sky-900 bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-sky-500 group-hover:text-sky-700" />
                      </button>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-500 font-bold text-center">
                    Perangkat Dokumen Dasar Guru
                  </div>
                </div>
              </div>

              {/* PILAR 2: BUKU KERJA II */}
              <div className="bg-slate-50 rounded-2xl border-2 border-slate-700 overflow-hidden flex flex-col">
                <div className="bg-sky-600 text-white font-black text-center py-2.5 text-xs sm:text-sm uppercase tracking-wider shadow-xs">
                  BUKU KERJA II
                </div>
                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
                    {[
                      { id: 'kaldik', label: 'KALDIK', isAppNav: true },
                      { id: 'PROGRAM_KELAS', label: 'PROGRAM KEGIATAN SEKOLAH' },
                      { id: 'jadwal', label: 'JADWAL PELAJARAN', isAppNav: true },
                      { id: 'PROGRAM_KELAS', label: 'PROGRAM KELAS' },
                      { id: 'PIKET', label: 'PIKET KELAS' },
                      { id: 'KESEHATAN', label: 'DAFTAR RIWAYAT KESEHATAN SISWA' },
                      { id: 'SARPRAS', label: 'DATA SARPRAS KELAS' },
                      { id: 'ANECDOTED', label: 'ANECDOTED (CATATAN ANEKDOT)' },
                      { id: 'presensi', label: 'ABSENSI', isAppNav: true },
                      { id: 'PARENTING', label: 'DAFTAR HADIR PARENTING / RAPOR' }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (item.isAppNav && onNavigate) {
                            onNavigate(item.id);
                          } else {
                            setActiveTab(item.id);
                          }
                        }}
                        className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-black text-sky-900 bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
                      >
                        <span className="group-hover:translate-x-1 transition-transform truncate">{item.label}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-sky-500 group-hover:text-sky-700 shrink-0" />
                      </button>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-500 font-bold text-center">
                    Instrumen Manajemen & Evaluasi Kelas
                  </div>
                </div>
              </div>

              {/* PILAR 3: MATA PELAJARAN */}
              <div className="bg-slate-50 rounded-2xl border-2 border-slate-700 overflow-hidden flex flex-col">
                <div className="bg-sky-600 text-white font-black text-center py-2.5 text-xs sm:text-sm uppercase tracking-wider shadow-xs">
                  MATA PELAJARAN
                </div>
                <div className="p-4 space-y-1 flex-1 flex flex-col justify-between">
                  <div className="space-y-1 max-h-[380px] overflow-y-auto pr-1">
                    {MAPEL_ADMINISTRASI.map((mapel) => (
                      <div
                        key={mapel.no}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-800 bg-white border border-slate-200 flex items-center justify-between"
                      >
                        <span className="truncate">{mapel.nama}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-black shrink-0 ml-1">
                          {mapel.jpPekan} JP
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-500 font-bold text-center">
                    14 Mata Pelajaran Terakreditasi
                  </div>
                </div>
              </div>

            </div>

            {/* MOTTO SLOGAN BANNER (PERSIS SPREADSHEET FOOTER) */}
            <div className="bg-gradient-to-r from-sky-100 via-teal-100 to-sky-100 rounded-2xl border-2 border-slate-800 p-4 text-center">
              <span className="text-sm sm:text-base md:text-lg font-black tracking-widest text-slate-900 uppercase">
                BERAQIDAH - BERAKHLAK - BERPRESTASI
              </span>
            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
       * TAB 2: COVER SAMPUL RESMI (PERSIS TAMPILAN IMAGE 1)
       * ========================================================================= */}
      {activeTab === 'COVER' && (
        <div className="bg-white rounded-3xl border-2 border-slate-800 shadow-xl p-8 sm:p-14 max-w-4xl mx-auto space-y-10 text-center print:border-none print:shadow-none print:p-0">
          
          {/* Logo Al-Imam Besar */}
          <div className="flex justify-center pt-8">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-950 p-4 text-white flex flex-col items-center justify-center shadow-xl border-2 border-emerald-950">
              <span className="font-serif text-3xl font-black leading-none text-amber-300">الإمام</span>
              <span className="text-xs font-black uppercase tracking-widest text-center mt-2">Al-Imam</span>
              <span className="text-[9px] font-bold text-emerald-200 uppercase tracking-wider">Islamic School</span>
            </div>
          </div>

          {/* Judul Cover Resmi */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-slate-900 uppercase leading-tight">
              ADMINISTRASI<br />WALI KELAS
            </h1>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-emerald-800 tracking-wide uppercase">
              SD AL-IMAM ISLAMIC SCHOOL
            </h2>

            <div className="inline-block px-6 py-2 rounded-2xl bg-slate-100 border-2 border-slate-800 text-slate-900 font-black text-lg sm:text-xl">
              TAHUN PELAJARAN 2026-2027
            </div>
          </div>

          {/* Identitas Rombel & Wali Kelas */}
          <div className="max-w-md mx-auto pt-6 border-t-2 border-slate-800 space-y-2 text-sm font-bold text-slate-800">
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Kelas / Rombel:</span>
              <span className="font-black text-slate-900">{currentWaliKelas.kelas}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Wali Kelas:</span>
              <span className="font-black text-emerald-900">{currentWaliKelas.waliKelas}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">NPSN:</span>
              <span className="font-black text-slate-900">{currentWaliKelas.npsn}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Kepala Sekolah:</span>
              <span className="font-black text-slate-900">{SEKOLAH_IDENTITAS.kepalaSekolah}</span>
            </div>
          </div>

          {/* Footer Motto */}
          <div className="pt-10">
            <div className="inline-block px-8 py-2 rounded-xl bg-emerald-900 text-amber-300 font-black tracking-widest text-xs uppercase shadow-md">
              BERAQIDAH - BERAKHLAK - BERPRESTASI
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
       * TAB 3: KATA PENGANTAR RESMI (PERSIS TAMPILAN IMAGE 2)
       * ========================================================================= */}
      {activeTab === 'PENGANTAR' && (
        <div className="bg-white rounded-3xl border-2 border-slate-800 shadow-xl p-8 sm:p-12 max-w-4xl mx-auto space-y-8 print:border-none print:shadow-none print:p-0">
          
          {/* Header Kop */}
          <div className="flex items-center space-x-3.5 border-b-2 border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-950 p-1.5 text-white flex flex-col items-center justify-center shadow-md border border-emerald-950 shrink-0">
              <span className="font-serif text-base font-black leading-none text-amber-300">الإمام</span>
              <span className="text-[6px] font-black uppercase tracking-widest text-center mt-0.5">Al-Imam</span>
            </div>
            <div>
              <h2 className="text-xl font-black tracking-wider text-slate-900 uppercase">
                KATA PENGANTAR
              </h2>
              <div className="text-xs font-extrabold text-emerald-800 uppercase">
                BUKU KERJA ADMINISTRASI WALI KELAS • SD AL-IMAM ISLAMIC SCHOOL
              </div>
            </div>
          </div>

          {/* Teks Naskah Pengantar Lengkap */}
          <div className="space-y-4 text-justify text-sm sm:text-base font-serif text-slate-800 leading-relaxed indent-8">
            {KATA_PENGANTAR_TEXT.map((paragraf, pIdx) => (
              <p key={pIdx}>{paragraf}</p>
            ))}
          </div>

          {/* Tanda Tangan Penyusun */}
          <div className="pt-8 flex justify-end">
            <div className="text-center w-56 space-y-1 font-sans text-xs">
              <span className="text-slate-600 font-bold block">Bogor, Juli 2026</span>
              <span className="text-slate-900 font-bold block">Penyusun / Wali Kelas,</span>
              
              <div className="h-16 flex items-center justify-center">
                <span className="text-slate-300 italic font-serif text-sm">[ Tanda Tangan ]</span>
              </div>

              <span className="font-black text-slate-950 underline block text-sm">
                {currentWaliKelas.waliKelas}
              </span>
              <span className="text-slate-500 font-semibold block text-[11px]">
                NIP: {currentWaliKelas.nip}
              </span>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
       * TAB 4: IDENTITAS WALI KELAS (PERSIS TAMPILAN IMAGE 4)
       * ========================================================================= */}
      {activeTab === 'IDENTITAS' && (
        <div className="bg-white rounded-3xl border-2 border-slate-800 shadow-xl p-8 sm:p-12 max-w-4xl mx-auto space-y-8 print:border-none print:shadow-none print:p-0">
          
          {/* Header Identitas */}
          <div className="flex items-center space-x-3.5 border-b-2 border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-950 p-1.5 text-white flex flex-col items-center justify-center shadow-md border border-emerald-950 shrink-0">
              <span className="font-serif text-base font-black leading-none text-amber-300">الإمام</span>
              <span className="text-[6px] font-black uppercase tracking-widest text-center mt-0.5">Al-Imam</span>
            </div>
            <div>
              <h2 className="text-xl font-black tracking-wider text-slate-900 uppercase">
                IDENTITAS WALI KELAS
              </h2>
              <div className="text-xs font-extrabold text-emerald-800 uppercase">
                SD AL-IMAM ISLAMIC SCHOOL • TAHUN PELAJARAN 2026/2027
              </div>
            </div>
          </div>

          {/* Grid Informasi & Kotak Pasfoto (Persis Image 4) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Tabel Isian Identitas Guru */}
            <div className="md:col-span-8 space-y-2.5 text-xs sm:text-sm font-bold text-slate-800 font-mono">
              {[
                { label: "Kelas", value: currentWaliKelas.kelas },
                { label: "Nama Lengkap Wali Kelas", value: currentWaliKelas.waliKelas },
                { label: "NIP", value: currentWaliKelas.nip },
                { label: "NUPTK", value: currentWaliKelas.nuptk },
                { label: "Tempat Tgl Lahir", value: `${currentWaliKelas.tempatLahir}, ${currentWaliKelas.tanggalLahir}` },
                { label: "Pendidikan Terakhir", value: currentWaliKelas.pendidikanTerakhir },
                { label: "Jabatan Guru", value: currentWaliKelas.jabatanGuru },
                { label: "Pangkat / Gol", value: currentWaliKelas.pangkatGol },
                { label: "Tugas Mengajar Kelas", value: currentWaliKelas.tugasMengajarKelas },
                { label: "Tahun Ajaran", value: currentWaliKelas.tahunAjaran },
                { label: "Nama Sekolah", value: currentWaliKelas.namaSekolah },
                { label: "NPSN", value: currentWaliKelas.npsn },
                { label: "NSS", value: currentWaliKelas.nss },
                { label: "Alamat", value: currentWaliKelas.alamat },
                { label: "Kelurahan / Desa", value: currentWaliKelas.kelurahanDesa },
                { label: "Kecamatan", value: currentWaliKelas.kecamatan },
                { label: "Kabupaten", value: currentWaliKelas.kabupaten },
                { label: "Provinsi", value: currentWaliKelas.provinsi }
              ].map((row, rIdx) => (
                <div key={rIdx} className="grid grid-cols-12 py-1 border-b border-slate-100">
                  <div className="col-span-5 text-slate-600">{row.label}</div>
                  <div className="col-span-1 text-slate-400 text-center">:</div>
                  <div className="col-span-6 font-black text-slate-950 font-sans">{row.value}</div>
                </div>
              ))}
            </div>

            {/* Kotak Pasfoto Abu-Abu Resmi (Persis Image 4) */}
            <div className="md:col-span-4 flex flex-col items-center justify-center space-y-3">
              <div className="w-48 h-64 bg-slate-400 rounded-xl border-2 border-slate-700 flex flex-col items-center justify-center p-4 text-center shadow-inner overflow-hidden relative group">
                {currentWaliKelas.fotoUrl ? (
                  <img 
                    src={currentWaliKelas.fotoUrl} 
                    alt="Foto Wali Kelas" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="space-y-2 text-white">
                    <Users className="w-12 h-12 mx-auto text-slate-200" />
                    <span className="text-xs font-black uppercase tracking-wider block">PASFOTO GURU</span>
                    <span className="text-[10px] text-slate-200 block">3 x 4 cm</span>
                  </div>
                )}
              </div>
              <span className="text-[11px] font-bold text-slate-500">
                Wali Kelas: {((currentWaliKelas.waliKelas || '')).split(',')[0]}
              </span>
            </div>

          </div>

          {/* Mengetahui Kepala Sekolah (Spesimen TTD Resmi) */}
          <div className="pt-6 border-t-2 border-slate-800 flex justify-between items-end">
            <div className="text-xs text-slate-500 font-bold">
              Dokumen Resmi Administrasi Sekolah • SD Al-Imam
            </div>
            
            <div className="text-center w-56 space-y-1">
              <span className="text-xs font-bold text-slate-700 block">Mengetahui,</span>
              <span className="text-xs font-black text-slate-900 block">Kepala Sekolah</span>
              
              <div className="py-1 flex justify-center">
                <svg 
                  viewBox="0 0 160 70" 
                  className="w-32 h-14 text-slate-900 fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round"
                >
                  <path d="M 40 45 C 32 35, 42 16, 56 16 C 68 16, 76 34, 60 54 C 48 68, 36 62, 34 50 C 32 38, 48 30, 72 32 C 92 34, 102 18, 96 50 C 90 70, 98 70, 114 56 C 124 46, 118 34, 112 32 C 102 28, 96 44, 120 56 C 132 62, 144 58, 148 48" />
                  <path d="M 94 40 L 102 68" />
                </svg>
              </div>

              <div className="font-black text-xs text-slate-950 border-b border-slate-900 pb-0.5 inline-block">
                {SEKOLAH_IDENTITAS.kepalaSekolah}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
       * TAB 5: DATA SISWA RESMI KELAS 1-A (PERSIS TAMPILAN IMAGE 5)
       * ========================================================================= */}
      {activeTab === 'DATA_SISWA' && (
        <div className="bg-white rounded-3xl border-2 border-slate-800 shadow-xl p-6 sm:p-8 space-y-6 print:border-none print:shadow-none print:p-0">
          
          {/* Header Kop Lembar Data Siswa */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-slate-800 pb-4 gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-950 p-1.5 text-white flex flex-col items-center justify-center shadow-md border border-emerald-950 shrink-0">
                <span className="font-serif text-base font-black leading-none text-amber-300">الإمام</span>
                <span className="text-[6px] font-black uppercase tracking-widest text-center mt-0.5">Al-Imam</span>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black tracking-wider text-slate-900 uppercase">
                  BUKU INDUK & DATA SISWA RESMI
                </h3>
                <div className="text-xs font-extrabold text-emerald-800 uppercase">
                  KELAS 1 ABDULLAH IBNU UMAR • SD AL-IMAM ISLAMIC SCHOOL
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-black border border-emerald-300">
                Total: {SISWA_KELAS_1_UMAR.length} Santri (10 L / 10 P)
              </span>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="no-print flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama santri / NIS..."
                value={searchSiswa}
                onChange={(e) => setSearchSiswa(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-500">Filter Gender:</span>
              <button
                onClick={() => setFilterJk('ALL')}
                className={`px-3 py-1 rounded-xl text-xs font-black cursor-pointer border ${
                  filterJk === 'ALL' ? 'bg-emerald-800 text-white border-emerald-900' : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setFilterJk('L')}
                className={`px-3 py-1 rounded-xl text-xs font-black cursor-pointer border ${
                  filterJk === 'L' ? 'bg-blue-800 text-white border-blue-900' : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                Ikhwan (L)
              </button>
              <button
                onClick={() => setFilterJk('P')}
                className={`px-3 py-1 rounded-xl text-xs font-black cursor-pointer border ${
                  filterJk === 'P' ? 'bg-pink-800 text-white border-pink-900' : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                Akhwat (P)
              </button>
            </div>
          </div>

          {/* TABEL DATA SISWA RESMI PERSIS IMAGE 5 (MERAH BOLD HEADER) */}
          <div className="overflow-x-auto rounded-xl border-2 border-slate-900">
            <table className="w-full text-center text-xs border-collapse font-sans">
              <thead>
                <tr className="bg-[#b91c1c] text-white font-black border-b-2 border-slate-900 text-[11px] tracking-wider uppercase">
                  <th className="py-2.5 px-2 border-r border-slate-900 w-12 bg-amber-400 text-slate-950">NO</th>
                  <th className="py-2.5 px-2 border-r border-slate-900 w-28 bg-amber-300 text-slate-950">NIS</th>
                  <th className="py-2.5 px-2 border-r border-slate-900 w-24">NISN</th>
                  <th className="py-2.5 px-3 border-r border-slate-900 text-left">NAMA PESERTA DIDIK</th>
                  <th className="py-2.5 px-2 border-r border-slate-900 w-12">L/P</th>
                  <th className="py-2.5 px-3 border-r border-slate-900">TEMPAT LAHIR</th>
                  <th className="py-2.5 px-3 border-r border-slate-900">TANGGAL LAHIR</th>
                  <th className="py-2.5 px-2 border-r border-slate-900 w-16">AGAMA</th>
                  <th className="py-2.5 px-3 border-r border-slate-900 text-left">PENDIDIKAN SEBELUMNYA</th>
                  <th className="py-2.5 px-3 border-r border-slate-900 text-left">ALAMAT PESERTA DIDIK</th>
                  <th className="py-2.5 px-3 bg-[#1d4ed8] text-white">NAMA AYAH</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-[11px] font-bold text-slate-900">
                {filteredSiswa.map((siswa) => (
                  <tr key={siswa.no} className="border-b border-slate-800 hover:bg-slate-50">
                    <td className="py-1.5 px-2 border-r border-slate-800 bg-amber-100 text-slate-950 font-black">{siswa.no}</td>
                    <td className="py-1.5 px-2 border-r border-slate-800 font-mono text-[10px] bg-amber-50">{siswa.nis}</td>
                    <td className="py-1.5 px-2 border-r border-slate-800 text-slate-400 font-mono">{siswa.nisn}</td>
                    <td className="py-1.5 px-3 border-r border-slate-800 text-left font-black text-slate-950">{siswa.nama}</td>
                    <td className={`py-1.5 px-2 border-r border-slate-800 font-black ${
                      siswa.jk === 'L' ? 'text-blue-700 bg-blue-50/50' : 'text-pink-700 bg-pink-50/50'
                    }`}>
                      {siswa.jk}
                    </td>
                    <td className="py-1.5 px-3 border-r border-slate-800 font-semibold text-slate-700">{siswa.tempatLahir}</td>
                    <td className="py-1.5 px-3 border-r border-slate-800 font-semibold text-slate-700">{siswa.tanggalLahir}</td>
                    <td className="py-1.5 px-2 border-r border-slate-800 font-semibold">{siswa.agama}</td>
                    <td className="py-1.5 px-3 border-r border-slate-800 text-left text-slate-700 font-medium text-[10px]">{siswa.pendidikanSebelumnya}</td>
                    <td className="py-1.5 px-3 border-r border-slate-800 text-left text-slate-700 font-medium text-[10px]">{siswa.alamat}</td>
                    <td className="py-1.5 px-3 text-left font-bold text-slate-900">{siswa.namaAyah}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 text-right text-xs font-bold text-slate-500">
            Terverifikasi Sesuai Buku Induk Siswa SD Al-Imam Islamic School T.P 2026/2027
          </div>

        </div>
      )}

      {/* =========================================================================
       * TAB 6: VISI, MISI, & TUJUAN SEKOLAH
       * ========================================================================= */}
      {activeTab === 'VISI_MISI' && (
        <div className="bg-white rounded-3xl border-2 border-slate-800 shadow-xl p-8 sm:p-12 max-w-4xl mx-auto space-y-8 print:border-none print:shadow-none print:p-0">
          
          <div className="flex items-center space-x-3.5 border-b-2 border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-950 p-1.5 text-white flex flex-col items-center justify-center shadow-md border border-emerald-950 shrink-0">
              <span className="font-serif text-base font-black leading-none text-amber-300">الإمام</span>
              <span className="text-[6px] font-black uppercase tracking-widest text-center mt-0.5">Al-Imam</span>
            </div>
            <div>
              <h2 className="text-xl font-black tracking-wider text-slate-900 uppercase">
                VISI, MISI & TUJUAN PENDIDIKAN
              </h2>
              <div className="text-xs font-extrabold text-emerald-800 uppercase">
                SD AL-IMAM ISLAMIC SCHOOL • BERAQIDAH - BERAKHLAK - BERPRESTASI
              </div>
            </div>
          </div>

          {/* Visi */}
          <div className="space-y-3 bg-emerald-50 p-6 rounded-2xl border-2 border-emerald-800">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-800 text-white inline-block">
              VISI SEKOLAH
            </span>
            <p className="text-base sm:text-lg font-serif font-black text-emerald-950 italic leading-relaxed">
              "{VISI_MISI.visi}"
            </p>
          </div>

          {/* Misi */}
          <div className="space-y-4">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-slate-800 text-white inline-block">
              MISI SEKOLAH
            </span>
            <div className="grid grid-cols-1 gap-2.5">
              {VISI_MISI.misi.map((m, mIdx) => (
                <div key={mIdx} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-emerald-800 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {mIdx + 1}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 leading-normal">{m}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tujuan */}
          <div className="space-y-4">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-amber-700 text-white inline-block">
              TARGET & TUJUAN LULUSAN
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {VISI_MISI.tujuan.map((t, tIdx) => (
                <div key={tIdx} className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-300 flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="text-xs font-bold text-amber-950">{t}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
       * TAB 7: PEMBIASAAN ADAB ISLAMI SEKOLAH
       * ========================================================================= */}
      {/* =========================================================================
       * TAB 7: DAILY & TEACHER’S HABITUATION (PEMBIASAAN GURU)
       * ========================================================================= */}
      {activeTab === 'PEMBIASAAN' && (
        <div className="bg-white rounded-3xl border-2 border-slate-800 shadow-xl p-8 sm:p-12 max-w-4xl mx-auto space-y-8 print:border-none print:shadow-none print:p-0">
          
          <div className="flex items-center space-x-3.5 border-b-2 border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-950 p-1.5 text-white flex flex-col items-center justify-center shadow-md border border-emerald-950 shrink-0">
              <span className="font-serif text-base font-black leading-none text-amber-300">الإمام</span>
              <span className="text-[6px] font-black uppercase tracking-widest text-center mt-0.5">Al-Imam</span>
            </div>
            <div>
              <h2 className="text-xl font-black tracking-wider text-slate-900 uppercase">
                DAILY & TEACHER’S HABITUATION (PEMBIASAAN GURU)
              </h2>
              <div className="text-xs font-extrabold text-emerald-800 uppercase">
                SD AL-IMAM ISLAMIC SCHOOL • PANDUAN PEMBIASAAN HARIAN
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {PEMBIASAAN_GURU.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition-all shadow-2xs group"
              >
                <span className="w-7 h-7 rounded-xl bg-emerald-800 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs group-hover:bg-emerald-900 transition-colors">
                  {idx + 1}
                </span>
                <div className="space-y-0.5 flex-1">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900">
                    {item.judul}
                  </h4>
                  {item.deskripsi && (
                    <p className="text-xs font-medium text-slate-600">
                      {item.deskripsi}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-950 flex items-center space-x-3">
            <Info className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>
              Wali kelas bertindak sebagai teladan utama (*qudwah hasanah*) serta memantau dan mencatat pembiasaan adab ananda setiap harinya.
            </span>
          </div>

        </div>
      )}

      {/* =========================================================================
       * TAB 8: TATA TERTIB GURU SD AL IMAM ISLAMIC SCHOOL
       * ========================================================================= */}
      {activeTab === 'TATA_TERTIB' && (
        <div className="bg-white rounded-3xl border-2 border-slate-800 shadow-xl p-8 sm:p-12 max-w-4xl mx-auto space-y-8 print:border-none print:shadow-none print:p-0">
          
          <div className="flex items-center space-x-3.5 border-b-2 border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-950 p-1.5 text-white flex flex-col items-center justify-center shadow-md border border-emerald-950 shrink-0">
              <span className="font-serif text-base font-black leading-none text-amber-300">الإمام</span>
              <span className="text-[6px] font-black uppercase tracking-widest text-center mt-0.5">Al-Imam</span>
            </div>
            <div>
              <h2 className="text-xl font-black tracking-wider text-slate-900 uppercase">
                TATA TERTIB GURU SD AL IMAM ISLAMIC SCHOOL
              </h2>
              <div className="text-xs font-extrabold text-emerald-800 uppercase">
                PEDOMAN KEDISIPLINAN, KETELADANAN & PROFESIONALISME GTK
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TATA_TERTIB_GURU.seksi.map((seksi) => (
              <div key={seksi.kode} className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-700 space-y-4">
                <div className="flex items-center space-x-2.5 border-b border-slate-200 pb-2.5">
                  <span className="w-7 h-7 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                    {seksi.kode}
                  </span>
                  <h3 className="font-black text-xs sm:text-sm uppercase tracking-wide text-slate-900">
                    {seksi.kategori}
                  </h3>
                </div>
                <ul className="space-y-2.5 text-xs font-medium text-slate-800">
                  {seksi.poin.map((item, pIdx) => (
                    <li key={pIdx} className="flex items-start space-x-2">
                      <span className="font-black text-emerald-800 shrink-0 mt-0.5">{pIdx + 1}.</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* =========================================================================
       * TAB 8B: TATA TERTIB KELAS
       * ========================================================================= */}
      {activeTab === 'TATA_TERTIB_KELAS' && (
        <div className="bg-white rounded-3xl border-2 border-slate-800 shadow-xl p-8 sm:p-12 max-w-4xl mx-auto space-y-8 print:border-none print:shadow-none print:p-0">
          
          <div className="flex items-center space-x-3.5 border-b-2 border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-950 p-1.5 text-white flex flex-col items-center justify-center shadow-md border border-emerald-950 shrink-0">
              <span className="font-serif text-base font-black leading-none text-amber-300">الإمام</span>
              <span className="text-[6px] font-black uppercase tracking-widest text-center mt-0.5">Al-Imam</span>
            </div>
            <div>
              <h2 className="text-xl font-black tracking-wider text-slate-900 uppercase">
                TATA TERTIB KELAS
              </h2>
              <div className="text-xs font-extrabold text-emerald-800 uppercase">
                SD AL-IMAM ISLAMIC SCHOOL • ATURAN & KETERTIBAN SANTRI DI KELAS
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-700 space-y-3">
            <ol className="space-y-3 text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200/60">
              {TATA_TERTIB_KELAS.map((aturan, idx) => (
                <li key={idx} className="flex items-start space-x-3 pt-2.5 first:pt-0">
                  <span className="w-6 h-6 rounded-full bg-blue-700 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-bold text-slate-900">{aturan}</span>
                </li>
              ))}
            </ol>
          </div>

        </div>
      )}

      {/* =========================================================================
       * TAB 9: PROGRAM KELAS / GOALS 2026-2027
       * ========================================================================= */}
      {activeTab === 'PROGRAM_KELAS' && (
        <div className="bg-white rounded-3xl border-2 border-slate-800 shadow-xl p-8 sm:p-12 max-w-4xl mx-auto space-y-8 print:border-none print:shadow-none print:p-0">
          
          <div className="flex items-center space-x-3.5 border-b-2 border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-950 p-1.5 text-white flex flex-col items-center justify-center shadow-md border border-emerald-950 shrink-0">
              <span className="font-serif text-base font-black leading-none text-amber-300">الإمام</span>
              <span className="text-[6px] font-black uppercase tracking-widest text-center mt-0.5">Al-Imam</span>
            </div>
            <div>
              <h2 className="text-xl font-black tracking-wider text-slate-900 uppercase">
                {GOALS_PROGRAM_KELAS_2026_2027.judul}
              </h2>
              <div className="text-xs font-extrabold text-emerald-800 uppercase">
                PROGRAM KERJA & EVALUASI WALI KELAS • {currentWaliKelas.kelas}
              </div>
            </div>
          </div>

          <div className="border-2 border-slate-800 rounded-2xl overflow-hidden shadow-xs divide-y-2 divide-slate-800 text-xs sm:text-sm">
            
            {/* Baris 1: Kekurangan */}
            <div className="grid grid-cols-1 md:grid-cols-4 bg-white">
              <div className="p-4 bg-slate-100 md:border-r-2 md:border-slate-800 font-black text-slate-900 flex items-center">
                Kekurangan :
              </div>
              <div className="p-4 md:col-span-3 text-slate-800 font-medium leading-relaxed">
                {GOALS_PROGRAM_KELAS_2026_2027.kekurangan}
              </div>
            </div>

            {/* Baris 2: Perbaikan */}
            <div className="grid grid-cols-1 md:grid-cols-4 bg-white">
              <div className="p-4 bg-slate-100 md:border-r-2 md:border-slate-800 font-black text-slate-900 flex items-center">
                Perbaikan :
              </div>
              <div className="p-4 md:col-span-3 text-slate-800 font-medium leading-relaxed">
                {GOALS_PROGRAM_KELAS_2026_2027.perbaikan}
              </div>
            </div>

            {/* Baris 3: Dengan Cara */}
            <div className="grid grid-cols-1 md:grid-cols-4 bg-white">
              <div className="p-4 bg-slate-100 md:border-r-2 md:border-slate-800 font-black text-slate-900 flex items-start">
                Dengan Cara :
              </div>
              <div className="p-4 md:col-span-3 space-y-2">
                {GOALS_PROGRAM_KELAS_2026_2027.denganCara.map((cara, cIdx) => (
                  <div key={cIdx} className="flex items-start space-x-2">
                    <span className="font-bold text-emerald-700 shrink-0 mt-0.5">•</span>
                    <span className="text-slate-800 font-medium leading-relaxed">{cara}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Baris 4: Goals Jangka Pendek */}
            <div className="grid grid-cols-1 md:grid-cols-4 bg-white">
              <div className="p-4 bg-emerald-50 md:border-r-2 md:border-slate-800 font-black text-emerald-950 flex items-center">
                Goals Jangka Pendek :
              </div>
              <div className="p-4 md:col-span-3 text-slate-800 font-medium leading-relaxed">
                {GOALS_PROGRAM_KELAS_2026_2027.goalsJangkaPendek}
              </div>
            </div>

            {/* Baris 5: Goals Jangka Panjang */}
            <div className="grid grid-cols-1 md:grid-cols-4 bg-white">
              <div className="p-4 bg-blue-50 md:border-r-2 md:border-slate-800 font-black text-blue-950 flex items-center">
                Goals Jangka Panjang :
              </div>
              <div className="p-4 md:col-span-3 text-slate-800 font-medium leading-relaxed">
                {GOALS_PROGRAM_KELAS_2026_2027.goalsJangkaPanjang}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
       * TAB 10: JADWAL PIKET KELAS (20 SANTRI RESMI)
       * ========================================================================= */}
      {activeTab === 'PIKET' && (
        <div className="bg-white rounded-3xl border-2 border-slate-800 shadow-xl p-8 sm:p-12 max-w-4xl mx-auto space-y-8 print:border-none print:shadow-none print:p-0">
          
          <div className="flex items-center space-x-3.5 border-b-2 border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-950 p-1.5 text-white flex flex-col items-center justify-center shadow-md border border-emerald-950 shrink-0">
              <span className="font-serif text-base font-black leading-none text-amber-300">الإمام</span>
              <span className="text-[6px] font-black uppercase tracking-widest text-center mt-0.5">Al-Imam</span>
            </div>
            <div>
              <h2 className="text-xl font-black tracking-wider text-slate-900 uppercase">
                JADWAL REGU PIKET KEBERSIHAN KELAS
              </h2>
              <div className="text-xs font-extrabold text-emerald-800 uppercase">
                {currentWaliKelas.kelas} • TAHUN PELAJARAN 2026/2027
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PIKET_KELAS_DEFAULT.map((regu, rIdx) => (
              <div key={rIdx} className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-700 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-black text-sm text-slate-950">{regu.hari}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                    4 Santri
                  </span>
                </div>
                
                <div className="text-xs font-bold text-slate-500">
                  Koordinator: <strong className="text-emerald-900">{regu.koordinator}</strong>
                </div>

                <div className="space-y-1 pt-1">
                  {regu.anggota.map((nama, nIdx) => (
                    <div key={nIdx} className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800">
                      {nIdx + 1}. {nama}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs font-bold text-amber-950">
            Piket dilaksanakan setiap pagi sebelum KBM (pukul 07.00 - 07.15 WIB) dan setelah shalat Ashar sebelum prosesi kepulangan santri.
          </div>

        </div>
      )}

      {/* =========================================================================
       * TAB 11: DAFTAR RIWAYAT KESEHATAN SISWA (20 SANTRI)
       * ========================================================================= */}
      {activeTab === 'KESEHATAN' && (
        <div className="bg-white rounded-3xl border-2 border-slate-800 shadow-xl p-6 sm:p-8 space-y-6 print:border-none print:shadow-none print:p-0">
          
          <div className="flex items-center space-x-3.5 border-b-2 border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-950 p-1.5 text-white flex flex-col items-center justify-center shadow-md border border-emerald-950 shrink-0">
              <span className="font-serif text-base font-black leading-none text-amber-300">الإمام</span>
              <span className="text-[6px] font-black uppercase tracking-widest text-center mt-0.5">Al-Imam</span>
            </div>
            <div>
              <h2 className="text-xl font-black tracking-wider text-slate-900 uppercase">
                DAFTAR RIWAYAT KESEHATAN SANTRI
              </h2>
              <div className="text-xs font-extrabold text-emerald-800 uppercase">
                {currentWaliKelas.kelas} • DATA PANTAU KESEHATAN & ALERGI
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border-2 border-slate-900">
            <table className="w-full text-center text-xs border-collapse">
              <thead>
                <tr className="bg-slate-200 text-slate-950 font-black border-b-2 border-slate-900 text-[11px] uppercase">
                  <th className="py-2.5 px-2 border-r border-slate-900 w-12">NO</th>
                  <th className="py-2.5 px-3 border-r border-slate-900 text-left">NAMA PESERTA DIDIK</th>
                  <th className="py-2.5 px-2 border-r border-slate-900 w-12">L/P</th>
                  <th className="py-2.5 px-2 border-r border-slate-900 w-20">GOL. DARAH</th>
                  <th className="py-2.5 px-3 border-r border-slate-900 text-left">RIWAYAT ALERGI</th>
                  <th className="py-2.5 px-3 text-left">CATATAN KESEHATAN DARI ORANG TUA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-[11px] font-bold text-slate-900">
                {SISWA_KELAS_1_UMAR.map((siswa) => (
                  <tr key={siswa.no} className="border-b border-slate-800 hover:bg-slate-50">
                    <td className="py-1.5 px-2 border-r border-slate-800 bg-slate-100">{siswa.no}</td>
                    <td className="py-1.5 px-3 border-r border-slate-800 text-left font-black">{siswa.nama}</td>
                    <td className="py-1.5 px-2 border-r border-slate-800">{siswa.jk}</td>
                    <td className="py-1.5 px-2 border-r border-slate-800 font-mono text-emerald-800">{siswa.golDarah}</td>
                    <td className={`py-1.5 px-3 border-r border-slate-800 text-left font-semibold ${
                      siswa.alergi !== 'Tidak Ada' ? 'text-amber-800 bg-amber-50/50' : 'text-slate-600'
                    }`}>
                      {siswa.alergi}
                    </td>
                    <td className="py-1.5 px-3 text-left font-normal text-slate-600">{siswa.catatanKesehatan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* =========================================================================
       * TAB 12: DATA SARANA & PRASARANA (SARPRAS) KELAS
       * ========================================================================= */}
      {activeTab === 'SARPRAS' && (
        <div className="bg-white rounded-3xl border-2 border-slate-800 shadow-xl p-8 sm:p-12 max-w-4xl mx-auto space-y-8 print:border-none print:shadow-none print:p-0">
          
          <div className="flex items-center space-x-3.5 border-b-2 border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-950 p-1.5 text-white flex flex-col items-center justify-center shadow-md border border-emerald-950 shrink-0">
              <span className="font-serif text-base font-black leading-none text-amber-300">الإمام</span>
              <span className="text-[6px] font-black uppercase tracking-widest text-center mt-0.5">Al-Imam</span>
            </div>
            <div>
              <h2 className="text-xl font-black tracking-wider text-slate-900 uppercase">
                INVENTARIS SARANA & PRASARANA KELAS
              </h2>
              <div className="text-xs font-extrabold text-emerald-800 uppercase">
                {currentWaliKelas.kelas} • DATA BARANG & FASILITAS
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border-2 border-slate-900">
            <table className="w-full text-center text-xs border-collapse">
              <thead>
                <tr className="bg-slate-200 text-slate-950 font-black border-b-2 border-slate-900 text-[11px] uppercase">
                  <th className="py-2 px-2 border-r border-slate-900 w-12">NO</th>
                  <th className="py-2 px-3 border-r border-slate-900 text-left">NAMA BARANG / FASILITAS</th>
                  <th className="py-2 px-2 border-r border-slate-900 w-20">JUMLAH</th>
                  <th className="py-2 px-2 border-r border-slate-900 w-20">SATUAN</th>
                  <th className="py-2 px-3 border-r border-slate-900 w-24">KONDISI</th>
                  <th className="py-2 px-3 text-left">KETERANGAN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-[11px] font-bold text-slate-900">
                {SARPRAS_KELAS_DEFAULT.map((item) => (
                  <tr key={item.no} className="border-b border-slate-800 hover:bg-slate-50">
                    <td className="py-1.5 px-2 border-r border-slate-800 bg-slate-100">{item.no}</td>
                    <td className="py-1.5 px-3 border-r border-slate-800 text-left font-black">{item.namaBarang}</td>
                    <td className="py-1.5 px-2 border-r border-slate-800 font-mono text-emerald-800">{item.jumlah}</td>
                    <td className="py-1.5 px-2 border-r border-slate-800 text-slate-600">{item.satuan}</td>
                    <td className="py-1.5 px-3 border-r border-slate-800 text-emerald-900 font-black">{item.kondisi}</td>
                    <td className="py-1.5 px-3 text-left font-normal text-slate-600">{item.keterangan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* =========================================================================
       * TAB 13: CATATAN ANEKDOT (ANECDOTAL RECORDS)
       * ========================================================================= */}
      {activeTab === 'ANECDOTED' && (
        <div className="bg-white rounded-3xl border-2 border-slate-800 shadow-xl p-8 sm:p-12 max-w-4xl mx-auto space-y-8 print:border-none print:shadow-none print:p-0">
          
          <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-slate-800 pb-4 gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-950 p-1.5 text-white flex flex-col items-center justify-center shadow-md border border-emerald-950 shrink-0">
                <span className="font-serif text-base font-black leading-none text-amber-300">الإمام</span>
                <span className="text-[6px] font-black uppercase tracking-widest text-center mt-0.5">Al-Imam</span>
              </div>
              <div>
                <h2 className="text-xl font-black tracking-wider text-slate-900 uppercase">
                  BUKU CATATAN ANEKDOT (ANECDOTAL RECORDS)
                </h2>
                <div className="text-xs font-extrabold text-emerald-800 uppercase">
                  {currentWaliKelas.kelas} • OBSERVASI KARAKTER & PERILAKU SISWA
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsAddingAnecdote(!isAddingAnecdote)}
              className="no-print px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs flex items-center space-x-2 cursor-pointer transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Catatan</span>
            </button>
          </div>

          {/* Form Tambah Catatan Anekdot */}
          {isAddingAnecdote && (
            <form onSubmit={handleSaveAnecdote} className="no-print p-5 rounded-2xl bg-slate-50 border-2 border-emerald-700 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900">
                Formulir Jurnal Catatan Anekdot Baru
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold">
                <div>
                  <label className="text-slate-500 block mb-1">Tanggal Observasi:</label>
                  <input
                    type="date"
                    value={newAnecdote.tanggal}
                    onChange={(e) => setNewAnecdote({ ...newAnecdote, tanggal: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">Pilih Santri / Siswa:</label>
                  <select
                    value={newAnecdote.namaSiswa}
                    onChange={(e) => setNewAnecdote({ ...newAnecdote, namaSiswa: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl font-bold"
                    required
                  >
                    <option value="">-- Pilih Santri --</option>
                    {SISWA_KELAS_1_UMAR.map(s => (
                      <option key={s.no} value={s.nama}>{s.nama}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1 text-xs font-bold">
                <label className="text-slate-500 block">Peristiwa / Kejadian Spesifik:</label>
                <textarea
                  rows="2"
                  placeholder="Deskripsikan kejadian atau perilaku yang diamati secara faktual..."
                  value={newAnecdote.peristiwa}
                  onChange={(e) => setNewAnecdote({ ...newAnecdote, peristiwa: e.target.value })}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold">
                <div>
                  <label className="text-slate-500 block mb-1">Analisis Guru / Dampak:</label>
                  <input
                    type="text"
                    placeholder="Analisis perkembangan karakter santri..."
                    value={newAnecdote.analisis}
                    onChange={(e) => setNewAnecdote({ ...newAnecdote, analisis: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">Tindak Lanjut / Bimbingan:</label>
                  <input
                    type="text"
                    placeholder="Langkah bimbingan atau reward yang diberikan..."
                    value={newAnecdote.tindakLanjut}
                    onChange={(e) => setNewAnecdote({ ...newAnecdote, tindakLanjut: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingAnecdote(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-800 text-white font-black text-xs shadow-md"
                >
                  Simpan Catatan
                </button>
              </div>
            </form>
          )}

          {/* List Catatan Anekdot */}
          <div className="space-y-4">
            {anecdoteList.map((an) => (
              <div key={an.id} className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-700 space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-black text-sm text-slate-900">{an.namaSiswa}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold">
                      {an.tanggal}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">
                    Dicatat oleh: {an.pencatat}
                  </span>
                </div>

                <div className="text-xs space-y-1">
                  <div>
                    <strong className="text-slate-900 font-black">Peristiwa: </strong>
                    <span className="text-slate-700 font-medium">{an.peristiwa}</span>
                  </div>
                  {an.analisis && (
                    <div>
                      <strong className="text-emerald-900 font-black">Analisis Guru: </strong>
                      <span className="text-emerald-800 font-medium">{an.analisis}</span>
                    </div>
                  )}
                  {an.tindakLanjut && (
                    <div>
                      <strong className="text-blue-900 font-black">Tindak Lanjut: </strong>
                      <span className="text-blue-800 font-medium">{an.tindakLanjut}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* =========================================================================
       * TAB 14: DAFTAR HADIR PARENTING & PENGAMBILAN RAPOR
       * ========================================================================= */}
      {activeTab === 'PARENTING' && (
        <div className="bg-white rounded-3xl border-2 border-slate-800 shadow-xl p-8 sm:p-12 max-w-4xl mx-auto space-y-8 print:border-none print:shadow-none print:p-0">
          
          <div className="flex items-center space-x-3.5 border-b-2 border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-950 p-1.5 text-white flex flex-col items-center justify-center shadow-md border border-emerald-950 shrink-0">
              <span className="font-serif text-base font-black leading-none text-amber-300">الإمام</span>
              <span className="text-[6px] font-black uppercase tracking-widest text-center mt-0.5">Al-Imam</span>
            </div>
            <div>
              <h2 className="text-xl font-black tracking-wider text-slate-900 uppercase">
                DAFTAR HADIR PARENTING & RAPOR
              </h2>
              <div className="text-xs font-extrabold text-emerald-800 uppercase">
                {currentWaliKelas.kelas} • NOTULENSI PERTEMUAN WALI MURID
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {DAFTAR_PARENTING_DEFAULT.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-700 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-2 gap-2">
                  <h4 className="text-sm font-black text-slate-900">{item.pertemuan}</h4>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 w-fit">
                    {item.kehadiran}
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-600 flex flex-wrap gap-4">
                  <span>Tanggal: <strong className="text-slate-900">{item.tanggal}</strong></span>
                  <span>Tempat: <strong className="text-slate-900">{item.tempat}</strong></span>
                </div>

                <div className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200">
                  <strong className="block text-slate-900 mb-1">Notulensi / Kesepakatan Bersama:</strong>
                  {item.notulensi}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
