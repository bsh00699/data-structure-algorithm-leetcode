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

