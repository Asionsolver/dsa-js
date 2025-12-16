// 1079. Letter Tile Possibilities

/**
Example 1:

Input: tiles = "AAB"
Output: 8
Explanation: The possible sequences are "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA".
Example 2:

Input: tiles = "AAABBC"
Output: 188
Example 3:

Input: tiles = "V"
Output: 1

 */
const tiles = "AAB";
const numTilePossibilities = function (tiles: string) {
  const freq = Array(26).fill(0);
  for (let ch of tiles) {
    freq[ch.charCodeAt(0) - 65]++;
  }

  function dfs() {
    let sum = 0;

    for (let i = 0; i < 26; i++) {
      if (freq[i] > 0) {
        sum++; // Using this character creates 1 new sequence
        freq[i]--; // Choose the character
        sum += dfs(); // Continue building longer sequences
        freq[i]++; // Backtrack
      }
    }

    return sum;
  }

  return dfs();
};

console.log(numTilePossibilities(tiles));
