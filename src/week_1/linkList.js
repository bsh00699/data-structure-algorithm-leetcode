
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

// LeetCode-25. K 个一组翻转链表
// 说明：
// 组内反转后，链表就断开了啊， 比如 1 ---> 2 --->3 ---> 4 ,  k= 2, 当 end 是2时，  翻转后 1 <--- 2   3 --->  4 ,链表断开
// 为了 保证链表连续吧，  需要把 翻转后的子链表的 head (1) 指向 ，下一个节点end.next （3），也就是   1 ---> 3
// 即 head.next = nextGroupHead 

// 同理在 节点 1 之前 有个 last（=new ListNode(0, head）） 节点，像这样 last ---> 1 ---> 2 ---> 3
// 翻转后 last ,  2 ---> 1 --->  3 --->  4 ,last 节点与后面就断开了，为了保证连续，需要将 last 指向组内翻转后的表头节点 2
// 也就是  last --->2 ---> 1 --->  3 --->  4 即  last.next = end

// 然后去找下一组，更新 last 和 head
// last 就更新到 1 节点位置  即 last = head
// head 就更新到 2（end）节点 的下一个节点位置，即 head = end.next
// 继续上面的操作即可
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */

const getEnd = (head, k) => {
  let curr = head
  while (curr !== null) {
    k-- // 一定先执行 k--
    if (k === 0) return curr
    curr = curr.next
  }
  // curr === null 不够 k 个节点
  return null
}

const reverseList = (head, stop) => {
  let prev = head
  let curr = head.next
  while (curr !== stop) {
    // 临时暂存 下一个节点
    let tempNext = curr.next
    // 翻转
    curr.next = prev
    prev = curr
    curr = tempNext
  }
}

var reverseKGroup = function(head, k) {
  let protect = new ListNode(0, head)
  let prev = protect
  while (head !== null) {
    // 1. 分组，向后走 k-1 步找到一组
    // 比如示例分组为 1，2返回 2 节点位置
    let end = getEnd(head, k)
    // end === null 最后一组不够 k 个,所以不用翻转，直接挑出就好
    if (end === null) break
    let nextGroupHead = end.next
    // 2. 组内翻转
    reverseList(head, nextGroupHead)
    // 3. 处理组与组之间的头尾关系
    prev.next = end
    head.next = nextGroupHead 

    // 更新位置
    prev = head
    head = nextGroupHead
  }
  return protect.next
};


// LeetCode-141. 环形链表
// 说明：通过设置快慢指针，遍历链表，看他们的值是否相等，来确定链表是否是环形
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
  // 快慢指针找环问题
  // head: 慢指针
  // fast: 快指针
  let curr = head
  let fast = head
  while (fast!== null && fast.next !== null) { // fast.next === null 链表尾节点，无环
    // 更新curr fast 节点
    curr = curr.next
    fast = fast.next.next
    if (curr === fast) return true
  }
  return false
};

// LeetCode-142. 环形链表
// 注意: 找到相遇节点此时 此时从head --> start 和 meet --> start 相差环的整数倍
// 只需同时移动head meet 直到他们相遇即可（都是慢指针）
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
  // 快慢指针找环问题
  // head: 慢指针
  // fast: 快指针
  let curr = head
  let fast = head
  while (fast!== null && fast.next !== null) {
    // 更新curr fast 节点
    curr = curr.next
    fast = fast.next.next
    if (curr === fast) {
      // 注意：此时从head --> start 和 curr --> start 相差环的整数倍
      // 只需同时移动head curr 直到他们相遇即可（都是慢指针）
      while (head !== curr) {
        head = head.next
        curr = curr.next
      }
      return head
    }
  }
  return null
};