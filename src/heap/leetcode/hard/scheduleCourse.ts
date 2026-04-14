// 630. Course Schedule III

/**
Example 1:

Input: courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]
Output: 3
Explanation: 
There are totally 4 courses, but you can take 3 courses at most:
First, take the 1st course, it costs 100 days so you will finish it on the 100th day, and ready to take the next course on the 101st day.
Second, take the 3rd course, it costs 1000 days so you will finish it on the 1100th day, and ready to take the next course on the 1101st day. 
Third, take the 2nd course, it costs 200 days so you will finish it on the 1300th day. 
The 4th course cannot be taken now, since you will finish it on the 3300th day, which exceeds the closed date.
Example 2:

Input: courses = [[1,2]]
Output: 1
Example 3:

Input: courses = [[3,2],[4,3]]
Output: 0
*/

const courses = [
  [100, 200],
  [200, 1300],
  [1000, 1250],
  [2000, 3200],
];

/**
class MaxHeaps {
  private data: number[];

  constructor() {
    this.data = [];
  }

  push(val: number): void {
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  }

  pop(): number {
    if (this.data.length === 0) return 0;
    const max = this.data[0];
    const end = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = end;
      this.sinkDown(0);
    }
    return max;
  }

  peek(): number {
    return this.data.length > 0 ? this.data[0] : 0;
  }

  size(): number {
    return this.data.length;
  }

  private bubbleUp(index: number): void {
    const element = this.data[index];
    while (index > 0) {
      const parentIndex = (index - 1) >> 1; // Math.floor((index - 1) / 2)
      const parent = this.data[parentIndex];

      if (element <= parent) break;

      this.data[parentIndex] = element;
      index = parentIndex;
    }
    this.data[index] = element;
  }

  private sinkDown(index: number): void {
    const length = this.data.length;
    const element = this.data[index];

    while (true) {
      const leftChildIdx = (index << 1) + 1; // 2 * index + 1
      const rightChildIdx = (index << 1) + 2; // 2 * index + 2
      let leftChild: number, rightChild: number;
      let swap = -1;

      if (leftChildIdx < length) {
        leftChild = this.data[leftChildIdx];
        if (leftChild > element) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.data[rightChildIdx];
        if (
          (swap === -1 && rightChild > element) ||
          (swap !== -1 && rightChild > leftChild!)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === -1) break;

      this.data[index] = this.data[swap];
      index = swap;
    }
    this.data[index] = element;
  }
}

function scheduleCourse(courses: number[][]): number {
  // 1. Sort the courses based on their strict deadlines (lastDay) ascendingly
  courses.sort((a, b) => a[1] - b[1]);

  const maxHeaps = new MaxHeaps();
  let time = 0;

  for (const [duration, lastDay] of courses) {
    // 2. If taking the course keeps us within its deadline, add it to our roster
    if (time + duration <= lastDay) {
      time += duration;
      maxHeaps.push(duration);
    }
    // 3. Otherwise, if we can replace an excessively long course with this shorter one
    else if (maxHeaps.size() > 0 && maxHeaps.peek() > duration) {
      time -= maxHeaps.pop(); // Refund the time spent on the longest course
      time += duration; // Spend the new duration's time
      maxHeaps.push(duration);
    }
  }

  // 4. The result count is simply what remains populated inside the Heap
  return maxHeaps.size();
}
*/
class MaxHeaps {
  private data: number[];

  constructor() {
    this.data = [];
  }

  push(val: number): void {
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  }

  pop(): number {
    if (this.data.length === 0) return 0;
    const max = this.data[0];
    const end = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = end;
      this.sinkDown(0);
    }
    return max;
  }

  peek(): number {
    return this.data.length > 0 ? this.data[0] : 0;
  }

  size(): number {
    return this.data.length;
  }

  private bubbleUp(index: number): void {
    const element = this.data[index];
    while (index > 0) {
      const parentIndex = (index - 1) >> 1; // Math.floor((index - 1) / 2)
      const parent = this.data[parentIndex];

      if (element <= parent) break;

      this.data[index] = parent;
      index = parentIndex;
    }
    this.data[index] = element;
  }

  private sinkDown(index: number): void {
    const length = this.data.length;
    const element = this.data[index];

    while (true) {
      const leftChildIdx = (index << 1) + 1; // 2 * index + 1
      const rightChildIdx = (index << 1) + 2; // 2 * index + 2
      let leftChild: number, rightChild: number;
      let swap = -1;

      if (leftChildIdx < length) {
        leftChild = this.data[leftChildIdx];
        if (leftChild > element) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.data[rightChildIdx];
        if (
          (swap === -1 && rightChild > element) ||
          (swap !== -1 && rightChild > leftChild!)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === -1) break;

      this.data[index] = this.data[swap];
      index = swap;
    }
    this.data[index] = element;
  }
}

function scheduleCourse(courses: number[][]): number {
  // 1. Sort the courses based on their strict deadlines (lastDay) ascendingly
  courses.sort((a, b) => a[1] - b[1]);

  const maxHeaps = new MaxHeaps();
  let time = 0;

  for (const [duration, lastDay] of courses) {
    // 2. If taking the course keeps us within its deadline, add it to our roster
    if (time + duration <= lastDay) {
      time += duration;
      maxHeaps.push(duration);
    }
    // 3. Otherwise, if we can replace an excessively long course with this shorter one
    else if (maxHeaps.size() > 0 && maxHeaps.peek() > duration) {
      time -= maxHeaps.pop(); // Refund the time spent on the longest course
      time += duration; // Spend the new duration's time
      maxHeaps.push(duration);
    }
  }

  // 4. The result count is simply what remains populated inside the Heap
  return maxHeaps.size();
}
console.log(scheduleCourse(courses));
