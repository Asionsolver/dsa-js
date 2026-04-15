// 2515. Shortest Distance to Target String in a Circular Array

/**
Example 1:

Input: words = ["hello","i","am","leetcode","hello"], target = "hello", startIndex = 1
Output: 1
Explanation: We start from index 1 and can reach "hello" by
- moving 3 units to the right to reach index 4.
- moving 2 units to the left to reach index 4.
- moving 4 units to the right to reach index 0.
- moving 1 unit to the left to reach index 0.
The shortest distance to reach "hello" is 1.
Example 2:

Input: words = ["a","b","leetcode"], target = "leetcode", startIndex = 0
Output: 1
Explanation: We start from index 0 and can reach "leetcode" by
- moving 2 units to the right to reach index 2.
- moving 1 unit to the left to reach index 2.
The shortest distance to reach "leetcode" is 1.
Example 3:

Input: words = ["i","eat","leetcode"], target = "ate", startIndex = 0
Output: -1
Explanation: Since "ate" does not exist in words, we return -1.
*/

const words = ["hello", "i", "am", "leetcode", "hello"],
  target = "hello",
  startIndex = 1;
function closetTarget(
  words: string[],
  target: string,
  startIndex: number,
): number {
  const n = words.length;
  let minDistance = Infinity;

  for (let i = 0; i < n; i++) {
    // When we find the target string
    if (words[i] === target) {
      // Calculate the absolute distance if we weren't in a circular array
      const dist = Math.abs(i - startIndex);

      // The actual shortest distance is the minimum between going directly
      // or wrapping around the circular array
      const circularDist = Math.min(dist, n - dist);

      // Keep track of the minimum distance found so far
      minDistance = Math.min(minDistance, circularDist);
    }
  }

  // If minDistance is still Infinity, the target was never found
  return minDistance === Infinity ? -1 : minDistance;
}

console.log(closetTarget(words, target, startIndex));
