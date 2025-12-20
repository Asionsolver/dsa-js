// 1018. Binary Prefix Divisible By 5

/**
Example 1:

Input: nums = [0,1,1]
Output: [true,false,false]
Explanation: The input numbers in binary are 0, 01, 011; which are 0, 1, and 3 in base-10.
Only the first number is divisible by 5, so answer[0] is true.
Example 2:

Input: nums = [1,1,1]
Output: [false,false,false]

*/

const nums = [0, 1, 1];
const prefixesDivBy5 = function (nums: number[]) {
  const answer: boolean[] = [];
  let currentRemainder = 0;

  for (let i = 0; i < nums.length; i++) {
    // Shift the previous remainder left by 1 (multiply by 2)
    // and add the current bit, then take modulo 5
    currentRemainder = (currentRemainder * 2 + nums[i]) % 5;

    // If the remainder is 0, the number is divisible by 5
    answer.push(currentRemainder === 0);
  }

  return answer;
};
console.log(prefixesDivBy5(nums));
