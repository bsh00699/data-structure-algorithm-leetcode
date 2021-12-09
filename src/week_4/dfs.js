/**
 * LeetCode-17. 电话号码的字母组合
 * 方法：dfs
 */
/**
 * @param {string} digits
 * @return {string[]}
 */
const ALPHABET_MAP = {
  '2': 'abc',
  '3': 'def',
  '4': 'ghi',
  '5': 'jkl',
  '6': 'mno',
  '7': 'pqrs',
  '8': 'tuv',
  '9': 'wxyz',
}
var letterCombinations = function (digits) {
  const len = digits.length
  if (!len) return []
  const ans = []
  const dfs = (index, str) => {
    // 边界
    if (index === len) {
      ans.push(str)
      return ans
    }
    for (const ch of ALPHABET_MAP[digits[index]]) {
      dfs(index + 1, str + ch)
    }
  }
  dfs(0, '')
  return ans
};

/**
 * LeetCode-51. N 皇后
 * 方法：排列 + dfs
 */
/**
* @param {number} n
* @return {string[][]}
*/
var solveNQueens = function (n) {
  // 实质：排列问题
  // 将皇后位置（即 列号）排列，条件：皇后所在位置的 行列，对角线具备攻击
  // 避免列: 当前列号元素是否被使用 
  // 避免对角线: row - col && row + col 元素是否被使用
  const used = {}
  const usedPlus = {} // 对角线加 row + col
  const usedMinus = {} // 对角线减 row - col
  const arr = [] // 列号的排列
  const ans = []
  const dfs = (row) => {
    // 边界
    if (row === n) {
      ans.push([...arr])
      return
    }
    for (let col = 0; col <= n - 1; col++) {
      if (!used[col] && !usedPlus[row + col] && !usedMinus[row - col]) {
        arr.push(col)
        used[col] = true
        usedPlus[row + col] = true
        usedMinus[row - col] = true
        dfs(row + 1)
        used[col] = false
        usedPlus[row + col] = false
        usedMinus[row - col] = false
        arr.pop()
      }
    }
  }
  dfs(0)
  // ans-- [ [ 1, 3, 0, 2 ], [ 2, 0, 3, 1 ] ]
  // 输出答案
  for (const i in ans) {
    const p = ans[i]
    for (const j in p) {
      const temp = new Array(n).fill('.')
      const colVal = p[j]
      temp[colVal] = 'Q'
      ans[i][j] = temp.join('')
    }
  }
  return ans
};

/**
 * LeetCode-200. 岛屿数量
 * 方法：1.dfs 2.bfs 
 */
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const m = grid.length
  if (!m) return 0
  const n = grid[0].length
  let ans = 0
  // dfs 实现
  const dfs = (i, j) => {
    // 临界条件 越界 || 遇水
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === '0') return;
    // if (grid[i][j] === '0' || i < 0 || i >= m || j < 0 || j >= n) return
    // 访问过的地方变为 '0'
    grid[i][j] = '0'
    // 向四个方向继续查找确认
    dfs(i + 1, j) // 右
    dfs(i - 1, j) // 左
    dfs(i, j + 1) // 上
    dfs(i, j - 1) // 下
  }
  // 遍历矩阵
  for (let i = 0; i <= m - 1; i++) {
    for (let j = 0; j <= n - 1; j++) {
      //深搜找陆地 即 grid[i][j] === '1'
      if (grid[i][j] === '1') {
        dfs(i, j)
        ans++
      }
    }
  }
  return ans
};