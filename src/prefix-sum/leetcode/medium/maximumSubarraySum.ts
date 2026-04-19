// 3026. Maximum Good Subarray Sum

/**
Example 1:

Input: nums = [1,2,3,4,5,6], k = 1
Output: 11
Explanation: The absolute difference between the first and last element must be 1 for a good subarray. All the good subarrays are: [1,2], [2,3], [3,4], [4,5], and [5,6]. The maximum subarray sum is 11 for the subarray [5,6].
Example 2:

Input: nums = [-1,3,2,4,5], k = 3
Output: 11
Explanation: The absolute difference between the first and last element must be 3 for a good subarray. All the good subarrays are: [-1,3,2], and [2,4,5]. The maximum subarray sum is 11 for the subarray [2,4,5].
Example 3:

Input: nums = [-1,-2,-3,-4], k = 2
Output: -6
Explanation: The absolute difference between the first and last element must be 2 for a good subarray. All the good subarrays are: [-1,-2,-3], and [-2,-3,-4]. The maximum subarray sum is -6 for the subarray [-1,-2,-3].
*/
function maximumSubarraySum(nums: number[], k: number): number {
  let ans = -Infinity;
  let prefix = 0;

  // Maps a number to the minimum prefix sum encountered right before it
  const minPref = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    const prefix_before = prefix;
    prefix += x;

    // Check if there's a previous element x - k
    const target1 = x - k;
    const pref1 = minPref.get(target1);
    if (pref1 !== undefined) {
      const currentSum = prefix - pref1;
      if (currentSum > ans) {
        ans = currentSum;
      }
    }

    // Check if there's a previous element x + k
    const target2 = x + k;
    const pref2 = minPref.get(target2);
    if (pref2 !== undefined) {
      const currentSum = prefix - pref2;
      if (currentSum > ans) {
        ans = currentSum;
      }
    }

    // Add or update the mapping for the current element
    const existingPref = minPref.get(x);
    if (existingPref !== undefined) {
      if (prefix_before < existingPref) {
        minPref.set(x, prefix_before);
      }
    } else {
      minPref.set(x, prefix_before);
    }
  }

  // Return 0 if no valid subarray is found, else the max summation evaluated
  return ans === -Infinity ? 0 : ans;
}

// Example usage:
console.log(maximumSubarraySum([1, 2, 3, 4, 5, 6], 1)); // Output: 11
console.log(maximumSubarraySum([-1, 3, 2, 4, 5], 3)); // Output: 11
console.log(maximumSubarraySum([-1, -2, -3, -4], 2)); // Output: -6
