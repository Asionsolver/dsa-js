// 2916. Subarrays Distinct Element Sum of Squares II

/**
You are given a 0-indexed integer array nums.

The distinct count of a subarray of nums is defined as:

Let nums[i..j] be a subarray of nums consisting of all the indices from i to j such that 0 <= i <= j < nums.length. Then the number of distinct values in nums[i..j] is called the distinct count of nums[i..j].
Return the sum of the squares of distinct counts of all subarrays of nums.

Since the answer may be very large, return it modulo 109 + 7.

A subarray is a contiguous non-empty sequence of elements within an array.


*/

/**
Example 1:

Input: nums = [1,2,1]
Output: 15
Explanation: Six possible subarrays are:
[1]: 1 distinct value
[2]: 1 distinct value
[1]: 1 distinct value
[1,2]: 2 distinct values
[2,1]: 2 distinct values
[1,2,1]: 2 distinct values
The sum of the squares of the distinct counts in all subarrays is equal to 12 + 12 + 12 + 22 + 22 + 22 = 15.
Example 2:

Input: nums = [2,2]
Output: 3
Explanation: Three possible subarrays are:
[2]: 1 distinct value
[2]: 1 distinct value
[2,2]: 1 distinct value
The sum of the squares of the distinct counts in all subarrays is equal to 12 + 12 + 12 = 3.

*/

/**
Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 105
*/

// Brute Force Approach: TLE
// function sumCounts(nums: number[]): number {
//   const MOD = 1_000_000_007;
//   let totalSum = 0;
//   const n = nums.length;

//   // Iterate through all possible starting indices.
//   for (let i = 0; i < n; i++) {
//     // Set to keep track of distinct elements in current subarray nums[i..j].
//     const distinctElements = new Set<number>();

//     // Expand the subarray to the right.
//     for (let j = i; j < n; j++) {
//       distinctElements.add(nums[j]);
//       const count = distinctElements.size;

//       // Add the square of distinct elements count.
//       totalSum = (totalSum + count * count) % MOD;
//     }
//   }

//   return totalSum;
// }

// Optimized Approach using Segment Tree with Lazy Propagation
const MOD = 1_000_000_007n;

class SegmentTree {
  private treeSum1: bigint[];
  private treeSum2: bigint[];
  private lazy: bigint[];
  private n: number;

  constructor(n: number) {
    this.n = n;
    // Allocate 4 * n space for the segment tree nodes.
    this.treeSum1 = new Array(4 * n).fill(0n);
    this.treeSum2 = new Array(4 * n).fill(0n);
    this.lazy = new Array(4 * n).fill(0n);
  }

  // Apply the lazy addition to a specific node.
  private apply(node: number, left: number, right: number, val: bigint): void {
    const len = BigInt(right - left + 1);
    const v = val % MOD;

    // (d + v)^2 = d^2 + 2*v*d + v^2
    // Update treeSum2: add 2 * v * sum1 + v^2 * len
    this.treeSum2[node] =
      (this.treeSum2[node] +
        2n * v * this.treeSum1[node] +
        ((v * v) % MOD) * len) %
      MOD;

    // Update treeSum1: add v * len
    this.treeSum1[node] = (this.treeSum1[node] + v * len) % MOD;

    // Accumulate lazy tag.
    this.lazy[node] = (this.lazy[node] + v) % MOD;
  }

  // Push the lazy value down to child nodes.
  private pushDown(node: number, left: number, right: number): void {
    if (this.lazy[node] === 0n) return;

    const mid = Math.floor((left + right) / 2);
    this.apply(2 * node, left, mid, this.lazy[node]);
    this.apply(2 * node + 1, mid + 1, right, this.lazy[node]);

    // Reset current node's lazy value.
    this.lazy[node] = 0n;
  }

  // Combine results from child nodes.
  private pushUp(node: number): void {
    this.treeSum1[node] =
      (this.treeSum1[2 * node] + this.treeSum1[2 * node + 1]) % MOD;
    this.treeSum2[node] =
      (this.treeSum2[2 * node] + this.treeSum2[2 * node + 1]) % MOD;
  }

  // Range update: add val to all elements in [ql, qr].
  public update(
    node: number,
    left: number,
    right: number,
    ql: number,
    qr: number,
    val: bigint,
  ): void {
    if (ql <= left && right <= qr) {
      this.apply(node, left, right, val);
      return;
    }

    this.pushDown(node, left, right);
    const mid = Math.floor((left + right) / 2);

    if (ql <= mid) {
      this.update(2 * node, left, mid, ql, qr, val);
    }
    if (qr > mid) {
      this.update(2 * node + 1, mid + 1, right, ql, qr, val);
    }

    this.pushUp(node);
  }

  // Get the total sum of squares for the entire array [0, n - 1].
  public getRootSum2(): bigint {
    return this.treeSum2[1];
  }
}

function sumCounts(nums: number[]): number {
  const n = nums.length;
  const segTree = new SegmentTree(n);

  // Track the last seen 0-based index for each number.
  const lastPos = new Map<number, number>();

  let totalAnswer = 0n;

  for (let j = 0; j < n; j++) {
    const val = nums[j];
    // If not seen before, its contribution starts from index 0.
    const prevIndex = lastPos.has(val) ? lastPos.get(val)! : -1;

    // Add 1 to range [prevIndex + 1, j].
    segTree.update(1, 0, n - 1, prevIndex + 1, j, 1n);

    // Add the sum of squares of all subarrays ending at index j.
    totalAnswer = (totalAnswer + segTree.getRootSum2()) % MOD;

    // Update the last seen position of nums[j].
    lastPos.set(val, j);
  }

  return Number(totalAnswer);
}

// Example usage:
const nums1 = [1, 2, 1];
console.log(sumCounts(nums1)); // Output: 15

const nums2 = [2, 2];
console.log(sumCounts(nums2)); // Output: 3
