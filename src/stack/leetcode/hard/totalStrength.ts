// 2281. Sum of Total Strength of Wizards

/**
Example 1:

Input: strength = [1,3,1,2]
Output: 44
Explanation: The following are all the contiguous groups of wizards:
- [1] from [1,3,1,2] has a total strength of min([1]) * sum([1]) = 1 * 1 = 1
- [3] from [1,3,1,2] has a total strength of min([3]) * sum([3]) = 3 * 3 = 9
- [1] from [1,3,1,2] has a total strength of min([1]) * sum([1]) = 1 * 1 = 1
- [2] from [1,3,1,2] has a total strength of min([2]) * sum([2]) = 2 * 2 = 4
- [1,3] from [1,3,1,2] has a total strength of min([1,3]) * sum([1,3]) = 1 * 4 = 4
- [3,1] from [1,3,1,2] has a total strength of min([3,1]) * sum([3,1]) = 1 * 4 = 4
- [1,2] from [1,3,1,2] has a total strength of min([1,2]) * sum([1,2]) = 1 * 3 = 3
- [1,3,1] from [1,3,1,2] has a total strength of min([1,3,1]) * sum([1,3,1]) = 1 * 5 = 5
- [3,1,2] from [1,3,1,2] has a total strength of min([3,1,2]) * sum([3,1,2]) = 1 * 6 = 6
- [1,3,1,2] from [1,3,1,2] has a total strength of min([1,3,1,2]) * sum([1,3,1,2]) = 1 * 7 = 7
The sum of all the total strengths is 1 + 9 + 1 + 4 + 4 + 4 + 3 + 5 + 6 + 7 = 44.
Example 2:

Input: strength = [5,4,6]
Output: 213
Explanation: The following are all the contiguous groups of wizards: 
- [5] from [5,4,6] has a total strength of min([5]) * sum([5]) = 5 * 5 = 25
- [4] from [5,4,6] has a total strength of min([4]) * sum([4]) = 4 * 4 = 16
- [6] from [5,4,6] has a total strength of min([6]) * sum([6]) = 6 * 6 = 36
- [5,4] from [5,4,6] has a total strength of min([5,4]) * sum([5,4]) = 4 * 9 = 36
- [4,6] from [5,4,6] has a total strength of min([4,6]) * sum([4,6]) = 4 * 10 = 40
- [5,4,6] from [5,4,6] has a total strength of min([5,4,6]) * sum([5,4,6]) = 4 * 15 = 60
The sum of all the total strengths is 25 + 16 + 36 + 36 + 40 + 60 = 213.
*/

const strength = [5, 4, 6];

const totalStrength = function (strength: number[]): number {
  const MOD = 1000000007n;
  const n = strength.length;

  // 1. Calculate Prefix Sums (pSum) and Prefix of Prefix Sums (ppSum)
  // We use BigInt to prevent overflow and handle modulo arithmetic cleanly.

  // pSum[i] = sum(strength[0]...strength[i-1])
  const pSum = new BigInt64Array(n + 1);
  for (let i = 0; i < n; i++) {
    pSum[i + 1] = (pSum[i] + BigInt(strength[i])) % MOD;
  }

  // ppSum[i] = sum(pSum[0]...pSum[i-1])
  const ppSum = new BigInt64Array(n + 2);
  for (let i = 0; i <= n; i++) {
    ppSum[i + 1] = (ppSum[i] + pSum[i]) % MOD;
  }

  // 2. Determine bounds (L, R) where strength[i] is the minimum
  // left[i] = index of the first element to the LEFT strictly smaller than strength[i]
  // right[i] = index of the first element to the RIGHT smaller or equal to strength[i]

  const left = new Int32Array(n).fill(-1);
  const right = new Int32Array(n).fill(n);
  const stack: number[] = [];

  // Monotonic Stack for Previous Less Element (Strictly Smaller)
  for (let i = 0; i < n; i++) {
    while (
      stack.length > 0 &&
      strength[stack[stack.length - 1]] >= strength[i]
    ) {
      stack.pop();
    }
    if (stack.length > 0) {
      left[i] = stack[stack.length - 1];
    }
    stack.push(i);
  }

  stack.length = 0; // Clear stack for reuse

  // Monotonic Stack for Next Less Element (Smaller or Equal)
  for (let i = n - 1; i >= 0; i--) {
    while (
      stack.length > 0 &&
      strength[stack[stack.length - 1]] > strength[i]
    ) {
      stack.pop();
    }
    if (stack.length > 0) {
      right[i] = stack[stack.length - 1];
    }
    stack.push(i);
  }

  // 3. Calculate Total Strength
  let total = 0n;

  for (let i = 0; i < n; i++) {
    const l = left[i];
    const r = right[i];
    const val = BigInt(strength[i]);

    // countL: Number of valid start positions (j) in (l, i]
    const countL = BigInt(i - l);

    // countR: Number of valid end positions (k) in [i, r)
    const countR = BigInt(r - i);

    // Calculate sum of prefix sums for the RIGHT range [i+1, r]
    // This corresponds to term: countL * sum(P[k+1])
    const sumRight = (ppSum[r + 1] - ppSum[i + 1] + MOD) % MOD;
    const term1 = (sumRight * countL) % MOD;

    // Calculate sum of prefix sums for the LEFT range [l+1, i]
    // This corresponds to term: countR * sum(P[j])
    const sumLeft = (ppSum[i + 1] - ppSum[l + 1] + MOD) % MOD;
    const term2 = (sumLeft * countR) % MOD;

    // Final term logic: strength[i] * (term1 - term2)
    // Add MOD before modulo to handle negative results from subtraction
    const diff = (term1 - term2 + MOD) % MOD;
    const contribution = (val * diff) % MOD;

    total = (total + contribution) % MOD;
  }

  return Number(total);
};

console.log(totalStrength(strength));
