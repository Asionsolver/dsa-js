// 1545. Find Kth Bit in Nth Binary String

/**
Example 1:

Input: n = 3, k = 1
Output: "0"
Explanation: S3 is "0111001".
The 1st bit is "0".
Example 2:

Input: n = 4, k = 11
Output: "1"
Explanation: S4 is "011100110110001".
The 11th bit is "1".
*/

const n = 3,
  k = 1;
const findKthBit = function (n: number, k: number): string {
  // Base Case: S1 is "0"
  if (n === 1) {
    return "0";
  }

  // The length of Sn is 2^n - 1.
  // The middle index is (2^n) / 2 = 2^(n-1).
  // Note: bitwise shift (1 << x) is equivalent to 2^x.
  const midIndex = 1 << (n - 1);

  if (k === midIndex) {
    // The middle bit added at every step n > 1 is always "1"
    return "1";
  } else if (k < midIndex) {
    // The left part is exactly the same as Sn-1
    return findKthBit(n - 1, k);
  } else {
    // The right part is the reverse and inverse of Sn-1.
    // We find the corresponding bit in Sn-1 and invert it.
    // The corresponding index in the left part is: Length - k + 1
    // Length = (1 << n) - 1
    // Formula: ((1 << n) - 1) - k + 1  =>  (1 << n) - k
    const correspondingBit = findKthBit(n - 1, (1 << n) - k);
    return correspondingBit === "0" ? "1" : "0";
  }
};

console.log(findKthBit(n, k));
