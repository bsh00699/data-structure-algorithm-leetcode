/**
 * LeetCode-78. 子集
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  // 递归 + 回溯
  const len = nums.length
  const chosen = []
  const ans = []
  const recur = (nums, i) => {
    // 边界
    if (len === i) {
      ans.push([...chosen])
      return
    }
    // 每层逻辑相同 nums[i] 选或不选
    recur(nums, i + 1)
    chosen.push(nums[i])
    recur(nums, i + 1)
    // 回到选之前的状态【回溯】
    chosen.pop()
  }
  recur(nums, 0)
  return ans
};

/**
 * LeetCode-77. 组合
 */
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  // 递归 + 回溯
  const len = n
  const chosen = []
  const ans = []
  const recur = (i) => {
    // 提前return 选中的大于k，或者选中的加剩下的不够k个数
    if (chosen.length > k || chosen.length + (n - i + 1) < k) return
    // 边界
    if (len + 1 === i) {
      // if (chosen.length === k)  ans.push([...chosen])
      ans.push([...chosen])
      return
    }
    // 每层逻辑相同 i 选或不选
    recur(i + 1)
    chosen.push(i)
    recur(i + 1)
    // 回到选之前的状态【回溯】
    chosen.pop()
  }
  recur(1)
  return ans
};


/**
 * LeetCode-50. Pow(x, n)
 * 方法：①分治 ②循环迭代
 */
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  // 法②：迭代循环
  // let ans = 1
  // if (n === 0) return 1
  // if (n < 0) {
  //   n = -n
  //   x = 1 / x
  // }
  // for (let i = 0; i <= n - 1; i++) {
  //   ans = ans * x
  // }
  // return ans
  // 法①：分治
  if (n < 0) return 1 / myPow(x, -n);
  if (n === 0) return 1; // 设置递归的出口
  if (n % 2) return x * myPow(x, n - 1);
  return myPow(x * x, n / 2);
};
