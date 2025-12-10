// 3577. Count the Number of Computer Unlocking Permutations

/**
Example 1:

Input: complexity = [1,2,3]

Output: 2

Explanation:

The valid permutations are:

[0, 1, 2]
Unlock computer 0 first with root password.
Unlock computer 1 with password of computer 0 since complexity[0] < complexity[1].
Unlock computer 2 with password of computer 1 since complexity[1] < complexity[2].
[0, 2, 1]
Unlock computer 0 first with root password.
Unlock computer 2 with password of computer 0 since complexity[0] < complexity[2].
Unlock computer 1 with password of computer 0 since complexity[0] < complexity[1].
Example 2:

Input: complexity = [3,3,3,4,4,4]

Output: 0

Explanation:

There are no possible permutations which can unlock all computers.
*/

const complexity = [1, 2, 3];
const countPermutations = function (complexity: number[]) {
  const MOD = 1_000_000_007;
  const n = complexity.length;

  // The password for computer 0 is already decrypted and serves as the root.
  const rootComplexity = complexity[0];

  // Check reachability for all other computers.
  // For any computer i > 0 to be reachable from 0 (directly or indirectly),
  // its complexity must be strictly greater than complexity[0].
  // If complexity[i] <= complexity[0], no increasing complexity path exists from 0 to i.
  for (let i = 1; i < n; i++) {
    if (complexity[i] <= rootComplexity) {
      return 0;
    }
  }

  // If all complexity[i] > complexity[0] for i > 0, then computer 0 can serve
  // as the direct key for every other computer.
  // Since computer 0 is always unlocked first, the dependency for every other
  // computer is satisfied immediately.
  // Therefore, any relative order of the remaining n-1 computers is valid.
  // We calculate (n - 1)! % MOD.

  let result = 1;
  for (let i = 1; i < n; i++) {
    // We use floating point safety or BigInt if needed,
    // but typically (10^9 * 10^5) fits in JS standard Number (2^53 safe integer).
    // 10^14 < 9*10^15, so simple multiplication is safe.
    result = (result * i) % MOD;
  }

  return result;
};

console.log(countPermutations(complexity));
