// 2784. Check if Array is Good

/**
Example 1:

Input: nums = [2, 1, 3]
Output: false
Explanation: Since the maximum element of the array is 3, the only candidate n for which this array could be a permutation of base[n], is n = 3. However, base[3] has four elements but array nums has three. Therefore, it can not be a permutation of base[3] = [1, 2, 3, 3]. So the answer is false.
Example 2:

Input: nums = [1, 3, 3, 2]
Output: true
Explanation: Since the maximum element of the array is 3, the only candidate n for which this array could be a permutation of base[n], is n = 3. It can be seen that nums is a permutation of base[3] = [1, 2, 3, 3] (by swapping the second and fourth elements in nums, we reach base[3]). Therefore, the answer is true.
Example 3:

Input: nums = [1, 1]
Output: true
Explanation: Since the maximum element of the array is 1, the only candidate n for which this array could be a permutation of base[n], is n = 1. It can be seen that nums is a permutation of base[1] = [1, 1]. Therefore, the answer is true.
Example 4:

Input: nums = [3, 4, 4, 1, 2, 1]
Output: false
Explanation: Since the maximum element of the array is 4, the only candidate n for which this array could be a permutation of base[n], is n = 4. However, base[4] has five elements but array nums has six. Therefore, it can not be a permutation of base[4] = [1, 2, 3, 4, 4]. So the answer is false.

*/

function isGood(nums: number[]): boolean {
  // If the array is a permutation of base[n], its length must be n + 1.
  // Therefore, expected n is length - 1.
  const n = nums.length - 1;

  // base[n] requires n >= 1, so the array length must be at least 2.
  if (n < 1) return false;

  // Array to keep track of frequencies of each number.
  const counts = new Array(n + 1).fill(0);

  for (const num of nums) {
    // If a number is greater than n, it definitely shouldn't be in base[n].
    if (num > n) return false;
    counts[num]++;
  }

  // Numbers from 1 to n - 1 must appear exactly once.
  for (let i = 1; i < n; i++) {
    if (counts[i] !== 1) return false;
  }

  // The number n must appear exactly twice.
  return counts[n] === 2;
}

// Example usage:
console.log(isGood([2, 1, 3])); // Output: false
console.log(isGood([1, 3, 3, 2])); // Output: true
console.log(isGood([1, 1])); // Output: true
console.log(isGood([3, 4, 4, 1, 2, 1])); // Output: false
