import React from 'react';
import { 
  School, 
  UserCheck, 
  Printer, 
  Sparkles,
  Database,
  Calendar,
  Layers,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { ROLE_CONFIG, ROLES, TAHUN_AJARAN_OPTIONS, SEMESTER_OPTIONS } from '../../config/roles';

export function Navbar({ 
  settings, 
  currentUser,
  currentRole, 
  onOpenRoleModal, 
  onSyncGas, 
  isSyncing, 
  gasConnected,
  onQuickPrint,
  onChangeTahunAjaran,
  onChangeSemester,
  onLogout
}) {
  const roleInfo = ROLE_CONFIG[currentRole] || ROLE_CONFIG[ROLES.ADMIN];
  const displayName = currentUser?.nama || roleInfo.label;
  const isParent = currentRole === ROLES.WALI_MURID;

  return (
    <header className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pastel-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Left: School Logo & Identity */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="relative group shrink-0">
              <img 
                src={settings.logoUrl} 
                alt="Logo Sekolah" 
                className="w-10 h-10 object-contain rounded-xl p-0.5 bg-pastel-100 border border-pastel-300 shadow-2xs"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-10 h-10 rounded-xl bg-pastel-300 hidden items-center justify-center text-pastel-900 font-bold">
                <School className="w-5 h-5 text-pastel-800" />
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm sm:text-base font-extrabold text-slate-800 tracking-tight whitespace-nowrap">
                  {settings.schoolName}
                </span>
                <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-pastel-200 text-pastel-900 border border-pastel-300 whitespace-nowrap">
                  <Sparkles className="w-3 h-3 mr-1 text-pastel-700" />
                  SD Kurikulum Merdeka
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
                {settings.kelas} • {settings.rombel}
              </p>
            </div>
          </div>

          {/* Center: Global Selectors (Tahun Ajaran & Periode Semester) */}
          <div className="hidden md:flex items-center space-x-2 bg-pastel-50/70 p-1.5 rounded-2xl border border-pastel-200/90">
            
            {/* Tahun Ajaran Selector */}
            <div className="flex items-center space-x-1.5 px-2 py-1 bg-white rounded-xl border border-pastel-200 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-pastel-700 shrink-0" />
              <label className="text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">TP:</label>
              <select
                value={settings.tahunAjaran}
                onChange={(e) => onChangeTahunAjaran(e.target.value)}
                className="bg-transparent text-xs font-extrabold text-slate-800 focus:outline-hidden cursor-pointer whitespace-nowrap pr-1"
              >
                {TAHUN_AJARAN_OPTIONS.map((th) => (
                  <option key={th} value={th}>TP {th}</option>
                ))}
              </select>
            </div>

            {/* Periode Semester Selector */}
            <div className="flex items-center space-x-1.5 px-2 py-1 bg-white rounded-xl border border-pastel-200 shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-pastel-700 shrink-0" />
              <label className="text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">Periode:</label>
              <select
                value={settings.semester}
                onChange={(e) => onChangeSemester(e.target.value)}
                className="bg-transparent text-xs font-extrabold text-slate-800 focus:outline-hidden cursor-pointer whitespace-nowrap pr-1"
              >
                {SEMESTER_OPTIONS.map((smt) => (
                  <option key={smt.id} value={smt.id}>{smt.label}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Right: Tools, User Profile & Logout */}
          <div className="flex items-center space-x-2 sm:space-x-2.5 shrink-0">
            
            {/* GAS Sync Indicator (Only for Staff/Admin) */}
            {!isParent && (
              <button
                onClick={onSyncGas}
                disabled={isSyncing}
                title="Sinkronisasi Cloud Google Spreadsheet"
                className={`hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap ${
                  gasConnected 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100' 
                    : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                }`}
              >
                <Database className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-emerald-600' : ''}`} />
                <span>{isSyncing ? 'Menyinkron...' : 'GAS Cloud Aktif'}</span>
              </button>
            )}

            {/* Print Shortcut */}
            <button
              onClick={onQuickPrint}
              title="Cetak Halaman / Unduh PDF"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Cetak / PDF</span>
            </button>

            {/* User Profile Badge */}
            <div className="flex items-center space-x-2 p-1.5 pl-2.5 rounded-2xl border border-pastel-300 bg-pastel-50/80 text-slate-800">
              <img 
                src={currentUser?.avatar || roleInfo.avatar} 
                alt="Avatar" 
                className="w-7 h-7 rounded-full object-cover border border-white shadow-2xs shrink-0" 
              />
              <div className="text-left hidden lg:block leading-tight pr-1">
                <div className="text-xs font-bold text-slate-800 truncate max-w-[130px]">
                  {displayName}
                </div>
                <div className="text-[10px] text-pastel-800 font-semibold truncate max-w-[130px]">
                  {currentUser?.roleLabel || roleInfo.label}
                </div>
              </div>

              {/* Demo Switcher shortcut if not parent */}
              {!isParent && (
                <button
                  onClick={onOpenRoleModal}
                  title="Ganti Peran Pengguna (Simulasi Role)"
                  className="p-1 rounded-lg hover:bg-pastel-200 text-pastel-800 transition-colors ml-0.5"
                >
                  <UserCheck className="w-4 h-4" />
                </button>
              )}

              {/* Logout Button */}
              <button
                onClick={onLogout}
                title="Keluar dari Akun"
                className="p-1.5 rounded-xl hover:bg-rose-100 text-slate-500 hover:text-rose-700 transition-colors ml-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
