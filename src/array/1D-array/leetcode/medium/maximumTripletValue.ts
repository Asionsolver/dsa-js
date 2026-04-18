// 2874. Maximum Value of an Ordered Triplet II

/**
Example 1:

Input: nums = [12,6,1,2,7]
Output: 77
Explanation: The value of the triplet (0, 2, 4) is (nums[0] - nums[2]) * nums[4] = 77.
It can be shown that there are no ordered triplets of indices with a value greater than 77. 
Example 2:

Input: nums = [1,10,3,4,19]
Output: 133
Explanation: The value of the triplet (1, 2, 4) is (nums[1] - nums[2]) * nums[4] = 133.
It can be shown that there are no ordered triplets of indices with a value greater than 133.
Example 3:

Input: nums = [1,2,3]
Output: 0
Explanation: The only ordered triplet of indices (0, 1, 2) has a negative value of (nums[0] - nums[1]) * nums[2] = -3. Hence, the answer would be 0.

*/
const maximumTripletValue = (nums: number[]): number => {
  let ans = 0;
  let max_i = 0;
  let max_diff = 0;

  for (const num of nums) {
    // Calculate the max triplet value matching `max_diff` (which acts as nums[i] - nums[j]) with the current `num` (nums[k])
    if (max_diff * num > ans) {
      ans = max_diff * num;
    }

    // Update the maximum difference `nums[i] - nums[j]` using the best `nums[i]` seen so far and current `num` as `nums[j]`
    if (max_i - num > max_diff) {
      max_diff = max_i - num;
    }

    // Update the maximum `nums[i]` seen so far
    if (num > max_i) {
      max_i = num;
    }
  }

  return ans;
};

// Example usage:
console.log(maximumTripletValue([12, 6, 1, 2, 7])); // Output: 77
console.log(maximumTripletValue([1, 10, 3, 4, 19])); // Output: 133
console.log(maximumTripletValue([1, 2, 3])); // Output: 0
