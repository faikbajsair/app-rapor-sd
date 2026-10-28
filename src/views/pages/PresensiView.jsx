import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Sparkles, 
  Plus, 
  Trash2, 
  Award, 
  CheckCircle,
  FileText,
  UserCheck
} from 'lucide-react';

export function PresensiView({ 
  siswaList, 
  presensiList, 
  onSavePresensi, 
  settings 
}) {
  const [selectedSiswaId, setSelectedSiswaId] = useState(siswaList[0]?.id || 'S01');
  const [toastMessage, setToastMessage] = useState(null);

  const currentSiswa = siswaList.find(s => s.id === selectedSiswaId) || siswaList[0];

  const getRecord = (siswaId) => {
    return presensiList.find(p => p.siswaId === siswaId) || {
      siswaId,
      sakit: 0,
      izin: 0,
      alpa: 0,
      terlambat: 0,
      catatanWaliKelas: 'Ananda menunjukkan antusiasme yang sangat baik dalam kegiatan pembelajaran dan hafalan Al-Qur\'an.',
      ekstrakurikuler: [
        { nama: 'Pramuka Siaga', predikat: 'A', keterangan: 'Sangat aktif dan disiplin' }
      ],
      prestasi: []
    };
  };

  const currentRecord = getRecord(selectedSiswaId);

  const handleFieldChange = (field, val) => {
    const updated = {
      ...currentRecord,
      [field]: val
    };
    onSavePresensi(updated);
  };

  const handleAddEkstra = () => {
    const currentEkstra = currentRecord.ekstrakurikuler || [];
    const updated = {
      ...currentRecord,
      ekstrakurikuler: [
        ...currentEkstra,
        { nama: 'Ekstrakurikuler Baru', predikat: 'A', keterangan: 'Aktif mengikuti kegiatan' }
      ]
    };
    onSavePresensi(updated);
    showToast("Ekstrakurikuler baru ditambahkan.");
  };

  const handleUpdateEkstra = (index, key, val) => {
    const currentEkstra = [...(currentRecord.ekstrakurikuler || [])];
    currentEkstra[index] = { ...currentEkstra[index], [key]: val };
    onSavePresensi({ ...currentRecord, ekstrakurikuler: currentEkstra });
  };

  const handleDeleteEkstra = (index) => {
    const currentEkstra = (currentRecord.ekstrakurikuler || []).filter((_, idx) => idx !== index);
    onSavePresensi({ ...currentRecord, ekstrakurikuler: currentEkstra });
    showToast("Ekstrakurikuler dihapus.");
  };

  const handleAddPrestasi = () => {
    const currentPrestasi = currentRecord.prestasi || [];
    const updated = {
      ...currentRecord,
      prestasi: [
        ...currentPrestasi,
        { nama: 'Juara Lomba Akademik/Tahfidz', tahun: new Date().getFullYear().toString() }
      ]
    };
    onSavePresensi(updated);
    showToast("Prestasi baru ditambahkan.");
  };

  const handleUpdatePrestasi = (index, key, val) => {
    const currentPrestasi = [...(currentRecord.prestasi || [])];
    currentPrestasi[index] = { ...currentPrestasi[index], [key]: val };
    onSavePresensi({ ...currentRecord, prestasi: currentPrestasi });
  };

  const handleDeletePrestasi = (index) => {
    const currentPrestasi = (currentRecord.prestasi || []).filter((_, idx) => idx !== index);
    onSavePresensi({ ...currentRecord, prestasi: currentPrestasi });
    showToast("Prestasi dihapus.");
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
                <CalendarCheck className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-extrabold text-slate-800">Presensi, Ekstrakurikuler & Catatan Wali Kelas</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Input ketidakhadiran (S/I/A/Terlambat), capaian ekstra, penghargaan prestasi, dan catatan perkembangan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Siswa Selector Bar */}
        <div className="pt-2 border-t border-slate-100">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Pilih Siswa:
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

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Rekap Presensi & Catatan (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Card Ketidakhadiran */}
          <div className="bg-white rounded-3xl p-6 border border-pastel-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <CalendarCheck className="w-4 h-4 text-pastel-700" />
              <span>Rekapitulasi Ketidakhadiran Semester Ini</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 text-center">
                <span className="text-xs font-bold text-amber-800 block">Sakit (S)</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={currentRecord.sakit}
                  onChange={(e) => handleFieldChange('sakit', Number(e.target.value) || 0)}
                  className="w-16 mx-auto text-center font-extrabold text-xl py-1 rounded-lg border border-amber-300 mt-2 bg-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Hari</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-200 text-center">
                <span className="text-xs font-bold text-sky-800 block">Izin (I)</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={currentRecord.izin}
                  onChange={(e) => handleFieldChange('izin', Number(e.target.value) || 0)}
                  className="w-16 mx-auto text-center font-extrabold text-xl py-1 rounded-lg border border-sky-300 mt-2 bg-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Hari</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 text-center">
                <span className="text-xs font-bold text-rose-800 block">Tanpa Ket. (A)</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={currentRecord.alpa}
                  onChange={(e) => handleFieldChange('alpa', Number(e.target.value) || 0)}
                  className="w-16 mx-auto text-center font-extrabold text-xl py-1 rounded-lg border border-rose-300 mt-2 bg-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Hari</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-xs font-bold text-slate-700 block">Terlambat (T)</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={currentRecord.terlambat}
                  onChange={(e) => handleFieldChange('terlambat', Number(e.target.value) || 0)}
                  className="w-16 mx-auto text-center font-extrabold text-xl py-1 rounded-lg border border-slate-300 mt-2 bg-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Kali</span>
              </div>
            </div>
          </div>

          {/* Catatan / Saran Wali Kelas */}
          <div className="bg-white rounded-3xl p-6 border border-pastel-200 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-pastel-700" />
              <span>Catatan & Saran Wali Kelas untuk Siswa</span>
            </h3>
            <p className="text-xs text-slate-500">
              Pesan motivasi, arahan pembelajaran, dan rekomendasi orang tua di rapor semester.
            </p>
            <textarea
              rows="4"
              value={currentRecord.catatanWaliKelas || ''}
              onChange={(e) => handleFieldChange('catatanWaliKelas', e.target.value)}
              placeholder="Tuliskan catatan dan motivasi wali kelas..."
              className="w-full p-3 rounded-2xl border border-slate-200 text-xs text-slate-800 leading-relaxed focus:outline-hidden focus:border-pastel-400 resize-none font-medium"
            />
          </div>

        </div>

        {/* Right Column: Ekstrakurikuler & Prestasi (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Card Ekstrakurikuler */}
          <div className="bg-white rounded-3xl p-6 border border-pastel-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Kegiatan Ekstrakurikuler Siswa</span>
              </h3>
              <button
                onClick={handleAddEkstra}
                className="px-3 py-1.5 rounded-xl bg-pastel-100 hover:bg-pastel-200 text-pastel-900 text-xs font-bold border border-pastel-300 transition-colors flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Ekstra</span>
              </button>
            </div>

            <div className="space-y-3">
              {(currentRecord.ekstrakurikuler || []).map((ekstra, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-pastel-50/50 border border-pastel-200 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={ekstra.nama}
                      onChange={(e) => handleUpdateEkstra(idx, 'nama', e.target.value)}
                      placeholder="Nama Ekstrakurikuler..."
                      className="flex-1 p-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 focus:outline-hidden focus:border-pastel-400 bg-white"
                    />
                    <select
                      value={ekstra.predikat}
                      onChange={(e) => handleUpdateEkstra(idx, 'predikat', e.target.value)}
                      className="p-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 focus:outline-hidden focus:border-pastel-400 bg-white"
                    >
                      <option value="A">Sangat Baik (A)</option>
                      <option value="B">Baik (B)</option>
                      <option value="C">Cukup (C)</option>
                    </select>
                    <button
                      onClick={() => handleDeleteEkstra(idx)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={ekstra.keterangan}
                    onChange={(e) => handleUpdateEkstra(idx, 'keterangan', e.target.value)}
                    placeholder="Keterangan capaian siswa..."
                    className="w-full p-1.5 rounded-lg border border-slate-200 text-[11px] text-slate-600 focus:outline-hidden focus:border-pastel-400 bg-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Card Prestasi */}
          <div className="bg-white rounded-3xl p-6 border border-pastel-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Prestasi & Penghargaan Siswa</span>
              </h3>
              <button
                onClick={handleAddPrestasi}
                className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 transition-colors flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Prestasi</span>
              </button>
            </div>

            <div className="space-y-3">
              {(currentRecord.prestasi || []).length === 0 ? (
                <p className="text-xs text-slate-400 italic">Belum ada catatan prestasi yang ditambahkan.</p>
              ) : (
                (currentRecord.prestasi || []).map((prestasi, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-amber-50/30 border border-amber-200 flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={prestasi.nama}
                      onChange={(e) => handleUpdatePrestasi(idx, 'nama', e.target.value)}
                      placeholder="Nama Prestasi / Kejuaraan..."
                      className="flex-1 p-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                    />
                    <input
                      type="text"
                      value={prestasi.tahun}
                      onChange={(e) => handleUpdatePrestasi(idx, 'tahun', e.target.value)}
                      placeholder="Tahun"
                      className="w-16 p-1.5 rounded-lg border border-slate-200 text-xs text-center font-bold text-slate-800 bg-white"
                    />
                    <button
                      onClick={() => handleDeletePrestasi(idx)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
