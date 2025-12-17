// 3573. Best Time to Buy and Sell Stock V

/**
Example 1:

Input: prices = [1,7,9,8,2], k = 2

Output: 14

Explanation:

We can make $14 of profit through 2 transactions:
A normal transaction: buy the stock on day 0 for $1 then sell it on day 2 for $9.
A short selling transaction: sell the stock on day 3 for $8 then buy back on day 4 for $2.
Example 2:

Input: prices = [12,16,19,19,8,1,19,13,9], k = 3

Output: 36

Explanation:

We can make $36 of profit through 3 transactions:
A normal transaction: buy the stock on day 0 for $12 then sell it on day 2 for $19.
A short selling transaction: sell the stock on day 3 for $19 then buy back on day 4 for $8.
A normal transaction: buy the stock on day 5 for $1 then sell it on day 6 for $19.
 
*/
const prices = [1, 7, 9, 8, 2],
  k = 2;
const maximumProfit = function (prices: number[], k: number) {
  const n = prices.length;

  // DP Arrays to store max profit for each state with 'j' completed transactions.
  // We use Arrays of size k + 1 because we track 0 to k transactions.
  // Initialize with -Infinity as these states are not reachable initially.

  // neutral[j]: Max profit with j transactions completed, currently not holding any position.
  let neutral: number[] = new Array(k + 1).fill(-Infinity);

  // longPos[j]: Max profit with j transactions completed (in progress of j+1), currently holding a Long position.
  let longPos: number[] = new Array(k + 1).fill(-Infinity);

  // shortPos[j]: Max profit with j transactions completed (in progress of j+1), currently holding a Short position.
  let shortPos: number[] = new Array(k + 1).fill(-Infinity);

  // Base Case: Before any trading, with 0 transactions, profit is 0.
  neutral[0] = 0;

  for (const price of prices) {
    // Create copies for the next day's state to ensure we only use values from the previous day.
    // This satisfies the constraint: "can't buy or sell on the same day you are selling or buying back".
    const next_neutral = [...neutral];
    const next_longPos = [...longPos];
    const next_shortPos = [...shortPos];

    for (let j = 0; j <= k; j++) {
      // 1. Logic to OPEN a position (Starting transaction j+1)
      // We can only start a new transaction if we haven't reached the limit k.
      if (j < k) {
        // Calculate max profit for holding a Long position:
        // Either keep holding previous Long OR Open new Long from Neutral state
        next_longPos[j] = Math.max(longPos[j], neutral[j] - price);

        // Calculate max profit for holding a Short position:
        // Either keep holding previous Short OR Open new Short from Neutral state
        next_shortPos[j] = Math.max(shortPos[j], neutral[j] + price);
      }

      // 2. Logic to CLOSE a position (Completing transaction j)
      if (j > 0) {
        // Calculate max profit for becoming Neutral:
        // Either stay Neutral OR Close a Long (Sell) OR Close a Short (Buy back).
        // Note: Closing a position corresponds to the previous transaction count (j-1).
        next_neutral[j] = Math.max(
          neutral[j],
          longPos[j - 1] + price, // Sell: Gain price
          shortPos[j - 1] - price // Buy Back: Pay price
        );
      }
    }

    // Update states for the next day
    neutral = next_neutral;
    longPos = next_longPos;
    shortPos = next_shortPos;
  }

  // The answer is the maximum profit found in any Neutral state (0 to k transactions).
  return Math.max(...neutral);
};

console.log(maximumProfit(prices, k));
