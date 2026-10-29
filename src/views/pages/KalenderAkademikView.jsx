import React, { useState } from 'react';
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
  FileSpreadsheet
} from 'lucide-react';
import { 
  KALDIK_META, 
  KALDIK_SEMESTER_1, 
  KALDIK_SEMESTER_2, 
  REKAP_ANALISIS_HEK 
} from '../../config/kaldikData';

export function KalenderAkademikView({ settings }) {
  const [selectedSemester, setSelectedSemester] = useState('ALL'); // 'SEM_1' | 'SEM_2' | 'ALL'
  const [activeTab, setActiveTab] = useState('KALENDER'); // 'KALENDER' | 'AGENDA' | 'ANALISIS'
  const [selectedEventDate, setSelectedEventDate] = useState(null);

  const monthsToDisplay = selectedSemester === 'SEM_1' 
    ? KALDIK_SEMESTER_1 
    : selectedSemester === 'SEM_2' 
      ? KALDIK_SEMESTER_2 
      : [...KALDIK_SEMESTER_1, ...KALDIK_SEMESTER_2];

  // Helper warna tanggal
  const getDateStyle = (dateData) => {
    if (!dateData) return 'bg-white text-slate-800 hover:bg-slate-100 border-slate-100';

    switch (dateData.tipe) {
      case 'hln':
      case 'libur':
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
      default:
        return 'bg-white text-slate-800 hover:bg-emerald-50 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner Kaldik */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold text-emerald-100 border border-white/20">
              <CalendarCheck2 className="w-3.5 h-3.5 text-emerald-200" />
              <span>Kalender Pendidikan (Kaldik) Resmi T.P 2026/2027</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {KALDIK_META.sekolah}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Panduan agenda kegiatan belajar mengajar, pelaksanaan Asesmen Sumatif (PTS/PAS), Munaqasyah Al-Qur'an, dan Analisis Hari Efektif Belajar (HEB) Kurikulum Merdeka.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-2xl bg-white text-emerald-900 font-bold text-xs sm:text-sm shadow-md hover:bg-emerald-50 transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-emerald-700" />
              <span>Cetak Kaldik Resmi</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Control Navigation & Filter Tabs */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
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
            { id: 'AGENDA', label: 'Daftar Kegiatan', icon: Clock },
            { id: 'ANALISIS', label: 'Analisis Hari Efektif (HEK)', icon: FileSpreadsheet }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-800 shadow-xs border border-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Legend of Colors */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-wrap items-center gap-3 text-xs">
        <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px] mr-1">
          Keterangan Warna:
        </span>
        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 rounded-md bg-red-600 border border-red-700 shrink-0" />
          <span className="font-semibold text-slate-700">Libur Nasional / Cuti / Libur Smt</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 rounded-md bg-amber-400 border border-amber-500 shrink-0" />
          <span className="font-semibold text-slate-700">Asesmen Sumatif (PTS / PAS / PAT)</span>
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
          <span className="font-semibold text-slate-700">Munaqasyah / Qur'an</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 rounded-md bg-white border border-slate-300 shrink-0" />
          <span className="font-semibold text-slate-700">Hari Efektif Belajar (HEB)</span>
        </div>
      </div>

      {/* =========================================================================
       * TAB 1: KALENDER BULANAN (GRID)
       * ========================================================================= */}
      {activeTab === 'KALENDER' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {monthsToDisplay.map((m) => {
            // Bangun sel-sel hari untuk kalender bulanan
            const daysInMonth = m.daysInMonth;
            const startDay = m.startDayOfWeek; // 0=Min, 1=Sen, dst
            // Ubah startDay agar urutan kolom: Sn (1), Sl (2), Rb (3), Km (4), Jm (5), Sb (6), Mg (0)
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
                  <div className="p-4 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between">
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
                    <span className="text-red-700">Sb</span>
                    <span className="text-red-700">Mg</span>
                  </div>

                  {/* Calendar Matrix Days */}
                  <div className="p-3 grid grid-cols-7 gap-1 text-center text-xs">
                    {/* Blank padding cells */}
                    {blankCells.map((_, idx) => (
                      <div key={`blank-${idx}`} className="h-9 w-full" />
                    ))}

                    {/* Active Days */}
                    {dayCells.map((dayNum) => {
                      const dateKey = String(dayNum);
                      const isSpecial = m.specialDates?.[dateKey];
                      const style = getDateStyle(isSpecial);

                      return (
                        <div
                          key={`day-${dayNum}`}
                          onClick={() => setSelectedEventDate({ day: dayNum, bulan: m.bulan, info: isSpecial })}
                          title={isSpecial ? `${isSpecial.note || 'Kegiatan'}` : `Hari Efektif Belajar`}
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
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Agenda Terprogram {m.bulan.split(' ')[0]}:
                  </div>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {m.kegiatan.map((keg, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-[11px] leading-tight">
                        <span className="font-extrabold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded text-[10px] shrink-0">
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
       * TAB 2: DAFTAR AGENDA KEGIATAN TERPROGRAM
       * ========================================================================= */}
      {activeTab === 'AGENDA' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div>
              <h2 className="text-base font-extrabold text-slate-800">
                Agenda Kegiatan Terprogram Al-Imam Islamic School 2026/2027
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Rangkaian kegiatan akademik, asesmen kurikulum merdeka, program Al-Qur'an, dan libur nasional
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pl-4">
                  {m.kegiatan.map((keg, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 transition-all flex items-start space-x-3 text-xs"
                    >
                      <span className="px-2 py-1 rounded-lg bg-emerald-700 text-white font-extrabold text-[10px] shrink-0">
                        {keg.tgl}
                      </span>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-800">
                          {keg.nama}
                        </div>
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
       * TAB 3: TABEL ANALISIS HARI EFEKTIF KERJA (HEK)
       * ========================================================================= */}
      {activeTab === 'ANALISIS' && (
        <div className="space-y-6">
          
          {/* Semester 1 Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-4 bg-emerald-900 text-white flex items-center justify-between">
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
                  {KALDIK_SEMESTER_1.map((m) => (
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
            <div className="p-4 bg-teal-900 text-white flex items-center justify-between">
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
                  {KALDIK_SEMESTER_2.map((m) => (
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

          {/* Sign-off & Verification Footer */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-xs text-slate-600">
              <div className="font-bold text-slate-800">Ringkasan Beban Belajar Tahunan:</div>
              <p>• Hari Efektif Belajar (HEB): <strong>150 Hari</strong> (78 Sem 1 + 72 Sem 2)</p>
              <p>• Hari Efektif Fakultatif (HEF): <strong>67 Hari</strong> (37 Sem 1 + 30 Sem 2)</p>
              <p>• Hari Libur Nasional (HLN): <strong>21 Hari</strong> (4 Sem 1 + 17 Sem 2)</p>
            </div>

            <div className="text-right text-xs">
              <span className="text-slate-500 block">{KALDIK_META.tempatPenetapan}, {KALDIK_META.tanggalPenetapan}</span>
              <span className="font-bold text-slate-700 block mb-8">Kepala Sekolah,</span>
              <span className="font-black text-sm text-slate-900 underline block">{KALDIK_META.kepalaSekolah}</span>
              <span className="text-[11px] text-emerald-700 font-semibold block mt-1">✓ Ditetapkan & Berlaku Resmi</span>
            </div>
          </div>

        </div>
      )}

      {/* Modal Popup Date Details */}
      {selectedEventDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-2xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase">Detail Tanggal</span>
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

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div className="font-bold text-slate-800">
                {selectedEventDate.info?.note || 'Hari Efektif Belajar (HEB)'}
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {selectedEventDate.info?.note 
                  ? 'Kegiatan resmi terprogram berdasarkan kalender pendidikan Al-Imam Islamic School.'
                  : 'Kegiatan Pembelajaran Tatap Muka Aktif Normal.'}
              </p>
            </div>

            <button
              onClick={() => setSelectedEventDate(null)}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
