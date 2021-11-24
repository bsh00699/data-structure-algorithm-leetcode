/**
 * LeetCode-146. LRU 缓存机制
 */
// 方法1：利用数组 和 map
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.cacheMap = new Map()
  this.cacheArr = []
  this.size = capacity
};

/** 
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function (key) {
  if (!this.cacheMap.has(key)) return -1
  const val = this.cacheMap.get(key)
  // remove
  const index = this.cacheArr.indexOf(key)
  this.cacheArr.splice(index, 1)
  // insert head
  this.cacheArr.unshift(key)
  return val
};

/** 
* @param {number} key 
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function (key, value) {
  if (!this.cacheMap.has(key)) {
    // insert head
    this.cacheArr.unshift(key)
    this.cacheMap.set(key, value)
    if (this.cacheArr.length > this.size) {
      // delete tail node
      const expireKey = this.cacheArr.pop()
      this.cacheMap.delete(expireKey)
    }
  } else { // update
    // delete
    const existKeyIndex = this.cacheArr.indexOf(key)
    this.cacheArr.splice(existKeyIndex, 1)
    // insert head
    this.cacheArr.unshift(key)
  }
};

// 方法2：利用map本身set的顺序以及遍历器的特性找到头指针
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.cacheMap = new Map()
  this.size = capacity
};

/** 
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function (key) {
  if (!this.cacheMap.has(key)) return -1
  const prev = this.cacheMap.get(key)
  // 从原来位置删除
  this.cacheMap.delete(key)
  // 插入到尾部
  this.cacheMap.set(key, prev)
  return prev
};

/** 
* @param {number} key 
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function (key, value) {
  // 如果存在线删除
  if (this.cacheMap.has(key)) {
    this.cacheMap.delete(key)
  }
  // 正常插入，判断size
  this.cacheMap.set(key, value)
  if (this.cacheMap.size > this.size) {
    // 删除头节点
    // this.cacheMap.keys() 返回有序键名的遍历器
    // this.cacheMap.keys().next().value 返回最先前插入的头节点的key
    this.cacheMap.delete(this.cacheMap.keys().next().value)
  }
};
