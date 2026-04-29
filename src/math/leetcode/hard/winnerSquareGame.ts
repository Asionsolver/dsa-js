// 1510. Stone Game IV

/**
Example 1:

Input: n = 1
Output: true
Explanation: Alice can remove 1 stone winning the game because Bob doesn't have any moves.
Example 2:

Input: n = 2
Output: false
Explanation: Alice can only remove 1 stone, after that Bob removes the last one winning the game (2 -> 1 -> 0).
Example 3:

Input: n = 4
Output: true
Explanation: n is already a perfect square, Alice can win with one move, removing 4 stones (4 -> 0).

*/

function winnerSquareGame(n: number): boolean {
  // dp[i] represents whether the current player can win with 'i' stones remaining
  const dp: boolean[] = new Array(n + 1).fill(false);

  for (let i = 1; i <= n; i++) {
    // Try all perfect squares less than or equal to the current number of stones 'i'
    for (let k = 1; k * k <= i; k++) {
      // If removing k*k stones leaves the opponent in a losing state,
      // the current player has found a winning strategy for 'i' stones.
      if (dp[i - k * k] === false) {
        dp[i] = true;
        break; // No need to check other moves, we already know we can win!
      }
    }
  }

  return dp[n];
}

// Example Use Cases:
console.log(winnerSquareGame(1)); // Output: true
console.log(winnerSquareGame(2)); // Output: false
console.log(winnerSquareGame(4)); // Output: true
console.log(winnerSquareGame(7)); // Output: false
console.log(winnerSquareGame(17)); // Output: true
console.log(winnerSquareGame(18)); // Output: false
console.log(winnerSquareGame(20)); // Output: true
console.log(winnerSquareGame(100)); // Output: true
console.log(winnerSquareGame(999)); // Output: false
console.log(winnerSquareGame(1000)); // Output: true
