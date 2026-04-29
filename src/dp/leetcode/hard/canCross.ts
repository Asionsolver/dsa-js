// 403. Frog Jump

/**
Example 1:

Input: stones = [0,1,3,5,6,8,12,17]
Output: true
Explanation: The frog can jump to the last stone by jumping 1 unit to the 2nd stone, then 2 units to the 3rd stone, then 2 units to the 4th stone, then 3 units to the 6th stone, 4 units to the 7th stone, and 5 units to the 8th stone.
Example 2:

Input: stones = [0,1,2,3,4,8,9,11]
Output: false
Explanation: There is no way to jump to the last stone as the gap between the 5th and 6th stone is too large.
*/

function canCross(stones: number[]): boolean {
  const n = stones.length;

  // The frog starts on stones[0] = 0.
  // If there's only 1 stone, it's already at the end.
  if (n === 1) return true;

  // The first jump must be exactly 1 unit
  if (stones[1] !== 1) return false;

  // Map to quickly look up the index of a given stone's position
  const stoneToIndex = new Map<number, number>();
  for (let i = 0; i < n; i++) {
    // Optimization: The max jump size at index i is i.
    // If the gap between two stones exceeds the max possible jump size, it's impossible.
    if (i > 0 && stones[i] - stones[i - 1] > i) {
      return false;
    }
    stoneToIndex.set(stones[i], i);
  }

  // dp[i][k] will be 1 if stone i can be reached with a jump of size k
  // We use Uint8Array instead of boolean[][] or Sets for memory & performance efficiency
  const dp: Uint8Array[] = Array.from(
    { length: n },
    () => new Uint8Array(n + 1),
  );

  // Base case: The frog is on the first stone, having made a virtual jump of size 0
  dp[0][0] = 1;

  for (let i = 0; i < n; i++) {
    // Because the max jump length to reach stone i is i, we only need to check k up to i
    for (let k = 0; k <= i; k++) {
      if (dp[i][k] === 1) {
        // The frog can try to jump k - 1, k, or k + 1 units forward
        for (let step = k - 1; step <= k + 1; step++) {
          if (step > 0) {
            const target = stones[i] + step;
            const targetIndex = stoneToIndex.get(target);

            if (targetIndex !== undefined) {
              // If the target jump connects exactly to the last stone, we made it
              if (targetIndex === n - 1) return true;

              // Otherwise, mark the state as reachable
              dp[targetIndex][step] = 1;
            }
          }
        }
      }
    }
  }

  // Handled in the loop via early exit. If the loop completes, the last stone wasn't reached.
  return false;
}
