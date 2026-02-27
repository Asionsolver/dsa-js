// 3666. Minimum Operations to Equalize Binary String

/**

Example 1:

Input: s = "110", k = 1

Output: 1

Explanation:

There is one '0' in s.
Since k = 1, we can flip it directly in one operation.
Example 2:

Input: s = "0101", k = 3

Output: 2

Explanation:

One optimal set of operations choosing k = 3 indices in each operation is:

Operation 1: Flip indices [0, 1, 3]. s changes from "0101" to "1000".
Operation 2: Flip indices [1, 2, 3]. s changes from "1000" to "1111".
Thus, the minimum number of operations is 2.

Example 3:

Input: s = "101", k = 2

Output: -1

Explanation:

Since k = 2 and s has only one '0', it is impossible to flip exactly k indices to make all '1'. Hence, the answer is -1.
*/

const s = "110",
  k = 1;

const minOperations = function (s: string, k: number): number {
  const n = s.length;
  let z = 0;
  for (let i = 0; i < n; i++) {
    if (s[i] === "0") z++;
  }

  if (z === 0) return 0;

  // Special case where we must flip all bits
  if (n === k) {
    return z === n ? 1 : -1;
  }

  if (k % 2 === 0) {
    // If k is even, total flips mk is even.
    // Sum of parities of flips required is z (mod 2).
    // So z must be even.
    if (z % 2 !== 0) return -1;

    // Try odd m
    // Condition: mk <= S_max(odd) = nm - n + z => m(n-k) >= n-z
    let m1_base = Math.ceil(z / k);
    let m1_sec = Math.ceil((n - z) / (n - k));
    let m1 = Math.max(m1_base, m1_sec);
    if (m1 % 2 === 0) m1++;

    // Try even m
    // Condition: mk <= S_max(even) = nm - z => m(n-k) >= z
    let m2_base = Math.ceil(z / k);
    let m2_sec = Math.ceil(z / (n - k));
    let m2 = Math.max(m2_base, m2_sec);
    if (m2 % 2 !== 0) m2++;

    return Math.min(m1, m2);
  } else {
    // If k is odd, parity of mk is parity of m.
    // So m must have same parity as z.
    let m = Math.ceil(z / k);

    if (z % 2 === 0) {
      // m must be even
      // Condition: m(n-k) >= z
      m = Math.max(m, Math.ceil(z / (n - k)));
      if (m % 2 !== 0) m++;
    } else {
      // m must be odd
      // Condition: m(n-k) >= n-z
      m = Math.max(m, Math.ceil((n - z) / (n - k)));
      if (m % 2 === 0) m++;
    }
    return m;
  }
};

console.log(minOperations(s, k));
