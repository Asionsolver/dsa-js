// 32. Longest Valid Parentheses

/**
Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring. 
*/

/**
Example 1:

Input: s = "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()".
Example 2:

Input: s = ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()".
Example 3:

Input: s = ""
Output: 0
*/

/**
Constraints:

0 <= s.length <= 3 * 104
s[i] is '(', or ')'.
*/

// Brute Force Approach: TLE
// function longestValidParentheses(s: string): number {
//   let maxLength = 0;
//   const n = s.length;

//   // Helper function to check if substring s[start...end] is valid
//   function isValid(start: number, end: number): boolean {
//     let balance = 0;

//     for (let i = start; i <= end; i++) {
//       if (s[i] === "(") {
//         balance++;
//       } else {
//         balance--;
//       }

//       // More closing brackets than opening brackets means invalid.
//       if (balance < 0) {
//         return false;
//       }
//     }

//     // Must be completely balanced at the end.
//     return balance === 0;
//   }

//   // Check all substrings with even length.
//   for (let i = 0; i < n; i++) {
//     for (let j = i + 1; j < n; j += 2) {
//       if (isValid(i, j)) {
//         maxLength = Math.max(maxLength, j - i + 1);
//       }
//     }
//   }

//   return maxLength;
// }

// Optimized Approach: Using Stack
function longestValidParentheses(s: string): number {
  let maxLength = 0;

  // Stack to store indices of characters.
  const stack: number[] = [];

  // Push -1 as the initial base boundary.
  stack.push(-1);

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      // Push index of '(' onto the stack.
      stack.push(i);
    } else {
      // Pop the previous opening bracket or boundary index.
      stack.pop();

      if (stack.length === 0) {
        // If stack is empty, this ')' becomes the new base boundary.
        stack.push(i);
      } else {
        // Calculate the length of the current valid substring.
        const currentLength = i - stack[stack.length - 1];
        maxLength = Math.max(maxLength, currentLength);
      }
    }
  }

  return maxLength;
}

// Example usage:
console.log(longestValidParentheses("(()")); // Output: 2
console.log(longestValidParentheses(")()())")); // Output: 4
console.log(longestValidParentheses("")); // Output: 0
