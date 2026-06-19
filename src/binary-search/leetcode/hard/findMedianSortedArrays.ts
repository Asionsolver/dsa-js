// 4. Median of Two Sorted Arrays

/**
Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

*/
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  let A = nums1;
  let B = nums2;
  let m = A.length;
  let n = B.length;

  // Ensure we binary search on the smaller array to keep time complexity O(log(min(m, n)))
  if (m > n) {
    [A, B] = [B, A];
    [m, n] = [n, m];
  }

  let low = 0;
  let high = m;
  const halfLen = Math.floor((m + n + 1) / 2);

  while (low <= high) {
    const i = Math.floor((low + high) / 2);
    const j = halfLen - i;

    // Boundary conditions: if partition elements are out of bounds,
    // use -Infinity for the left side and Infinity for the right side.
    const maxLeftA = i === 0 ? -Infinity : A[i - 1];
    const minRightA = i === m ? Infinity : A[i];

    const maxLeftB = j === 0 ? -Infinity : B[j - 1];
    const minRightB = j === n ? Infinity : B[j];

    if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
      // Correct partition is found
      if ((m + n) % 2 === 1) {
        return Math.max(maxLeftA, maxLeftB);
      } else {
        return (
          (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2
        );
      }
    } else if (maxLeftA > minRightB) {
      // i is too large, move the search range to the left
      high = i - 1;
    } else {
      // i is too small, move the search range to the right
      low = i + 1;
    }
  }

  return 0.0;
}

// Example usage:
console.log(findMedianSortedArrays([1, 3], [2])); // Output: 2.00000
console.log(findMedianSortedArrays([1, 2], [3, 4])); // Output: 2.50000
