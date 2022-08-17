---
title: javase用ActionListener添加窗口联动
tags:
categories:
  - 计算机科学
  - 编程语言
  - java
abbrlink: 73480a46
date: 2022-05-22 15:57:35
---



:::info

创建界面我是用windowBuilder的

:::





## 创建界面

不懂怎么创建可以看文章末尾

```java
import java.awt.EventQueue;
import javax.swing.JFrame;

public class Window_text {

	private JFrame frame;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					Window_text window = new Window_text();
					window.frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the application.
	 */
	public Window_text() {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		frame.setBounds(100, 100, 450, 300);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}

}

```

![](http://hikki.test.upcdn.net/202205230350.jpeg)

## 触发事件

```java
import java.awt.EventQueue;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JButton;
import javax.swing.JLabel;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Window_text {

	private JFrame frame;
	//新建面板
	public JPanel panel = new JPanel();

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					Window_text window = new Window_text();
					window.frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}
	
	/**
	 * Create the application.
	 */
	public Window_text() {
		initialize();
	}
	
	
	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		frame.setBounds(100, 100, 450, 300);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		
		//以下全是新增代码
		frame.getContentPane().setLayout(null);
		panel.setBounds(0, 0, 103, 263);
		frame.getContentPane().add(panel);
		panel.setLayout(null);
		
		JButton btnNewButton = new JButton("btn");
		btnNewButton.setBounds(0, 95, 97, 23);
		panel.add(btnNewButton);
		// 绑定事件
		btnNewButton.addActionListener(new B1());
	}
	
	/**
	 * 点击按钮触发的事件
	 * @author Lilbai518
	 *
	 */
	class B1 implements ActionListener{

		public void actionPerformed(ActionEvent e) {
			// TODO 自动生成的方法存根

			JPanel right = new JPanel();
			right.setBounds(104, 0, 332, 263);
			frame.getContentPane().add(right);
			right.setLayout(null);
			
			JLabel right_label = new JLabel("成功啦");
			right_label.setFont(new Font("楷体", Font.PLAIN, 28));
			right_label.setBounds(91, 88, 193, 61);
			right.add(right_label);
			right_label.setLayout(null);
		}
	}	
}

```

![](http://hikki.test.upcdn.net/202205230401.jpeg)

## 如何新建`WindowBuilder`

如何你还没安装`WindowBuilder`的话，先去安装再来打开

![](http://hikki.test.upcdn.net/202205231146.jpeg)



![](http://hikki.test.upcdn.net/202205231157.jpeg)



![](http://hikki.test.upcdn.net/202205231208.jpeg)



![](http://hikki.test.upcdn.net/202205231212.jpeg)
