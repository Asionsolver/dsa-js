// 944. Delete Columns to Make Sorted

/**
Example 1:

Input: strs = ["cba","daf","ghi"]
Output: 1
Explanation: The grid looks as follows:
  cba
  daf
  ghi
Columns 0 and 2 are sorted, but column 1 is not, so you only need to delete 1 column.
Example 2:

Input: strs = ["a","b"]
Output: 0
Explanation: The grid looks as follows:
  a
  b
Column 0 is the only column and is sorted, so you will not delete any columns.
Example 3:

Input: strs = ["zyx","wvu","tsr"]
Output: 3
Explanation: The grid looks as follows:
  zyx
  wvu
  tsr
All 3 columns are not sorted, so you will delete all 3.

*/

const strs = ["cba", "daf", "ghi"];

const minDeletionSize = function (strs: string[]) {
  const rows = strs.length;
  const cols = strs[0].length;
  let deleteCount = 0;

  // Iterate through each column
  for (let c = 0; c < cols; c++) {
    // Check rows in the current column
    for (let r = 1; r < rows; r++) {
      // If the character in the current row is lexicographically
      // smaller than the one in the previous row, it's not sorted.
      if (strs[r][c] < strs[r - 1][c]) {
        deleteCount++;
        // Break the inner loop to move to the next column
        break;
      }
    }
  }

  return deleteCount;
};

console.log(minDeletionSize(strs));
