// 1482. Minimum Number of Days to Make m Bouquets

/**
Example 1:

Input: bloomDay = [1,10,3,10,2], m = 3, k = 1
Output: 3
Explanation: Let us see what happened in the first three days. x means flower bloomed and _ means flower did not bloom in the garden.
We need 3 bouquets each should contain 1 flower.
After day 1: [x, _, _, _, _]   // we can only make one bouquet.
After day 2: [x, _, _, _, x]   // we can only make two bouquets.
After day 3: [x, _, x, _, x]   // we can make 3 bouquets. The answer is 3.
Example 2:

Input: bloomDay = [1,10,3,10,2], m = 3, k = 2
Output: -1
Explanation: We need 3 bouquets each has 2 flowers, that means we need 6 flowers. We only have 5 flowers so it is impossible to get the needed bouquets and we return -1.
Example 3:

Input: bloomDay = [7,7,7,7,12,7,7], m = 2, k = 3
Output: 12
Explanation: We need 2 bouquets each should have 3 flowers.
Here is the garden after the 7 and 12 days:
After day 7: [x, x, x, x, _, x, x]
We can make one bouquet of the first three flowers that bloomed. We cannot make another bouquet from the last three flowers that bloomed because they are not adjacent.
After day 12: [x, x, x, x, x, x, x]
It is obvious that we can make two bouquets in different ways.
*/

function minDays(bloomDay: number[], m: number, k: number): number {
  const n = bloomDay.length;

  // If the total flowers required is more than we have, it's impossible.
  // (Note: Safe against JS MAX_SAFE_INTEGER bounds since 10^6 * 10^5 = 10^11 < 9*10^15)
  if (m * k > n) {
    return -1;
  }

  // Find the boundary days for the binary search.
  // Doing a loop manually avoids "Maximum call stack size exceeded" errors
  // that might happen with `Math.min(...bloomDay)` on very large arrays.
  let left = bloomDay[0];
  let right = bloomDay[0];

  for (let i = 1; i < n; i++) {
    if (bloomDay[i] < left) left = bloomDay[i];
    if (bloomDay[i] > right) right = bloomDay[i];
  }

  let ans = -1;

  // Binary Search
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    let bouquets = 0;
    let flowers = 0;

    for (let i = 0; i < n; i++) {
      if (bloomDay[i] <= mid) {
        flowers++;
        // If we've gathered enough adjacent flowers to form a bouquet
        if (flowers === k) {
          bouquets++;
          flowers = 0; // Reset for the next bouquet

          // Small optimization: Break early if we've fulfilled the requirement
          if (bouquets === m) break;
        }
      } else {
        // If the flower hasn't bloomed, the sequence of adjacent flowers is broken
        flowers = 0;
      }
    }

    if (bouquets >= m) {
      ans = mid; // `mid` works, store the answer
      right = mid - 1; // Try to find a smaller day
    } else {
      left = mid + 1; // Need more days for more flowers to bloom
    }
  }

  return ans;
}

// Example usage:
console.log(minDays([1, 10, 3, 10, 2], 3, 1)); // Output: 3
console.log(minDays([1, 10, 3, 10, 2], 3, 2)); // Output: -1
console.log(minDays([7, 7, 7, 7, 12, 7, 7], 2, 3)); // Output: 12
