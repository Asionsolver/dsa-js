// 3721. Longest Balanced Subarray II

/**
Example 1:

Input: nums = [2,5,4,3]

Output: 4

Explanation:

The longest balanced subarray is [2, 5, 4, 3].
It has 2 distinct even numbers [2, 4] and 2 distinct odd numbers [5, 3]. Thus, the answer is 4.
Example 2:

Input: nums = [3,2,2,5,4]

Output: 5

Explanation:

The longest balanced subarray is [3, 2, 2, 5, 4].
It has 2 distinct even numbers [2, 4] and 2 distinct odd numbers [3, 5]. Thus, the answer is 5.
Example 3:

Input: nums = [1,2,3,2]

Output: 3

Explanation:

The longest balanced subarray is [2, 3, 2].
It has 1 distinct even number [2] and 1 distinct odd number [3]. Thus, the answer is 3.
 
*/

const nums = [1, 2, 3, 2];

const longestBalancedSubarray = function (nums: number[]): number {
  const n = nums.length;
  // Store the last seen position of each number (1-based index).
  // Constraints: 1 <= nums[i] <= 10^5.
  const lastPos = new Int32Array(100005).fill(0);

  // Segment Tree arrays
  // Range of start indices is [1, n + 1].
  // Size 4 * N is sufficient.
  const treeSize = 4 * (n + 2);
  const treeMin = new Int32Array(treeSize);
  const treeMax = new Int32Array(treeSize);
  const treeLazy = new Int32Array(treeSize);

  // Initialize tree with Infinity/-Infinity to mark inactive nodes
  const INF = 1e9;
  treeMin.fill(INF);
  treeMax.fill(-INF);

  // Helper to push lazy updates to children
  function push(node: number, start: number, end: number) {
    if (treeLazy[node] !== 0) {
      if (start !== end) {
        const l = 2 * node;
        const r = 2 * node + 1;
        const add = treeLazy[node];

        treeMin[l] += add;
        treeMax[l] += add;
        treeLazy[l] += add;

        treeMin[r] += add;
        treeMax[r] += add;
        treeLazy[r] += add;
      }
      treeLazy[node] = 0;
    }
  }

  // Range Update: add val to D[l...r]
  function update(
    node: number,
    start: number,
    end: number,
    l: number,
    r: number,
    val: number,
  ) {
    if (l > end || r < start) return;
    if (l <= start && end <= r) {
      treeMin[node] += val;
      treeMax[node] += val;
      treeLazy[node] += val;
      return;
    }
    push(node, start, end);
    const mid = (start + end) >> 1;
    update(2 * node, start, mid, l, r, val);
    update(2 * node + 1, mid + 1, end, l, r, val);

    treeMin[node] = Math.min(treeMin[2 * node], treeMin[2 * node + 1]);
    treeMax[node] = Math.max(treeMax[2 * node], treeMax[2 * node + 1]);
  }

  // Activate a new index with value 0 (for the empty subarray start)
  function setZero(node: number, start: number, end: number, idx: number) {
    if (start === end) {
      treeMin[node] = 0;
      treeMax[node] = 0;
      treeLazy[node] = 0;
      return;
    }
    push(node, start, end);
    const mid = (start + end) >> 1;
    if (idx <= mid) setZero(2 * node, start, mid, idx);
    else setZero(2 * node + 1, mid + 1, end, idx);

    treeMin[node] = Math.min(treeMin[2 * node], treeMin[2 * node + 1]);
    treeMax[node] = Math.max(treeMax[2 * node], treeMax[2 * node + 1]);
  }

  // Find the smallest index with value 0
  function findFirst(node: number, start: number, end: number): number {
    // Pruning: if 0 is not in range [min, max], it doesn't exist in this subtree
    if (treeMin[node] > 0 || treeMax[node] < 0) return -1;
    if (start === end) return start;

    push(node, start, end);
    const mid = (start + end) >> 1;

    // Try left child first to find smallest index
    const lRes = findFirst(2 * node, start, mid);
    if (lRes !== -1) return lRes;

    return findFirst(2 * node + 1, mid + 1, end);
  }

  const treeN = n + 1;
  // Initially, before processing any elements, the subarray starting at 1 (index 0) is empty and balanced.
  setZero(1, 1, treeN, 1);

  let maxLen = 0;

  for (let j = 0; j < n; j++) {
    const x = nums[j];
    const prev = lastPos[x]; // previous occurrence index (1-based), 0 if none
    lastPos[x] = j + 1; // update to current (1-based)

    const val = x % 2 === 0 ? 1 : -1;

    // Update the balance for all start indices that include this new distinct element
    // Range is (prev + 1) to (j + 1)
    update(1, 1, treeN, prev + 1, j + 1, val);

    // Activate the new start index (j + 2) which corresponds to an empty subarray relative to next step
    // We do this to ensure we can always find a valid start for a balanced subarray (even if length 0)
    if (j + 2 <= treeN) {
      setZero(1, 1, treeN, j + 2);
    }

    // Query for the leftmost start index 'i' with balance 0
    const idx = findFirst(1, 1, treeN);
    if (idx !== -1) {
      // idx is 1-based start index. Current end is j+1.
      // Length = (j + 1) - idx + 1
      const len = j + 1 - idx + 1;
      if (len > maxLen) maxLen = len;
    }
  }

  return maxLen;
};

console.log(longestBalancedSubarray(nums));
