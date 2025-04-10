
### 技术栈

```
npm  install axios -S
npm install sass -S
npm i -S next-intl
npm i cross-env -D

//动效
npm install --save react-motion
```



### 安装 husky

```
npm install --save-dev husky
```

init 命令简化了项目中的 husky 设置。它会在 .husky/ 中创建 pre-commit 脚本，并更新 package.json 中的 prepare 脚本。随后可根据你的工作流进行修改。

```
npx husky init
```

项目会生成 .husky 文件夹，其中 .husky/pre-commit 可以配置我们在 git commit 之前做的某些检查

```js
npm run lint
```

### lint-staged

lint-staged 是一个用于在 Git 暂存区（staged files）上运行 代码检查工具（如 ESLint、Prettier、Stylelint 等）的工具。它的主要作用是 在提交代码前自动检查和格式化暂存区的文件，确保提交的代码符合团队的代码规范。
在执行 npm run format 时，我们会格式化所有文件，但是这样会导致提交的文件太多，所以我们可以使用 lint-staged 来只格式化暂存区的文件

```
npm install --save-dev lint-staged
```

在 package.json 中添加配置

```json
{
  "lint-staged": {
    "src/**/*": [
      "npm run format"
    ],
    "*.{js,ts,mjs,json}": [
      "npm run format"
    ]
  }
}

```