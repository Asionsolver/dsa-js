// 1888. Minimum Number of Flips to Make the Binary String Alternating

/**
Example 1:

Input: s = "111000"
Output: 2
Explanation: Use the first operation two times to make s = "100011".
Then, use the second operation on the third and sixth elements to make s = "101010".
Example 2:

Input: s = "010"
Output: 0
Explanation: The string is already alternating.
Example 3:

Input: s = "1110"
Output: 1
Explanation: Use the second operation on the second element to make s = "1010".
*/

const s = "111000";
const minFlips = function (s: string): number {
  const n = s.length;
  let diff1 = 0; // Tracks differences with "010101..."
  let diff2 = 0; // Tracks differences with "101010..."
  let minDiff = n;

  // We simulate s + s by iterating up to 2 * n.
  // i % n effectively wraps around, giving us the characters of the sliding window
  for (let i = 0; i < 2 * n; i++) {
    const c = s[i % n];

    // Expected character for target1 at index i
    const t1 = (i & 1) === 0 ? "0" : "1";

    // If the current character differs from target1, it must match target2
    // because we are strictly dealing with '0's and '1's.
    if (c !== t1) {
      diff1++;
    } else {
      diff2++;
    }

    // Once we've passed the first window size (i >= n), we need to start
    // removing the character that is left behind (sliding the window)
    if (i >= n) {
      const oldC = s[i - n];
      const oldT1 = ((i - n) & 1) === 0 ? "0" : "1";

      if (oldC !== oldT1) {
        diff1--;
      } else {
        diff2--;
      }
    }

    // Once our window size reaches n (i >= n - 1), we can start keeping
    // track of the minimum differences among the evaluated sequences
    if (i >= n - 1) {
      if (diff1 < minDiff) minDiff = diff1;
      if (diff2 < minDiff) minDiff = diff2;
    }
  }

  return minDiff;
};

console.log(minFlips(s));
