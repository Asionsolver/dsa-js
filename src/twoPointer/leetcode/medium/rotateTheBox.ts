// 1861. Rotating the Box

/**
Example 1:



Input: boxGrid = [["#",".","#"]]
Output: [["."],
         ["#"],
         ["#"]]
Example 2:



Input: boxGrid = [["#",".","*","."],
              ["#","#","*","."]]
Output: [["#","."],
         ["#","#"],
         ["*","*"],
         [".","."]]
Example 3:



Input: boxGrid = [["#","#","*",".","*","."],
              ["#","#","#","*",".","."],
              ["#","#","#",".","#","."]]
Output: [[".","#","#"],
         [".","#","#"],
         ["#","#","*"],
         ["#","*","."],
         ["#",".","*"],
         ["#",".","."]]

*/
function rotateTheBox(boxGrid: string[][]): string[][] {
  const m = boxGrid.length;
  const n = boxGrid[0].length;

  // Create an n x m matrix initialized with empty spaces '.'
  const rotatedBox: string[][] = Array.from({ length: n }, () =>
    new Array(m).fill("."),
  );

  for (let r = 0; r < m; r++) {
    // Pointer to track the furthest possible right position a stone can fall to
    let empty_idx = n - 1;

    // Traverse the row from right to left
    for (let c = n - 1; c >= 0; c--) {
      if (boxGrid[r][c] === "*") {
        // Obstacle blocks stones, place it exactly where it translates to
        rotatedBox[c][m - 1 - r] = "*";
        // Update the available empty position to strictly just behind the obstacle
        empty_idx = c - 1;
      } else if (boxGrid[r][c] === "#") {
        // Stone falls down to the lowest valid empty position
        rotatedBox[empty_idx][m - 1 - r] = "#";
        // The spot is now taken, shift the empty index backwards
        empty_idx--;
      }
    }
  }

  return rotatedBox;
}

// Example usage:
const boxGrid1 = [["#", ".", "#"]];
console.log(rotateTheBox(boxGrid1));

const boxGrid2 = [
  ["#", ".", "*", "."],
  ["#", "#", "*", "."],
];
console.log(rotateTheBox(boxGrid2));

const boxGrid3 = [
  ["#", "#", "*", ".", "*", "."],
  ["#", "#", "#", "*", ".", "."],
  ["#", "#", "#", ".", "#", "."],
];
console.log(rotateTheBox(boxGrid3));
