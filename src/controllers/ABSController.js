/**
 * ANALISIS BUTIR SOAL (ABS) CONTROLLER
 * Menghitung Indeks Tingkat Kesukaran (P), Daya Serap, Daya Pembeda, dan Status Rekomendasi
 */

export const ABSController = {
  /**
   * Menghitung Tingkat Kesukaran (P) suatu butir soal
   * Formula: P = (Jumlah Skor Seluruh Siswa) / (Jumlah Siswa * Skor Maksimal)
   */
  hitungTingkatKesukaran(item, siswaList = []) {
    if (!item || !siswaList || siswaList.length === 0) {
      return { p: 0, kategori: 'Belum Ada Data', color: 'bg-gray-100 text-gray-700', rekomendasi: 'Belum diuji' };
    }

    const skorMap = item.skorSiswa || {};
    const maxScore = Number(item.bobotMaks) || 1;
    let totalScore = 0;
    let count = 0;

    siswaList.forEach(siswa => {
      if (skorMap[siswa.id] !== undefined && skorMap[siswa.id] !== null && skorMap[siswa.id] !== '') {
        totalScore += Number(skorMap[siswa.id]);
        count++;
      }
    });

    if (count === 0 || maxScore <= 0) {
      return { p: 0, persen: 0, kategori: 'Belum Diisi', color: 'bg-gray-100 text-gray-600', rekomendasi: 'Isi skor siswa' };
    }

    const p = totalScore / (count * maxScore);
    const roundedP = Math.round(p * 100) / 100;
    const persen = Math.round(p * 100);

    let kategori = '';
    let color = '';
    let rekomendasi = '';

    if (roundedP < 0.20) {
      kategori = 'Sangat Sulit';
      color = 'bg-rose-100 text-rose-800 border-rose-300';
      rekomendasi = 'Perlu direvisi mendalam / sederhanakan bahasa';
    } else if (roundedP < 0.40) {
      kategori = 'Sulit';
      color = 'bg-amber-100 text-amber-800 border-amber-300';
      rekomendasi = 'Revisi pengecoh atau perjelas konteks soal';
    } else if (roundedP < 0.60) {
      kategori = 'Sedang (Ideal)';
      color = 'bg-emerald-100 text-emerald-800 border-emerald-300';
      rekomendasi = 'Sangat baik, simpan ke Bank Soal';
    } else if (roundedP < 0.80) {
      kategori = 'Mudah';
      color = 'bg-teal-100 text-teal-800 border-teal-300';
      rekomendasi = 'Diterima sebagai butir penguji dasar';
    } else {
      kategori = 'Sangat Mudah';
      color = 'bg-sky-100 text-sky-800 border-sky-300';
      rekomendasi = 'Terlalu mudah / tingkatkan kompleksitas';
    }

    return {
      p: roundedP,
      persen,
      kategori,
      color,
      rekomendasi,
      totalScore,
      count
    };
  },

  /**
   * Menghitung Daya Serap Keseluruhan Ujian
   */
  hitungDayaSerap(items = [], siswaList = []) {
    if (!items.length || !siswaList.length) return { dayaSerap: 0, rataSkor: 0, maxTotal: 0 };

    const maxTotalPerSiswa = items.reduce((acc, curr) => acc + (Number(curr.bobotMaks) || 1), 0);
    if (maxTotalPerSiswa === 0) return { dayaSerap: 0, rataSkor: 0, maxTotal: 0 };

    let totalSkorSeluruhSiswa = 0;
    let siswaDinilai = 0;

    siswaList.forEach(s => {
      let skorSiswa = 0;
      let adaSkor = false;
      items.forEach(item => {
        const val = item.skorSiswa?.[s.id];
        if (val !== undefined && val !== null && val !== '') {
          skorSiswa += Number(val);
          adaSkor = true;
        }
      });
      if (adaSkor) {
        totalSkorSeluruhSiswa += skorSiswa;
        siswaDinilai++;
      }
    });

    if (siswaDinilai === 0) return { dayaSerap: 0, rataSkor: 0, maxTotal: maxTotalPerSiswa };

    const rataSkor = Math.round((totalSkorSeluruhSiswa / siswaDinilai) * 10) / 10;
    const dayaSerap = Math.round((rataSkor / maxTotalPerSiswa) * 100);

    return {
      dayaSerap,
      rataSkor,
      maxTotal: maxTotalPerSiswa,
      siswaDinilai
    };
  },

  /**
   * Mengelompokkan distribusi kesukaran soal
   */
  getDistribusiKesukaran(items = [], siswaList = []) {
    const counts = {
      'Sangat Sulit': 0,
      'Sulit': 0,
      'Sedang (Ideal)': 0,
      'Mudah': 0,
      'Sangat Mudah': 0
    };

    items.forEach(item => {
      const res = this.hitungTingkatKesukaran(item, siswaList);
      if (counts[res.kategori] !== undefined) {
        counts[res.kategori]++;
      }
    });

    return counts;
  }
};
