/**
 * LeetCode-8. 字符串转换整数 (atoi)
 */
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
    let index = 0
    let len = s.length
    // 忽略前导空格
    while (index < len && s[index] === ' ') {
        index++
    }
    // 正负号
    let sign = 1
    if (index < len && (s[index] === '-' || s[index] === '+')) {
        sign = s[index] === '-' ? -1 : 1
        index++
    }
    // 处理数字直到非数字字符或到达输入结尾
    let val = 0
    while (index < len && s[index] >= '0' && s[index] <= '9') {
        // 是否越界
        // val * 10 + parseInt(s[index]) > Math.pow(2, 31)
        const maxVal = Math.pow(2, 31) // 2147483648
        const currVal = val * 10 + parseInt(s[index])
        if (currVal > (maxVal - 1)) {
            if (sign === 1) return maxVal - 1
            else return -maxVal
        }
        val = currVal
        index++
    }
    return sign * val
};

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    // Rabin-Karp 字符串哈希算法
    // b = 131 p = Math.pow(10, 9) + 7
    const b = 131
    const p = 1e9 + 7
    //   const p = Math.pow(10, 9) + 7
    const n = haystack.length
    const m = needle.length
    const H = new Array(n + 1).fill(0)
    // 字符串转number a = 1, b = 2...z = 26
    // 1.对haystack 取hash => H
    for (let i = 1; i <= n; i++) {
        H[i] = (H[i - 1] * b + (haystack[i - 1] + 1)) % p
    }
    // 2.对needle取hash => Hneedle
    let Hneedle = 0
    let powBM = 1
    for (let j = 0; j < m; j++) {
        Hneedle = (Hneedle * b + (needle[j] + 1)) % p
        powBM = powBM * b % p
    }
    // 3.haystack中每一个长为m的字串和Hneedle 比较
    for (let l = 1; l <= n - m + 1; l++) {
        let r = l + m - 1
        // s[l ~ r]的hash值 === Hneedle ?
        if (((H[r] - H[l - 1] * powBM) * p + p) % p === Hneedle) {
            return l - 1
        }
    }
    return -1
};