class MaxHeap {
  heap: number[] = [];
  constructor() {
    this.heap = [];
  }

  getParentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChild(index: number) {
    return 2 * index + 1;
  }
  getRightChild(index: number) {
    return 2 * index + 2;
  }

  swap(indexOne: number, indexTwo: number) {
    const temp = this.heap[indexOne];
    this.heap[indexOne] = this.heap[indexTwo];
    this.heap[indexTwo] = temp;

    // destructuring assignment
    // [this.heap[indexOne], this.heap[indexTwo]] = [this.heap[indexTwo], this.heap[indexOne]]
  }

  bubbleUp(index: number) {
    let parentIndex = this.getParentIndex(index);
    while (index > 0 && this.heap[index] > this.heap[parentIndex]) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
    }
  }

  inset(value: number) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  print() {
    console.log(this.heap);
  }
}

const maxHeap = new MaxHeap();
maxHeap.inset(10);
maxHeap.inset(15);
maxHeap.inset(5);
maxHeap.inset(7);
maxHeap.inset(50);
maxHeap.inset(40);
maxHeap.inset(60);
maxHeap.print();
