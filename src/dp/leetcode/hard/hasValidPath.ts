// 2267. Check if There Is a Valid Parentheses String Path

/**
Example 1:


Input: grid = [["(","(","("],[")","(",")"],["(","(",")"],["(","(",")"]]
Output: true
Explanation: The above diagram shows two possible paths that form valid parentheses strings.
The first path shown results in the valid parentheses string "()(())".
The second path shown results in the valid parentheses string "((()))".
Note that there may be other valid parentheses string paths.
Example 2:


Input: grid = [[")",")"],["(","("]]
Output: false
Explanation: The two possible paths form the parentheses strings "))(" and ")((". Since neither of them are valid parentheses strings, we return false.
*/

function hasValidPath(grid: string[][]): boolean {
  const m = grid.length;
  const n = grid[0].length;

  // The length of any path from (0,0) to (m-1,n-1) is m + n - 1.
  // A valid parentheses string must have an even length.
  if ((m + n - 1) % 2 !== 0) {
    return false;
  }

  // A valid path cannot start with ')' or end with '('
  if (grid[0][0] === ")" || grid[m - 1][n - 1] === "(") {
    return false;
  }

  const maxBal = (m + n - 1) >> 1;

  // visited[r][c][bal] is true if this state has been evaluated and failed.
  const visited: boolean[][][] = Array.from({ length: m }, () =>
    Array.from({ length: n }, () => []),
  );

  function dfs(r: number, c: number, bal: number): boolean {
    if (r === m || c === n) {
      return false;
    }

    const nextBal = bal + (grid[r][c] === "(" ? 1 : -1);

    // If balance becomes negative or exceeds the maximum possible balance,
    // this path is invalid.
    if (nextBal < 0 || nextBal > maxBal) {
      return false;
    }

    // If the remaining steps are fewer than the required balance to close,
    // we cannot reach a balance of 0.
    const remaining = m - 1 - r + (n - 1 - c);
    if (nextBal > remaining) {
      return false;
    }

    // If we reached the bottom-right cell
    if (r === m - 1 && c === n - 1) {
      return nextBal === 0;
    }

    // If we have already visited this state and it did not succeed
    if (visited[r][c][nextBal]) {
      return false;
    }

    // Explore moving down and moving right
    const ans = dfs(r + 1, c, nextBal) || dfs(r, c + 1, nextBal);

    // If this state does not lead to a valid path, memoize it as failed
    if (!ans) {
      visited[r][c][nextBal] = true;
    }

    return ans;
  }

  return dfs(0, 0, 0);
}

// Example usage:
const grid1 = [
  ["(", "(", "("],
  [")", "(", ")"],
  ["(", "(", ")"],
  ["(", "(", ")"],
];
console.log(hasValidPath(grid1)); // Output: true

const grid2 = [
  [")", ")"],
  ["(", "("],
];
console.log(hasValidPath(grid2)); // Output: false
