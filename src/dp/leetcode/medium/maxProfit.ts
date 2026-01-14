// 714. Best Time to Buy and Sell Stock with Transaction Fee

/**
Example 1:

Input: prices = [1,3,2,8,4,9], fee = 2
Output: 8
Explanation: The maximum profit can be achieved by:
- Buying at prices[0] = 1
- Selling at prices[3] = 8
- Buying at prices[4] = 4
- Selling at prices[5] = 9
The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
Example 2:

Input: prices = [1,3,7,5,10,3], fee = 3
Output: 6

*/
const prices = [1, 3, 2, 8, 4, 9],
  fee = 2;

const maxProfit = function (prices: number[], fee: number): number {
  const n = prices.length;

  // If there is less than 2 days, no profit can be made
  if (n < 2) return 0;

  // 'cash' represents the max profit if we do not hold a stock at the end of the day.
  // Initial state: Day 0, we haven't done anything, so profit is 0.
  let cash = 0;

  // 'hold' represents the max profit if we hold a stock at the end of the day.
  // Initial state: Day 0, we buy the stock. Profit is negative of the price.
  let hold = -prices[0];

  for (let i = 1; i < n; i++) {
    // Option 1 (Sell): We were holding yesterday and sell today.
    // We pay the fee when the transaction cycle (buy + sell) is complete.
    // Option 2 (Rest): We stay in cash state.
    cash = Math.max(cash, hold + prices[i] - fee);

    // Option 1 (Buy): We were in cash yesterday and buy today.
    // Option 2 (Rest): We keep holding the stock we already have.
    hold = Math.max(hold, cash - prices[i]);
  }

  // The result is 'cash' because we want to end up without holding any stock
  // to realize the profit.
  return cash;
};

console.log(maxProfit(prices, fee));
