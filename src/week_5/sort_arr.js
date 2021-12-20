/**
 * LeetCode-912. 排序数组
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 冒泡排序
var sortArray = function (nums) {
  const len = nums.length
  for (let i = 0; i < len; i++) {
    let flag = true
    for (let j = 0; j < len - i; j++) {
      if (nums[j] > nums[j + 1]) {
        const temp = nums[j]
        nums[j] = nums[j + 1]
        nums[j + 1] = temp
        flag = true
      }
    }
    if (!flag) break
  }
  return nums
};
// 快排
const partition = (arr, l, r) => {
  let  pivot  =  l  +  Math.floor(Math.random()  *  (r  -  l  +  1));
  let  pivotVal  = arr[pivot];
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
const quickSort = (arr, l, r) => {
  if (l >= r) return
  const p = partition(arr, l, r)
  quickSort(arr, l, p)
  quickSort(arr, p + 1, r)
}
var sortArray = function (nums) {
  // 1.快排-1 比较low的写法
  // const base = nums[0] // 划分点
  // let left = []
  // let right = []
  // for (let i = 1; i < nums.length; i++) {
  //   if (nums[i] < base) {
  //     left.push(nums[i])
  //   } else {
  //     right.push(nums[i])
  //   }
  // }
  // if (left.length >=2) left = sortArray(left)
  // if (right.length >=2) right = sortArray(right)
  // return [...left, base, ...right]

  // 2.快排-2，复杂度为nlong(n)写法
  // 核心：如何找合适的划分点 partition
  quickSort(nums, 0, nums.length - 1)
  return nums
};

