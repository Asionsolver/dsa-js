//3314. Construct the Minimum Bitwise Array I

/**
Example 1:

Input: nums = [2,3,5,7]

Output: [-1,1,4,3]

Explanation:

For i = 0, as there is no value for ans[0] that satisfies ans[0] OR (ans[0] + 1) = 2, so ans[0] = -1.
For i = 1, the smallest ans[1] that satisfies ans[1] OR (ans[1] + 1) = 3 is 1, because 1 OR (1 + 1) = 3.
For i = 2, the smallest ans[2] that satisfies ans[2] OR (ans[2] + 1) = 5 is 4, because 4 OR (4 + 1) = 5.
For i = 3, the smallest ans[3] that satisfies ans[3] OR (ans[3] + 1) = 7 is 3, because 3 OR (3 + 1) = 7.
Example 2:

Input: nums = [11,13,31]

Output: [9,12,15]

Explanation:

For i = 0, the smallest ans[0] that satisfies ans[0] OR (ans[0] + 1) = 11 is 9, because 9 OR (9 + 1) = 11.
For i = 1, the smallest ans[1] that satisfies ans[1] OR (ans[1] + 1) = 13 is 12, because 12 OR (12 + 1) = 13.
For i = 2, the smallest ans[2] that satisfies ans[2] OR (ans[2] + 1) = 31 is 15, because 15 OR (15 + 1) = 31.

*/

const nums = [2, 3, 5, 7];
function minBitwiseArray(nums: number[]): number[] {
  return nums.map((num) => {
    // Case 1: Prime number is 2.
    // Binary is '10', trailing ones count is 0. No solution exists.
    if (num === 2) {
      return -1;
    }

    // Case 2: Odd primes.
    // Find the mask of the lowest zero bit in num.
    // Example: num = 11 ('1011'). Lowest zero is at bit 2 (value 4).
    // ~num & (num + 1) isolates this bit.
    const lowestZeroMask = ~num & (num + 1);

    // We want to flip the bit immediately to the right of the lowest zero.
    // This corresponds to shifting the mask right by 1.
    // Example: lowestZeroMask is 4 ('100'). We subtract 2 ('010').
    // 11 - 2 = 9. 9 | 10 = 11.
    return num - (lowestZeroMask >> 1);
  });
}

console.log(minBitwiseArray(nums));
