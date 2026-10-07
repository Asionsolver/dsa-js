// 301. Remove Invalid Parentheses

/**
Given a string s that contains parentheses and letters, remove the minimum number of invalid parentheses to make the input string valid.

Return a list of unique strings that are valid with the minimum number of removals. You may return the answer in any order.
*/

/**
Example 1:

Input: s = "()())()"
Output: ["(())()","()()()"]
Example 2:

Input: s = "(a)())()"
Output: ["(a())()","(a)()()"]
Example 3:

Input: s = ")("
Output: [""]

*/

/**
Constraints:

1 <= s.length <= 25
s consists of lowercase English letters and parentheses '(' and ')'.
There will be at most 20 parentheses in s.
*/

function removeInvalidParentheses(s: string): string[] {
  let maxValidLength = -1;
  const validStrings = new Set<string>();

  // Helper function to check if a string has valid parentheses.
  function isValid(str: string): boolean {
    let balance = 0;
    for (const char of str) {
      if (char === "(") {
        balance++;
      } else if (char === ")") {
        balance--;
        // More closing brackets than opening brackets means invalid.
        if (balance < 0) return false;
      }
    }
    return balance === 0;
  }

  // Generate all subsequences by keeping or discarding brackets.
  function generateSubsequences(index: number, current: string): void {
    if (index === s.length) {
      if (isValid(current)) {
        if (current.length > maxValidLength) {
          // Found a longer valid string, reset results.
          maxValidLength = current.length;
          validStrings.clear();
          validStrings.add(current);
        } else if (current.length === maxValidLength) {
          // Same maximum length, just add to set.
          validStrings.add(current);
        }
      }
      return;
    }

    const char = s[index];

    if (char === "(" || char === ")") {
      // Choice 1: Discard the bracket.
      generateSubsequences(index + 1, current);

      // Choice 2: Keep the bracket.
      generateSubsequences(index + 1, current + char);
    } else {
      // Letters must always be kept.
      generateSubsequences(index + 1, current + char);
    }
  }

  generateSubsequences(0, "");
  return Array.from(validStrings);
}

// Example usage:
console.log(removeInvalidParentheses("()())()")); // Output: ["(())()","()()()"]
console.log(removeInvalidParentheses("(a)())()")); // Output: ["(a())()","(a)()()"]
console.log(removeInvalidParentheses(")(")); // Output: [""]
