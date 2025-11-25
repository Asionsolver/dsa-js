// Given N array elements and Q queries. For each query calculate sum of all elements in given range.
// arr = [-2,7,3,5,6,3,9,-8,4,2]

/**
Q = 6

S   E   Ans
4   8   14
3   7   15
1   3   15
0   4   19
6   9   7
7   7   -8
*/
//    index [ 0  1  2  3  4  5  6   7  8  9]
const arr = [-2, 7, 3, 5, 6, 3, 9, -8, 4, 2];
//prFixArr= [-2. 5, 8,13,19,22,31, 23,27,29]
const start = 3;
const end = 7;

const rangeSum = function (arr: number[], start: number, end: number) {
  let result = 0;
  for (let i = start; i <= end; i++) {
    result = result + arr[i];
  }
  return result;
};

console.log(rangeSum(arr, start, end));
