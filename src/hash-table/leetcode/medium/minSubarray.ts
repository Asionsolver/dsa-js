// 1590. Make Sum Divisible by P

/**
Example 1:

Input: nums = [3,1,4,2], p = 6
Output: 1
Explanation: The sum of the elements in nums is 10, which is not divisible by 6. We can remove the subarray [4], and the sum of the remaining elements is 6, which is divisible by 6.
Example 2:

Input: nums = [6,3,5,2], p = 9
Output: 2
Explanation: We cannot remove a single element to get a sum divisible by 9. The best way is to remove the subarray [5,2], leaving us with [6,3] with sum 9.
Example 3:

Input: nums = [1,2,3], p = 3
Output: 0
Explanation: Here the sum is 6. which is already divisible by 3. Thus we do not need to remove anything.

*/

const nums = [3, 1, 4, 2],
  p = 6;

const minSubarray = function (nums: number[], p: number) {
  // Step 1: Calculate the total sum modulo p
  let totalRemainder = 0;
  for (const num of nums) {
    totalRemainder = (totalRemainder + num) % p;
  }

  // If the total sum is already divisible by p, we don't need to remove anything.
  if (totalRemainder === 0) {
    return 0;
  }

  // Step 2: Use a Map to track the most recent index of each prefix sum modulo p
  // Key: (prefixSum % p), Value: index
  const modMap = new Map<number, number>();

  // Initialize with 0 at index -1 to handle subarrays starting from the beginning
  modMap.set(0, -1);

  let currentPrefixSumMod = 0;
  let minLen = nums.length;

  // Step 3: Iterate through the array
  for (let i = 0; i < nums.length; i++) {
    // Update running prefix sum modulo p
    currentPrefixSumMod = (currentPrefixSumMod + nums[i]) % p;

    // Calculate the target modulo we need to find in the map
    // Formula: (current - target) % p = totalRemainder
    // Therefore: target = (current - totalRemainder) % p
    // We add 'p' before modulo to handle negative results from subtraction
    const targetMod = (currentPrefixSumMod - totalRemainder + p) % p;

    if (modMap.has(targetMod)) {
      const prevIndex = modMap.get(targetMod)!;
      const currentLen = i - prevIndex;
      minLen = Math.min(minLen, currentLen);
    }

    // Store the current index for this modulo value.
    // We overwrite existing values because we want the shortest subarray,
    // which implies maximizing the starting index (prevIndex).
    modMap.set(currentPrefixSumMod, i);
  }

  // Step 4: Validate result
  // If minLen is still equal to the array length, it means we would have to remove
  // the entire array, which is not allowed. Return -1 in that case.
  return minLen < nums.length ? minLen : -1;
};

console.log(minSubarray(nums, p));
