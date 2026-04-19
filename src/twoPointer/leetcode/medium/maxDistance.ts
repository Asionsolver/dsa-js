// 1855. Maximum Distance Between a Pair of Values

/**
Example 1:

Input: nums1 = [55,30,5,4,2], nums2 = [100,20,10,10,5]
Output: 2
Explanation: The valid pairs are (0,0), (2,2), (2,3), (2,4), (3,3), (3,4), and (4,4).
The maximum distance is 2 with pair (2,4).
Example 2:

Input: nums1 = [2,2,2], nums2 = [10,10,1]
Output: 1
Explanation: The valid pairs are (0,0), (0,1), and (1,1).
The maximum distance is 1 with pair (0,1).
Example 3:

Input: nums1 = [30,29,19,5], nums2 = [25,25,25,25,25]
Output: 2
Explanation: The valid pairs are (2,2), (2,3), (2,4), (3,3), and (3,4).
The maximum distance is 2 with pair (2,4).
*/

const maxDistance = (nums1: number[], nums2: number[]): number => {
  let i = 0;
  let j = 0;
  let maxDist = 0;

  // Iterate through both arrays
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] <= nums2[j]) {
      // If the pair is valid, calculate the distance and try to find a larger distance
      maxDist = Math.max(maxDist, j - i);
      j++;
    } else {
      // If the pair is invalid, nums1[i] is too big. Move i forward to get a smaller value.
      i++;

      // i <= j is a requirement for a valid pair.
      // If i overtakes j, we should catch j up to i to prevent unnecessary checks.
      if (i > j) {
        j = i;
      }
    }
  }

  return maxDist;
};

// Example usage:
console.log(maxDistance([55, 30, 5, 4, 2], [100, 20, 10, 10, 5])); // Output: 2
console.log(maxDistance([2, 2, 2], [10, 10, 1])); // Output: 1
console.log(maxDistance([30, 29, 19, 5], [25, 25, 25, 25, 25])); // Output: 2
