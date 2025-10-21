const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  selectMusicFolder: () => ipcRenderer.invoke('select-music-folder'),
  scanFiles: (paths) => ipcRenderer.invoke('scan-files', paths),
  getLibrary: () => ipcRenderer.invoke('get-library'),
  clearLibrary: () => ipcRenderer.invoke('clear-library')
});
