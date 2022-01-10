/**
 * LeetCode-208. 实现 Trie (前缀树)
 */
var Trie = function () {
  this.root = [0, {}]  // [count, child]
};

Trie.prototype.find = function (word, insertIfNotExist, exactMatch) {
  let curr = this.root
  for (let ch of word) {
    if (!(ch in curr[1])) {
      if (!insertIfNotExist) return false
      curr[1][ch] = [0, {}]
    }
    curr = curr[1][ch]
  }
  if (insertIfNotExist) curr[0] += 1
  return exactMatch ? curr[0] > 0 : true
};
/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  return this.find(word, true, false);
};

/** 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  return this.find(word, false, true);
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  return this.find(prefix, false, false);
};

/**
 * LeetCode-547. 省份数量
 */
/**
 * @param {number[][]} isConnected
 * @return {number}
 */
const find = (x, fa) => {
  if (x === fa[x]) return x
  return fa[x] = find(fa[x], fa)
}

const unionSet = (x, y, fa) => {
  x = find(x, fa)
  y = find(y, fa)
  if (x !== y) fa[x] = y
}
var findCircleNum = function (isConnected) {
  // 并集查询
  const n = isConnected.length
  // makeSet
  const fa = new Array(n).fill(0)
  for (let i = 0; i < n; i++) {
    fa[i] = i
  }
  // 对于每条边，把两个集合合并
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (isConnected[i][j]) {
        unionSet(i, j, fa)
      }
    }
  }
  let ans = 0
  // 看有几个根就有几个省份
  for (let i = 0; i < n; i++) {
    if (find(i, fa) === i) ans++
  }
  return ans
};

/**
 * LeetCode-212. 单词搜索 II
 */
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
// 字典树插入
const insert = (word, curr) => {
  // root: [count, child] => [0, {}]
  for (let ch of word) {
    if (!curr[1][ch]) {
      curr[1][ch] = [0, {}]
    }
    curr = curr[1][ch]
  }
  curr[0] = curr[0] + 1
}

var findWords = function (board, words) {
  // 方法: Trie字典数 + DFS 
  // 1.建立Trie, 插入words
  let root = [0, {}] // root: [count, child] => [0, {}]
  for (let word of words) {
    insert(word, root)
  }
  // 2.DFS 枚举每个起点 搜索
  const m = board.length
  const n = board[0].length
  const dr = [[-1, 0], [0, -1], [0, 1], [1, 0]]
  const visit = new Array(m).fill(0).map(() => {
    return new Array(n).fill(false)
  })
  let str = []
  let ans = []
  const dfs = (board, x, y, curr) => {
    const ch = board[x][y]
    if (!curr[1][ch]) return
    let next = curr[1][ch]
    str.push(ch)
    // 判断是不是找到
    if (curr[0] > 0) {
      ans.push(str.join(''))
    }
    // 向四个方向查找
    for (const [dx, dy] of dr) {
      const nx = x + dx
      const ny = y + dy
      // 是否越界
      if (nx < 0 || ny < 0 || nx >= m || ny >= n) {
        continue
      }
      if (visit[nx][ny]) continue
      visit[nx][ny] = true
      dfs(board, nx, ny, next)
      visit[nx][ny] = false
    }
    str.pop()
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      visit[i][j] = true
      dfs(board, i, j, root)
      visit[i][j] = false
    }
  }
  return ans

};
// 或者这样
var findWords = function (board, words) {
  /**
  * build trie --> traverse board --> DFS
  */
  const res = [], h = board.length, w = board[0].length;
  // 构建 tire
  const getTrie = words => {
    let root = Object.create(null);
    for (const word of words) {
      let node = root;
      for (let c of word) {
        if (!node[c]) {
          node[c] = Object.create(null);
        }
        node = node[c];
      }
      node.word = word;
    }
    return root;
  }

  // DFS 深度优先搜素
  const search = (trie, i, j) => {
    // 到结尾
    if (trie.word) {
      res.push(trie.word);
      trie.word = null;
    }
    // 边界条件
    if (i < 0 || j < 0 || i >= h || j >= w) return;
    // 不在字典树中，返回
    if (!trie[board[i][j]]) return;

    let prefixChar = board[i][j];
    board[i][j] = "#"; // mark visited
    search(trie[prefixChar], i, j - 1);
    search(trie[prefixChar], i, j + 1);
    search(trie[prefixChar], i - 1, j);
    search(trie[prefixChar], i + 1, j);
    board[i][j] = prefixChar; // restore
  }

  // traverse board
  const trie = getTrie(words);
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      search(trie, i, j)
    }
  }
  return res;
};