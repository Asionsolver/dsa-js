//3739. Count Subarrays With Majority Element II

/**
Example 1:

Input: nums = [1,2,2,3], target = 2

Output: 5

Explanation:

Valid subarrays with target = 2 as the majority element:

nums[1..1] = [2]
nums[2..2] = [2]
nums[1..2] = [2,2]
nums[0..2] = [1,2,2]
nums[1..3] = [2,2,3]
So there are 5 such subarrays.

Example 2:

Input: nums = [1,1,1,1], target = 1

Output: 10

Explanation:

​​​​​​​All 10 subarrays have 1 as the majority element.

Example 3:

Input: nums = [1,2,3], target = 4

Output: 0

Explanation:

target = 4 does not appear in nums at all. Therefore, there cannot be any subarray where 4 is the majority element. Hence the answer is 0.
*/

function countMajoritySubarrays(nums: number[], target: number): number {
  const n = nums.length;

  // Shift prefix sum by offset (n + 1) to keep indices positive [1, 2 * n + 1].
  const offset = n + 1;
  const size = 2 * n + 2;

  // Int32Array is used for high performance and low memory footprint.
  const cnt = new Int32Array(size);
  const prefix = new Int32Array(size);

  // Initially, before processing any elements, prefix sum is 0 (shifted to offset).
  cnt[offset] = 1;
  prefix[offset] = 1;

  let curr = offset;
  let result = 0;

  for (let i = 0; i < n; i++) {
    // Step 1: Transition prefix sum
    curr += nums[i] === target ? 1 : -1;

    // Step 2: Update the frequency of the current prefix sum
    cnt[curr]++;

    // Step 3: Compute the prefix sum of frequencies for 'curr'
    prefix[curr] = prefix[curr - 1] + cnt[curr];

    // Step 4: Add the count of prefix sums strictly less than 'curr' to the result
    result += prefix[curr - 1];
  }

  return result;
}

// Example usage:
const nums1 = [1, 2, 2, 3];
const target1 = 2;
console.log(countMajoritySubarrays(nums1, target1)); // Output: 5

const nums2 = [1, 1, 1, 1];
const target2 = 1;
console.log(countMajoritySubarrays(nums2, target2)); // Output: 10

const nums3 = [1, 2, 3];
const target3 = 4;
console.log(countMajoritySubarrays(nums3, target3)); // Output: 0
