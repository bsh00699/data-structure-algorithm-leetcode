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

/**
 * LeetCode-410. 分割数组的最大值
 */
/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
// m: m个盒子 size: 每个盒子的size
const isValid = (nums, m, size) => {
  let capacity = 0 // 盒子的容量
  let cnt = 1 // 计数需要多少个盒子
  for (const val of nums) {
    // console.log('val--', val)
    if (capacity + val <= size) {
      // 往盒子里塞
      capacity += val
    } else {
      // 塞不下了,重新拿个盒子塞进去
      cnt++
      capacity = val
    }
  }
  return cnt <= m
}
var splitArray = function (nums, m) {
  // 转为二分求解
  // 一堆数用 m（m值：二分猜测）个盒子去装，看需要多少个盒子
  // 然后从这堆满足条件的盒子中挑出最合适的
  let left = 0
  let right = 0
  // 1.确定边界盒子的最大值与最小值
  for (const val of nums) {
    left = Math.max(left, val)
    right += val
  }
  while (left < right) {
    // let mid = (left + right) / 2
    let mid = Math.floor((left + right) / 2)
    if (isValid(nums, m, mid)) {
      // 取最小值，左区间，更新right
      right = mid
    } else {
      left = mid + 1
    }
  }
  return right
};

/**
 * LeetCode-制作 m 束花所需的最少天数
 */
/**
 * @param {number[]} bloomDay
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
const validDateOnDay = (bloomDay, m, k, now) => {
  let cnt = 0 // 当前已做花束数量
  let continuousCnt = 0 // 当前连续的花束数量
  for (const bloom of bloomDay) {
    if (bloom <= now) {
      continuousCnt++
      if (continuousCnt === k) {
        cnt++
        // 重置连续花束数量0
        continuousCnt = 0
      }
    } else {
      // 没有花开continuousCnt = 0，因为制作花束时。要相邻的花
      continuousCnt = 0
    }
  }
  return cnt >= m
}
var minDays = function (bloomDay, m, k) {
  // 与410. 分割数组的最大值，结题思路一样
  let left = 0
  let right = 0
  let latestTime = 0 // 最晚时间
  // 确定临界值
  for (const bloom of bloomDay) {
    latestTime += bloom
  }
  right = latestTime + 1
  while (left < right) {
    let mid = Math.floor((left + right) / 2)
    if (validDateOnDay(bloomDay, m, k, mid)) {
      // 满足条件的最小值比如, 0 0 0 1 1 1 1即刚出现1的值
      right = mid
    } else {
      left = mid + 1
    }
  }
  // 如果找不到，比如全是false,即花全部盛开也无法满足制作m束花要求
  if (right === latestTime + 1) return -1
  return right
};

/**
 * LeetCode-1011. 在 D 天内送达包裹的能力
 */
/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
// 是否有效载重allWeight
const vaildWeight = (weights, days, allWeight) => {
  let currWeight = 0 // 当前承载能力
  let needDays = 1
  for (const weight of weights) {
    if (currWeight + weight <= allWeight) {
      currWeight += weight
    } else {
      // 需要新的一天来运输
      needDays++
      currWeight = weight
    }
  }
  return needDays <= days
}
var shipWithinDays = function (weights, days) {
  let left = 0
  let right = 0
  // 确定临界值
  for (const weight of weights) {
    right += weight // 传送带最大载重
    left = Math.max(left, weight) // 传送带最小载重
  }
  while (left < right) {
    let mid = Math.floor((left + right) / 2)
    if (vaildWeight(weights, days, mid)) {
      // 最低载重，左区间，更新right
      right = mid
    } else {
      left = mid + 1
    }
  }
  return right
};

/**
 * LeetCode-911. 在线选举
 */
/**
 * @param {number[]} persons
 * @param {number[]} times
 */
// 1.记录每个候选人所得票数
// 2.利用二分查找某时刻领先的候选人编号
var TopVotedCandidate = function (persons, times) {
  this.map = {}
  this.top = -1 // 记录某时刻，票数领先候选人的编号
  this.tops = [] // 记录所有时刻，票数领先候选人的编号
  this.times = times
  this.map[-1] = -1
  for (let i = 0; i < persons.length; i++) {
    const number = persons[i] // 候选人编号
    if (!this.map[number]) {
      this.map[number] = 1
    } else {
      this.map[number] = this.map[number] + 1
    }
    if (this.map[number] >= this.map[this.top]) {
      // 更新top
      this.top = number
    }
    // 反正候选人和时刻表长度是一致的即times.length == persons.length
    // 当前时刻将top,push 到 tops
    this.tops.push(this.top)
  }
};

/** 
 * @param {number} t
 * @return {number}
 */
TopVotedCandidate.prototype.q = function (t) {
  // 返回在时刻 t 在选举中领先的候选人的编号，典型的二分搜素
  let left = 0
  let right = this.times.length - 1
  while (left < right) {
    let mid = Math.floor((left + right + 1) / 2)
    if (t >= this.times[mid]) {
      left = mid
    } else {
      right = mid - 1
    }
  }
  return this.tops[left]
};


/**
 * LeetCode-875. 爱吃香蕉的珂珂
 */
/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
const validSpeed = (piles, h, k) => {
  let takeTime = 0
  for (const val of piles) {
    if (val < k) {
      // 如果一堆少于 k 个，那也得花1小时 (一小时到了，才吃下一堆)
      takeTime++
    } else {
      takeTime += Math.ceil(val / k)
    }
  }
  return takeTime <= h
}
// 我们就设想一个能吃完的速度，然后利用二分找出最小速度呗
var minEatingSpeed = function (piles, h) {
  let left = 1
  let right = 0
  let totalPiles = 0
  // 求边界，最小速度和最大速度
  for (const val of piles) {
    totalPiles += val
  }
  right = totalPiles
  while (left < right) {
    let mid = Math.floor((left + right) / 2)
    if (validSpeed(piles, h, mid)) {
      // 最小速度，左区间，更新 right
      right = mid
    } else {
      left = mid + 1
    }
  }
  return right
};