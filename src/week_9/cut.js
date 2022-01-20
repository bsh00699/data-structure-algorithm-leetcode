// 搜索剪枝

/**
 * LeetCode-22. 括号生成
 */
/**
 * @param {number} n
 * @return {string[]}
 */
const isValid = (s) => {
  const strArr = s.split('')
  let left = 0
  for (const ch of strArr) {
    if (ch === '(') {
      left++
    } else {
      if (left <= 0) return false
      left--
    }
  }
  return left === 0
}
const dfs = (n, s, ans) => {
  if (s.length == 2 * n) {
    if (isValid(s)) {
      ans.push(s);
    }
    return;
  }
  dfs(n, s + "(", ans);
  dfs(n, s + ")", ans);
}

var generateParenthesis = function (n) {
  const s = ''
  const ans = []
  dfs(n, s, ans)
  return ans
};

// 记忆函数，避免值重复计算
// const memorize = (fn) => {
//   let cache = {}
//   return (...args) => {
//     const key = args.length + args.join('')
//     const temp = cache[key] 
//     if (temp) return temp
//     cache[key] = fn.apply(this, args)
//   }
// }
// const func = memorize(generateParenthesis)
var generateParenthesis = function (n) {
  // 找划分点
  /**
  1.外层固定一个括号，里面随便分
  ((()))
  (()())
  2.确定分界点,里面随便分
  (())() ()(())
  避免统计重复，需要分段划分, 当n=3时如下
  S  (A)  B
  n  k-1 n-k
  k=1 A=0对括号 ()    B=2对括号 ()() (())
      总组合 ()()() ()(())
  k=2 A=1对括号 (())  B=1对括号 ()
      总组合 (())()
  k=3 A=2对括号 (()()) ((())) B=0对括号 空
      总组合 (()()) ((()))
  */
  // 递归出口
  if (n === 0) return [''] // 没有括号的话就返回空字符串
  // 注意题目 n 范围小，如果范围很大，需要用到函数记忆
  const store = {}
  const ans = []
  if (store[n]) return store[n]
  for (let k = 1; k <= n; k++) {
    let A = generateParenthesis(k - 1)
    let B = generateParenthesis(n - k)
    // A B 两数组值组合排列
    for (const a of A) {
      for (const b of B) {
        ans.push(`(${a})${b}`)
      }
    }
  }
  store[n] = ans
  return ans
};

// 数独
/**
 * LeetCode-36. 有效的数独
 */
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  /**
  行 列 3x3矩阵，分别用3个Set() 集合表示
  枚举每个元素，判断在集合中是否存在
   */
  const rowMap = new Map()
  const colMap = new Map()
  const boxMap = new Map()
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const digit = board[i][j]
      if (digit === '.') continue
      // 行
      if (!rowMap.has(i)) {
        rowMap.set(i, new Set([digit]))
      } else {
        const rowSet = rowMap.get(i)
        if (rowSet.has(digit)) return false
        rowSet.add(digit)
        // 更新当前行 set 集合
        rowMap.set(i, rowSet)
      }
      // 列
      if (!colMap.has(j)) {
        colMap.set(j, new Set([digit]))
      } else {
        const colSet = colMap.get(j)
        if (colSet.has(digit)) return false
        colSet.add(digit)
        colMap.set(j, colSet)
      }
      // 3x3矩阵坐标
      // 二维降一维 (x, y) => x*row + y
      let k = Math.floor(i / 3) * 3 + Math.floor(j / 3)
      if (!boxMap.has(k)) {
        boxMap.set(k, new Set([digit]))
      } else {
        const boxSet = boxMap.get(k)
        if (boxSet.has(digit)) return false
        boxSet.add(digit)
        // 更新当前行 set 集合
        boxMap.set(k, boxSet)
      }
    }
  }
  return true
};

/**
 * LeetCode-37. 解数独
 */
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var isValidSudoku = function (board) {
  /**
  行 列 3x3矩阵，分别用3个Set() 集合表示
  枚举每个元素，判断在集合中是否存在
   */
  const rowMap = new Map()
  const colMap = new Map()
  const boxMap = new Map()
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const digit = board[i][j]
      if (digit === '.') continue
      // 行
      if (!rowMap.has(i)) {
        rowMap.set(i, new Set([digit]))
      } else {
        const rowSet = rowMap.get(i)
        if (rowSet.has(digit)) return false
        rowSet.add(digit)
        // 更新当前行 set 集合
        rowMap.set(i, rowSet)
      }
      // 列
      if (!colMap.has(j)) {
        colMap.set(j, new Set([digit]))
      } else {
        const colSet = colMap.get(j)
        if (colSet.has(digit)) return false
        colSet.add(digit)
        // 更新当前行 set 集合
        colMap.set(j, colSet)
      }
      // 3x3矩阵坐标
      // 二维降一维 (x, y) => x*列数 + y
      let k = Math.floor(i / 3) * 3 + Math.floor(j / 3)
      if (!boxMap.has(k)) {
        boxMap.set(k, new Set([digit]))
      } else {
        const boxSet = boxMap.get(k)
        if (boxSet.has(digit)) return false
        boxSet.add(digit)
        // 更新当前行 set 集合
        boxMap.set(k, boxSet)
      }
    }
  }
  return true
};
const findFirstEmpty = (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const digit = board[i][j]
      if (digit === '.') return [i, j]
    }
  }
  return [-1, -1]
}
const dfs = (board) => {
  // 有效判断
  if (!isValidSudoku(board)) return false
  // 找第一个空位置，填数字
  const [x, y] = findFirstEmpty(board)
  if (x === -1) return true
  for (let i = 1; i <= 9; i++) {
    board[x][y] = `${i}`
    // 检查是否有效数独
    if (dfs(board)) return true
    // 记得回溯还原现场
    board[x][y] = '.'
  }
  return false
}
var solveSudoku = function (board) {
  // 依赖36题做判断，做剪枝处理
  // 蛮力搜索 每次找【第一个空位置】枚举0-9填入，判断有效递归
  dfs(board)
};