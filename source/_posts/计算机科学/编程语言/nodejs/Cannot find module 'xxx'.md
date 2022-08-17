---
title: 'Error: Cannot find module ''xxx'''
categories:
  - 计算机科学
  - 编程语言
  - nodejs
abbrlink: 2e63f4a4
date: 2022-07-15 21:46:23
tags:
  - NodeJs
  - fail
---

## 报错内容

```bash
internal/modules/cjs/loader.js:905
  throw err;
  ^

Error: Cannot find module 'express'
Require stack:
- C:\Users\Administrator\Desktop\学习\NodeJs\day06\express写接口.js
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:902:15)
    at Function.Module._load (internal/modules/cjs/loader.js:746:27)
    at Module.require (internal/modules/cjs/loader.js:974:19)
    at require (internal/modules/cjs/helpers.js:93:18)
    at Object.<anonymous> (C:\Users\Administrator\Desktop\学习\NodeJs\day06\express写接口.js:2:17)
    at Module._compile (internal/modules/cjs/loader.js:1085:14)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
    at Module.load (internal/modules/cjs/loader.js:950:32)
    at Function.Module._load (internal/modules/cjs/loader.js:790:12)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:76:12) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    'C:\\Users\\Administrator\\Desktop\\学习\\NodeJs\\day06\\express写接口.js'
  ]
}
[nodemon] app crashed - waiting for file changes before starting...
```

## 分析错误

找不到`express`模块

1. 看看导入模块有没有出错
2. 看看`package.json`有没有下载包记录

发现`package.json`没有记录`express`，说明是是没有下载，那重新下载一下包就好了，`npm i express`

```bash
Error: Cannot find module 'express'
```

