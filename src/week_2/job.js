/**
 * LeetCode-811. 子域名访问计数
 * 方法：利用map统计次数
 */

/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
var subdomainVisits = function(cpdomains) {
  const m = new Map()
  const res = []
  for (const str of cpdomains) {
    const [visits, domain] = str.split(' ')
    // domain
    const domainArr = domain.split('.')
    let currDomain = ''
    for (let i = domainArr.length - 1; i >= 0; i--) {
      currDomain = currDomain ? `${domainArr[i]}.${currDomain}` : domainArr[i]
      if(!m.has(currDomain)) {
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