// 851. Loud and Rich

/**
Example 1:

Input: richer = [[1,0],[2,1],[3,1],[3,7],[4,3],[5,3],[6,3]], quiet = [3,2,5,4,6,1,7,0]
Output: [5,5,2,5,4,5,6,7]
Explanation: 
answer[0] = 5.
Person 5 has more money than 3, which has more money than 1, which has more money than 0.
The only person who is quieter (has lower quiet[x]) is person 7, but it is not clear if they have more money than person 0.
answer[7] = 7.
Among all people that definitely have equal to or more money than person 7 (which could be persons 3, 4, 5, 6, or 7), the person who is the quietest (has lower quiet[x]) is person 7.
The other answers can be filled out with similar reasoning.
Example 2:

Input: richer = [], quiet = [0]
Output: [0]
*/

const richer = [
    [1, 0],
    [2, 1],
    [3, 1],
    [3, 7],
    [4, 3],
    [5, 3],
    [6, 3],
  ],
  quiet = [3, 2, 5, 4, 6, 1, 7, 0];
const loudAndRich = function (richer: number[][], quiet: number[]): number[] {
  const n = quiet.length;

  // Adjacency list: adj[i] will hold all people who are directly richer than person i.
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [a, b] of richer) {
    adj[b].push(a);
  }

  // The answer array, initialized with -1 to indicate unvisited/uncomputed states.
  const answer: number[] = new Array(n).fill(-1);

  // DFS function to find the quietest person for a given person `u`
  function dfs(u: number): number {
    // Return the memoized answer if already computed
    if (answer[u] !== -1) {
      return answer[u];
    }

    // At baseline, the person is at least as rich as themselves
    let minPerson = u;

    // Explore all people who are strictly richer than person `u`
    for (const v of adj[u]) {
      const candidate = dfs(v);

      // If the reachable richer person is quieter, update our minPerson
      if (quiet[candidate] < quiet[minPerson]) {
        minPerson = candidate;
      }
    }

    // Memoize and return
    answer[u] = minPerson;
    return minPerson;
  }

  // Ensure that we compute the answer for every person
  for (let i = 0; i < n; i++) {
    if (answer[i] === -1) {
      dfs(i);
    }
  }

  return answer;
};

console.log(loudAndRich(richer, quiet));
