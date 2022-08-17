---
title: 智能知识共享平台-基于nodejs开发
categories:
  - 计算机科学
  - demo
abbrlink: 9376bd7a
date: 2022-07-15 21:52:04
tags:
---

## 前期准备

### 在GET、POST请求要注意跨域问题

:::info

在部署上线的时候，修改<origin> 

:::



CORS响应头部 - `Access-Control-Allow-Origin`

响应头部中可以携带一个`Access-Control-Allow-Origin`字段，其语法如下：

```javascript
Access-Control-Allow-Origin:<origin> | *
```

其中，`origin`参数的值指定了允许访问该资源的外域`URL`。
例如，下面的字段值将`只允许`来自`http:/itcast.cn`的请求：

```javascript
res.setHeader('Access-Control-Allow-Origin','http://itcast.cn')
```

