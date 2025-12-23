// 1090. Largest Values From Labels

/**
Example 1:

Input: values = [5,4,3,2,1], labels = [1,1,2,2,3], numWanted = 3, useLimit = 1

Output: 9

Explanation:

The subset chosen is the first, third, and fifth items with the sum of values 5 + 3 + 1.

Example 2:

Input: values = [5,4,3,2,1], labels = [1,3,3,3,2], numWanted = 3, useLimit = 2

Output: 12

Explanation:

The subset chosen is the first, second, and third items with the sum of values 5 + 4 + 3.

Example 3:

Input: values = [9,8,8,7,6], labels = [0,0,0,1,1], numWanted = 3, useLimit = 1

Output: 16

Explanation:

The subset chosen is the first and fourth items with the sum of values 9 + 7.


*/

const values = [5, 4, 3, 2, 1],
  labels = [1, 1, 2, 2, 3],
  numWanted = 3,
  useLimit = 1;

const largestValsFromLabels = function (
  values: number[],
  labels: number[],
  numWanted: number,
  useLimit: number
) {
  // 1. Create an array of objects combining value and label
  const items: { val: number; label: number }[] = [];
  for (let i = 0; i < values.length; i++) {
    items.push({ val: values[i], label: labels[i] });
  }

  // 2. Sort the items by value in descending order
  items.sort((a, b) => b.val - a.val);

  let totalScore = 0;
  let itemsTaken = 0;

  // Map to keep track of how many times each label has been used
  const labelCounts = new Map<number, number>();

  // 3. Iterate through sorted items and greedily select them
  for (const item of items) {
    // If we have reached the maximum number of items allowed, stop
    if (itemsTaken >= numWanted) {
      break;
    }

    // Get the current usage count for this specific label (default to 0)
    const currentLabelCount = labelCounts.get(item.label) || 0;

    // Check if we can still pick an item with this label
    if (currentLabelCount < useLimit) {
      totalScore += item.val;
      itemsTaken++;
      labelCounts.set(item.label, currentLabelCount + 1);
    }
  }

  return totalScore;
};
console.log(largestValsFromLabels(values, labels, numWanted, useLimit));
