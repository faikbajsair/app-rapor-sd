import React from 'react';
import { X, CheckCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { ROLES, ROLE_CONFIG } from '../../config/roles';

export function RoleSwitcherModal({ isOpen, onClose, currentRole, onSelectRole }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-pastel-200 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-pastel-200 text-pastel-800">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-bold text-slate-800">Ganti Peran Pengguna (Simulasi Role)</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Pilih peran di bawah ini untuk menguji hak akses dan tampilan khusus tiap pengguna.
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
        <div className="mt-4 space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {Object.entries(ROLE_CONFIG).map(([roleKey, cfg]) => {
            const isSelected = currentRole === roleKey;

            return (
              <button
                key={roleKey}
                onClick={() => {
                  onSelectRole(roleKey);
                  onClose();
                }}
                className={`w-full flex items-start space-x-3.5 p-3.5 rounded-2xl border text-left transition-all group ${
                  isSelected 
                    ? 'bg-pastel-100/90 border-pastel-400 shadow-xs' 
                    : 'bg-white border-slate-200 hover:border-pastel-300 hover:bg-pastel-50/50'
                }`}
              >
                <img 
                  src={cfg.avatar} 
                  alt={cfg.label} 
                  className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-800 group-hover:text-pastel-900">
                      {cfg.label}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${cfg.color}`}>
                      {cfg.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {cfg.description}
                  </p>
                </div>
                {isSelected && (
                  <CheckCircle className="w-5 h-5 text-pastel-700 shrink-0 self-center ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>*Otorisasi data otomatis menyesuaikan hak akses peran yang aktif.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
