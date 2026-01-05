// 2300. Successful Pairs of Spells and Potions

/**
Example 1:

Input: spells = [5,1,3], potions = [1,2,3,4,5], success = 7
Output: [4,0,3]
Explanation:
- 0th spell: 5 * [1,2,3,4,5] = [5,10,15,20,25]. 4 pairs are successful.
- 1st spell: 1 * [1,2,3,4,5] = [1,2,3,4,5]. 0 pairs are successful.
- 2nd spell: 3 * [1,2,3,4,5] = [3,6,9,12,15]. 3 pairs are successful.
Thus, [4,0,3] is returned.
Example 2:

Input: spells = [3,1,2], potions = [8,5,8], success = 16
Output: [2,0,2]
Explanation:
- 0th spell: 3 * [8,5,8] = [24,15,24]. 2 pairs are successful.
- 1st spell: 1 * [8,5,8] = [8,5,8]. 0 pairs are successful. 
- 2nd spell: 2 * [8,5,8] = [16,10,16]. 2 pairs are successful. 
Thus, [2,0,2] is returned.

*/

const spells = [5, 1, 3],
  potions = [1, 2, 3, 4, 5],
  success = 7;

const successfulPairs = function (
  spells: number[],
  potions: number[],
  success: number
) {
  // 1. Sort the potions array in ascending order.
  // This allows us to use binary search.
  potions.sort((a, b) => a - b);

  const m = potions.length;

  // 2. Iterate through each spell and find the count of successful pairs
  return spells.map((spell) => {
    // We need to find the smallest index 'left' such that:
    // spell * potions[left] >= success

    let left = 0;
    let right = m - 1;
    let idx = m; // Default to m (meaning 0 potions match if we don't find any)

    while (left <= right) {
      // (left + right) >>> 1 is a faster way to do Math.floor((left + right) / 2)
      const mid = (left + right) >>> 1;

      // Check product. Note: JS numbers are doubles, safe up to 2^53.
      // success is max 10^10, so no overflow issues.
      if (spell * potions[mid] >= success) {
        idx = mid; // Found a candidate, try to find one to the left
        right = mid - 1;
      } else {
        left = mid + 1; // Too small, look to the right
      }
    }

    // If idx is found, all potions from idx to m-1 are valid.
    return m - idx;
  });
};
console.log(successfulPairs(spells, potions, success));
