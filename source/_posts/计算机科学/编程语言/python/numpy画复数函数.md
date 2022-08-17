---
title: numpy画复合函数
tags:
  - Python
categories:
  - 计算机科学
  - 编程语言
  - python
abbrlink: 8075134e
date: 2022-05-09 08:40:57
---

## 函数~1~{.red}

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022051002.png){width="10%" height="10%"}

```python mark:1-10
import numpy as np
import matplotlib.pyplot as plt

x = np.arange(-5,5,0.01)	# 设置X的值
y = 1/(1+np.exp(-x)) 		# 设置Y的值，一个Y都有一个X与他对应
plt.xlim(-6,6) 		#　设置Ｘ轴的范围
plt.ylim(0.0,1.0) 		# 设置Y轴的范围
plt.plot(x,y) 			# 将X、Y的值添加到面板中
plt.show() 			# 显示面板
```

## 函数~2~{.red}

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022051939.png){width="20%" height="20%"}

```python mark:1-15
import numpy as np
import matplotlib.pyplot as plt

def func(x):
    return np.cos(2*np.pi*x)*np.exp(-x)+1
left_x = int(input("请输入下限值："))
right_x = int(input("请输入上限值："))
x = np.arange(left_x,right_x,0.01) # 设置X的值
y = func(x) 			# 设置Y的值，一个Y都有一个X与他对应
plt.xlim(left_x,right_x) 	# 设置X轴的范围
plt.ylim(-15000,25000)			 # 设置Y轴的范围
plt.plot(x,y) 			# 将X、Y的值添加到面板中
plt.show()			# 显示面板
```

