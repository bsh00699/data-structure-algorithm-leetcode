/**
 * LeetCode-279. 完全平方数
 */
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  // dp: 状态转移方程 计算f(i) = f[i-j^2]
  const f = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    let min = Number.MAX_VALUE;
    for (let j = 1; j * j <= i; j++) {
      min = Math.min(min, f[i - j * j]);
    }
    f[i] = min + 1;
  }
  return f[n];
};

/**
 * LeetCode-55. 跳跃游戏
 */
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  const len = nums.length
  if (len === 1 && nums[0] === 0) return true
  const dp = new Array(len + 1).fill(false)
  // 初始化第一个点dp[0]
  dp[0] = true
  for (let i = 1; i <= len; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (!dp[j]) continue
      // 距离不够
      if (i - j > nums[j]) continue
      dp[i] = true
    }
  }
  return dp[len - 1]
};