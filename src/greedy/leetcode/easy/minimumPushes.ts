// I3014. Minimum Number of Pushes to Type Word I

/**
Example 1:


Input: word = "abcde"
Output: 5
Explanation: The remapped keypad given in the image provides the minimum cost.
"a" -> one push on key 2
"b" -> one push on key 3
"c" -> one push on key 4
"d" -> one push on key 5
"e" -> one push on key 6
Total cost is 1 + 1 + 1 + 1 + 1 = 5.
It can be shown that no other mapping can provide a lower cost.
Example 2:


Input: word = "xycdefghij"
Output: 12
Explanation: The remapped keypad given in the image provides the minimum cost.
"x" -> one push on key 2
"y" -> two pushes on key 2
"c" -> one push on key 3
"d" -> two pushes on key 3
"e" -> one push on key 4
"f" -> one push on key 5
"g" -> one push on key 6
"h" -> one push on key 7
"i" -> one push on key 8
"j" -> one push on key 9
Total cost is 1 + 2 + 1 + 2 + 1 + 1 + 1 + 1 + 1 + 1 = 12.
It can be shown that no other mapping can provide a lower cost.
*/

function minimumPushes(word: string): number {
  let totalPushes = 0;

  for (let i = 0; i < word.length; i++) {
    totalPushes += Math.floor(i / 8) + 1;
  }

  return totalPushes;
}

// Example usage:
console.log(minimumPushes("abcde")); // Output: 5
console.log(minimumPushes("xycdefghij")); // Output: 12
console.log(minimumPushes("abcdefghijklmnopqrstuvwxyz")); // Output: 36
