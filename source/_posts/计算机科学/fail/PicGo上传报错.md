---
title: "PicGo上传失败 TypeError:Cannot destructure property `position` of undefined` or
  'null'"
categories:
  - 计算机科学
  - fail
abbrlink: 5af0544e
date: 2022-07-10 19:37:36
tags:
  - fail
---

## 发现问题

```bash
TypeError: Cannot destructure property position of 'undefined' or 'null'.
at Object.exports.parseAndValidate (C:\Users\ma\AppData\Roaming\picgo\node_modules\picgo-plugin-watermark\lib\util.js:50:11)
at Object.handle (C:\Users\ma\AppData\Roaming\picgo\node_modules\picgo-plugin-watermark\lib\index.js:9:124)
at C:\software\PicGo\resources\app.asar\node_modules\picgo\dist\src\core\Lifecycle.js:113:30
at Array.map ()
at Lifecycle.handlePlugins (C:\software\PicGo\resources\app.asar\node_modules\picgo\dist\src\core\Lifecycle.js:110:35)
at Lifecycle.beforeTransform (C:\software\PicGo\resources\app.asar\node_modules\picgo\dist\src\core\Lifecycle.js:45:20)
at Lifecycle.start (C:\software\PicGo\resources\app.asar\node_modules\picgo\dist\src\core\Lifecycle.js:23:24)
at PicGo.upload (C:\software\PicGo\resources\app.asar\node_modules\picgo\dist\src\core\PicGo.js:205:53)
at Object.upload (C:\software\PicGo\resources\app.asar\background.js:36:29205)
at Pt (C:\software\PicGo\resources\app.asar\background.js:36:31652)
-------Error Stack End-------
2021-10-25 18:48:00 [PicGo WARN] [PicGo Server] upload failed, see picgo.log for more detail ↑
```

![](http://hikki.test.upcdn.net/2022/07/10-20051919.png)

## 解决问题

经过分析，错误，发现是`picgo-plugin-watermark`这个模块的错误，就是添加水印的模块出错了，导致上传失败，只要把这个模块禁用一下就可以了。

![](http://hikki.test.upcdn.net/2022/07/10-20053838.png)
