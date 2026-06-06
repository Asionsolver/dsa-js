// 2574. Left and Right Sum Differences

/**
Example 1:

Input: nums = [10,4,8,3]
Output: [15,1,11,22]
Explanation: The array leftSum is [0,10,14,22] and the array rightSum is [15,11,3,0].
The array answer is [|0 - 15|,|10 - 11|,|14 - 3|,|22 - 0|] = [15,1,11,22].
Example 2:

Input: nums = [1]
Output: [0]
Explanation: The array leftSum is [0] and the array rightSum is [0].
The array answer is [|0 - 0|] = [0].
*/
function leftRightDifference(nums: number[]): number[] {
  const totalSum = nums.reduce((acc, curr) => acc + curr, 0);
  let leftSum = 0;
  const answer: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    const rightSum = totalSum - leftSum - nums[i];
    answer.push(Math.abs(leftSum - rightSum));
    leftSum += nums[i];
  }

  return answer;
}

// Test cases
console.log(leftRightDifference([10, 4, 8, 3])); // Output: [15, 1, 11, 22]
console.log(leftRightDifference([1])); // Output: [0]
