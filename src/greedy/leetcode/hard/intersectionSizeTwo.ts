// 757. Set Intersection Size At Least Two

/**
Example 1:

Input: intervals = [[1,3],[3,7],[8,9]]
Output: 5
Explanation: let nums = [2, 3, 4, 8, 9].
It can be shown that there cannot be any containing array of size 4.
Example 2:

Input: intervals = [[1,3],[1,4],[2,5],[3,5]]
Output: 3
Explanation: let nums = [2, 3, 4].
It can be shown that there cannot be any containing array of size 2.
Example 3:

Input: intervals = [[1,2],[2,3],[2,4],[4,5]]
Output: 5
Explanation: let nums = [1, 2, 3, 4, 5].
It can be shown that there cannot be any containing array of size 4.
*/

const intervals = [
  [1, 3],
  [3, 7],
  [8, 9],
];

const intersectionSizeTwo = function (intervals: number[][]) {
  // 1. Sort intervals:
  // Primary: End point ascending
  // Secondary: Start point descending
  intervals.sort((a, b) => {
    if (a[1] !== b[1]) {
      return a[1] - b[1];
    }
    return b[0] - a[0];
  });

  let count = 0;
  // p1 and p2 represent the two largest elements currently in our set
  let p1 = -1;
  let p2 = -1;

  for (const [s, e] of intervals) {
    // Case 1: The interval is completely to the right of our picked points
    // We need to pick two new points.
    if (s > p2) {
      count += 2;
      p1 = e - 1;
      p2 = e;
    }
    // Case 2: Only the largest picked point p2 is inside the current interval
    // We need to pick one more point.
    else if (s > p1) {
      count += 1;
      // Shift p2 to p1 and pick the new largest possible point
      p1 = p2;
      p2 = e;
    }
    // Case 3: Both p1 and p2 are >= s.
    // Since intervals are sorted by end point, p1 and p2 are <= e.
    // Therefore, the interval already contains 2 points. Do nothing.
  }

  return count;
};

console.log(intersectionSizeTwo(intervals));
