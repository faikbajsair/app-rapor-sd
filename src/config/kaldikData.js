/**
 * DATA KALENDER PENDIDIKAN (KALDIK) AL-IMAM ISLAMIC SCHOOL (AI IS) T.P 2026/2027
 * Berdasarkan Dokumen Resmi: KALENDER PENDIDIKAN AL IMAM ISLAMIC SCHOOL (AI IS) T.P 2026/2027
 * Penetapan: Bogor, 27 Oktober 2026
 * Kepala Sekolah: Kholid Hasan, S.Pd
 */

export const KALDIK_META = {
  sekolah: "AL IMAM ISLAMIC SCHOOL (AI IS)",
  tahunPelajaran: "2026/2027",
  tempatPenetapan: "Bogor",
  tanggalPenetapan: "27 Oktober 2026",
  kepalaSekolah: "Kholid Hasan, S.Pd",
  status: "Resmi & Ditetapkan"
};

export const KALDIK_SEMESTER_1 = [
  {
    id: "jul_2026",
    bulan: "Juli 2026",
    tahun: 2026,
    bulanIndex: 6, // 0-indexed (Juli = 6)
    daysInMonth: 31,
    startDayOfWeek: 2, // 1 Juli 2026 = Rabu (0: Min, 1: Sen, 2: Sel, 3: Rab, dst)
    kegiatan: [
      { tgl: "09 - 10 Jul", nama: "Rapat kerja Tahun Pelajaran 2026-2027", tipe: "internal" },
      { tgl: "11 Jul", nama: "Pertemuan Orangtua", tipe: "ortu" },
      { tgl: "13 Jul", nama: "Awal Masuk Sekolah", tipe: "utama" },
      { tgl: "13 - 17 Jul", nama: "Masa Pengenalan Lingkungan Sekolah (MPLS)", tipe: "fakultatif" },
      { tgl: "13 - 31 Jul", nama: "Monitoring/ supervisi proses pembelajaran kompetensi unit AI IS", tipe: "supervisi" }
    ],
    analisis: {
      heb: { sn: 2, sl: 2, rb: 2, km: 2, jm: 2, sb: 0, jml: 10 },
      hef: { sn: 1, sl: 1, rb: 1, km: 1, jm: 1, sb: 0, jml: 5 },
      hln: { sn: 0, sl: 0, rb: 0, km: 0, jm: 0, sb: 0, jml: 0 },
      persenHek: "13%"
    },
    specialDates: {
      // Merah (HLN / Libur)
      "1": { tipe: "hln", note: "Libur Semester Sebelumnya" },
      "2": { tipe: "hln", note: "Libur Semester Sebelumnya" },
      "3": { tipe: "hln", note: "Libur Semester Sebelumnya" },
      "4": { tipe: "hln", note: "Libur Akhir Pekan" },
      "5": { tipe: "hln", note: "Libur Akhir Pekan" },
      "6": { tipe: "hln", note: "Libur Semester Sebelumnya" },
      "7": { tipe: "hln", note: "Libur Semester Sebelumnya" },
      "8": { tipe: "hln", note: "Libur Semester Sebelumnya" },
      "9": { tipe: "keg", note: "Rapat Kerja TP 2026/2027" },
      "10": { tipe: "keg", note: "Rapat Kerja TP 2026/2027" },
      "11": { tipe: "hef", note: "Pertemuan Orangtua Siswa" },
      "12": { tipe: "hln", note: "Libur Akhir Pekan" },
      // Hijau Muda (HEF - MPLS)
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
      { tgl: "17 Ags", nama: "Libur Nasional (HUT RI)", tipe: "libur" },
      { tgl: "18 Ags", nama: "Peringatan & Lomba HUT RI", tipe: "keg" },
      { tgl: "25 Ags", nama: "Libur Nasional (Maulid Nabi Muhammad SAW)", tipe: "libur" },
      { tgl: "03 - 31 Ags", nama: "Pelaksanaan Sulingjar (Kepala Sekolah & Guru)", tipe: "internal" },
      { tgl: "01 - 31 Ags", nama: "Monitoring/ supervisi proses pembelajaran unit AI IS", tipe: "supervisi" },
      { tgl: "01 - 31 Ags", nama: "Pelaksanaan Program Pemberian Imunisasi SD (Kelas I, II, V, VI)", tipe: "kesehatan" }
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
      "17": { tipe: "hln", note: "Libur Nasional (HUT Proklamasi RI ke-81)" },
      "18": { tipe: "hef", note: "Perayaan Semarak HUT Kemerdekaan RI" },
      "22": { tipe: "hln", note: "Libur Akhir Pekan" },
      "23": { tipe: "hln", note: "Libur Akhir Pekan" },
      "25": { tipe: "hln", note: "Libur Nasional (Maulid Nabi Muhammad SAW)" },
      "28": { tipe: "hef", note: "Kegiatan Keputrian & Bina Karakter" },
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
      { tgl: "07 - 17 Sep", nama: "Asesmen Sumatif Tengah Semester I (PTS Ganjil)", tipe: "ujian" },
      { tgl: "17 Sep", nama: "Festival Literasi Sekolah", tipe: "keg" },
      { tgl: "01 - 30 Sep", nama: "Monitoring/ supervisi proses pembelajaran kompetensi unit AI IS", tipe: "supervisi" }
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
      "7": { tipe: "ujian", note: "PTS Ganjil Hari ke-1" },
      "8": { tipe: "ujian", note: "PTS Ganjil Hari ke-2" },
      "9": { tipe: "ujian", note: "PTS Ganjil Hari ke-3" },
      "10": { tipe: "ujian", note: "PTS Ganjil Hari ke-4" },
      "11": { tipe: "ujian", note: "PTS Ganjil Hari ke-5" },
      "12": { tipe: "hln", note: "Libur Akhir Pekan" },
      "13": { tipe: "hln", note: "Libur Akhir Pekan" },
      "14": { tipe: "ujian", note: "PTS Ganjil Hari ke-6" },
      "15": { tipe: "ujian", note: "PTS Ganjil Hari ke-7" },
      "16": { tipe: "ujian", note: "PTS Ganjil Hari ke-8" },
      "17": { tipe: "keg", note: "Festival Literasi Sekolah & Akhir PTS" },
      "18": { tipe: "ujian", note: "Susulan PTS Ganjil" },
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
      { tgl: "02 Okt", nama: "Pengambilan Raport Tengah Semester (PTS)", tipe: "rapor" },
      { tgl: "10 Okt", nama: "Camp Pramuka Siaga & Penggalang", tipe: "keg" },
      { tgl: "29 Okt", nama: "Kunjungan Edukatif / Field Trip", tipe: "keg" },
      { tgl: "01 - 31 Okt", nama: "Monitoring/ supervisi proses pembelajaran unit AI IS", tipe: "supervisi" },
      { tgl: "13, 15, 20, 22, 27 Okt", nama: "Pendalaman Tes Kemampuan Akademik (TKA)", tipe: "tka" }
    ],
    analisis: {
      heb: { sn: 4, sl: 4, rb: 4, km: 4, jm: 5, sb: 0, jml: 21 },
      hef: { sn: 0, sl: 0, rb: 0, km: 1, jm: 0, sb: 0, jml: 1 },
      hln: { sn: 0, sl: 0, rb: 0, km: 0, jm: 0, sb: 0, jml: 0 },
      persenHek: "27%"
    },
    specialDates: {
      "2": { tipe: "rapor", note: "Pembagian Raport PTS 1" },
      "3": { tipe: "hln", note: "Libur Akhir Pekan" },
      "4": { tipe: "hln", note: "Libur Akhir Pekan" },
      "10": { tipe: "keg", note: "Camp Pramuka Al-Imam" },
      "11": { tipe: "hln", note: "Libur Akhir Pekan" },
      "13": { tipe: "tka", note: "Pendalaman TKA" },
      "15": { tipe: "tka", note: "Pendalaman TKA" },
      "17": { tipe: "hln", note: "Libur Akhir Pekan" },
      "18": { tipe: "hln", note: "Libur Akhir Pekan" },
      "20": { tipe: "tka", note: "Pendalaman TKA" },
      "22": { tipe: "tka", note: "Pendalaman TKA" },
      "24": { tipe: "hln", note: "Libur Akhir Pekan" },
      "25": { tipe: "hln", note: "Libur Akhir Pekan" },
      "27": { tipe: "tka", note: "Pendalaman TKA" },
      "29": { tipe: "hef", note: "Kunjungan Edukatif Terprogram" },
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
      { tgl: "01 - 30 Nov", nama: "Monitoring/ supervisi proses pembelajaran unit AI IS", tipe: "supervisi" },
      { tgl: "19 Nov", nama: "Pra-Munaqasyah Al-Qur'an & Tahfidz", tipe: "quran" },
      { tgl: "26 Nov", nama: "Munaqasyah Tahfidz Al-Qur'an", tipe: "quran" },
      { tgl: "01 - 30 Nov", nama: "Pelaksanaan Program Pemberian Imunisasi SD (I-II-V-VI)", tipe: "kesehatan" },
      { tgl: "25 Nov", nama: "Peringatan Hari Guru Nasional", tipe: "keg" },
      { tgl: "3, 5, 10, 12, 17, 24 Nov", nama: "Pendalaman Tes Kemampuan Akademik (TKA)", tipe: "tka" },
      { tgl: "14 Nov", nama: "Trial Class TK B Al-Imam", tipe: "pmb" },
      { tgl: "21 Nov", nama: "Trial Class TK B Sekitar Al-Imam", tipe: "pmb" }
    ],
    analisis: {
      heb: { sn: 2, sl: 4, rb: 4, km: 4, jm: 4, sb: 0, jml: 18 },
      hef: { sn: 3, sl: 0, rb: 0, km: 0, jm: 0, sb: 0, jml: 3 },
      hln: { sn: 0, sl: 0, rb: 0, km: 0, jm: 0, sb: 0, jml: 0 },
      persenHek: "23%"
    },
    specialDates: {
      "1": { tipe: "hln", note: "Libur Akhir Pekan" },
      "3": { tipe: "tka", note: "Pendalaman TKA" },
      "5": { tipe: "tka", note: "Pendalaman TKA" },
      "7": { tipe: "hln", note: "Libur Akhir Pekan" },
      "8": { tipe: "hln", note: "Libur Akhir Pekan" },
      "10": { tipe: "tka", note: "Pendalaman TKA" },
      "12": { tipe: "tka", note: "Pendalaman TKA" },
      "14": { tipe: "pmb", note: "Trial Class TK B Internal" },
      "15": { tipe: "hln", note: "Libur Akhir Pekan" },
      "17": { tipe: "tka", note: "Pendalaman TKA" },
      "19": { tipe: "quran", note: "Pra-Munaqasyah Al-Qur'an" },
      "21": { tipe: "pmb", note: "Trial Class TK B Eksternal" },
      "22": { tipe: "hln", note: "Libur Akhir Pekan" },
      "24": { tipe: "tka", note: "Pendalaman TKA" },
      "25": { tipe: "keg", note: "Hari Guru Nasional" },
      "26": { tipe: "quran", note: "Munaqasyah Al-Qur'an" },
      "28": { tipe: "hln", note: "Libur Akhir Pekan" },
      "29": { tipe: "hln", note: "Libur Akhir Pekan" },
      "30": { tipe: "ujian", note: "Awal Asesmen Sumatif Akhir Semester 1 (PAS)" }
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
      { tgl: "30 Nov - 11 Des", nama: "Asesmen Sumatif Akhir Semester 1 (PAS Ganjil)", tipe: "ujian" },
      { tgl: "14 - 15 Des", nama: "Class Meeting I", tipe: "keg" },
      { tgl: "16 - 17 Des", nama: "Puncak Project - Gelar Aksi Karakter Siswa - Tasmi'", tipe: "quran" },
      { tgl: "18 Des", nama: "Try Out TKA Erlangga", tipe: "tka" },
      { tgl: "23 Des", nama: "Penetapan & Pembagian Rapor Semester 1 + Parenting", tipe: "rapor" },
      { tgl: "24 - 25 Des", nama: "Libur Nasional (Hari Raya Natal)", tipe: "libur" },
      { tgl: "28 Des - 08 Jan", nama: "Libur Pembelajaran Semester 1", tipe: "libur" }
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
      "16": { tipe: "hef", note: "Puncak Project & Tasmi' Qur'an" },
      "17": { tipe: "hef", note: "Puncak Project & Tasmi' Qur'an" },
      "18": { tipe: "tka", note: "Try Out TKA Erlangga" },
      "19": { tipe: "hln", note: "Libur Akhir Pekan" },
      "20": { tipe: "hln", note: "Libur Akhir Pekan" },
      "21": { tipe: "hef", note: "Pengolahan & Verifikasi Nilai Rapor" },
      "22": { tipe: "hef", note: "Pencetakan Rapor Digital" },
      "23": { tipe: "rapor", note: "Pembagian Rapor Semester 1 & Parenting" },
      "24": { tipe: "hln", note: "Cuti Bersama Natal" },
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

export const KALDIK_SEMESTER_2 = [
  {
    id: "jan_2027",
    bulan: "Januari 2027",
    tahun: 2027,
    bulanIndex: 0,
    daysInMonth: 31,
    startDayOfWeek: 4,
    kegiatan: [
      { tgl: "06 - 08 Jan", nama: "Rapat Kerja Semester II", tipe: "internal" },
      { tgl: "11 Jan", nama: "Awal Masuk Pembelajaran Semester II", tipe: "utama" },
      { tgl: "11 - 15 Jan", nama: "Pare Joyfull English Experience", tipe: "keg" },
      { tgl: "11 - 31 Jan", nama: "Monitoring/ supervisi proses pembelajaran unit AI IS", tipe: "supervisi" },
      { tgl: "25 Jan", nama: "Try Out TKA dengan Nurul Fikri", tipe: "tka" },
      { tgl: "27 - 28 Jan", nama: "Al-Quran Camp Santri", tipe: "quran" },
      { tgl: "19, 21, 22, 26, 29 Jan", nama: "Pendalaman Materi Kelas 6", tipe: "kelas6" }
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
      "6": { tipe: "internal", note: "Raker Semester II" },
      "7": { tipe: "internal", note: "Raker Semester II" },
      "8": { tipe: "internal", note: "Raker Semester II" },
      "9": { tipe: "hln", note: "Libur Akhir Pekan" },
      "10": { tipe: "hln", note: "Libur Akhir Pekan" },
      "11": { tipe: "utama", note: "Hari Pertama Masuk Semester II" },
      "16": { tipe: "hln", note: "Libur Akhir Pekan" },
      "17": { tipe: "hln", note: "Libur Akhir Pekan" },
      "23": { tipe: "hln", note: "Libur Akhir Pekan" },
      "24": { tipe: "hln", note: "Libur Akhir Pekan" },
      "25": { tipe: "tka", note: "Try Out TKA Nurul Fikri" },
      "27": { tipe: "quran", note: "Al-Qur'an Camp Hari 1" },
      "28": { tipe: "quran", note: "Al-Qur'an Camp Hari 2" },
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
    startDayOfWeek: 0,
    kegiatan: [
      { tgl: "08 - 12 Feb", nama: "Perkiraan Libur Awal Ramadhan 1448 H", tipe: "ramadhan" },
      { tgl: "15 Feb - 05 Mar", nama: "Kegiatan KBM Khusus Ramadhan 1448 H", tipe: "ramadhan" },
      { tgl: "01 - 26 Feb", nama: "Monitoring/ supervisi proses pembelajaran unit AI IS", tipe: "supervisi" },
      { tgl: "24 - 26 Feb", nama: "Ramadhan Mubarak & Pesantren Kilat", tipe: "ramadhan" },
      { tgl: "02, 04, 05 Feb", nama: "Pendalaman Materi Kelas 6", tipe: "kelas6" }
    ],
    analisis: {
      heb: { sn: 3, sl: 3, rb: 4, km: 4, jm: 4, sb: 0, jml: 18 },
      hef: { sn: 0, sl: 0, rb: 0, km: 0, jm: 0, sb: 0, jml: 0 },
      hln: { sn: 0, sl: 0, rb: 0, km: 0, jm: 0, sb: 0, jml: 0 },
      persenHek: "25%"
    },
    specialDates: {
      "6": { tipe: "hln", note: "Libur Akhir Pekan" },
      "7": { tipe: "hln", note: "Libur Akhir Pekan" },
      "8": { tipe: "ramadhan", note: "Libur Awal Ramadhan 1448 H" },
      "9": { tipe: "ramadhan", note: "Libur Awal Ramadhan 1448 H" },
      "10": { tipe: "ramadhan", note: "Libur Awal Ramadhan 1448 H" },
      "11": { tipe: "ramadhan", note: "Libur Awal Ramadhan 1448 H" },
      "12": { tipe: "ramadhan", note: "Libur Awal Ramadhan 1448 H" },
      "13": { tipe: "hln", note: "Libur Akhir Pekan" },
      "14": { tipe: "hln", note: "Libur Akhir Pekan" },
      "15": { tipe: "ramadhan", note: "Awal KBM Ramadhan 1448 H" },
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
      { tgl: "11 Feb - 05 Mar", nama: "Kegiatan KBM Bulan Ramadhan 1448 H", tipe: "ramadhan" },
      { tgl: "09 Mar", nama: "Libur Nasional (Hari Raya Nyepi)", tipe: "libur" },
      { tgl: "08 - 19 Mar", nama: "Perkiraan Libur Hari Raya Idul Fitri 1448 H", tipe: "libur" },
      { tgl: "22 Mar", nama: "Awal Masuk Setelah Libur Idul Fitri 1448 H", tipe: "utama" },
      { tgl: "19 - 31 Mar", nama: "Perkiraan Tes Kemampuan Akademik SD / Paket A", tipe: "tka" },
      { tgl: "29 Mar - 09 Apr", nama: "Asesmen Sumatif Tengah Semester II (PTS Genap)", tipe: "ujian" },
      { tgl: "01 - 31 Mar", nama: "Monitoring/ supervisi proses pembelajaran unit AI IS", tipe: "supervisi" }
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
      "8": { tipe: "hln", note: "Libur Menjelang Idul Fitri" },
      "9": { tipe: "hln", note: "Libur Nyepi & Idul Fitri" },
      "10": { tipe: "hln", note: "Hari Raya Idul Fitri 1448 H" },
      "11": { tipe: "hln", note: "Hari Raya Idul Fitri 1448 H" },
      "12": { tipe: "hln", note: "Cuti Bersama Idul Fitri" },
      "13": { tipe: "hln", note: "Libur Akhir Pekan" },
      "14": { tipe: "hln", note: "Libur Akhir Pekan" },
      "15": { tipe: "hln", note: "Cuti Bersama Idul Fitri" },
      "16": { tipe: "hln", note: "Cuti Bersama Idul Fitri" },
      "17": { tipe: "hln", note: "Cuti Bersama Idul Fitri" },
      "18": { tipe: "hln", note: "Cuti Bersama Idul Fitri" },
      "19": { tipe: "hln", note: "Cuti Bersama Idul Fitri" },
      "20": { tipe: "hln", note: "Libur Akhir Pekan" },
      "21": { tipe: "hln", note: "Libur Akhir Pekan" },
      "22": { tipe: "utama", note: "Masuk Sekolah Pasca Idul Fitri" },
      "27": { tipe: "hln", note: "Libur Akhir Pekan" },
      "28": { tipe: "hln", note: "Libur Akhir Pekan" },
      "29": { tipe: "ujian", note: "Awal PTS Genap" },
      "30": { tipe: "ujian", note: "PTS Genap Hari ke-2" },
      "31": { tipe: "ujian", note: "PTS Genap Hari ke-3" }
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
      { tgl: "29 Mar - 09 Apr", nama: "Lanjutan Asesmen Sumatif Tengah Semester II (PTS Genap)", tipe: "ujian" },
      { tgl: "12 - 20 Apr", nama: "Perkiraan Ujian Praktik Kelas VI", tipe: "ujian" },
      { tgl: "22 Apr", nama: "Kunjungan Tematik Siswa", tipe: "keg" },
      { tgl: "26 Apr", nama: "Libur Nasional (Wafat Isa Almasih)", tipe: "libur" },
      { tgl: "01 - 30 Apr", nama: "Pelaksanaan LKS Tingkat Kabupaten/Kota", tipe: "lomba" },
      { tgl: "01 - 30 Apr", nama: "Monitoring/ supervisi proses pembelajaran unit AI IS", tipe: "supervisi" }
    ],
    analisis: {
      heb: { sn: 3, sl: 3, rb: 3, km: 2, jm: 3, sb: 0, jml: 14 },
      hef: { sn: 1, sl: 1, rb: 1, km: 3, jm: 2, sb: 0, jml: 8 },
      hln: { sn: 0, sl: 0, rb: 0, km: 0, jm: 0, sb: 0, jml: 0 },
      persenHek: "19%"
    },
    specialDates: {
      "1": { tipe: "ujian", note: "PTS Genap Hari ke-4" },
      "2": { tipe: "ujian", note: "PTS Genap Hari ke-5" },
      "3": { tipe: "hln", note: "Libur Akhir Pekan" },
      "4": { tipe: "hln", note: "Libur Akhir Pekan" },
      "5": { tipe: "ujian", note: "PTS Genap Hari ke-6" },
      "6": { tipe: "ujian", note: "PTS Genap Hari ke-7" },
      "7": { tipe: "ujian", note: "PTS Genap Hari ke-8" },
      "8": { tipe: "ujian", note: "PTS Genap Hari ke-9" },
      "9": { tipe: "ujian", note: "Akhir PTS Genap" },
      "10": { tipe: "hln", note: "Libur Akhir Pekan" },
      "11": { tipe: "hln", note: "Libur Akhir Pekan" },
      "12": { tipe: "kelas6", note: "Ujian Praktik Kelas 6" },
      "13": { tipe: "kelas6", note: "Ujian Praktik Kelas 6" },
      "14": { tipe: "kelas6", note: "Ujian Praktik Kelas 6" },
      "15": { tipe: "kelas6", note: "Ujian Praktik Kelas 6" },
      "16": { tipe: "kelas6", note: "Ujian Praktik Kelas 6" },
      "17": { tipe: "hln", note: "Libur Akhir Pekan" },
      "18": { tipe: "hln", note: "Libur Akhir Pekan" },
      "22": { tipe: "keg", note: "Kunjungan Tematik Siswa" },
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
      { tgl: "01 Mei", nama: "Pengambilan Raport Tengah Semester II (PTS)", tipe: "rapor" },
      { tgl: "02 Mei", nama: "Hari Pendidikan Nasional (Hardiknas)", tipe: "keg" },
      { tgl: "06 Mei", nama: "Libur Nasional (Kenaikan Isa Almasih)", tipe: "libur" },
      { tgl: "03 - 14 Mei", nama: "Perkiraan Asesmen Sumatif Akhir Jenjang SD (Kelas VI)", tipe: "ujian" },
      { tgl: "17 Mei", nama: "Perkiraan Hari Raya Idul Adha 1448 H", tipe: "libur" },
      { tgl: "18 - 20 Mei", nama: "Perkiraan Hari Tasyriq 1448 H", tipe: "libur" },
      { tgl: "24 Mei", nama: "Pra-Munaqasyah Al-Qur'an", tipe: "quran" },
      { tgl: "31 Mei", nama: "Munaqasyah Tahfidz Al-Qur'an", tipe: "quran" },
      { tgl: "01 - 31 Mei", nama: "Pelaksanaan O2SN & FLS2N Tingkat Kab./Kota", tipe: "lomba" }
    ],
    analisis: {
      heb: { sn: 2, sl: 3, rb: 4, km: 4, jm: 4, sb: 0, jml: 17 },
      hef: { sn: 2, sl: 0, rb: 0, km: 0, jm: 0, sb: 0, jml: 2 },
      hln: { sn: 1, sl: 1, rb: 0, km: 0, jm: 0, sb: 0, jml: 2 },
      persenHek: "24%"
    },
    specialDates: {
      "1": { tipe: "rapor", note: "Pembagian Raport PTS Genap" },
      "2": { tipe: "hln", note: "Hardiknas / Akhir Pekan" },
      "6": { tipe: "hln", note: "Libur Kenaikan Isa Almasih" },
      "8": { tipe: "hln", note: "Libur Akhir Pekan" },
      "9": { tipe: "hln", note: "Libur Akhir Pekan" },
      "15": { tipe: "hln", note: "Libur Akhir Pekan" },
      "16": { tipe: "hln", note: "Libur Akhir Pekan" },
      "17": { tipe: "hln", note: "Hari Raya Idul Adha 1448 H" },
      "18": { tipe: "hln", note: "Hari Tasyriq 1448 H" },
      "19": { tipe: "hln", note: "Hari Tasyriq 1448 H" },
      "20": { tipe: "hln", note: "Hari Tasyriq 1448 H" },
      "22": { tipe: "hln", note: "Libur Akhir Pekan" },
      "23": { tipe: "hln", note: "Libur Akhir Pekan" },
      "24": { tipe: "quran", note: "Pra-Munaqasyah Tahfidz" },
      "29": { tipe: "hln", note: "Libur Akhir Pekan" },
      "30": { tipe: "hln", note: "Libur Akhir Pekan" },
      "31": { tipe: "quran", note: "Munaqasyah Tahfidz" }
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
      { tgl: "01 Jun", nama: "Libur Nasional (Hari Lahir Pancasila)", tipe: "libur" },
      { tgl: "01 Jun", nama: "Perkiraan Penetapan Kelulusan Siswa Kelas VI", tipe: "kelas6" },
      { tgl: "02 - 11 Jun", nama: "Asesmen Sumatif Akhir Tahun / PAT (Kenaikan Kelas)", tipe: "ujian" },
      { tgl: "16 - 18 Jun", nama: "Class Meeting II", tipe: "keg" },
      { tgl: "22 Jun", nama: "Perkiraan Wisuda & Pelepasan Kelas VI", tipe: "wisuda" },
      { tgl: "24 Jun", nama: "Perkiraan Panggung Huffadz Al-Qur'an", tipe: "quran" },
      { tgl: "25 Jun", nama: "Penetapan Raport Semester 2 (Kenaikan Kelas)", tipe: "rapor" },
      { tgl: "26 Jun", nama: "Pengambilan Raport Kenaikan Kelas & Parenting", tipe: "rapor" },
      { tgl: "28 Jun - 09 Jul", nama: "Libur Akhir Tahun Pelajaran 2026/2027", tipe: "libur" }
    ],
    analisis: {
      heb: { sn: 0, sl: 0, rb: 1, km: 1, jm: 2, sb: 0, jml: 4 },
      hef: { sn: 3, sl: 3, rb: 3, km: 3, jm: 2, sb: 0, jml: 14 },
      hln: { sn: 1, sl: 2, rb: 1, km: 0, jm: 0, sb: 0, jml: 4 },
      persenHek: "6%"
    },
    specialDates: {
      "1": { tipe: "hln", note: "Hari Lahir Pancasila & Pengumuman Kelulusan Kls 6" },
      "2": { tipe: "ujian", note: "Asesmen Akhir Tahun (PAT) Hari ke-1" },
      "3": { tipe: "ujian", note: "Asesmen Akhir Tahun (PAT) Hari ke-2" },
      "4": { tipe: "ujian", note: "Asesmen Akhir Tahun (PAT) Hari ke-3" },
      "5": { tipe: "hln", note: "Libur Akhir Pekan" },
      "6": { tipe: "hln", note: "Libur Akhir Pekan" },
      "7": { tipe: "ujian", note: "Asesmen Akhir Tahun (PAT) Hari ke-4" },
      "8": { tipe: "ujian", note: "Asesmen Akhir Tahun (PAT) Hari ke-5" },
      "9": { tipe: "ujian", note: "Asesmen Akhir Tahun (PAT) Hari ke-6" },
      "10": { tipe: "ujian", note: "Asesmen Akhir Tahun (PAT) Hari ke-7" },
      "11": { tipe: "ujian", note: "Akhir PAT Kenaikan Kelas" },
      "12": { tipe: "hln", note: "Libur Akhir Pekan" },
      "13": { tipe: "hln", note: "Libur Akhir Pekan" },
      "16": { tipe: "hef", note: "Class Meeting II" },
      "17": { tipe: "hef", note: "Class Meeting II" },
      "18": { tipe: "hef", note: "Class Meeting II" },
      "19": { tipe: "hln", note: "Libur Akhir Pekan" },
      "20": { tipe: "hln", note: "Libur Akhir Pekan" },
      "22": { tipe: "wisuda", note: "Wisuda & Pelepasan Santri Kelas 6" },
      "24": { tipe: "quran", note: "Panggung Huffadz Al-Qur'an" },
      "25": { tipe: "rapor", note: "Penetapan Nilai Rapor Kenaikan Kelas" },
      "26": { tipe: "rapor", note: "Pembagian Rapor Kenaikan & Parenting Ortu" },
      "27": { tipe: "hln", note: "Libur Akhir Pekan" },
      "28": { tipe: "hln", note: "Libur Akhir Tahun Pelajaran" },
      "29": { tipe: "hln", note: "Libur Akhir Tahun Pelajaran" },
      "30": { tipe: "hln", note: "Libur Akhir Tahun Pelajaran" }
    }
  }
];

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
  }
};
