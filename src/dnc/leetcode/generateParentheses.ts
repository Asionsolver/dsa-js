// 22. Generate Parentheses

/**
Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

Input: n = 1
Output: ["()"]
*/
const n = 3;
const solve = function (
  ans: string[],
  n: number,
  open: number,
  close: number,
  output: string
) {
  //base case
  if (open === 0 && close === 0) {
    ans.push(output);
    return;
  }

  // include open
  if (open > 0) {
    solve(ans, n, open - 1, close, output + "(");
  }
  // include close
  if (close > open) {
    solve(ans, n, open, close - 1, output + ")");
  }
};
const generateParenthesis = function (n: number) {
  let ans: string[] = [];
  let open = n;
  let close = n;
  let output = "";
  solve(ans, n, open, close, output);
  return ans;
};

console.log(generateParenthesis(n));
