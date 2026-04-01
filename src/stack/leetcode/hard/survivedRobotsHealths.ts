// 2751. Robot Collisions

/**
Example 1:



Input: positions = [5,4,3,2,1], healths = [2,17,9,15,10], directions = "RRRRR"
Output: [2,17,9,15,10]
Explanation: No collision occurs in this example, since all robots are moving in the same direction. So, the health of the robots in order from the first robot is returned, [2, 17, 9, 15, 10].
Example 2:



Input: positions = [3,5,2,6], healths = [10,10,15,12], directions = "RLRL"
Output: [14]
Explanation: There are 2 collisions in this example. Firstly, robot 1 and robot 2 will collide, and since both have the same health, they will be removed from the line. Next, robot 3 and robot 4 will collide and since robot 4's health is smaller, it gets removed, and robot 3's health becomes 15 - 1 = 14. Only robot 3 remains, so we return [14].
Example 3:



Input: positions = [1,2,5,6], healths = [10,10,11,11], directions = "RLRL"
Output: []
Explanation: Robot 1 and robot 2 will collide and since both have the same health, they are both removed. Robot 3 and 4 will collide and since both have the same health, they are both removed. So, we return an empty array, [].
*/
const positions = [5, 4, 3, 2, 1],
  healths = [2, 17, 9, 15, 10],
  directions = "RRRRR";

const survivedRobotsHealths = function (
  positions: number[],
  healths: number[],
  directions: string,
): number[] {
  const n = positions.length;

  // Create an array of original indices [0, 1, 2, ..., n-1]
  const indices: number[] = Array.from({ length: n }, (_, i) => i);

  // Sort indices based on their corresponding starting positions from left to right
  indices.sort((a, b) => positions[a] - positions[b]);

  // Use a copy of healths to track current health of each robot.
  // A health of 0 will denote that the robot was destroyed.
  const resultHealths = [...healths];

  // Stack keeps track of the original indices of right-moving robots ('R')
  const stack: number[] = [];

  for (let i = 0; i < n; i++) {
    const currentIdx = indices[i];

    if (directions[currentIdx] === "R") {
      stack.push(currentIdx);
    } else {
      // Robot is moving 'L'. Resolve collisions with 'R' robots in the stack
      while (stack.length > 0 && resultHealths[currentIdx] > 0) {
        const topIdx = stack[stack.length - 1];

        if (resultHealths[topIdx] < resultHealths[currentIdx]) {
          // Right-moving robot is destroyed
          resultHealths[topIdx] = 0;
          stack.pop();
          // Left-moving robot takes 1 damage
          resultHealths[currentIdx] -= 1;
        } else if (resultHealths[topIdx] === resultHealths[currentIdx]) {
          // Both robots are destroyed
          resultHealths[topIdx] = 0;
          resultHealths[currentIdx] = 0;
          stack.pop();
        } else {
          // Left-moving robot is destroyed
          resultHealths[topIdx] -= 1;
          resultHealths[currentIdx] = 0;
        }
      }
    }
  }

  // Filter out destroyed robots (health === 0).
  // Because we modify `resultHealths` directly, filtering it keeps the surviving robots precisely in their original order.
  return resultHealths.filter((h) => h > 0);
};

console.log(survivedRobotsHealths(positions, healths, directions));
