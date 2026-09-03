// 3876. Construct Uniform Parity Array II

/**
You are given an array nums1 of n distinct integers.

You want to construct another array nums2 of length n such that the elements in nums2 are either all odd or all even.

For each index i, you must choose exactly one of the following (in any order):

nums2[i] = nums1[i]​​​​​​​
nums2[i] = nums1[i] - nums1[j], for an index j != i, such that nums1[i] - nums1[j] >= 1
Return true if it is possible to construct such an array, otherwise return false.


*/

/**
Example 1:

Input: nums1 = [1,4,7]

Output: true

Explanation:​​​​​​​​​​​​​​

Set nums2[0] = nums1[0] = 1.
Set nums2[1] = nums1[1] - nums1[0] = 4 - 1 = 3.
Set nums2[2] = nums1[2] = 7.
nums2 = [1, 3, 7], and all elements are odd. Thus, the answer is true.
Example 2:

Input: nums1 = [2,3]

Output: false

Explanation:

It is not possible to construct nums2 such that all elements have the same parity. Thus, the answer is false.

Example 3:

Input: nums1 = [4,6]

Output: true

Explanation:

Set nums2[0] = nums1[0] = 4.
Set nums2[1] = nums1[1] = 6.
nums2 = [4, 6], and all elements are even. Thus, the answer is true.

*/

/**
Constraints:

1 <= n == nums1.length <= 105
1 <= nums1[i] <= 109
nums1 consists of distinct integers.
*/

function uniformArray(nums1: number[]): boolean {
  let minVal = Infinity;
  let hasOdd = false;

  // Traverse the array to find the minimum value and check for odd elements.
  for (let i = 0; i < nums1.length; i++) {
    const num = nums1[i];

    if (num < minVal) {
      minVal = num;
    }

    if (num % 2 !== 0) {
      hasOdd = true;
    }
  }

  // If there are no odd numbers, all elements are already Even.
  if (!hasOdd) {
    return true;
  }

  // If the minimum element is Odd, all Even numbers can subtract it to become Odd.
  if (minVal % 2 !== 0) {
    return true;
  }

  // Otherwise, it's impossible to make all elements uniform in parity.
  return false;
}

// Example usage:
console.log(uniformArray([1, 4, 7])); // Output: true
console.log(uniformArray([2, 3])); // Output: false
console.log(uniformArray([4, 6])); // Output: true
