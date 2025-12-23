// 1751. Maximum Number of Events That Can Be Attended II

/**
Example 1:



Input: events = [[1,2,4],[3,4,3],[2,3,1]], k = 2
Output: 7
Explanation: Choose the green events, 0 and 1 (0-indexed) for a total value of 4 + 3 = 7.
Example 2:



Input: events = [[1,2,4],[3,4,3],[2,3,10]], k = 2
Output: 10
Explanation: Choose event 2 for a total value of 10.
Notice that you cannot attend any other event as they overlap, and that you do not have to attend k events.
Example 3:



Input: events = [[1,1,1],[2,2,2],[3,3,3],[4,4,4]], k = 3
Output: 9
Explanation: Although the events do not overlap, you can only attend 3 events. Pick the highest valued three.
*/

const events = [
    [1, 2, 4],
    [3, 4, 3],
    [2, 3, 1],
  ],
  k = 2;

const maxValue = function (events: number[][], k: number) {
  const n = events.length;

  // Sort events by start day (ascending)
  events.sort((a, b) => a[0] - b[0]);

  // dp[i][j] stores the max value considering events from index 'i' onwards
  // with 'j' selections remaining.
  // Initialization: Create a standard 2D array filled with 0s.
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array(k + 1).fill(0)
  );

  // Iterate backwards from the last event to the first
  for (let i = n - 1; i >= 0; i--) {
    // Find the next available event index using Binary Search (Upper Bound)
    // We need the smallest index 'nextIndex' such that events[nextIndex].start > events[i].end
    let nextIndex = n; // Default to n (out of bounds) if no such event exists
    let left = i + 1;
    let right = n;

    while (left < right) {
      const mid = (left + right) >>> 1; // Bitwise shift for integer division
      if (events[mid][0] > events[i][1]) {
        nextIndex = mid;
        right = mid; // Try to find an earlier event
      } else {
        left = mid + 1; // Current mid overlaps, look to the right
      }
    }

    // At the end of the loop, 'left' (or 'right') is the answer because nextIndex was updated
    // However, to be safe with upper_bound logic:
    // If the loop finished and we found nothing, left == n.
    nextIndex = left;

    // Calculate DP states for remaining counts 1 to k
    for (let j = 1; j <= k; j++) {
      const value = events[i][2];

      // Option 1: Skip the current event 'i'
      // Value is the result of starting from i+1 with the same 'j' count
      const skip = dp[i + 1][j];

      // Option 2: Take the current event 'i'
      // Value is current event value + result from next valid event with j-1 count
      const take = value + dp[nextIndex][j - 1];

      dp[i][j] = Math.max(skip, take);
    }
  }

  // The answer is the max value starting from index 0 with k allowed events
  return dp[0][k];
};

console.log(maxValue(events, k));
