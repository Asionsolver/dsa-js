// 2492. Minimum Score of a Path Between Two Cities

/**
Example 1:


Input: n = 4, roads = [[1,2,9],[2,3,6],[2,4,5],[1,4,7]]
Output: 5
Explanation: The path from city 1 to 4 with the minimum score is: 1 -> 2 -> 4. The score of this path is min(9,5) = 5.
It can be shown that no other path has less score.
Example 2:


Input: n = 4, roads = [[1,2,2],[1,3,4],[3,4,7]]
Output: 2
Explanation: The path from city 1 to 4 with the minimum score is: 1 -> 2 -> 1 -> 3 -> 4. The score of this path is min(2,2,4,7) = 2.
 


*/

function minScore(n: number, roads: number[][]): number {
  // Step 1: Build the adjacency list.
  // Each entry adj[u] will hold a list of pairs [neighbor, distance].
  const adj: [number, number][][] = Array.from({ length: n + 1 }, () => []);

  for (let i = 0; i < roads.length; i++) {
    const [u, v, dist] = roads[i];
    adj[u].push([v, dist]);
    adj[v].push([u, dist]);
  }

  // Step 2: Set up BFS structures.
  // Use Uint8Array for fast visited checks.
  const visited = new Uint8Array(n + 1);

  // A fixed-size array acts as an efficient queue.
  // Since each node is added at most once, size n + 1 is sufficient.
  const queue = new Int32Array(n + 1);
  let head = 0;
  let tail = 0;

  // Start the BFS from city 1
  queue[tail++] = 1;
  visited[1] = 1;

  let minScore = Infinity;

  // Step 3: Traverse the component containing city 1
  while (head < tail) {
    const curr = queue[head++];
    const neighbors = adj[curr];

    for (let i = 0; i < neighbors.length; i++) {
      const [neighbor, distance] = neighbors[i];

      // Keep track of the absolute minimum road distance seen in this component
      if (distance < minScore) {
        minScore = distance;
      }

      // If the neighboring city hasn't been visited, add it to the queue
      if (visited[neighbor] === 0) {
        visited[neighbor] = 1;
        queue[tail++] = neighbor;
      }
    }
  }

  return minScore;
}

// Example usage:
const n1 = 4;
const roads1 = [
  [1, 2, 9],
  [2, 3, 6],
  [2, 4, 5],
  [1, 4, 7],
];
console.log(minScore(n1, roads1)); // Output: 5

const n2 = 4;
const roads2 = [
  [1, 2, 2],
  [1, 3, 4],
  [3, 4, 7],
];
console.log(minScore(n2, roads2)); // Output: 2
