// 363. Max Sum of Rectangle No Larger Than K

/**
Example 1:


Input: matrix = [[1,0,1],[0,-2,3]], k = 2
Output: 2
Explanation: Because the sum of the blue rectangle [[0, 1], [-2, 3]] is 2, and 2 is the max number no larger than k (k = 2).
Example 2:

Input: matrix = [[2,2,-1]], k = 3
Output: 3

*/
const matrix = [
    [1, 0, 1],
    [0, -2, 3],
  ],
  k = 2;
/**
 * Standard Binary Search (Lower Bound).
 * Returns the index of the first element >= target.
 * If all elements are < target, returns arr.length.
 */
function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = (left + right) >>> 1; // Bitwise shift for integer division
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}

/**
 * Solves the 1D sub-problem.
 * Finds the max subarray sum <= k.
 */
function getMaxSumWithLimit(nums: number[], k: number): number {
  // 1. Optimization: Try Kadane's algorithm first.
  // It is O(N). If the max subarray sum is <= k, we are done.
  let currentSum = 0;
  let kadaneMax = -Infinity;

  for (const num of nums) {
    currentSum = Math.max(num, currentSum + num);
    kadaneMax = Math.max(kadaneMax, currentSum);
  }

  if (kadaneMax <= k) return kadaneMax;

  // 2. If Kadane's result > k, we need the slower approach O(N^2) (due to array insertion)
  // using prefix sums and a sorted list to find specific ranges.
  let maxVal = -Infinity;
  let cumSum = 0;

  // Sorted prefix sums, initialized with 0 to handle subarrays starting from index 0
  const sortedPrefixSums: number[] = [0];

  for (const num of nums) {
    cumSum += num;

    // We want to find a previous prefix sum 'prev' such that:
    // cumSum - prev <= k  =>  prev >= cumSum - k
    // We want the smallest 'prev' that satisfies this to maximize (cumSum - prev).
    const target = cumSum - k;

    // Binary search for the smallest value >= target (Lower Bound)
    const idx = binarySearch(sortedPrefixSums, target);

    if (idx < sortedPrefixSums.length) {
      maxVal = Math.max(maxVal, cumSum - sortedPrefixSums[idx]);
    }

    // If we hit k exactly, return immediately
    if (maxVal === k) return k;

    // Insert cumSum into sortedPrefixSums while maintaining order
    // Find position to insert
    const insIdx = binarySearch(sortedPrefixSums, cumSum);
    sortedPrefixSums.splice(insIdx, 0, cumSum);
  }

  return maxVal;
}

function maxSumSubMatrix(matrix: number[][], k: number): number {
  const m = matrix.length;
  const n = matrix[0].length;

  // We want to iterate over the smaller dimension as the outer loops
  // to optimize the complexity O(min(m,n)^2 * max(m,n)^2) roughly.
  const isRowLarger = m > n;

  // If rows are larger than cols, we loop over cols (0 to n)
  // If cols are larger, we loop over rows (0 to m)
  const outerDim = isRowLarger ? n : m;
  const innerDim = isRowLarger ? m : n;

  let maxResult = -Infinity;

  for (let i = 0; i < outerDim; i++) {
    // Initialize a sums array to accumulate values
    const sums = new Array(innerDim).fill(0);

    for (let j = i; j < outerDim; j++) {
      // Update the 1D compressed array
      for (let x = 0; x < innerDim; x++) {
        // If row is larger, we are compressing columns, so access matrix[x][j]
        // Else, we are compressing rows, so access matrix[j][x]
        const val = isRowLarger ? matrix[x][j] : matrix[j][x];
        sums[x] += val;
      }

      // Now solve the 1D problem: "Max Sum of Subarray No Larger Than K"
      maxResult = Math.max(maxResult, getMaxSumWithLimit(sums, k));

      // Optimization: If we found exactly k, we can't do better.
      if (maxResult === k) return k;
    }
  }

  return maxResult;
}

console.log(maxSumSubMatrix(matrix, k));
