// LeetCode-66. 加一
// 方法：利用数组进行遍历，然后考虑进位的值，比如 9，加 1 就需要进位

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

// LeetCode-21. 合并两个有序链表
// 方法：①原地算法，空间复杂度为O（1）， ②创建新的链表
// 思路：原地算法： 遍历双链表，比较节点值大小，通过新建节点指针，完成有序链表的穿引
//      新建链表： 遍历双链表，比较节点值大小，放入新链表
        
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
var mergeTwoLists = function(l1, l2) {
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