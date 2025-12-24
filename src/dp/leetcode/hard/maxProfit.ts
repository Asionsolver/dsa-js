// 123. Best Time to Buy and Sell Stock III

/** 
Example 1:

Input: prices = [3,3,5,0,0,3,1,4]
Output: 6
Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.
Example 2:

Input: prices = [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.
Example 3:

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
*/

const maxProfit = function (prices: number[]) {
  // Variable initialization:
  // We initialize costs to Infinity because we want to find the minimum.
  // We initialize profits to 0 because we want to find the maximum.

  let t1Cost = Number.MAX_VALUE; // Min cost to buy 1st stock
  let t1Profit = 0; // Max profit after selling 1st stock
  let t2Cost = Number.MAX_VALUE; // Min effective cost to buy 2nd stock
  let t2Profit = 0; // Max total profit after selling 2nd stock

  for (const price of prices) {
    // --- Transaction 1 ---
    // Update the minimum price seen so far for the first buy
    t1Cost = Math.min(t1Cost, price);

    // Update the max profit for the first transaction
    // (Current Price - Cost of 1st Buy)
    t1Profit = Math.max(t1Profit, price - t1Cost);

    // --- Transaction 2 ---
    // Update the effective cost for the second buy.
    // Logic: We reinvest the profit from transaction 1 to offset the cost of transaction 2.
    // (Current Price - Profit from 1st Transaction)
    t2Cost = Math.min(t2Cost, price - t1Profit);

    // Update the total profit after the second transaction
    // (Current Price - Effective Cost of 2nd Buy)
    t2Profit = Math.max(t2Profit, price - t2Cost);
  }

  // t2Profit represents the maximum profit achievable with at most 2 transactions.
  // If only 1 transaction was optimal, the math naturally carries over
  // (t2Cost becomes very low, t2Profit equals t1Profit).
  return t2Profit;
};
