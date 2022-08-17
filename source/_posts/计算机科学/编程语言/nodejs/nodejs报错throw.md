---
title: "NodeJs报错 throw new typeerror('app.use() requires a middleware function')"
tags:
  - NodeJs
  - fail
categories:
  - 计算机科学
  - 编程语言
  - nodejs
abbrlink: e66a41a6
date: 2022-07-14 17:45:46
---

## 错误

```javascript
C:\Users\Administrator\Desktop\学习\NodeJs\day05\node_modules\express\lib\application.js:210
    throw new TypeError('app.use() requires a middleware function')
    ^

TypeError: app.use() requires a middleware function
    at Function.use (C:\Users\Administrator\Desktop\学习\NodeJs\day05\node_modules\express\lib\application.js:210:11
    at Object.<anonymous> (C:\Users\Administrator\Desktop\学习\NodeJs\day05\03路由模块化.js:9:5)
    at Module._compile (internal/modules/cjs/loader.js:1085:14)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
    at Module.load (internal/modules/cjs/loader.js:950:32)
    at Function.Module._load (internal/modules/cjs/loader.js:790:12)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:76:12)
    at internal/main/run_main_module.js:17:47
[nodemon] app crashed - waiting for file changes before starting...
```

## 原因

是我的路由模块的导出`module`加了花括号，去掉花括号就没问题了

![](http://hikki.test.upcdn.net/2022/07/14-17:47:4848.jpg)
