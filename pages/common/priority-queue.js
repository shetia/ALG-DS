/**
 * Priority Queue  优先队列
 *
 * Binary Heap implementation  二叉堆实现
 *
 * clear: Removes all of the elements from this priority queue. 从这个优先队列中删除所有元素
 * offer: Inserts the specified element into this priority queue. 将指定的元素插入此优先队列
 * peek: Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty. 检索但不删除此队列的头，或在此队列为空时返回null
 * poll: Retrieves and removes the head of this queue, or returns null if this queue is empty.检索并删除此队列的头，如果此队列为空，则返回null
 * size: Returns the number of elements in this collection. 返回此集合中的元素数
 * toArray: Returns an array containing all of the elements in this queue.返回一个包含此队列中所有元素的数组
 */

class PriorityQueue {
  constructor({ comparator = (a, b) => a - b, initialValues = [] } = {}) {
    this.comparator = comparator;
    this.data = initialValues;
    this.heapify();
  }

  peek() {
    if (this.size() === 0) {
      return null;
    }

    return this.data[0];
  }

  offer(value) {  // 将指定的元素插入此优先队列
    this.data.push(value);
    this.bubbleUp(this.data.length - 1);
  }

  poll() {  // 检索并删除此队列的头，如果此队列为空，则返回null
    if (this.size() === 0) {
      return null;
    }

    const result = this.data[0];
    const last = this.data.pop();

    if (this.data.length > 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }

    return result;
  }

  clear() {
    this.data = [];
  }

  size() {
    return this.data.length;
  }

  isEmpty() {
    return this.data.length === 0;
  }

  toArray() {
    return this.data.slice(0).sort(this.comparator);
  }

  heapify() {
    if (this.data.length > 0) {
      for (let i = 1; i < this.data.length; i++) {
        this.bubbleUp(i);
      }
    }
  }

  bubbleUp(pos) { // 向上冒泡
    while (pos > 0) {
      let parent = (pos - 1) >>> 1;

      if (this.comparator(this.data[pos], this.data[parent]) < 0) {
        const temp = this.data[parent];
        this.data[parent] = this.data[pos];
        this.data[pos] = temp;
        pos = parent;
      } else {
        break;
      }
    }
  }

  bubbleDown(pos) { // 向下冒泡
    const last = this.data.length - 1;

    while (true) {
      let left = (pos << 1) + 1;
      let right = left + 1;
      let minIndex = pos;

      if (left <= last && this.comparator(this.data[left], this.data[minIndex]) < 0) {
        minIndex = left;
      }

      if (right <= last && this.comparator(this.data[right], this.data[minIndex]) < 0) {
        minIndex = right;
      }

      if (minIndex !== pos) {
        const temp = this.data[minIndex];
        this.data[minIndex] = this.data[pos];
        this.data[pos] = temp;
        pos = minIndex;
      } else {
        break;
      }
    }
  }
}

export default PriorityQueue;
