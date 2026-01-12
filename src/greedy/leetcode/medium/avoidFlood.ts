// 1488. Avoid Flood in The City

/**
Example 1:

Input: rains = [1,2,3,4]
Output: [-1,-1,-1,-1]
Explanation: After the first day full lakes are [1]
After the second day full lakes are [1,2]
After the third day full lakes are [1,2,3]
After the fourth day full lakes are [1,2,3,4]
There's no day to dry any lake and there is no flood in any lake.
Example 2:

Input: rains = [1,2,0,0,2,1]
Output: [-1,-1,2,1,-1,-1]
Explanation: After the first day full lakes are [1]
After the second day full lakes are [1,2]
After the third day, we dry lake 2. Full lakes are [1]
After the fourth day, we dry lake 1. There is no full lakes.
After the fifth day, full lakes are [2].
After the sixth day, full lakes are [1,2].
It is easy that this scenario is flood-free. [-1,-1,1,2,-1,-1] is another acceptable scenario.
Example 3:

Input: rains = [1,2,0,1,2]
Output: []
Explanation: After the second day, full lakes are  [1,2]. We have to dry one lake in the third day.
After that, it will rain over lakes [1,2]. It's easy to prove that no matter which lake you choose to dry in the 3rd day, the other one will flood.
*/
const rains = [1, 2, 3, 4];
const avoidFlood = function (rains: number[]): number[] {
  const n = rains.length;
  const ans: number[] = new Array(n).fill(1); // Default action for dry days is drying lake 1
  const fullLakes = new Map<number, number>(); // Stores lakeId -> dayIndex (when it rained)
  const dryDays: number[] = []; // Stores indices of days with no rain

  for (let i = 0; i < n; i++) {
    const lake = rains[i];

    if (lake > 0) {
      ans[i] = -1; // Standard requirement for rainy days

      if (fullLakes.has(lake)) {
        // The lake is already full. We must have dried it *after* the last time it rained.
        const lastRainIndex = fullLakes.get(lake)!;

        // Find the smallest day index in dryDays that is > lastRainIndex
        const dryDayIndex = findEarliestValidDryDay(dryDays, lastRainIndex);

        if (dryDayIndex === -1) {
          // No suitable dry day found, flood is inevitable
          return [];
        }

        const dayToDry = dryDays[dryDayIndex];

        // Assign the drying task to that day
        ans[dayToDry] = lake;

        // Remove the used dry day from available options
        dryDays.splice(dryDayIndex, 1);

        // Update the last rain index for this lake to today
        fullLakes.set(lake, i);
      } else {
        // Lake was empty, now it's full
        fullLakes.set(lake, i);
      }
    } else {
      // It's a dry day, store index for potential future use
      dryDays.push(i);
    }
  }

  return ans;
};

// Binary search to find the index in the sorted array 'arr'
// such that arr[index] is the smallest value strictly greater than 'target'.
const findEarliestValidDryDay = function (
  arr: number[],
  target: number
): number {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] > target) {
      result = mid; // Found a candidate, try to find an earlier one
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return result;
};

console.log(avoidFlood(rains));
