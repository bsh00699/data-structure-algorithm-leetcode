# data-structure-leetcode

## 说明
* 将数据结构进行分类学习，每一类能解决什么问题

## 数组
### 过滤模式处理数组保序问题
* [合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)
* [删除有序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)
* [移动零](https://leetcode-cn.com/problems/move-zeroes/)
* [加一](https://leetcode-cn.com/problems/plus-one/)

### 设计变长数组
#### 方案
* 初始一个空数组arr,分配常输空间，记录实际长度（size）和容量（capacity）
* push: 向数组尾部添加元素，如果空间不够，申请2倍大小的连续空间，拷贝到新空间，释放旧空间
* pop: 删除数组尾部最后一个元素，若空间利用率（size / capacity）不到25%,释放一半空间

#### 注意（思考点）
* 均摊复杂度O（1）
* 扩容为什么要申请执之前空间的2倍
* 收缩空间利用率为什么是不到25%
#### 结论
* 保证均摊复杂度O（1），防止连续push和pop操作，，导致连续copy数组元素

## 链表
### 链表反转
* [单链表翻转](https://leetcode-cn.com/problems/reverse-linked-list/)
* [K个一组翻转链表](//leetcode-cn.com/problems/reverse-nodes-in-k-group/)

### 链表合并
* [合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

### 环形链表
* [环形链表-1](https://leetcode-cn.com/problems/linked-list-cycle/)
* [环形链表-2](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

## 栈与队列
### 栈
* [有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)
* [最小栈](https://leetcode-cn.com/problems/min-stack/)
* [逆波兰表达式求值](https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/)
* [ 基本计算器（hard）](https://leetcode-cn.com/problems/basic-calculator/)

## 单调栈与单调队列
* 利用单调栈与单调队列主要是用来做一些算法优化，降低复杂度
### 单调栈
* [柱状图中最大的矩形（hard）](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)

------