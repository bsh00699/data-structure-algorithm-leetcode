/**
 * LeetCode-226. 翻转二叉树
 * 方法：递归
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (root === null) return null
  const temp = root.left
  root.left = root.right
  root.right = temp
  invertTree(root.left)
  invertTree(root.right)
  return root
};

/**
 * LeetCode-98. 验证二叉搜索树
 * 方法：递归
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  // -Infinity: 负无穷 +Infinity: 正无穷
  return check(root, -Infinity, Infinity)
};
// rangeLeft：代表最小值 rangeRight：代表最大值 
const check = (root, rangeLeft, rangeRight) => {
  if (root === null) return true
  // 正常情况 root.val > rangeLeft && root.val < rangeRight
  if (root.val <= rangeLeft || root.val >= rangeRight) return false
  // check 左右子树
  return check(root.left, rangeLeft, root.val) && check(root.right, root.val, rangeRight)
}

/**
 * LeetCode-104. 二叉树的最大深度
 * 方法：递归
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  // 递归到边界，然后再返回
  // 边界
  if (root === null) return 0
  // 返回左右子树高度的最大值
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};