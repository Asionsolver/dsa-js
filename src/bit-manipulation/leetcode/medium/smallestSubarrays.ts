// 2411. Smallest Subarrays With Maximum Bitwise OR

/**
Example 1:

Input: nums = [1,0,2,1,3]
Output: [3,3,2,2,1]
Explanation:
The maximum possible bitwise OR starting at any index is 3. 
- Starting at index 0, the shortest subarray that yields it is [1,0,2].
- Starting at index 1, the shortest subarray that yields the maximum bitwise OR is [0,2,1].
- Starting at index 2, the shortest subarray that yields the maximum bitwise OR is [2,1].
- Starting at index 3, the shortest subarray that yields the maximum bitwise OR is [1,3].
- Starting at index 4, the shortest subarray that yields the maximum bitwise OR is [3].
Therefore, we return [3,3,2,2,1]. 
Example 2:

Input: nums = [1,2]
Output: [2,1]
Explanation:
Starting at index 0, the shortest subarray that yields the maximum bitwise OR is of length 2.
Starting at index 1, the shortest subarray that yields the maximum bitwise OR is of length 1.
Therefore, we return [2,1].

*/

function smallestSubarrays(nums: number[]): number[] {
  const n = nums.length;
  // This array will store the lengths of the minimum sized subarrays
  const ans: number[] = new Array(n);

  // pos[b] stores the closest index >= i where the b-th bit is set to 1
  const pos: number[] = new Array(30).fill(-1);

  // Traverse the array backwards to easily keep track of the earliest bit occurrences
  for (let i = n - 1; i >= 0; i--) {
    // The minimum subarray length starting at i is at least 1 (ending at i)
    let maxPos = i;
    const current = nums[i];

    for (let b = 0; b < 30; b++) {
      // Check if the b-th bit is set in the current number
      if ((current & (1 << b)) !== 0) {
        pos[b] = i;
      }
      // Update maxPos to be the farthest bit's nearest occurrence
      // among all bits set in the array elements from i to n-1
      if (pos[b] > maxPos) {
        maxPos = pos[b];
      }
    }

    // The minimal sized subarray starting at i that yields the maximum possible bitwise OR
    ans[i] = maxPos - i + 1;
  }

  return ans;
}

// Example usage:
console.log(smallestSubarrays([1, 0, 2, 1, 3])); // Output: [3,3,2,2,1]
console.log(smallestSubarrays([1, 2])); // Output: [2,1]
