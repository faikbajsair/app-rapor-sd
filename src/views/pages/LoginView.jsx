import React, { useState } from 'react';
import { 
  School, 
  Lock, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  Key, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { ROLES, ROLE_CONFIG } from '../../config/roles';
import { AuthController } from '../../controllers/AuthController';

export function LoginView({ settings, siswaList, gtkList = [], onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('civitas'); // 'civitas' | 'wali_murid'
  
  // Form states for Civitas
  const [civitasUser, setCivitasUser] = useState('admin@alimamischool.com');
  const [civitasPass, setCivitasPass] = useState('admin');
  
  // Form states for Wali Murid
  const [nisnInput, setNisnInput] = useState('0134567891');
  const [birthInput, setBirthInput] = useState('2015-04-12');
  
  const [errorMessage, setErrorMessage] = useState('');

  const handleCivitasSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const res = AuthController.loginCivitas(civitasUser, civitasPass, gtkList);
    if (res.success) {
      onLoginSuccess(res.user);
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleSelectGTKQuick = (e) => {
    const selectedEmail = e.target.value;
    if (!selectedEmail) return;
    const gtk = gtkList.find(g => g.email === selectedEmail);
    if (gtk) {
      setCivitasUser(gtk.email);
      setCivitasPass(gtk.password || 'admin');
      const res = AuthController.loginCivitas(gtk.email, gtk.password || 'admin', gtkList);
      if (res.success) onLoginSuccess(res.user);
    }
  };

  const handleWaliMuridSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const res = AuthController.loginWaliMurid(nisnInput, birthInput, siswaList);
    if (res.success) {
      onLoginSuccess(res.user);
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleQuickLoginCivitas = (roleKey) => {
    const cfg = ROLE_CONFIG[roleKey];
    setCivitasUser(cfg.email);
    setCivitasPass(cfg.password || 'admin');
    const res = AuthController.loginCivitas(cfg.email, cfg.password || 'admin', gtkList);
    if (res.success) onLoginSuccess(res.user);
  };

  const handleQuickLoginGTK = (email) => {
    setCivitasUser(email);
    setCivitasPass('admin');
    const res = AuthController.loginCivitas(email, 'admin', gtkList);
    if (res.success) onLoginSuccess(res.user);
  };

  const handleQuickLoginWali = (siswa) => {
    const loginId = (siswa.nisn && siswa.nisn !== '-') ? siswa.nisn : (siswa.nis || siswa.id);
    setNisnInput(loginId);
    setBirthInput(siswa.tanggalLahir);
    const res = AuthController.loginWaliMurid(loginId, siswa.tanggalLahir, siswaList);
    if (res.success) onLoginSuccess(res.user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-100/70 via-white to-pastel-50 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      
      {/* Brand Header */}
      <div className="text-center max-w-lg mb-6 space-y-2">
        <div className="inline-block p-2 rounded-2xl bg-white shadow-soft border border-pastel-300">
          <img 
            src={settings.logoUrl} 
            alt="Logo Sekolah" 
            className="w-16 h-16 object-contain mx-auto"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="w-16 h-16 rounded-xl bg-pastel-300 hidden items-center justify-center">
            <School className="w-8 h-8 text-pastel-900" />
          </div>
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight whitespace-nowrap">
            {settings.schoolName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Sistem Informasi Penilaian Rapor SD & Buku Induk Digital
          </p>
          <div className="flex items-center justify-center space-x-2 mt-1">
            <span className="text-[11px] font-semibold text-pastel-800 bg-pastel-200/80 px-2.5 py-0.5 rounded-full border border-pastel-300">
              Tahun Ajaran {settings.tahunAjaran}
            </span>
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              {settings.fase}
            </span>
          </div>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-xl bg-white rounded-3xl border border-pastel-200 shadow-elevated p-6 sm:p-8 space-y-6">
        
        {/* Tab Selection */}
        <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setActiveTab('civitas'); setErrorMessage(''); }}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 whitespace-nowrap ${
              activeTab === 'civitas'
                ? 'bg-white text-pastel-950 shadow-xs border border-pastel-300 font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-pastel-700" />
            <span>Civitas Akademika</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('wali_murid'); setErrorMessage(''); }}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 whitespace-nowrap ${
              activeTab === 'wali_murid'
                ? 'bg-white text-emerald-950 shadow-xs border border-emerald-300 font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
            <span>Portal Wali Murid</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-semibold">{errorMessage}</span>
          </div>
        )}

        {/* =========================================================================
         * TAB 1: LOGIN CIVITAS AKADEMIKA
         * ========================================================================= */}
        {activeTab === 'civitas' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-bold text-slate-800">Login Pegawai & Pendidik</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Masuk untuk Administrator, Kepala Sekolah, Guru Wali Kelas, dan Guru Mapel.
              </p>
            </div>

            <form onSubmit={handleCivitasSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Email Akun atau Username:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={civitasUser}
                    onChange={(e) => setCivitasUser(e.target.value)}
                    placeholder="nama@alimamischool.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-pastel-400 focus:ring-1 focus:ring-pastel-300"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Password:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={civitasPass}
                    onChange={(e) => setCivitasPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-pastel-400 focus:ring-1 focus:ring-pastel-300"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-pastel-400 hover:bg-pastel-500 text-pastel-950 font-extrabold text-xs transition-all shadow-soft flex items-center justify-center space-x-2"
              >
                <span>Masuk ke Dashboard Akademik</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Civitas Login Buttons & GTK Selector */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              
              {/* Dropdown 34 Akun GTK Resmi */}
              {gtkList && gtkList.length > 0 && (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center">
                      <Sparkles className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                      Pilih Cepat Akun Guru (34 GTK):
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full font-extrabold">
                      1-Klik Masuk
                    </span>
                  </label>
                  <select
                    onChange={handleSelectGTKQuick}
                    defaultValue=""
                    className="w-full px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="" disabled>-- Pilih Guru / Tenaga Kependidikan --</option>
                    <optgroup label="Pimpinan Sekolah">
                      {gtkList.filter(g => g.role === ROLES.KEPSEK).map(g => (
                        <option key={g.id} value={g.email}>{g.nama} ({g.jabatan})</option>
                      ))}
                    </optgroup>
                    <optgroup label="Guru Wali Kelas (Kelas I - VI)">
                      {gtkList.filter(g => g.role === ROLES.WALI_KELAS).map(g => (
                        <option key={g.id} value={g.email}>{g.nama} ({g.badge})</option>
                      ))}
                    </optgroup>
                    <optgroup label="Guru Mata Pelajaran">
                      {gtkList.filter(g => g.role === ROLES.GURU_MAPEL).map(g => (
                        <option key={g.id} value={g.email}>{g.nama} ({g.jabatan})</option>
                      ))}
                    </optgroup>
                    <optgroup label="Guru Al-Qur'an & Kholaqoh (10 Guru + Kabid)">
                      {gtkList.filter(g => g.role === ROLES.GURU_QURAN).map(g => (
                        <option key={g.id} value={g.email}>{g.nama} ({g.badge || g.jabatan})</option>
                      ))}
                    </optgroup>
                    <optgroup label="Guru Pendamping">
                      {gtkList.filter(g => g.role === ROLES.PENDAMPING).map(g => (
                        <option key={g.id} value={g.email}>{g.nama} (Pendamping)</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              )}

              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Akun Uji Coba Utama (Kepala Sekolah & Wali Kelas 1 & 4):</span>
                <span className="text-[10px] text-emerald-700 font-extrabold normal-case">Password: admin</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  {
                    email: 'kholid.hasan@alimamischool.com',
                    label: 'Kepala Sekolah',
                    nama: 'Kholid Hasan, S.Pd',
                    sub: 'Monitoring & Approval Seluruh Kelas',
                    badge: 'Kepsek',
                    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'
                  },
                  {
                    email: 'putri.hidayah@alimamischool.com',
                    label: 'Wali Kelas 1 Abbas',
                    nama: 'Putri Hidayah, S.Pd',
                    sub: '1 Abdullah Ibnu Abbas (21 Santri)',
                    badge: 'Kelas 1',
                    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'
                  },
                  {
                    email: 'siti.habzah@alimamischool.com',
                    label: 'Wali Kelas 1 Umar',
                    nama: 'Siti Habzah Diniyanti, S.Sos',
                    sub: '1 Abdullah Ibnu Umar (20 Santri)',
                    badge: 'Kelas 1',
                    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'
                  },
                  {
                    email: 'zahra.aulia@alimamischool.com',
                    label: 'Wali Kelas 4 Ali',
                    nama: 'Zahra Aulia, S.Pd',
                    sub: '4 Ali Bin Abi Thalib (21 Santri)',
                    badge: 'Kelas 4',
                    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
                    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80'
                  },
                  {
                    email: 'afrida.rosita@alimamischool.com',
                    label: 'Wali Kelas 4-B',
                    nama: 'Afrida Rosita Dewi, S.Pd., Gr',
                    sub: 'Wali Kelas IV & Koord Literasi',
                    badge: 'Kelas 4',
                    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
                  },
                  {
                    email: 'admin@alimamischool.com',
                    label: 'Administrator IT',
                    nama: 'Faik Bajsair (Super Admin)',
                    sub: 'Akses Penuh CMS & Database',
                    badge: 'Admin',
                    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
                  }
                ].map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => handleQuickLoginGTK(acc.email)}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 text-left transition-all flex items-center space-x-2.5 group cursor-pointer"
                  >
                    <img 
                      src={acc.avatar} 
                      alt={acc.nama} 
                      className="w-9 h-9 rounded-xl object-cover border border-white shadow-xs shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-extrabold text-slate-800 truncate group-hover:text-emerald-950">
                          {acc.nama}
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold border shrink-0 ${acc.badgeColor}`}>
                          {acc.badge}
                        </span>
                      </div>
                      <div className="text-[10px] font-semibold text-emerald-700 truncate">
                        {acc.label} • {acc.sub}
                      </div>
                      <div className="text-[9.5px] text-slate-400 font-mono truncate">
                        {acc.email}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
         * TAB 2: LOGIN PORTAL WALI MURID (STRICT 1 SISWA = 1 AKUN)
         * ========================================================================= */}
        {activeTab === 'wali_murid' && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 mb-1">
                <Lock className="w-3 h-3" />
                <span>Privasi Data Terproteksi • 1 Akun Khusus 1 Siswa</span>
              </div>
              <h2 className="text-sm font-bold text-slate-800">Login Portal Orang Tua / Wali Murid</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Masukkan NISN resmi ananda untuk mengakses perkembangan belajar dan unduh rapor digital.
              </p>
            </div>

            <form onSubmit={handleWaliMuridSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Nomor Induk Siswa Nasional (NISN):
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={nisnInput}
                    onChange={(e) => setNisnInput(e.target.value)}
                    placeholder="Contoh: 0134567891"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-400 focus:ring-1 focus:ring-emerald-300 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Tanggal Lahir Siswa / Kata Sandi:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={birthInput}
                    onChange={(e) => setBirthInput(e.target.value)}
                    placeholder="YYYY-MM-DD"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-400 focus:ring-1 focus:ring-emerald-300 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-all shadow-soft flex items-center justify-center space-x-2"
              >
                <span>Buka Rapor & Nilai Ananda</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Wali Murid Accounts */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  Pilih Siswa untuk Demo Login Orang Tua:
                </span>
                <span className="text-[10px] text-emerald-700 font-medium">1-Klik Akses Privat</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {siswaList.map((siswa) => (
                  <button
                    key={siswa.id}
                    type="button"
                    onClick={() => handleQuickLoginWali(siswa)}
                    className="p-2 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 text-left transition-all flex items-center space-x-2.5 group"
                  >
                    <img 
                      src={siswa.foto} 
                      alt={siswa.nama} 
                      className="w-8 h-8 rounded-full object-cover border border-emerald-200 shadow-2xs shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-800 truncate group-hover:text-emerald-900">
                        {siswa.nama}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        NISN: {siswa.nisn}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-400 mt-6 space-y-1">
        <p>App Rapor SD • Kurikulum Merdeka • Hak Cipta &copy; {new Date().getFullYear()} {settings.schoolName}</p>
        <p className="text-[10px]">Data tersinkronisasi aman dengan Google Spreadsheet Cloud Database</p>
      </div>

    </div>
  );
}
