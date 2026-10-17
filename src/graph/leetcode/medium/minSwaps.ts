// 3551. Minimum Swaps to Sort by Digit Sum

/**
You are given an array nums of distinct positive integers. You need to sort the array in increasing order based on the sum of the digits of each number. If two numbers have the same digit sum, the smaller number appears first in the sorted order.

Return the minimum number of swaps required to rearrange nums into this sorted order.

A swap is defined as exchanging the values at two distinct positions in the array.
*/

/**
Example 1:

Input: nums = [37,100]

Output: 1

Explanation:

Compute the digit sum for each integer: [3 + 7 = 10, 1 + 0 + 0 = 1] → [10, 1]
Sort the integers based on digit sum: [100, 37]. Swap 37 with 100 to obtain the sorted order.
Thus, the minimum number of swaps required to rearrange nums is 1.
Example 2:

Input: nums = [22,14,33,7]

Output: 0

Explanation:

Compute the digit sum for each integer: [2 + 2 = 4, 1 + 4 = 5, 3 + 3 = 6, 7 = 7] → [4, 5, 6, 7]
Sort the integers based on digit sum: [22, 14, 33, 7]. The array is already sorted.
Thus, the minimum number of swaps required to rearrange nums is 0.
Example 3:

Input: nums = [18,43,34,16]

Output: 2

Explanation:

Compute the digit sum for each integer: [1 + 8 = 9, 4 + 3 = 7, 3 + 4 = 7, 1 + 6 = 7] → [9, 7, 7, 7]
Sort the integers based on digit sum: [16, 34, 43, 18]. Swap 18 with 16, and swap 43 with 34 to obtain the sorted order.
Thus, the minimum number of swaps required to rearrange nums is 2.
*/

/**
Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 109
nums consists of distinct positive integers.
*/

// Brute force approach: TLE
// function minSwaps(nums: number[]): number {
//   const n = nums.length;

//   // Helper function to calculate the sum of digits.
//   const getDigitSum = (num: number): number => {
//     let sum = 0;
//     while (num > 0) {
//       sum += num % 10;
//       num = Math.floor(num / 10);
//     }
//     return sum;
//   };

//   // Create the target sorted array based on the rules.
//   const target = [...nums].sort((a, b) => {
//     const sumA = getDigitSum(a);
//     const sumB = getDigitSum(b);
//     if (sumA !== sumB) {
//       return sumA - sumB;
//     }
//     return a - b;
//   });

//   // Make a mutable copy of the original array to simulate swaps.
//   const current = [...nums];
//   let swaps = 0;

//   for (let i = 0; i < n; i++) {
//     // If the current element is not in its correct position.
//     if (current[i] !== target[i]) {
//       // Find the position of target[i] in the remaining array.
//       let targetIdx = -1;
//       for (let j = i + 1; j < n; j++) {
//         if (current[j] === target[i]) {
//           targetIdx = j;
//           break;
//         }
//       }

//       // Swap to place the correct element at index i.
//       const temp = current[i];
//       current[i] = current[targetIdx];
//       current[targetIdx] = temp;
//       swaps++;
//     }
//   }

//   return swaps;
// }

// Optimized approach using cycle detection
function minSwaps(nums: number[]): number {
  const n = nums.length;

  // Helper function to compute the digit sum of a number.
  const getDigitSum = (num: number): number => {
    let sum = 0;
    while (num > 0) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }
    return sum;
  };

  // Store value, digit sum, and original index together to avoid recalculating.
  const items = nums.map((val, idx) => ({
    val,
    digitSum: getDigitSum(val),
    originalIndex: idx,
  }));

  // Sort items based on digitSum (primary) and value (secondary).
  items.sort((a, b) => {
    if (a.digitSum !== b.digitSum) {
      return a.digitSum - b.digitSum;
    }
    return a.val - b.val;
  });

  // Track whether an index has already been visited in a cycle.
  const visited = new Array<boolean>(n).fill(false);
  let totalSwaps = 0;

  for (let i = 0; i < n; i++) {
    // If already visited or already in the correct position, continue.
    if (visited[i] || items[i].originalIndex === i) {
      continue;
    }

    // Trace the cycle and calculate its length.
    let cycleLength = 0;
    let curr = i;

    while (!visited[curr]) {
      visited[curr] = true;
      // Move to the next index in the permutation cycle.
      curr = items[curr].originalIndex;
      cycleLength++;
    }

    // A cycle of length L requires (L - 1) swaps to be resolved.
    if (cycleLength > 1) {
      totalSwaps += cycleLength - 1;
    }
  }

  return totalSwaps;
}
// Example usage:
console.log(minSwaps([37, 100])); // Output: 1
console.log(minSwaps([22, 14, 33, 7])); // Output: 0
console.log(minSwaps([18, 43, 34, 16])); // Output: 2
