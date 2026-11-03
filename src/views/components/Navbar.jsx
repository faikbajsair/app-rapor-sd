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
  Menu,
  X
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
  onLogout,
  isMobileMenuOpen,
  onToggleMobileMenu
}) {
  const roleInfo = ROLE_CONFIG[currentRole] || ROLE_CONFIG[ROLES.ADMIN];
  const displayName = currentUser?.nama || roleInfo.label;
  const isParent = currentRole === ROLES.WALI_MURID;

  // Tampilkan kelas aktif sesuai guru yang sedang login atau pengaturan umum
  const activeKelasSubtitle = (currentUser?.kelasDiampu && currentUser.kelasDiampu.length > 0)
    ? `Kelas Diampu: ${currentUser.kelasDiampu.join(', ')}`
    : `${settings.kelas || 'Kelas 1'} • ${settings.rombel || '1 Abdullah Ibnu Abbas'}`;

  return (
    <header className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="w-full px-3 sm:px-5 lg:px-7">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4 min-w-0">
          
          {/* Left: Mobile Drawer Trigger + School Logo & Identity */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {/* Mobile Hamburger Button */}
            <button
              onClick={onToggleMobileMenu}
              aria-label="Buka Menu Navigasi"
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 transition-colors shrink-0 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="relative group shrink-0">
              <img 
                src={settings.logoUrl} 
                alt="Logo Sekolah" 
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-xl p-0.5 bg-emerald-50 border border-emerald-200 shadow-2xs"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-800 hidden items-center justify-center text-white font-bold shadow-2xs">
                <School className="w-5 h-5 text-amber-300" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs sm:text-sm lg:text-base font-black text-slate-900 tracking-tight truncate">
                  {settings.schoolName}
                </span>
                <span className="hidden 2xl:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                  <Sparkles className="w-3 h-3 mr-1 text-emerald-600" />
                  SD Kurikulum Merdeka
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-semibold truncate">
                {activeKelasSubtitle}
              </p>
            </div>
          </div>

          {/* Center: Global Selectors (Tahun Ajaran & Periode Semester) on Desktop/Tablet */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/90 shrink-0">
            
            {/* Tahun Ajaran Selector */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <label className="text-[10px] font-bold text-slate-400 uppercase hidden xl:inline">TP:</label>
              <select
                value={settings.tahunAjaran}
                onChange={(e) => onChangeTahunAjaran(e.target.value)}
                className="bg-transparent text-xs font-extrabold text-slate-800 focus:outline-hidden cursor-pointer pr-1"
              >
                {TAHUN_AJARAN_OPTIONS.map((th) => (
                  <option key={th} value={th}>TP {th}</option>
                ))}
              </select>
            </div>

            {/* Periode Semester Selector */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <label className="text-[10px] font-bold text-slate-400 uppercase hidden xl:inline">Periode:</label>
              <select
                value={settings.semester}
                onChange={(e) => onChangeSemester(e.target.value)}
                className="bg-transparent text-xs font-extrabold text-slate-800 focus:outline-hidden cursor-pointer max-w-[165px] lg:max-w-[210px] truncate pr-1"
              >
                {SEMESTER_OPTIONS.map((smt) => (
                  <option key={smt.id} value={smt.id}>{smt.label}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Right: Tools, User Profile & Logout (Protected from right-edge clipping) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* GAS Sync Indicator (Only for Staff/Admin) */}
            {!isParent && (
              <button
                onClick={onSyncGas}
                disabled={isSyncing}
                title="Sinkronisasi Cloud Google Spreadsheet"
                className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shrink-0 ${
                  gasConnected 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100' 
                    : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                }`}
              >
                <Database className={`w-3.5 h-3.5 shrink-0 ${isSyncing ? 'animate-spin text-emerald-600' : ''}`} />
                <span>{isSyncing ? 'Sinkron...' : 'GAS Cloud'}</span>
              </button>
            )}

            {/* Print Shortcut */}
            <button
              onClick={onQuickPrint}
              title="Cetak Halaman / Unduh PDF"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors cursor-pointer shrink-0"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span className="hidden lg:inline">Cetak / PDF</span>
            </button>

            {/* User Profile Pill */}
            <div className="flex items-center gap-1.5 sm:gap-2 p-1 sm:pl-2 sm:pr-1.5 rounded-2xl border border-emerald-200 bg-emerald-50/60 text-slate-800 shrink-0">
              <img 
                src={currentUser?.avatar || roleInfo.avatar} 
                alt="Avatar" 
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl object-cover border border-white shadow-2xs shrink-0" 
              />
              <div className="text-left hidden sm:block leading-tight max-w-[110px] xl:max-w-[145px]">
                <div className="text-xs font-extrabold text-slate-900 truncate">
                  {displayName}
                </div>
                <div className="text-[10px] text-emerald-800 font-bold truncate">
                  {currentUser?.roleLabel || roleInfo.label}
                </div>
              </div>

              {/* Demo Switcher shortcut if not parent */}
              {!isParent && (
                <button
                  onClick={onOpenRoleModal}
                  title="Ganti Peran Pengguna (Simulasi Role)"
                  className="p-1.5 rounded-xl hover:bg-emerald-200/70 text-emerald-800 transition-colors cursor-pointer shrink-0"
                >
                  <UserCheck className="w-4 h-4" />
                </button>
              )}

              {/* Logout Button */}
              <button
                onClick={onLogout}
                title="Keluar dari Akun"
                className="p-1.5 rounded-xl bg-white/80 hover:bg-rose-100 text-slate-600 hover:text-rose-700 border border-slate-200/70 transition-colors cursor-pointer shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Mobile Secondary Period Bar (Only visible on Mobile < md) */}
        <div className="flex md:hidden items-center justify-between gap-2 py-2 border-t border-slate-100 text-xs overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-lg border border-slate-200">
              <Calendar className="w-3 h-3 text-emerald-700" />
              <select
                value={settings.tahunAjaran}
                onChange={(e) => onChangeTahunAjaran(e.target.value)}
                className="bg-transparent text-[11px] font-extrabold text-slate-800 focus:outline-hidden"
              >
                {TAHUN_AJARAN_OPTIONS.map((th) => (
                  <option key={th} value={th}>TP {th}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-lg border border-slate-200">
              <Layers className="w-3 h-3 text-emerald-700" />
              <select
                value={settings.semester}
                onChange={(e) => onChangeSemester(e.target.value)}
                className="bg-transparent text-[11px] font-extrabold text-slate-800 focus:outline-hidden max-w-[140px] truncate"
              >
                {SEMESTER_OPTIONS.map((smt) => (
                  <option key={smt.id} value={smt.id}>{smt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {!isParent && (
              <button
                onClick={onSyncGas}
                disabled={isSyncing}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold"
              >
                <Database className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>Sync</span>
              </button>
            )}
            <button
              onClick={onQuickPrint}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-bold"
            >
              <Printer className="w-3 h-3" />
              <span>PDF</span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
