/**
 * LeetCode-70. 爬楼梯
 * 1.递归 2.循环迭代
 */
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n === 1) return 1
  if (n === 2) return 2
  // 1.递归
  // return climbStairs(n - 1) + climbStairs(n - 2)
  // 2.循环迭代
  let ans = 0
  let pre = 2
  let prepre = 1
  for (let i = 3; i <= n; i++) {
    ans = pre + prepre
    prepre = pre
    pre = ans
  }
  return ans
};

// 如果是递归 = 蹦床函数 + 缓存优化处理
const memorize = (fn) => {
  let cache = {}
  return (...args) => {
    const key = args.length + args.join('')
    const temp = cache[key]
    if (temp) return temp
    cache[key] = fn.apply(this, args)
  }
}
const func = memorize(climbStairs)

/**
 * LeetCode-673. 最长递增子序列的个数
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function (nums) {
  // 与300.最长递增子序列大致一样，只不过统计一下出现次数
  const m = nums.length
  const fn = new Array(m).fill(1) // 每个元素的子序列就是它本身，也就是1
  const count = Array(m).fill(1);
  for (let i = 0; i < m; i++) {
    // 从第i个数开始和前面的数做比较
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        //   if (nums[i] > nums[j]) {
        //     // 取fn[i] 和 fn[j] + 1,最大的 
        //     fn[i] = Math.max(fn[i], fn[j] + 1)
        //   }
        // 区分 fn[i] 和 fn[j] + 1 谁大呗，顺便统计一下个数
        // 出现在以nums[j]结尾的地方而不是以nums[i]结尾的地方
        if (fn[j] + 1 > fn[i]) {
          fn[i] = fn[j] + 1;
          count[i] = count[j];
        } else if (fn[j] + 1 === fn[i]) {
          // 出现在以nums[j]结尾的地方和以nums[i]结尾的地方
          fn[i] = fn[i];
          count[i] += count[j];
        } else {
          fn[i] = fn[i]
          count[i] = count[i]
        }
      }
    }
  }
  let ans = 0
  // 取fn最大的
  for (const val of fn) {
    ans = Math.max(ans, val)
  }
  // 统计最大子序列出现的次数
  let res = 0
  for (let i = 0; i < m; i++) {
    if (fn[i] === ans) {
      res += count[i];
    }
  }
  return res
};

/**
 * LeetCode-120. 三角形最小路径和
 */
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  const dp = triangle;
  for (let i = dp.length - 2; i >= 0; i--) {
    for (let j = 0; j < dp[i].length; j++) {
      dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + dp[i][j];
    }
  }
  return dp[0][0];
};