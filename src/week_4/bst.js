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

/**
 * LeetCode-450. 删除二叉搜索树中的节点
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
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  if (root === null) return null
  if (root.val === key) {
    // 只存在一个节点, 直接用该节点替换key对应的节点
    if (root.left === null) return root.right
    if (root.right === null) return root.left
    // 存在两个节点，找当前节点的后继节点，然后相互替换，在删除后继节点
    let next = root.right
    while (next.left) {
      next = next.left
    }
    // 删除后继节点
    root.right = deleteNode(root.right, next.val)
    // 后继节点next替换当前节点
    root.val = next.val
    return root
  }
  if (key < root.val) {
    root.left = deleteNode(root.left, key)
  } else {
    root.right = deleteNode(root.right, key)
  }
  return root
};