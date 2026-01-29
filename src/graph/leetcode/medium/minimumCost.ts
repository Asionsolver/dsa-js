// 2976. Minimum Cost to Convert String I

/**
Example 1:

Input: source = "abcd", target = "acbe", original = ["a","b","c","c","e","d"], changed = ["b","c","b","e","b","e"], cost = [2,5,5,1,2,20]
Output: 28
Explanation: To convert the string "abcd" to string "acbe":
- Change value at index 1 from 'b' to 'c' at a cost of 5.
- Change value at index 2 from 'c' to 'e' at a cost of 1.
- Change value at index 2 from 'e' to 'b' at a cost of 2.
- Change value at index 3 from 'd' to 'e' at a cost of 20.
The total cost incurred is 5 + 1 + 2 + 20 = 28.
It can be shown that this is the minimum possible cost.
Example 2:

Input: source = "aaaa", target = "bbbb", original = ["a","c"], changed = ["c","b"], cost = [1,2]
Output: 12
Explanation: To change the character 'a' to 'b' change the character 'a' to 'c' at a cost of 1, followed by changing the character 'c' to 'b' at a cost of 2, for a total cost of 1 + 2 = 3. To change all occurrences of 'a' to 'b', a total cost of 3 * 4 = 12 is incurred.
Example 3:

Input: source = "abcd", target = "abce", original = ["a"], changed = ["e"], cost = [10000]
Output: -1
Explanation: It is impossible to convert source to target because the value at index 3 cannot be changed from 'd' to 'e'.
*/

const source = "abcd",
  target = "acbe",
  original = ["a", "b", "c", "c", "e", "d"],
  changed = ["b", "c", "b", "e", "b", "e"],
  cost = [2, 5, 5, 1, 2, 20];
function minimumCost(
  source: string,
  target: string,
  original: string[],
  changed: string[],
  cost: number[],
): number {
  const INF = Infinity;
  const ALPHABET_SIZE = 26;

  // Initialize distance matrix with Infinity
  // dist[i][j] represents the min cost to change char i to char j
  const dist: number[][] = Array.from({ length: ALPHABET_SIZE }, () =>
    Array(ALPHABET_SIZE).fill(INF),
  );

  // Distance to self is always 0
  for (let i = 0; i < ALPHABET_SIZE; i++) {
    dist[i][i] = 0;
  }

  // Helper to get char code index (0-25)
  const getIndex = (char: string) => char.charCodeAt(0) - 97;

  // Populate initial edges based on input
  // If multiple entries exist for the same pair, keep the minimum cost
  for (let i = 0; i < original.length; i++) {
    const u = getIndex(original[i]);
    const v = getIndex(changed[i]);
    dist[u][v] = Math.min(dist[u][v], cost[i]);
  }

  // Floyd-Warshall Algorithm to find all-pairs shortest paths
  for (let k = 0; k < ALPHABET_SIZE; k++) {
    for (let i = 0; i < ALPHABET_SIZE; i++) {
      for (let j = 0; j < ALPHABET_SIZE; j++) {
        // If path i->k and k->j exists, check if it's shorter than current i->j
        if (dist[i][k] < INF && dist[k][j] < INF) {
          dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
        }
      }
    }
  }

  let totalCost = 0;

  // Calculate total cost for the string transformation
  for (let i = 0; i < source.length; i++) {
    const u = getIndex(source[i]);
    const v = getIndex(target[i]);

    if (u === v) continue;

    if (dist[u][v] === INF) {
      return -1; // Transformation impossible
    }

    totalCost += dist[u][v];
  }

  return totalCost;
}

console.log(minimumCost(source, target, original, changed, cost));
