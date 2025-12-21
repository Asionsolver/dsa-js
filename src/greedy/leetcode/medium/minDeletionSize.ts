// 955. Delete Columns to Make Sorted II

/**
Example 1:

Input: strs = ["ca","bb","ac"]
Output: 1
Explanation: 
After deleting the first column, strs = ["a", "b", "c"].
Now strs is in lexicographic order (ie. strs[0] <= strs[1] <= strs[2]).
We require at least 1 deletion since initially strs was not in lexicographic order, so the answer is 1.
Example 2:

Input: strs = ["xc","yb","za"]
Output: 0
Explanation: 
strs is already in lexicographic order, so we do not need to delete anything.
Note that the rows of strs are not necessarily in lexicographic order:
i.e., it is NOT necessarily true that (strs[0][0] <= strs[0][1] <= ...)
Example 3:

Input: strs = ["zyx","wvu","tsr"]
Output: 3
Explanation: We have to delete every column.
*/

const strs = ["ca", "bb", "ac"];
const minDeletionSize = function (strs: string[]) {
  const n = strs.length;
  const m = strs[0].length;
  let deletions = 0;

  // isSorted[i] is true if strs[i] < strs[i+1] is already guaranteed
  // by columns we have decided to keep.
  const isSorted: boolean[] = new Array(n - 1).fill(false);

  for (let j = 0; j < m; j++) {
    let i: number;
    // Check if this column 'j' is valid to keep
    for (i = 0; i < n - 1; i++) {
      // We only care about pairs that are not yet strictly sorted
      if (!isSorted[i] && strs[i][j] > strs[i + 1][j]) {
        break;
      }
    }

    // If the loop finished without breaking, the column is valid
    if (i === n - 1) {
      // Update the sorted status for all pairs
      for (let k = 0; k < n - 1; k++) {
        if (strs[k][j] < strs[k + 1][j]) {
          isSorted[k] = true;
        }
      }
    } else {
      // If we broke out of the loop, this column must be deleted
      deletions++;
    }
  }

  return deletions;
};
console.log(minDeletionSize(strs));
