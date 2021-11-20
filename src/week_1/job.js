/**
 * LeetCode-66. 加一
 * 方法：利用数组进行遍历，然后考虑进位的值，比如 9，加 1 就需要进位
 */
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  let index = digits.length - 1
  while (index >= 0) {
    if (digits[index] !== 9) {
      digits[index]++
      index--
      return digits
    } else {
      // 进位
      digits[index] = 0
      index--
    }
  }
  // 如果遍历完了还没 return digits，则说明每个值
  // 都进位了，需要在 高位 补1，然后返回 数组
  return [1, ...digits]
};

/**
 * LeetCode-21. 合并两个有序链表
 * 方法：①原地算法，空间复杂度为O（1）， ②创建新的链表,空间复杂度为O（n）
 * 原地算法： 遍历双链表，比较节点值大小，通过新建节点指针，完成有序链表的穿引
 * 新建链表： 遍历双链表，比较节点值大小，放入新链表
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  //原地算法
  let head = new ListNode(-1)
  let curr = head
  while (l1 !== null && l2 !== null) {
    if (l1.val < l2.val) {
      curr.next = l1
      // 更新l1
      l1 = l1.next
    } else {
      curr.next = l2
      l2 = l2.next
    }
    // 更新curr
    curr = curr.next
  }
  // 可能存在链表没被遍历完，需要将没有遍历完的链表，拼接到后面（因为它本身是有序的）
  curr.next = l1 !== null ? l1 : l2
  return head.next
};

/**
 * LeetCode-641. 设计循环双端队列
 * 1.数组实现
 * ①：完全套用js现存的接口 unshift shift push pop 映射到题目中去，不过达不到该题的意义
 * ②：采用循环队列思想，队满条件：(tail+1)%n=head
 */

/**
 * @param {number} k
 */
var MyCircularDeque = function (k) {
  this.len = k + 1
  this.head = 0
  this.tail = 0
  this.arr = new Array(k + 1)
};

/** 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function (value) {
  // 左边入队 head--
  if (this.isFull()) return false
  this.head = (this.head - 1 + this.len) % this.len
  this.arr[this.head] = value
  return true
};

/** 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function (value) {
  // 右边入队 tail++
  if (this.isFull()) return false
  this.arr[this.tail] = value
  this.tail = (this.tail + 1) % this.len
  return true
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function () {
  if (this.isEmpty()) return false
  this.head = (this.head + 1) % this.len
  return true
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function () {
  if (this.isEmpty()) return false
  this.tail = (this.tail - 1 + this.len) % this.len
  return true
};

/**
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function () {
  if (this.isEmpty()) return -1
  return this.arr[this.head]
};

/**
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function () {
  if (this.isEmpty()) return -1
  return this.arr[(this.tail - 1 + this.len) % this.len]
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function () {
  return this.head === this.tail
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function () {
  return (this.tail + 1) % this.len === this.head
};

/**
 * 柱状图中最大的矩形
 */
var largestRectangleArea = function (heights) {
  heights.push(0) // 确保stack中单调递增的柱子被弹空
  let stack = [] // 存放key为 width height的对象
  let areaMax = 0
  for (let i = 0; i <= heights.length - 1; i++) {
    let elasticWidth = 0
    const height = heights[i]
    // 当下一个柱子的高度不满足单调性，删除栈顶项，更新最大面积
    while (stack.length && stack[stack.length - 1].height >= height) {
      // 因为elasticWidth初始是 0
      elasticWidth += stack[stack.length - 1].width
      areaMax = Math.max(areaMax, stack[stack.length - 1].height * elasticWidth)
      stack.pop()
    }
    stack.push({
      width: elasticWidth + 1,
      height,
    })
  }
  return areaMax
};

/**
 * LeetCode-85. 最大矩形
 */
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
  if (!matrix.length || !matrix[0].length) return 0
  const rows = matrix.length
  const cols = matrix[0].length
  let res = 0
  for (let i = 0; i <= rows - 1; i++) {
    for (let j = 0; j <= cols - 1; j++) {
      // 顺便转为 number
      matrix[i][j] = parseInt(matrix[i][j])
      if (i > 0 && matrix[i][j] === 1) { //i > 0 从第二行开始统计高度
        // 转变为存储每一维度的柱形高度, 从上到下迭代高度即可
        matrix[i][j] = parseInt(matrix[i - 1][j]) + 1
      }
    }
  }
  // 转化为柱状图中最大矩形求解
  for (let k = 0; k <= matrix.length - 1; k++) {
    res = Math.max(res, largestRectangleArea(matrix[k]))
  }
  return res
};