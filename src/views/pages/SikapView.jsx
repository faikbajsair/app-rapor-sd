import React, { useState, useMemo } from 'react';
import { 
  Smile, 
  Sparkles, 
  CheckCircle, 
  Heart, 
  MessageSquare,
  School,
  Printer,
  Users
} from 'lucide-react';
import { 
  DIMENSI_PANCASILA, 
  KRITERIA_SIKAP, 
  SikapController 
} from '../../controllers/SikapController';

const SPIRITUAL_ASPEK = [
  { key: 'bersyukur', label: 'bersyukur' },
  { key: 'berdoa', label: 'berdoa' },
  { key: 'taatBeribadah', label: 'taat beribadah' },
  { key: 'toleransi', label: 'toleransi' }
];

const SOSIAL_ASPEK = [
  { key: 'tanggungJawab', label: 'tanggung jawab' },
  { key: 'jujur', label: 'jujur' },
  { key: 'peduli', label: 'peduli' },
  { key: 'disiplin', label: 'disiplin' },
  { key: 'percayaDiri', label: 'percaya diri' },
  { key: 'kerjasama', label: 'kerjasama' },
  { key: 'santun', label: 'santun' }
];

const OPSI_PREDIKAT = ['Sangat baik', 'Baik', 'Cukup baik'];

function buildDeskripsiSikap(record, aspekList) {
  const sangatBaik = [];
  const baik = [];
  aspekList.forEach(a => {
    const val = (record[a.key] || 'Baik').toLowerCase();
    if (val === 'sangat baik') sangatBaik.push(a.label);
    else if (val === 'baik') baik.push(a.label);
  });

  if (sangatBaik.length > 0 && baik.length > 0) {
    return `Alhamdulillah ananda sangat baik dalam ${sangatBaik.join(', ')} dan baik dalam ${baik.join(', ')}`;
  }
  if (sangatBaik.length > 0) {
    return `Alhamdulillah ananda sangat baik dalam ${sangatBaik.join(', ')} dan`;
  }
  if (baik.length > 0) {
    return `Alhamdulillah ananda baik dalam ${baik.join(', ')}`;
  }
  return 'Alhamdulillah ananda menunjukkan perkembangan sikap yang baik';
}

export function SikapView({ 
  siswaList, 
  sikapList, 
  onSaveSikap, 
  settings 
}) {
  // Tabs: 'SPIRITUAL' (Image 2) | 'SOSIAL' (Image 3) | 'PANCASILA'
  const [activeSubTab, setActiveSubTab] = useState('SPIRITUAL');
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
    const found = sikapList.find(s => s.siswaId === siswaId);
    if (found) return found;
    return {
      id: `SIKAP_${siswaId}`,
      siswaId,
      bersyukur: 'Sangat baik',
      berdoa: 'Sangat baik',
      taatBeribadah: 'Sangat baik',
      toleransi: 'Sangat baik',
      predikatSpiritual: 'Sangat baik',
      spiritual: 'Alhamdulillah ananda sangat baik dalam bersyukur, berdoa, taat beribadah, toleransi dan',
      tanggungJawab: 'Sangat baik',
      jujur: 'Sangat baik',
      peduli: 'Sangat baik',
      disiplin: 'Sangat baik',
      percayaDiri: 'Sangat baik',
      kerjasama: 'Sangat baik',
      santun: 'Sangat baik',
      predikatSosial: 'Sangat baik',
      sosial: 'Alhamdulillah ananda sangat baik dalam tanggung jawab, jujur, peduli, disiplin, percaya diri, kerjasama, santun dan',
      berimanBertakwa: 'Sangat Baik',
      berkebinekaan: 'Baik',
      gotongRoyong: 'Sangat Baik',
      mandiri: 'Baik',
      bernalarKritis: 'Baik',
      kreatif: 'Sangat Baik',
      spiritualNote: 'Alhamdulillah ananda sangat baik dalam bersyukur, berdoa, taat beribadah, toleransi',
      sosialNote: 'Alhamdulillah ananda sangat baik dalam tanggung jawab, jujur, peduli, disiplin, percaya diri, kerjasama, santun'
    };
  };

  const currentRecord = getRecord(currentSiswa?.id);
  const liveNarrative = currentRecord.deskripsiNaratif || SikapController.generateNarasiSikap(currentSiswa?.nama, currentRecord);

  // Update indikator Spiritual (Sheet SPIRITUAL)
  const handleSpiritualChange = (siswaId, field, value) => {
    const rec = getRecord(siswaId);
    const updated = { ...rec, [field]: value };
    if (field !== 'predikatSpiritual' && field !== 'spiritual') {
      updated.spiritual = buildDeskripsiSikap(updated, SPIRITUAL_ASPEK);
      updated.spiritualNote = updated.spiritual;
      const allSangatBaik = SPIRITUAL_ASPEK.every(a => (updated[a.key] || '').toLowerCase() === 'sangat baik');
      updated.predikatSpiritual = allSangatBaik ? 'Sangat baik' : 'Baik';
    }
    updated.deskripsiNaratif = `${updated.spiritual || ''}. ${updated.sosial || ''}.`;
    onSaveSikap(updated);
  };

  // Update indikator Sosial (Sheet SOSIAL)
  const handleSosialChange = (siswaId, field, value) => {
    const rec = getRecord(siswaId);
    const updated = { ...rec, [field]: value };
    if (field !== 'predikatSosial' && field !== 'sosial') {
      updated.sosial = buildDeskripsiSikap(updated, SOSIAL_ASPEK);
      updated.sosialNote = updated.sosial;
      const sbCount = SOSIAL_ASPEK.filter(a => (updated[a.key] || '').toLowerCase() === 'sangat baik').length;
      updated.predikatSosial = sbCount >= 6 ? 'Sangat baik' : 'Baik';
    }
    updated.deskripsiNaratif = `${updated.spiritual || ''}. ${updated.sosial || ''}.`;
    onSaveSikap(updated);
  };

  const handleKriteriaChange = (dimensiKey, value) => {
    onSaveSikap({
      ...currentRecord,
      [dimensiKey]: value
    });
  };

  const handleNoteChange = (field, value) => {
    onSaveSikap({
      ...currentRecord,
      [field]: value
    });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-2xl flex items-center space-x-2 animate-in slide-in-from-bottom">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Spreadsheet Sub-Tab Switcher */}
      <div className="no-print p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-emerald-800 text-amber-300 shadow-xs">
              <Smile className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Rekapitulasi Penilaian Sikap Spiritual, Sosial & Profil Pancasila
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Sesuai Sheet <strong className="text-slate-700">SPIRITUAL</strong> & <strong className="text-slate-700">SOSIAL</strong> Master Spreadsheet SD Al-Imam Islamic School
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

        {/* 3 Spreadsheet Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100">
          {[
            { id: 'SPIRITUAL', label: 'Sheet SPIRITUAL (4 Indikator)', badge: 'Bersyukur • Berdoa • Ibadah • Toleransi' },
            { id: 'SOSIAL', label: 'Sheet SOSIAL (7 Indikator)', badge: 'Tanggung Jawab • Jujur • Peduli • Disiplin • Santun' },
            { id: 'PANCASILA', label: 'Rubrik 6 Dimensi Pancasila (Per Siswa)', badge: 'Individual' }
          ].map((tab) => {
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
       * TAB 1: REKAPITULASI PENILAIAN SIKAP SPIRITUAL (PERSIS GAMBAR 2)
       * ========================================================================= */}
      {activeSubTab === 'SPIRITUAL' && (
        <div className="bg-[#92d050] rounded-3xl p-4 sm:p-6 border-2 border-slate-800 shadow-xl space-y-4 print:bg-white print:border-none print:shadow-none print:p-0">
          <div className="bg-yellow-300 border-2 border-slate-900 py-2 px-4 text-center font-black text-slate-950 text-sm sm:text-base uppercase tracking-wider shadow-2xs">
            REKAPITULASI PENILAIAN SIKAP SPIRITUAL
          </div>

          <div className="bg-white rounded-xl border-2 border-slate-900 overflow-x-auto">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="bg-[#9bc2e6] text-slate-950 font-black border-b-2 border-slate-900 text-center">
                  <th className="py-2.5 px-2 border-r border-slate-900 w-10">No.</th>
                  <th className="py-2.5 px-3 border-r border-slate-900 min-w-[185px]">Nama Siswa</th>
                  {SPIRITUAL_ASPEK.map(a => (
                    <th key={a.key} className="py-2.5 px-2 border-r border-slate-900 w-28">{a.label}</th>
                  ))}
                  <th className="py-2.5 px-2 border-r border-slate-900 w-28 uppercase">PREDIKAT</th>
                  <th className="py-2.5 px-3 min-w-[280px]">Deskripsi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-950 font-medium">
                {filteredSiswa.map((siswa, idx) => {
                  const rec = getRecord(siswa.id);
                  return (
                    <tr key={siswa.id} className="border-b border-slate-800 hover:bg-slate-50">
                      <td className="py-1.5 px-2 border-r border-slate-800 text-center font-bold">{idx + 1}</td>
                      <td className="py-1.5 px-2.5 border-r border-slate-800 font-bold uppercase">{siswa.nama}</td>
                      {SPIRITUAL_ASPEK.map(a => (
                        <td key={a.key} className="py-1 px-1.5 border-r border-slate-800">
                          <select
                            value={rec[a.key] || 'Sangat baik'}
                            onChange={(e) => handleSpiritualChange(siswa.id, a.key, e.target.value)}
                            className="w-full bg-transparent text-[11px] font-semibold text-slate-900 focus:outline-hidden cursor-pointer"
                          >
                            {OPSI_PREDIKAT.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </td>
                      ))}
                      {/* Kolom PREDIKAT Oranye persis Gambar 2 */}
                      <td className="py-1 px-1.5 border-r border-slate-800 bg-[#f4b084] font-bold">
                        <select
                          value={rec.predikatSpiritual || 'Baik'}
                          onChange={(e) => handleSpiritualChange(siswa.id, 'predikatSpiritual', e.target.value)}
                          className="w-full bg-transparent text-[11px] font-bold text-slate-950 focus:outline-hidden cursor-pointer"
                        >
                          {OPSI_PREDIKAT.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-1.5 px-2.5 font-serif text-[11px] leading-snug text-slate-900">
                        {rec.spiritual || buildDeskripsiSikap(rec, SPIRITUAL_ASPEK)}
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
       * TAB 2: REKAPITULASI PENILAIAN SIKAP SOSIAL (PERSIS GAMBAR 3)
       * ========================================================================= */}
      {activeSubTab === 'SOSIAL' && (
        <div className="bg-[#92d050] rounded-3xl p-4 sm:p-6 border-2 border-slate-800 shadow-xl space-y-4 print:bg-white print:border-none print:shadow-none print:p-0">
          <div className="bg-yellow-300 border-2 border-slate-900 py-2 px-4 text-center font-black text-slate-950 text-sm sm:text-base uppercase tracking-wider shadow-2xs">
            REKAPITULASI PENILAIAN SIKAP SOSIAL
          </div>

          <div className="bg-white rounded-xl border-2 border-slate-900 overflow-x-auto">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="bg-[#9bc2e6] text-slate-950 font-black border-b-2 border-slate-900 text-center">
                  <th className="py-2.5 px-1.5 border-r border-slate-900 w-9">No.</th>
                  <th className="py-2.5 px-2.5 border-r border-slate-900 min-w-[175px]">Nama Siswa</th>
                  {SOSIAL_ASPEK.map(a => (
                    <th key={a.key} className="py-2 px-1.5 border-r border-slate-900 w-24">{a.label}</th>
                  ))}
                  <th className="py-2.5 px-2 border-r border-slate-900 w-24 uppercase">PREDIKAT</th>
                  <th className="py-2.5 px-3 min-w-[290px]">Deskripsi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-950 font-medium">
                {filteredSiswa.map((siswa, idx) => {
                  const rec = getRecord(siswa.id);
                  return (
                    <tr key={siswa.id} className="border-b border-slate-800 hover:bg-slate-50">
                      <td className="py-1.5 px-1.5 border-r border-slate-800 text-center font-bold">{idx + 1}</td>
                      <td className="py-1.5 px-2.5 border-r border-slate-800 font-bold uppercase">{siswa.nama}</td>
                      {SOSIAL_ASPEK.map(a => (
                        <td key={a.key} className="py-1 px-1 border-r border-slate-800">
                          <select
                            value={rec[a.key] || 'Sangat baik'}
                            onChange={(e) => handleSosialChange(siswa.id, a.key, e.target.value)}
                            className="w-full bg-transparent text-[10.5px] font-semibold text-slate-900 focus:outline-hidden cursor-pointer"
                          >
                            {OPSI_PREDIKAT.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </td>
                      ))}
                      {/* Kolom PREDIKAT Oranye persis Gambar 3 */}
                      <td className="py-1 px-1.5 border-r border-slate-800 bg-[#f4b084] font-bold">
                        <select
                          value={rec.predikatSosial || 'Baik'}
                          onChange={(e) => handleSosialChange(siswa.id, 'predikatSosial', e.target.value)}
                          className="w-full bg-transparent text-[10.5px] font-bold text-slate-950 focus:outline-hidden cursor-pointer"
                        >
                          {OPSI_PREDIKAT.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-1.5 px-2.5 font-serif text-[11px] leading-snug text-slate-900">
                        {rec.sosial || buildDeskripsiSikap(rec, SOSIAL_ASPEK)}
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
       * TAB 3: RUBRIK 6 DIMENSI PROFIL PELAJAR PANCASILA PER SISWA
       * ========================================================================= */}
      {activeSubTab === 'PANCASILA' && (
        <div className="space-y-6">
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
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-800 flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>Rubrik Penilaian 6 Dimensi Profil Pelajar Pancasila</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pilih capaian indikator untuk <span className="font-bold text-slate-800">{currentSiswa?.nama}</span>
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold">
                  {currentSiswa?.nis}
                </span>
              </div>

              <div className="space-y-4">
                {DIMENSI_PANCASILA.map((dimensi) => {
                  const currentValue = currentRecord[dimensi.key] || 'Baik';
                  return (
                    <div 
                      key={dimensi.key} 
                      className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/40 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">{dimensi.label}</span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          Status: <strong className="text-emerald-800">{currentValue}</strong>
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {KRITERIA_SIKAP.map((k) => {
                          const isChosen = currentValue === k.value;
                          return (
                            <button
                              key={k.value}
                              type="button"
                              onClick={() => handleKriteriaChange(dimensi.key, k.value)}
                              className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer ${
                                isChosen
                                  ? `${k.badge} shadow-2xs scale-[1.02]`
                                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              {k.value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50/40 rounded-3xl p-6 border border-emerald-200 shadow-soft space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-200/70">
                  <div className="flex items-center space-x-2">
                    <span className="p-2 rounded-xl bg-emerald-800 text-amber-300">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <h3 className="text-sm font-bold text-slate-800">
                      Live Preview Narasi Rapor
                    </h3>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                    Auto-Engine
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-emerald-200/90 shadow-2xs space-y-2">
                  <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center">
                    <MessageSquare className="w-3.5 h-3.5 mr-1" />
                    Deskripsi Spiritual:
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-serif italic">
                    "{currentRecord.spiritual}"
                  </p>
                  <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center pt-2 border-t border-slate-100">
                    <MessageSquare className="w-3.5 h-3.5 mr-1" />
                    Deskripsi Sosial:
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-serif italic">
                    "{currentRecord.sosial}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
