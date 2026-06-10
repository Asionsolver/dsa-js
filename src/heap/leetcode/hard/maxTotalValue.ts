// 3691. Maximum Total Subarray Value II

/**
 

Example 1:

Input: nums = [1,3,2], k = 2

Output: 4

Explanation:

One optimal approach is:

Choose nums[0..1] = [1, 3]. The maximum is 3 and the minimum is 1, giving a value of 3 - 1 = 2.
Choose nums[0..2] = [1, 3, 2]. The maximum is still 3 and the minimum is still 1, so the value is also 3 - 1 = 2.
Adding these gives 2 + 2 = 4.

Example 2:

Input: nums = [4,2,5,1], k = 3

Output: 12

Explanation:

One optimal approach is:

Choose nums[0..3] = [4, 2, 5, 1]. The maximum is 5 and the minimum is 1, giving a value of 5 - 1 = 4.
Choose nums[1..3] = [2, 5, 1]. The maximum is 5 and the minimum is 1, so the value is also 4.
Choose nums[2..3] = [5, 1]. The maximum is 5 and the minimum is 1, so the value is again 4.
Adding these gives 4 + 4 + 4 = 12.
*/

class SparseTable {
  private st: Int32Array[];
  private compare: (x: number, y: number) => number;
  private logTable: Int32Array;

  constructor(
    nums: number[],
    logTable: Int32Array,
    compare: (x: number, y: number) => number,
  ) {
    const n = nums.length;
    this.compare = compare;
    this.logTable = logTable;
    const K = logTable[n] + 1;
    this.st = Array.from({ length: K }, () => new Int32Array(n));

    for (let i = 0; i < n; i++) {
      this.st[0][i] = i;
    }

    for (let j = 1; j < K; j++) {
      const len = 1 << (j - 1);
      const limit = n - (1 << j) + 1;
      for (let i = 0; i < limit; i++) {
        const x = this.st[j - 1][i];
        const y = this.st[j - 1][i + len];
        this.st[j][i] = this.compare(x, y);
      }
    }
  }

  // Returns the index of the min/max element in range [L, R]
  query(L: number, R: number): number {
    const len = R - L + 1;
    const j = this.logTable[len];
    const x = this.st[j][L];
    const y = this.st[j][R - (1 << j) + 1];
    return this.compare(x, y);
  }
}

interface HeapElement {
  diff: number;
  l: number;
  r: number;
  r_prev: number;
}

class MaxHeaps {
  private data: HeapElement[] = [];

  constructor(initialData?: HeapElement[]) {
    if (initialData) {
      this.data = initialData;
      for (let i = (this.data.length >> 1) - 1; i >= 0; i--) {
        this.down(i);
      }
    }
  }

  push(val: HeapElement) {
    this.data.push(val);
    this.up(this.data.length - 1);
  }

  pop(): HeapElement | undefined {
    if (this.data.length === 0) return undefined;
    const top = this.data[0];
    const bottom = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = bottom;
      this.down(0);
    }
    return top;
  }

  private up(i: number) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[i].diff <= this.data[p].diff) break;
      const tmp = this.data[i];
      this.data[i] = this.data[p];
      this.data[p] = tmp;
      i = p;
    }
  }

  private down(i: number) {
    const len = this.data.length;
    while ((i << 1) + 1 < len) {
      let child = (i << 1) + 1;
      if (
        child + 1 < len &&
        this.data[child + 1].diff > this.data[child].diff
      ) {
        child++;
      }
      if (this.data[i].diff >= this.data[child].diff) break;
      const tmp = this.data[i];
      this.data[i] = this.data[child];
      this.data[child] = tmp;
      i = child;
    }
  }

  size(): number {
    return this.data.length;
  }
}

function maxTotalValue(nums: number[], k: number): number {
  const n = nums.length;

  // Precompute logs for fast query operations
  const logTable = new Int32Array(n + 1);
  for (let i = 2; i <= n; i++) {
    logTable[i] = logTable[i >> 1] + 1;
  }

  // Build sparse tables to get indices of min and max elements
  const mi_st = new SparseTable(nums, logTable, (x, y) =>
    nums[x] < nums[y] ? x : y,
  );
  const mx_st = new SparseTable(nums, logTable, (x, y) =>
    nums[x] > nums[y] ? x : y,
  );

  const initialData: HeapElement[] = [];
  for (let l = 0; l < n; l++) {
    const mi = mi_st.query(l, n - 1);
    const mx = mx_st.query(l, n - 1);
    const diff = nums[mx] - nums[mi];
    initialData.push({
      diff,
      l,
      r: Math.max(mi, mx),
      r_prev: n,
    });
  }

  const pq = new MaxHeaps(initialData);
  let ans = 0;

  while (k > 0 && pq.size() > 0) {
    const item = pq.pop()!;
    const { diff, l, r, r_prev } = item;
    const d = Math.min(k, r_prev - r);
    ans += diff * d;
    k -= d;

    // If there's remaining unsearched subarray space on the left, split and push back
    if (r > l && k > 0) {
      const mi = mi_st.query(l, r - 1);
      const mx = mx_st.query(l, r - 1);
      const next_diff = nums[mx] - nums[mi];
      pq.push({
        diff: next_diff,
        l,
        r: Math.max(mi, mx),
        r_prev: r,
      });
    }
  }

  return ans;
}

// Example usage:
console.log(maxTotalValue([1, 3, 2], 2)); // Output: 4
console.log(maxTotalValue([4, 2, 5, 1], 3)); // Output: 12
