# DOKUMEN PROFIL PRODUK & SPESIFIKASI FITUR
## Sistem Informasi Akademik, Administrasi Guru & E-Rapor Digital SD (Kurikulum Merdeka & Sekolah Islam Terpadu / Sunnah)

**URL Demo Live Produksi:** https://app-rapor-sd.vercel.app

---

## BAGIAN 1: RINCIAN FITUR DARI LOGIN, NAVIGASI MENU, HINGGA LOGOUT (END-TO-END USER FLOW)

Aplikasi dirancang dengan alur kerja (*user journey*) yang intuitif, aman, dan menyesuaikan hak akses (*Role-Based Access Control*) dari 7 peran pengguna yang berbeda sejak halaman pertama dibuka hingga pengguna keluar (*logout*).

### 1.1. Halaman Autentikasi & Login Cerdas (`LoginView`)
Saat pengguna membuka aplikasi, sistem menampilkan portal login modern dengan **2 jalur akses terpisah** demi keamanan dan privasi:

1. **Tab Login Civitas Akademika (Staf, Guru, Wali Kelas, Kepala Sekolah, Admin)**
   - **Login Kredensial & Direktori GTK Resmi**: Mendukung masuk menggunakan akun pendidik/tenaga kependidikan terdaftar (34+ data GTK aktif).
   - **Fitur *One-Click Role Simulation* (Khusus Demo / Super Admin)**: Memungkinkan calon klien atau kepala sekolah mencoba langsung tampilan dari sudut pandang:
     - **Administrator Sistem (Operator)**
     - **Kepala Sekolah**
     - **Guru Wali Kelas** (otomatis terfilter ke rombel yang diampu, misal Kelas 1 Abdullah Ibnu Abbas / 1 Abdullah Ibnu Umar)
     - **Guru Bidang Studi / Mapel** (otomatis terfilter hanya ke mata pelajaran yang diampu, misal PJOK, Matematika, Bahasa Arab, PAI, Bahasa Inggris, Informatika)
     - **Guru Al-Qur'an / Muhaffizh** (otomatis diarahkan ke modul Tahfidz & Tahsin Kholaqoh)
     - **Guru Pendamping**
2. **Tab Portal Khusus Wali Murid (Orang Tua Siswa)**
   - **Login Berbasis Identitas Anak (NIS / NISN / Nama Santri)**: Orang tua cukup memilih atau memasukkan identitas ananda.
   - **Isolasi Data Ketat (*Strict Data Privacy*)**: Orang tua yang login **hanya** dapat melihat nilai, hafalan, sikap, presensi, dan mengunduh rapor milik anaknya sendiri; data siswa lain terkunci sepenuhnya.

---

### 1.2. Area Header Global (`Navbar`) & Navigasi Multi-Perangkat (`Sidebar` & *Mobile Dock*)
Setelah berhasil login, pengguna masuk ke ruang kerja utama yang dilengkapi kontrol global:

1. **Header Bar Pintar (*Sticky Top Navbar*)**
   - **Identitas Sekolah & Kelas Aktif**: Menampilkan logo sekolah, nama institusi, serta rombel/penugasan aktif guru yang sedang login.
   - **Pemilih Tahun Pelajaran & Periode Semester (*Live Switcher*)**: Mengubah periode secara instan antara **Tengah Semester (PTS)** dan **Akhir Semester (PAS/PAT)** serta Tahun Pelajaran (2025/2026, 2026/2027, 2027/2028).
   - **Indikator & Tombol Sinkronisasi Cloud (`GAS Cloud`)**: Menunjukkan status koneksi ke Google Spreadsheet dan menyinkronkan seluruh data lokal ke Cloud dalam 1 klik.
   - **Tombol Pintas `Cetak / PDF`**: Mencetak lembar aktif langsung ke ukuran kertas A4 atau menyimpannya sebagai dokumen PDF.
   - **Badge Profil & Simulasi Peran (`UserCheck`)**: Menampilkan foto profil, nama lengkap, jabatan guru, serta tombol cepat untuk berpindah peran tanpa perlu keluar-masuk akun saat supervisi.
2. **Navigasi Responsif 3-Platform (Desktop, Tablet, Smartphone)**
   - **Desktop Sidebar**: Dikelompokkan secara rapi ke dalam 3 pilar:
     1. *Utama & Kurikulum* (`Monitoring Eksekutif`, `Kalender Akademik`, `Jadwal Pelajaran`, `Administrasi Wali Kelas`)
     2. *Penilaian & Akademik* (`Pengolahan Nilai`, `Al-Qur'an & Kholaqoh`, `Analisis Butir Soal (ABS)`, `Sikap & Narasi Otomatis`, `Presensi & Kehadiran`)
     3. *Database & Laporan* (`Buku Induk Siswa`, `Direktori GTK & Guru`, `Cetak Rapor Digital`, `Portal Wali Murid`, `CMS & Pengaturan Sistem`)
   - **Mobile Bottom Navigation Bar (*Native-App Dock*) & *Slide-Over Drawer***: Saat diakses dari ponsel oleh guru atau wali murid, muncul 5 tombol navigasi di bagian bawah layar untuk pengoperasian cepat dengan satu tangan.

---

### 1.3. Proses Keluar & Keamanan Sesi (`Logout`)
- **Tombol Logout di Pojok Kanan Atas**: Menghapus sesi aktif pengguna (`sessionStorage` / `AuthController.logout()`) secara instan dan mengembalikan pengguna ke halaman `LoginView`.
- **Proteksi Data *Offline-First***: Seluruh nilai atau catatan administrasi yang sudah diinput guru sebelum logout tetap tersimpan aman di penyimpanan terenkripsi lokal maupun Cloud Google Spreadsheet tanpa risiko hilang.

---

## BAGIAN 2: RINCIAN MODUL, FUNGSI, DAN PENJELASAN LENGKAP MASING-MASING FITUR

Aplikasi ini mengintegrasikan **13 Modul Utama** yang mencakup seluruh siklus akademik sekolah dasar dari awal tahun ajaran hingga pembagian rapor:

### Modul 1: Dashboard Monitoring Eksekutif & Command Center Guru (`DashboardView`)
- **Fungsi Utama**: Pusat kendali analitik bagi Kepala Sekolah dan Wali Kelas untuk memantau performa akademik sekolah secara *real-time*.
- **Fitur Lengkap**:
  - **Filter Rombel Instan**: Memfilter seluruh statistik dashboard berdasarkan kelas (Semua Rombel, Kelas 1 Abdullah Ibnu Abbas, Kelas 1 Abdullah Ibnu Umar).
  - **4 Kartu KPI Utama**: Total Santri Aktif (rasio Ikhwan/Akhwat), Rata-rata Akademik Kelas terhadap KKM, Persentase Kehadiran Bulanan, dan Persentase Daya Serap Asesmen.
  - **Launchpad 6 Akses Cepat Guru**: Pintasan 1-klik menuju modul kerja harian (Input Nilai, Buku Kerja Wali Kelas, Tahfidz, Presensi, Sikap, Cetak Rapor).
  - **Grafik Capaian & Ketuntasan 14 Mata Pelajaran**: Menampilkan rata-rata nilai dan persentase siswa yang melampaui KKM di tiap mata pelajaran.
  - **Radar Prestasi & Pantauan Bimbingan (*Early Warning System*)**: Menampilkan peringkat **Top Capaian Nilai** sekaligus daftar **Siswa Perlu Bimbingan / Remedial** beserta fitur *Quick-View Modal* saat nama siswa diklik.
  - **Validasi & Persetujuan Rapor Digital Kepala Sekolah**: Fitur *1-Click Approval* bagi Kepala Sekolah untuk menerbitkan token enkripsi dan **QR Code Tanda Tangan Digital**.

---

### Modul 2: Kalender Akademik & Program Kegiatan Sekolah (`KalenderAkademikView`)
- **Fungsi Utama**: Mengelola jadwal kegiatan tahunan sekolah, menghitung Hari Efektif Belajar (HEK), serta memetakan agenda ujian dan libur nasional/islami.
- **Fitur Lengkap**:
  - **4 Lembar Kerja Terpadu**: *Kaldik Gabungan*, *Kaldik Kelas 1–5*, *Kaldik Kelas 6*, dan *Daftar Kegiatan Terprogram*.
  - **3 Mode Visualisasi**:
    1. *Mode Kalender Visual 12 Bulan* (dengan kode warna untuk Hari Efektif, Ujian PTS/PAS, Pembagian Rapor, Ramadhan, Munaqosyah Al-Qur'an, dan Libur).
    2. *Mode Daftar Agenda Kronologis*.
    3. *Mode Tabel Analisis Perhitungan Hari Efektif (HEK)* Semester 1 dan Semester 2.
  - **Filter & Pencarian Kegiatan Terprogram**: Mencari kegiatan berdasarkan penanggung jawab (PJ), sasaran kelas, atau kategori kegiatan.

---

### Modul 3: Jadwal Pelajaran & Distribusi Jam Mengajar (`JadwalPelajaranView`)
- **Fungsi Utama**: Mengatur jadwal KBM harian untuk seluruh rombel (12 rombel dari Kelas 1 hingga Kelas 6) serta memantau beban mengajar guru (JP/pekan).
- **Fitur Lengkap**:
  - **Jadwal KBM Per Rombel (Senin s.d. Jum'at)**: Menampilkan urutan jam pelajaran dari Dzikir Pagi & Morning Talk, Halaqah Al-Qur'an, mata pelajaran akademik, istirahat, hingga Shalat Dzuhur & Ashar berjamaah.
  - **Filter Otomatis Jadwal Mengajar Guru**: Guru yang login dapat langsung melihat jadwal mengajarnya sendiri di berbagai kelas.
  - **Tabel Distribusi Struktur Kurikulum**: Rincian alokasi Jam Pelajaran (JP) per pekan untuk setiap mata pelajaran.

---

### Modul 4: Administrasi Wali Kelas & Buku Kerja Guru I–II (`AdministrasiWaliKelasView`)
- **Fungsi Utama**: Mendigitalisasi seluruh dokumen fisik Buku Kerja Wali Kelas (17 lembar dokumen standar akreditasi sekolah) ke dalam satu antarmuka siap cetak.
- **Fitur Lengkap (17 Lembar Administrasi)**:
  1. **Dashboard Hub Buku Kerja I, Buku Kerja II & 14 Mata Pelajaran**
  2. **Cover Sampul Resmi Administrasi Wali Kelas**
  3. **Kata Pengantar Resmi & Spesimen Tanda Tangan**
  4. **Identitas Wali Kelas & Spesimen TTD Kepala Sekolah**
  5. **Buku Induk & Data Siswa Kelas (Filter Ikhwan/Akhwat & Pencarian)**
  6. **Visi, Misi, Motto & Target Tujuan Lulusan**
  7. **Pembiasaan Harian Guru (*Daily & Teacher's Habituation* - 15 Pembiasaan)**
  8. **Tata Tertib Guru (4 Kategori: Kehadiran, Ketidakhadiran, KBM, Adab)**
  9. **Tata Tertib Kelas (15 Aturan Santri)**
  10. **Kalender Akademik Terintegrasi Buku Kerja II**
  11. **Program Kegiatan Terprogram Sekolah**
  12. **Program Kerja & Evaluasi Kelas (*Goals 2026–2027*: Kekurangan, Perbaikan, Cara, Goals Jangka Pendek & Panjang)**
  13. **Jadwal Regu Piket Kebersihan (Senin–Jum'at) & Pembagian Kelompok Belajar (Kelompok A–H)**
  14. **Daftar Riwayat Kesehatan & Alergi Siswa (*Sheet R.Kesehatan*)**
  15. **Inventaris Sarana & Prasarana Kelas (*Sheet Sarpras* - Jumlah Awal, Kondisi Baik & Rusak)**
  16. **Jurnal Catatan Anekdot (*Anecdotal Record* - Input & Tabel Observasi Perilaku Siswa)**
  17. **Daftar Hadir Pengambilan Rapor & Parenting (Checklist Interaktif PTS 1, PAS 1, Parenting 1, PTS 2, PAS 2, Parenting 2)**
  18. **Leger Analisis Pencapaian KKM Latihan (`L1 Murni`, `L2 Rapor`, `L3 Murni`, `L4 Rapor`)**: Menghitung otomatis Jumlah Nilai, Rata-rata, Peringkat (Ranking), Nilai Tertinggi/Terendah, dan Persentase Ketuntasan 14 Mapel.

---

### Modul 5: Pengolahan Nilai Formatif & Sumatif 16 Mata Pelajaran (`NilaiView`)
- **Fungsi Utama**: Mengolah nilai akademik harian dan ujian menjadi Nilai Akhir Rapor beserta deskripsi naratif otomatis.
- **Fitur Lengkap**:
  - **16 Mata Pelajaran Lengkap**: Pendidikan Pancasila (`PP`), Bahasa Indonesia (`BIN`), Matematika (`MAT`), `IPAS`, Seni Rupa (`SB`), `PJOK`, Bahasa Sunda (`BS`), Bahasa Arab (`BAR`), Akidah Akhlak (`AKD`), Fikih Ibadah (`FQH`), Adab Akhlak (`ADB`), Sejarah Kebudayaan Islam (`SKI`), Bahasa Inggris (`BIG`), Informatika (`INF`), Tahfidz & Tahsin (`TFZ`), dan PAI Terpadu (`PAI`).
  - **2 Mode Input (Mode Tabel Spreadsheet & Mode Kartu Mobile)**: Memudahkan guru menginput nilai `F1, F2, F3, F4`, `Sumatif Lingkup Materi`, `PTS`, dan `PAS` baik dari laptop maupun langsung dari smartphone.
  - **Mesin Kalkulasi *Null-Safe* (Anti Error `#DIV/0!`)**: Jika ada kolom formatif yang belum diisi, rumus rata-rata tetap menghitung secara akurat dari kolom yang terisi tanpa menghasilkan error.
  - **Generator Narasi Capaian Otomatis (`Sparkles`)**: Menghasilkan kalimat deskripsi capaian kompetensi Kurikulum Merdeka secara otomatis berdasarkan skor siswa dan KKM mata pelajaran.

---

### Modul 6: Penilaian Al-Qur'an, Tahsin & Tahfidz Kholaqoh (`KholaqohView`)
- **Fungsi Utama**: Mengelola kelompok halaqah Al-Qur'an, mencatat capaian hafalan surat (Juz 30), nilai makharijul huruf, tajwid, dan kelancaran.
- **Fitur Lengkap**:
  - **Manajemen Kelompok Kholaqoh per Muhaffizh/Muhaffizhah**.
  - **Penilaian Komprehensif**: Nilai Tahsin, Tahfidz, capaian surat terakhir, predikat, dan catatan perkembangan bacaan.
  - **Sinkronisasi 1-Klik ke Rapor (`Sync to TFZ`)**: Nilai yang diinput oleh guru Al-Qur'an di modul Kholaqoh dapat langsung ditransfer ke nilai mata pelajaran Tahfidz (`TFZ`) di rapor utama.

---

### Modul 7: Analisis Butir Soal / ABS (`ABSView`)
- **Fungsi Utama**: Menganalisis kualitas soal ujian (Pilihan Ganda, Isian, Uraian) dan tingkat daya serap siswa per butir soal.
- **Fitur Lengkap**:
  - **Perhitungan Otomatis Indeks Kesukaran ($P$)**: Mengklasifikasikan setiap nomor soal ke dalam kategori *Sangat Mudah*, *Mudah*, *Sedang (Ideal)*, *Sulit*, atau *Sangat Sulit*.
  - **Rekomendasi Tindak Lanjut**: Memberikan status otomatis apakah butir soal layak disimpan di Bank Soal, perlu direvisi, atau perlu pengayaan materi bagi siswa.

---

### Modul 8: Penilaian Sikap & Karakter Profil Pelajar Pancasila (`SikapView`)
- **Fungsi Utama**: Mencatat perkembangan karakter, adab islami, sikap spiritual, dan sikap sosial siswa.
- **Fitur Lengkap**:
  - **6 Dimensi Profil Pelajar Pancasila**: *Beriman & Bertakwa*, *Berkebinekaan Global*, *Gotong Royong*, *Mandiri*, *Bernalar Kritis*, dan *Kreatif*.
  - **Penyusun Narasi Sikap Otomatis**: Menggabungkan predikat ke-6 dimensi beserta observasi spiritual dan sosial menjadi paragraf narasi sikap yang santun dan siap cetak di rapor.

---

### Modul 9: Presensi & Kehadiran Bulanan + Ekstrakurikuler (`PresensiView`)
- **Fungsi Utama**: Mencatat rekapitulasi ketidakhadiran siswa (Sakit, Izin, Tanpa Keterangan/Alpa, Keterlambatan), catatan wali kelas, ekstrakurikuler, dan prestasi.
- **Fitur Lengkap**:
  - Input cepat jumlah hari Sakit, Izin, Alpa, dan Terlambat.
  - Kolom **Catatan & Nasihat Wali Kelas** untuk setiap siswa.
  - Pencatatan kegiatan **Ekstrakurikuler** dan **Prestasi Akademik/Non-Akademik**.

---

### Modul 10: Buku Induk Siswa Digital (`BukuIndukView`)
- **Fungsi Utama**: Basis data terpusat biodata lengkap seluruh peserta didik beserta riwayat akademik lintas semester.
- **Fitur Lengkap**:
  - **CRUD Data Siswa Lengkap**: Tambah siswa baru, edit profil (NIS, NISN, TTL, Pendidikan Sebelumnya, Alamat, Nama Ayah/Ibu, Pekerjaan Orang Tua, Foto), dan hapus data.
  - **Pencarian & Filter Multi-Kriteria**: Cari instan berdasarkan nama, NIS, NISN, atau filter per rombel.

---

### Modul 11: Direktori GTK & Penugasan Guru (`GTKView`)
- **Fungsi Utama**: Mengelola database 34+ Pendidik dan Tenaga Kependidikan (GTK) lengkap dengan NUPTK, pendidikan terakhir, jabatan, kelas yang diampu, dan mata pelajaran yang diajarkan.
- **Fitur Lengkap**:
  - Filter berdasarkan kategori jabatan (Kepala Sekolah, Wali Kelas, Guru Mapel, Guru Al-Qur'an, Guru Pendamping, Tenaga Administrasi).
  - Fitur **Simulasi Login Sebagai Guru Terpilih** untuk memudahkan kepala sekolah/admin memeriksa tampilan akun masing-masing guru.

---

### Modul 12: Cetak Rapor Digital A4 & Buku Induk (`RaporPrintView`)
- **Fungsi Utama**: Menghasilkan dokumen rapor resmi berstandar cetak A4 yang presisi lengkap dengan QR Code validasi digital.
- **Fitur Lengkap**:
  - **4 Format Dokumen Siap Cetak**:
    1. **Rapor Akhir Semester (PAS / PAT)**
    2. **Rapor Tengah Semester (PTS)**
    3. **Sampul / Cover Identitas Rapor SD**
    4. **Lembar Buku Induk Siswa**
  - **Mode Cetak Satuan & Mode Cetak Massal (*Bulk Print* Seluruh Siswa 1 Kelas)**: Mencetak rapor 1 kelas sekaligus dengan pemisah halaman (`page-break`) A4 otomatis.
  - **QR Code Validasi Digital & Spesimen Tanda Tangan**: Mencegah pemalsuan dokumen rapor.

---

### Modul 13: Portal Wali Murid (`WaliMuridView`) & CMS Pengaturan Sistem (`CMSView`)
- **Portal Wali Murid (`WaliMuridView`)**:
  - Menampilkan ringkasan capaian nilai ananda, filter kategori mata pelajaran (*Semua Mapel*, *PAI & Al-Qur'an*, *Mapel Umum*), grafik bar per pelajaran, 6 dimensi karakter, catatan wali kelas, serta tombol **Unduh Rapor PDF**.
- **CMS & Pengaturan Sistem (`CMSView`)**:
  - Mengatur identitas sekolah, bobot penilaian (Formatif, Sumatif Lingkup, Sumatif Akhir), KKM standar, tema warna antarmuka (*Theme Presets*), **Ekspor/Impor Backup JSON**, serta konfigurasi URL **Google Apps Script (GAS) Cloud Sync**.

---

## BAGIAN 3: RINCIAN KEUNGGULAN UTAMA APLIKASI INI (VALUE PROPOSITION UNTUK SEKOLAH)

Berikut adalah **10 keunggulan kompetitif** yang menjadikan aplikasi ini solusi terbaik bagi Sekolah Dasar (khususnya SD Islam Terpadu / Sekolah Sunnah & pengguna Kurikulum Merdeka):

1. **Menggantikan Puluhan File Excel yang Terpisah & Rawan Rusak**
   - Selama ini guru wali kelas dan guru bidang studi harus mengisi banyak file Excel (`xlsm`/`xlsx`) terpisah yang sering mengalami error rumus (`#DIV/0!`, `#REF!`, `#VALUE!`) atau tidak sinkron. Aplikasi ini menyatukan **Rapor PTS, Rapor PAS, Buku Kerja I–II, Jadwal, Kaldik, Tahfidz, dan Leger L1–L4** ke dalam **satu platform web terpusat**.
2. **Arsitektur *Hybrid Offline-First* + *Google Spreadsheet Cloud Sync***
   - Aplikasi tetap dapat digunakan dengan sangat cepat meskipun koneksi internet di sekolah sedang tidak stabil (data tersimpan otomatis secara lokal), dan kapan saja dapat disinkronkan ke **Google Spreadsheet (Google Drive Sekolah)** melalui integrasi *Google Apps Script (GAS)* tanpa biaya sewa server database bulanan yang mahal.
3. **Desain Responsif Multi-Perangkat (Desktop, Tablet, dan Smartphone)**
   - Dilengkapi **Mode Kartu Mobile** untuk input nilai dan **Mobile Bottom Navigation Bar**, sehingga guru dapat menginput nilai formatif, mencatat jurnal anekdot, atau mengecek presensi langsung dari ponsel di dalam kelas.
4. **Kurikulum Merdeka + Kekhasan Sekolah Islam dalam Satu Sistem**
   - Tidak seperti aplikasi e-Rapor umum yang hanya memuat mapel diknas, sistem ini sudah mendukung penuh **rumpun Pendidikan Agama Islam terpisah** (*Akidah Akhlak, Fikih Ibadah, Adab Akhlak, SKI, Bahasa Arab*) serta modul khusus **Halaqah Tahfidz & Tahsin Al-Qur'an** yang terhubung langsung ke rapor.
5. **Otomatisasi Narasi Kompetensi & Sikap (Hemat Waktu Kerja Guru hingga 70%)**
   - Guru tidak perlu lagi mengetik kalimat deskripsi capaian ratusan siswa satu per satu. Fitur *Auto-Generate Narasi* menyusun kalimat deskripsi akademik dan sikap secara cerdas dan santun dalam satu klik.
6. **Kelengkapan Administrasi Akreditasi (Buku Kerja Guru I & II Siap Cetak)**
   - Saat ada supervisi kepala sekolah atau visitasi akreditasi pengawas dinas, wali kelas sudah memiliki 17 dokumen administrasi kelas lengkap (mulai dari Visi Misi, Pembiasaan Guru, Tata Tertib, Program Kelas, Piket, Kesehatan, Inventaris Sarpras, Catatan Anekdot, hingga Leger Analisis KKM) yang siap dicetak kapan saja.
7. **Portal Wali Murid Eksklusif dengan Privasi Terjamin**
   - Meningkatkan citra profesionalisme sekolah di mata orang tua murid. Wali murid mendapatkan akses portal modern untuk memantau perkembangan akademik, adab, hafalan Al-Qur'an, dan mengunduh rapor digital PDF ananda dari smartphone masing-masing.
8. **Keamanan & Keabsahan Dokumen dengan QR Code Terenkripsi**
   - Setiap lembar rapor yang dicetak maupun diunduh dilengkapi **QR Code Otentikasi Digital** yang diterbitkan saat Kepala Sekolah menyetujui rapor, memastikan dokumen sah dan bebas manipulasi.
9. **Hak Akses Terkontrol Sesuai Penugasan Guru (*Smart Role Filtering*)**
   - Guru bidang studi hanya melihat dan menginput mata pelajaran yang menjadi tanggung jawabnya, wali kelas fokus pada rombelnya, dan kepala sekolah memegang kendali penuh atas monitoring seluruh kelas.
10. **Siap Pakai (*Turnkey Solution*) & Mudah Dikustomisasi via CMS**
    - Identitas sekolah, nama kepala sekolah, bobot penilaian, daftar mata pelajaran, KKM, hingga warna tema aplikasi dapat diubah langsung dari menu **CMS & Pengaturan** tanpa perlu mengubah kode program.

