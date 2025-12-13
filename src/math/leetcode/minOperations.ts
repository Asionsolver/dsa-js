// 3512. Minimum Operations to Make Array Sum Divisible by K

/**



Example 1:

Input: nums = [3,9,7], k = 5

Output: 4

Explanation:

Perform 4 operations on nums[1] = 9. Now, nums = [3, 5, 7].
The sum is 15, which is divisible by 5.
Example 2:

Input: nums = [4,1,3], k = 4

Output: 0

Explanation:

The sum is 8, which is already divisible by 4. Hence, no operations are needed.
Example 3:

Input: nums = [3,2], k = 6

Output: 5

Explanation:

Perform 3 operations on nums[0] = 3 and 2 operations on nums[1] = 2. Now, nums = [0, 0].
The sum is 0, which is divisible by 6.
 

*/

const nums = [3, 9, 7],
  k = 5;
const minOperations = function (nums: number[], k: number) {
  // Calculate the total sum of the array elements
  const totalSum = nums.reduce((acc, curr) => acc + curr, 0);

  // The number of operations needed is the remainder of the sum divided by k.
  // If the remainder is 0, the sum is already divisible.
  // If remainder > 0, we subtract exactly that amount to reach the previous multiple of k.
  return totalSum % k;
};

console.log(minOperations(nums, k));
