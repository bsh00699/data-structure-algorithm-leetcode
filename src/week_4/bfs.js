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

/**
 * LeetCode-433. 最小基因变化
 * 方法：bfs 
 */
/**
 * @param {string} start
 * @param {string} end
 * @param {string[]} bank
 * @return {number}
 */
var minMutation = function (start, end, bank) {
  // BFS: 实质求最短路径
  const depth = {}
  const bankInter = new Set(bank)
  const que = []
  // 不在基因库
  if (!bankInter.has(end)) return -1
  const GENE = ['A', 'C', 'G', 'T']
  depth[start] = 0
  que.push(start)
  // BFS代码模板
  while (que.length) {
    const curr = que.shift()
    for (let i = 0; i <= curr.length - 1; i++) {
      // 枚举基因变化的所有情况
      for (let j = 0; j <= GENE.length - 1; j++) {
        if (curr[i] !== GENE[j]) { // 变成其他3中基因
          const temp = curr.split('') // 需要转成数组，在此基础上改变基因
          temp[i] = GENE[j]
          const changeAfter = temp.join('')
          if (!bankInter.has(changeAfter)) continue // 不在基因库
          // 计数，每串基因，只需访问一次（即 bfs 中的最短路径问题）
          if (depth[changeAfter]) continue
          // 下一层 = 上一层的深度 + 1
          depth[changeAfter] = depth[curr] + 1
          que.push(changeAfter)
          if (changeAfter === end) {
            return depth[changeAfter]
          }
        }
      }
    }
  }
  return -1
};

/**
 * LeetCode-207. 课程表
 * 方法：bfs(拓扑排序)
 */
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  const to = new Array(numCourses).fill(0).map(v => new Array())
  const indDegree = new Array(numCourses).fill(0)
  // 建图
  for (const [ai, bi] of prerequisites) {
    to[bi].push(ai)
    // 顺便统计ai的度数
    indDegree[ai]++
  }
  // bfs
  const que = []
  // 初始化入度为0的课程
  for (let i = 0; i < numCourses; i++) {
    if (indDegree[i] === 0) {
      que.push(i)
    }
  }

  // bfs模板
  let done = 0
  while (que.length) {
    const x = que.shift()
    done++
    // 找下一门修的课程 度数为0的课
    for (const y of to[x]) {
      indDegree[y]--
      if (indDegree[y] === 0) {
        que.push(y)
      }
    }
  }
  // 判断已修的课的数量和numCourses 相等即可
  return done === numCourses
};

/**
 * LeetCode-210. 课程表||
 * 方法：bfs(拓扑排序)
 */
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  // 与课程表 207 解题思路一样，只不过这里返回修课的顺序
  const to = new Array(numCourses).fill(0).map(v => new Array())
  const indDegree = new Array(numCourses).fill(0)
  // 建图
  for (const [ai, bi] of prerequisites) {
    to[bi].push(ai)
    // 顺便统计ai的度数
    indDegree[ai]++
  }
  // bfs
  const que = []
  // 初始化入度为0的课程
  for (let i = 0; i < numCourses; i++) {
    if (indDegree[i] === 0) {
      que.push(i)
    }
  }

  // bfs模板
  let lessons = []
  while (que.length) {
    const x = que.shift()
    lessons.push(x)
    // 找下一门修的课程 度数为0的课
    for (const y of to[x]) {
      indDegree[y]--
      if (indDegree[y] === 0) {
        que.push(y)
      }
    }
  }
  // 判断已修的课的数量和numCourses 相等即可
  if (lessons.length === numCourses) {
    return lessons
  }
  return []
};

/**
 * LeetCode-329.矩阵中的最长递增路径
 * 方法：bfs(拓扑排序)
 */
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function (matrix) {
  // 拓扑排序：有向无环图
  const m = matrix.length
  const n = matrix[0].length
  // 出边数组
  const to = new Array(m * n).fill(0).map(v => new Array())
  // 点的度数
  const indDegree = new Array(m * n).fill(0)
  const dist = new Array(m * n).fill(0).map(v => new Array())
  const que = []
  // 将二维网格 转化为 点的标号，即i * 列号 + j 比如 [0, 0] [0, 1] -> 0, 1 
  const num = (i, j) => {
    return i * n + j
  }

  const addEdge = (u, v) => {
    // u 到 v
    indDegree[v]++
    // 从u出发，可到达的点
    to[u].push(v)

  }

  const dir = [[0, 1], [1, 0], [0, -1], [-1, 0]]
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 向四个方向扩展
      for ([dx, dy] of dir) {
        const nx = i + dx
        const ny = j + dy
        // 判断边界 && 满足条件
        if ((nx >= 0 && nx < m && ny >= 0 && ny < n) && matrix[nx][ny] > matrix[i][j]) {
          // 连边 （出边数组，连边）建图
          addEdge(num(i, j), num(nx, ny))
        }
      }
    }
  }

  // 套用拓扑排序模板
  // 1. 从0度点出发
  for (let i = 0; i < m * n; i++) {
    if (indDegree[i] === 0) {
      que.push(i)
      // 出发点的距离 就是 1
      dist[i] = 1
    }
  }

  while (que.length) {
    const x = que.shift()
    for (const y of to[x]) {
      indDegree[y]--
      // 下一个点的距离，就是上一个点距离 + 1， 然后求y点所有入边点距离的 最大值
      dist[y] = Math.max(dist[y], dist[x] + 1)
      // 当y度数为0时,所有的入边都考虑完了,在从y点出发考虑
      if (indDegree[y] === 0) {
        que.push(y)
      }
    }
  }

  // 最后求所有点距离，中的最大值
  let ans = 0
  for (let i = 0; i < m * n; i++) {
    ans = Math.max(ans, dist[i])
  }
  return ans
};