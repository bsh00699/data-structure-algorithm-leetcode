/**
 * LeetCode-701. 二叉搜索树中的插入操作
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
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  if (root === null) {
    return new TreeNode(val)
  }
  if (val > root.val) {
    root.right = insertIntoBST(root.right, val)
  } else {
    root.left = insertIntoBST(root.left, val)
  }
  return root
};

/**
 * LeetCode-面试题 04.06. 后继者
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
const getNext = (root, val) => {
  let curr = root
  let ans = null
  while (curr !== null) {
    if (curr.val === val) {
      // 该节点的右子树，一直往左走，就是大于p节点中的最小值
      if (curr.right) {
        ans = curr.right
        while (ans.left) {
          ans = ans.left
        }
      }
      break
    }
    if (val < curr.val) {
      // 没有找到 || 找到了 没有右子树
      if (ans === null || ans.val > curr.val) {
        ans = curr
      }
      curr = curr.left
    } else {
      curr = curr.right
    }
  }
  return ans
}
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
var inorderSuccessor = function (root, p) {
  return getNext(root, p.val)
};