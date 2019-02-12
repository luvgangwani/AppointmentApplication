var electron = require('electron')

const BrowserWindow = electron.BrowserWindow

const app = electron.app;

const ipc = electron.ipcMain;

var Menu = electron.Menu;
var myAppMenu, menuTemplate;

function toggleWindow(whichWindow){
    if(whichWindow.isVisible()){
        whichWindow.hide();
    }
    else {
        whichWindow.show();
    }
}

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

    ipc.on('openInfoWindow', (event, args) => {
        event.returnValue = '';
        infoWindow.show();
    });

    ipc.on('closeInfoWindow', (event, args) => {
        event.returnValue = '';
        infoWindow.hide();
    });

    menuTemplate = [
        {
            label: 'Wisdom Pet',
            submenu: [
                {
                    label: 'About this App',
                    accelerator: process.platform === 'darwin'? "Command-I" : "Ctrl+I",
                    click(item) { toggleWindow(infoWindow) }
                },
                {
                    label: 'Add Appointment',
                    accelerator: process.platform === 'darwin' ? 'Command-N': 'Ctrl+N',
                    click(item, focusedWindow) {
                        if (focusedWindow) focusedWindow.webContents.send('addAppointment');
                    }
                },
                {
                    role: 'help',
                    label: 'Our Website',
                    click() {
                        electron.shell.openExternal('http://raybo.org')
                    }
                },
                {
                    role: 'close'
                },
                {
                    role: 'quit'
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    role: 'undo'
                },
                {
                    role: 'redo'
                },
                {
                    role: 'cut'
                },
                {
                    role: 'copy'
                },
                {
                    role: 'paste'
                },
                {
                    role: 'selectall'
                }

            ]
        }
    ];

    myAppMenu = Menu.buildFromTemplate(menuTemplate);

    Menu.setApplicationMenu(myAppMenu);
});