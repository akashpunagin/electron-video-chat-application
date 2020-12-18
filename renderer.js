const { ipcRenderer } = require('electron');

ipcRenderer.on('exit-meeting', () => {
  console.log("Exit meeting");
});
