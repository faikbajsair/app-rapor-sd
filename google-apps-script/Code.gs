/**
 * =========================================================================
 * BACKEND GOOGLE APPS SCRIPT (GAS) - APLIKASI RAPOR SD INTERAKTIF
 * =========================================================================
 * Arsitektur: Hybrid REST API Web App untuk Google Sheets Database
 * Fitur:
 * - Auto-init sheet tables & columns bila sheet belum ada
 * - CRUD Data Sekolah, Siswa, Mata Pelajaran, Nilai Formatif/Sumatif,
 *   Analisis Butir Soal (ABS), Sikap & Profil Pancasila, Presensi, dan Pengaturan Lisensi
 * - CORS-enabled JSON API
 * =========================================================================
 */

var SHEETS = {
  SETTINGS: 'SEKOLAH_SETTINGS',
  SISWA: 'DATA_SISWA',
  MAPEL: 'DATA_MAPEL',
  NILAI: 'DATA_NILAI',
  ABS: 'DATA_ABS',
  SIKAP: 'DATA_SIKAP',
  PRESENSI: 'DATA_PRESENSI',
  GTK: 'DATA_GTK',
  KHOLAQUH: 'DATA_KHOLAQUH',
  KHOLAQUH_NILAI: 'DATA_KHOLAQUH_NILAI',
  USERS: 'DATA_USERS',
  LOGS: 'AUDIT_LOGS'
};

function doGet(e) {
  var params = e ? e.parameter : {};
  var action = params.action || 'ping';
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  ensureSheetsInitialized(ss);
  
  try {
    var responseData = {};
    
    if (action === 'ping') {
      responseData = {
        status: 'success',
        message: 'Google Apps Script API App Rapor SD Aktif & Terhubung!',
        timestamp: new Date().toISOString(),
        spreadsheetName: ss.getName(),
        spreadsheetId: ss.getId()
      };
    } else if (action === 'getAllData') {
      responseData = {
        status: 'success',
        data: {
          settings: getSheetDataAsObjects(ss.getSheetByName(SHEETS.SETTINGS)),
          siswa: getSheetDataAsObjects(ss.getSheetByName(SHEETS.SISWA)),
          mapel: getSheetDataAsObjects(ss.getSheetByName(SHEETS.MAPEL)),
          nilai: getSheetDataAsObjects(ss.getSheetByName(SHEETS.NILAI)),
          abs: getSheetDataAsObjects(ss.getSheetByName(SHEETS.ABS)),
          sikap: getSheetDataAsObjects(ss.getSheetByName(SHEETS.SIKAP)),
          presensi: getSheetDataAsObjects(ss.getSheetByName(SHEETS.PRESENSI)),
          gtk: getSheetDataAsObjects(ss.getSheetByName(SHEETS.GTK)),
          kholaqoh: getSheetDataAsObjects(ss.getSheetByName(SHEETS.KHOLAQUH)),
          kholaqohNilai: getSheetDataAsObjects(ss.getSheetByName(SHEETS.KHOLAQUH_NILAI))
        },
        timestamp: new Date().toISOString()
      };
    } else if (action === 'getTable') {
      var tableName = params.table || SHEETS.SISWA;
      var sheet = ss.getSheetByName(tableName);
      if (!sheet) {
        throw new Error('Tabel ' + tableName + ' tidak ditemukan');
      }
      responseData = {
        status: 'success',
        table: tableName,
        data: getSheetDataAsObjects(sheet)
      };
    } else {
      responseData = {
        status: 'error',
        message: 'Action ' + action + ' tidak dikenali'
      };
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: err.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureSheetsInitialized(ss);
  
  try {
    var postBody = JSON.parse(e.postData.contents);
    var action = postBody.action || 'syncAll';
    var payload = postBody.data;
    var result = {};
    
    if (action === 'syncAll') {
      if (payload.settings) saveBatchToSheet(ss.getSheetByName(SHEETS.SETTINGS), payload.settings, 'key');
      if (payload.siswa) saveBatchToSheet(ss.getSheetByName(SHEETS.SISWA), payload.siswa, 'nisn');
      if (payload.mapel) saveBatchToSheet(ss.getSheetByName(SHEETS.MAPEL), payload.mapel, 'id');
      if (payload.nilai) saveBatchToSheet(ss.getSheetByName(SHEETS.NILAI), payload.nilai, 'id');
      if (payload.abs) saveBatchToSheet(ss.getSheetByName(SHEETS.ABS), payload.abs, 'id');
      if (payload.sikap) saveBatchToSheet(ss.getSheetByName(SHEETS.SIKAP), payload.sikap, 'id');
      if (payload.presensi) saveBatchToSheet(ss.getSheetByName(SHEETS.PRESENSI), payload.presensi, 'id');
      if (payload.gtk) saveBatchToSheet(ss.getSheetByName(SHEETS.GTK), payload.gtk, 'id');
      if (payload.kholaqoh) saveBatchToSheet(ss.getSheetByName(SHEETS.KHOLAQUH), payload.kholaqoh, 'id');
      if (payload.kholaqohNilai) saveBatchToSheet(ss.getSheetByName(SHEETS.KHOLAQUH_NILAI), payload.kholaqohNilai, 'id');
      
      logAction(ss, 'SYNC_ALL', 'Sinkronisasi menyeluruh termasuk GTK & Kholaqoh berhasil diproses.');
      result = { status: 'success', message: 'Semua data berhasil disinkronkan ke Google Sheet!' };
      
    } else if (action === 'saveRecord') {
      var targetTable = postBody.table;
      var keyField = postBody.keyField || 'id';
      var record = postBody.record;
      var targetSheet = ss.getSheetByName(targetTable);
      
      if (!targetSheet) throw new Error('Sheet ' + targetTable + ' tidak ditemukan');
      saveSingleRecord(targetSheet, record, keyField);
      
      result = { status: 'success', message: 'Record berhasil disimpan ke ' + targetTable };
      
    } else {
      throw new Error('Action ' + action + ' tidak valid.');
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: err.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Otomatis inisialisasi sheet dan header jika belum ada
 */
function ensureSheetsInitialized(ss) {
  var definitions = [
    {
      name: SHEETS.SETTINGS,
      headers: ['key', 'value', 'updatedAt']
    },
    {
      name: SHEETS.SISWA,
      headers: ['id', 'nisn', 'nis', 'nama', 'kelas', 'rombel', 'jenisKelamin', 'tempatLahir', 'tanggalLahir', 'agama', 'namaAyah', 'namaIbu', 'pekerjaanOrtu', 'alamat', 'status']
    },
    {
      name: SHEETS.MAPEL,
      headers: ['id', 'kode', 'nama', 'kelompok', 'kkm', 'guruPengampu', 'bobot']
    },
    {
      name: SHEETS.NILAI,
      headers: ['id', 'siswaId', 'nisn', 'mapelId', 'semester', 'tahunAjaran', 'formatif1', 'formatif2', 'formatif3', 'formatif4', 'rataFormatif', 'sumatifLingkup', 'sumatifTengah', 'sumatifAkhir', 'nilaiAkhir', 'predikat', 'deskripsiCapaian', 'updatedAt']
    },
    {
      name: SHEETS.ABS,
      headers: ['id', 'mapelId', 'kelas', 'tipeUjian', 'nomorSoal', 'bentukSoal', 'bobotMaks', 'kunciJawaban', 'skorSiswaJson', 'dayaSerap', 'tingkatKesukaran', 'statusRevisi', 'updatedAt']
    },
    {
      name: SHEETS.SIKAP,
      headers: ['id', 'siswaId', 'semester', 'tahunAjaran', 'berimanBertakwa', 'berkebinekaan', 'gotongRoyong', 'mandiri', 'bernalarKritis', 'kreatif', 'spiritual', 'sosial', 'deskripsiNaratif', 'updatedAt']
    },
    {
      name: SHEETS.PRESENSI,
      headers: ['id', 'siswaId', 'semester', 'tahunAjaran', 'sakit', 'izin', 'alpa', 'terlambat', 'catatanWaliKelas', 'updatedAt']
    },
    {
      name: SHEETS.GTK,
      headers: ['id', 'no', 'nama', 'nuptk', 'nip', 'jabatan', 'jabatanLainnya', 'role', 'email', 'statusJabatan', 'pendidikan', 'kelasDiampu', 'mapelDiampu', 'kholaqohDiampu']
    },
    {
      name: SHEETS.KHOLAQUH,
      headers: ['id', 'kode', 'nama', 'gender', 'fase', 'pembimbingNama', 'targetJuz', 'jadwal', 'ruangan']
    },
    {
      name: SHEETS.KHOLAQUH_NILAI,
      headers: ['id', 'siswaId', 'kholaqohId', 'pembimbingId', 'tahsinJilid', 'tahsinHalaman', 'nilaiMakhraj', 'nilaiTajwid', 'nilaiFashahah', 'surahHafalan', 'nilaiKelancaran', 'adab', 'catatan', 'updatedAt']
    },
    {
      name: SHEETS.LOGS,
      headers: ['timestamp', 'action', 'details']
    }
  ];

  definitions.forEach(function(def) {
    var sheet = ss.getSheetByName(def.name);
    if (!sheet) {
      sheet = ss.insertSheet(def.name);
      sheet.appendRow(def.headers);
      var headerRange = sheet.getRange(1, 1, 1, def.headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#D4EDDA');
      headerRange.setFontColor('#1B5640');
    }
  });
}

function getSheetDataAsObjects(sheet) {
  if (!sheet) return [];
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  
  var headers = data[0];
  var result = [];
  
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var obj = {};
    var hasContent = false;
    for (var j = 0; j < headers.length; j++) {
      var val = row[j];
      if (val !== '' && val !== null && val !== undefined) hasContent = true;
      obj[headers[j]] = val;
    }
    if (hasContent) {
      result.push(obj);
    }
  }
  return result;
}

function saveSingleRecord(sheet, record, keyField) {
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var keyColIndex = headers.indexOf(keyField);
  
  if (keyColIndex === -1) {
    keyColIndex = 0;
  }
  
  var rowIndex = -1;
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][keyColIndex]) === String(record[keyField])) {
      rowIndex = i + 1; // 1-indexed in sheet
      break;
    }
  }
  
  var rowValues = headers.map(function(h) {
    var val = record[h];
    if (typeof val === 'object' && val !== null) {
      return JSON.stringify(val);
    }
    return val !== undefined ? val : '';
  });
  
  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 1, 1, rowValues.length).setValues([rowValues]);
  } else {
    sheet.appendRow(rowValues);
  }
}

function saveBatchToSheet(sheet, records, keyField) {
  if (!records || !records.length) return;
  for (var i = 0; i < records.length; i++) {
    saveSingleRecord(sheet, records[i], keyField);
  }
}

function logAction(ss, action, details) {
  var logSheet = ss.getSheetByName(SHEETS.LOGS);
  if (logSheet) {
    logSheet.appendRow([new Date().toISOString(), action, details]);
  }
}
