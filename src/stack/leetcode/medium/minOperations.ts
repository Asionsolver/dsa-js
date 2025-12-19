// 3542. Minimum Operations to Convert All Elements to Zero

/** 
Example 1:

Input: nums = [0,2]

Output: 1

Explanation:

Select the subarray [1,1] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [0,0].
Thus, thnums = [3,1,2,1]e minimum number of operations required is 1.
Example 2:

Input: nums = [3,1,2,1]

Output: 3

Explanation:

Select subarray [1,3] (which is [1,2,1]), where the minimum non-negative integer is 1. Setting all occurrences of 1 to 0 results in [3,0,2,0].
Select subarray [2,2] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [3,0,0,0].
Select subarray [0,0] (which is [3]), where the minimum non-negative integer is 3. Setting all occurrences of 3 to 0 results in [0,0,0,0].
Thus, the minimum number of operations required is 3.
Example 3:

Input: nums = [1,2,1,2,1,2]

Output: 4

Explanation:

Select subarray [0,5] (which is [1,2,1,2,1,2]), where the minimum non-negative integer is 1. Setting all occurrences of 1 to 0 results in [0,2,0,2,0,2].
Select subarray [1,1] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [0,0,0,2,0,2].
Select subarray [3,3] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [0,0,0,0,0,2].
Select subarray [5,5] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [0,0,0,0,0,0].
Thus, the minimum number of operations required is 4.
*/

const nums = [3, 1, 2, 1];
const minOperations = function (nums: number[]): number {
  let operations = 0;
  const stack: number[] = [];

  for (const num of nums) {
    // If we hit a 0, the stack must be cleared because 0 is the absolute minimum
    // and prevents any previous numbers from spanning across it.
    if (num === 0) {
      stack.length = 0;
      continue;
    }

    // While the current number is smaller than the top of the stack,
    // the top of the stack is now "blocked" from further merging.
    while (stack.length > 0 && stack[stack.length - 1] > num) {
      stack.pop();
    }

    // If the stack is empty or the top is smaller than the current number,
    // it's a new operation we haven't accounted for yet.
    if (stack.length === 0 || stack[stack.length - 1] < num) {
      operations++;
      stack.push(num);
    }

    // If stack.top === num, we do nothing because this occurrence
    // is merged into the operation of the previous occurrence.
  }

  return operations;
};

console.log(minOperations(nums));
