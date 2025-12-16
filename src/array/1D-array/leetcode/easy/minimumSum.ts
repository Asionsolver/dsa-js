// 2908. Minimum Sum of Mountain Triplets I

/**
Example 1:

Input: nums = [8,6,1,5,3]
Output: 9
Explanation: Triplet (2, 3, 4) is a mountain triplet of sum 9 since: 
- 2 < 3 < 4
- nums[2] < nums[3] and nums[4] < nums[3]
And the sum of this triplet is nums[2] + nums[3] + nums[4] = 9. It can be shown that there are no mountain triplets with a sum of less than 9.
Example 2:

Input: nums = [5,4,8,7,10,2]
Output: 13
Explanation: Triplet (1, 3, 5) is a mountain triplet of sum 13 since: 
- 1 < 3 < 5
- nums[1] < nums[3] and nums[5] < nums[3]
And the sum of this triplet is nums[1] + nums[3] + nums[5] = 13. It can be shown that there are no mountain triplets with a sum of less than 13.
Example 3:

Input: nums = [6,5,4,3,4,5]
Output: -1
Explanation: It can be shown that there are no mountain triplets in nums.
 */
const nums = [8, 6, 1, 5, 3];
const minimumSum = function (nums: number[]) {
  const n = nums.length;

  // leftMin[j] = minimum value from nums[0..j-1]
  const leftMin = new Array(n).fill(Infinity);
  let minLeft = Infinity;
  for (let i = 1; i < n; i++) {
    minLeft = Math.min(minLeft, nums[i - 1]);
    leftMin[i] = minLeft;
  }

  // rightMin[j] = minimum value from nums[j+1..n-1]
  const rightMin = new Array(n).fill(Infinity);
  let minRight = Infinity;
  for (let i = n - 2; i >= 0; i--) {
    minRight = Math.min(minRight, nums[i + 1]);
    rightMin[i] = minRight;
  }

  let ans = Infinity;

  for (let j = 1; j < n - 1; j++) {
    if (leftMin[j] < nums[j] && rightMin[j] < nums[j]) {
      ans = Math.min(ans, leftMin[j] + nums[j] + rightMin[j]);
    }
  }

  return ans === Infinity ? -1 : ans;
};
console.log(minimumSum(nums));
