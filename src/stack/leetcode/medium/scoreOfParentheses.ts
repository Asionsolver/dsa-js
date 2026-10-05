// 856. Score of Parentheses

/**
Given a balanced parentheses string s, return the score of the string.

The score of a balanced parentheses string is based on the following rule:

"()" has score 1.
AB has score A + B, where A and B are balanced parentheses strings.
(A) has score 2 * A, where A is a balanced parentheses string.
*/

/**
Example 1:

Input: s = "()"
Output: 1
Example 2:

Input: s = "(())"
Output: 2
Example 3:

Input: s = "()()"
Output: 2
*/

/**
Constraints:

2 <= s.length <= 50
s consists of only '(' and ')'.
s is a balanced parentheses string.
*/

// Brute Force Approach: Recursion
// function scoreOfParentheses(s: string): number {
//   // Base case: if the string is just "()", score is 1.
//   if (s === "()") {
//     return 1;
//   }

//   let balance = 0;

//   // Scan through the string to find the first balanced partition.
//   for (let i = 0; i < s.length; i++) {
//     if (s[i] === "(") {
//       balance++;
//     } else {
//       balance--;
//     }

//     // When balance hits 0, we found a balanced component.
//     if (balance === 0) {
//       // Case 1: The entire string is enclosed by an outer pair like (A).
//       if (i === s.length - 1) {
//         const innerSubstring = s.substring(1, s.length - 1);
//         return 2 * scoreOfParentheses(innerSubstring);
//       }

//       // Case 2: The string is composed of two balanced parts A and B.
//       const leftPart = s.substring(0, i + 1);
//       const rightPart = s.substring(i + 1);
//       return scoreOfParentheses(leftPart) + scoreOfParentheses(rightPart);
//     }
//   }

//   return 0;
// }

// Optimized Approach: Stack
// function scoreOfParentheses(s: string): number {
//   // Stack to keep track of scores at each depth level.
//   const stack: number[] = [0];

//   for (let i = 0; i < s.length; i++) {
//     const char = s[i];

//     if (char === "(") {
//       // A new nested scope starts; push 0 to accumulate score inside it.
//       stack.push(0);
//     } else {
//       // Scope ends; pop the score accumulated inside this layer.
//       const innerScore = stack.pop()!;

//       // If innerScore is 0, it was a "()", so score is 1. Otherwise, double the inner score.
//       const currentScore = Math.max(2 * innerScore, 1);

//       // Add the current score to the enclosing parent level.
//       stack[stack.length - 1] += currentScore;
//     }
//   }

//   // The final accumulated score at the base level.
//   return stack[0];
// }

// Optimized Approach: Depth Counting
function scoreOfParentheses(s: string): number {
  let score = 0;
  let depth = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      depth++;
    } else {
      depth--;
      // If it is an immediate "()", add 2^depth to total score.
      if (s[i - 1] === "(") {
        score += 1 << depth;
      }
    }
  }

  return score;
}
// Example usage:
const s1 = "()";
console.log(scoreOfParentheses(s1)); // Output: 1

const s2 = "(())";
console.log(scoreOfParentheses(s2)); // Output: 2

const s3 = "()()";
console.log(scoreOfParentheses(s3)); // Output: 2
