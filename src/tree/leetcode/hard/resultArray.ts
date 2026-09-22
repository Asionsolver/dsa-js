// 3525. Find X Value of Array II

/**
You are given an array of positive integers nums and a positive integer k. You are also given a 2D array queries, where queries[i] = [indexi, valuei, starti, xi].

You are allowed to perform an operation once on nums, where you can remove any suffix from nums such that nums remains non-empty.

The x-value of nums for a given x is defined as the number of ways to perform this operation so that the product of the remaining elements leaves a remainder of x modulo k.

For each query in queries you need to determine the x-value of nums for xi after performing the following actions:

Update nums[indexi] to valuei. Only this step persists for the rest of the queries.
Remove the prefix nums[0..(starti - 1)] (where nums[0..(-1)] will be used to represent the empty prefix).
Return an array result of size queries.length where result[i] is the answer for the ith query.

A prefix of an array is a subarray that starts from the beginning of the array and extends to any point within it.

A suffix of an array is a subarray that starts at any point within the array and extends to the end of the array.

Note that the prefix and suffix to be chosen for the operation can be empty.

Note that x-value has a different definition in this version.
*/

/**
Example 1:

Input: nums = [1,2,3,4,5], k = 3, queries = [[2,2,0,2],[3,3,3,0],[0,1,0,1]]

Output: [2,2,2]

Explanation:

For query 0, nums becomes [1, 2, 2, 4, 5], and the empty prefix must be removed. The possible operations are:
Remove the suffix [2, 4, 5]. nums becomes [1, 2].
Remove the empty suffix. nums becomes [1, 2, 2, 4, 5] with a product 80, which gives remainder 2 when divided by 3.
For query 1, nums becomes [1, 2, 2, 3, 5], and the prefix [1, 2, 2] must be removed. The possible operations are:
Remove the empty suffix. nums becomes [3, 5].
Remove the suffix [5]. nums becomes [3].
For query 2, nums becomes [1, 2, 2, 3, 5], and the empty prefix must be removed. The possible operations are:
Remove the suffix [2, 2, 3, 5]. nums becomes [1].
Remove the suffix [3, 5]. nums becomes [1, 2, 2].
Example 2:

Input: nums = [1,2,4,8,16,32], k = 4, queries = [[0,2,0,2],[0,2,0,1]]

Output: [1,0]

Explanation:

For query 0, nums becomes [2, 2, 4, 8, 16, 32]. The only possible operation is:
Remove the suffix [2, 4, 8, 16, 32].
For query 1, nums becomes [2, 2, 4, 8, 16, 32]. There is no possible way to perform the operation.
Example 3:

Input: nums = [1,1,2,1,1], k = 2, queries = [[2,1,0,1]]

Output: [5]
*/

/**
Constraints:

1 <= nums[i] <= 109
1 <= nums.length <= 105
1 <= k <= 5
1 <= queries.length <= 2 * 104
queries[i] == [indexi, valuei, starti, xi]
0 <= indexi <= nums.length - 1
1 <= valuei <= 109
0 <= starti <= nums.length - 1
0 <= xi <= k - 1
*/

// Brute Force Approach: TLE
// function resultArray(nums: number[], k: number, queries: number[][]): number[] {
//     const n = nums.length;
//     const result: number[] = [];

//     for (let q = 0; q < queries.length; q++) {
//         const [index, value, start, x] = queries[q];

//         // 1. Update the array at index. This persists.
//         nums[index] = value;

//         let runningProduct = 1;
//         let count = 0;

//         // 2. Traverse from start to n - 1 and calculate prefix products modulo k.
//         for (let j = start; j < n; j++) {
//             runningProduct = (runningProduct * (nums[j] % k)) % k;

//             // Check if the current prefix product matches x.
//             if (runningProduct === x) {
//                 count++;
//             }
//         }

//         result.push(count);
//     }

//     return result;
// };

// Interface to represent a Segment Tree node.
interface SegNode {
  prod: number;
  cnt: number[];
}

/**
 * Creates a leaf node for a single value modulo k.
 */
function createLeaf(val: number, k: number): SegNode {
  const rem = ((val % k) + k) % k;
  const cnt = new Array(k).fill(0);
  cnt[rem] = 1;
  return {
    prod: rem,
    cnt,
  };
}

/**
 * Merges two Segment Tree nodes from left to right.
 */
function mergeNodes(left: SegNode, right: SegNode, k: number): SegNode {
  const prod = (left.prod * right.prod) % k;
  const cnt = new Array(k).fill(0);

  // 1. All prefixes wholly within the left segment retain their remainders.
  for (let r = 0; r < k; r++) {
    cnt[r] += left.cnt[r];
  }

  // 2. Prefixes in the right segment are scaled by the left segment's total product.
  for (let r = 0; r < k; r++) {
    const newRem = (left.prod * r) % k;
    cnt[newRem] += right.cnt[r];
  }

  return { prod, cnt };
}

function resultArray(nums: number[], k: number, queries: number[][]): number[] {
  const n = nums.length;
  const tree: SegNode[] = new Array(4 * n);

  // Build the segment tree recursively.
  function build(node: number, start: number, end: number): void {
    if (start === end) {
      tree[node] = createLeaf(nums[start], k);
      return;
    }
    const mid = (start + end) >> 1;
    build(2 * node, start, mid);
    build(2 * node + 1, mid + 1, end);
    tree[node] = mergeNodes(tree[2 * node], tree[2 * node + 1], k);
  }

  // Point update at the specified index.
  function update(
    node: number,
    start: number,
    end: number,
    idx: number,
    val: number,
  ): void {
    if (start === end) {
      tree[node] = createLeaf(val, k);
      return;
    }
    const mid = (start + end) >> 1;
    if (idx <= mid) {
      update(2 * node, start, mid, idx, val);
    } else {
      update(2 * node + 1, mid + 1, end, idx, val);
    }
    tree[node] = mergeNodes(tree[2 * node], tree[2 * node + 1], k);
  }

  // Query canonical segment tree nodes covering range [ql, qr].
  function query(
    node: number,
    start: number,
    end: number,
    ql: number,
    qr: number,
  ): SegNode {
    if (ql <= start && end <= qr) {
      return tree[node];
    }
    const mid = (start + end) >> 1;
    if (qr <= mid) {
      return query(2 * node, start, mid, ql, qr);
    }
    if (ql > mid) {
      return query(2 * node + 1, mid + 1, end, ql, qr);
    }

    const leftRes = query(2 * node, start, mid, ql, qr);
    const rightRes = query(2 * node + 1, mid + 1, end, ql, qr);
    return mergeNodes(leftRes, rightRes, k);
  }

  // Build initial tree.
  build(1, 0, n - 1);

  const result: number[] = new Array(queries.length);

  // Process each query sequentially.
  for (let q = 0; q < queries.length; q++) {
    const [index, value, start, x] = queries[q];

    // 1. Persistent update.
    update(1, 0, n - 1, index, value);

    // 2. Query range [start, n - 1].
    const resNode = query(1, 0, n - 1, start, n - 1);

    // 3. Extract the count of prefix products congruent to x modulo k.
    result[q] = resNode.cnt[x];
  }

  return result;
}

// Example usage:
const nums = [1, 2, 3, 4, 5];
const k = 3;
const queries = [
  [2, 2, 0, 2],
  [3, 3, 3, 0],
  [0, 1, 0, 1],
];

console.log(resultArray(nums, k, queries)); // Output: [2, 2, 2]

const nums2 = [1, 2, 4, 8, 16, 32];
const k2 = 4;
const queries2 = [
  [0, 2, 0, 2],
  [0, 2, 0, 1],
];

console.log(resultArray(nums2, k2, queries2)); // Output: [1, 0]

const nums3 = [1, 1, 2, 1, 1];
const k3 = 2;
const queries3 = [[2, 1, 0, 1]];

console.log(resultArray(nums3, k3, queries3)); // Output: [5]
