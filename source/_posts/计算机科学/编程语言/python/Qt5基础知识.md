---
title: python Qt5基础知识
tags:
  - Qt5
  - Python
categories:
  - 计算机科学
  - 编程语言
  - python
abbrlink: c3e9968a
date: 2022-04-26 11:49:48
---



## 添加间隔线

```python mark:1-5
fileMenu.addSeparator() #fileMenu是菜单bar
```

## 添加菜单bar

```python mark:1-10
#实例化菜单条
mainMenubar = self.menuBar()
# 将菜单命名到列表中
menu_item_name = ['fileMenu', 'editMenu', 'formatMenu', 'searchMenu', 'helpMenu']
# 给菜单做映射(也就是实际显示的名称)
menu_item_bar_name = ['文件', '编辑', '格式', '查看', '帮助']
# 用循环来一次性把所有菜单条执行，减少代码冗余
for item in range(len(menu_item_name)):
	menu_item_name[item] = mainMenubar.addMenu(menu_item_bar_name[item])
```

## 添加子菜单

```python mark:1-25
# 将操作名、属性名、快捷键用列表封装起来，用循环进行添加
file_name = ['新建(N)', '打开(O)', '保存(S)', '另存为(A)', '页面设置(U)', '打印(P)', '退出(X)']
file_name_as = ['new', 'open', 'save', 'save_as', 'setup', 'print', 'exit']
file_shortcut_key = ['Ctrl+N', 'Ctrl+O', 'Ctrl+S', '', '', 'Ctrl+P', '']
# 用循环将子菜单添加到菜单         
for i in range(len(file_name_as)):
     file_name_as[i] = QAction(QIcon('12.png'), file_name_as[i], self)
     file_name_as[i].setShortcut(file_shortcut_key[i])
     file_name_as[i].setText(file_name[i])
     # 将子菜单添加到菜单
     menu_item_name[0].addAction(file_name_as[i])
```

