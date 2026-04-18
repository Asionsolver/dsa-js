// 436. Find Right Interval

/**
Example 1:

Input: intervals = [[1,2]]
Output: [-1]
Explanation: There is only one interval in the collection, so it outputs -1.
Example 2:

Input: intervals = [[3,4],[2,3],[1,2]]
Output: [-1,0,1]
Explanation: There is no right interval for [3,4].
The right interval for [2,3] is [3,4] since start0 = 3 is the smallest start that is >= end1 = 3.
The right interval for [1,2] is [2,3] since start1 = 2 is the smallest start that is >= end2 = 2.
Example 3:

Input: intervals = [[1,4],[2,3],[3,4]]
Output: [-1,2,-1]
Explanation: There is no right interval for [1,4] and [3,4].
The right interval for [2,3] is [3,4] since start2 = 3 is the smallest start that is >= end1 = 3.
*/

const findRightInterval = function (intervals: number[][]): number[] {
  const n = intervals.length;

  // Store pairs of [start_value, original_index]
  const starts: [number, number][] = new Array(n);
  for (let i = 0; i < n; i++) {
    starts[i] = [intervals[i][0], i];
  }

  // Sort the starts array by the start_value in ascending order
  starts.sort((a, b) => a[0] - b[0]);

  const result: number[] = new Array(n);

  // For each interval, binary search for the smallest start >= its end
  for (let i = 0; i < n; i++) {
    const end = intervals[i][1];
    let left = 0;
    let right = n - 1;
    let bestIndex = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (starts[mid][0] >= end) {
        // This is a valid right interval, but we want the minimized start.
        // Save this index and search the left half for a smaller valid start.
        bestIndex = starts[mid][1];
        right = mid - 1;
      } else {
        // The current start is too small, search the right half.
        left = mid + 1;
      }
    }

    result[i] = bestIndex;
  }

  return result;
};

// Example usage:
console.log(findRightInterval([[1, 2]])); // Output: [-1]
console.log(
  findRightInterval([
    [3, 4],
    [2, 3],
    [1, 2],
  ]),
); // Output: [-1, 0, 1]
console.log(
  findRightInterval([
    [1, 4],
    [2, 3],
    [3, 4],
  ]),
); // Output: [-1, 2, -1]
