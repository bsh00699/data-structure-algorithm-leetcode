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