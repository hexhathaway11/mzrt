const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const mm = require('music-metadata');
const Store = require('electron-store');

const store = new Store({name: 'mozart-store'});

function createWindow () {
  const win = new BrowserWindow({
    width: 1100,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

ipcMain.handle('select-music-folder', async (ev) => {
  const res = await dialog.showOpenDialog({ properties: ['openDirectory', 'multiSelections'] });
  if (res.canceled) return { canceled: true };
  return { canceled: false, paths: res.filePaths };
});

ipcMain.handle('scan-files', async (ev, folderPaths) => {
  const supported = ['.flac','.mp3','.wav','.m4a'];
  let results = [];
  for (const folder of folderPaths) {
    const files = fs.readdirSync(folder);
    for (const f of files) {
      const ext = path.extname(f).toLowerCase();
      if (!supported.includes(ext)) continue;
      const full = path.join(folder, f);
      try {
        const meta = await mm.parseFile(full, {native: true});
        const title = meta.common.title || path.basename(f, ext);
        const artist = meta.common.artist || 'Unknown Artist';
        const duration = Math.floor(meta.format.duration || 0);
        let pictureData = null;
        if (meta.common.picture && meta.common.picture.length > 0) {
          const pic = meta.common.picture[0];
          const picPath = path.join(app.getPath('userData'), 'covers');
          if (!fs.existsSync(picPath)) fs.mkdirSync(picPath, { recursive: true });
          const fileName = `${Date.now()}-${Math.random().toString(36).slice(2,8)}.${pic.format || 'jpg'}`;
          const dest = path.join(picPath, fileName);
          fs.writeFileSync(dest, pic.data);
          pictureData = dest;
        }
        results.push({
          id: Buffer.from(full).toString('base64'),
          title, artist, duration, file: full, cover: pictureData
        });
      } catch (e) {
        console.error('meta error', e);
      }
    }
  }
  // merge with existing library
  const lib = store.get('library', []);
  const merged = lib.concat(results);
  store.set('library', merged);
  return merged;
});

ipcMain.handle('get-library', () => {
  return store.get('library', []);
});

ipcMain.handle('clear-library', () => {
  store.set('library', []);
  return [];
});
