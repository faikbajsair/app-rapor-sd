import React from 'react';
import { 
  LayoutDashboard, 
  Calculator, 
  HelpCircle, 
  Smile, 
  CalendarCheck, 
  BookOpen, 
  Printer, 
  Settings, 
  Users, 
  Sparkles,
  BookMarked,
  ShieldCheck,
  CalendarCheck2,
  CalendarDays,
  FileSpreadsheet,
  X,
  Grid,
  ChevronRight
} from 'lucide-react';
import { ROLES } from '../../config/roles';

export function Sidebar({ 
  activeTab, 
  setActiveTab, 
  currentRole, 
  currentUser,
  settings, 
  isMobileMenuOpen, 
  onCloseMobileMenu,
  onOpenMobileMenu
}) {
  // Navigation matrix per role with grouping
  const navItems = [
    {
      id: 'dashboard',
      label: 'Monitoring Eksekutif',
      shortLabel: 'Beranda',
      group: 'UTAMA & KURIKULUM',
      icon: LayoutDashboard,
      roles: [ROLES.ADMIN, ROLES.KEPSEK, ROLES.WALI_KELAS, ROLES.GURU_MAPEL, ROLES.GURU_QURAN, ROLES.PENDAMPING],
      badge: 'Utama'
    },
    {
      id: 'kalender',
      label: 'Kalender Akademik',
      shortLabel: 'Kaldik',
      group: 'UTAMA & KURIKULUM',
      icon: CalendarCheck2,
      roles: [ROLES.ADMIN, ROLES.KEPSEK, ROLES.WALI_KELAS, ROLES.GURU_MAPEL, ROLES.GURU_QURAN, ROLES.PENDAMPING, ROLES.WALI_MURID],
      badge: '2026/2027'
    },
    {
      id: 'jadwal',
      label: 'Jadwal Pelajaran',
      shortLabel: 'Jadwal',
      group: 'UTAMA & KURIKULUM',
      icon: CalendarDays,
      roles: [ROLES.ADMIN, ROLES.KEPSEK, ROLES.WALI_KELAS, ROLES.GURU_MAPEL, ROLES.GURU_QURAN, ROLES.PENDAMPING, ROLES.WALI_MURID],
      badge: 'KBM 26/27'
    },
    {
      id: 'administrasi',
      label: 'Administrasi Wali Kelas',
      shortLabel: 'Admin Kelas',
      group: 'UTAMA & KURIKULUM',
      icon: FileSpreadsheet,
      roles: [ROLES.ADMIN, ROLES.KEPSEK, ROLES.WALI_KELAS, ROLES.GURU_MAPEL, ROLES.GURU_QURAN, ROLES.PENDAMPING],
      badge: 'Buku I-II'
    },
    {
      id: 'nilai',
      label: 'Pengolahan Nilai',
      shortLabel: 'Input Nilai',
      group: 'PENILAIAN & AKADEMIK',
      icon: Calculator,
      roles: [ROLES.ADMIN, ROLES.KEPSEK, ROLES.WALI_KELAS, ROLES.GURU_MAPEL],
      badge: '16 Mapel'
    },
    {
      id: 'kholaqoh',
      label: "Al-Qur'an & Kholaqoh",
      shortLabel: 'Tahfidz',
      group: 'PENILAIAN & AKADEMIK',
      icon: BookMarked,
      roles: [ROLES.ADMIN, ROLES.KEPSEK, ROLES.GURU_QURAN, ROLES.WALI_KELAS, ROLES.GURU_MAPEL],
      badge: 'Tahfidz'
    },
    {
      id: 'abs',
      label: 'Analisis Butir Soal (ABS)',
      shortLabel: 'ABS',
      group: 'PENILAIAN & AKADEMIK',
      icon: HelpCircle,
      roles: [ROLES.ADMIN, ROLES.KEPSEK, ROLES.GURU_MAPEL],
      badge: 'Indeks P'
    },
    {
      id: 'sikap',
      label: 'Sikap & Narasi Otomatis',
      shortLabel: 'Sikap',
      group: 'PENILAIAN & AKADEMIK',
      icon: Smile,
      roles: [ROLES.ADMIN, ROLES.KEPSEK, ROLES.WALI_KELAS],
      badge: 'Pancasila'
    },
    {
      id: 'presensi',
      label: 'Presensi & Kehadiran',
      shortLabel: 'Presensi',
      group: 'PENILAIAN & AKADEMIK',
      icon: CalendarCheck,
      roles: [ROLES.ADMIN, ROLES.WALI_KELAS],
      badge: 'Bulanan'
    },
    {
      id: 'buku_induk',
      label: 'Buku Induk Siswa',
      shortLabel: 'Buku Induk',
      group: 'DATABASE & LAPORAN',
      icon: BookOpen,
      roles: [ROLES.ADMIN, ROLES.KEPSEK, ROLES.WALI_KELAS],
      badge: 'Database'
    },
    {
      id: 'gtk',
      label: 'Direktori GTK & Guru',
      shortLabel: 'Data GTK',
      group: 'DATABASE & LAPORAN',
      icon: ShieldCheck,
      roles: [ROLES.ADMIN, ROLES.KEPSEK],
      badge: '34 Guru'
    },
    {
      id: 'rapor',
      label: currentRole === ROLES.WALI_MURID ? 'Unduh Rapor Digital' : 'Cetak Rapor Digital',
      shortLabel: 'Rapor PDF',
      group: 'DATABASE & LAPORAN',
      icon: Printer,
      roles: [ROLES.ADMIN, ROLES.KEPSEK, ROLES.WALI_KELAS, ROLES.WALI_MURID],
      badge: 'PDF A4'
    },
    {
      id: 'portal_ortu',
      label: currentRole === ROLES.WALI_MURID ? 'Perkembangan Ananda' : 'Portal Wali Murid',
      shortLabel: 'Portal Ortu',
      group: 'DATABASE & LAPORAN',
      icon: Users,
      roles: [ROLES.ADMIN, ROLES.WALI_MURID],
      badge: 'Ortu'
    },
    {
      id: 'cms',
      label: 'CMS & Pengaturan Sistem',
      shortLabel: 'Pengaturan',
      group: 'DATABASE & LAPORAN',
      icon: Settings,
      roles: [ROLES.ADMIN],
      badge: 'Admin'
    }
  ];

  const allowedItems = navItems.filter(item => item.roles.includes(currentRole));
  const groups = [...new Set(allowedItems.map(i => i.group))];

  const activeRombelText = (currentUser?.kelasDiampu && currentUser.kelasDiampu.length > 0)
    ? currentUser.kelasDiampu.join(', ')
    : (settings.rombel || '1 Abdullah Ibnu Abbas');

  const handleSelectNav = (id) => {
    setActiveTab(id);
    if (onCloseMobileMenu) onCloseMobileMenu();
  };

  // Bottom bar items (4 primary + 1 "Menu Lainnya")
  const isParent = currentRole === ROLES.WALI_MURID;
  const mobileQuickIds = isParent
    ? ['portal_ortu', 'rapor', 'kalender', 'jadwal']
    : ['dashboard', 'nilai', 'administrasi', 'rapor'];

  const mobileQuickItems = mobileQuickIds
    .map(id => allowedItems.find(i => i.id === id))
    .filter(Boolean);

  const renderNavigationContent = () => (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-5">
        
        {/* Academic Profile Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 text-white shadow-md border border-emerald-800 relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-[10px] font-extrabold text-amber-300 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
              <span>TAHUN AJARAN AKTIF</span>
            </div>
            <div className="text-base font-black tracking-tight text-white">
              TP {settings.tahunAjaran || '2026/2027'}
            </div>
            <div className="text-[11px] text-emerald-100 font-semibold mt-1 leading-snug">
              {settings.semester}
            </div>
            <div className="mt-2 pt-2 border-t border-emerald-800/80 flex items-center justify-between text-[11px]">
              <span className="text-emerald-300 font-medium">Rombel:</span>
              <span className="font-bold text-white truncate max-w-[140px]">{activeRombelText}</span>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-teal-400/15 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Grouped Navigation Items */}
        <div className="space-y-4">
          {groups.map((grp) => (
            <div key={grp}>
              <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-3 mb-1.5">
                {grp}
              </div>
              <nav className="space-y-1">
                {allowedItems.filter(i => i.group === grp).map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectNav(item.id)}
                      className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all group cursor-pointer ${
                        isActive
                          ? 'bg-emerald-800 text-white shadow-xs ring-2 ring-emerald-600/20'
                          : 'text-slate-600 hover:bg-emerald-50/70 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-amber-300' : 'text-slate-400 group-hover:text-emerald-700'
                        }`} />
                        <span className="truncate leading-snug">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold shrink-0 transition-colors ${
                          isActive 
                            ? 'bg-emerald-950/80 text-emerald-100 border border-emerald-700' 
                            : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-emerald-800'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

      </div>

      {/* Footer System Status */}
      <div className="pt-4 mt-6 border-t border-slate-100 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>Status Sistem:</span>
          <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            SD Al-Imam Cloud
          </span>
        </div>
        <div className="text-[10px] text-slate-400 text-center font-medium">
          App Rapor Digital SD v2.0 • Kurikulum Merdeka
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. DESKTOP SIDEBAR (lg and up) */}
      <aside className="no-print hidden lg:flex w-68 shrink-0 bg-white border-r border-slate-200/90 flex-col justify-between p-4 min-h-[calc(100vh-4rem)] sticky top-16 self-start">
        {renderNavigationContent()}
      </aside>

      {/* 2. MOBILE & TABLET SLIDE-OVER DRAWER (< lg) */}
      {isMobileMenuOpen && (
        <div className="no-print lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobileMenu}
          />
          
          {/* Drawer Panel */}
          <div className="relative z-10 w-72 max-w-[85vw] bg-white h-full shadow-2xl p-4 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center font-serif font-black text-xs">
                  الإمام
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">Menu Navigasi</div>
                  <div className="text-[10px] text-slate-500 font-semibold">SD Al-Imam Islamic School</div>
                </div>
              </div>
              <button
                onClick={onCloseMobileMenu}
                className="p-1.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {renderNavigationContent()}
          </div>
        </div>
      )}

      {/* 3. MOBILE INTERACTIVE BOTTOM NAVIGATION BAR (< lg) */}
      <div className="no-print lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1.5">
        <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
          {mobileQuickItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectNav(item.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs font-extrabold'
                    : 'text-slate-500 hover:bg-slate-100 font-semibold'
                }`}
              >
                <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-amber-300' : 'text-slate-500'}`} />
                <span className="text-[10px] leading-tight truncate max-w-full">{item.shortLabel}</span>
              </button>
            );
          })}

          {/* 5th Button: Open Full Menu Drawer */}
          <button
            onClick={onOpenMobileMenu}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
              isMobileMenuOpen
                ? 'bg-emerald-100 text-emerald-900 font-extrabold'
                : 'text-slate-600 hover:bg-slate-100 font-semibold'
            }`}
          >
            <Grid className="w-4 h-4 mb-0.5 text-emerald-700" />
            <span className="text-[10px] leading-tight">Menu Lain</span>
          </button>
        </div>
      </div>
    </>
  );
}
