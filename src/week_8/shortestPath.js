/**
 * LeetCode-743. 网络延迟时间
 */
/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function (times, n, k) {
  // 最短路bellman-ford算法
  // 动态规划 + 迭代
  // 扫描所有边（x, y, z）若dist[y] > dist[x] + z
  // 更新 dist[y] = dist[x] + z
  const dist = new Array(n + 1).fill(Infinity)
  dist[0] = -1 // 从1开始，那dist[0] = -1
  dist[k] = 0
  for (let round = 1; round <= n - 1; round++) {
    // 和冒泡一样做个标志位，如果dist[x] + z < dist[y],flag = true，才会执行一下轮check
    let flag = false
    for (const [x, y, z] of times) {
      if (dist[x] + z < dist[y]) {
        dist[y] = dist[x] + z
        flag = true
      }
    }
    if (!flag) break // dist[x] + z < dist[y] 条件不满足
  }
  let ans = 0
  ans = Math.max(ans, ...dist)
  return ans === Infinity ? -1 : ans
};