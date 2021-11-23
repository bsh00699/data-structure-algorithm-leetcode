/**
 * LeetCode-1. 两数之和
 * 方法：①双循环 ②利用map
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const m = new Map()
  m.set(nums[0], 0)
  if (!nums.length) return
  // 从第二个元素遍历
  for (let i = 0; i <= nums.length - 1; i++) {
    const item = nums[i]
    if (m.has(target - item)) {
      return [i, m.get(target - item)]
    }
    m.set(nums[i], i)
  }
};

/**
 * LeetCode-49. 字母异位词分组
 * 方法：①将str排序后，判断放入map ②记录str中每个字符出现的次数
 */

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  if (!strs.length) return
  const m = new Map()
  const res = []
  for (let i = 0; i <= strs.length - 1; i++) {
    // 排序
    const temp = strs[i].split('').sort().join('')
    if (!m.has(temp)) m.set(temp, [])
    if (m.has(temp)) {
      m.set(temp, [...m.get(temp), strs[i]])
    }
  }
  // 遍历map
  for (const key of m) {
    res.push(key[1])
  }
  return res
};

/**
 * LeetCode-874. 模拟行走机器人
 * 说明：1.使用 Set 集合存储障碍物位置 2.左右转方向设定 3.方向数组设定
 */
/**
/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
var robotSim = function (commands, obstacles) {
  // 使用 Set 集合存储障碍物位置
  const s = new Set()
  for (const obstacle of obstacles) {
    // obstacle 为坐标数组
    s.add(`${obstacle[0]}_${obstacle[1]}`)
  }
  // console.log('--s--', s)
  // 原点
  let x = 0
  let y = 0
  // 方向 从北开始逆时针 N-0 E-1 S-2 W-3
  // 右转 (dir + 1) % 4
  // 左转  (dir -1 + 4) % 4
  let dir = 0
  // 方向数组 x 方向 y 方向 北(0, 1) 东(1, 0) 南(0, -1) 西(-1, 0)
  let res = 0
  let dx = [0, 1, 0, -1]
  let dy = [1, 0, -1, 0]
  for (const cmd of commands) {
    if (cmd === -1) { // 右转
      dir = (dir + 1) % 4
    } else if (cmd === -2) { // 左转
      dir = (dir - 1 + 4) % 4
    } else { // 当前方向 向前走cmd步数
      for (let i = 0; i <= cmd - 1; i++) {
        // 为什么要一步一步走，因为还要判断下一步是否被障碍物阻挡
        // 在1.当前位置的2.那个方向3.走多少步
        // 方向的话 需要方向数组
        const nx = x + dx[dir]
        const ny = y + dy[dir]
        // 判断是否遇到障碍物
        if (s.has(`${nx}_${ny}`)) break
        // 更新 x y 坐标 和 res
        x = nx
        y = ny
        res = Math.max(res, x * x + y * y)
      }
    }
  }
  return res
};

/**
 * LeetCode-30. 串联所有单词的子串
 */
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function(s, words) {
  // 记录words的总长度
  let tot = 0
  const wordsMap = {}
  for (const word of words) {
    tot += word.length
    if (!wordsMap[word]) {
      wordsMap[word] = 0
    } 
    wordsMap[word]++
  }
  let res = []
  // 以 tot 长度分组 i + tot <= s.length
  for (let i = 0; i + tot <= s.length; i++) {
    if ( vaild(s.substr(i, tot), words, wordsMap) ) {
      res.push(i)
    }
  }
  return res
};

const equalsMap = (mapA, mapB) => {
  if (Object.keys(mapA).length !== Object.keys(mapB).length) {
    return false
  }
  for (const key in mapA) {
    if (!mapB[key] ||  mapB[key] !== mapA[key]) {
      return false
    }
  }
  return true
}

const vaild = (str, words, m) => {
  // 如何判断 str 是不是由 words 数组中的单词 拼接而成
  // 首先他们的长度是相等的, 所以 str 肯定会被 k 整除
  const k = words[0].length
  const splitMap = {}
  for (let i = 0; i <= str.length - 1; i += k) {
    if(!splitMap[str.substr(i, k)]) {
      splitMap[str.substr(i, k)] = 0
    }
    splitMap[str.substr(i, k)]++
  }
  return equalsMap(splitMap, m)
}
