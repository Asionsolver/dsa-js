// 1318. Minimum Flips to Make a OR b Equal to c

/**
Example 1:



Input: a = 2, b = 6, c = 5
Output: 3
Explanation: After flips a = 1 , b = 4 , c = 5 such that (a OR b == c)
Example 2:

Input: a = 4, b = 2, c = 7
Output: 1
Example 3:

Input: a = 1, b = 2, c = 3
Output: 0
*/

function minFlips(a: number, b: number, c: number): number {
  // (a | b) ^ c gives the bits that are different between (a | b) and c.
  // Each difference requires at least 1 flip.
  let diff = (a | b) ^ c;

  // a & b & ~c gives the bits where both a and b are 1, but c is 0.
  // These specific positions require an extra flip (both 1s need to be flipped to 0s).
  let extra = a & b & ~c;

  // Helper function to count the number of set bits (1s) in a number
  const countSetBits = (n: number): number => {
    let count = 0;
    while (n !== 0) {
      n &= n - 1; // Clears the lowest set bit
      count++;
    }
    return count;
  };

  // Total flips is the sum of the differing bits plus any extra flips required
  return countSetBits(diff) + countSetBits(extra);
}

// Example usage:
const a1 = 2,
  b1 = 6,
  c1 = 5;
console.log(minFlips(a1, b1, c1)); // Output: 3

const a2 = 4,
  b2 = 2,
  c2 = 7;
console.log(minFlips(a2, b2, c2)); // Output: 1

const a3 = 1,
  b3 = 2,
  c3 = 3;
console.log(minFlips(a3, b3, c3)); // Output: 0
