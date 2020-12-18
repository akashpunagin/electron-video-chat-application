const { app, BrowserWindow, Menu, ipcMain } = require('electron');
require('./server/server');

function createWindow () {
  const win = new BrowserWindow({
    width: 1500,
    height: 900,
    minWidth: 1500,
    minHeight: 900,
    webPreferences: {
      nodeIntegration: true,
      preload: `${__dirname}/public/js/renderer.js`,
    }
  });

  // win.loadFile('public/index.html');
  win.loadURL('http://localhost:3000/');
  // win.loadURL("https://node-video-chat-application.herokuapp.com/");
  // win.once('ready-to-show', () => {
  //   win.show()
  // });
  win.webContents.openDevTools();
  return win;
}

function createMainMenu(win) {
  const template = [
    {
      label: "Meeting",
      submenu: [
        {
          label: "Exit Meeting",
          accelerator: "CommandOrControl+E",
          click() {
            // BrowserWindow.getFocusedWindow().webContents.send('exit-meeting'); // TODO: delete line
            win.webContents.send('exit-meeting');
          }
        }
      ]
    },
    {
      label: "View",
      submenu: [
        {
          label: "Toggle Chat",
          click() {
            console.log("CHAT TOOGLE");
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createMainMenu(createWindow());
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
