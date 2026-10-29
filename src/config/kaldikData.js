/**
 * DATA KALENDER PENDIDIKAN (KALDIK) AL-IMAM ISLAMIC SCHOOL (AI IS) T.P 2026/2027
 * Sesuai 4 Lembar Spreadsheet Resmi:
 * 1. "0. Kegiatan Terprogram"
 * 2. "1. KALDIK SD (Gabungan)"
 * 3. "KALDIK SD ( Kelas 1 S.d 5 )"
 * 4. "1. KALDIK SD (Kelas 6)"
 * 
 * Ditetapkan di: Bogor, 27 Oktober 2026
 * Kepala Sekolah: Kholid Hasan, S.Pd
 */

export const KALDIK_META = {
  sekolah: "AL IMAM ISLAMIC SCHOOL (AI IS)",
  satuanPendidikan: "SD ISLAM AL-IMAM",
  tahunPelajaran: "2026/2027",
  tempatPenetapan: "Bogor",
  tanggalPenetapan: "27 Oktober 2026",
  kepalaSekolah: "Kholid Hasan, S.Pd",
  status: "Resmi & Ditetapkan",
  kurikulum: "Kurikulum Merdeka",
  npsn: "69992481",
  alamat: "Jl. Pemuda No. 27, Kota Bogor, Jawa Barat"
};

// 4 Sheet Tabs Resmi Sesuai Spreadsheet
export const KALDIK_SHEET_TABS = [
  {
    id: "gabungan",
    sheetName: "1. KALDIK SD (Gabungan)",
    title: "Kalender Pendidikan SD (Gabungan)",
    description: "Kalender terpadu mencakup seluruh agenda akademik Fase A, B, C dan Kelas VI",
    badge: "Master Gabungan"
  },
  {
    id: "kelas_1_5",
    sheetName: "KALDIK SD ( Kelas 1 S.d 5 )",
    title: "Kalender Pendidikan Fase A, B & C (Kelas 1 s.d 5)",
    description: "Fokus pembelajaran, Kunjungan Tematik, Class Meeting, dan Asesmen Akhir Fase",
    badge: "Kelas 1-5"
  },
  {
    id: "kelas_6",
    sheetName: "1. KALDIK SD (Kelas 6)",
    title: "Kalender Pendidikan Khusus Kelas VI",
    description: "Intensif Pendalaman Materi TKA, Ujian Praktik, Pekan Tenang, US, Rihlah & Wisuda",
    badge: "Kelas 6 (Akhir Jenjang)"
  },
  {
    id: "program",
    sheetName: "0. Kegiatan Terprogram",
    title: "Rencana Kegiatan Terprogram T.P 2026/2027",
    description: "Katalog master agenda terprogram Kurikulum, Kesiswaan, Al-Qur'an, Humas & SDM",
    badge: "Agenda Terprogram"
  }
];

// Master Bulan Semester 1 (Ganjil)
export const RAW_KALDIK_SEMESTER_1 = [
  {
    id: "jul_2026",
    bulan: "Juli 2026",
    tahun: 2026,
    bulanIndex: 6,
    daysInMonth: 31,
    startDayOfWeek: 2, // 1 Juli 2026 = Rabu
    kegiatan: [
      { tgl: "09 - 10 Jul", nama: "Rapat kerja Tahun Pelajaran 2026-2027", tipe: "internal", sasaran: "Semua Guru" },
      { tgl: "11 Jul", nama: "Pertemuan Orangtua", tipe: "ortu", sasaran: "Orang Tua Siswa" },
      { tgl: "13 Jul", nama: "Awal Masuk Sekolah", tipe: "utama", sasaran: "Semua Siswa" },
      { tgl: "13 - 17 Jul", nama: "Masa Pengenalan Lingkungan Sekolah (MPLS)", tipe: "fakultatif", sasaran: "Kelas 1-6" },
      { tgl: "13 - 31 Jul", nama: "Monitoring/ supervisi proses pembelajaran kompetensi unit AI IS", tipe: "supervisi", sasaran: "Dewan Guru" }
    ],
    analisis: {
      heb: { sn: 2, sl: 2, rb: 2, km: 2, jm: 2, sb: 0, jml: 10 },
      hef: { sn: 1, sl: 1, rb: 1, km: 1, jm: 1, sb: 0, jml: 5 },
      hln: { sn: 0, sl: 0, rb: 0, km: 0, jm: 0, sb: 0, jml: 0 },
      persenHek: "13%"
    },
    specialDates: {
      "1": { tipe: "hln", note: "Libur Semester Sebelumnya" },
      "2": { tipe: "hln", note: "Libur Semester Sebelumnya" },
      "3": { tipe: "hln", note: "Libur Semester Sebelumnya" },
      "4": { tipe: "hln", note: "Libur Akhir Pekan" },
      "5": { tipe: "hln", note: "Libur Akhir Pekan" },
      "6": { tipe: "hln", note: "Libur Semester Sebelumnya" },
      "7": { tipe: "hln", note: "Libur Semester Sebelumnya" },
      "8": { tipe: "hln", note: "Libur Semester Sebelumnya" },
      "9": { tipe: "keg", note: "Rapat Kerja Guru TP 2026/2027" },
      "10": { tipe: "keg", note: "Rapat Kerja Guru TP 2026/2027" },
      "11": { tipe: "hef", note: "Pertemuan Orangtua Siswa Baru" },
      "12": { tipe: "hln", note: "Libur Akhir Pekan" },
      "13": { tipe: "hef", note: "Awal Masuk Sekolah & MPLS" },
      "14": { tipe: "hef", note: "MPLS Hari ke-2" },
      "15": { tipe: "hef", note: "MPLS Hari ke-3" },
      "16": { tipe: "hef", note: "MPLS Hari ke-4" },
      "17": { tipe: "hef", note: "MPLS Hari ke-5" },
      "18": { tipe: "hln", note: "Libur Akhir Pekan" },
      "19": { tipe: "hln", note: "Libur Akhir Pekan" },
      "25": { tipe: "hln", note: "Libur Akhir Pekan" },
      "26": { tipe: "hln", note: "Libur Akhir Pekan" }
    }
  },
  {
    id: "ags_2026",
    bulan: "Agustus 2026",
    tahun: 2026,
    bulanIndex: 7,
    daysInMonth: 31,
    startDayOfWeek: 5,
    kegiatan: [
      { tgl: "17 Ags", nama: "Libur Nasional (HUT RI)", tipe: "libur", sasaran: "Semua" },
      { tgl: "18 Ags", nama: "HUT RI (Semarak Perlombaan Kemerdekaan)", tipe: "keg", sasaran: "Semua Siswa" },
      { tgl: "25 Ags", nama: "Libur Nasional ( Maulid Nabi Muhammad SAW. )", tipe: "libur", sasaran: "Semua" },
      { tgl: "03 - 31 Ags", nama: "Pelaksanaan Sulingjar (Kepala Sekolah dan Guru semua Jenjang)", tipe: "internal", sasaran: "Kepala Sekolah & Guru" },
      { tgl: "01 - 31 Ags", nama: "Monitoring/ supervisi proses pembelajaran kompetensi unit AI IS", tipe: "supervisi", sasaran: "Guru" },
      { tgl: "01 - 31 Ags", nama: "Pelaksanaan Program Pemberian Imunisasi SD (I-II-V-VI)", tipe: "kesehatan", sasaran: "Kelas 1, 2, 5, 6" }
    ],
    analisis: {
      heb: { sn: 3, sl: 2, rb: 4, km: 4, jm: 4, sb: 0, jml: 17 },
      hef: { sn: 1, sl: 1, rb: 0, km: 0, jm: 0, sb: 0, jml: 2 },
      hln: { sn: 1, sl: 1, rb: 0, km: 0, jm: 0, sb: 0, jml: 2 },
      persenHek: "22%"
    },
    specialDates: {
      "1": { tipe: "hln", note: "Libur Akhir Pekan" },
      "2": { tipe: "hln", note: "Libur Akhir Pekan" },
      "8": { tipe: "hln", note: "Libur Akhir Pekan" },
      "9": { tipe: "hln", note: "Libur Akhir Pekan" },
      "15": { tipe: "hln", note: "Libur Akhir Pekan" },
      "16": { tipe: "hln", note: "Libur Akhir Pekan" },
      "17": { tipe: "hln", note: "Libur Nasional HUT Kemerdekaan RI ke-81" },
      "18": { tipe: "hef", note: "Peringatan & Perlombaan Semarak HUT RI" },
      "22": { tipe: "hln", note: "Libur Akhir Pekan" },
      "23": { tipe: "hln", note: "Libur Akhir Pekan" },
      "25": { tipe: "hln", note: "Libur Nasional Maulid Nabi Muhammad SAW" },
      "28": { tipe: "hef", note: "Bina Karakter Santri" },
      "29": { tipe: "hln", note: "Libur Akhir Pekan" },
      "30": { tipe: "hln", note: "Libur Akhir Pekan" }
    }
  },
  {
    id: "sep_2026",
    bulan: "September 2026",
    tahun: 2026,
    bulanIndex: 8,
    daysInMonth: 30,
    startDayOfWeek: 1,
    kegiatan: [
      { tgl: "07 - 17 Sep", nama: "Asesmen Sumatif Tengah Semester I (PTS Ganjil)", tipe: "ujian", sasaran: "Semua Siswa" },
      { tgl: "17 Sep", nama: "Festival Literasi Sekolah", tipe: "keg", sasaran: "Semua Siswa" },
      { tgl: "01 - 30 Sep", nama: "Monitoring/ supervisi proses pembelajaran kompetensi unit AI IS", tipe: "supervisi", sasaran: "Guru" }
    ],
    analisis: {
      heb: { sn: 2, sl: 3, rb: 3, km: 2, jm: 2, sb: 0, jml: 12 },
      hef: { sn: 2, sl: 2, rb: 2, km: 2, jm: 2, sb: 0, jml: 10 },
      hln: { sn: 0, sl: 0, rb: 0, km: 0, jm: 0, sb: 0, jml: 0 },
      persenHek: "15%"
    },
    specialDates: {
      "5": { tipe: "hln", note: "Libur Akhir Pekan" },
      "6": { tipe: "hln", note: "Libur Akhir Pekan" },
      "7": { tipe: "ujian", note: "Asesmen Sumatif Tengah Semester I" },
      "8": { tipe: "ujian", note: "Asesmen Sumatif Tengah Semester I" },
      "9": { tipe: "ujian", note: "Asesmen Sumatif Tengah Semester I" },
      "10": { tipe: "ujian", note: "Asesmen Sumatif Tengah Semester I" },
      "11": { tipe: "ujian", note: "Asesmen Sumatif Tengah Semester I" },
      "12": { tipe: "hln", note: "Libur Akhir Pekan" },
      "13": { tipe: "hln", note: "Libur Akhir Pekan" },
      "14": { tipe: "ujian", note: "Asesmen Sumatif Tengah Semester I" },
      "15": { tipe: "ujian", note: "Asesmen Sumatif Tengah Semester I" },
      "16": { tipe: "ujian", note: "Asesmen Sumatif Tengah Semester I" },
      "17": { tipe: "keg", note: "Festival Literasi Sekolah" },
      "19": { tipe: "hln", note: "Libur Akhir Pekan" },
      "20": { tipe: "hln", note: "Libur Akhir Pekan" },
      "26": { tipe: "hln", note: "Libur Akhir Pekan" },
      "27": { tipe: "hln", note: "Libur Akhir Pekan" }
    }
  },
  {
    id: "okt_2026",
    bulan: "Oktober 2026",
    tahun: 2026,
    bulanIndex: 9,
    daysInMonth: 31,
    startDayOfWeek: 3,
    kegiatan: [
      { tgl: "02 Okt", nama: "Pengambilan Raport (PTS Ganjil)", tipe: "rapor", sasaran: "Orang Tua Siswa" },
      { tgl: "10 Okt", nama: "Camp Pramuka", tipe: "keg", sasaran: "Siswa Kelas 3 - 6" },
      { tgl: "29 Okt", nama: "Kunjungan Edukatif", tipe: "keg", sasaran: "Siswa" },
      { tgl: "01 - 31 Okt", nama: "Monitoring/ supervisi proses pembelajaran kompetensi unit AI IS", tipe: "supervisi", sasaran: "Guru" },
      { tgl: "13, 15, 20, 22, 27 Okt", nama: "Pendalaman TKA", tipe: "kelas6", sasaran: "Khusus Siswa Kelas VI" }
    ],
    analisis: {
      heb: { sn: 4, sl: 4, rb: 4, km: 4, jm: 5, sb: 0, jml: 21 },
      hef: { sn: 0, sl: 0, rb: 0, km: 1, jm: 0, sb: 0, jml: 1 },
      hln: { sn: 0, sl: 0, rb: 0, km: 0, jm: 0, sb: 0, jml: 0 },
      persenHek: "27%"
    },
    specialDates: {
      "2": { tipe: "rapor", note: "Pengambilan Raport PTS Ganjil" },
      "3": { tipe: "hln", note: "Libur Akhir Pekan" },
      "4": { tipe: "hln", note: "Libur Akhir Pekan" },
      "10": { tipe: "keg", note: "Camp Pramuka Siaga & Penggalang" },
      "11": { tipe: "hln", note: "Libur Akhir Pekan" },
      "13": { tipe: "kelas6", note: "Pendalaman TKA Kelas 6" },
      "15": { tipe: "kelas6", note: "Pendalaman TKA Kelas 6" },
      "17": { tipe: "hln", note: "Libur Akhir Pekan" },
      "18": { tipe: "hln", note: "Libur Akhir Pekan" },
      "20": { tipe: "kelas6", note: "Pendalaman TKA Kelas 6" },
      "22": { tipe: "kelas6", note: "Pendalaman TKA Kelas 6" },
      "24": { tipe: "hln", note: "Libur Akhir Pekan" },
      "25": { tipe: "hln", note: "Libur Akhir Pekan" },
      "27": { tipe: "kelas6", note: "Pendalaman TKA Kelas 6" },
      "29": { tipe: "hef", note: "Kunjungan Edukatif Outdoor Learning" },
      "31": { tipe: "hln", note: "Libur Akhir Pekan" }
    }
  },
  {
    id: "nov_2026",
    bulan: "November 2026",
    tahun: 2026,
    bulanIndex: 10,
    daysInMonth: 30,
    startDayOfWeek: 6,
    kegiatan: [
      { tgl: "01 - 30 Nov", nama: "Monitoring/ supervisi proses pembelajaran kompetensi unit AI IS", tipe: "supervisi", sasaran: "Guru" },
      { tgl: "19 Nov", nama: "Pra-Munaqasyah", tipe: "quran", sasaran: "Santri Tahfidz" },
      { tgl: "26 Nov", nama: "Munaqasyah", tipe: "quran", sasaran: "Santri Tahfidz" },
      { tgl: "01 - 30 Nov", nama: "Pelaksanaan Program Pemberian Imunisasi SD (I-II-V-VI)", tipe: "kesehatan", sasaran: "Kelas 1, 2, 5, 6" },
      { tgl: "25 Nov", nama: "Hari Guru Nasional", tipe: "keg", sasaran: "Dewan Guru & Siswa" },
      { tgl: "3, 5, 10, 12, 17, 24 Nov", nama: "Pendalaman TKA", tipe: "kelas6", sasaran: "Khusus Siswa Kelas VI" },
      { tgl: "14 Nov", nama: "Trial Class TK B Al-Imam", tipe: "pmb", sasaran: "Calon Santri Baru" },
      { tgl: "21 Nov", nama: "Trial Class TK B Sekitar Al-Imam", tipe: "pmb", sasaran: "Calon Santri Baru" }
    ],
    analisis: {
      heb: { sn: 2, sl: 4, rb: 4, km: 4, jm: 4, sb: 0, jml: 18 },
      hef: { sn: 3, sl: 0, rb: 0, km: 0, jm: 0, sb: 0, jml: 3 },
      hln: { sn: 0, sl: 0, rb: 0, km: 0, jm: 0, sb: 0, jml: 0 },
      persenHek: "23%"
    },
    specialDates: {
      "1": { tipe: "hln", note: "Libur Akhir Pekan" },
      "3": { tipe: "kelas6", note: "Pendalaman TKA Kelas 6" },
      "5": { tipe: "kelas6", note: "Pendalaman TKA Kelas 6" },
      "7": { tipe: "hln", note: "Libur Akhir Pekan" },
      "8": { tipe: "hln", note: "Libur Akhir Pekan" },
      "10": { tipe: "kelas6", note: "Pendalaman TKA Kelas 6" },
      "12": { tipe: "kelas6", note: "Pendalaman TKA Kelas 6" },
      "14": { tipe: "keg", note: "Trial Class TK B Al-Imam" },
      "15": { tipe: "hln", note: "Libur Akhir Pekan" },
      "17": { tipe: "kelas6", note: "Pendalaman TKA Kelas 6" },
      "19": { tipe: "quran", note: "Pra-Munaqasyah Al-Qur'an" },
      "21": { tipe: "keg", note: "Trial Class TK B Sekitar Al-Imam" },
      "22": { tipe: "hln", note: "Libur Akhir Pekan" },
      "24": { tipe: "kelas6", note: "Pendalaman TKA Kelas 6" },
      "25": { tipe: "hef", note: "Hari Guru Nasional" },
      "26": { tipe: "quran", note: "Munaqasyah Al-Qur'an" },
      "28": { tipe: "hln", note: "Libur Akhir Pekan" },
      "29": { tipe: "hln", note: "Libur Akhir Pekan" },
      "30": { tipe: "ujian", note: "Awal Asesmen Sumatif Akhir Semester I (PAS)" }
    }
  },
  {
    id: "des_2026",
    bulan: "Desember 2026",
    tahun: 2026,
    bulanIndex: 11,
    daysInMonth: 31,
    startDayOfWeek: 1,
    kegiatan: [
      { tgl: "30 Nov - 11 Des", nama: "Asesmen Sumatif Akhir Semester 1 (PAS)", tipe: "ujian", sasaran: "Semua Siswa" },
      { tgl: "14 - 15 Des", nama: "Class Meeting I", tipe: "keg", sasaran: "Semua Siswa" },
      { tgl: "16 - 17 Des", nama: "Puncak Project - Gelar Aksi Karakter Siswa - Tasmi'", tipe: "keg", sasaran: "Siswa & Wali Murid" },
      { tgl: "18 Des", nama: "Try Out TKA Erlangga", tipe: "tka", sasaran: "Khusus Siswa Kelas VI" },
      { tgl: "23 Des", nama: "Penetapan rapor semester 1 - Pembagian rapor semester 1 & Parenting Orangtua", tipe: "rapor", sasaran: "Orang Tua Siswa" },
      { tgl: "24 - 25 Des", nama: "Libur Nasional (Natal)", tipe: "libur", sasaran: "Semua" },
      { tgl: "28 Des - 08 Jan", nama: "Libur semester 1", tipe: "libur", sasaran: "Semua Siswa" }
    ],
    analisis: {
      heb: { sn: 0, sl: 0, rb: 0, km: 0, jm: 0, sb: 0, jml: 0 },
      hef: { sn: 3, sl: 4, rb: 3, km: 3, jm: 3, sb: 0, jml: 16 },
      hln: { sn: 0, sl: 0, rb: 0, km: 1, jm: 1, sb: 0, jml: 2 },
      persenHek: "0%"
    },
    specialDates: {
      "1": { tipe: "ujian", note: "PAS Ganjil Hari ke-2" },
      "2": { tipe: "ujian", note: "PAS Ganjil Hari ke-3" },
      "3": { tipe: "ujian", note: "PAS Ganjil Hari ke-4" },
      "4": { tipe: "ujian", note: "PAS Ganjil Hari ke-5" },
      "5": { tipe: "hln", note: "Libur Akhir Pekan" },
      "6": { tipe: "hln", note: "Libur Akhir Pekan" },
      "7": { tipe: "ujian", note: "PAS Ganjil Hari ke-6" },
      "8": { tipe: "ujian", note: "PAS Ganjil Hari ke-7" },
      "9": { tipe: "ujian", note: "PAS Ganjil Hari ke-8" },
      "10": { tipe: "ujian", note: "PAS Ganjil Hari ke-9" },
      "11": { tipe: "ujian", note: "Akhir PAS Ganjil" },
      "12": { tipe: "hln", note: "Libur Akhir Pekan" },
      "13": { tipe: "hln", note: "Libur Akhir Pekan" },
      "14": { tipe: "hef", note: "Class Meeting I" },
      "15": { tipe: "hef", note: "Class Meeting I" },
      "16": { tipe: "hef", note: "Puncak Project - Gelar Aksi Karakter - Tasmi'" },
      "17": { tipe: "hef", note: "Puncak Project - Gelar Aksi Karakter - Tasmi'" },
      "18": { tipe: "tka", note: "Try Out TKA Erlangga (Kelas 6)" },
      "19": { tipe: "hln", note: "Libur Akhir Pekan" },
      "20": { tipe: "hln", note: "Libur Akhir Pekan" },
      "21": { tipe: "hef", note: "Pengolahan & Verifikasi Nilai Rapor" },
      "22": { tipe: "hef", note: "Finalisasi Cetak Rapor Digital" },
      "23": { tipe: "rapor", note: "Penetapan Rapor & Pembagian Rapor Semester 1 + Parenting" },
      "24": { tipe: "hln", note: "Cuti Bersama Hari Raya Natal" },
      "25": { tipe: "hln", note: "Libur Nasional Natal" },
      "26": { tipe: "hln", note: "Libur Akhir Pekan" },
      "27": { tipe: "hln", note: "Libur Akhir Pekan" },
      "28": { tipe: "hln", note: "Libur Semester 1" },
      "29": { tipe: "hln", note: "Libur Semester 1" },
      "30": { tipe: "hln", note: "Libur Semester 1" },
      "31": { tipe: "hln", note: "Libur Semester 1" }
    }
  }
];

// Master Bulan Semester 2 (Genap)
export const RAW_KALDIK_SEMESTER_2 = [
  {
    id: "jan_2027",
    bulan: "Januari 2027",
    tahun: 2027,
    bulanIndex: 0,
    daysInMonth: 31,
    startDayOfWeek: 4, // 1 Jan 2027 = Jumat
    kegiatan: [
      { tgl: "06 - 08 Jan", nama: "Rapat Kerja II", tipe: "internal", sasaran: "Dewan Guru" },
      { tgl: "11 Jan", nama: "Awal masuk Semester II", tipe: "utama", sasaran: "Semua Siswa" },
      { tgl: "11 - 15 Jan", nama: "Pare Joyfull English Experience", tipe: "keg", sasaran: "Santri Program Khusus" },
      { tgl: "11 - 31 Jan", nama: "Monitoring/ supervisi proses pembelajaran kompetensi unit AI IS", tipe: "supervisi", sasaran: "Guru" },
      { tgl: "25 Jan", nama: "Try Out TKA dengan Nurul Fikri", tipe: "tka", sasaran: "Khusus Siswa Kelas VI" },
      { tgl: "27 - 28 Jan", nama: "Al-Quran Camp", tipe: "quran", sasaran: "Santri Tahfidz" },
      { tgl: "19, 21, 22, 26, 29 Jan", nama: "Pendalaman Materi Kelas 6", tipe: "kelas6", sasaran: "Khusus Siswa Kelas VI" }
    ],
    analisis: {
      heb: { sn: 3, sl: 3, rb: 3, km: 3, jm: 0, sb: 0, jml: 12 },
      hef: { sn: 1, sl: 0, rb: 0, km: 0, jm: 2, sb: 0, jml: 3 },
      hln: { sn: 0, sl: 0, rb: 0, km: 0, jm: 1, sb: 0, jml: 1 },
      persenHek: "17%"
    },
    specialDates: {
      "1": { tipe: "hln", note: "Tahun Baru Masehi 2027" },
      "2": { tipe: "hln", note: "Libur Akhir Pekan" },
      "3": { tipe: "hln", note: "Libur Akhir Pekan" },
      "4": { tipe: "hln", note: "Libur Semester 1" },
      "5": { tipe: "hln", note: "Libur Semester 1" },
      "6": { tipe: "internal", note: "Rapat Kerja II Semester Genap" },
      "7": { tipe: "internal", note: "Rapat Kerja II Semester Genap" },
      "8": { tipe: "internal", note: "Rapat Kerja II Semester Genap" },
      "9": { tipe: "hln", note: "Libur Akhir Pekan" },
      "10": { tipe: "hln", note: "Libur Akhir Pekan" },
      "11": { tipe: "utama", note: "Awal Masuk Pembelajaran Semester II" },
      "16": { tipe: "hln", note: "Libur Akhir Pekan" },
      "17": { tipe: "hln", note: "Libur Akhir Pekan" },
      "19": { tipe: "kelas6", note: "Pendalaman Materi Kelas 6" },
      "21": { tipe: "kelas6", note: "Pendalaman Materi Kelas 6" },
      "22": { tipe: "kelas6", note: "Pendalaman Materi Kelas 6" },
      "23": { tipe: "hln", note: "Libur Akhir Pekan" },
      "24": { tipe: "hln", note: "Libur Akhir Pekan" },
      "25": { tipe: "tka", note: "Try Out TKA dengan Nurul Fikri" },
      "26": { tipe: "kelas6", note: "Pendalaman Materi Kelas 6" },
      "27": { tipe: "quran", note: "Al-Qur'an Camp Santri" },
      "28": { tipe: "quran", note: "Al-Qur'an Camp Santri" },
      "29": { tipe: "kelas6", note: "Pendalaman Materi Kelas 6" },
      "30": { tipe: "hln", note: "Libur Akhir Pekan" },
      "31": { tipe: "hln", note: "Libur Akhir Pekan" }
    }
  },
  {
    id: "feb_2027",
    bulan: "Februari 2027",
    tahun: 2027,
    bulanIndex: 1,
    daysInMonth: 28,
    startDayOfWeek: 0, // 1 Feb 2027 = Senin
    kegiatan: [
      { tgl: "08 - 12 Feb", nama: "Perkiraan Libur Awal Ramadhan 1448 H", tipe: "ramadhan", sasaran: "Semua" },
      { tgl: "15 Feb - 05 Mart", nama: "Kegiatan KBM Bulan Ramadhan 1448 H", tipe: "ramadhan", sasaran: "Semua Siswa" },
      { tgl: "01 - 26 Feb", nama: "Monitoring/ supervisi proses pembelajaran kompetensi unit AI IS", tipe: "supervisi", sasaran: "Guru" },
      { tgl: "24 - 26 Feb", nama: "Ramadhan Mubarak", tipe: "ramadhan", sasaran: "Santri & Guru" },
      { tgl: "02, 04, 05 Feb", nama: "Pendalaman Materi Kelas 6", tipe: "kelas6", sasaran: "Khusus Siswa Kelas VI" }
    ],
    analisis: {
      heb: { sn: 3, sl: 3, rb: 4, km: 4, jm: 4, sb: 0, jml: 18 },
      hef: { sn: 0, sl: 0, rb: 0, km: 0, jm: 0, sb: 0, jml: 0 },
      hln: { sn: 0, sl: 0, rb: 0, km: 0, jm: 0, sb: 0, jml: 0 },
      persenHek: "25%"
    },
    specialDates: {
      "2": { tipe: "kelas6", note: "Pendalaman Materi Kelas 6" },
      "4": { tipe: "kelas6", note: "Pendalaman Materi Kelas 6" },
      "5": { tipe: "kelas6", note: "Pendalaman Materi Kelas 6" },
      "6": { tipe: "hln", note: "Libur Akhir Pekan" },
      "7": { tipe: "hln", note: "Libur Akhir Pekan" },
      "8": { tipe: "ramadhan", note: "Perkiraan Libur Awal Ramadhan 1448 H" },
      "9": { tipe: "ramadhan", note: "Perkiraan Libur Awal Ramadhan 1448 H" },
      "10": { tipe: "ramadhan", note: "Perkiraan Libur Awal Ramadhan 1448 H" },
      "11": { tipe: "ramadhan", note: "Perkiraan Libur Awal Ramadhan 1448 H" },
      "12": { tipe: "ramadhan", note: "Perkiraan Libur Awal Ramadhan 1448 H" },
      "13": { tipe: "hln", note: "Libur Akhir Pekan" },
      "14": { tipe: "hln", note: "Libur Akhir Pekan" },
      "15": { tipe: "ramadhan", note: "Awal KBM Bulan Ramadhan 1448 H" },
      "20": { tipe: "hln", note: "Libur Akhir Pekan" },
      "21": { tipe: "hln", note: "Libur Akhir Pekan" },
      "24": { tipe: "ramadhan", note: "Ramadhan Mubarak" },
      "25": { tipe: "ramadhan", note: "Ramadhan Mubarak" },
      "26": { tipe: "ramadhan", note: "Ramadhan Mubarak" },
      "27": { tipe: "hln", note: "Libur Akhir Pekan" },
      "28": { tipe: "hln", note: "Libur Akhir Pekan" }
    }
  },
  {
    id: "mar_2027",
    bulan: "Maret 2027",
    tahun: 2027,
    bulanIndex: 2,
    daysInMonth: 31,
    startDayOfWeek: 0,
    kegiatan: [
      { tgl: "11 Feb - 05 Mart", nama: "Kegiatan KBM Bulan Ramadhan 1448 H", tipe: "ramadhan", sasaran: "Semua Siswa" },
      { tgl: "09 Mart", nama: "Libur Nasional ( Hari Raya Nyepi )", tipe: "libur", sasaran: "Semua" },
      { tgl: "08 - 19 Mart", nama: "Perkiraan Hari raya Idhul Fitri 1448 H", tipe: "libur", sasaran: "Semua" },
      { tgl: "22 Mart", nama: "Awal masuk setelah libur Idhul Fitri 1448 H", tipe: "utama", sasaran: "Semua Siswa" },
      { tgl: "19 - 31 Mart", nama: "Perkiraan Tes Kemampuan Akademik SD/Paket A", tipe: "tka", sasaran: "Siswa Kelas VI" },
      { tgl: "29 Mar - 09 Apr", nama: "Asesmen Sumatif Tengah Semester II", tipe: "ujian", sasaran: "Semua Siswa" },
      { tgl: "01 - 31 Mart", nama: "Monitoring/ supervisi proses pembelajaran kompetensi unit AI IS", tipe: "supervisi", sasaran: "Guru" }
    ],
    analisis: {
      heb: { sn: 2, sl: 2, rb: 1, km: 1, jm: 1, sb: 0, jml: 7 },
      hef: { sn: 1, sl: 1, rb: 1, km: 0, jm: 0, sb: 0, jml: 3 },
      hln: { sn: 2, sl: 2, rb: 2, km: 2, jm: 2, sb: 0, jml: 10 },
      persenHek: "10%"
    },
    specialDates: {
      "6": { tipe: "hln", note: "Libur Akhir Pekan" },
      "7": { tipe: "hln", note: "Libur Akhir Pekan" },
      "8": { tipe: "hln", note: "Libur Menjelang Idul Fitri 1448 H" },
      "9": { tipe: "hln", note: "Libur Nasional Hari Raya Nyepi & Idul Fitri" },
      "10": { tipe: "hln", note: "Hari Raya Idul Fitri 1448 H" },
      "11": { tipe: "hln", note: "Hari Raya Idul Fitri 1448 H" },
      "12": { tipe: "hln", note: "Cuti Bersama Hari Raya Idul Fitri" },
      "13": { tipe: "hln", note: "Libur Akhir Pekan" },
      "14": { tipe: "hln", note: "Libur Akhir Pekan" },
      "15": { tipe: "hln", note: "Cuti Bersama Idul Fitri" },
      "16": { tipe: "hln", note: "Cuti Bersama Idul Fitri" },
      "17": { tipe: "hln", note: "Cuti Bersama Idul Fitri" },
      "18": { tipe: "hln", note: "Cuti Bersama Idul Fitri" },
      "19": { tipe: "hln", note: "Cuti Bersama Idul Fitri" },
      "20": { tipe: "hln", note: "Libur Akhir Pekan" },
      "21": { tipe: "hln", note: "Libur Akhir Pekan" },
      "22": { tipe: "utama", note: "Awal Masuk Pembelajaran Setelah Idul Fitri" },
      "27": { tipe: "hln", note: "Libur Akhir Pekan" },
      "28": { tipe: "hln", note: "Libur Akhir Pekan" },
      "29": { tipe: "ujian", note: "Asesmen Sumatif Tengah Semester II (PTS Genap)" },
      "30": { tipe: "ujian", note: "Asesmen Sumatif Tengah Semester II (PTS Genap)" },
      "31": { tipe: "ujian", note: "Asesmen Sumatif Tengah Semester II (PTS Genap)" }
    }
  },
  {
    id: "apr_2027",
    bulan: "April 2027",
    tahun: 2027,
    bulanIndex: 3,
    daysInMonth: 30,
    startDayOfWeek: 3,
    kegiatan: [
      { tgl: "29 Mar - 09 Apr", nama: "Asesmen Sumatif Tengah Semester II", tipe: "ujian", sasaran: "Semua Siswa" },
      { tgl: "12 - 20 Apr", nama: "Perkiraan Ujian Praktek Kelas VI", tipe: "kelas6", sasaran: "Siswa Kelas VI" },
      { tgl: "22 Apr", nama: "Kunjungan Tematik", tipe: "keg", sasaran: "Khusus Siswa Kelas 1 - 5" },
      { tgl: "26 Apr", nama: "Libur Nasional (wafat Isa Almasih)", tipe: "libur", sasaran: "Semua" },
      { tgl: "01 - 30 Apr", nama: "Pelaksanaan LKS Tk. Kabupaten/Kota", tipe: "lomba", sasaran: "Santri Terpilih" },
      { tgl: "01 - 30 Apr", nama: "Monitoring/ supervisi proses pembelajaran kompetensi unit AI IS", tipe: "supervisi", sasaran: "Guru" },
      { tgl: "21 - 23 Apr", nama: "Pekan tenang", tipe: "pekan_tenang", sasaran: "Khusus Siswa Kelas VI" }
    ],
    analisis: {
      heb: { sn: 3, sl: 3, rb: 3, km: 2, jm: 3, sb: 0, jml: 14 },
      hef: { sn: 1, sl: 1, rb: 1, km: 3, jm: 2, sb: 0, jml: 8 },
      hln: { sn: 0, sl: 0, rb: 0, km: 0, jm: 0, sb: 0, jml: 0 },
      persenHek: "19%"
    },
    specialDates: {
      "1": { tipe: "ujian", note: "Asesmen Sumatif Tengah Semester II" },
      "2": { tipe: "ujian", note: "Asesmen Sumatif Tengah Semester II" },
      "3": { tipe: "hln", note: "Libur Akhir Pekan" },
      "4": { tipe: "hln", note: "Libur Akhir Pekan" },
      "5": { tipe: "ujian", note: "Asesmen Sumatif Tengah Semester II" },
      "6": { tipe: "ujian", note: "Asesmen Sumatif Tengah Semester II" },
      "7": { tipe: "ujian", note: "Asesmen Sumatif Tengah Semester II" },
      "8": { tipe: "ujian", note: "Asesmen Sumatif Tengah Semester II" },
      "9": { tipe: "ujian", note: "Akhir PTS Genap" },
      "10": { tipe: "hln", note: "Libur Akhir Pekan" },
      "11": { tipe: "hln", note: "Libur Akhir Pekan" },
      "12": { tipe: "kelas6", note: "Perkiraan Ujian Praktek Kelas VI" },
      "13": { tipe: "kelas6", note: "Perkiraan Ujian Praktek Kelas VI" },
      "14": { tipe: "kelas6", note: "Perkiraan Ujian Praktek Kelas VI" },
      "15": { tipe: "kelas6", note: "Perkiraan Ujian Praktek Kelas VI" },
      "16": { tipe: "kelas6", note: "Perkiraan Ujian Praktek Kelas VI" },
      "17": { tipe: "hln", note: "Libur Akhir Pekan" },
      "18": { tipe: "hln", note: "Libur Akhir Pekan" },
      "19": { tipe: "kelas6", note: "Perkiraan Ujian Praktek Kelas VI" },
      "20": { tipe: "kelas6", note: "Perkiraan Ujian Praktek Kelas VI" },
      "21": { tipe: "pekan_tenang", note: "Pekan Tenang Menjelang US (Kelas 6)" },
      "22": { tipe: "pekan_tenang", note: "Pekan Tenang (Kls 6) / Kunjungan Tematik (Kls 1-5)" },
      "23": { tipe: "pekan_tenang", note: "Pekan Tenang Menjelang US (Kelas 6)" },
      "24": { tipe: "hln", note: "Libur Akhir Pekan" },
      "25": { tipe: "hln", note: "Libur Akhir Pekan" },
      "26": { tipe: "hln", note: "Libur Nasional (Wafat Isa Almasih)" }
    }
  },
  {
    id: "mei_2027",
    bulan: "Mei 2027",
    tahun: 2027,
    bulanIndex: 4,
    daysInMonth: 31,
    startDayOfWeek: 5,
    kegiatan: [
      { tgl: "01 Mei", nama: "Pengambilan Raport (PTS Genap)", tipe: "rapor", sasaran: "Orang Tua Siswa" },
      { tgl: "02 Mei", nama: "Hari Pendidikan Nasional", tipe: "keg", sasaran: "Semua" },
      { tgl: "06 Mei", nama: "Libur Nasional (Kenaikan Isa Almasih)", tipe: "libur", sasaran: "Semua" },
      { tgl: "03 - 14 Mei", nama: "Perkiraan Asesmen Sumatif Akhir Jenjang SD VI (Perkiraan US)", tipe: "ujian", sasaran: "Khusus Siswa Kelas VI" },
      { tgl: "17 Mei", nama: "Perkiraan hari raya Idul Adha 1448 H", tipe: "libur", sasaran: "Semua" },
      { tgl: "18 - 20 Mei", nama: "Perkiraan Hari Tasyriq'", tipe: "libur", sasaran: "Semua" },
      { tgl: "24 Mei", nama: "Pra-Munaqasyah", tipe: "quran", sasaran: "Santri Tahfidz" },
      { tgl: "27 Mei", nama: "Rihlah Kelas VI", tipe: "kelas6", sasaran: "Khusus Siswa Kelas VI" },
      { tgl: "31 Mei", nama: "Munaqasyah", tipe: "quran", sasaran: "Santri Tahfidz" },
      { tgl: "01 - 31 Mei", nama: "Pelaksanaan O2SN, FLS2N Tk. Kab,'Kota", tipe: "lomba", sasaran: "Santri Berprestasi" }
    ],
    analisis: {
      heb: { sn: 2, sl: 3, rb: 4, km: 4, jm: 4, sb: 0, jml: 17 },
      hef: { sn: 2, sl: 0, rb: 0, km: 0, jm: 0, sb: 0, jml: 2 },
      hln: { sn: 1, sl: 1, rb: 0, km: 0, jm: 0, sb: 0, jml: 2 },
      persenHek: "24%"
    },
    specialDates: {
      "1": { tipe: "rapor", note: "Pengambilan Raport PTS Genap" },
      "2": { tipe: "hln", note: "Hardiknas / Libur Akhir Pekan" },
      "3": { tipe: "ujian", note: "Perkiraan US / Asesmen Akhir Jenjang SD VI" },
      "4": { tipe: "ujian", note: "Perkiraan US / Asesmen Akhir Jenjang SD VI" },
      "5": { tipe: "ujian", note: "Perkiraan US / Asesmen Akhir Jenjang SD VI" },
      "6": { tipe: "hln", note: "Libur Nasional (Kenaikan Isa Almasih)" },
      "7": { tipe: "ujian", note: "Perkiraan US / Asesmen Akhir Jenjang SD VI" },
      "8": { tipe: "hln", note: "Libur Akhir Pekan" },
      "9": { tipe: "hln", note: "Libur Akhir Pekan" },
      "10": { tipe: "ujian", note: "Perkiraan US / Asesmen Akhir Jenjang SD VI" },
      "11": { tipe: "ujian", note: "Perkiraan US / Asesmen Akhir Jenjang SD VI" },
      "12": { tipe: "ujian", note: "Perkiraan US / Asesmen Akhir Jenjang SD VI" },
      "13": { tipe: "ujian", note: "Perkiraan US / Asesmen Akhir Jenjang SD VI" },
      "14": { tipe: "ujian", note: "Akhir Ujian Sekolah (US) Kelas 6" },
      "15": { tipe: "hln", note: "Libur Akhir Pekan" },
      "16": { tipe: "hln", note: "Libur Akhir Pekan" },
      "17": { tipe: "hln", note: "Perkiraan Hari Raya Idul Adha 1448 H" },
      "18": { tipe: "hln", note: "Perkiraan Hari Tasyriq'" },
      "19": { tipe: "hln", note: "Perkiraan Hari Tasyriq'" },
      "20": { tipe: "hln", note: "Perkiraan Hari Tasyriq'" },
      "22": { tipe: "hln", note: "Libur Akhir Pekan" },
      "23": { tipe: "hln", note: "Libur Akhir Pekan" },
      "24": { tipe: "quran", note: "Pra-Munaqasyah Al-Qur'an" },
      "27": { tipe: "rihlah", note: "Rihlah Edukatif Kelas VI" },
      "29": { tipe: "hln", note: "Libur Akhir Pekan" },
      "30": { tipe: "hln", note: "Libur Akhir Pekan" },
      "31": { tipe: "quran", note: "Munaqasyah Al-Qur'an" }
    }
  },
  {
    id: "jun_2027",
    bulan: "Juni 2027",
    tahun: 2027,
    bulanIndex: 5,
    daysInMonth: 30,
    startDayOfWeek: 1,
    kegiatan: [
      { tgl: "01 Jun", nama: "Libur Nasional ( lahir Pancasila)", tipe: "libur", sasaran: "Semua" },
      { tgl: "01 Jun", nama: "Perkiraan Penetapan Kelulusan Kelas VI", tipe: "kelas6", sasaran: "Siswa & Ortu Kelas VI" },
      { tgl: "02 - 11 Jun", nama: "Perkiraan Asesmen Sumatif Akhir Tahun/Akhir Fase", tipe: "ujian", sasaran: "Siswa Kelas 1 - 5" },
      { tgl: "16 - 18 Jun", nama: "Class Meeting", tipe: "keg", sasaran: "Siswa Kelas 1 - 5" },
      { tgl: "22 Jun", nama: "Perkiraan Wisuda", tipe: "wisuda", sasaran: "Santri & Wali Santri Kelas VI" },
      { tgl: "24 Jun", nama: "Perkiraan Panggung Huffadz", tipe: "quran", sasaran: "Santri Tahfidz Terbaik" },
      { tgl: "25 Jun", nama: "Penetapan rapor semester 2", tipe: "rapor", sasaran: "Dewan Guru" },
      { tgl: "26 Juni", nama: "Pengambilan Raport & Parenting Orangtua", tipe: "rapor", sasaran: "Orang Tua Siswa" },
      { tgl: "28 Juni - 9 Juli", nama: "Libur Akhir Tahun Pelajaran", tipe: "libur", sasaran: "Semua Siswa" }
    ],
    analisis: {
      heb: { sn: 0, sl: 0, rb: 1, km: 1, jm: 2, sb: 0, jml: 4 },
      hef: { sn: 3, sl: 3, rb: 3, km: 3, jm: 2, sb: 0, jml: 14 },
      hln: { sn: 1, sl: 2, rb: 1, km: 0, jm: 0, sb: 0, jml: 4 },
      persenHek: "6%"
    },
    specialDates: {
      "1": { tipe: "hln", note: "Hari Lahir Pancasila & Penetapan Kelulusan Kls 6" },
      "2": { tipe: "ujian", note: "Asesmen Sumatif Akhir Tahun (PAT) Hari ke-1" },
      "3": { tipe: "ujian", note: "Asesmen Sumatif Akhir Tahun (PAT) Hari ke-2" },
      "4": { tipe: "ujian", note: "Asesmen Sumatif Akhir Tahun (PAT) Hari ke-3" },
      "5": { tipe: "hln", note: "Libur Akhir Pekan" },
      "6": { tipe: "hln", note: "Libur Akhir Pekan" },
      "7": { tipe: "ujian", note: "Asesmen Sumatif Akhir Tahun (PAT) Hari ke-4" },
      "8": { tipe: "ujian", note: "Asesmen Sumatif Akhir Tahun (PAT) Hari ke-5" },
      "9": { tipe: "ujian", note: "Asesmen Sumatif Akhir Tahun (PAT) Hari ke-6" },
      "10": { tipe: "ujian", note: "Asesmen Sumatif Akhir Tahun (PAT) Hari ke-7" },
      "11": { tipe: "ujian", note: "Akhir PAT Kenaikan Kelas" },
      "12": { tipe: "hln", note: "Libur Akhir Pekan" },
      "13": { tipe: "hln", note: "Libur Akhir Pekan" },
      "16": { tipe: "hef", note: "Class Meeting Semester Genap" },
      "17": { tipe: "hef", note: "Class Meeting Semester Genap" },
      "18": { tipe: "hef", note: "Class Meeting Semester Genap" },
      "19": { tipe: "hln", note: "Libur Akhir Pekan" },
      "20": { tipe: "hln", note: "Libur Akhir Pekan" },
      "22": { tipe: "wisuda", note: "Perkiraan Wisuda & Pelepasan Kelas VI" },
      "24": { tipe: "quran", note: "Perkiraan Panggung Huffadz Al-Qur'an" },
      "25": { tipe: "rapor", note: "Penetapan Rapor Semester 2" },
      "26": { tipe: "rapor", note: "Pengambilan Raport & Parenting Orangtua" },
      "27": { tipe: "hln", note: "Libur Akhir Pekan" },
      "28": { tipe: "hln", note: "Libur Akhir Tahun Pelajaran" },
      "29": { tipe: "hln", note: "Libur Akhir Tahun Pelajaran" },
      "30": { tipe: "hln", note: "Libur Akhir Tahun Pelajaran" }
    }
  }
];

// Helper: Filter & sesuaikan Kaldik berdasarkan Tab / Jenjang
export function getKaldikSemester(semesterNum, sheetId = 'gabungan') {
  const rawMonths = semesterNum === 1 ? RAW_KALDIK_SEMESTER_1 : RAW_KALDIK_SEMESTER_2;

  return rawMonths.map((m) => {
    let filteredKegiatan = [...m.kegiatan];
    let customSpecialDates = { ...m.specialDates };

    if (sheetId === 'kelas_1_5') {
      // Saring agenda khusus kelas 6 yang tidak relevan untuk kelas 1-5
      filteredKegiatan = filteredKegiatan.filter(
        (k) => k.tipe !== 'kelas6' && k.tipe !== 'tka' && k.tipe !== 'pekan_tenang' && k.tipe !== 'rihlah' && k.tipe !== 'wisuda'
      );
      // Tanggal 21-23 April di kelas 1-5 adalah hari biasa (bukan pekan tenang merah)
      if (m.id === 'apr_2027') {
        customSpecialDates = { ...m.specialDates };
        delete customSpecialDates['21'];
        customSpecialDates['22'] = { tipe: 'hef', note: 'Kunjungan Tematik Kelas 1-5' };
        delete customSpecialDates['23'];
      }
      // Tanggal 22 Juni tidak ada wisuda untuk kelas 1-5
      if (m.id === 'jun_2027') {
        customSpecialDates = { ...m.specialDates };
        delete customSpecialDates['22'];
      }
    } else if (sheetId === 'kelas_6') {
      // Saring agenda khusus kelas 1-5 (Kunjungan Tematik, Class Meeting Juni, dsb)
      if (m.id === 'apr_2027') {
        filteredKegiatan = filteredKegiatan.filter((k) => k.nama !== 'Kunjungan Tematik');
        // Tanggal 21, 22, 23 April diwarnai MERAH (Pekan Tenang) seperti pada sheet Kelas 6
        customSpecialDates = {
          ...m.specialDates,
          '21': { tipe: 'hln', note: 'Pekan Tenang Menjelang Ujian Sekolah' },
          '22': { tipe: 'hln', note: 'Pekan Tenang Menjelang Ujian Sekolah' },
          '23': { tipe: 'hln', note: 'Pekan Tenang Menjelang Ujian Sekolah' }
        };
      }
      if (m.id === 'mei_2027') {
        // Pada sheet kelas 6, asesmen akhir jenjang disebut "Perkiraan US"
        filteredKegiatan = filteredKegiatan.map((k) => 
          k.tgl === '03 - 14 Mei' ? { ...k, nama: 'Perkiraan US (Ujian Sekolah)' } : k
        );
      }
      if (m.id === 'jun_2027') {
        // Kelas 6 tidak ada Asesmen Akhir Fase (PAT) dan Class Meeting
        filteredKegiatan = filteredKegiatan.filter(
          (k) => !k.nama.includes('Asesmen Sumatif Akhir Tahun') && !k.nama.includes('Class Meeting') && !k.nama.includes('Libur Akhir Tahun')
        );
        // Wisuda 22 Juni ditonjolkan
        customSpecialDates = {
          ...m.specialDates,
          '22': { tipe: 'wisuda', note: 'Perkiraan Wisuda Kelulusan Santri Kelas VI' }
        };
      }
    }

    return {
      ...m,
      kegiatan: filteredKegiatan,
      specialDates: customSpecialDates
    };
  });
}

// Backward-compatibility exports
export const KALDIK_SEMESTER_1 = RAW_KALDIK_SEMESTER_1;
export const KALDIK_SEMESTER_2 = RAW_KALDIK_SEMESTER_2;

// REKAPITULASI RESMI ANALISIS HARI EFEKTIF BELAJAR (HEK)
export const REKAP_ANALISIS_HEK = {
  semester1: {
    label: "Semester 1 (Ganjil)",
    totalHEB: 78,
    totalHEF: 37,
    totalHLN: 4,
    months: [
      { nama: "Juli 2026", heb: 10, hef: 5, hln: 0, persen: "13%" },
      { nama: "Agustus 2026", heb: 17, hef: 2, hln: 2, persen: "22%" },
      { nama: "September 2026", heb: 12, hef: 10, hln: 0, persen: "15%" },
      { nama: "Oktober 2026", heb: 21, hef: 1, hln: 0, persen: "27%" },
      { nama: "November 2026", heb: 18, hef: 3, hln: 0, persen: "23%" },
      { nama: "Desember 2026", heb: 0, hef: 16, hln: 2, persen: "0%" }
    ]
  },
  semester2: {
    label: "Semester 2 (Genap)",
    totalHEB: 72,
    totalHEF: 30,
    totalHLN: 17,
    months: [
      { nama: "Januari 2027", heb: 12, hef: 3, hln: 1, persen: "17%" },
      { nama: "Februari 2027", heb: 18, hef: 0, hln: 0, persen: "25%" },
      { nama: "Maret 2027", heb: 7, hef: 3, hln: 10, persen: "10%" },
      { nama: "April 2027", heb: 14, hef: 8, hln: 0, persen: "19%" },
      { nama: "Mei 2027", heb: 17, hef: 2, hln: 2, persen: "24%" },
      { nama: "Juni 2027", heb: 4, hef: 14, hln: 4, persen: "6%" }
    ]
  },
  tahunan: {
    heb: 150,
    hef: 67,
    hln: 21
  }
};

// MASTER TABEL "0. Kegiatan Terprogram" - Rencana Kerja Terstruktur Sekolah
export const DAFTAR_KEGIATAN_TERPROGRAM = [
  // SEMESTER 1
  {
    no: 1,
    semester: "Semester 1",
    bulan: "Juli 2026",
    tanggal: "09 - 10 Juli 2026",
    namaKegiatan: "Rapat Kerja (Raker) Awal Tahun Pelajaran 2026/2027",
    kategori: "GTK & Manajemen",
    sasaran: "Pimpinan & Dewan Guru (34 GTK)",
    pj: "Kepala Sekolah & Waka Kurikulum",
    status: "Terjadwal",
    keterangan: "Penyusunan RPP/Modul Ajar, Pembagian Tugas KBM, Sosialisasi Kaldik & Target Mutu"
  },
  {
    no: 2,
    semester: "Semester 1",
    bulan: "Juli 2026",
    tanggal: "11 Juli 2026",
    namaKegiatan: "Pertemuan Orang Tua / Sosialisasi Awal Tahun",
    kategori: "Humas & Parenting",
    sasaran: "Wali Murid Kelas I s.d VI",
    pj: "Waka Kesiswaan & Komite Sekolah",
    status: "Terjadwal",
    keterangan: "Sosialisasi tata tertib, kalender akademik, program tahfidz Al-Qur'an & komite"
  },
  {
    no: 3,
    semester: "Semester 1",
    bulan: "Juli 2026",
    tanggal: "13 Juli 2026",
    namaKegiatan: "Hari Pertama Masuk Sekolah & KBM Semester Ganjil",
    kategori: "Kurikulum",
    sasaran: "Seluruh Santri & GTK",
    pj: "Kurikulum & Seluruh Guru",
    status: "Terjadwal",
    keterangan: "Apel pembukaan tahun ajaran baru 2026/2027"
  },
  {
    no: 4,
    semester: "Semester 1",
    bulan: "Juli 2026",
    tanggal: "13 - 17 Juli 2026",
    namaKegiatan: "Masa Pengenalan Lingkungan Sekolah (MPLS) Ramah Anak",
    kategori: "Kesiswaan",
    sasaran: "Santri Baru Kelas I & Adaptasi Kelas II-VI",
    pj: "Tim Kesiswaan & Wali Kelas I",
    status: "Terjadwal",
    keterangan: "Pengenalan adab, lingkungan sekolah islami, sarana prasarana, dan guru"
  },
  {
    no: 5,
    semester: "Semester 1",
    bulan: "Juli - Nov 2026",
    tanggal: "13 Jul - 30 Nov 2026",
    namaKegiatan: "Supervisi Klinis & Monitoring KBM Unit AI IS",
    kategori: "GTK & Manajemen",
    sasaran: "Guru Mapel, Wali Kelas & Guru Al-Qur'an",
    pj: "Kepala Sekolah & Tim Supervisi",
    status: "Rutin",
    keterangan: "Supervisi administrasi modul ajar dan proses KBM di dalam kelas"
  },
  {
    no: 6,
    semester: "Semester 1",
    bulan: "Agustus 2026",
    tanggal: "03 - 31 Agustus 2026",
    namaKegiatan: "Pelaksanaan Sulingjar (Survei Lingkungan Belajar Kemdikbud)",
    kategori: "Evaluasi & Mutu",
    sasaran: "Kepala Sekolah & Seluruh Guru",
    pj: "Proktor ANBK & Kepala Sekolah",
    status: "Terjadwal",
    keterangan: "Pengisian instrumen nasional Sulingjar secara daring"
  },
  {
    no: 7,
    semester: "Semester 1",
    bulan: "Agustus 2026",
    tanggal: "01 - 31 Agustus 2026",
    namaKegiatan: "Pelaksanaan Program Pemberian Imunisasi SD (BIAS Tahap 1)",
    kategori: "Kesehatan",
    sasaran: "Siswa Kelas I, II, V, dan VI",
    pj: "UKS AI IS & Puskesmas Setempat",
    status: "Terjadwal",
    keterangan: "Pemberian imunisasi MR dan DT/Td untuk ketahanan fisik santri"
  },
  {
    no: 8,
    semester: "Semester 1",
    bulan: "Agustus 2026",
    tanggal: "17 - 18 Agustus 2026",
    namaKegiatan: "Upacara & Semarak Perlombaan HUT Kemerdekaan RI",
    kategori: "Kesiswaan",
    sasaran: "Seluruh Santri, Guru & Karyawan",
    pj: "Kesiswaan & Guru PJOK",
    status: "Terjadwal",
    keterangan: "Upacara bendera 17 Agustus dilanjutkan lomba ketangkasan santri 18 Agustus"
  },
  {
    no: 9,
    semester: "Semester 1",
    bulan: "September 2026",
    tanggal: "07 - 17 September 2026",
    namaKegiatan: "Asesmen Sumatif Tengah Semester I (PTS Ganjil)",
    kategori: "Kurikulum",
    sasaran: "Seluruh Siswa Kelas I s.d VI",
    pj: "Panitia Asesmen & Wali Kelas",
    status: "Terjadwal",
    keterangan: "Evaluasi capaian pembelajaran tengah semester 1 materi Kurikulum Merdeka"
  },
  {
    no: 10,
    semester: "Semester 1",
    bulan: "September 2026",
    tanggal: "17 September 2026",
    namaKegiatan: "Festival Literasi Sekolah & Pojok Baca Al-Imam",
    kategori: "Kesiswaan",
    sasaran: "Seluruh Santri Kelas I s.d VI",
    pj: "Tim Perpustakaan & Guru B. Indonesia",
    status: "Terjadwal",
    keterangan: "Lomba cipta baca puisi, resensi buku islami, dan parade literasi santri"
  },
  {
    no: 11,
    semester: "Semester 1",
    bulan: "Oktober 2026",
    tanggal: "02 Oktober 2026",
    namaKegiatan: "Pengambilan Raport Tengah Semester (PTS) Ganjil",
    kategori: "Humas & Parenting",
    sasaran: "Wali Murid Kelas I s.d VI",
    pj: "Wali Kelas & Kurikulum",
    status: "Terjadwal",
    keterangan: "Laporan perkembangan akademik & pembinaan akhlak anak di paruh semester"
  },
  {
    no: 12,
    semester: "Semester 1",
    bulan: "Oktober 2026",
    tanggal: "10 Oktober 2026",
    namaKegiatan: "Camp Pramuka Siaga & Penggalang AI IS",
    kategori: "Kesiswaan",
    sasaran: "Siswa Kelas III s.d VI",
    pj: "Pembina Pramuka & Kesiswaan",
    status: "Terjadwal",
    keterangan: "Pelatihan kemandirian, tali-temali, api unggun berkarakter dan tadabbur alam"
  },
  {
    no: 13,
    semester: "Semester 1",
    bulan: "Oktober 2026",
    tanggal: "13, 15, 20, 22, 27 Oktober 2026",
    namaKegiatan: "Pendalaman Tes Kemampuan Akademik (TKA) Sesi 1",
    kategori: "Kurikulum",
    sasaran: "Khusus Siswa Kelas VI",
    pj: "Tim Guru Kelas VI & Guru Mapel",
    status: "Terjadwal",
    keterangan: "Bimbingan intensif materi TKA Literasi, Numerasi, dan Sains"
  },
  {
    no: 14,
    semester: "Semester 1",
    bulan: "Oktober 2026",
    tanggal: "29 Oktober 2026",
    namaKegiatan: "Kunjungan Edukatif (Field Trip)",
    kategori: "Kesiswaan",
    sasaran: "Siswa Kelas I s.d VI",
    pj: "Panitia Field Trip & Wali Kelas",
    status: "Terjadwal",
    keterangan: "Pembelajaran kontekstual luar kelas (Museum / Sains Center / Agrowisata)"
  },
  {
    no: 15,
    semester: "Semester 1",
    bulan: "November 2026",
    tanggal: "03, 05, 10, 12, 17, 24 Nov 2026",
    namaKegiatan: "Pendalaman Tes Kemampuan Akademik (TKA) Sesi 2",
    kategori: "Kurikulum",
    sasaran: "Khusus Siswa Kelas VI",
    pj: "Tim Guru Kelas VI",
    status: "Terjadwal",
    keterangan: "Pemantapan materi soal HOTS dan bedah kisi-kisi asesmen akhir jenjang"
  },
  {
    no: 16,
    semester: "Semester 1",
    bulan: "November 2026",
    tanggal: "14 & 21 November 2026",
    namaKegiatan: "Trial Class & Open House Santri Baru (TK B)",
    kategori: "Humas & PMB",
    sasaran: "Calon Santri Baru & Orang Tua",
    pj: "Tim PMB Al-Imam",
    status: "Terjadwal",
    keterangan: "Pengenalan kelas belajar menyenangkan bagi anak usia TK B se-Bogor"
  },
  {
    no: 17,
    semester: "Semester 1",
    bulan: "November 2026",
    tanggal: "19 November 2026",
    namaKegiatan: "Pra-Munaqasyah Al-Qur'an Semester 1",
    kategori: "Al-Qur'an",
    sasaran: "Santri Kholaqoh Calon Peserta Munaqasyah",
    pj: "Kabid Al-Qur'an & Guru Kholaqoh",
    status: "Terjadwal",
    keterangan: "Uji kelayakan tajwid, makharijul huruf, dan kelancaran hafalan juz 30, 29, 28"
  },
  {
    no: 18,
    semester: "Semester 1",
    bulan: "November 2026",
    tanggal: "25 November 2026",
    namaKegiatan: "Peringatan Hari Guru Nasional",
    kategori: "GTK & Manajemen",
    sasaran: "Dewan Guru & Santri",
    pj: "OSIS / Tim Kesiswaan",
    status: "Terjadwal",
    keterangan: "Apresiasi dedikasi guru Al-Imam Islamic School"
  },
  {
    no: 19,
    semester: "Semester 1",
    bulan: "November 2026",
    tanggal: "26 November 2026",
    namaKegiatan: "Munaqasyah Tahfidz & Tahsin Al-Qur'an Semester 1",
    kategori: "Al-Qur'an",
    sasaran: "Santri Terdaftar Munaqasyah",
    pj: "Tim Munaqisy & Guru Al-Qur'an",
    status: "Terjadwal",
    keterangan: "Ujian sertifikasi tahfidz resmi bersanad/standar mutu sekolah"
  },
  {
    no: 20,
    semester: "Semester 1",
    bulan: "Desember 2026",
    tanggal: "30 Nov - 11 Desember 2026",
    namaKegiatan: "Asesmen Sumatif Akhir Semester 1 (PAS Ganjil)",
    kategori: "Kurikulum",
    sasaran: "Seluruh Siswa Kelas I s.d VI",
    pj: "Panitia PAS & Wali Kelas",
    status: "Terjadwal",
    keterangan: "Ujian tertulis dan praktik semester 1 seluruh mata pelajaran"
  },
  {
    no: 21,
    semester: "Semester 1",
    bulan: "Desember 2026",
    tanggal: "14 - 15 Desember 2026",
    namaKegiatan: "Class Meeting I & Lomba Antar Rombel",
    kategori: "Kesiswaan",
    sasaran: "Seluruh Siswa",
    pj: "Kesiswaan & Guru PJOK",
    status: "Terjadwal",
    keterangan: "Futsal, cerdas cermat islami, tahfidz relay, dan lomba ketangkasan santri"
  },
  {
    no: 22,
    semester: "Semester 1",
    bulan: "Desember 2026",
    tanggal: "16 - 17 Desember 2026",
    namaKegiatan: "Puncak Project Penguatan Karakter (P5) & Tasmi' Qur'an",
    kategori: "Kurikulum & Qur'an",
    sasaran: "Santri & Seluruh Wali Murid",
    pj: "Koordinator P5 & Kabid Qur'an",
    status: "Terjadwal",
    keterangan: "Pameran karya aksi nyata santri dan tasmi' hafalan Al-Qur'an bil-ghoib"
  },
  {
    no: 23,
    semester: "Semester 1",
    bulan: "Desember 2026",
    tanggal: "18 Desember 2026",
    namaKegiatan: "Try Out TKA Bersama Penerbit Erlangga",
    kategori: "Kurikulum",
    sasaran: "Khusus Siswa Kelas VI",
    pj: "Tim Guru Kelas VI & Erlangga",
    status: "Terjadwal",
    keterangan: "Simulasi tes berbasis standar nasional dan analisis diagnostik santri"
  },
  {
    no: 24,
    semester: "Semester 1",
    bulan: "Desember 2026",
    tanggal: "23 Desember 2026",
    namaKegiatan: "Penetapan & Pembagian Rapor Semester 1 + Parenting Orang Tua",
    kategori: "Humas & Kurikulum",
    sasaran: "Seluruh Wali Santri",
    pj: "Wali Kelas & Komite",
    status: "Terjadwal",
    keterangan: "Pembagian buku laporan hasil belajar resmi dan sesi parenting parenting islami"
  },

  // SEMESTER 2
  {
    no: 25,
    semester: "Semester 2",
    bulan: "Januari 2027",
    tanggal: "06 - 08 Januari 2027",
    namaKegiatan: "Rapat Kerja (Raker) Semester II Guru & Manajemen",
    kategori: "GTK & Manajemen",
    sasaran: "Pimpinan & Dewan Guru (34 GTK)",
    pj: "Kepala Sekolah & Waka",
    status: "Terjadwal",
    keterangan: "Evaluasi capaian semester 1 dan persiapan program KBM semester genap"
  },
  {
    no: 26,
    semester: "Semester 2",
    bulan: "Januari 2027",
    tanggal: "11 Januari 2027",
    namaKegiatan: "Awal Masuk Pembelajaran Efektif Semester II",
    kategori: "Kurikulum",
    sasaran: "Seluruh Siswa & GTK",
    pj: "Kurikulum & Guru",
    status: "Terjadwal",
    keterangan: "KBM hari pertama aktif semester genap 2026/2027"
  },
  {
    no: 27,
    semester: "Semester 2",
    bulan: "Januari 2027",
    tanggal: "11 - 15 Januari 2027",
    namaKegiatan: "Pare Joyfull English Experience",
    kategori: "Kesiswaan & Bahasa",
    sasaran: "Santri Terdaftar Program Bahasa",
    pj: "Guru Bahasa Inggris & Mitra Pare",
    status: "Terjadwal",
    keterangan: "Pelatihan intensif percakapan bahasa Inggris aktif menyenangkan ala Pare"
  },
  {
    no: 28,
    semester: "Semester 2",
    bulan: "Januari 2027",
    tanggal: "19, 21, 22, 26, 29 Jan 2027",
    namaKegiatan: "Pendalaman Materi Kelas 6 Tahap II",
    kategori: "Kurikulum",
    sasaran: "Khusus Siswa Kelas VI",
    pj: "Tim Pengajar Kelas VI",
    status: "Terjadwal",
    keterangan: "Bimbingan pemantapan materi persiapan asesmen sumatif akhir jenjang"
  },
  {
    no: 29,
    semester: "Semester 2",
    bulan: "Januari 2027",
    tanggal: "25 Januari 2027",
    namaKegiatan: "Try Out TKA Bersama Bimbingan Nurul Fikri",
    kategori: "Kurikulum",
    sasaran: "Khusus Siswa Kelas VI",
    pj: "Waka Kurikulum & Nurul Fikri",
    status: "Terjadwal",
    keterangan: "Try out kedua berbasis CBT dan pemetaan passing grade santri"
  },
  {
    no: 30,
    semester: "Semester 2",
    bulan: "Januari 2027",
    tanggal: "27 - 28 Januari 2027",
    namaKegiatan: "Al-Qur'an Camp Santri AI IS",
    kategori: "Al-Qur'an",
    sasaran: "Santri Halaqoh Tahfidz",
    pj: "Kabid Al-Qur'an & Asatidz Kholaqoh",
    status: "Terjadwal",
    keterangan: "Karantina intensif tahsin tartil dan ziadah hafalan Al-Qur'an"
  },
  {
    no: 31,
    semester: "Semester 2",
    bulan: "Februari 2027",
    tanggal: "02, 04, 05 Februari 2027",
    namaKegiatan: "Pendalaman Materi Kelas 6 Tahap III",
    kategori: "Kurikulum",
    sasaran: "Khusus Siswa Kelas VI",
    pj: "Wali Kelas VI & Guru Mapel",
    status: "Terjadwal",
    keterangan: "Klinik belajar dan pembahasan soal-soal prediksi ujian"
  },
  {
    no: 32,
    semester: "Semester 2",
    bulan: "Februari 2027",
    tanggal: "08 - 12 Februari 2027",
    namaKegiatan: "Perkiraan Libur Awal Ramadhan 1448 H",
    kategori: "Keagamaan",
    sasaran: "Seluruh Keluarga Besar AI IS",
    pj: "Sekolah",
    status: "Terjadwal",
    keterangan: "Menyambut awal bulan suci Ramadhan 1448 Hijriyah"
  },
  {
    no: 33,
    semester: "Semester 2",
    bulan: "Feb - Mar 2027",
    tanggal: "15 Feb - 05 Maret 2027",
    namaKegiatan: "KBM Khusus & Program Amaliah Ramadhan 1448 H",
    kategori: "Kurikulum & Qur'an",
    sasaran: "Seluruh Siswa & Guru",
    pj: "Waka Kurikulum & Tim Keislaman",
    status: "Terjadwal",
    keterangan: "Penyesuaian jam KBM, tadarus Al-Qur'an harian, dan infak berkah santri"
  },
  {
    no: 34,
    semester: "Semester 2",
    bulan: "Februari 2027",
    tanggal: "24 - 26 Februari 2027",
    namaKegiatan: "Ramadhan Mubarak (Pesantren Kilat Sanlat)",
    kategori: "Al-Qur'an & Keagamaan",
    sasaran: "Siswa Kelas I s.d VI",
    pj: "Panitia Sanlat & Guru PAI",
    status: "Terjadwal",
    keterangan: "Kajian fiqih puasa, sirah nabawiyah, buka puasa bersama, dan santunan yatim"
  },
  {
    no: 35,
    semester: "Semester 2",
    bulan: "Maret 2027",
    tanggal: "08 - 19 Maret 2027",
    namaKegiatan: "Perkiraan Libur Hari Raya Idul Fitri 1448 H",
    kategori: "Hari Besar Islam",
    sasaran: "Seluruh Santri & Karyawan",
    pj: "Pemerintah / Sekolah",
    status: "Terjadwal",
    keterangan: "Libur hari raya Idul Fitri dan cuti bersama"
  },
  {
    no: 36,
    semester: "Semester 2",
    bulan: "Maret 2027",
    tanggal: "22 Maret 2027",
    namaKegiatan: "Awal Masuk Sekolah Pasca Idul Fitri & Halal Bihalal",
    kategori: "Kesiswaan & Humas",
    sasaran: "Seluruh Siswa, Guru & Orang Tua",
    pj: "Kesiswaan & Komite",
    status: "Terjadwal",
    keterangan: "Silaturahim akbar saling memaafkan dan masuk KBM efektif"
  },
  {
    no: 37,
    semester: "Semester 2",
    bulan: "Maret 2027",
    tanggal: "19 - 31 Maret 2027",
    namaKegiatan: "Perkiraan Tes Kemampuan Akademik (TKA) SD / Paket A",
    kategori: "Kurikulum",
    sasaran: "Siswa Kelas VI",
    pj: "Panitia TKA & Waka Kurikulum",
    status: "Terjadwal",
    keterangan: "Uji kompetensi kemampuan dasar sains, numerasi, dan bahasa"
  },
  {
    no: 38,
    semester: "Semester 2",
    bulan: "Maret - Apr 2027",
    tanggal: "29 Mar - 09 April 2027",
    namaKegiatan: "Asesmen Sumatif Tengah Semester II (PTS Genap)",
    kategori: "Kurikulum",
    sasaran: "Seluruh Siswa Kelas I s.d VI",
    pj: "Panitia Asesmen & Wali Kelas",
    status: "Terjadwal",
    keterangan: "Evaluasi capaian kompetensi tengah semester genap"
  },
  {
    no: 39,
    semester: "Semester 2",
    bulan: "April 2027",
    tanggal: "12 - 20 April 2027",
    namaKegiatan: "Perkiraan Ujian Praktik Siswa Kelas VI",
    kategori: "Kurikulum",
    sasaran: "Khusus Siswa Kelas VI",
    pj: "Penguji Praktik (PAI, PJOK, Seni, IPA)",
    status: "Terjadwal",
    keterangan: "Ujian praktik ibadah wudhu sholat, baca Qur'an, sains eksperimen, olahraga"
  },
  {
    no: 40,
    semester: "Semester 2",
    bulan: "April 2027",
    tanggal: "21 - 23 April 2027",
    namaKegiatan: "Pekan Tenang Menjelang Ujian Sekolah (US)",
    kategori: "Kurikulum",
    sasaran: "Khusus Siswa Kelas VI",
    pj: "Wali Kelas VI & BK",
    status: "Terjadwal",
    keterangan: "Masa istirahat tenang, pembinaan mental spiritual, dan doa bersama santri kelas 6"
  },
  {
    no: 41,
    semester: "Semester 2",
    bulan: "April 2027",
    tanggal: "22 April 2027",
    namaKegiatan: "Kunjungan Tematik Kelas 1 s.d 5",
    kategori: "Kesiswaan",
    sasaran: "Khusus Siswa Kelas I s.d V",
    pj: "Wali Kelas I s.d V",
    status: "Terjadwal",
    keterangan: "Studi lapangan tematik sesuai topik modul ajar Kurikulum Merdeka"
  },
  {
    no: 42,
    semester: "Semester 2",
    bulan: "Mei 2027",
    tanggal: "01 Mei 2027",
    namaKegiatan: "Pengambilan Raport Tengah Semester II (PTS Genap)",
    kategori: "Humas & Parenting",
    sasaran: "Wali Murid Kelas I s.d VI",
    pj: "Wali Kelas & Kurikulum",
    status: "Terjadwal",
    keterangan: "Laporan kemajuan belajar santri paruh semester genap"
  },
  {
    no: 43,
    semester: "Semester 2",
    bulan: "Mei 2027",
    tanggal: "03 - 14 Mei 2027",
    namaKegiatan: "Perkiraan Asesmen Sumatif Akhir Jenjang SD / Ujian Sekolah (US)",
    kategori: "Kurikulum",
    sasaran: "Khusus Siswa Kelas VI",
    pj: "Panitia US & Dewan Pengawas",
    status: "Terjadwal",
    keterangan: "Ujian penentu kelulusan tingkat akhir jenjang sekolah dasar"
  },
  {
    no: 44,
    semester: "Semester 2",
    bulan: "Mei 2027",
    tanggal: "24 Mei 2027",
    namaKegiatan: "Pra-Munaqasyah Al-Qur'an Semester 2",
    kategori: "Al-Qur'an",
    sasaran: "Santri Kholaqoh Calon Munaqasyah",
    pj: "Kabid Al-Qur'an & Asatidz",
    status: "Terjadwal",
    keterangan: "Penyaringan dan gladi bersih hafalan Al-Qur'an santri"
  },
  {
    no: 45,
    semester: "Semester 2",
    bulan: "Mei 2027",
    tanggal: "27 Mei 2027",
    namaKegiatan: "Rihlah Edukatif Perpisahan Kelas VI",
    kategori: "Kesiswaan",
    sasaran: "Khusus Siswa Kelas VI & Guru Pendamping",
    pj: "Panitia Rihlah & Wali Kelas VI",
    status: "Terjadwal",
    keterangan: "Wisata edukasi kebersamaan dan tadabbur alam jelang kelulusan"
  },
  {
    no: 46,
    semester: "Semester 2",
    bulan: "Mei 2027",
    tanggal: "31 Mei 2027",
    namaKegiatan: "Munaqasyah Tahfidz Al-Qur'an Semester 2",
    kategori: "Al-Qur'an",
    sasaran: "Santri Peserta Ujian Munaqasyah",
    pj: "Lembaga Munaqisy & Guru Qur'an",
    status: "Terjadwal",
    keterangan: "Ujian terbuka tahfidz juz 30, 29, 28, dan juz pilihan"
  },
  {
    no: 47,
    semester: "Semester 2",
    bulan: "Juni 2027",
    tanggal: "01 Juni 2027",
    namaKegiatan: "Rapat Pleno & Penetapan Kelulusan Kelas VI",
    kategori: "GTK & Kurikulum",
    sasaran: "Dewan Guru & Kepala Sekolah",
    pj: "Kepala Sekolah & Waka Kurikulum",
    status: "Terjadwal",
    keterangan: "Pengumuman resmi kelulusan santri angkatan 2026/2027"
  },
  {
    no: 48,
    semester: "Semester 2",
    bulan: "Juni 2027",
    tanggal: "02 - 11 Juni 2027",
    namaKegiatan: "Asesmen Sumatif Akhir Tahun (PAT) / Akhir Fase",
    kategori: "Kurikulum",
    sasaran: "Khusus Siswa Kelas I s.d V",
    pj: "Panitia PAT & Wali Kelas I-V",
    status: "Terjadwal",
    keterangan: "Asesmen penentu kenaikan kelas Fase A, B, dan C"
  },
  {
    no: 49,
    semester: "Semester 2",
    bulan: "Juni 2027",
    tanggal: "16 - 18 Juni 2027",
    namaKegiatan: "Class Meeting II Semester Genap",
    kategori: "Kesiswaan",
    sasaran: "Siswa Kelas I s.d V",
    pj: "Kesiswaan & Guru PJOK",
    status: "Terjadwal",
    keterangan: "Ajang kreativitas olahraga, seni islami, dan rekreasi santri"
  },
  {
    no: 50,
    semester: "Semester 2",
    bulan: "Juni 2027",
    tanggal: "22 Juni 2027",
    namaKegiatan: "Haflah Akhirussanah, Wisuda & Pelepasan Santri Kelas VI",
    kategori: "Kesiswaan & Humas",
    sasaran: "Santri Wisudawan, Wali Santri & Tamu Undangan",
    pj: "Panitia Wisuda & Pimpinan Sekolah",
    status: "Terjadwal",
    keterangan: "Prosesi wisuda tahfidz, penyerahan medali ijazah, dan pentas seni islami"
  },
  {
    no: 51,
    semester: "Semester 2",
    bulan: "Juni 2027",
    tanggal: "24 Juni 2027",
    namaKegiatan: "Panggung Huffadz Al-Qur'an Al-Imam",
    kategori: "Al-Qur'an",
    sasaran: "Santri Mutqin & Seluruh Wali Santri",
    pj: "Kabid Al-Qur'an & Guru Kholaqoh",
    status: "Terjadwal",
    keterangan: "Uji publik hafalan Al-Qur'an santri berprestasi di hadapan para orang tua"
  },
  {
    no: 52,
    semester: "Semester 2",
    bulan: "Juni 2027",
    tanggal: "25 Juni 2027",
    namaKegiatan: "Rapat Pleno Dewan Guru & Penetapan Rapor Kenaikan Kelas",
    kategori: "Kurikulum & GTK",
    sasaran: "Seluruh Dewan Guru & Kepala Sekolah",
    pj: "Kepala Sekolah & Wali Kelas",
    status: "Terjadwal",
    keterangan: "Penandatanganan dan pengesahan buku rapor hasil belajar semester 2"
  },
  {
    no: 53,
    semester: "Semester 2",
    bulan: "Juni 2027",
    tanggal: "26 Juni 2027",
    namaKegiatan: "Pengambilan Raport Kenaikan Kelas & Parenting Akbar",
    kategori: "Humas & Parenting",
    sasaran: "Seluruh Wali Santri Kelas I s.d V",
    pj: "Wali Kelas & Komite Sekolah",
    status: "Terjadwal",
    keterangan: "Penyerahan rapor kenaikan kelas dan arahan liburan berfaedah bagi santri"
  },
  {
    no: 54,
    semester: "Semester 2",
    bulan: "Juni - Jul 2027",
    tanggal: "28 Juni - 09 Juli 2027",
    namaKegiatan: "Libur Akhir Tahun Pelajaran 2026/2027",
    kategori: "Hari Libur",
    sasaran: "Seluruh Santri",
    pj: "Sekolah",
    status: "Terjadwal",
    keterangan: "Liburan kenaikan kelas santri dan persiapan tahun ajaran baru 2027/2028"
  }
];
