// 3753. Total Waviness of Numbers in Range II

/**

Example 1:

Input: num1 = 120, num2 = 130

Output: 3

Explanation:

In the range [120, 130]:

120: middle digit 2 is a peak, waviness = 1.
121: middle digit 2 is a peak, waviness = 1.
130: middle digit 3 is a peak, waviness = 1.
All other numbers in the range have a waviness of 0.
Thus, total waviness is 1 + 1 + 1 = 3.

Example 2:

Input: num1 = 198, num2 = 202

Output: 3

Explanation:

In the range [198, 202]:

198: middle digit 9 is a peak, waviness = 1.
201: middle digit 0 is a valley, waviness = 1.
202: middle digit 0 is a valley, waviness = 1.
All other numbers in the range have a waviness of 0.
Thus, total waviness is 1 + 1 + 1 = 3.

Example 3:

Input: num1 = 4848, num2 = 4848

Output: 2

Explanation:

Number 4848: the second digit 8 is a peak, and the third digit 4 is a valley, giving a waviness of 2.


*/

function totalWaviness(num1: number, num2: number): number {
  function calc(x: bigint): bigint {
    if (x < 100n) {
      return 0n; // Waviness requires at least 3 digits
    }

    const s = x.toString();
    const len = s.length;

    // Memoization array for state space: len * 11 * 11 * 2 * 2
    // Map: i in [0, len-1], prev in [-1, 9] -> [0, 10], prev2 in [-1, 9] -> [0, 10], zero/tight in [0, 1]
    const memo = new Array<[bigint, bigint] | null>(len * 484).fill(null);

    function solve(
      i: number,
      prev: number,
      prev2: number,
      zero: boolean,
      tight: boolean,
    ): [bigint, bigint] {
      if (i === len) {
        return [1n, 0n]; // Return [count = 1, waviness = 0]
      }

      const zIdx = zero ? 1 : 0;
      const tIdx = tight ? 1 : 0;
      const key =
        (((i * 11 + (prev + 1)) * 11 + (prev2 + 1)) * 2 + zIdx) * 2 + tIdx;

      if (memo[key] !== null) {
        return memo[key]!;
      }

      let cnt = 0n;
      let w = 0n;
      const mx = tight ? parseInt(s[i], 10) : 9;

      for (let d = 0; d <= mx; ++d) {
        const newTight = tight && d === parseInt(s[i], 10);
        const newZero = zero && d === 0;
        const newPrev2 = prev;
        const newPrev = !newZero ? d : -1;

        const [newCnt, nw] = solve(i + 1, newPrev, newPrev2, newZero, newTight);
        cnt += newCnt;

        // Evaluate whether the digit `prev` at index i-1 is a peak or a valley
        if (!zero && prev2 !== -1) {
          if ((prev2 < prev && prev > d) || (prev2 > prev && prev < d)) {
            w += newCnt;
          }
        }
        w += nw;
      }

      const res: [bigint, bigint] = [cnt, w];
      memo[key] = res;
      return res;
    }

    return solve(0, -1, -1, true, true)[1];
  }

  return Number(calc(BigInt(num2)) - calc(BigInt(num1) - 1n));
}

// Example usage:
console.log(totalWaviness(120, 130)); // Output: 3
console.log(totalWaviness(198, 202)); // Output: 3
console.log(totalWaviness(4848, 4848)); // Output: 2
