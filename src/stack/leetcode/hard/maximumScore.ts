// 2818. Apply Operations to Maximize Score

/**
Example 1:

Input: nums = [8,3,9,3,8], k = 2
Output: 81
Explanation: To get a score of 81, we can apply the following operations:
- Choose subarray nums[2, ..., 2]. nums[2] is the only element in this subarray. Hence, we multiply the score by nums[2]. The score becomes 1 * 9 = 9.
- Choose subarray nums[2, ..., 3]. Both nums[2] and nums[3] have a prime score of 1, but nums[2] has the smaller index. Hence, we multiply the score by nums[2]. The score becomes 9 * 9 = 81.
It can be proven that 81 is the highest score one can obtain.
Example 2:

Input: nums = [19,12,14,6,10,18], k = 3
Output: 4788
Explanation: To get a score of 4788, we can apply the following operations: 
- Choose subarray nums[0, ..., 0]. nums[0] is the only element in this subarray. Hence, we multiply the score by nums[0]. The score becomes 1 * 19 = 19.
- Choose subarray nums[5, ..., 5]. nums[5] is the only element in this subarray. Hence, we multiply the score by nums[5]. The score becomes 19 * 18 = 342.
- Choose subarray nums[2, ..., 3]. Both nums[2] and nums[3] have a prime score of 2, but nums[2] has the smaller index. Hence, we multipy the score by nums[2]. The score becomes 342 * 14 = 4788.
It can be proven that 4788 is the highest score one can obtain.
*/

const nums = [8, 3, 9, 3, 8],
  k = 2;

const maximumScore = function (nums: number[], k: number): number {
  const MOD = 1000000007n;
  const n = nums.length;
  const MAX_VAL = 100005;

  // 1. Precompute Prime Scores (number of distinct prime factors)
  // We use a sieve approach to populate counts for all numbers up to MAX_VAL
  const primeScores = new Int32Array(MAX_VAL);
  for (let i = 2; i < MAX_VAL; i++) {
    if (primeScores[i] === 0) {
      // i is prime
      for (let j = i; j < MAX_VAL; j += i) {
        primeScores[j]++;
      }
    }
  }

  const scores = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    scores[i] = primeScores[nums[i]];
  }

  // 2. Monotonic Stacks to find range boundaries
  const prev = new Int32Array(n);
  const next = new Int32Array(n);
  const stack: number[] = [];

  // Find nearest index to the left with score >= current
  for (let i = 0; i < n; i++) {
    // We want strict inequality for elements to the left to be dominated by current i.
    // If stack top has score >= current, it blocks current extending left.
    while (stack.length > 0 && scores[stack[stack.length - 1]] < scores[i]) {
      stack.pop();
    }
    prev[i] = stack.length > 0 ? stack[stack.length - 1] : -1;
    stack.push(i);
  }

  stack.length = 0;

  // Find nearest index to the right with score > current
  for (let i = n - 1; i >= 0; i--) {
    // We allow equal scores to the right (current i wins ties), so we only stop at score > current.
    while (stack.length > 0 && scores[stack[stack.length - 1]] <= scores[i]) {
      stack.pop();
    }
    next[i] = stack.length > 0 ? stack[stack.length - 1] : n;
    stack.push(i);
  }

  // 3. Sort indices by value descending to apply greedy strategy
  const indices = new Int32Array(n);
  for (let i = 0; i < n; i++) indices[i] = i;
  indices.sort((a, b) => nums[b] - nums[a]);

  // 4. Calculate result
  let ans = 1n;
  let kBig = BigInt(k);

  // Modular Exponentiation Helper
  const modPow = (base: bigint, exp: bigint): bigint => {
    let res = 1n;
    base %= MOD;
    while (exp > 0n) {
      if (exp % 2n === 1n) res = (res * base) % MOD;
      base = (base * base) % MOD;
      exp /= 2n;
    }
    return res;
  };

  for (let i = 0; i < n; i++) {
    if (kBig === 0n) break;

    const idx = indices[i];
    const val = nums[idx];

    // Optimization: Multiplying by 1 doesn't increase score.
    // Since we process in descending order, if we hit 1, we are done.
    if (val === 1) break;

    const leftLen = BigInt(idx - prev[idx]);
    const rightLen = BigInt(next[idx] - idx);
    const totalOps = leftLen * rightLen;

    const take = totalOps < kBig ? totalOps : kBig;

    ans = (ans * modPow(BigInt(val), take)) % MOD;
    kBig -= take;
  }

  return Number(ans);
};

console.log(maximumScore(nums, k));
