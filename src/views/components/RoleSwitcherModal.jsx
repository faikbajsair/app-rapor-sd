import React from 'react';
import { X, CheckCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { ROLES, ROLE_CONFIG } from '../../config/roles';

export function RoleSwitcherModal({ isOpen, onClose, currentRole, onSelectRole }) {
  if (!isOpen) return null;

  // Hanya tampilkan peran Civitas Akademika di modal switch
  const staffRoles = [ROLES.ADMIN, ROLES.KEPSEK, ROLES.WALI_KELAS, ROLES.GURU_MAPEL];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-pastel-200 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-pastel-200 text-pastel-900">
                <Sparkles className="w-4 h-4 text-pastel-700" />
              </span>
              <h2 className="text-base font-bold text-slate-800">Ganti Peran Civitas Akademika</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Simulasi cepat hak akses antar staf & pendidik sekolah
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles List */}
        <div className="mt-4 space-y-2.5">
          {staffRoles.map((roleKey) => {
            const cfg = ROLE_CONFIG[roleKey];
            const isSelected = currentRole === roleKey;

            return (
              <button
                key={roleKey}
                onClick={() => {
                  onSelectRole(roleKey);
                  onClose();
                }}
                className={`w-full flex items-center space-x-3.5 p-3 rounded-2xl border text-left transition-all group ${
                  isSelected 
                    ? 'bg-pastel-100/90 border-pastel-400 shadow-2xs' 
                    : 'bg-white border-slate-200 hover:border-pastel-300 hover:bg-pastel-50/50'
                }`}
              >
                <img 
                  src={cfg.avatar} 
                  alt={cfg.label} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-2xs shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-pastel-950 truncate">
                      {cfg.label}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border whitespace-nowrap shrink-0 ml-2 ${cfg.color}`}>
                      {cfg.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                    {cfg.nama}
                  </p>
                </div>
                {isSelected && (
                  <CheckCircle className="w-5 h-5 text-pastel-700 shrink-0 ml-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Notice for Wali Murid */}
        <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span className="text-[11px]">
            *Untuk Wali Murid, silakan gunakan <strong>Portal Wali Murid</strong> di Halaman Login agar data ananda terisolasi aman.
          </span>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
