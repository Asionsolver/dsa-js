// 3633. Earliest Finish Time for Land and Water Rides I

/**
Example 1:

Input: landStartTime = [2,8], landDuration = [4,1], waterStartTime = [6], waterDuration = [3]

Output: 9

Explanation:​​​​​​​

Plan A (land ride 0 → water ride 0):
Start land ride 0 at time landStartTime[0] = 2. Finish at 2 + landDuration[0] = 6.
Water ride 0 opens at time waterStartTime[0] = 6. Start immediately at 6, finish at 6 + waterDuration[0] = 9.
Plan B (water ride 0 → land ride 1):
Start water ride 0 at time waterStartTime[0] = 6. Finish at 6 + waterDuration[0] = 9.
Land ride 1 opens at landStartTime[1] = 8. Start at time 9, finish at 9 + landDuration[1] = 10.
Plan C (land ride 1 → water ride 0):
Start land ride 1 at time landStartTime[1] = 8. Finish at 8 + landDuration[1] = 9.
Water ride 0 opened at waterStartTime[0] = 6. Start at time 9, finish at 9 + waterDuration[0] = 12.
Plan D (water ride 0 → land ride 0):
Start water ride 0 at time waterStartTime[0] = 6. Finish at 6 + waterDuration[0] = 9.
Land ride 0 opened at landStartTime[0] = 2. Start at time 9, finish at 9 + landDuration[0] = 13.
Plan A gives the earliest finish time of 9.

Example 2:

Input: landStartTime = [5], landDuration = [3], waterStartTime = [1], waterDuration = [10]

Output: 14

Explanation:​​​​​​​

Plan A (water ride 0 → land ride 0):
Start water ride 0 at time waterStartTime[0] = 1. Finish at 1 + waterDuration[0] = 11.
Land ride 0 opened at landStartTime[0] = 5. Start immediately at 11 and finish at 11 + landDuration[0] = 14.
Plan B (land ride 0 → water ride 0):
Start land ride 0 at time landStartTime[0] = 5. Finish at 5 + landDuration[0] = 8.
Water ride 0 opened at waterStartTime[0] = 1. Start immediately at 8 and finish at 8 + waterDuration[0] = 18.
Plan A provides the earliest finish time of 14.
*/

function earliestFinishTime(
  landStartTime: number[],
  landDuration: number[],
  waterStartTime: number[],
  waterDuration: number[],
): number {
  let minFinishTime = Infinity;
  const n = landStartTime.length;
  const m = waterStartTime.length;

  for (let i = 0; i < n; i++) {
    // Pre-calculate the finish time of the current land ride when taken first
    const finishLandFirst = landStartTime[i] + landDuration[i];

    for (let j = 0; j < m; j++) {
      // Option 1: Land ride first, Water ride second
      const startWaterAfter = Math.max(finishLandFirst, waterStartTime[j]);
      const finishWaterSecond = startWaterAfter + waterDuration[j];

      if (finishWaterSecond < minFinishTime) {
        minFinishTime = finishWaterSecond;
      }

      // Option 2: Water ride first, Land ride second
      const finishWaterFirst = waterStartTime[j] + waterDuration[j];
      const startLandAfter = Math.max(finishWaterFirst, landStartTime[i]);
      const finishLandSecond = startLandAfter + landDuration[i];

      if (finishLandSecond < minFinishTime) {
        minFinishTime = finishLandSecond;
      }
    }
  }

  return minFinishTime;
}

// Example usage:
console.log(earliestFinishTime([2, 8], [4, 1], [6], [3])); // Output: 9
console.log(earliestFinishTime([5], [3], [1], [10])); // Output: 14
