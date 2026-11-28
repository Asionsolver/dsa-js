// 3947. Maximum Number of Items From Sale II

/**
You are given a 2D integer array items, where items[i] = [factori, pricei] represents the ith item. You are also given an integer budget.

There are unlimited copies of each item available for purchase. You may buy any number of copies of any items such that the total cost of the purchased copies is at most budget.

After buying items, you may receive free copies according to the following rules:

Each purchased copy of item i can give you at most one free copy of another item j.
The free item must satisfy i != j and factori divides factorj.
For each ordered pair (i, j), you can receive a free copy of item j from purchases of item i at most once, regardless of how many copies of item i you buy.
The same item j can be received multiple times for free if it is received from purchases of different item types.
Return the maximum total number of item copies you can obtain, including both purchased copies and free copies, while spending at most budget on purchased items.


*/

/**
Example 1:

Input: items = [[1,6],[2,4],[3,5]], budget = 19

Output: 5

Explanation:

You can buy 2 copies of item 0 and 1 copy of item 1 for a total cost of 2 * 6 + 4 = 16, which is not greater than budget = 19.
One purchased copy of item 0 gives 1 free copy of item 1, because factor0 = 1 divides factor1 = 2.
The other purchased copy of item 0 gives 1 free copy of item 2, because factor0 = 1 divides factor2 = 3.
You leave with 3 purchased copies and 2 free copies, for a total of 5 item copies.
Example 2:

Input: items = [[2,8],[1,10],[6,6],[4,12],[5,20],[5,17]], budget = 35

Output: 7

Explanation:

You can buy 2 copies of item 0, 1 copy of item 1, and 1 copy of item 2 for a total cost of 2 * 8 + 10 + 6 = 32, which is not greater than budget = 35.
One purchased copy of item 0 gives 1 free copy of item 2, because factor0 = 2 divides factor2 = 6.
The other purchased copy of item 0 gives 1 free copy of item 3, because factor0 = 2 divides factor3 = 4.
The purchased copy of item 1 gives 1 free copy of item 2, because factor1 = 1 divides factor2 = 6.
Buying item 2 gives no free copy, because factor2 = 6 does not divide the factor of any other item.
You leave with 4 purchased copies and 3 free copies, for a total of 7 item copies.

*/

/**
Constraints:

1 <= items.length <= 105
items[i] = [factori, pricei]
1 <= factori <= items.length
1 <= pricei <= 109
1 <= budget <= 109
*/

// Brute-Force Solution with Recursion and Backtracking: TLE
// function maximumSaleItems(items: number[][], budget: number): number {
//   const n = items.length;
//   const freeLimit = new Array<number>(n).fill(0);

//   // Count how many other items have a factor divisible by items[i]'s factor.
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < n; j++) {
//       if (i !== j && items[j][0] % items[i][0] === 0) {
//         freeLimit[i]++;
//       }
//     }
//   }

//   // Try every valid purchase count for each item using recursion.
//   function dfs(index: number, remainingBudget: number): number {
//     if (index === n) {
//       return 0;
//     }

//     const price = items[index][1];
//     const maxCopies = Math.floor(remainingBudget / price);
//     let bestTotal = 0;

//     for (let count = 0; count <= maxCopies; count++) {
//       // Free copies cannot exceed either the bought copies or the item's freeLimit.
//       const freeCopies = Math.min(count, freeLimit[index]);
//       const currentGain = count + freeCopies;
//       const nextGain = dfs(index + 1, remainingBudget - count * price);

//       bestTotal = Math.max(bestTotal, currentGain + nextGain);
//     }

//     return bestTotal;
//   }

//   return dfs(0, budget);
// }

// Optimized Greedy Solution
function maximumSaleItems(items: number[][], budget: number): number {
    let minPrice = Infinity;
    let maxFactor = 0;

    // Find the global minimum price and maximum factor in one pass.
    for (const [factor, price] of items) {
        if (price < minPrice) minPrice = price;
        if (factor > maxFactor) maxFactor = factor;
    }

    // Count the frequency of each factor.
    const freq = new Array<number>(maxFactor + 1).fill(0);
    for (const [factor] of items) {
        freq[factor]++;
    }

    // Use a sieve-like loop to count how many items have a factor divisible by f.
    const multiplesCount = new Array<number>(maxFactor + 1).fill(0);
    for (let f = 1; f <= maxFactor; f++) {
        if (freq[f] === 0) continue;

        for (let multiple = f; multiple <= maxFactor; multiple += f) {
            multiplesCount[f] += freq[multiple];
        }
    }

    // Collect only "2-for-1" options that are strictly cheaper per item than 2 * minPrice.
    const doubleValueOptions: [number, number][] = [];
    const priceThreshold = 2 * minPrice;

    for (const [factor, price] of items) {
        // Subtract 1 to exclude the item itself (since i != j is required).
        const freeLimit = multiplesCount[factor] - 1;

        if (freeLimit > 0 && price < priceThreshold) {
            doubleValueOptions.push([price, freeLimit]);
        }
    }

    // Sort the "2-for-1" options by price in ascending order for greedy selection.
    doubleValueOptions.sort((a, b) => a[0] - b[0]);

    let remainingBudget = budget;
    let totalItems = 0;

    for (const [price, availableCopies] of doubleValueOptions) {
        // Since options are sorted by price, no further option can be afforded.
        if (remainingBudget < price) {
            break;
        }

        // Buy as many copies as both freeLimit and remainingBudget allow.
        const buyCount = Math.min(availableCopies, Math.floor(remainingBudget / price));
        remainingBudget -= buyCount * price;
        totalItems += buyCount * 2;
    }

    // Spend any leftover budget on the cheapest item (1-for-1).
    totalItems += Math.floor(remainingBudget / minPrice);

    return totalItems;
};

// Example usage:
const items1 = [
  [1, 6],
  [2, 4],
  [3, 5],
];
const budget1 = 19;
console.log(maximumSaleItems(items1, budget1)); // Output: 5

const items2 = [
  [2, 8],
  [1, 10],
  [6, 6],
  [4, 12],
  [5, 20],
  [5, 17],
];
const budget2 = 35;
console.log(maximumSaleItems(items2, budget2)); // Output: 7
