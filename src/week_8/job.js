/**
 * LeetCode-684. 冗余连接
 */
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
  let n = edges.length;
  let parent = new Array(n + 1).fill(0).map((_, idx) => idx);
  for (let i = 0; i < n; i++) {
    if (!union(parent, edges[i][0], edges[i][1])) return edges[i]
  }
  return [0];
};

// 合并两个点
function union(parent, x, y) {
  x = find(parent, x);
  y = find(parent, y);
  x === y ? 0 : parent[y] = x;
  return !(x === y)
}

function find(parent, x) {
  while (parent[x] != x) {
    x = parent[x];
  }
  return x;
}

/**
 * LeetCode-200. 岛屿数量
 */
/**
 * @param {character[][]} grid
 * @return {number}
 */
class QuickUnion {
  constructor(n) {
    this.fa = []
    for (let i = 0; i <= n; i++) {
      this.fa[i] = i
    }
  }
  get(x) {
    return this.fa[x] = (this.fa[x] === x ? x : this.get(this.fa[x]))
  }
  merge(a, b) {
    this.fa[this.get(a)] = this.get(b)
  }
}

var numIslands = function (grid) {
  let m = grid[0].length;
  let arr = grid.flat();
  let len = arr.length;
  let u = new QuickUnion(len);
  for (let i = 0; i < len; i++) {
    if (arr[i] === '0') continue;
    // 判断连通上边
    if (i >= m && arr[i - m] === '1') u.merge(i, i - m);
    // 判断连通左边
    if (i % m && arr[i - 1] === '1') u.merge(i, i - 1);
  }

  let ans = 0;
  for (let i = 0; i < len; i++) {
    if (arr[i] === '1' && u.get(i) === i) ans += 1;
  }
  return ans;
};