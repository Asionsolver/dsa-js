// 3411. Maximum Subarray With Equal Products

/**

You are given an array of positive integers nums.

An array arr is called product equivalent if prod(arr) == lcm(arr) * gcd(arr), where:

prod(arr) is the product of all elements of arr.
gcd(arr) is the GCD of all elements of arr.
lcm(arr) is the LCM of all elements of arr.
Return the length of the longest product equivalent subarray of nums.
*/

/**

Example 1:

Input: nums = [1,2,1,2,1,1,1]

Output: 5

Explanation: 

The longest product equivalent subarray is [1, 2, 1, 1, 1], where prod([1, 2, 1, 1, 1]) = 2, gcd([1, 2, 1, 1, 1]) = 1, and lcm([1, 2, 1, 1, 1]) = 2.

Example 2:

Input: nums = [2,3,4,5,6]

Output: 3

Explanation: 

The longest product equivalent subarray is [3, 4, 5].

Example 3:

Input: nums = [1,2,3,1,4,5,1]

Output: 5
*/

/**
Constraints:

2 <= nums.length <= 100
1 <= nums[i] <= 10
*/

// Brute-force approach to find the longest product equivalent subarray.
// function maxLength(nums: number[]): number {
//   const n = nums.length;
//   let longest = 0;

//   // Helper function to calculate GCD of two BigInt numbers.
//   const getGcd = (a: bigint, b: bigint): bigint => {
//     while (b !== 0n) {
//       const temp = a % b;
//       a = b;
//       b = temp;
//     }
//     return a;
//   };

//   for (let start = 0; start < n; start++) {
//     for (let end = start; end < n; end++) {
//       // Use BigInt to prevent precision loss for large subarray products (up to 10^100).
//       let prod = 1n;
//       let currentGcd = BigInt(nums[start]);
//       let currentLcm = BigInt(nums[start]);

//       // Compute product, GCD, and LCM from scratch for subarray nums[start..end].
//       for (let k = start; k <= end; k++) {
//         const val = BigInt(nums[k]);
//         prod *= val;
//         currentGcd = getGcd(currentGcd, val);
//         currentLcm = (currentLcm * val) / getGcd(currentLcm, val);
//       }

//       // Check whether the current subarray is product equivalent.
//       if (prod === currentLcm * currentGcd) {
//         longest = Math.max(longest, end - start + 1);
//       }
//     }
//   }

//   return longest;
// }

// Optimized approach using sliding window technique to find the longest product equivalent subarray.
function maxLength(nums: number[]): number {
  // Any subarray of length 2 always satisfies prod(arr) == lcm(arr) * gcd(arr).
  let longest = 2;

  // Helper function to compute the Greatest Common Divisor (GCD).
  const getGcd = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = a % b;
      a = b;
      b = temp;
    }
    return a;
  };

  let left = 0;

  // Track the product of elements in the current pairwise coprime window.
  let windowProd = 1;

  for (let right = 0; right < nums.length; right++) {
    const current = nums[right];

    // Shrink the window from the left until current shares no common factor (> 1) with windowProd.
    while (getGcd(windowProd, current) > 1) {
      windowProd /= nums[left];
      left++;
    }

    // Include the current element into the valid pairwise coprime window.
    windowProd *= current;

    // Update the maximum length found so far.
    longest = Math.max(longest, right - left + 1);
  }

  return longest;
}

// Example usage:
const nums1 = [1, 2, 1, 2, 1, 1, 1];
console.log(maxLength(nums1)); // Output: 5

const nums2 = [2, 3, 4, 5, 6];
console.log(maxLength(nums2)); // Output: 3

const nums3 = [1, 2, 3, 1, 4, 5, 1];
console.log(maxLength(nums3)); // Output: 5
