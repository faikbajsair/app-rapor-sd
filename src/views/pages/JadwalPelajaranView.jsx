import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  Printer, 
  Clock, 
  BookOpen, 
  Layers, 
  Users, 
  GraduationCap, 
  FileSpreadsheet, 
  Building2, 
  Award, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  Filter,
  Search,
  School,
  Clock4,
  Flame,
  BookCheck,
  CalendarDays,
  Shirt
} from 'lucide-react';
import { 
  SEKOLAH_IDENTITAS, 
  MAPEL_KODE, 
  STRUKTUR_KURIKULUM, 
  TOTAL_JP_SEMESTER, 
  JAM_PELAJARAN_RESMI, 
  DAFTAR_KELAS, 
  JADWAL_GABUNGAN,
  SESI_KELAS_BAWAH,
  SESI_KELAS_ATAS
} from '../../config/jadwalData';
import { INITIAL_GTK_LIST } from '../../config/gtkData';

export function JadwalPelajaranView({ currentUser, currentRole, settings }) {
  // Tabs: 'GABUNGAN' | 'PER_KELAS' | 'STRUKTUR' | 'PER_GURU' | 'HOME'
  const [activeTab, setActiveTab] = useState('GABUNGAN');

  // Filter Hari untuk Jadwal Gabungan: 'SENIN' | 'SELASA' | 'RABU' | 'KAMIS' | 'JUMAT'
  const [selectedHari, setSelectedHari] = useState('SENIN');

  // Filter Kelas untuk Tab 'PER_KELAS'
  const [selectedKelasId, setSelectedKelasId] = useState('1Umar');

  // Filter Guru untuk Tab 'PER_GURU'
  const [selectedGuruId, setSelectedGuruId] = useState(() => {
    if (currentUser?.id && INITIAL_GTK_LIST.find(g => g.id === currentUser.id)) {
      return currentUser.id;
    }
    return INITIAL_GTK_LIST[0]?.id || 'GTK_01';
  });

  // Info kelas terpilih
  const currentKelas = useMemo(() => {
    return DAFTAR_KELAS.find(k => k.id === selectedKelasId) || DAFTAR_KELAS[0];
  }, [selectedKelasId]);

  // Info guru terpilih
  const currentGuru = useMemo(() => {
    return INITIAL_GTK_LIST.find(g => g.id === selectedGuruId) || INITIAL_GTK_LIST[0];
  }, [selectedGuruId]);

  // Helper mendapatkan badge style mapel
  const getMapelBadge = (kode) => {
    if (!kode) return 'bg-slate-100 text-slate-400 border-slate-200';
    const m = MAPEL_KODE[kode];
    if (m?.badgeClass) return m.badgeClass;
    return 'bg-slate-200 text-slate-800 border-slate-300 font-bold';
  };

  // Helper mendapatkan nama lengkap mapel
  const getMapelName = (kode) => {
    if (!kode) return '-';
    return MAPEL_KODE[kode]?.namaSingkat || MAPEL_KODE[kode]?.nama || kode;
  };

  // Hitung jadwal khusus untuk guru terpilih
  const jadwalGuruSeminggu = useMemo(() => {
    if (!currentGuru) return [];

    const result = [];
    const days = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT'];

    days.forEach(day => {
      const dayData = JADWAL_GABUNGAN[day];
      if (!dayData) return;

      // Cari di kelas bawah
      Object.entries(dayData.kelasBawah).forEach(([kelasId, slots]) => {
        const kInfo = DAFTAR_KELAS.find(k => k.id === kelasId);
        slots.forEach((kode, slotIdx) => {
          const sesiInfo = SESI_KELAS_BAWAH[slotIdx] || { jam: 'Sesi ' + (slotIdx + 1) };
          const isWaliThisClass = currentGuru.jabatan?.toLowerCase().includes('wali kelas') && 
                                  currentGuru.nama?.toLowerCase().includes(kInfo?.wali?.split(' ')[0]?.toLowerCase() || 'xyz');
          const isMapelMatch = currentGuru.mapelDiampu?.some(m => {
            const mapelLower = m.toLowerCase();
            const kodeLower = kode.toLowerCase();
            return (kodeLower === 'math' && mapelLower.includes('math')) ||
                   (kodeLower === 'ba' && mapelLower.includes('arab')) ||
                   (kodeLower === 'bi' && mapelLower.includes('inggris')) ||
                   (kodeLower === 'pjok' && mapelLower.includes('pjok')) ||
                   (kodeLower === 'k' && (mapelLower.includes('komputer') || mapelLower.includes('informatika'))) ||
                   ((kodeLower === 'a' || kodeLower === 'f' || kodeLower === 'ski') && mapelLower.includes('pai')) ||
                   (kodeLower === 'q' && (mapelLower.includes('qur') || mapelLower.includes('tahfidz')));
          });

          if ((isWaliThisClass && ['B.Ind', 'MTK', 'AD', 'Seni', 'MIPAS', 'BS', 'PP', 'Literasi'].includes(kode)) || isMapelMatch) {
            result.push({
              hari: dayData.label,
              jam: sesiInfo.jam,
              kelas: kInfo?.nama || kelasId,
              mapelKode: kode,
              mapelNama: getMapelName(kode),
              tingkat: 'Kelas Bawah'
            });
          }
        });
      });

      // Cari di kelas atas
      Object.entries(dayData.kelasAtas).forEach(([kelasId, slots]) => {
        const kInfo = DAFTAR_KELAS.find(k => k.id === kelasId);
        slots.forEach((kode, slotIdx) => {
          const sesiInfo = SESI_KELAS_ATAS[slotIdx] || { jam: 'Sesi ' + (slotIdx + 1) };
          const isWaliThisClass = currentGuru.jabatan?.toLowerCase().includes('wali kelas') && 
                                  currentGuru.nama?.toLowerCase().includes(kInfo?.wali?.split(' ')[0]?.toLowerCase() || 'xyz');
          const isMapelMatch = currentGuru.mapelDiampu?.some(m => {
            const mapelLower = m.toLowerCase();
            const kodeLower = kode.toLowerCase();
            return (kodeLower === 'math' && mapelLower.includes('math')) ||
                   (kodeLower === 'ba' && mapelLower.includes('arab')) ||
                   (kodeLower === 'bi' && mapelLower.includes('inggris')) ||
                   (kodeLower === 'pjok' && mapelLower.includes('pjok')) ||
                   (kodeLower === 'k' && (mapelLower.includes('komputer') || mapelLower.includes('informatika'))) ||
                   ((kodeLower === 'a' || kodeLower === 'f' || kodeLower === 'ski') && mapelLower.includes('pai')) ||
                   (kodeLower === 'q' && (mapelLower.includes('qur') || mapelLower.includes('tahfidz')));
          });

          if ((isWaliThisClass && ['B.Ind', 'MTK', 'AD', 'Seni', 'MIPAS', 'BS', 'PP', 'Literasi'].includes(kode)) || isMapelMatch) {
            result.push({
              hari: dayData.label,
              jam: sesiInfo.jam,
              kelas: kInfo?.nama || kelasId,
              mapelKode: kode,
              mapelNama: getMapelName(kode),
              tingkat: 'Kelas Atas'
            });
          }
        });
      });
    });

    return result;
  }, [currentGuru]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner Jadwal Pelajaran */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold text-emerald-100 border border-white/20">
              <CalendarDays className="w-3.5 h-3.5 text-emerald-300" />
              <span>Jadwal Pelajaran & KBM Resmi T.P 2026/2027</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {SEKOLAH_IDENTITAS.namaSekolah}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Jadwal Pembelajaran Tatap Muka Kurikulum Merdeka Terpadu: 6 Rombel Kelas Bawah (1 Umar – 3 Malik) dan 7 Rombel Kelas Atas (4 Ali – 6 Hafshah), dilengkapi Alokasi JP dan Jadwal Mengajar GTK.
            </p>
            <div className="inline-flex items-center gap-2 pt-1">
              <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                {SEKOLAH_IDENTITAS.motto}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-2xl bg-white text-emerald-950 font-black text-xs sm:text-sm shadow-md hover:bg-emerald-50 transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-emerald-700" />
              <span>Cetak Jadwal Pelajaran</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* =========================================================================
       * BILAH TAB DOKUMEN RESMI SPREADSHEET
       * ========================================================================= */}
      <div className="bg-white p-2.5 rounded-3xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2 px-2 text-xs font-bold text-slate-500">
          <div className="flex items-center space-x-1.5">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Lembar Dokumen Resmi Spreadsheet (Pilih Mode):</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-400">
            NPSN: {SEKOLAH_IDENTITAS.npsn} • NSS: {SEKOLAH_IDENTITAS.nss}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {[
            { id: 'GABUNGAN', label: 'Jadwal Gabungan', desc: 'Matriks Master Seluruh Rombel', badge: 'Semua Kelas', icon: Layers },
            { id: 'PER_KELAS', label: 'Lembar Per Kelas', desc: 'Format Cetak Kelas 1-6 Resmi', badge: 'Format Cetak', icon: Users },
            { id: 'PER_GURU', label: 'Jadwal Mengajar GTK', desc: 'Alokasi Jadwal per Guru', badge: '34 Guru', icon: GraduationCap },
            { id: 'STRUKTUR', label: 'Struktur Kurikulum', desc: 'Alokasi JP Mapel & Mulok', badge: '44 - 47 JP', icon: FileSpreadsheet },
            { id: 'HOME', label: 'Identitas Sekolah', desc: 'Profil Lembaga & Kontak', badge: 'Profil', icon: Building2 }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                </div>
                <div className="font-extrabold text-xs tracking-tight truncate">
                  {tab.label}
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                  {tab.desc}
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
       * TAB 1: JADWAL GABUNGAN (MATRIKS LENGKAP KELAS BAWAH & KELAS ATAS)
       * ========================================================================= */}
      {activeTab === 'GABUNGAN' && (
        <div className="space-y-6">

          {/* Sub Controls: Pilih Hari & Keterangan Waktu */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Hari Selector */}
            <div className="flex items-center space-x-1.5 p-1 bg-slate-100 rounded-2xl overflow-x-auto">
              {[
                { id: 'SENIN', label: 'Senin' },
                { id: 'SELASA', label: 'Selasa' },
                { id: 'RABU', label: 'Rabu' },
                { id: 'KAMIS', label: 'Kamis' },
                { id: 'JUMAT', label: "Jum'at" }
              ].map((h) => (
                <button
                  key={h.id}
                  onClick={() => setSelectedHari(h.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                    selectedHari === h.id
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-500 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Pukul <strong>07.15</strong> (Upacara/Dzikir Pagi) s.d <strong>14.10</strong> (Kls Bawah) / <strong>15.30</strong> (Kls Atas)
              </span>
            </div>

          </div>

          {/* Legend Warna Mapel Spreadsheet */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-[11px] font-black uppercase text-slate-400 tracking-wider mb-2">
              Kode & Kategori Mata Pelajaran:
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {Object.entries(MAPEL_KODE).map(([kode, info]) => (
                <div 
                  key={kode}
                  title={`${info.nama} (${info.guruTipe})`}
                  className={`px-2 py-1 rounded-lg border text-[11px] font-black flex items-center space-x-1 cursor-default ${info.badgeClass}`}
                >
                  <span>{kode}</span>
                  <span className="text-[10px] opacity-80 font-normal">({info.namaSingkat})</span>
                </div>
              ))}
            </div>
          </div>

          {/* TABEL MATRIKS KELAS BAWAH (Kelas 1 - 3) */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-4 bg-emerald-950 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider block">Fase A & B</span>
                <h2 className="font-extrabold text-sm sm:text-base">
                  JADWAL KELAS BAWAH — HARI {selectedHari.toUpperCase()}
                </h2>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-white/20 font-bold">
                1 Umar, 1 Abbas, 2 Waqqash, 2 Zaid, 3 Zuhair, 3 Malik
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-center text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-black border-b border-slate-200 text-[11px]">
                    <th className="py-2.5 px-3 w-16 text-center">Sesi</th>
                    <th className="py-2.5 px-3 w-32 text-center">Waktu</th>
                    <th className="py-2.5 px-2 bg-emerald-100 text-emerald-900 border-r border-slate-200">1 Umar</th>
                    <th className="py-2.5 px-2 bg-emerald-100 text-emerald-900 border-r border-slate-200">1 Abbas</th>
                    <th className="py-2.5 px-2 bg-teal-100 text-teal-900 border-r border-slate-200">2 Waqqash</th>
                    <th className="py-2.5 px-2 bg-teal-100 text-teal-900 border-r border-slate-200">2 Zaid</th>
                    <th className="py-2.5 px-2 bg-amber-100 text-amber-900 border-r border-slate-200">3 Zuhair</th>
                    <th className="py-2.5 px-2 bg-amber-100 text-amber-900">3 Malik</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  
                  {/* Apel Pagi / Dzikir */}
                  <tr className="bg-emerald-50/70 font-bold text-slate-700">
                    <td className="py-2 px-2 text-slate-400">1</td>
                    <td className="py-2 px-2 text-[11px]">07.15 - 07.30</td>
                    <td colSpan="6" className="py-2 text-center text-emerald-900 font-extrabold tracking-wide">
                      {selectedHari === 'SENIN' ? 'Upacara Bendera Hari Senin' : 'Prosesi Pembacaan Dzikir Pagi & Karakter'}
                    </td>
                  </tr>

                  {/* Sesi 1 & 2 */}
                  {[0, 1].map((idx) => {
                    const sesi = SESI_KELAS_BAWAH[idx];
                    const slots = JADWAL_GABUNGAN[selectedHari]?.kelasBawah;
                    return (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2 px-2 font-bold text-slate-400">{idx + 2}</td>
                        <td className="py-2 px-2 text-[11px] font-semibold text-slate-600">{sesi?.jam}</td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["1Umar"]?.[idx])}`}>{slots?.["1Umar"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["1Abbas"]?.[idx])}`}>{slots?.["1Abbas"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["2Waqqash"]?.[idx])}`}>{slots?.["2Waqqash"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["2Zaid"]?.[idx])}`}>{slots?.["2Zaid"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["3Zuhair"]?.[idx])}`}>{slots?.["3Zuhair"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["3Malik"]?.[idx])}`}>{slots?.["3Malik"]?.[idx]}</span></td>
                      </tr>
                    );
                  })}

                  {/* Sesi 3 & 4 */}
                  {[2, 3].map((idx) => {
                    const sesi = SESI_KELAS_BAWAH[idx];
                    const slots = JADWAL_GABUNGAN[selectedHari]?.kelasBawah;
                    return (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2 px-2 font-bold text-slate-400">{idx + 2}</td>
                        <td className="py-2 px-2 text-[11px] font-semibold text-slate-600">{sesi?.jam}</td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["1Umar"]?.[idx])}`}>{slots?.["1Umar"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["1Abbas"]?.[idx])}`}>{slots?.["1Abbas"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["2Waqqash"]?.[idx])}`}>{slots?.["2Waqqash"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["2Zaid"]?.[idx])}`}>{slots?.["2Zaid"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["3Zuhair"]?.[idx])}`}>{slots?.["3Zuhair"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["3Malik"]?.[idx])}`}>{slots?.["3Malik"]?.[idx]}</span></td>
                      </tr>
                    );
                  })}

                  {/* Istirahat */}
                  <tr className="bg-slate-100/90 text-slate-600 font-bold">
                    <td className="py-1.5 text-slate-400">6</td>
                    <td className="py-1.5 text-[11px]">09.30 - 10.00</td>
                    <td colSpan="6" className="py-1.5 text-center uppercase tracking-wider text-[11px] font-extrabold text-slate-700">
                      ISTIRAHAT
                    </td>
                  </tr>

                  {/* Shalat Duha */}
                  <tr className="bg-emerald-50 text-emerald-950 font-bold">
                    <td className="py-1.5 text-slate-400">7</td>
                    <td className="py-1.5 text-[11px]">10.00 - 10.30</td>
                    <td colSpan="6" className="py-1.5 text-center text-[11px] font-extrabold">
                      Shalat Duha & Kultum
                    </td>
                  </tr>

                  {/* Sesi 5 & 6 */}
                  {[4, 5].map((idx) => {
                    const sesi = SESI_KELAS_BAWAH[idx];
                    const slots = JADWAL_GABUNGAN[selectedHari]?.kelasBawah;
                    return (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2 px-2 font-bold text-slate-400">{idx + 4}</td>
                        <td className="py-2 px-2 text-[11px] font-semibold text-slate-600">{sesi?.jam}</td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["1Umar"]?.[idx])}`}>{slots?.["1Umar"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["1Abbas"]?.[idx])}`}>{slots?.["1Abbas"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["2Waqqash"]?.[idx])}`}>{slots?.["2Waqqash"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["2Zaid"]?.[idx])}`}>{slots?.["2Zaid"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["3Zuhair"]?.[idx])}`}>{slots?.["3Zuhair"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["3Malik"]?.[idx])}`}>{slots?.["3Malik"]?.[idx]}</span></td>
                      </tr>
                    );
                  })}

                  {/* Literasi */}
                  <tr className="bg-slate-50 text-slate-600 font-semibold italic">
                    <td className="py-1.5 text-slate-400">10</td>
                    <td className="py-1.5 text-[11px]">11.30 - 12.00</td>
                    <td colSpan="6" className="py-1.5 text-center text-[11px]">
                      {selectedHari === 'JUMAT' ? "Persiapan Shalat Jum'at (Putra) / Keputrian (Putri)" : "Literasi Siswa"}
                    </td>
                  </tr>

                  {/* Makan Siang & Shalat Dzuhur */}
                  {selectedHari !== 'JUMAT' && (
                    <tr className="bg-blue-50/80 text-blue-950 font-bold">
                      <td className="py-1.5 text-slate-400">11</td>
                      <td className="py-1.5 text-[11px]">12.00 - 13.00</td>
                      <td colSpan="6" className="py-1.5 text-center text-[11px] font-extrabold">
                        Makan Siang & Shalat Dzuhur Berjama'ah
                      </td>
                    </tr>
                  )}

                  {/* Sesi 7 & 8 (Senin - Kamis) */}
                  {selectedHari !== 'JUMAT' && [6, 7].map((idx) => {
                    const sesi = SESI_KELAS_BAWAH[idx];
                    const slots = JADWAL_GABUNGAN[selectedHari]?.kelasBawah;
                    return (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2 px-2 font-bold text-slate-400">{idx + 5}</td>
                        <td className="py-2 px-2 text-[11px] font-semibold text-slate-600">{sesi?.jam}</td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["1Umar"]?.[idx])}`}>{slots?.["1Umar"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["1Abbas"]?.[idx])}`}>{slots?.["1Abbas"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["2Waqqash"]?.[idx])}`}>{slots?.["2Waqqash"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["2Zaid"]?.[idx])}`}>{slots?.["2Zaid"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["3Zuhair"]?.[idx])}`}>{slots?.["3Zuhair"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2.5 py-1 rounded-lg border block ${getMapelBadge(slots?.["3Malik"]?.[idx])}`}>{slots?.["3Malik"]?.[idx]}</span></td>
                      </tr>
                    );
                  })}

                  {/* Murajaah & Pulang */}
                  <tr className="bg-emerald-50 text-emerald-900 font-bold">
                    <td className="py-1.5 text-slate-400">14</td>
                    <td className="py-1.5 text-[11px]">14.00 - 14.10</td>
                    <td colSpan="6" className="py-1.5 text-center text-[11px]">
                      MURAJA'AH AL-QUR'AN
                    </td>
                  </tr>
                  <tr className="bg-slate-200 text-slate-900 font-black">
                    <td className="py-1.5 text-slate-400">15</td>
                    <td className="py-1.5 text-[11px]">14.10</td>
                    <td colSpan="6" className="py-1.5 text-center text-[11px]">
                      PULANG BERSAMA (RESPONSI / REMEDIAL)
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

          {/* TABEL MATRIKS KELAS ATAS (Kelas 4 - 6) */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-4 bg-teal-950 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-teal-300 font-bold uppercase tracking-wider block">Fase B & C</span>
                <h2 className="font-extrabold text-sm sm:text-base">
                  JADWAL KELAS ATAS — HARI {selectedHari.toUpperCase()}
                </h2>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-white/20 font-bold">
                4 Ali, 4 Sumayyah, 5 Utsman, 5 Rumaysha, 6 Abu, 6 Umar, 6 Hafshah
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-center text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-black border-b border-slate-200 text-[11px]">
                    <th className="py-2.5 px-3 w-16 text-center">Sesi</th>
                    <th className="py-2.5 px-3 w-32 text-center">Waktu</th>
                    <th className="py-2.5 px-2 bg-indigo-100 text-indigo-900 border-r border-slate-200">4 Ali</th>
                    <th className="py-2.5 px-2 bg-indigo-100 text-indigo-900 border-r border-slate-200">4 SMYYH</th>
                    <th className="py-2.5 px-2 bg-teal-100 text-teal-900 border-r border-slate-200">5 Utsman</th>
                    <th className="py-2.5 px-2 bg-teal-100 text-teal-900 border-r border-slate-200">5 RMYSHA</th>
                    <th className="py-2.5 px-2 bg-blue-100 text-blue-900 border-r border-slate-200">6.Abu</th>
                    <th className="py-2.5 px-2 bg-blue-100 text-blue-900 border-r border-slate-200">6 Umar</th>
                    <th className="py-2.5 px-2 bg-purple-100 text-purple-900">6 HFSHA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">

                  {/* Apel Pagi / Dzikir */}
                  <tr className="bg-teal-50/70 font-bold text-slate-700">
                    <td className="py-2 px-2 text-slate-400">1</td>
                    <td className="py-2 px-2 text-[11px]">07.15 - 07.30</td>
                    <td colSpan="7" className="py-2 text-center text-teal-950 font-extrabold tracking-wide">
                      {selectedHari === 'SENIN' ? 'Upacara Bendera Hari Senin' : 'Prosesi Pembacaan Dzikir Pagi & Pembinaan Karakter'}
                    </td>
                  </tr>

                  {/* Sesi 1 & 2 */}
                  {[0, 1].map((idx) => {
                    const sesi = SESI_KELAS_ATAS[idx];
                    const slots = JADWAL_GABUNGAN[selectedHari]?.kelasAtas;
                    return (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2 px-2 font-bold text-slate-400">{idx + 2}</td>
                        <td className="py-2 px-2 text-[11px] font-semibold text-slate-600">{sesi?.jam}</td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["4Ali"]?.[idx])}`}>{slots?.["4Ali"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["4Sumayyah"]?.[idx])}`}>{slots?.["4Sumayyah"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["5Utsman"]?.[idx])}`}>{slots?.["5Utsman"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["5Rumaysha"]?.[idx])}`}>{slots?.["5Rumaysha"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["6Abu"]?.[idx])}`}>{slots?.["6Abu"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["6Umar"]?.[idx])}`}>{slots?.["6Umar"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["6Hafshah"]?.[idx])}`}>{slots?.["6Hafshah"]?.[idx]}</span></td>
                      </tr>
                    );
                  })}

                  {/* Sesi 3 & 4 */}
                  {[2, 3].map((idx) => {
                    const sesi = SESI_KELAS_ATAS[idx];
                    const slots = JADWAL_GABUNGAN[selectedHari]?.kelasAtas;
                    return (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2 px-2 font-bold text-slate-400">{idx + 2}</td>
                        <td className="py-2 px-2 text-[11px] font-semibold text-slate-600">{sesi?.jam}</td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["4Ali"]?.[idx])}`}>{slots?.["4Ali"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["4Sumayyah"]?.[idx])}`}>{slots?.["4Sumayyah"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["5Utsman"]?.[idx])}`}>{slots?.["5Utsman"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["5Rumaysha"]?.[idx])}`}>{slots?.["5Rumaysha"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["6Abu"]?.[idx])}`}>{slots?.["6Abu"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["6Umar"]?.[idx])}`}>{slots?.["6Umar"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["6Hafshah"]?.[idx])}`}>{slots?.["6Hafshah"]?.[idx]}</span></td>
                      </tr>
                    );
                  })}

                  {/* Istirahat */}
                  <tr className="bg-slate-100/90 text-slate-600 font-bold">
                    <td className="py-1.5 text-slate-400">6</td>
                    <td className="py-1.5 text-[11px]">09.30 - 10.00</td>
                    <td colSpan="7" className="py-1.5 text-center uppercase tracking-wider text-[11px] font-extrabold text-slate-700">
                      ISTIRAHAT
                    </td>
                  </tr>

                  {/* Shalat Duha */}
                  <tr className="bg-teal-50 text-teal-950 font-bold">
                    <td className="py-1.5 text-slate-400">7</td>
                    <td className="py-1.5 text-[11px]">10.00 - 10.30</td>
                    <td colSpan="7" className="py-1.5 text-center text-[11px] font-extrabold">
                      Shalat Duha & Kultum
                    </td>
                  </tr>

                  {/* Sesi 5 & 6 */}
                  {[4, 5].map((idx) => {
                    const sesi = SESI_KELAS_ATAS[idx];
                    const slots = JADWAL_GABUNGAN[selectedHari]?.kelasAtas;
                    return (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2 px-2 font-bold text-slate-400">{idx + 4}</td>
                        <td className="py-2 px-2 text-[11px] font-semibold text-slate-600">{sesi?.jam}</td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["4Ali"]?.[idx])}`}>{slots?.["4Ali"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["4Sumayyah"]?.[idx])}`}>{slots?.["4Sumayyah"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["5Utsman"]?.[idx])}`}>{slots?.["5Utsman"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["5Rumaysha"]?.[idx])}`}>{slots?.["5Rumaysha"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["6Abu"]?.[idx])}`}>{slots?.["6Abu"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["6Umar"]?.[idx])}`}>{slots?.["6Umar"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["6Hafshah"]?.[idx])}`}>{slots?.["6Hafshah"]?.[idx]}</span></td>
                      </tr>
                    );
                  })}

                  {/* Literasi */}
                  <tr className="bg-slate-50 text-slate-600 font-semibold italic">
                    <td className="py-1.5 text-slate-400">10</td>
                    <td className="py-1.5 text-[11px]">11.30 - 12.00</td>
                    <td colSpan="7" className="py-1.5 text-center text-[11px]">
                      {selectedHari === 'JUMAT' ? "Persiapan Shalat Jum'at (Putra) / Keputrian (Putri)" : "Literasi Siswa"}
                    </td>
                  </tr>

                  {/* Makan Siang & Shalat Dzuhur */}
                  {selectedHari !== 'JUMAT' && (
                    <tr className="bg-blue-50/80 text-blue-950 font-bold">
                      <td className="py-1.5 text-slate-400">11</td>
                      <td className="py-1.5 text-[11px]">12.00 - 13.00</td>
                      <td colSpan="7" className="py-1.5 text-center text-[11px] font-extrabold">
                        Makan Siang & Shalat Dzuhur Berjama'ah
                      </td>
                    </tr>
                  )}

                  {/* Khusus Jumat: Pramuka */}
                  {selectedHari === 'JUMAT' && (
                    <tr className="bg-amber-100 text-amber-950 font-black">
                      <td className="py-2 text-slate-400">12-13</td>
                      <td className="py-2 text-[11px]">13.00 - 14.30</td>
                      <td colSpan="7" className="py-2 text-center text-xs tracking-wider uppercase bg-amber-200/80 font-black">
                        PRAMUKA WAJIB KELAS ATAS (4, 5, 6)
                      </td>
                    </tr>
                  )}

                  {/* Sesi 7 s.d 10 (Senin - Kamis) */}
                  {selectedHari !== 'JUMAT' && [6, 7, 8, 9].map((idx) => {
                    const sesi = SESI_KELAS_ATAS[idx];
                    const slots = JADWAL_GABUNGAN[selectedHari]?.kelasAtas;
                    return (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2 px-2 font-bold text-slate-400">{idx + 6}</td>
                        <td className="py-2 px-2 text-[11px] font-semibold text-slate-600">{sesi?.jam}</td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["4Ali"]?.[idx])}`}>{slots?.["4Ali"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["4Sumayyah"]?.[idx])}`}>{slots?.["4Sumayyah"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["5Utsman"]?.[idx])}`}>{slots?.["5Utsman"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["5Rumaysha"]?.[idx])}`}>{slots?.["5Rumaysha"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["6Abu"]?.[idx])}`}>{slots?.["6Abu"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["6Umar"]?.[idx])}`}>{slots?.["6Umar"]?.[idx]}</span></td>
                        <td className="p-1"><span className={`px-2 py-1 rounded-lg border block ${getMapelBadge(slots?.["6Hafshah"]?.[idx])}`}>{slots?.["6Hafshah"]?.[idx]}</span></td>
                      </tr>
                    );
                  })}

                  {/* Shalat Ashar & Pulang */}
                  {selectedHari !== 'JUMAT' && (
                    <>
                      <tr className="bg-slate-100 text-slate-700 font-bold">
                        <td className="py-1.5 text-slate-400">16</td>
                        <td className="py-1.5 text-[11px]">15.00 - 15.30</td>
                        <td colSpan="7" className="py-1.5 text-center text-[11px]">
                          Persiapan dan Sholat Ashar Berjamaah
                        </td>
                      </tr>
                      <tr className="bg-slate-200/80 text-slate-800 font-extrabold">
                        <td className="py-1.5 text-slate-400">17</td>
                        <td className="py-1.5 text-[11px]">15.30</td>
                        <td colSpan="7" className="py-1.5 text-center text-[11px]">
                          Prosesi Pulang Bersama (Responsi / Bimbingan Santri)
                        </td>
                      </tr>
                    </>
                  )}

                  {selectedHari === 'JUMAT' && (
                    <tr className="bg-slate-200/80 text-slate-800 font-extrabold">
                      <td className="py-2 text-slate-400">14</td>
                      <td className="py-2 text-[11px]">14.30</td>
                      <td colSpan="7" className="py-2 text-center text-[11px]">
                        Prosesi Pulang Bersama Pasca Pramuka
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
       * TAB 2: LEMBAR RESMI PER KELAS (FORMAT PERSIS SPREADSHEET KELAS 1 & KELAS 2)
       * ========================================================================= */}
      {activeTab === 'PER_KELAS' && (
        <div className="space-y-6">

          {/* Selector Rombel Kelas */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-2">
              Pilih Lembar Jadwal Rombel Kelas:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {DAFTAR_KELAS.map((k) => (
                <button
                  key={k.id}
                  onClick={() => setSelectedKelasId(k.id)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer border ${
                    selectedKelasId === k.id
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs ring-2 ring-emerald-500/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {k.nama}
                </button>
              ))}
            </div>
          </div>

          {/* FORMAT LEMBAR RESMI KELAS (PERSIS DENGAN DOKUMEN CETAK SPREADSHEET) */}
          <div className="bg-white rounded-3xl border border-slate-300 shadow-lg overflow-hidden p-6 sm:p-8 space-y-6 print:border-none print:shadow-none print:p-0">
            
            {/* Header Surat Lembar Jadwal */}
            <div className="text-center pb-4 border-b-2 border-slate-800 space-y-1">
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-wider text-slate-900">
                JADWAL PELAJARAN SEMESTER GANJIL
              </h2>
              <h3 className="text-base sm:text-lg font-extrabold uppercase text-emerald-900">
                {SEKOLAH_IDENTITAS.namaSekolah}
              </h3>
              <p className="text-xs font-bold text-slate-600">
                TAHUN PELAJARAN {SEKOLAH_IDENTITAS.tahunPelajaran}
              </p>
            </div>

            {/* Informasi Kelas & Wali Kelas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-800 pb-2">
              <div>
                <span className="text-slate-500">Kelas : </span>
                <span className="font-black text-sm uppercase text-emerald-900">{currentKelas.nama}</span>
              </div>
              <div className="sm:text-right">
                <span className="text-slate-500">Wali Kelas : </span>
                <span className="font-black text-sm text-slate-900">{currentKelas.wali}</span>
              </div>
            </div>

            {/* Tabel Jadwal Mingguan Resmi */}
            <div className="overflow-x-auto">
              <table className="w-full text-center text-xs border border-slate-800 border-collapse">
                <thead>
                  {/* Header Hari */}
                  <tr className="bg-slate-100 text-slate-900 font-black border-b border-slate-800 text-[11px]">
                    <th rowSpan="2" className="py-2 px-2 border-r border-slate-800 w-12">NO</th>
                    <th rowSpan="2" className="py-2 px-2 border-r border-slate-800 w-36">WAKTU / SERAGAM</th>
                    <th className="py-1 px-2 border-r border-slate-800 bg-amber-50">SENIN</th>
                    <th className="py-1 px-2 border-r border-slate-800 bg-emerald-50">SELASA</th>
                    <th className="py-1 px-2 border-r border-slate-800 bg-amber-50">RABU</th>
                    <th className="py-1 px-2 border-r border-slate-800 bg-cyan-50">KAMIS</th>
                    <th className="py-1 px-2 bg-blue-50">JUM'AT</th>
                  </tr>
                  {/* Row Seragam */}
                  <tr className="bg-slate-50 font-black text-[10px] text-slate-700 border-b border-slate-800">
                    <th className="py-1 px-2 border-r border-slate-800 text-red-700">{currentKelas.seragam?.SENIN || "MERAH PUTIH"}</th>
                    <th className="py-1 px-2 border-r border-slate-800 text-emerald-700">{currentKelas.seragam?.SELASA || "HIJAU"}</th>
                    <th className="py-1 px-2 border-r border-slate-800 text-amber-700">{currentKelas.seragam?.RABU || "BATIK"}</th>
                    <th className="py-1 px-2 border-r border-slate-800 text-cyan-700">{currentKelas.seragam?.KAMIS || "OLAHRAGA"}</th>
                    <th className="py-1 px-2 text-indigo-700">{currentKelas.seragam?.JUMAT || "KOTAK-KOTAK"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-semibold text-slate-900">
                  
                  {/* 1. Apel / Dzikir */}
                  <tr className="border-b border-slate-800 font-bold">
                    <td className="py-1.5 px-1 border-r border-slate-800 font-bold">1</td>
                    <td className="py-1.5 px-2 border-r border-slate-800 text-[11px] font-bold">07.15 - 07.30</td>
                    <td className="border-r border-slate-800 bg-yellow-100 font-extrabold text-[11px]">Upacara</td>
                    <td colSpan="4" className="bg-lime-100 font-extrabold text-lime-950 text-[11px]">
                      Prosesi Pembacaan Dzikir
                    </td>
                  </tr>

                  {/* 2. Sesi 1 */}
                  <tr className="border-b border-slate-800">
                    <td className="py-1.5 px-1 border-r border-slate-800">2</td>
                    <td className="py-1.5 px-2 border-r border-slate-800 text-[11px]">07.30 - 08.00</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.SENIN.kelasBawah[currentKelas.id]?.[0])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.SELASA.kelasBawah[currentKelas.id]?.[0])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.RABU.kelasBawah[currentKelas.id]?.[0])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.KAMIS.kelasBawah[currentKelas.id]?.[0])}</td>
                    <td className="font-bold">{getMapelName(JADWAL_GABUNGAN.JUMAT.kelasBawah[currentKelas.id]?.[0])}</td>
                  </tr>

                  {/* 3. Sesi 2 */}
                  <tr className="border-b border-slate-800">
                    <td className="py-1.5 px-1 border-r border-slate-800">3</td>
                    <td className="py-1.5 px-2 border-r border-slate-800 text-[11px]">08.00 - 08.30</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.SENIN.kelasBawah[currentKelas.id]?.[1])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.SELASA.kelasBawah[currentKelas.id]?.[1])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.RABU.kelasBawah[currentKelas.id]?.[1])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.KAMIS.kelasBawah[currentKelas.id]?.[1])}</td>
                    <td className="font-bold">{getMapelName(JADWAL_GABUNGAN.JUMAT.kelasBawah[currentKelas.id]?.[1])}</td>
                  </tr>

                  {/* 4. Sesi 3 */}
                  <tr className="border-b border-slate-800">
                    <td className="py-1.5 px-1 border-r border-slate-800">4</td>
                    <td className="py-1.5 px-2 border-r border-slate-800 text-[11px]">08.30 - 09.00</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.SENIN.kelasBawah[currentKelas.id]?.[2])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.SELASA.kelasBawah[currentKelas.id]?.[2])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.RABU.kelasBawah[currentKelas.id]?.[2])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.KAMIS.kelasBawah[currentKelas.id]?.[2])}</td>
                    <td className="font-bold">{getMapelName(JADWAL_GABUNGAN.JUMAT.kelasBawah[currentKelas.id]?.[2])}</td>
                  </tr>

                  {/* 5. Sesi 4 */}
                  <tr className="border-b border-slate-800">
                    <td className="py-1.5 px-1 border-r border-slate-800">5</td>
                    <td className="py-1.5 px-2 border-r border-slate-800 text-[11px]">09.00 - 09.30</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.SENIN.kelasBawah[currentKelas.id]?.[3])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.SELASA.kelasBawah[currentKelas.id]?.[3])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.RABU.kelasBawah[currentKelas.id]?.[3])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.KAMIS.kelasBawah[currentKelas.id]?.[3])}</td>
                    <td className="font-bold">{getMapelName(JADWAL_GABUNGAN.JUMAT.kelasBawah[currentKelas.id]?.[3])}</td>
                  </tr>

                  {/* 6. Istirahat */}
                  <tr className="bg-slate-900 text-white font-black border-b border-slate-800">
                    <td className="py-1 px-1 border-r border-slate-800">6</td>
                    <td className="py-1 px-2 border-r border-slate-800 text-[11px]">09.30 - 10.00</td>
                    <td colSpan="5" className="py-1 text-center uppercase tracking-widest text-xs">
                      ISTIRAHAT
                    </td>
                  </tr>

                  {/* 7. Shalat Duha, Muraja'ah, & Kultum */}
                  <tr className="bg-lime-200 text-lime-950 font-black border-b border-slate-800">
                    <td className="py-1 px-1 border-r border-slate-800">7</td>
                    <td className="py-1 px-2 border-r border-slate-800 text-[11px]">10.00 - 10.30</td>
                    <td colSpan="5" className="py-1 text-center text-[11px]">
                      Shalat Duha, Muraja'ah, & Kultum
                    </td>
                  </tr>

                  {/* 8. Sesi 5 */}
                  <tr className="border-b border-slate-800">
                    <td className="py-1.5 px-1 border-r border-slate-800">8</td>
                    <td className="py-1.5 px-2 border-r border-slate-800 text-[11px]">10.30 - 11.00</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.SENIN.kelasBawah[currentKelas.id]?.[4])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.SELASA.kelasBawah[currentKelas.id]?.[4])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.RABU.kelasBawah[currentKelas.id]?.[4])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.KAMIS.kelasBawah[currentKelas.id]?.[4])}</td>
                    <td className="font-bold">{getMapelName(JADWAL_GABUNGAN.JUMAT.kelasBawah[currentKelas.id]?.[4])}</td>
                  </tr>

                  {/* 9. Sesi 6 */}
                  <tr className="border-b border-slate-800">
                    <td className="py-1.5 px-1 border-r border-slate-800">9</td>
                    <td className="py-1.5 px-2 border-r border-slate-800 text-[11px]">11.00 - 11.30</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.SENIN.kelasBawah[currentKelas.id]?.[5])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.SELASA.kelasBawah[currentKelas.id]?.[5])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.RABU.kelasBawah[currentKelas.id]?.[5])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.KAMIS.kelasBawah[currentKelas.id]?.[5])}</td>
                    <td className="font-bold">{getMapelName(JADWAL_GABUNGAN.JUMAT.kelasBawah[currentKelas.id]?.[5])}</td>
                  </tr>

                  {/* 10. Literasi / Sholat Jumat */}
                  <tr className="border-b border-slate-800 font-bold">
                    <td className="py-1.5 px-1 border-r border-slate-800">10</td>
                    <td className="py-1.5 px-2 border-r border-slate-800 text-[11px]">11.30 - 12.00</td>
                    <td className="border-r border-slate-800">LITERASI</td>
                    <td className="border-r border-slate-800">LITERASI</td>
                    <td className="border-r border-slate-800">LITERASI</td>
                    <td className="border-r border-slate-800">LITERASI</td>
                    <td className="font-black bg-blue-100 text-blue-950">SHOLAT JUMAT</td>
                  </tr>

                  {/* 11. Makan Siang / Pulang Jumat */}
                  <tr className="border-b border-slate-800 font-bold">
                    <td className="py-1.5 px-1 border-r border-slate-800">11</td>
                    <td className="py-1.5 px-2 border-r border-slate-800 text-[11px]">12.00 - 13.00</td>
                    <td colSpan="4" className="bg-slate-900 text-white font-extrabold text-[11px] py-1 border-r border-slate-800">
                      Makan Siang - Shalat Dzuhur Berjama'ah
                    </td>
                    <td rowSpan="5" className="bg-slate-100 text-slate-800 font-black text-sm align-middle">
                      PULANG
                    </td>
                  </tr>

                  {/* 12. Sesi 7 */}
                  <tr className="border-b border-slate-800">
                    <td className="py-1.5 px-1 border-r border-slate-800">12</td>
                    <td className="py-1.5 px-2 border-r border-slate-800 text-[11px]">13.00 - 13.30</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.SENIN.kelasBawah[currentKelas.id]?.[6])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.SELASA.kelasBawah[currentKelas.id]?.[6])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.RABU.kelasBawah[currentKelas.id]?.[6])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.KAMIS.kelasBawah[currentKelas.id]?.[6])}</td>
                  </tr>

                  {/* 13. Sesi 8 */}
                  <tr className="border-b border-slate-800">
                    <td className="py-1.5 px-1 border-r border-slate-800">13</td>
                    <td className="py-1.5 px-2 border-r border-slate-800 text-[11px]">13.30 - 14.00</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.SENIN.kelasBawah[currentKelas.id]?.[7])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.SELASA.kelasBawah[currentKelas.id]?.[7])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.RABU.kelasBawah[currentKelas.id]?.[7])}</td>
                    <td className="border-r border-slate-800 font-bold">{getMapelName(JADWAL_GABUNGAN.KAMIS.kelasBawah[currentKelas.id]?.[7])}</td>
                  </tr>

                  {/* 14. Murajaah */}
                  <tr className="border-b border-slate-800 font-black bg-lime-100 text-lime-950">
                    <td className="py-1 px-1 border-r border-slate-800">14</td>
                    <td className="py-1 px-2 border-r border-slate-800 text-[11px]">14.00 - 14.10</td>
                    <td colSpan="4" className="border-r border-slate-800">MURAJA'AH</td>
                  </tr>

                  {/* 15. Pulang */}
                  <tr className="bg-slate-900 text-white font-black">
                    <td className="py-1 px-1 border-r border-slate-800">15</td>
                    <td className="py-1 px-2 border-r border-slate-800 text-[11px]">14.10</td>
                    <td colSpan="4" className="border-r border-slate-800 uppercase tracking-widest text-xs">
                      PULANG
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            {/* Kolom Tanda Tangan Resmi Kepala Sekolah */}
            <div className="pt-6 flex justify-end">
              <div className="text-center w-64 space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Mengetahui</span>
                <span className="text-xs font-black text-slate-900 block">Kepala Sekolah</span>
                
                {/* Tanda Tangan Grafis */}
                <div className="py-3 flex items-center justify-center">
                  <div className="text-emerald-900 font-serif italic font-black text-2xl tracking-tighter transform -rotate-6 border-b-2 border-emerald-900 px-4">
                    Radinal Amnan
                  </div>
                </div>

                <span className="text-xs font-black text-slate-900 underline block">
                  {SEKOLAH_IDENTITAS.kepalaSekolah}
                </span>
              </div>
            </div>

            {/* Tabel Alokasi JP Per-Pekan Rombel Terpilih */}
            <div className="pt-6 border-t border-slate-200">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                Rekapitulasi Alokasi JP / Pekan Mata Pelajaran:
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-slate-300">
                  <thead className="bg-slate-100 font-black text-[11px] text-slate-800">
                    <tr>
                      <th className="py-2 px-3 w-12 border-r">No</th>
                      <th className="py-2 px-3 border-r">Mata Pelajaran</th>
                      <th className="py-2 px-3 w-28 text-center border-r">JP / Pekan</th>
                      <th className="py-2 px-3 w-48 border-r">Guru Pengampu</th>
                      <th className="py-2 px-3 w-36 text-center">Jml JP Per-Pekan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr><td className="py-1.5 px-3 border-r">1</td><td className="py-1.5 px-3 border-r">a. AQIDAH</td><td className="py-1.5 px-3 text-center border-r font-bold">2</td><td className="py-1.5 px-3 border-r font-medium text-emerald-800">Guru Mapel PAI</td><td className="py-1.5 px-3 text-center font-bold">4</td></tr>
                    <tr><td className="py-1.5 px-3 border-r">2</td><td className="py-1.5 px-3 border-r">b. FIQIH</td><td className="py-1.5 px-3 text-center border-r font-bold">2</td><td className="py-1.5 px-3 border-r font-medium text-emerald-800">Guru Mapel PAI</td><td className="py-1.5 px-3 text-center font-bold">4</td></tr>
                    <tr className="bg-red-50 text-red-700 font-bold"><td className="py-1.5 px-3 border-r">3</td><td className="py-1.5 px-3 border-r">c. SEJARAH KEBUDAYAAN ISLAM</td><td className="py-1.5 px-3 text-center border-r">-</td><td className="py-1.5 px-3 border-r">-</td><td className="py-1.5 px-3 text-center">-</td></tr>
                    <tr><td className="py-1.5 px-3 border-r">4</td><td className="py-1.5 px-3 border-r">d. ADAB DAN AKHLAK</td><td className="py-1.5 px-3 text-center border-r font-bold">2</td><td className="py-1.5 px-3 border-r font-bold text-slate-900">{currentKelas.wali}</td><td className="py-1.5 px-3 text-center font-bold">12</td></tr>
                    <tr><td className="py-1.5 px-3 border-r">5</td><td className="py-1.5 px-3 border-r">PENDIDIKAN PANCASILA DAN KEWARGANEGARAAN</td><td className="py-1.5 px-3 text-center border-r font-bold">2</td><td className="py-1.5 px-3 border-r font-bold text-slate-900">{currentKelas.wali}</td><td className="py-1.5 px-3 text-center font-bold">2</td></tr>
                    <tr><td className="py-1.5 px-3 border-r">6</td><td className="py-1.5 px-3 border-r">BAHASA INDONESIA</td><td className="py-1.5 px-3 text-center border-r font-bold">4</td><td className="py-1.5 px-3 border-r font-bold text-slate-900">{currentKelas.wali}</td><td className="py-1.5 px-3 text-center font-bold">4</td></tr>
                    <tr className="bg-red-50 text-red-700 font-bold"><td className="py-1.5 px-3 border-r">7</td><td className="py-1.5 px-3 border-r">ILMU PENGETAHUAN ALAM DAN SOSIAL</td><td className="py-1.5 px-3 text-center border-r">-</td><td className="py-1.5 px-3 border-r">-</td><td className="py-1.5 px-3 text-center">-</td></tr>
                    <tr><td className="py-1.5 px-3 border-r">8</td><td className="py-1.5 px-3 border-r">SENI RUPA / SENI BUDAYA</td><td className="py-1.5 px-3 text-center border-r font-bold">2</td><td className="py-1.5 px-3 border-r font-bold text-slate-900">{currentKelas.wali}</td><td className="py-1.5 px-3 text-center font-bold">2</td></tr>
                    <tr className="bg-red-50 text-red-700 font-bold"><td className="py-1.5 px-3 border-r">9</td><td className="py-1.5 px-3 border-r">BAHASA DAERAH (BAHASA SUNDA)</td><td className="py-1.5 px-3 text-center border-r">-</td><td className="py-1.5 px-3 border-r">-</td><td className="py-1.5 px-3 text-center">-</td></tr>
                    <tr><td className="py-1.5 px-3 border-r">10</td><td className="py-1.5 px-3 border-r">MATEMATIKA (NASIONAL)</td><td className="py-1.5 px-3 text-center border-r font-bold">2</td><td className="py-1.5 px-3 border-r font-bold text-slate-900">{currentKelas.wali}</td><td className="py-1.5 px-3 text-center font-bold">2</td></tr>
                    <tr><td className="py-1.5 px-3 border-r">11</td><td className="py-1.5 px-3 border-r">PENDIDIKAN JASMANI, OLAHRAGA, DAN KESEHATAN</td><td className="py-1.5 px-3 text-center border-r font-bold">2</td><td className="py-1.5 px-3 border-r font-medium text-emerald-800">Guru Mapel PJOK</td><td className="py-1.5 px-3 text-center font-bold">2</td></tr>
                    <tr className="bg-slate-100 font-black text-slate-800"><td colSpan="5" className="py-1.5 px-3">B. MUATAN LOKAL</td></tr>
                    <tr><td className="py-1.5 px-3 border-r">12</td><td className="py-1.5 px-3 border-r">MATHEMATICS (CAMBRIDGE)</td><td className="py-1.5 px-3 text-center border-r font-bold">4</td><td className="py-1.5 px-3 border-r font-medium text-emerald-800">Guru Mapel Math</td><td className="py-1.5 px-3 text-center font-bold">4</td></tr>
                    <tr><td className="py-1.5 px-3 border-r">13</td><td className="py-1.5 px-3 border-r">BAHASA ARAB</td><td className="py-1.5 px-3 text-center border-r font-bold">2</td><td className="py-1.5 px-3 border-r font-medium text-emerald-800">Guru Mapel B. Arab</td><td className="py-1.5 px-3 text-center font-bold">2</td></tr>
                    <tr><td className="py-1.5 px-3 border-r">14</td><td className="py-1.5 px-3 border-r">BAHASA INGGRIS</td><td className="py-1.5 px-3 text-center border-r font-bold">2</td><td className="py-1.5 px-3 border-r font-medium text-emerald-800">Guru Mapel B. Inggris</td><td className="py-1.5 px-3 text-center font-bold">2</td></tr>
                    <tr><td className="py-1.5 px-3 border-r">15</td><td className="py-1.5 px-3 border-r">INFORMATIKA / KOMPUTER</td><td className="py-1.5 px-3 text-center border-r font-bold">2</td><td className="py-1.5 px-3 border-r font-medium text-emerald-800">Guru Mapel Komputer</td><td className="py-1.5 px-3 text-center font-bold">2</td></tr>
                    <tr><td className="py-1.5 px-3 border-r">16</td><td className="py-1.5 px-3 border-r">AL QURAN (TAHSIN & TAHFIDZ)</td><td className="py-1.5 px-3 text-center border-r font-bold">10</td><td className="py-1.5 px-3 border-r font-medium text-emerald-800">Guru Kholaqoh Qur'an</td><td className="py-1.5 px-3 text-center font-bold">10</td></tr>
                    <tr className="bg-slate-200 font-black text-slate-900 border-t-2"><td colSpan="2" className="py-2 px-3">JUMLAH TOTAL</td><td className="py-2 px-3 text-center font-black">38</td><td className="py-2 px-3">Total Jam Efektif</td><td className="py-2 px-3 text-center font-black">38 JP</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
       * TAB 3: JADWAL PER GURU / BIDANG STUDI
       * ========================================================================= */}
      {activeTab === 'PER_GURU' && (
        <div className="space-y-6">

          {/* Selector Guru Pengampu */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                Pilih Profil Guru Pengampu:
              </span>
              <select
                value={selectedGuruId}
                onChange={(e) => setSelectedGuruId(e.target.value)}
                className="px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 cursor-pointer focus:outline-emerald-600"
              >
                {INITIAL_GTK_LIST.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.nama} — {g.jabatan}
                  </option>
                ))}
              </select>
            </div>

            {currentGuru && (
              <div className="text-right text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Penugasan Resmi:</span>
                <span className="font-extrabold text-emerald-800 block">{currentGuru.jabatan}</span>
                <span className="text-slate-500 text-[11px] block">
                  {currentGuru.kelasDiampu?.join(', ') || currentGuru.mapelDiampu?.join(', ') || 'Al-Qur\'an'}
                </span>
              </div>
            )}
          </div>

          {/* Rekapitulasi Mengajar Guru */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-4 bg-slate-800 text-white flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm sm:text-base">
                  Jadwal Mengajar: {currentGuru?.nama}
                </h3>
                <span className="text-xs text-slate-300">
                  Total {jadwalGuruSeminggu.length} Jam Pertemuan Tatap Muka Terdaftar
                </span>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-400/30">
                Aktif KBM
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px]">
                    <th className="py-2.5 px-3 w-12 text-center">No</th>
                    <th className="py-2.5 px-3 w-28">Hari</th>
                    <th className="py-2.5 px-3 w-36">Waktu / Jam</th>
                    <th className="py-2.5 px-3 w-48">Rombel / Kelas</th>
                    <th className="py-2.5 px-3 w-24">Kode</th>
                    <th className="py-2.5 px-3">Mata Pelajaran</th>
                    <th className="py-2.5 px-3 w-28">Tingkat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {jadwalGuruSeminggu.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 text-center font-bold text-slate-400">{idx + 1}</td>
                      <td className="py-2.5 px-3 font-extrabold text-slate-800">{item.hari}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-600">{item.jam}</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-800">{item.kelas}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${getMapelBadge(item.mapelKode)}`}>
                          {item.mapelKode}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-slate-800">{item.mapelNama}</td>
                      <td className="py-2.5 px-3 text-[11px] text-slate-500">{item.tingkat}</td>
                    </tr>
                  ))}
                  {jadwalGuruSeminggu.length === 0 && (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-slate-400 font-medium">
                        Guru ini tidak memiliki jadwal reguler di kelas umum atau mengampu bimbingan khusus / Al-Qur'an kholaqoh harian.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
       * TAB 4: 1. STRUKTUR KURIKULUM (ALOKASI JP PER MINGGU)
       * ========================================================================= */}
      {activeTab === 'STRUKTUR' && (
        <div className="space-y-6">

          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-4 bg-emerald-950 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider block">Kurikulum Merdeka & Mulok</span>
                <h2 className="font-extrabold text-sm sm:text-base">
                  STRUKTUR KURIKULUM SD AL IMAM ISLAMIC SCHOOL TAHUN PELAJARAN 2026/2027
                </h2>
              </div>
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold">
                Standar JP Resmi
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px]">
                    <th className="py-2.5 px-3 w-14 text-center">No</th>
                    <th className="py-2.5 px-3 min-w-56">Komponen Mata Pelajaran</th>
                    <th className="py-2.5 px-2 w-16 text-center">Kode</th>
                    <th className="py-2.5 px-3 w-16 text-center bg-emerald-50">Kls 1</th>
                    <th className="py-2.5 px-3 w-16 text-center bg-emerald-50">Kls 2</th>
                    <th className="py-2.5 px-3 w-16 text-center bg-teal-50">Kls 3</th>
                    <th className="py-2.5 px-3 w-16 text-center bg-blue-50">Kls 4</th>
                    <th className="py-2.5 px-3 w-16 text-center bg-blue-50">Kls 5</th>
                    <th className="py-2.5 px-3 w-16 text-center bg-purple-50">Kls 6</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {STRUKTUR_KURIKULUM.map((section, sIdx) => (
                    <React.Fragment key={sIdx}>
                      <tr className="bg-slate-100/80 font-black text-slate-800 text-[11px]">
                        <td colSpan="9" className="py-2 px-3 tracking-wide">
                          {section.kategori}
                        </td>
                      </tr>
                      {section.items.map((item, iIdx) => (
                        <tr key={iIdx} className="hover:bg-slate-50 font-medium">
                          <td className="py-2 px-3 text-center text-slate-400 font-bold">{item.no}</td>
                          <td className="py-2 px-3 font-bold text-slate-800">{item.mapel}</td>
                          <td className="py-2 px-2 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${getMapelBadge(item.kode)}`}>
                              {item.kode}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-center bg-emerald-50/50 font-semibold">{item.k1}</td>
                          <td className="py-2 px-3 text-center bg-emerald-50/50 font-semibold">{item.k2}</td>
                          <td className="py-2 px-3 text-center bg-teal-50/50 font-semibold">{item.k3}</td>
                          <td className="py-2 px-3 text-center bg-blue-50/50 font-semibold">{item.k4}</td>
                          <td className="py-2 px-3 text-center bg-blue-50/50 font-semibold">{item.k5}</td>
                          <td className="py-2 px-3 text-center bg-purple-50/50 font-semibold">{item.k6}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                  <tr className="bg-slate-200 font-black text-slate-900 border-t-2 border-slate-300 text-center">
                    <td colSpan="3" className="py-3 px-3 text-left font-black">
                      TOTAL JAM PELAJARAN (JP) PER MINGGU
                    </td>
                    <td className="py-3 px-3 bg-emerald-100 text-emerald-950 font-black">{TOTAL_JP_SEMESTER.k1}</td>
                    <td className="py-3 px-3 bg-emerald-100 text-emerald-950 font-black">{TOTAL_JP_SEMESTER.k2}</td>
                    <td className="py-3 px-3 bg-teal-100 text-teal-950 font-black">{TOTAL_JP_SEMESTER.k3}</td>
                    <td className="py-3 px-3 bg-blue-100 text-blue-950 font-black">{TOTAL_JP_SEMESTER.k4}</td>
                    <td className="py-3 px-3 bg-blue-100 text-blue-950 font-black">{TOTAL_JP_SEMESTER.k5}</td>
                    <td className="py-3 px-3 bg-purple-100 text-purple-950 font-black">{TOTAL_JP_SEMESTER.k6}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
       * TAB 5: HOME (IDENTITAS SEKOLAH & PROFIL GTK)
       * ========================================================================= */}
      {activeTab === 'HOME' && (
        <div className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Kartu Profil Lembaga */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
                <School className="w-6 h-6 text-emerald-700" />
                <div>
                  <h3 className="font-black text-slate-900 text-base">{SEKOLAH_IDENTITAS.namaSekolah}</h3>
                  <span className="text-xs text-slate-400">Data Pokok Pendidikan Resmi Kemdikbud</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-semibold">NPSN:</span>
                  <span className="font-extrabold text-slate-900">{SEKOLAH_IDENTITAS.npsn}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-semibold">NSS:</span>
                  <span className="font-extrabold text-slate-900">{SEKOLAH_IDENTITAS.nss}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-semibold">Alamat:</span>
                  <span className="font-bold text-slate-900 text-right">{SEKOLAH_IDENTITAS.alamat}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-semibold">Kelurahan / Kecamatan:</span>
                  <span className="font-bold text-slate-900">{SEKOLAH_IDENTITAS.kelurahan}, {SEKOLAH_IDENTITAS.kecamatan}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-semibold">Kabupaten / Provinsi:</span>
                  <span className="font-bold text-slate-900">{SEKOLAH_IDENTITAS.kabupaten}, {SEKOLAH_IDENTITAS.provinsi} ({SEKOLAH_IDENTITAS.kodePos})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-semibold">Kepala Sekolah:</span>
                  <span className="font-black text-emerald-800">{SEKOLAH_IDENTITAS.kepalaSekolah}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400 font-semibold">Tahun Pelajaran:</span>
                  <span className="font-extrabold text-slate-900">{SEKOLAH_IDENTITAS.tahunPelajaran}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs">
                <span className="font-bold block text-emerald-900 mb-0.5">Slogan & Motto:</span>
                <span className="font-black tracking-wide text-sm">{SEKOLAH_IDENTITAS.motto}</span>
              </div>
            </div>

            {/* Kartu Jam Operasional Harian */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
                <Clock4 className="w-6 h-6 text-teal-700" />
                <div>
                  <h3 className="font-black text-slate-900 text-base">Alokasi Waktu Belajar Harian</h3>
                  <span className="text-xs text-slate-400">Struktur Sesi KBM Tatap Muka</span>
                </div>
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto pr-1 text-xs">
                {JAM_PELAJARAN_RESMI.map((slot) => (
                  <div 
                    key={slot.no}
                    className={`p-2.5 rounded-xl border flex items-center justify-between ${
                      slot.isBreak
                        ? 'bg-blue-50 border-blue-200 text-blue-950 font-black'
                        : slot.isSpecial
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-950 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 font-medium'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-md bg-white border flex items-center justify-center font-bold text-[10px] text-slate-600">
                        {slot.no}
                      </span>
                      <span className="font-bold text-xs">{slot.label}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {slot.jam}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
export default JadwalPelajaranView;
