// 2580. Count Ways to Group Overlapping Ranges

/**
 

Example 1:

Input: ranges = [[6,10],[5,15]]
Output: 2
Explanation: 
The two ranges are overlapping, so they must be in the same group.
Thus, there are two possible ways:
- Put both the ranges together in group 1.
- Put both the ranges together in group 2.
Example 2:

Input: ranges = [[1,3],[10,20],[2,5],[4,8]]
Output: 4
Explanation: 
Ranges [1,3], and [2,5] are overlapping. So, they must be in the same group.
Again, ranges [2,5] and [4,8] are also overlapping. So, they must also be in the same group. 
Thus, there are four possible ways to group them:
- All the ranges in group 1.
- All the ranges in group 2.
- Ranges [1,3], [2,5], and [4,8] in group 1 and [10,20] in group 2.
- Ranges [1,3], [2,5], and [4,8] in group 2 and [10,20] in group 1.
 


*/

const ranges = [
  [1, 3],
  [10, 20],
  [2, 5],
  [4, 8],
];

function countWays(ranges: number[][]): number {
  const MOD = 1_000_000_007;

  // Sort the ranges by their starting points
  ranges.sort((a, b) => a[0] - b[0]);

  let ans = 1;
  let maxEnd = -1;

  for (const [start, end] of ranges) {
    // If the current start is greater than the max end of the current group,
    // it means we have found a new disconnected component.
    if (start > maxEnd) {
      ans = (ans * 2) % MOD;
    }

    // Update the maximum end point of the current group
    if (end > maxEnd) {
      maxEnd = end;
    }
  }

  return ans;
}

console.log(countWays(ranges));
