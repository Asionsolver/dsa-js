// 1793. Maximum Score of a Good Subarray

/**
Example 1:

Input: nums = [1,4,3,7,4,5], k = 3
Output: 15
Explanation: The optimal subarray is (1, 5) with a score of min(4,3,7,4,5) * (5-1+1) = 3 * 5 = 15. 
Example 2:

Input: nums = [5,5,4,5,4,1,1,1], k = 0
Output: 20
Explanation: The optimal subarray is (0, 4) with a score of min(5,5,4,5,4) * (4-0+1) = 4 * 5 = 20.
*/

const nums = [1, 4, 3, 7, 4, 5];
const k = 3;

function maximumScore(nums: number[], k: number): number {
  const n = nums.length;
  let i = k;
  let j = k;
  let minVal = nums[k];
  let maxScore = nums[k];

  // Expand the subarray until it spans the entire array
  while (i > 0 || j < n - 1) {
    // Look at the adjacent values to the left and right.
    // If we hit an array boundary, assign a value of -1 to force expansion in the opposite direction.
    // (This works because constraints state nums[i] >= 1)
    const leftVal = i > 0 ? nums[i - 1] : -1;
    const rightVal = j < n - 1 ? nums[j + 1] : -1;

    // Greedily expand towards the larger adjacent value
    if (leftVal > rightVal) {
      i--;
      minVal = Math.min(minVal, nums[i]);
    } else {
      j++;
      minVal = Math.min(minVal, nums[j]);
    }

    // Calculate the score for the current bounds and update maxScore if it's strictly greater
    maxScore = Math.max(maxScore, minVal * (j - i + 1));
  }

  return maxScore;
}

console.log(maximumScore(nums, k));
