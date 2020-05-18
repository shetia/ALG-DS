/*
 * @Descripttion:
 * @version:
 * @Author: shetia
 * @Date: 2020-04-21 22:02:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-22 17:20:03
 */
/*
数组测试平台，它将辅助我们完成基本排序算法的研究。我们将创
建一个数组类和一些封装了常规数组操作的函数：插入新数据，显示数组数据及调用不同
的排序算法。这个类还包含了一个 swap() 函数，用于交换数组元素。
*/
class CArray {
  constructor(numElements) {
    this.dataStore = []
    this.pos = 0
    this.numElements = numElements
    // this.insert = insert
    // this.toString = toString
    // this.clear = clear
    // this.setData = setData
    // this.swap = swap
    for (let i = 0; i < numElements; i++) {
      this.dataStore[i] = i
    }
  }
  setData() {
    for (let i = 0; i < this.numElements; i++) {
      this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1))
    }
  }
  clear() {
    for (let i = 0; i < this.numElements; i++) {
      this.dataStore[i] = 0
    }
  }
  insert(element) {
    this.dataStore[this.pos++] = element
  }
  toString() {
    let restr = ''
    for (let i = 0; i < this.dataStore.length; i++) {
      restr += this.dataStore[i] + ' '
      if (i > 0 && i % 10 === 0) {
        restr += '\n'
      }
    }
    return restr
  }
  swap(arr, index1, index2) {
    ;[arr[index1], arr[index2]] = [arr[index2], arr[index1]]
  }
  // 一、冒泡排序
  bubbleSort() {
    let len = this.dataStore.length
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        if (this.dataStore[j] > this.dataStore[j + 1]) {
          this.swap(this.dataStore, j, j + 1)
        }
      }
      // console.log(this.toString(), '-----------', i)
    }
  }
  //
  /*
   二、选择排序
   选择排序从数组的开头开始，将第一个元素和其他元素进行比较。
   检查完所有元素后，最小的元素会被放到数组的第一个位置,然后算法会从第二个位置继续。
   这个过程一直进行，当进行到数组的倒数第二个位置时，所有的数据便完成了排序。
  */
  selectionSort() {
    let len = this.dataStore.length
    for (let i = 0; i < len - 1; i++) {
      for (let j = i + 1; j < len; j++) {
        if (this.dataStore[i] > this.dataStore[j]) {
          this.swap(this.dataStore, i, j)
        }
      }
    }
  }
  /*
  三、插入排序
  插入排序类似于人类按数字或字母顺序对数据进行排序
  插入排序有两个循环。外循环将数组元素挨个移动，而内循环则对外循环中选中的元素及
它后面的那个元素进行比较。如果外循环中选中的元素比内循环中选中的元素小，那么数
组元素会向右移动，为内循环中的这个元素腾出位置，
 */
  insertionSort() {
    for (let i = 1; i < this.dataStore.length; i++) {
      let item = this.dataStore[i]
      let j = i
      while (j > 0 && this.dataStore[j - 1] >= item) {
        this.dataStore[j] = this.dataStore[j - 1]
        j--
      }
      this.dataStore[j] = item
      // console.log(this.toString(), '------------', i)
    }
  }
  /* 
  四、归并排序
  但归并排序性能不错，其复杂度为O(nlogn)。
  归并排序是一种分治算法,其思想是将原始数组切分成较小的数组，直到每个小数组只有一
个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。
  */
  mergeSort() {
    this.dataStore = this.mergeSortRec(this.dataStore)
  }
  mergeSortRec(array) {
    let len = array.length
    if (len === 1) return array
    let min = Math.floor(len / 2)
    let left = array.slice(0, min)
    let right = array.slice(min, len)
    return this.merge(this.mergeSortRec(left), this.mergeSortRec(right))
  }
  merge(left, right) {
    let result = []
    let il = 0
    let ir = 0
    while (il < left.length && ir < right.length) {
      if (left[il] < right[ir]) {
        result.push(left[il++])
      } else {
        result.push(right[ir++])
      }
    }
    while (il < left.length) {
      result.push(left[il++])
    }
    while (ir < right.length) {
      result.push(right[ir++])
    }
    return result
  }
  /* 
  五、快速排序 复杂度为O(nlogn)
  和归并排序一样，快速排序也使用分治的方法，
  将原始数组分为较小的数组（但它没有像归并排序那样将它们分割开）。
    (1) 首先，从数组中选择中间一项作为主元
    (2) 创建两个指针，左边一个指向数组第一个项，右边一个指向数组最后一个项。移动左指
    针直到我们找到一个比主元大的元素，接着，移动右指针直到找到一个比主元小的元素，然后交
    换它们，重复这个过程，直到左指针超过了右指针。
    (3) 接着，算法对划分后的小数组（较主元小的值组成的子数组，以及较主元大的值组成的
    子数组）重复之前的两个步骤，直至数组已完全排序。
  */
 quickSort () {
  this.quick(this.dataStore, 0, this.dataStore.length - 1)
 }
 quick (array, left, right) {
   console.log(left, right, '----')
  let index
  if (array.length > 1) {
    index = this.partition(array, left, right)  // 帮助我们将子数组分离为较小值数组和较大值数组
    if (left < index - 1) {                // 如果子数组存在较小值的元素
      this.quick(array, left, index - 1)
    }
    if (index < right) {
      this.quick(array, index, right)   // 如果存在子数组存在较大值，我们也将重复快速排序过程
    }
  }
 }
 partition (array, left, right) {
   let middle = array[Math.floor((right + left) / 2)]
   let i = left
   let j = right
   while(i <= j) {
     while(array[i] < middle){   // 移动左指针 直到遇到大于或等于中间值的 为止
       i++
     }
     while(array[j] > middle){  // 移动右指针， 直到遇到小于或等于中间值的 为止
       j--
     }
     if(i <= j){               // 当左指针 小于等于 右指针时 交换两个位置的值， 同时移动左右指针， 重新开始循环 直到左指针大于右指针
       this.swap(array, i, j)
       i++
       j--
     }
   }
   console.log(i, 'index')
   return i
 }
}
/* 
JavaScript的Array类定义了一个sort函数（Array.prototype.sort）用
以排序JavaScript数组（我们不必自己实现这个算法）。ECMAScript没有定义用哪
个排序算法，所以浏览器厂商可以自行去实现算法。例如，Mozilla Firefox使用
归并排序作为Array.prototype.sort的实现，而Chrome使用了一个快速排序的变体

*/
export default CArray
