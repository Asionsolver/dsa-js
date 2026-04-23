// 2997. Minimum Number of Operations to Make Array XOR Equal to K

/**
Example 1:

Input: nums = [2,1,3,4], k = 1
Output: 2
Explanation: We can do the following operations:
- Choose element 2 which is 3 == (011)2, we flip the first bit and we obtain (010)2 == 2. nums becomes [2,1,2,4].
- Choose element 0 which is 2 == (010)2, we flip the third bit and we obtain (110)2 = 6. nums becomes [6,1,2,4].
The XOR of elements of the final array is (6 XOR 1 XOR 2 XOR 4) == 1 == k.
It can be shown that we cannot make the XOR equal to k in less than 2 operations.
Example 2:

Input: nums = [2,0,2,0], k = 0
Output: 0
Explanation: The XOR of elements of the array is (2 XOR 0 XOR 2 XOR 0) == 0 == k. So no operation is needed.
*/

function minOperations(nums: number[], k: number): number {
  // Start with k, so that XORing all elements directly yields the difference
  // (currentXor ^ k)
  let diff = k;
  for (let i = 0; i < nums.length; i++) {
    diff ^= nums[i];
  }

  let count = 0;
  // Count the number of set bits (1s) in the `diff` using Brian Kernighan's Algorithm
  while (diff > 0) {
    diff &= diff - 1; // Clears the lowest set bit
    count++;
  }

  return count;
}

// Example usage:
const nums1 = [2, 1, 3, 4];
const k1 = 1;
console.log(minOperations(nums1, k1)); // Output: 2

const nums2 = [2, 0, 2, 0];
const k2 = 0;
console.log(minOperations(nums2, k2)); // Output: 0
