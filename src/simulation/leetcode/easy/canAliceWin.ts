// 3360. Stone Removal Game

/**
Alice and Bob are playing a game where they take turns removing stones from a pile, with Alice going first.

Alice starts by removing exactly 10 stones on her first turn.
For each subsequent turn, each player removes exactly 1 fewer stone than the previous opponent.
The player who cannot make a move loses the game.

Given a positive integer n, return true if Alice wins the game and false otherwise.


*/

/**
Example 1:

Input: n = 12

Output: true

Explanation:

Alice removes 10 stones on her first turn, leaving 2 stones for Bob.
Bob cannot remove 9 stones, so Alice wins.
Example 2:

Input: n = 1

Output: false

Explanation:

Alice cannot remove 10 stones, so Alice loses.
*/

/**
Constraints:

1 <= n <= 50
*/

// Brute force approach to determine if Alice can win the game given n stones.
function canAliceWin(n: number): boolean {
  // Start with 10 stones to remove on Alice's first turn.
  let stonesToRemove = 10;

  // Track whose turn it currently is (true for Alice, false for Bob).
  let isAliceTurn = true;

  // Continue playing while enough stones remain for the current turn.
  while (n >= stonesToRemove) {
    // Subtract the required stones from the pile.
    n -= stonesToRemove;

    // Reduce the number of stones to remove by 1 for the next turn.
    stonesToRemove -= 1;

    // Switch turns between Alice and Bob.
    isAliceTurn = !isAliceTurn;
  }

  // If the loop stops on Bob's turn, Bob cannot move, so Alice wins.
  return !isAliceTurn;
}

// Example usage:
console.log(canAliceWin(12)); // Output: true
console.log(canAliceWin(1)); // Output: false
