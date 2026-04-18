// 915. Partition Array into Disjoint Intervals

/**
Example 1:

Input: nums = [5,0,3,8,6]
Output: 3
Explanation: left = [5,0,3], right = [8,6]
Example 2:

Input: nums = [1,1,1,0,6,12]
Output: 4
Explanation: left = [1,1,1,0], right = [6,12]
*/

// This greedy approach works by maintaining two variables: `maxLeft` to track the maximum value in the left partition and `currentMax` to track the maximum value seen so far as we iterate through the array. Whenever we encounter an element that is smaller than `maxLeft`, it means that this element cannot be part of the right partition, and we need to include it in the left partition. We then update `partitionIdx` to the current index and update `maxLeft` to be the maximum of itself and `currentMax`. Finally, we return `partitionIdx + 1` as the length of the left partition.
const partitionDisjoint = (nums: number[]): number => {
  let maxLeft = nums[0];
  let currentMax = nums[0];
  let partitionIdx = 0;

  for (let i = 1; i < nums.length; i++) {
    // Track the maximum element seen so far
    currentMax = Math.max(currentMax, nums[i]);

    // If current element is smaller than the maximum of left partition,
    // it must be included in the left partition.
    if (nums[i] < maxLeft) {
      partitionIdx = i;
      maxLeft = currentMax;
    }
  }

  // The length of the left partition is index + 1
  return partitionIdx + 1;
};

// Example usage:
const nums1 = [5, 0, 3, 8, 6];
console.log(partitionDisjoint(nums1)); // Output: 3

const nums2 = [1, 1, 1, 0, 6, 12];
console.log(partitionDisjoint(nums2)); // Output: 4
