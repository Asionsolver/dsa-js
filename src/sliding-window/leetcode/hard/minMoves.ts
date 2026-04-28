// 1703. Minimum Adjacent Swaps for K Consecutive Ones

/**
Example 1:

Input: nums = [1,0,0,1,0,1], k = 2
Output: 1
Explanation: In 1 move, nums could be [1,0,0,0,1,1] and have 2 consecutive 1's.
Example 2:

Input: nums = [1,0,0,0,0,0,1,1], k = 3
Output: 5
Explanation: In 5 moves, the leftmost 1 can be shifted right until nums = [0,0,0,0,0,1,1,1].
Example 3:

Input: nums = [1,1,0,1], k = 2
Output: 0
Explanation: nums already has 2 consecutive 1's.
 */

function minMoves(nums: number[], k: number): number {
  const p: number[] = [];

  // Step 1: Collect positions and compute p[idx] = pos[idx] - idx
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      p.push(i - p.length);
    }
  }

  const n = p.length;

  // Step 2: Build a prefix sum array of p to query range sums in O(1)
  // We use Float64Array for memory-efficient and type-safe large number calculations
  const pref = new Float64Array(n + 1);
  for (let i = 0; i < n; i++) {
    pref[i + 1] = pref[i] + p[i];
  }

  let minCost = Infinity;
  const m = Math.floor(k / 2);

  // Step 3: Slide a window of size k and evaluate cost to assemble items around the median
  for (let i = 0; i <= n - k; i++) {
    const mid = i + m;

    // Sums of elements to the left and to the right of the median in the current window
    const leftSum = pref[mid] - pref[i];
    const rightSum = pref[i + k] - pref[mid + 1];

    let cost = rightSum - leftSum;

    // If k is even, the algebraic simplification leaves a single residual element's value
    if (k % 2 === 0) {
      cost += p[mid];
    }

    if (cost < minCost) {
      minCost = cost;
    }
  }

  return minCost;
}

// Example usage:
console.log(minMoves([1, 0, 0, 1, 0, 1], 2)); // Output: 1
console.log(minMoves([1, 0, 0, 0, 0, 0, 1, 1], 3)); // Output: 5
console.log(minMoves([1, 1, 0, 1], 2)); // Output: 0
