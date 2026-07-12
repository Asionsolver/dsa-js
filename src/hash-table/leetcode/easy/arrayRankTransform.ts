// 1331. Rank Transform of an Array

/**
Example 1:

Input: arr = [40,10,20,30]
Output: [4,1,2,3]
Explanation: 40 is the largest element. 10 is the smallest. 20 is the second smallest. 30 is the third smallest.
Example 2:

Input: arr = [100,100,100]
Output: [1,1,1]
Explanation: Same elements share the same rank.
Example 3:

Input: arr = [37,12,28,9,100,56,80,5,12]
Output: [5,3,4,2,8,6,7,1,3]

*/

function arrayRankTransform(arr: number[]): number[] {
  // Step 1: Create a sorted copy of the array
  const sorted = [...arr].sort((a, b) => a - b);

  // Step 2: Map each unique element to its rank
  const rankMap = new Map<number, number>();
  let rank = 1;

  for (const num of sorted) {
    if (!rankMap.has(num)) {
      rankMap.set(num, rank);
      rank++;
    }
  }

  // Step 3: Replace each element in the original array with its rank
  return arr.map((num) => rankMap.get(num)!);
}

// Example usage:
const arr1 = [40, 10, 20, 30];
console.log(arrayRankTransform(arr1)); // Output: [4, 1, 2, 3]

const arr2 = [100, 100, 100];
console.log(arrayRankTransform(arr2)); // Output: [1, 1, 1]

const arr3 = [37, 12, 28, 9, 100, 56, 80, 5, 12];
console.log(arrayRankTransform(arr3)); // Output: [5, 3, 4, 2, 8, 6, 7, 1, 3]
