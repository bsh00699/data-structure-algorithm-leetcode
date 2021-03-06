// LeetCode-20. 有效的括号
// 说明：使用栈解决
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) { 
  // 使用栈解决，较方便
  let stack = []
  let ch
  for (let i = 0; i <= s.length - 1; i++ ) {
    ch = s[i]
    if ( ch === '(' || ch === '{' || ch === '[') {
      stack.unshift(ch)  
    } else {
      if (stack.length === 0) return false
      if (ch === ')' && stack.shift() !== '(') return false
      if (ch === '}' && stack.shift() !== '{') return false
      if (ch === ']' && stack.shift() !== '[') return false
    }
  }
  // 匹配完，根据stack中是否有值，返回结果
  return stack.length === 0 ? true : false
};

// LeetCode-155. 最小栈
// 注意：维护两个栈，stack_min 存放与当前栈stack中最小值，并且保证栈中每个值都是一一对应的
/**
* Your MinStack object will be instantiated and called as such:
* var obj = new MinStack()
* obj.push(val)
* obj.pop()
* var param_3 = obj.top()
* var param_4 = obj.getMin()
*/
var MinStack = function() {
  // 维护两个栈
  // stack_min 存放与当前栈stack中最小值，并且保证栈中每个值都是一一对应的
  this.stack = []
  this.stack_min = []
};

/** 
* @param {number} val
* @return {void}
*/
MinStack.prototype.push = function(val) {
 this.stack.push(val)
 if (this.stack_min.length === 0) {
   this.stack_min.push(val)
 } else {
   // 当前值 与 stack_min 栈顶值谁小
   const prev = this.stack_min[this.stack_min.length - 1]
   if (val < prev) {
     this.stack_min.push(val)
   } else {
     this.stack_min.push(prev)
   }
 }
};

/**
* @return {void}
*/
MinStack.prototype.pop = function() {
 this.stack.pop()
 this.stack_min.pop()
};

/**
* @return {number}
*/
MinStack.prototype.top = function() {
 // 分清数组头尾
 return this.stack[this.stack.length - 1]
};

/**
* @return {number}
*/
MinStack.prototype.getMin = function() {
 // 分清数组头尾
 return this.stack_min[this.stack_min.length - 1]
};


// LeetCode-150. 逆波兰表达式求值
// 注意：逆波兰表达式求值就是后缀表达式，根据其运算性质，运用栈解决
/**
 * @param {string[]} tokens
 * @return {number}
 */
const calc = (x, y, opt) => {
  if (opt === '+') return x + y
  if (opt === '-') return x - y
  if (opt === '*') return x * y
  if (opt === '/') return parseInt(x / y) // JS 这里需要取整处理
  return -1 // 表示err
}
var evalRPN = function(tokens) {
  // 逆波兰表达式求值 == 后缀表达式
  // 根据其运算性质，运用栈解决比较合适
  let stack = []
  for(let i = 0; i <= tokens.length - 1; i++) {
    const token = tokens[i]
    if (token === '+' || token === '-' ||  token === '*' || token === '/') {
      // 由于是后缀表达式，所以当出现运算符时，栈不会出先空的现象
      // 特别注意 2 1- <===> 2-1,所以从栈内取出永远是 第2个值
      const y = stack.pop()
      const x = stack.pop()
      const res = calc(x, y, token)
      stack.push(res)
    } else {
      stack.push(parseInt(token))
    }
  }
  // 遍历完成，栈内应该只有一个值，就是我们的计算结果，否则入参出错
  return stack.length === 1 ? stack.pop() : 'entry params err'
};

// LeetCode-224. 基本计算器
// 说明：将中缀表达式转换为后缀表达式
/**
 * @param {string} s
 * @return {number}
 */

const getRank = (opt) => {
  if (opt === '*' || opt === '/') return 2
  if (opt === '+' || opt === '-') return 1
  return 0
}
/**方法: 将其转换为逆序波兰表达式求解 */
var calculate = function(s) {
  s = s + ' ' // 保证末尾数字也要放入 number
  const token = [] // 存放逆序波兰表达式
  const opt = [] // 存放操作运算符
  let number = '' // 保证可以计算连续的数字比如 11
  let needsZero = true
  for (let i = 0; i <= s.length - 1; i++) {
    if (s[i] !== ' ' && s[i] !== '+' && s[i] !== '-' && s[i] !== '*' 
    && s[i] !== '/' &&  s[i] !== '(' && s[i] !== ')') {
        // 拿到数字
        number = number + s[i]
        // token.push(s[i])
        needsZero = false
        continue
    } else {
        if (number) {
          token.push(number)
          number = ''
        }
    }
    if (s[i] === ' ') continue // 跳过空格
    // 拿到运算符
    if (s[i] === '(') {
      opt.push(s[i])
      needsZero = true
      continue
    }
    if (s[i] === ')') {
    //  console.log('opt----', opt)
      // 此时就需要将括号里的内容即运算符全部push 到token中
      // 并且去掉opt中存放的左括号 （
      while (opt.length && opt[opt.length - 1] !== '(') {
       token.push(opt.pop())
      }
      // 当前为（ ，删除它
      opt.pop()
      needsZero = false
      continue
    }
    if ((s[i] === '+' || s[i] === '-') && needsZero) {
      token.push('0')
    }
    // 判断当前运算符和opt栈顶运算符的优先级
    const currRank = getRank(s[i])
    // 将同等级运算符压入token
    while (opt.length && getRank(opt[opt.length - 1]) >= currRank) {
      const optTop = opt.pop()
      token.push(optTop)
    }
    opt.push(s[i])
    needsZero = true
  }
  // 最后将opt压入token
  while (opt.length) {
    token.push(opt.pop())
  }
  return evalRPN(token)
};

//////////////////////////单调栈\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// LeetCode-84. 柱状图中最大的矩形
// 注意：尾部push(0)的弹栈技巧
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
  heights.push(0) // 确保stack中单调递增的柱子被弹空
  let stack = [] // 存放key为 width height的对象
  let areaMax = 0
  for (let i = 0; i <= heights.length - 1; i++) {
    let elasticWidth = 0
    const height = heights[i]
    // 当下一个柱子的高度不满足单调性，删除栈顶项，更新最大面积
    while (stack.length && stack[stack.length - 1].height >= height) {
      // 因为elasticWidth初始是 0
      elasticWidth += stack[stack.length - 1].width
      areaMax = Math.max(areaMax, stack[stack.length - 1].height * elasticWidth)
      stack.pop()
    }
    stack.push({
      width: elasticWidth + 1,
      height,
    })
  }
  return areaMax
};

// LeetCode-42. 接雨水
/**
 * @param {number[]} heights
 * @return {number}
 */
var trap = function(heights) {
  // 方案① 横条水累加--单调栈
  // 维护一个单调递减栈，当遇到高度 > 栈顶元素的高度,开始积水
  let res = 0
  const stack = []
  for (const height of heights) {
    let accumulatedWidth = 0
    while (stack.length && stack[stack.length - 1].height < height) {
      let currObj = stack.pop() //出栈一个
      let bottom =  currObj.height
      accumulatedWidth += currObj.width
      // console.log('stack', stack)
      if (!stack.length) continue  // 栈空，表示左边的水流走，无法积水
      let prevObj = stack[stack.length - 1]
      let heightMin = Math.min(height, prevObj.height)
      res += accumulatedWidth * (heightMin - bottom)
    }
    stack.push({
      width: accumulatedWidth + 1,
      height
    })
  }
  return res

  // 方案② 竖条水累加--维护前后缀max
  // const len = heights.length
  // let res = 0
  // const preMax = [] // 每个水坑左边柱子的高度
  // const sufMax = [] // 每个水坑右边柱子的高度
  // // 将所有水坑左右柱子的高度找到
  // // 不需要最后一个柱子，因为以它为底的水坑无法存水
  // preMax[0] = heights[0]
  // for (let i = 1; i < len; i++) {
  //   preMax[i] = Math.max(preMax[i - 1], heights[i])
  // }
  // console.log('preMax', preMax)
  // sufMax[len - 1] = heights[len - 1]
  // for (let j = len - 2; j >= 0; j--) {
  //   sufMax[j] =  Math.max(sufMax[j + 1], heights[j])
  // }
  //  console.log('sufMax', sufMax)
  // // 第一个柱子和最后一个柱子不需要，因为以它为底无法存水
  // for (let n = 1; n < len - 1; n++) {
  //   const bottom = heights[n]
  //   const upMin = Math.min(preMax[n - 1], sufMax[n + 1])
  //   if (upMin > bottom) {
  //     res += (upMin - bottom) * 1
  //   }
  // }
  // return res
};