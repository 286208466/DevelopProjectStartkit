## Visual Studio Code 配置 React 开发环境

### React 集成 VSCode 测试

第一步:
首先安装：[`Debugger for Chrome`](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)插件。
第二步： 项目根目录下创建 `.vscode`文件夹。
第三步：创建`launch.json`文件
文件内容：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```

##常见问题

1、事件处理打印的 event.target 是空  
解决办法：e.persist()


###脚手架配置

#####生产环境去除 console  
`webpack.config.js`
compress: {
ecma: 5,
warnings: false,
drop_debugger: true,
drop_console: true,
comparisons: false,
}



#####环境变量文件中使用  
REACT_APP_GENERATE_SOURCEMAP=false

#####项目中添加 redux-logger  
yarn add --dev redux-logger

项目中使用 configureStore.js  
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import rootReducer from '../reducers'

const debug = process.env.NODE_ENV !== 'production'

const middleware = [
debug && logger,
].filter(Boolean)

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

export default function configureStore (initialState) {
const store = createStoreWithMiddleware(rootReducer, initialState,
window.**REDUX_DEVTOOLS_EXTENSION** ? window.**REDUX_DEVTOOLS_EXTENSION**() : undefined)
return store
}

#####项目中添加 nprogress 进度条  
 yarn add nprogress

项目中使用 App.js  
import NProgress from 'nprogress'

class App extends Component {
componentWillUpdate () {
NProgress.start()
}

componentDidUpdate () {
NProgress.done()
}

render () {
return (

<div className="App">
<Switch>
........
</Switch>
</div>
)
}
}

#####项目打包生成.gz 文件  
 yarn add --dev compression-webpack-plugin

修改 webpack.config.js  
const CompressionPlugin = require("compression-webpack-plugin");

plugins: [
...
isEnvProduction && new CompressionPlugin({
filename: '[path].gz[query]',
algorithm: 'gzip',
test: /\.js$|\.css$|\.html\$/,
threshold: 10240,
minRatio: 0.8
}),
]

#####多环境支持  
 yarn add --dev cross-env

项目根目录添加文件.env.development，.env.production，.env.release

//.env.development
NODE_ENV=development
REACT_APP_XXX=XXX
...

//.env.production
NODE_ENV=production
REACT_APP_XXX=XXX
...

//.env.release
NODE_ENV=production
REACT_APP_XXX=XXX
...

修改 config/env.js  
//有一个特殊的内置环境变量叫做 NODE_ENV，你可以输出 process.env.NODE_ENV，但无法手动覆盖 NODE_ENV。这可以防止开发人员意外地将缓慢的开发构建部署到生产环境中。
// const NODE_ENV = process.env.NODE_ENV;
const NODE_ENV = process.env.REACT_ENV || process.env.NODE_ENV;

修改 package.json
"scripts": {
"start": "node scripts/start.js",
"build": "cross-env REACT_ENV=production node scripts/build.js",
"release": "cross-env REACT_ENV=release node scripts/build.js",
"test": "node scripts/test.js"
},


#####ESLint + Standard 项目配置  
yarn add --dev eslint-config-standard eslint-config-standard-react eslint-plugin-node eslint-plugin-promise eslint-plugin-standard

修改 webpack.config.js 文件  
{
test: /\.(js|mjs|jsx|ts|tsx)\$/,
enforce: 'pre',
use: [
{
options: {
formatter: require.resolve('react-dev-utils/eslintFormatter'),
eslintPath: require.resolve('eslint'),
emitWarning: true// 添加内容
},
loader: require.resolve('eslint-loader')
}
],
include: paths.appSrc
},

项目根目录新建.eslintrc.js 文件  
module.exports = {
env: {
browser: true,
es6: true,
node: true
},
extends: ['standard', 'standard-react'],
parser: 'babel-eslint',
parserOptions: {
ecmaVersion: 6,
ecmaFeatures: {
experimentalObjectRestSpread: true,
modules: true,
jsx: true,
},
parser: 'babel-eslint',
sourceType: 'module',
},
plugins: ['react'],
root: true,
globals: {
Atomics: 'readonly',
SharedArrayBuffer: 'readonly'
},
rules: {
'camelcase': 0,// 强制驼峰法命名
'handle-callback-err': 0,// nodejs 处理错误
"indent": 0,// 缩进风格
'no-console': 0,// 禁止使用 console
'no-unused-vars': [0, {
// 允许声明未使用变量
'vars': 'local',
// 参数不检查
'args': 'none'
}],
'no-return-assign': 0,// return 语句中不能有赋值表达式
'no-undef': 0,// 不能有未定义的变量
'node/no-deprecated-api': 0,
'react/prop-types': 0,
// jsx 的开始和闭合处禁止有空格
'react/jsx-tag-spacing': [
'error',
{
'closingSlash': 'never',
'beforeSelfClosing': 'allow',
'afterOpening': 'never'
}
],
'react/jsx-indent': ['error', 2],
'standard/no-callback-literal': 0
}
}

#####编译进度条配置  
yarn add --dev progress-bar-webpack-plugin

修改 webpack.config.js 文件  
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

plugins:[
...
new ProgressBarPlugin({
format: ' build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
clear: false
})
] #####优化 create-react-app 编译打包速度
yarn add --dev babel-plugin-dynamic-import-node
修改.env.development 文件与.env.production 文件
//.env.development
NODE_ENV=development
...

//.env.production
NODE_ENV=production
...
修改 package.json 文件
"babel": {
"env": {
"development": {
"plugins": [
"dynamic-import-node"
]
}
},
......
}

#####修改 antd 组件库主题色  
修改 webpack.config.js 文件  
{
test: antdRegex,
include: /node_modules|antd\.css/,
use: getStyleLoaders(
{
importLoaders: 2,
sourceMap: isEnvProduction && shouldUseSourceMap
},
'less-loader',
{
javascriptEnabled: true,
// 添加如下配置  
 modifyVars: {
'@primary-color': '#7298ff'
}
}
),
sideEffects: true
},



### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES5", // 把ts源文件编译到ES5能运行的代码
    "lib": ["DOM", "DOM.Iterable", "ESNext"], // 编译过程中需要引入的声明文件（DOM：包含所有DOM操作的API，音频视频动画等;DOM.Iterable 迭代器， ESNext所有ES中的新API）
    "allowJs": true, // 是否编译.js文件
    "skipLibCheck": true, // 忽略所有.d.ts文件的类型检查
    "sourceMap": true, // 为每个编译的文件生成对应的.map文件
    "experimentalDecorators": true, // 启用修饰器语法 decorator @
    "module": "ESNext", // 模块文件要符合什么规范
    "esModuleInterop": true, // 允许import React 而不是 * as React, module:ESNext 和这个字段配合 等同于开启allowSyntheticDefaultImports
    "forceConsistentCasingInFileNames": true, // 禁止对同一个文件的不一致的引用
    "moduleResolution": "Node", // 如何处理模块，按Node.js的规范
    "resolveJsonModule": true, // 是否允许解析.json文件并自动推论其中的类型
    "isolatedModules": true, // 将每个文件都作为单独的模块
    "noEmit": true, // 不生成输出文件
    "noImplicitReturns": true, // 不在输出文件中生成用户自定义的帮助函数代码，如 __extends
    "noImplicitThis": true, // 当 this表达式的值为 any类型的时候，生成一个错误
    "noImplicitAny": true, // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true, // 严格null模式，null和 undefined值不再能赋值给其他类型，只允许用它们自己和 any来赋值
    "suppressImplicitAnyIndexErrors": true, // 阻止noImplicitAny对缺少索引签名的索引对象报错。
    "noUnusedLocals": true, // 若有未使用的局部变量则抛错
    "jsx": "React", // 在.tsx文件里支持.jsx
    "baseUrl": "./", // 文件中所有相对路径都相对于此目录
    "paths": {
      // 配置路径映射
      "@/*": ["src/*"] // @路径 相当于 baseUrl + /src/
    }
  },
  "include": ["src"] // 指定源文件的根目录，ts仅编译该目录下的所有文件
}
```