/**
 * LeetCode-167. 两数之和 II - 输入有序数组
 * 方法：因为有序，利用前后双指针向中间靠，时间复杂度为O（n）
 */
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  // 双指针
  const len = numbers.length
  let j = len - 1
  if (!len) return
  for (let i = 0; i <= len - 1; i++) {
    // 左端固定，右端递减
    while (i < j && numbers[i] + numbers[j] > target) {
      j--
    }
    if (i < j && numbers[i] + numbers[j] === target) {
      // 找打了呗，看题目要求数组下标从1开始
      return [i + 1, j + 1]
    }
  }
  return []
};