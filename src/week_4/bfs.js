/**
 * LeetCode-200. 岛屿数量
 * 方法：1.dfs 2.bfs 
 */
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const m = grid.length
  if (!m) return 0
  const n = grid[0].length
  let ans = 0
  const que = []
  // bfs 实现,线性扫描矩阵
  // 1.如果节点包含1，则以根节点启动广度优先搜索。将其放入队列中，并将值设为0
  // 2.迭代的搜索队列中的每一个节点，直到队列为空
  const bfs = (que, grid) => {
    const dirs = [[-1, 0], [1, 0], [0, 1], [0, -1]] // 四个方向
    while (que.length) {
      const curr = que.shift()
      for (const [dx, dy] of dirs) {
        // 向四个方向访问
        const x = curr[0] + dx
        const y = curr[1] + dy
        // 临界条件 越界 || 遇水
        // 注意判断顺序 先判断是否越界，在没有越界的条件下，在判断是否是水
        if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length || grid[x][y] === '0') {
          continue
        }
        // 访问过的地方变为 '0'
        grid[x][y] = '0'
        // 没有访问过且值为1的元素放入队列中
        que.push([x, y])
      }
    }
  }
  // 遍历矩阵
  for (let i = 0; i <= m - 1; i++) {
    for (let j = 0; j <= n - 1; j++) {
      //广搜找陆地 
      if (grid[i][j] === '1') {
        ans++
        grid[i][j] = '0' // 标记为已访问
        que.push([i, j]) // 将当前元素（坐标）加入队列
        //启动广搜--迭代搜索 直到队列为空
        bfs(que, grid)
      }
    }
  }
  return ans
};