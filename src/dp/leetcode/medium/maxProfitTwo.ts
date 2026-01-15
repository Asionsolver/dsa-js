// 309. Best Time to Buy and Sell Stock with Cooldown

/**
Example 1:

Input: prices = [1,2,3,0,2]
Output: 3
Explanation: transactions = [buy, sell, cooldown, buy, sell]
Example 2:

Input: prices = [1]
Output: 0
*/

const prices = [1, 2, 3, 0, 2];
const maxProfit = function (prices: number[]): number {
  // Initialization:
  // hold: We can't hold a stock without buying it, so profit is -Infinity initially.
  // sold: We can't sell without holding, so profit is -Infinity initially.
  // rest: We start with 0 profit and no stock.
  let hold = -Infinity;
  let sold = -Infinity;
  let rest = 0;

  for (const price of prices) {
    // Store previous states to calculate current states simultaneously
    const prevHold = hold;
    const prevSold = sold;
    const prevRest = rest;

    // 1. Update HOLD state:
    // We either kept holding from yesterday OR we bought today.
    // To buy today, we must have been 'resting' yesterday (not in cooldown).
    hold = Math.max(prevHold, prevRest - price);

    // 2. Update SOLD state:
    // We sold the stock we were holding yesterday.
    sold = prevHold + price;

    // 3. Update REST state:
    // We either continued resting OR we just finished a cooldown (we sold yesterday).
    rest = Math.max(prevRest, prevSold);
  }

  // The result is the max profit where we do NOT hold a stock at the end.
  // (Ending with a held stock is never optimal compared to selling or having sold).
  return Math.max(sold, rest);
};

console.log(maxProfit(prices));
