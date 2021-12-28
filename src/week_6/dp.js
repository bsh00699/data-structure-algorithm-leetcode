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

/**
 * LeetCode-63. 不同路径 II
 */
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  // dp: dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length
  const dp = new Array(m).fill(new Array(n).fill(0))
  for (i = 0; i < m; i++) {
    for (j = 0; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        // 当前点重新计数
        dp[i][j] = 0
      } else if (i === 0 && j === 0) {
        // 起点
        dp[i][j] = 1
      } else if (i === 0) {
        dp[i][j] = dp[i][j - 1]
      } else if (j === 0) {
        dp[i][j] = dp[i - 1][j]
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
      }
    }
  }
  return dp[m - 1][n - 1]
};

/**
 * LeetCode-1143. 最长公共子序列
 */
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  /**
  dp求解，核心: 找状态转移方程
  画表格结果一目了然
  如果两个子序列相同：dp[i][j] = dp[i - 1][j - 1] + 1
            不相同：dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
  */
  const m = text1.length
  const n = text2.length
  // 初始化两text都为空str
  //   text1 = ' ' + text1
  //   text2 = ' ' + text2
  // 顺便初始化dp[0][0] = 0
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
  // 不要用下面的方式初始化数组
  // const dp = new Array(m + 1).fill(new Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  return dp[m][n]
};

/**
 * LeetCode-300. 最长递增子序列
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  // [0,1,0,3,2,3]
  // 枚举，然后和前面的数比较是否满足递增，然后取较大的
  const m = nums.length
  const fn = new Array(m).fill(1) // 每个元素的子序列就是它本身，也就是1
  for (let i = 0; i < m; i++) {
    // 从第i个数开始和前面的数做比较
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        // 取fn[i] 和 fn[j] + 1,最大的 
        fn[i] = Math.max(fn[i], fn[j] + 1)
      }
    }
  }
  let ans = 0
  // 取fn最大的
  for (const val of fn) {
    ans = Math.max(ans, val)
  }
  return ans
};

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
 * LeetCode-53. 最大子数组和
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  // dp: 核心思想看之前的元素是否大于0
  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] > 0) {
      nums[i] = nums[i] + nums[i - 1]
    }
  }
  return Math.max(...nums)
};

/**
 * LeetCode-152. 乘积最大子数组
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  // dp
  const fmax = []
  const fmin = []
  fmax[0] = nums[0]
  fmin[0] = nums[0]
  for (let i = 1; i < nums.length; i++) {
    fmax[i] = Math.max(
      Math.max(fmax[i - 1] * nums[i], fmin[i - 1] * nums[i]),
      nums[i]
    )
    fmin[i] = Math.min(
      Math.min(fmax[i - 1] * nums[i], fmin[i - 1] * nums[i]),
      nums[i]
    )
  }
  return Math.max(...fmax)
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