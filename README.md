# data-structure-leetcode
十周掌握数据结构与算法的运用，所有题解在代码仓库中

## 说明
* 这里只是将数据结构进行分类，针对每一类去解决一些算法题，做到举一反三
* 算法入门与进阶借鉴[极客时间](https://time.geekbang.org/)下
  * 王争老师的[数据结构与算法之类](https://time.geekbang.org/column/intro/100017301?tab=catalog)
  * 李煜东老师的算法训练营
  * 覃超老师的[算法通关](https://time.geekbang.org/search?q=%E7%AE%97%E6%B3%95%E9%9D%A2%E8%AF%95%E9%80%9A%E5%85%B340%E8%AE%B2)
* 关于数据结构的基础知识请移步到我的语雀文档[数据结构与算法分析](https://www.yuque.com/dianshijuhaoka/wl585k)

## week_1
### 数组
#### 过滤模式处理数组保序问题
* [合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)
* [删除有序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)
* [移动零](https://leetcode-cn.com/problems/move-zeroes/)
* [加一](https://leetcode-cn.com/problems/plus-one/)

#### 设计变长数组
##### 方案
* 初始一个空数组arr,分配常输空间，记录实际长度（size）和容量（capacity）
* push: 向数组尾部添加元素，如果空间不够，申请2倍大小的连续空间，拷贝到新空间，释放旧空间
* pop: 删除数组尾部最后一个元素，若空间利用率（size / capacity）不到25%,释放一半空间

##### 注意（思考点）
* 均摊复杂度O（1）
* 扩容为什么要申请执之前空间的2倍
* 收缩空间利用率为什么是不到25%
#### 结论
* 保证均摊复杂度O（1），防止连续push和pop操作，，导致连续copy数组元素

### 链表
#### 链表反转
* [单链表翻转](https://leetcode-cn.com/problems/reverse-linked-list/)
* [K个一组翻转链表](//leetcode-cn.com/problems/reverse-nodes-in-k-group/)

#### 链表合并
* [合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

#### 环形链表
* [环形链表-1](https://leetcode-cn.com/problems/linked-list-cycle/)
* [环形链表-2](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

### 栈与队列
#### 栈
* [有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)
* [最小栈](https://leetcode-cn.com/problems/min-stack/)
* [逆波兰表达式求值](https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/)
* [基本计算器（hard）](https://leetcode-cn.com/problems/basic-calculator/)

#### 单调栈
* [柱状图中最大的矩形（hard）](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)
* [最大矩形（hard）](https://leetcode-cn.com/problems/maximal-rectangle/)
* [接雨水](https://leetcode-cn.com/problems/trapping-rain-water/)
#### 单调队列
* [滑动窗口最大值](https://leetcode-cn.com/problems/sliding-window-maximum/)

## week_2
### 无序集合与映射
#### 无序集合
* [两数之和](https://leetcode-cn.com/problems/two-sum/description/)
* [字母异位词分组](https://leetcode-cn.com/problems/group-anagrams/)
* [模拟行走机器人](https://leetcode-cn.com/problems/walking-robot-simulation/)
* [串联所有单词的子串（hard）](https://leetcode-cn.com/problems/substring-with-concatenation-of-all-words/)
* [子域名访问计数](https://leetcode-cn.com/problems/subdomain-visit-count/)
* [数组的度](https://leetcode-cn.com/problems/degree-of-an-array/)

#### LRU
* [LRU 缓存机制](https://leetcode-cn.com/problems/lru-cache/)

#### 前缀和
* [统计「优美子数组」](https://leetcode-cn.com/problems/count-number-of-nice-subarrays/)
* [最大子序和](https://leetcode-cn.com/problems/maximum-subarray/)
* [和为 K 的子数组](https://leetcode-cn.com/problems/subarray-sum-equals-k/)

#### 双指针扫描
* [两数之和 II - 输入有序数组](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/)
* [盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/)
* [数组的度](https://leetcode-cn.com/problems/degree-of-an-array/)

## week_3
### 递归、分治、树、图
#### 递归
* [子集](https://leetcode-cn.com/problems/subsets/)
* [组合](https://leetcode-cn.com/problems/combinations/)
* [全排列](https://leetcode-cn.com/problems/permutations/)
* [全排列 II](https://leetcode-cn.com/problems/permutations-ii/)

#### 分治
* [求Pow(x, n)](https://leetcode-cn.com/problems/powx-n/)
* [括号生成](https://leetcode-cn.com/problems/generate-parentheses/)

#### 树的遍历
* [翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)
* [验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)
* [二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)
* [二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)
* [N 叉树的前序遍历](https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/)

#### 树的序列化
* [ 从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)
* [从中序与后序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)
* [二叉树的序列化与反序列化](https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/)