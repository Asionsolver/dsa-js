// 3507. Minimum Pair Removal to Sort Array I

/**
Example 1:

Input: nums = [5,2,3,1]

Output: 2

Explanation:

The pair (3,1) has the minimum sum of 4. After replacement, nums = [5,2,4].
The pair (2,4) has the minimum sum of 6. After replacement, nums = [5,6].
The array nums became non-decreasing in two operations.

Example 2:

Input: nums = [1,2,2]

Output: 0

Explanation:

The array nums is already sorted.


*/
const nums = [1, 2, 2];

const minOperations = function (nums: number[]): number {
  // Create a copy of the array to perform operations on
  let arr: number[] = [...nums];
  let operations = 0;

  // Helper function to check if the array is non-decreasing
  const isSorted = (currentArr: number[]): boolean => {
    for (let i = 0; i < currentArr.length - 1; i++) {
      if (currentArr[i] > currentArr[i + 1]) {
        return false;
      }
    }
    return true;
  };

  // Simulate the process until the array is sorted
  while (!isSorted(arr)) {
    let minSum = Infinity;
    let minIndex = -1;

    // Find the adjacent pair with the minimum sum
    // We iterate to length - 1 because we look at pairs (i, i+1)
    for (let i = 0; i < arr.length - 1; i++) {
      const sum = arr[i] + arr[i + 1];

      // If we find a strictly smaller sum, update minSum and minIndex.
      // If the sum is equal to minSum, we do nothing, preserving the leftmost index.
      if (sum < minSum) {
        minSum = sum;
        minIndex = i;
      }
    }

    // Apply the operation: replace the pair at minIndex and minIndex+1 with their sum.
    // Array.splice(start, deleteCount, itemToInsert) handles this cleanly.
    if (minIndex !== -1) {
      arr.splice(minIndex, 2, minSum);
      operations++;
    }
  }

  return operations;
};

console.log(minOperations(nums));
