/**
 * LeetCode-130. 被围绕的区域
 */
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
  const m = board.length;
  if (m == 0) { return };
  const n = board[0].length;
  const map = {};
  const dfs = (i, j) => {
    // 越界、标示过或者非相连O下return
    if (i < 0 || j < 0 || i == m || j == n || board[i][j] != 'O' || map[`${i}_${j}`]) {
      return;
    }
    map[`${i}_${j}`] = true;
    dfs(i - 1, j);
    dfs(i + 1, j);
    dfs(i, j - 1);
    dfs(i, j + 1);
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 从边缘O出发寻找其相连点都标示为不可替换
      if ((i == 0 || j == 0 || i == m - 1 || j == n - 1) && board[i][j] == 'O') {
        dfs(i, j);
      }
    }
  }
  // 规避边界条件去循环
  for (let i = 1; i < m - 1; i++) {
    for (let j = 1; j < n - 1; j++) {
      if (!map[`${i}_${j}`] && board[i][j] == 'O') {
        board[i][j] = 'X';
      }
    }
  }
};

/**
 * LeetCode-538. 把二叉搜索树转换为累加树
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
 * @return {TreeNode}
 */
const convertBST = root => {
  let sum = 0;
  const myOrder = root => {
      if (!root) return;
      // 右--> 根 --> 左 遍历顺序
      // 右
      myOrder(root.right);
      // 根
      sum += root.val;
      root.val = sum;
      // 左
      myOrder(root.left);
  };
  myOrder(root);
  return root;
};