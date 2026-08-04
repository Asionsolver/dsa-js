// 3731. Find Missing Elements

/**
Example 1:

Input: nums = [1,4,2,5]

Output: [3]

Explanation:

The smallest integer is 1 and the largest is 5, so the full range should be [1,2,3,4,5]. Among these, only 3 is missing.

Example 2:

Input: nums = [7,8,6,9]

Output: []

Explanation:

The smallest integer is 6 and the largest is 9, so the full range is [6,7,8,9]. All integers are already present, so no integer is missing.

Example 3:

Input: nums = [5,1]

Output: [2,3,4]

Explanation:

The smallest integer is 1 and the largest is 5, so the full range should be [1,2,3,4,5]. The missing integers are 2, 3, and 4.



*/

function findMissingElements(nums: number[]): number[] {
  // Find the minimum and maximum elements in nums
  const min = Math.min(...nums);
  const max = Math.max(...nums);

  // Store array elements in a Set for O(1) lookups
  const numSet = new Set(nums);
  const missing: number[] = [];

  // Search for missing elements strictly within the (min, max) boundaries
  for (let i = min + 1; i < max; i++) {
    if (!numSet.has(i)) {
      missing.push(i);
    }
  }

  return missing;
}

// Example usage:
console.log(findMissingElements([1, 4, 2, 5])); // Output: [3]
console.log(findMissingElements([7, 8, 6, 9])); // Output: []
console.log(findMissingElements([5, 1])); // Output: [2, 3, 4]
