/**
 * Google Apps Script Web App REST API Client
 */

export const gasApi = {
  /**
   * Ping GAS Web App untuk memverifikasi endpoint aktif
   */
  async ping(url) {
    if (!url || !url.trim()) {
      return { success: false, message: "URL GAS Web App belum dikonfigurasi." };
    }
    
    try {
      const endpoint = `${url.trim()}?action=ping&t=${Date.now()}`;
      const res = await fetch(endpoint, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }
      
      const json = await res.json();
      return { success: json.status === 'success', data: json };
    } catch (err) {
      return {
        success: false,
        message: `Gagal terhubung ke GAS: ${err.message}. Pastikan izin deployment diatur ke "Anyone" (Siapa saja).`
      };
    }
  },

  /**
   * Mengambil semua data dari Google Spreadsheet
   */
  async fetchAll(url) {
    if (!url) return null;
    try {
      const endpoint = `${url.trim()}?action=getAllData&t=${Date.now()}`;
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      const json = await res.json();
      return json.status === 'success' ? json.data : null;
    } catch (err) {
      console.error("GAS fetchAll Error:", err);
      throw err;
    }
  },

  /**
   * Mengirim seluruh data lokal ke Google Spreadsheet (dengan chunking otomatis agar bebas timeout GAS)
   */
  async syncAll(url, payload) {
    if (!url) return { success: false, message: "URL GAS tidak disetel." };
    const cleanUrl = url.trim();
    const postBatch = async (batchData) => {
      const res = await fetch(cleanUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({
          action: 'syncAll',
          data: batchData
        })
      });
      return res.json();
    };

    try {
      // Tahap 1: Sinkronkan tabel utama (Settings, Siswa, Mapel, Sikap, Presensi, ABS)
      const { nilai, ...corePayload } = payload;
      const resCore = await postBatch(corePayload);
      if (resCore.status !== 'success') {
        throw new Error(resCore.message || 'Gagal menyinkronkan data utama');
      }

      // Tahap 2: Sinkronkan data nilai secara bertahap (per 80 baris) agar cepat & bebas limit eksekusi GAS
      if (Array.isArray(nilai) && nilai.length > 0) {
        const CHUNK_SIZE = 80;
        for (let i = 0; i < nilai.length; i += CHUNK_SIZE) {
          const slice = nilai.slice(i, i + CHUNK_SIZE);
          await postBatch({ nilai: slice });
        }
      }

      return { success: true, message: "Seluruh data (Siswa, Presensi, Sikap, Saran & Nilai) berhasil disinkronkan ke Google Spreadsheet!" };
    } catch (err) {
      console.error("GAS syncAll Error:", err);
      return { success: false, message: `Gagal sinkronisasi: ${err.message}` };
    }
  }
};
