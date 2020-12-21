const { app, BrowserWindow, Menu, ipcMain } = require('electron');

function createWindow () {
  const win = new BrowserWindow({
    width: 1500,
    height: 900,
    minWidth: 1500,
    minHeight: 900,
    webPreferences: {
      nodeIntegration: true,
      preload: `./renderer.js`,
    }
  });

  // win.loadURL('http://localhost:3000/');
  win.loadURL('https://node-video-chat-application.herokuapp.com/');
  win.removeMenu();
  win.webContents.openDevTools(); // TODO: remove for production
  return win;
}

function createMainMenu(win) {
  const template = [
    {
      label: "Tools",
      submenu: [
        {
          label: "Refresh",
          accelerator: "CommandOrControl+R",
          click() {
            // win.reload();
            win.webContents.send('refresh-page');
          }
        }
      ]
    },
    {
      label: "Meeting",
      submenu: [
        {
          label: "Exit Meeting",
          accelerator: "CommandOrControl+E",
          click() {
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
            win.webContents.send('chat-toggle');
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);

  ipcMain.on('logged-in', (event) => {
    Menu.setApplicationMenu(menu);
    event.returnValue;
  });

  ipcMain.on('logged-out', (event) => {
    win.removeMenu();
    event.returnValue;
  });
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
