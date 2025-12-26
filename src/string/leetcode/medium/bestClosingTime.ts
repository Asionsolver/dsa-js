// 2483. Minimum Penalty for a Shop

/**
Example 1:

Input: customers = "YYNY"
Output: 2
Explanation: 
- Closing the shop at the 0th hour incurs in 1+1+0+1 = 3 penalty.
- Closing the shop at the 1st hour incurs in 0+1+0+1 = 2 penalty.
- Closing the shop at the 2nd hour incurs in 0+0+0+1 = 1 penalty.
- Closing the shop at the 3rd hour incurs in 0+0+1+1 = 2 penalty.
- Closing the shop at the 4th hour incurs in 0+0+1+0 = 1 penalty.
Closing the shop at 2nd or 4th hour gives a minimum penalty. Since 2 is earlier, the optimal closing time is 2.
Example 2:

Input: customers = "NNNNN"
Output: 0
Explanation: It is best to close the shop at the 0th hour as no customers arrive.
Example 3:

Input: customers = "YYYY"
Output: 4
Explanation: It is best to close the shop at the 4th hour as customers arrive at each hour.
*/

const customers = "NNNNN";

const bestClosingTime = function (customers: string) {
  // Current penalty relative to closing at hour 0
  let currentPenalty = 0;

  // The minimum relative penalty found so far
  let minPenalty = 0;

  // The hour associated with the minPenalty
  let bestHour = 0;

  for (let i = 0; i < customers.length; i++) {
    const char = customers[i];

    if (char === "Y") {
      // If we open at this hour (move closing time to i+1),
      // we satisfy a customer. Penalty goes down.
      currentPenalty--;
    } else {
      // If we open at this hour (move closing time to i+1),
      // we are open with no customers. Penalty goes up.
      currentPenalty++;
    }

    // If the new penalty is strictly better (lower) than the best found so far,
    // update the best hour.
    // Note: We use strictly less (<) because if penalties are equal,
    // we want the earliest hour.
    if (currentPenalty < minPenalty) {
      minPenalty = currentPenalty;
      bestHour = i + 1;
    }
  }

  return bestHour;
};

console.log(bestClosingTime(customers));
