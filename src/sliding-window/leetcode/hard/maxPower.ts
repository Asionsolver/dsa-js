// 2528. Maximize the Minimum Powered City

/**
Example 1:

Input: stations = [1,2,4,5,0], r = 1, k = 2
Output: 5
Explanation: 
One of the optimal ways is to install both the power stations at city 1. 
So stations will become [1,4,4,5,0].
- City 0 is provided by 1 + 4 = 5 power stations.
- City 1 is provided by 1 + 4 + 4 = 9 power stations.
- City 2 is provided by 4 + 4 + 5 = 13 power stations.
- City 3 is provided by 5 + 4 = 9 power stations.
- City 4 is provided by 5 + 0 = 5 power stations.
So the minimum power of a city is 5.
Since it is not possible to obtain a larger power, we return 5.
Example 2:

Input: stations = [4,4,4,4], r = 0, k = 3
Output: 4
Explanation: 
It can be proved that we cannot make the minimum power of a city greater than 4.
*/

const stations = [4, 4, 4, 4],
  r = 0,
  k = 3;

function maxPower(stations: number[], r: number, k: number): number {
  const n = stations.length;

  // 1. Precompute the initial power for each city using a sliding window.
  // This avoids recalculating sums repeatedly in the binary search check.
  const initialPower = new Array(n).fill(0);
  let currentWindowSum = 0;

  // Initialize window for city 0: range [0, r]
  for (let i = 0; i < n && i <= r; i++) {
    currentWindowSum += stations[i];
  }
  initialPower[0] = currentWindowSum;

  // Slide the window for the rest of the cities
  for (let i = 1; i < n; i++) {
    // Remove the station that goes out of range on the left: index (i - 1 - r)
    if (i - r - 1 >= 0) {
      currentWindowSum -= stations[i - r - 1];
    }
    // Add the station that comes into range on the right: index (i + r)
    if (i + r < n) {
      currentWindowSum += stations[i + r];
    }
    initialPower[i] = currentWindowSum;
  }

  // 2. Binary Search function
  // Checks if it is possible to make all cities have at least 'minTarget' power
  // with at most 'k' additional stations.
  const canAchieve = (minTarget: number): boolean => {
    // Track stations added dynamically.
    // addedStations[i] = number of new stations built at city i.
    const addedStations = new Array(n).fill(0);
    let currentAddedSum = 0; // Sum of new stations covering the current city i
    let neededK = 0; // Total stations used so far

    for (let i = 0; i < n; i++) {
      // SLIDING WINDOW FOR NEW STATIONS:

      // 1. Remove effect of new stations that are now out of range (left side)
      if (i - r - 1 >= 0) {
        currentAddedSum -= addedStations[i - r - 1];
      }

      // 2. Add effect of new stations coming into range (right side)
      // These were added in previous iterations of this loop to fix previous deficits.
      if (i + r < n) {
        currentAddedSum += addedStations[i + r];
      }

      // Total power at city i = Initial Power + Power from new stations
      const totalPower = initialPower[i] + currentAddedSum;

      // If current city doesn't meet the target, we must build more stations
      if (totalPower < minTarget) {
        const deficit = minTarget - totalPower;
        neededK += deficit;

        if (neededK > k) return false;

        // Greedy approach: Place new stations as far right as possible
        // to cover city i and extend coverage to future cities.
        // The furthest valid index covering i is min(i + r, n - 1).
        const placeIdx = Math.min(i + r, n - 1);

        addedStations[placeIdx] += deficit;

        // Important: Since we just added stations at placeIdx, and placeIdx is within
        // the current window [i-r, i+r] (specifically it covers i), we update
        // the running sum immediately.
        currentAddedSum += deficit;
      }
    }
    return true;
  };

  // 3. Binary Search execution
  let left = 0;
  // Safe upper bound: sum of all existing stations + k.
  // Using reduce to sum might exceed 32-bit int, but JS Numbers are safe up to 2^53.
  let right = stations.reduce((sum, val) => sum + val, 0) + k;
  let ans = 0;

  while (left <= right) {
    // Use Math.floor to ensure integer operations
    const mid = Math.floor((left + right) / 2);

    if (canAchieve(mid)) {
      ans = mid; // mid is feasible, try higher
      left = mid + 1;
    } else {
      right = mid - 1; // mid is not feasible, try lower
    }
  }

  return ans;
}

console.log(maxPower(stations, r, k));
