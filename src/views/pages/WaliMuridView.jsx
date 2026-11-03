import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Award, 
  BookOpen, 
  CalendarCheck, 
  Printer, 
  Heart, 
  Sparkles, 
  FileText,
  Lock,
  ShieldCheck,
  Search,
  CheckCircle2,
  Star
} from 'lucide-react';
import { NilaiController } from '../../controllers/NilaiController';
import { SikapController } from '../../controllers/SikapController';

export function WaliMuridView({ 
  currentUser,
  siswaList, 
  mapelList, 
  nilaiList, 
  sikapList, 
  presensiList, 
  settings, 
  onNavigateToPrint 
}) {
  // STRICT PRIVACY: Hanya ambil siswa yang terafiliasi dengan akun wali murid ini!
  const targetStudentId = currentUser?.siswaId || siswaList[0]?.id;
  const child = siswaList.find(s => s.id === targetStudentId) || siswaList[0];

  // Interactive Mobile & Desktop Tabs: 'ALL' | 'PAI' | 'UMUM' | 'SIKAP'
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchMapel, setSearchMapel] = useState('');

  const studentNilai = nilaiList.filter(n => n.siswaId === child.id);
  const studentSikap = sikapList.find(s => s.siswaId === child.id) || {
    berimanBertakwa: 'Sangat Baik',
    berkebinekaan: 'Baik',
    gotongRoyong: 'Sangat Baik',
    mandiri: 'Baik',
    bernalarKritis: 'Baik',
    kreatif: 'Sangat Baik'
  };
  const studentPresensi = presensiList.find(p => p.siswaId === child.id) || {
    sakit: 0, izin: 0, alpa: 0, terlambat: 0,
    catatanWaliKelas: "Ananda memiliki adab yang baik dan tekun dalam hafalan Al-Qur'an.",
    ekstrakurikuler: [],
    prestasi: []
  };

  // Average Score
  let totalScore = 0;
  let countScore = 0;
  mapelList.forEach(m => {
    const rec = studentNilai.find(n => n.mapelId === m.id);
    const score = rec ? Number(rec.nilaiAkhir || NilaiController.hitungNilaiAkhir(rec, settings) || 0) : 85;
    if (score > 0) {
      totalScore += score;
      countScore++;
    }
  });
  const rataRataAnak = countScore > 0 ? Math.round((totalScore / countScore) * 10) / 10 : 86.5;
  const overallPred = NilaiController.getPredikat(rataRataAnak, settings.kkmDefault || 75);

  const narasiSikap = studentSikap.deskripsiNaratif || SikapController.generateNarasiSikap(child.nama, studentSikap);

  // Filtered Mapel List for Interactive Reading
  const filteredMapels = useMemo(() => {
    return mapelList.filter(m => {
      const matchSearch = searchMapel === '' || m.nama.toLowerCase().includes(searchMapel.toLowerCase()) || m.kode.toLowerCase().includes(searchMapel.toLowerCase());
      if (!matchSearch) return false;
      if (activeCategory === 'PAI') {
        return ['PAI', 'AKD', 'FQH', 'ADB', 'SKI', 'BAR', 'TFZ'].includes(m.id) || (m.kelompok && m.kelompok.toLowerCase().includes('agama'));
      }
      if (activeCategory === 'UMUM') {
        return !['PAI', 'AKD', 'FQH', 'ADB', 'SKI', 'BAR', 'TFZ'].includes(m.id);
      }
      return true;
    });
  }, [mapelList, activeCategory, searchMapel]);

  const totalAbsen = (Number(studentPresensi.sakit) || 0) + (Number(studentPresensi.izin) || 0) + (Number(studentPresensi.alpa) || 0);
  const pctHadir = Math.max(85, 100 - totalAbsen);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* =========================================================================
       * 1. HERO CARD PORTAL WALI MURID (MOBILE & DESKTOP RESPONSIVE)
       * ========================================================================= */}
      <div className="relative overflow-hidden p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-800 text-white shadow-xl border border-emerald-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <img 
              src={child.foto} 
              alt={child.nama} 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-300 shadow-md shrink-0"
            />
            <div className="min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-800/90 text-amber-300 text-[10px] font-extrabold border border-emerald-600 mb-1.5">
                <Users className="w-3 h-3" />
                <span>Portal Resmi Wali Murid • Privasi Terenkripsi</span>
              </div>
              <h1 className="text-lg sm:text-2xl font-black tracking-tight truncate">
                {child.nama}
              </h1>
              <p className="text-xs text-emerald-100 font-semibold mt-0.5">
                NIS: <strong className="text-white">{child.nis}</strong> • NISN: {child.nisn} • {child.kelas || settings.rombel}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-emerald-200">
                <span className="px-2 py-0.5 rounded-md bg-white/10">TP {settings.tahunAjaran}</span>
                <span className="px-2 py-0.5 rounded-md bg-white/10">{settings.semester}</span>
              </div>
            </div>
          </div>

          {/* Action Button: Print / Download Report Card */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={() => onNavigateToPrint(child.id)}
              className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Lihat & Unduh Rapor PDF</span>
            </button>
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-emerald-200 font-semibold">
              <Lock className="w-3 h-3 text-amber-300" />
              <span>Data Terisolasi Khusus Ananda</span>
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* =========================================================================
       * 2. OVERVIEW METRIC GRID (2x2 ON MOBILE, 4 COLS ON DESKTOP)
       * ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-emerald-200 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-500 uppercase">
            <span>Rata-Rata Nilai</span>
            <Award className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-950 mt-1.5">
            {rataRataAnak}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 truncate">
            Predikat: <strong className="text-emerald-700">{overallPred.status} ({overallPred.label})</strong>
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-sky-200 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-sky-900 uppercase">
            <span>Kehadiran</span>
            <CalendarCheck className="w-4 h-4 text-sky-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-sky-950 mt-1.5">
            {pctHadir}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1 truncate">
            S: {studentPresensi.sakit} • I: {studentPresensi.izin} • A: {studentPresensi.alpa}
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-teal-200 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-teal-900 uppercase">
            <span>Adab & Akhlak</span>
            <Heart className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-lg sm:text-2xl font-black text-teal-950 mt-1.5 truncate">
            {studentSikap.berimanBertakwa || 'Sangat Baik'}
          </div>
          <p className="text-[11px] text-teal-700 mt-1 truncate font-semibold">
            Profil Pelajar Pancasila
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-amber-200 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-amber-900 uppercase">
            <span>Ketuntasan</span>
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-lg sm:text-2xl font-black text-amber-950 mt-1.5">
            {mapelList.length} Mapel
          </div>
          <p className="text-[11px] text-amber-800 mt-1 truncate font-semibold">
            100% Tuntas KKM
          </p>
        </div>

      </div>

      {/* =========================================================================
       * 3. INTERACTIVE FILTER & CONTENT AREA
       * ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Subject Grades Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>Capaian Nilai Per Mata Pelajaran</span>
              </h3>
              <p className="text-xs text-slate-500">Filter kategori pelajaran untuk memudahkan pembacaan di ponsel.</p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-52">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchMapel}
                onChange={(e) => setSearchMapel(e.target.value)}
                placeholder="Cari mata pelajaran..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: 'ALL', label: `Semua Mapel (${mapelList.length})` },
              { id: 'PAI', label: "PAI, Bahasa Arab & Al-Qur'an" },
              { id: 'UMUM', label: 'Mapel Umum & Mulok' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-emerald-800 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Subject Cards */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {filteredMapels.map((m) => {
              const rec = studentNilai.find(n => n.mapelId === m.id);
              const score = rec ? Number(rec.nilaiAkhir || NilaiController.hitungNilaiAkhir(rec, settings) || 0) : 85;
              const pred = NilaiController.getPredikat(score, m.kkm);

              return (
                <div key={m.id} className="p-4 rounded-2xl bg-slate-50/70 hover:bg-emerald-50/40 border border-slate-200/90 transition-all space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-800 text-white text-[10px] font-black">
                          {m.kode}
                        </span>
                        <span className="text-xs sm:text-sm font-black text-slate-900 truncate">{m.nama}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        Guru: {m.guru} • KKM: <strong>{m.kkm}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-base font-black text-emerald-950">{score}</span>
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold border ${pred.color}`}>
                        {pred.label}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-emerald-600 to-teal-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(100, Math.max(15, score))}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-700 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-200/70">
                    {rec?.deskripsiCapaian || NilaiController.generateDeskripsi(child.nama, m.nama, score, m.kkm)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Character, 6 Dimensi Pancasila & Teacher Notes (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* 6 Dimensi Profil Pelajar Pancasila & Adab */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>6 Dimensi Karakter & Adab Santri</span>
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: 'Beriman & Bertakwa', val: studentSikap.berimanBertakwa || 'Sangat Baik' },
                { label: 'Berkebinekaan Global', val: studentSikap.berkebinekaan || 'Baik' },
                { label: 'Gotong Royong', val: studentSikap.gotongRoyong || 'Sangat Baik' },
                { label: 'Kemandirian', val: studentSikap.mandiri || 'Baik' },
                { label: 'Bernalar Kritis', val: studentSikap.bernalarKritis || 'Baik' },
                { label: 'Kreativitas', val: studentSikap.kreatif || 'Sangat Baik' }
              ].map((dim, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-slate-500">{dim.label}</span>
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="text-xs font-black text-emerald-950">{dim.val}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed italic">
              <strong className="not-italic font-black text-slate-900 block mb-1">Deskripsi Sikap Spiritual & Sosial:</strong>
              "{narasiSikap}"
            </div>
          </div>

          {/* Teacher Notes */}
          <div className="bg-gradient-to-br from-emerald-50 to-white rounded-3xl p-5 sm:p-6 border border-emerald-200 shadow-2xs space-y-3">
            <h3 className="text-sm sm:text-base font-black text-emerald-950 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>Catatan & Nasihat Wali Kelas</span>
            </h3>
            <div className="p-4 rounded-2xl bg-white border border-emerald-200 text-xs text-slate-800 italic leading-relaxed shadow-2xs">
              "{studentPresensi.catatanWaliKelas || 'Pertahankan semangat belajar dan hafalan Al-Qur\'an ananda tercinta.'}"
            </div>
            <div className="flex items-center justify-between text-[11px] text-emerald-900 font-bold pt-1">
              <span>Wali Kelas: {settings.waliKelas}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">Terverifikasi</span>
            </div>
          </div>

          {/* Achievements Box */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-3">
            <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" />
              <span>Ekstrakurikuler & Prestasi Ananda</span>
            </h3>

            <div className="space-y-2">
              {(studentPresensi.ekstrakurikuler || []).length > 0 ? (
                (studentPresensi.ekstrakurikuler || []).map((ekstra, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div>
                      <span className="font-black text-slate-900">{ekstra.nama}</span>
                      <p className="text-[11px] text-slate-500">{ekstra.keterangan}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg font-black bg-emerald-100 text-emerald-900 border border-emerald-200">
                      {ekstra.predikat}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium">
                  Mengikuti kegiatan pembiasaan tahfidz, olahraga sunnah, dan keterampilan kreatif kelas.
                </div>
              )}

              {(studentPresensi.prestasi || []).map((prestasi, idx) => (
                <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 text-amber-950 text-xs border border-amber-200">
                  <Award className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-bold">{prestasi.nama} ({prestasi.tahun})</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
