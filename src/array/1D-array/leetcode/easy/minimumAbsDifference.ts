// 1200. Minimum Absolute Difference

/**
Example 1:

Input: arr = [4,2,1,3]
Output: [[1,2],[2,3],[3,4]]
Explanation: The minimum absolute difference is 1. List all pairs with difference equal to 1 in ascending order.
Example 2:

Input: arr = [1,3,6,10,15]
Output: [[1,3]]
Example 3:

Input: arr = [3,8,-10,23,19,-4,-14,27]
Output: [[-14,-10],[19,23],[23,27]]

*/
const arr = [3, 8, -10, 23, 19, -4, -14, 27];
const minimumAbsDifference = function (arr: number[]): number[][] {
  // 1. Sort array in ascending order so we only compare adjacent elements
  arr.sort((a, b) => a - b);

  let minDiff = Infinity;
  let result: number[][] = [];

  // 2. Iterate through the array to find the minimum difference
  for (let i = 0; i < arr.length - 1; i++) {
    const diff = arr[i + 1] - arr[i];

    // Case A: We found a difference smaller than our current minimum
    if (diff < minDiff) {
      minDiff = diff;
      // Clear previous results as they are no longer the minimum
      result = [[arr[i], arr[i + 1]]];
    }
    // Case B: We found a difference equal to the current minimum
    else if (diff === minDiff) {
      result.push([arr[i], arr[i + 1]]);
    }
  }

  return result;
};

console.log(minimumAbsDifference(arr));
