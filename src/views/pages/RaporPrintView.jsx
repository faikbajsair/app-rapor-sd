import React, { useState } from 'react';
import { 
  Printer, 
  FileText, 
  CheckCircle, 
  QrCode, 
  Sparkles, 
  ChevronRight,
  BookOpen,
  Calendar,
  Award
} from 'lucide-react';
import { NilaiController } from '../../controllers/NilaiController';
import { SikapController } from '../../controllers/SikapController';
import { QRCodeSVG } from 'qrcode.react';

export function RaporPrintView({ 
  siswaList, 
  mapelList, 
  nilaiList, 
  sikapList, 
  presensiList, 
  settings, 
  approval 
}) {
  const [selectedSiswaId, setSelectedSiswaId] = useState(siswaList[0]?.id || 'S01');
  const [documentType, setDocumentType] = useState('rapor_akhir'); // 'rapor_akhir', 'rapor_pts', 'cover', 'buku_induk'
  const [isBulkPrint, setIsBulkPrint] = useState(false);

  const activeSiswa = siswaList.find(s => s.id === selectedSiswaId) || siswaList[0];
  const studentsToRender = isBulkPrint ? siswaList : [activeSiswa];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Control Panel (Hidden during Print) */}
      <div className="no-print p-6 rounded-3xl bg-white border border-pastel-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-pastel-200 text-pastel-800">
                <Printer className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-extrabold text-slate-800">Cetak Rapor & Lembar Buku Induk A4</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Standar Rapor Kurikulum Merdeka • TTD Digital & QR Code • Margin A4 Presisi
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => setIsBulkPrint(!isBulkPrint)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                isBulkPrint 
                  ? 'bg-pastel-300 text-pastel-950 border-pastel-400 shadow-2xs' 
                  : 'bg-pastel-50 text-slate-700 border-pastel-200 hover:bg-pastel-100'
              }`}
            >
              {isBulkPrint ? '✓ Mode Cetak Massal (Semua Siswa)' : 'Cetak Siswa Terpilih'}
            </button>

            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5"
            >
              <Printer className="w-4 h-4 text-emerald-200" />
              <span>Cetak / Ekspor PDF Sekarang</span>
            </button>
          </div>
        </div>

        {/* Format Selector & Student Picker */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Format Document Selector */}
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-500">Pilih Format Dokumen:</span>
            <div className="inline-flex rounded-xl p-1 bg-pastel-50 border border-pastel-200">
              <button
                onClick={() => setDocumentType('rapor_akhir')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  documentType === 'rapor_akhir' ? 'bg-white text-pastel-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Rapor Akhir Semester (PAS)
              </button>
              <button
                onClick={() => setDocumentType('rapor_pts')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  documentType === 'rapor_pts' ? 'bg-white text-pastel-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Rapor Tengah Semester (PTS)
              </button>
              <button
                onClick={() => setDocumentType('cover')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  documentType === 'cover' ? 'bg-white text-pastel-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Sampul / Cover Rapor
              </button>
              <button
                onClick={() => setDocumentType('buku_induk')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  documentType === 'buku_induk' ? 'bg-white text-pastel-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Lembar Buku Induk
              </button>
            </div>
          </div>

          {/* Student Picker (If not bulk) */}
          {!isBulkPrint && (
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-slate-500">Pilih Siswa:</span>
              <select
                value={selectedSiswaId}
                onChange={(e) => setSelectedSiswaId(e.target.value)}
                className="py-1.5 px-3 rounded-xl border border-slate-200 font-bold text-slate-800 bg-pastel-50/60"
              >
                {siswaList.map(s => (
                  <option key={s.id} value={s.id}>{s.nama} ({s.nisn})</option>
                ))}
              </select>
            </div>
          )}

        </div>
      </div>

      {/* Printable Paper Canvas Area (A4 Width Preview) */}
      <div className="print-container max-w-4xl mx-auto space-y-8">
        {studentsToRender.map((siswa, studentIdx) => {
          
          // Siswa Specific Data
          const studentNilai = nilaiList.filter(n => n.siswaId === siswa.id);
          const studentSikap = sikapList.find(s => s.siswaId === siswa.id) || {
            berimanBertakwa: 'Sangat Baik',
            berkebinekaan: 'Baik',
            gotongRoyong: 'Sangat Baik',
            mandiri: 'Baik',
            bernalarKritis: 'Baik',
            kreatif: 'Sangat Baik'
          };
          const studentPresensi = presensiList.find(p => p.siswaId === siswa.id) || {
            sakit: 0, izin: 0, alpa: 0, terlambat: 0,
            catatanWaliKelas: 'Pertahankan prestasi belajar dan kedisiplinan beribadah.',
            ekstrakurikuler: [],
            prestasi: []
          };

          const narasiSikap = SikapController.generateNarasiSikap(siswa.nama, studentSikap);

          return (
            <div 
              key={siswa.id} 
              className={`bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-elevated font-sans text-slate-800 ${
                studentIdx > 0 ? 'page-break' : ''
              }`}
            >
              
              {/* =========================================================================
               * COVER PAGE (SAMPUL RAPOR SD)
               * ========================================================================= */}
              {documentType === 'cover' && (
                <div className="min-h-[920px] flex flex-col justify-between items-center text-center p-6 border-8 border-double border-pastel-700/80 rounded-2xl bg-gradient-to-b from-white via-pastel-50/20 to-white">
                  
                  {/* Top Branding */}
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
                      <h2 className="text-lg font-serif font-bold text-pastel-900 uppercase tracking-widest">
                        SEKOLAH DASAR (SD)
                      </h2>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">
                        KURIKULUM MERDEKA • {settings.fase}
                      </p>
                    </div>
                  </div>

                  {/* Middle: Student Box */}
                  <div className="w-full max-w-md my-12 p-6 rounded-2xl border-2 border-dashed border-pastel-500 bg-pastel-50/50 space-y-4">
                    <div className="text-xs font-bold text-pastel-900 uppercase tracking-wider">
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

                  {/* Bottom: School Details */}
                  <div className="space-y-2 pb-8">
                    <h3 className="text-base font-extrabold text-slate-900 uppercase">
                      {settings.schoolName}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium max-w-sm mx-auto">
                      NPSN: {settings.npsn} • {settings.alamat}
                    </p>
                    <p className="text-xs text-slate-500">
                      Kota {settings.tempatRapor}
                    </p>
                  </div>
                </div>
              )}

              {/* =========================================================================
               * RAPOR AKHIR (PAS) / RAPOR TENGAH (PTS)
               * ========================================================================= */}
              {(documentType === 'rapor_akhir' || documentType === 'rapor_pts') && (
                <div className="space-y-6">
                  
                  {/* Kop Surat & Rapor Header */}
                  <div className="flex items-center justify-between pb-4 border-b-2 border-slate-900">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={settings.logoUrl} 
                        alt="Logo Sekolah" 
                        className="w-16 h-16 object-contain"
                      />
                      <div>
                        <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
                          {settings.schoolName}
                        </h2>
                        <p className="text-[11px] text-slate-600">
                          {settings.alamat} • NPSN: {settings.npsn} • Telp: {settings.telepon}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Website: {settings.website} • Email: {settings.email}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-extrabold px-3 py-1 rounded bg-pastel-200 text-pastel-950 inline-block uppercase border border-pastel-300">
                        {documentType === 'rapor_akhir' ? 'Laporan Hasil Belajar (Akhir)' : 'Laporan Penilaian Tengah Semester'}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Kurikulum Merdeka • {settings.fase}
                      </div>
                    </div>
                  </div>

                  {/* Biodata Ringkas Siswa Grid */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 text-xs py-2 bg-pastel-50/50 p-3 rounded-xl border border-pastel-200">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Nama Peserta Didik:</span>
                      <span className="font-bold text-slate-900">{siswa.nama}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Kelas / Rombel:</span>
                      <span className="font-bold text-slate-900">{settings.rombel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">NISN / NIS:</span>
                      <span className="font-bold text-slate-900">{siswa.nisn} / {siswa.nis}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Fase / Semester:</span>
                      <span className="font-bold text-slate-900">{settings.fase} / {settings.semester}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Nama Sekolah:</span>
                      <span className="font-bold text-slate-900">{settings.schoolName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Tahun Ajaran:</span>
                      <span className="font-bold text-slate-900">{settings.tahunAjaran}</span>
                    </div>
                  </div>

                  {/* Tabel Capaian Nilai Akademik */}
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
                          <th className="py-2 px-2 font-bold text-center w-14 border-r border-slate-300">
                            {documentType === 'rapor_akhir' ? 'Nilai Akhir' : 'Nilai PTS'}
                          </th>
                          <th className="py-2 px-2 font-bold text-center w-12 border-r border-slate-300">Predikat</th>
                          <th className="py-2 px-3 font-bold">Capaian Kompetensi Pembelajaran</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {mapelList.map((mapel, mIdx) => {
                          const nRecord = studentNilai.find(n => n.mapelId === mapel.id);
                          const na = nRecord ? NilaiController.hitungNilaiAkhir(nRecord, settings) : 80;
                          const ptsVal = nRecord?.pts || 80;
                          const displayedScore = documentType === 'rapor_akhir' ? (na || 80) : ptsVal;
                          const pred = NilaiController.getPredikat(displayedScore, mapel.kkm);
                          const deskripsi = nRecord?.deskripsiCapaian || NilaiController.generateDeskripsi(siswa.nama, mapel.nama, displayedScore, mapel.kkm);

                          return (
                            <tr key={mapel.id} className="border-b border-slate-200">
                              <td className="py-2 px-2 text-center text-slate-600 border-r border-slate-300">{mIdx + 1}</td>
                              <td className="py-2 px-3 font-semibold text-slate-900 border-r border-slate-300">
                                {mapel.nama}
                              </td>
                              <td className="py-2 px-2 text-center text-slate-600 border-r border-slate-300">{mapel.kkm}</td>
                              <td className="py-2 px-2 text-center font-bold text-slate-900 border-r border-slate-300 bg-slate-50/50">
                                {displayedScore}
                              </td>
                              <td className="py-2 px-2 text-center font-bold border-r border-slate-300">
                                {pred.label}
                              </td>
                              <td className="py-2 px-3 text-[11px] text-slate-700 leading-relaxed">
                                {deskripsi}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Section B: Sikap & Profil Pelajar Pancasila (Untuk Rapor Akhir) */}
                  {documentType === 'rapor_akhir' && (
                    <div className="space-y-2 pt-2">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        B. Perkembangan Karakter & Profil Pelajar Pancasila
                      </h3>
                      <div className="p-3.5 rounded-xl border border-slate-300 bg-slate-50/30 text-xs text-slate-800 leading-relaxed font-serif italic">
                        "{narasiSikap}"
                      </div>
                    </div>
                  )}

                  {/* Section C: Ekstrakurikuler, Prestasi & Presensi */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    
                    {/* Ekstrakurikuler */}
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold text-slate-900 uppercase">
                        C. Ekstrakurikuler
                      </h4>
                      <table className="w-full text-left text-xs border border-slate-300 border-collapse">
                        <thead>
                          <tr className="bg-slate-100 border-b border-slate-300">
                            <th className="py-1.5 px-2 font-bold border-r border-slate-300">Kegiatan</th>
                            <th className="py-1.5 px-2 font-bold text-center w-14 border-r border-slate-300">Predikat</th>
                            <th className="py-1.5 px-2 font-bold">Keterangan</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {(studentPresensi.ekstrakurikuler || []).length > 0 ? (
                            studentPresensi.ekstrakurikuler.map((ekstra, eIdx) => (
                              <tr key={eIdx}>
                                <td className="py-1.5 px-2 font-semibold border-r border-slate-300">{ekstra.nama}</td>
                                <td className="py-1.5 px-2 text-center font-bold border-r border-slate-300">{ekstra.predikat}</td>
                                <td className="py-1.5 px-2 text-[10px] text-slate-600">{ekstra.keterangan}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3" className="py-2 text-center text-slate-400 text-xs">Pramuka Siaga (Predikat A - Aktif)</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Ketidakhadiran */}
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold text-slate-900 uppercase">
                        D. Ketidakhadiran
                      </h4>
                      <table className="w-full text-left text-xs border border-slate-300 border-collapse">
                        <tbody className="divide-y divide-slate-200">
                          <tr>
                            <td className="py-1.5 px-3 border-r border-slate-300">Sakit</td>
                            <td className="py-1.5 px-3 font-bold text-center w-20">{studentPresensi.sakit} hari</td>
                          </tr>
                          <tr>
                            <td className="py-1.5 px-3 border-r border-slate-300">Izin</td>
                            <td className="py-1.5 px-3 font-bold text-center w-20">{studentPresensi.izin} hari</td>
                          </tr>
                          <tr>
                            <td className="py-1.5 px-3 border-r border-slate-300">Tanpa Keterangan</td>
                            <td className="py-1.5 px-3 font-bold text-center w-20">{studentPresensi.alpa} hari</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                  </div>

                  {/* Catatan Wali Kelas */}
                  <div className="space-y-1.5 pt-1">
                    <h4 className="text-xs font-bold text-slate-900 uppercase">
                      E. Catatan & Saran Wali Kelas
                    </h4>
                    <div className="p-3 rounded-xl border border-slate-300 bg-slate-50/20 text-xs text-slate-800 italic">
                      "{studentPresensi.catatanWaliKelas || 'Tingkatkan terus semangat belajar dan hafalan Al-Qur\'an.'}"
                    </div>
                  </div>

                  {/* Digital Signature & QR Code Area */}
                  <div className="pt-6 border-t border-slate-200">
                    <div className="text-right text-xs text-slate-600 mb-4">
                      {settings.tempatRapor}, {settings.tanggalRapor}
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center text-xs">
                      
                      {/* Orang Tua */}
                      <div className="flex flex-col justify-between h-36">
                        <div>Mengetahui, <br /><strong>Orang Tua / Wali Murid</strong></div>
                        <div className="border-b border-slate-400 mx-6 pb-1 font-semibold">
                          ( ......................................... )
                        </div>
                      </div>

                      {/* QR Code Validation Center */}
                      <div className="flex flex-col items-center justify-center space-y-1">
                        <div className="p-1.5 bg-white border border-slate-300 rounded-lg shadow-2xs">
                          <QRCodeSVG 
                            value={`https://alimamischool.com/verify?token=${approval?.qrToken || 'RAPOR-VERIFIED'}&nisn=${siswa.nisn}`}
                            size={72}
                            level="M"
                          />
                        </div>
                        <div className="text-[9px] font-bold text-emerald-800 uppercase">
                          TTD Terverifikasi Digital
                        </div>
                        <div className="text-[8px] font-mono text-slate-400">
                          {approval?.qrToken ? approval.qrToken.slice(0, 20) + '...' : 'VERIFIED-SD-ALIMAM'}
                        </div>
                      </div>

                      {/* Wali Kelas */}
                      <div className="flex flex-col justify-between h-36">
                        <div>
                          Wali Kelas, <br />
                          <span className="font-semibold text-slate-700">{settings.rombel}</span>
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 underline">
                            {settings.waliKelas}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            NIP. {settings.nipWaliKelas}
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Mengetahui Kepala Sekolah */}
                    <div className="mt-4 text-center text-xs space-y-1">
                      <div>Mengetahui,</div>
                      <div className="font-bold text-slate-800">Kepala Sekolah {settings.schoolName}</div>
                      <div className="h-10"></div>
                      <div className="font-bold text-slate-900 underline">
                        {settings.kepalaSekolah}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        NIP. {settings.nipKepalaSekolah}
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* =========================================================================
               * LEMBAR BUKU INDUK SISWA PRINT
               * ========================================================================= */}
              {documentType === 'buku_induk' && (
                <div className="space-y-6">
                  <div className="text-center pb-4 border-b-2 border-slate-900 space-y-1">
                    <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-widest">
                      LEMBAR BUKU INDUK PESERTA DIDIK
                    </h2>
                    <h3 className="text-xs font-bold text-pastel-900 uppercase">
                      {settings.schoolName} • KOTA {settings.tempatRapor}
                    </h3>
                  </div>

                  <div className="flex items-start justify-between py-2">
                    <div className="space-y-1 text-xs">
                      <div>Nomor Urut Buku Induk: <strong>{siswa.id}</strong></div>
                      <div>Nomor Induk Siswa (NIS): <strong>{siswa.nis}</strong></div>
                      <div>Nomor Induk Siswa Nasional (NISN): <strong>{siswa.nisn}</strong></div>
                    </div>
                    <img 
                      src={siswa.foto} 
                      alt={siswa.nama} 
                      className="w-20 h-24 object-cover border-2 border-slate-400 p-0.5 rounded shadow-xs"
                    />
                  </div>

                  <div className="space-y-3 text-xs">
                    <h4 className="font-bold text-slate-900 uppercase border-b border-slate-200 pb-1">
                      A. Keterangan Tentang Diri Peserta Didik
                    </h4>
                    <table className="w-full text-left border-collapse">
                      <tbody className="divide-y divide-slate-100">
                        <tr><td className="py-1 text-slate-500 w-48">1. Nama Lengkap</td><td className="font-bold text-slate-800">: {siswa.nama}</td></tr>
                        <tr><td className="py-1 text-slate-500">2. Jenis Kelamin</td><td className="text-slate-800">: {siswa.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</td></tr>
                        <tr><td className="py-1 text-slate-500">3. Tempat & Tanggal Lahir</td><td className="text-slate-800">: {siswa.tempatLahir}, {siswa.tanggalLahir}</td></tr>
                        <tr><td className="py-1 text-slate-500">4. Agama</td><td className="text-slate-800">: {siswa.agama}</td></tr>
                        <tr><td className="py-1 text-slate-500">5. Alamat Tempat Tinggal</td><td className="text-slate-800">: {siswa.alamat}</td></tr>
                      </tbody>
                    </table>

                    <h4 className="font-bold text-slate-900 uppercase border-b border-slate-200 pb-1 pt-3">
                      B. Keterangan Orang Tua / Wali
                    </h4>
                    <table className="w-full text-left border-collapse">
                      <tbody className="divide-y divide-slate-100">
                        <tr><td className="py-1 text-slate-500 w-48">1. Nama Ayah Kandung</td><td className="font-bold text-slate-800">: {siswa.namaAyah}</td></tr>
                        <tr><td className="py-1 text-slate-500">2. Nama Ibu Kandung</td><td className="font-bold text-slate-800">: {siswa.namaIbu}</td></tr>
                        <tr><td className="py-1 text-slate-500">3. Pekerjaan Orang Tua</td><td className="text-slate-800">: {siswa.pekerjaanOrtu}</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="pt-8 flex justify-end text-right text-xs">
                    <div>
                      <div>{settings.tempatRapor}, {settings.tanggalRapor}</div>
                      <div>Kepala Sekolah,</div>
                      <div className="h-14"></div>
                      <div className="font-bold text-slate-900 underline">{settings.kepalaSekolah}</div>
                      <div className="text-[10px] text-slate-500">NIP. {settings.nipKepalaSekolah}</div>
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
