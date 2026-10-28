# PANDUAN INTEGRASI GOOGLE APPS SCRIPT (GAS) & GOOGLE SPREADSHEET

Sistem backend **App Rapor SD** menggunakan arsitektur hybrid:
1. **Penyimpanan Lokal & Offline-First (LocalStorage)**: Memastikan aplikasi bekerja instan tanpa jeda, tanpa takut kehilangan data ketika koneksi terputus.
2. **Google Spreadsheet & GAS API Web App**: Berfungsi sebagai database awan kolaboratif gratis tanpa biaya server bulanan!

---

## 3 Langkah Mudah Menghubungkan Google Spreadsheet

### Langkah 1: Buat Google Spreadsheet Baru
1. Buka [Google Sheets](https://sheets.new) di browser Anda.
2. Beri nama spreadsheet Anda, misalnya: `DATABASE RAPOR SD AL-IMAM 2026/2027`.

### Langkah 2: Pasang Skrip Backend
1. Di Google Sheets, klik menu **Ekstensi (Extensions)** > **Apps Script**.
2. Hapus seluruh isi kode bawaan di editor `Code.gs`.
3. Salin dan tempelkan seluruh isi file [Code.gs](file:///Users/faikbajsair/Downloads/App%20Rapor%20SD/google-apps-script/Code.gs).
4. Klik ikon **Simpan (Save)** 💾.

### Langkah 3: Deploy sebagai Web App
1. Klik tombol biru **Terapkan (Deploy)** di pojok kanan atas > Pilih **Penerapan Baru (New Deployment)**.
2. Klik ikon gerigi ⚙️ di samping "Select type" > Pilih **Aplikasi Web (Web App)**.
3. Konfigurasikan:
   - **Deskripsi**: `API App Rapor SD v1`
   - **Jalankan sebagai (Execute as)**: `Saya (email Anda)`
   - **Yang memiliki akses (Who has access)**: `Siapa saja (Anyone)` *(Penting agar aplikasi frontend web dapat membaca & menulis data)*
4. Klik **Terapkan (Deploy)**.
5. Berikan izin akses Google akun Anda saat diminta.
6. Salin **URL Aplikasi Web (Web App URL)** yang berformat:
   `https://script.google.com/macros/s/AKfycb.../exec`

### Langkah 4: Hubungkan ke Aplikasi Frontend
1. Buka Aplikasi Web Rapor SD > Masuk sebagai **Administrator**.
2. Buka menu **CMS & Pengaturan Lisensi**.
3. Masukkan URL Web App ke kolom **"URL Google Apps Script Web App"**.
4. Klik tombol **"Uji Koneksi & Sinkronisasi"**.
5. Spreadsheet Anda akan otomatis dibuatkan tabel:
   - `SEKOLAH_SETTINGS`
   - `DATA_SISWA`
   - `DATA_MAPEL`
   - `DATA_NILAI`
   - `DATA_ABS`
   - `DATA_SIKAP`
   - `DATA_PRESENSI`
   - `AUDIT_LOGS`
