// 2029. Stone Game IX

/**
Alice and Bob continue their games with stones. There is a row of n stones, and each stone has an associated value. You are given an integer array stones, where stones[i] is the value of the ith stone.

Alice and Bob take turns, with Alice starting first. On each turn, the player may remove any stone from stones. The player who removes a stone loses if the sum of the values of all removed stones is divisible by 3. Bob will win automatically if there are no remaining stones (even if it is Alice's turn).

Assuming both players play optimally, return true if Alice wins and false if Bob wins.
*/

/**
Example 1:

Input: stones = [2,1]
Output: true
Explanation: The game will be played as follows:
- Turn 1: Alice can remove either stone.
- Turn 2: Bob removes the remaining stone. 
The sum of the removed stones is 1 + 2 = 3 and is divisible by 3. Therefore, Bob loses and Alice wins the game.
Example 2:

Input: stones = [2]
Output: false
Explanation: Alice will remove the only stone, and the sum of the values on the removed stones is 2. 
Since all the stones are removed and the sum of values is not divisible by 3, Bob wins the game.
Example 3:

Input: stones = [5,1,2,4,3]
Output: false
Explanation: Bob will always win. One possible way for Bob to win is shown below:
- Turn 1: Alice can remove the second stone with value 1. Sum of removed stones = 1.
- Turn 2: Bob removes the fifth stone with value 3. Sum of removed stones = 1 + 3 = 4.
- Turn 3: Alices removes the fourth stone with value 4. Sum of removed stones = 1 + 3 + 4 = 8.
- Turn 4: Bob removes the third stone with value 2. Sum of removed stones = 1 + 3 + 4 + 2 = 10.
- Turn 5: Alice removes the first stone with value 5. Sum of removed stones = 1 + 3 + 4 + 2 + 5 = 15.
Alice loses the game because the sum of the removed stones (15) is divisible by 3. Bob wins the game.
*/

/**
Constraints:

1 <= stones.length <= 105
1 <= stones[i] <= 104
*/

function stoneGameIX(stones: number[]): boolean {
  let cnt0 = 0;
  let cnt1 = 0;
  let cnt2 = 0;

  // Count remainders
  for (const stone of stones) {
    const remainder = stone % 3;
    if (remainder === 0) cnt0++;
    else if (remainder === 1) cnt1++;
    else cnt2++;
  }

  // If stones with remainder 0 are even, Alice wins if both 1s and 2s are available.
  // She can choose the path that makes Bob lose.
  if (cnt0 % 2 === 0) {
    return cnt1 > 0 && cnt2 > 0;
  }

  // If stones with remainder 0 are odd, Alice wins only if the difference
  // between 1s and 2s is greater than 2.
  return Math.abs(cnt1 - cnt2) > 2;
}

// Example usage:
console.log(stoneGameIX([2, 1])); // Output: true
console.log(stoneGameIX([2])); // Output: false
console.log(stoneGameIX([5, 1, 2, 4, 3])); // Output: false
