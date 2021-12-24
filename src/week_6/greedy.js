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

/**
 * LeetCode-860. 柠檬水找零
 */
/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function (bills) {
  // 支付面额 5、10、20 之间成倍数，所以典型贪心问题
  // 初始化map: 手里有多少零钱
  const map = {}
  map[5] = 0
  map[10] = 0
  map[20] = 0
  const exchange = (amount) => {
    // 贪心一定注意顺序 20 -> 10 -> 5
    const billsArr = [20, 10, 5]
    for (const bill of billsArr) {
      while (amount >= bill && map[bill] > 0) {
        amount = amount - bill
        map[bill]--
      }
    }
    return amount === 0
  }
  for (const val of bills) {
    map[val]++
    if (!exchange(val - 5)) return false
  }
  return true
};

/**
 * LeetCode-45. 跳跃游戏 II
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  let ans = 0
  let start = 0
  let end = 1
  let len = nums.length
  while (end < len) {
    let maxPos = 0 // 能跳到的最远位置
    for (let i = start; i < end; i++) {
      // 从start开始跳，看能跳到多远
      maxPos = Math.max(maxPos, i + nums[i])
    }
    start = end // 更新下次起跳的位置
    end = maxPos + 1
    ans++
  }
  return ans
};