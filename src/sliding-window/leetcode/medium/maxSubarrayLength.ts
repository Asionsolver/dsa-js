// 2958. Length of Longest Subarray With at Most K Frequency

/**
Example 1:

Input: nums = [1,2,3,1,2,3,1,2], k = 2
Output: 6
Explanation: The longest possible good subarray is [1,2,3,1,2,3] since the values 1, 2, and 3 occur at most twice in this subarray. Note that the subarrays [2,3,1,2,3,1] and [3,1,2,3,1,2] are also good.
It can be shown that there are no good subarrays with length more than 6.
Example 2:

Input: nums = [1,2,1,2,1,2,1,2], k = 1
Output: 2
Explanation: The longest possible good subarray is [1,2] since the values 1 and 2 occur at most once in this subarray. Note that the subarray [2,1] is also good.
It can be shown that there are no good subarrays with length more than 2.
Example 3:

Input: nums = [5,5,5,5,5,5,5], k = 4
Output: 4
Explanation: The longest possible good subarray is [5,5,5,5] since the value 5 occurs 4 times in this subarray.
It can be shown that there are no good subarrays with length more than 4.
*/

// Approach: Sliding Window
// const maxSubarrayLength = function (nums: number[], k: number): number {
//   let maxLength = 0;
//   let left = 0;

//   // Map to keep track of frequencies of elements in the current window
//   const freq = new Map<number, number>();

//   for (let right = 0; right < nums.length; right++) {
//     const val = nums[right];
//     const count = (freq.get(val) ?? 0) + 1;
//     freq.set(val, count);

//     // If the frequency of the current element exceeds k, shrink the window
//     // from the left until we remove one instance of this element.
//     if (count > k) {
//       while (nums[left] !== val) {
//         const leftVal = nums[left];
//         freq.set(leftVal, freq.get(leftVal)! - 1);
//         left++;
//       }
//       // Once we hit the 'val' at the left pointer, remove it and step forward once more
//       freq.set(val, k);
//       left++;
//     }

//     // Calculate the valid window size and update maxLength if necessary
//     const currentLength = right - left + 1;
//     if (currentLength > maxLength) {
//       maxLength = currentLength;
//     }
//   }

//   return maxLength;
// };

// Example usage:

// Approach: Sliding Window with Optimization
function maxSubarrayLength(nums: number[], k: number): number {
  let maxLength = 0;
  let left = 0;

  // Map to keep track of frequencies of elements in the current window
  const freq = new Map<number, number>();

  for (let right = 0; right < nums.length; right++) {
    const val = nums[right];
    const count = (freq.get(val) ?? 0) + 1;
    freq.set(val, count);

    // If the frequency of the current element exceeds k, shrink the window
    if (count > k) {
      while (nums[left] !== val) {
        const leftVal = nums[left];
        freq.set(leftVal, freq.get(leftVal)! - 1);
        left++;
      }
      // Once we hit the 'val' at the left pointer, remove it and step forward once more
      freq.set(val, k);
      left++;
    } else {
      // It is only possible to update maxLength if the window is not compressed.
      // Because the length of the compressed window can never exceed the previous maxLength.
      const currentLength = right - left + 1;
      if (currentLength > maxLength) {
        maxLength = currentLength;
      }
    }
  }

  return maxLength;
}

console.log(maxSubarrayLength([1, 2, 3, 1, 2, 3, 1, 2], 2)); // Output: 6
console.log(maxSubarrayLength([1, 2, 1, 2, 1, 2, 1, 2], 1)); // Output: 2
console.log(maxSubarrayLength([5, 5, 5, 5, 5, 5, 5], 4)); // Output: 4
