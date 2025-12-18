// 3652. Best Time to Buy and Sell Stock using Strategy

/**
Example 1:

Input: prices = [4,2,8], strategy = [-1,0,1], k = 2

Output: 10

Explanation:

Modification	Strategy	Profit Calculation	Profit
Original	[-1, 0, 1]	(-1 × 4) + (0 × 2) + (1 × 8) = -4 + 0 + 8	4
Modify [0, 1]	[0, 1, 1]	(0 × 4) + (1 × 2) + (1 × 8) = 0 + 2 + 8	10
Modify [1, 2]	[-1, 0, 1]	(-1 × 4) + (0 × 2) + (1 × 8) = -4 + 0 + 8	4
Thus, the maximum possible profit is 10, which is achieved by modifying the subarray [0, 1]​​​​​​​.

Example 2:

Input: prices = [5,4,3], strategy = [1,1,0], k = 2

Output: 9

Explanation:

Modification	Strategy	Profit Calculation	Profit
Original	[1, 1, 0]	(1 × 5) + (1 × 4) + (0 × 3) = 5 + 4 + 0	9
Modify [0, 1]	[0, 1, 0]	(0 × 5) + (1 × 4) + (0 × 3) = 0 + 4 + 0	4
Modify [1, 2]	[1, 0, 1]	(1 × 5) + (0 × 4) + (1 × 3) = 5 + 0 + 3	8
Thus, the maximum possible profit is 9, which is achieved without any modification.

*/
const prices = [4, 2, 8],
  strategy = [-1, 0, 1],
  k = 2;

const maxProfit = function (prices: number[], strategy: number[], k: number) {
  const n = prices.length;
  const m = k / 2;

  // Helper to calculate original contribution: prices[i] * strategy[i]
  const getOrigContrib = (i: number): number => prices[i] * strategy[i];

  // Helper to calculate the gain if strategy becomes 1 (sell)
  // Gain = (1 * price) - (old_strategy * price)
  // This represents the delta for the right half of the window
  const getSellGain = (i: number): number =>
    prices[i] - prices[i] * strategy[i];

  // 1. Calculate Base Profit
  let baseProfit = 0;
  for (let i = 0; i < n; i++) {
    baseProfit += getOrigContrib(i);
  }

  // 2. Initialize the first window (starting at index 0)
  // Left half: [0, m-1], Right half: [m, k-1]

  // For the left half, the strategy becomes 0.
  // The change in profit is 0 - original_contribution.
  // So we track the sum of original contributions to SUBTRACT later.
  let currentLeftSum = 0;
  for (let i = 0; i < m; i++) {
    currentLeftSum += getOrigContrib(i);
  }

  // For the right half, the strategy becomes 1.
  // We track the sum of (new_val - old_val) to ADD.
  let currentRightSum = 0;
  for (let i = m; i < k; i++) {
    currentRightSum += getSellGain(i);
  }

  // Calculate delta for the first window
  let maxDelta = currentRightSum - currentLeftSum;
  let currentDelta = maxDelta;

  // 3. Slide the window
  // The window currently starts at i. We move to i + 1.
  // Loop runs until the end of the new window (i + k) reaches n.
  for (let i = 0; i < n - k; i++) {
    const leavingIdx = i; // Index leaving the window completely
    const crossingIdx = i + m; // Index moving from Right Half to Left Half
    const enteringIdx = i + k; // Index entering the window on the right

    // Update Left Sum (original contributions)
    // Remove the one leaving the window
    currentLeftSum -= getOrigContrib(leavingIdx);
    // Add the one coming from the right side
    currentLeftSum += getOrigContrib(crossingIdx);

    // Update Right Sum (sell gains)
    // Remove the one moving to the left side
    currentRightSum -= getSellGain(crossingIdx);
    // Add the new one entering the window
    currentRightSum += getSellGain(enteringIdx);

    // Recalculate Delta
    currentDelta = currentRightSum - currentLeftSum;
    if (currentDelta > maxDelta) {
      maxDelta = currentDelta;
    }
  }

  // If maxDelta is negative, we don't apply any modification (add 0).
  return baseProfit + Math.max(0, maxDelta);
};

console.log(maxProfit(prices, strategy, k));
