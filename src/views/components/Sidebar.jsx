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
  BarChart3,
  BookMarked,
  ShieldCheck,
  CalendarCheck2,
  CalendarDays
} from 'lucide-react';
import { ROLES } from '../../config/roles';

export function Sidebar({ activeTab, setActiveTab, currentRole, settings }) {
  // Navigation matrix per role
  const navItems = [
    {
      id: 'dashboard',
      label: 'Monitoring Eksekutif',
      icon: LayoutDashboard,
      roles: [ROLES.ADMIN, ROLES.KEPSEK, ROLES.WALI_KELAS, ROLES.GURU_MAPEL, ROLES.GURU_QURAN, ROLES.PENDAMPING],
      badge: 'Utama'
    },
    {
      id: 'kalender',
      label: 'Kalender Akademik',
      icon: CalendarCheck2,
      roles: [ROLES.ADMIN, ROLES.KEPSEK, ROLES.WALI_KELAS, ROLES.GURU_MAPEL, ROLES.GURU_QURAN, ROLES.PENDAMPING, ROLES.WALI_MURID],
      badge: '2026/2027'
    },
    {
      id: 'jadwal',
      label: 'Jadwal Pelajaran',
      icon: CalendarDays,
      roles: [ROLES.ADMIN, ROLES.KEPSEK, ROLES.WALI_KELAS, ROLES.GURU_MAPEL, ROLES.GURU_QURAN, ROLES.PENDAMPING, ROLES.WALI_MURID],
      badge: 'KBM 26/27'
    },
    {
      id: 'nilai',
      label: 'Pengolahan Nilai',
      icon: Calculator,
      roles: [ROLES.ADMIN, ROLES.KEPSEK, ROLES.WALI_KELAS, ROLES.GURU_MAPEL],
      badge: 'N1 - N15'
    },
    {
      id: 'kholaqoh',
      label: "Al-Qur'an & Kholaqoh",
      icon: BookMarked,
      roles: [ROLES.ADMIN, ROLES.KEPSEK, ROLES.GURU_QURAN, ROLES.WALI_KELAS, ROLES.GURU_MAPEL],
      badge: 'Tahfidz'
    },
    {
      id: 'abs',
      label: 'Analisis Butir Soal (ABS)',
      icon: HelpCircle,
      roles: [ROLES.ADMIN, ROLES.KEPSEK, ROLES.GURU_MAPEL],
      badge: 'Kesukaran'
    },
    {
      id: 'sikap',
      label: 'Sikap & Narasi Otomatis',
      icon: Smile,
      roles: [ROLES.ADMIN, ROLES.KEPSEK, ROLES.WALI_KELAS],
      badge: 'Profil Pancasila'
    },
    {
      id: 'presensi',
      label: 'Presensi & Kehadiran',
      icon: CalendarCheck,
      roles: [ROLES.ADMIN, ROLES.WALI_KELAS],
      badge: 'Bulanan'
    },
    {
      id: 'buku_induk',
      label: 'Buku Induk Siswa',
      icon: BookOpen,
      roles: [ROLES.ADMIN, ROLES.KEPSEK, ROLES.WALI_KELAS],
      badge: 'Database'
    },
    {
      id: 'gtk',
      label: 'Direktori GTK & Guru',
      icon: ShieldCheck,
      roles: [ROLES.ADMIN, ROLES.KEPSEK],
      badge: '34 Guru'
    },
    {
      id: 'rapor',
      label: currentRole === ROLES.WALI_MURID ? 'Unduh Rapor Digital' : 'Cetak Rapor Digital',
      icon: Printer,
      roles: [ROLES.ADMIN, ROLES.KEPSEK, ROLES.WALI_KELAS, ROLES.WALI_MURID],
      badge: 'PDF A4'
    },
    {
      id: 'portal_ortu',
      label: currentRole === ROLES.WALI_MURID ? 'Perkembangan Ananda' : 'Portal Wali Murid',
      icon: Users,
      roles: [ROLES.ADMIN, ROLES.WALI_MURID],
      badge: 'Khusus Ortu'
    },
    {
      id: 'cms',
      label: 'CMS & Pengaturan Lisensi',
      icon: Settings,
      roles: [ROLES.ADMIN],
      badge: 'Admin Only'
    }
  ];

  const allowedItems = navItems.filter(item => item.roles.includes(currentRole));

  return (
    <aside className="no-print w-64 bg-white border-r border-pastel-200/90 flex flex-col justify-between p-4 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        
        {/* Academic Profile Snippet */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-pastel-100 via-pastel-50 to-white border border-pastel-300/80 shadow-2xs">
          <div className="text-[11px] font-bold text-pastel-800 uppercase tracking-wider mb-1 flex items-center">
            <Sparkles className="w-3 h-3 mr-1 text-pastel-700" />
            Tahun Ajaran Aktif
          </div>
          <div className="text-sm font-extrabold text-slate-800">
            {settings.tahunAjaran}
          </div>
          <div className="text-xs text-slate-600 mt-0.5">
            Semester {settings.semester} • {settings.rombel}
          </div>
        </div>

        {/* Navigation Items */}
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Menu Aplikasi
          </div>
          <nav className="space-y-1">
            {allowedItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all group ${
                    isActive
                      ? 'bg-pastel-200 text-pastel-900 shadow-2xs font-bold border border-pastel-300'
                      : 'text-slate-600 hover:bg-pastel-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-pastel-800' : 'text-slate-400 group-hover:text-pastel-700'
                    }`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium transition-colors ${
                      isActive 
                        ? 'bg-white/80 text-pastel-900 border border-pastel-300' 
                        : 'bg-slate-100 text-slate-500 group-hover:bg-pastel-100 group-hover:text-pastel-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

      </div>

      {/* Footer System Status */}
      <div className="pt-4 border-t border-slate-100 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>Lisensi SaaS:</span>
          <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Enterprise
          </span>
        </div>
        <div className="text-[10px] text-slate-400 text-center">
          App Rapor SD v1.0.0 • SaaS Ready
        </div>
      </div>
    </aside>
  );
}
