// 1190. Reverse Substrings Between Each Pair of Parentheses

/**
You are given a string s that consists of lower case English letters and brackets.

Reverse the strings in each pair of matching parentheses, starting from the innermost one.

Your result should not contain any brackets.


*/

/**
Example 1:

Input: s = "(abcd)"
Output: "dcba"
Example 2:

Input: s = "(u(love)i)"
Output: "iloveu"
Explanation: The substring "love" is reversed first, then the whole string is reversed.
Example 3:

Input: s = "(ed(et(oc))el)"
Output: "leetcode"
Explanation: First, we reverse the substring "oc", then "etco", and finally, the whole string.
*/

/**
Constraints:

1 <= s.length <= 2000
s only contains lower case English characters and parentheses.
It is guaranteed that all parentheses are balanced.
*/

function reverseParentheses(s: string): string {
  const stack: string[] = [];

  // Traverse every character in the string.
  for (const char of s) {
    if (char === ")") {
      const temp: string[] = [];

      // Pop characters until the matching opening bracket is found.
      while (stack.length > 0 && stack[stack.length - 1] !== "(") {
        temp.push(stack.pop()!);
      }

      // Remove the opening bracket '(' from stack.
      stack.pop();

      // Push the reversed characters back onto the stack.
      for (const reversedChar of temp) {
        stack.push(reversedChar);
      }
    } else {
      // Push letters and '(' onto the stack.
      stack.push(char);
    }
  }

  // Join all characters remaining in the stack.
  return stack.join("");
}

// Example usage:
const input1 = "(abcd)";
console.log(reverseParentheses(input1)); // Output: "dcba"

const input2 = "(u(love)i)";
console.log(reverseParentheses(input2)); // Output: "iloveu"

const input3 = "(ed(et(oc))el)";
console.log(reverseParentheses(input3)); // Output: "leetcode"
