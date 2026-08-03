// 1.Two Sum

/**
Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1] 

 */

function twoSum(nums: number[], target: number): number[] {
  // Create a hash map to store the number and its corresponding index
  const numMap = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    // If the complement exists in our map, we found our pair!
    if (numMap.has(complement)) {
      return [numMap.get(complement)!, i];
    }

    // Otherwise, add the current number and index to the map
    numMap.set(nums[i], i);
  }

  // Fallback array in case no solution is found (per problem statement, a solution is guaranteed)
  return [];
}

// Example usage:
const nums1 = [2, 7, 11, 15];
const target1 = 9;
console.log(twoSum(nums1, target1)); // Output: [0, 1]

const nums2 = [3, 2, 4];
const target2 = 6;
console.log(twoSum(nums2, target2)); // Output: [1, 2]

const nums3 = [3, 3];
const target3 = 6;
console.log(twoSum(nums3, target3)); // Output: [0, 1]
