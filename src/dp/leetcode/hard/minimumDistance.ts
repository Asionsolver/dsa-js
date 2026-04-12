// 1320. Minimum Distance to Type a Word Using Two Fingers

/**
Example 1:

Input: word = "CAKE"
Output: 3
Explanation: Using two fingers, one optimal way to type "CAKE" is: 
Finger 1 on letter 'C' -> cost = 0 
Finger 1 on letter 'A' -> cost = Distance from letter 'C' to letter 'A' = 2 
Finger 2 on letter 'K' -> cost = 0 
Finger 2 on letter 'E' -> cost = Distance from letter 'K' to letter 'E' = 1 
Total distance = 3
Example 2:

Input: word = "HAPPY"
Output: 6
Explanation: Using two fingers, one optimal way to type "HAPPY" is:
Finger 1 on letter 'H' -> cost = 0
Finger 1 on letter 'A' -> cost = Distance from letter 'H' to letter 'A' = 2
Finger 2 on letter 'P' -> cost = 0
Finger 2 on letter 'P' -> cost = Distance from letter 'P' to letter 'P' = 0
Finger 1 on letter 'Y' -> cost = Distance from letter 'A' to letter 'Y' = 4
Total distance = 6
*/

const word = "HAPPY";
const minimumDistance = function (word: string): number {
  // Helper function to calculate the Manhattan distance between two characters
  const getDistance = (c1: number, c2: number): number => {
    const row1 = Math.floor(c1 / 6);
    const col1 = c1 % 6;
    const row2 = Math.floor(c2 / 6);
    const col2 = c2 % 6;
    return Math.abs(row1 - row2) + Math.abs(col1 - col2);
  };

  // dp[other] represents the min distance where the other finger is at character `other`.
  // Index 26 represents an unplaced finger (initial free state).
  let dp = new Array(27).fill(Infinity);
  dp[26] = 0;

  for (let i = 0; i < word.length - 1; i++) {
    // Converting characters to 0-25 indices ('A' = 0, 'B' = 1, ..., 'Z' = 25)
    const curr = word.charCodeAt(i) - 65;
    const nxt = word.charCodeAt(i + 1) - 65;

    const next_dp = new Array(27).fill(Infinity);
    const d1 = getDistance(curr, nxt);

    for (let other = 0; other <= 26; other++) {
      if (dp[other] === Infinity) continue;

      // Choice 1: Move the finger that is currently on `curr` to `nxt`
      // The `other` finger stays at its place
      if (dp[other] + d1 < next_dp[other]) {
        next_dp[other] = dp[other] + d1;
      }

      // Choice 2: Move the `other` finger to `nxt`
      // The finger on `curr` becomes the new `other` finger
      const d2 = other === 26 ? 0 : getDistance(other, nxt);
      if (dp[other] + d2 < next_dp[curr]) {
        next_dp[curr] = dp[other] + d2;
      }
    }

    // Move to the next sequence state
    dp = next_dp;
  }

  // Return the minimum distance possible across all tracked placements for the last step
  return Math.min(...dp);
};

console.log(minimumDistance(word));
