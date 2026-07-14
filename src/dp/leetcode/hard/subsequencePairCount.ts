// 3336. Find the Number of Subsequences With Equal GCD

/**
Example 1:

Input: nums = [1,2,3,4]

Output: 10

Explanation:

The subsequence pairs which have the GCD of their elements equal to 1 are:

([1, 2, 3, 4], [1, 2, 3, 4])
([1, 2, 3, 4], [1, 2, 3, 4])
([1, 2, 3, 4], [1, 2, 3, 4])
([1, 2, 3, 4], [1, 2, 3, 4])
([1, 2, 3, 4], [1, 2, 3, 4])
([1, 2, 3, 4], [1, 2, 3, 4])
([1, 2, 3, 4], [1, 2, 3, 4])
([1, 2, 3, 4], [1, 2, 3, 4])
([1, 2, 3, 4], [1, 2, 3, 4])
([1, 2, 3, 4], [1, 2, 3, 4])
Example 2:

Input: nums = [10,20,30]

Output: 2

Explanation:

The subsequence pairs which have the GCD of their elements equal to 10 are:

([10, 20, 30], [10, 20, 30])
([10, 20, 30], [10, 20, 30])
Example 3:

Input: nums = [1,1,1,1]

Output: 50
*/

function subsequencePairCount(nums: number[]): number {
  const MOD = 1_000_000_007;
  const maxNum = Math.max(...nums);
  const LIMIT = maxNum + 1;
  const stateSize = LIMIT * LIMIT;

  // Iterative helper to calculate the greatest common divisor
  function gcd(a: number, b: number): number {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  // dp[state] stores the number of ways to reach state (g1, g2)
  let dp = new Int32Array(stateSize);
  let nextDp = new Int32Array(stateSize);
  dp[0] = 1; // Base case: both subsequences empty (0, 0)

  // Tracks states with non-zero counts to avoid iterating over all empty states
  let activeStates: number[] = [0];
  const visited = new Int32Array(stateSize);
  let visitId = 0;

  for (const num of nums) {
    visitId++;
    const nextActiveStates: number[] = [];
    nextDp.fill(0);

    for (const state of activeStates) {
      const cnt = dp[state];
      if (cnt === 0) continue;

      const g1 = (state / LIMIT) | 0;
      const g2 = state % LIMIT;

      // 1. Skip num: status remains (g1, g2)
      if (visited[state] !== visitId) {
        visited[state] = visitId;
        nextActiveStates.push(state);
      }
      nextDp[state] = (nextDp[state] + cnt) % MOD;

      // 2. Add num to seq1
      const ng1 = g1 === 0 ? num : gcd(g1, num);
      const state1 = ng1 * LIMIT + g2;
      if (visited[state1] !== visitId) {
        visited[state1] = visitId;
        nextActiveStates.push(state1);
      }
      nextDp[state1] = (nextDp[state1] + cnt) % MOD;

      // 3. Add num to seq2
      const ng2 = g2 === 0 ? num : gcd(g2, num);
      const state2 = g1 * LIMIT + ng2;
      if (visited[state2] !== visitId) {
        visited[state2] = visitId;
        nextActiveStates.push(state2);
      }
      nextDp[state2] = (nextDp[state2] + cnt) % MOD;
    }

    // Swap the buffers for the next iteration
    const temp = dp;
    dp = nextDp;
    nextDp = temp;

    activeStates = nextActiveStates;
  }

  // Accumulate the answers where g1 == g2 and g1 > 0 (non-empty)
  let ans = 0;
  for (let g = 1; g < LIMIT; g++) {
    ans = (ans + dp[g * LIMIT + g]) % MOD;
  }

  return ans;
}

// Example usage:
const nums1 = [1, 2, 3, 4];
console.log(subsequencePairCount(nums1)); // Output: 10

const nums2 = [10, 20, 30];
console.log(subsequencePairCount(nums2)); // Output: 2

const nums3 = [1, 1, 1, 1];
console.log(subsequencePairCount(nums3)); // Output: 50
