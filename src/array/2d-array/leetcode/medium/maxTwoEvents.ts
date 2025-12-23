// 2054. Two Best Non-Overlapping Events

/**
Example 1:


Input: events = [[1,3,2],[4,5,2],[2,4,3]]
Output: 4
Explanation: Choose the green events, 0 and 1 for a sum of 2 + 2 = 4.
Example 2:

Example 1 Diagram
Input: events = [[1,3,2],[4,5,2],[1,5,5]]
Output: 5
Explanation: Choose event 2 for a sum of 5.
Example 3:


Input: events = [[1,5,3],[1,5,1],[6,6,5]]
Output: 8
Explanation: Choose events 0 and 2 for a sum of 3 + 5 = 8.
*/
const events = [
  [1, 3, 2],
  [4, 5, 2],
  [2, 4, 3],
];

const maxTwoEvents = function (events: number[][]) {
  const n = events.length;

  // 1. Sort events by start time (ascending)
  // Time Complexity: O(N log N)
  events.sort((a, b) => a[0] - b[0]);

  // 2. Create a Suffix Max Array
  // suffixMax[i] will store the maximum value of any event from index i to n-1
  // Time Complexity: O(N)
  const suffixMax = new Array(n);
  suffixMax[n - 1] = events[n - 1][2];

  for (let i = n - 2; i >= 0; i--) {
    suffixMax[i] = Math.max(events[i][2], suffixMax[i + 1]);
  }

  let maxSum = 0;

  // 3. Iterate through each event and find the best compatible second event
  // Time Complexity: O(N log N) due to binary search inside the loop
  for (let i = 0; i < n; i++) {
    const [start, end, value] = events[i];

    // Case A: Pick only this single event (compare against current max)
    maxSum = Math.max(maxSum, value);

    // Case B: Pick this event + best non-overlapping future event
    // We need to find the smallest index 'k' such that events[k].start > end
    let left = i + 1;
    let right = n - 1;
    let nextEventIndex = -1;

    while (left <= right) {
      const mid = (left + right) >>> 1;
      if (events[mid][0] > end) {
        nextEventIndex = mid;
        right = mid - 1; // Try to find an earlier valid event
      } else {
        left = mid + 1; // Current mid starts too early, look to the right
      }
    }

    // If a valid next event exists, add its value (retrieved from suffixMax)
    if (nextEventIndex !== -1) {
      maxSum = Math.max(maxSum, value + suffixMax[nextEventIndex]);
    }
  }

  return maxSum;
};

console.log(maxTwoEvents(events));
