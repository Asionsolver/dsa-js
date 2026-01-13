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

const nums = [1, 3, 4, 1, 2, 3, 1];
// without hash table
// const findMatrix = function (nums: number[]): number[][] {
//   const result: number[][] = [];
//   // We use an array to store the frequency of each number.
//   // Constraints state 1 <= nums[i] <= nums.length, so size 201 is sufficient.
//   const freq: number[] = new Array(nums.length + 1).fill(0);

//   for (const num of nums) {
//     // 'row' is determined by how many times we have seen 'num' so far.
//     // If we have seen 'num' 0 times, it goes in row 0.
//     // If we have seen 'num' 1 time, it goes in row 1, etc.
//     const rowIdx = freq[num];

//     // If the result array doesn't have this row yet, create it.
//     if (result.length <= rowIdx) {
//       result.push([]);
//     }

//     // Add the number to the specific row
//     result[rowIdx].push(num);

//     // Increment the count so the next duplicate of 'num' goes to the next row
//     freq[num]++;
//   }

//   return result;
// };

// with hash table
// const findMatrix = function (nums: number[]): number[][] {
//   // This Map acts as our Hash Table.
//   // Key: The number from nums
//   // Value: The number of times we have seen it so far (frequency)
//   const freqMap = new Map<number, number>();

//   const result: number[][] = [];

//   for (const num of nums) {
//     // Get the current frequency count of the number.
//     // If it's not in the map, default to 0.
//     const count = freqMap.get(num) || 0;

//     // The 'count' determines the row index.
//     // If 'num' has appeared 0 times, it goes to row 0.
//     // If 'num' has appeared 1 time, it goes to row 1.

//     // If the result array doesn't have a row for this index yet, create one.
//     if (result.length <= count) {
//       result.push([]);
//     }

//     // Add the number to the specific row
//     result[count].push(num);

//     // Update the hash table with the new count
//     freqMap.set(num, count + 1);
//   }

//   return result;
// };

// better solution
// const findMatrix = function (nums: number[]): number[][] {
//   // Optimization 1: Use a Typed Array.
//   // It is automatically initialized to 0, which is faster than new Array(n).fill(0).
//   // Since nums.length <= 200, the count will never exceed 255, so Uint8 is perfect.
//   const freq = new Uint8Array(nums.length + 1);

//   const result: number[][] = [];
//   const len = nums.length;

//   // Optimization 2: Use a standard for-loop to avoid iterator overhead.
//   for (let i = 0; i < len; i++) {
//     const val = nums[i];
//     const row = freq[val];

//     // If we need a new row, add it
//     if (result.length <= row) {
//       result.push([]);
//     }

//     // Add the value to the correct row
//     result[row].push(val);

//     // Increment frequency for this value
//     freq[val]++;
//   }

//   return result;
// };

// best solution
function findMatrix(nums: number[]): number[][] {
  const n = nums.length;
  // Use a standard array. For small sizes (<=200), this is extremely fast
  // and avoids the slight overhead of TypedArray wrappers in some environments.
  const count = new Array(n + 1).fill(0);
  const res: number[][] = [];

  for (let i = 0; i < n; i++) {
    const val = nums[i];
    const c = count[val];

    // Optimization:
    // If we need a new row (res.length === c), we push the array WITH the value immediately.
    // This avoids creating an empty array and then looking it up again to push the value.
    if (res.length === c) {
      res.push([val]);
    } else {
      res[c].push(val);
    }

    // Increment frequency using the local variable 'c' to avoid re-reading from the array.
    count[val] = c + 1;
  }

  return res;
}
console.log(findMatrix(nums));
