---
title: NodeJs系列-Day01-文件处理
tags:
  - NodeJs
categories:
  - 计算机科学
  - 编程语言
  - nodejs
abbrlink: c797c821
date: 2022-07-10 20:35:04
---

## 如何执行Nodejs文件

:::info

tips：执行文件时，要注意执行文件的路径是否正确，还有`js`文件在引用资源的时候是否使用正确，js文件引用的文件相对路径是对于执行命令的位置来说的。

:::

```javascript
node js文件 //例如
node test.js
```

### 如何打印到显示器？

Node.js 是一个基于 Chrome JavaScript 运行时建立的一个平台。

```javascript
console.log()
```

**执行文件 01file.js**

```javascript 01file.js文件 https://www.runoob.com/nodejs/nodejs-fs.html 参考链接
var fs = require("fs");//引入模块fs
//异步
fs.readFile('../file/123.txt','utf-8',function(err,data){
    if(err){
        console.log("读取失败！");
    }
    console.log("异步读取：\n"+data)
});

//同步
var data=fs.readFileSync('../file/123.txt','utf-8')
console.log("同步读取:\n"+data)


var fs = require("fs")
fs.stat("../file/123.txt",function(err,stats){
    if(err){
        return console.error(err)
    }
    console.log("是否为文件"+stats.isFile())
    console.log("是否为文件夹"+stats.isDirectory())
});
```

**文件内容 123.txt**

```yaml 123.txt文件
王さん=100
刘さん=99
吴さん=98
```



## 读取文件fs.readFile()

```javascript
var fs = require("fs");
//异步
fs.readFile('../file/123.txt','utf-8',function(err,data){
    if(err){
        console.log("读取失败！");
    }
    console.log("异步读取：\n"+data)
});

//同步
var data=fs.readFileSync('../file/123.txt','utf-8')
console.log("同步读取:\n"+data)
```

**输出结果**

![](http://hikki.test.upcdn.net/2022/07/10-21224848.jpg)



## 写入文件fs.writeFile()

:::info

tips:fs.writeFile()并不能创建文件夹，只能创建文件，想创建文件夹使用fs.mkdir()

:::

```javascript
//写入文件
var fs = require("fs");
var data= "我是写入的内容"
fs.writeFile("../file/writeFile.txt",data,function(err){
    if(err){
        return console.error(err);
    }
    console.log("写入成功！");
    fs.readFile("../file/writeFile.txt",function(err,dat){
        if(err){
            return console.error(err);
            //判断是否有错误，有错误则输出错误
        }
        //输出内容，如果不使用toString()方法，则直接输出缓冲对象，如下图
        console.log(dat.toString());
    });
});
```

![](http://hikki.test.upcdn.net/2022/07/10-21422525.jpg)

## 判断文件或者文件夹类型

- stats.isFile()
- stats.isDirectory()

```javascript
var fs = require("fs")
//引入模块fs
fs.stat("../file/123.txt",function(err,stats){
    if(err){
        return console.error(err)
        //判断文件是否错误，如果出错则输出错误信息
    }
    console.log("判断是否为文件"+stats.isFile())
    console.log("判断是否为文件夹"+stats.isDirectory())
});
```

**输出结果**

![](http://hikki.test.upcdn.net/2022/07/10-2121022.jpg)

## 创建目录fs.mkdir()

```javascript
//创建目录
var fs = require("fs");
console.log("创建目录");
fs.mkdir("../file/test/",function(err){
    if(err){
        return console.error(err);
    }
    console.log("目录创建成功！")
});
```

## 读取目录下内容fs.readdir()

```javascript
//读取目录下的内容
fs.readdir("../file/",function(err,data){
    if(err){
        return console.error(err);
    }
    data.forEach(function(file){
        console.log(file);
    });
});
```

## 缓冲区Buffer.

- Buffer.from(param)
- Buffer.alloc(3)
- str.toString()

```javascript
//将字符串转换成Buffer
var str="abcd"
console.log(str)
console.log(Buffer.from(str))

//创建指定大小的Buffer，初始值为 00
console.log(Buffer.alloc(3))
//将Buffer转换成字符串
console.log(str.toString())

//字符串长度和Buffer长度不一样
var str2 = "中国，I LOVE YOU"
console.log(str2+"长度:"+str2.length)
var ic = Buffer.from(str2)
//当Buffer类型接在字符串类型上，Buffer会自动转换成字符串类型
console.log(ic)
console.log(ic+"长度:"+ic.length)
```



## 流式文件加载

- fs.createReadStream()
- fs.createWriteStream()

```javascript
//用流式文件加载到内存中
var fs = require("fs")
var rs= fs.createReadStream("../file/小猪佩奇第一季.mp4")
var ws= fs.createWriteStream("../file/小猪佩奇.mp4")

rs.on('data',function(data){
    ws.write(data)
})
//或者可以更方便一点
rs.pipe(ws)
```



## 总结

第一天主要是学习了一些基本的文件操作，以及熟悉在Nodejs环境下的一些语法结构。

- 文件的读取
- 文件的写入
- 大文件的流式读写
- 以及路径的拼接等等

---

## 补充

`2022/07/11`补充

### 路径拼接path.join()

```javascript
//使用path.jion(path[,newPath,newPath,...])拼接路径
var fs = require("fs")
var path =require("path")
const pathStr = path.join("../file/test/123/","../","./a/c/d","./")
console.log("pathStr路径:"+pathStr)
```



### 路径定位

- __dirname
- __filename //只获取文件名，不包括后缀

```javascript
//定位到当前执行文件的文件夹下的上一层
const newPath=path.join(__dirname,"../")
console.log("newPath路径:"+newPath)
//__dirname和__filename分别是定位当前文件夹和定位到当前执行文件位置
console.log("定位到当前文件夹路径："+__dirname)
console.log("定位到当前执行文件："+__filename)
```

### 获取中文文件名

```javascript
const path = require("path")
//获取中文文件名包括后缀，如果第
const newPath = path.basename("C:\\Users\\Administrator\\Desktop\\学习\\NodeJs\\file\\123.txt")
//const newPath = path.basename("C:\\Users\\Administrator\\Desktop\\学习\\NodeJs\\file\\123.txt",".txt")
console.log(__filename)
console.log(newPath)
```









































