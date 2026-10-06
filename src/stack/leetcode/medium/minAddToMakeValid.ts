// 921. Minimum Add to Make Parentheses Valid

/**
A parentheses string is valid if and only if:

It is the empty string,
It can be written as AB (A concatenated with B), where A and B are valid strings, or
It can be written as (A), where A is a valid string.
You are given a parentheses string s. In one move, you can insert a parenthesis at any position of the string.

For example, if s = "()))", you can insert an opening parenthesis to be "(()))" or a closing parenthesis to be "())))".
Return the minimum number of moves required to make s valid.
*/

/**
Example 1:

Input: s = "())"
Output: 1
Example 2:

Input: s = "((("
Output: 3

*/

/**

Constraints:

1 <= s.length <= 1000
s[i] is either '(' or ')'.
*/

// Brute Force Approach
// function minAddToMakeValid(s: string): number {
//   let currentString = s;

//   // Continue removing "()" pairs as long as they exist in the string.
//   while (currentString.includes("()")) {
//     // Replace all adjacent matching pairs found in this pass.
//     currentString = currentString.replaceAll("()", "");
//   }

//   // The length of the remaining string represents the unmatched parentheses.
//   return currentString.length;
// }

// Optimized Approach
function minAddToMakeValid(s: string): number {
  // Tracks currently unmatched opening brackets '('.
  let openCount: number = 0;

  // Tracks closing brackets ')' that lack a preceding '('.
  let insertionsNeeded: number = 0;

  // Iterate through each character of the string.
  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char === "(") {
      // Found an opening bracket; it awaits a matching closing bracket.
      openCount++;
    } else {
      // Current character is ')'.
      if (openCount > 0) {
        // Matches with a previously unmatched opening bracket.
        openCount--;
      } else {
        // No available '(' to match; an opening bracket must be inserted.
        insertionsNeeded++;
      }
    }
  }

  // Total moves = missing opening brackets + missing closing brackets.
  return insertionsNeeded + openCount;
}
// eXample usage:
const input1 = "())";
console.log(minAddToMakeValid(input1)); // Output: 1

const input2 = "(((";
console.log(minAddToMakeValid(input2)); // Output: 3
