import React from 'react';
import { X, CheckCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { ROLES, ROLE_CONFIG } from '../../config/roles';

export function RoleSwitcherModal({ isOpen, onClose, currentRole, currentUser, gtkList = [], onSelectRole, onSelectGTK }) {
  if (!isOpen) return null;

  // Akun khusus uji coba cepat (Kepsek + Wali Kelas 1 & 4 + Admin)
  const featuredAccounts = [
    {
      key: 'KEPSEK_KHOLID',
      email: 'kholid.hasan@alimamischool.com',
      role: ROLES.KEPSEK,
      label: 'Kepala Sekolah',
      nama: 'Kholid Hasan, S.Pd',
      badge: 'Executive & Approval',
      color: 'bg-teal-100 text-teal-800 border-teal-300',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'
    },
    {
      key: 'WK_1_ABBAS',
      email: 'putri.hidayah@alimamischool.com',
      role: ROLES.WALI_KELAS,
      label: 'Wali Kelas 1 Abdullah Ibnu Abbas',
      nama: 'Putri Hidayah, S.Pd',
      badge: 'Wali Kelas 1 Abbas',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'
    },
    {
      key: 'WK_1_UMAR',
      email: 'siti.habzah@alimamischool.com',
      role: ROLES.WALI_KELAS,
      label: 'Wali Kelas 1 Abdullah Ibnu Umar',
      nama: 'Siti Habzah Diniyanti, S.Sos',
      badge: 'Wali Kelas 1 Umar',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'
    },
    {
      key: 'WK_4_ALI',
      email: 'zahra.aulia@alimamischool.com',
      role: ROLES.WALI_KELAS,
      label: 'Wali Kelas 4 Ali Bin Abi Thalib',
      nama: 'Zahra Aulia, S.Pd',
      badge: 'Wali Kelas 4 Ali',
      color: 'bg-amber-100 text-amber-900 border-amber-300',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80'
    },
    {
      key: 'ADMIN_IT',
      email: 'admin@alimamischool.com',
      role: ROLES.ADMIN,
      label: 'Administrator Sekolah',
      nama: 'Faik Bajsair (Admin IT)',
      badge: 'Super Admin & CMS',
      color: 'bg-slate-100 text-slate-800 border-slate-300',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    }
  ];

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
        <div className="mt-4 space-y-2 max-h-[60vh] overflow-y-auto pr-1">
          {featuredAccounts.map((acc) => {
            const isSelected = (currentUser?.email || '').toLowerCase() === acc.email.toLowerCase();

            return (
              <button
                key={acc.key}
                onClick={() => {
                  const foundGtk = gtkList.find(g => (g.email || '').toLowerCase() === acc.email.toLowerCase());
                  if (foundGtk && onSelectGTK) {
                    onSelectGTK(foundGtk);
                  } else {
                    onSelectRole(acc.role);
                  }
                  onClose();
                }}
                className={`w-full flex items-center space-x-3.5 p-3 rounded-2xl border text-left transition-all group cursor-pointer ${
                  isSelected 
                    ? 'bg-pastel-100/90 border-pastel-400 shadow-2xs' 
                    : 'bg-white border-slate-200 hover:border-pastel-300 hover:bg-pastel-50/50'
                }`}
              >
                <img 
                  src={acc.avatar} 
                  alt={acc.label} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-2xs shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-pastel-950 truncate">
                      {acc.nama}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border whitespace-nowrap shrink-0 ml-2 ${acc.color}`}>
                      {acc.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                    {acc.label} • <span className="font-mono text-[10px] text-slate-400">{acc.email}</span>
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
