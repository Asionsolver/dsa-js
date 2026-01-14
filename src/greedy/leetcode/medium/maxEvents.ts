// 1353. Maximum Number of Events That Can Be Attended

/**
Example 1:


Input: events = [[1,2],[2,3],[3,4]]
Output: 3
Explanation: You can attend all the three events.
One way to attend them all is as shown.
Attend the first event on day 1.
Attend the second event on day 2.
Attend the third event on day 3.
Example 2:

Input: events= [[1,2],[2,3],[3,4],[1,2]]
Output: 4

*/
const events = [
  [1, 2],
  [2, 3],
  [3, 4],
  [1, 2],
];
function maxEvents(events: number[][]): number {
  // Sort events by start day
  events.sort((a, b) => a[0] - b[0]);

  let i = 0;
  let count = 0;
  let day = 0;
  const n = events.length;

  // Use the renamed class to avoid conflicts
  const pq = new MyMinHeap();

  while (i < n || !pq.isEmpty()) {
    // Optimization: If no events are in queue, jump 'day' to the next event start
    if (pq.isEmpty()) {
      day = Math.max(day, events[i][0]);
    }

    // Add all events starting on 'day' to the heap
    while (i < n && events[i][0] <= day) {
      pq.push(events[i][1]);
      i++;
    }

    // Remove expired events (endDay < current day)
    while (!pq.isEmpty() && pq.peek()! < day) {
      pq.pop();
    }

    // Attend the event that ends the soonest
    if (!pq.isEmpty()) {
      pq.pop();
      count++;
    }

    day++;
  }

  return count;
}

// Renamed class to 'MyMinHeap' to fix TS2440 error
class MyMinHeap {
  private heap: number[] = [];

  push(val: number): void {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): number | undefined {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return min;
  }

  peek(): number | undefined {
    return this.heap[0];
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] >= this.heap[parentIndex]) break;
      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[index],
      ];
      index = parentIndex;
    }
  }

  private bubbleDown(index: number): void {
    const lastIndex = this.heap.length - 1;
    while (true) {
      let swapIndex = -1;
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;

      if (leftIndex <= lastIndex) {
        if (this.heap[leftIndex] < this.heap[index]) {
          swapIndex = leftIndex;
        }
      }

      if (rightIndex <= lastIndex) {
        if (
          this.heap[rightIndex] <
          (swapIndex === -1 ? this.heap[index] : this.heap[leftIndex])
        ) {
          swapIndex = rightIndex;
        }
      }

      if (swapIndex === -1) break;

      [this.heap[index], this.heap[swapIndex]] = [
        this.heap[swapIndex],
        this.heap[index],
      ];
      index = swapIndex;
    }
  }
}

console.log(maxEvents(events));
