// 1614. Maximum Nesting Depth of the Parentheses

/**
Given a valid parentheses string s, return the nesting depth of s. The nesting depth is the maximum number of nested parentheses.
*/

/**
Example 1:

Input: s = "(1+(2*3)+((8)/4))+1"

Output: 3

Explanation:

Digit 8 is inside of 3 nested parentheses in the string.

Example 2:

Input: s = "(1)+((2))+(((3)))"

Output: 3

Explanation:

Digit 3 is inside of 3 nested parentheses in the string.

Example 3:

Input: s = "()(())((()()))"

Output: 3

 
*/

/**
Constraints:

1 <= s.length <= 100
s consists of digits 0-9 and characters '+', '-', '*', '/', '(', and ')'.
It is guaranteed that parentheses expression s is a VPS.
*/

// Brute force approach: Traverse the string and keep track of the current depth of parentheses. Update the maximum depth whenever a new maximum is found.
function maxDepth(s: string): number {
  // Variable to track the maximum depth observed so far.
  let maxDepth = 0;

  // Variable to track the depth at the current character.
  let currentDepth = 0;

  // Traverse each character in the string.
  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char === "(") {
      // An opening parenthesis increases the current nesting depth.
      currentDepth++;

      // Update maxDepth if currentDepth exceeds the previous maximum.
      if (currentDepth > maxDepth) {
        maxDepth = currentDepth;
      }
    } else if (char === ")") {
      // A closing parenthesis decreases the current nesting depth.
      currentDepth--;
    }
  }

  // Return the maximum nesting depth found.
  return maxDepth;
}

// Example usage:
console.log(maxDepth("(1+(2*3)+((8)/4))+1")); // Output: 3
console.log(maxDepth("(1)+((2))+(((3)))")); // Output: 3
console.log(maxDepth("()(())((()()))")); // Output: 3
