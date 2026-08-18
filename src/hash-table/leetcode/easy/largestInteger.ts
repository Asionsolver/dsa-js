// 3471. Find the Largest Almost Missing Integer

/**
You are given an integer array nums and an integer k.

An integer x is almost missing from nums if x appears in exactly one subarray of size k within nums.

Return the largest almost missing integer from nums. If no such integer exists, return -1.

A subarray is a contiguous sequence of elements within an array.
*/

/**
Example 1:

Input: nums = [3,9,2,1,7], k = 3

Output: 7

Explanation:

1 appears in 2 subarrays of size 3: [9, 2, 1] and [2, 1, 7].
2 appears in 3 subarrays of size 3: [3, 9, 2], [9, 2, 1], [2, 1, 7].
3 appears in 1 subarray of size 3: [3, 9, 2].
7 appears in 1 subarray of size 3: [2, 1, 7].
9 appears in 2 subarrays of size 3: [3, 9, 2], and [9, 2, 1].
We return 7 since it is the largest integer that appears in exactly one subarray of size k.

Example 2:

Input: nums = [3,9,7,2,1,7], k = 4

Output: 3

Explanation:

1 appears in 2 subarrays of size 4: [9, 7, 2, 1], [7, 2, 1, 7].
2 appears in 3 subarrays of size 4: [3, 9, 7, 2], [9, 7, 2, 1], [7, 2, 1, 7].
3 appears in 1 subarray of size 4: [3, 9, 7, 2].
7 appears in 3 subarrays of size 4: [3, 9, 7, 2], [9, 7, 2, 1], [7, 2, 1, 7].
9 appears in 2 subarrays of size 4: [3, 9, 7, 2], [9, 7, 2, 1].
We return 3 since it is the largest and only integer that appears in exactly one subarray of size k.

Example 3:

Input: nums = [0,0], k = 1

Output: -1

Explanation:

There is no integer that appears in only one subarray of size 1.
*/

/**
Constraints:

1 <= nums.length <= 50
0 <= nums[i] <= 50
1 <= k <= nums.length
*/

function largestInteger(nums: number[], k: number): number {
  const n = nums.length;

  // Case 1: k equals the length of the array.
  // There is only one subarray (the whole array).
  // Any integer present in the array appears in exactly that one subarray.
  if (k === n) {
    let maxVal = -1;
    for (const num of nums) {
      if (num > maxVal) maxVal = num;
    }
    return maxVal;
  }

  // Case 2: k is 1.
  // Subarrays are single elements. An integer is 'almost missing' if
  // its total frequency in the array is exactly 1.
  if (k === 1) {
    const counts = new Map<number, number>();
    for (const num of nums) {
      counts.set(num, (counts.get(num) || 0) + 1);
    }
    let maxVal = -1;
    for (const [num, count] of counts.entries()) {
      if (count === 1) {
        if (num > maxVal) maxVal = num;
      }
    }
    return maxVal;
  }

  // Case 3: 1 < k < n.
  // Only the first and last elements of the array are contained in
  // exactly one subarray of size k. Internal elements (0 < i < n-1)
  // always belong to at least two subarrays when 1 < k < n.
  let maxVal = -1;

  // Check if the first element is unique in the entire array
  let countFirst = 0;
  for (const num of nums) {
    if (num === nums[0]) countFirst++;
  }
  if (countFirst === 1) {
    maxVal = Math.max(maxVal, nums[0]);
  }

  // Check if the last element is unique in the entire array
  let countLast = 0;
  for (const num of nums) {
    if (num === nums[n - 1]) countLast++;
  }
  if (countLast === 1) {
    maxVal = Math.max(maxVal, nums[n - 1]);
  }

  return maxVal;
}

// Test cases
console.log(largestInteger([9, 2, 1, 7], 3)); // Expected output: 7
console.log(largestInteger([3, 9, 7, 2, 1, 7], 4)); // Expected output: 3
console.log(largestInteger([0, 0], 1)); // Expected output: -1
