
// LeetCode-206. 反转链表
// 方法：
// 1.迭代
// 2.递归
var reverseList = function(head) {
  // 迭代实现
  let prev = null // 刚开始头结点值为 null
  let curr = head
  while (curr !== null) {
    let tempNext = curr.next // 先把下一个结点存起来
    // 反转
    curr.next =  prev
    // 移动prev 和 curr 结点
    prev = curr // prev 移到 curr 结点位置
    curr = tempNext // curr 移到 next 结点位置
  }
  return prev
};

