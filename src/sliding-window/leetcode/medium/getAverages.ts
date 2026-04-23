// 2090. K Radius Subarray Averages

/**
Example 1:


Input: nums = [7,4,3,9,1,8,5,2,6], k = 3
Output: [-1,-1,-1,5,4,4,-1,-1,-1]
Explanation:
- avg[0], avg[1], and avg[2] are -1 because there are less than k elements before each index.
- The sum of the subarray centered at index 3 with radius 3 is: 7 + 4 + 3 + 9 + 1 + 8 + 5 = 37.
  Using integer division, avg[3] = 37 / 7 = 5.
- For the subarray centered at index 4, avg[4] = (4 + 3 + 9 + 1 + 8 + 5 + 2) / 7 = 4.
- For the subarray centered at index 5, avg[5] = (3 + 9 + 1 + 8 + 5 + 2 + 6) / 7 = 4.
- avg[6], avg[7], and avg[8] are -1 because there are less than k elements after each index.
Example 2:

Input: nums = [100000], k = 0
Output: [100000]
Explanation:
- The sum of the subarray centered at index 0 with radius 0 is: 100000.
  avg[0] = 100000 / 1 = 100000.
Example 3:

Input: nums = [8], k = 100000
Output: [-1]
Explanation: 
- avg[0] is -1 because there are less than k elements before and after index 0.

*/

function getAverages(nums: number[], k: number): number[] {
  const n = nums.length;
  const avgs = new Array(n).fill(-1);

  const windowSize = 2 * k + 1;

  // If the window size is greater than the array length,
  // it's impossible to have a k-radius subarray.
  if (windowSize > n) {
    return avgs;
  }

  // Calculate the sum of the very first sliding window
  let sum = 0;
  for (let i = 0; i < windowSize; i++) {
    sum += nums[i];
  }

  // The center index of the first window is k
  avgs[k] = Math.floor(sum / windowSize);

  // Slide the window from center index k + 1 to n - k - 1
  for (let i = k + 1; i < n - k; i++) {
    // Update sum: remove the element leaving the window and add the new element entering
    sum = sum - nums[i - k - 1] + nums[i + k];

    // Calculate the truncated average
    avgs[i] = Math.floor(sum / windowSize);
  }

  return avgs;
}

// Example usage:
const nums1 = [7, 4, 3, 9, 1, 8, 5, 2, 6];
const k1 = 3;
console.log(getAverages(nums1, k1)); // Output: [-1,-1,-1,5,4,4,-1,-1,-1]

const nums2 = [100000];
const k2 = 0;
console.log(getAverages(nums2, k2)); // Output: [100000]

const nums3 = [8];
const k3 = 100000;
console.log(getAverages(nums3, k3)); // Output: [-1]
