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

// Brute Force Approach: Using Stack
// function reverseParentheses(s: string): string {
//   const stack: string[] = [];

//   // Traverse every character in the string.
//   for (const char of s) {
//     if (char === ")") {
//       const temp: string[] = [];

//       // Pop characters until the matching opening bracket is found.
//       while (stack.length > 0 && stack[stack.length - 1] !== "(") {
//         temp.push(stack.pop()!);
//       }

//       // Remove the opening bracket '(' from stack.
//       stack.pop();

//       // Push the reversed characters back onto the stack.
//       for (const reversedChar of temp) {
//         stack.push(reversedChar);
//       }
//     } else {
//       // Push letters and '(' onto the stack.
//       stack.push(char);
//     }
//   }

//   // Join all characters remaining in the stack.
//   return stack.join("");
// }

// Optimized Approach: Using Wormhole Technique

function reverseParentheses(s: string): string {
  const n = s.length;
  // pair[i] will store the index of matching bracket for s[i].
  const pair = new Int32Array(n);
  const stack: number[] = [];

  // Step 1: Precompute matching bracket positions.
  for (let i = 0; i < n; i++) {
    if (s[i] === "(") {
      stack.push(i);
    } else if (s[i] === ")") {
      const openIndex = stack.pop()!;
      pair[i] = openIndex;
      pair[openIndex] = i;
    }
  }

  // Step 2: Traverse string with directional jumping (Wormhole approach).
  const result: string[] = [];
  let curr = 0;
  let direction = 1; // 1 means moving right, -1 means moving left.

  while (curr < n) {
    if (s[curr] === "(" || s[curr] === ")") {
      // Jump to matching bracket and reverse traversal direction.
      curr = pair[curr];
      direction = -direction;
    } else {
      // Append regular letters to the result.
      result.push(s[curr]);
    }

    // Move to the next index in the current direction.
    curr += direction;
  }

  return result.join("");
}

// Example usage:
const input1 = "(abcd)";
console.log(reverseParentheses(input1)); // Output: "dcba"

const input2 = "(u(love)i)";
console.log(reverseParentheses(input2)); // Output: "iloveu"

const input3 = "(ed(et(oc))el)";
console.log(reverseParentheses(input3)); // Output: "leetcode"
