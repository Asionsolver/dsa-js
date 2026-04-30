// 2398. Maximum Number of Robots Within Budget

/**
Example 1:

Input: chargeTimes = [3,6,1,3,4], runningCosts = [2,1,3,4,5], budget = 25
Output: 3
Explanation: 
It is possible to run all individual and consecutive pairs of robots within budget.
To obtain answer 3, consider the first 3 robots. The total cost will be max(3,6,1) + 3 * sum(2,1,3) = 6 + 3 * 6 = 24 which is less than 25.
It can be shown that it is not possible to run more than 3 consecutive robots within budget, so we return 3.
Example 2:

Input: chargeTimes = [11,12,19], runningCosts = [10,8,7], budget = 19
Output: 0
Explanation: No robot can be run that does not exceed the budget, so we return 0.

*/

function maximumRobots(
  chargeTimes: number[],
  runningCosts: number[],
  budget: number,
): number {
  const n = chargeTimes.length;
  let left = 0;
  let currentSum = 0;

  // An Int32Array performs nicely as a deque to ensure fast access and minimal memory footprint
  const deque = new Int32Array(n);
  let head = 0;
  let tail = 0;

  for (let right = 0; right < n; right++) {
    currentSum += runningCosts[right];

    // Maintain the monotonic decreasing property of the deque based on chargeTimes
    while (tail > head && chargeTimes[deque[tail - 1]] <= chargeTimes[right]) {
      tail--;
    }
    deque[tail++] = right;

    // Calculate the current cost for the window size: right - left + 1
    const maxCharge = chargeTimes[deque[head]];
    const cost = maxCharge + (right - left + 1) * currentSum;

    // If the cost exceeds budget, we shift the window by incrementing `left`.
    // The window size remains maintained at the maximum valid length found so far.
    // It will only grow if a valid larger consecutive subsegment is found.
    if (cost > budget) {
      currentSum -= runningCosts[left];

      // If the element falling out of the window is the largest charge time, remove it from the deque.
      if (deque[head] === left) {
        head++;
      }
      left++;
    }
  }

  // The maximum length is successfully encoded within the difference between array size and the left pointer
  return n - left;
}

// Example usage:
const chargeTimes = [3, 6, 1, 3, 4];
const runningCosts = [2, 1, 3, 4, 5];
const budget = 25;
console.log(maximumRobots(chargeTimes, runningCosts, budget)); // Output: 3

const chargeTimes2 = [11, 12, 19];
const runningCosts2 = [10, 8, 7];
const budget2 = 19;
console.log(maximumRobots(chargeTimes2, runningCosts2, budget2)); // Output: 0

const chargeTimes3 = [1, 2, 3, 4, 5];
const runningCosts3 = [1, 1, 1, 1, 1];
const budget3 = 10;
console.log(maximumRobots(chargeTimes3, runningCosts3, budget3)); // Output: 5
