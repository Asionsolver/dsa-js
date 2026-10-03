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
// function longestValidParentheses(s: string): number {
//   let maxLength = 0;

//   // Stack to store indices of characters.
//   const stack: number[] = [];

//   // Push -1 as the initial base boundary.
//   stack.push(-1);

//   for (let i = 0; i < s.length; i++) {
//     if (s[i] === "(") {
//       // Push index of '(' onto the stack.
//       stack.push(i);
//     } else {
//       // Pop the previous opening bracket or boundary index.
//       stack.pop();

//       if (stack.length === 0) {
//         // If stack is empty, this ')' becomes the new base boundary.
//         stack.push(i);
//       } else {
//         // Calculate the length of the current valid substring.
//         const currentLength = i - stack[stack.length - 1];
//         maxLength = Math.max(maxLength, currentLength);
//       }
//     }
//   }

//   return maxLength;
// }

// Optimized Approach: Two Pass Scan
function longestValidParentheses(s: string): number {
  let maxLength = 0;
  let left = 0;
  let right = 0;

  // First Pass: Scan from Left to Right.
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      left++;
    } else {
      right++;
    }

    // When opening and closing brackets match, update maxLength.
    if (left === right) {
      maxLength = Math.max(maxLength, 2 * right);
    } else if (right > left) {
      // More closing brackets invalidate the sequence, reset counters.
      left = 0;
      right = 0;
    }
  }

  // Reset counters for the second pass.
  left = 0;
  right = 0;

  // Second Pass: Scan from Right to Left to handle excess '(' cases.
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === "(") {
      left++;
    } else {
      right++;
    }

    // When opening and closing brackets match, update maxLength.
    if (left === right) {
      maxLength = Math.max(maxLength, 2 * left);
    } else if (left > right) {
      // More opening brackets invalidate the sequence from right, reset counters.
      left = 0;
      right = 0;
    }
  }

  return maxLength;
}

// Example usage:
console.log(longestValidParentheses("(()")); // Output: 2
console.log(longestValidParentheses(")()())")); // Output: 4
console.log(longestValidParentheses("")); // Output: 0
