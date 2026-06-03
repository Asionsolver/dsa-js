// 3635. Earliest Finish Time for Land and Water Rides II

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
  // Step 1: Find the minimum completion time if we do a Land ride first
  let minCL = Infinity;
  for (let i = 0; i < landStartTime.length; i++) {
    const finishTime = landStartTime[i] + landDuration[i];
    if (finishTime < minCL) {
      minCL = finishTime;
    }
  }

  // Step 2: Find the minimum completion time if we do a Water ride first
  let minCW = Infinity;
  for (let j = 0; j < waterStartTime.length; j++) {
    const finishTime = waterStartTime[j] + waterDuration[j];
    if (finishTime < minCW) {
      minCW = finishTime;
    }
  }

  // Step 3: Calculate the earliest overall finish time for (Land -> Water)
  let ans1 = Infinity;
  for (let j = 0; j < waterStartTime.length; j++) {
    const cost = Math.max(minCL, waterStartTime[j]) + waterDuration[j];
    if (cost < ans1) {
      ans1 = cost;
    }
  }

  // Step 4: Calculate the earliest overall finish time for (Water -> Land)
  let ans2 = Infinity;
  for (let i = 0; i < landStartTime.length; i++) {
    const cost = Math.max(minCW, landStartTime[i]) + landDuration[i];
    if (cost < ans2) {
      ans2 = cost;
    }
  }

  // Return the minimum time achieved across the two overarching scenarios
  return Math.min(ans1, ans2);
}
