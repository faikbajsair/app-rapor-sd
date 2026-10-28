import React, { useState } from 'react';
import { 
  Settings, 
  Palette, 
  School, 
  Database, 
  Key, 
  Download, 
  Upload, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Percent
} from 'lucide-react';
import { THEME_PRESETS, CMSController } from '../../controllers/CMSController';
import { gasApi } from '../../models/gasApi';

export function CMSView({ 
  settings, 
  onSaveSettings, 
  onExportBackup, 
  onImportBackup, 
  onResetDefaults,
  onSyncAllToGAS
}) {
  const [formData, setFormData] = useState({ ...settings });
  const [toastMessage, setToastMessage] = useState(null);
  const [pingStatus, setPingStatus] = useState(null);
  const [isPinging, setIsPinging] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const licenseInfo = CMSController.checkLicenseStatus(formData.licenseExpiry);

  const handleFieldChange = (key, val) => {
    const updated = { ...formData, [key]: val };
    setFormData(updated);
    onSaveSettings(updated);
    CMSController.applyAppearance(updated);
  };

  const handleSelectPreset = (preset) => {
    const updated = {
      ...formData,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
      colorPreset: preset.id
    };
    setFormData(updated);
    onSaveSettings(updated);
    CMSController.applyAppearance(updated);
    showToast(`Skema warna "${preset.name}" berhasil diterapkan!`);
  };

  const handleTestGasConnection = async () => {
    if (!formData.gasApiUrl) {
      alert("Silakan masukkan URL Web App Google Apps Script terlebih dahulu.");
      return;
    }

    setIsPinging(true);
    setPingStatus(null);
    try {
      const res = await gasApi.ping(formData.gasApiUrl);
      if (res.success) {
        setPingStatus({
          success: true,
          message: `Berhasil terhubung ke: ${res.data?.spreadsheetName || 'Google Spreadsheet'}`
        });
        showToast("Koneksi Google Apps Script API Berhasil!");
      } else {
        setPingStatus({
          success: false,
          message: res.message || "Gagal menghubungi GAS Web App"
        });
      }
    } catch (err) {
      setPingStatus({
        success: false,
        message: err.message
      });
    } finally {
      setIsPinging(false);
    }
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      await onSyncAllToGAS();
      showToast("Seluruh database berhasil disinkronkan ke Google Sheet!");
    } catch (e) {
      alert("Gagal sinkronisasi: " + e.message);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        const ok = onImportBackup(json);
        if (ok) {
          showToast("Data backup berhasil dipulihkan!");
          if (json.settings) setFormData(json.settings);
        } else {
          alert("Format file backup tidak valid.");
        }
      } catch (err) {
        alert("Gagal membaca file JSON: " + err.message);
      }
    };
    reader.readAsText(file);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-2xl flex items-center space-x-2 animate-in slide-in-from-bottom">
          <CheckCircle className="w-4 h-4 text-pastel-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-pastel-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-pastel-200 text-pastel-800">
                <Settings className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-extrabold text-slate-800">CMS & Pengaturan Lisensi SaaS</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dynamic Appearance Visual • Integrasi Google Apps Script Web App • KKM & Bobot Asesmen
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={onExportBackup}
              className="px-3.5 py-2 rounded-xl bg-pastel-100 hover:bg-pastel-200 text-pastel-900 text-xs font-bold border border-pastel-300 transition-colors flex items-center space-x-1.5"
            >
              <Download className="w-4 h-4 text-pastel-700" />
              <span>Ekspor Backup JSON</span>
            </button>

            <label className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 cursor-pointer transition-colors flex items-center space-x-1.5">
              <Upload className="w-4 h-4 text-slate-600" />
              <span>Impor Backup</span>
              <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Visual Appearance & School Profile (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Dynamic Appearance Card */}
          <div className="bg-white rounded-3xl p-6 border border-pastel-200 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                <Palette className="w-4 h-4 text-pastel-700" />
                <span>Pengaturan Tampilan & Skema Warna (Dynamic Appearance)</span>
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pastel-100 text-pastel-900 font-bold border border-pastel-300">
                Live DOM
              </span>
            </div>

            {/* Presets Grid */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Pilih Preset Skema Warna:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {THEME_PRESETS.map((preset) => {
                  const isSelected = formData.colorPreset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-3 rounded-2xl border text-left transition-all flex items-start space-x-3 ${
                        isSelected 
                          ? 'border-pastel-500 bg-pastel-50/70 shadow-xs ring-1 ring-pastel-400' 
                          : 'border-slate-200 hover:border-pastel-300 bg-white'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl ${preset.previewBg} border border-white shadow-2xs shrink-0`} />
                      <div>
                        <div className="text-xs font-bold text-slate-800">{preset.name}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{preset.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Color Codes */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Warna Utama (Primary):</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={formData.primaryColor || '#A8E6CF'}
                    onChange={(e) => handleFieldChange('primaryColor', e.target.value)}
                    className="w-8 h-8 rounded-lg border border-slate-200 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={formData.primaryColor || ''}
                    onChange={(e) => handleFieldChange('primaryColor', e.target.value)}
                    className="w-full p-1.5 rounded-lg border border-slate-200 text-xs font-mono uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Warna Sekunder:</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={formData.secondaryColor || '#D4EDDA'}
                    onChange={(e) => handleFieldChange('secondaryColor', e.target.value)}
                    className="w-8 h-8 rounded-lg border border-slate-200 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={formData.secondaryColor || ''}
                    onChange={(e) => handleFieldChange('secondaryColor', e.target.value)}
                    className="w-full p-1.5 rounded-lg border border-slate-200 text-xs font-mono uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Warna Aksen Teks:</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={formData.accentColor || '#267759'}
                    onChange={(e) => handleFieldChange('accentColor', e.target.value)}
                    className="w-8 h-8 rounded-lg border border-slate-200 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={formData.accentColor || ''}
                    onChange={(e) => handleFieldChange('accentColor', e.target.value)}
                    className="w-full p-1.5 rounded-lg border border-slate-200 text-xs font-mono uppercase"
                  />
                </div>
              </div>
            </div>

            {/* Logo & Favicon URLs */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">URL Logo Sekolah:</label>
                <input
                  type="text"
                  value={formData.logoUrl}
                  onChange={(e) => handleFieldChange('logoUrl', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-pastel-400 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">URL Favicon Web:</label>
                <input
                  type="text"
                  value={formData.faviconUrl}
                  onChange={(e) => handleFieldChange('faviconUrl', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-pastel-400 font-mono"
                />
              </div>
            </div>
          </div>

          {/* School Profile Card */}
          <div className="bg-white rounded-3xl p-6 border border-pastel-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <School className="w-4 h-4 text-pastel-700" />
              <span>Profil Sekolah & Pengesahan Dokumen Rapor</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">Nama Resmi Sekolah:</label>
                <input
                  type="text"
                  value={formData.schoolName}
                  onChange={(e) => handleFieldChange('schoolName', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400 font-bold"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nomor Pokok Sekolah Nasional (NPSN):</label>
                <input
                  type="text"
                  value={formData.npsn}
                  onChange={(e) => handleFieldChange('npsn', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tempat Penerbitan Rapor:</label>
                <input
                  type="text"
                  value={formData.tempatRapor}
                  onChange={(e) => handleFieldChange('tempatRapor', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400"
                />
              </div>

              <div className="col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">Alamat Lengkap:</label>
                <input
                  type="text"
                  value={formData.alamat}
                  onChange={(e) => handleFieldChange('alamat', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Kepala Sekolah:</label>
                <input
                  type="text"
                  value={formData.kepalaSekolah}
                  onChange={(e) => handleFieldChange('kepalaSekolah', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400 font-semibold"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">NIP Kepala Sekolah:</label>
                <input
                  type="text"
                  value={formData.nipKepalaSekolah}
                  onChange={(e) => handleFieldChange('nipKepalaSekolah', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Wali Kelas Aktif:</label>
                <input
                  type="text"
                  value={formData.waliKelas}
                  onChange={(e) => handleFieldChange('waliKelas', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400 font-semibold"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">NIP Wali Kelas:</label>
                <input
                  type="text"
                  value={formData.nipWaliKelas}
                  onChange={(e) => handleFieldChange('nipWaliKelas', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-pastel-400 font-mono"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: GAS Sync, Weights & SaaS License (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Google Apps Script Integration Card */}
          <div className="bg-white rounded-3xl p-6 border border-pastel-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                <Database className="w-4 h-4 text-emerald-600" />
                <span>Koneksi Google Apps Script API</span>
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                Hybrid Cloud
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Hubungkan URL Web App dari Google Sheets untuk sinkronisasi cloud tanpa database berbayar.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">
                URL Web App Google Apps Script:
              </label>
              <input
                type="text"
                placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                value={formData.gasApiUrl}
                onChange={(e) => handleFieldChange('gasApiUrl', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:outline-hidden focus:border-emerald-400"
              />
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <button
                type="button"
                onClick={handleTestGasConnection}
                disabled={isPinging}
                className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center space-x-1"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
                <span>{isPinging ? 'Menguji...' : 'Uji Koneksi (Ping)'}</span>
              </button>

              <button
                type="button"
                onClick={handleManualSync}
                disabled={isSyncing}
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1"
              >
                <Database className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Menyinkron...' : 'Sinkron Data'}</span>
              </button>
            </div>

            {/* Ping Feedback */}
            {pingStatus && (
              <div className={`p-3 rounded-xl text-xs font-medium border flex items-start space-x-2 ${
                pingStatus.success 
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200' 
                  : 'bg-rose-50 text-rose-900 border-rose-200'
              }`}>
                {pingStatus.success ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <span>{pingStatus.message}</span>
              </div>
            )}
          </div>

          {/* Assessment Weights & KKM */}
          <div className="bg-white rounded-3xl p-6 border border-pastel-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <Percent className="w-4 h-4 text-pastel-700" />
              <span>Pembobotan Nilai Akhir (NA) & KKM</span>
            </h3>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Formatif (%):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.bobotFormatif}
                  onChange={(e) => handleFieldChange('bobotFormatif', Number(e.target.value) || 0)}
                  className="w-full p-2 text-center rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-600 block mb-1">Sumatif Lingkup (%):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.bobotSumatifLingkup}
                  onChange={(e) => handleFieldChange('bobotSumatifLingkup', Number(e.target.value) || 0)}
                  className="w-full p-2 text-center rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-600 block mb-1">Sumatif Akhir (%):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.bobotSumatifAkhir}
                  onChange={(e) => handleFieldChange('bobotSumatifAkhir', Number(e.target.value) || 0)}
                  className="w-full p-2 text-center rounded-xl border border-slate-200 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">KKM Default Sekolah:</label>
              <input
                type="number"
                min="50"
                max="100"
                value={formData.kkmDefault}
                onChange={(e) => handleFieldChange('kkmDefault', Number(e.target.value) || 75)}
                className="w-full p-2 rounded-xl border border-slate-200 font-extrabold text-sm text-emerald-800"
              />
            </div>
          </div>

          {/* SaaS License Management */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50/70 via-white to-pastel-100/60 border border-emerald-300 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1 text-emerald-700" />
                Lisensi Komersial SaaS
              </span>
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${licenseInfo.badge}`}>
                {licenseInfo.status}
              </span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="text-slate-500">Nomor Lisensi Sekolah:</div>
              <div className="font-mono font-bold text-slate-800 text-xs bg-white p-2 rounded-lg border border-pastel-300">
                {formData.licenseKey}
              </div>
            </div>

            <div className="flex justify-between text-xs py-1 text-slate-600">
              <span>Masa Berlaku Lisensi:</span>
              <span className="font-bold text-slate-800">{formData.licenseExpiry} ({licenseInfo.daysLeft} hari lagi)</span>
            </div>

            <div className="flex justify-between text-xs py-1 text-slate-600">
              <span>Kuota Siswa Aktif:</span>
              <span className="font-bold text-slate-800">500 Siswa</span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  if (window.confirm("Kembalikan seluruh data dan pengaturan ke nilai awal bawaan?")) {
                    onResetDefaults();
                    showToast("Sistem berhasil di-reset ke data awal bawaan.");
                  }
                }}
                className="w-full py-2 rounded-xl bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold transition-colors"
              >
                Reset ke Pengaturan Awal Pabrik
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
