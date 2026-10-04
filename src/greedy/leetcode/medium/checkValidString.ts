// 678. Valid Parenthesis String

/**
Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.

The following rules define a valid string:

Any left parenthesis '(' must have a corresponding right parenthesis ')'.
Any right parenthesis ')' must have a corresponding left parenthesis '('.
Left parenthesis '(' must go before the corresponding right parenthesis ')'.
'*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string "".
 
*/

/**
Example 1:

Input: s = "()"
Output: true
Example 2:

Input: s = "(*)"
Output: true
Example 3:

Input: s = "(*))"
Output: true
Example 4:

Input: s = "("
Output: false
*/

/**
Constraints:

1 <= s.length <= 100
s[i] is '(', ')' or '*'.
*/

// Brute Force Approach: TLE

// function checkValidString(s: string): boolean {
//   function isValid(index: number, openCount: number): boolean {
//     // If openCount drops below zero, more ')' appeared than '('.
//     if (openCount < 0) {
//       return false;
//     }

//     // When the end of the string is reached, all brackets must be balanced.
//     if (index === s.length) {
//       return openCount === 0;
//     }

//     const currentChar = s[index];

//     if (currentChar === "(") {
//       return isValid(index + 1, openCount + 1);
//     }

//     if (currentChar === ")") {
//       return isValid(index + 1, openCount - 1);
//     }

//     // When currentChar is '*', try all 3 possibilities: '(', ')', or empty "".
//     return (
//       isValid(index + 1, openCount + 1) || // Treated as '('
//       isValid(index + 1, openCount - 1) || // Treated as ')'
//       isValid(index + 1, openCount) // Treated as ""
//     );
//   }

//   return isValid(0, 0);
// }

// Greedy Approach: O(n) time, O(1) space
function checkValidString(s: string): boolean {
  // minOpen tracks the minimum possible count of open brackets.
  let minOpen = 0;

  // maxOpen tracks the maximum possible count of open brackets.
  let maxOpen = 0;

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char === "(") {
      minOpen++;
      maxOpen++;
    } else if (char === ")") {
      minOpen--;
      maxOpen--;
    } else {
      // When char is '*', it can act as ')', '(', or empty "".
      minOpen--; // If treated as ')'
      maxOpen++; // If treated as '('
    }

    // If maxOpen is negative, even treating every '*' as '(' cannot match the ')' brackets.
    if (maxOpen < 0) {
      return false;
    }

    // minOpen cannot be negative because we can treat excess '*' as empty "" instead of ')'.
    if (minOpen < 0) {
      minOpen = 0;
    }
  }

  // If minOpen is 0, it means all open brackets can be successfully matched.
  return minOpen === 0;
}
// Example usage:
console.log(checkValidString("()")); // Output: true
console.log(checkValidString("(*)")); // Output: true
console.log(checkValidString("(*))")); // Output: true
console.log(checkValidString("(")); // Output: false
