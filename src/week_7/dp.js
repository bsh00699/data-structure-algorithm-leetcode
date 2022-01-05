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
// 法一
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
// 法二
var rob = function (nums) {
  const len = nums.length
  // 两个点 1.偷到第几个房间 2.刚刚的房间偷还是没偷
  // f[i, j]表示计划偷窃前i座房屋，第i座房屋的闯入情况为j (0-未闯入 1-闯入)时的最大收益
  // 为了使下标从1开始，要在前面插入一个0元素
  nums.unshift(0)
  const f = new Array(len + 1).fill(0).map(() => new Array(2).fill(0))
  f[0][0] = 0
  // 循环状态
  for (let i = 1; i <= len; i++) {
    for (let j = 0; j < 2; j++) {
      // f[i][0] 之前i-1状态最大值，偷不偷都可以
      f[i][0] = Math.max(f[i - 1][0], f[i - 1][1])
      // f[i][1] 偷过了，之前i-1 不能偷，在加上偷的金额nums[i]
      f[i][1] = f[i - 1][0] + nums[i]
    }
  }
  return Math.max(f[len][0], f[len][1])
};

/**
 * LeetCode-213. 打家劫舍 II
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  // 环形dp--两次dp
  // 第一次 不偷1，偷n
  // 初值: f[1, 0] = 0 f[1, 1] = -无穷 目标: max(f[n, 0], f[n, 1])
  // 第二次 不偷n，偷1
  // 初值: f[1, 0] = 0 f[1, 1]= nums[1], 目标 f[n, 0]
  // copy 198 题解
  const len = nums.length
  if (len === 1) return nums[0]
  // 两个点 1.偷到第几个房间 2.刚刚的房间偷还是没偷
  // f[i, j]表示计划偷窃前i座房屋，第i座房屋的闯入情况为j (0-未闯入 1-闯入)时的最大收益
  // 为了使下标从1开始，要在前面插入一个0元素
  nums.unshift(0)
  const f = new Array(len + 1).fill(0).map(() => new Array(2).fill(0))
  // 不偷1,偷n
  f[1][0] = 0
  // 循环状态
  for (let i = 2; i <= len; i++) {
    for (let j = 0; j < 2; j++) {
      // f[i][0] 之前i-1状态最大值，偷不偷都可以
      f[i][0] = Math.max(f[i - 1][0], f[i - 1][1])
      // f[i][1] 偷过了，之前i-1 不能偷，在加上偷的金额nums[i]
      f[i][1] = f[i - 1][0] + nums[i]
    }
  }
  const ans = Math.max(f[len][0], f[len][1])
  // 不偷n 偷1
  f[1][0] = 0
  f[1][1] = nums[1]
  for (let i = 2; i <= len; i++) {
    for (let j = 0; j < 2; j++) {
      // f[i][0] 之前i-1状态最大值，偷不偷都可以
      f[i][0] = Math.max(f[i - 1][0], f[i - 1][1])
      // f[i][1] 偷过了，之前i-1 不能偷，在加上偷的金额nums[i]
      f[i][1] = f[i - 1][0] + nums[i]
    }
  }
  return Math.max(ans, f[len][0])
};

/**
 * LeetCode-72. 编辑距离
 */
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  // f[i][j]表示word[1...i]与word2[1...j]的编辑距离
  /**
  插入: 先把前i个字符变成和前j-1个字符一样 f[i][j] = f[i][j-1] + 1
       比如 ea 变 ebc，ea先变eb, 在插入c
  删除: 把第i个字符删除，然后前 i-1 个字符和j个一样 f[i][j] = f[i-1][j] + 1
  替换: f[i][j] = f[i-1][j-1] + eq
       若word1[i]==word2[j] eq=0 否则 eq=1
  初始值 f[i][0] = i f[0][j] = j
  目标   f[n][m]
   */
  const n = word1.length
  const m = word2.length
  word1 = ' ' + word1
  word2 = ' ' + word2
  const f = new Array(n + 1).fill(0).map(() => {
    return new Array(m + 1).fill(Infinity)
  })
  for (let i = 0; i <= n; i++) f[i][0] = i
  for (let j = 0; j <= m; j++) f[0][j] = j
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      f[i][j] = Math.min(
        Math.min(f[i][j - 1] + 1, f[i - 1][j] + 1),
        f[i - 1][j - 1] + (word1[i] !== word2[j])
      )
    }
  }
  return f[n][m]
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

