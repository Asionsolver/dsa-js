// 2909. Minimum Sum of Mountain Triplets II

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
const minimumSum = function (nums: number[]): number {
  const n = nums.length;
  if (n < 3) return -1;

  const leftMin: number[] = new Array(n);
  const rightMin: number[] = new Array(n);

  // Fill leftMin: leftMin[i] is the minimum value from nums[0...i]
  leftMin[0] = nums[0];
  for (let i = 1; i < n; i++) {
    leftMin[i] = Math.min(leftMin[i - 1], nums[i]);
  }

  // Fill rightMin: rightMin[i] is the minimum value from nums[i...n-1]
  rightMin[n - 1] = nums[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMin[i] = Math.min(rightMin[i + 1], nums[i]);
  }

  let minSum = Infinity;

  // Iterate through each potential peak 'j'
  // A peak must have at least one element to its left (i) and one to its right (k)
  for (let j = 1; j < n - 1; j++) {
    const smallestLeft = leftMin[j - 1];
    const smallestRight = rightMin[j + 1];

    // Check if the mountain condition is met
    if (nums[j] > smallestLeft && nums[j] > smallestRight) {
      const currentSum = smallestLeft + nums[j] + smallestRight;
      if (currentSum < minSum) {
        minSum = currentSum;
      }
    }
  }

  return minSum === Infinity ? -1 : minSum;
};

console.log(minimumSum(nums));
