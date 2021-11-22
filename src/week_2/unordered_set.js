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