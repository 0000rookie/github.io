---
title: Vue系列-Day01-第一个Vue程序
tags:
  - Vue
abbrlink: 12f92b3b
date: 2022-07-31 23:39:04
---

## 第一个VUE程序

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title></title>
		<script src="js/v2.6.10/vue.min.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div id="app">
			{{ counter }}
		</div>
        
		<script>
			var vm = new Vue({
				el:"#app",
				data:{
					counter :"www.hikki.site"
				}
			});
		</script>
	</body>
</html>

```

![第一个程序](http://hikki.test.upcdn.net/%E7%AC%AC%E4%B8%80%E4%B8%AA%E7%A8%8B%E5%BA%8F.gif)

## if-else

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title></title>
		<script src="js/v2.6.10/vue.min.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div id="app">
			<h1 v-if = "test">www.hikki.site</h1>
			<h1 v-else >这是我的博客</h1>
		</div>
		
		<script>
			var vm = new Vue({
				el:"#app",
				data:{
					test: true

				}
			});
		</script>
	</body>
</html>

```

![if-else](http://hikki.test.upcdn.net/if-else.gif)

## if-else-if

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title></title>
		<script src="js/v2.6.10/vue.min.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div id="app">
			<h1 v-if = "test === 'A'">www.hikki.site</h1>
			<h1 v-else-if = "test ==='B'">B</h1>
			<h1 v-else >C</h1>
		</div>
		
		<script>
			var vm = new Vue({
				el:"#app",
				data:{
					test: 'A'
				}
			});
		</script>
	</body>
</html>

```

![if-else-if](http://hikki.test.upcdn.net/if-else-if.gif)

## v-for

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title></title>
		<script src="js/v2.6.10/vue.min.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div id="app">
			<li v-for="item in items">
			{{item.msg}}
			</li>
		</div>
		
		<script>
			var vm = new Vue({
				el:"#app",
				data:{
					items:[
						{msg:'www.hikki.site'},
						{msg:'筆記'},
						{msg:'我的博客'},
					]
				}
			});
		</script>
	</body>
</html>

```

![image-20220801001856459](http://hikki.test.upcdn.net/image-20220801001856459.png)

## 监听变量变化

````html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title></title>
<script src="vue.min.js" type="text/javascript" charset="utf-8"></script>
</head>
<body>
<div id="app">
	{{a}}
</div>

<script type="text/javascript">
var data = { a : "变量变化前" };
var vm = new Vue({
	el   : "#app",
	data : data
});

vm.$watch('a', function(newVal, oldVal){
	console.log(newVal, oldVal);
})

vm.$data.a = "变量变化后"
</script>
</body>
</html>

````

![image-20220801004415392](http://hikki.test.upcdn.net/image-20220801004415392.png)

## 生命周期的监听

可以指定事件在某个事件完成前后执行，处理特定的的事情。

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title></title>
<script src="vue.min.js" type="text/javascript" charset="utf-8"></script>
</head>
<body>
<div id="app">
	{{msg}}
</div>
<script type="text/javascript">
var vm = new Vue({
	el : "#app",
	data : {
		msg : "hi vue",
	},
	//在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
	beforeCreate:function(){
		console.log('beforeCreate');
	},
	/* 在实例创建完成后被立即调用。
	在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。
	然而，挂载阶段还没开始，$el 属性目前不可见。 */
	created	:function(){
		console.log('created');
	},
	//在挂载开始之前被调用：相关的渲染函数首次被调用
	beforeMount : function(){
		console.log('beforeMount');

	},
	//el 被新创建的 vm.$el 替换, 挂在成功	
	mounted : function(){
		console.log('mounted');
	
	},
	//数据更新时调用
	beforeUpdate : function(){
		console.log('beforeUpdate');
			
	},
	//组件 DOM 已经更新, 组件更新完毕 
	updated : function(){
		console.log('updated');
			
	}
});
setTimeout(function(){
	vm.msg = "3秒后改变";
}, 3000);
</script>
</body>
</html>

```

![image-20220801004956374](http://hikki.test.upcdn.net/image-20220801004956374.png)







