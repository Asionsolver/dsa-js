// 188. Best Time to Buy and Sell Stock IV

/**
Example 1:

Input: k = 2, prices = [2,4,1]
Output: 2
Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.
Example 2:

Input: k = 2, prices = [3,2,6,5,0,3]
Output: 7
Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4. Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.

*/
const k = 2,
  prices = [2, 4, 1];
const maxProfit = function (k: number, prices: number[]) {
  const n = prices.length;

  // Edge case: Not enough days to make a profit or 0 transactions allowed
  if (n <= 1 || k === 0) {
    return 0;
  }

  // Optimization: If k is large enough to cover every upward slope,
  // this acts like "Best Time to Buy and Sell Stock II".
  // We simply sum up every profitable daily difference.
  if (k >= n / 2) {
    let maxProfit = 0;
    for (let i = 1; i < n; i++) {
      if (prices[i] > prices[i - 1]) {
        maxProfit += prices[i] - prices[i - 1];
      }
    }
    return maxProfit;
  }

  // DP Arrays initialization
  // buy[i] represents the max money after the i-th buy
  // sell[i] represents the max money after the i-th sell
  // We use k + 1 to handle 1-based indexing for transactions conveniently
  const buy: number[] = new Array(k + 1).fill(-Infinity);
  const sell: number[] = new Array(k + 1).fill(0);

  for (const price of prices) {
    for (let i = 1; i <= k; i++) {
      // Decision: Keep holding (buy[i]) OR Buy today (using profit from previous sell)
      buy[i] = Math.max(buy[i], sell[i - 1] - price);

      // Decision: Keep sold state (sell[i]) OR Sell today (using balance from current buy)
      sell[i] = Math.max(sell[i], buy[i] + price);
    }
  }

  // The result is the max profit after at most k transactions
  return sell[k];
};

console.log(maxProfit(k, prices));
