// 20. Valid Parentheses

/**
Example 1:

Input: s = "()"

Output: true

Example 2:

Input: s = "()[]{}"

Output: true

Example 3:

Input: s = "(]"

Output: false

Example 4:

Input: s = "([])"

Output: true

Example 5:

Input: s = "([)]"

Output: false
*/

function isValid(s: string): boolean {
  const stack: string[] = [];
  const matchingPairs: { [key: string]: string } = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    // If the character is a closing bracket
    if (char in matchingPairs) {
      const topElement = stack.pop();

      // Check if the popped bracket matches the corresponding opening bracket
      if (topElement !== matchingPairs[char]) {
        return false;
      }
    } else {
      // If it is an opening bracket, push it to the stack
      stack.push(char);
    }
  }

  // If the stack is empty, all brackets were correctly matched
  return stack.length === 0;
}

// Example usage:
console.log(isValid("()")); // Output: true
console.log(isValid("()[]{}")); // Output: true
console.log(isValid("(]")); // Output: false
console.log(isValid("([])")); // Output: true
console.log(isValid("([)]")); // Output: false
