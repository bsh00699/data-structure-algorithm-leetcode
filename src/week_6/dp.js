/**
 * LeetCode-322. 零钱兑换
 */
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const dp = new Array(amount + 1).fill(-1)
  // 初始化0的最优解 dp[0]
  dp[0] = 0
  // 遍历得 1 => amount 的最优解
  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      // 所有<= i的面值coins[j], 如果金额 i - coins[j]有最优解
      if (coins[j] <= i && dp[i - coins[j]] !== -1) {
        if (dp[i] === -1 || dp[i] > dp[i - coins[j]] + 1) {
          // 更新dp[i]
          dp[i] = dp[i - coins[j]] + 1
        }
      }
    }
  }
  return dp[amount]
};
// 或者这样
var coinChange = function (coins, amount) {
  // dp 循环递推
  const dp = new Array(amount + 1).fill(Infinity)
  dp[0] = 0
  for (let i = 1; i <= amount; i++) {
    for (const val of coins) {
      // dp公式
      if (i - val >= 0) {
        dp[i] = Math.min(dp[i], dp[i - val] + 1)
      }
    }
  }
  if (dp[amount] === Infinity) return -1
  return dp[amount]
};
