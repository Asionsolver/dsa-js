// 2069. Walking Robot Simulation II

/**
Example 1:

example-1
Input
["Robot", "step", "step", "getPos", "getDir", "step", "step", "step", "getPos", "getDir"]
[[6, 3], [2], [2], [], [], [2], [1], [4], [], []]
Output
[null, null, null, [4, 0], "East", null, null, null, [1, 2], "West"]

Explanation
Robot robot = new Robot(6, 3); // Initialize the grid and the robot at (0, 0) facing East.
robot.step(2);  // It moves two steps East to (2, 0), and faces East.
robot.step(2);  // It moves two steps East to (4, 0), and faces East.
robot.getPos(); // return [4, 0]
robot.getDir(); // return "East"
robot.step(2);  // It moves one step East to (5, 0), and faces East.
                // Moving the next step East would be out of bounds, so it turns and faces North.
                // Then, it moves one step North to (5, 1), and faces North.
robot.step(1);  // It moves one step North to (5, 2), and faces North (not West).
robot.step(4);  // Moving the next step North would be out of bounds, so it turns and faces West.
                // Then, it moves four steps West to (1, 2), and faces West.
robot.getPos(); // return [1, 2]
robot.getDir(); // return "West"
*/

class Robot {
  private w1: number;
  private h1: number;
  private p: number;
  private pos: number;
  private moved: boolean;

  constructor(width: number, height: number) {
    this.w1 = width - 1;
    this.h1 = height - 1;
    this.p = 2 * this.w1 + 2 * this.h1;
    this.pos = 0;
    this.moved = false;
  }

  step(num: number): void {
    this.moved = true;
    this.pos = (this.pos + num) % this.p;
  }

  getPos(): number[] {
    if (this.pos === 0) {
      return [0, 0];
    } else if (this.pos <= this.w1) {
      return [this.pos, 0];
    } else if (this.pos <= this.w1 + this.h1) {
      return [this.w1, this.pos - this.w1];
    } else if (this.pos <= 2 * this.w1 + this.h1) {
      return [this.w1 - (this.pos - (this.w1 + this.h1)), this.h1];
    } else {
      return [0, this.h1 - (this.pos - (2 * this.w1 + this.h1))];
    }
  }

  getDir(): string {
    if (this.pos === 0) {
      return this.moved ? "South" : "East";
    } else if (this.pos <= this.w1) {
      return "East";
    } else if (this.pos <= this.w1 + this.h1) {
      return "North";
    } else if (this.pos <= 2 * this.w1 + this.h1) {
      return "West";
    } else {
      return "South";
    }
  }
}

// ==========================================
// DRIVER CODE TO TEST ON LOCAL MACHINE
// ==========================================

function runTest() {
  console.log("Starting Robot Simulation...\n");

  // Array to collect output exactly like LeetCode shows
  const output: any[] = [];

  // 1. ["Robot", [[6, 3]]]
  const robot = new Robot(6, 3);
  output.push(null);

  // 2. ["step", [2]]
  robot.step(2);
  output.push(null);

  // 3. ["step", [2]]
  robot.step(2);
  output.push(null);

  // 4. ["getPos", []]
  output.push(robot.getPos());

  // 5. ["getDir", []]
  output.push(robot.getDir());

  // 6. ["step", [2]]
  robot.step(2);
  output.push(null);

  // 7. ["step", [1]]
  robot.step(1);
  output.push(null);

  // 8. ["step", [4]]
  robot.step(4);
  output.push(null);

  // 9. ["getPos", []]
  output.push(robot.getPos());

  // 10. ["getDir", []]
  output.push(robot.getDir());

  // Print the final result array
  console.log("Output:");
  console.log(JSON.stringify(output));
}

runTest();
