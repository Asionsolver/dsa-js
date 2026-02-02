// 3013. Divide an Array Into Subarrays With Minimum Cost II

/**
Example 1:

Input: nums = [1,3,2,6,4,2], k = 3, dist = 3
Output: 5
Explanation: The best possible way to divide nums into 3 subarrays is: [1,3], [2,6,4], and [2]. This choice is valid because ik-1 - i1 is 5 - 2 = 3 which is equal to dist. The total cost is nums[0] + nums[2] + nums[5] which is 1 + 2 + 2 = 5.
It can be shown that there is no possible way to divide nums into 3 subarrays at a cost lower than 5.
Example 2:

Input: nums = [10,1,2,2,2,1], k = 4, dist = 3
Output: 15
Explanation: The best possible way to divide nums into 4 subarrays is: [10], [1], [2], and [2,2,1]. This choice is valid because ik-1 - i1 is 3 - 1 = 2 which is less than dist. The total cost is nums[0] + nums[1] + nums[2] + nums[3] which is 10 + 1 + 2 + 2 = 15.
The division [10], [1], [2,2,2], and [1] is not valid, because the difference between ik-1 and i1 is 5 - 1 = 4, which is greater than dist.
It can be shown that there is no possible way to divide nums into 4 subarrays at a cost lower than 15.
Example 3:

Input: nums = [10,8,18,9], k = 3, dist = 1
Output: 36
Explanation: The best possible way to divide nums into 4 subarrays is: [10], [8], and [18,9]. This choice is valid because ik-1 - i1 is 2 - 1 = 1 which is equal to dist.The total cost is nums[0] + nums[1] + nums[2] which is 10 + 8 + 18 = 36.
The division [10], [8,18], and [9] is not valid, because the difference between ik-1 and i1 is 3 - 1 = 2, which is greater than dist.
It can be shown that there is no possible way to divide nums into 3 subarrays at a cost lower than 36.

*/

const nums = [1, 3, 2, 6, 4, 2],
  k = 3,
  dist = 3;

const minimumCost = function (nums: number[], k: number, dist: number): number {
  const n = nums.length;
  // We need to pick k-1 indices from [1...n-1]
  const targetK = k - 1;

  // Tracks current sum of elements logically in L
  let sumL = 0;
  // Tracks count of valid elements logically in L
  let countL = 0;
  let minSum = Infinity;

  // isInL[i] is true if index i is logically in the L set
  // using Uint8Array for efficiency (0 = false, 1 = true)
  const isInL = new Uint8Array(n);

  // Standard Priority Queue Implementation
  class Heap<T> {
    data: T[] = [];
    compare: (a: T, b: T) => number;

    constructor(compare: (a: T, b: T) => number) {
      this.compare = compare;
    }

    size(): number {
      return this.data.length;
    }

    peek(): T | undefined {
      return this.data[0];
    }

    push(val: T): void {
      this.data.push(val);
      this.siftUp(this.data.length - 1);
    }

    pop(): T | undefined {
      if (this.data.length === 0) return undefined;
      const top = this.data[0];
      const last = this.data.pop()!;
      if (this.data.length > 0) {
        this.data[0] = last;
        this.siftDown(0);
      }
      return top;
    }

    private siftUp(idx: number): void {
      while (idx > 0) {
        const p = (idx - 1) >>> 1;
        if (this.compare(this.data[idx], this.data[p]) < 0) {
          [this.data[idx], this.data[p]] = [this.data[p], this.data[idx]];
          idx = p;
        } else break;
      }
    }

    private siftDown(idx: number): void {
      const len = this.data.length;
      while (true) {
        let swap = idx;
        const left = (idx << 1) + 1;
        const right = (idx << 1) + 2;

        if (left < len && this.compare(this.data[left], this.data[swap]) < 0) {
          swap = left;
        }
        if (
          right < len &&
          this.compare(this.data[right], this.data[swap]) < 0
        ) {
          swap = right;
        }
        if (swap === idx) break;
        [this.data[idx], this.data[swap]] = [this.data[swap], this.data[idx]];
        idx = swap;
      }
    }
  }

  // L: Max-Heap (stores smallest elements, allows ejecting the largest among them)
  // Priority: Value descending, then Index descending
  const L = new Heap<number>((a, b) => {
    if (nums[a] !== nums[b]) return nums[b] - nums[a];
    return b - a;
  });

  // R: Min-Heap (stores remaining elements, allows retrieving the smallest among them)
  // Priority: Value ascending, then Index ascending
  const R = new Heap<number>((a, b) => {
    if (nums[a] !== nums[b]) return nums[a] - nums[b];
    return a - b;
  });

  // Helper to remove "dead" indices (outside current window) from top of heap
  const clean = (heap: Heap<number>, startWindow: number) => {
    while (heap.size() > 0 && heap.peek()! < startWindow) {
      heap.pop();
    }
  };

  for (let i = 1; i < n; i++) {
    const startWindow = i - dist;
    const leaving = i - dist - 1;

    // 1. Handle element leaving the window
    if (leaving >= 1) {
      if (isInL[leaving]) {
        sumL -= nums[leaving];
        countL--;
        isInL[leaving] = 0;
        // We don't remove from heap immediately (lazy removal)
      }
      // If in R, we just ignore it; clean() will catch it later
    }

    // 2. Fill deficit in L (if valid count < targetK)
    // We might need to take best candidate from R
    clean(R, startWindow); // Ensure top of R is valid
    while (countL < targetK && R.size() > 0) {
      const idx = R.pop()!;
      if (idx < startWindow) {
        clean(R, startWindow);
        continue;
      }
      // Move valid element from R to L
      isInL[idx] = 1;
      sumL += nums[idx];
      countL++;
      L.push(idx);
      clean(R, startWindow);
    }

    // 3. Add new element `i`
    // We greedily add to L, then rebalance
    L.push(i);
    isInL[i] = 1;
    sumL += nums[i];
    countL++;

    // 4. Fix overflow in L (if valid count > targetK)
    clean(L, startWindow); // Ensure top of L is valid
    while (countL > targetK) {
      const idx = L.pop()!;
      if (idx < startWindow) {
        // If we popped a dead element, we haven't reduced countL (it was already decremented when leaving)
        // Just discard and retry
        clean(L, startWindow);
        continue;
      }
      // Move valid element from L to R
      isInL[idx] = 0;
      sumL -= nums[idx];
      countL--;
      R.push(idx);
      clean(L, startWindow);
    }

    // 5. Update answer if we have enough elements
    if (countL === targetK) {
      minSum = Math.min(minSum, sumL);
    }
  }

  return nums[0] + minSum;
};

console.log(minimumCost(nums, k, dist));
