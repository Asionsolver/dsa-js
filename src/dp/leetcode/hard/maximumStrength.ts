// 3077. Maximum Strength of K Disjoint Subarrays

/**
Example 1:

Input: nums = [1,2,3,-1,2], k = 3

Output: 22

Explanation:

The best possible way to select 3 subarrays is: nums[0..2], nums[3..3], and nums[4..4]. The strength is calculated as follows:

strength = 3 * (1 + 2 + 3) - 2 * (-1) + 2 = 22

 

Example 2:

Input: nums = [12,-2,-2,-2,-2], k = 5

Output: 64

Explanation:

The only possible way to select 5 disjoint subarrays is: nums[0..0], nums[1..1], nums[2..2], nums[3..3], and nums[4..4]. The strength is calculated as follows:

strength = 5 * 12 - 4 * (-2) + 3 * (-2) - 2 * (-2) + (-2) = 64

Example 3:

Input: nums = [-1,-2,-3], k = 1

Output: -1

Explanation:

The best possible way to select 1 subarray is: nums[0..0]. The strength is -1.


*/

function maximumStrength(nums: number[], k: number): number {
  const n = nums.length;

  // DP typed arrays representing the current and previous states
  let incl = new Float64Array(k + 1);
  let not_incl = new Float64Array(k + 1);
  let next_incl = new Float64Array(k + 1);
  let next_not_incl = new Float64Array(k + 1);

  incl.fill(-Infinity);
  not_incl.fill(-Infinity);
  not_incl[0] = 0; // The base case: 0 subarrays formed yields a strength of 0

  // Precompute the dynamic weights mapped sequentially 1 to k
  const w = new Float64Array(k + 1);
  for (let j = 1; j <= k; j++) {
    w[j] = j % 2 !== 0 ? k - j + 1 : -(k - j + 1);
  }

  for (let i = 0; i < n; i++) {
    const x = nums[i];

    next_incl[0] = -Infinity;
    next_not_incl[0] = 0;

    // At element `i`, we can form at most `min(k, i + 1)` subarrays
    const max_j = Math.min(k, i + 1);

    for (let j = 1; j <= max_j; j++) {
      const weight = w[j];

      // Decide between extending the j-th subarray or inaugurating a new one
      let max_prev = incl[j];
      if (not_incl[j - 1] > max_prev) {
        max_prev = not_incl[j - 1];
      }

      if (max_prev === -Infinity) {
        next_incl[j] = -Infinity;
      } else {
        next_incl[j] = max_prev + weight * x;
      }

      // Register and track the best outcome
      if (not_incl[j] > next_incl[j]) {
        next_not_incl[j] = not_incl[j];
      } else {
        next_not_incl[j] = next_incl[j];
      }
    }

    // Fill limits above valid formations to prevent residue overrides
    if (max_j < k) {
      next_incl.fill(-Infinity, max_j + 1);
      next_not_incl.fill(-Infinity, max_j + 1);
    }

    // Swap reference references for the next iteration (avoids garbage collections)
    let temp = incl;
    incl = next_incl;
    next_incl = temp;

    temp = not_incl;
    not_incl = next_not_incl;
    next_not_incl = temp;
  }

  return not_incl[k];
}

// Example usage:
console.log(maximumStrength([1, 2, 3, -1, 2], 3)); // Output: 22
console.log(maximumStrength([12, -2, -2, -2, -2], 5)); // Output: 64
console.log(maximumStrength([-1, -2, -3], 1)); // Output: -1
