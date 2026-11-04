// 3505. Minimum Operations to Make Elements Within K Subarrays Equal

/**
You are given an integer array nums and two integers, x and k. You can perform the following operation any number of times (including zero):

Increase or decrease any element of nums by 1.
Return the minimum number of operations needed to have at least k non-overlapping subarrays of size exactly x in nums, where all elements within each subarray are equal.
*/

/**
Example 1:

Input: nums = [5,-2,1,3,7,3,6,4,-1], x = 3, k = 2

Output: 8

Explanation:

Use 3 operations to add 3 to nums[1] and use 2 operations to subtract 2 from nums[3]. The resulting array is [5, 1, 1, 1, 7, 3, 6, 4, -1].
Use 1 operation to add 1 to nums[5] and use 2 operations to subtract 2 from nums[6]. The resulting array is [5, 1, 1, 1, 7, 4, 4, 4, -1].
Now, all elements within each subarray [1, 1, 1] (from indices 1 to 3) and [4, 4, 4] (from indices 5 to 7) are equal. Since 8 total operations were used, 8 is the output.
Example 2:

Input: nums = [9,-2,-2,-2,1,5], x = 2, k = 2

Output: 3

Explanation:

Use 3 operations to subtract 3 from nums[4]. The resulting array is [9, -2, -2, -2, -2, 5].
Now, all elements within each subarray [-2, -2] (from indices 1 to 2) and [-2, -2] (from indices 3 to 4) are equal. Since 3 operations were used, 3 is the output.
*/

/**
Constraints:

2 <= nums.length <= 105
-106 <= nums[i] <= 106
2 <= x <= nums.length
1 <= k <= 15
2 <= k * x <= nums.length
*/

// Brute Force Approach: Backtracking with Cost Calculation --- TLE
// function minOperations(nums: number[], x: number, k: number): number {
//   const n = nums.length;

//   // Helper function to calculate the cost of making all elements in nums[start ... start + x - 1] equal.
//   function getWindowCost(start: number): number {
//     const sub = nums.slice(start, start + x);
//     sub.sort((a, b) => a - b);

//     // The optimal value to minimize absolute deviations is the median.
//     const median = sub[Math.floor(x / 2)];
//     let cost = 0;
//     for (const num of sub) {
//       cost += Math.abs(num - median);
//     }
//     return cost;
//   }

//   // Recursive function to explore all choices.
//   function backtrack(index: number, remainingK: number): number {
//     // Base case: successfully picked all k subarrays.
//     if (remainingK === 0) return 0;

//     // Base case: not enough elements left to form remaining subarrays.
//     if (index + remainingK * x > n) return Infinity;

//     // Option 1: Skip current element.
//     const skip = backtrack(index + 1, remainingK);

//     // Option 2: Take subarray of size x starting at index.
//     const cost = getWindowCost(index);
//     const take = cost + backtrack(index + x, remainingK - 1);

//     return Math.min(skip, take);
//   }

//   return backtrack(0, k);
// }

// Optimized Approach: Dynamic Programming with Fenwick Tree (Binary Indexed Tree)
function minOperations(nums: number[], x: number, k: number): number {
  const n = nums.length;

  // 1. Coordinate Compression for Fenwick Tree.
  const sortedUnique = Array.from(new Set(nums)).sort((a, b) => a - b);
  const m = sortedUnique.length;

  // Map each distinct number to its 1-based rank.
  const rankMap = new Map<number, number>();
  for (let i = 0; i < m; i++) {
    rankMap.set(sortedUnique[i], i + 1);
  }

  // Fenwick Trees: one for counts, one for actual value sums.
  const bitCount = new Int32Array(m + 1);
  const bitSum = new Float64Array(m + 1);

  function add(rank: number, countDelta: number, valDelta: number): void {
    for (let i = rank; i <= m; i += i & -i) {
      bitCount[i] += countDelta;
      bitSum[i] += valDelta;
    }
  }

  function queryCount(rank: number): number {
    let sum = 0;
    for (let i = rank; i > 0; i -= i & -i) {
      sum += bitCount[i];
    }
    return sum;
  }

  function querySum(rank: number): number {
    let sum = 0;
    for (let i = rank; i > 0; i -= i & -i) {
      sum += bitSum[i];
    }
    return sum;
  }

  // Binary lifting on Fenwick Tree to find the k-th smallest element's rank in O(log m).
  function findKth(target: number): number {
    let idx = 0;
    let step = 1;
    while (step <= m) step <<= 1;
    step >>= 1;

    for (; step > 0; step >>= 1) {
      if (idx + step <= m && bitCount[idx + step] < target) {
        idx += step;
        target -= bitCount[idx];
      }
    }
    return idx + 1;
  }

  // windowCost[i] will store the minimum operations for the subarray ending at index i.
  const windowCost = new Float64Array(n);
  let currentWindowTotalSum = 0;
  const medianTargetRank = Math.floor((x + 1) / 2);

  for (let i = 0; i < n; i++) {
    const rank = rankMap.get(nums[i])!;
    add(rank, 1, nums[i]);
    currentWindowTotalSum += nums[i];

    // Remove the element that falls out of the sliding window.
    if (i >= x) {
      const outRank = rankMap.get(nums[i - x])!;
      add(outRank, -1, -nums[i - x]);
      currentWindowTotalSum -= nums[i - x];
    }

    // When a full window of size x is formed, calculate the optimal cost.
    if (i >= x - 1) {
      const medRank = findKth(medianTargetRank);
      const medVal = sortedUnique[medRank - 1];

      const countLeft = queryCount(medRank);
      const sumLeft = querySum(medRank);

      const countRight = x - countLeft;
      const sumRight = currentWindowTotalSum - sumLeft;

      // Operations to bring all elements to medVal.
      windowCost[i] =
        countLeft * medVal - sumLeft + (sumRight - countRight * medVal);
    }
  }

  // 2. Dynamic Programming: Pick k non-overlapping windows of size x.
  let prevDp = new Float64Array(n + 1).fill(0);

  for (let j = 1; j <= k; j++) {
    const currDp = new Float64Array(n + 1).fill(Infinity);
    for (let i = j * x; i <= n; i++) {
      // Option A: Do not end a subarray at index i - 1.
      let res = currDp[i - 1];

      // Option B: End a subarray of size x at index i - 1.
      const cost = windowCost[i - 1] + prevDp[i - x];
      if (cost < res) {
        res = cost;
      }

      currDp[i] = res;
    }
    prevDp = currDp;
  }

  return prevDp[n];
}
// Example usage:
const nums1 = [5, -2, 1, 3, 7, 3, 6, 4, -1];
const x1 = 3;
const k1 = 2;
console.log(minOperations(nums1, x1, k1)); // Output: 8

const nums2 = [9, -2, -2, -2, 1, 5];
const x2 = 2;
const k2 = 2;
console.log(minOperations(nums2, x2, k2)); // Output: 3
