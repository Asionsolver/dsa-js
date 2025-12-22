// 2122. Recover the Original Array

/**
Example 1:

Input: nums = [2,10,6,4,8,12]
Output: [3,7,11]
Explanation:
If arr = [3,7,11] and k = 1, we get lower = [2,6,10] and higher = [4,8,12].
Combining lower and higher gives us [2,6,10,4,8,12], which is a permutation of nums.
Another valid possibility is that arr = [5,7,9] and k = 3. In that case, lower = [2,4,6] and higher = [8,10,12]. 
Example 2:

Input: nums = [1,1,3,3]
Output: [2,2]
Explanation:
If arr = [2,2] and k = 1, we get lower = [1,1] and higher = [3,3].
Combining lower and higher gives us [1,1,3,3], which is equal to nums.
Note that arr cannot be [1,3] because in that case, the only possible way to obtain [1,1,3,3] is with k = 0.
This is invalid since k must be positive.
Example 3:

Input: nums = [5,435]
Output: [220]
Explanation:
The only possible combination is arr = [220] and k = 215. Using them, we get lower = [5] and higher = [435].

*/

const nums = [2, 10, 6, 4, 8, 12];
const recoverArray = function (nums: number[]) {
  // Sort the numbers to handle them in ascending order
  nums.sort((a, b) => a - b);

  const n2 = nums.length;
  const n = n2 / 2;

  // The smallest element nums[0] is guaranteed to be a 'lower' element.
  // Its corresponding 'higher' element must be one of nums[1...n].
  for (let i = 1; i <= n; i++) {
    const diff = nums[i] - nums[0];

    // 2k = diff. diff must be even and positive because k is a positive integer.
    if (diff === 0 || diff % 2 !== 0) continue;

    const k = diff / 2;
    const result: number[] = [];

    // Use a queue to track expected 'higher' elements for 'lower' elements found.
    const higherQueue: number[] = [];
    let head = 0; // Pointer for the queue head to achieve O(1) shifts
    let possible = true;

    for (let j = 0; j < n2; j++) {
      const x = nums[j];

      // Check if this number is the 'higher' element we are looking for
      if (head < higherQueue.length && higherQueue[head] === x) {
        head++;
      } else if (result.length < n) {
        // If not a 'higher' element, it must be a 'lower' element
        result.push(x + k);
        higherQueue.push(x + 2 * k);
      } else {
        // More than n 'lower' elements or mismatch
        possible = false;
        break;
      }

      // Optimization: If current x is already larger than the smallest
      // expected 'higher' value, this k is invalid.
      if (head < higherQueue.length && x > higherQueue[head]) {
        possible = false;
        break;
      }
    }

    // If we successfully paired all elements
    if (possible && result.length === n && head === higherQueue.length) {
      return result;
    }
  }

  return []; // Satisfies TypeScript return requirements
};
console.log(recoverArray(nums));
