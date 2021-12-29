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