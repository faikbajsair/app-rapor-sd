/**
 * Role Definitions, Permission Matrix & User Accounts
 */

export const ROLES = {
  ADMIN: 'admin',
  KEPSEK: 'kepsek',
  WALI_KELAS: 'wali_kelas',
  GURU_MAPEL: 'guru_mapel',
  GURU_QURAN: 'guru_quran',
  PENDAMPING: 'pendamping',
  WALI_MURID: 'wali_murid'
};

export const TAHUN_AJARAN_OPTIONS = [
  '2024/2025',
  '2025/2026',
  '2026/2027',
  '2027/2028',
  '2028/2029',
  '2029/2030'
];

export const SEMESTER_OPTIONS = [
  { id: 'Tengah Semester 1', label: 'Tengah Semester 1 (PTS Ganjil)', short: 'PTS 1', tipe: 'PTS' },
  { id: 'Semester 1', label: 'Semester 1 (PAS Ganjil)', short: 'PAS 1', tipe: 'PAS' },
  { id: 'Tengah Semester 2', label: 'Tengah Semester 2 (PTS Genap)', short: 'PTS 2', tipe: 'PTS' },
  { id: 'Semester 2', label: 'Semester 2 (PAS Genap - Kenaikan)', short: 'PAS 2', tipe: 'PAS' }
];

export const ROLE_CONFIG = {
  [ROLES.ADMIN]: {
    role: ROLES.ADMIN,
    label: 'Administrator Sekolah',
    badge: 'Super Admin & CMS',
    email: 'admin@alimamischool.com',
    password: 'admin',
    nama: 'Faik Bajsair (Admin IT)',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Akses penuh CMS, Lisensi SaaS, Tampilan & Branding, Registrasi Siswa/Mapel, dan Backup Data.',
    defaultPath: 'dashboard',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  },
  [ROLES.KEPSEK]: {
    role: ROLES.KEPSEK,
    label: 'Kepala Sekolah',
    badge: 'Executive & Approval',
    email: 'kepsek@alimamischool.com',
    password: 'admin',
    nama: 'Ustadz Dr. Abdullah Faqih, M.Pd.I',
    color: 'bg-teal-100 text-teal-800 border-teal-300',
    description: 'Monitoring Dashboard Daya Serap, Grafik Kesukaran Soal, Approval Rapor & TTD Digital QR Code.',
    defaultPath: 'dashboard',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  [ROLES.WALI_KELAS]: {
    role: ROLES.WALI_KELAS,
    label: 'Guru Wali Kelas',
    badge: 'Wali Kelas',
    email: 'putri.hidayah@alimamischool.com',
    password: 'admin',
    nama: 'Putri Hidayah, S.Pd',
    color: 'bg-green-100 text-green-800 border-green-300',
    description: 'Input Presensi/Absensi, Penilaian Sikap (Auto-Narrative), Catatan Wali Kelas, Cetak Rapor & Buku Induk.',
    defaultPath: 'rapor',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'
  },
  [ROLES.GURU_MAPEL]: {
    role: ROLES.GURU_MAPEL,
    label: 'Guru Mata Pelajaran',
    badge: 'Guru Penilai Mapel & ABS',
    email: 'feby.dwitri@alimamischool.com',
    password: 'admin',
    nama: 'Feby Dwitri Putri, S.Pd',
    color: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    description: 'Analisis Butir Soal (ABS Dinamis), Input Nilai Formatif & Sumatif, Grafik Tingkat Kesukaran Soal.',
    defaultPath: 'nilai',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
  },
  [ROLES.GURU_QURAN]: {
    role: ROLES.GURU_QURAN,
    label: "Guru Al-Qur'an & Kholaqoh",
    badge: 'Pembimbing Kholaqoh & Tahfidz',
    email: 'itang.setiawan@alimamischool.com',
    password: 'admin',
    nama: 'Itang Setiawan, S.Pd.I.',
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    description: "Input Nilai Tahsin (Makhraj, Tajwid, Fashahah), Tahfidz (Hafalan Surat & Juz), serta Catatan Kholaqoh Santri.",
    defaultPath: 'kholaqoh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  [ROLES.PENDAMPING]: {
    role: ROLES.PENDAMPING,
    label: 'Guru Pendamping',
    badge: 'Pendamping & Remedial',
    email: 'sofiyyah@alimamischool.com',
    password: 'admin',
    nama: 'Sofiyyah, S.Pd',
    color: 'bg-rose-100 text-rose-800 border-rose-300',
    description: 'Pendampingan belajar siswa, observasi harian, dan koordinasi dengan wali kelas.',
    defaultPath: 'dashboard',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80'
  },
  [ROLES.WALI_MURID]: {
    role: ROLES.WALI_MURID,
    label: 'Wali Murid / Orang Tua',
    badge: 'Portal Orang Tua Siswa',
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Pantau Perkembangan Akademik Anak, Grafik Nilai, Rekap Kehadiran, dan Unduh Rapor Digital.',
    defaultPath: 'portal_ortu',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  }
};
