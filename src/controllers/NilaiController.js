/**
 * NILAI CONTROLLER
 * Menghitung Nilai Formatif, Sumatif Lingkup, PTS, PAS, dan Nilai Akhir (NA)
 * Dilengkapi perlindungan null/undefined/NaN handling ketat (Bebas error #DIV/0!)
 */

export const NilaiController = {
  /**
   * Menghitung rata-rata nilai formatif dengan null handling aman
   */
  hitungRataFormatif(f1, f2, f3, f4) {
    const list = [f1, f2, f3, f4].filter(v => v !== null && v !== undefined && v !== '' && !isNaN(Number(v)));
    if (list.length === 0) return 0;
    const sum = list.reduce((acc, curr) => acc + Number(curr), 0);
    return Math.round((sum / list.length) * 10) / 10;
  },

  /**
   * Menghitung Nilai Akhir (NA) Rapor berdasarkan bobot dinamis
   * Bobot default: Formatif (40%), Sumatif Lingkup (30%), Sumatif Akhir PTS/PAS (30%)
   */
  hitungNilaiAkhir(record, settings = {}) {
    if (!record) return 0;

    const bFormatif = Number(settings.bobotFormatif) || 40;
    const bSumatifLingkup = Number(settings.bobotSumatifLingkup) || 30;
    const bSumatifAkhir = Number(settings.bobotSumatifAkhir) || 30;

    const rataFormatif = this.hitungRataFormatif(record.f1, record.f2, record.f3, record.f4);
    
    const sumatifLingkup = Number(record.sumatifLingkup) || 0;
    
    // Sumatif Akhir adalah gabungan PTS & PAS (atau PAS saja jika PTS tidak ada)
    const pts = record.pts !== null && record.pts !== undefined && record.pts !== '' ? Number(record.pts) : null;
    const pas = record.pas !== null && record.pas !== undefined && record.pas !== '' ? Number(record.pas) : null;

    let sumatifAkhir = 0;
    if (pts !== null && pas !== null) {
      sumatifAkhir = (pts + pas) / 2;
    } else if (pas !== null) {
      sumatifAkhir = pas;
    } else if (pts !== null) {
      sumatifAkhir = pts;
    }

    const totalBobot = bFormatif + bSumatifLingkup + bSumatifAkhir;
    if (totalBobot <= 0) return 0;

    const na = (
      (rataFormatif * bFormatif) +
      (sumatifLingkup * bSumatifLingkup) +
      (sumatifAkhir * bSumatifAkhir)
    ) / totalBobot;

    return Math.round(na);
  },

  /**
   * Menentukan predikat huruf berdasarkan KKM dan skor
   */
  getPredikat(nilai, kkm = 75) {
    const n = Number(nilai) || 0;
    if (n >= 90) return { label: 'A', status: 'Sangat Baik', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (n >= 80) return { label: 'B', status: 'Baik', color: 'text-teal-700 bg-teal-50 border-teal-200' };
    if (n >= kkm) return { label: 'C', status: 'Cukup', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { label: 'D', status: 'Perlu Bimbingan', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  },

  /**
   * Menentukan status ketuntasan siswa
   */
  isTuntas(nilai, kkm = 75) {
    return (Number(nilai) || 0) >= (Number(kkm) || 75);
  },

  /**
   * Generator otomatis deskripsi capaian pembelajaran
   */
  generateDeskripsi(namaSiswa, mapelNama, nilai, kkm = 75) {
    const n = Number(nilai) || 0;
    if (n >= 90) {
      return `Menunjukkan penguasaan yang sangat istimewa dalam seluruh capaian pembelajaran mata pelajaran ${mapelNama}. Sangat aktif, tekun, dan cermat.`;
    } else if (n >= 80) {
      return `Menunjukkan penguasaan yang baik dalam capaian pembelajaran mata pelajaran ${mapelNama}, mampu memahami konsep inti dengan tepat.`;
    } else if (n >= kkm) {
      return `Mencapai kriteria ketuntasan minimal dalam pembelajaran ${mapelNama}. Disarankan untuk memperbanyak latihan pemecahan soal terapan.`;
    } else {
      return `Perlu pendampingan khusus dan bimbingan remedi pada indikator kompetensi dasar ${mapelNama} agar mencapai kriteria ketuntasan.`;
    }
  }
};
