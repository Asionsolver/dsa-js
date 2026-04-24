// 2833. Furthest Point From Origin

/**

Example 1:

Input: moves = "L_RL__R"
Output: 3
Explanation: The furthest point we can reach from the origin 0 is point -3 through the following sequence of moves "LLRLLLR".
Example 2:

Input: moves = "_R__LL_"
Output: 5
Explanation: The furthest point we can reach from the origin 0 is point -5 through the following sequence of moves "LRLLLLL".
Example 3:

Input: moves = "_______"
Output: 7
Explanation: The furthest point we can reach from the origin 0 is point 7 through the following sequence of moves "RRRRRRR".
*/

function furthestDistanceFromOrigin(moves: string): number {
  let leftCount = 0;
  let rightCount = 0;
  let underscoreCount = 0;

  // Count the occurrences of each character
  for (const char of moves) {
    if (char === "L") {
      leftCount++;
    } else if (char === "R") {
      rightCount++;
    } else {
      underscoreCount++;
    }
  }

  // The maximum distance is the absolute difference between 'L' and 'R' moves
  // plus the total number of wildcard '_' moves.
  return Math.abs(leftCount - rightCount) + underscoreCount;
}

// Test cases
console.log(furthestDistanceFromOrigin("L_RL__R")); // Output: 3
console.log(furthestDistanceFromOrigin("_R__LL_")); // Output: 5
console.log(furthestDistanceFromOrigin("_______")); // Output: 7
