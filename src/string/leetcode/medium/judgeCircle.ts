// 657. Robot Return to Origin

/**
Example 1:

Input: moves = "UD"
Output: true
Explanation: The robot moves up once, and then down once. All moves have the same magnitude, so it ended up at the origin where it started. Therefore, we return true.
Example 2:

Input: moves = "LL"
Output: false
Explanation: The robot moves left twice. It ends up two "moves" to the left of the origin. We return false because it is not at the origin at the end of its moves.

*/

const moves = "UD";
const judgeCircle = function (moves: string): boolean {
  let x = 0;
  let y = 0;

  for (const move of moves) {
    switch (move) {
      case "U":
        y++;
        break;
      case "D":
        y--;
        break;
      case "R":
        x++;
        break;
      case "L":
        x--;
        break;
    }
  }

  // Returns true if both x and y are 0
  return x === 0 && y === 0;
};

console.log(judgeCircle(moves));
