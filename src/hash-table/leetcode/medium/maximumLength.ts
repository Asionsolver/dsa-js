// 3020. Find the Maximum Number of Elements in Subset

/**
Example 1:

Input: nums = [5,4,1,2,2]
Output: 3
Explanation: We can select the subset {4,2,2}, which can be placed in the array as [2,4,2] which follows the pattern and 22 == 4. Hence the answer is 3.
Example 2:

Input: nums = [1,3,2,4]
Output: 1
Explanation: We can select the subset {1}, which can be placed in the array as [1] which follows the pattern. Hence the answer is 1. Note that we could have also selected the subsets {2}, {3}, or {4}, there may be multiple subsets which provide the same answer. 
*/

function maximumLength(nums: number[]): number {
  const counts = new Map<number, number>();
  let maxNum = 0;

  // Build the frequency map and track the maximum number
  for (const num of nums) {
    counts.set(num, (counts.get(num) || 0) + 1);
    if (num > maxNum) {
      maxNum = num;
    }
  }

  // Initialize answer. Since nums.length >= 2, we can always choose at least 1 element.
  let ans = 1;

  // Handle special case of 1s
  if (counts.has(1)) {
    const count1 = counts.get(1)!;
    ans = count1 % 2 === 0 ? count1 - 1 : count1;
  }

  // Process other starting candidates (x > 1)
  for (const num of counts.keys()) {
    if (num === 1) continue;

    let length = 0;
    let x = num;

    // Keep doubling the exponent while we have at least 2 elements of x
    while (x <= maxNum && counts.has(x) && counts.get(x)! >= 2) {
      length += 2;
      x = x * x;
    }

    // Check if the current 'x' (the peak element) exists at least once
    const peakExists = counts.has(x);
    ans = Math.max(ans, length + (peakExists ? 1 : -1));
  }

  return ans;
}

// Example usage:
const nums1 = [5, 4, 1, 2, 2];
console.log(maximumLength(nums1)); // Output: 3

const nums2 = [1, 3, 2, 4];
console.log(maximumLength(nums2)); // Output: 1
