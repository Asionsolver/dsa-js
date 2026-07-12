// 295. Find Median from Data Stream

/**
Example 1:

Input
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output
[null, null, null, 1.5, null, 2.0]

Explanation
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0
*/

class Heaps<T> {
  private Heaps: T[] = [];
  constructor(private compare: (a: T, b: T) => number) {}

  push(val: T): void {
    this.Heaps.push(val);
    this.up(this.Heaps.length - 1);
  }

  pop(): T | undefined {
    if (this.Heaps.length === 0) return undefined;
    const top = this.Heaps[0];
    const bottom = this.Heaps.pop();
    if (this.Heaps.length > 0 && bottom !== undefined) {
      this.Heaps[0] = bottom;
      this.down(0);
    }
    return top;
  }

  peek(): T | undefined {
    return this.Heaps[0];
  }

  size(): number {
    return this.Heaps.length;
  }

  private up(index: number): void {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.compare(this.Heaps[index], this.Heaps[parent]) >= 0) break;
      this.swap(index, parent);
      index = parent;
    }
  }

  private down(index: number): void {
    const len = this.Heaps.length;
    while (index * 2 + 1 < len) {
      let left = index * 2 + 1;
      let right = left + 1;
      let best = left;
      if (
        right < len &&
        this.compare(this.Heaps[right], this.Heaps[left]) < 0
      ) {
        best = right;
      }
      if (this.compare(this.Heaps[index], this.Heaps[best]) <= 0) break;
      this.swap(index, best);
      index = best;
    }
  }

  private swap(i: number, j: number): void {
    const temp = this.Heaps[i];
    this.Heaps[i] = this.Heaps[j];
    this.Heaps[j] = temp;
  }
}

class MedianFinder {
  private maxHeaps: Heaps<number>;
  private minHeaps: Heaps<number>;

  constructor() {
    this.maxHeaps = new Heaps<number>((a, b) => b - a);
    this.minHeaps = new Heaps<number>((a, b) => a - b);
  }

  addNum(num: number): void {
    this.maxHeaps.push(num);
    this.minHeaps.push(this.maxHeaps.pop()!);

    if (this.minHeaps.size() > this.maxHeaps.size()) {
      this.maxHeaps.push(this.minHeaps.pop()!);
    }
  }

  findMedian(): number {
    if (this.maxHeaps.size() > this.minHeaps.size()) {
      return this.maxHeaps.peek()!;
    }
    return (this.maxHeaps.peek()! + this.minHeaps.peek()!) / 2;
  }
}

// Example usage:
const medianFinder = new MedianFinder();
medianFinder.addNum(1); // arr = [1]
medianFinder.addNum(2); // arr = [1, 2]
console.log(medianFinder.findMedian()); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3); // arr = [1, 2, 3]
console.log(medianFinder.findMedian()); // return 2.0
