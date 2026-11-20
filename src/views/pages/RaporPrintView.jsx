import React, { useState, useMemo } from 'react';
import {
  Printer,
  School
} from 'lucide-react';
import { NilaiController } from '../../controllers/NilaiController';
import { SikapController } from '../../controllers/SikapController';
import { QRCodeSVG } from 'qrcode.react';

const MUATAN_WAJIB_RAPOR = [
  { no: 1, id: 'PP', nama: 'Pendidikan Pancasila' },
  { no: 2, id: 'BIN', nama: 'Bahasa Indonesia' },
  { no: 3, id: 'SB', nama: 'Seni Rupa' },
  { no: 4, id: 'PJOK', nama: 'Pendidikan Jasmani Olahraga dan Kesehatan' },
  { no: 5, id: 'MAT', nama: 'Mathematics' }
];

const MUATAN_LOKAL_RAPOR = [
  { no: 6, id: 'AKD', nama: 'Akidah Ahlak' },
  { no: 7, id: 'FQH', nama: 'Fiqih Ibadah' },
  { no: 8, id: 'ADB', nama: 'Adab Ahlak' },
  { no: 9, id: 'BAR', nama: 'Bahasa Arab' },
  { no: 10, id: 'BIG', nama: 'Bahasa Inggris' },
  { no: 11, id: 'INF', nama: 'Informatika' }
];

const MUATAN_WAJIB_RAPOR_KELAS4 = [
  { no: 1, id: 'PP', nama: 'Pendidikan Pancasila' },
  { no: 2, id: 'BIN', nama: 'Bahasa Indonesia' },
  { no: 3, id: 'IPAS', nama: 'Ilmu Pengetahuan Alam dan Sosial' },
  { no: 4, id: 'SB', nama: 'Seni Rupa' },
  { no: 5, id: 'PJOK', nama: 'Pendidikan Jasmani Olahraga dan Kesehatan' },
  { no: 6, id: 'MAT', nama: 'Mathematics' }
];

const MUATAN_LOKAL_RAPOR_KELAS4 = [
  { no: 7, id: 'BS', nama: 'Bahasa Sunda' },
  { no: 8, id: 'AKD', nama: 'Akidah Ahlak' },
  { no: 9, id: 'FQH', nama: 'Fiqih Ibadah' },
  { no: 10, id: 'SKI', nama: 'Sejarah Islam' },
  { no: 11, id: 'ADB', nama: 'Adab Ahlak' },
  { no: 12, id: 'BAR', nama: 'Bahasa Arab' },
  { no: 13, id: 'BIG', nama: 'Bahasa Inggris' },
  { no: 14, id: 'INF', nama: 'Informatika' }
];

const BUKU_INDUK_MAPEL_ROWS = [
  { no: 1, id: 'PP', nama: 'Pendidikan Pancasila', active: true },
  { no: 2, id: 'BIN', nama: 'Bahasa Indonesia', active: true },
  { no: 3, id: 'IPAS', nama: 'Ilmu Pengetahuan Alam dan Sosial', active: false },
  { no: 4, id: 'SB', nama: 'Seni Rupa', active: true },
  { no: 5, id: 'PJOK', nama: 'Pendidikan Jasmani Olahraga dan Kesehatan', active: true },
  { no: 6, id: 'MAT', nama: 'Mathematics', active: true },
  { no: 7, id: 'BS', nama: 'Bahasa Sunda', active: false },
  { no: 8, id: 'AKD', nama: 'Akidah Ahlak', active: true },
  { no: 9, id: 'FQH', nama: 'Fiqih Ibadah', active: true },
  { no: 10, id: 'SKI', nama: 'Sejarah Islam', active: false },
  { no: 11, id: 'ADB', nama: 'Adab Ahlak', active: true },
  { no: 12, id: 'BAR', nama: 'Bahasa Arab', active: true },
  { no: 13, id: 'BIG', nama: 'Bahasa Inggris', active: true },
  { no: 14, id: 'INF', nama: 'Informatika', active: true },
  { no: 15, id: 'EXTRA_EMPTY', nama: '', active: false }
];

export function RaporPrintView({
  siswaList,
  mapelList,
  nilaiList,
  sikapList,
  presensiList,
  settings,
  approval,
  currentRole,
  currentUser
}) {
  const isParent = currentRole === 'wali_murid';
  const parentChildId = currentUser?.siswaId || siswaList[0]?.id;

  const [selectedRombel, setSelectedRombel] = useState(() => {
    const k = (currentUser?.kelasDiampu?.[0] || '').toLowerCase();
    if (k.includes('4 ali') || k.includes('4-a')) return '4 Ali Bin Abi Thalib';
    if (k.includes('umar') || k.includes('1-b')) return '1 Abdullah Ibnu Umar';
    return '1 Abdullah Ibnu Abbas';
  });
  const [selectedSiswaId, setSelectedSiswaId] = useState(isParent ? parentChildId : (siswaList[0]?.id || 'S_1ABBAS_01'));
  const [documentType, setDocumentType] = useState('rapor_pts'); // 'rapor_pts' | 'buku_induk' | 'rapor_akhir' | 'cover'
  const [isBulkPrint, setIsBulkPrint] = useState(false);

  const filteredSiswaByRombel = useMemo(() => {
    if (selectedRombel === 'SEMUA') return siswaList;
    return siswaList.filter(s =>
      (s.kelas && s.kelas.toLowerCase().includes(selectedRombel.toLowerCase())) ||
      (s.rombel && s.rombel.toLowerCase().includes(selectedRombel.toLowerCase()))
    );
  }, [siswaList, selectedRombel]);

  const activeSiswa = isParent
    ? (siswaList.find(s => s.id === parentChildId) || siswaList[0])
    : (filteredSiswaByRombel.find(s => s.id === selectedSiswaId) || filteredSiswaByRombel[0] || siswaList[0]);

  const studentsToRender = (isBulkPrint && !isParent) ? filteredSiswaByRombel : [activeSiswa];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">

      {/* Control Panel (Hidden during Print) */}
      <div className="no-print p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-emerald-800 text-amber-300">
              <Printer className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Cetak Rapor Resmi & Lembar Buku Induk A4
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Sesuai Sheet <strong className="text-slate-700">RAPOR</strong> & <strong className="text-slate-700">INDUK</strong> Yayasan Sekolah Anak Pintar "SAPIN" Darussalam • SD Al-Imam Islamic School
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {!isParent && (
              <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                <School className="w-4 h-4 text-emerald-700" />
                <select
                  value={selectedRombel}
                  onChange={(e) => {
                    setSelectedRombel(e.target.value);
                    const first = siswaList.find(s => s.kelas && s.kelas.toLowerCase().includes(e.target.value.toLowerCase()));
                    if (first) setSelectedSiswaId(first.id);
                  }}
                  className="bg-transparent text-xs font-extrabold text-slate-800 focus:outline-hidden cursor-pointer"
                >
                  <option value="1 Abdullah Ibnu Abbas">1 Abdullah Ibnu Abbas (21 Santri)</option>
                  <option value="1 Abdullah Ibnu Umar">1 Abdullah Ibnu Umar (20 Santri)</option>
                  <option value="4 Ali Bin Abi Thalib">4 Ali Bin Abi Thalib (21 Santri)</option>
                  <option value="SEMUA">Semua Rombel</option>
                </select>
              </div>
            )}

            {!isParent && (
              <button
                onClick={() => setIsBulkPrint(!isBulkPrint)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${isBulkPrint
                  ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-2xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
              >
                {isBulkPrint ? `✓ Mode Cetak Massal (${filteredSiswaByRombel.length} Siswa)` : 'Cetak Siswa Terpilih'}
              </button>
            )}

            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-extrabold transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>Cetak / Ekspor PDF Sekarang</span>
            </button>
          </div>
        </div>

        {/* Format Selector & Student Picker */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">

          {/* Format Document Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-500">Pilih Lembar Cetak:</span>
            <div className="inline-flex flex-wrap rounded-xl p-1 bg-slate-100 border border-slate-200 gap-1">
              <button
                onClick={() => setDocumentType('rapor_pts')}
                className={`px-3 py-1.5 rounded-lg font-extrabold transition-all cursor-pointer ${documentType === 'rapor_pts' ? 'bg-emerald-800 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Sheet RAPOR (PTS Al-Imam)
              </button>
              <button
                onClick={() => setDocumentType('buku_induk')}
                className={`px-3 py-1.5 rounded-lg font-extrabold transition-all cursor-pointer ${documentType === 'buku_induk' ? 'bg-emerald-800 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Sheet INDUK (Buku Induk)
              </button>
              <button
                onClick={() => setDocumentType('rapor_akhir')}
                className={`px-3 py-1.5 rounded-lg font-extrabold transition-all cursor-pointer ${documentType === 'rapor_akhir' ? 'bg-emerald-800 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Rapor Akhir Semester (PAS)
              </button>
              <button
                onClick={() => setDocumentType('cover')}
                className={`px-3 py-1.5 rounded-lg font-extrabold transition-all cursor-pointer ${documentType === 'cover' ? 'bg-emerald-800 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Sampul / Cover Rapor
              </button>
            </div>
          </div>

          {/* Student Picker */}
          {isParent ? (
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-slate-500">Data Rapor Ananda:</span>
              <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 font-extrabold">
                {activeSiswa?.nama} ({activeSiswa?.nis})
              </span>
            </div>
          ) : (
            !isBulkPrint && (
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-500">Pilih Siswa:</span>
                <select
                  value={activeSiswa?.id}
                  onChange={(e) => setSelectedSiswaId(e.target.value)}
                  className="py-1.5 px-3 rounded-xl border border-slate-300 font-extrabold text-slate-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                >
                  {filteredSiswaByRombel.map((s, idx) => (
                    <option key={s.id} value={s.id}>
                      {s.no || idx + 1}. {s.nama} ({s.nis})
                    </option>
                  ))}
                </select>
              </div>
            )
          )}

        </div>
      </div>

      {/* Printable Paper Canvas Area (A4 Width Preview) */}
      <div className="print-container max-w-4xl mx-auto space-y-8">
        {studentsToRender.map((siswa, studentIdx) => {
          if (!siswa) return null;
          const studentNilai = nilaiList.filter(n => n.siswaId === siswa.id);
          const studentSikap = sikapList.find(s => s.siswaId === siswa.id) || {
            berimanBertakwa: 'Sangat Baik',
            berkebinekaan: 'Baik',
            gotongRoyong: 'Sangat Baik',
            mandiri: 'Baik',
            bernalarKritis: 'Baik',
            kreatif: 'Sangat Baik',
            spiritual: 'Alhamdulillah ananda sangat baik dalam bersyukur, berdoa, taat beribadah, toleransi',
            sosial: 'Alhamdulillah ananda baik dalam tanggung jawab, jujur, peduli, disiplin, percaya diri, kerjasama, santun'
          };
          const studentPresensi = presensiList.find(p => p.siswaId === siswa.id) || {
            sakit: 0, izin: 0, alpa: 0, terlambat: 0,
            catatanWaliKelas: 'Alhamdulilah Ananda sudah baik dalam mengikuti pembelajaran selama 3 bulan, teruslah berusaha lebih giat dalam belajar jangan mudah menyerah.',
            ekstrakurikuler: [],
            prestasi: []
          };

          const narasiSikap = SikapController.generateNarasiSikap(siswa.nama, studentSikap);
          const isKelasUmar = (siswa.kelas || '').toLowerCase().includes('umar');
          const isKelas4Ali = (siswa.kelas || '').toLowerCase().includes('4 ali');
          const waliKelasNama = isKelas4Ali
            ? 'Zahra Aulia, S.Pd'
            : isKelasUmar
              ? 'Siti Habzah Diniyanti, S.Sos'
              : 'Putri Hidayah, S.Pd';

          return (
            <div
              key={siswa.id}
              className={`bg-white p-6 sm:p-10 rounded-3xl border border-slate-300 shadow-xl font-serif text-slate-950 ${studentIdx > 0 ? 'page-break' : ''
                }`}
            >

              {/* =========================================================================
               * 1. SHEET RAPOR (PERSIS GAMBAR 2: YAYASAN SEKOLAH ANAK PINTAR "SAPIN" DARUSSALAM)
               * ========================================================================= */}
              {documentType === 'rapor_pts' && (
                <div className="space-y-4 text-[11.5px] leading-snug">

                  {/* Top Title & Yellow Student Number Badge */}
                  <div className="relative border-b-2 border-slate-900 pb-2 text-center">
                    <div className="font-bold text-xs sm:text-sm uppercase">
                      YAYASAN SEKOLAH ANAK PINTAR &ldquo;SAPIN&rdquo; DARUSSALAM
                    </div>
                    <div className="font-black text-sm sm:text-base uppercase">
                      SD AL-IMAM ISLAMIC SCHOOL
                    </div>
                    <div className="pt-2 font-bold text-xs uppercase underline">
                      LAPORAN PERKEMBANGAN AKADEMIK SISWA
                    </div>
                    <div className="font-bold text-xs uppercase">
                      TAHUN PELAJARAN {settings.tahunAjaran || '2026/2027'}
                    </div>

                    {/* Nomor Urut Kuning di Pojok Kanan Atas Persis Gambar 2 */}
                    <div className="no-print absolute right-0 top-0 bg-yellow-300 border border-slate-900 px-2.5 py-0.5 font-sans font-black text-xs">
                      {siswa.no || studentIdx + 1}
                    </div>
                  </div>

                  {/* Identitas Siswa 2 Kolom Persis Gambar 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-1 text-[11px] py-1">
                    <div className="sm:col-span-7 space-y-0.5">
                      <div className="grid grid-cols-12">
                        <span className="col-span-4">Nama Peserta Didik</span>
                        <span className="col-span-8 font-bold">: {siswa.nama}</span>
                      </div>
                      <div className="grid grid-cols-12">
                        <span className="col-span-4">NISN</span>
                        <span className="col-span-8">: {siswa.nisn && siswa.nisn !== '-' ? siswa.nisn : siswa.nis}</span>
                      </div>
                      <div className="grid grid-cols-12">
                        <span className="col-span-4">Sekolah</span>
                        <span className="col-span-8">: SD AL-IMAM ISLAMIC SCHOOL</span>
                      </div>
                      <div className="grid grid-cols-12">
                        <span className="col-span-4">Alamat</span>
                        <span className="col-span-8">: Limus Pratama Regency Jl. Blitar</span>
                      </div>
                    </div>

                    <div className="sm:col-span-5 space-y-0.5">
                      <div className="grid grid-cols-12">
                        <span className="col-span-5">Kelas</span>
                        <span className="col-span-7">: {isKelas4Ali ? 'IV (empat)' : 'I (Satu)'}</span>
                      </div>
                      <div className="grid grid-cols-12">
                        <span className="col-span-5">Fase</span>
                        <span className="col-span-7">: {isKelas4Ali ? 'B' : 'A'}</span>
                      </div>
                      <div className="grid grid-cols-12">
                        <span className="col-span-5">Semester</span>
                        <span className="col-span-7">: I (Satu)</span>
                      </div>
                      <div className="grid grid-cols-12">
                        <span className="col-span-5">Tahun Pelajaran</span>
                        <span className="col-span-7">: 2026-2027</span>
                      </div>
                    </div>
                  </div>

                  {/* A. Sikap Profil Pelajar Pancasila */}
                  <div className="space-y-1">
                    <div className="font-bold text-xs">A. Sikap Profil Pelajar Pancasila</div>
                    <table className="w-full border border-slate-900 border-collapse text-[11px]">
                      <thead>
                        <tr className="border-b border-slate-900 text-center font-bold bg-slate-50">
                          <th colSpan={2} className="py-1 px-2">Deskripsi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-900">
                          <td className="py-1.5 px-2.5 border-r border-slate-900 w-2/5 align-top">
                            Sikap beriman, bertaqwa kepada Allah dan berakhlak mulia
                          </td>
                          <td className="py-1.5 px-2.5 align-top">
                            {studentSikap.spiritual || 'Alhamdulillah ananda sangat baik dalam bersyukur, berdoa, taat beribadah, toleransi'}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1.5 px-2.5 border-r border-slate-900 align-top">
                            Sikap berkebinekaan global, gotong royong, mandiri, bernalar kritis, kreatif
                          </td>
                          <td className="py-1.5 px-2.5 align-top">
                            {studentSikap.sosial || 'Alhamdulillah ananda baik dalam tanggung jawab, jujur, peduli, disiplin, percaya diri, kerjasama, santun'}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* B. Capaian Kompetensi */}
                  <div className="space-y-1">
                    <div className="font-bold text-xs">B. Capaian Kompetensi</div>
                    <table className="w-full border border-slate-900 border-collapse text-[11px]">
                      <thead>
                        <tr className="border-b border-slate-900 text-center font-bold bg-slate-50">
                          <th className="py-1 px-2 border-r border-slate-900 w-10">No</th>
                          <th className="py-1 px-2.5 border-r border-slate-900 text-left">Muatan Pelajaran</th>
                          <th className="py-1 px-2 border-r border-slate-900 w-16">Nilai</th>
                          <th className="py-1 px-2 border-r border-slate-900 w-20">Predikat</th>
                          <th className="py-1 px-2.5 w-32">Deskripsi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Kelompok A: Muatan Wajib */}
                        <tr className="border-b border-slate-900 font-bold bg-slate-50/60">
                          <td className="py-1 px-2 border-r border-slate-900 text-center">A</td>
                          <td colSpan={4} className="py-1 px-2.5">Muatan Wajib</td>
                        </tr>
                        {(isKelas4Ali ? MUATAN_WAJIB_RAPOR_KELAS4 : MUATAN_WAJIB_RAPOR).map((m) => {
                          const rec = studentNilai.find(n => n.mapelId === m.id);
                          const val = rec ? Math.round(Number(rec.nilaiAkhir || 0)) : 90;
                          const pred = val >= 90 ? 'A' : val >= 80 ? 'B' : val >= 70 ? 'C' : 'D';
                          const desc = val >= 90 ? 'Sangat Baik' : val >= 80 ? 'Baik' : val >= 70 ? 'Cukup' : 'Kurang';
                          return (
                            <tr key={m.id} className="border-b border-slate-900">
                              <td className="py-1 px-2 border-r border-slate-900 text-center">{m.no}</td>
                              <td className="py-1 px-2.5 border-r border-slate-900">{m.nama}</td>
                              <td className="py-1 px-2 border-r border-slate-900 text-center font-bold">{val}</td>
                              <td className="py-1 px-2 border-r border-slate-900 text-center">{pred}</td>
                              <td className="py-1 px-2.5 text-center">{desc}</td>
                            </tr>
                          );
                        })}

                        {/* Kelompok B: Muatan Lokal */}
                        <tr className="border-b border-slate-900 font-bold bg-slate-50/60">
                          <td className="py-1 px-2 border-r border-slate-900 text-center">B</td>
                          <td colSpan={4} className="py-1 px-2.5">Muatan Lokal</td>
                        </tr>
                        {(isKelas4Ali ? MUATAN_LOKAL_RAPOR_KELAS4 : MUATAN_LOKAL_RAPOR).map((m) => {
                          const rec = studentNilai.find(n => n.mapelId === m.id);
                          const val = rec ? Math.round(Number(rec.nilaiAkhir || 0)) : 90;
                          const pred = val >= 90 ? 'A' : val >= 80 ? 'B' : val >= 70 ? 'C' : 'D';
                          const desc = val >= 90 ? 'Sangat Baik' : val >= 80 ? 'Baik' : val >= 70 ? 'Cukup' : 'Kurang';
                          return (
                            <tr key={m.id} className="border-b border-slate-900">
                              <td className="py-1 px-2 border-r border-slate-900 text-center">{m.no}</td>
                              <td className="py-1 px-2.5 border-r border-slate-900">{m.nama}</td>
                              <td className="py-1 px-2 border-r border-slate-900 text-center font-bold">{val}</td>
                              <td className="py-1 px-2 border-r border-slate-900 text-center">{pred}</td>
                              <td className="py-1 px-2.5 text-center">{desc}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* C. Ekstrakulikuler */}
                  <div className="space-y-1">
                    <div className="font-bold text-xs">C. Ekstrakulikuler</div>
                    <table className="w-full border border-slate-900 border-collapse text-[11px]">
                      <thead>
                        <tr className="border-b border-slate-900 text-center font-bold bg-slate-50">
                          <th className="py-1 px-2 border-r border-slate-900 w-10">No</th>
                          <th className="py-1 px-2.5 border-r border-slate-900">Kegiatan Ekstrakulikuler</th>
                          <th className="py-1 px-2.5 w-1/2">Keterangan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[0, 1, 2].map((idx) => {
                          const eks = (studentPresensi.ekstrakurikuler || [])[idx];
                          return (
                            <tr key={idx} className="border-b border-slate-900">
                              <td className="py-1 px-2 border-r border-slate-900 text-center">{idx + 1}</td>
                              <td className="py-1 px-2.5 border-r border-slate-900">{eks?.nama || ''}</td>
                              <td className="py-1 px-2.5">{eks?.keterangan || ''}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* D. Saran */}
                  <div className="space-y-1">
                    <div className="font-bold text-xs">D. Saran</div>
                    <div className="border border-slate-900 p-2.5 min-h-[48px] text-[11px]">
                      {studentPresensi.catatanWaliKelas}
                    </div>
                  </div>

                  {/* E. Kehadiran */}
                  <div className="space-y-1 max-w-xs">
                    <div className="font-bold text-xs">E. Kehadiran</div>
                    <table className="w-full border border-slate-900 border-collapse text-[11px]">
                      <tbody>
                        <tr className="border-b border-slate-900">
                          <td className="py-1 px-2.5 border-r border-slate-900">Sakit</td>
                          <td className="py-1 px-2.5 text-center w-24">{studentPresensi.sakit || 0} Hari</td>
                        </tr>
                        <tr className="border-b border-slate-900">
                          <td className="py-1 px-2.5 border-r border-slate-900">Izin</td>
                          <td className="py-1 px-2.5 text-center">{studentPresensi.izin || 0} Hari</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-2.5 border-r border-slate-900">Tanpa Keterangan</td>
                          <td className="py-1 px-2.5 text-center">{studentPresensi.alpa || 0} Hari</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Tanda Tangan Persis Gambar 2 */}
                  <div className="pt-4 text-[11px] space-y-2">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-14">
                        <div>
                          <div className="invisible">Cileungsi</div>
                          <div>Orang Tua,</div>
                        </div>
                        <div className="tracking-widest">...........................................</div>
                      </div>

                      <div className="space-y-14 pl-8">
                        <div>
                          <div>Cileungsi, {settings.tanggalRapor || '09 Oktober 2026'}</div>
                          <div>Guru Kelas</div>
                        </div>
                        <div>
                          <div className="font-bold underline">{waliKelasNama}</div>
                          <div>NIP. -</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center text-center pt-2 space-y-1">
                      <div>Mengetahui,</div>
                      <div>Kepala Sekolah</div>
                      <div className="py-1">
                        <QRCodeSVG
                          value={`https://app-rapor-sd.vercel.app/verify?siswa=${siswa.id}`}
                          size={60}
                          level="M"
                        />
                      </div>
                      <div className="font-bold underline">Kholid Hasan, S.Pd</div>
                      <div>NIP.</div>
                    </div>
                  </div>

                </div>
              )}

              {/* =========================================================================
               * 2. SHEET INDUK (BUKU INDUK PERSIS GAMBAR 3)
               * ========================================================================= */}
              {documentType === 'buku_induk' && (
                <div className="space-y-5 text-xs font-serif">
                  <div className="relative text-center pb-2">
                    <h2 className="text-base sm:text-lg font-bold uppercase tracking-wide">
                      BUKU INDUK
                    </h2>
                    <div className="no-print absolute right-0 top-0 bg-yellow-300 border border-slate-900 px-3 py-0.5 font-sans font-black text-xs">
                      {siswa.no || studentIdx + 1}
                    </div>
                  </div>

                  {/* Biodata Buku Induk */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-1 text-[11.5px]">
                    <div className="sm:col-span-7 space-y-0.5">
                      <div className="grid grid-cols-12">
                        <span className="col-span-4">Nama Peserta Didik</span>
                        <span className="col-span-8 font-bold">: {siswa.nama}</span>
                      </div>
                      <div className="grid grid-cols-12">
                        <span className="col-span-4">NIS / NISN</span>
                        <span className="col-span-8">: {siswa.nis} / {siswa.nisn !== '-' ? siswa.nisn : ''}</span>
                      </div>
                      <div className="grid grid-cols-12">
                        <span className="col-span-4">Sekolah</span>
                        <span className="col-span-8">: SD AL IMAM ISLAMIC SCHOOL</span>
                      </div>
                      <div className="grid grid-cols-12">
                        <span className="col-span-4">Alamat</span>
                        <span className="col-span-8">: {siswa.alamat || ''}</span>
                      </div>
                    </div>

                    <div className="sm:col-span-5 space-y-0.5">
                      <div className="grid grid-cols-12">
                        <span className="col-span-5">Kelas</span>
                        <span className="col-span-7">: {isKelas4Ali ? 'IV (empat)' : 'I (satu)'}</span>
                      </div>
                      <div className="grid grid-cols-12">
                        <span className="col-span-5">Fase</span>
                        <span className="col-span-7">: {isKelas4Ali ? 'B' : 'A'}</span>
                      </div>
                      <div className="grid grid-cols-12">
                        <span className="col-span-5">Semester</span>
                        <span className="col-span-7">: I (Satu)</span>
                      </div>
                      <div className="grid grid-cols-12">
                        <span className="col-span-5">Tahun Pelajaran</span>
                        <span className="col-span-7">: 2026-2027</span>
                      </div>
                    </div>
                  </div>

                  {/* Tabel 1: Muatan Pelajaran 1-15 dengan Nilai Desimal */}
                  <div className="max-w-lg">
                    <table className="w-full border border-slate-900 border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-900 text-center font-bold">
                          <th className="py-1.5 px-2 border-r border-slate-900 w-10">No</th>
                          <th className="py-1.5 px-3 border-r border-slate-900 text-center">Muatan Pelajaran</th>
                          <th className="py-1.5 px-3 w-20 text-center">Nilai</th>
                        </tr>
                      </thead>
                      <tbody>
                        {BUKU_INDUK_MAPEL_ROWS.map((row) => {
                          const rec = studentNilai.find(n => n.mapelId === row.id);
                          const rawVal = rec ? Number(rec.nilaiInduk !== undefined ? rec.nilaiInduk : (rec.nilaiAkhir || 0)) : 0;
                          const isActiveRow = isKelas4Ali ? row.id !== 'EXTRA_EMPTY' : row.active;
                          const formattedVal = (isActiveRow && rawVal > 0)
                            ? rawVal.toFixed(1).replace('.', ',')
                            : '';
                          return (
                            <tr key={row.no} className="border-b border-slate-900">
                              <td className="py-1 px-2 border-r border-slate-900 text-center font-bold">{row.no}</td>
                              <td className="py-1 px-3 border-r border-slate-900">{row.nama}</td>
                              <td className="py-1 px-3 text-center font-medium">{formattedVal}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Tabel 2: EKSTRAKURIKULER (1-5) */}
                  <div className="max-w-lg pt-2">
                    <table className="w-full border border-slate-900 border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-900 text-center font-bold uppercase text-[11px]">
                          <th className="py-1.5 px-2 border-r border-slate-900 w-10">No</th>
                          <th className="py-1.5 px-3 border-r border-slate-900 w-44">EKSTRAKURIKULER</th>
                          <th className="py-1.5 px-3">KETERANGAN</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[0, 1, 2, 3, 4].map((idx) => {
                          const eks = (studentPresensi.ekstrakurikuler || [])[idx];
                          return (
                            <tr key={idx} className="border-b border-slate-900">
                              <td className="py-2 px-2 border-r border-slate-900 text-center font-bold">{idx + 1}</td>
                              <td className="py-2 px-3 border-r border-slate-900">{eks?.nama || ''}</td>
                              <td className="py-2 px-3">{eks?.keterangan || ''}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Tabel 3: KETIDAKHADIRAN (1-3) */}
                  <div className="max-w-xs pt-2">
                    <table className="w-full border border-slate-900 border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-900 text-center font-bold uppercase text-[11px]">
                          <th colSpan={4} className="py-1 px-2">KETIDAKHADIRAN</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-900">
                          <td className="py-1 px-2 border-r border-slate-900 text-center w-8">1</td>
                          <td className="py-1 px-2.5 border-r border-slate-900">Sakit</td>
                          <td className="py-1 px-2 border-r border-slate-900 text-center w-12">
                            {studentPresensi.sakit > 0 ? studentPresensi.sakit : ''}
                          </td>
                          <td className="py-1 px-2 w-12">hari</td>
                        </tr>
                        <tr className="border-b border-slate-900">
                          <td className="py-1 px-2 border-r border-slate-900 text-center">2</td>
                          <td className="py-1 px-2.5 border-r border-slate-900">Izin</td>
                          <td className="py-1 px-2 border-r border-slate-900 text-center">
                            {studentPresensi.izin > 0 ? studentPresensi.izin : ''}
                          </td>
                          <td className="py-1 px-2">hari</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-2 border-r border-slate-900 text-center">3</td>
                          <td className="py-1 px-2.5 border-r border-slate-900">Tanpa Keterangan</td>
                          <td className="py-1 px-2 border-r border-slate-900 text-center">
                            {studentPresensi.alpa > 0 ? studentPresensi.alpa : ''}
                          </td>
                          <td className="py-1 px-2">hari</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* =========================================================================
               * 3. COVER PAGE (SAMPUL RAPOR SD)
               * ========================================================================= */}
              {documentType === 'cover' && (
                <div className="min-h-[920px] flex flex-col justify-between items-center text-center p-6 border-8 border-double border-emerald-800/80 rounded-2xl bg-gradient-to-b from-white via-emerald-50/20 to-white font-sans">
                  <div className="space-y-4 pt-8">
                    <img
                      src={settings.logoUrl}
                      alt="Logo Sekolah"
                      className="w-28 h-28 mx-auto object-contain p-2"
                    />
                    <div className="space-y-1">
                      <h1 className="text-xl sm:text-2xl font-serif font-black tracking-wider text-slate-900 uppercase">
                        RAPOR PESERTA DIDIK
                      </h1>
                      <h2 className="text-lg font-serif font-bold text-emerald-900 uppercase tracking-widest">
                        SD AL-IMAM ISLAMIC SCHOOL
                      </h2>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">
                        YAYASAN SEKOLAH ANAK PINTAR &ldquo;SAPIN&rdquo; DARUSSALAM
                      </p>
                    </div>
                  </div>

                  <div className="w-full max-w-md my-12 p-6 rounded-2xl border-2 border-dashed border-emerald-600 bg-emerald-50/40 space-y-4">
                    <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Nama Peserta Didik:
                    </div>
                    <div className="text-xl font-extrabold text-slate-900 uppercase font-serif py-1 border-b-2 border-slate-300">
                      {siswa.nama}
                    </div>
                    <div className="flex justify-around text-xs font-semibold text-slate-700 pt-1">
                      <span>NISN: <strong>{siswa.nisn}</strong></span>
                      <span>NIS: <strong>{siswa.nis}</strong></span>
                    </div>
                  </div>

                  <div className="space-y-2 pb-8">
                    <h3 className="text-base font-extrabold text-slate-900 uppercase">
                      {settings.schoolName}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium max-w-sm mx-auto">
                      NPSN: {settings.npsn} • {settings.alamat}
                    </p>
                  </div>
                </div>
              )}

              {/* =========================================================================
               * 4. RAPOR AKHIR SEMESTER (PAS)
               * ========================================================================= */}
              {documentType === 'rapor_akhir' && (
                <div className="space-y-6 font-sans">
                  <div className="flex items-center justify-between pb-4 border-b-2 border-slate-900">
                    <div className="flex items-center space-x-4">
                      <img src={settings.logoUrl} alt="Logo Sekolah" className="w-16 h-16 object-contain" />
                      <div>
                        <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
                          {settings.schoolName}
                        </h2>
                        <p className="text-[11px] text-slate-600">
                          {settings.alamat} • NPSN: {settings.npsn}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-extrabold px-3 py-1 rounded bg-emerald-100 text-emerald-950 inline-block uppercase border border-emerald-300">
                        Laporan Hasil Belajar Akhir Semester
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      A. Nilai Capaian Kompetensi & Hasil Belajar
                    </h3>
                    <table className="w-full text-left text-xs border border-slate-300 border-collapse">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-300 text-slate-800">
                          <th className="py-2 px-2.5 font-bold w-8 text-center border-r border-slate-300">No</th>
                          <th className="py-2 px-3 font-bold min-w-[160px] border-r border-slate-300">Mata Pelajaran</th>
                          <th className="py-2 px-2 font-bold text-center w-12 border-r border-slate-300">KKM</th>
                          <th className="py-2 px-2 font-bold text-center w-14 border-r border-slate-300">Nilai Akhir</th>
                          <th className="py-2 px-2 font-bold text-center w-12 border-r border-slate-300">Predikat</th>
                          <th className="py-2 px-3 font-bold">Capaian Kompetensi Pembelajaran</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {mapelList.map((mapel, mIdx) => {
                          const nRecord = studentNilai.find(n => n.mapelId === mapel.id);
                          const na = nRecord ? Number(nRecord.nilaiAkhir || NilaiController.hitungNilaiAkhir(nRecord, settings) || 0) : 0;
                          if (na === 0) return null;
                          const pred = NilaiController.getPredikat(na, mapel.kkm);
                          const deskripsi = nRecord?.deskripsiCapaian || NilaiController.generateDeskripsi(siswa.nama, mapel.nama, na, mapel.kkm);

                          return (
                            <tr key={mapel.id} className="border-b border-slate-200">
                              <td className="py-2 px-2 text-center text-slate-600 border-r border-slate-300">{mIdx + 1}</td>
                              <td className="py-2 px-3 font-semibold text-slate-900 border-r border-slate-300">{mapel.nama}</td>
                              <td className="py-2 px-2 text-center text-slate-600 border-r border-slate-300">{mapel.kkm}</td>
                              <td className="py-2 px-2 text-center font-bold text-slate-900 border-r border-slate-300">{Math.round(na)}</td>
                              <td className="py-2 px-2 text-center font-bold border-r border-slate-300">{pred.label}</td>
                              <td className="py-2 px-3 text-[11px] text-slate-700 leading-relaxed">{deskripsi}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      B. Perkembangan Karakter & Profil Pelajar Pancasila
                    </h3>
                    <div className="p-3.5 rounded-xl border border-slate-300 bg-slate-50/30 text-xs text-slate-800 leading-relaxed font-serif italic">
                      "{narasiSikap}"
                    </div>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
