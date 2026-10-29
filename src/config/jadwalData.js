/**
 * DATA JADWAL PELAJARAN SD AL-IMAM ISLAMIC SCHOOL
 * TAHUN PELAJARAN 2026-2027
 * Sesuai Dokumen Resmi Spreadsheet:
 * - Tab: HOME (Profil & Identitas GTK)
 * - Tab: 1. Struktur Kurikulum (Komponen JP Mata Pelajaran & Mulok)
 * - Tab: Jadwal Gabungan (Matriks Lengkap Kelas Bawah & Kelas Atas)
 * - Tab: Kelas 1, 2, 3, 4, 5, 6 (Format Resmi Lembar Jadwal per Rombel + Seragam & Tanda Tangan)
 * - Tab: Bidang Study (Jadwal Mengajar per Guru Mapel & Wali Kelas)
 */

export const SEKOLAH_IDENTITAS = {
  namaSekolah: "SD Al Imam Islamic School",
  npsn: "20253872",
  nss: "102020207062",
  alamat: "Limus Pratama Regensi Jl. Blitar Blok E. 12/7B",
  kelurahan: "Limusnunggal",
  kecamatan: "Cileungsi",
  kabupaten: "Bogor",
  provinsi: "Jawa Barat",
  kodePos: "16820",
  kepalaSekolah: "Radinal Amnan Bajsair, S.Kom",
  tahunPelajaran: "2026-2027",
  motto: "BERAQIDAH - BERAKHLAK - BERPRESTASI"
};

// DAFTAR KODE MATA PELAJARAN & WARNA RESMI SESUAI SPREADSHEET
export const MAPEL_KODE = {
  Q: {
    kode: "Q",
    namaSingkat: "AL-QUR'AN",
    nama: "Al-Quran (Tahsin & Tahfidz)",
    kategori: "Al-Qur'an",
    guruTipe: "Guru Kholaqoh / Mapel",
    badgeClass: "bg-emerald-300 text-emerald-950 border-emerald-400 font-black",
    hex: "#86efac"
  },
  A: {
    kode: "A",
    namaSingkat: "AQIDAH",
    nama: "Aqidah",
    kategori: "PAI",
    guruTipe: "Guru Mapel PAI",
    badgeClass: "bg-amber-200 text-amber-950 border-amber-300 font-black",
    hex: "#fde68a"
  },
  F: {
    kode: "F",
    namaSingkat: "FIKIH",
    nama: "Fikih",
    kategori: "PAI",
    guruTipe: "Guru Mapel PAI",
    badgeClass: "bg-orange-200 text-orange-950 border-orange-300 font-black",
    hex: "#fed7aa"
  },
  SKI: {
    kode: "SKI",
    namaSingkat: "SKI",
    nama: "Sejarah Kebudayaan Islam",
    kategori: "PAI",
    guruTipe: "Guru Mapel PAI",
    badgeClass: "bg-amber-300 text-amber-950 border-amber-400 font-black",
    hex: "#fcd34d"
  },
  Math: {
    kode: "Math",
    namaSingkat: "MATHEMATICS",
    nama: "Mathematics (Cambridge)",
    kategori: "Muatan Lokal",
    guruTipe: "Guru Mapel Math",
    badgeClass: "bg-yellow-300 text-yellow-950 border-yellow-400 font-black",
    hex: "#fde047"
  },
  PJOK: {
    kode: "PJOK",
    namaSingkat: "PJOK",
    nama: "Pendidikan Jasmani, Olahraga & Kesehatan",
    kategori: "Olahraga",
    guruTipe: "Guru Mapel PJOK",
    badgeClass: "bg-lime-300 text-lime-950 border-lime-400 font-black",
    hex: "#bef264"
  },
  BA: {
    kode: "BA",
    namaSingkat: "B.ARAB",
    nama: "Bahasa Arab",
    kategori: "Muatan Lokal",
    guruTipe: "Guru Mapel B. Arab",
    badgeClass: "bg-sky-300 text-sky-950 border-sky-400 font-black",
    hex: "#7dd3fc"
  },
  BI: {
    kode: "BI",
    namaSingkat: "B.INGGRIS",
    nama: "Bahasa Inggris Kelas 1-6",
    kategori: "Muatan Lokal",
    guruTipe: "Guru Mapel B. Inggris",
    badgeClass: "bg-pink-300 text-pink-950 border-pink-400 font-black",
    hex: "#f472b6"
  },
  K: {
    kode: "K",
    namaSingkat: "INFORMATIKA",
    nama: "Informatika / Komputer",
    kategori: "Informatika",
    guruTipe: "Guru Mapel Komputer",
    badgeClass: "bg-amber-400 text-amber-950 border-amber-500 font-black",
    hex: "#fbbf24"
  },
  "B.Ind": {
    kode: "B.Ind",
    namaSingkat: "B.INDONESIA",
    nama: "Bahasa Indonesia",
    kategori: "Wajib Nasional",
    guruTipe: "Wali Kelas",
    badgeClass: "bg-purple-200 text-purple-950 border-purple-300 font-black",
    hex: "#e9d5ff"
  },
  MTK: {
    kode: "MTK",
    namaSingkat: "MATEMATIKA",
    nama: "Matematika (Nasional)",
    kategori: "Wajib Nasional",
    guruTipe: "Wali Kelas",
    badgeClass: "bg-blue-300 text-blue-950 border-blue-400 font-black",
    hex: "#93c5fd"
  },
  AD: {
    kode: "AD",
    namaSingkat: "ADAB AHLAK",
    nama: "Adab dan Akhlak",
    kategori: "PAI",
    guruTipe: "Wali Kelas",
    badgeClass: "bg-red-600 text-white border-red-700 font-black shadow-xs",
    hex: "#dc2626"
  },
  Seni: {
    kode: "Seni",
    namaSingkat: "SENI BUDAYA",
    nama: "Seni Budaya / Seni Rupa",
    kategori: "Wajib Nasional",
    guruTipe: "Wali Kelas",
    badgeClass: "bg-stone-200 text-stone-900 border-stone-300 font-black",
    hex: "#e7e5e4"
  },
  MIPAS: {
    kode: "MIPAS",
    namaSingkat: "IPAS",
    nama: "Ilmu Pengetahuan Alam dan Sosial (IPAS)",
    kategori: "Wajib Nasional",
    guruTipe: "Wali Kelas",
    badgeClass: "bg-teal-200 text-teal-950 border-teal-300 font-black",
    hex: "#99f6e4"
  },
  BS: {
    kode: "BS",
    namaSingkat: "B.SUNDA",
    nama: "Bahasa Daerah (Bahasa Sunda)",
    kategori: "Muatan Lokal",
    guruTipe: "Wali Kelas",
    badgeClass: "bg-violet-300 text-violet-950 border-violet-400 font-black",
    hex: "#c4b5fd"
  },
  PP: {
    kode: "PP",
    namaSingkat: "P.PANCASILA",
    nama: "Pendidikan Pancasila & Kewarganegaraan",
    kategori: "Wajib Nasional",
    guruTipe: "Wali Kelas",
    badgeClass: "bg-slate-100 text-slate-800 border-slate-300 font-black",
    hex: "#f1f5f9"
  },
  Pramuka: {
    kode: "Pramuka",
    namaSingkat: "PRAMUKA",
    nama: "Pramuka (Ekstrakurikuler Wajib)",
    kategori: "Ekstrakurikuler",
    guruTipe: "Pembina Pramuka",
    badgeClass: "bg-amber-800 text-white border-amber-900 font-black",
    hex: "#92400e"
  },
  Literasi: {
    kode: "Literasi",
    namaSingkat: "LITERASI",
    nama: "Literasi Siswa",
    kategori: "Pembiasaan",
    guruTipe: "Wali Kelas",
    badgeClass: "bg-slate-50 text-slate-600 border-slate-200 italic font-bold",
    hex: "#f8fafc"
  },
  Murajaah: {
    kode: "Murajaah",
    namaSingkat: "MURAJA'AH",
    nama: "Muraja'ah Hafalan Al-Qur'an",
    kategori: "Al-Qur'an",
    guruTipe: "Wali Kelas / Guru Kholaqoh",
    badgeClass: "bg-lime-100 text-lime-950 border-lime-300 font-bold",
    hex: "#d9f99d"
  },
  Responsi: {
    kode: "Responsi",
    namaSingkat: "PULANG",
    nama: "Prosesi Pulang Bersama (Responsi / Pengayaan)",
    kategori: "Bimbingan",
    guruTipe: "Wali Kelas",
    badgeClass: "bg-slate-900 text-white border-slate-900 font-black",
    hex: "#0f172a"
  }
};

// TABEL STRUKTUR ALOKASI JAM PELAJARAN (JP) PER MINGGU
export const STRUKTUR_KURIKULUM = [
  {
    kategori: "A. MATA PELAJARAN",
    items: [
      { no: "1.a", mapel: "Pendidikan Agama Islam: Aqidah", kode: "A", k1: "2 JP", k2: "2 JP", k3: "2 JP", k4: "2 JP", k5: "2 JP", k6: "2 JP", jpTotalPekan: 4 },
      { no: "1.b", mapel: "Pendidikan Agama Islam: Fiqih", kode: "F", k1: "2 JP", k2: "2 JP", k3: "2 JP", k4: "2 JP", k5: "2 JP", k6: "2 JP", jpTotalPekan: 4 },
      { no: "1.c", mapel: "Pendidikan Agama Islam: Sejarah Kebudayaan Islam (SKI)", kode: "SKI", k1: "-", k2: "-", k3: "1 JP", k4: "1 JP", k5: "1 JP", k6: "1 JP", jpTotalPekan: 1 },
      { no: "1.d", mapel: "Pendidikan Agama Islam: Adab dan Akhlak", kode: "AD", k1: "2 JP", k2: "2 JP", k3: "2 JP", k4: "2 JP", k5: "2 JP", k6: "2 JP", jpTotalPekan: 12 },
      { no: "2", mapel: "Pendidikan Pancasila dan Kewarganegaraan", kode: "PP", k1: "2 JP", k2: "2 JP", k3: "2 JP", k4: "2 JP", k5: "2 JP", k6: "2 JP", jpTotalPekan: 2 },
      { no: "3", mapel: "Bahasa Indonesia", kode: "B.Ind", k1: "4 JP", k2: "4 JP", k3: "2 JP", k4: "5 JP", k5: "5 JP", k6: "5 JP", jpTotalPekan: 4 },
      { no: "4", mapel: "Ilmu Pengetahuan Alam dan Sosial (MIPAS)", kode: "MIPAS", k1: "-", k2: "-", k3: "2 JP", k4: "5 JP", k5: "5 JP", k6: "5 JP", jpTotalPekan: 5 },
      { no: "5", mapel: "Seni Rupa / Seni Budaya", kode: "Seni", k1: "2 JP", k2: "2 JP", k3: "2 JP", k4: "2 JP", k5: "2 JP", k6: "2 JP", jpTotalPekan: 2 },
      { no: "6", mapel: "Bahasa Daerah (Bahasa Sunda)", kode: "BS", k1: "-", k2: "-", k3: "1 JP", k4: "1 JP", k5: "1 JP", k6: "1 JP", jpTotalPekan: 1 },
      { no: "7", mapel: "Matematika (Nasional)", kode: "MTK", k1: "2 JP", k2: "2 JP", k3: "2 JP", k4: "2 JP", k5: "2 JP", k6: "2 JP", jpTotalPekan: 2 },
      { no: "8", mapel: "Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)", kode: "PJOK", k1: "2 JP", k2: "2 JP", k3: "2 JP", k4: "2 JP", k5: "2 JP", k6: "2 JP", jpTotalPekan: 2 }
    ]
  },
  {
    kategori: "B. MUATAN LOKAL",
    items: [
      { no: "1", mapel: "Math (Matematika Inggris / Cambridge)", kode: "Math", k1: "4 JP", k2: "4 JP", k3: "4 JP", k4: "4 JP", k5: "4 JP", k6: "4 JP", jpTotalPekan: 4 },
      { no: "2", mapel: "Bahasa Arab", kode: "BA", k1: "2 JP", k2: "2 JP", k3: "2 JP", k4: "2 JP", k5: "2 JP", k6: "2 JP", jpTotalPekan: 2 },
      { no: "3", mapel: "Bahasa Inggris", kode: "BI", k1: "2 JP", k2: "2 JP", k3: "2 JP", k4: "2 JP", k5: "2 JP", k6: "2 JP", jpTotalPekan: 2 },
      { no: "4", mapel: "Informatika / Komputer", kode: "K", k1: "2 JP", k2: "2 JP", k3: "2 JP", k4: "2 JP", k5: "2 JP", k6: "2 JP", jpTotalPekan: 2 },
      { no: "5", mapel: "Al Quran (Tahsin & Tahfidz)", kode: "Q", k1: "10 JP", k2: "10 JP", k3: "10 JP", k4: "10 JP", k5: "10 JP", k6: "10 JP", jpTotalPekan: 10 }
    ]
  }
];

export const TOTAL_JP_SEMESTER = {
  k1: "44 JP (38 Reguler)",
  k2: "44 JP (38 Reguler)",
  k3: "44 JP (39 Reguler)",
  k4: "47 JP",
  k5: "47 JP",
  k6: "47 JP"
};

// JAM PELAJARAN HARIAN KELAS BAWAH (15 BARIS SESUAI LEMBAR RESMI KELAS 1, 2, 3)
export const JAM_PELAJARAN_KELAS_BAWAH = [
  { no: 1, jam: "07.15 - 07.30", label: "Upacara (Senin) / Dzikir Pagi (Selasa-Jumat)", isSpecial: true },
  { no: 2, jam: "07.30 - 08.00", label: "Jam Ke-1" },
  { no: 3, jam: "08.00 - 08.30", label: "Jam Ke-2" },
  { no: 4, jam: "08.30 - 09.00", label: "Jam Ke-3" },
  { no: 5, jam: "09.00 - 09.30", label: "Jam Ke-4" },
  { no: 6, jam: "09.30 - 10.00", label: "ISTIRAHAT", isBreak: true },
  { no: 7, jam: "10.00 - 10.30", label: "Shalat Duha, Muraja'ah, & Kultum", isSpecial: true },
  { no: 8, jam: "10.30 - 11.00", label: "Jam Ke-5" },
  { no: 9, jam: "11.00 - 11.30", label: "Jam Ke-6" },
  { no: 10, jam: "11.30 - 12.00", label: "LITERASI (Jumat: SHOLAT JUMAT)", isSpecial: true },
  { no: 11, jam: "12.00 - 13.00", label: "Makan Siang - Shalat Dzuhur Berjama'ah (Jumat: PULANG)", isBreak: true },
  { no: 12, jam: "13.00 - 13.30", label: "Jam Ke-7" },
  { no: 13, jam: "13.30 - 14.00", label: "Jam Ke-8" },
  { no: 14, jam: "14.00 - 14.10", label: "MURAJA'AH", isSpecial: true },
  { no: 15, jam: "14.10", label: "PULANG", isSpecial: true }
];

// JAM PELAJARAN HARIAN KELAS ATAS (17 BARIS SESUAI LEMBAR RESMI KELAS 4, 5, 6)
export const JAM_PELAJARAN_KELAS_ATAS = [
  { no: 1, jam: "07.15 - 07.30", label: "Upacara (Senin) / Dzikir Pagi (Selasa-Jumat)", isSpecial: true },
  { no: 2, jam: "07.30 - 08.00", label: "Jam Ke-1" },
  { no: 3, jam: "08.00 - 08.30", label: "Jam Ke-2" },
  { no: 4, jam: "08.30 - 09.00", label: "Jam Ke-3" },
  { no: 5, jam: "09.00 - 09.30", label: "Jam Ke-4" },
  { no: 6, jam: "09.30 - 10.00", label: "ISTIRAHAT", isBreak: true },
  { no: 7, jam: "10.00 - 10.30", label: "Shalat Duha, Muraja'ah, & Kultum", isSpecial: true },
  { no: 8, jam: "10.30 - 11.00", label: "Jam Ke-5" },
  { no: 9, jam: "11.00 - 11.30", label: "Jam Ke-6" },
  { no: 10, jam: "11.30 - 12.00", label: "LITERASI (Jumat: SHOLAT JUMAT / KEPUTRIAN)", isSpecial: true },
  { no: 11, jam: "12.00 - 13.00", label: "Makan Siang - Shalat Dzuhur Berjama'ah", isBreak: true },
  { no: 12, jam: "13.00 - 13.30", label: "Jam Ke-7 (Jumat: PRAMUKA)" },
  { no: 13, jam: "13.30 - 14.00", label: "Jam Ke-8 (Jumat: PRAMUKA lalu PULANG)" },
  { no: 14, jam: "14.00 - 14.30", label: "Jam Ke-9" },
  { no: 15, jam: "14.30 - 15.00", label: "Jam Ke-10" },
  { no: 16, jam: "15.00 - 15.30", label: "Shalat Ashar Berjamaah", isSpecial: true },
  { no: 17, jam: "15.30", label: "PULANG", isSpecial: true }
];

// DAFTAR ROMBEL KELAS LENGKAP DENGAN WALI KELAS & KETENTUAN SERAGAM RESMI
export const DAFTAR_KELAS = [
  // Kelas 1
  { 
    id: "1Umar", 
    nama: "1 Abdullah Ibnu Umar", 
    tingkat: 1, 
    wali: "Siti Habzah Diniyanti, S.Sos", 
    kategori: "Kelas Bawah",
    totalJPEfektif: 38,
    seragam: {
      SENIN: "MERAH PUTIH",
      SELASA: "HIJAU",
      RABU: "BATIK",
      KAMIS: "OLAHRAGA",
      JUMAT: "KOTAK-KOTAK"
    }
  },
  { 
    id: "1Abbas", 
    nama: "1 Abdullah Ibnu Abbas", 
    tingkat: 1, 
    wali: "Putri Hidayah, S.Pd", 
    kategori: "Kelas Bawah",
    totalJPEfektif: 38,
    seragam: {
      SENIN: "MERAH PUTIH",
      SELASA: "HIJAU",
      RABU: "BATIK",
      KAMIS: "OLAHRAGA",
      JUMAT: "KOTAK-KOTAK"
    }
  },

  // Kelas 2
  { 
    id: "2Waqqash", 
    nama: "2 Sa'ad Bin Abi Waqqash", 
    tingkat: 2, 
    wali: "Syahnatun Nurbaitih, S.Pd", 
    kategori: "Kelas Bawah",
    totalJPEfektif: 38,
    seragam: {
      SENIN: "OLAHRAGA",
      SELASA: "HIJAU",
      RABU: "BATIK",
      KAMIS: "KOTAK-KOTAK",
      JUMAT: "MERAH PUTIH"
    }
  },
  { 
    id: "2Zaid", 
    nama: "2 Sa'ad Bin Zaid", 
    tingkat: 2, 
    wali: "Lauren Pratama Sari, S.Pd., Gr.", 
    kategori: "Kelas Bawah",
    totalJPEfektif: 38,
    seragam: {
      SENIN: "OLAHRAGA",
      SELASA: "HIJAU",
      RABU: "BATIK",
      KAMIS: "KOTAK-KOTAK",
      JUMAT: "MERAH PUTIH"
    }
  },

  // Kelas 3
  { 
    id: "3Zuhair", 
    nama: "3 Ka'ab Bin Zuhair", 
    tingkat: 3, 
    wali: "Nurul wahyuni, S.Pd.", 
    kategori: "Kelas Bawah",
    totalJPEfektif: 39,
    seragam: {
      SENIN: "OLAHRAGA",
      SELASA: "HIJAU",
      RABU: "BATIK",
      KAMIS: "KOTAK-KOTAK",
      JUMAT: "MERAH PUTIH"
    }
  },
  { 
    id: "3Malik", 
    nama: "3 Ka'ab Bin Malik", 
    tingkat: 3, 
    wali: "Nurul Fadlillah, S.Pd.", 
    kategori: "Kelas Bawah",
    totalJPEfektif: 39,
    seragam: {
      SENIN: "OLAHRAGA",
      SELASA: "HIJAU",
      RABU: "BATIK",
      KAMIS: "KOTAK-KOTAK",
      JUMAT: "MERAH PUTIH"
    }
  },

  // Kelas 4
  { 
    id: "4Ali", 
    nama: "4 Ali Bin Abi Thalib", 
    tingkat: 4, 
    wali: "Zahra Aulia, S.Pd.", 
    kategori: "Kelas Atas",
    totalJPEfektif: 47,
    seragam: {
      SENIN: "MERAH PUTIH",
      SELASA: "HIJAU",
      RABU: "BATIK & OLAHRAGA",
      KAMIS: "KOTAK-KOTAK",
      JUMAT: "PRAMUKA"
    }
  },
  { 
    id: "4Sumayyah", 
    nama: "4 Sumayyah Binti Khayyat", 
    tingkat: 4, 
    wali: "Afrida Rosita Dewi, S.Pd., Gr.", 
    kategori: "Kelas Atas",
    totalJPEfektif: 47,
    seragam: {
      SENIN: "MERAH PUTIH",
      SELASA: "HIJAU",
      RABU: "BATIK & OLAHRAGA",
      KAMIS: "KOTAK-KOTAK",
      JUMAT: "PRAMUKA"
    }
  },

  // Kelas 5
  { 
    id: "5Utsman", 
    nama: "5 Utsman Bin Affan", 
    tingkat: 5, 
    wali: "Adhisti Nur Alifah, S.Pd.", 
    kategori: "Kelas Atas",
    totalJPEfektif: 47,
    seragam: {
      SENIN: "MERAH PUTIH",
      SELASA: "HIJAU",
      RABU: "BATIK",
      KAMIS: "KOTAK-KOTAK",
      JUMAT: "PRAMUKA & OLAHRAGA"
    }
  },
  { 
    id: "5Rumaysha", 
    nama: "5 Rummaysha Binti Malhan", 
    tingkat: 5, 
    wali: "Heni Mariyah Umrah, S.Pd., Gr.", 
    kategori: "Kelas Atas",
    totalJPEfektif: 47,
    seragam: {
      SENIN: "MERAH PUTIH",
      SELASA: "HIJAU",
      RABU: "BATIK",
      KAMIS: "KOTAK-KOTAK",
      JUMAT: "PRAMUKA & OLAHRAGA"
    }
  },

  // Kelas 6
  { 
    id: "6Abu", 
    nama: "6 Abu Bakar Ash-Shiddiq", 
    tingkat: 6, 
    wali: "Muhammad Ihsan, S.Pd", 
    kategori: "Kelas Atas",
    totalJPEfektif: 47,
    seragam: {
      SENIN: "MERAH PUTIH",
      SELASA: "HIJAU",
      RABU: "BATIK & OLAHRAGA",
      KAMIS: "KOTAK-KOTAK",
      JUMAT: "PRAMUKA"
    }
  },
  { 
    id: "6Umar", 
    nama: "6 Umar Bin Khattab", 
    tingkat: 6, 
    wali: "Ahmad Fauzi, S.Pd", 
    kategori: "Kelas Atas",
    totalJPEfektif: 47,
    seragam: {
      SENIN: "MERAH PUTIH",
      SELASA: "HIJAU",
      RABU: "BATIK & OLAHRAGA",
      KAMIS: "KOTAK-KOTAK",
      JUMAT: "PRAMUKA"
    }
  },
  { 
    id: "6Hafshah", 
    nama: "6 Hafshah Binti Umar", 
    tingkat: 6, 
    wali: "Umi Kulsum, S.Pd", 
    kategori: "Kelas Atas",
    totalJPEfektif: 47,
    seragam: {
      SENIN: "MERAH PUTIH",
      SELASA: "HIJAU",
      RABU: "BATIK & OLAHRAGA",
      KAMIS: "KOTAK-KOTAK",
      JUMAT: "PRAMUKA"
    }
  }
];

// MATRIKS JADWAL PELAJARAN LENGKAP SENIN - JUM'AT (BERDASARKAN SPREADSHEET RESMI KELAS 1, 2, 3, 4, 5, 6 & GABUNGAN)
export const JADWAL_GABUNGAN = {
  SENIN: {
    label: "Senin",
    kelasBawah: {
      "1Umar": ["Q", "Q", "Math", "Math", "A", "A", "AD", "AD"],
      "1Abbas": ["Q", "Q", "A", "A", "Math", "Math", "BA", "BA"],
      "2Waqqash": ["Q", "Q", "PJOK", "PJOK", "AD", "AD", "PP", "PP"],
      "2Zaid": ["Q", "Q", "PJOK", "PJOK", "AD", "AD", "PP", "PP"],
      "3Zuhair": ["PJOK", "PJOK", "K", "K", "Q", "Q", "Math", "Math"],
      "3Malik": ["PJOK", "PJOK", "B.Ind", "B.Ind", "Q", "Q", "K", "K"]
    },
    kelasAtas: {
      "4Ali": ["K", "K", "Math", "Math", "Q", "Q", "MIPAS", "MIPAS", "PP", "PP"],
      "4Sumayyah": ["Math", "Math", "BA", "BA", "Q", "Q", "MIPAS", "MIPAS", "K", "K"],
      "5Utsman": ["AD", "AD", "Q", "Q", "PP", "PP", "Math", "Math", "MIPAS", "MIPAS"],
      "5Rumaysha": ["AD", "AD", "Q", "Q", "Math", "Math", "PP", "PP", "MIPAS", "MIPAS"],
      "6Abu": ["MIPAS", "MIPAS", "Q", "Q", "A", "A", "MIPAS", "MIPAS", "SKI", "SKI"],
      "6Umar": ["MIPAS", "MIPAS", "Q", "Q", "A", "A", "MIPAS", "MIPAS", "BS", "BS"],
      "6Hafshah": ["A", "A", "Q", "Q", "B.Ind", "B.Ind", "MIPAS", "MIPAS", "SKI", "SKI"]
    }
  },
  SELASA: {
    label: "Selasa",
    kelasBawah: {
      "1Umar": ["Q", "Q", "B.Ind", "B.Ind", "BI", "BI", "BA", "BA"],
      "1Abbas": ["Q", "Q", "BI", "BI", "B.Ind", "B.Ind", "AD", "AD"],
      "2Waqqash": ["Q", "Q", "Math", "Math", "BA", "BA", "B.Ind", "B.Ind"],
      "2Zaid": ["Q", "Q", "BA", "BA", "Math", "Math", "B.Ind", "B.Ind"],
      "3Zuhair": ["Math", "Math", "A", "A", "Q", "Q", "B.Ind", "B.Ind"],
      "3Malik": ["A", "A", "PP", "PP", "Q", "Q", "Math", "Math"]
    },
    kelasAtas: {
      "4Ali": ["BA", "BA", "B.Ind", "B.Ind", "Q", "Q", "A", "A", "Math", "Math"],
      "4Sumayyah": ["Math", "Math", "A", "A", "Q", "Q", "PP", "PP", "B.Ind", "B.Ind"],
      "5Utsman": ["BI", "BI", "Q", "Q", "F", "F", "Math", "Math", "B.Ind", "BS"],
      "5Rumaysha": ["F", "F", "Q", "Q", "Math", "Math", "BI", "BI", "BS", "MIPAS"],
      "6Abu": ["PJOK", "PJOK", "Q", "Q", "PP", "PP", "AD", "AD", "BI", "BI"],
      "6Umar": ["PJOK", "PJOK", "Q", "Q", "PP", "PP", "AD", "AD", "B.Ind", "B.Ind"],
      "6Hafshah": ["PJOK", "PJOK", "Q", "Q", "PP", "PP", "MIPAS", "MIPAS", "F", "F"]
    }
  },
  RABU: {
    label: "Rabu",
    kelasBawah: {
      "1Umar": ["Q", "Q", "Math", "Math", "B.Ind", "B.Ind", "K", "K"],
      "1Abbas": ["Q", "Q", "B.Ind", "B.Ind", "K", "K", "Math", "Math"],
      "2Waqqash": ["Q", "Q", "A", "A", "B.Ind", "B.Ind", "BI", "BI"],
      "2Zaid": ["Q", "Q", "BI", "BI", "B.Ind", "B.Ind", "A", "A"],
      "3Zuhair": ["F", "F", "PP", "PP", "Q", "Q", "BA", "BA"],
      "3Malik": ["Math", "Math", "BA", "BA", "Q", "Q", "MIPAS", "MIPAS"]
    },
    kelasAtas: {
      "4Ali": ["PJOK", "PJOK", "AD", "AD", "Q", "Q", "MIPAS", "MIPAS", "SKI", "BS"],
      "4Sumayyah": ["PJOK", "PJOK", "AD", "AD", "Q", "Q", "MIPAS", "MIPAS", "BS", "SKI"],
      "5Utsman": ["K", "K", "Q", "Q", "MIPAS", "MIPAS", "A", "A", "B.Ind", "B.Ind"],
      "5Rumaysha": ["MIPAS", "MIPAS", "Q", "Q", "A", "A", "B.Ind", "B.Ind", "K", "K"],
      "6Abu": ["BA", "BA", "Q", "Q", "Math", "Math", "MIPAS", "MIPAS", "F", "F"],
      "6Umar": ["F", "F", "Q", "Q", "BI", "BI", "Math", "Math", "MIPAS", "MIPAS"],
      "6Hafshah": ["BI", "BI", "Q", "Q", "MIPAS", "MIPAS", "B.Ind", "B.Ind", "Math", "Math"]
    }
  },
  KAMIS: {
    label: "Kamis",
    kelasBawah: {
      "1Umar": ["Q", "Q", "PJOK", "PJOK", "PP", "PP", "MTK", "MTK"],
      "1Abbas": ["Q", "Q", "PJOK", "PJOK", "MTK", "MTK", "PP", "PP"],
      "2Waqqash": ["Q", "Q", "Math", "Math", "F", "F", "K", "K"],
      "2Zaid": ["Q", "Q", "K", "K", "Math", "Math", "F", "F"],
      "3Zuhair": ["BS", "SKI", "BI", "BI", "Q", "Q", "MIPAS", "MIPAS"],
      "3Malik": ["SKI", "BS", "F", "F", "Q", "Q", "BI", "BI"]
    },
    kelasAtas: {
      "4Ali": ["F", "F", "B.Ind", "B.Ind", "Q", "Q", "MIPAS", "B.Ind", "Seni", "Seni"],
      "4Sumayyah": ["B.Ind", "B.Ind", "F", "F", "Q", "Q", "MIPAS", "B.Ind", "Seni", "Seni"],
      "5Utsman": ["Seni", "Seni", "Q", "Q", "MTK", "MTK", "MIPAS", "SKI", "BA", "BA"],
      "5Rumaysha": ["Seni", "Seni", "Q", "Q", "MTK", "MTK", "BA", "BA", "SKI", "B.Ind"],
      "6Abu": ["BS", "BS", "Q", "Q", "Seni", "Seni", "Math", "Math", "K", "K"],
      "6Umar": ["B.Ind", "B.Ind", "Q", "Q", "BA", "BA", "Seni", "Seni", "Math", "Math"],
      "6Hafshah": ["BA", "BA", "Q", "Q", "Math", "Math", "AD", "AD", "Seni", "Seni"]
    }
  },
  JUMAT: {
    label: "Jum'at",
    kelasBawah: {
      "1Umar": ["Q", "Q", "Seni", "Seni", "F", "F"],
      "1Abbas": ["Q", "Q", "F", "F", "Seni", "Seni"],
      "2Waqqash": ["Q", "Q", "MTK", "MTK", "Seni", "Seni"],
      "2Zaid": ["Q", "Q", "MTK", "MTK", "Seni", "Seni"],
      "3Zuhair": ["MTK", "MTK", "Seni", "Seni", "Q", "Q"],
      "3Malik": ["MTK", "MTK", "Seni", "Seni", "Q", "Q"]
    },
    kelasAtas: {
      "4Ali": ["BI", "BI", "MTK", "MTK", "Q", "Q", "Pramuka", "Pramuka"],
      "4Sumayyah": ["MTK", "MTK", "BI", "BI", "Q", "Q", "Pramuka", "Pramuka"],
      "5Utsman": ["PJOK", "PJOK", "Q", "Q", "B.Ind", "B.Ind", "Pramuka", "Pramuka"],
      "5Rumaysha": ["PJOK", "PJOK", "Q", "Q", "B.Ind", "B.Ind", "Pramuka", "Pramuka"],
      "6Abu": ["AD", "AD", "Q", "Q", "MTK", "MTK", "Pramuka", "Pramuka"],
      "6Umar": ["MTK", "MTK", "Q", "Q", "K", "K", "Pramuka", "Pramuka"],
      "6Hafshah": ["K", "K", "Q", "Q", "MTK", "MTK", "Pramuka", "Pramuka"]
    }
  }
};

// JAM BLOK KBM KELAS BAWAH (8 Sesi Pembelajaran per hari Senin-Kamis, 6 di hari Jumat)
export const SESI_KELAS_BAWAH = [
  { sesi: 1, jam: "07.30 - 08.00" },
  { sesi: 2, jam: "08.00 - 08.30" },
  { sesi: 3, jam: "08.30 - 09.00" },
  { sesi: 4, jam: "09.00 - 09.30" },
  { sesi: 5, jam: "10.30 - 11.00" },
  { sesi: 6, jam: "11.00 - 11.30" },
  { sesi: 7, jam: "13.00 - 13.30" },
  { sesi: 8, jam: "13.30 - 14.00" }
];

// JAM BLOK KBM KELAS ATAS (10 Sesi Pembelajaran per hari Senin-Kamis, 8 di hari Jumat)
export const SESI_KELAS_ATAS = [
  { sesi: 1, jam: "07.30 - 08.00" },
  { sesi: 2, jam: "08.00 - 08.30" },
  { sesi: 3, jam: "08.30 - 09.00" },
  { sesi: 4, jam: "09.00 - 09.30" },
  { sesi: 5, jam: "10.30 - 11.00" },
  { sesi: 6, jam: "11.00 - 11.30" },
  { sesi: 7, jam: "13.00 - 13.30" },
  { sesi: 8, jam: "13.30 - 14.00" },
  { sesi: 9, jam: "14.00 - 14.30" },
  { sesi: 10, jam: "14.30 - 15.00" }
];
