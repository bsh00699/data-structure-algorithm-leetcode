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