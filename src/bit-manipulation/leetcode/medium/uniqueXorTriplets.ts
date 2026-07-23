// 3513. Number of Unique XOR Triplets I

/**
Example 1:

Input: nums = [1,2]

Output: 2

Explanation:

The possible XOR triplet values are:

(0, 0, 0) → 1 XOR 1 XOR 1 = 1
(0, 0, 1) → 1 XOR 1 XOR 2 = 2
(0, 1, 1) → 1 XOR 2 XOR 2 = 1
(1, 1, 1) → 2 XOR 2 XOR 2 = 2
The unique XOR values are {1, 2}, so the output is 2.

Example 2:

Input: nums = [3,1,2]

Output: 4

Explanation:

The possible XOR triplet values include:

(0, 0, 0) → 3 XOR 3 XOR 3 = 3
(0, 0, 1) → 3 XOR 3 XOR 1 = 1
(0, 0, 2) → 3 XOR 3 XOR 2 = 2
(0, 1, 2) → 3 XOR 1 XOR 2 = 0
The unique XOR values are {0, 1, 2, 3}, so the output is 4.


*/

function uniqueXorTriplets(nums: number[]): number {
  const n = nums.length;

  // Base cases for small arrays
  if (n < 3) {
    return n;
  }

  // Find the number of bits required to represent n
  const bits = 32 - Math.clz32(n);

  // The total number of unique values is 2^bits
  return 1 << bits;
}

// Example usage:
console.log(uniqueXorTriplets([1, 2])); // Output: 2
console.log(uniqueXorTriplets([3, 1, 2])); // Output: 4
