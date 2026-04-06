// 874. Walking Robot Simulation

/**
Example 1:

Input: commands = [4,-1,3], obstacles = []

Output: 25

Explanation:

The robot starts at (0, 0):

Move north 4 units to (0, 4).
Turn right.
Move east 3 units to (3, 4).
The furthest point the robot ever gets from the origin is (3, 4), which squared is 32 + 42 = 25 units away.

Example 2:

Input: commands = [4,-1,4,-2,4], obstacles = [[2,4]]

Output: 65

Explanation:

The robot starts at (0, 0):

Move north 4 units to (0, 4).
Turn right.
Move east 1 unit and get blocked by the obstacle at (2, 4), robot is at (1, 4).
Turn left.
Move north 4 units to (1, 8).
The furthest point the robot ever gets from the origin is (1, 8), which squared is 12 + 82 = 65 units away.

Example 3:

Input: commands = [6,-1,-1,6], obstacles = [[0,0]]

Output: 36

Explanation:

The robot starts at (0, 0):

Move north 6 units to (0, 6).
Turn right.
Turn right.
Move south 5 units and get blocked by the obstacle at (0,0), robot is at (0, 1).
The furthest point the robot ever gets from the origin is (0, 6), which squared is 62 = 36 units away.


*/

const commands = [6, -1, -1, 6],
  obstacles = [[0, 0]];

const robotSim = function (commands: number[], obstacles: number[][]): number {
  // Offset and multiplier ensure coordinate pairs uniquely map to a single integer
  const OFFSET = 100000;
  const MULTIPLIER = 1000000;

  const directions = [
    [0, 1], // 0: North
    [1, 0], // 1: East
    [0, -1], // 2: South
    [-1, 0], // 3: West
  ];

  let dirIndex = 0;
  let x = 0;
  let y = 0;
  let maxDistSq = 0;

  // Load efficiently hashable obstacles into a Set
  const obsSet = new Set<number>();
  for (let i = 0; i < obstacles.length; i++) {
    const ox = obstacles[i][0];
    const oy = obstacles[i][1];
    obsSet.add((ox + OFFSET) * MULTIPLIER + (oy + OFFSET));
  }

  // Execute given commands sequentially
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];

    if (cmd === -2) {
      // Turn left 90 degrees
      dirIndex = (dirIndex + 3) & 3;
    } else if (cmd === -1) {
      // Turn right 90 degrees
      dirIndex = (dirIndex + 1) & 3;
    } else {
      // Move forward 'cmd' times
      const dx = directions[dirIndex][0];
      const dy = directions[dirIndex][1];

      for (let k = 0; k < cmd; k++) {
        const nx = x + dx;
        const ny = y + dy;

        // Stop short if the next step contains an obstacle
        if (obsSet.has((nx + OFFSET) * MULTIPLIER + (ny + OFFSET))) {
          break;
        }

        // Finalize step
        x = nx;
        y = ny;

        // Track max distance squared from origin
        const distSq = x * x + y * y;
        if (distSq > maxDistSq) {
          maxDistSq = distSq;
        }
      }
    }
  }

  return maxDistSq;
};

console.log(robotSim(commands, obstacles));
