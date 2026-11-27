// 3946. Maximum Number of Items From Sale I

/**
You are given a 2D integer array items, where items[i] = [factori, pricei] represents the ith item. You are also given an integer budget.

There are unlimited copies of each item available for purchase.You may buy any number of copies of any items such that the total cost of the purchased copies is at most budget.

After buying items, you may receive free copies according to the following rules:

For each item i that you bought at least one copy of, you receive one free copy of every item j such that j != i and factori divides factorj.
Buying multiple copies of the same item i does not give additional free copies through item i.
The same item j can be received multiple times for free if it is received from purchases of different item types.
Return the maximum total number of item copies you can obtain, including both purchased copies and free copies, while spending at most budget on purchased items.
*/

/**
Example 1:

Input: items = [[6,2],[2,6],[3,4]], budget = 9

Output: 4

Explanation:

You can buy 2 copies of item 0 and 1 copy of item 2 for a total cost of 2 * 2 + 4 = 8, which is not greater than budget = 9.
Buying item 2 gives 1 free copy of item 0, because factor2 = 3 divides factor0 = 6.
You leave with 3 purchased copies and 1 free copy, for a total of 4 item copies.
Example 2:

Input: items = [[2,4],[3,2],[4,1],[6,4],[12,4]], budget = 8

Output: 10

Explanation:

You can buy 1 copy of item 0, 1 copy of item 1, and 2 copies of item 2 for a total cost of 4 + 2 + 2 * 1 = 8.
Buying item 0 gives 1 free copy of items 2, 3, and 4.
Buying item 1 gives 1 free copy of items 3 and 4.
Buying item 2 gives 1 free copy of item 4.
Thus, you receive 6 free copies. You leave with 4 purchased copies and 6 free copies, for a total of 10 item copies.

*/

/**
Constraints:

1 <= items.length <= 1000
items[i] = [factori, pricei]
1 <= factori, pricei <= 1500
1 <= budget <= 1500
*/

// Brute Force Approach: Backtracking with DFS
// function maximumSaleItems(items: number[][], budget: number): number {
//   const n = items.length;
//   const counts = new Array<number>(n).fill(0);

//   function dfs(index: number, remainingBudget: number): number {
//     // Base case: all items have been assigned a purchase quantity.
//     if (index === n) {
//       let totalItems = 0;

//       for (let i = 0; i < n; i++) {
//         if (counts[i] > 0) {
//           // Add purchased copies of item i.
//           totalItems += counts[i];

//           // Count all free items unlocked by buying at least one copy of item i.
//           for (let j = 0; j < n; j++) {
//             if (i !== j && items[j][0] % items[i][0] === 0) {
//               totalItems++;
//             }
//           }
//         }
//       }

//       return totalItems;
//     }

//     const price = items[index][1];
//     const maxCopies = Math.floor(remainingBudget / price);
//     let best = 0;

//     // Try buying 0, 1, 2, ... up to maxCopies of the current item.
//     for (let copy = 0; copy <= maxCopies; copy++) {
//       counts[index] = copy;
//       const result = dfs(index + 1, remainingBudget - copy * price);
//       if (result > best) {
//         best = result;
//       }
//     }

//     counts[index] = 0;
//     return best;
//   }

//   return dfs(0, budget);
// }

// Optimized Approach: Dynamic Programming with Knapsack and Sieve for Free Items
function maximumSaleItems(items: number[][], budget: number): number {
  let maxFactor = 0;
  let minPrice = Infinity;

  // Find the maximum factor (for sieve sizing) and the global minimum price.
  for (const [factor, price] of items) {
    if (factor > maxFactor) maxFactor = factor;
    if (price < minPrice) minPrice = price;
  }

  // Count how many items have each factor value.
  const factorFreq = new Int32Array(maxFactor + 1);
  for (const [factor] of items) {
    factorFreq[factor]++;
  }

  // Precompute how many items have a factor divisible by f using its multiples.
  const multiplesCount = new Int32Array(maxFactor + 1);
  for (let f = 1; f <= maxFactor; f++) {
    if (factorFreq[f] === 0) continue;
    for (let multiple = f; multiple <= maxFactor; multiple += f) {
      multiplesCount[f] += factorFreq[multiple];
    }
  }

  // dp[cost] stores the max items from 1st copies using exact cost; -1 means unreachable.
  const dp = new Int32Array(budget + 1).fill(-1);
  dp[0] = 0;

  // Run 0/1 Knapsack where each item's 1st copy gives 1 + free copies.
  for (const [factor, price] of items) {
    // Subtract 1 to exclude the item itself (since j != i is required).
    const firstCopyValue = 1 + (multiplesCount[factor] - 1);

    // Traverse backwards so each item is considered at most once in 0/1 Knapsack.
    for (let cost = budget; cost >= price; cost--) {
      if (dp[cost - price] !== -1) {
        const candidate = dp[cost - price] + firstCopyValue;
        if (candidate > dp[cost]) {
          dp[cost] = candidate;
        }
      }
    }
  }

  let maxTotalItems = 0;

  // Spend remaining budget on extra copies of the cheapest item to maximize total items.
  for (let cost = 0; cost <= budget; cost++) {
    if (dp[cost] === -1) continue;
    const remainingBudget = budget - cost;
    const extraCopies = Math.floor(remainingBudget / minPrice);
    const total = dp[cost] + extraCopies;
    if (total > maxTotalItems) {
      maxTotalItems = total;
    }
  }

  return maxTotalItems;
}
// Example usage:
const items1 = [
  [6, 2],
  [2, 6],
  [3, 4],
];
const budget1 = 9;
console.log(maximumSaleItems(items1, budget1)); // Output: 4

const items2 = [
  [2, 4],
  [3, 2],
  [4, 1],
  [6, 4],
  [12, 4],
];
const budget2 = 8;
console.log(maximumSaleItems(items2, budget2)); // Output: 10
