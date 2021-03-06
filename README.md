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
* [矩阵置零](https://leetcode-cn.com/problems/set-matrix-zeroes/)

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
* [三数之和](https://leetcode-cn.com/problems/3sum/)
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

## week_4
### 深度优先搜索、广度优先搜索、二叉堆、二叉搜索树
#### DFS(深度优先搜索)
* [电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)
* [N 皇后](https://leetcode-cn.com/problems/n-queens/)
* [岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)

#### BFS(广度优先搜索)
* [最小基因变化](https://leetcode-cn.com/problems/minimum-genetic-mutation/)
* [岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)
* [课程表](https://leetcode.cn/problems/course-schedule/)
* [课程表2](https://leetcode.cn/problems/course-schedule-ii/)
* [矩阵中最长递增路径](https://leetcode.cn/problems/longest-increasing-path-in-a-matrix/)

#### 二叉堆
* [合并K个升序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)

#### 二叉搜索树
* [二叉搜索树中的插入操作](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/)
* [后继者](https://leetcode-cn.com/problems/successor-lcci/)
* [删除二叉搜索树中的节点](https://leetcode-cn.com/problems/delete-node-in-a-bst/)

## week_5
### 二分、排序
#### 二分查找
* [二分查找](https://leetcode-cn.com/problems/binary-search/)
* [在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)
* [Sqrt(x)](https://leetcode-cn.com/problems/sqrtx/)

#### 三分查找
* [寻找峰值](https://leetcode-cn.com/problems/find-peak-element/)

#### 二分答案
* [猜数字大小](https://leetcode-cn.com/problems/guess-number-higher-or-lower/)
* [分割数组的最大值](https://leetcode-cn.com/problems/split-array-largest-sum/)
* [制作m束花所需的最少天数](https://leetcode-cn.com/problems/minimum-number-of-days-to-make-m-bouquets/)
* [在D天内送达包裹的能力](https://leetcode-cn.com/problems/capacity-to-ship-packages-within-d-days/)
* [在线选举](https://leetcode-cn.com/problems/online-election/)
* [爱吃香蕉的珂珂](https://leetcode-cn.com/problems/koko-eating-bananas/)

#### 排序
* [排序数组](https://leetcode-cn.com/problems/sort-an-array/)
* [合并区间](https://leetcode-cn.com/problems/merge-intervals/)
* [数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)
* [数组的相对排序](https://leetcode-cn.com/problems/relative-sort-array/)
* [翻转对](https://leetcode-cn.com/problems/reverse-pairs/)

## week_6
### 贪心、动态规划
#### 贪心
* [爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/description/)
* [分发饼干](https://leetcode-cn.com/problems/assign-cookies/)
* [买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)
* [柠檬水找零](https://leetcode-cn.com/problems/lemonade-change/description/)
* [跳跃游戏 II](https://leetcode-cn.com/problems/jump-game-ii/)
#### 动态规划
* [零钱兑换](https://leetcode-cn.com/problems/coin-change/)
* [不同路径 II](https://leetcode-cn.com/problems/unique-paths-ii/)
* [最长公共子序列](https://leetcode-cn.com/submissions/detail/252251924/)
* [最长递增子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)
* [最长递增子序列的个数](https://leetcode-cn.com/problems/number-of-longest-increasing-subsequence/)
* [最大子数组和](https://leetcode-cn.com/problems/maximum-subarray/)
* [乘积最大子数组](https://leetcode-cn.com/problems/maximum-product-subarray/)
* [三角形最小路径和](https://leetcode-cn.com/problems/triangle/)

## week_7
#### 动态规划
* [买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)
* [买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)
* [买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/)
* [买卖股票的最佳时机 IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/)
* [买卖股票的最佳时机含手续费](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)
* [最佳买卖股票时机含冷冻期](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

* [打家劫舍](https://leetcode-cn.com/problems/house-robber/)
* [打家劫舍 II](https://leetcode-cn.com/problems/house-robber-ii/)
* [编辑距离](https://leetcode-cn.com/problems/edit-distance/)
* [零钱兑换 II](https://leetcode-cn.com/problems/coin-change-2/)

* [完全平方数](https://leetcode-cn.com/problems/perfect-squares/submissions/)
* [跳跃游戏](https://leetcode-cn.com/problems/jump-game/)

* [环形子数组的最大和](https://leetcode-cn.com/problems/maximum-sum-circular-subarray/)

## week_8
### 字典树、并集、图论算法
#### 字典树
* [实现 Trie (前缀树)](https://leetcode-cn.com/problems/implement-trie-prefix-tree/)
* [单词搜索 II](https://leetcode-cn.com/problems/word-search-ii/)

#### 并集
* [省份数量](https://leetcode-cn.com/problems/number-of-provinces/)
#### 最短路径
* [网络延迟时间](https://leetcode-cn.com/problems/network-delay-time/)

## week_9
#### 字符串处理
* [字符串转换整数 (atoi)](https://leetcode-cn.com/problems/string-to-integer-atoi/)
* [实现 strStr()](https://leetcode-cn.com/problems/implement-strstr/)
* [验证回文串](https://leetcode-cn.com/problems/valid-palindrome/)
* [验证回文字符串 Ⅱ](https://leetcode-cn.com/problems/valid-palindrome-ii/)
* [最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)
#### 搜索剪枝
* [括号生成](https://leetcode-cn.com/problems/generate-parentheses/)

#### 数独
* [有效的数独](https://leetcode-cn.com/problems/valid-sudoku/)
* [解数独](https://leetcode-cn.com/problems/sudoku-solver/)
## week_10
#### 位运算
* [位1的个数](https://leetcode-cn.com/problems/number-of-1-bits/)
* [Pow(x, n)](https://leetcode-cn.com/problems/powx-n/)
* [只出现一次的数字](https://leetcode-cn.com/problems/single-number/)
