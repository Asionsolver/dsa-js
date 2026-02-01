// 3010. Divide an Array Into Subarrays With Minimum Cost I

/**
Example 1:

Input: nums = [1,2,3,12]
Output: 6
Explanation: The best possible way to form 3 subarrays is: [1], [2], and [3,12] at a total cost of 1 + 2 + 3 = 6.
The other possible ways to form 3 subarrays are:
- [1], [2,3], and [12] at a total cost of 1 + 2 + 12 = 15.
- [1,2], [3], and [12] at a total cost of 1 + 3 + 12 = 16.
Example 2:

Input: nums = [5,4,3]
Output: 12
Explanation: The best possible way to form 3 subarrays is: [5], [4], and [3] at a total cost of 5 + 4 + 3 = 12.
It can be shown that 12 is the minimum cost achievable.
Example 3:

Input: nums = [10,3,1,1]
Output: 12
Explanation: The best possible way to form 3 subarrays is: [10,3], [1], and [1] at a total cost of 10 + 1 + 1 = 12.
It can be shown that 12 is the minimum cost achievable.
*/

const nums = [1, 2, 3, 12];

// good
// function minimumCost(nums: number[]): number {
//   // The first element is mandatory as the start of the first subarray.
//   const cost1 = nums[0];

//   // We need to find the two smallest elements from the rest of the array
//   // (indices 1 to n-1) to serve as the starts of the 2nd and 3rd subarrays.
//   const rest = nums.slice(1);

//   // Sort the remaining elements in ascending order.
//   // We use (a, b) => a - b to ensure numeric sorting.
//   rest.sort((a, b) => a - b);

//   // The minimum total cost is the first element plus the two smallest
//   // found in the remainder of the array.
//   return cost1 + rest[0] + rest[1];
// }

// best
function minimumCost(nums: number[]): number {
  let min1 = Infinity; // Smallest element in nums[1:]
  let min2 = Infinity; // Second smallest element in nums[1:]

  // Iterate starting from index 1
  for (let i = 1; i < nums.length; i++) {
    const val = nums[i];
    if (val < min1) {
      min2 = min1;
      min1 = val;
    } else if (val < min2) {
      min2 = val;
    }
  }

  return nums[0] + min1 + min2;
}

console.log(minimumCost(nums));
