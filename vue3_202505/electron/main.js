const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  nativeImage,
  ipcMain,
} = require("electron");
const path = require("path");

// 2.引入自定义的菜单
require("./menu");

let tray;

const isDev = process.env.isDev == "true" ? true : false;
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    //fullscreen: true   //全屏
    //frame: false,   	//让桌面应用没有边框，这样菜单栏也会消失
    // resizable: false, //不允许用户改变窗口大小
    // show: false, // 启动窗口时隐藏,直到渲染进程加载完成「ready-to-show 监听事件」 再显示窗口,防止加载时闪烁
    // icon: iconPath,     //应用运行时的标题栏图标
    // minWidth: 300, // 最小宽度
    // minHeight: 500, // 最小高度
    // maxWidth: 300, // 最大宽度
    // maxHeight: 600, // 最大高度

    // transparent: true, // * app 背景透明
    // hasShadow: false, // * app 边框阴影

    // 进行对首选项的设置
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      backgroundThrottling: false, //设置应用在后台正常运行
      nodeIntegration: true, //设置能在页面使用nodejs的API
      contextIsolation: false, //关闭警告信息
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../dist/index.html")}`
  );

  // 设置为最顶层
  //mainWindow.setAlwaysOnTop(true)
  // 打开开发工具
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // 启动窗口时隐藏,直到渲染进程加载完成「ready-to-show 监听事件」 再显示窗口,防止加载时闪烁
  //   mainWindow.once("ready-to-show", () => {
  //     mainWindow.show(); // 显示窗口
  // });

  // 监听窗口关闭事件
  //   mainWindow.on("closed", () => {
  //     //释放win
  //     mainWindow = null;
  //   });

  //系统托盘
  // 创建icon我这里使用的是一个png
  //   const icon = nativeImage.createFromPath(
  //     path.join(__dirname, "/static/icon.png")
  //   );
  //   // 实例化一个 托盘对象，传入的是托盘的图标
  //   tray = new Tray(icon);
  //   // 移动到托盘上的提示
  //   tray.setToolTip("electron demo is running");
  //   // 还可以设置 titlle
  //   tray.setTitle("electron demo");

  //   // 监听托盘右键事件
  //   tray.on("right-click", () => {
  //     // 右键菜单模板
  //     const tempate = [
  //       {
  //         label: "无操作",
  //       },
  //       {
  //         label: "退出",
  //         click: () => app.quit(),
  //       },
  //     ];
  //     //通过 Menu 创建菜单
  //     const menuConfig = Menu.buildFromTemplate(tempate);
  //     // 让我们的写的托盘右键的菜单替代原来的
  //     tray.popUpContextMenu(menuConfig);
  //   });
  //   //监听点击托盘的事件
  //   tray.on("click", () => {
  //     // 这里来控制窗口的显示和隐藏
  //     if (win.isVisible()) {
  //       win.hide();
  //     } else {
  //       win.show();
  //     }
  //   });

  // 发送给渲染线程
  setTimeout(() => {
    mainWindow.webContents.send("mainMsg", "我是主线程发送的消息");
  }, 3000);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("task", (event, info) => {
  if (info === "退出程序") {
    app.quit();
  }
});
