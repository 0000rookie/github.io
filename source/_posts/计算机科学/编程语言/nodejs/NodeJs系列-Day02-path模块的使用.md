---
title: NodeJs系列-Day02-path模块的使用
categories:
  - 计算机科学
  - 编程语言
  - nodejs
abbrlink: f6ad12ce
date: 2022-07-11 18:09:53
tags:
  - NodeJs
---

## 将HTML拆分为外链式

- 获取`CSS`和`JS`的内容
- 将`CSS`和J`S`分别写入到新文件中
- 在原来的`HTML`文件去掉`CSS`和`JS`的内容
- 添加`CSS`和`JS`外链

```javascript
//导入模块
const fs = require ("fs")
const path = require ("path")

//正则表达式
// \s表示匹配空白字符，\S表示匹配任意的非空白字符 *标识匹配所有字符
const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/

fs.readFile(path.join(__dirname,"./johou.html"),function(err,data){
    //path.join(__dirname,"./johou.html") 拼接当前文件夹路径和文件夹下的johou.html
    if (err){
        return console.error(err)
    }
    resolveCSS(data)//将jihou.html分离CSS样式出来
    resolveJS(data)//将jihou.html分离JS出来
    resolveHTML(data)//将样式和js都变成外链式
})

function resolveCSS(css){
   
    var data=regStyle.exec(css) 
    //执行正则表达式将css样式提取出来
    var newdata= data[0].replace("<style>"," ").replace("</style>"," ") 
    //把提取出来的样式将<style>替换成空格
    fs.writeFile(path.join(__dirname,"./test/index.css"),newdata,function(err){
        if (err){
            return console.error(err)
        }
        console.log("写入css成功")
    })
}

function resolveJS(js){
    var data= regScript.exec(js)
    //执行正则表达式将js提取出来
    var newdata= data[0].replace("<script>"," ").replace("</script>"," ")
    //把提取出来的样式将<script>替换成空格
    fs.writeFile(path.join(__dirname,"./test/index.js"),newdata,function(err){
        if (err){
            return console.error(err)
        }
        console.log("写入js成功")
    })
}

function resolveHTML(html){
    
    var newdata = html.toString().replace(regScript,'<script src="./test/index.js"></script>').replace(regStyle,'<style rel="stylesheel" href="./test/index.css"></script>')
    //形参获取到的html是Buffer，需要用toString()方法转换成字符串类型，同时将css和js替换成外链式链接
    fs.writeFile(path.join(__dirname,"./test/index.html"),newdata,function(err){
        if (err){
            return console.error(err)
        }
        console.log("写入html成功")
    })
}
```



## 总结

在方法之间进行传参的时候，传输的数据会变成Buffer，在使用的时候需要将数据用toString()转换成字符串类型。



### 易错点

- 在使用`path.join()`的时候很容易漏掉`path.`，这是非常重要的，其中`join()`的参数可以有多个。

- `fs.writeFile()`的时候必须要添加回调函数并且`抛出错误`，





