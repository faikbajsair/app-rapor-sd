/**
 * STORAGE ADAPTER (MODEL LAYER - MVC)
 * Mengelola persistensi data aplikasi secara Offline-First (LocalStorage)
 * dan jembatan ke Google Spreadsheet via GAS API.
 */

import {
  DEFAULT_SETTINGS,
  DEFAULT_MAPEL,
  DEFAULT_SISWA,
  DEFAULT_NILAI,
  DEFAULT_ABS,
  DEFAULT_SIKAP,
  DEFAULT_PRESENSI
} from '../config/initialData';

const KEYS = {
  SETTINGS: 'rapor_sd_settings_v1',
  SISWA: 'rapor_sd_siswa_v1',
  MAPEL: 'rapor_sd_mapel_v1',
  NILAI: 'rapor_sd_nilai_v1',
  ABS: 'rapor_sd_abs_v1',
  SIKAP: 'rapor_sd_sikap_v1',
  PRESENSI: 'rapor_sd_presensi_v1',
  APPROVAL: 'rapor_sd_approval_v1'
};

class StorageAdapter {
  constructor() {
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) => {
      try {
        fn();
      } catch (e) {
        console.error("Listener error:", e);
      }
    });
  }

  _get(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn(`Gagal membaca ${key} dari LocalStorage, gunakan fallback:`, e);
      return fallback;
    }
  }

  _set(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
      this.notify();
    } catch (e) {
      console.error(`Gagal menyimpan ${key} ke LocalStorage:`, e);
    }
  }

  // Settings
  getSettings() {
    return this._get(KEYS.SETTINGS, DEFAULT_SETTINGS);
  }

  saveSettings(newSettings) {
    const updated = { ...this.getSettings(), ...newSettings };
    this._set(KEYS.SETTINGS, updated);
    return updated;
  }

  // Siswa
  getSiswa() {
    return this._get(KEYS.SISWA, DEFAULT_SISWA);
  }

  saveSiswa(siswaList) {
    this._set(KEYS.SISWA, siswaList);
    return siswaList;
  }

  addSiswa(newSiswa) {
    const list = this.getSiswa();
    const id = newSiswa.id || `S${String(list.length + 1).padStart(2, '0')}`;
    const item = { ...newSiswa, id };
    list.push(item);
    this.saveSiswa(list);
    return item;
  }

  updateSiswa(id, updatedFields) {
    const list = this.getSiswa().map(s => s.id === id ? { ...s, ...updatedFields } : s);
    this.saveSiswa(list);
    return list;
  }

  deleteSiswa(id) {
    const list = this.getSiswa().filter(s => s.id !== id);
    this.saveSiswa(list);
    return list;
  }

  // Mapel
  getMapel() {
    return this._get(KEYS.MAPEL, DEFAULT_MAPEL);
  }

  saveMapel(mapelList) {
    this._set(KEYS.MAPEL, mapelList);
    return mapelList;
  }

  addMapel(mapel) {
    const list = this.getMapel();
    list.push(mapel);
    this.saveMapel(list);
    return mapel;
  }

  // Nilai
  getNilai() {
    return this._get(KEYS.NILAI, DEFAULT_NILAI);
  }

  saveNilai(nilaiList) {
    this._set(KEYS.NILAI, nilaiList);
    return nilaiList;
  }

  upsertNilai(record) {
    const list = this.getNilai();
    const idx = list.findIndex(n => n.siswaId === record.siswaId && n.mapelId === record.mapelId);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...record };
    } else {
      list.push({ ...record, id: record.id || `N_${record.siswaId}_${record.mapelId}` });
    }
    this.saveNilai(list);
    return list;
  }

  // Analisis Butir Soal (ABS)
  getABS() {
    return this._get(KEYS.ABS, DEFAULT_ABS);
  }

  saveABS(absList) {
    this._set(KEYS.ABS, absList);
    return absList;
  }

  // Sikap
  getSikap() {
    return this._get(KEYS.SIKAP, DEFAULT_SIKAP);
  }

  saveSikap(sikapList) {
    this._set(KEYS.SIKAP, sikapList);
    return sikapList;
  }

  upsertSikap(record) {
    const list = this.getSikap();
    const idx = list.findIndex(s => s.siswaId === record.siswaId);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...record };
    } else {
      list.push({ ...record, id: record.id || `SIKAP_${record.siswaId}` });
    }
    this.saveSikap(list);
    return list;
  }

  // Presensi & Ekstra
  getPresensi() {
    return this._get(KEYS.PRESENSI, DEFAULT_PRESENSI);
  }

  savePresensi(presensiList) {
    this._set(KEYS.PRESENSI, presensiList);
    return presensiList;
  }

  upsertPresensi(record) {
    const list = this.getPresensi();
    const idx = list.findIndex(p => p.siswaId === record.siswaId);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...record };
    } else {
      list.push({ ...record, id: record.id || `PRES_${record.siswaId}` });
    }
    this.savePresensi(list);
    return list;
  }

  // Approval Rapor (Kepala Sekolah)
  getApproval() {
    return this._get(KEYS.APPROVAL, {
      isApproved: true,
      approvedBy: "Ustadz Dr. Abdullah Faqih, M.Pd.I",
      approvalDate: "2025-12-20",
      qrToken: "VERIFIED-RAPOR-SD-ALIMAM-2025-GEN-99",
      digitalSignatureStatus: "Valid & Terverifikasi"
    });
  }

  saveApproval(approvalData) {
    this._set(KEYS.APPROVAL, approvalData);
    return approvalData;
  }

  // Export & Import
  exportFullBackup() {
    return {
      version: "1.0",
      exportDate: new Date().toISOString(),
      settings: this.getSettings(),
      siswa: this.getSiswa(),
      mapel: this.getMapel(),
      nilai: this.getNilai(),
      abs: this.getABS(),
      sikap: this.getSikap(),
      presensi: this.getPresensi(),
      approval: this.getApproval()
    };
  }

  importFullBackup(data) {
    if (!data) return false;
    if (data.settings) this._set(KEYS.SETTINGS, data.settings);
    if (data.siswa) this._set(KEYS.SISWA, data.siswa);
    if (data.mapel) this._set(KEYS.MAPEL, data.mapel);
    if (data.nilai) this._set(KEYS.NILAI, data.nilai);
    if (data.abs) this._set(KEYS.ABS, data.abs);
    if (data.sikap) this._set(KEYS.SIKAP, data.sikap);
    if (data.presensi) this._set(KEYS.PRESENSI, data.presensi);
    if (data.approval) this._set(KEYS.APPROVAL, data.approval);
    this.notify();
    return true;
  }

  resetToDefaults() {
    localStorage.removeItem(KEYS.SETTINGS);
    localStorage.removeItem(KEYS.SISWA);
    localStorage.removeItem(KEYS.MAPEL);
    localStorage.removeItem(KEYS.NILAI);
    localStorage.removeItem(KEYS.ABS);
    localStorage.removeItem(KEYS.SIKAP);
    localStorage.removeItem(KEYS.PRESENSI);
    localStorage.removeItem(KEYS.APPROVAL);
    this.notify();
  }
}

export const storage = new StorageAdapter();
