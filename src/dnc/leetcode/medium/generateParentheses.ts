// 22. Generate Parentheses

/**
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.


*/

/**
Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

Input: n = 1
Output: ["()"]
*/

/**
 
Constraints:

1 <= n <= 8
 */

// Brute Force Approach
// Process: Generate all combinations of parentheses and check if they are valid.
function generateParenthesis(n: number): string[] {
  const result: string[] = [];

  // Helper function to check if a sequence of parentheses is valid.
  function isValid(str: string): boolean {
    let balance = 0;
    for (const char of str) {
      if (char === "(") {
        balance++;
      } else {
        balance--;
      }
      // If balance drops below 0, there are more ')' than '('.
      if (balance < 0) {
        return false;
      }
    }
    return balance === 0;
  }

  // Generate all 2^(2n) combinations recursively.
  function generateAll(current: string): void {
    // Base case: string reached the required length of 2n.
    if (current.length === 2 * n) {
      if (isValid(current)) {
        result.push(current);
      }
      return;
    }

    // Try adding an opening parenthesis.
    generateAll(current + "(");

    // Try adding a closing parenthesis.
    generateAll(current + ")");
  }

  generateAll("");
  return result;
}
// Process: Backtracking
// const solve = function (
//   ans: string[],
//   n: number,
//   open: number,
//   close: number,
//   output: string,
// ) {
//   //base case
//   if (open === 0 && close === 0) {
//     ans.push(output);
//     return;
//   }

//   // include open
//   if (open > 0) {
//     solve(ans, n, open - 1, close, output + "(");
//   }
//   // include close
//   if (close > open) {
//     solve(ans, n, open, close - 1, output + ")");
//   }
// };
// const generateParenthesis = function (n: number) {
//   let ans: string[] = [];
//   let open = n;
//   let close = n;
//   let output = "";
//   solve(ans, n, open, close, output);
//   return ans;
// };

// Example usage
const n = 3;
const result = generateParenthesis(n);
console.log(result); // Output: ["((()))","(()())","(())()","()(())","()()()"]
