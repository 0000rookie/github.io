---
title: NodeJs系列-Day05-中间件
tags:
  - NodeJs
categories:
  - 计算机科学
  - 编程语言
  - nodejs
abbrlink: 68c9876d
date: 2022-07-14 13:49:18
---

## 获取前端发送的内容

### 导入模块

```javascript
// 1. 导入模块
const express = require('express')
// 2. 获取express方法
const app = express()
// 3. 设置端口
const port = 3000
```

### 使用GET方法

`app.get(path,(req,res)=>{})`

```javascript
// 通过res.send()方法，可以把处理好的内容，发送给客户端，一般发送数据用json对象
app.get('/', (req, res) => {
res.send({name:'libai518',age:21,gender:'男'})
//通过req.quey对象，可以访问到客户端通过查询字符串的形式，发送到服务器的参数
//就是用户通过url提供的参数，后台可以拿到这个参数
console.log(req.query)
})
```

### 使用POST方法

`app.post(path,(req,res)=>{})`

```javascript
app.post("/user",(req,res)=>{
    res.send('请求post成功')
})
```

### URL动态参数

`app.get('.//:param',function(req,res){})`，`:param`表示是一个参数，在请求`url`则请求`http://127.0.0.1/user/1/10`，`page=1,count=10`，即带有分页书条数。

```javascript
app.get('/user/:page/:count',(req,res)=>{
// /:id可以匹配到动态参数，比如适合分页啥的，记得要加上 /:参数名字
    res.send(req.params)
    console.log(req.params)
    
})
```

### 启动服务器

```javascript
// 4. 启动服务器
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```

## 托管静态资源

### 托管一个静态资源

:::info

在托管静态资源的时候，在客户端打开此资源文件夹的是看不到文件夹名的，看到的只有一个`/`

:::

简单来说就是对外开放了一个文件夹，客户端可以访问到某个文件夹内的资源，一般用来存放`HTML`、`JS`、`CSS`、图片等。

```javascript
const express = require('express')
const path = require("path")
const app = express()
const port = 3000

const Path = path.join(__dirname,"./public/")
// 1. 在对外托管静态资源时是不显示托管文件夹的名称的
app.use(express.static(Path))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```

### 托管多个静态资源

在托管多个资源时，是存在优先级的，因为`js`是解释性语言，优先级从上往下。

如果客户端请求一个`index.html`文件，没有指定某个静态资源路径，那`nodejs`就会从第一个静态资源库寻找有没有`index.html`，如果没有，则继续下一个静态资源库寻找`index.html`文件，直到全部静态资源都找完都没有才结束查找。

```javascript
const express = require('express')
const path = require("path")
const app = express()
const port = 3000

const Path = path.join(__dirname,"./public/")
// 1. 在对外托管静态资源时是不显示托管文件夹的名称的
// 2. 如果有托管多个public，会存在优先级，js是解释性语言，越前面优先级越高
// 3. 如果在两个对外访问的public都有相同的文件名时，优先从第一个public访问，第一个public找不到才从第二个public文件夹寻找

app.use(express.static(Path))
app.use(express.static("./node_modules/"))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```

### 给托管资源添加访问前缀

由于客户端在访问静态资源时是看不到根文件夹名字的，我们可以给该文件夹添加一个访问前缀，这样可以更方便操作路由以及前期调试。

#### 使用方法

在原基础上添加一个`路径`参数即可。

```javascript
app.use(express.static(Path))  			// 不设置访问前缀
app.use("/abc",express.static(Path)) 	//设置访问前缀
```



```javascript
const express = require('express')
const path = require("path")
const app = express()
const port = 3000

const Path = path.join(__dirname,"./public/")
// 1. 在对外托管静态资源时是不显示托管文件夹的名称的
// 2. 如果有托管多个public，会存在优先级，js是解释性语言，越前面优先级越高
// 3. 如果在两个对外访问的public都有相同的文件名时，优先从第一个public访问，第一个public找不到才从第二个public文件夹寻找
app.use(express.static(Path))
app.use(express.static("./node_modules/"))

// 给public挂载/abc前缀,这样想打开Path路径必须添加/abc才能访问到Path，对于路由控制非常方便
app.use("/abc",express.static(Path))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```



## 路由

### 路由的匹配

每当一个请求到达服务器之后，需要先经过路由的匹配，只有匹配成功之后，才会调用对应的处理函数。
在匹配时，会按照路由的顺序进行匹配，如果请求类型和请求的URL同时匹配成功，则Express会将这次请求，转
交给对应的function函数进行处理。

![](http://hikki.test.upcdn.net/2022/07/15-00:26:077.jpeg))



:::info

1. 按照定义的先后顺序进行匹配
2. 请求类型和请求的UL同时匹配成功，才会调用对应的处理函数

:::

## 路由模块化

将路由抽离为单独模块的步骤如下：

1. 创建路由模块对应的`js`文件
2. 调用`express.Router()`函数创建路由对象
3. 向路由对象上挂载具体的路由
4. 使用`module.exports`向外共享路由对像
5. 使用`app.use()`函数注册路由模块

### 路由主方法

最重要的步骤就是要注册路由模块，简单来说就是把路由设置分化成若干个模块，然后在主方法内注册若干个模块，这样在客户端请求`url`时，主方法会调用其他路由模块进行查找，可以降低耦合性。

```javascript
// 1. 导入模块
const express = require('express')
const app = express()

const port = 3000
// 2. 注册路由模块
const router = require('./router/01router')

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
```

### 路由分模块

最重要的步骤就是要对外`导出对象`，不然主方法内是找不到分模块的方法的。

:::info

在哪个模块要实现`router.method()`方法，哪个模块就要创建路由对象

:::

```javascript
// 1. 导入模块
const express = require("express")

// 2. 创建路由对象
const router = express.Router()

// 3. 实际操作路由
router.get("/user",(req,res)=>{
    res.send("这是get请求的路由")
})

router.post("/user",(req,res)=>{
    res.send("这是post的请求路由")
})

// 4. 向外导出路由对象
module.exports =router
```

## 中间件

:::info

中间件的五个注意事项：

1. 一定要在`路由之前`注册中间件

2. 客户端发送过来的请求，`可以连续调用多个`中间件进行然理

3. 执行完中间件的业务代码之后，`不要忘记调用next()函数`

4. 为了`防止代码逻辑混乱`，调用`next()`函数后不要再写额外的代码

5. 连续调用多个中间件时，多个中间件之间，共享`req`和`res`对象

:::

### 局部中间件

:::info

不使用`app.use()`定义的中间件都叫`局部生效的中间件`。

:::

```javascript
// 1. 导入模块
const express = require('express')
const app = express()
// 2. 设置端口
const port = 3000

/*
注意：
1. 一定要在路由之前注册中间件
2. 客户端发送过来的请求，可以连续调用多个中间件进行然理
3. 执行完中间件的业务代码之后，不要忘记调用next0函数
4. 为了防止代码逻辑混乱，调用next0函数后不要再写额外的代码
5. 连续调用多个中间件时，多个中间件之间，共享req和res对象
*/

// 定义多个局部中间件函数
const t1 = (req,res,next)=>{
    console.log('调用了局部中间件1')
    next()
}
const t2 = (req,res,next)=>{
    console.log('调用了局部中间件2')
    next()
}


// 3. 多个中间件路由控制实现，执行顺序t1、t2
app.get('/',[t1,t2], (req, res) => {
// 或者 app.get('/',test1,test2, (req, res) => {
    console.log('这是GET路由控制!')
    res.send(`这是GET路由控制!`)
})

// 4. 服务器启动
app.listen(port, ()=>{
    console.log('服务器已启动 http://127.0.0.1:3000')
} )
```



### 全局中间件

执行过程：

执行顺序全局中间件`app.use()`、全局中间件`app.use()`，再执行路由`app.get()`，由于`JS`是解释性语言，中间件的执行顺序`由上到下`。

```javascript
// 导入模块
const express = require('express')
const app = express()

// 定义全局中间件函数 比路由执行得早，都是中间件则优先级从上往下执行
app.use((req,res,next)=>{
    const time = Date.now()
    req.starttime = time
    console.log('这是中间件1')
    //next()结束之后交给之后的路由处理
    next()//一般next()方法后就不添加业务逻辑了，next()表示中间件已经结束了
})

app.use((req,res,next)=>{
    const time = Date.now()
    req.starttime = time
    console.log('这是中间件2')
    //next()结束之后交给之后的路由处理
    next()//一般next()方法后就不添加业务逻辑了，next()表示中间件已经结束了
})

// 路由
app.get('/', (req, res) => {
    console.log('路由在中间件执行后执行')
    //在路由下游可以拿到中间件的属性和方法req
    res.send('这是get请求'+req.starttime)
})


app.listen(3000,()=>{
    console.log('http://127.0.0.1:3000')
})
```





### next()函数的作用

`next()`函数是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或路由。



![](http://hikki.test.upcdn.net/2022/07/15-00:24:5757.jpeg))





## 中间件的分类

### 应用级别的中间件

通过`app.use()`或`app.get()`或`app.post()`,绑定到`app`实例上的中间件，叫做应用级别的中间件

```javascript
// 1. 导入模块
const express = require('express')
const app = express()
// 2. 设置端口
const port = 3000

app.use((eq,res,next)=>{
    next()
})

app.get('/',t1,(req,res)=>{
    res.send('这是GET请求')
})

// 4. 服务器启动
app.listen(port, ()=>{
    console.log('服务器已启动 http://127.0.0.1:3000')
} )
```

### 路由级别的中间件

绑定到`express.Router()`实例上的中间件，叫做路由级别的中间件。它的用法和应用级别中间件没有任何区别。只不过，应用级别中间件是绑定到`app`实例上，路由级别中间件绑定到`router`实例上，代码示例如下：

```javascript
// 1. 导入模块
const express = require('express')
const app = express()
const router = express.Router()
// 2. 设置端口
const port = 3000

router.use((req,res,next)=>{
    console.log('Time:'+Date.now())
    next()
})
app.use('/',router)

// 4. 服务器启动
app.listen(port, ()=>{
    console.log('服务器已启动 http://127.0.0.1:3000')
} )
```

### 错误级别中间件

:::info

错误级别中间件一定要放在路由后面来捕捉错误

:::

错误级别中间件的作用：专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。
格式：错误级别中间件的`function`处理函数中，必须有`4`个形参，形参顺序从前到后，分别是**(`err`,req,res,next)**

```javascript
// 1. 导入模块
const express = require('express')
const app = express()
// 2. 设置端口
const port = 3000

app.get('/',(req,res)=>{
    throw new Error('服务器内部出错')
    res.send('到上一步已经停止执行了出错了，这步不执行')
})

//中间件。之前说过，中间件一定要放在路由前面。
//但是在错误级别中间件要放在路由之后来捕捉错误
//防止程序崩溃。即使发生了错误，但程序还是继续执行
app.use((err,req,res,next)=>{
    console.log('发生了错误！'+ err.message)
    res.send('Error: '+ err.message)
})

// 4. 服务器启动
app.listen(port, ()=>{
    console.log('服务器已启动 http://127.0.0.1:3000')
} )
```

### Express内置的中间件

自`Express4.16.0`版本开始，Express内置了`3个`常用的中间件，极大的提高了`Express`项目的开发效率和体验:

1. `express.static`快速托管静态资源的内置中间件，例如：`HTML文件`、`图片`、`CSS`样式等（无兼容性）
2. `express.json`解析`JSON`格式的请求体数据(有兼容性，仅在`4.16.0+`版本中可用)
3. `express.urlencoded`解析`URL-encoded`格式的请求体数据(有兼容性，仅在`4.16.0+`版本中可用)

```javascript
//配置解析 application/json 格式数的内置中间件
app.use(express.json())
//配置解析 application/x-ww-form-urlencoded 格式数据的内置中间件
app.use(express.urlencoded({extended:false}))
```

#### express.static()的使用

`[path]`表示前缀路径，在访问该路径的时候要加上前缀路径。

比如`app.use('abc',express.static('./node_modules/'))`，那我在访问的路径应该是`http://127.0.0.1/abc/`这样的。

```javascript
app.use( [path ,] express.static('./node_modules/'))
```

#### express.json()

可以接受到客户端发送的json数据，

```javascript
// 1. 导入模块
const express = require('express')
const app = express()
// 2. 设置端口
const port = 3000

//通过express.json（）这个中间件，解析表单中的JSON格式的数据
app.use(express.json())

app.get('/',(req,res)=>{
    //接受到客户端请求的数据挂载到req.body上
    console.log(req.body)
    //给客户端返回‘ok’说明请求成功
    res.send('ok')
})

// 4. 服务器启动
app.listen(port, ()=>{
    console.log('服务器已启动 http://127.0.0.1:3000')
} )
```

#### express.urlencoded()

`express.urlencoded()`和`express.json()`的用法基本一样的，只是用于解析的中间件不一样，其他是一样的。

```javascript
// 1. 导入模块
const express = require('express')
const app = express()
// 2. 设置端口
const port = 3000

//通过express.urlencoded（）这个中间件，解析表单中的url-encoded格式的数据
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    //接受到客户端请求的数据挂载到req.body上
    console.log(req.body)
    //给客户端返回‘ok’说明请求成功
    res.send('ok')
})

// 4. 服务器启动
app.listen(port, ()=>{
    console.log('服务器已启动 http://127.0.0.1:3000')
} )
```

### 第三方的中间件

非`Express`官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件。在项目中，大家可以按需下载并配置第三方中间件，从而提高项目的开发效率。
例如：在`express@4.16.0`之前的版本中，经常使用`body~parser`这个第三方中间件，来解析请求体数据。使用步骤如下：

- 运行`npm install body-parser`安装中间件
- 使用`require`导入中间件
- 调用`app.use()`注册并使用中间件

:::info

注意：`Express`内置的`express.urlencoded`中间件，就是基于`body-parser`这个第三方中间件进一步封装出来的。

:::

`body-parser`中间件和Express内置`urlencoded`用法非常像。

```javascript
const parser = require('body-parser')
app.use(parser.urlencoded({extended:false}))
//app.use(express.urlencoded({extended:false}))
app.post('/user',(req,res)=>{
    console.log(req.body)
    res.send('ok')
})
```

## 自定义中间件

### 需求与实现步骤

自己手动模拟一个类似于`express.urlencoded`这样的中间件，来`解析POST提交到服务器的表单数据`。
实现步骤：

1. 定义中间件
2. 监听`req`的`data`事件
3. 监听`req`的`end`事件
4. 使用`querystring`模块解析请求体数据
5. 将解析出来的数据对象挂载为`req.body`
6. 将自定义中间件封装为横块



### 监听`req`和`data`事件

在中间件中，需要监听`req`对象的`data`事件，来获取客户端发送到服务器的数据。
如果数据量比较大，无法一次性发送完毕，则客户端会`把数据切制后`，`分批发送到服务器`。所以`data`事件可能会触发多次，每一次触发`data`事件时，`获取到数据只是完整数据的一部分`，需要手动对接收到的数据进行拼接。

```java
// 导入模块
const express = require('express')

// 创建 express 实例
const app = express()

// 设置端口
const port = 3000

// 这是解析表单数据的中间件
app.use((req,res,next)=>{
    //定义中间件的事件处理
    // 1. 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
    let str=''
    // 2. 监听req，data事件
    req.on('data',(chunk)=>{
        str+=chunk
    })
})

// 服务器启动
app.listen(port, ()=>{
    console.log('服务器已启动 http://127.0.0.1:3000')
} )
```

### 将解析出来的数据对象挂载为`req.body`

上游的中间件和下游的中间件及路由之间，共享同一份`req`和`res`。因此，我们可以将解析出来的数据，挂载为`req`的自定义属性，命名为`req.boyd`,供下游使用。示例代码如下：

```javascript
app.use((req,res,next)=>{
    //定义中间件的事件处理
    // 1. 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
    let str=''
    // 2. 监听req的data事件。有些数据
    req.on('data',(chunk)=>{
        str+=chunk
    })
    // 3. 监听req的end事件
    req.on('end',()=>{
        // TODO:把字符串格式的请求体格式，解析成对象格式
        const body = qs.parse(str)
        // 挂载到req，便于后续的中间件和路由访问
        req.body =body
        next()
    })
})

app.post('/user',(req,res)=>{
    res.send(req.body)
})
```

### 中间件模块化

1. 将中间件函数剪切到`index.js`文件
2. 导入中间件所需要的模块
3. 再抛出中间件对象

```javascript 自定义中间件主方法.js
// 导入模块
const express = require('express')
const qs = require('querystring')
// 创建 express 实例
const app = express()
// 导入中间件模块
const table = require('./解析表单数据')
// 注册中间件
app.use(table)

// 路由控制
app.post('/user',(req,res)=>{
    res.send(req.body)
})

// 服务器启动
app.listen(3000, ()=>{
    console.log('服务器已启动 http://127.0.0.1:3000')
} )
```



```javascript TableData.js
// 导入模块
const express = require('express')
const qs = require('querystring')
// 创建 express 实例
const app = express()
// 这是解析表单数据的中间件
const TableData=app.use((req,res,next)=>{
    //定义中间件的事件处理
    // 1. 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
    let str=''
    // 2. 监听req的data事件。有些数据
    req.on('data',(chunk)=>{
        str+=chunk
    })
    // 3. 监听req的end事件
    req.on('end',()=>{
        // TODO:把字符串格式的请求体格式，解析成对象格式
        const body = qs.parse(str)
        req.body =body
        next()
    })
})
// 抛出对象
module.exports =TableData
```









