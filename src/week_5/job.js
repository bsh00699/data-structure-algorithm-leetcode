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
