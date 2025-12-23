// 3427. Sum of Variable Length Subarrays

/**
Example 1:

Input: nums = [2,3,1]

Output: 11

Explanation:

i	Subarray	Sum
0	nums[0] = [2]	2
1	nums[0 ... 1] = [2, 3]	5
2	nums[1 ... 2] = [3, 1]	4
Total Sum	 	11
The total sum is 11. Hence, 11 is the output.

Example 2:

Input: nums = [3,1,1,2]

Output: 13

Explanation:

i	Subarray	Sum
0	nums[0] = [3]	3
1	nums[0 ... 1] = [3, 1]	4
2	nums[1 ... 2] = [1, 1]	2
3	nums[1 ... 3] = [1, 1, 2]	4
Total Sum	 	13
The total sum is 13. Hence, 13 is the output. 
*/

const nums = [3, 1, 1, 2];
const subarraySum = function (nums: number[]) {
  const n = nums.length;

  // Create a prefix sum array.
  // prefixSum[i] will store the sum of all elements from nums[0] to nums[i-1].
  // Size is n + 1 to handle the case where start index is 0 comfortably.
  const prefixSum = new Array(n + 1).fill(0);

  // Build the prefix sum array
  for (let i = 0; i < n; i++) {
    prefixSum[i + 1] = prefixSum[i] + nums[i];
  }

  let totalSum = 0;

  // Iterate through each index i
  for (let i = 0; i < n; i++) {
    // Calculate the start index defined by the problem
    const start = Math.max(0, i - nums[i]);

    // Calculate the sum of the subarray nums[start ... i]
    // Using prefix sums, the sum of nums[start...i] is prefixSum[i+1] - prefixSum[start]
    const currentSubarraySum = prefixSum[i + 1] - prefixSum[start];

    // Add to total
    totalSum += currentSubarraySum;
  }

  return totalSum;
};

console.log(subarraySum(nums));
