// 2410. Maximum Matching of Players With Trainers

/**
Example 1:

Input: players = [4,7,9], trainers = [8,2,5,8]
Output: 2
Explanation:
One of the ways we can form two matchings is as follows:
- players[0] can be matched with trainers[0] since 4 <= 8.
- players[1] can be matched with trainers[3] since 7 <= 8.
It can be proven that 2 is the maximum number of matchings that can be formed.
Example 2:

Input: players = [1,1,1], trainers = [10]
Output: 1
Explanation:
The trainer can be matched with any of the 3 players.
Each player can only be matched with one trainer, so the maximum answer is 1.
*/

const players = [4, 7, 9];
const trainers = [8, 2, 5, 8];
const matchPlayersAndTrainers = function (
  players: number[],
  trainers: number[],
): number {
  // Sort both arrays in ascending order
  players.sort((a, b) => a - b);
  trainers.sort((a, b) => a - b);

  let i = 0; // Pointer for players
  let j = 0; // Pointer for trainers

  // Iterate while there are players and trainers left to check
  while (i < players.length && j < trainers.length) {
    // If the current trainer can handle the current player
    if (players[i] <= trainers[j]) {
      i++; // Move to the next player (this acts as our match count as well)
    }
    // Always move to the next trainer whether they were matched or skipped
    j++;
  }

  // 'i' represents the number of players successfully matched
  return i;
};

console.log(matchPlayersAndTrainers(players, trainers));
