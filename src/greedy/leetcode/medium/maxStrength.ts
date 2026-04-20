// 2708. Maximum Strength of a Group

/**
Example 1:

Input: nums = [3,-1,-5,2,5,-9]
Output: 1350
Explanation: One way to form a group of maximal strength is to group the students at indices [0,2,3,4,5]. Their strength is 3 * (-5) * 2 * 5 * (-9) = 1350, which we can show is optimal.
Example 2:

Input: nums = [-4,-5,-4]
Output: 20
Explanation: Group the students at indices [0, 1] . Then, we’ll have a resulting strength of 20. We cannot achieve greater strength.
*/

const maxStrength = (nums: number[]): number => {
  // Initialize both max and min products with the first element
  let max = nums[0];
  let min = nums[0];

  // Iterate through the rest of the elements
  for (let i = 1; i < nums.length; i++) {
    const x = nums[i];

    // Calculate the potential new max and min using the 4 scenarios
    const nextMax = Math.max(max, x, max * x, min * x);
    const nextMin = Math.min(min, x, max * x, min * x);

    // Update the running max and min
    max = nextMax;
    min = nextMin;
  }

  // Return the max. We use `max === 0 ? 0 : max` to normalize `-0` to `0` for pristine output.
  return max === 0 ? 0 : max;
};

// Test cases
console.log(maxStrength([3, -1, -5, 2, 5, -9])); // Output: 1350
console.log(maxStrength([-4, -5, -4])); // Output: 20
