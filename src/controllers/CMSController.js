/**
 * CMS & APPEARANCE CONTROLLER
 * Mengelola perubahan visual (tema warna, logo, judul, favicon)
 * dan lisensi komersial SaaS secara dinamis tanpa perlu edit kodingan.
 */

export const THEME_PRESETS = [
  {
    id: 'pastel-green',
    name: 'Hijau Pastel Al-Imam (Default)',
    primary: '#A8E6CF',
    secondary: '#D4EDDA',
    accent: '#267759',
    previewBg: 'bg-[#A8E6CF]',
    desc: 'Dominan Hijau Pastel lembut, sejuk untuk mata, identitas sekolah sunnah/islam'
  },
  {
    id: 'sage-nature',
    name: 'Sage Modern Earth',
    primary: '#C2CCC0',
    secondary: '#EDF0EB',
    accent: '#495547',
    previewBg: 'bg-[#C2CCC0]',
    desc: 'Nuansa daun sage elegan dan minimalis kontemporer'
  },
  {
    id: 'mint-fresh',
    name: 'Mint Breeze',
    primary: '#B8EBD0',
    secondary: '#E8F8F0',
    accent: '#1D7856',
    previewBg: 'bg-[#B8EBD0]',
    desc: 'Aksen mint segar dan bersih untuk institusi pendidikan modern'
  },
  {
    id: 'sky-cerulean',
    name: 'Sky Pastel Oceanic',
    primary: '#BAE6FD',
    secondary: '#F0F9FF',
    accent: '#0369A1',
    previewBg: 'bg-[#BAE6FD]',
    desc: 'Kombinasi biru langit pastel yang profesional dan cerah'
  }
];

export const CMSController = {
  /**
   * Menerapkan tema visual ke DOM secara instan
   */
  applyAppearance(settings) {
    if (!settings) return;

    // Update Favicon
    if (settings.faviconUrl) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = settings.faviconUrl;
    }

    // Update Title Tag
    if (settings.schoolName) {
      document.title = `${settings.schoolName} - Aplikasi Rapor SD`;
    }

    // Set CSS custom properties
    const root = document.documentElement;
    if (settings.primaryColor) {
      root.style.setProperty('--theme-primary', settings.primaryColor);
    }
    if (settings.secondaryColor) {
      root.style.setProperty('--theme-secondary', settings.secondaryColor);
    }
    if (settings.accentColor) {
      root.style.setProperty('--theme-accent', settings.accentColor);
    }
  },

  /**
   * Menghitung status masa berlaku lisensi SaaS
   */
  checkLicenseStatus(expiryDateStr) {
    if (!expiryDateStr) {
      return { status: 'Unknown', isExpiringSoon: false, daysLeft: 0, badge: 'bg-gray-100 text-gray-700' };
    }

    const expiry = new Date(expiryDateStr);
    const now = new Date();
    const diffTime = expiry - now;
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (daysLeft <= 0) {
      return {
        status: 'Expired (Kedaluwarsa)',
        isExpiringSoon: true,
        daysLeft: 0,
        badge: 'bg-rose-100 text-rose-800 border-rose-300'
      };
    } else if (daysLeft <= 30) {
      return {
        status: 'Segera Berakhir',
        isExpiringSoon: true,
        daysLeft,
        badge: 'bg-amber-100 text-amber-800 border-amber-300'
      };
    } else {
      return {
        status: 'Aktif (Enterprise)',
        isExpiringSoon: false,
        daysLeft,
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      };
    }
  }
};
