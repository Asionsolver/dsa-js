// 3583. Count Special Triplets

/**
Example 1:

Input: nums = [6,3,6]

Output: 1

Explanation:

The only special triplet is (i, j, k) = (0, 1, 2), where:

nums[0] = 6, nums[1] = 3, nums[2] = 6
nums[0] = nums[1] * 2 = 3 * 2 = 6
nums[2] = nums[1] * 2 = 3 * 2 = 6
Example 2:

Input: nums = [0,1,0,0]

Output: 1

Explanation:

The only special triplet is (i, j, k) = (0, 2, 3), where:

nums[0] = 0, nums[2] = 0, nums[3] = 0
nums[0] = nums[2] * 2 = 0 * 2 = 0
nums[3] = nums[2] * 2 = 0 * 2 = 0
Example 3:

Input: nums = [8,4,2,8,4]

Output: 2

Explanation:

There are exactly two special triplets:

(i, j, k) = (0, 1, 3)
nums[0] = 8, nums[1] = 4, nums[3] = 8
nums[0] = nums[1] * 2 = 4 * 2 = 8
nums[3] = nums[1] * 2 = 4 * 2 = 8
(i, j, k) = (1, 2, 4)
nums[1] = 4, nums[2] = 2, nums[4] = 4
nums[1] = nums[2] * 2 = 2 * 2 = 4
nums[4] = nums[2] * 2 = 2 * 2 = 4

 */

const nums = [6, 3, 6];
function specialTriplets(nums: number[]): number {
  const MOD = 1_000_000_007;
  // According to constraints, 0 <= nums[i] <= 10^5.
  // We size the array to handle values up to 100,000.
  const MAX_VAL = 100001;

  // Using Int32Array for better performance compared to standard Arrays or Maps
  const rightFreq = new Int32Array(MAX_VAL);
  const leftFreq = new Int32Array(MAX_VAL);

  // Step 1: Populate rightFreq with all elements initially
  for (const num of nums) {
    rightFreq[num]++;
  }

  let totalTriplets = 0;

  // Step 2: Iterate through the array, treating each element as the middle element (j)
  for (const num of nums) {
    // Decrease count in rightFreq because 'num' is now the current middle element 'j',
    // not a candidate for 'k' (the right side)
    rightFreq[num]--;

    const target = num * 2;

    // We only proceed if target is within the possible range of values present in the array.
    // If target > 100000, it cannot exist in the array based on constraints.
    if (target < MAX_VAL) {
      const leftCount = leftFreq[target];
      const rightCount = rightFreq[target];

      if (leftCount > 0 && rightCount > 0) {
        // Calculate combinations: leftCount * rightCount
        // JS numbers (double precision) can safely hold 10^5 * 10^5 = 10^10 without overflow.
        const combinations = (leftCount * rightCount) % MOD;
        totalTriplets = (totalTriplets + combinations) % MOD;
      }
    }

    // Add 'num' to leftFreq so it becomes a candidate for 'i' (the left side)
    // for subsequent iterations.
    leftFreq[num]++;
  }

  return totalTriplets;
}

console.log(specialTriplets(nums));
