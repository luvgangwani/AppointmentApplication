var electron = require('electron')

const BrowserWindow = electron.BrowserWindow

const app = electron.app;

const ipc = electron.ipcMain;

app.on('ready', () => {
    var appWindow ;
    
    appWindow = new BrowserWindow({
        show: false
    });

    appWindow.loadURL(`file://${__dirname}/index.html`);

    var infoWindow;

    infoWindow = new BrowserWindow({
        width: 400,
        height: 300,
        transparent: true,
        frame: true,
        show: false
    });

    infoWindow.loadURL(`file://${__dirname}/info.html`)
    // Perform the event once

    // ready-to-show - perform the action once the appWindow is loaded fully

    appWindow.once('ready-to-show', () => {
        appWindow.show();
    });

    ipc.on('closeInfoWindow', (event, args) => {
        event.returnValue = '';
        infoWindow.hide();
    });
});