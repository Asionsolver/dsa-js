// 2302. Count Subarrays With Score Less Than K

/**
Example 1:

Input: nums = [2,1,4,3,5], k = 10
Output: 6
Explanation:
The 6 subarrays having scores less than 10 are:
- [2] with score 2 * 1 = 2.
- [1] with score 1 * 1 = 1.
- [4] with score 4 * 1 = 4.
- [3] with score 3 * 1 = 3. 
- [5] with score 5 * 1 = 5.
- [2,1] with score (2 + 1) * 2 = 6.
Note that subarrays such as [1,4] and [4,3,5] are not considered because their scores are 10 and 36 respectively, while we need scores strictly less than 10.
Example 2:

Input: nums = [1,1,1], k = 5
Output: 5
Explanation:
Every subarray except [1,1,1] has a score less than 5.
[1,1,1] has a score (1 + 1 + 1) * 3 = 9, which is greater than 5.
Thus, there are 5 subarrays having scores less than 5.

*/

function countSubarrays(nums: number[], k: number): number {
  let count = 0;
  let sum = 0;
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    // Expand the window by adding the current element
    sum += nums[right];

    // If the score of the current window is >= k, shrink it from the left
    while (sum * (right - left + 1) >= k) {
      sum -= nums[left];
      left++;
    }

    // Add the number of valid subarrays ending at `right`
    // A valid window of length L contributes L valid subarrays ending at the rightmost index
    count += right - left + 1;
  }

  return count;
}

// Example 1:

const nums1 = [2, 1, 4, 3, 5];
const k1 = 10;
console.log(countSubarrays(nums1, k1)); // Output: 6

// Example 2:

const nums2 = [1, 1, 1];
const k2 = 5;
console.log(countSubarrays(nums2, k2)); // Output: 5
