/**
 * LeetCode-121. 买卖股票的最佳时机
 */
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  // 1.直接求解
  //    let ans = 0
  //    const len = prices.length
  //    for (let i = 0; i < len; i++) {
  //       for (let j = i; j < len; j++) {
  //         if (prices[j] >  prices[i]) {
  //           ans = Math.max(ans, prices[j] - prices[i])
  //         }
  //       }
  //    }
  // 2.利用最小和 最大利润两状态O（n）求解
  let min = prices[0]
  let ans = 0
  const len = prices.length
  for (let i = 1; i < len; i++) {
    if (prices[i] < min) min = prices[i]
    if (prices[i] - min > 0) {
      ans = Math.max(ans, prices[i] - min)
    }
  }
  return ans
};

/**
 * LeetCode-122. 买卖股票的最佳时机 II
 */
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  // 贪心
  // 三个决策: 买 || 卖 || 持仓
  // 向后看一天如果跌就卖（保证收益大于0）
  let ans = 0
  for (let i = 1; i < prices.length; i++) {
    // if (prices[i] - prices[i - 1]) {
    //   ans = ans + Math.max(prices[i] - prices[i - 1], 0)
    // }
    ans = ans + Math.max(prices[i] - prices[i - 1], 0)
  }
  return ans
};

var maxProfit = function (prices) {
  // dp
  // const buy = []
  // const sell = []
  // buy[0] = -prices[0];
  // sell[0] = 0;
  // for (let i = 1; i < prices.length; i++) {
  //   buy[i] = Math.max(buy[i - 1], sell[i - 1] - prices[i]);
  //   sell[i] = Math.max(buy[i - 1] + prices[i], sell[i - 1]);
  // }
  // return Math.max(buy[i - 1], sell[i - 1]);
  // 直接套模板
  const len = prices.length
  // 1.因为要从下标1开始，所以我们初始化prices[0] = 0
  prices.unshift(0)
  // 2.定义初始化状态求 max => -infinity; 求 min => +infinity
  const dp = new Array(len + 1).fill(0).map(() => new Array(2).fill(-Infinity))
  dp[0][0] = 0
  // 3.状态循环， j:当前持股状态 [0, 1]
  for (let i = 1; i <= len; i++) {
    // 状态转移方程
    // 买入
    dp[i][1] = Math.max(dp[i][1], dp[i - 1][0] - prices[i])
    // 卖出
    dp[i][0] = Math.max(dp[i][0], dp[i - 1][1] + prices[i])
    for (let j = 0; j < 2; j++) {
      // 什么也不干
      dp[i][j] = Math.max(dp[i][j], dp[i - 1][j])
    }
  }
  return dp[len][0]
}

/**
 * LeetCode-123. 买卖股票的最佳时机 III
 */
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  // 实质与 122/188 题类似，只是多了个交易次数
  // 动态规划
  const len = prices.length
  // 最多可以完成 两笔 交易, k为2即可
  const k = 2
  // 1.因为要从下标1开始，所以我们初始化prices[0] = 0
  prices.unshift(0)
  // 2.定义初始化状态求 max => -infinity; 求 min => +infinity
  const dp = new Array(len + 1).fill(0).map(() => new Array(2).fill(0).map(() => {
    return new Array(k + 1).fill(-Infinity)
  }))
  dp[0][0][0] = 0
  // 3.状态循环， j:当前持股状态 [0, 1]
  for (let i = 1; i <= len; i++) {
    for (let j = 0; j < 2; j++) {
      for (let n = 0; n <= k; n++) {
        // 4.状态转移方程
        // 买入时候交易次数减一
        if (n > 0) {
          dp[i][1][n] = Math.max(dp[i][1][n], dp[i - 1][0][n - 1] - prices[i])
        }
        // 卖出
        dp[i][0][n] = Math.max(dp[i][0][n], dp[i - 1][1][n] + prices[i])
        // 什么也不干
        dp[i][j][n] = Math.max(dp[i][j][n], dp[i - 1][j][n])
      }

    }
  }
  // 5.返回dp[len][0][k] 的最大值
  return Math.max(...dp[len][0])
};

/**
 * LeetCode-188. 买卖股票的最佳时机 IV
 */
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
  // 实质与 122题类似，只是多了个交易次数
  // 动态规划
  const len = prices.length
  // 1.因为要从下标1开始，所以我们初始化prices[0] = 0
  prices.unshift(0)
  // 2.定义初始化状态求 max => -infinity; 求 min => +infinity
  const dp = new Array(len + 1).fill(0).map(() => new Array(2).fill(0).map(() => {
    return new Array(k + 1).fill(-Infinity)
  }))
  //   console.log('dp===', dp)
  dp[0][0][0] = 0
  // 3.状态循环， j:当前持股状态 [0, 1]
  for (let i = 1; i <= len; i++) {
    for (let j = 0; j < 2; j++) {
      for (let n = 0; n <= k; n++) {
        // 4.状态转移方程
        // 买入时候交易次数减一
        if (n > 0) {
          dp[i][1][n] = Math.max(dp[i][1][n], dp[i - 1][0][n - 1] - prices[i])
        }
        // 卖出
        dp[i][0][n] = Math.max(dp[i][0][n], dp[i - 1][1][n] + prices[i])
        // 什么也不干
        dp[i][j][n] = Math.max(dp[i][j][n], dp[i - 1][j][n])
      }

    }
  }
  // 5.返回dp[len][0][k] 的最大值
  return Math.max(...dp[len][0])
};

/**
 * LeetCode-714. 买卖股票的最佳时机含手续费
 */
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function (prices, fee) {
  // 条件：不限交易次数，和122题解一样
  // 动态规划
  const len = prices.length
  // 1.因为要从下标1开始，所以我们初始化prices[0] = 0
  prices.unshift(0)
  // 2.定义初始化状态求 max => -infinity; 求 min => +infinity
  const dp = new Array(len + 1).fill(0).map(() => new Array(2).fill(-Infinity))
  dp[0][0] = 0
  // 3.状态循环， j:当前持股状态 [0, 1]
  for (let i = 1; i <= len; i++) {
    // 状态转移方程
    // 买入的是时候算一下 手续费即可
    dp[i][1] = Math.max(dp[i][1], dp[i - 1][0] - prices[i] - fee)
    // 卖出
    dp[i][0] = Math.max(dp[i][0], dp[i - 1][1] + prices[i])
    for (let j = 0; j < 2; j++) {
      // 什么也不干
      dp[i][j] = Math.max(dp[i][j], dp[i - 1][j])
    }
  }
  return dp[len][0]
};

/**
 * LeetCode-309. 最佳买卖股票时机含冷冻期
 */
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  // 条件不限交易次数与122题解一样
  // 动态规划
  const len = prices.length
  // 1.因为要从下标1开始，所以我们初始化prices[0] = 0
  prices.unshift(0)
  // 2.定义初始化状态求 max => -infinity; 求 min => +infinity
  // 转3维数组
  const dp = new Array(len + 1).fill(0).map(() => new Array(2).fill(0).map(() => {
    return new Array(2).fill(-Infinity)
  }))
  dp[0][0][0] = 0
  // 3.状态循环， j:当前持股状态 [0, 1]
  for (let i = 1; i <= len; i++) {
    for (let j = 0; j < 2; j++) {
      for (let l = 0; l < 2; l++) {
        // 状态转移方程
        // 买入
        dp[i][1][0] = Math.max(dp[i][1][0], dp[i - 1][0][0] - prices[i])
        // 卖出 l: 0 => 1
        dp[i][0][1] = Math.max(dp[i][0][1], dp[i - 1][1][0] + prices[i])
        // 什么也不干l: 全部转化 => 0
        dp[i][j][0] = Math.max(dp[i][j][0], dp[i - 1][j][1])
      }
    }
  }
  return Math.max(dp[len][0][0], dp[len][0][1])
};

/**
 * LeetCode-198. 打家劫舍
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const len = nums.length;
  if (len == 0) return 0;
  const dp = new Array(len + 1);
  dp[0] = 0;
  dp[1] = nums[0];
  for (let i = 2; i <= len; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
  }
  return dp[len];
};

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

