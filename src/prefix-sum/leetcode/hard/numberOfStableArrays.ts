// 3130. Find All Possible Stable Binary Arrays II

/**
Example 1:

Input: zero = 1, one = 1, limit = 2

Output: 2

Explanation:

The two possible stable binary arrays are [1,0] and [0,1].

Example 2:

Input: zero = 1, one = 2, limit = 1

Output: 1

Explanation:

The only possible stable binary array is [1,0,1].

Example 3:

Input: zero = 3, one = 3, limit = 2

Output: 14

Explanation:

All the possible stable binary arrays are [0,0,1,0,1,1], [0,0,1,1,0,1], [0,1,0,0,1,1], [0,1,0,1,0,1], [0,1,0,1,1,0], [0,1,1,0,0,1], [0,1,1,0,1,0], [1,0,0,1,0,1], [1,0,0,1,1,0], [1,0,1,0,0,1], [1,0,1,0,1,0], [1,0,1,1,0,0], [1,1,0,0,1,0], and [1,1,0,1,0,0].
*/

const zero = 3,
  one = 3,
  limit = 2;

const numberOfStableArrays = function (
  zero: number,
  one: number,
  limit: number,
): number {
  const MOD = 1000000007;
  const cols = one + 1;

  // Flattened 2D arrays to utilize highly efficient contiguous memory blocks
  const dp0 = new Int32Array((zero + 1) * cols);
  const dp1 = new Int32Array((zero + 1) * cols);

  // Initialize Base Cases
  const minZero = Math.min(zero, limit);
  for (let i = 1; i <= minZero; i++) {
    dp0[i * cols + 0] = 1;
  }

  const minOne = Math.min(one, limit);
  for (let j = 1; j <= minOne; j++) {
    dp1[0 * cols + j] = 1;
  }

  // Process valid arrangements dynamically
  for (let i = 1; i <= zero; i++) {
    for (let j = 1; j <= one; j++) {
      const idx = i * cols + j;

      // Computations for dp0
      let val0 = dp0[(i - 1) * cols + j] + dp1[(i - 1) * cols + j];
      if (val0 >= MOD) val0 -= MOD;

      if (i > limit) {
        val0 -= dp1[(i - limit - 1) * cols + j];
        if (val0 < 0) val0 += MOD;
      }
      dp0[idx] = val0;

      // Computations for dp1
      let val1 = dp0[i * cols + j - 1] + dp1[i * cols + j - 1];
      if (val1 >= MOD) val1 -= MOD;

      if (j > limit) {
        val1 -= dp0[i * cols + j - limit - 1];
        if (val1 < 0) val1 += MOD;
      }
      dp1[idx] = val1;
    }
  }

  // Result summation combining both sets of endings
  let ans = dp0[zero * cols + one] + dp1[zero * cols + one];
  if (ans >= MOD) ans -= MOD;

  return ans;
};

console.log(numberOfStableArrays(zero, one, limit));
