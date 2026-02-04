// 3640. Trionic Array II

/**
Example 1:

Input: nums = [0,-2,-1,-3,0,2,-1]

Output: -4

Explanation:

Pick l = 1, p = 2, q = 3, r = 5:

nums[l...p] = nums[1...2] = [-2, -1] is strictly increasing (-2 < -1).
nums[p...q] = nums[2...3] = [-1, -3] is strictly decreasing (-1 > -3)
nums[q...r] = nums[3...5] = [-3, 0, 2] is strictly increasing (-3 < 0 < 2).
Sum = (-2) + (-1) + (-3) + 0 + 2 = -4.
Example 2:

Input: nums = [1,4,2,7]

Output: 14

Explanation:

Pick l = 0, p = 1, q = 2, r = 3:

nums[l...p] = nums[0...1] = [1, 4] is strictly increasing (1 < 4).
nums[p...q] = nums[1...2] = [4, 2] is strictly decreasing (4 > 2).
nums[q...r] = nums[2...3] = [2, 7] is strictly increasing (2 < 7).
Sum = 1 + 4 + 2 + 7 = 14.

*/

const nums = [1, 4, 2, 7];
function maxTrionicSubarray(nums: number[]): number {
  const n = nums.length;

  // dp0: Max sum ending at i in Phase 1 (Strictly Increasing)
  // dp1: Max sum ending at i in Phase 2 (Strictly Decreasing)
  // dp2: Max sum ending at i in Phase 3 (Strictly Increasing)
  // Initialize with -Infinity effectively handles invalid states.
  let dp0 = -Infinity;
  let dp1 = -Infinity;
  let dp2 = -Infinity;

  let globalMax = -Infinity;

  for (let i = 1; i < n; i++) {
    const curr = nums[i];
    const prev = nums[i - 1];

    // Store previous states to perform simultaneous updates
    const prevDp0 = dp0;
    const prevDp1 = dp1;
    const prevDp2 = dp2;

    // --- State 0: Phase 1 (Increasing) ---
    // If increasing, we can either:
    // 1. Extend an existing increasing sequence (prevDp0 + curr)
    // 2. Start a new increasing sequence from prev (prev + curr)
    if (curr > prev) {
      dp0 = curr + Math.max(prev, prevDp0);
    } else {
      dp0 = -Infinity;
    }

    // --- State 1: Phase 2 (Decreasing) ---
    // If decreasing, we can either:
    // 1. Extend an existing decreasing sequence (prevDp1 + curr)
    // 2. Transition from Phase 1 (prevDp0 + curr). This implies i-1 was peak p.
    if (curr < prev) {
      dp1 = curr + Math.max(prevDp1, prevDp0);
    } else {
      dp1 = -Infinity;
    }

    // --- State 2: Phase 3 (Increasing) ---
    // If increasing, we can either:
    // 1. Extend an existing Phase 3 sequence (prevDp2 + curr)
    // 2. Transition from Phase 2 (prevDp1 + curr). This implies i-1 was valley q.
    if (curr > prev) {
      dp2 = curr + Math.max(prevDp2, prevDp1);
    } else {
      dp2 = -Infinity;
    }

    // Update global maximum if we have a valid trionic subarray ending at i
    if (dp2 > globalMax) {
      globalMax = dp2;
    }
  }

  return globalMax;
}

console.log(maxTrionicSubarray(nums));
