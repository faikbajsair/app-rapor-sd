import React, { useState } from 'react';
import { 
  Smile, 
  Sparkles, 
  Save, 
  CheckCircle, 
  Heart, 
  Star, 
  UserCheck, 
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { 
  DIMENSI_PANCASILA, 
  KRITERIA_SIKAP, 
  SikapController 
} from '../../controllers/SikapController';

export function SikapView({ 
  siswaList, 
  sikapList, 
  onSaveSikap, 
  settings 
}) {
  const [selectedSiswaId, setSelectedSiswaId] = useState(siswaList[0]?.id || 'S01');
  const [toastMessage, setToastMessage] = useState(null);

  const currentSiswa = siswaList.find(s => s.id === selectedSiswaId) || siswaList[0];

  // Ambil record sikap siswa saat ini
  const getRecord = (siswaId) => {
    return sikapList.find(s => s.siswaId === siswaId) || {
      siswaId,
      berimanBertakwa: 'Sangat Baik',
      berkebinekaan: 'Baik',
      gotongRoyong: 'Sangat Baik',
      mandiri: 'Baik',
      bernalarKritis: 'Baik',
      kreatif: 'Sangat Baik',
      spiritualNote: 'Selalu disiplin menjalankan ibadah salat Dhuha dan menjaga zikir pagi di sekolah.',
      sosialNote: 'Sopan santun kepada guru dan saling tolong menolong dengan teman.'
    };
  };

  const currentRecord = getRecord(selectedSiswaId);
  const liveNarrative = SikapController.generateNarasiSikap(currentSiswa?.nama, currentRecord);

  const handleKriteriaChange = (dimensiKey, value) => {
    const updated = {
      ...currentRecord,
      [dimensiKey]: value
    };
    onSaveSikap(updated);
  };

  const handleNoteChange = (field, value) => {
    const updated = {
      ...currentRecord,
      [field]: value
    };
    onSaveSikap(updated);
  };

  const handleApplyToAll = () => {
    siswaList.forEach(s => {
      const rec = getRecord(s.id);
      onSaveSikap({
        ...rec,
        berimanBertakwa: 'Sangat Baik',
        berkebinekaan: 'Baik',
        gotongRoyong: 'Sangat Baik',
        mandiri: 'Baik',
        bernalarKritis: 'Baik',
        kreatif: 'Sangat Baik'
      });
    });
    showToast("Template sikap standar berhasil diterapkan ke seluruh siswa!");
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
          <CheckCircle className="w-4 h-4 text-pastel-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-pastel-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-pastel-200 text-pastel-800">
                <Smile className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-extrabold text-slate-800">Penilaian Sikap & Auto-Narrative Engine</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  6 Dimensi Profil Pelajar Pancasila + Sikap Spiritual & Sosial dengan perangkai kalimat naratif otomatis
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleApplyToAll}
              className="px-3.5 py-2 rounded-xl bg-pastel-100 hover:bg-pastel-200 text-pastel-900 text-xs font-bold border border-pastel-300 transition-colors flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4 text-pastel-700" />
              <span>Terapkan Default Se-Kelas</span>
            </button>
          </div>
        </div>

        {/* Siswa Selector Bar */}
        <div className="pt-2 border-t border-slate-100">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Pilih Siswa ({siswaList.length} Siswa):
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {siswaList.map(s => {
              const isSelected = selectedSiswaId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSiswaId(s.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center space-x-2 ${
                    isSelected
                      ? 'bg-pastel-300 text-pastel-950 border-pastel-400 shadow-2xs'
                      : 'bg-pastel-50/60 text-slate-600 border-slate-200 hover:bg-pastel-100 hover:border-pastel-300'
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
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 6 Dimensi Rubric Input (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-pastel-200 shadow-2xs space-y-6">
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
            <span className="text-xs px-2.5 py-1 rounded-full bg-pastel-100 text-pastel-900 border border-pastel-300 font-semibold">
              {currentSiswa?.nisn}
            </span>
          </div>

          {/* Dimensi Checklist Items */}
          <div className="space-y-4">
            {DIMENSI_PANCASILA.map((dimensi) => {
              const currentValue = currentRecord[dimensi.key] || 'Baik';

              return (
                <div 
                  key={dimensi.key} 
                  className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/40 hover:bg-pastel-50/30 transition-all space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      {dimensi.label}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Status: <strong className="text-pastel-800">{currentValue}</strong>
                    </span>
                  </div>

                  {/* Kriteria Button Group */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {KRITERIA_SIKAP.map((k) => {
                      const isChosen = currentValue === k.value;
                      return (
                        <button
                          key={k.value}
                          type="button"
                          onClick={() => handleKriteriaChange(dimensi.key, k.value)}
                          className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all border text-center ${
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

          {/* Specific Spiritual & Social Notes */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Catatan Kekhasan Spiritual & Karakter Sosial
            </h4>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Catatan Sikap Spiritual (Ibadah & Adab Islami):
              </label>
              <textarea
                rows="2"
                value={currentRecord.spiritualNote || ''}
                onChange={(e) => handleNoteChange('spiritualNote', e.target.value)}
                placeholder="Disiplin salat berjamaah, hafalan doa harian..."
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-hidden focus:border-pastel-400 resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Catatan Sikap Sosial (Gotong Royong & Santun):
              </label>
              <textarea
                rows="2"
                value={currentRecord.sosialNote || ''}
                onChange={(e) => handleNoteChange('sosialNote', e.target.value)}
                placeholder="Sikap santun kepada ustadz/ustadzah, peduli kebersihan..."
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-hidden focus:border-pastel-400 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Auto-Narrative Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Real-time Narrative Card */}
          <div className="bg-gradient-to-br from-pastel-100 via-white to-pastel-50 rounded-3xl p-6 border border-pastel-300 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-pastel-200">
              <div className="flex items-center space-x-2">
                <span className="p-2 rounded-xl bg-pastel-300 text-pastel-900">
                  <Sparkles className="w-4 h-4" />
                </span>
                <h3 className="text-sm font-bold text-slate-800">
                  Live Preview Narasi Rapor
                </h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                AI Auto-Engine
              </span>
            </div>

            {/* Generated Output */}
            <div className="p-4 rounded-2xl bg-white border border-pastel-200/90 shadow-2xs space-y-2">
              <div className="text-[11px] font-bold text-pastel-800 uppercase tracking-wider flex items-center">
                <MessageSquare className="w-3.5 h-3.5 mr-1" />
                Deskripsi Perkembangan Karakter:
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif italic">
                "{liveNarrative}"
              </p>
            </div>

            <p className="text-[11px] text-slate-500">
              *Kalimat narasi di atas dirangkai otomatis dan akan dicetak langsung pada halaman <strong>Sikap & Profil Pelajar Pancasila</strong> di Buku Rapor Siswa.
            </p>
          </div>

          {/* Student Profile Snapshot */}
          <div className="bg-white rounded-3xl p-5 border border-pastel-200 shadow-2xs space-y-3">
            <div className="flex items-center space-x-3">
              <img 
                src={currentSiswa?.foto} 
                alt={currentSiswa?.nama} 
                className="w-12 h-12 rounded-2xl object-cover border-2 border-pastel-300"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-800">{currentSiswa?.nama}</h4>
                <p className="text-xs text-slate-500">NISN: {currentSiswa?.nisn} • {currentSiswa?.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                <p className="text-[11px] text-pastel-800 font-semibold">{settings.rombel}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Wali Kelas:</span>
              <span className="font-semibold text-slate-800">{settings.waliKelas}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
