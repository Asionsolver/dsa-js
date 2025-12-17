// 3234. Count the Number of Substrings With Dominant Ones

/**
Example 1:

Input: s = "00011"

Output: 5

Explanation:

The substrings with dominant ones are shown in the table below.

i	j	s[i..j]	Number of Zeros	Number of Ones
3	3	1	0	1
4	4	1	0	1
2	3	01	1	1
3	4	11	0	2
2	4	011	1	2
Example 2:

Input: s = "101101"

Output: 16

Explanation:

The substrings with non-dominant ones are shown in the table below.

Since there are 21 substrings total and 5 of them have non-dominant ones, it follows that there are 16 substrings with dominant ones.

i	j	s[i..j]	Number of Zeros	Number of Ones
1	1	0	1	0
4	4	0	1	0
1	4	0110	2	2
0	4	10110	2	3
1	5	01101	2	3

*/
const s = "00011";

const numberOfSubstrings = function (s: string) {
  const n = s.length;
  const zeroIndices: number[] = [];

  // Precompute the indices of all '0's to jump efficiently
  for (let i = 0; i < n; i++) {
    if (s[i] === "0") {
      zeroIndices.push(i);
    }
  }

  let ans = 0;
  let zeroPtr = 0; // Pointer to the index in zeroIndices

  for (let i = 0; i < n; i++) {
    // Advance zeroPtr to the first zero occurring at or after index i
    while (zeroPtr < zeroIndices.length && zeroIndices[zeroPtr] < i) {
      zeroPtr++;
    }

    // 1. Handle substrings with exactly 0 zeros (k=0)
    // The substring starts at i and can extend up to the character before the next zero.
    // Condition: ones >= 0^2 => ones >= 0 (Always true).
    // The first zero after i is at zeroIndices[zeroPtr].
    const nextZeroIndex =
      zeroPtr < zeroIndices.length ? zeroIndices[zeroPtr] : n;
    ans += nextZeroIndex - i;

    // 2. Handle substrings with k >= 1 zeros
    // We iterate through the zeros array starting from the current relevant zero
    for (let p = zeroPtr; p < zeroIndices.length; p++) {
      const k = p - zeroPtr + 1; // Number of zeros in the current range

      // Optimization: Since total length <= n, we must have k^2 <= n - k.
      // If k^2 + k > n, no substring of length <= n can satisfy the condition.
      if (k * k + k > n) {
        break;
      }

      // Current zero is the k-th zero relative to i.
      // The range of valid end indices j for having exactly k zeros is:
      // [index of k-th zero, index of (k+1)-th zero - 1]
      const currZeroIdx = zeroIndices[p];
      const nextLimit = p + 1 < zeroIndices.length ? zeroIndices[p + 1] : n;

      // We need to satisfy: ones >= k^2
      // Length = ones + k
      // Length - k >= k^2  =>  Length >= k^2 + k
      // (j - i + 1) >= k^2 + k
      // j >= i + k^2 + k - 1
      const minJ = i + k * k + k - 1;

      // Valid j must be at least minJ AND must be inside the specific zero segment
      // The segment must include the k-th zero (start >= currZeroIdx)
      const actualMinJ = Math.max(minJ, currZeroIdx);
      const actualMaxJ = nextLimit - 1;

      if (actualMaxJ >= actualMinJ) {
        ans += actualMaxJ - actualMinJ + 1;
      }
    }
  }

  return ans;
};

console.log(numberOfSubstrings(s));
