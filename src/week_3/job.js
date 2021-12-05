/**
 * LeetCode-23. 合并K个升序链表
 * 方法：将链表的值全部存到一个数组中，再利用数组的sort方法来升序排列，然后将值放到一个新链表中即可
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
var buildTree = function(inorder, postorder) {
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