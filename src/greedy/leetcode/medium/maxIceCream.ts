// 1833. Maximum Ice Cream Bars

/**
Example 1:

Input: costs = [1,3,2,4,1], coins = 7
Output: 4
Explanation: The boy can buy ice cream bars at indices 0,1,2,4 for a total price of 1 + 3 + 2 + 1 = 7.
Example 2:

Input: costs = [10,6,8,7,7,8], coins = 5
Output: 0
Explanation: The boy cannot afford any of the ice cream bars.
Example 3:

Input: costs = [1,6,3,1,2,5], coins = 20
Output: 6
Explanation: The boy can buy all the ice cream bars for a total price of 1 + 6 + 3 + 1 + 2 + 5 = 18.
*/

function maxIceCream(costs: number[], coins: number): number {
  // Step 1: Find the maximum cost in the array to determine the size of our frequency array
  let maxCost = 0;
  for (const cost of costs) {
    if (cost > maxCost) {
      maxCost = cost;
    }
  }

  // Step 2: Create a frequency array (counting array)
  // freq[i] will store the number of ice cream bars that cost exactly 'i' coins.
  const freq = new Int32Array(maxCost + 1);
  for (const cost of costs) {
    freq[cost]++;
  }

  let iceCreamCount = 0;

  // Step 3: Iterate through the frequency array from the cheapest (1) to the most expensive (maxCost)
  for (let cost = 1; cost <= maxCost; cost++) {
    // If there are no ice cream bars at this cost, skip
    if (freq[cost] === 0) {
      continue;
    }

    // If we cannot afford even one ice cream bar at this price, we must stop.
    // Since we are iterating in increasing order of cost, we won't be able to afford any remaining ones.
    if (coins < cost) {
      break;
    }

    // Calculate the maximum number of ice cream bars we can buy at this cost
    const maxBuyable = Math.floor(coins / cost);
    const actualBuy = Math.min(freq[cost], maxBuyable);

    // Update counts and available coins
    iceCreamCount += actualBuy;
    coins -= actualBuy * cost;
  }

  return iceCreamCount;
}

// Example usage:
console.log(maxIceCream([1, 3, 2, 4, 1], 7)); // Output: 4
console.log(maxIceCream([10, 6, 8, 7, 7, 8], 5)); // Output: 0
console.log(maxIceCream([1, 6, 3, 1, 2, 5], 20)); // Output: 6
