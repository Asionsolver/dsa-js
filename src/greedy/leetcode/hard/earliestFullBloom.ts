// 2136. Earliest Possible Day of Full Bloom

/**
Example 1:


Input: plantTime = [1,4,3], growTime = [2,3,1]
Output: 9
Explanation: The grayed out pots represent planting days, colored pots represent growing days, and the flower represents the day it blooms.
One optimal way is:
On day 0, plant the 0th seed. The seed grows for 2 full days and blooms on day 3.
On days 1, 2, 3, and 4, plant the 1st seed. The seed grows for 3 full days and blooms on day 8.
On days 5, 6, and 7, plant the 2nd seed. The seed grows for 1 full day and blooms on day 9.
Thus, on day 9, all the seeds are blooming.
Example 2:


Input: plantTime = [1,2,3,2], growTime = [2,1,2,1]
Output: 9
Explanation: The grayed out pots represent planting days, colored pots represent growing days, and the flower represents the day it blooms.
One optimal way is:
On day 1, plant the 0th seed. The seed grows for 2 full days and blooms on day 4.
On days 0 and 3, plant the 1st seed. The seed grows for 1 full day and blooms on day 5.
On days 2, 4, and 5, plant the 2nd seed. The seed grows for 2 full days and blooms on day 8.
On days 6 and 7, plant the 3rd seed. The seed grows for 1 full day and blooms on day 9.
Thus, on day 9, all the seeds are blooming.
Example 3:

Input: plantTime = [1], growTime = [1]
Output: 2
Explanation: On day 0, plant the 0th seed. The seed grows for 1 full day and blooms on day 2.
Thus, on day 2, all the seeds are blooming.
*/

function earliestFullBloom(plantTime: number[], growTime: number[]): number {
  let maxG = 0;
  const n = growTime.length;

  // Find the maximum grow time to dynamically size our bucket
  for (let i = 0; i < n; i++) {
    if (growTime[i] > maxG) {
      maxG = growTime[i];
    }
  }

  // Group and accumulate plant times by their grow times
  // Using Float64Array to cleanly avoid any 32-bit signed integer overflow
  const plantSum = new Float64Array(maxG + 1);
  for (let i = 0; i < n; i++) {
    plantSum[growTime[i]] += plantTime[i];
  }

  let currentPlantTime = 0;
  let maxBloomDay = 0;

  // Iterate from the longest grow time to the shortest
  for (let g = maxG; g >= 1; g--) {
    if (plantSum[g] > 0) {
      // Update the day we finish planting these grouped seeds
      currentPlantTime += plantSum[g];

      // Check if their bloom day extends the maximum recorded bloom day
      const bloomDay = currentPlantTime + g;
      if (bloomDay > maxBloomDay) {
        maxBloomDay = bloomDay;
      }
    }
  }

  return maxBloomDay;
}

// Example usage:
console.log(earliestFullBloom([1, 4, 3], [2, 3, 1])); // Output: 9
console.log(earliestFullBloom([1, 2, 3, 2], [2, 1, 2, 1])); // Output: 9
console.log(earliestFullBloom([1], [1])); // Output: 2
