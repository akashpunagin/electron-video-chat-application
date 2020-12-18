const { app, BrowserWindow, Menu, ipcMain } = require('electron');
require('./server/server');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // nodeIntegration: true,
      preload: `${__dirname}/renderer.js`,
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
            console.log("EXIT MEETING");
            // BrowserWindow.getFocusedWindow().webContents.send('exit-meeting'); // TODO: delete line
            win.webContents.send('exit-meeting');
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  const win = createWindow();
  createMainMenu(win);
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
