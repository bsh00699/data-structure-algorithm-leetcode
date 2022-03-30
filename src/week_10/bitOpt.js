/**
 * LeetCode-191. 位1的个数
 */
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
  let cnt = 0
  let i = 0
  while (i < 32) {
    if ((n & 1) === 1) cnt++
    n = n >> 1
    i++
  }
  return cnt
};

/**
 * LeetCode-50. Pow(x, n)
 * 方法: 快速幂
 */
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  if (n === 0) return 1
  if (n < 0) return 1 / myPow(x, -n)
  let temp = x
  let ans = 1.0
  while (n > 0) {
    if (n & 1) ans = ans * temp
    temp = temp * temp
    n = n >> 1
  }
  return ans
};

var myPow = function (x, n) {
  if (n < 0) {
    n = Math.abs(n)
    x = 1 / x
  }
  if (n === 0) return 1
  if (n === 1) return x
  let divisor = 1
  while (n > 1) {
    if (n & 1) {
      divisor *= x
      n++
    }
    x = x * x
    n >>>= 1
  }
  return x / divisor
};

/**
 * LeetCode-136.只出现一次的数字
 * 方法:异或 A^0 = A
 */
var singleNumber = function (nums) {
  let ans = 0
  for (let i = 0; i < nums.length; i++) {
    ans ^= nums[i]
  }
  return ans
};