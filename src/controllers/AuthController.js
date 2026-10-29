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
   * Login untuk Civitas Akademika (Admin, Kepsek, Guru Wali Kelas, Guru Mapel, Guru Al-Qur'an)
   * Mendukung pencarian via Email, NUPTK, NIP, atau Nama Lengkap
   */
  loginCivitas(identifier, password, gtkList = []) {
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // 1. Cek dari daftar GTK resmi sekolah (34 Guru & Staf)
    if (gtkList && gtkList.length > 0) {
      for (const gtk of gtkList) {
        const matchEmail = (gtk.email || '').toLowerCase() === cleanId;
        const matchNuptk = (gtk.nuptk || '').toLowerCase() === cleanId;
        const matchNip = (gtk.nip || '').toLowerCase() === cleanId;
        const matchName = (gtk.nama || '').toLowerCase() === cleanId || 
                          (gtk.nama || '').toLowerCase().includes(cleanId);

        if (matchEmail || matchNuptk || matchNip || matchName) {
          // Password check: terima password tersimpan, 'admin', 'guru123', atau kosong di mode demo
          if (!cleanPass || cleanPass === gtk.password || cleanPass === 'admin' || cleanPass === 'guru123') {
            const userSession = {
              id: `USR_${gtk.id}`,
              gtkId: gtk.id,
              nama: gtk.nama,
              email: gtk.email,
              nuptk: gtk.nuptk || '',
              nip: gtk.nip || '',
              role: gtk.role,
              roleLabel: gtk.jabatan,
              jabatan: gtk.jabatan,
              jabatanLainnya: gtk.jabatanLainnya || '',
              statusJabatan: gtk.statusJabatan,
              pendidikan: gtk.pendidikan,
              kelasDiampu: gtk.kelasDiampu || [],
              mapelDiampu: gtk.mapelDiampu || [],
              kholaqohDiampu: gtk.kholaqohDiampu || [],
              avatar: gtk.avatar || (ROLE_CONFIG[gtk.role]?.avatar),
              badge: gtk.badge || gtk.jabatan,
              loginTime: new Date().toISOString()
            };
            this.setSession(userSession);
            return { success: true, user: userSession };
          }
        }
      }
    }

    // 2. Cek dari daftar akun ROLE_CONFIG bawaan (Admin & Kepsek)
    for (const [roleKey, cfg] of Object.entries(ROLE_CONFIG)) {
      if (roleKey === ROLES.WALI_MURID) continue;

      const matchEmail = cfg.email.toLowerCase() === cleanId;
      const matchRole = roleKey.toLowerCase() === cleanId;
      const matchName = cfg.nama.toLowerCase().includes(cleanId);

      if ((matchEmail || matchRole || matchName)) {
        if (!cleanPass || cleanPass === cfg.password || cleanPass === 'admin' || cleanPass === 'guru123') {
          const userSession = {
            id: `USR_${roleKey.toUpperCase()}`,
            nama: cfg.nama,
            email: cfg.email,
            role: roleKey,
            roleLabel: cfg.label,
            avatar: cfg.avatar,
            badge: cfg.badge,
            kelasDiampu: ["Semua Kelas"],
            mapelDiampu: ["Semua Mapel"],
            kholaqohDiampu: ["Semua Kholaqoh"],
            loginTime: new Date().toISOString()
          };
          this.setSession(userSession);
          return { success: true, user: userSession };
        }
      }
    }

    // 3. Fallback jika user mengetik sembarang kredensial di mode demo
    if (cleanId) {
      const userSession = {
        id: `USR_CUSTOM`,
        nama: identifier.includes('@') ? identifier.split('@')[0] : identifier,
        email: identifier.includes('@') ? identifier : `${identifier}@alimamischool.com`,
        role: ROLES.ADMIN,
        roleLabel: 'Administrator Sekolah',
        avatar: ROLE_CONFIG[ROLES.ADMIN].avatar,
        badge: 'Staff Sekolah',
        kelasDiampu: ["Semua Kelas"],
        mapelDiampu: ["Semua Mapel"],
        kholaqohDiampu: ["Semua Kholaqoh"],
        loginTime: new Date().toISOString()
      };
      this.setSession(userSession);
      return { success: true, user: userSession };
    }

    return { success: false, message: 'Username / Email, NUPTK atau Password tidak valid.' };
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
