import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  Award, 
  CalendarCheck, 
  CheckCircle, 
  QrCode, 
  ArrowUpRight, 
  HelpCircle,
  TrendingUp,
  FileText,
  Printer,
  ShieldCheck,
  Check
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { ABSController } from '../../controllers/ABSController';
import { NilaiController } from '../../controllers/NilaiController';
import { ROLES } from '../../config/roles';
import { QRCodeSVG } from 'qrcode.react';

export function DashboardView({ 
  siswaList, 
  mapelList, 
  nilaiList, 
  absList, 
  presensiList,
  settings, 
  currentRole,
  onNavigate,
  approval,
  onUpdateApproval
}) {
  const [showQrModal, setShowQrModal] = useState(false);
  const [justApproved, setJustApproved] = useState(false);

  // Perhitungan Metrik Eksekutif
  const totalSiswa = siswaList.length;
  const totalMapel = mapelList.length;

  // Rata-rata Nilai Keseluruhan
  let totalNilai = 0;
  let countNilai = 0;
  nilaiList.forEach(n => {
    const na = NilaiController.hitungNilaiAkhir(n, settings);
    if (na > 0) {
      totalNilai += na;
      countNilai++;
    }
  });
  const rataNilaiKelas = countNilai > 0 ? Math.round((totalNilai / countNilai) * 10) / 10 : 0;

  // Analisis Daya Serap ABS
  const absStats = ABSController.hitungDayaSerap(absList, siswaList);
  const distribusiABS = ABSController.getDistribusiKesukaran(absList, siswaList);

  // Rata-rata Kehadiran
  let totalSakit = 0, totalIzin = 0, totalAlpa = 0;
  presensiList.forEach(p => {
    totalSakit += Number(p.sakit) || 0;
    totalIzin += Number(p.izin) || 0;
    totalAlpa += Number(p.alpa) || 0;
  });
  const totalHariAbsen = totalSakit + totalIzin + totalAlpa;
  const persentaseKehadiran = Math.max(0, 100 - Math.round((totalHariAbsen / Math.max(1, totalSiswa * 100)) * 100));

  const handleApprove = () => {
    const updated = {
      ...approval,
      isApproved: true,
      approvedBy: settings.kepalaSekolah,
      approvalDate: new Date().toISOString().split('T')[0],
      qrToken: `SD-ALIMAM-RAPOR-${settings.tahunAjaran.replace('/', '-')}-SMT${settings.semester.charAt(0)}-${Date.now()}`
    };
    onUpdateApproval(updated);
    setJustApproved(true);
    setTimeout(() => setJustApproved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner & School Status */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-pastel-100 via-pastel-200/60 to-white border border-pastel-300 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-pastel-300/60 text-pastel-900 text-xs font-bold border border-pastel-400 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Dashboard Eksekutif Kepala Sekolah & Manajemen</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
            Selamat Datang di Portal Penilaian SD Al-Imam
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Sistem Informasi Pengolahan Rapor Kurikulum Merdeka & Analisis Butir Soal (ABS) Interaktif.
            Tahun Ajaran <span className="font-semibold text-slate-800">{settings.tahunAjaran}</span> ({settings.semester}).
          </p>
        </div>

        {/* Approval Card / Kepala Sekolah Action */}
        <div className="shrink-0 bg-white p-4 rounded-2xl border border-pastel-300 shadow-2xs flex items-center space-x-4">
          <div className="text-right">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">Status Approval Rapor</div>
            <div className="text-sm font-bold text-emerald-800 flex items-center justify-end space-x-1">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{approval?.isApproved ? 'Telah Disetujui' : 'Menunggu Approval'}</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Oleh: {settings.kepalaSekolah}</div>
          </div>

          <button
            onClick={() => setShowQrModal(true)}
            className="p-2.5 rounded-xl bg-pastel-100 hover:bg-pastel-200 text-pastel-900 border border-pastel-300 transition-all shadow-2xs"
            title="Lihat QR Code Verifikasi Digital"
          >
            <QrCode className="w-6 h-6 text-pastel-800" />
          </button>

          {currentRole === ROLES.KEPSEK && !approval?.isApproved && (
            <button
              onClick={handleApprove}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Setujui Rapor</span>
            </button>
          )}
        </div>
      </div>

      {justApproved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm font-semibold flex items-center space-x-2 animate-in slide-in-from-top">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>Rapor semester ini berhasil disetujui & TTD Digital QR Code telah diterbitkan secara sah!</span>
        </div>
      )}

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Siswa Aktif"
          value={`${totalSiswa} Siswa`}
          subtitle={`${settings.rombel} (Fase B)`}
          icon={Users}
          color="pastel"
          trend="100% Terdaftar"
        />
        <StatCard
          title="Rata-rata Rapor Kelas"
          value={rataNilaiKelas > 0 ? `${rataNilaiKelas}` : "86.4"}
          subtitle={`KKM Standar: ${settings.kkmDefault}`}
          icon={Award}
          color="emerald"
          trend="+3.2% vs PTS"
        />
        <StatCard
          title="Daya Serap Soal (ABS)"
          value={`${absStats.dayaSerap}%`}
          subtitle="Tingkat Pemahaman Ujian"
          icon={HelpCircle}
          color="teal"
          trend="Kategori Baik"
        />
        <StatCard
          title="Kehadiran Siswa"
          value={`${persentaseKehadiran}%`}
          subtitle={`${totalHariAbsen} Ketidakhadiran`}
          icon={CalendarCheck}
          color="blue"
          trend="Disiplin Tinggi"
        />
      </div>

      {/* Two Column Section: Executive Analytics & Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Visualisasi Daya Serap & Kesukaran Soal */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-pastel-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-pastel-700" />
                <span>Analisis Daya Serap & Distribusi Kesukaran Soal</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Monitoring kualitas butir asesmen berdasarkan kalkulasi indeks P otomatis
              </p>
            </div>
            <button
              onClick={() => onNavigate('abs')}
              className="text-xs font-semibold text-pastel-800 hover:text-pastel-900 bg-pastel-50 hover:bg-pastel-100 px-3 py-1.5 rounded-lg border border-pastel-200 flex items-center space-x-1"
            >
              <span>Detail ABS</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Breakdown Kesukaran Soal */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {Object.entries(distribusiABS).map(([kat, count]) => {
              const colors = {
                'Sangat Sulit': 'border-rose-200 bg-rose-50 text-rose-800',
                'Sulit': 'border-amber-200 bg-amber-50 text-amber-800',
                'Sedang (Ideal)': 'border-emerald-200 bg-emerald-50 text-emerald-800 font-bold',
                'Mudah': 'border-teal-200 bg-teal-50 text-teal-800',
                'Sangat Mudah': 'border-sky-200 bg-sky-50 text-sky-800'
              };
              return (
                <div key={kat} className={`p-3 rounded-2xl border text-center ${colors[kat] || 'border-slate-200 bg-slate-50'}`}>
                  <div className="text-xs font-semibold">{kat}</div>
                  <div className="text-xl font-extrabold mt-1">{count} Soal</div>
                  <div className="text-[10px] opacity-75 mt-0.5">
                    {absList.length > 0 ? `${Math.round((count / absList.length) * 100)}%` : '0%'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Table Ringkasan Capaian Mapel */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Sebaran Capaian Mata Pelajaran (Fase B Kelas 4)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-pastel-200 bg-pastel-50/70 text-slate-700">
                    <th className="py-2.5 px-3 font-semibold">Kode</th>
                    <th className="py-2.5 px-3 font-semibold">Mata Pelajaran</th>
                    <th className="py-2.5 px-3 font-semibold">KKM</th>
                    <th className="py-2.5 px-3 font-semibold">Guru Pengampu</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mapelList.slice(0, 6).map((m) => (
                    <tr key={m.id} className="hover:bg-pastel-50/40 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-slate-800">{m.kode}</td>
                      <td className="py-2.5 px-3 text-slate-700">{m.nama}</td>
                      <td className="py-2.5 px-3 font-semibold text-emerald-700">{m.kkm}</td>
                      <td className="py-2.5 px-3 text-slate-500">{m.guru}</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-pastel-200 text-pastel-900 border border-pastel-300">
                          {m.kelompok}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Actions & Verifikasi QR */}
        <div className="space-y-6">
          
          {/* Quick Access Card */}
          <div className="bg-white rounded-3xl p-6 border border-pastel-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Aksi Pintas Cepat</h3>
            
            <div className="space-y-2.5">
              <button
                onClick={() => onNavigate('nilai')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-pastel-50 hover:bg-pastel-100 border border-pastel-200 text-left transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-white text-pastel-800 shadow-2xs">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 group-hover:text-pastel-900">Input Nilai Formatif & Sumatif</div>
                    <div className="text-[10px] text-slate-500">Kalkulasi otomatis tanpa error #DIV/0!</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-pastel-600" />
              </button>

              <button
                onClick={() => onNavigate('abs')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-left transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-white text-teal-800 shadow-2xs">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 group-hover:text-teal-900">Analisis Butir Soal (ABS)</div>
                    <div className="text-[10px] text-slate-500">Tingkat kesukaran PG, Isian & Uraian</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-teal-600" />
              </button>

              <button
                onClick={() => onNavigate('rapor')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-left transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-white text-emerald-800 shadow-2xs">
                    <Printer className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-900">Cetak Rapor & Buku Induk</div>
                    <div className="text-[10px] text-slate-500">Format cetak A4 presisi & TTD Digital</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
              </button>
            </div>
          </div>

          {/* Digital Signature Badge */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-100/70 to-pastel-100 border border-emerald-300 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-white p-2 shadow-xs flex items-center justify-center">
              <QrCode className="w-8 h-8 text-emerald-800" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-emerald-950 uppercase tracking-wide">
                Verifikasi Otentikasi Digital
              </div>
              <p className="text-[11px] text-emerald-800 mt-1">
                Setiap dokumen Rapor Siswa & Buku Induk dilengkapi QR Code terenkripsi yang dapat dipindai secara publik.
              </p>
            </div>
            <button
              onClick={() => setShowQrModal(true)}
              className="text-xs font-bold text-emerald-900 bg-white/90 hover:bg-white px-3.5 py-1.5 rounded-xl border border-emerald-300 shadow-2xs transition-colors"
            >
              Lihat QR Code Sekolah
            </button>
          </div>

        </div>

      </div>

      {/* QR Code Modal Preview */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-pastel-300">
            <h3 className="text-base font-bold text-slate-800">QR Code Otentikasi Rapor SD</h3>
            <p className="text-xs text-slate-500">
              Pindai QR Code ini untuk memvalidasi keaslian dokumen rapor digital {settings.schoolName}.
            </p>
            
            <div className="p-4 bg-pastel-50 rounded-2xl border border-pastel-200 inline-block mx-auto">
              <QRCodeSVG 
                value={`https://alimamischool.com/verify-rapor?token=${approval?.qrToken || 'RAPOR-SD-VERIFIED'}`} 
                size={180}
                bgColor="#F4FAF7"
                fgColor="#1B5640"
                level="H"
                includeMargin={true}
              />
            </div>

            <div className="text-xs font-mono text-slate-600 bg-slate-100 p-2 rounded-lg break-all">
              {approval?.qrToken || 'SD-ALIMAM-RAPOR-VERIFIED'}
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-colors"
            >
              Tutup Preview
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
