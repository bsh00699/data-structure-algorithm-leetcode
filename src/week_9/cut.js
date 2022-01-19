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

