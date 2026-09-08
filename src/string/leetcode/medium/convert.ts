// 6. Zigzag Conversion

/**
The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

string convert(string s, int numRows);
*/

/**
Example 1:

Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
Example 2:

Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I
Example 3:

Input: s = "A", numRows = 1
Output: "A"
*/

/**
Constraints:

1 <= s.length <= 1000
s consists of English letters (lower-case and upper-case), ',' and '.'.
1 <= numRows <= 1000
*/

// Not optimized
// function convert(s: string, numRows: number): string {
//     // If numRows is 1 or string length is smaller than numRows, return original string.
//     if (numRows === 1 || s.length <= numRows) {
//         return s;
//     }

//     const n = s.length;
//     // Create a 2D matrix filled with empty strings.
//     const matrix: string[][] = Array.from({ length: numRows }, () => Array(n).fill(""));

//     let row = 0;
//     let col = 0;
//     let goingDown = false;

//     // Place each character in the 2D matrix.
//     for (const char of s) {
//         matrix[row][col] = char;

//         // Change direction when reaching top or bottom row.
//         if (row === 0 || row === numRows - 1) {
//             goingDown = !goingDown;
//         }

//         if (goingDown) {
//             row++;
//         } else {
//             row--;
//             col++;
//         }
//     }

//     // Read the matrix row by row.
//     let result = "";
//     for (let r = 0; r < numRows; r++) {
//         for (let c = 0; c < n; c++) {
//             if (matrix[r][c] !== "") {
//                 result += matrix[r][c];
//             }
//         }
//     }

//     return result;
// }

function convert(s: string, numRows: number): string {
  // If numRows is 1 or string length is less than or equal to numRows, zigzag is not possible.
  if (numRows === 1 || s.length <= numRows) {
    return s;
  }

  // Initialize an array of strings for each row.
  const rows: string[] = new Array(numRows).fill("");

  let currentRow = 0;
  let goingDown = false;

  // Traverse each character and assign it to the appropriate row.
  for (const char of s) {
    rows[currentRow] += char;

    // Reverse direction when we hit the top or bottom row.
    if (currentRow === 0 || currentRow === numRows - 1) {
      goingDown = !goingDown;
    }

    // Move to the next row based on the current direction.
    currentRow += goingDown ? 1 : -1;
  }

  // Combine all rows to get the final converted string.
  return rows.join("");
}

// Example usage:
console.log(convert("PAYPALISHIRING", 3)); // Output: "PAHNAPLSIIGYIR"
console.log(convert("PAYPALISHIRING", 4)); // Output: "PINALSIGYAHRPI"
console.log(convert("A", 1)); // Output: "A"
