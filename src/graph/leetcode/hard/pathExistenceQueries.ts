// 3534. Path Existence Queries in a Graph II

/**
Example 1:

Input: n = 5, nums = [1,8,3,4,2], maxDiff = 3, queries = [[0,3],[2,4]]

Output: [1,1]

Explanation:

The resulting graph is:



Query	Shortest Path	Minimum Distance
[0, 3]	0 → 3	1
[2, 4]	2 → 4	1
Thus, the output is [1, 1].

Example 2:

Input: n = 5, nums = [5,3,1,9,10], maxDiff = 2, queries = [[0,1],[0,2],[2,3],[4,3]]

Output: [1,2,-1,1]

Explanation:

The resulting graph is:



Query	Shortest Path	Minimum Distance
[0, 1]	0 → 1	1
[0, 2]	0 → 1 → 2	2
[2, 3]	None	-1
[4, 3]	3 → 4	1
Thus, the output is [1, 2, -1, 1].

Example 3:

Input: n = 3, nums = [3,6,1], maxDiff = 1, queries = [[0,0],[0,1],[1,2]]

Output: [0,-1,-1]

Explanation:

There are no edges between any two nodes because:

Nodes 0 and 1: |nums[0] - nums[1]| = |3 - 6| = 3 > 1
Nodes 0 and 2: |nums[0] - nums[2]| = |3 - 1| = 2 > 1
Nodes 1 and 2: |nums[1] - nums[2]| = |6 - 1| = 5 > 1
Thus, no node can reach any other node, and the output is [0, -1, -1].

*/

function pathExistenceQueries(
  n: number,
  nums: number[],
  maxDiff: number,
  queries: number[][],
): number[] {
  // Pair each number with its original index and sort by value
  const sortedNumAndIndexes = nums.map((num, i) => ({ num, originalIndex: i }));
  sortedNumAndIndexes.sort((a, b) => a.num - b.num);

  const sortedNums = new Int32Array(n);
  const indexMap = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    sortedNums[i] = sortedNumAndIndexes[i].num;
    indexMap[sortedNumAndIndexes[i].originalIndex] = i;
  }

  const maxLevel = Math.ceil(Math.log2(n)) + 1;
  // Flattened 1D array to optimize performance and memory locality
  const jump = new Int32Array(n * maxLevel);

  // Step 1: Precompute jump[i][0] using a sliding window (two pointers)
  let right = 0;
  for (let i = 0; i < n; i++) {
    right = Math.max(right, i);
    while (right + 1 < n && sortedNums[right + 1] - sortedNums[i] <= maxDiff) {
      right++;
    }
    jump[i * maxLevel + 0] = right;
  }

  // Step 2: Build the binary lifting table
  for (let level = 1; level < maxLevel; level++) {
    for (let i = 0; i < n; i++) {
      const prevJump = jump[i * maxLevel + (level - 1)];
      jump[i * maxLevel + level] = jump[prevJump * maxLevel + (level - 1)];
    }
  }

  // Helper function to find minimum jumps from start to end using binary lifting
  function minJumps(start: number, end: number): number {
    if (start === end) return 0;
    if (jump[start * maxLevel + 0] >= end) return 1;
    if (jump[start * maxLevel + (maxLevel - 1)] < end) return -1; // Unreachable

    let curr = start;
    let totalJumps = 0;
    let j = maxLevel - 1;

    while (curr < end) {
      if (jump[curr * maxLevel + 0] >= end) {
        totalJumps += 1;
        break;
      }
      while (j >= 0 && jump[curr * maxLevel + j] >= end) {
        j--;
      }
      if (j < 0) {
        return -1;
      }
      totalJumps += 1 << j;
      curr = jump[curr * maxLevel + j];
    }
    return totalJumps;
  }

  // Step 3: Process all queries
  const ans = new Int32Array(queries.length);
  for (let i = 0; i < queries.length; i++) {
    const u = queries[i][0];
    const v = queries[i][1];
    const uIndex = indexMap[u];
    const vIndex = indexMap[v];
    const start = uIndex < vIndex ? uIndex : vIndex;
    const end = uIndex < vIndex ? vIndex : uIndex;
    ans[i] = minJumps(start, end);
  }

  return Array.from(ans);
}

// Example usage:
const n = 5;
const nums = [5, 3, 1, 9, 10];
const maxDiff = 2;
const queries = [
  [0, 1],
  [0, 2],
  [2, 3],
  [4, 3],
];

console.log(pathExistenceQueries(n, nums, maxDiff, queries)); // Output: [1,2,-1,1]

const n2 = 3;
const nums2 = [3, 6, 1];
const maxDiff2 = 1;
const queries2 = [
  [0, 0],
  [0, 1],
  [1, 2],
];

console.log(pathExistenceQueries(n2, nums2, maxDiff2, queries2)); // Output: [0,-1,-1]

const n3 = 5;
const nums3 = [1, 8, 3, 4, 2];
const maxDiff3 = 3;
const queries3 = [
  [0, 3],
  [2, 4],
];

console.log(pathExistenceQueries(n3, nums3, maxDiff3, queries3)); // Output: [1,1]
