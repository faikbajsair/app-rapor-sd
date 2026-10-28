import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  User, 
  Printer, 
  CheckCircle, 
  FileSpreadsheet,
  MapPin,
  Calendar,
  Home
} from 'lucide-react';

export function BukuIndukView({ 
  siswaList, 
  onAddSiswa, 
  onUpdateSiswa, 
  onDeleteSiswa, 
  settings 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSiswa, setSelectedSiswa] = useState(siswaList[0] || null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    nisn: '',
    nis: '',
    nama: '',
    jenisKelamin: 'L',
    tempatLahir: '',
    tanggalLahir: '',
    agama: 'Islam',
    namaAyah: '',
    namaIbu: '',
    pekerjaanOrtu: '',
    alamat: '',
    status: 'Aktif',
    foto: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80'
  });

  const filtered = siswaList.filter(s => 
    s.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.nisn.includes(searchQuery) ||
    s.nis.includes(searchQuery)
  );

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData({
      id: `S${String(siswaList.length + 1).padStart(2, '0')}`,
      nisn: '',
      nis: '',
      nama: '',
      jenisKelamin: 'L',
      tempatLahir: 'Jakarta',
      tanggalLahir: '2015-01-01',
      agama: 'Islam',
      namaAyah: '',
      namaIbu: '',
      pekerjaanOrtu: 'Wiraswasta',
      alamat: '',
      status: 'Aktif',
      foto: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (siswa) => {
    setIsEditing(true);
    setFormData(siswa);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.nisn) return;

    if (isEditing) {
      onUpdateSiswa(formData.id, formData);
      if (selectedSiswa?.id === formData.id) setSelectedSiswa(formData);
      showToast("Data siswa berhasil diperbarui di Buku Induk!");
    } else {
      onAddSiswa(formData);
      setSelectedSiswa(formData);
      showToast("Siswa baru berhasil didaftarkan ke Buku Induk!");
    }
    setShowModal(false);
  };

  const handleDelete = (siswa) => {
    if (window.confirm(`Hapus siswa "${siswa.nama}" dari Buku Induk?`)) {
      onDeleteSiswa(siswa.id);
      if (selectedSiswa?.id === siswa.id) setSelectedSiswa(siswaList[0] || null);
      showToast("Siswa berhasil dihapus.");
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

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-pastel-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-pastel-200 text-pastel-800">
                <BookOpen className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-extrabold text-slate-800">Buku Induk Siswa Digital</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Arsip biodata lengkap peserta didik, data orang tua, dan riwayat mutasi siswa
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4 text-emerald-200" />
              <span>Tambah Siswa Baru</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari nama, NISN, atau NIS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs border border-slate-200 focus:outline-hidden focus:border-pastel-400"
            />
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Total Terdaftar: <strong className="text-slate-800">{siswaList.length} Siswa</strong>
          </div>
        </div>
      </div>

      {/* 2-Column Split: List vs Detail Record */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Student Table / Directory (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-pastel-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-pastel-100/70 border-b border-pastel-200 text-slate-800">
                  <th className="py-3 px-3 font-bold w-10 text-center">No</th>
                  <th className="py-3 px-3 font-bold">Identitas Siswa</th>
                  <th className="py-3 px-3 font-bold">L/P</th>
                  <th className="py-3 px-3 font-bold">Orang Tua</th>
                  <th className="py-3 px-3 font-bold text-center">Status</th>
                  <th className="py-3 px-3 font-bold text-center w-20">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((siswa, idx) => {
                  const isSelected = selectedSiswa?.id === siswa.id;
                  return (
                    <tr 
                      key={siswa.id} 
                      onClick={() => setSelectedSiswa(siswa)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-pastel-100/70' : 'hover:bg-pastel-50/40'
                      }`}
                    >
                      <td className="py-3 px-3 text-center text-slate-400 font-medium">{idx + 1}</td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-800">{siswa.nama}</div>
                        <div className="text-[10px] text-slate-400">NISN: {siswa.nisn} • NIS: {siswa.nis}</div>
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-600">
                        {siswa.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        <div>Ayah: {siswa.namaAyah}</div>
                        <div className="text-[10px] text-slate-400">Ibu: {siswa.namaIbu}</div>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          {siswa.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center space-x-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleOpenEdit(siswa)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-pastel-900 hover:bg-pastel-200 transition-colors"
                            title="Edit Data"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(siswa)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Hapus Siswa"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Sheet Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {selectedSiswa ? (
            <div className="bg-white rounded-3xl p-6 border border-pastel-300 shadow-soft space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-pastel-200">
                <span className="text-xs font-bold text-pastel-900 uppercase tracking-wider">
                  Lembar Buku Induk
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">
                  NIS: {selectedSiswa.nis}
                </span>
              </div>

              {/* Photo & Main Identity */}
              <div className="flex items-start space-x-4">
                <img 
                  src={selectedSiswa.foto} 
                  alt={selectedSiswa.nama} 
                  className="w-20 h-24 rounded-2xl object-cover border-2 border-pastel-300 shadow-2xs"
                />
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-slate-800 leading-tight">
                    {selectedSiswa.nama}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">NISN: {selectedSiswa.nisn}</p>
                  <p className="text-xs text-slate-500">
                    {selectedSiswa.tempatLahir}, {selectedSiswa.tanggalLahir}
                  </p>
                  <div className="pt-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pastel-200 text-pastel-950 border border-pastel-300">
                      {settings.rombel} (Fase B)
                    </span>
                  </div>
                </div>
              </div>

              {/* Field Attributes */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Jenis Kelamin:</span>
                  <span className="font-semibold text-slate-700">{selectedSiswa.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Agama:</span>
                  <span className="font-semibold text-slate-700">{selectedSiswa.agama}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Nama Ayah:</span>
                  <span className="font-semibold text-slate-700">{selectedSiswa.namaAyah}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Nama Ibu:</span>
                  <span className="font-semibold text-slate-700">{selectedSiswa.namaIbu}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Pekerjaan Orang Tua:</span>
                  <span className="font-semibold text-slate-700">{selectedSiswa.pekerjaanOrtu}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Alamat Tempat Tinggal:</span>
                  <span className="font-semibold text-slate-700 text-right max-w-[200px]">{selectedSiswa.alamat}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  onClick={() => handleOpenEdit(selectedSiswa)}
                  className="px-4 py-2 rounded-xl bg-pastel-100 hover:bg-pastel-200 text-pastel-900 text-xs font-bold border border-pastel-300 transition-colors"
                >
                  Edit Biodata
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center text-slate-400 text-xs">
              Pilih salah satu siswa di tabel untuk melihat arsip lembar buku induk.
            </div>
          )}
        </div>

      </div>

      {/* Modal Add / Edit Siswa */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-pastel-300 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">
                {isEditing ? 'Edit Data Siswa Buku Induk' : 'Tambah Siswa Baru ke Buku Induk'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Lengkap Siswa:</label>
                <input
                  type="text"
                  placeholder="Nama Lengkap..."
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">NISN (10 Digit):</label>
                  <input
                    type="text"
                    placeholder="0134567891"
                    value={formData.nisn}
                    onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">NIS Sekolah:</label>
                  <input
                    type="text"
                    placeholder="22230401"
                    value={formData.nis}
                    onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Jenis Kelamin:</label>
                  <select
                    value={formData.jenisKelamin}
                    onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400"
                  >
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tempat Lahir:</label>
                  <input
                    type="text"
                    placeholder="Jakarta"
                    value={formData.tempatLahir}
                    onChange={(e) => setFormData({ ...formData, tempatLahir: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tanggal Lahir:</label>
                  <input
                    type="date"
                    value={formData.tanggalLahir}
                    onChange={(e) => setFormData({ ...formData, tanggalLahir: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nama Ayah:</label>
                  <input
                    type="text"
                    placeholder="Nama Ayah..."
                    value={formData.namaAyah}
                    onChange={(e) => setFormData({ ...formData, namaAyah: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nama Ibu:</label>
                  <input
                    type="text"
                    placeholder="Nama Ibu..."
                    value={formData.namaIbu}
                    onChange={(e) => setFormData({ ...formData, namaIbu: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Pekerjaan Orang Tua:</label>
                <input
                  type="text"
                  placeholder="Wiraswasta / PNS / Karyawan..."
                  value={formData.pekerjaanOrtu}
                  onChange={(e) => setFormData({ ...formData, pekerjaanOrtu: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Alamat Tempat Tinggal:</label>
                <textarea
                  rows="2"
                  placeholder="Alamat lengkap..."
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400 resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Simpan Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
