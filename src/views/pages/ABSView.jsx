import React, { useState } from 'react';
import { 
  HelpCircle, 
  PlusCircle, 
  Trash2, 
  TrendingUp, 
  Award, 
  CheckCircle, 
  AlertTriangle,
  FileSpreadsheet,
  PieChart,
  Sparkles
} from 'lucide-react';
import { ABSController } from '../../controllers/ABSController';

export function ABSView({ 
  mapelList, 
  siswaList, 
  absList, 
  onSaveABS,
  settings 
}) {
  const [selectedMapelId, setSelectedMapelId] = useState(mapelList[3]?.id || mapelList[0]?.id || 'MAT');
  const [selectedUjian, setSelectedUjian] = useState('PTS Semester 1');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // New Question Form State
  const [newBentuk, setNewBentuk] = useState('Pilihan Ganda');
  const [newIndikator, setNewIndikator] = useState('');
  const [newBobotMaks, setNewBobotMaks] = useState(1);
  const [newKunci, setNewKunci] = useState('');

  const currentMapel = mapelList.find(m => m.id === selectedMapelId) || mapelList[0];

  // Filter butir soal yang sesuai dengan mapel dan ujian
  const filteredABS = absList.filter(item => item.mapelId === selectedMapelId && item.ujian === selectedUjian);

  // Perhitungan statistik daya serap
  const stats = ABSController.hitungDayaSerap(filteredABS, siswaList);
  const distribusi = ABSController.getDistribusiKesukaran(filteredABS, siswaList);

  const handleScoreChange = (itemId, siswaId, val) => {
    const item = absList.find(i => i.id === itemId);
    if (!item) return;

    const maxVal = Number(item.bobotMaks) || 1;
    const cleanVal = val === '' ? '' : Math.max(0, Math.min(maxVal, Number(val)));

    const updatedSkor = {
      ...(item.skorSiswa || {}),
      [siswaId]: cleanVal
    };

    const updatedList = absList.map(i => i.id === itemId ? { ...i, skorSiswa: updatedSkor } : i);
    onSaveABS(updatedList);
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newIndikator) return;

    const nextNomor = filteredABS.length + 1;
    const newItem = {
      id: `ABS_${selectedMapelId}_${Date.now()}`,
      mapelId: selectedMapelId,
      ujian: selectedUjian,
      nomor: nextNomor,
      indikator: newIndikator.trim(),
      bentuk: newBentuk,
      bobotMaks: Number(newBobotMaks) || 1,
      kunci: newKunci.trim() || '-',
      skorSiswa: {}
    };

    // Defaultkan skor 0 untuk semua siswa
    siswaList.forEach(s => {
      newItem.skorSiswa[s.id] = newBentuk === 'Pilihan Ganda' ? 1 : 0;
    });

    onSaveABS([...absList, newItem]);
    setShowAddModal(false);
    setNewIndikator('');
    setNewKunci('');
    setNewBobotMaks(newBentuk === 'Pilihan Ganda' ? 1 : 2);
    showToast(`Butir soal No. ${nextNomor} (${newBentuk}) berhasil ditambahkan!`);
  };

  const handleDeleteQuestion = (itemId) => {
    if (window.confirm("Hapus butir soal ini dari analisis?")) {
      const updated = absList.filter(i => i.id !== itemId);
      onSaveABS(updated);
      showToast("Butir soal berhasil dihapus.");
    }
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

      {/* Header Card */}
      <div className="p-6 rounded-3xl bg-white border border-pastel-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-teal-100 text-teal-800">
                <HelpCircle className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-extrabold text-slate-800">Analisis Butir Soal (ABS) Interaktif</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dynamic Question Builder • Tingkat Kesukaran (Indeks P) • Daya Serap • Daya Pembeda
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5"
            >
              <PlusCircle className="w-4 h-4 text-emerald-200" />
              <span>Tambah Butir Soal</span>
            </button>
          </div>
        </div>

        {/* Filter Bar: Mapel & Ujian */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <span className="font-semibold text-slate-500 mr-2">Mata Pelajaran:</span>
              <select
                value={selectedMapelId}
                onChange={(e) => setSelectedMapelId(e.target.value)}
                className="py-1.5 px-3 rounded-xl border border-slate-200 font-bold text-slate-800 focus:outline-hidden focus:border-pastel-400 bg-pastel-50/60"
              >
                {mapelList.map(m => (
                  <option key={m.id} value={m.id}>{m.kode} - {m.nama}</option>
                ))}
              </select>
            </div>

            <div>
              <span className="font-semibold text-slate-500 mr-2">Jenis Asesmen:</span>
              <select
                value={selectedUjian}
                onChange={(e) => setSelectedUjian(e.target.value)}
                className="py-1.5 px-3 rounded-xl border border-slate-200 font-bold text-slate-800 focus:outline-hidden focus:border-pastel-400 bg-white"
              >
                <option value="PTS Semester 1">Sumatif Tengah Semester (PTS)</option>
                <option value="PAS Semester 1">Sumatif Akhir Semester (PAS)</option>
                <option value="Formatif Lingkup 1">Formatif Lingkup Materi 1</option>
              </select>
            </div>
          </div>

          <div className="text-xs text-slate-500">
            Total Soal: <span className="font-bold text-slate-800">{filteredABS.length} Butir</span> • Skor Maks: <span className="font-bold text-emerald-800">{stats.maxTotal} Poin</span>
          </div>
        </div>
      </div>

      {/* Analytics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-gradient-to-br from-pastel-100 to-white border border-pastel-300 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-pastel-900 uppercase">Daya Serap Ujian</span>
            <TrendingUp className="w-4 h-4 text-pastel-700" />
          </div>
          <div className="text-3xl font-extrabold text-slate-800 mt-2">
            {stats.dayaSerap}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Rata-rata kelas: {stats.rataSkor} dari total skor {stats.maxTotal}
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-gradient-to-br from-teal-50 to-white border border-teal-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-900 uppercase">Kualitas Bank Soal</span>
            <Award className="w-4 h-4 text-teal-700" />
          </div>
          <div className="text-3xl font-extrabold text-teal-950 mt-2">
            {distribusi['Sedang (Ideal)'] || 0} Soal
          </div>
          <p className="text-[11px] text-teal-700 mt-1">
            Soal berdaya pembeda ideal (Indeks P 0.40 - 0.60)
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900 uppercase">Distribusi Kesukaran</span>
            <PieChart className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="flex items-center space-x-1.5 mt-2">
            <span className="text-xs font-bold text-rose-700">{distribusi['Sangat Sulit']} SS</span>
            <span className="text-xs text-slate-300">•</span>
            <span className="text-xs font-bold text-amber-700">{distribusi['Sulit']} S</span>
            <span className="text-xs text-slate-300">•</span>
            <span className="text-xs font-bold text-emerald-700">{distribusi['Sedang (Ideal)']} ID</span>
            <span className="text-xs text-slate-300">•</span>
            <span className="text-xs font-bold text-teal-700">{distribusi['Mudah']} M</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Kombinasi soal seimbang untuk standar evaluasi kurikulum
          </p>
        </div>
      </div>

      {/* Dynamic ABS Matrix & Question Analysis */}
      <div className="bg-white rounded-3xl border border-pastel-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">
            Matriks Penilaian & Analisis Tingkat Kesukaran Tiap Butir Soal
          </h3>
          <span className="text-xs text-slate-400">
            Input langsung skor siswa (0 s.d Skor Maks)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-pastel-100/70 border-b border-pastel-200 text-slate-800">
                <th className="py-3 px-3 font-bold w-12 text-center">No</th>
                <th className="py-3 px-3 font-bold min-w-[200px]">Indikator Soal & Bentuk</th>
                <th className="py-3 px-2 font-bold text-center w-16">Bentuk</th>
                <th className="py-3 px-2 font-bold text-center w-14">Bobot</th>
                <th className="py-3 px-2 font-bold text-center w-14">Kunci</th>
                
                {/* Siswa Columns */}
                {siswaList.map(s => (
                  <th key={s.id} className="py-3 px-1 text-center font-bold w-16 bg-white/60" title={s.nama}>
                    <div className="truncate w-14 mx-auto text-[10px] text-slate-700">
                      {s.nama.split(' ')[0]}
                    </div>
                  </th>
                ))}

                <th className="py-3 px-2 font-extrabold text-center bg-pastel-200/50 w-16">Indeks P</th>
                <th className="py-3 px-3 font-bold text-center min-w-[120px]">Tingkat Kesukaran</th>
                <th className="py-3 px-3 font-bold min-w-[200px]">Rekomendasi Tindak Lanjut</th>
                <th className="py-3 px-2 font-bold text-center w-10">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredABS.length === 0 ? (
                <tr>
                  <td colSpan={6 + siswaList.length} className="py-8 text-center text-slate-400">
                    Belum ada butir soal untuk mata pelajaran dan ujian ini. Klik <strong>"Tambah Butir Soal"</strong> di atas.
                  </td>
                </tr>
              ) : (
                filteredABS.map((item, idx) => {
                  const analysis = ABSController.hitungTingkatKesukaran(item, siswaList);

                  return (
                    <tr key={item.id} className="hover:bg-pastel-50/40 transition-colors">
                      <td className="py-3 px-3 text-center font-bold text-slate-600">{idx + 1}</td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-800">{item.indikator}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">ID: {item.id}</div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          item.bentuk === 'Pilihan Ganda' ? 'bg-sky-50 text-sky-800 border border-sky-200' :
                          item.bentuk === 'Isian' ? 'bg-teal-50 text-teal-800 border border-teal-200' :
                          'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}>
                          {item.bentuk}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-slate-700">{item.bobotMaks}</td>
                      <td className="py-3 px-2 text-center font-mono font-bold text-emerald-800 bg-emerald-50/50 rounded">
                        {item.kunci}
                      </td>

                      {/* Skor Siswa Inputs */}
                      {siswaList.map(s => {
                        const currentScore = item.skorSiswa?.[s.id] !== undefined ? item.skorSiswa[s.id] : '';
                        return (
                          <td key={s.id} className="py-1 px-1 text-center">
                            <input
                              type="number"
                              min="0"
                              max={item.bobotMaks}
                              value={currentScore}
                              onChange={(e) => handleScoreChange(item.id, s.id, e.target.value)}
                              className="w-10 text-center py-1 rounded-md border border-slate-200 font-semibold text-slate-800 focus:outline-hidden focus:border-teal-400 focus:bg-white"
                            />
                          </td>
                        );
                      })}

                      {/* Tingkat Kesukaran (P) */}
                      <td className="py-3 px-2 text-center bg-pastel-50/60 font-extrabold text-slate-800">
                        {analysis.p}
                        <div className="text-[9px] text-slate-400 font-normal">{analysis.persen}%</div>
                      </td>

                      {/* Kategori Kesukaran */}
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${analysis.color}`}>
                          {analysis.kategori}
                        </span>
                      </td>

                      {/* Rekomendasi */}
                      <td className="py-3 px-3 text-slate-600 text-[11px]">
                        {analysis.rekomendasi}
                      </td>

                      {/* Action */}
                      <td className="py-3 px-2 text-center">
                        <button
                          onClick={() => handleDeleteQuestion(item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Hapus Soal"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-slate-700">Keterangan Tingkat Kesukaran (P):</span>
            <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-medium">0.00 - 0.19: Sangat Sulit</span>
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">0.20 - 0.39: Sulit</span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">0.40 - 0.59: Sedang (Ideal)</span>
            <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-medium">0.60 - 0.79: Mudah</span>
            <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-medium">0.80 - 1.00: Sangat Mudah</span>
          </div>
        </div>
      </div>

      {/* Modal Tambah Butir Soal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-pastel-300 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">Tambah Butir Soal Baru</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddQuestion} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Bentuk Soal:</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Pilihan Ganda', 'Isian', 'Uraian'].map(b => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => {
                        setNewBentuk(b);
                        if (b === 'Pilihan Ganda') setNewBobotMaks(1);
                        else if (b === 'Isian') setNewBobotMaks(2);
                        else setNewBobotMaks(4);
                      }}
                      className={`py-2 rounded-xl border text-center font-semibold transition-all ${
                        newBentuk === b 
                          ? 'bg-pastel-200 border-pastel-400 text-pastel-900 font-bold' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Indikator Soal / Kompetensi yang Diuji:</label>
                <textarea
                  rows="3"
                  placeholder="Contoh: Siswa mampu memecahkan operasi hitung campuran..."
                  value={newIndikator}
                  onChange={(e) => setNewIndikator(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Bobot Skor Maksimal:</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newBobotMaks}
                    onChange={(e) => setNewBobotMaks(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400 font-bold"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kunci Jawaban Singkat:</label>
                  <input
                    type="text"
                    placeholder="Contoh: B atau 48 cm2"
                    value={newKunci}
                    onChange={(e) => setNewKunci(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400 font-bold uppercase"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Simpan Soal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
