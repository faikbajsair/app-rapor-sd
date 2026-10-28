/**
 * SIKAP & AUTO-NARRATIVE ENGINE CONTROLLER
 * Menghasilkan deskripsi naratif capaian sikap siswa secara otomatis
 * berdasarkan indikator 6 Dimensi Profil Pelajar Pancasila + Sikap Spiritual & Sosial.
 */

export const DIMENSI_PANCASILA = [
  { key: 'berimanBertakwa', label: 'Beriman, Bertakwa & Berakhlak Mulia', short: 'Beriman & Berakhlak' },
  { key: 'berkebinekaan', label: 'Berkebinekaan Global & Toleransi', short: 'Berkebinekaan' },
  { key: 'gotongRoyong', label: 'Gotong Royong & Kerja Sama', short: 'Gotong Royong' },
  { key: 'mandiri', label: 'Kemandirian & Tanggung Jawab', short: 'Mandiri' },
  { key: 'bernalarKritis', label: 'Bernalar Kritis & Analitis', short: 'Bernalar Kritis' },
  { key: 'kreatif', label: 'Kreativitas & Daya Cipta', short: 'Kreatif' }
];

export const KRITERIA_SIKAP = [
  { value: 'Sangat Baik', score: 4, badge: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { value: 'Baik', score: 3, badge: 'bg-teal-100 text-teal-800 border-teal-300' },
  { value: 'Cukup', score: 2, badge: 'bg-amber-100 text-amber-800 border-amber-300' },
  { value: 'Perlu Bimbingan', score: 1, badge: 'bg-rose-100 text-rose-800 border-rose-300' }
];

export const SikapController = {
  /**
   * Auto-Narrative Engine: Merangkai deskripsi sikap secara dinamis dan natural
   */
  generateNarasiSikap(namaSiswa, sikapData = {}) {
    const nama = namaSiswa ? namaSiswa.split(' ')[0] : 'Ananda';

    const sangatBaikList = [];
    const baikList = [];
    const cukupList = [];
    const bimbinganList = [];

    DIMENSI_PANCASILA.forEach(d => {
      const val = sikapData[d.key] || 'Baik';
      if (val === 'Sangat Baik') sangatBaikList.push(d.short.toLowerCase());
      else if (val === 'Baik') baikList.push(d.short.toLowerCase());
      else if (val === 'Cukup') cukupList.push(d.short.toLowerCase());
      else if (val === 'Perlu Bimbingan') bimbinganList.push(d.short.toLowerCase());
    });

    const parts = [];

    // Bagian Prestasi Tertinggi
    if (sangatBaikList.length > 0) {
      const joined = sangatBaikList.join(', ');
      parts.push(`Ananda ${nama} menunjukkan pembiasaan yang sangat baik dan konsisten dalam hal ${joined}.`);
    } else if (baikList.length > 0) {
      const joined = baikList.slice(0, 2).join(' dan ');
      parts.push(`Ananda ${nama} menunjukkan perkembangan yang baik dalam sikap ${joined}.`);
    }

    // Bagian Perkembangan Sedang
    if (sangatBaikList.length > 0 && baikList.length > 0) {
      const joinedBaik = baikList.join(', ');
      parts.push(`Mampu mempertahankan perkembangan positif pada dimensi ${joinedBaik}.`);
    }

    // Bagian Catatan / Perlu Peningkatan
    if (bimbinganList.length > 0) {
      const joinedBimbingan = bimbinganList.join(' serta ');
      parts.push(`Perlu pendampingan berkala bersama orang tua dan guru dalam meningkatkan kematangan ${joinedBimbingan}.`);
    } else if (cukupList.length > 0) {
      const joinedCukup = cukupList.join(', ');
      parts.push(`Diharapkan terus termotivasi untuk lebih aktif mengasah ${joinedCukup}.`);
    } else {
      parts.push(`Pertahankan akhlak mulia dan keteladanan yang sudah terbentuk dengan sangat baik.`);
    }

    // Tambahan catatan spiritual/sosial spesifik jika ada
    if (sikapData.spiritualNote) {
      parts.push(sikapData.spiritualNote);
    }

    return parts.join(' ');
  }
};
