// 2540. Minimum Common Value

/**
Example 1:

Input: nums1 = [1,2,3], nums2 = [2,4]
Output: 2
Explanation: The smallest element common to both arrays is 2, so we return 2.
Example 2:

Input: nums1 = [1,2,3,6], nums2 = [2,3,4,5]
Output: 2
Explanation: There are two common elements in the array 2 and 3 out of which 2 is the smallest, so 2 is returned.
*/

function getCommon(nums1: number[], nums2: number[]): number {
  let i = 0;
  let j = 0;

  // Traverse both arrays until one runs out of bounds
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] === nums2[j]) {
      // Found the minimum common value
      return nums1[i];
    } else if (nums1[i] < nums2[j]) {
      // nums1's element is smaller, move its pointer to find a larger value
      i++;
    } else {
      // nums2's element is smaller, move its pointer to find a larger value
      j++;
    }
  }

  // No common value found
  return -1;
}

// Example usage:
console.log(getCommon([1, 2, 3], [2, 4])); // Output: 2
console.log(getCommon([1, 2, 3, 6], [2, 3, 4, 5])); // Output: 2
