/**
 * LeetCode-704. 二分查找
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  // 1.循环
  const len = nums.length
  let low = 0
  let high = len - 1
  for (let i = 0; i < len; i++) {
    // low+(high - low) / 2 || Math.floor((high + low) / 2) 
    let mid = low + ((high - low) >> 1)
    if (nums[mid] === target) return mid
    target < nums[mid] ? high = mid - 1 : low = mid + 1
  }
  return -1
  // 2.递归
  // return bsearch(nums, 0, nums.length - 1, target)
};

const bsearch = (nums, low, high, target) => {
  const len = nums.length
  if (!len || low > high) return -1
  let mid = low + ((high - low) >> 1)
  if (nums[mid] === target) return mid
  return target < nums[mid]
    ? bsearch(nums, low, mid - 1, target)
    : bsearch(nums, mid + 1, high, target)
}

/**
 * LeetCode-153. 寻找旋转排序数组中的最小值
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  // 实质: 转化为 二分查找
  // 数组中存在2段元素是有序的，找出最小的值即可，时间复杂度要低
  // 让每个数跟结尾比较 nums[i] < nums[leng - 1] ? 1 : 0
  // 3 4 5 1 2 
  // 0 0 0 1 1
  // 这时候只需看最先出现的 1 是哪个元素就好了
  const len = nums.length - 1
  let left = 0
  let right = len
  while (left < right) {
    let mid = Math.floor((left + right) / 2)
    if (nums[mid] <= nums[right]) { // 条件满足就是1
      right = mid
    } else {
      left = mid + 1
    }
  }
  return nums[right]
};

/**
 * LeetCode-34. 在排序数组中查找元素的第一个和最后一个位置
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const findFirst = (arr = [], value) => {
  const len = arr.length
  if (!len) return -1
  let low = 0
  let high = len - 1
  while (low <= high) {
    let mid = Math.floor((low + high) / 2)
    if (arr[mid] < value) {
      low = mid + 1
    } else if (arr[mid] > value) {
      high = mid - 1
    } else { // 找到了
      // 判断它前一个值和value是否相等即可
      if (mid === 0 || arr[mid - 1] !== value) return mid
      // if  arr[mid - 1] == value
      high = mid - 1
    }
  }
  return -1
}
const findLast = (arr = [], value) => {
  const len = arr.length
  if (!len) return -1
  let low = 0
  let high = len - 1
  while (low <= high) {
    let mid = Math.floor((low + high) / 2)
    if (arr[mid] < value) {
      low = mid + 1
    } else if (arr[mid] > value) {
      high = mid - 1
    } else { // 找到了
      // 判断它后一个值和value是否相等即可
      if (arr[mid + 1] !== value) return mid
      // if  arr[mid + 1] == value
      low = mid + 1
    }
  }
  return -1
}

var searchRange = function (nums, target) {
  const firstIndex = findFirst(nums, target)
  const lastIndex = findLast(nums, target)
  return [firstIndex, lastIndex]
};