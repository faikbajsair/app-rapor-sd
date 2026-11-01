/**
 * administrasiData.js
 * Master Data Administrasi Wali Kelas & Buku Kerja Guru (I & II)
 * SD Al-Imam Islamic School - Tahun Pelajaran 2026/2027
 * Mengacu pada dokumen spreadsheet resmi: "I. Plan guru Kelas I A_T.P 2026-2027"
 */

import { SEKOLAH_IDENTITAS, DAFTAR_KELAS } from './jadwalData';

// DAFTAR 20 SISWA RESMI KELAS 1 ABDULLAH IBNU UMAR (SESUAI SHEET DATA SISWA SPREADSHEET)
export const SISWA_KELAS_1_UMAR = [
  { no: 1, nis: "262701021", nisn: "-", nama: "ADREENA ASHFAHANI OHIRA", jk: "P", tempatLahir: "Bogor", tanggalLahir: "2019-05-14", agama: "Islam", pendidikanSebelumnya: "TK AL IMAM ISLAMIC SCHOOL", alamat: "Limus Pratama Regensi, Cileungsi", namaAyah: "Ohira Pratama", namaIbu: "Siti Rahmah", golDarah: "A", alergi: "Tidak Ada", catatanKesehatan: "Sehat Wal'afiat" },
  { no: 2, nis: "262701022", nisn: "-", nama: "AHMAD ZAYYAN ALTHAF", jk: "L", tempatLahir: "Jakarta", tanggalLahir: "2019-03-22", agama: "Islam", pendidikanSebelumnya: "TK AL IMAM ISLAMIC SCHOOL", alamat: "Kota Wisata Cibubur", namaAyah: "Althaf Hidayat", namaIbu: "Nurul Aini", golDarah: "O", alergi: "Debu", catatanKesehatan: "Sehat" },
  { no: 3, nis: "262701023", nisn: "-", nama: "ALISYA RIHANNA MANGKIALO", jk: "P", tempatLahir: "Bekasi", tanggalLahir: "2019-07-10", agama: "Islam", pendidikanSebelumnya: "TK AL IMAM ISLAMIC SCHOOL", alamat: "Cikeas Udik, Gunung Putri", namaAyah: "Mangkialo", namaIbu: "Dewi Lestari", golDarah: "B", alergi: "Tidak Ada", catatanKesehatan: "Sehat" },
  { no: 4, nis: "262701024", nisn: "-", nama: "ANNASYA SHAHLIA", jk: "P", tempatLahir: "Bogor", tanggalLahir: "2019-04-18", agama: "Islam", pendidikanSebelumnya: "TK AL IMAM ISLAMIC SCHOOL", alamat: "Cileungsi Hijau", namaAyah: "Syahlan", namaIbu: "Aulia Nur", golDarah: "AB", alergi: "Udang/Seafood", catatanKesehatan: "Perlu pantauan saat makan bersama" },
  { no: 5, nis: "262701025", nisn: "-", nama: "ASIYAH AHMAD", jk: "P", tempatLahir: "Jakarta", tanggalLahir: "2019-08-30", agama: "Islam", pendidikanSebelumnya: "TK", alamat: "Metland Cileungsi", namaAyah: "Ahmad Fauzi", namaIbu: "Maryam", golDarah: "O", alergi: "Tidak Ada", catatanKesehatan: "Sehat" },
  { no: 6, nis: "262701027", nisn: "-", nama: "DANISH SALAHUDDIN ALHUSAIN FAHRIAL", jk: "L", tempatLahir: "Depok", tanggalLahir: "2019-01-15", agama: "Islam", pendidikanSebelumnya: "TK AL IMAM ISLAMIC SCHOOL", alamat: "Puri Cileungsi", namaAyah: "Fahrial Husain", namaIbu: "Nadia", golDarah: "B", alergi: "Tidak Ada", catatanKesehatan: "Sehat" },
  { no: 7, nis: "262701028", nisn: "-", nama: "DAVIN ALFARIZQY", jk: "L", tempatLahir: "Bogor", tanggalLahir: "2019-09-05", agama: "Islam", pendidikanSebelumnya: "TK AL IMAM ISLAMIC SCHOOL", alamat: "Harvest City Cileungsi", namaAyah: "Rizky Ramadhan", namaIbu: "Fitriani", golDarah: "A", alergi: "Dingin/Rhinitis", catatanKesehatan: "Sering bersin di udara dingin" },
  { no: 8, nis: "262701029", nisn: "-", nama: "ERKA DANURDARA", jk: "L", tempatLahir: "Bogor", tanggalLahir: "2019-06-12", agama: "Islam", pendidikanSebelumnya: "TK", alamat: "Limus Pratama Regensi", namaAyah: "Danang Danurdara", namaIbu: "Ratih Puspita", golDarah: "O", alergi: "Tidak Ada", catatanKesehatan: "Sehat" },
  { no: 9, nis: "262701030", nisn: "-", nama: "EZRA ABDURRAHMAN TASLIM", jk: "L", tempatLahir: "Jakarta", tanggalLahir: "2019-02-28", agama: "Islam", pendidikanSebelumnya: "TK AL IMAM ISLAMIC SCHOOL", alamat: "Kota Wisata, Cibubur", namaAyah: "Taslim Taslim", namaIbu: "Hanna", golDarah: "B", alergi: "Tidak Ada", catatanKesehatan: "Sehat" },
  { no: 10, nis: "262701031", nisn: "-", nama: "FATIH AFKAR ALHANAN", jk: "L", tempatLahir: "Bogor", tanggalLahir: "2019-11-20", agama: "Islam", pendidikanSebelumnya: "TK", alamat: "Cileungsi Asri", namaAyah: "Alhanan", namaIbu: "Siti Zulaikha", golDarah: "O", alergi: "Tidak Ada", catatanKesehatan: "Sehat" },
  { no: 11, nis: "262701032", nisn: "-", nama: "FREYA ANJANI HUMAIRA", jk: "P", tempatLahir: "Bekasi", tanggalLahir: "2019-07-24", agama: "Islam", pendidikanSebelumnya: "TK AS SA'AD", alamat: "Bantar Gebang, Bekasi", namaAyah: "Budi Santoso", namaIbu: "Humaira", golDarah: "A", alergi: "Kacang", catatanKesehatan: "Sehat" },
  { no: 12, nis: "262701008", nisn: "-", nama: "IBRAHIM HANIF WIJAYA", jk: "L", tempatLahir: "Bogor", tanggalLahir: "2019-03-08", agama: "Islam", pendidikanSebelumnya: "TK AL IMAM ISLAMIC SCHOOL", alamat: "Limus Pratama Regensi", namaAyah: "Hanif Wijaya", namaIbu: "Ratna Sari", golDarah: "B", alergi: "Tidak Ada", catatanKesehatan: "Sehat" },
  { no: 13, nis: "262701033", nisn: "-", nama: "KHALID ATHAFARIZ HANASAN", jk: "L", tempatLahir: "Jakarta", tanggalLahir: "2019-10-14", agama: "Islam", pendidikanSebelumnya: "TK AL IMAM ISLAMIC SCHOOL", alamat: "Legenda Wisata", namaAyah: "Hasanudin", namaIbu: "Farida", golDarah: "O", alergi: "Tidak Ada", catatanKesehatan: "Sehat" },
  { no: 14, nis: "262701034", nisn: "-", nama: "KHANSA SHAFIYYAH", jk: "P", tempatLahir: "Bogor", tanggalLahir: "2019-04-03", agama: "Islam", pendidikanSebelumnya: "TK AL FITYAN", alamat: "Cileungsi Setu", namaAyah: "Shafiq", namaIbu: "Amina", golDarah: "A", alergi: "Tidak Ada", catatanKesehatan: "Sehat" },
  { no: 15, nis: "262701035", nisn: "-", nama: "LABIQA SYAIRA IZZA DUANA", jk: "P", tempatLahir: "Depok", tanggalLahir: "2019-12-01", agama: "Islam", pendidikanSebelumnya: "TK AL IMAM ISLAMIC SCHOOL", alamat: "Cibubur Country", namaAyah: "Duana Saputra", namaIbu: "Izza Farhana", golDarah: "B", alergi: "Tidak Ada", catatanKesehatan: "Sehat" },
  { no: 16, nis: "262701037", nisn: "-", nama: "MUHAMMAD AL GHIFFARI", jk: "L", tempatLahir: "Jakarta", tanggalLahir: "2019-08-19", agama: "Islam", pendidikanSebelumnya: "TK AL IMAM ISLAMIC SCHOOL", alamat: "Kota Wisata", namaAyah: "Ghiffari", namaIbu: "Nurlina", golDarah: "O", alergi: "Tidak Ada", catatanKesehatan: "Sehat" },
  { no: 17, nis: "262701038", nisn: "-", nama: "MUHAMMAD ZAIN HAMIZAN", jk: "L", tempatLahir: "Bogor", tanggalLahir: "2019-05-27", agama: "Islam", pendidikanSebelumnya: "TK AL IMAM ISLAMIC SCHOOL", alamat: "Limus Pratama Regensi", namaAyah: "Hamizan Syah", namaIbu: "Zainab", golDarah: "A", alergi: "Tidak Ada", catatanKesehatan: "Sehat" },
  { no: 18, nis: "262701039", nisn: "-", nama: "NASYAMA RANIA KHADIJAH", jk: "P", tempatLahir: "Bekasi", tanggalLahir: "2019-02-11", agama: "Islam", pendidikanSebelumnya: "TK AL IMAM ISLAMIC SCHOOL", alamat: "Metland Transyogi", namaAyah: "Raniawan", namaIbu: "Khadijah", golDarah: "B", alergi: "Tidak Ada", catatanKesehatan: "Sehat" },
  { no: 19, nis: "262701013", nisn: "-", nama: "PUTRI ARIEFIHI PRAJA", jk: "P", tempatLahir: "Bogor", tanggalLahir: "2019-09-17", agama: "Islam", pendidikanSebelumnya: "TK AL IMAM ISLAMIC SCHOOL", alamat: "Harvest City", namaAyah: "Praja Arief", namaIbu: "Sri Wahyuni", golDarah: "O", alergi: "Tidak Ada", catatanKesehatan: "Sehat" },
  { no: 20, nis: "262701040", nisn: "-", nama: "QUEENZA ARSYIFA ZHADELA", jk: "P", tempatLahir: "Jakarta", tanggalLahir: "2019-06-08", agama: "Islam", pendidikanSebelumnya: "TK AL IMAM ISLAMIC SCHOOL", alamat: "Kota Wisata, Cluster Virginia", namaAyah: "Zhadela", namaIbu: "Arsyifa", golDarah: "AB", alergi: "Tidak Ada", catatanKesehatan: "Sehat" }
];

// DATA WALI KELAS RESMI 12 ROMBEL (DENGAN IDENTITAS RESMI SPREADSHEET KELAS 1-A)
export const WALI_KELAS_ADMINISTRASI = {
  "1Umar": {
    kelas: "1 Abdullah Ibnu Umar",
    waliKelas: "Siti Habzah Diniyanti, S.Sos",
    nip: "-",
    nuptk: "-",
    tempatLahir: "Bogor",
    tanggalLahir: "27 Juli 1999",
    pendidikanTerakhir: "S1",
    jabatanGuru: "Guru Kelas",
    pangkatGol: "-",
    tugasMengajarKelas: "1 (Satu)",
    tahunAjaran: "2026-2027",
    namaSekolah: "SD Al Imam Islamic School",
    npsn: "20253872",
    nss: "102020207062",
    alamat: "Limus Pratama Regensi Jl. Blitar Blok E. 12/7B",
    kelurahanDesa: "Limusnunggal",
    kecamatan: "Cileungsi",
    kabupaten: "Bogor",
    provinsi: "Jawa Barat",
    fotoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80"
  },
  "1Abbas": {
    kelas: "1 Abdullah Ibnu Abbas",
    waliKelas: "Putri Hidayah, S.Pd",
    nip: "-",
    nuptk: "-",
    tempatLahir: "Jakarta",
    tanggalLahir: "14 Mei 1998",
    pendidikanTerakhir: "S1",
    jabatanGuru: "Guru Kelas",
    pangkatGol: "-",
    tugasMengajarKelas: "1 (Satu)",
    tahunAjaran: "2026-2027",
    namaSekolah: "SD Al Imam Islamic School",
    npsn: "20253872",
    nss: "102020207062",
    alamat: "Limus Pratama Regensi Jl. Blitar Blok E. 12/7B",
    kelurahanDesa: "Limusnunggal",
    kecamatan: "Cileungsi",
    kabupaten: "Bogor",
    provinsi: "Jawa Barat",
    fotoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
  },
  "2Waqqash": {
    kelas: "2 Sa'ad Bin Abi Waqqash",
    waliKelas: "Syahnatun Nurbaitih, S.Pd",
    nip: "-",
    nuptk: "-",
    tempatLahir: "Bekasi",
    tanggalLahir: "12 Oktober 1996",
    pendidikanTerakhir: "S1",
    jabatanGuru: "Guru Kelas",
    pangkatGol: "-",
    tugasMengajarKelas: "2 (Dua)",
    tahunAjaran: "2026-2027",
    namaSekolah: "SD Al Imam Islamic School",
    npsn: "20253872",
    nss: "102020207062",
    alamat: "Limus Pratama Regensi Jl. Blitar Blok E. 12/7B",
    kelurahanDesa: "Limusnunggal",
    kecamatan: "Cileungsi",
    kabupaten: "Bogor",
    provinsi: "Jawa Barat"
  },
  "2Zaid": {
    kelas: "2 Sa'ad Bin Zaid",
    waliKelas: "Lauren Pratama Sari, S.Pd., Gr.",
    nip: "-",
    nuptk: "6548773674230182",
    tempatLahir: "Jakarta",
    tanggalLahir: "08 Maret 1995",
    pendidikanTerakhir: "S1",
    jabatanGuru: "Guru Kelas",
    pangkatGol: "-",
    tugasMengajarKelas: "2 (Dua)",
    tahunAjaran: "2026-2027",
    namaSekolah: "SD Al Imam Islamic School",
    npsn: "20253872",
    nss: "102020207062",
    alamat: "Limus Pratama Regensi Jl. Blitar Blok E. 12/7B",
    kelurahanDesa: "Limusnunggal",
    kecamatan: "Cileungsi",
    kabupaten: "Bogor",
    provinsi: "Jawa Barat"
  },
  "3Zuhair": {
    kelas: "3 Ka'ab Bin Zuhair",
    waliKelas: "Nurul wahyuni, S.Pd.",
    nip: "-",
    nuptk: "-",
    tempatLahir: "Bogor",
    tanggalLahir: "19 September 1997",
    pendidikanTerakhir: "S1",
    jabatanGuru: "Guru Kelas",
    pangkatGol: "-",
    tugasMengajarKelas: "3 (Tiga)",
    tahunAjaran: "2026-2027",
    namaSekolah: "SD Al Imam Islamic School",
    npsn: "20253872",
    nss: "102020207062",
    alamat: "Limus Pratama Regensi Jl. Blitar Blok E. 12/7B",
    kelurahanDesa: "Limusnunggal",
    kecamatan: "Cileungsi",
    kabupaten: "Bogor",
    provinsi: "Jawa Barat"
  },
  "3Malik": {
    kelas: "3 Ka'ab Bin Malik",
    waliKelas: "Nurul Fadlillah, S.Pd.",
    nip: "-",
    nuptk: "-",
    tempatLahir: "Jakarta",
    tanggalLahir: "22 November 1996",
    pendidikanTerakhir: "S1",
    jabatanGuru: "Guru Kelas",
    pangkatGol: "-",
    tugasMengajarKelas: "3 (Tiga)",
    tahunAjaran: "2026-2027",
    namaSekolah: "SD Al Imam Islamic School",
    npsn: "20253872",
    nss: "102020207062",
    alamat: "Limus Pratama Regensi Jl. Blitar Blok E. 12/7B",
    kelurahanDesa: "Limusnunggal",
    kecamatan: "Cileungsi",
    kabupaten: "Bogor",
    provinsi: "Jawa Barat"
  },
  "4Ali": {
    kelas: "4 Ali Bin Abi Thalib",
    waliKelas: "Zahra Aulia, S.Pd.",
    nip: "-",
    nuptk: "-",
    tempatLahir: "Bogor",
    tanggalLahir: "15 Januari 1998",
    pendidikanTerakhir: "S1",
    jabatanGuru: "Guru Kelas",
    pangkatGol: "-",
    tugasMengajarKelas: "4 (Empat)",
    tahunAjaran: "2026-2027",
    namaSekolah: "SD Al Imam Islamic School",
    npsn: "20253872",
    nss: "102020207062",
    alamat: "Limus Pratama Regensi Jl. Blitar Blok E. 12/7B",
    kelurahanDesa: "Limusnunggal",
    kecamatan: "Cileungsi",
    kabupaten: "Bogor",
    provinsi: "Jawa Barat"
  },
  "4Sumayyah": {
    kelas: "4 Sumayyah Binti Khayyat",
    waliKelas: "Afrida Rosita Dewi, S.Pd., Gr.",
    nip: "-",
    nuptk: "0142774675230113",
    tempatLahir: "Malang",
    tanggalLahir: "20 April 1996",
    pendidikanTerakhir: "S1",
    jabatanGuru: "Guru Kelas",
    pangkatGol: "-",
    tugasMengajarKelas: "4 (Empat)",
    tahunAjaran: "2026-2027",
    namaSekolah: "SD Al Imam Islamic School",
    npsn: "20253872",
    nss: "102020207062",
    alamat: "Limus Pratama Regensi Jl. Blitar Blok E. 12/7B",
    kelurahanDesa: "Limusnunggal",
    kecamatan: "Cileungsi",
    kabupaten: "Bogor",
    provinsi: "Jawa Barat"
  },
  "5Utsman": {
    kelas: "5 Utsman Bin Affan",
    waliKelas: "Adhisti Nur Alifah, S.Pd.",
    nip: "-",
    nuptk: "-",
    tempatLahir: "Depok",
    tanggalLahir: "18 Mei 1999",
    pendidikanTerakhir: "S1",
    jabatanGuru: "Guru Kelas",
    pangkatGol: "-",
    tugasMengajarKelas: "5 (Lima)",
    tahunAjaran: "2026-2027",
    namaSekolah: "SD Al Imam Islamic School",
    npsn: "20253872",
    nss: "102020207062",
    alamat: "Limus Pratama Regensi Jl. Blitar Blok E. 12/7B",
    kelurahanDesa: "Limusnunggal",
    kecamatan: "Cileungsi",
    kabupaten: "Bogor",
    provinsi: "Jawa Barat"
  },
  "5Rumaysha": {
    kelas: "5 Rummaysha Binti Malhan",
    waliKelas: "Heni Mariyah Umrah, S.Pd., Gr.",
    nip: "-",
    nuptk: "6741775676230073",
    tempatLahir: "Kuningan",
    tanggalLahir: "09 September 1997",
    pendidikanTerakhir: "S1",
    jabatanGuru: "Guru Kelas",
    pangkatGol: "-",
    tugasMengajarKelas: "5 (Lima)",
    tahunAjaran: "2026-2027",
    namaSekolah: "SD Al Imam Islamic School",
    npsn: "20253872",
    nss: "102020207062",
    alamat: "Limus Pratama Regensi Jl. Blitar Blok E. 12/7B",
    kelurahanDesa: "Limusnunggal",
    kecamatan: "Cileungsi",
    kabupaten: "Bogor",
    provinsi: "Jawa Barat"
  },
  "6Umar": {
    kelas: "6 Umar Bin Khattab",
    waliKelas: "Ishmah, M.Pd.",
    nip: "-",
    nuptk: "7048772673230153",
    tempatLahir: "Jakarta",
    tanggalLahir: "24 Juni 1994",
    pendidikanTerakhir: "S2",
    jabatanGuru: "Guru Kelas",
    pangkatGol: "-",
    tugasMengajarKelas: "6 (Enam)",
    tahunAjaran: "2026-2027",
    namaSekolah: "SD Al Imam Islamic School",
    npsn: "20253872",
    nss: "102020207062",
    alamat: "Limus Pratama Regensi Jl. Blitar Blok E. 12/7B",
    kelurahanDesa: "Limusnunggal",
    kecamatan: "Cileungsi",
    kabupaten: "Bogor",
    provinsi: "Jawa Barat"
  },
  "6Hafshah": {
    kelas: "6 Hafshah Binti Umar",
    waliKelas: "Meta Dwi Liyani, S.Pd., Gr.",
    nip: "-",
    nuptk: "4136773674230103",
    tempatLahir: "Bogor",
    tanggalLahir: "14 Desember 1995",
    pendidikanTerakhir: "S1",
    jabatanGuru: "Guru Kelas",
    pangkatGol: "-",
    tugasMengajarKelas: "6 (Enam)",
    tahunAjaran: "2026-2027",
    namaSekolah: "SD Al Imam Islamic School",
    npsn: "20253872",
    nss: "102020207062",
    alamat: "Limus Pratama Regensi Jl. Blitar Blok E. 12/7B",
    kelurahanDesa: "Limusnunggal",
    kecamatan: "Cileungsi",
    kabupaten: "Bogor",
    provinsi: "Jawa Barat"
  }
};

// TEKS NASKAH RESMI KATA PENGANTAR (SESUAI SHEET PENGANTAR SPREADSHEET)
export const KATA_PENGANTAR_TEXT = [
  "Sejalan dengan tuntutan masyarakat dan perkembangan global pendidikan di Indonesia mengalami perubahan yang mendasar. Sekolah Dasar Al-Imam Islamic School adalah salah satu jenis pendidikan di antara bermacam-macam jenis lembaga pendidikan yang berhubungan dengan teknis edukatif dan tugas-tugas administrasi ke arah pencapaian tujuan pendidikan yang berlandaskan Al-Qur'an dan As-Sunnah sesuai pemahaman Salafus Shalih.",
  "Maju mundurnya suatu bangsa sangat tergantung pada tingkat pendidikan warganya. Mutu pendidikan akan tercapai secara optimal apabila didukung oleh tata kelola administrasi kelas dan guru yang tertib, terarah, dan berkesinambungan.",
  "Sebagaimana yang diamanatkan dalam program pendidikan nasional serta kurikulum kekhasan Al-Imam, Buku Kerja Administrasi Wali Kelas ini disusun sebagai pedoman operasional dalam merencanakan, melaksanakan, mengevaluasi, dan membina peserta didik secara komprehensif, baik dari sisi aqidah, akhlak, maupun prestasi akademik.",
  "Karena begitu pentingnya administrasi sekolah sebagai penunjang kelancaran proses belajar mengajar, maka keberadaan dokumen ini diharapkan dapat meningkatkan profesionalisme guru kelas dalam mengemban amanah mendidik generasi penerus umat.",
  "Demikian harapan kami, semoga buku kerja administrasi ini bermanfaat dan bernilai ibadah di sisi Allah Subhanahu wa Ta'ala. Aamiin."
];

// VISI DAN MISI SD AL-IMAM ISLAMIC SCHOOL
export const VISI_MISI = {
  motto: "BERAQIDAH - BERAKHLAK - BERPRESTASI",
  visi: "Menjadi Lembaga Pendidikan Islam Unggul yang Melahirkan Generasi Rabbani yang Beraqidah Shahihah, Berakhlak Mulia, Cerdas, dan Berprestasi Berdasarkan Al-Qur'an dan As-Sunnah Sesuai Pemahaman As-Salaf Ash-Shalih.",
  misi: [
    "Menanamkan aqidah Islamiyah yang murni bersih dari syirik, bid'ah, dan takhayul.",
    "Membiasakan akhlak karimah dan adab islami dalam seluruh sendi kehidupan santri di sekolah, rumah, dan masyarakat.",
    "Menyelenggarakan pembelajaran Al-Qur'an secara intensif dengan metode tahsin yang tepat dan target hafalan berkualitas.",
    "Menerapkan kurikulum nasional dan muatan lokal yang terintegrasi dengan nilai-nilai islam secara aktif, kreatif, dan menyenangkan.",
    "Mengembangkan potensi minat, bakat, serta kemampuan sains dan teknologi peserta didik agar berdaya saing global.",
    "Menjalin kemitraan yang harmonis dan bersinergi dengan orang tua dan masyarakat dalam pendidikan santri."
  ],
  tujuan: [
    "Santri hafal minimal 1 hingga 3 juz Al-Qur'an dengan tajwid dan makhraj yang benar.",
    "Santri mampu mempraktikkan shalat fardhu dan shalat sunnah sesuai bimbingan Rasulullah Shallallahu 'Alaihi wa Sallam.",
    "Santri terbiasa berdzikir pagi petang dan hafal doa-doa harian nabawiyyah.",
    "Santri memiliki kecakapan literasi, numerasi, dan penguasaan bahasa dasar (Arab & Inggris)."
  ]
};

// PEMBIASAAN ISLAMI SEKOLAH
export const PEMBIASAAN_SEKOLAH = [
  {
    kegiatan: "Prosesi Penyambutan 5S",
    waktu: "07.00 - 07.15 WIB",
    deskripsi: "Senyum, Salam, Sapa, Sopan, Santun saat santri tiba di gerbang sekolah bersama guru piket."
  },
  {
    kegiatan: "Dzikir Pagi Berjamaah",
    waktu: "07.15 - 07.30 WIB",
    deskripsi: "Membaca Dzikir Pagi Al-Ma'tsurat / doa nabawiyyah di dalam kelas dipandu wali kelas."
  },
  {
    kegiatan: "Shalat Duha, Muraja'ah & Kultum",
    waktu: "09.30 - 10.30 WIB",
    deskripsi: "Shalat sunnah Duha berjamaah di musholla/kelas, muraja'ah hafalan surat pilihan, dan tausiyah adab singkat."
  },
  {
    kegiatan: "Adab Makan & Minum Sunnah",
    waktu: "12.00 - 12.30 WIB",
    deskripsi: "Membaca basmalah, makan dan minum sambil duduk dengan tangan kanan, tidak meniup makanan, dan membaca doa setelah makan."
  },
  {
    kegiatan: "Shalat Dzuhur Berjama'ah",
    waktu: "12.30 - 13.00 WIB",
    deskripsi: "Shalat fardhu Dzuhur berjamaah, dzikir ba'da shalat, dan shalat rawatib ba'diyah."
  },
  {
    kegiatan: "Literasi & Sholat Ashar Berjamaah",
    waktu: "15.00 - 15.30 WIB",
    deskripsi: "Pembiasaan membaca buku bermanfaat dan shalat Ashar berjamaah sebelum prosesi kepulangan santri."
  }
];

// TATA TERTIB GURU DAN KELAS
export const TATA_TERTIB = {
  guru: [
    "Hadir di sekolah selambat-lambatnya 15 menit sebelum bel masuk berbunyi (pukul 07.00 WIB).",
    "Berbusana syar'i, rapi, bersih, dan wangi (sesuai syariat Islam dan ketentuan seragam sekolah).",
    "Menjadi teladan utama (qudwah hasanah) dalam perkataan, ibadah, dan perbuatan santri.",
    "Menyiapkan administrasi pembelajaran, modul ajar, dan media sebelum KBM berlangsung.",
    "Menyambut santri dengan kehangatan dan senyuman di awal kedatangan dan kepulangan.",
    "Tidak meninggalkan kelas saat KBM berlangsung tanpa izin atau pengganti guru piket.",
    "Menjaga kerahasiaan data pribadi santri dan menyelesaikan permasalahan secara bijak dan tabayyun."
  ],
  kelas: [
    "Hadir di kelas sebelum pukul 07.15 WIB dan langsung meletakkan tas di loker masing-masing.",
    "Mengucapkan salam secara islami saat masuk ke dalam ruangan kelas.",
    "Menjaga adab terhadap guru dan menyimak penjelasan pelajaran dengan khusyuk.",
    "Melaksanakan piket kebersihan kelas sesuai jadwal regu yang telah ditetapkan.",
    "Membuang sampah pada tempat yang telah disediakan sesuai pemilahannya.",
    "Tidak makan atau minum saat guru sedang menerangkan materi pelajaran.",
    "Meminta izin dengan sopan saat hendak keluar ruangan kelas (misal: ke kamar mandi).",
    "Menjaga dan merawat sarana prasarana kelas (meja, kursi, papan tulis, AC, dan buku)."
  ]
};

// JADWAL REGU PIKET HARIAN (20 SISWA KELAS 1 ABDULLAH IBNU UMAR)
export const PIKET_KELAS_DEFAULT = [
  {
    hari: "SENIN",
    koordinator: "Danish Salahuddin A. F.",
    anggota: ["ADREENA ASHFAHANI OHIRA", "AHMAD ZAYYAN ALTHAF", "ALISYA RIHANNA MANGKIALO", "DANISH SALAHUDDIN ALHUSAIN FAHRIAL"]
  },
  {
    hari: "SELASA",
    koordinator: "Davin Alfarizqy",
    anggota: ["ANNASYA SHAHLIA", "ASIYAH AHMAD", "DAVIN ALFARIZQY", "ERKA DANURDARA"]
  },
  {
    hari: "RABU",
    koordinator: "Ibrahim Hanif Wijaya",
    anggota: ["EZRA ABDURRAHMAN TASLIM", "FATIH AFKAR ALHANAN", "FREYA ANJANI HUMAIRA", "IBRAHIM HANIF WIJAYA"]
  },
  {
    hari: "KAMIS",
    koordinator: "Muhammad Al Ghiffari",
    anggota: ["KHALID ATHAFARIZ HANASAN", "KHANSA SHAFIYYAH", "LABIQA SYAIRA IZZA DUANA", "MUHAMMAD AL GHIFFARI"]
  },
  {
    hari: "JUM'AT",
    koordinator: "Muhammad Zain Hamizan",
    anggota: ["MUHAMMAD ZAIN HAMIZAN", "NASYAMA RANIA KHADIJAH", "PUTRI ARIEFIHI PRAJA", "QUEENZA ARSYIFA ZHADELA"]
  }
];

// DATA INVENTARIS SARANA PRASARANA KELAS 1-A
export const SARPRAS_KELAS_DEFAULT = [
  { no: 1, namaBarang: "Meja Santri / Siswa", jumlah: 20, satuan: "Unit", kondisi: "Baik", keterangan: "Bahan kayu jati belanda" },
  { no: 2, namaBarang: "Kursi Santri / Siswa", jumlah: 20, satuan: "Unit", kondisi: "Baik", keterangan: "Ergonomis standar SD" },
  { no: 3, namaBarang: "Meja Guru / Wali Kelas", jumlah: 1, satuan: "Unit", kondisi: "Baik", keterangan: "Lengkap dengan laci berkunci" },
  { no: 4, namaBarang: "Kursi Guru", jumlah: 1, satuan: "Unit", kondisi: "Baik", keterangan: "Kursi putar busa" },
  { no: 5, namaBarang: "Papan Tulis Whiteboard", jumlah: 2, satuan: "Buah", kondisi: "Baik", keterangan: "Ukuran 120 x 240 cm" },
  { no: 6, namaBarang: "Penghapus & Spidol Boardmarker", jumlah: 4, satuan: "Set", kondisi: "Baik", keterangan: "Warna hitam, biru, merah" },
  { no: 7, namaBarang: "Loker / Lemari Siswa", jumlah: 20, satuan: "Pintu", kondisi: "Baik", keterangan: "Penyimpanan buku & tas" },
  { no: 8, namaBarang: "Air Conditioner (AC) 2 PK", jumlah: 2, satuan: "Unit", kondisi: "Baik / Dingin", keterangan: "Servis rutin tiap 2 bulan" },
  { no: 9, namaBarang: "Jam Dinding Analog", jumlah: 1, satuan: "Buah", kondisi: "Baik", keterangan: "Baterai aktif" },
  { no: 10, namaBarang: "Kotak P3K Kelas", jumlah: 1, satuan: "Set", kondisi: "Lengkap", keterangan: "Betadine, plester, minyak kayu putih" },
  { no: 11, namaBarang: "Tempat Sampah Tertutup", jumlah: 2, satuan: "Buah", kondisi: "Baik", keterangan: "Organik & Non-Organik" },
  { no: 12, namaBarang: "Sapu & Pengki Kebersihan", jumlah: 2, satuan: "Set", kondisi: "Baik", keterangan: "Tersimpan di sudut belakang" }
];

// CATATAN ANEKDOT (OBSERVASI PERILAKU SISWA)
export const CATATAN_ANEKDOT_DEFAULT = [
  {
    id: "AN_01",
    tanggal: "2026-08-12",
    namaSiswa: "AHMAD ZAYYAN ALTHAF",
    peristiwa: "Menunjukkan empati tinggi dengan meminjamkan pensil cadangannya kepada teman sebangku yang pensilnya patah tanpa diminta.",
    analisis: "Perkembangan adab ta'awun (tolong-menolong) dan kepekaan sosial sangat baik.",
    tindakLanjut: "Memberikan pujian di depan kelas sebagai motivasi bagi teman-temannya.",
    pencatat: "Siti Habzah Diniyanti, S.Sos"
  },
  {
    id: "AN_02",
    tanggal: "2026-08-26",
    namaSiswa: "DANISH SALAHUDDIN ALHUSAIN FAHRIAL",
    peristiwa: "Mengingatkan teman-temannya saat hendak minum agar duduk dan membaca basmalah terlebih dahulu.",
    analisis: "Internalisasi adab sunnah nabawiyyah dalam kehidupan sehari-hari berjalan efektif.",
    tindakLanjut: "Dijadikan teladan adab makan & minum pada sesi makan siang kelas.",
    pencatat: "Siti Habzah Diniyanti, S.Sos"
  },
  {
    id: "AN_03",
    tanggal: "2026-09-09",
    namaSiswa: "ADREENA ASHFAHANI OHIRA",
    peristiwa: "Sangat antusias memimpin muraja'ah surat An-Naba' bersama kelompok akhwat dengan makhraj yang fasih.",
    analisis: "Memiliki jiwa kepemimpinan positif dan kecintaan terhadap hafalan Al-Qur'an.",
    tindakLanjut: "Diberi kesempatan menjadi koordinator muraja'ah halaqah pekanan.",
    pencatat: "Siti Habzah Diniyanti, S.Sos"
  }
];

// DAFTAR HADIR PARENTING & PENGAMBILAN RAPOR
export const DAFTAR_PARENTING_DEFAULT = [
  {
    pertemuan: "Parenting Session 1 - Sinergi Pendidikan Sunnah di Era Digital",
    tanggal: "15 Agustus 2026",
    tempat: "Aula SD Al-Imam Islamic School",
    kehadiran: "19 dari 20 Wali Murid Hadir (95%)",
    notulensi: "Sosialisasi target kurikulum tahfidz juz 30, pembatasan gadget di rumah, dan pembiasaan shalat 5 waktu di masjid untuk santri ikhwan."
  },
  {
    pertemuan: "Pengambilan Rapor Tengah Semester Ganjil (PTS)",
    tanggal: "10 Oktober 2026",
    tempat: "Ruang Kelas 1 Abdullah Ibnu Umar",
    kehadiran: "20 dari 20 Wali Murid Hadir (100%)",
    notulensi: "Konsultasi tatap muka perkembangan membaca, menulis, berhitung, serta pencapaian hafalan surat Al-Balad s.d An-Nas."
  }
];

// DAFTAR 14 MATA PELAJARAN ADMINISTRASI WALI KELAS (SESUAI TABEL HOME SPREADSHEET)
export const MAPEL_ADMINISTRASI = [
  { no: 1, nama: "AQIDAH", kode: "A", kelompok: "PAI", guru: "Muhamad Rizky Kusumah, S.Pd", jpPekan: 2 },
  { no: 2, nama: "FIQIH", kode: "F", kelompok: "PAI", guru: "Muhamad Rizky Kusumah, S.Pd", jpPekan: 2 },
  { no: 3, nama: "SEJARAH KEBUDAYAAN ISLAM", kode: "SKI", kelompok: "PAI", guru: "Muhamad Rizky Kusumah, S.Pd", jpPekan: 1 },
  { no: 4, nama: "ADAB DAN AKHLAK", kode: "AD", kelompok: "PAI", guru: "Wali Kelas", jpPekan: 2 },
  { no: 5, nama: "PENDIDIKAN PANCASILA DAN KEWARGANEGARAAN", kode: "PP", kelompok: "Wajib", guru: "Wali Kelas", jpPekan: 2 },
  { no: 6, nama: "BAHASA INDONESIA", kode: "B.Ind", kelompok: "Wajib", guru: "Wali Kelas", jpPekan: 4 },
  { no: 7, nama: "ILMU PENGETAHUAN ALAM DAN SOSIAL", kode: "IPAS", kelompok: "Wajib", guru: "Wali Kelas", jpPekan: 2 },
  { no: 8, nama: "SENI RUPA", kode: "Seni", kelompok: "Wajib", guru: "Wali Kelas", jpPekan: 2 },
  { no: 9, nama: "BAHASA DAERAH (BAHASA SUNDA)", kode: "BS", kelompok: "Mulok", guru: "Guru Mulok", jpPekan: 1 },
  { no: 10, nama: "PENDIDIKAN JASMANI, OLAHRAGA , DAN KESEHATAN", kode: "PJOK", kelompok: "Wajib", guru: "Muhammad Raihan, S.Pd", jpPekan: 2 },
  { no: 11, nama: "MATHEMATICS", kode: "Math", kelompok: "Kekhasan", guru: "Wiji Atikasari, S.Pd", jpPekan: 4 },
  { no: 12, nama: "BAHASA ARAB", kode: "BA", kelompok: "Kekhasan", guru: "Heru Firdaus, S.Hum", jpPekan: 2 },
  { no: 13, nama: "BAHASA INGGRIS", kode: "BI", kelompok: "Mulok", guru: "Susan Eka Pratiwi, S.Pd", jpPekan: 2 },
  { no: 14, nama: "INFORMATIKA", kode: "K", kelompok: "Mulok", guru: "Laila Paizrujah, S.Pd", jpPekan: 2 }
];
