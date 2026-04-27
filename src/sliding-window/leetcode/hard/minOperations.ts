// 2009. Minimum Number of Operations to Make Array Continuous

/**
Example 1:

Input: nums = [4,2,5,3]
Output: 0
Explanation: nums is already continuous.
Example 2:

Input: nums = [1,2,3,5,6]
Output: 1
Explanation: One possible solution is to change the last element to 4.
The resulting array is [1,2,3,5,4], which is continuous.
Example 3:

Input: nums = [1,10,100,1000]
Output: 3
Explanation: One possible solution is to:
- Change the second element to 2.
- Change the third element to 3.
- Change the fourth element to 4.
The resulting array is [1,2,3,4], which is continuous.
*/

function minOperations(nums: number[]): number {
  const n = nums.length;

  // Step 1: Sort the array
  nums.sort((a, b) => a - b);

  // Step 2: Remove duplicates in-place
  let m = 1; // 'm' will represent the length of the unique elements
  for (let i = 1; i < n; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[m++] = nums[i];
    }
  }

  // Step 3: Sliding window to find the maximum elements in any valid range
  let maxCount = 0;
  let j = 0;

  for (let i = 0; i < m; i++) {
    // Find how many unique numbers fall into the range [nums[i], nums[i] + n - 1]
    // We expand our window 'j' as long as the elements are within the boundary
    while (j < m && nums[j] <= nums[i] + n - 1) {
      j++;
    }

    // j - i represents the number of elements from the original array
    // that naturally fit into the continuous array starting at nums[i]
    maxCount = Math.max(maxCount, j - i);
  }

  // The minimum operations needed is the total length minus the max elements we can keep
  return n - maxCount;
}

// Example usage:
const nums1 = [4, 2, 5, 3];
console.log(minOperations(nums1)); // Output: 0

const nums2 = [1, 2, 3, 5, 6];
console.log(minOperations(nums2)); // Output: 1

const nums3 = [1, 10, 100, 1000];
console.log(minOperations(nums3)); // Output: 3
