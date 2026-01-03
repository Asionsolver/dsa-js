// 1411. Number of Ways to Paint N × 3 Grid

/**
Example 1:


Input: n = 1
Output: 12
Explanation: There are 12 possible way to paint the grid as shown.
Example 2:

Input: n = 5000
Output: 30228214
*/
const n = 1;

const numOfWays = function (n: number) {
  const MOD = 1_000_000_007;

  // Base case for n = 1
  // Number of ways to paint a row with 3 distinct colors (e.g., R Y G)
  let typeABC = 6;

  // Number of ways to paint a row with 2 distinct colors (e.g., R Y R)
  let typeABA = 6;

  for (let i = 2; i <= n; i++) {
    // Calculate the number of ways for the current row based on the previous row
    const nextABC = (2 * typeABC + 2 * typeABA) % MOD;
    const nextABA = (2 * typeABC + 3 * typeABA) % MOD;

    // Update the counts for the next iteration
    typeABC = nextABC;
    typeABA = nextABA;
  }

  // The result is the sum of both types of patterns for the nth row
  return (typeABC + typeABA) % MOD;
};

console.log(numOfWays(n));
