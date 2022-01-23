/**
 * LeetCode-239. 滑动窗口最大值
 * 维护一个大顶堆
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
class Heap {
  constructor(comparator = (a, b) => a - b, data = []) {
    this.data = data;
    this.comparator = comparator;//比较器
    this.heapify();//堆化
  }

  heapify() {
    if (this.size() < 2) return;
    for (let i = Math.floor(this.size() / 2) - 1; i >= 0; i--) {
      this.bubbleDown(i);//bubbleDown操作
    }
  }

  peek() {
    if (this.size() === 0) return null;
    return this.data[0];//查看堆顶
  }

  offer(value) {
    this.data.push(value);//加入数组
    this.bubbleUp(this.size() - 1);//调整加入的元素在小顶堆中的位置
  }

  poll() {
    if (this.size() === 0) {
      return null;
    }
    const result = this.data[0];
    const last = this.data.pop();
    if (this.size() !== 0) {
      this.data[0] = last;//交换第一个元素和最后一个元素
      this.bubbleDown(0);//bubbleDown操作
    }
    return result;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = (index - 1) >> 1;//父节点的位置
      //如果当前元素比父节点的元素小，就交换当前节点和父节点的位置
      if (this.comparator(this.data[index], this.data[parentIndex]) < 0) {
        this.swap(index, parentIndex);//交换自己和父节点的位置
        index = parentIndex;//不断向上取父节点进行比较
      } else {
        break;//如果当前元素比父节点的元素大，不需要处理
      }
    }
  }

  bubbleDown(index) {
    const lastIndex = this.size() - 1;//最后一个节点的位置
    while (true) {
      const leftIndex = index * 2 + 1;//左节点的位置
      const rightIndex = index * 2 + 2;//右节点的位置
      let findIndex = index;//bubbleDown节点的位置
      //找出左右节点中value小的节点
      if (
        leftIndex <= lastIndex &&
        this.comparator(this.data[leftIndex], this.data[findIndex]) < 0
      ) {
        findIndex = leftIndex;
      }
      if (
        rightIndex <= lastIndex &&
        this.comparator(this.data[rightIndex], this.data[findIndex]) < 0
      ) {
        findIndex = rightIndex;
      }
      if (index !== findIndex) {
        this.swap(index, findIndex);//交换当前元素和左右节点中value小的
        index = findIndex;
      } else {
        break;
      }
    }
  }

  swap(index1, index2) {//交换堆中两个元素的位置
    [this.data[index1], this.data[index2]] = [this.data[index2], this.data[index1]];
  }

  size() {
    return this.data.length;
  }
}

var maxSlidingWindow = function (nums, k) {
  let ans = [];
  let heap = new Heap((a, b) => b.val - a.val);//大顶堆
  for (let i = 0; i < k - 1; i++) heap.offer({ val: nums[i], index: i });//初始的时候将0～k-1的元素加入堆中
  for (let i = k - 1; i < nums.length; i++) {//滑动窗口从从索引为k-1的元素开始遍历
    heap.offer({ val: nums[i], index: i });//将新进入滑动窗口的元素加堆中
    //当堆顶元素不在滑动窗口中的时候，不断删除堆顶堆元素，直到最大值在滑动窗口里。
    while (heap.peek().index <= i - k) heap.poll();
    ans.push(heap.peek().val);//将在滑动窗口里的最大值加入ans
  }
  return ans;
}


/**
 * LeetCode-1206. 设计跳表
 * 参考他人题解
 * 作者：zlfhx8
 * 链接：https://leetcode-cn.com/problems/design-skiplist/solution/jie-he-redissui-ji-ceng-shu-shi-xian-mei-s1h2/
 */

class Node {
  // node节点中value表示节点的值，next指向包含所有层数的下一节点的数组，类似于下一列
  constructor(value = null, size = 0) {
    this.value = value;
    this.next = new Array(size).fill(null);
  }
}
var Skiplist = function () {
  /**
     * defaultMaxLevel随机层数概率，也就是随机出的层数，
     * 在 第1层以上(不包括第一层)的概率，层数不超过maxLevel，层数的起始号为1
     */
  this.defaultMaxLevel = 16;
  this.defaultFactor = 0.25;
  this.head = new Node(null, this.defaultMaxLevel);
  this.curentLevel = 1;//表示当前nodes的实际层数，从1开始
};

/** 
 * @param {number} target
 * @return {boolean}
 */
Skiplist.prototype.search = function (target) {
  let searchNode = this.head;
  for (let i = this.curentLevel - 1; i >= 0; i--) {
    searchNode = this.findClosest(searchNode, i, target);
    if (searchNode.next[i] != null && searchNode.next[i].value == target) {
      return true;
    }
  }
  return false;
};

/** 
 * @param {number} num
 * @return {void}
 */
Skiplist.prototype.add = function (num) {
  let level = this.randomLevel();
  let updateNode = this.head;
  let newNode = new Node(num, level);
  // 找到当前num所在的层数，并从该层开始添加，从结构中的当前层数开始找也就是最高层数往下找
  for (let i = this.curentLevel - 1; i >= 0; i--) {
    // 找到该层中距离num最近的node,将update传入有点类似于斜向下找
    updateNode = this.findClosest(updateNode, i, num);
    //这一层是小于num本身的层数时，就可以进行插入了，不是就不行
    if (i < level) {
      // 为空好办，直接插入
      if (updateNode.next[i] == null) {
        updateNode.next[i] = newNode;
      } else {
        let temp = updateNode.next[i];
        updateNode.next[i] = newNode;
        newNode.next[i] = temp;
      }
    }

  }
  // 完成后，发现随机出的层数大于了最大层，还需要更新最大层，
  // 并且让所有超过curentLevel的层的head 指向newNode
  if (level > this.curentLevel) {
    for (let i = this.curentLevel; i < level; i++) {
      this.head.next[i] = newNode;
    }
    this.curentLevel = level;
  }

};

/** 删除该节点
 * @param {number} num
 * @return {boolean}
 */
Skiplist.prototype.erase = function (num) {
  let flag = false;
  let searchNode = this.head;
  for (let i = this.curentLevel - 1; i >= 0; i--) {
    searchNode = this.findClosest(searchNode, i, num);
    if (searchNode.next[i] != null && searchNode.next[i].value == num) {
      // 删除就是链表的删除节点，next指向next.next
      searchNode.next[i] = searchNode.next[i].next[i];
      flag = true;
    }

  }
  return flag;
};

// 补充函数1：返回一个随即层数,控制在第一层的概率在3/4
Skiplist.prototype.randomLevel = function () {
  let level = 1;
  while (Math.random() < this.defaultFactor && level < this.defaultMaxLevel) {
    level++;
  }
  return level;
}
// 补充函数2:顺着当前层开始查找，找出第一个 node.next大于target的节点或者空节点也可以
// 由于是node.next大于该节点，那么就是node小于它，node.next大于它，正好可以插在node后面
Skiplist.prototype.findClosest = function (node, levelIndex, target) {
  while (node.next[levelIndex] != null && node.next[levelIndex].value < target) {
    node = node.next[levelIndex];
  }
  return node;
}


