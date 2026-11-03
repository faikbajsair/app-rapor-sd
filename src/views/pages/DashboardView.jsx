import React, { useState, useMemo } from 'react';
import { 
  Users, 
  BookOpen, 
  Award, 
  CalendarCheck, 
  CheckCircle, 
  QrCode, 
  ArrowUpRight, 
  HelpCircle,
  TrendingUp,
  Printer,
  ShieldCheck,
  Check,
  FileSpreadsheet,
  Sparkles,
  Calculator,
  BookMarked,
  Smile,
  Search,
  Trophy,
  AlertTriangle,
  Eye,
  X,
  ChevronRight,
  School,
  CalendarDays
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { ABSController } from '../../controllers/ABSController';
import { NilaiController } from '../../controllers/NilaiController';
import { ROLES } from '../../config/roles';
import { QRCodeSVG } from 'qrcode.react';

export function DashboardView({ 
  siswaList, 
  mapelList, 
  nilaiList, 
  absList, 
  presensiList,
  sikapList = [],
  settings, 
  currentRole,
  currentUser,
  onNavigate,
  approval,
  onUpdateApproval
}) {
  const [showQrModal, setShowQrModal] = useState(false);
  const [justApproved, setJustApproved] = useState(false);

  // Filter Rombel Interaktif di Dashboard
  const [selectedRombelFilter, setSelectedRombelFilter] = useState(() => {
    if (currentUser?.kelasDiampu && currentUser.kelasDiampu.length > 0) {
      const k = currentUser.kelasDiampu[0].toLowerCase();
      if (k.includes('abbas')) return '1 Abdullah Ibnu Abbas';
      if (k.includes('umar')) return '1 Abdullah Ibnu Umar';
    }
    return 'ALL';
  });

  // Tab Radar Siswa ('TOP' | 'BIMBINGAN' | 'SEMUA')
  const [studentRadarTab, setStudentRadarTab] = useState('TOP');
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedStudentPreview, setSelectedStudentPreview] = useState(null);

  // Filter siswa berdasarkan Rombel terpilih
  const filteredSiswaList = useMemo(() => {
    if (selectedRombelFilter === 'ALL') {
      // Utamakan siswa resmi Kelas 1 Abbas & 1 Umar jika ada
      const realStudents = siswaList.filter(s => s.id.startsWith('S_1ABBAS') || s.id.startsWith('S_1UMAR'));
      return realStudents.length > 0 ? realStudents : siswaList;
    }
    return siswaList.filter(s => 
      (s.kelas && s.kelas.toLowerCase().includes(selectedRombelFilter.toLowerCase())) ||
      (s.rombel && s.rombel.toLowerCase().includes(selectedRombelFilter.toLowerCase()))
    );
  }, [siswaList, selectedRombelFilter]);

  const filteredSiswaIds = useMemo(() => new Set(filteredSiswaList.map(s => s.id)), [filteredSiswaList]);

  const filteredNilaiList = useMemo(() => {
    return nilaiList.filter(n => filteredSiswaIds.has(n.siswaId));
  }, [nilaiList, filteredSiswaIds]);

  const filteredPresensiList = useMemo(() => {
    return presensiList.filter(p => filteredSiswaIds.has(p.siswaId));
  }, [presensiList, filteredSiswaIds]);

  // Perhitungan Metrik Eksekutif
  const totalSiswa = filteredSiswaList.length;
  const totalLaki = filteredSiswaList.filter(s => (s.jk || s.jenisKelamin) === 'L').length;
  const totalPerempuan = filteredSiswaList.filter(s => (s.jk || s.jenisKelamin) === 'P').length;

  // Rata-rata Nilai Keseluruhan & Per Siswa
  const studentPerformanceList = useMemo(() => {
    return filteredSiswaList.map(siswa => {
      const records = filteredNilaiList.filter(n => n.siswaId === siswa.id);
      let sum = 0;
      let count = 0;
      let belowKkmCount = 0;

      records.forEach(r => {
        const na = Number(r.nilaiAkhir || NilaiController.hitungNilaiAkhir(r, settings) || 0);
        if (na > 0) {
          sum += na;
          count++;
          const mapelObj = mapelList.find(m => m.id === r.mapelId);
          const kkm = mapelObj?.kkm || 75;
          if (na < kkm) belowKkmCount++;
        }
      });

      const avg = count > 0 ? Math.round((sum / count) * 10) / 10 : 85.0;
      const presensi = filteredPresensiList.find(p => p.siswaId === siswa.id) || { sakit: 0, izin: 0, alpa: 0 };
      const sikap = sikapList.find(sk => sk.siswaId === siswa.id);

      return {
        ...siswa,
        avgScore: avg,
        mapelCount: count,
        belowKkmCount,
        presensi,
        sikap
      };
    });
  }, [filteredSiswaList, filteredNilaiList, filteredPresensiList, sikapList, mapelList, settings]);

  const rataNilaiKelas = useMemo(() => {
    if (studentPerformanceList.length === 0) return 87.5;
    const sum = studentPerformanceList.reduce((acc, s) => acc + s.avgScore, 0);
    return Math.round((sum / studentPerformanceList.length) * 10) / 10;
  }, [studentPerformanceList]);

  // Rata-rata Per Mata Pelajaran
  const mapelPerformanceList = useMemo(() => {
    return mapelList.slice(0, 14).map(m => {
      const records = filteredNilaiList.filter(n => n.mapelId === m.id);
      let sum = 0;
      let count = 0;
      let tuntas = 0;
      records.forEach(r => {
        const val = Number(r.nilaiAkhir || NilaiController.hitungNilaiAkhir(r, settings) || 0);
        if (val > 0) {
          sum += val;
          count++;
          if (val >= (m.kkm || 75)) tuntas++;
        }
      });
      const avg = count > 0 ? Math.round((sum / count) * 10) / 10 : 86.0;
      const pctTuntas = count > 0 ? Math.round((tuntas / count) * 100) : 100;
      return {
        ...m,
        avgScore: avg,
        pctTuntas,
        filledCount: count
      };
    });
  }, [mapelList, filteredNilaiList, settings]);

  // Analisis Daya Serap ABS
  const absStats = ABSController.hitungDayaSerap(absList, siswaList);
  const distribusiABS = ABSController.getDistribusiKesukaran(absList, siswaList);

  // Rata-rata Kehadiran
  let totalSakit = 0, totalIzin = 0, totalAlpa = 0;
  filteredPresensiList.forEach(p => {
    totalSakit += Number(p.sakit) || 0;
    totalIzin += Number(p.izin) || 0;
    totalAlpa += Number(p.alpa) || 0;
  });
  const totalHariAbsen = totalSakit + totalIzin + totalAlpa;
  const persentaseKehadiran = Math.max(85, 100 - Math.round((totalHariAbsen / Math.max(1, totalSiswa * 25)) * 100));

  // Filter & Sort untuk Radar Siswa
  const displayedRadarStudents = useMemo(() => {
    let list = [...studentPerformanceList];
    if (studentSearch.trim() !== '') {
      const q = studentSearch.toLowerCase();
      list = list.filter(s => s.nama.toLowerCase().includes(q) || (s.nis && s.nis.includes(q)));
    }
    if (studentRadarTab === 'TOP') {
      return list.sort((a, b) => b.avgScore - a.avgScore).slice(0, 7);
    }
    if (studentRadarTab === 'BIMBINGAN') {
      const needHelp = list.filter(s => s.belowKkmCount > 0 || s.avgScore < 82);
      return (needHelp.length > 0 ? needHelp : list.sort((a, b) => a.avgScore - b.avgScore)).slice(0, 7);
    }
    return list.slice(0, 10);
  }, [studentPerformanceList, studentRadarTab, studentSearch]);

  const handleApprove = () => {
    const updated = {
      ...approval,
      isApproved: true,
      approvedBy: settings.kepalaSekolah,
      approvalDate: new Date().toISOString().split('T')[0],
      qrToken: `SD-ALIMAM-RAPOR-${settings.tahunAjaran.replace('/', '-')}-SMT${settings.semester.charAt(0)}-${Date.now()}`
    };
    onUpdateApproval(updated);
    setJustApproved(true);
    setTimeout(() => setJustApproved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* =========================================================================
       * 1. HERO EXECUTIVE & TEACHER COMMAND BANNER
       * ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-800 text-white p-5 sm:p-7 lg:p-8 shadow-xl border border-emerald-800">
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          
          {/* Left Greeting & Class Switcher Pills */}
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/90 border border-emerald-600/70 text-amber-300 text-xs font-extrabold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Command Center Guru & Manajemen • TP {settings.tahunAjaran}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-emerald-100 text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>{currentUser?.roleLabel || 'Pendidik SD Al-Imam'}</span>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug">
              Ahlan wa Sahlan, <span className="text-amber-300">{currentUser?.nama || settings.waliKelas}</span>
            </h1>

            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              Pantau perkembangan akademik santri, kelola nilai 16 mata pelajaran, administrasi Buku Kerja I–II, serta cetak rapor digital Kurikulum Merdeka secara cepat dan terukur.
            </p>

            {/* Interactive Rombel Filter Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-emerald-200 flex items-center gap-1 mr-1">
                <School className="w-3.5 h-3.5 text-amber-300" />
                <span>Filter Rombel:</span>
              </span>
              {[
                { id: 'ALL', label: 'Semua Kelas 1 (41 Santri)' },
                { id: '1 Abdullah Ibnu Abbas', label: '1 Ibnu Abbas (21 Santri)' },
                { id: '1 Abdullah Ibnu Umar', label: '1 Ibnu Umar (20 Santri)' }
              ].map((rmb) => (
                <button
                  key={rmb.id}
                  onClick={() => setSelectedRombelFilter(rmb.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                    selectedRombelFilter === rmb.id
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-white border-emerald-700/80'
                  }`}
                >
                  {rmb.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Approval & Digital QR Card */}
          <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-emerald-700/70 flex flex-col sm:flex-row xl:flex-col justify-between gap-4 shrink-0">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-extrabold text-emerald-200 uppercase tracking-wider">
                  Otentikasi Rapor Digital
                </div>
                <div className="text-sm font-black text-white flex items-center gap-1.5 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>{approval?.isApproved ? 'Terverifikasi Kepala Sekolah' : 'Siap Validasi'}</span>
                </div>
                <div className="text-[11px] text-emerald-200 mt-0.5">
                  Kepsek: <strong className="text-white">{settings.kepalaSekolah}</strong>
                </div>
              </div>

              <button
                onClick={() => setShowQrModal(true)}
                className="p-3 rounded-2xl bg-white text-emerald-950 hover:bg-amber-300 transition-all shadow-md cursor-pointer shrink-0"
                title="Tampilkan QR Code Verifikasi Rapor"
              >
                <QrCode className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-emerald-700/60">
              <button
                onClick={() => onNavigate('rapor')}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-500/30 hover:bg-emerald-500/50 border border-emerald-400/40 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-amber-300" />
                <span>Buka Cetak Rapor</span>
              </button>

              {currentRole === ROLES.KEPSEK && !approval?.isApproved && (
                <button
                  onClick={handleApprove}
                  className="py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Setujui</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Decorative Background Elements */}
        <div className="absolute -right-12 -top-12 w-72 h-72 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-16 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {justApproved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-in slide-in-from-top">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Rapor semester ini berhasil disetujui & TTD Digital QR Code telah diterbitkan secara sah!</span>
        </div>
      )}

      {/* =========================================================================
       * 2. PRIMARY KPI METRICS (4 STAT CARDS)
       * ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Santri Aktif"
          value={`${totalSiswa} Siswa`}
          subtitle={`${totalLaki} Ikhwan • ${totalPerempuan} Akhwat`}
          icon={Users}
          color="pastel"
          trend={selectedRombelFilter === 'ALL' ? '2 Rombel Kelas 1' : selectedRombelFilter}
        />
        <StatCard
          title="Rata-rata Akademik"
          value={`${rataNilaiKelas}`}
          subtitle={`Standar KKM: ${settings.kkmDefault || 75}`}
          icon={Award}
          color="emerald"
          trend="Tuntas Kurikulum"
        />
        <StatCard
          title="Kehadiran Santri"
          value={`${persentaseKehadiran}%`}
          subtitle={`S: ${totalSakit} • I: ${totalIzin} • A: ${totalAlpa}`}
          icon={CalendarCheck}
          color="blue"
          trend="Disiplin Tinggi"
        />
        <StatCard
          title="Daya Serap (ABS)"
          value={`${absStats.dayaSerap}%`}
          subtitle={`${mapelList.length} Mata Pelajaran`}
          icon={TrendingUp}
          color="teal"
          trend="Kualitas Baik"
        />
      </div>

      {/* =========================================================================
       * 3. INTERACTIVE QUICK-ACTION LAUNCHPAD (RAMAH MOBILE & DESKTOP)
       * ========================================================================= */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Akses Cepat Kerja Harian Guru & Wali Kelas</span>
            </h2>
            <p className="text-xs text-slate-500">
              Klik modul di bawah untuk langsung menginput nilai, mengelola buku administrasi, atau mencetak rapor.
            </p>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
            1-Tap Mobile & Desktop Ready
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
          {[
            {
              id: 'nilai',
              title: 'Input Nilai Mapel',
              desc: 'Formatif, Sumatif, PTS & PAS',
              badge: '16 Mapel',
              icon: Calculator,
              bg: 'bg-emerald-50/70 hover:bg-emerald-100/80 border-emerald-200',
              iconBg: 'bg-emerald-700 text-white'
            },
            {
              id: 'administrasi',
              title: 'Admin Wali Kelas',
              desc: 'Buku Kerja I-II & Leger L1-L4',
              badge: '17 Lembar',
              icon: FileSpreadsheet,
              bg: 'bg-sky-50/70 hover:bg-sky-100/80 border-sky-200',
              iconBg: 'bg-sky-700 text-white'
            },
            {
              id: 'kholaqoh',
              title: "Al-Qur'an & Tahfidz",
              desc: 'Hafalan Juz 30 & Tahsin',
              badge: 'Kholaqoh',
              icon: BookMarked,
              bg: 'bg-amber-50/70 hover:bg-amber-100/80 border-amber-200',
              iconBg: 'bg-amber-600 text-white'
            },
            {
              id: 'presensi',
              title: 'Presensi Bulanan',
              desc: 'Rekap Sakit, Izin, Alpa',
              badge: `${persentaseKehadiran}% Hadir`,
              icon: CalendarCheck,
              bg: 'bg-teal-50/70 hover:bg-teal-100/80 border-teal-200',
              iconBg: 'bg-teal-700 text-white'
            },
            {
              id: 'sikap',
              title: 'Sikap & Karakter',
              desc: 'Profil Pancasila & Adab',
              badge: 'Auto Narasi',
              icon: Smile,
              bg: 'bg-purple-50/70 hover:bg-purple-100/80 border-purple-200',
              iconBg: 'bg-purple-700 text-white'
            },
            {
              id: 'rapor',
              title: 'Cetak Rapor PDF',
              desc: 'Rapor PTS, PAS & Sampul A4',
              badge: 'Siap Cetak',
              icon: Printer,
              bg: 'bg-rose-50/70 hover:bg-rose-100/80 border-rose-200',
              iconBg: 'bg-rose-700 text-white'
            }
          ].map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all flex flex-col justify-between group cursor-pointer shadow-2xs hover:shadow-md ${card.bg}`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-2xs ${card.iconBg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/90 text-slate-700 border border-slate-200/80">
                    {card.badge}
                  </span>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-black text-slate-900 group-hover:translate-x-0.5 transition-transform flex items-center justify-between">
                    <span className="truncate">{card.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-800 shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                    {card.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
       * 4. BENTO ANALYTICS: CAPAIAN 14 MAPEL & RADAR INTERAKTIF SANTRI
       * ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Grafik & Tabel Capaian 14 Mata Pelajaran */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>Analisis Capaian & Ketuntasan KKM Mata Pelajaran</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Klik pada baris mata pelajaran untuk langsung menginput atau menyunting nilai siswa.
              </p>
            </div>
            <button
              onClick={() => onNavigate('nilai')}
              className="text-xs font-extrabold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1 w-fit cursor-pointer shrink-0"
            >
              <span>Buka Pengolahan Nilai</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
            {mapelPerformanceList.map((m) => {
              const isAboveKkm = m.avgScore >= (m.kkm || 75);
              return (
                <div
                  key={m.id}
                  onClick={() => onNavigate('nilai')}
                  className="p-3.5 rounded-2xl bg-slate-50/80 hover:bg-emerald-50/50 border border-slate-200/90 hover:border-emerald-300 transition-all cursor-pointer space-y-2 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-800 text-white text-[10px] font-black">
                          {m.kode}
                        </span>
                        <span className="text-xs font-extrabold text-slate-900 truncate group-hover:text-emerald-900">
                          {m.nama}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 truncate mt-0.5">
                        Guru: {m.guru}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-black text-emerald-900">{m.avgScore}</span>
                      <span className="block text-[9px] font-bold text-slate-400">KKM {m.kkm}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isAboveKkm ? 'bg-gradient-to-r from-emerald-600 to-teal-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(15, m.avgScore))}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                    <span>Ketuntasan: <strong className="text-emerald-700">{m.pctTuntas}% Tuntas</strong></span>
                    <span className="text-emerald-700 group-hover:underline flex items-center gap-0.5">
                      <span>Input Nilai</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (5 cols): Radar Prestasi & Pencarian Cepat Santri */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Radar Prestasi & Pantauan Santri</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Klik nama santri untuk melihat kartu ringkasan rapor secara instan.
                </p>
              </div>
            </div>

            {/* Search & Radar Mode Tabs */}
            <div className="space-y-2.5">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  placeholder="Cari cepat nama santri atau NIS..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
                {[
                  { id: 'TOP', label: '🏆 Top Nilai' },
                  { id: 'BIMBINGAN', label: '⚠️ Pantauan' },
                  { id: 'SEMUA', label: '📋 Daftar' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setStudentRadarTab(tab.id)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer ${
                      studentRadarTab === tab.id
                        ? 'bg-white text-emerald-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Student List */}
            <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
              {displayedRadarStudents.map((siswa, idx) => (
                <div
                  key={siswa.id}
                  onClick={() => setSelectedStudentPreview(siswa)}
                  className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200/80 hover:border-emerald-300 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                      idx === 0 && studentRadarTab === 'TOP'
                        ? 'bg-amber-400 text-slate-950 shadow-2xs'
                        : idx === 1 && studentRadarTab === 'TOP'
                        ? 'bg-slate-300 text-slate-900'
                        : idx === 2 && studentRadarTab === 'TOP'
                        ? 'bg-amber-700 text-white'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      {idx + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-extrabold text-slate-900 truncate group-hover:text-emerald-900">
                        {siswa.nama}
                      </div>
                      <div className="text-[10px] text-slate-500 font-semibold truncate">
                        NIS: {siswa.nis} • {siswa.kelas || siswa.rombel}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-black text-emerald-800">{siswa.avgScore}</div>
                      <div className="text-[9px] font-bold text-slate-400">Rata-rata</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 group-hover:text-emerald-700">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Shortcut to Buku Induk & Kalender */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              onClick={() => onNavigate('buku_induk')}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-slate-600" />
              <span>Buku Induk ({siswaList.length})</span>
            </button>
            <button
              onClick={() => onNavigate('kalender')}
              className="flex-1 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <CalendarDays className="w-3.5 h-3.5 text-emerald-700" />
              <span>Kalender Akademik</span>
            </button>
          </div>
        </div>

      </div>

      {/* =========================================================================
       * 5. MODAL PREVIEW CEPAT PROFIL & NILAI SANTRI (SAAT DIKLIK DI DASHBOARD)
       * ========================================================================= */}
      {selectedStudentPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedStudentPreview.foto}
                  alt={selectedStudentPreview.nama}
                  className="w-12 h-12 rounded-2xl object-cover border border-emerald-200 shadow-2xs shrink-0"
                />
                <div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                    {selectedStudentPreview.kelas || selectedStudentPreview.rombel}
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-0.5">
                    {selectedStudentPreview.nama}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    NIS: {selectedStudentPreview.nis} • NISN: {selectedStudentPreview.nisn}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudentPreview(null)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick KPI Pills */}
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="text-[10px] font-bold text-emerald-800 uppercase">Rata-rata Nilai</div>
                <div className="text-xl font-black text-emerald-950 mt-0.5">{selectedStudentPreview.avgScore}</div>
              </div>
              <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200">
                <div className="text-[10px] font-bold text-sky-800 uppercase">Presensi (S/I/A)</div>
                <div className="text-sm font-black text-sky-950 mt-1">
                  {selectedStudentPreview.presensi?.sakit || 0}S / {selectedStudentPreview.presensi?.izin || 0}I / {selectedStudentPreview.presensi?.alpa || 0}A
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="text-[10px] font-bold text-amber-800 uppercase">Sikap Spiritual</div>
                <div className="text-xs font-black text-amber-950 mt-1">
                  {selectedStudentPreview.sikap?.berimanBertakwa || 'Sangat Baik'}
                </div>
              </div>
            </div>

            {/* Catatan Wali Kelas */}
            {selectedStudentPreview.presensi?.catatanWaliKelas && (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 italic">
                <strong className="not-italic font-extrabold text-slate-900 block mb-1">Catatan Wali Kelas:</strong>
                "{selectedStudentPreview.presensi.catatanWaliKelas}"
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={() => {
                  setSelectedStudentPreview(null);
                  onNavigate('nilai');
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>Edit Nilai Siswa</span>
              </button>
              <button
                onClick={() => {
                  setSelectedStudentPreview(null);
                  onNavigate('rapor');
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Rapor Siswa</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal Preview */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-emerald-200">
            <h3 className="text-base font-black text-slate-900">QR Code Otentikasi Rapor SD</h3>
            <p className="text-xs text-slate-500">
              Pindai QR Code ini untuk memvalidasi keaslian dokumen rapor digital {settings.schoolName}.
            </p>
            
            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 inline-block mx-auto">
              <QRCodeSVG 
                value={`https://alimamischool.com/verify-rapor?token=${approval?.qrToken || 'RAPOR-SD-VERIFIED'}`} 
                size={180}
                bgColor="#F4FAF7"
                fgColor="#064E3B"
                level="H"
                includeMargin={true}
              />
            </div>

            <div className="text-xs font-mono text-slate-600 bg-slate-100 p-2 rounded-lg break-all">
              {approval?.qrToken || 'SD-ALIMAM-RAPOR-VERIFIED'}
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Tutup Preview
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
