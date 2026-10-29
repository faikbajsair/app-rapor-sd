import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  LogIn, 
  CheckCircle, 
  Briefcase, 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Sparkles,
  Award
} from 'lucide-react';
import { ROLES } from '../../config/roles';

export function GTKView({ gtkList = [], onSwitchUser, currentUser }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('ALL');

  // Filter list
  const filteredGTK = gtkList.filter((g) => {
    const matchSearch = (g.nama || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (g.jabatan || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (g.nuptk || '').includes(searchQuery) ||
                        (g.email || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchRole = filterRole === 'ALL' || g.role === filterRole;
    return matchSearch && matchRole;
  });

  // Statistik GTK
  const totalGTK = gtkList.length;
  const countWaliKelas = gtkList.filter(g => g.role === ROLES.WALI_KELAS).length;
  const countGuruMapel = gtkList.filter(g => g.role === ROLES.GURU_MAPEL).length;
  const countGuruQuran = gtkList.filter(g => g.role === ROLES.GURU_QURAN).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold text-emerald-100 border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
              <span>Direktori GTK & Hak Akses Akun Guru 2026/2027</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Data GTK & Penugasan Mengajar
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Daftar resmi 34 Guru & Tenaga Kependidikan SD Al-Imam. Setiap guru memiliki akun tersendiri untuk menginput nilai pada kelas, mata pelajaran, dan kholaqoh yang diampu.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-4 py-2 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 text-white text-xs font-bold">
              Total {totalGTK} Pendidik & Staf
            </span>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium block">Total Guru & GTK</span>
          <span className="text-xl font-black text-slate-800">{totalGTK} Orang</span>
          <span className="text-[10px] text-emerald-600 block mt-0.5 font-bold">100% Memiliki Akun</span>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-green-200 shadow-2xs">
          <span className="text-xs text-green-700 font-medium block">Wali Kelas</span>
          <span className="text-xl font-black text-green-800">{countWaliKelas} Guru</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Kelas I s.d VI</span>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-cyan-200 shadow-2xs">
          <span className="text-xs text-cyan-700 font-medium block">Guru Mapel</span>
          <span className="text-xl font-black text-cyan-800">{countGuruMapel} Guru</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Math, PAI, PJOK, dll</span>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-purple-200 shadow-2xs">
          <span className="text-xs text-purple-700 font-medium block">Guru Al-Qur'an</span>
          <span className="text-xl font-black text-purple-800">{countGuruQuran} Guru</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">10 Kholaqoh + Kabid</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari nama guru, NUPTK, mata pelajaran, atau kelas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Role Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'ALL', label: 'Semua' },
            { id: ROLES.WALI_KELAS, label: 'Wali Kelas' },
            { id: ROLES.GURU_MAPEL, label: 'Guru Mapel' },
            { id: ROLES.GURU_QURAN, label: "Guru Al-Qur'an" },
            { id: ROLES.KEPSEK, label: 'Pimpinan' },
            { id: ROLES.PENDAMPING, label: 'Pendamping' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterRole(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterRole === tab.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* GTK Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredGTK.map((gtk) => {
          const isCurrentUser = currentUser?.email === gtk.email || currentUser?.nama === gtk.nama;

          return (
            <div 
              key={gtk.id}
              className={`bg-white rounded-3xl p-5 border transition-all hover:shadow-md flex flex-col justify-between ${
                isCurrentUser ? 'border-emerald-500 ring-2 ring-emerald-200 shadow-sm' : 'border-slate-200'
              }`}
            >
              <div>
                
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <span className="text-[11px] font-black text-slate-400">
                    #{String(gtk.no || 1).padStart(2, '0')}
                  </span>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                    gtk.role === ROLES.WALI_KELAS ? 'bg-green-100 text-green-800 border-green-300' :
                    gtk.role === ROLES.GURU_MAPEL ? 'bg-cyan-100 text-cyan-800 border-cyan-300' :
                    gtk.role === ROLES.GURU_QURAN ? 'bg-purple-100 text-purple-800 border-purple-300' :
                    gtk.role === ROLES.KEPSEK ? 'bg-teal-100 text-teal-800 border-teal-300' :
                    'bg-slate-100 text-slate-700 border-slate-300'
                  }`}>
                    {gtk.jabatan}
                  </span>
                </div>

                {/* Profile Avatar & Info */}
                <div className="flex items-start space-x-3.5 mb-3">
                  <img
                    src={gtk.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                    alt={gtk.nama}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-2xs shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-slate-800 text-sm truncate">
                      {gtk.nama}
                    </h3>
                    <p className="text-xs text-slate-500 truncate">
                      {gtk.email}
                    </p>
                    {gtk.nuptk && (
                      <p className="text-[11px] text-emerald-700 font-mono mt-0.5">
                        NUPTK: {gtk.nuptk}
                      </p>
                    )}
                  </div>
                </div>

                {/* Assignment tags */}
                <div className="space-y-1.5 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100 mb-4">
                  {gtk.kelasDiampu && gtk.kelasDiampu.length > 0 && (
                    <div className="flex items-start space-x-1.5">
                      <span className="text-slate-400 shrink-0 font-medium">Kelas:</span>
                      <span className="text-slate-700 font-bold truncate">
                        {gtk.kelasDiampu.join(', ')}
                      </span>
                    </div>
                  )}
                  {gtk.mapelDiampu && gtk.mapelDiampu.length > 0 && (
                    <div className="flex items-start space-x-1.5">
                      <span className="text-slate-400 shrink-0 font-medium">Mapel:</span>
                      <span className="text-slate-700 font-bold truncate">
                        {gtk.mapelDiampu.join(', ')}
                      </span>
                    </div>
                  )}
                  {gtk.kholaqohDiampu && gtk.kholaqohDiampu.length > 0 && (
                    <div className="flex items-start space-x-1.5">
                      <span className="text-purple-500 shrink-0 font-medium">Kholaqoh:</span>
                      <span className="text-purple-800 font-bold truncate">
                        {gtk.badge || gtk.kholaqohDiampu.join(', ')}
                      </span>
                    </div>
                  )}
                  {gtk.jabatanLainnya && (
                    <div className="flex items-start space-x-1.5">
                      <span className="text-amber-600 shrink-0 font-medium">Tugas Lain:</span>
                      <span className="text-amber-800 font-semibold truncate">
                        {gtk.jabatanLainnya}
                      </span>
                    </div>
                  )}
                </div>

              </div>

              {/* Action Button: Switch to this user */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {gtk.statusJabatan} • {gtk.pendidikan}
                </span>

                {isCurrentUser ? (
                  <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Sedang Login</span>
                  </span>
                ) : (
                  <button
                    onClick={() => onSwitchUser && onSwitchUser(gtk)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 font-bold text-xs transition-colors flex items-center space-x-1.5 cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Login Akun Ini</span>
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
