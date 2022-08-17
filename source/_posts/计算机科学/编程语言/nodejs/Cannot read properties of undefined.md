---
title: >-
  Syntax Error: TypeError: Cannot read properties of undefined (reading
  'parseComponent')
abbrlink: c4f6a2d3
date: 2022-08-12 14:03:16
tags:
  - NodeJs
  - fail
---

## 报错内容

```javascript
Syntax Error: TypeError: Cannot read properties of undefined (reading 'parseComponent')
```

## 错误分析

无法读取未定义的属性("`parseComponent`")，可能我的`vue`版本和`vue-template-compiler`不一致导致，那么，先卸载`vue-template-compiler`，再安装`vue-template-compiler`和`vue`版本一致即可。

## 解决办法

### 查看vue版本

```bash
npm list vue
```

得到`ue`版本信息`x.x.x`

### 安装`vue-template-compiler`

将`vue`的版本号填入以下的`x.x.x`

```bash
 npm install vue-template-compiler@x.x.x
```

