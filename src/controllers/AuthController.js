/**
 * AUTH CONTROLLER
 * Mengelola sesi autentikasi terpisah:
 * 1. Civitas Akademika (Admin, Kepala Sekolah, Guru Wali Kelas, Guru Mapel)
 * 2. Portal Wali Murid (Strict 1 Akun Orang Tua = 1 Siswa Berdasarkan NISN)
 */

import { ROLES, ROLE_CONFIG } from '../config/roles';

const SESSION_KEY = 'rapor_sd_active_session_v1';

export const AuthController = {
  /**
   * Mengambil sesi login aktif dari LocalStorage
   */
  getSession() {
    try {
      const data = localStorage.getItem(SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  /**
   * Menyimpan sesi login aktif
   */
  setSession(user) {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } catch (e) {
      console.error("Gagal menyimpan sesi login:", e);
    }
  },

  /**
   * Keluar / Logout
   */
  logout() {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (e) {
      console.error("Gagal logout:", e);
    }
  },

  /**
   * Login untuk Civitas Akademika (Admin, Kepsek, Guru)
   */
  loginCivitas(identifier, password) {
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // Cari dari daftar akun ROLE_CONFIG
    for (const [roleKey, cfg] of Object.entries(ROLE_CONFIG)) {
      if (roleKey === ROLES.WALI_MURID) continue;

      const matchEmail = cfg.email.toLowerCase() === cleanId;
      const matchRole = roleKey.toLowerCase() === cleanId;
      const matchName = cfg.nama.toLowerCase().includes(cleanId);

      if ((matchEmail || matchRole || matchName)) {
        if (!cleanPass || cleanPass === cfg.password || cleanPass === 'admin') {
          const userSession = {
            id: `USR_${roleKey.toUpperCase()}`,
            nama: cfg.nama,
            email: cfg.email,
            role: roleKey,
            roleLabel: cfg.label,
            avatar: cfg.avatar,
            badge: cfg.badge,
            loginTime: new Date().toISOString()
          };
          this.setSession(userSession);
          return { success: true, user: userSession };
        }
      }
    }

    // Default fallback jika user mengetik sembarang credential di demo
    if (cleanId) {
      const userSession = {
        id: `USR_CUSTOM`,
        nama: identifier.includes('@') ? identifier.split('@')[0] : identifier,
        email: identifier.includes('@') ? identifier : `${identifier}@alimamischool.com`,
        role: ROLES.ADMIN,
        roleLabel: 'Administrator Sekolah',
        avatar: ROLE_CONFIG[ROLES.ADMIN].avatar,
        badge: 'Staff Sekolah',
        loginTime: new Date().toISOString()
      };
      this.setSession(userSession);
      return { success: true, user: userSession };
    }

    return { success: false, message: 'Username / Email atau Password tidak valid.' };
  },

  /**
   * Login untuk Wali Murid (Strict 1 Akun = 1 Siswa Saja)
   * Login menggunakan NISN siswa
   */
  loginWaliMurid(nisnInput, passInput, siswaList = []) {
    const cleanNisn = (nisnInput || '').trim();

    if (!cleanNisn) {
      return { success: false, message: 'Silakan masukkan NISN siswa.' };
    }

    const siswa = siswaList.find(s => s.nisn === cleanNisn || s.nis === cleanNisn || s.id === cleanNisn);

    if (!siswa) {
      return {
        success: false,
        message: `NISN "${cleanNisn}" tidak terdaftar di database sekolah. Pastikan nomor yang dimasukkan benar.`
      };
    }

    // Login Sukses: Kunci sesi HANYA untuk siswa ini
    const parentSession = {
      id: `PARENT_${siswa.id}`,
      nama: `Wali Murid dari ${siswa.nama}`,
      namaAnak: siswa.nama,
      siswaId: siswa.id,
      nisn: siswa.nisn,
      role: ROLES.WALI_MURID,
      roleLabel: 'Portal Orang Tua Siswa',
      avatar: siswa.foto || ROLE_CONFIG[ROLES.WALI_MURID].avatar,
      badge: `Orang Tua: ${siswa.nama.split(' ')[0]}`,
      loginTime: new Date().toISOString()
    };

    this.setSession(parentSession);
    return { success: true, user: parentSession, siswa };
  }
};
