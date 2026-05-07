// 3660. Jump Game IX

/**
Example 1:

Input: nums = [2,1,3]

Output: [2,2,3]

Explanation:

For i = 0: No jump increases the value.
For i = 1: Jump to j = 0 as nums[j] = 2 is greater than nums[i].
For i = 2: Since nums[2] = 3 is the maximum value in nums, no jump increases the value.
Thus, ans = [2, 2, 3].

Example 2:

Input: nums = [2,3,1]

Output: [3,3,3]

Explanation:

For i = 0: Jump forward to j = 2 as nums[j] = 1 is less than nums[i] = 2, then from i = 2 jump to j = 1 as nums[j] = 3 is greater than nums[2].
For i = 1: Since nums[1] = 3 is the maximum value in nums, no jump increases the value.
For i = 2: Jump to j = 1 as nums[j] = 3 is greater than nums[2] = 1.
Thus, ans = [3, 3, 3].


*/
function maxReachable(nums: number[]): number[] {
  const n = nums.length;
  if (n === 0) return [];

  // Arrays to store the maximum element from the left and minimum element from the right
  const prefMax = new Int32Array(n);
  const suffMin = new Int32Array(n);

  // 1. Build the Prefix Max array
  prefMax[0] = nums[0];
  for (let i = 1; i < n; i++) {
    prefMax[i] = Math.max(prefMax[i - 1], nums[i]);
  }

  // 2. Build the Suffix Min array
  suffMin[n - 1] = nums[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    suffMin[i] = Math.min(suffMin[i + 1], nums[i]);
  }

  const ans = new Array<number>(n);
  let chunkStart = 0;

  // 3. Find boundaries and populate answers
  for (let i = 0; i < n; i++) {
    // A chunk ends at `i` if it's the last element, or if the max on the left
    // is less than or equal to the min on the right.
    if (i === n - 1 || prefMax[i] <= suffMin[i + 1]) {
      // Since elements continuously grow progressively chunk-by-chunk,
      // the maximum of the current chunk is safely stored at `prefMax[i]`
      const maxVal = prefMax[i];

      // Assign this max value to every element within the found chunk component bounds
      for (let j = chunkStart; j <= i; j++) {
        ans[j] = maxVal;
      }

      // Move start marker ahead for the next sequential chunk setup
      chunkStart = i + 1;
    }
  }

  return ans;
}

// Example usage:
console.log(maxReachable([2, 1, 3])); // Output: [2, 2, 3]
console.log(maxReachable([2, 3, 1])); // Output: [3, 3, 3]
