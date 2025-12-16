// 2147. Number of Ways to Divide a Long Corridor

/**

Example 1:


Input: corridor = "SSPPSPS"
Output: 3
Explanation: There are 3 different ways to divide the corridor.
The black bars in the above image indicate the two room dividers already installed.
Note that in each of the ways, each section has exactly two seats.
Example 2:


Input: corridor = "PPSPSP"
Output: 1
Explanation: There is only 1 way to divide the corridor, by not installing any additional dividers.
Installing any would create some section that does not have exactly two seats.
Example 3:


Input: corridor = "S"
Output: 0
Explanation: There is no way to divide the corridor because there will always be a section that does not have exactly two seats.
 

*/
const corridor = "SSPPSPS";
const numberOfWays = function (corridor: string) {
  const MOD = 1_000_000_007;
  let seats = 0;
  let previousSeatIndex = -1;
  let result = 1;

  for (let i = 0; i < corridor.length; i++) {
    if (corridor[i] === "S") {
      seats++;

      // We only care about the gap between the end of one pair
      // and the start of the next pair.
      // This happens when the current seat count is odd and > 2
      // (i.e., the 3rd seat, 5th seat, etc.)
      if (seats > 2 && seats % 2 === 1) {
        // The number of ways to place a divider between the previous pair
        // and this new pair is equal to the distance between indices.
        const waysToDivide = i - previousSeatIndex;

        // Multiply result by the number of choices for this specific gap
        result = (result * waysToDivide) % MOD;
      }

      // Update the index of the most recently seen seat
      previousSeatIndex = i;
    }
  }

  // If there are no seats, or an odd number of seats, valid division is impossible
  if (seats === 0 || seats % 2 !== 0) {
    return 0;
  }

  return result;
};

console.log(numberOfWays(corridor));
