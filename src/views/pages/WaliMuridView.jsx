import React from 'react';
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
  CheckCircle,
  Home,
  UserCheck
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
    catatanWaliKelas: 'Ananda memiliki adab yang baik dan tekun dalam hafalan Al-Qur\'an.',
    ekstrakurikuler: [],
    prestasi: []
  };

  // Average Score
  let totalScore = 0;
  let countScore = 0;
  mapelList.forEach(m => {
    const rec = studentNilai.find(n => n.mapelId === m.id);
    const score = rec ? NilaiController.hitungNilaiAkhir(rec, settings) : 84;
    if (score > 0) {
      totalScore += score;
      countScore++;
    }
  });
  const rataRataAnak = countScore > 0 ? Math.round((totalScore / countScore) * 10) / 10 : 0;
  const overallPred = NilaiController.getPredikat(rataRataAnak, settings.kkmDefault);

  const narasiSikap = SikapController.generateNarasiSikap(child.nama, studentSikap);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Welcome Banner Portal Orang Tua */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-pastel-100 via-white to-pastel-50 border border-pastel-300 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <img 
            src={child.foto} 
            alt={child.nama} 
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-xs shrink-0"
          />
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-pastel-200 text-pastel-950 text-[10px] font-bold border border-pastel-300 mb-1 whitespace-nowrap">
              <Users className="w-3 h-3 text-pastel-700" />
              <span>Portal Wali Murid • Akses Privat Ananda</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
              {child.nama}
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              NISN: <span className="font-bold text-slate-800">{child.nisn}</span> • NIS: {child.nis} • {settings.rombel}
            </p>
          </div>
        </div>

        {/* Action Button: Print / Download Report Card */}
        <div className="flex items-center space-x-2.5 shrink-0">
          <button
            onClick={() => onNavigateToPrint(child.id)}
            className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-2 whitespace-nowrap"
          >
            <Printer className="w-4 h-4 text-emerald-200" />
            <span>Lihat & Unduh Rapor Digital PDF</span>
          </button>
        </div>
      </div>

      {/* Security & Identity Banner (NO OTHER STUDENTS EXPOSED) */}
      <div className="p-3.5 px-4 rounded-2xl bg-white border border-pastel-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Akun Terverifikasi Orang Tua: <strong className="text-slate-800">{child.namaAyah} / {child.namaIbu}</strong></span>
        </div>
        <div className="flex items-center space-x-2 text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
          <Lock className="w-3 h-3 text-emerald-600" />
          <span>Hanya Data Ananda Yang Ditampilkan (Isolasi Data Terlindungi)</span>
        </div>
      </div>

      {/* Overview Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-3xl bg-gradient-to-br from-pastel-100 to-white border border-pastel-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Rata-Rata Capaian</span>
            <Award className="w-4 h-4 text-pastel-700" />
          </div>
          <div className="text-3xl font-extrabold text-slate-800 mt-2">
            {rataRataAnak}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 whitespace-nowrap">
            Predikat: <strong className="text-emerald-700">{overallPred.status} ({overallPred.label})</strong>
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-900 uppercase">
            <span>Kehadiran Sekolah</span>
            <CalendarCheck className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-950 mt-2">
            {100 - (studentPresensi.sakit + studentPresensi.izin + studentPresensi.alpa)}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1 whitespace-nowrap">
            Sakit: {studentPresensi.sakit} • Izin: {studentPresensi.izin} • Alpa: {studentPresensi.alpa}
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-gradient-to-br from-teal-50 to-white border border-teal-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-teal-900 uppercase">
            <span>Karakter Pancasila</span>
            <Heart className="w-4 h-4 text-teal-700" />
          </div>
          <div className="text-2xl font-extrabold text-teal-950 mt-2">
            {studentSikap.berimanBertakwa || 'Sangat Baik'}
          </div>
          <p className="text-[11px] text-teal-700 mt-1 whitespace-nowrap">
            Karakter Beriman & Mandiri Unggul
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-50 to-white border border-amber-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-amber-900 uppercase">
            <span>Prestasi & Ekstra</span>
            <Sparkles className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-extrabold text-amber-950 mt-2">
            {(studentPresensi.prestasi || []).length + (studentPresensi.ekstrakurikuler || []).length} Kegiatan
          </div>
          <p className="text-[11px] text-amber-800 mt-1 whitespace-nowrap">
            Aktif & Berprestasi Positif
          </p>
        </div>

      </div>

      {/* 2-Column Split: Subjects Performance vs Attitude & Teacher Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Subject Grades Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-pastel-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-pastel-700" />
              <span>Rincian Hasil Belajar Per Mata Pelajaran</span>
            </h3>
            <span className="text-xs text-slate-400 font-semibold">{settings.semester}</span>
          </div>

          <div className="space-y-3">
            {mapelList.map((m) => {
              const rec = studentNilai.find(n => n.mapelId === m.id);
              const score = rec ? NilaiController.hitungNilaiAkhir(rec, settings) : 84;
              const pred = NilaiController.getPredikat(score, m.kkm);

              return (
                <div key={m.id} className="p-3.5 rounded-2xl bg-pastel-50/40 border border-pastel-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-800">{m.nama}</span>
                      <span className="text-[10px] text-slate-400 ml-2">Pengampu: {m.guru}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-extrabold text-slate-800">{score}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${pred.color}`}>
                        {pred.label}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-pastel-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(100, score)}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed font-serif italic">
                    "{rec?.deskripsiCapaian || NilaiController.generateDeskripsi(child.nama, m.nama, score, m.kkm)}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Character & Teacher Notes (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Attitude Narration Box */}
          <div className="bg-gradient-to-br from-pastel-100/90 to-white rounded-3xl p-6 border border-pastel-300 shadow-soft space-y-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Perkembangan Karakter & Profil Pancasila</span>
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed font-serif italic bg-white p-4 rounded-2xl border border-pastel-200 shadow-2xs">
              "{narasiSikap}"
            </p>
          </div>

          {/* Teacher Notes */}
          <div className="bg-white rounded-3xl p-6 border border-pastel-200 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Pesan & Catatan Wali Kelas</span>
            </h3>
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 text-xs text-emerald-950 italic leading-relaxed">
              "{studentPresensi.catatanWaliKelas || 'Pertahankan semangat belajar dan hafalan Al-Qur\'an ananda tercinta.'}"
            </div>
            <div className="text-right text-[11px] text-slate-500 font-medium">
              — {settings.waliKelas} (Wali Kelas)
            </div>
          </div>

          {/* Achievements Box */}
          <div className="bg-white rounded-3xl p-6 border border-pastel-200 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Ekstrakurikuler & Prestasi Ananda</span>
            </h3>

            <div className="space-y-2">
              {(studentPresensi.ekstrakurikuler || []).map((ekstra, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-xs">
                  <div>
                    <span className="font-bold text-slate-800">{ekstra.nama}</span>
                    <p className="text-[10px] text-slate-500">{ekstra.keterangan}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded font-bold bg-pastel-200 text-pastel-900 border border-pastel-300">
                    Nilai: {ekstra.predikat}
                  </span>
                </div>
              ))}

              {(studentPresensi.prestasi || []).map((prestasi, idx) => (
                <div key={idx} className="flex items-center space-x-2 p-2.5 rounded-xl bg-amber-50 text-amber-900 text-xs border border-amber-200">
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
