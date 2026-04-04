// 2075. Decode the Slanted Ciphertext

/**
Example 1:

Input: encodedText = "ch   ie   pr", rows = 3
Output: "cipher"
Explanation: This is the same example described in the problem description.
Example 2:


Input: encodedText = "iveo    eed   l te   olc", rows = 4
Output: "i love leetcode"
Explanation: The figure above denotes the matrix that was used to encode originalText. 
The blue arrows show how we can find originalText from encodedText.
Example 3:


Input: encodedText = "coding", rows = 1
Output: "coding"
Explanation: Since there is only 1 row, both originalText and encodedText are the same.
*/

const encodedText = "ch   ie   pr",
  rows = 3;

const decodeCiphertext = function (encodedText: string, rows: number): string {
  //   const n = encodedText.length;
  //   const cols = Math.ceil(n / rows);
  //   const matrix: string[][] = new Array(rows);
  //   for (let i = 0; i < rows; i++) {
  //     matrix[i] = new Array(cols).fill(" ");
  //   }

  //   // Fill the matrix row-wise
  //   let idx = 0;
  //   for (let r = 0; r < rows; r++) {
  //     for (let c = 0; c < cols; c++) {
  //       if (idx < n) {
  //         matrix[r][c] = encodedText[idx++];
  //       }
  //     }
  //   }

  //   let result = "";
  //   // Read the matrix column-wise
  //   for (let c = 0; c < cols; c++) {
  //     for (let r = 0; r < rows; r++) {
  //       if (matrix[r][c] !== " ") {
  //         result += matrix[r][c];
  //       }
  //     }
  //   }

  //   return result;

  if (!encodedText) return "";

  const cols = encodedText.length / rows;
  const res: string[] = [];
  let lastNonSpace = -1;
  let ptr = 0;

  // Traverse diagonally starting from each column of the first row
  for (let cStart = 0; cStart < cols; cStart++) {
    for (let r = 0; r < rows; r++) {
      const c = cStart + r;

      // If the diagonal goes out of the right boundary, stop exploring this diagonal
      if (c >= cols) break;

      // Convert the 2D coordinate (r, c) to a 1D index and grab the character
      const char = encodedText[r * cols + c];
      res.push(char);

      // Keep track of the last non-space character to trim efficiently later
      if (char !== " ") {
        lastNonSpace = ptr;
      }

      ptr++;
    }
  }

  // Truncate trailing spaces mapped during the diagonal traversals
  res.length = lastNonSpace + 1;

  return res.join("");
};

console.log(decodeCiphertext(encodedText, rows));
