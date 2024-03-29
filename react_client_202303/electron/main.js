// 引入electron并创建一个Browserwindow
const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

const platform = require("os").platform(); // 获取平

// const IS_DEV = process.env.NODE_ENV === "development";
const IS_DEV = true;
// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow;

function createWindow() {
  //创建浏览器窗口,宽高自定义
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 750,
    webPreferences: {
      webSecurity: false, // 这样可以在 webview 中加载/显示本地计算机的图片。
    },
  });

  // 加载应用
  const staticIndexPath = path.join(__dirname, "./index.html");
  const main = IS_DEV
    ? `http://localhost:3300`
    : url.format({
        pathname: staticIndexPath,
        protocol: "file:",
        slashes: true,
      });
  mainWindow.loadURL(main);

  // 打开开发者工具，默认不打开
  IS_DEV && mainWindow.webContents.openDevTools();

  // 关闭window时触发下列事件.
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on("ready", createWindow);

// 所有窗口关闭时退出应用.
app.on("window-all-closed", function () {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
  if (mainWindow === null) {
    createWindow();
  }
});

// 这是一个示例，展示了`渲染进程`发送了`chooseFolder `事件后，`主进程`打开选择目录的对话框。
// electron.ipcMain.on('chooseFolder', function(){
//   const dialog = electron.dialog;
//   dialog.showOpenDialog(mainWindow, {
//       properties: ['openDirectory']
//   });
// });
