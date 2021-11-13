// LeetCode-88. 合并两个有序数组
// 方法：
// 1.创建一个temp arr,然后循环比较nums1 和 nums2的值将最小值 放入temp arr 即可
// 2.原地算法 
var merge = function(nums1, m, nums2, n) {
  // 从后向前遍历
  let cnt = m + n -1
  let i = m - 1
  let j = n - 1
  // ①：遍历 m + n - 1 次
  // for (let key = m + n - 1; key >= 0; key--) {
  //   // j < 0 : nums2已经遍历完，只需要把nums1剩下的值放进去即可
  //   if (j < 0 || (i >=0 && nums1[i] >= nums2[j])) {
  //     nums1[key] = nums1[i--]
  //   } else {
  //     nums1[key] = nums2[j--]
  //   }
  // }

  // ②：只需要将nums2遍历完即可，因为 nums1 本身有序
  while (j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[cnt--] = nums1[i--]
    } else {
      nums1[cnt--] = nums2[j--]
    }
  }
};

// LeetCode-26. 删除有序数组中的重复项
// 方法：套用过滤器模式代码
var removeDuplicates = function(nums) {
  let cnt = 0
  for (let i = 0; i < nums.length; i++ ) {
    if (nums[i] !== nums[i + 1]) {
      nums[cnt] = nums[i]
      cnt++
    }
  }
  return cnt
};

// LeetCode-283. 移动零
// 方法：套用过滤器，将非0的值塞进去,后续在进行补0操作
var moveZeroes = function(nums) {
  let cnt = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[cnt] = nums[i]
      cnt++
    }  
  }
  // 补0操作
  while (cnt < nums.length) {
    nums[cnt] = 0
    cnt++
  }
};
