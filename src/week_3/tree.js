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

/**
 * LeetCode-94. 二叉树的中序遍历
 * 方法：递归
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
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const ans = []
  const dfs = (root) => {
    if (root === null) return
    // 中序遍历 左 --> 根 --> 右
    dfs(root.left)
    ans.push(root.val)
    dfs(root.right)
  }
  dfs(root)
  return ans
};

/**
 * LeetCode-94. 二叉树的中序遍历
 * 方法：①递归 ②迭代
 */
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node|null} root
 * @return {number[]}
 */
var preorder = function (root) {
  // 递归实现
  const ans = []
  const dfs = (root) => {
    // 边界条件
    if (root === null) return
    // 先序遍历：先跟 --> 所有孩子
    ans.push(root.val)
    // 遍历每个孩子节点
    for (const node of root.children) {
      dfs(node)
    }
  }
  dfs(root)
  return ans
};

var preorder = function (root) {
  // 迭代法实现
  const ans = []
  if (root === null) return ans
  // 利用栈结构；放数据的时候 倒着放，比如 取出是 3 2 4，放的时候要 4 2 3
  const stack = []
  stack.push(root)
  while (stack.length) {
    const node = stack.pop()
    ans.push(node.val)
    // 入栈
    const len = node.children.length
    for (let i = len - 1; i >= 0; i--) {
      stack.push(node.children[i])
    }
  }
  return ans
};