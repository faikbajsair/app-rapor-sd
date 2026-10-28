import React from 'react';
import { 
  School, 
  UserCheck, 
  RefreshCw, 
  Printer, 
  ShieldCheck, 
  Sparkles,
  Database
} from 'lucide-react';
import { ROLE_CONFIG } from '../../config/roles';

export function Navbar({ 
  settings, 
  currentRole, 
  onOpenRoleModal, 
  onSyncGas, 
  isSyncing, 
  gasConnected,
  onQuickPrint
}) {
  const roleInfo = ROLE_CONFIG[currentRole] || ROLE_CONFIG['admin'];

  return (
    <header className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pastel-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & School Branding */}
          <div className="flex items-center space-x-3.5">
            <div className="relative group">
              <img 
                src={settings.logoUrl} 
                alt="Logo Sekolah" 
                className="w-10 h-10 object-contain rounded-lg p-0.5 bg-pastel-100 border border-pastel-300 shadow-xs transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-10 h-10 rounded-lg bg-pastel-300 hidden items-center justify-center text-pastel-900 font-bold">
                <School className="w-5 h-5 text-pastel-800" />
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight leading-tight">
                  {settings.schoolName}
                </h1>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-pastel-200 text-pastel-800 border border-pastel-300">
                  <Sparkles className="w-3 h-3 mr-1 text-pastel-700" />
                  SD Kurikulum Merdeka
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {settings.kelas} • Semester {settings.semester} • TP {settings.tahunAjaran}
              </p>
            </div>
          </div>

          {/* Action Tools & Role Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* GAS Sync Indicator */}
            <button
              onClick={onSyncGas}
              disabled={isSyncing}
              title={settings.gasApiUrl ? "Klik untuk Sinkronisasi ke Google Sheet" : "Atur URL Google Apps Script di menu CMS"}
              className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                gasConnected 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100' 
                  : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
              }`}
            >
              <Database className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Menyinkron...' : gasConnected ? 'GAS Cloud Aktif' : 'Penyimpanan Lokal'}</span>
            </button>

            {/* Print Button Shortcut */}
            <button
              onClick={onQuickPrint}
              className="hidden lg:flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Halaman</span>
            </button>

            {/* Active Role Selector Pill */}
            <button
              onClick={onOpenRoleModal}
              className="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl border border-pastel-300 bg-pastel-50 hover:bg-pastel-100 text-slate-800 transition-all shadow-2xs group"
            >
              <img 
                src={roleInfo.avatar} 
                alt="Avatar" 
                className="w-7 h-7 rounded-full object-cover border border-pastel-400 group-hover:scale-105 transition-transform" 
              />
              <div className="text-left hidden md:block">
                <div className="text-xs font-semibold leading-tight flex items-center">
                  <span>{roleInfo.label}</span>
                </div>
                <div className="text-[10px] text-pastel-700 font-medium">Ganti Role (Demo)</div>
              </div>
              <UserCheck className="w-4 h-4 text-pastel-700 group-hover:text-pastel-900 ml-1" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
