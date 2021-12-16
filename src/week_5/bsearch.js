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

/**
 * LeetCode-69. Sqrt(x)
 */
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  // 二分查找，找最大的ans,其中 ans 满足 ans * ans <= x
  // 比如满足条件是1，否则为0
  // 11110000, 找满足条件的最大的那一个值
  let low = 0
  let high = x
  while (low < high) {
    // else中如何是 high = mid - 1，就需要 +1 防止陷入死循环
    let mid = Math.floor((low + high + 1) / 2)
    if (mid * mid <= x) {
      low = mid // 找满足条件的最大的那一个值
    } else {
      high = mid - 1
    }
  }
  return high
};

/**
 * LeetCode-374. 猜数字大小
 */
/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function (n) {
  let left = 0
  let right = n
  //   while (left <= right) {
  //     let mid = Math.floor((left + right) / 2)
  //     if (guess(mid) === 0) return mid
  //     if (guess(mid) > 0) {
  //       // ..guess(mid)...n
  //       left = mid + 1
  //     } else (
  //       right = mid - 1
  //     )
  //   }
  //   return -1
  // 或者这样
  while (left < right) {
    let mid = Math.floor((left + right + 1) / 2)
    if (guess(mid) >= 0) {
      // ..guess(mid)...n(target)
      left = mid
    } else {
      right = mid - 1
    }
  }
  return left
};

/**
 * LeetCode-162. 寻找峰值
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  // 三分查找: 二分查找转换为三分查找
  // lmid = (f(x1) + f(x2) / 2, rmid = lmid + 1
  // 确认两点 x1 x2(x1<x2), 判断单调性即可
  // f(x1) < f(x2),更新 left = midl
  // f(x1) > f(x2),更新 right = midr
  const len = nums.length
  let left = 0
  let right = len - 1
  while (left < right) {
    let midl = Math.floor((left + right) / 2)
    let midr = midl + 1
    if (nums[midl] <= nums[midr]) {
      // 更新左边边界
      left = midl + 1
    } else {
      right = midr - 1
    }
  }
  return right
};