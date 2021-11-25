/**
 * LeetCode-1248. 统计「优美子数组」
 * 方法：①双循环 + 前缀和 ②前缀和 + hasMap
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numberOfSubarrays = function (nums, k) {
  const len = nums.length
  const s = [0] //   s[0] = 0
  // 求和s[i]: 
  for (let i = 1; i <= len; i++) {
    s[i] = s[i - 1] + (nums[i - 1] % 2)
  }
  let res = 0
  // i 前面有多少个 s[i] - k 呗
  // 所以可以一个循环实现，一边求前缀和一边查找
  const m = { 0: 1 }
  for (let j = 1; j <= len; j++) {
    if (m[s[j] - k]) {
      res += m[s[j] - k]
    }
    if (m[s[j]]) {
      m[s[j]]++
    } else {
      // 初始化 s[j]出现1次
      m[s[j]] = 1
    }
  }
  return res
};

/**
 * LeetCode-53. 最大子序和
 * 方法：前缀和 + hasMap
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  const len = nums.length
  if (!len) return
  // 前缀和
  // 一个循环：可以边统计前缀和，边查找最大自序和
  let prefixSum = 0
  let preMin = [0]
  // 注意最小值边界
  let ans = -100000
  for (let i = 1; i <= len; i++) {
    prefixSum += nums[i - 1]
    // Max(s[i] - s[j -1]) --> Min(s[j -1])
    preMin[i] = Math.min(preMin[i - 1], prefixSum)
    ans = Math.max(ans, prefixSum - preMin[i - 1])
  }
  return ans
};

// 如果一个循环看不懂，那我们把它分解开
var maxSubArray_2 = function (nums) {
  const s = [0]
  // 前缀和
  for (let i = 1; i <= len; i++) {
    s[i] = s[i - 1] + nums[i - 1]
  }
  // 前缀和最小值
  const preMin = [0]
  for (let j = 1; j <= len; j++) {
    preMin[j] = Math.min(preMin[j - 1], s[j])
  }
  // 查找最大子序和 
  let ans = -100000
  for (let k = 1; k <= len; k++) {
    ans = Math.max(ans, s[k] - preMin[k - 1])
  }
  return ans
};

/**
 * LeetCode-560. 和为 K 的子数组
 * 方法：前缀和 + hasMap
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  // 前缀和
  const len = nums.length
  if (!len) return 0
  let prefixSum = 0
  let count = 0
  const m = new Map()
  m.set(0, 1)
  for (let j = 0; j <= len - 1; j++) {
    prefixSum += nums[j]
    if (m.has(prefixSum - k)) {
      count += m.get(prefixSum - k)
    }
    if (m.has(prefixSum)) {
      // 相同的前缀和只需记录次数即可
      m.set(prefixSum, m.get(prefixSum) + 1)
    } else {
      m.set(prefixSum, 1)
    }
  }
  return count
};