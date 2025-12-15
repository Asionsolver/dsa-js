// 2110. Number of Smooth Descent Periods of a Stock

/**
Example 1:

Input: prices = [3,2,1,4]
Output: 7
Explanation: There are 7 smooth descent periods:
[3], [2], [1], [4], [3,2], [2,1], and [3,2,1]
Note that a period with one day is a smooth descent period by the definition.
Example 2:

Input: prices = [8,6,7,7]
Output: 4
Explanation: There are 4 smooth descent periods: [8], [6], [7], and [7]
Note that [8,6] is not a smooth descent period as 8 - 6 ≠ 1.
Example 3:

Input: prices = [1]
Output: 1
Explanation: There is 1 smooth descent period: [1]

*/

const prices = [3, 2, 1, 4];
const getDescentPeriods = function (prices: number[]) {
  // According to constraints, prices.length is at least 1.
  // However, it's good practice to handle edge cases.
  if (prices.length === 0) return 0;

  let totalPeriods: number = 1;
  let currentRun: number = 1;

  // Start iteration from the second element
  for (let i = 1; i < prices.length; i++) {
    // Check if the current price is 1 less than the previous price
    if (prices[i] === prices[i - 1] - 1) {
      currentRun++;
    } else {
      // Continuity broken, reset run length to 1 (the current element itself)
      currentRun = 1;
    }

    // Add the number of valid periods ending at the current index
    totalPeriods += currentRun;
  }

  return totalPeriods;
};
console.log(getDescentPeriods(prices));
