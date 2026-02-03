// 3637. Trionic Array I

/**
Example 1:

Input: nums = [1,3,5,4,2,6]

Output: true

Explanation:

Pick p = 2, q = 4:

nums[0...2] = [1, 3, 5] is strictly increasing (1 < 3 < 5).
nums[2...4] = [5, 4, 2] is strictly decreasing (5 > 4 > 2).
nums[4...5] = [2, 6] is strictly increasing (2 < 6).
Example 2:

Input: nums = [2,1,3]

Output: false

Explanation:

There is no way to pick p and q to form the required three segments.
*/

const nums = [1, 3, 5, 4, 2, 6];

const isTrionic = function (nums: number[]): boolean {
  const n = nums.length;

  // Based on constraints 0 < p < q < n - 1, the array must have at least 4 elements.
  // Example: indices 0, 1 (p), 2 (q), 3.
  if (n < 4) {
    return false;
  }

  let i = 0;

  // 1. Strictly Increasing Segment (0 to p)
  while (i + 1 < n && nums[i] < nums[i + 1]) {
    i++;
  }

  // p is the current index i.
  // Validity check:
  // - If i == 0, the array didn't start with an increasing sequence.
  // - If i == n - 1, the array is entirely increasing, missing the other two segments.
  if (i === 0 || i === n - 1) {
    return false;
  }

  const p = i;

  // 2. Strictly Decreasing Segment (p to q)
  while (i + 1 < n && nums[i] > nums[i + 1]) {
    i++;
  }

  // q is the current index i.
  // Validity check:
  // - If i == p, we didn't find a decreasing sequence.
  // - If i == n - 1, we reached the end without the final increasing segment.
  if (i === p || i === n - 1) {
    return false;
  }

  // 3. Strictly Increasing Segment (q to n - 1)
  while (i + 1 < n && nums[i] < nums[i + 1]) {
    i++;
  }

  // The array is trionic only if we successfully traversed to the very last element.
  return i === n - 1;
};

console.log(isTrionic(nums));
