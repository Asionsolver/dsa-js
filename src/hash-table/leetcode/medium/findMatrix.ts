// 2610. Convert an Array Into a 2D Array With Conditions
/**
Example 1:

Input: nums = [1,3,4,1,2,3,1]
Output: [[1,3,4,2],[1,3],[1]]
Explanation: We can create a 2D array that contains the following rows:
- 1,3,4,2
- 1,3
- 1
All elements of nums were used, and each row of the 2D array contains distinct integers, so it is a valid answer.
It can be shown that we cannot have less than 3 rows in a valid array.
Example 2:

Input: nums = [1,2,3,4]
Output: [[4,3,2,1]]
Explanation: All elements of the array are distinct, so we can keep all of them in the first row of the 2D array.

*/

// without hash table
const nums = [1, 3, 4, 1, 2, 3, 1];
const findMatrix = function (nums: number[]): number[][] {
  const result: number[][] = [];
  // We use an array to store the frequency of each number.
  // Constraints state 1 <= nums[i] <= nums.length, so size 201 is sufficient.
  const freq: number[] = new Array(nums.length + 1).fill(0);

  for (const num of nums) {
    // 'row' is determined by how many times we have seen 'num' so far.
    // If we have seen 'num' 0 times, it goes in row 0.
    // If we have seen 'num' 1 time, it goes in row 1, etc.
    const rowIdx = freq[num];

    // If the result array doesn't have this row yet, create it.
    if (result.length <= rowIdx) {
      result.push([]);
    }

    // Add the number to the specific row
    result[rowIdx].push(num);

    // Increment the count so the next duplicate of 'num' goes to the next row
    freq[num]++;
  }

  return result;
};

// with hash table

console.log(findMatrix(nums));
