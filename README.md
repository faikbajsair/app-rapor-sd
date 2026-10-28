# Aplikasi Rapor SD Interaktif & Konvensional (SaaS Ready)
### Sistem Informasi Penilaian Kurikulum Merdeka & Analisis Butir Soal (ABS) Terintegrasi Google Apps Script (GAS)

![Al-Imam Islamic School](https://alimamischool.com/wp-content/uploads/2020/08/Al-Imam-Islamic-School-alimamischool.com-sekolah-sunnah-logo.png)

Aplikasi web modern berbasis **Model-View-Controller (MVC)** yang mentransformasikan sistem buku rapor / spreadsheet konvensional menjadi platform web yang cepat, responsif, aman, dan siap dikomersialkan (SaaS Ready).

---

## 🌟 Arsitektur Sistem (Hybrid Cloud + Offline-First)

```
       +-------------------------------------------------------------+
       |                     FRONTEND (VIEW LAYER)                   |
       |  React 18 + Tailwind CSS v3 + Lucide Icons + QRCode Canvas  |
       |  (Dideploy melalui Vercel / GitHub Integration)             |
       +------------------------------+------------------------------+
                                      |
       +------------------------------v------------------------------+
       |                   CONTROLLER & LOGIC LAYER                  |
       |  - AuthController & Multi-Role Permission Matrix            |
       |  - NilaiController (Formatif, Sumatif, Null-Safe NA)        |
       |  - ABSController (Dynamic Builder, Indeks P, Daya Serap)   |
       |  - SikapController (6 Dimensi Pancasila + Auto-Narrative)   |
       |  - CMSController (Live Dynamic Theme, Logo, Favicon, SaaS)  |
       +------------------------------+------------------------------+
                                      |
       +------------------------------v------------------------------+
       |                      MODEL / STORAGE LAYER                  |
       |  - StorageAdapter (LocalStorage Cache, Event Subscription)  |
       |  - Google Apps Script REST API Client (Hybrid Cloud Sync)   |
       +------------------------------+------------------------------+
                                      |
                      +---------------+---------------+
                      |                               |
        +-------------v------------+    +-------------v------------+
        |   LOCAL STORAGE CACHE    |    |  GOOGLE APPS SCRIPT API  |
        |   - Instant Zero Latency |    |  - Free Cloud Database   |
        |   - 100% Offline-Safe    |    |  - Google Sheets Backend |
        +--------------------------+    +--------------------------+
```

---

## 👥 5 Peran Pengguna (Multi-User Access Control)

| Role | Akses Utama & Tanggung Jawab |
| :--- | :--- |
| **1. Administrator** | CMS Dashboard, Pengaturan Tampilan Visual (Tema Warna Pastel / Logo / Favicon), Manajemen Lisensi SaaS, Registrasi Mapel Baru & Siswa, Backup & Restore JSON. |
| **2. Kepala Sekolah** | Dashboard Monitoring Eksekutif, Daya Serap Soal, Sebaran Kesukaran Soal, Approval Rapor & Fitur Tanda Tangan Digital dengan QR Code Terenkripsi. |
| **3. Guru Wali Kelas** | Input Presensi Bulanan (S/I/A/Terlambat), Penilaian Sikap (Auto-Narrative Generator), Catatan/Saran Wali Kelas, Bulk Print / Cetak Massal Rapor & Buku Induk. |
| **4. Guru Mata Pelajaran** | Analisis Butir Soal (ABS Dinamis PG/Isian/Uraian), Input Nilai Formatif & Sumatif, Grafik Tingkat Kesukaran Soal (Indeks P). |
| **5. Wali Murid / Orang Tua** | Portal Khusus Orang Tua: Pantau nilai harian/akhir anak, grafik perkembangan akademik, rekap kehadiran, catatan guru, dan download Rapor Digital PDF. |

---

## 🧮 Modul Inti & Logika Perhitungan

### 1. Modul Analisis Butir Soal (ABS)
- **Dynamic Question Builder**: Mendukung bentuk soal Pilihan Ganda (bobot 1), Isian Singkat (bobot 2), dan Uraian Bebas (bobot 4 s.d 10).
- **Indeks Tingkat Kesukaran ($P$)**:
  $$P = \frac{\sum \text{Skor Siswa}}{\text{Jumlah Siswa} \times \text{Skor Maksimal}}$$
  - $0.00 \le P < 0.20$ : **Sangat Sulit** (Perlu revisi bahasa/konsep)
  - $0.20 \le P < 0.40$ : **Sulit** (Periksa pengecoh soal)
  - $0.40 \le P < 0.60$ : **Sedang / Ideal** (Kualitas bank soal terbaik)
  - $0.60 \le P < 0.80$ : **Mudah** (Butir penguji dasar)
  - $0.80 \le P \le 1.00$ : **Sangat Mudah** (Tingkatkan kompleksitas)
- **Kalkulasi Daya Serap Ujian**:
  $$\text{Daya Serap} = \left(\frac{\text{Rata-rata Skor Total}}{\text{Total Bobot Maksimal}}\right) \times 100\%$$

### 2. Modul Pengolahan Nilai (N1 - N15 / Dinamis)
- Kalkulasi otomatis Rata-rata Formatif (TP1 - TP4), Sumatif Lingkup, PTS, PAS, dan Nilai Akhir (NA).
- **Null Safety Terpadu**: Tidak ada error `#DIV/0!` atau `#ERROR!` jika data belum lengkap diisi.
- Penentuan Predikat (A, B, C, D) dan Status Ketuntasan otomatis terhadap KKM.

### 3. Modul Sikap & Auto-Narrative Engine
- Mengacu pada **6 Dimensi Profil Pelajar Pancasila** (Beriman & Bertakwa, Berkebinekaan, Gotong Royong, Mandiri, Bernalar Kritis, Kreatif) serta Karakter Spiritual & Sosial.
- **Engine Narasi Otomatis**: Secara cerdas merangkai kalimat deskripsi capaian karakter berbahasa Indonesia yang formal dan terstruktur untuk dicetak langsung pada buku rapor.

### 4. CMS & Dynamic Appearance
- Pengubahan palet warna instan (Hijau Pastel `#A8E6CF` / `#D4EDDA`, Sage Earth, Mint Breeze, Sky Blue, atau Custom HEX).
- Perubahan Nama Sekolah, NPSN, Alamat, Logo, Favicon, dan Nama Pejabat tanpa perlu edit kodingan.
- Konfigurasi Bobot Penilaian (Formatif %, Sumatif Lingkup %, Sumatif Akhir %).
- Pengelolaan Lisensi SaaS (Status masa aktif, kuota siswa, countdown kadaluwarsa).

### 5. Layanan Cetak Rapor & Buku Induk (PDF Ready A4)
- Presisi ukuran cetak **A4 Portrait** dengan margin standar 15mm dan page-break otomatis.
- Format yang siap dicetak:
  1. Halaman Sampul (Cover Rapor SD).
  2. Halaman Identitas Siswa & Sekolah.
  3. Halaman Capaian Kompetensi & Hasil Belajar (Rapor PAS & PTS).
  4. Halaman Perkembangan Karakter & Profil Pancasila.
  5. Lembar Buku Induk Siswa Digital.
- Otentikasi Tanda Tangan Digital dengan **QR Code Scanner Verifikasi**.

---

## 🚀 Panduan Menjalankan Secara Lokal

```bash
# 1. Pastikan Node.js (v18+) terpasang
node -v

# 2. Masuk ke direktori proyek dan pasang dependensi
npm install

# 3. Jalankan server pengembangan
npm run dev

# 4. Buka di browser: http://localhost:5173
```

---

## ☁️ Panduan Integrasi Google Apps Script (GAS)

1. Buka [Google Sheets](https://sheets.new) dan beri nama file spreadsheet Anda.
2. Buka menu **Ekstensi (Extensions)** > **Apps Script**.
3. Salin seluruh kode dari file [`google-apps-script/Code.gs`](file:///Users/faikbajsair/Downloads/App%20Rapor%20SD/google-apps-script/Code.gs) ke editor GAS.
4. Klik **Terapkan (Deploy)** > **Penerapan Baru (New Deployment)**.
5. Pilih jenis **Aplikasi Web (Web App)**:
   - **Execute as**: `Me (Saya)`
   - **Who has access**: `Anyone (Siapa saja)`
6. Salin URL Web App yang diperoleh.
7. Masuk ke aplikasi Rapor SD sebagai **Administrator**, buka tab **CMS & Pengaturan Lisensi**, tempel URL ke kolom **URL Google Apps Script**, lalu klik **Uji Koneksi & Sinkron Data**.

---

## 🚢 Deployment ke Vercel

Proyek ini telah dilengkapi file konfigurasi [`vercel.json`](file:///Users/faikbajsair/Downloads/App%20Rapor%20SD/vercel.json) untuk Single Page Application routing:

1. Push repositori ini ke GitHub Anda:
   ```bash
   git init
   git add .
   git commit -m "feat: inisialisasi aplikasi rapor SD interaktif & konvensional"
   git remote add origin <URL_REPO_GITHUB_ANDA>
   git push -u origin main
   ```
2. Buka [Vercel Dashboard](https://vercel.com/) > Klik **Add New Project**.
3. Impor repositori GitHub Anda. Vercel akan otomatis mendeteksi konfigurasi Vite:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Klik **Deploy** dan aplikasi Anda langsung aktif online!
