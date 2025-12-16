// 3562. Maximum Profit from Trading Stocks with Discounts

/**
Example 1:

Input: n = 2, present = [1,2], future = [4,3], hierarchy = [[1,2]], budget = 3

Output: 5

Explanation:



Employee 1 buys the stock at price 1 and earns a profit of 4 - 1 = 3.
Since Employee 1 is the direct boss of Employee 2, Employee 2 gets a discounted price of floor(2 / 2) = 1.
Employee 2 buys the stock at price 1 and earns a profit of 3 - 1 = 2.
The total buying cost is 1 + 1 = 2 <= budget. Thus, the maximum total profit achieved is 3 + 2 = 5.
Example 2:

Input: n = 2, present = [3,4], future = [5,8], hierarchy = [[1,2]], budget = 4

Output: 4

Explanation:



Employee 2 buys the stock at price 4 and earns a profit of 8 - 4 = 4.
Since both employees cannot buy together, the maximum profit is 4.
Example 3:

Input: n = 3, present = [4,6,8], future = [7,9,11], hierarchy = [[1,2],[1,3]], budget = 10

Output: 10

Explanation:



Employee 1 buys the stock at price 4 and earns a profit of 7 - 4 = 3.
Employee 3 would get a discounted price of floor(8 / 2) = 4 and earns a profit of 11 - 4 = 7.
Employee 1 and Employee 3 buy their stocks at a total cost of 4 + 4 = 8 <= budget. Thus, the maximum total profit achieved is 3 + 7 = 10.
Example 4:

Input: n = 3, present = [5,2,3], future = [8,5,6], hierarchy = [[1,2],[2,3]], budget = 7

Output: 12

Explanation:



Employee 1 buys the stock at price 5 and earns a profit of 8 - 5 = 3.
Employee 2 would get a discounted price of floor(2 / 2) = 1 and earns a profit of 5 - 1 = 4.
Employee 3 would get a discounted price of floor(3 / 2) = 1 and earns a profit of 6 - 1 = 5.
The total cost becomes 5 + 1 + 1 = 7 <= budget. Thus, the maximum total profit achieved is 3 + 4 + 5 = 12.

*/

const n = 2,
  present = [3, 4],
  future = [5, 8],
  hierarchy = [[1, 2]],
  budget = 4;

const maxProfit = function (
  n: number,
  present: number[],
  future: number[],
  hierarchy: number[][],
  budget: number
) {
  // Build Adjacency List
  const adj: number[][] = Array.from({ length: n + 1 }, () => []);
  for (const [u, v] of hierarchy) {
    adj[u].push(v);
  }

  // DFS function to compute DP tables for a subtree
  // Returns { ifParentSkips: number[], ifParentBuys: number[] }
  // Arrays are indexed by cost [0...budget], values are max profit.
  const dfs = (
    u: number
  ): { ifParentSkips: number[]; ifParentBuys: number[] } => {
    // Initialize accumulators for children results
    // dp_u_buys: Aggregate of children assuming u buys (children get discount)
    // dp_u_skips: Aggregate of children assuming u skips (children pay full)
    // Initialize with -Infinity to mark unreachable states, except cost 0 is profit 0.
    let dp_u_buys = new Array(budget + 1).fill(-Infinity);
    let dp_u_skips = new Array(budget + 1).fill(-Infinity);

    dp_u_buys[0] = 0;
    dp_u_skips[0] = 0;

    for (const v of adj[u]) {
      const childRes = dfs(v);

      const next_buys = new Array(budget + 1).fill(-Infinity);
      const next_skips = new Array(budget + 1).fill(-Infinity);

      // Merge child results into 'dp_u_buys' (Context: u buys)
      // We combine 'dp_u_buys' with 'childRes.ifParentBuys'
      for (let i = 0; i <= budget; i++) {
        if (dp_u_buys[i] === -Infinity) continue;
        for (let j = 0; j <= budget - i; j++) {
          if (childRes.ifParentBuys[j] !== -Infinity) {
            next_buys[i + j] = Math.max(
              next_buys[i + j],
              dp_u_buys[i] + childRes.ifParentBuys[j]
            );
          }
        }
      }

      // Merge child results into 'dp_u_skips' (Context: u skips)
      // We combine 'dp_u_skips' with 'childRes.ifParentSkips'
      for (let i = 0; i <= budget; i++) {
        if (dp_u_skips[i] === -Infinity) continue;
        for (let j = 0; j <= budget - i; j++) {
          if (childRes.ifParentSkips[j] !== -Infinity) {
            next_skips[i + j] = Math.max(
              next_skips[i + j],
              dp_u_skips[i] + childRes.ifParentSkips[j]
            );
          }
        }
      }

      dp_u_buys = next_buys;
      dp_u_skips = next_skips;
    }

    // Prepare costs and profits for node u
    const idx = u - 1; // 0-based index
    const costFull = present[idx];
    const profitFull = future[idx] - costFull;
    const costDisc = Math.floor(costFull / 2);
    const profitDisc = future[idx] - costDisc;

    // 1. Calculate result if Parent(u) SKIPS
    // Option A: u skips (inherit children results from dp_u_skips)
    const res_ifParentSkips = [...dp_u_skips];

    // Option B: u buys at FULL price (inherit children results from dp_u_buys)
    if (costFull <= budget) {
      for (let i = 0; i <= budget - costFull; i++) {
        if (dp_u_buys[i] !== -Infinity) {
          res_ifParentSkips[i + costFull] = Math.max(
            res_ifParentSkips[i + costFull],
            dp_u_buys[i] + profitFull
          );
        }
      }
    }

    // 2. Calculate result if Parent(u) BUYS
    // Option A: u skips (inherit children results from dp_u_skips - no discount passed down)
    const res_ifParentBuys = [...dp_u_skips];

    // Option B: u buys at DISCOUNT price (inherit children results from dp_u_buys)
    if (costDisc <= budget) {
      for (let i = 0; i <= budget - costDisc; i++) {
        if (dp_u_buys[i] !== -Infinity) {
          res_ifParentBuys[i + costDisc] = Math.max(
            res_ifParentBuys[i + costDisc],
            dp_u_buys[i] + profitDisc
          );
        }
      }
    }

    return { ifParentSkips: res_ifParentSkips, ifParentBuys: res_ifParentBuys };
  };

  // Employee 1 is the CEO (no boss), so we use the result corresponding to "parent skips"
  // (or essentially "no parent bought").
  const rootRes = dfs(1);

  // The answer is the maximum profit achievable within the budget from the root's table
  let maxP = 0;
  for (const val of rootRes.ifParentSkips) {
    maxP = Math.max(maxP, val);
  }

  return maxP;
};

console.log(maxProfit(n, present, future, hierarchy, budget));
