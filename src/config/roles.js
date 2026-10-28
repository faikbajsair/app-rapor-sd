/**
 * Role Definitions & Permission Matrix
 */

export const ROLES = {
  ADMIN: 'admin',
  KEPSEK: 'kepsek',
  WALI_KELAS: 'wali_kelas',
  GURU_MAPEL: 'guru_mapel',
  WALI_MURID: 'wali_murid'
};

export const ROLE_CONFIG = {
  [ROLES.ADMIN]: {
    label: 'Administrator Sekolah',
    badge: 'Super Admin & CMS',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Akses penuh CMS, Lisensi SaaS, Tampilan & Branding, Registrasi Siswa/Mapel, dan Backup Data.',
    defaultPath: 'cms',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  },
  [ROLES.KEPSEK]: {
    label: 'Kepala Sekolah',
    badge: 'Executive & Approval',
    color: 'bg-teal-100 text-teal-800 border-teal-300',
    description: 'Monitoring Dashboard Daya Serap, Grafik Kesukaran Soal, Approval Rapor & TTD Digital QR Code.',
    defaultPath: 'dashboard',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  [ROLES.WALI_KELAS]: {
    label: 'Guru Wali Kelas',
    badge: 'Kelas 4-A',
    color: 'bg-green-100 text-green-800 border-green-300',
    description: 'Input Presensi/Absensi, Penilaian Sikap (Auto-Narrative), Catatan Wali Kelas, Cetak Rapor & Buku Induk.',
    defaultPath: 'rapor',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'
  },
  [ROLES.GURU_MAPEL]: {
    label: 'Guru Mata Pelajaran',
    badge: 'Penilai Mapel & ABS',
    color: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    description: 'Analisis Butir Soal (ABS Dinamis), Input Nilai Formatif & Sumatif, Grafik Tingkat Kesukaran Soal.',
    defaultPath: 'nilai',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
  },
  [ROLES.WALI_MURID]: {
    label: 'Wali Murid / Orang Tua',
    badge: 'Portal Orang Tua',
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Pantau Perkembangan Akademik Anak, Grafik Nilai, Rekap Kehadiran, dan Unduh Rapor Digital.',
    defaultPath: 'portal_ortu',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'
  }
};
