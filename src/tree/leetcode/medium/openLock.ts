// 752. Open the Lock

/**
Example 1:

Input: deadends = ["0201","0101","0102","1212","2002"], target = "0202"
Output: 6
Explanation: 
A sequence of valid moves would be "0000" -> "1000" -> "1100" -> "1200" -> "1201" -> "1202" -> "0202".
Note that a sequence like "0000" -> "0001" -> "0002" -> "0102" -> "0202" would be invalid,
because the wheels of the lock become stuck after the display becomes the dead end "0102".
Example 2:

Input: deadends = ["8888"], target = "0009"
Output: 1
Explanation: We can turn the last wheel in reverse to move from "0000" -> "0009".
Example 3:

Input: deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"], target = "8888"
Output: -1
Explanation: We cannot reach the target without getting stuck.
*/

function openLock(deadends: string[], target: string): number {
  const visited = new Set<string>(deadends);

  // Edge cases
  if (visited.has("0000")) return -1;
  if (target === "0000") return 0;

  let queue: string[] = ["0000"];
  visited.add("0000");
  let turns = 0;

  // Breadth-First Search
  while (queue.length > 0) {
    const nextQueue: string[] = [];

    for (let i = 0; i < queue.length; i++) {
      const curr = queue[i];

      // Loop through all 4 wheels
      for (let j = 0; j < 4; j++) {
        const digit = curr.charCodeAt(j) - 48; // Convert char to number ('0' is 48 in ASCII)

        // Option 1: Turn the wheel forward (+1)
        const up = (digit + 1) % 10;
        const strUp = curr.substring(0, j) + up + curr.substring(j + 1);

        if (strUp === target) return turns + 1;
        if (!visited.has(strUp)) {
          visited.add(strUp);
          nextQueue.push(strUp);
        }

        // Option 2: Turn the wheel backward (-1)
        const down = (digit + 9) % 10; // Equivalent to (digit - 1 + 10) % 10
        const strDown = curr.substring(0, j) + down + curr.substring(j + 1);

        if (strDown === target) return turns + 1;
        if (!visited.has(strDown)) {
          visited.add(strDown);
          nextQueue.push(strDown);
        }
      }
    }

    // Move to the next layer depth of the BFS
    queue = nextQueue;
    turns++;
  }

  // Target was completely blocked off
  return -1;
}

// Test cases
console.log(openLock(["0201", "0101", "0102", "1212", "2002"], "0202")); // Output: 6
console.log(openLock(["8888"], "0009")); // Output: 1
console.log(
  openLock(
    ["8887", "8889", "8878", "8898", "8788", "8988", "7888", "9888"],
    "8888",
  ),
); // Output: -1
