---
title: NodeJs系列-Day04-包的管理
categories:
  - 计算机科学
  - 编程语言
  - nodejs
abbrlink: 1fceb7fb
date: 2022-07-13 13:18:36
tags:
  - NodeJs
---

## 包的管理

:::info

在某目录下安装包时，不会安装到全局的包里面，只会安装到执行命令的位置。所以不需要担心本地`Nodejs`环境混乱的问题。

在安装包的时候，一般只有工具性质的包，才有全局安装的必要性，因为它们提供了好用的终端命令。判断某个包是否需要全局安装可以参考官方的使用说明。

:::



### 初始化项目

```bash
npm init -y
```

执行该命令后会在该目录下出现一个`package.json`的文件，该文件会记录你安装的`包名`和`版本号`。

1. 该命令只能在`英文名目录`下运行，不能包括`中文`、`空格`的目录名。
2. 在运行`npm install `命令安装包的时候，`npm`包管理工具会自动把包的名称和版本号，记录到`package.json`中。

### dependencies记录下载的包

在`package.json`下有个`dependencies`属性记录着该项目所需要用到的包名及版本。

在`dependencies`记录的包又称`核心依赖包`。

### 一次性下载项目所需要的全部包

在上述说到`package`中有记录到该项目所需要的用到的包，如果该项目用的包非常多，如果一次次安装肯定是非常麻烦的，那么用什么办法一次性全部下载全部的包呢？用以下命令可以实现一次性下载项目所需要的包。

```bash
npm install
```

或者简便一点`npm i`，`i`是`install`的简写

该命令是读取`package`下的``dependencies`属性记录的包信息，然后去下载所需要的包。



### 一次性安装多个包

`npm i 包名 包名 ...`，以空格区分开包

```bash
npm install jquery moment
```



### 缺失`包`直接运行报错

在运行某项目时缺失某个依赖包，则会报以下错误

```javascript
Error：Cannot find module '包名'
```



### 卸载包

```bash
npm uninstall 包名
```

### devDependencies节点

如果某些包`只在项目开发阶段`会用到，在`项目上线之后不会用到`，则建议把这些包记录到`devDependencies`节点中。

`devDependencies`记录的包又称`开发依赖包`，只会在开发阶段用到。

与之对应的，如果某些包在`开发`和`项目上线之后`都需要用到，则建议把这些包记录到`dependencies`节点中。

- 安装指定的包，并记录到`devDependencies`节点中。

```bash
npm i 包名 -D
```

- 上诉命令是简写形式，等价于下面完整的写法

```bash
npm install 包名 --save-dev
// 或者，一般属性和包名互换位置不影响安装
npm install --save-dev 包名
```



## 解决包下载慢的问题

### 查看当前镜像源

```bash
npm config get registry
```

### 更换淘宝镜像源

```bash
npm config set registry=https://registry.npm.taobao.org/
```

### 查看是否更换成功

```bash
npm config get registry
```

出现以下镜像地址则说明更换淘宝镜像成功。

![](http://hikki.test.upcdn.net/2022/07/13-17:29:5353.jpg)

### 镜像源切换工具nrm

```bash
# 通过 npm 包管理器，将nrm安装为全局可用的工具
npm i nrm -g
# 查看所有可用的镜像源
nrm ls
# 将下包的镜像源切换为 taobao 镜像
```

#### 镜像源

```bash
npm ------ https://registry.npmjs.org/
yarn ----- https://registry.yarnpkg.com/
cnpm ----- http://r.cnpmjs.org/
taobao --- https://registry.npm.taobao.org/
nj ------- https://registry.nodejitsu.com/
npmMirror- https://skimdb.npmjs.com/registry/
edunpm --- http://registry.enpmjs.org/
```



## i5ting_toc

这是一个`.md`转`HTML`的模块

```bash
# 将 i5ting_toc 安装为全局包，-g 可以放在包名前面或者后边，不影响下载
npm install -g i5ting_toc
# 调用i5ting_toc，轻松将 md 转换 HTML的功能
i5ting_toc -f 要转换的md文件路径 -o
# -f 表示文件路径 -o转换完使用默认浏览器打开
```



## 发布npm包

1. 在`npm`注册账号
2. 在终端切换`npm`官方源(此处我使用了nrm工具，安装方式`npm i nrm -g`)

```bash
nrm use npm
```

3. 输入`npm login`开始登录

:::info

注意：在运行npm login命令之前，必须先把下包的服务器地址切换为npm的官方服务器。否则会导致发布包失败！

tips：Enter one-time password from your authenticator app：在邮箱拿到验证码输入

:::

![](http://hikki.test.upcdn.net/2022/07/14-01:14:5252.jpg)

## 删除已发布的包

```bash
npm unpublish 包名 --force
```

1. `npm unpublish`命令只能删除72小时以内发布的包
2. `npm unpublish`删除的包，在24小时内不允许重复发布
3. 发布包的时候要慎重，尽量不要往`npm`上发布没有意义的包！



## 模块的优先级

`内置模块`   **>**   `第三方模块`

一般模块在第一次使用的时候会加载到缓存中，下次使用直接调用缓存，提高使用效率。



## 加载第三方模块

### 内置模块和第三方模块

使用`require()`加载自定义模块时，必须指定以**`./`**或**`../`**开头的路径标识符,在加载自定义模块时，如果没有指定**`./`**或**`../`**这样的路径标识符，则`NodeJs`会把它当作内置模块或第三方模块进行加载。

### 扩展名加载顺序

在使用`require()`导入自定义模块时，如果省略了文件的扩展名，则`Node.js`会按顺序分别尝试加载以下的文件：

1. 按照确切的文件名进行加载
2. 补全`.js`扩展名进行加载
3. 补全`.json`扩展名进行加载
4. 补全`.node`扩展名进行加载
5. 加载失败，终端报错

### 找不到modules文件夹

如果传递给`require()`的模块标识符不是一个内置模块，也设有以**`./`**或**`../`**开头，则`Node.js`会从当前模块的父目录开始，尝试从`/node modules`文件夹中加载第三方模块。
如果没有找到对应的第三方模块，则移动到再上一层父目录中，进行加载，直到文件系统的根目录(即盘符)。
例如，假设在`C:\Users\test\project\foo.js`文件里调用了`require(tools)`,则`Node.js`会按以下顺序查找：

1. `C:\Users\test\project\node_modules\tools`
2. `C:\Users\test\node_modules\tools`
3. `C:\Users\node_modules\tools`
4. `C:\node_modules\tools`

### 目录作为模块

当把目录作为模块标识符，传递给`require()`进行加载的时候，有三种加载方式：

1. 在被加载的目录下查找一个叫做`package.json`的文件，并寻找`main`属性，作为`require()`加载的入口
2. 如果目录里没有`package.json`文件，或者`main`入口不存在或无法解析，则`Node.js`将会试图加载目录下的`index.js`文件。
3. 如果以上两步都失败了，则`Node.js`会在终端打印错误消息，报告模块的缺失：`Error:Cannot find module'xxx'`



## 自定义npm包

包结构如下

```yaml
├─ lilbai-tool           
│  ├─ src                
│  │  ├─ data.js         
│  │  └─ htmlReplace.js  
│  ├─ index.js           
│  ├─ package.json       
│  └─ README.md          
└─ test.js               
```

### index.js

在index.js中要引入其他js文件，并且选择性暴露出引入对象和对象属性，在对象前加上`...对象名`

```javascript

const data = require("./src/data")
const html = require("./src/htmlReplace")

//拆分模块 1. 将方法拆分到各个js文件中  2. 在index.js导入各方法，暴露出对象，并且对象前加...
//...functionname，展开运算符,表示包含data内的所有属性
module.exports={
    ...data,
    ...html
}
```

### data.js

在其他的js文件也要暴露出对象，不然在index.js方法中找不到其他方法暴露的对象。

```javascript
function data (str){

    const dt = new Date(str)

    const y = addZero(dt.getFullYear())
    const m = addZero(dt.getMonth()+1)
    const d = addZero(dt.getDate())

    const hh = addZero(dt.getHours())
    const mm = addZero(dt.getMinutes())
    const ss = addZero(dt.getSeconds())
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}

function addZero(n){
    return n>9? n:'0'+ n
}
//在个js文件也需暴露对象，不然index.JS找不到暴露的对象
module.exports={
    data
}
```

### htmlReplace.js

```javascript
//防止用户输入奇怪的东西或者跑bug
function htmlReplace(str){
    //replace(/被字符串/i或者g,替换后字符串)，i不区分大小写，g全局匹配，m多行匹配
    return str.replace(/&lt; | &gt;| &amp;| &quot;/g,function(param){
        switch (param){
            case '&lt;':
                return '<'
            case '&gt;' :
                return '>'
            case '&quot;' :
                return '"'
            case '&amp;':
                return '&'
        }
    })
}

module.exports ={
    htmlReplace
}
```





