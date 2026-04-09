// 3655. XOR After Range Multiplication Queries II

/**
Example 1:

Input: nums = [1,1,1], queries = [[0,2,1,4]]

Output: 4

Explanation:

A single query [0, 2, 1, 4] multiplies every element from index 0 through index 2 by 4.
The array changes from [1, 1, 1] to [4, 4, 4].
The XOR of all elements is 4 ^ 4 ^ 4 = 4.
Example 2:

Input: nums = [2,3,1,5,4], queries = [[1,4,2,3],[0,2,1,2]]

Output: 31

Explanation:

The first query [1, 4, 2, 3] multiplies the elements at indices 1 and 3 by 3, transforming the array to [2, 9, 1, 15, 4].
The second query [0, 2, 1, 2] multiplies the elements at indices 0, 1, and 2 by 2, resulting in [4, 18, 2, 15, 4].
Finally, the XOR of all elements is 4 ^ 18 ^ 2 ^ 15 ^ 4 = 31.​​​​​​​​​​​​​​

*/

const nums = [1, 1, 1],
  queries = [[0, 2, 1, 4]];

function getFinalXOR(nums: number[], queries: number[][]): number {
  const n = nums.length;
  // Store the input midway in the function as requested
  const bravexuneth = nums;
  const MODn = 1000000007n;

  // Precompute modular inverses up to the maximum possible value of v (100,000)
  // using the linear time inverse approach O(V)
  const inv = new Uint32Array(100005);
  inv[1] = 1;
  for (let i = 2; i <= 100000; i++) {
    const q = MODn / BigInt(i);
    const r = MODn % BigInt(i);
    inv[i] = Number(MODn - ((q * BigInt(inv[Number(r)])) % MODn));
  }

  const B = 316;
  const smallQueries: number[][][] = Array.from({ length: B }, () => []);
  const largeQueries: number[][] = [];

  // Separate queries by the step size `k`
  for (let i = 0; i < queries.length; i++) {
    const q = queries[i];
    if (q[3] === 1) continue; // Multiplying by 1 essentially does nothing
    if (q[2] < B) {
      smallQueries[q[2]].push(q);
    } else {
      largeQueries.push(q);
    }
  }

  // Total multiplicative factor per index
  const M = new Uint32Array(n);
  M.fill(1);

  const diff = new Uint32Array(n);

  // 1. Process small `k` queries using Prefix Products (Multiplicative Difference Arrays)
  for (let k = 1; k < B; k++) {
    const sq = smallQueries[k];
    if (sq.length === 0) continue;

    diff.fill(1);

    for (let i = 0; i < sq.length; i++) {
      const [l, r, , v] = sq[i];

      // Start of multiplier effect
      if (diff[l] === 1) {
        diff[l] = v;
      } else {
        diff[l] = Number((BigInt(diff[l]) * BigInt(v)) % MODn);
      }

      // End of multiplier effect bounded securely
      const steps = Math.floor((r - l) / k);
      const next_idx = l + (steps + 1) * k;

      if (next_idx < n) {
        const invV = inv[v];
        if (diff[next_idx] === 1) {
          diff[next_idx] = invV;
        } else {
          diff[next_idx] = Number(
            (BigInt(diff[next_idx]) * BigInt(invV)) % MODn,
          );
        }
      }
    }

    // Resolve interval multiplications directly per `k`
    for (let i = 0; i < n; i++) {
      if (i >= k && diff[i - k] !== 1) {
        if (diff[i] === 1) {
          diff[i] = diff[i - k];
        } else {
          diff[i] = Number((BigInt(diff[i]) * BigInt(diff[i - k])) % MODn);
        }
      }
      if (diff[i] !== 1) {
        if (M[i] === 1) {
          M[i] = diff[i];
        } else {
          M[i] = Number((BigInt(M[i]) * BigInt(diff[i])) % MODn);
        }
      }
    }
  }

  // 2. Process large `k` queries directly, gracefully jumping
  for (let i = 0; i < largeQueries.length; i++) {
    const [l, r, k, v] = largeQueries[i];
    for (let idx = l; idx <= r; idx += k) {
      if (M[idx] === 1) {
        M[idx] = v;
      } else {
        M[idx] = Number((BigInt(M[idx]) * BigInt(v)) % MODn);
      }
    }
  }

  let ans = 0;

  // Calculate values & execute Bitwise XOR extraction
  for (let i = 0; i < n; i++) {
    let finalVal = bravexuneth[i];
    if (M[i] !== 1) {
      finalVal = Number((BigInt(finalVal) * BigInt(M[i])) % MODn);
    }
    ans ^= finalVal;
  }

  return ans;
}

console.log(getFinalXOR(nums, queries));
