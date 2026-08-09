// 1140. Stone Game II

/**
Example 1:

Input: piles = [2,7,9,4,4]

Output: 10

Explanation:

If Alice takes one pile at the beginning, Bob takes two piles, then Alice takes 2 piles again. Alice can get 2 + 4 + 4 = 10 stones in total.
If Alice takes two piles at the beginning, then Bob can take all three piles left. In this case, Alice get 2 + 7 = 9 stones in total.
So we return 10 since it's larger.

Example 2:

Input: piles = [1,2,3,4,5,100]

Output: 104

 
*/

function stoneGameII(piles: number[]): number {
  const n = piles.length;

  // suffixSum[i] stores the sum of stones from piles[i] to piles[n-1]
  const suffixSum = new Array(n + 1).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    suffixSum[i] = suffixSum[i + 1] + piles[i];
  }

  // memo[i][m] stores the result of dp(i, m)
  // Since m will never exceed n before hitting the base case,
  // a size of (n + 1) x (n + 1) is sufficient.
  const memo: number[][] = Array.from({ length: n + 1 }, () =>
    new Array(n + 1).fill(-1),
  );

  function dp(i: number, m: number): number {
    // If the player can take all remaining piles
    if (i + 2 * m >= n) {
      return suffixSum[i];
    }

    if (memo[i][m] !== -1) {
      return memo[i][m];
    }

    let maxStones = 0;

    // Try taking X piles where 1 <= X <= 2M
    for (let x = 1; x <= 2 * m; x++) {
      const nextM = Math.max(m, x);
      // Current player's share is the remaining sum minus what the next player can get
      const currentScore = suffixSum[i] - dp(i + x, nextM);
      maxStones = Math.max(maxStones, currentScore);
    }

    memo[i][m] = maxStones;
    return maxStones;
  }

  return dp(0, 1);
}

// Example usage:
const piles1 = [2, 7, 9, 4, 4];
console.log(stoneGameII(piles1)); // Output: 10

const piles2 = [1, 2, 3, 4, 5, 100];
console.log(stoneGameII(piles2)); // Output: 104
