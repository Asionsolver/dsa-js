// 1834. Single-Threaded CPU

/**
Example 1:

Input: tasks = [[1,2],[2,4],[3,2],[4,1]]
Output: [0,2,3,1]
Explanation: The events go as follows: 
- At time = 1, task 0 is available to process. Available tasks = {0}.
- Also at time = 1, the idle CPU starts processing task 0. Available tasks = {}.
- At time = 2, task 1 is available to process. Available tasks = {1}.
- At time = 3, task 2 is available to process. Available tasks = {1, 2}.
- Also at time = 3, the CPU finishes task 0 and starts processing task 2 as it is the shortest. Available tasks = {1}.
- At time = 4, task 3 is available to process. Available tasks = {1, 3}.
- At time = 5, the CPU finishes task 2 and starts processing task 3 as it is the shortest. Available tasks = {1}.
- At time = 6, the CPU finishes task 3 and starts processing task 1. Available tasks = {}.
- At time = 10, the CPU finishes task 1 and becomes idle.
Example 2:

Input: tasks = [[7,10],[7,12],[7,5],[7,4],[7,2]]
Output: [4,3,2,0,1]
Explanation: The events go as follows:
- At time = 7, all the tasks become available. Available tasks = {0,1,2,3,4}.
- Also at time = 7, the idle CPU starts processing task 4. Available tasks = {0,1,2,3}.
- At time = 9, the CPU finishes task 4 and starts processing task 3. Available tasks = {0,1,2}.
- At time = 13, the CPU finishes task 3 and starts processing task 2. Available tasks = {0,1}.
- At time = 18, the CPU finishes task 2 and starts processing task 0. Available tasks = {1}.
- At time = 28, the CPU finishes task 0 and starts processing task 1. Available tasks = {}.
- At time = 40, the CPU finishes task 1 and becomes idle.
*/

interface TaskNode {
  pt: number;
  id: number;
}

const getOrder = function (tasks: number[][]): number[] {
  const n = tasks.length;
  // Create an array tracking indices to sort later without modifying the original task structures
  const indices = Array.from({ length: n }, (_, i) => i);

  // Sort tasks sequentially by their available enqueueTime
  indices.sort((a, b) => tasks[a][0] - tasks[b][0]);

  // Custom Minimum-Heap Data Structure
  class MinHeap {
    heap: TaskNode[] = [];

    push(val: TaskNode) {
      this.heap.push(val);
      this.bubbleUp(this.heap.length - 1);
    }

    pop(): TaskNode | undefined {
      if (this.heap.length === 0) return undefined;
      const min = this.heap[0];
      const last = this.heap.pop()!;
      if (this.heap.length > 0) {
        this.heap[0] = last;
        this.sinkDown(0);
      }
      return min;
    }

    isEmpty(): boolean {
      return this.heap.length === 0;
    }

    compare(a: TaskNode, b: TaskNode): number {
      if (a.pt !== b.pt) return a.pt - b.pt; // Ascending order for processing time
      return a.id - b.id; // Ascending order for initial sequence idx (tie-breaker)
    }

    bubbleUp(idx: number) {
      const element = this.heap[idx];
      while (idx > 0) {
        const parentIdx = Math.floor((idx - 1) / 2);
        const parent = this.heap[parentIdx];
        if (this.compare(element, parent) >= 0) break;

        this.heap[idx] = parent;
        idx = parentIdx;
      }
      this.heap[idx] = element;
    }

    sinkDown(idx: number) {
      const length = this.heap.length;
      const element = this.heap[idx];
      while (true) {
        let leftChildIdx = 2 * idx + 1;
        let rightChildIdx = 2 * idx + 2;
        let smallest = idx;

        if (
          leftChildIdx < length &&
          this.compare(this.heap[leftChildIdx], element) < 0
        ) {
          smallest = leftChildIdx;
        }
        // Check if right child exists and its comparison states against either the leftChild or the initial element
        if (
          rightChildIdx < length &&
          this.compare(
            this.heap[rightChildIdx],
            smallest === idx ? element : this.heap[smallest],
          ) < 0
        ) {
          smallest = rightChildIdx;
        }
        if (smallest === idx) break;

        this.heap[idx] = this.heap[smallest];
        idx = smallest;
      }
      this.heap[idx] = element;
    }
  }

  const result: number[] = [];
  const heap = new MinHeap();
  let currentTime = 0;
  let i = 0;

  // Continue until all items have been evaluated and the queue falls entirely empty
  while (i < n || !heap.isEmpty()) {
    if (heap.isEmpty() && currentTime < tasks[indices[i]][0]) {
      currentTime = tasks[indices[i]][0]; // Fast-forward time straight to upcoming task event
    }

    // Populate the heap with all pending tasks available at the moment
    while (i < n) {
      const idx = indices[i];
      const t = tasks[idx];
      if (t[0] > currentTime) break;

      heap.push({ pt: t[1], id: idx });
      i++;
    }

    const task = heap.pop()!;
    currentTime += task.pt;
    result.push(task.id);
  }

  return result;
};

// example test case
console.log(
  getOrder([
    [1, 2],
    [2, 4],
    [3, 2],
    [4, 1],
  ]),
); // Output: [0,2,3,1]
console.log(
  getOrder([
    [7, 10],
    [7, 12],
    [7, 5],
    [7, 4],
    [7, 2],
  ]),
); // Output: [4,3,2,0,1]
