
**常用**

axios
js-cookie
less less-loader
mockjs
nprogress
vue-i18n
vue-router
vuex

**UI框架**
element-plus

vue-cropperjs



### 参考

https://www.jb51.net/article/218289.htm

https://www.cnblogs.com/xiaoyan2017/p/14776441.html

https://www.codetd.com/article/13471403

https://www.codetd.com/article/13471205

https://juejin.cn/post/7015476516196712462

https://juejin.cn/post/6963310387945013261

https://juejin.cn/post/7019244597213675533

https://juejin.cn/post/7037413926488768549

https://juejin.cn/post/6987281207633379359

https://juejin.cn/post/7018831025300062239

https://juejin.cn/post/6965792592663412743

https://juejin.cn/post/7097084901492523038

https://juejin.cn/post/7038467111441661960

https://juejin.cn/post/6979521609862234143

https://juejin.cn/post/7102681636096966687

https://juejin.cn/post/7084126780390375461

https://juejin.cn/post/7094525364478672903

### 问题
1、打包后白屏

hash路由

publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

2、axios请求失败
axios.defaults.adapter = require('axios/lib/adapters/http')
因为electron环境下必须强制使用node的网络请求模块

3、xcode找不到
设置xcode-select到指定的位置

sudo xcode-select -s /Applications/Xcode.app/Contents/Developer

如果安装了多个xcode，则只需要对xcode.app进行替换。

4、windows 文件路径处理

ES9 之前，\u表示 unicode 转义，\x表示十六进制转义，``后跟一个数字表示八进制转义，这使得创建特定的字符串变得不可能，例如Windows文件路径C:\uuu\xxx\111。
```
String.raw `C:\Windows\System`

'C:\\Windows\\System'

String.raw `C:\Windows\System`

'C:\Windows\System'
```

5、ipcRenderer.on多次执行

每次触发ipcRenderer模块都会新建一个新的ipcRenderer，导致ipcRenderer内的函数块会被执行n次（取决于当前残留有多少个ipcRenderer）。

封装server.js: （server在主进程中使用）
```
import { ipcMain } from 'electron'



const _map = new Map()



ipcMain.on('from-client', (event, params) => {

  const reply = function (data) {

    event.reply('from-server', {

      _symbol: params._symbol,

      // data 传递给客户端，最终 resolve 它

      data

    })

  }

  const ctx = {

    reply,

    type: params.type

  }

  const cb = _map.get(params.type)

  if (typeof cb === 'function') {

    cb(ctx, params.data)

  } else {

    cb(ctx, '没有注册~')

  }

})



export default function server (type, callback) {

  _map.set(type, callback)

}
```

封装request.js:（request在渲染进程中使用）

```
const { ipcRenderer } = window.require('electron')

const _map = new Map()

ipcRenderer.on('from-server', (event, params) => {

  const cb = _map.get(params._symbol)

  if (typeof cb === 'function') {

    _map.delete(params._symbol)

    cb(params.data)

  }

})



export default function request (type, data) {

  const _symbol = Date.now() + type

  return new Promise(resolve => {

    _map.set(_symbol, (data) => {

      resolve(data)

    })

    ipcRenderer.send('from-client', {

      _symbol: _symbol,

      type: type,

      data: data

    })

  })

}
```