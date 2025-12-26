// 3100. Water Bottles II

/**
Example 1:


Input: numBottles = 13, numExchange = 6
Output: 15
Explanation: The table above shows the number of full water bottles, empty water bottles, the value of numExchange, and the number of bottles drunk.
Example 2:


Input: numBottles = 10, numExchange = 3
Output: 13
Explanation: The table above shows the number of full water bottles, empty water bottles, the value of numExchange, and the number of bottles drunk.
*/

const numBottles = 13,
  numExchange = 6;

const maxBottlesDrunk = function (numBottles: number, numExchange: number) {
  // Initially, we drink all the full bottles we have.
  let totalDrunk = numBottles;
  let emptyBottles = numBottles;

  // We continue exchanging as long as we have enough empty bottles
  // to meet the current exchange rate.
  while (emptyBottles >= numExchange) {
    // 1. Pay the cost (numExchange) using empty bottles
    emptyBottles -= numExchange;

    // 2. The cost of the next exchange increases by 1
    numExchange++;

    // 3. We receive 1 full bottle from the exchange.
    // We drink it immediately:
    totalDrunk++;

    // 4. That drunk bottle becomes an empty bottle
    emptyBottles++;
  }

  return totalDrunk;
};

console.log(maxBottlesDrunk(numBottles, numExchange));
