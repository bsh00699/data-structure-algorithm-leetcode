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
test