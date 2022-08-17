---
title: nodemon无法自动刷新内容变更
tags:
  - NodeJs
  - fail
abbrlink: d77d79c9
date: 2022-08-10 10:35:11
---

## 遇到问题

今天在写`NodeJs`的时候，发现nodemon没有自动更新内容变更，这让我很头疼，一开始以为是路径没有导入正确，再三排除，路径没有问题。

## 分析问题

这是我的项目框架，程序启动入口位于`app/app.js`

```javascript
Demo                  
├─ app                
│  └─ app.js          
├─ config             
│  ├─ db              
│  │  └─ index.js     
│  └─ schema          
│     └─ user.js      
├─ public             
├─ router             
│  ├─ router_handler  
│  │  └─ user.js      
│  └─ router_head     
│     └─ user.js      
├─ view               
│  ├─ admin           
│  └─ public                       
├─ package-lock.json  
└─ package.json       

```

导入路由时，需要返回上级目录，这时`nodemon`可能没有找到导入的路由，那么，我把程序入口`app.js`转移到根目录，应该就没问题了吧

## 解决问题

只需将`app.js`移到根目录即可

```javascript
Demo                           
├─ config             
│  ├─ db              
│  │  └─ index.js     
│  └─ schema          
│     └─ user.js      
├─ public             
├─ router             
│  ├─ router_handler  
│  │  └─ user.js      
│  └─ router_head     
│     └─ user.js      
├─ view               
│  ├─ admin           
│  └─ public   
├─ app.js 
├─ package-lock.json  
└─ package.json  
```

```javascript
const userRouter = require('./router/router_head/user')
```

