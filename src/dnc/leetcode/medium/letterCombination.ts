// 17. Letter Combinations of a Phone Number
/**
Example 1:

Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
Example 2:

Input: digits = "2"
Output: ["a","b","c"]
*/

const digits = "23";
function solve(
  digits: string,
  index: number,
  current: string,
  result: string[],
  digitsMap: Map<string, string>
) {
  // base case
  if (index >= digits.length) {
    result.push(current);
    return;
  }

  const letters = digitsMap.get(digits[index])!;

  for (const c of letters) {
    solve(digits, index + 1, current + c, result, digitsMap);
  }
}
const letterCombinations = function (digits: string) {
  if (digits.length === 0) return [];
  const digitMap = new Map<string, string>([
    ["2", "abc"],
    ["3", "def"],
    ["4", "ghi"],
    ["5", "jkl"],
    ["6", "mno"],
    ["7", "pqrs"],
    ["8", "tuv"],
    ["9", "wxyz"],
  ]);
  const index = 0;
  const result: string[] = [];
  solve(digits, index, "", result, digitMap);
  return result;
};

console.log(letterCombinations(digits));
