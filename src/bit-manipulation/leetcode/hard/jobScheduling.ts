// 1235. Maximum Profit in Job Scheduling

/**
Example 1:



Input: startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]
Output: 120
Explanation: The subset chosen is the first and fourth job. 
Time range [1-3]+[3-6] , we get profit of 120 = 50 + 70.
Example 2:



Input: startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60]
Output: 150
Explanation: The subset chosen is the first, fourth and fifth job. 
Profit obtained 150 = 20 + 70 + 60.
Example 3:



Input: startTime = [1,1,1], endTime = [2,3,4], profit = [5,6,4]
Output: 6
*/
const startTime = [1, 2, 3, 3],
  endTime = [3, 4, 5, 6],
  profit = [50, 10, 40, 70];
function jobScheduling(
  startTime: number[],
  endTime: number[],
  profit: number[]
): number {
  const n = startTime.length;

  // 1. Combine arrays into an array of objects
  const jobs: Array<{ start: number; end: number; profit: number }> = [];
  for (let i = 0; i < n; i++) {
    jobs.push({
      start: startTime[i],
      end: endTime[i],
      profit: profit[i],
    });
  }

  // 2. Sort jobs by start time
  jobs.sort((a, b) => a.start - b.start);

  // 3. Initialize DP array
  // dp[i] represents max profit from index i to n
  // Size is n + 1 to handle the base case where no jobs are left (index n returns 0)
  const dp = new Array(n + 1).fill(0);

  // 4. Fill DP table from back to front
  for (let i = n - 1; i >= 0; i--) {
    // Option A: Skip the current job
    // The profit is the same as the max profit starting from the next index
    const skipProfit = dp[i + 1];

    // Option B: Schedule the current job
    // We get current profit + max profit of the next available non-overlapping job
    const nextJobIndex = findNextJob(jobs, i + 1, jobs[i].end);
    const includeProfit = jobs[i].profit + dp[nextJobIndex];

    // Take the maximum of both choices
    dp[i] = Math.max(skipProfit, includeProfit);
  }

  return dp[0];
}

/**
 * Binary Search (Lower Bound)
 * Finds the index of the first job that starts at or after the target time.
 */
function findNextJob(
  jobs: Array<{ start: number; end: number; profit: number }>,
  low: number,
  targetTime: number
): number {
  let high = jobs.length;

  while (low < high) {
    // Unsigned right shift is slightly faster than Math.floor for positive integers
    const mid = (low + high) >>> 1;

    if (jobs[mid].start >= targetTime) {
      // Found a candidate, try to see if there is an earlier one
      high = mid;
    } else {
      // This job starts too early, look to the right
      low = mid + 1;
    }
  }

  return low;
}
console.log(jobScheduling(startTime, endTime, profit));
