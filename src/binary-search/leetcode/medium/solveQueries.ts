// 3488. Closest Equal Element Queries

/**
Example 1:

Input: nums = [1,3,1,4,1,3,2], queries = [0,3,5]

Output: [2,-1,3]

Explanation:

Query 0: The element at queries[0] = 0 is nums[0] = 1. The nearest index with the same value is 2, and the distance between them is 2.
Query 1: The element at queries[1] = 3 is nums[3] = 4. No other index contains 4, so the result is -1.
Query 2: The element at queries[2] = 5 is nums[5] = 3. The nearest index with the same value is 1, and the distance between them is 3 (following the circular path: 5 -> 6 -> 0 -> 1).
Example 2:

Input: nums = [1,2,3,4], queries = [0,1,2,3]

Output: [-1,-1,-1,-1]

Explanation:

Each value in nums is unique, so no index shares the same value as the queried element. This results in -1 for all queries.

 
*/

const nums = [1, 3, 1, 4, 1, 3, 2],
  queries = [0, 3, 5];

function closestEqual(nums: number[], queries: number[]): number[] {
  const n = nums.length;

  // 1. Find max value to bound our "head" mapping array properly
  let maxVal = 0;
  for (let i = 0; i < n; i++) {
    if (nums[i] > maxVal) {
      maxVal = nums[i];
    }
  }

  // 2. Use typed arrays to form pseudo linked-lists. Grouping elements that share values together.
  const head = new Int32Array(maxVal + 1);
  head.fill(-1);
  const nextNode = new Int32Array(n);

  for (let i = n - 1; i >= 0; i--) {
    const v = nums[i];
    nextNode[i] = head[v];
    head[v] = i;
  }

  // 3. Precalculate the minimum equal neighbor distances for every index in nums
  const ansForIndex = new Int32Array(n);
  ansForIndex.fill(-1);
  const temp = new Int32Array(n);

  for (let v = 0; v <= maxVal; v++) {
    if (head[v] !== -1) {
      let count = 0;
      let curr = head[v];

      // Extract the sequentially ordered indices for the current value `v`
      while (curr !== -1) {
        temp[count++] = curr;
        curr = nextNode[curr];
      }

      // Check distances to consecutive elements wrapping circularly
      if (count > 1) {
        for (let k = 0; k < count; k++) {
          const cur = temp[k];
          const p = temp[k === 0 ? count - 1 : k - 1]; // Left adjacent equal element index
          const nx = temp[k === count - 1 ? 0 : k + 1]; // Right adjacent equal element index

          let dist1 = cur - p;
          if (dist1 < 0) dist1 = -dist1;
          if (n - dist1 < dist1) dist1 = n - dist1;

          let dist2 = nx - cur;
          if (dist2 < 0) dist2 = -dist2;
          if (n - dist2 < dist2) dist2 = n - dist2;

          ansForIndex[cur] = dist1 < dist2 ? dist1 : dist2;
        }
      }
    }
  }

  // 4. Quickly map answering queries into the results array
  const q = queries.length;
  const ans = new Array(q);
  for (let i = 0; i < q; i++) {
    ans[i] = ansForIndex[queries[i]];
  }

  return ans;
}

console.log(closestEqual(nums, queries));
