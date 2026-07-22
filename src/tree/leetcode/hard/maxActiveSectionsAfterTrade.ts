// 3501. Maximize Active Section with Trade II

/**
Example 1:

Input: s = "01", queries = [[0,1]]

Output: [1]

Explanation:

Because there is no block of '1's surrounded by '0's, no valid trade is possible. The maximum number of active sections is 1.

Example 2:

Input: s = "0100", queries = [[0,3],[0,2],[1,3],[2,3]]

Output: [4,3,1,1]

Explanation:

Query [0, 3] → Substring "0100" → Augmented to "101001"
Choose "0100", convert "0100" → "0000" → "1111".
The final string without augmentation is "1111". The maximum number of active sections is 4.

Query [0, 2] → Substring "010" → Augmented to "10101"
Choose "010", convert "010" → "000" → "111".
The final string without augmentation is "1110". The maximum number of active sections is 3.

Query [1, 3] → Substring "100" → Augmented to "11001"
Because there is no block of '1's surrounded by '0's, no valid trade is possible. The maximum number of active sections is 1.

Query [2, 3] → Substring "00" → Augmented to "1001"
Because there is no block of '1's surrounded by '0's, no valid trade is possible. The maximum number of active sections is 1.

Example 3:

Input: s = "1000100", queries = [[1,5],[0,6],[0,4]]

Output: [6,7,2]

Explanation:

Query [1, 5] → Substring "00010" → Augmented to "1000101"
Choose "00010", convert "00010" → "00000" → "11111".
The final string without augmentation is "1111110". The maximum number of active sections is 6.

Query [0, 6] → Substring "1000100" → Augmented to "110001001"
Choose "000100", convert "000100" → "000000" → "111111".
The final string without augmentation is "1111111". The maximum number of active sections is 7.

Query [0, 4] → Substring "10001" → Augmented to "1100011"
Because there is no block of '1's surrounded by '0's, no valid trade is possible. The maximum number of active sections is 2.

Example 4:

Input: s = "01010", queries = [[0,3],[1,4],[1,3]]

Output: [4,4,2]

Explanation:

Query [0, 3] → Substring "0101" → Augmented to "101011"
Choose "010", convert "010" → "000" → "111".
The final string without augmentation is "11110". The maximum number of active sections is 4.

Query [1, 4] → Substring "1010" → Augmented to "110101"
Choose "010", convert "010" → "000" → "111".
The final string without augmentation is "01111". The maximum number of active sections is 4.

Query [1, 3] → Substring "101" → Augmented to "11011"
Because there is no block of '1's surrounded by '0's, no valid trade is possible. The maximum number of active sections is 2.
*/

class SparseTable {
  private st: Int32Array[];

  constructor(nums: number[]) {
    const n = nums.length;
    if (n === 0) {
      this.st = [];
      return;
    }
    const log = 32 - Math.clz32(n);
    this.st = Array.from({ length: log }, () => new Int32Array(n));
    for (let i = 0; i < n; i++) {
      this.st[0][i] = nums[i];
    }
    for (let j = 1; j < log; j++) {
      const len = 1 << (j - 1);
      const row = this.st[j];
      const prevRow = this.st[j - 1];
      for (let i = 0; i + (1 << j) <= n; i++) {
        row[i] = Math.max(prevRow[i], prevRow[i + len]);
      }
    }
  }

  query(l: number, r: number): number {
    if (l > r || this.st.length === 0) return 0;
    const len = r - l + 1;
    const k = 31 - Math.clz32(len);
    return Math.max(this.st[k][l], this.st[k][r - (1 << k) + 1]);
  }
}

function lowerBound(arr: number[], target: number): number {
  let l = 0,
    r = arr.length;
  while (l < r) {
    const mid = (l + r) >> 1;
    if (arr[mid] >= target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
}

function upperBound(arr: number[], target: number): number {
  let l = 0,
    r = arr.length;
  while (l < r) {
    const mid = (l + r) >> 1;
    if (arr[mid] > target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
}

function maxActiveSectionsAfterTrade(s: string, queries: number[][]): number[] {
  const n = s.length;
  let ones = 0;
  for (let i = 0; i < n; i++) {
    if (s[i] === "1") ones++;
  }

  const zeroGroups: [number, number][] = [];
  const zeroGroupIndex = new Int32Array(n).fill(-1);
  let i = 0;
  while (i < n) {
    if (s[i] === "0") {
      const start = i;
      while (i < n && s[i] === "0") {
        zeroGroupIndex[i] = zeroGroups.length;
        i++;
      }
      zeroGroups.push([start, i]);
    } else {
      i++;
    }
  }

  const m = zeroGroups.length;
  if (m === 0) {
    return new Array(queries.length).fill(ones);
  }

  const zeroLen = new Int32Array(m);
  const leftEnds = new Array<number>(m);
  const rightEnds = new Array<number>(m);
  for (let j = 0; j < m; j++) {
    zeroLen[j] = zeroGroups[j][1] - zeroGroups[j][0];
    leftEnds[j] = zeroGroups[j][0];
    rightEnds[j] = zeroGroups[j][1];
  }

  let mergeLen: number[] = [];
  if (m >= 2) {
    mergeLen = new Array(m - 1);
    for (let j = 0; j < m - 1; j++) {
      mergeLen[j] = zeroLen[j] + zeroLen[j + 1];
    }
  }

  const st = new SparseTable(mergeLen);
  const ans: number[] = new Array(queries.length);

  for (let q = 0; q < queries.length; q++) {
    const l = queries[q][0];
    const r = queries[q][1];

    let res = ones;

    const first_full = lowerBound(leftEnds, l);
    const last_full = upperBound(rightEnds, r + 1) - 1;

    const gi_l = zeroGroupIndex[l];
    const gi_r = zeroGroupIndex[r];

    if (first_full <= last_full) {
      if (first_full < last_full) {
        res = Math.max(res, ones + st.query(first_full, last_full - 1));
      }
      if (s[l] === "0" && gi_l !== -1 && gi_l < first_full) {
        const left_part = zeroGroups[gi_l][1] - l;
        res = Math.max(res, ones + left_part + zeroLen[first_full]);
      }
      if (s[r] === "0" && gi_r !== -1 && gi_r > last_full) {
        const right_part = r + 1 - zeroGroups[gi_r][0];
        res = Math.max(res, ones + zeroLen[last_full] + right_part);
      }
    } else {
      if (
        s[l] === "0" &&
        s[r] === "0" &&
        gi_l !== -1 &&
        gi_r !== -1 &&
        gi_l + 1 === gi_r
      ) {
        const left_part = zeroGroups[gi_l][1] - l;
        const right_part = r + 1 - zeroGroups[gi_r][0];
        res = Math.max(res, ones + left_part + right_part);
      }
    }
    ans[q] = res;
  }

  return ans;
}

// Example usage:
const s = "0100";
const queries = [
  [0, 3],
  [0, 2],
  [1, 3],
  [2, 3],
];
console.log(maxActiveSectionsAfterTrade(s, queries)); // Output: [4, 3, 1, 1]

const s2 = "1000100";
const queries2 = [
  [1, 5],
  [0, 6],
  [0, 4],
];
console.log(maxActiveSectionsAfterTrade(s2, queries2)); // Output: [6, 7, 2]

const s3 = "01010";
const queries3 = [
  [0, 3],
  [1, 4],
  [1, 3],
];
console.log(maxActiveSectionsAfterTrade(s3, queries3)); // Output: [4, 4, 2]

const s4 = "01";
const queries4 = [[0, 1]];
console.log(maxActiveSectionsAfterTrade(s4, queries4)); // Output: [1]
