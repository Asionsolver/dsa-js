// 3075. Maximize Happiness of Selected Children

/**
Example 1:

Input: happiness = [1,2,3], k = 2
Output: 4
Explanation: We can pick 2 children in the following way:
- Pick the child with the happiness value == 3. The happiness value of the remaining children becomes [0,1].
- Pick the child with the happiness value == 1. The happiness value of the remaining child becomes [0]. Note that the happiness value cannot become less than 0.
The sum of the happiness values of the selected children is 3 + 1 = 4.
Example 2:

Input: happiness = [1,1,1,1], k = 2
Output: 1
Explanation: We can pick 2 children in the following way:
- Pick any child with the happiness value == 1. The happiness value of the remaining children becomes [0,0,0].
- Pick the child with the happiness value == 0. The happiness value of the remaining child becomes [0,0].
The sum of the happiness values of the selected children is 1 + 0 = 1.
Example 3:

Input: happiness = [2,3,4,5], k = 1
Output: 5
Explanation: We can pick 1 child in the following way:
- Pick the child with the happiness value == 5. The happiness value of the remaining children becomes [1,2,3].
The sum of the happiness values of the selected children is 5.

*/

const happiness = [1, 2, 3],
  k = 2;
const maximumHappinessSum = function (happiness: number[], k: number) {
  // Sort the happiness array in descending order (largest first)
  happiness.sort((a, b) => b - a);

  let totalHappiness = 0;

  // Iterate through the first k elements
  for (let i = 0; i < k; i++) {
    // Calculate the current value: original happiness minus the number of turns passed (i)
    const val = happiness[i] - i;

    // If the calculated value is positive, add it to the total.
    // If it's 0 or negative, we add nothing.
    // Since the array is sorted descending and 'i' increases,
    // if val <= 0, all subsequent values will also be <= 0, so we can stop early.
    if (val > 0) {
      totalHappiness += val;
    } else {
      break;
    }
  }

  return totalHappiness;
};

console.log(maximumHappinessSum(happiness, k));
