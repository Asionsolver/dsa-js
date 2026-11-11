// 3789. Minimum Cost to Acquire Required Items

/**
You are given five integers cost1, cost2, costBoth, need1, and need2.

There are three types of items available:

An item of type 1 costs cost1 and contributes 1 unit to the type 1 requirement only.
An item of type 2 costs cost2 and contributes 1 unit to the type 2 requirement only.
An item of type 3 costs costBoth and contributes 1 unit to both type 1 and type 2 requirements.
You must collect enough items so that the total contribution toward type 1 is at least need1 and the total contribution toward type 2 is at least need2.

Return an integer representing the minimum possible total cost to achieve these requirements.
*/

/**
Example 1:

Input: cost1 = 3, cost2 = 2, costBoth = 1, need1 = 3, need2 = 2

Output: 3

Explanation:

After buying three type 3 items, which cost 3 * 1 = 3, the total contribution to type 1 is 3 (>= need1 = 3) and to type 2 is 3 (>= need2 = 2).
Any other valid combination would cost more, so the minimum total cost is 3.

Example 2:

Input: cost1 = 5, cost2 = 4, costBoth = 15, need1 = 2, need2 = 3

Output: 22

Explanation:

We buy need1 = 2 items of type 1 and need2 = 3 items of type 2: 2 * 5 + 3 * 4 = 10 + 12 = 22.
Any other valid combination would cost more, so the minimum total cost is 22.

Example 3:

Input: cost1 = 5, cost2 = 4, costBoth = 15, need1 = 0, need2 = 0

Output: 0

Explanation:

Since no items are required (need1 = need2 = 0), we buy nothing and pay 0.
*/

/**
Constraints:

1 <= cost1, cost2, costBoth <= 106
0 <= need1, need2 <= 109
*/

// Brute Force Approach: TLE
// function minimumCost(
//   cost1: number,
//   cost2: number,
//   costBoth: number,
//   need1: number,
//   need2: number,
// ): number {
//   const maxZ = Math.max(need1, need2);
//   let minTotalCost = Infinity;

//   // Check all possible values of z (number of type 3 items).
//   for (let z = 0; z <= maxZ; z++) {
//     const rem1 = Math.max(0, need1 - z);
//     const rem2 = Math.max(0, need2 - z);

//     // Calculate total cost for the current choice of z.
//     const currentCost = z * costBoth + rem1 * cost1 + rem2 * cost2;

//     if (currentCost < minTotalCost) {
//       minTotalCost = currentCost;
//     }
//   }

//   return minTotalCost;
// }

// Optimized Approach: Greedy + Math 
function minimumCost(cost1: number, cost2: number, costBoth: number, need1: number, need2: number): number {
    // Convert inputs to BigInt to prevent any integer overflow during intermediate multiplication.
    const c1 = BigInt(cost1);
    const c2 = BigInt(cost2);
    const cBoth = BigInt(costBoth);
    const n1 = BigInt(need1);
    const n2 = BigInt(need2);

    const minNeed = n1 < n2 ? n1 : n2;
    const maxNeed = n1 > n2 ? n1 : n2;

    // Option 1: Buy only individual items without any combo items (z = 0).
    const option1 = n1 * c1 + n2 * c2;

    // Option 2: Use combo items for the common overlapping demand, then buy remaining items individually.
    const option2 = minNeed * cBoth + (n1 - minNeed) * c1 + (n2 - minNeed) * c2;

    // Option 3: Fulfill all requirements using combo items entirely (z = max(need1, need2)).
    const option3 = maxNeed * cBoth;

    // Find the minimum cost among the three valid candidate strategies.
    let minCost = option1;
    if (option2 < minCost) {
        minCost = option2;
    }
    if (option3 < minCost) {
        minCost = option3;
    }

    // Convert result back to standard number as expected by LeetCode.
    return Number(minCost);
};
// Example usage:
console.log(minimumCost(3, 2, 1, 3, 2)); // Output: 3
console.log(minimumCost(5, 4, 15, 2, 3)); // Output: 22
console.log(minimumCost(5, 4, 15, 0, 0)); // Output: 0
