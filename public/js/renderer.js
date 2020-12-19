const { ipcRenderer } = require('electron');

ipcRenderer.on('refresh-page', () => {
  location.reload();
});
