// 2007. Find Original Array From Doubled Array

/**
Example 1:

Input: changed = [1,3,4,2,6,8]
Output: [1,3,4]
Explanation: One possible original array could be [1,3,4]:
- Twice the value of 1 is 1 * 2 = 2.
- Twice the value of 3 is 3 * 2 = 6.
- Twice the value of 4 is 4 * 2 = 8.
Other original arrays could be [4,3,1] or [3,1,4].
Example 2:

Input: changed = [6,3,0,1]
Output: []
Explanation: changed is not a doubled array.
Example 3:

Input: changed = [1]
Output: []
Explanation: changed is not a doubled array.

*/

const changed = [1, 3, 4, 2, 6, 8];
const findOriginalArray = function (changed: number[]) {
  const n = changed.length;

  // A doubled array must have an even number of elements
  if (n % 2 !== 0) {
    return [];
  }

  // Sort the array to process elements in ascending order
  changed.sort((a, b) => a - b);

  const counts = new Map<number, number>();
  for (const num of changed) {
    counts.set(num, (counts.get(num) || 0) + 1);
  }

  const original: number[] = [];

  for (const num of changed) {
    const currentCount = counts.get(num) || 0;

    // If this number has already been used as a "double" for a
    // smaller number, skip it.
    if (currentCount === 0) continue;

    // Decrement count for the current 'original' candidate
    counts.set(num, currentCount - 1);

    const target = num * 2;
    const targetCount = counts.get(target) || 0;

    // If the double doesn't exist or has been exhausted
    if (targetCount === 0) {
      return [];
    }

    // Use one instance of the double
    counts.set(target, targetCount - 1);
    original.push(num);
  }

  return original.length === n / 2 ? original : [];
};
console.log(findOriginalArray(changed));
