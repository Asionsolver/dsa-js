// 1518. Water Bottles

/**
Example 1:


Input: numBottles = 9, numExchange = 3
Output: 13
Explanation: You can exchange 3 empty bottles to get 1 full water bottle.
Number of water bottles you can drink: 9 + 3 + 1 = 13.
Example 2:


Input: numBottles = 15, numExchange = 4
Output: 19
Explanation: You can exchange 4 empty bottles to get 1 full water bottle. 
Number of water bottles you can drink: 15 + 3 + 1 = 19.
*/

function numWaterBottles(numBottles: number, numExchange: number): number {
  let totalDrank = numBottles;
  let emptyBottles = numBottles;

  while (emptyBottles >= numExchange) {
    // Exchange empty bottles for new full bottles
    let exchangedFullBottles = Math.floor(emptyBottles / numExchange);

    // Add the new full bottles to the total drank count
    totalDrank += exchangedFullBottles;

    // Calculate the remaining empty bottles:
    // (empty bottles that couldn't be exchanged) + (the newly drank bottles)
    emptyBottles = (emptyBottles % numExchange) + exchangedFullBottles;
  }

  return totalDrank;
}

// Example usage:
console.log(numWaterBottles(9, 3)); // Output: 13
console.log(numWaterBottles(15, 4)); // Output: 19
