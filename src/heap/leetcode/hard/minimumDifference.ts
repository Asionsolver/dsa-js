// 2163. Minimum Difference in Sums After Removal of Elements

/**
Example 1:

Input: nums = [3,1,2]
Output: -1
Explanation: Here, nums has 3 elements, so n = 1. 
Thus we have to remove 1 element from nums and divide the array into two equal parts.
- If we remove nums[0] = 3, the array will be [1,2]. The difference in sums of the two parts will be 1 - 2 = -1.
- If we remove nums[1] = 1, the array will be [3,2]. The difference in sums of the two parts will be 3 - 2 = 1.
- If we remove nums[2] = 2, the array will be [3,1]. The difference in sums of the two parts will be 3 - 1 = 2.
The minimum difference between sums of the two parts is min(-1,1,2) = -1. 
Example 2:

Input: nums = [7,9,5,8,1,3]
Output: 1
Explanation: Here n = 2. So we must remove 2 elements and divide the remaining array into two parts containing two elements each.
If we remove nums[2] = 5 and nums[3] = 8, the resultant array will be [7,9,1,3]. The difference in sums will be (7+9) - (1+3) = 12.
To obtain the minimum difference, we should remove nums[1] = 9 and nums[4] = 1. The resultant array becomes [7,5,8,3]. The difference in sums of the two parts is (7+5) - (8+3) = 1.
It can be shown that it is not possible to obtain a difference smaller than 1.
*/

class MinHeap {
  data: number[];
  constructor() {
    this.data = [];
  }
  push(val: number): void {
    this.data.push(val);
    let idx = this.data.length - 1;
    while (idx > 0) {
      let pIdx = (idx - 1) >> 1;
      if (this.data[pIdx] > val) {
        this.data[idx] = this.data[pIdx];
        idx = pIdx;
      } else {
        break;
      }
    }
    this.data[idx] = val;
  }
  pop(): number {
    if (this.data.length === 1) return this.data.pop()!;
    const top = this.data[0];
    const bottom = this.data.pop()!;
    this.data[0] = bottom;
    let idx = 0;
    const length = this.data.length;
    while (true) {
      let left = (idx << 1) + 1;
      let right = left + 1;
      let minIdx = idx;

      if (left < length && this.data[left] < this.data[minIdx]) {
        minIdx = left;
      }
      if (right < length && this.data[right] < this.data[minIdx]) {
        minIdx = right;
      }
      if (minIdx !== idx) {
        this.data[idx] = this.data[minIdx];
        this.data[minIdx] = bottom;
        idx = minIdx;
      } else {
        break;
      }
    }
    return top;
  }
}

class MaxHeap {
  data: number[];
  constructor() {
    this.data = [];
  }
  push(val: number): void {
    this.data.push(val);
    let idx = this.data.length - 1;
    while (idx > 0) {
      let pIdx = (idx - 1) >> 1;
      if (this.data[pIdx] < val) {
        this.data[idx] = this.data[pIdx];
        idx = pIdx;
      } else {
        break;
      }
    }
    this.data[idx] = val;
  }
  pop(): number {
    if (this.data.length === 1) return this.data.pop()!;
    const top = this.data[0];
    const bottom = this.data.pop()!;
    this.data[0] = bottom;
    let idx = 0;
    const length = this.data.length;
    while (true) {
      let left = (idx << 1) + 1;
      let right = left + 1;
      let maxIdx = idx;

      if (left < length && this.data[left] > this.data[maxIdx]) {
        maxIdx = left;
      }
      if (right < length && this.data[right] > this.data[maxIdx]) {
        maxIdx = right;
      }
      if (maxIdx !== idx) {
        this.data[idx] = this.data[maxIdx];
        this.data[maxIdx] = bottom;
        idx = maxIdx;
      } else {
        break;
      }
    }
    return top;
  }
}

function minimumDifference(nums: number[]): number {
  const n = nums.length / 3;

  // Compute minimal prefix sums
  const maxHeap = new MaxHeap();
  let currentFirstSum = 0;
  const minSumFirst = new Float64Array(2 * n + 1);

  for (let i = 0; i < n; i++) {
    maxHeap.push(nums[i]);
    currentFirstSum += nums[i];
  }
  minSumFirst[n] = currentFirstSum;

  for (let i = n; i < 2 * n; i++) {
    maxHeap.push(nums[i]);
    currentFirstSum += nums[i];
    const maxVal = maxHeap.pop();
    currentFirstSum -= maxVal;
    minSumFirst[i + 1] = currentFirstSum;
  }

  // Compute maximal suffix sums
  const minHeap = new MinHeap();
  let currentSecondSum = 0;
  const maxSumSecond = new Float64Array(2 * n + 1);

  for (let i = 3 * n - 1; i >= 2 * n; i--) {
    minHeap.push(nums[i]);
    currentSecondSum += nums[i];
  }
  maxSumSecond[2 * n] = currentSecondSum;

  for (let i = 2 * n - 1; i >= n; i--) {
    minHeap.push(nums[i]);
    currentSecondSum += nums[i];
    const minVal = minHeap.pop();
    currentSecondSum -= minVal;
    maxSumSecond[i] = currentSecondSum;
  }

  // Iterate over valid split spots and find minimal difference
  let minDiff = Infinity;
  for (let i = n; i <= 2 * n; i++) {
    const diff = minSumFirst[i] - maxSumSecond[i];
    if (diff < minDiff) {
      minDiff = diff;
    }
  }

  return minDiff;
}

// Example usage:
console.log(minimumDifference([3, 1, 2])); // Output: -1
console.log(minimumDifference([7, 9, 5, 8, 1, 3])); // Output: 1
