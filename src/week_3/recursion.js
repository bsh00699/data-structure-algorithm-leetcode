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
 * LeetCode-46. 全排列
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  // n! 思想: 一共有n个位置，考虑每个位置放什么数
  // 从还  没有选过的数 里面选一个 
  const len = nums.length
  const ans = []
  const arr = [] // 排列数
  const used = [] // 每个位置的数是否被选择
  const recur = (nums, pos) => {
    // 边界
    if (pos === len) {
      ans.push([...arr])
      return
    }
    for (let i = 0; i <= len - 1; i++) {
      if (!used[i]) {
        // 没选
        arr.push(nums[i])
        used[i] = true
        // 下一个数
        recur(nums, pos + 1)
        // 还原现场
        used[i] = false
        arr.pop()
      }
    }
  }
  recur(nums, 0)
  return ans
};

/**
 * LeetCode-47. 全排列 II
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  // 与 46解题思想一致 n! 思想: 一共有n个位置，考虑每个位置放什么数，从还  没有选过的数 里面选一个 
  // 只不过这里需要 map 记录已经排序，并且元素顺序一致的数组
  const len = nums.length
  const ans = []
  const arr = [] // 排列数
  const map = {} // 记录已经排序，并且元素顺序一致的数组
  const used = [] // 每个位置的数是否被选择
  const recur = (nums, pos) => {
    // 边界
    if (pos === len) {
      const key = arr.join('')
      if (!map[key]) {
        ans.push([...arr])
        map[key] = true
      }
      return
    }
    for (let i = 0; i <= len - 1; i++) {
      if (!used[i]) {
        // 没选
        arr.push(nums[i])
        used[i] = true
        // 下一个数
        recur(nums, pos + 1)
        // 还原现场
        used[i] = false
        arr.pop()
      }
    }
  }
  recur(nums, 0)
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

/**
 * LeetCode-22. 括号生成
 */
/**
 * @param {number} n
 * @return {string[]}
 */
// 记忆函数，避免值重复计算
// const memorize = (fn) => {
//   let cache = {}
//   return (...args) => {
//     const key = args.length + args.join('')
//     const temp = cache[key] 
//     if (temp) return temp
//     cache[key] = fn.apply(this, args)
//   }
// }
// const func = memorize(generateParenthesis)

var generateParenthesis = function (n) {
  // 找划分点
  /**
  1.外层固定一个括号，里面随便分
  ((()))
  (()())
  2.确定分界点,里面随便分
  (())() ()(())
  避免统计重复，需要分段划分, 当n=3时如下
  S  (A)  B
  n  k-1 n-k
  k=1 A=0对括号 ()    B=2对括号 ()() (())
      总组合 ()()() ()(())
  k=2 A=1对括号 (())  B=1对括号 ()
      总组合 (())()
  k=3 A=2对括号 (()()) ((())) B=0对括号 空
      总组合 (()()) ((()))
  */
  // 递归出口
  if (n === 0) return [''] // 没有括号的话就返回空字符串
  // 注意题目 n 范围小，如果范围很大，需要用到函数记忆
  const store = {}
  const ans = []
  if (store[n]) return store[n]
  for (let k = 1; k <= n; k++) {
    let A = generateParenthesis(k - 1)
    let B = generateParenthesis(n - k)
    // A B 两数组值组合排列
    for (const a of A) {
      for (const b of B) {
        ans.push(`(${a})${b}`)
      }
    }
  }
  store[n] = ans
  return ans
};

/**
 * LeetCode-23.合并K个升序链表
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  // 方法4:利用最小堆Mock优先队列
  const heapMin = new HeapMin();
  const protect = new ListNode(0);
  let curr = protect;
  for (const list of lists) {
    if (list !== null) {
      heapMin.insert(list);
    }
  }
  while (heapMin.size() > 0) {
    const list = heapMin.pop();
    curr.next = list;
    curr = curr.next;
    list.next && heapMin.insert(list.next);
    //   list.next = null;
  }
  return protect.next;
};

class HeapMin {
  constructor() {
    this.heap = [];
  }
  swap(index1, index2) {
    const tmp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = tmp;
  }
  getParentIndex(index) {
    return (index - 1) >> 1;
  }
  getLeftChildIndex(index) {
    return 2 * index + 1;
  }
  getRightChildIndex(index) {
    return 2 * index + 2;
  }
  shiftUp(index) {
    if (index == 0) {
      return;
    }
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex] && this.heap[index].val < this.heap[parentIndex].val) {
      this.swap(index, parentIndex);
      this.shiftUp(parentIndex);
    }
  }
  shiftDown(index) {
    const leftChildIndex = this.getLeftChildIndex(index);
    const rightChildIndex = this.getRightChildIndex(index);
    if (this.heap[leftChildIndex] && this.heap[index].val > this.heap[leftChildIndex].val) {
      this.swap(index, leftChildIndex);
      this.shiftDown(leftChildIndex);
    }
    if (this.heap[rightChildIndex] && this.heap[index].val > this.heap[rightChildIndex].val) {
      this.swap(index, rightChildIndex);
      this.shiftDown(rightChildIndex);
    }
  }
  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }
  pop() {
    // 如果堆中只剩一个节点了，那么也就直接弹出，不调整了
    if (this.size() === 1) { return this.heap.pop(); }
    const top = this.heap[0];
    /** ---调整堆--- **/
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
    /** ---调整堆--- **/
    return top;
  }
  peak() {
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }
}