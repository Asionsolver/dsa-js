// 2406. Divide Intervals Into Minimum Number of Groups

/**
Example 1:

Input: intervals = [[5,10],[6,8],[1,5],[2,3],[1,10]]
Output: 3
Explanation: We can divide the intervals into the following groups:
- Group 1: [1, 5], [6, 8].
- Group 2: [2, 3], [5, 10].
- Group 3: [1, 10].
It can be proven that it is not possible to divide the intervals into fewer than 3 groups.
Example 2:

Input: intervals = [[1,3],[5,6],[8,10],[11,13]]
Output: 1
Explanation: None of the intervals overlap, so we can put all of them in one group.
*/

const intervals = [
  [5, 10],
  [6, 8],
  [1, 5],
  [2, 3],
  [1, 10],
];

const minGroups = function (intervals: number[][]): number {
  const n = intervals.length;

  // Using TypedArrays for faster memory allocation and native numeric sorting
  const starts = new Int32Array(n);
  const ends = new Int32Array(n);

  for (let i = 0; i < n; i++) {
    starts[i] = intervals[i][0];
    ends[i] = intervals[i][1];
  }

  // TypedArrays sort numerically by default
  starts.sort();
  ends.sort();

  let maxGroups = 0;
  let currentGroups = 0;
  let i = 0; // Pointer for starts
  let j = 0; // Pointer for ends

  while (i < n) {
    if (starts[i] <= ends[j]) {
      // An interval starts, taking up a group
      currentGroups++;
      if (currentGroups > maxGroups) {
        maxGroups = currentGroups;
      }
      i++;
    } else {
      // An interval ends, freeing up a group
      currentGroups--;
      j++;
    }
  }

  return maxGroups;
};

console.log(minGroups(intervals));
