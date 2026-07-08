// 3756. Concatenate Non-Zero Digits and Multiply by Sum II

/***
Example 1:

Input: s = "10203004", queries = [[0,7],[1,3],[4,6]]

Output: [12340, 4, 9]

Explanation:

s[0..7] = "10203004"
x = 1234
sum = 1 + 2 + 3 + 4 = 10
Therefore, answer is 1234 * 10 = 12340.
s[1..3] = "020"
x = 2
sum = 2
Therefore, the answer is 2 * 2 = 4.
s[4..6] = "300"
x = 3
sum = 3
Therefore, the answer is 3 * 3 = 9.
Example 2:

Input: s = "1000", queries = [[0,3],[1,1]]

Output: [1, 0]

Explanation:

s[0..3] = "1000"
x = 1
sum = 1
Therefore, the answer is 1 * 1 = 1.
s[1..1] = "0"
x = 0
sum = 0
Therefore, the answer is 0 * 0 = 0.
Example 3:

Input: s = "9876543210", queries = [[0,9]]

Output: [444444137]

Explanation:

s[0..9] = "9876543210"
x = 987654321
sum = 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1 = 45
Therefore, the answer is 987654321 * 45 = 44444444445.
We return 44444444445 modulo (109 + 7) = 444444137.

*/

function sumAndMultiply(s: string, queries: number[][]): number[] {
  const MOD = 1000000007n;
  const n = s.length;

  const pow10: bigint[] = new Array(n + 1);
  pow10[0] = 1n;

  const idx: number[] = new Array(n + 1);
  idx[0] = 0;

  const x: bigint[] = new Array(n + 1);
  x[0] = 0n;

  const total: bigint[] = new Array(n + 1);
  total[0] = 0n;

  // Precompute prefix arrays
  for (let i = 0; i < n; i++) {
    const d = BigInt(s.charCodeAt(i) - 48); // '0' is 48

    pow10[i + 1] = (pow10[i] * 10n) % MOD;
    idx[i + 1] = idx[i] + (d !== 0n ? 1 : 0);
    x[i + 1] = d !== 0n ? (x[i] * 10n + d) % MOD : x[i];
    total[i + 1] = total[i] + d;
  }

  const ans: number[] = new Array(queries.length);

  // Process each query in O(1) time
  for (let q = 0; q < queries.length; q++) {
    const [l, r] = queries[q];

    // Extract the concatenated value of non-zero digits in s[l..r]
    const count = idx[r + 1] - idx[l];
    const x_diff = (x[r + 1] - ((x[l] * pow10[count]) % MOD) + MOD) % MOD;

    // Extract the sum of non-zero digits in s[l..r]
    const total_diff = total[r + 1] - total[l];

    // Calculate (x * sum) % MOD
    ans[q] = Number((x_diff * total_diff) % MOD);
  }

  return ans;
}

// Example usage:
const s = "10203004";
const queries = [
  [0, 7],
  [1, 3],
  [4, 6],
];
console.log(sumAndMultiply(s, queries)); // Output: [12340, 4, 9]

const s2 = "1000";
const queries2 = [
  [0, 3],
  [1, 1],
];
console.log(sumAndMultiply(s2, queries2)); // Output: [1, 0]

const s3 = "9876543210";
const queries3 = [[0, 9]];
console.log(sumAndMultiply(s3, queries3)); // Output: [444444137]
