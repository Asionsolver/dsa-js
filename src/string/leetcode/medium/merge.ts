// 56. Merge Intervals

/**

Example 1:

Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
Example 2:

Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
Example 3:

Input: intervals = [[4,7],[1,4]]
Output: [[1,7]]
Explanation: Intervals [1,4] and [4,7] are considered overlapping.

 */

const merge = function (intervals: number[][]): number[][] {
  // If the array is empty, return an empty array
  if (intervals.length === 0) {
    return [];
  }

  // Sort intervals based on the starting value of each interval
  intervals.sort((a, b) => a[0] - b[0]);

  // Initialize the result array with the first interval
  const merged: number[][] = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const currentInterval = intervals[i];
    const lastMergedInterval = merged[merged.length - 1];

    // Check if there is an overlap
    if (currentInterval[0] <= lastMergedInterval[1]) {
      // Merge by updating the end time to the maximum of both
      lastMergedInterval[1] = Math.max(
        lastMergedInterval[1],
        currentInterval[1],
      );
    } else {
      // No overlap, push the current interval to the result
      merged.push(currentInterval);
    }
  }

  return merged;
};

// Example usage:
const intervals1 = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
];
console.log(merge(intervals1)); // Output: [[1,6],[8,10],[15,18]]

const intervals2 = [
  [1, 4],
  [4, 5],
];
console.log(merge(intervals2)); // Output: [[1,5]]

const intervals3 = [
  [4, 7],
  [1, 4],
];
console.log(merge(intervals3)); // Output: [[1,7]]
