// 1654. Minimum Jumps to Reach Home

/**
Example 1:

Input: forbidden = [14,4,18,1,15], a = 3, b = 15, x = 9
Output: 3
Explanation: 3 jumps forward (0 -> 3 -> 6 -> 9) will get the bug home.
Example 2:

Input: forbidden = [8,3,16,6,12,20], a = 15, b = 13, x = 11
Output: -1
Example 3:

Input: forbidden = [1,6,2,14,5,17,4], a = 16, b = 9, x = 7
Output: 2
Explanation: One jump forward (0 -> 16) then one jump backward (16 -> 7) will get the bug home.
*/

function minimumJumps(
  forbidden: number[],
  a: number,
  b: number,
  x: number,
): number {
  // If the target is the starting point
  if (x === 0) return 0;

  // A theoretical safe upper bound for the max forward position
  const limit = Math.max(0, ...forbidden, x) + a + b;

  // Fast lookup array for forbidden positions
  const forbiddenSet = new Uint8Array(limit + 1);
  for (const f of forbidden) {
    if (f <= limit) forbiddenSet[f] = 1;
  }

  // Visited states are mapped as 1D array to avoid creating nested objects/Sets.
  // Index mapping: pos * 2 + dir
  // dir: 0 for forward, 1 for backward
  const visited = new Uint8Array((limit + 1) * 2);
  visited[0] = 1; // Mark starting position 0, reached from "forward"

  // Queue structured as a flat array: [pos1, dir1, pos2, dir2, ...]
  let queue: number[] = [0, 0];
  let steps = 0;

  while (queue.length > 0) {
    const nextQueue: number[] = [];

    for (let i = 0; i < queue.length; i += 2) {
      const pos = queue[i];
      const dir = queue[i + 1];

      if (pos === x) return steps;

      // 1. Try to jump Forward
      const forward = pos + a;
      if (forward <= limit && forbiddenSet[forward] === 0) {
        const idx = forward * 2;
        if (visited[idx] === 0) {
          visited[idx] = 1;
          nextQueue.push(forward, 0);
        }
      }

      // 2. Try to jump Backward
      // Can only jump backward if the last jump was NOT backward (dir === 0)
      if (dir === 0) {
        const backward = pos - b;
        if (backward >= 0 && forbiddenSet[backward] === 0) {
          const idx = backward * 2 + 1;
          if (visited[idx] === 0) {
            visited[idx] = 1;
            nextQueue.push(backward, 1);
          }
        }
      }
    }

    // Move level downwards
    queue = nextQueue;
    steps++;
  }

  // Return -1 if no possible sequence reaches 'x'
  return -1;
}

// Example usage:
console.log(
  minimumJumps([14, 4, 18, 1, 15], 3, 15, 9), // Output: 3
);
console.log(
  minimumJumps([8, 3, 16, 6, 12, 20], 15, 13, 11), // Output: -1
);
console.log(
  minimumJumps([1, 6, 2, 14, 5, 17, 4], 16, 9, 7), // Output: 2
);
