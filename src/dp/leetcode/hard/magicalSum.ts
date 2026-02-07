// 3539. Find Sum of Array Product of Magical Sequences

/** 
Example 1:

Input: m = 5, k = 5, nums = [1,10,100,10000,1000000]

Output: 991600007

Explanation:

All permutations of [0, 1, 2, 3, 4] are magical sequences, each with an array product of 1013.

Example 2:

Input: m = 2, k = 2, nums = [5,4,3,2,1]

Output: 170

Explanation:

The magical sequences are [0, 1], [0, 2], [0, 3], [0, 4], [1, 0], [1, 2], [1, 3], [1, 4], [2, 0], [2, 1], [2, 3], [2, 4], [3, 0], [3, 1], [3, 2], [3, 4], [4, 0], [4, 1], [4, 2], and [4, 3].

Example 3:

Input: m = 1, k = 1, nums = [28]

Output: 28

Explanation:

The only magical sequence is [0].
*/

const m = 5,
  k = 5,
  nums = [1, 10, 100, 10000, 1000000];

const solve = function (m: number, k: number, nums: number[]): number {
  const MOD = 1_000_000_007n;
  const n = nums.length;

  // Precompute factorials and inverse factorials for the multinomial coefficient parts
  const fact = new BigInt64Array(m + 1);
  const invFact = new BigInt64Array(m + 1);
  fact[0] = 1n;
  invFact[0] = 1n;

  for (let i = 1; i <= m; i++) {
    fact[i] = (fact[i - 1] * BigInt(i)) % MOD;
  }

  // Modular Exponentiation
  const modPow = (base: bigint, exp: bigint): bigint => {
    let res = 1n;
    while (exp > 0n) {
      if (exp & 1n) res = (res * base) % MOD;
      base = (base * base) % MOD;
      exp >>= 1n;
    }
    return res;
  };

  // Compute modular inverse of m! then work backwards
  invFact[m] = modPow(fact[m], MOD - 2n);
  for (let i = m - 1; i >= 1; i--) {
    invFact[i] = (invFact[i + 1] * BigInt(i + 1)) % MOD;
  }

  // Precompute powers of nums[i]
  // powers[i * (m + 1) + c] stores (nums[i] ^ c) % MOD
  const powers = new BigInt64Array(n * (m + 1));
  for (let i = 0; i < n; i++) {
    let p = 1n;
    const base = BigInt(nums[i]);
    powers[i * (m + 1)] = 1n;
    for (let j = 1; j <= m; j++) {
      p = (p * base) % MOD;
      powers[i * (m + 1) + j] = p;
    }
  }

  // DP Initialization
  // Dimensions: carry [0..m], bits [0..k], used [0..m]
  const dimC = m + 1;
  const dimB = k + 1;
  const dimU = m + 1;
  const size = dimC * dimB * dimU;

  let dp = new BigInt64Array(size);
  let nextDp = new BigInt64Array(size);

  // Base case: carry=0, bits=0, used=0 -> value=1
  dp[0] = 1n;

  for (let i = 0; i < n; i++) {
    // Reset next state buffer
    nextDp.fill(0n);
    const offsetPower = i * (m + 1);

    // Iterate through all valid states
    for (let c = 0; c <= m; c++) {
      for (let b = 0; b <= k; b++) {
        for (let u = 0; u <= m; u++) {
          const idx = (c * dimB + b) * dimU + u;
          const val = dp[idx];

          if (val === 0n) continue;

          // Try taking `cnt` copies of the current number nums[i]
          // We can take at most `m - u` items
          const maxCnt = m - u;

          for (let cnt = 0; cnt <= maxCnt; cnt++) {
            // Calculate next state parameters
            const sumVal = c + cnt;
            const bit = sumVal & 1; // Current bit of the sum
            const nextC = sumVal >> 1; // Carry to next position

            // Pruning: if carry exceeds m (unlikely with this logic but safe bound)
            // or bits exceed k, this path is invalid.
            if (nextC > m) continue;
            const nextB = b + bit;
            if (nextB > k) continue;

            // Contribution: val * (nums[i]^cnt / cnt!)
            const factor = (powers[offsetPower + cnt] * invFact[cnt]) % MOD;
            const term = (val * factor) % MOD;

            const nextU = u + cnt;
            const nextIdx = (nextC * dimB + nextB) * dimU + nextU;

            let res = nextDp[nextIdx] + term;
            if (res >= MOD) res -= MOD;
            nextDp[nextIdx] = res;
          }
        }
      }
    }
    // Swap buffers for next iteration
    let temp = dp;
    dp = nextDp;
    nextDp = temp;
  }

  let ans = 0n;

  // Final processing: resolve remaining carries
  for (let c = 0; c <= m; c++) {
    for (let b = 0; b <= k; b++) {
      // We must have used exactly m items
      const u = m;
      const idx = (c * dimB + b) * dimU + u;
      const val = dp[idx];

      if (val === 0n) continue;

      // Calculate population count of the remaining carry
      let pcount = 0;
      let tempC = c;
      while (tempC > 0) {
        if (tempC & 1) pcount++;
        tempC >>= 1;
      }

      // Check if total bits equal k
      if (b + pcount === k) {
        ans += val;
        if (ans >= MOD) ans -= MOD;
      }
    }
  }

  // Multiply by m! to account for permutations
  ans = (ans * fact[m]) % MOD;

  return Number(ans);
};

console.log(solve(m, k, nums));
