# data-structure-leetcode
## 数组
### 过滤模式处理数组保序问题
* [合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)
* [删除有序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)
* [移动零](https://leetcode-cn.com/problems/move-zeroes/)
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

## 链表、
### 链表反转
* [单链表翻转](https://leetcode-cn.com/problems/reverse-linked-list/)
* [K个一组翻转链表](//leetcode-cn.com/problems/reverse-nodes-in-k-group/)