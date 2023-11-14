const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const express = require('./server');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL(
    isDev
      ? `http://localhost:3000/`
      : `file://${path.join(__dirname, 'build/index.html')}`
  );

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  express.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

app.on('before-quit', () => {
  express.close(() => {
    console.log('Server closed');
  });
});