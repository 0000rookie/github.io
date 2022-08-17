---
title: python qt5 实现记事本界面
tags:
  - Python
categories:
  - 计算机科学
  - 编程语言
  - python
description: 
  - python
  - qt5
  - python qt5记事本
abbrlink: 37c8254d
date: 2022-04-25 00:43:20
---

## 用qt5实现一个简单的记事本界面

要求：实现有`Menubar`和`Menuitems`和快捷键

````python mark:1-100
import sys

from PyQt5.QtGui import QCursor, QIcon
from PyQt5.QtWidgets import QApplication, QMenu, QMainWindow, QAction


class menu(QMainWindow):
    # 初始化面板大小
    def __init__(self):
        super(menu, self).__init__()
        self.title = 'notepad--'
        self.left = 500
        self.top = 1000
        self.width = 600
        self.height = 600
        self.initUI()


    def initUI(self):
        self.setWindowTitle(self.title)
        self.setGeometry(self.top, self.left, self.width, self.height)
        # 实例化菜单条
        mainMenubar = self.menuBar()
        
        # 将 menuitems添加到menubar并命名
        menu_item_name = ['fileMenu', 'editMenu', 'formatMenu', 'searchMenu', 'helpMenu']
        menu_item_bar_name = ['文件', '编辑', '格式', '查看', '帮助']
        for l in range(len(menu_item_name)):
            menu_item_name[l] = mainMenubar.addMenu(menu_item_bar_name[l])

        # 将操作名、属性名、快捷键用列表封装起来，用循环进行添加，此处有不足之处就是循环不能合一，后续有能力再优化一下
        file_name = ['新建(N)', '打开(O)', '保存(S)', '另存为(A)', '页面设置(U)', '打印(P)', '退出(X)']
        file_name_as = ['new', 'open', 'save', 'save_as', 'setup', 'print', 'exit']
        file_shortcut_key = ['Ctrl+N', 'Ctrl+O', 'Ctrl+S', '', '', 'Ctrl+P', '']

        edit_name = ['撤销(U)', '剪切(T)', '复制(C)', '粘贴(V)', '删除(L)', '查找(F)', '查找下一个(N)', '替换(R)', '转到(G)', '全选(A)',
                     '时间/日期(D)']
        edit_name_as = ['repeal', 'cut', 'copy', 'paste', 'dele', 'search', 'search_one', 'replace', 'goto',
                        'check_all', 'datetimes']
        edit_shortcut_key = ['Ctrl+Z', 'Ctrl+X', 'Ctrl+C', 'Ctrl+V', 'Del', 'Ctrl+F', 'F3', 'Ctrl+H', 'Ctrl+G',
                             'Ctrl+A', 'F5']

        format_name = ['自动换行(W)', '字体(F)']
        format_name_as = ['lines', 'font']
        format_shortcut_key = ['', '']

        search_name = ['状态栏(S)']
        search_name_as = ['statusbar']
        search_shortcut_key = ['']

        help_name = ['查看帮助(H)', '关于记事本(A)']
        help_name_as = ['lookhelp', 'about']
        help_shortcut_key = ['', '']

        # 用循环将子菜单添加到菜单
        for i in range(len(file_name_as)):
            file_name_as[i] = QAction(QIcon('12.png'), file_name_as[i], self)
            file_name_as[i].setShortcut(file_shortcut_key[i])
            file_name_as[i].setText(file_name[i])
            # 将子菜单添加到菜单
            menu_item_name[0].addAction(file_name_as[i])

        for i in range(len(edit_name_as)):
            edit_name_as[i] = QAction(QIcon('12.png'), edit_name_as[i], self)
            edit_name_as[i].setShortcut(edit_shortcut_key[i])
            edit_name_as[i].setText(edit_name[i])
            # 将子菜单添加到菜单
            menu_item_name[1].addAction(edit_name_as[i])

        for i in range(len(format_name_as)):
            format_name_as[i] = QAction(QIcon('12.png'), format_name_as[i], self)
            format_name_as[i].setShortcut(format_shortcut_key[i])
            format_name_as[i].setText(format_name[i])
            # 将子菜单添加到菜单
            menu_item_name[2].addAction(format_name_as[i])

        for i in range(len(search_name_as)):
            search_name_as[i] = QAction(QIcon('12.png'), search_name_as[i], self)
            search_name_as[i].setShortcut(search_shortcut_key[i])
            search_name_as[i].setText(search_name[i])
            # 将子菜单添加到菜单
            menu_item_name[3].addAction(search_name_as[i])

        for i in range(len(help_name_as)):
            help_name_as[i] = QAction(QIcon('12.png'), help_name_as[i], self)
            help_name_as[i].setShortcut(help_shortcut_key[i])
            help_name_as[i].setText(help_name[i])
            # 将子菜单添加到菜单
            menu_item_name[4].addAction(help_name_as[i])

        self.show()


if __name__ == '__main__':
    app = QApplication(sys.argv)
    s = menu()
    sys.exit(app.exec_())

````

**预览图**

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/Hexoimgs/2022044946.jpeg)
