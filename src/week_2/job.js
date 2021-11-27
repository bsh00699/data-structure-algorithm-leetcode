/**
 * LeetCode-811. 子域名访问计数
 * 方法：利用map统计次数
 */

/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
var subdomainVisits = function (cpdomains) {
  const m = new Map()
  const res = []
  for (const str of cpdomains) {
    const [visits, domain] = str.split(' ')
    // domain
    const domainArr = domain.split('.')
    let currDomain = ''
    for (let i = domainArr.length - 1; i >= 0; i--) {
      currDomain = currDomain ? `${domainArr[i]}.${currDomain}` : domainArr[i]
      if (!m.has(currDomain)) {
        m.set(currDomain, parseInt(visits))
      } else {
        m.set(currDomain, m.get(currDomain) + parseInt(visits))
      }
    }
  }
  for (let key of m) {
    const [domain, val] = key
    const str = `${val} ${domain}`
    res.push(str)
  }
  return res
};

/**
 * LeetCode-697. 数组的度
 * 方法：①hasgMap存你想要的信息，然后挑选想要的值 ②双指针
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findShortestSubArray = function (nums) {
  // map 存一下每个元素的度，以及出现的位置(前后位置)
  const m = {}
  for (let i = 0; i <= nums.length - 1; i++) {
    if (!m[nums[i]]) {
      m[nums[i]] = [1, i, i]
    } else {
      // 再次出现，更新尾部位置的index 和 度
      m[nums[i]][0] = m[nums[i]][0] + 1
      m[nums[i]][2] = i
    }
  }
  // 找度和前后最小位置呗
  let maxCnt = 0
  let minLen = 0
  for (let key in m) {
    const [currCnt, left, right] = m[key]
    if (currCnt > maxCnt) {
      // 更新 maxCnt minLen
      maxCnt = currCnt
      minLen = right - left + 1
    } else if (currCnt === maxCnt) {
      // 看谁的最短
      minLen = Math.min(minLen, right - left + 1)
    }
  }
  return minLen
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