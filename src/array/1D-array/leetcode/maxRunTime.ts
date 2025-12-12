// 2141. Maximum Running Time of N Computers

/**
Example 1:


Input: n = 2, batteries = [3,3,3]
Output: 4
Explanation: 
Initially, insert battery 0 into the first computer and battery 1 into the second computer.
After two minutes, remove battery 1 from the second computer and insert battery 2 instead. Note that battery 1 can still run for one minute.
At the end of the third minute, battery 0 is drained, and you need to remove it from the first computer and insert battery 1 instead.
By the end of the fourth minute, battery 1 is also drained, and the first computer is no longer running.
We can run the two computers simultaneously for at most 4 minutes, so we return 4.

Example 2:


Input: n = 2, batteries = [1,1,1,1]
Output: 2
Explanation: 
Initially, insert battery 0 into the first computer and battery 2 into the second computer. 
After one minute, battery 0 and battery 2 are drained so you need to remove them and insert battery 1 into the first computer and battery 3 into the second computer. 
After another minute, battery 1 and battery 3 are also drained so the first and second computers are no longer running.
We can run the two computers simultaneously for at most 2 minutes, so we return 2.
 */
const n = 2,
  batteries = [3, 3, 3];
const maxRunTime = function (n: number, batteries: number[]): number {
  // 1. Sort batteries in ascending order.
  // Time Complexity: O(N log N)
  batteries.sort((a, b) => a - b);

  // 2. Calculate the initial total sum of power.
  // Note: In JS/TS, 'number' can safely hold up to 2^53 - 1 (~9e15).
  // Max possible sum here is 10^5 * 10^9 = 10^14, which is safe.
  let sum = batteries.reduce((acc, val) => acc + val, 0);

  // 3. Iterate from the largest battery downwards.
  // We check if the largest battery is a "bottleneck" (too powerful).
  for (let i = batteries.length - 1; i >= 0; i--) {
    const targetAvg = sum / n;

    // If the current largest battery is greater than the theoretical average,
    // it means this battery can single-handedly power one computer for longer
    // than the rest of the batteries can power the remaining computers.
    if (batteries[i] > targetAvg) {
      // Assign this battery to one computer and remove both from the equation.
      sum -= batteries[i];
      n--;
    } else {
      // If the largest battery is <= the average, then all remaining batteries
      // are small enough to be perfectly distributed.
      // The result is simply the total energy divided by the number of computers.
      return Math.floor(sum / n);
    }
  }

  return 0; // Should not technically be reached given constraints (n >= 1)
};

console.log(maxRunTime(n, batteries));
