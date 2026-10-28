/**
 * Data Awal & Default untuk Sistem Rapor SD Al-Imam Islamic School
 * Mengacu pada Kurikulum Merdeka Fase B (Kelas 4 SD) & Kekhasan Sekolah Sunnah / Islam
 */

export const DEFAULT_SETTINGS = {
  schoolName: "SD AL-IMAM ISLAMIC SCHOOL",
  npsn: "20108921",
  alamat: "Jl. Cendrawasih No. 12, Islamic Village, Jakarta",
  kodePos: "12340",
  telepon: "(021) 7890123",
  email: "info@alimamischool.com",
  website: "https://alimamischool.com",
  kepalaSekolah: "Ustadz Dr. Abdullah Faqih, M.Pd.I",
  nipKepalaSekolah: "19780512 200312 1 002",
  waliKelas: "Ustadzah Fatimah Azzahra, S.Pd",
  nipWaliKelas: "19880920 201101 2 004",
  fase: "Fase B (Kelas 4)",
  kelas: "Kelas 4",
  rombel: "4-A (Ibnu Katsir)",
  semester: "1 (Ganjil)",
  tahunAjaran: "2025/2026",
  tanggalRapor: "20 Desember 2025",
  tempatRapor: "Jakarta",
  logoUrl: "https://alimamischool.com/wp-content/uploads/2020/08/Al-Imam-Islamic-School-alimamischool.com-sekolah-sunnah-logo.png",
  faviconUrl: "https://alimamischool.com/wp-content/uploads/2020/08/Al-Imam-Islamic-School-alimamischool.com-sekolah-sunnah-logo.png",
  // Appearance Settings
  primaryColor: "#A8E6CF",
  secondaryColor: "#D4EDDA",
  accentColor: "#267759",
  colorPreset: "pastel-green",
  // Bobot Penilaian
  bobotFormatif: 40,
  bobotSumatifLingkup: 30,
  bobotSumatifAkhir: 30,
  kkmDefault: 75,
  // Lisensi SaaS
  licenseKey: "SD-ALIMAM-ENTERPRISE-2026-X99",
  licenseStatus: "Active - Enterprise",
  licenseExpiry: "2027-12-31",
  quotaStudents: 500,
  // Google Apps Script API Webhook URL (Bisa diisi oleh user)
  gasApiUrl: ""
};

export const DEFAULT_MAPEL = [
  { id: "PAI", kode: "PAI", nama: "Pendidikan Agama Islam & Budi Pekerti", kelompok: "Wajib", kkm: 78, guru: "Ust. Zulkifli, S.Pd.I" },
  { id: "PP", kode: "PP", nama: "Pendidikan Pancasila", kelompok: "Wajib", kkm: 75, guru: "Ust. M. Ridwan, M.Pd" },
  { id: "BIN", kode: "BIN", nama: "Bahasa Indonesia", kelompok: "Wajib", kkm: 75, guru: "Ustdz. Fatimah Azzahra, S.Pd" },
  { id: "MAT", kode: "MAT", nama: "Matematika", kelompok: "Wajib", kkm: 72, guru: "Ustdz. Nurul Hidayah, S.Si" },
  { id: "IPAS", kode: "IPAS", nama: "Ilmu Pengetahuan Alam & Sosial (IPAS)", kelompok: "Wajib", kkm: 75, guru: "Ust. Ahmad Syarif, S.Pd" },
  { id: "PJOK", kode: "PJOK", nama: "Pendidikan Jasmani, Olahraga & Kesehatan", kelompok: "Wajib", kkm: 75, guru: "Ust. Fajar Pratama, S.Or" },
  { id: "SB", kode: "SB", nama: "Seni Rupa & Keterampilan", kelompok: "Pilihan", kkm: 75, guru: "Ustdz. Rina Amalia, S.Sn" },
  { id: "BIG", kode: "BIG", nama: "Bahasa Inggris", kelompok: "Muatan Lokal", kkm: 75, guru: "Ustdz. Siti Sarah, S.Pd" },
  { id: "BAR", kode: "BAR", nama: "Bahasa Arab Dasar", kelompok: "Kekhasan", kkm: 78, guru: "Ust. Bilal Al-Batawi, Lc" },
  { id: "TFZ", kode: "TFZ", nama: "Tahfidz & Tahsin Al-Qur'an", kelompok: "Kekhasan", kkm: 80, guru: "Ust. Hamzah Al-Hafidz" }
];

export const DEFAULT_SISWA = [
  {
    id: "S01",
    nisn: "0134567891",
    nis: "22230401",
    nama: "Abdullah Azzam Pratama",
    jenisKelamin: "L",
    tempatLahir: "Jakarta",
    tanggalLahir: "2015-04-12",
    agama: "Islam",
    namaAyah: "Pratama Handoko",
    namaIbu: "Aisyah Wardani",
    pekerjaanOrtu: "Wiraswasta",
    alamat: "Jl. Kebon Jeruk No. 15, Jakarta Barat",
    status: "Aktif",
    foto: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "S02",
    nisn: "0134567892",
    nis: "22230402",
    nama: "Fathimah Khairunnisa",
    jenisKelamin: "P",
    tempatLahir: "Tangerang",
    tanggalLahir: "2015-06-25",
    agama: "Islam",
    namaAyah: "Muhammad Irfan",
    namaIbu: "Nur Laila",
    pekerjaanOrtu: "PNS",
    alamat: "Komplek Al-Imam Asri No. 8, Tangerang Selatan",
    status: "Aktif",
    foto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "S03",
    nisn: "0134567893",
    nis: "22230403",
    nama: "Ibrahim Khalid Al-Farouq",
    jenisKelamin: "L",
    tempatLahir: "Depok",
    tanggalLahir: "2015-01-18",
    agama: "Islam",
    namaAyah: "Farouq Syamsuddin",
    namaIbu: "Mariam Zahra",
    pekerjaanOrtu: "Dosen",
    alamat: "Jl. Margonda Raya No. 102, Depok",
    status: "Aktif",
    foto: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "S04",
    nisn: "0134567894",
    nis: "22230404",
    nama: "Maryam Salsabila Putri",
    jenisKelamin: "P",
    tempatLahir: "Bogor",
    tanggalLahir: "2015-08-09",
    agama: "Islam",
    namaAyah: "Hendra Wijaya",
    namaIbu: "Khadijah Rahmawati",
    pekerjaanOrtu: "Karyawan Swasta",
    alamat: "Jl. Raya Tajur No. 45, Bogor",
    status: "Aktif",
    foto: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "S05",
    nisn: "0134567895",
    nis: "22230405",
    nama: "Umar Hasan Al-Ghazali",
    jenisKelamin: "L",
    tempatLahir: "Jakarta",
    tanggalLahir: "2015-11-03",
    agama: "Islam",
    namaAyah: "Ghazali Rahmat",
    namaIbu: "Salma Karimah",
    pekerjaanOrtu: "Arsitek",
    alamat: "Jl. Tebet Barat Dalam VII No. 22, Jakarta Selatan",
    status: "Aktif",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "S06",
    nisn: "0134567896",
    nis: "22230406",
    nama: "Zainab Hafidzah",
    jenisKelamin: "P",
    tempatLahir: "Bekasi",
    tanggalLahir: "2015-03-30",
    agama: "Islam",
    namaAyah: "Lukman Hakim",
    namaIbu: "Husna Nabilah",
    pekerjaanOrtu: "Dokter",
    alamat: "Grand Galaxy Park Blok E No. 14, Bekasi",
    status: "Aktif",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
  }
];

export const DEFAULT_NILAI = [
  {
    id: "N_S01_PAI",
    siswaId: "S01",
    mapelId: "PAI",
    f1: 88, f2: 90, f3: 86, f4: 92,
    sumatifLingkup: 89,
    pts: 90,
    pas: 92,
    deskripsiCapaian: "Sangat baik dalam memahami makna Asmaul Husna dan tata cara salat berjamaah."
  },
  {
    id: "N_S01_MAT",
    siswaId: "S01",
    mapelId: "MAT",
    f1: 82, f2: 78, f3: 85, f4: 80,
    sumatifLingkup: 81,
    pts: 80,
    pas: 84,
    deskripsiCapaian: "Baik dalam menyelesaikan operasi hitung pecahan dan perkalian susun, perlu ketelitian dalam soal cerita geometri."
  },
  {
    id: "N_S01_BIN",
    siswaId: "S01",
    mapelId: "BIN",
    f1: 85, f2: 88, f3: 90, f4: 87,
    sumatifLingkup: 87,
    pts: 88,
    pas: 89,
    deskripsiCapaian: "Sangat menguasai identifikasi ide pokok paragraf dan membuat paragraf deskripsi yang runtut."
  },
  {
    id: "N_S01_IPAS",
    siswaId: "S01",
    mapelId: "IPAS",
    f1: 86, f2: 84, f3: 90, f4: 88,
    sumatifLingkup: 87,
    pts: 85,
    pas: 88,
    deskripsiCapaian: "Mampu menjelaskan daur hidup makhluk hidup dan interaksi ekosistem lingkungan dengan sangat tepat."
  },
  {
    id: "N_S01_TFZ",
    siswaId: "S01",
    mapelId: "TFZ",
    f1: 94, f2: 95, f3: 92, f4: 96,
    sumatifLingkup: 95,
    pts: 95,
    pas: 96,
    deskripsiCapaian: "Mumtaz dalam makhraj dan tajwid hafalan Juz 30 (Surat An-Naba s.d Al-Muthaffifin)."
  },
  // Siswa 02
  {
    id: "N_S02_PAI",
    siswaId: "S02",
    mapelId: "PAI",
    f1: 92, f2: 94, f3: 90, f4: 95,
    sumatifLingkup: 93,
    pts: 94,
    pas: 96,
    deskripsiCapaian: "Sangat istimewa dalam mengamalkan perilaku terpuji dan hafalan doa harian."
  },
  {
    id: "N_S02_MAT",
    siswaId: "S02",
    mapelId: "MAT",
    f1: 90, f2: 88, f3: 92, f4: 94,
    sumatifLingkup: 91,
    pts: 90,
    pas: 93,
    deskripsiCapaian: "Sangat terampil dalam konsep pecahan senilai dan pengukuran sudut."
  },
  {
    id: "N_S02_BIN",
    siswaId: "S02",
    mapelId: "BIN",
    f1: 90, f2: 92, f3: 95, f4: 91,
    sumatifLingkup: 92,
    pts: 93,
    pas: 94,
    deskripsiCapaian: "Luar biasa dalam membuat puisi anak dan berbicara sopan saat presentasi kelas."
  },
  {
    id: "N_S02_IPAS",
    siswaId: "S02",
    mapelId: "IPAS",
    f1: 88, f2: 90, f3: 89, f4: 92,
    sumatifLingkup: 90,
    pts: 91,
    pas: 92,
    deskripsiCapaian: "Menunjukkan pemahaman mendalam tentang perubahan bentuk energi di sekitar."
  },
  {
    id: "N_S02_TFZ",
    siswaId: "S02",
    mapelId: "TFZ",
    f1: 96, f2: 98, f3: 95, f4: 97,
    sumatifLingkup: 97,
    pts: 96,
    pas: 98,
    deskripsiCapaian: "Mutqin juz 30 dan tartil bacaan sangat indah."
  }
];

export const DEFAULT_ABS = [
  {
    id: "ABS_MAT_01",
    mapelId: "MAT",
    ujian: "PTS Semester 1",
    nomor: 1,
    indikator: "Menentukan nilai tempat bilangan ribuan",
    bentuk: "Pilihan Ganda",
    bobotMaks: 1,
    kunci: "B",
    skorSiswa: { S01: 1, S02: 1, S03: 1, S04: 1, S05: 1, S06: 1 }
  },
  {
    id: "ABS_MAT_02",
    mapelId: "MAT",
    ujian: "PTS Semester 1",
    nomor: 2,
    indikator: "Operasi hitung penjumlahan dengan teknik menyimpan",
    bentuk: "Pilihan Ganda",
    bobotMaks: 1,
    kunci: "C",
    skorSiswa: { S01: 1, S02: 1, S03: 1, S04: 1, S05: 0, S06: 1 }
  },
  {
    id: "ABS_MAT_03",
    mapelId: "MAT",
    ujian: "PTS Semester 1",
    nomor: 3,
    indikator: "Memecahkan soal cerita FPB dan KPK sederhana",
    bentuk: "Pilihan Ganda",
    bobotMaks: 1,
    kunci: "A",
    skorSiswa: { S01: 0, S02: 1, S03: 0, S04: 1, S05: 0, S06: 0 }
  },
  {
    id: "ABS_MAT_04",
    mapelId: "MAT",
    ujian: "PTS Semester 1",
    nomor: 4,
    indikator: "Menghitung luas persegi panjang dalam meter persegi",
    bentuk: "Isian",
    bobotMaks: 2,
    kunci: "48 cm2",
    skorSiswa: { S01: 2, S02: 2, S03: 1, S04: 2, S05: 1, S06: 1 }
  },
  {
    id: "ABS_MAT_05",
    mapelId: "MAT",
    ujian: "PTS Semester 1",
    nomor: 5,
    indikator: "Menganalisis perbandingan pecahan senilai dengan gambar ilustrasi",
    bentuk: "Uraian",
    bobotMaks: 4,
    kunci: "Uraian cara pembuktian pecahan 2/4 = 1/2",
    skorSiswa: { S01: 3, S02: 4, S03: 2, S04: 4, S05: 2, S06: 3 }
  }
];

export const DEFAULT_SIKAP = [
  {
    id: "SIKAP_S01",
    siswaId: "S01",
    berimanBertakwa: "Sangat Baik",
    berkebinekaan: "Baik",
    gotongRoyong: "Sangat Baik",
    mandiri: "Baik",
    bernalarKritis: "Baik",
    kreatif: "Sangat Baik",
    spiritualNote: "Selalu tertib dalam menegakkan salat Dhuha dan membaca doa harian di awal pembelajaran.",
    sosialNote: "Menunjukkan sikap santun kepada ustadz/ustadzah serta ramah dan suka membantu teman sebaya."
  },
  {
    id: "SIKAP_S02",
    siswaId: "S02",
    berimanBertakwa: "Sangat Baik",
    berkebinekaan: "Sangat Baik",
    gotongRoyong: "Sangat Baik",
    mandiri: "Sangat Baik",
    bernalarKritis: "Sangat Baik",
    kreatif: "Sangat Baik",
    spiritualNote: "Sangat istiqamah dalam tilawah Al-Qur'an dan selalu menjaga adab islami di lingkungan sekolah.",
    sosialNote: "Memiliki jiwa kepemimpinan positif, peduli pada kebersihan kelas, serta teladan bagi teman-temannya."
  }
];

export const DEFAULT_PRESENSI = [
  {
    id: "PRES_S01",
    siswaId: "S01",
    sakit: 1,
    izin: 0,
    alpa: 0,
    terlambat: 1,
    catatanWaliKelas: "Ananda Abdullah menunjukkan progres belajar yang sangat positif. Tetap pertahankan kedisiplinan dan semangat menghafal Al-Qur'an.",
    ekstrakurikuler: [
      { nama: "Pramuka Siaga", predikat: "A", keterangan: "Sangat aktif dalam kegiatan tali-temali dan baris-berbaris." },
      { nama: "Panahan Tradisional", predikat: "A", keterangan: "Memiliki fokus dan ketenangan yang sangat baik saat membidik sasaran." }
    ],
    prestasi: [
      { nama: "Juara 2 Lomba MHQ Juz 30 Tingkat Kecamatan", tahun: "2025" }
    ]
  },
  {
    id: "PRES_S02",
    siswaId: "S02",
    sakit: 0,
    izin: 1,
    alpa: 0,
    terlambat: 0,
    catatanWaliKelas: "Pertahankan prestasi gemilang ananda Fathimah. Semoga senantiasa rendah hati dan terus menjadi kebanggaan orang tua dan guru.",
    ekstrakurikuler: [
      { nama: "Tahsin Al-Qur'an", predikat: "A", keterangan: "Sangat fasih dalam kaidah mad dan sifat huruf." },
      { nama: "Kaligrafi Islam", predikat: "A", keterangan: "Goresan khat naskhi sangat rapi dan proporsional." }
    ],
    prestasi: [
      { nama: "Juara 1 Lomba Cerdas Cermat PAI Tingkat Kota", tahun: "2025" }
    ]
  }
];
