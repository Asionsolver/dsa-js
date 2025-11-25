// Given a matrix [m][n] and Q queries, for every query find sub-matrix sum.
/**
Queries:

Top Left    Bottom Right    Sum
 (2,1)        (4,3)         20
 (3,2)        (5,4)         38
       
 */
const arr = [
  [7, 1, -6, 3, 13],
  [10, 5, -1, 0, 9],
  [6, 4, -3, 8, 11],
  [13, -8, -5, 12, 4],
  [3, 2, 1, 9, 8],
  [4, 3, -2, 6, 5],
];
const topLeft = [3, 2];
const bottomRight = [5, 4];

// optimal solution - O(n²)
const prefixSum = function (
  arr: number[][],
  topLeft: number[],
  bottomRight: number[]
) {
  const [r1, c1] = topLeft;
  const [r2, c2] = bottomRight;
  let sum = 0;
  for (let i = r1; i <= r2; i++) {
    for (let j = c1; j <= c2; j++) {
      sum += arr[i][j];
    }
  }
  return sum;
};

console.log(prefixSum(arr, topLeft, bottomRight));
