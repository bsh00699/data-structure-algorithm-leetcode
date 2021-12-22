/**
 * LeetCode-56. 合并区间
 */
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  // 首先将intervals做个排序
  intervals.sort((a, b) => a[0] - b[0])
  const ans = []
  let curr = intervals[0]
  for (interval of intervals) {
    if (curr[1] >= interval[0]) { // curr的尾部大于下一个区间的头部，即发生重叠
      // 更新curr右边界
      curr[1] = Math.max(curr[1], interval[1])
    } else {
      // 不重叠
      ans.push(curr)
      // 更新区间
      curr = interval
    }
  }
  ans.push(curr)
  return ans
};

/**
 * LeetCode-215. 数组中的第K个最大元素
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  // 1.直接排序，然后返回第k个大元素即可,时间负责度为nlogn
  //   nums.sort((a, b) => a - b)
  //   return nums[nums.length - k]
  // 2.利用快排将O(nlogn) => O(n)
  // 核心: 只关心第k大，或者 nums.length - k 小范围的数
  // 然后返回有序数组中第nums.length - k位置上的数即可
  return quickSort(nums, 0, nums.length - 1, nums.length - k)
};

const partition = (arr, l, r) => {
  let pivot = l + Math.floor(Math.random() * (r - l + 1));
  let pivotVal = arr[pivot];
  while (l <= r) {
    while (arr[l] < pivotVal) l++
    while (arr[r] > pivotVal) r--
    if (l === r) break
    if (l < r) {
      const temp = arr[l]
      arr[l] = arr[r]
      arr[r] = temp
      l++
      r--
    }
  }
  return r
}

const quickSort = (arr, l, r, k) => {
  if (l >= r) return arr[l]
  const p = partition(arr, l, r)
  if (k <= p) {
    // 更新右边
    return quickSort(arr, l, p, k)
  } else {
    return quickSort(arr, p + 1, r, k)
  }
}

/**
 * LeetCode-1122. 数组的相对排序
 */
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function (arr1, arr2) {
  // 线性排序: 计数排序
  // 1 <= arr1.length <= 1000
  const count = new Array(1001).fill(0)
  // 统计arr1值出现次数
  for (const val of arr1) {
    count[val]++
  }
  const ans = []
  for (const val of arr2) {
    while (count[val] > 0) {
      ans.push(val)
      count[val]--
    }
  }
  // count 索引本身有序对吧，只需要把val值大于1的放在ans 后面
  for (let i = 0; i < count.length; i++) {
    while (count[i] > 0) {
      ans.push(i)
      count[i]--
    }
  }
  return ans
};

/**
 * LeetCode-493. 翻转对
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
let ans = 0
var reversePairs = function (nums) {
  ans = 0
  mergeSort(nums)
  return ans
};

const mergeSort = (arr = [], ans) => {
  const len = arr.length
  // 临界值
  if (len === 1) return arr
  let mid = Math.floor(len / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid, len)
  const leftArr = mergeSort(left)
  const rightArr = mergeSort(right)
  // 1. leftArr 和 rightArr中的元素已经满足 i < j 的条件
  // 2. 只需要处理nums[i] > 2*nums[j]这个不等式就好了
  calculate(leftArr, rightArr)
  return merge(leftArr, rightArr)
}
const calculate = (left, right) => {
  let i = 0
  let j = 0
  while (i < left.length) {
    while (left[i] > 2 * right[j]) {
      j++
    }
    ans = ans + j - 0
    i++
  }
}

const merge = (left, right) => {
  let i = 0
  let j = 0
  const ans = []
  while (i < left.length && j < right.length) {
    if (left[i] > right[j]) {
      ans.push(right[j++])
    } else {
      ans.push(left[i++])
    }
  }
  while (i < left.length) {
    ans.push(left[i++])
  }
  while (j < right.length) {
    ans.push(right[j++])
  }
  return ans
}