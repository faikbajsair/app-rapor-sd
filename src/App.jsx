import React, { useState, useEffect } from 'react';
import { ROLES, ROLE_CONFIG } from './config/roles';
import { storage } from './models/storageAdapter';
import { gasApi } from './models/gasApi';
import { CMSController } from './controllers/CMSController';
import { AuthController } from './controllers/AuthController';

import { Navbar } from './views/components/Navbar';
import { Sidebar } from './views/components/Sidebar';
import { RoleSwitcherModal } from './views/components/RoleSwitcherModal';

import { LoginView } from './views/pages/LoginView';
import { DashboardView } from './views/pages/DashboardView';
import { NilaiView } from './views/pages/NilaiView';
import { ABSView } from './views/pages/ABSView';
import { SikapView } from './views/pages/SikapView';
import { PresensiView } from './views/pages/PresensiView';
import { BukuIndukView } from './views/pages/BukuIndukView';
import { RaporPrintView } from './views/pages/RaporPrintView';
import { CMSView } from './views/pages/CMSView';
import { WaliMuridView } from './views/pages/WaliMuridView';
import { KholaqohView } from './views/pages/KholaqohView';
import { GTKView } from './views/pages/GTKView';
import { KalenderAkademikView } from './views/pages/KalenderAkademikView';

export function App() {
  // App Model State from StorageAdapter
  const [settings, setSettings] = useState(storage.getSettings());
  const [siswaList, setSiswaList] = useState(storage.getSiswa());
  const [mapelList, setMapelList] = useState(storage.getMapel());
  const [nilaiList, setNilaiList] = useState(storage.getNilai());
  const [absList, setAbsList] = useState(storage.getABS());
  const [sikapList, setSikapList] = useState(storage.getSikap());
  const [presensiList, setPresensiList] = useState(storage.getPresensi());
  const [approval, setApproval] = useState(storage.getApproval());
  const [gtkList, setGtkList] = useState(storage.getGTK());
  const [kholaqohList, setKholaqohList] = useState(storage.getKholaqoh());
  const [kholaqohNilaiList, setKholaqohNilaiList] = useState(storage.getKholaqohNilai());

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => AuthController.getSession());
  const [currentRole, setCurrentRole] = useState(() => {
    const session = AuthController.getSession();
    return session ? session.role : ROLES.ADMIN;
  });

  // Navigation State
  const [activeTab, setActiveTab] = useState(() => {
    const session = AuthController.getSession();
    if (!session) return 'dashboard';
    return session.role === ROLES.WALI_MURID ? 'portal_ortu' : 'dashboard';
  });
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  // Cloud GAS Sync State
  const [isSyncing, setIsSyncing] = useState(false);
  const [gasConnected, setGasConnected] = useState(false);

  // Subscribe to Storage updates
  useEffect(() => {
    const unsubscribe = storage.subscribe(() => {
      setSettings(storage.getSettings());
      setSiswaList(storage.getSiswa());
      setMapelList(storage.getMapel());
      setNilaiList(storage.getNilai());
      setAbsList(storage.getABS());
      setSikapList(storage.getSikap());
      setPresensiList(storage.getPresensi());
      setApproval(storage.getApproval());
      setGtkList(storage.getGTK());
      setKholaqohList(storage.getKholaqoh());
      setKholaqohNilaiList(storage.getKholaqohNilai());
    });

    CMSController.applyAppearance(settings);

    return () => unsubscribe();
  }, []);

  // Update appearance whenever settings change
  useEffect(() => {
    CMSController.applyAppearance(settings);
  }, [settings]);

  // Check GAS status on mount
  useEffect(() => {
    if (settings.gasApiUrl) {
      gasApi.ping(settings.gasApiUrl).then(res => {
        setGasConnected(res.success);
      }).catch(() => setGasConnected(false));
    }
  }, [settings.gasApiUrl]);

  // Auth Handlers
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    if (user.role === ROLES.WALI_MURID) {
      setActiveTab('portal_ortu');
    } else {
      const cfg = ROLE_CONFIG[user.role];
      setActiveTab(cfg?.defaultPath || 'dashboard');
    }
  };

  const handleLogout = () => {
    AuthController.logout();
    setCurrentUser(null);
  };

  // Role Selection Handler (For staff simulation)
  const handleSelectRole = (newRole) => {
    setCurrentRole(newRole);
    const targetConfig = ROLE_CONFIG[newRole];
    if (targetConfig) {
      const updatedUser = {
        ...currentUser,
        role: newRole,
        roleLabel: targetConfig.label,
        nama: targetConfig.nama || currentUser?.nama,
        avatar: targetConfig.avatar
      };
      setCurrentUser(updatedUser);
      AuthController.setSession(updatedUser);
      if (targetConfig.defaultPath) {
        setActiveTab(targetConfig.defaultPath);
      }
    }
  };

  // Academic Period Handlers
  const handleChangeTahunAjaran = (newTahun) => {
    handleSaveSettings({ tahunAjaran: newTahun });
  };

  const handleChangeSemester = (newSemester) => {
    handleSaveSettings({ semester: newSemester });
  };

  // Model Mutation Handlers
  const handleSaveSettings = (newSettings) => {
    const saved = storage.saveSettings(newSettings);
    setSettings(saved);
  };

  const handleSaveNilai = (record) => {
    storage.upsertNilai(record);
  };

  const handleAddMapel = (newMapel) => {
    storage.addMapel(newMapel);
  };

  const handleSaveABS = (updatedABSList) => {
    storage.saveABS(updatedABSList);
  };

  const handleSaveSikap = (record) => {
    storage.upsertSikap(record);
  };

  const handleSavePresensi = (record) => {
    storage.upsertPresensi(record);
  };

  const handleAddSiswa = (newSiswa) => {
    storage.addSiswa(newSiswa);
  };

  const handleUpdateSiswa = (id, updatedFields) => {
    storage.updateSiswa(id, updatedFields);
  };

  const handleDeleteSiswa = (id) => {
    storage.deleteSiswa(id);
  };

  const handleUpdateApproval = (newApproval) => {
    storage.saveApproval(newApproval);
  };

  // Google Apps Script Cloud Sync
  const handleSyncAllToGAS = async () => {
    if (!settings.gasApiUrl) {
      throw new Error("URL Google Apps Script belum diisi di Pengaturan CMS.");
    }

    setIsSyncing(true);
    try {
      const payload = {
        settings: [
          { key: 'schoolName', value: settings.schoolName },
          { key: 'npsn', value: settings.npsn },
          { key: 'kepalaSekolah', value: settings.kepalaSekolah },
          { key: 'waliKelas', value: settings.waliKelas },
          { key: 'semester', value: settings.semester },
          { key: 'tahunAjaran', value: settings.tahunAjaran }
        ],
        siswa: siswaList,
        mapel: mapelList,
        nilai: nilaiList,
        abs: absList,
        sikap: sikapList,
        presensi: presensiList
      };

      const res = await gasApi.syncAll(settings.gasApiUrl, payload);
      if (res.success) {
        setGasConnected(true);
      } else {
        throw new Error(res.message);
      }
    } finally {
      setIsSyncing(false);
    }
  };

  // Backup & Restore
  const handleExportBackup = () => {
    const data = storage.exportFullBackup();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_rapor_sd_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (jsonData) => {
    return storage.importFullBackup(jsonData);
  };

  const handleResetDefaults = () => {
    storage.resetToDefaults();
  };

  const handleSaveKholaqohNilai = (record) => {
    storage.upsertKholaqohNilai(record);
  };

  const handleSyncKholaqohToTFZ = (record) => {
    storage.upsertNilai(record);
  };

  const handleSwitchToGTK = (gtk) => {
    const userSession = {
      id: `USR_${gtk.id}`,
      gtkId: gtk.id,
      nama: gtk.nama,
      email: gtk.email,
      nuptk: gtk.nuptk || '',
      nip: gtk.nip || '',
      role: gtk.role,
      roleLabel: gtk.jabatan,
      jabatan: gtk.jabatan,
      jabatanLainnya: gtk.jabatanLainnya || '',
      statusJabatan: gtk.statusJabatan,
      pendidikan: gtk.pendidikan,
      kelasDiampu: gtk.kelasDiampu || [],
      mapelDiampu: gtk.mapelDiampu || [],
      kholaqohDiampu: gtk.kholaqohDiampu || [],
      avatar: gtk.avatar || (ROLE_CONFIG[gtk.role]?.avatar),
      badge: gtk.badge || gtk.jabatan,
      loginTime: new Date().toISOString()
    };
    AuthController.setSession(userSession);
    setCurrentUser(userSession);
    setCurrentRole(userSession.role);
    if (gtk.role === ROLES.GURU_QURAN) {
      setActiveTab('kholaqoh');
    } else if (gtk.role === ROLES.GURU_MAPEL) {
      setActiveTab('nilai');
    } else if (gtk.role === ROLES.WALI_KELAS) {
      setActiveTab('rapor');
    } else {
      setActiveTab('dashboard');
    }
  };

  // If NOT Logged In: Show Modern Login Page
  if (!currentUser) {
    return (
      <LoginView
        settings={settings}
        siswaList={siswaList}
        gtkList={gtkList}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  const isParent = currentRole === ROLES.WALI_MURID;

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col selection:bg-pastel-300 selection:text-pastel-950 font-sans">
      
      {/* Top Navbar */}
      <Navbar
        settings={settings}
        currentUser={currentUser}
        currentRole={currentRole}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        onSyncGas={handleSyncAllToGAS}
        isSyncing={isSyncing}
        gasConnected={gasConnected}
        onQuickPrint={handleQuickPrint}
        onChangeTahunAjaran={handleChangeTahunAjaran}
        onChangeSemester={handleChangeSemester}
        onLogout={handleLogout}
      />

      {/* Main Workspace with Sidebar & View Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentRole={currentRole}
          settings={settings}
        />

        {/* Dynamic View Panel */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              siswaList={siswaList}
              mapelList={mapelList}
              nilaiList={nilaiList}
              absList={absList}
              presensiList={presensiList}
              settings={settings}
              currentRole={currentRole}
              onNavigate={(tab) => setActiveTab(tab)}
              approval={approval}
              onUpdateApproval={handleUpdateApproval}
            />
          )}

          {activeTab === 'kalender' && (
            <KalenderAkademikView
              settings={settings}
            />
          )}

          {activeTab === 'nilai' && (
            <NilaiView
              siswaList={siswaList}
              mapelList={mapelList}
              nilaiList={nilaiList}
              onSaveNilai={handleSaveNilai}
              onAddMapel={handleAddMapel}
              settings={settings}
              currentUser={currentUser}
            />
          )}

          {activeTab === 'kholaqoh' && (
            <KholaqohView
              kholaqohList={kholaqohList}
              kholaqohNilaiList={kholaqohNilaiList}
              siswaList={siswaList}
              currentUser={currentUser}
              onSaveKholaqohNilai={handleSaveKholaqohNilai}
              onSyncToRaporTFZ={handleSyncKholaqohToTFZ}
              settings={settings}
            />
          )}

          {activeTab === 'gtk' && (
            <GTKView
              gtkList={gtkList}
              onSwitchUser={handleSwitchToGTK}
              currentUser={currentUser}
            />
          )}

          {activeTab === 'abs' && (
            <ABSView
              mapelList={mapelList}
              siswaList={siswaList}
              absList={absList}
              onSaveABS={handleSaveABS}
              settings={settings}
            />
          )}

          {activeTab === 'sikap' && (
            <SikapView
              siswaList={siswaList}
              sikapList={sikapList}
              onSaveSikap={handleSaveSikap}
              settings={settings}
            />
          )}

          {activeTab === 'presensi' && (
            <PresensiView
              siswaList={siswaList}
              presensiList={presensiList}
              onSavePresensi={handleSavePresensi}
              settings={settings}
            />
          )}

          {activeTab === 'buku_induk' && (
            <BukuIndukView
              siswaList={siswaList}
              onAddSiswa={handleAddSiswa}
              onUpdateSiswa={handleUpdateSiswa}
              onDeleteSiswa={handleDeleteSiswa}
              settings={settings}
            />
          )}

          {activeTab === 'rapor' && (
            <RaporPrintView
              siswaList={siswaList}
              mapelList={mapelList}
              nilaiList={nilaiList}
              sikapList={sikapList}
              presensiList={presensiList}
              settings={settings}
              approval={approval}
              currentRole={currentRole}
              currentUser={currentUser}
            />
          )}

          {activeTab === 'portal_ortu' && (
            <WaliMuridView
              currentUser={currentUser}
              siswaList={siswaList}
              mapelList={mapelList}
              nilaiList={nilaiList}
              sikapList={sikapList}
              presensiList={presensiList}
              settings={settings}
              onNavigateToPrint={(studentId) => {
                setActiveTab('rapor');
              }}
            />
          )}

          {activeTab === 'cms' && (
            <CMSView
              settings={settings}
              onSaveSettings={handleSaveSettings}
              onExportBackup={handleExportBackup}
              onImportBackup={handleImportBackup}
              onResetDefaults={handleResetDefaults}
              onSyncAllToGAS={handleSyncAllToGAS}
            />
          )}
        </main>
      </div>

      {/* Role Switcher Modal for Civitas */}
      {!isParent && (
        <RoleSwitcherModal
          isOpen={isRoleModalOpen}
          onClose={() => setIsRoleModalOpen(false)}
          currentRole={currentRole}
          onSelectRole={handleSelectRole}
        />
      )}

    </div>
  );
}

export default App;
