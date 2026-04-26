// 2320. Count Number of Ways to Place Houses

/**
Example 1:

Input: n = 1
Output: 4
Explanation: 
Possible arrangements:
1. All plots are empty.
2. A house is placed on one side of the street.
3. A house is placed on the other side of the street.
4. Two houses are placed, one on each side of the street.
Example 2:


Input: n = 2
Output: 9
Explanation: The 9 possible arrangements are shown in the diagram above.
*/

function countHousePlacements(n: number): number {
  const MOD = 1000000007;

  // Base cases for n = 1 plot
  let empty = 1;
  let house = 1;

  // Calculate ways for one side of the street
  for (let i = 2; i <= n; i++) {
    const nextEmpty = (empty + house) % MOD;
    const nextHouse = empty;

    empty = nextEmpty;
    house = nextHouse;
  }

  // Total ways to place houses on one side
  const total = (empty + house) % MOD;

  // Total ways for both sides is total * total.
  // We use BigInt here because total * total can exceed 2^53 - 1 (Max Safe Integer for floats).
  const totalWays = (BigInt(total) * BigInt(total)) % BigInt(MOD);

  return Number(totalWays);
}

// Test cases
console.log(countHousePlacements(1)); // Output: 4
console.log(countHousePlacements(2)); // Output: 9
console.log(countHousePlacements(3)); // Output: 25
console.log(countHousePlacements(4)); // Output: 64
console.log(countHousePlacements(5)); // Output: 169
