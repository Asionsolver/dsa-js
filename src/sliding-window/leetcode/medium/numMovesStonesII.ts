// 1040. Moving Stones Until Consecutive II

/**
Example 1:

Input: stones = [7,4,9]
Output: [1,2]
Explanation: We can move 4 -> 8 for one move to finish the game.
Or, we can move 9 -> 5, 4 -> 6 for two moves to finish the game.
Example 2:

Input: stones = [6,5,4,3,10]
Output: [2,3]
Explanation: We can move 3 -> 8 then 10 -> 7 to finish the game.
Or, we can move 3 -> 7, 4 -> 8, 5 -> 9 to finish the game.
Notice we cannot move 10 -> 2 to finish the game, because that would be an illegal move.
*/

function numMovesStonesII(stones: number[]): number[] {
  // Sort stones in ascending order to easily apply the sliding window approach
  stones.sort((a, b) => a - b);
  const n = stones.length;

  // Calculate the Maximum Moves
  // We choose to abandon either the left boundary gap or the right boundary gap.
  const maxMoves = Math.max(
    stones[n - 1] - stones[1] - n + 2, // abandoning stones[0] to stones[1] space
    stones[n - 2] - stones[0] - n + 2, // abandoning stones[n-2] to stones[n-1] space
  );

  // Calculate the Minimum Moves using a Sliding Window
  let minMoves = n;
  let i = 0;

  for (let j = 0; j < n; j++) {
    // Enforce the sliding window range to strictly be less than 'n'
    while (stones[j] - stones[i] >= n) {
      i++;
    }

    // Edge Case: n-1 stones are perfectly consecutive
    // Example: stones =[1, 2, 3, 4, 10], where n = 5
    if (j - i === n - 2 && stones[j] - stones[i] === n - 2) {
      minMoves = Math.min(minMoves, 2);
    } else {
      // General Case: n minus the number of stones already established within the 'n' range window
      minMoves = Math.min(minMoves, n - (j - i + 1));
    }
  }

  return [minMoves, maxMoves];
}

// Example usage:
const stones1 = [7, 4, 9];
console.log(numMovesStonesII(stones1)); // Output: [1, 2]

const stones2 = [6, 5, 4, 3, 10];
console.log(numMovesStonesII(stones2)); // Output: [2, 3]
