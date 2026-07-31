// 3016. Minimum Number of Pushes to Type Word II

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


Input: word = "xyzxyzxyzxyz"
Output: 12
Explanation: The remapped keypad given in the image provides the minimum cost.
"x" -> one push on key 2
"y" -> one push on key 3
"z" -> one push on key 4
Total cost is 1 * 4 + 1 * 4 + 1 * 4 = 12
It can be shown that no other mapping can provide a lower cost.
Note that the key 9 is not mapped to any letter: it is not necessary to map letters to every key, but to map all the letters.
Example 3:


Input: word = "aabbccddeeffgghhiiiiii"
Output: 24
Explanation: The remapped keypad given in the image provides the minimum cost.
"a" -> one push on key 2
"b" -> one push on key 3
"c" -> one push on key 4
"d" -> one push on key 5
"e" -> one push on key 6
"f" -> one push on key 7
"g" -> one push on key 8
"h" -> two pushes on key 9
"i" -> one push on key 9
Total cost is 1 * 2 + 1 * 2 + 1 * 2 + 1 * 2 + 1 * 2 + 1 * 2 + 1 * 2 + 2 * 2 + 6 * 1 = 24.
It can be shown that no other mapping can provide a lower cost.

*/

function minimumPushes(word: string): number {
  // There are 26 lowercase English letters
  const frequencies: number[] = new Array(26).fill(0);

  // Count the occurrences of each letter
  for (let i = 0; i < word.length; i++) {
    const index = word.charCodeAt(i) - 97; // 97 is the char code for 'a'
    frequencies[index]++;
  }

  // Sort frequencies in descending order
  frequencies.sort((a, b) => b - a);

  let totalPushes = 0;

  // Calculate total pushes based on the position multiplier
  for (let i = 0; i < 26; i++) {
    if (frequencies[i] === 0) {
      break; // No more letters to map
    }
    // Every 8 letters, the cost increases by 1 push
    const multiplier = Math.floor(i / 8) + 1;
    totalPushes += frequencies[i] * multiplier;
  }

  return totalPushes;
}

// Example usage:
console.log(minimumPushes("abcde")); // Output: 5
console.log(minimumPushes("xyzxyzxyzxyz")); // Output: 12
console.log(minimumPushes("aabbccddeeffgghhiiiiii")); // Output: 24
console.log(minimumPushes("a")); // Output: 1
