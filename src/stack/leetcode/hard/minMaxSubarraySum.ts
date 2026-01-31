// 3430. Maximum and Minimum Sums of at Most Size K Subarrays

/**
Example 1:

Input: nums = [1,2,3], k = 2

Output: 20

Explanation:

The subarrays of nums with at most 2 elements are:

Subarray	Minimum	Maximum	Sum
[1]	1	1	2
[2]	2	2	4
[3]	3	3	6
[1, 2]	1	2	3
[2, 3]	2	3	5
Final Total	 	 	20
The output would be 20.

Example 2:

Input: nums = [1,-3,1], k = 2

Output: -6

Explanation:

The subarrays of nums with at most 2 elements are:

Subarray	Minimum	Maximum	Sum
[1]	1	1	2
[-3]	-3	-3	-6
[1]	1	1	2
[1, -3]	-3	1	-2
[-3, 1]	-3	1	-2
Final Total	 	 	-6
The output would be -6.


*/

const nums = [1, 2, 3],
  k = 2;

const minMaxSubarraySum = function (nums: number[], k: number): number {
  const n = nums.length;
  // Arrays to store boundaries for Max logic
  const prevGe = new Int32Array(n).fill(-1);
  const nextGt = new Int32Array(n).fill(n);
  // Arrays to store boundaries for Min logic
  const prevLe = new Int32Array(n).fill(-1);
  const nextLt = new Int32Array(n).fill(n);

  let stack: number[] = [];

  // 1. Precompute boundaries for Max contribution
  // Left: nearest element >= nums[i]
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      stack.pop();
    }
    if (stack.length > 0) prevGe[i] = stack[stack.length - 1];
    stack.push(i);
  }

  stack = [];
  // Right: nearest element > nums[i]
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[i]) {
      stack.pop();
    }
    if (stack.length > 0) nextGt[i] = stack[stack.length - 1];
    stack.push(i);
  }

  // 2. Precompute boundaries for Min contribution
  stack = [];
  // Left: nearest element <= nums[i]
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] > nums[i]) {
      stack.pop();
    }
    if (stack.length > 0) prevLe[i] = stack[stack.length - 1];
    stack.push(i);
  }

  stack = [];
  // Right: nearest element < nums[i]
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] >= nums[i]) {
      stack.pop();
    }
    if (stack.length > 0) nextLt[i] = stack[stack.length - 1];
    stack.push(i);
  }

  let total = 0;

  // Helper to count valid (x, y) pairs such that:
  // 1 <= x <= A, 1 <= y <= B, x + y <= k + 1
  const countPairs = (A: number, B: number): number => {
    const S = k + 1;
    if (S <= 1) return 0;

    // We sum min(B, S - x) for x in [1, A]
    // Term must be > 0, so x < S. Effective limit for x is min(A, S-1).
    const limit = A < S - 1 ? A : S - 1;
    if (limit < 1) return 0;

    let res = 0;
    const split = S - B;

    // Part 1: x <= split (Here min(B, S-x) is B)
    // Range for x: [1, min(limit, split)]
    const u1 = limit < split ? limit : split;
    if (u1 >= 1) {
      res += u1 * B;
    }

    // Part 2: x > split (Here min(B, S-x) is S-x)
    // Range for x: [max(1, split + 1), limit]
    let l2 = split + 1;
    if (l2 < 1) l2 = 1;
    const u2 = limit;

    if (l2 <= u2) {
      const count = u2 - l2 + 1;
      // Sum of (S - x) is S*count - sum(x)
      res += S * count - ((l2 + u2) * count) / 2;
    }

    return res;
  };

  for (let i = 0; i < n; i++) {
    const val = nums[i];

    // Add contribution as Max
    const lenL_max = i - prevGe[i];
    const lenR_max = nextGt[i] - i;
    total += val * countPairs(lenL_max, lenR_max);

    // Add contribution as Min
    const lenL_min = i - prevLe[i];
    const lenR_min = nextLt[i] - i;
    total += val * countPairs(lenL_min, lenR_min);
  }

  return total;
};
console.log(minMaxSubarraySum(nums, k));
