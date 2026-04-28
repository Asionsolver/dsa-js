// 600. Non-negative Integers without Consecutive Ones

/**
Example 1:

Input: n = 5
Output: 5
Explanation:
Here are the non-negative integers <= 5 with their corresponding binary representations:
0 : 0
1 : 1
2 : 10
3 : 11
4 : 100
5 : 101
Among them, only integer 3 disobeys the rule (two consecutive ones) and the other 5 satisfy the rule. 
Example 2:

Input: n = 1
Output: 2
Example 3:

Input: n = 2
Output: 3
*/

function findIntegers(n: number): number {
  // Precompute Fibonacci values up to 32 to safely cover 10^9
  // (since 10^9 in binary uses at most 30 bits)
  const f: number[] = new Array(32).fill(0);
  f[0] = 1;
  f[1] = 2;
  for (let i = 2; i < 32; i++) {
    f[i] = f[i - 1] + f[i - 2];
  }

  const s: string = n.toString(2);
  let ans: number = 0;
  let prevBit: number = 0;
  const k: number = s.length;

  for (let i = 0; i < k; i++) {
    const bit = s[i];
    const power = k - 1 - i;

    if (bit === "1") {
      // Option 1: We place a '0' here, and everything trailing is freely varied (as long as it's valid)
      ans += f[power];

      // Option 2: We place a '1' here. Wait, are we triggering two consecutive '1's?
      if (prevBit === 1) {
        return ans;
      }
      prevBit = 1;
    } else {
      // We can only place a '0' here because placing a '1' would exceed our limit `n` limit cap
      prevBit = 0;
    }
  }

  // If we've successfully reached the end of the binary string, the number `n` itself is perfectly valid
  return ans + 1;
}

// Test cases
console.log(findIntegers(5)); // Output: 5
console.log(findIntegers(1)); // Output: 2
console.log(findIntegers(2)); // Output: 3
