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
   * Mengirim seluruh data lokal ke Google Spreadsheet
   */
  async syncAll(url, payload) {
    if (!url) return { success: false, message: "URL GAS tidak disetel." };
    try {
      const res = await fetch(url.trim(), {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8' // GAS Web App requires text/plain or no-cors for avoid preflight quirks
        },
        body: JSON.stringify({
          action: 'syncAll',
          data: payload
        })
      });
      
      const json = await res.json();
      return { success: json.status === 'success', message: json.message || "Sinkronisasi berhasil!" };
    } catch (err) {
      console.error("GAS syncAll Error:", err);
      return { success: false, message: `Gagal sinkronisasi: ${err.message}` };
    }
  }
};
