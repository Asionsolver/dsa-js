// 3568. Minimum Moves to Clean the Classroom

/**
You are given an m x n grid classroom where a student volunteer is tasked with cleaning up litter scattered around the room. Each cell in the grid is one of the following:

'S': Starting position of the student
'L': Litter that must be collected (once collected, the cell becomes empty)
'R': Reset area that restores the student's energy to full capacity, regardless of their current energy level (can be used multiple times)
'X': Obstacle the student cannot pass through
'.': Empty space
You are also given an integer energy, representing the student's maximum energy capacity. The student starts with this energy from the starting position 'S'.

Each move to an adjacent cell (up, down, left, or right) costs 1 unit of energy. If the energy reaches 0, the student can only continue if they are on a reset area 'R', which resets the energy to its maximum capacity energy.

Return the minimum number of moves required to collect all litter items, or -1 if it's impossible.


*/

/**
Example 1:

Input: classroom = ["S.", "XL"], energy = 2

Output: 2

Explanation:

The student starts at cell (0, 0) with 2 units of energy.
Since cell (1, 0) contains an obstacle 'X', the student cannot move directly downward.
A valid sequence of moves to collect all litter is as follows:
Move 1: From (0, 0) → (0, 1) with 1 unit of energy and 1 unit remaining.
Move 2: From (0, 1) → (1, 1) to collect the litter 'L'.
The student collects all the litter using 2 moves. Thus, the output is 2.
Example 2:

Input: classroom = ["LS", "RL"], energy = 4

Output: 3

Explanation:

The student starts at cell (0, 1) with 4 units of energy.
A valid sequence of moves to collect all litter is as follows:
Move 1: From (0, 1) → (0, 0) to collect the first litter 'L' with 1 unit of energy used and 3 units remaining.
Move 2: From (0, 0) → (1, 0) to 'R' to reset and restore energy back to 4.
Move 3: From (1, 0) → (1, 1) to collect the second litter 'L'.
The student collects all the litter using 3 moves. Thus, the output is 3.
Example 3:

Input: classroom = ["L.S", "RXL"], energy = 3

Output: -1

Explanation:

No valid path collects all 'L'.


*/

/**
Constraints:

1 <= m == classroom.length <= 20
1 <= n == classroom[i].length <= 20
classroom[i][j] is one of 'S', 'L', 'R', 'X', or '.'
1 <= energy <= 50
There is exactly one 'S' in the grid.
There are at most 10 'L' cells in the grid.
*/

function minMoves(classroom: string[], energy: number): number {
  const m = classroom.length;
  const n = classroom[0].length;
  const litters: [number, number][] = [];
  let startR = 0,
    startC = 0;

  // 1. Find 'S' and all 'L' positions.
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (classroom[r][c] === "S") {
        startR = r;
        startC = c;
      } else if (classroom[r][c] === "L") {
        litters.push([r, c]);
      }
    }
  }

  const totalL = litters.length;
  const targetMask = (1 << totalL) - 1;

  // Quick lookup for litter index at (r, c).
  const litterId = Array.from({ length: m }, () => new Int8Array(n).fill(-1));
  for (let i = 0; i < totalL; i++) {
    litterId[litters[i][0]][litters[i][1]] = i;
  }

  // BFS State: [row, col, mask, currentEnergy]
  // Queue and visited set. Using Uint8Array to save memory.
  const visited = new Uint8Array(m * n * (1 << totalL) * (energy + 1));

  function getIdx(r: number, c: number, mask: number, e: number) {
    return (((r * n + c) << totalL) | mask) * (energy + 1) + e;
  }

  let queue: number[][] = [[startR, startC, 0, energy]];
  visited[getIdx(startR, startC, 0, energy)] = 1;
  let moves = 0;

  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  // 2. Start BFS level by level.
  while (queue.length > 0) {
    const nextQueue: number[][] = [];
    for (const [r, c, mask, e] of queue) {
      // If all litters collected, return current moves.
      if (mask === targetMask) return moves;

      // If no energy left, we can't move further.
      if (e === 0) continue;

      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;

        // Boundary and Obstacle check.
        if (
          nr >= 0 &&
          nr < m &&
          nc >= 0 &&
          nc < n &&
          classroom[nr][nc] !== "X"
        ) {
          let nextMask = mask;
          let nextE = e - 1;

          // If neighbor is litter, update mask.
          if (classroom[nr][nc] === "L") {
            nextMask |= 1 << litterId[nr][nc];
          }
          // If neighbor is reset area, restore energy.
          else if (classroom[nr][nc] === "R") {
            nextE = energy;
          }

          const vIdx = getIdx(nr, nc, nextMask, nextE);
          if (!visited[vIdx]) {
            visited[vIdx] = 1;
            nextQueue.push([nr, nc, nextMask, nextE]);
          }
        }
      }
    }
    queue = nextQueue;
    moves++;
  }

  return -1;
}

// Example usage:
const classroom1 = ["S.", "XL"];
const energy1 = 2;
console.log(minMoves(classroom1, energy1)); // Output: 2

const classroom2 = ["LS", "RL"];
const energy2 = 4;
console.log(minMoves(classroom2, energy2)); // Output: 3

const classroom3 = ["L.S", "RXL"];
const energy3 = 3;
console.log(minMoves(classroom3, energy3)); // Output: -1
