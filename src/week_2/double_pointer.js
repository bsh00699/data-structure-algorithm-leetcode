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

/**
 * LeetCode-15. 三数之和
 * 方法：排序然后利用双指针
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

const twoSum = (nums, start, target) => {
  const ans = []
  // 双指针
  let j = nums.length - 1
  for (let i = start; i < nums.length; i++) {
    if (i > start && nums[i] === nums[i - 1]) continue
    // 往中间靠
    while (i < j && nums[i] + nums[j] > target) j--
    if (i < j && nums[i] + nums[j] === target) {
      ans.push([nums[i], nums[j]])
    }
  }
  return ans
}

var threeSum = function (nums) {
  const ans = []
  // 排序
  nums.sort((a, b) => a - b)
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue // 去重
    const twoSumRes = twoSum(nums, i + 1, -nums[i])
    for (const [x, y] of twoSumRes) {
      ans.push([nums[i], x, y])
    }
  }
  return ans
};

/**
 * LeetCode-11. 盛最多水的容器
 */
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  // 双指针
  const len = height.length
  if (!len) return
  let i = 0
  let j = len - 1
  let ans = 0
  while (i < j) {
    ans = Math.max(
      ans,
      Math.min(height[i], height[j]) * (j - i)
    )
    // i j 往中间靠
    height[i] < height[j] ? i++ : j--
    // if (height[i] < height[j]) {
    //   i++
    // } else {
    //   j--
    // }
  }
  return ans
};