// 3129. Find All Possible Stable Binary Arrays I

/**
Example 1:

Input: zero = 1, one = 1, limit = 2

Output: 2

Explanation:

The two possible stable binary arrays are [1,0] and [0,1], as both arrays have a single 0 and a single 1, and no subarray has a length greater than 2.

Example 2:

Input: zero = 1, one = 2, limit = 1

Output: 1

Explanation:

The only possible stable binary array is [1,0,1].

Note that the binary arrays [1,1,0] and [0,1,1] have subarrays of length 2 with identical elements, hence, they are not stable.

Example 3:

Input: zero = 3, one = 3, limit = 2

Output: 14

Explanation:

All the possible stable binary arrays are [0,0,1,0,1,1], [0,0,1,1,0,1], [0,1,0,0,1,1], [0,1,0,1,0,1], [0,1,0,1,1,0], [0,1,1,0,0,1], [0,1,1,0,1,0], [1,0,0,1,0,1], [1,0,0,1,1,0], [1,0,1,0,0,1], [1,0,1,0,1,0], [1,0,1,1,0,0], [1,1,0,0,1,0], and [1,1,0,1,0,0].
*/

const zero = 1,
  one = 1,
  limit = 2;

const numberOfStableArrays = function (
  zero: number,
  one: number,
  limit: number,
): number {
  const MOD = 1000000007;

  // dp0[i][j] represents the number of valid arrays with i zeros and j ones ending in 0
  // dp1[i][j] represents the number of valid arrays with i zeros and j ones ending in 1
  const dp0 = Array.from({ length: zero + 1 }, () => new Int32Array(one + 1));
  const dp1 = Array.from({ length: zero + 1 }, () => new Int32Array(one + 1));

  // Base Cases: Arrays consisting entirely of 0s or entirely of 1s up to the limit
  for (let i = 1; i <= Math.min(zero, limit); i++) {
    dp0[i][0] = 1;
  }
  for (let j = 1; j <= Math.min(one, limit); j++) {
    dp1[0][j] = 1;
  }

  // Fill DP tables
  for (let i = 1; i <= zero; i++) {
    for (let j = 1; j <= one; j++) {
      // Calculate dp0[i][j]
      let val0 = (dp0[i - 1][j] + dp1[i - 1][j]) % MOD;
      // Subtract invalid sequences that exceed the limit block threshold of consecutive 0s
      if (i - 1 >= limit) {
        val0 = (val0 - dp1[i - 1 - limit][j] + MOD) % MOD;
      }
      dp0[i][j] = val0;

      // Calculate dp1[i][j]
      let val1 = (dp0[i][j - 1] + dp1[i][j - 1]) % MOD;
      // Subtract invalid sequences that exceed the limit block threshold of consecutive 1s
      if (j - 1 >= limit) {
        val1 = (val1 - dp0[i][j - 1 - limit] + MOD) % MOD;
      }
      dp1[i][j] = val1;
    }
  }

  // The answer incorporates both outcomes safely wrapping around our configured modulo
  return (dp0[zero][one] + dp1[zero][one]) % MOD;
};

console.log(numberOfStableArrays(zero, one, limit));
