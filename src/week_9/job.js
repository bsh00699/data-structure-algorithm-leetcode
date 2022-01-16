/**
 * LeetCode-709. 转换成小写字母
 */
/**
 * @param {string} s
 * @return {string}
 */
var toLowerCase = function (s) {
  return s.toLowerCase(s)
};

/**
 * LeetCode-58. 最后一个单词的长度
 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  const arr = s.split(' ')
  let index = arr.length - 1
  while (index >= 0) {
    if (arr[index] === '') {
      index--
    } else {
      return arr[index].length
    }
  }
};

/**
 * LeetCode-771. 宝石与石头
 */
/**
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
var numJewelsInStones = function (jewels, stones) {
  let ans = 0
  const jewelsList = jewels.split('')
  for (let ch of stones) {
    if (jewelsList.includes(ch)) {
      ans++
    }
  }
  return ans
};

/**
 * LeetCode-387. 字符串中的第一个唯一字符
 */
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  const map = {};
  for (const a of s) {
    if (!map[a]) map[a] = 0
    map[a] += 1
  }
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] == 1) return i;
  }
  return -1;
};

/**
 * LeetCode-14. 最长公共前缀
 */
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let ans = ""
  for (const ch of strs[0]) {
    if (!strs.every(str => str.startsWith(ans + ch))) {
      break
    }
    ans += ch
  }
  return ans
};

/**
 * LeetCode-344. 反转字符串
 */
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  return s.reverse()
};

/**
 * LeetCode-151. 翻转字符串里的单词
 */
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  let arr = s.trim().split(' ')
  arr = arr.reverse()
  const temp = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== '') {
      temp.push(arr[i])
    }
  }
  return temp.join(' ')
};

/**
 * LeetCode-917. 仅仅反转字母
 */
/**
 * @param {string} s
 * @return {string}
 */
var reverseOnlyLetters = function (S) {
  // 双指针
  let i = 0, j = S.length - 1, str1 = '', str2 = '';
  while (i <= j) {
    if ((S[i] < 'a' || S[i] > 'z') && (S[i] < 'A' || S[i] > 'Z')) {
      str1 += S[i]
      i++;
      continue;
    }
    if ((S[j] < 'a' || S[j] > 'z') && (S[j] < 'A' || S[j] > 'Z')) {
      str2 = S[j] + str2
      j--;
      continue;
    }
    str1 = str1 + S[j--];
    if (i < j) str2 = S[i++] + str2;

  }
  return str1 + str2
};