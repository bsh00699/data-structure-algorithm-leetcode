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
 * LeetCode-121. 买卖股票的最佳时机
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
  const buy = []
  const sell = []
  buy[0] = -prices[0];
  sell[0] = 0;
  for (let i = 1; i < prices.length; i++) {
    buy[i] = Math.max(buy[i - 1], sell[i - 1] - prices[i]);
    sell[i] = Math.max(buy[i - 1] + prices[i], sell[i - 1]);
  }
  return Math.max(buy[i - 1], sell[i - 1]);
}