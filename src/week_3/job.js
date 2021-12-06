/**
 * LeetCode-23. 合并K个升序链表
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
// 方法1：将链表的值全部存到一个数组中，再利用数组的sort方法来升序排列，然后将值放到一个新链表中即可
var mergeKLists = function (lists) {
  const list = [];
  for (let i = 0; i < lists.length; i++) {
    let node = lists[i];
    while (node) {
      list.push(node.val);
      node = node.next;
    }
  }
  list.sort((a, b) => a - b);
  const res = new ListNode();
  let curr = res;
  for (let i = 0; i < list.length; i++) {
    curr.next = new ListNode(list[i]);
    curr = curr.next;
  }
  return res.next;
};

//方法2：分治：转化为合并2个有序链表/数组
const mergeTwo = (l1, l2) => {
  // 开启保护节点
  const head = new ListNode(-1)
  let curr = head
  while (l1 !== null && l2 !== null) {
    if (l1.val < l2.val) {
      curr.next = l1
      // 更新l1
      l1 = l1.next
    } else {
      curr.next = l2
      // 更新l2
      l2 = l2.next
    }
    // 更新curr
    curr = curr.next
  }
  // 可能存在链表没被遍历完，需要将没有遍历完的链表，拼接到后面（因为它本身是有序的）
  curr.next = l1 !== null ? l1 : l2
  return head.next
}

const merge = (lists, start, end) => {
  // 临界点
  if (start === end) return lists[start]
  const mid = Math.floor(start, end)
  const l1 = merge(lists, start, mid)
  const l2 = merge(lists, mid + 1, end)
  // 转化为合并2个有序链表/数组
  return mergeTwo(l1, l2)
}

var mergeKLists = function (lists) {
  // 分治：转化为合并2个有序链表/数组
  // k个链表两两配对，进行第一轮合并，结束后变成 k/2 个链表
  // k/2个链表依然两两配对，进行第二轮合并，结束后k/2个链表被合并成k/4个链表
  // 重复上述过程，进行log(k)次合并，完成总体合并工作
  if (!lists.length) return null
  return merge(lists, 0, lists.length - 1)
};

// 方法3：循环合并
var mergeKLists = function (lists) {
  let ans = null
  for (let i = 0; i <= lists.length - 1; i++) {
    ans = mergeTwo(ans, lists[i])
  }
  return ans
};

/**
 * LeetCode-47. 全排列 II
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  // 与 46解题思想一致 n! 思想: 一共有n个位置，考虑每个位置放什么数，从还  没有选过的数 里面选一个 
  // 只不过这里需要 map 记录已经排序，并且元素顺序一致的数组
  const len = nums.length
  const ans = []
  const arr = [] // 排列数
  const map = {} // 记录已经排序，并且元素顺序一致的数组
  const used = [] // 每个位置的数是否被选择
  const recur = (nums, pos) => {
    // 边界
    if (pos === len) {
      const key = arr.join('')
      if (!map[key]) {
        ans.push([...arr])
        map[key] = true
      }
      return
    }
    for (let i = 0; i <= len - 1; i++) {
      if (!used[i]) {
        // 没选
        arr.push(nums[i])
        used[i] = true
        // 下一个数
        recur(nums, pos + 1)
        // 还原现场
        used[i] = false
        arr.pop()
      }
    }
  }
  recur(nums, 0)
  return ans
};

/**
 * LeetCode-106. 从中序与后序遍历序列构造二叉树
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  // 中序遍历 左 --> 根 --> 右
  // 后序遍历 左 --> 右 --> 根
  if (!inorder.length || !postorder.length) return null
  const root = new TreeNode(postorder[postorder.length - 1])
  const index = inorder.indexOf(postorder.pop())
  // slice 返回一个新的数组，包含从 start 到 end （不包括该元素）
  // 注意与先序与中序遍历不同，这里需要先遍历右子树在遍历左子树
  root.right = buildTree(inorder.slice(index + 1), postorder)
  root.left = buildTree(inorder.slice(0, index), postorder)
  return root
};
