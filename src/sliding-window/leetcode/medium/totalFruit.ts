// 904. Fruit Into Baskets

/**

Example 1:

Input: fruits = [1,2,1]
Output: 3
Explanation: We can pick from all 3 trees.
Example 2:

Input: fruits = [0,1,2,2]
Output: 3
Explanation: We can pick from trees [1,2,2].
If we had started at the first tree, we would only pick from trees [0,1].
Example 3:

Input: fruits = [1,2,3,2,2]
Output: 4
Explanation: We can pick from trees [2,3,2,2].
If we had started at the first tree, we would only pick from trees [1,2].
*/

function totalFruit(fruits: number[]): number {
  // Array to track the frequency of each fruit type in our window.
  // The constraints ensure that the maximum fruit type is strictly less than fruits.length.
  const counts = new Int32Array(fruits.length);

  let left = 0;
  let right = 0;
  let distinct = 0;

  for (; right < fruits.length; right++) {
    // Add the current fruit into the window
    // Postfix ++ evaluates the count before incrementing it.
    // If it evaluates to 0, it means it's a new unique fruit type in the window.
    if (counts[fruits[right]]++ === 0) {
      distinct++;
    }

    // If the window has more than 2 distinct fruit types, slide the window
    // without shrinking it. It stays the same size but shifts right.
    if (distinct > 2) {
      // Prefix -- evaluates the count after decrementing it.
      // If it hits 0, it means the window lost all instances of this fruit type.
      if (--counts[fruits[left]] === 0) {
        distinct--;
      }
      left++; // Move the trailing end of the window forward
    }
  }

  // The size of the window will equal the maximum valid subarray observed
  return right - left;
}

// Example usage:
const fruits1 = [1, 2, 1];
console.log(totalFruit(fruits1)); // Output: 3

const fruits2 = [0, 1, 2, 2];
console.log(totalFruit(fruits2)); // Output: 3

const fruits3 = [1, 2, 3, 2, 2];
console.log(totalFruit(fruits3)); // Output: 4
