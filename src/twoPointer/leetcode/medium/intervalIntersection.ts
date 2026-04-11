// 986. Interval List Intersections

/**
Example 1:


Input: firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]
Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
Example 2:

Input: firstList = [[1,3],[5,9]], secondList = []
Output: []
*/

const firstList = [
  [0, 2],
  [5, 10],
  [13, 23],
  [24, 25],
];
const secondList = [
  [1, 5],
  [8, 12],
  [15, 24],
  [25, 26],
];

const intervalIntersection = function (
  firstList: number[][],
  secondList: number[][],
): number[][] {
  let i = 0;
  let j = 0;
  const result: number[][] = [];

  // Traverse both lists until one is exhausted
  while (i < firstList.length && j < secondList.length) {
    // Find the overlapping bounds
    const start = Math.max(firstList[i][0], secondList[j][0]);
    const end = Math.min(firstList[i][1], secondList[j][1]);

    // If there is an overlap, add to the result
    if (start <= end) {
      result.push([start, end]);
    }

    // Advance the pointer for the interval that ends earlier
    if (firstList[i][1] < secondList[j][1]) {
      i++;
    } else {
      j++;
    }
  }

  return result;
};

console.log(intervalIntersection(firstList, secondList));
