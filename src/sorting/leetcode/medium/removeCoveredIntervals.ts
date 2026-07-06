// 1288. Remove Covered Intervals

/**
Example 1:

Input: intervals = [[1,4],[3,6],[2,8]]
Output: 2
Explanation: Interval [3,6] is covered by [2,8], therefore it is removed.
Example 2:

Input: intervals = [[1,4],[2,3]]
Output: 1

*/

function removeCoveredIntervals(intervals: number[][]): number {
  // Sort primarily by start time ascending, secondarily by end time descending
  intervals.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    }
    return b[1] - a[1];
  });

  let remainingCount = 0;
  let maxEnd = 0;

  for (const [_, end] of intervals) {
    // If the current interval's end is larger than the maximum end seen so far,
    // it cannot be fully covered by any previously processed interval.
    if (end > maxEnd) {
      remainingCount++;
      maxEnd = end;
    }
  }

  return remainingCount;
}

// Example usage:
const intervals1 = [
  [1, 4],
  [3, 6],
  [2, 8],
];
console.log(removeCoveredIntervals(intervals1)); // Output: 2

const intervals2 = [
  [1, 4],
  [2, 3],
];
console.log(removeCoveredIntervals(intervals2)); // Output: 1
