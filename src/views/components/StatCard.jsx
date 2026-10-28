import React from 'react';

export function StatCard({ title, value, subtitle, icon: Icon, color = 'pastel', trend }) {
  const colorThemes = {
    pastel: 'from-pastel-50 to-pastel-100/50 border-pastel-200 text-pastel-900',
    emerald: 'from-emerald-50 to-emerald-100/50 border-emerald-200 text-emerald-900',
    teal: 'from-teal-50 to-teal-100/50 border-teal-200 text-teal-900',
    amber: 'from-amber-50 to-amber-100/50 border-amber-200 text-amber-900',
    blue: 'from-sky-50 to-sky-100/50 border-sky-200 text-sky-900'
  };

  const selectedTheme = colorThemes[color] || colorThemes.pastel;

  return (
    <div className={`p-5 rounded-3xl bg-gradient-to-br ${selectedTheme} border shadow-2xs transition-all hover:shadow-card hover:-translate-y-0.5`}>
      <div className="flex items-center justify-between mb-3 gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
          {title}
        </span>
        {Icon && (
          <div className="p-2.5 rounded-2xl bg-white/80 shadow-2xs border border-white shrink-0">
            <Icon className="w-5 h-5 text-slate-700" />
          </div>
        )}
      </div>

      <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight whitespace-nowrap">
        {value}
      </div>

      {(subtitle || trend) && (
        <div className="mt-2 flex items-center justify-between text-xs text-slate-500 gap-2">
          <span className="truncate font-medium">{subtitle}</span>
          {trend && (
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded whitespace-nowrap shrink-0">
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
