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

/**
 * LeetCode-105. 从前序与中序遍历序列构造二叉树
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
// 1.抛开js indexOf 之类的函数
var buildTree = function (preorder, inorder) {
  // 先序遍历: 根 --> 左 --> 右
  // 中序遍历: 左 --> 根 --> 右
  // preorder[l1...r1] inorder[l2...r2] 的两段还原二叉树
  const build = (l1, r1, l2, r2) => {
    // 边界
    if (l1 > r1) return null
    // 在preorder中找根
    const root = new TreeNode(preorder[l1])
    // 在inorder中根据root, 找左右子树
    // 首先有了root在inorder中找root的位置
    let mid = l2
    while (inorder[mid] !== root.val) mid++
    // 左子树递归
    // 左子树的范围 [l1 + 1 ... mid - l2] 
    root.left = build(l1 + 1, l1 + (mid - l2), l2, mid - 1)
    // 右子树范围 [l1 + (mid - l2) + 1 ... r1] [mid+1...r2]
    root.right = build(l1 + (mid - l2) + 1, r1, mid + 1, r2)
    return root
  }
  return build(0, preorder.length - 1, 0, inorder.length - 1)
};

// 2.使用js indexOf 之类的函数
var buildTree = function (preorder, inorder) {
  // 先序遍历: 根 --> 左 --> 右
  // 中序遍历: 左 --> 根 --> 右
  // 边界
  if (!preorder.length || !inorder.length) return null
  const root = new TreeNode(preorder[0])
  const index = inorder.indexOf(preorder.shift())
  root.left = buildTree(preorder, inorder.slice(0, index)) // [0...index]
  root.right = buildTree(preorder, inorder.slice(index + 1)) // [index+1.. end]
  return root
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
  // 注意先遍历右子树，再遍历左子树
  root.right = buildTree(inorder.slice(index + 1), postorder)
  root.left = buildTree(inorder.slice(0, index), postorder)
  return root
};

/**
 * LeetCode-297. 二叉树的序列化与反序列化
 * 注意：一定要思考如何确定一棵树形态的方法，并且反序列化要尽量简单
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  const seqArr = []
  dfs(seqArr, root)
  return seqArr.join(',')
};
const dfs = (que = [], root) => {
  // 通过dfs看当前节点下一层是否存在左右节点，来确定tre形态
  // 比如题目先序：1 2 null null 3 4 null null 5 null null
  // 当然也可以通过中序存null的形式确定tre形态
  if (root === null) {
    que.push('null')
    return
  }
  que.push(root.val)
  dfs(que, root.left)
  dfs(que, root.right)
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  let curr = 0
  const deseqArr = data.split(',')
  const restore = () => {
    if (deseqArr[curr] === 'null') {
      curr++
      return null
    }
    const root = new TreeNode(deseqArr[curr])
    curr++
    root.left = restore()
    root.right = restore()
    return root
  }
  return restore()
};
