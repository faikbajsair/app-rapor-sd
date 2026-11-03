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

// VISI, MISI, DAN TUJUAN SD AL IMAM ISLAMIC SCHOOL (SESUAI SHEET VISI MISI MASTER)
export const VISI_MISI = {
  motto: "BERAQIDAH - BERAKHLAK - BERPRESTASI",
  visi: "BERAKIDAH SALAFUS SALIH, BERAKHLAK QUR’AN DAN SUNNAH, BERPRESTASI AKADEMIK/NONAKADEMIK",
  misi: [
    "Menanamkan nilai-nilai ke-Islaman sesuai akidah salafus salih.",
    "Menciptakan iklim dan budaya sekolah keteladanan sesuai Al Qur’an dan As Sunnah.",
    "Menyelenggarakan proses pembelajaran yang mudah, menyenangkan, berkarakter, dan prestatif (akademik/nonakademik)"
  ],
  tujuan: [
    "Peserta didik mampu menguasai ilmu pengetahuan dan keterampilan",
    "Peserta didik memiliki prestasi yang tinggi dalam bidang akademik",
    "Peserta didik memiliki prestasi yang tinggi dalam bidang non akademik",
    "Peserta didik mampu melaksanakan dan mengembangkan budaya sekolah yang dijadikan sebagai identitas sekolah",
    "Peserta didik memiliki sifat rajin dalam beribadah, hormat terhadap orang tua dan guru serta memiliki tata karma yang baik terhadap orang lain",
    "Peserta didik memiliki sikap mau menerima kritik dan saran dari orang lain sesuai dengan ketentuan yang berlaku"
  ]
};

// DAILY & TEACHER’S HABITUATION (PEMBIASAAN GURU) (SESUAI SHEET PEMBIASAAN MASTER)
export const PEMBIASAAN_GURU = [
  { no: 1, judul: "Pembiasaan 6S (Senyum-Salam-Sapa-Sopan-Santun-Semangat)", deskripsi: "Penyambutan santri dan pembiasaan adab ramah di lingkungan sekolah." },
  { no: 2, judul: "Dzikir pagi", deskripsi: "Membaca rangkaian dzikir pagi nabawiyyah bersama di kelas." },
  { no: 3, judul: "Morning Talk", deskripsi: "Penguatan karakter, adab harian, dan motivasi belajar peserta didik." },
  { no: 4, judul: "Shalat dhuha", deskripsi: "Pelaksanaan shalat sunnah dhuha secara rutin." },
  { no: 5, judul: "Kultum", deskripsi: "Tausiyah singkat pembinaan akhlak dan aqidah." },
  { no: 6, judul: "Tilawah Al-Quran", deskripsi: "Tilawah dan tadabbur Al-Qur'an harian santri dan guru." },
  { no: 7, judul: "Pemantapan karakter tauhid", deskripsi: "Penanaman keimanan dan aqidah salafus shalih." },
  { no: 8, judul: "Pembelajaran al Qur'an", deskripsi: "KBM Al-Qur'an (Tahsin & Tahfidz) terpadu." },
  { no: 9, judul: "Pembelajaran tematik / mata pelajaran", deskripsi: "Pelaksanaan proses KBM kurikulum berkualitas." },
  { no: 10, judul: "Pengelolaan kelas (berbasis parenting – pola asuh)", deskripsi: "Pola asuh kelas yang ramah, mendidik, dan penuh kasih sayang." },
  { no: 11, judul: "Monitoring sikap siswa", deskripsi: "Observasi sikap, adab, kedisiplinan, dan interaksi sosial santri." },
  { no: 12, judul: "Shalat dzuhur berjamaah", deskripsi: "Shalat fardhu dzuhur berjamaah dan adab di masjid." },
  { no: 13, judul: "Shalat ashar berjamaah", deskripsi: "Shalat fardhu ashar berjamaah sebelum kepulangan santri." },
  { no: 14, judul: "Pengajian rutin (Daurah Quran, At Ta'dib, Daurah akademik)", deskripsi: "Pengembangan ruhiyah dan wawasan keilmuan guru." },
  { no: 15, judul: "Shaum Senin/ Kamis/Ayyaumul Bidh", deskripsi: "Pembiasaan puasa sunnah bagi civitas akademika." }
];
export const PEMBIASAAN_SEKOLAH = PEMBIASAAN_GURU;

// TATA TERTIB GURU SD AL IMAM ISLAMIC SCHOOL (SESUAI SHEET TATA TERTIB MASTER)
export const TATA_TERTIB_GURU = {
  judul: "TATA TERTIB GURU SD AL IMAM ISLAMIC SCHOOL",
  seksi: [
    {
      kode: "A",
      kategori: "KEHADIRAN",
      poin: [
        "Guru hadir di sekolah minimal 15 menit sebelum jam pelajaran dimulai dan cek kehadiran",
        "Guru yang hadir terlambat lebih dari 3 kali wajib mengisikan buku catatan keterlambatan yang ada di Kantor Kepala Sekolah",
        "Guru piket harus hadir minimal 30 menit sebelum jam pelajaran dimulai",
        "Guru yang berkepentingan meninggalkan sekolah sebelum berakhir jam kerja wajib meminta izin kepada kepala sekolah atau wakil kepala sekolah dan mengisikan buku ijin meninggalkan sekolah",
        "Semua guru wajib mengenakan seragam kerja sesuai jadwal, rapi, dan bersih"
      ]
    },
    {
      kode: "B",
      kategori: "WAKTU TIDAK HADIR",
      poin: [
        "Guru karena keadaan tertentu tidak masuk kerja, wajib meminta izin kepada kepala sekolah atau wakil kepala sekolah dan menyertakan surat keterangan",
        "Guru yang tidak masuk karena sakit atau keperluan yang diijinkan lebih dari satu hari harus ada surat yang dapat dipertanggungjawabkan atau surat keterangan dokter jika sakit",
        "Setelah masuk kembali harus melapor diri kepada kepala sekolah",
        "Guru tidak akan di izinkan, ketika izin di hari piket lebih dari satu hari.",
        "Guru yang tidak masuk kerja wajib berkoordinasi dengan bagian kurikulum perihal pembelajaran"
      ]
    },
    {
      kode: "C",
      kategori: "PROSES PEMBELAJARAN",
      poin: [
        "Mempersiapkan perangkat pembelajaran (media) yang sesuai dan berkualitas serta berbahasa Inggris atau Berbahasa arab",
        "Melaksanakan proses pembelajaran sesuai jadwal yang telah ditetapkan",
        "Memonitoring pelaksanaan pembelajaran dan mengelola buku administrasi guru",
        "Melaksanakan proses pembelajaran yang mudah, menyenangkan, membangun karakter dan berdampak pada perilaku siswa",
        "Mengelola kelas dan menciptakan budaya kelas: tertib, rapi, disiplin, dan berkarakter",
        "Melakukan penilaian berbasis kelas dan otentik (sesuai dengan tujuan pembelajaran)"
      ]
    },
    {
      kode: "D",
      kategori: "HAL LAIN",
      poin: [
        "Senantiasa aktif mengikuti kegiatan shalat berjamaah, tilawah, dan dzikir",
        "Berpakaian rapi, sopan, bersikap mendidik dan menjaga martabat profesi guru",
        "Menjadi suri tauladan yang baik bagi siswa",
        "Menyelesaikan persoalan siswa ditempuh dengan musyawarah dan edukatif",
        "Menjaga kode etik guru",
        "Mengenakan busana sesuai syariat Islam",
        "Menjaga dan memelihara seluruh aset yang ada di sekolah",
        "Ketentuan lainnya dalam peraturan pokok kepegawaian senantiasa diindahkan"
      ]
    }
  ]
};

// TATA TERTIB KELAS (SESUAI SHEET TATA TERTIB KELAS MASTER)
export const TATA_TERTIB_KELAS = [
  "Anak-anak harus sudah hadir disekolah sebelum jam pelajaran dimulai.",
  "Anak-anak harus berseragam yang rapi dan bersih.",
  "Sebelum lonceng/bel berbunyi petugas kebersihan kelas harus sudah selesai membersihkan kelanya.",
  "Setelah lonceng/bel berbunyi mulai belajar, anak-anak harus memasuki ruang kelas untuk melaksanakan dzikir Bersama dan muroja'ah juz 30.",
  "Sebelum belajar diawali dengan membaca do'a dan penghormatan kepada guru.",
  "Akhir pelajaran ditutup dengan membaca do'a dan penghormatan kepada guru.",
  "Setiap hari senin harus mengikuti upacara bendera.",
  "Anak-anak harus sopan, taat dan patuh kepada guru/kepala sekolah.",
  "Anak-anak harus memelihara ketertiban, keindahan dan kebersihan alat-alat pelajaran dan kelasnya",
  "Anak-anak dilarang mencoreti bangku, meja, pintu, jendela dan tembok sekolah dan kelasnya",
  "Anak-anak harus memelihara tanam-tanaman disekolah.",
  "Anak-anak dilarang menggangu kelas lain yang sedang belajar.",
  "Anak-anak harus berjiwa jujur dan satria dalam setiap tindakan dan perbuatan.",
  "Bila tidak masuk sekolah harus memberitahukan kepada guru/kepala sekolah",
  "Bila hendak keluar kelas harus meminta izin."
];

export const TATA_TERTIB = {
  guru: TATA_TERTIB_GURU.seksi.flatMap(s => s.poin),
  kelas: TATA_TERTIB_KELAS
};

// PROGRAM KELAS / GOALS 2026-2027 (SESUAI SHEET PROGRAM KELAS MASTER)
export const GOALS_PROGRAM_KELAS_2026_2027 = {
  judul: "GOALS 2026-2027",
  kekurangan: "Komunikasi kurang baik dengan partner, kurang tegas kepada anak-anak, sulit mengendalikan ego anak saat memilih/menentukan tempat duduk, kurang tegas kepada anak saat pergantian jam mapel, kurang paham ketika ada anak sedang meluapkan emosinya, dan masih ada beberapa anak yang menggunakan toilet samping TU karena mereka belum bisa memakai toilet duduk.",
  perbaikan: "Selalu berkomunikasi dengan partner, akan lebih tegas kepada anak-anak baik dalam penentuan tempat duduk maupun saat pergantian jam mapel, akan mempelajari cara mengendalikan emosi terhadap anak, dan akan mengajarkan anak-anak cara menggunakan toilet duduk",
  denganCara: [
    "Sering berkomunikasi dengan partner",
    "Akan membuat nomor sesuai jumlah anak lalu mereka akan mengambil dan dilakukan rolling min. seminggu sekali dan maks. 2 minggu sekali.",
    "Ketika selesai pelajaran halaqoh kami akan menunggu di depan kelas agar anak-anak bisa langsung diarahkan masuk kelas.",
    "Akan mempelajari cara mengendalikan emosi terhadap anak baik melalui buku, internet maupun berkonsultasi langsung dengan psikolog yang sekolah sediakan.",
    "akan mengajarkan anak-anak cara menggunakan toilet duduk supaya mereka bisa menggunakan toilet yang ada di dalam kelas."
  ],
  goalsJangkaPendek: "Anak-anak mampu membaca dengan lancar tanpa dieja, dapat menulis dengan rapi, huruf tidak terbalik dan mengenal huruf kapital, lancar berhitung baik dalam penjumlahan maupun pengurangan. Menanamkan sikap mandiri, berani, dan sikap sopan santun pada anak.",
  goalsJangkaPanjang: "Anak-anak mampu membaca buku cerita sendiri min. 15 menit setiap hari. Anak-anak paham tentang konsep uang, membaca jarum jam, dan menyelesaikan soal cerita sederhana. Mampu menuliskan karangan cerita pendek min. 1 paragraf. Anak-anak bisa berani tampil di depan umum seperti saat puncak projek nanti. Anak-anak bisa memiliki ambisi saat dalam pembelajaran."
};

// JADWAL PIKET KEBERSIHAN & PEMBAGIAN KELOMPOK BELAJAR (SESUAI SHEET PIKET MASTER)
export const JADWAL_PIKET_KEBERSIHAN = [
  { no: 1, senin: "ADREENA ASHFAHANI OHIRA", selasa: "ANNASYA SHAHLIA", rabu: "EZRA ABDURRAHMAN TASLIM", kamis: "KHALID ATHAFARIZ HANASAN", jumat: "MUHAMMAD ZAIN HAMIZAN" },
  { no: 2, senin: "AHMAD ZAYYAN ALTHAF", selasa: "ASIYAH AHMAD", rabu: "FATIH AFKAR ALHANAN", kamis: "KHANSA SHAFIYYAH", jumat: "NASYAMA RANIA KHADIJAH" },
  { no: 3, senin: "ALISYA RIHANNA MANGKIALO", selasa: "DAVIN ALFARIZQY", rabu: "FREYA ANJANI HUMAIRA", kamis: "LABIQA SYAIRA IZZA DUANA", jumat: "PUTRI ARIEFIHI PRAJA" },
  { no: 4, senin: "DANISH SALAHUDDIN A. F.", selasa: "ERKA DANURDARA", rabu: "IBRAHIM HANIF WIJAYA", kamis: "MUHAMMAD AL GHIFFARI", jumat: "QUEENZA ARSYIFA ZHADELA" }
];

export const PEMBAGIAN_KELOMPOK_BELAJAR = [
  { kelompok: "Kelompok A", anggota: ["ADREENA ASHFAHANI OHIRA", "AHMAD ZAYYAN ALTHAF"] },
  { kelompok: "Kelompok B", anggota: ["ALISYA RIHANNA MANGKIALO", "ANNASYA SHAHLIA"] },
  { kelompok: "Kelompok C", anggota: ["ASIYAH AHMAD", "DANISH SALAHUDDIN A. F."] },
  { kelompok: "Kelompok D", anggota: ["DAVIN ALFARIZQY", "ERKA DANURDARA"] },
  { kelompok: "Kelompok E", anggota: ["EZRA ABDURRAHMAN TASLIM", "FATIH AFKAR ALHANAN"] },
  { kelompok: "Kelompok F", anggota: ["FREYA ANJANI HUMAIRA", "IBRAHIM HANIF WIJAYA"] },
  { kelompok: "Kelompok G", anggota: ["KHALID ATHAFARIZ HANASAN", "KHANSA SHAFIYYAH", "LABIQA SYAIRA IZZA DUANA"] },
  { kelompok: "Kelompok H", anggota: ["MUHAMMAD AL GHIFFARI", "MUHAMMAD ZAIN HAMIZAN", "NASYAMA RANIA KHADIJAH", "QUEENZA ARSYIFA ZHADELA"] }
];

export const PIKET_KELAS_DEFAULT = [
  { hari: "SENIN", anggota: JADWAL_PIKET_KEBERSIHAN.map(p => p.senin) },
  { hari: "SELASA", anggota: JADWAL_PIKET_KEBERSIHAN.map(p => p.selasa) },
  { hari: "RABU", anggota: JADWAL_PIKET_KEBERSIHAN.map(p => p.rabu) },
  { hari: "KAMIS", anggota: JADWAL_PIKET_KEBERSIHAN.map(p => p.kamis) },
  { hari: "JUM'AT", anggota: JADWAL_PIKET_KEBERSIHAN.map(p => p.jumat) }
];

// DAFTAR RIWAYAT KESEHATAN SISWA (SESUAI SHEET R.KESEHATAN MASTER)
export const RIWAYAT_KESEHATAN_DEFAULT = [
  { no: 1, nama: "ADREENA ASHFAHANI OHIRA", jkl: "P", jenisPenyakit: "-", tanggal: "-", dirawat: "-", lamanya: "-", cacat: "-" },
  { no: 2, nama: "AHMAD ZAYYAN ALTHAF", jkl: "L", jenisPenyakit: "Alergi Debu", tanggal: "2025", dirawat: "Tidak", lamanya: "-", cacat: "-" },
  { no: 3, nama: "ALISYA RIHANNA M", jkl: "P", jenisPenyakit: "-", tanggal: "-", dirawat: "-", lamanya: "-", cacat: "-" },
  { no: 4, nama: "ANNASYA SHAHLIA", jkl: "P", jenisPenyakit: "Alergi Seafood", tanggal: "2025", dirawat: "Tidak", lamanya: "-", cacat: "-" },
  { no: 5, nama: "ASIYAH AHMAD", jkl: "P", jenisPenyakit: "-", tanggal: "-", dirawat: "-", lamanya: "-", cacat: "-" },
  { no: 6, nama: "ATHARRAZKA FAEYZA S", jkl: "L", jenisPenyakit: "-", tanggal: "-", dirawat: "-", lamanya: "-", cacat: "-" },
  { no: 7, nama: "DANISH SALAHUDDIN A", jkl: "L", jenisPenyakit: "-", tanggal: "-", dirawat: "-", lamanya: "-", cacat: "-" },
  { no: 8, nama: "DAVIN ALFARIZQY", jkl: "L", jenisPenyakit: "Rhinitis Alergi", tanggal: "2025", dirawat: "Tidak", lamanya: "-", cacat: "-" },
  { no: 9, nama: "ERKA DANURDARA", jkl: "L", jenisPenyakit: "-", tanggal: "-", dirawat: "-", lamanya: "-", cacat: "-" },
  { no: 10, nama: "EZRA ABDURRAHMAN T", jkl: "L", jenisPenyakit: "-", tanggal: "-", dirawat: "-", lamanya: "-", cacat: "-" },
  { no: 11, nama: "FATIH AFKAR ALHANAN", jkl: "L", jenisPenyakit: "-", tanggal: "-", dirawat: "-", lamanya: "-", cacat: "-" },
  { no: 12, nama: "FREYA ANJANI HUMAIRA", jkl: "P", jenisPenyakit: "Alergi Kacang", tanggal: "2025", dirawat: "Tidak", lamanya: "-", cacat: "-" },
  { no: 13, nama: "KHALID ATHAFARIZ H", jkl: "L", jenisPenyakit: "-", tanggal: "-", dirawat: "-", lamanya: "-", cacat: "-" },
  { no: 14, nama: "KHANSA SHAFIYYAH", jkl: "P", jenisPenyakit: "-", tanggal: "-", dirawat: "-", lamanya: "-", cacat: "-" },
  { no: 15, nama: "LABIQA SYAIRA IZZA D", jkl: "P", jenisPenyakit: "-", tanggal: "-", dirawat: "-", lamanya: "-", cacat: "-" },
  { no: 16, nama: "MIKHAEL ZYAN", jkl: "L", jenisPenyakit: "-", tanggal: "-", dirawat: "-", lamanya: "-", cacat: "-" },
  { no: 17, nama: "MUHAMMAD AL GHIFFARI", jkl: "L", jenisPenyakit: "-", tanggal: "-", dirawat: "-", lamanya: "-", cacat: "-" },
  { no: 18, nama: "MUHAMMAD ZAIN", jkl: "L", jenisPenyakit: "-", tanggal: "-", dirawat: "-", lamanya: "-", cacat: "-" },
  { no: 19, nama: "NASYAMA RANIA K", jkl: "P", jenisPenyakit: "-", tanggal: "-", dirawat: "-", lamanya: "-", cacat: "-" },
  { no: 20, nama: "QUEENZA ARSYIFA Z.", jkl: "P", jenisPenyakit: "-", tanggal: "-", dirawat: "-", lamanya: "-", cacat: "-" }
];

// DAFTAR INVENTARIS KELAS (SESUAI SHEET SARPRAS MASTER)
export const INVENTARIS_KELAS_MASTER = [
  { no: 1, namaBarang: "Papan display mading besar", jumlahAwal: 1, baik: 1, rusak: 0 },
  { no: 2, namaBarang: "Papan display mading kecil", jumlahAwal: 1, baik: 1, rusak: 0 },
  { no: 3, namaBarang: "Lemari loker siswa", jumlahAwal: 20, baik: 20, rusak: 0 },
  { no: 4, namaBarang: "Lemari loker guru", jumlahAwal: 1, baik: 1, rusak: 0 },
  { no: 5, namaBarang: "meja dan kursi siswa", jumlahAwal: 20, baik: 20, rusak: 0 },
  { no: 6, namaBarang: "meja dan kursi guru", jumlahAwal: 1, baik: 1, rusak: 0 },
  { no: 7, namaBarang: "Papan tulis", jumlahAwal: 1, baik: 1, rusak: 0 },
  { no: 8, namaBarang: "Rak buku", jumlahAwal: 1, baik: 1, rusak: 0 },
  { no: 9, namaBarang: "dispenser dan galon", jumlahAwal: 1, baik: 1, rusak: 0 },
  { no: 10, namaBarang: "printer", jumlahAwal: 1, baik: 1, rusak: 0 },
  { no: 11, namaBarang: "tempat sampah", jumlahAwal: 2, baik: 2, rusak: 0 },
  { no: 12, namaBarang: "Sapu dan pel", jumlahAwal: 2, baik: 2, rusak: 0 },
  { no: 13, namaBarang: "Kemoceng", jumlahAwal: 2, baik: 2, rusak: 0 },
  { no: 14, namaBarang: "Rak Sendal", jumlahAwal: 1, baik: 1, rusak: 0 },
  { no: 15, namaBarang: "Proyektor", jumlahAwal: 1, baik: 1, rusak: 0 },
  { no: 16, namaBarang: "Jam dinding", jumlahAwal: 1, baik: 1, rusak: 0 }
];
export const SARPRAS_KELAS_DEFAULT = INVENTARIS_KELAS_MASTER;

// ANECDOTAL RECORD (SESUAI SHEET ANECDOT MASTER)
export const ANECDOTAL_RECORD_DEFAULT = [
  {
    no: 1,
    dayDate: "Senin, 17 Agustus 2026",
    teacherName: "Siti Habzah Diniyanti, S.Sos",
    studentName: "AHMAD ZAYYAN ALTHAF",
    cases: "Menunjukkan empati tinggi dengan meminjamkan pensil cadangannya kepada teman sebangku yang pensilnya patah tanpa diminta.",
    treatmentAndFollowUp: "Diberikan pujian di depan kelas sebagai motivasi ta'awun bagi teman-teman."
  },
  {
    no: 2,
    dayDate: "Rabu, 02 September 2026",
    teacherName: "Siti Habzah Diniyanti, S.Sos",
    studentName: "DANISH SALAHUDDIN ALHUSAIN FAHRIAL",
    cases: "Mengingatkan teman-temannya saat hendak minum agar duduk dan membaca basmalah terlebih dahulu.",
    treatmentAndFollowUp: "Dijadikan teladan adab makan & minum pada sesi makan siang kelas."
  },
  {
    no: 3,
    dayDate: "Kamis, 17 September 2026",
    teacherName: "Siti Habzah Diniyanti, S.Sos",
    studentName: "ADREENA ASHFAHANI OHIRA",
    cases: "Sangat antusias memimpin muraja'ah surat An-Naba' bersama kelompok akhwat dengan makhraj fasih.",
    treatmentAndFollowUp: "Diberi kesempatan menjadi koordinator muraja'ah halaqah pekanan."
  }
];
export const CATATAN_ANEKDOT_DEFAULT = ANECDOTAL_RECORD_DEFAULT;

// DAFTAR HADIR PENGAMBILAN RAPOR PARENTING (SESUAI SHEET RAPOR MASTER)
export const DAFTAR_HADIR_RAPOR_PARENTING_DEFAULT = [
  { no: 1, nama: "ADREENA ASHFAHANI OHIRA", pts1: true, pas1: true, parenting1: true, pts2: false, pas2: false, parenting2: false },
  { no: 2, nama: "AHMAD ZAYYAN ALTHAF", pts1: true, pas1: true, parenting1: true, pts2: false, pas2: false, parenting2: false },
  { no: 3, nama: "ALISYA RIHANNA MANGKIALO", pts1: true, pas1: true, parenting1: true, pts2: false, pas2: false, parenting2: false },
  { no: 4, nama: "ANNASYA SHAHLIA", pts1: true, pas1: true, parenting1: true, pts2: false, pas2: false, parenting2: false },
  { no: 5, nama: "ASIYAH AHMAD", pts1: true, pas1: true, parenting1: true, pts2: false, pas2: false, parenting2: false },
  { no: 6, nama: "DANISH SALAHUDDIN ALHUSAIN FAHRIAL", pts1: true, pas1: true, parenting1: true, pts2: false, pas2: false, parenting2: false },
  { no: 7, nama: "DAVIN ALFARIZQY", pts1: true, pas1: true, parenting1: true, pts2: false, pas2: false, parenting2: false },
  { no: 8, nama: "ERKA DANURDARA", pts1: true, pas1: true, parenting1: true, pts2: false, pas2: false, parenting2: false },
  { no: 9, nama: "EZRA ABDURRAHMAN TASLIM", pts1: true, pas1: true, parenting1: true, pts2: false, pas2: false, parenting2: false },
  { no: 10, nama: "FATIH AFKAR ALHANAN", pts1: true, pas1: true, parenting1: true, pts2: false, pas2: false, parenting2: false },
  { no: 11, nama: "FREYA ANJANI HUMAIRA", pts1: true, pas1: true, parenting1: true, pts2: false, pas2: false, parenting2: false },
  { no: 12, nama: "IBRAHIM HANIF WIJAYA", pts1: true, pas1: true, parenting1: true, pts2: false, pas2: false, parenting2: false },
  { no: 13, nama: "KHALID ATHAFARIZ HANASAN", pts1: true, pas1: true, parenting1: true, pts2: false, pas2: false, parenting2: false },
  { no: 14, nama: "KHANSA SHAFIYYAH", pts1: true, pas1: true, parenting1: true, pts2: false, pas2: false, parenting2: false },
  { no: 15, nama: "LABIQA SYAIRA IZZA DUANA", pts1: true, pas1: true, parenting1: true, pts2: false, pas2: false, parenting2: false },
  { no: 16, nama: "MUHAMMAD AL GHIFFARI", pts1: true, pas1: true, parenting1: true, pts2: false, pas2: false, parenting2: false },
  { no: 17, nama: "MUHAMMAD ZAIN HAMIZAN", pts1: true, pas1: true, parenting1: true, pts2: false, pas2: false, parenting2: false },
  { no: 18, nama: "NASYAMA RANIA KHADIJAH", pts1: true, pas1: true, parenting1: true, pts2: false, pas2: false, parenting2: false },
  { no: 19, nama: "PUTRI ARIEFIHI PRAJA", pts1: true, pas1: true, parenting1: true, pts2: false, pas2: false, parenting2: false },
  { no: 20, nama: "QUEENZA ARSYIFA ZHADELA", pts1: true, pas1: true, parenting1: true, pts2: false, pas2: false, parenting2: false }
];
export const DAFTAR_PARENTING_DEFAULT = DAFTAR_HADIR_RAPOR_PARENTING_DEFAULT;

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
