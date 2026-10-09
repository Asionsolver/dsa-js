// 1541. Minimum Insertions to Balance a Parentheses String

/**
Given a parentheses string s containing only the characters '(' and ')'. A parentheses string is balanced if:

Any left parenthesis '(' must have a corresponding two consecutive right parenthesis '))'.
Left parenthesis '(' must go before the corresponding two consecutive right parenthesis '))'.
In other words, we treat '(' as an opening parenthesis and '))' as a closing parenthesis.

For example, "())", "())(())))" and "(())())))" are balanced, ")()", "()))" and "(()))" are not balanced.
You can insert the characters '(' and ')' at any position of the string to balance it if needed.

Return the minimum number of insertions needed to make s balanced.
*/

/**
Example 1:

Input: s = "(()))"
Output: 1
Explanation: The second '(' has two matching '))', but the first '(' has only ')' matching. We need to add one more ')' at the end of the string to be "(())))" which is balanced.
Example 2:

Input: s = "())"
Output: 0
Explanation: The string is already balanced.
Example 3:

Input: s = "))())("
Output: 3
Explanation: Add '(' to match the first '))', Add '))' to match the last '('.

*/

/**

Constraints:

1 <= s.length <= 105
s consists of '(' and ')' only.
*/

// Brute force approach using a stack to keep track of unclosed '(' characters and counting the necessary insertions for balancing the parentheses string.
function minInsertions(s: string): number {
  let insertions = 0;

  // Explicit stack to store unclosed '(' characters.
  const stack: string[] = [];

  let i = 0;
  while (i < s.length) {
    if (s[i] === "(") {
      // Push '(' to the stack for later matching.
      stack.push("(");
      i++;
    } else {
      // We found a ')'. Check if the next character is also ')'.
      if (i + 1 < s.length && s[i + 1] === ")") {
        // Consecutive '))' found, consume both.
        i += 2;
      } else {
        // Single ')' found. We must insert another ')' to make '))'.
        insertions++;
        i++;
      }

      // Now we have a complete '))'. Check if there is an unclosed '('.
      if (stack.length > 0) {
        stack.pop();
      } else {
        // No matching '(' exists, so we must insert one '('.
        insertions++;
      }
    }
  }

  // Each remaining '(' in the stack needs two ')' to balance.
  insertions += stack.length * 2;

  return insertions;
}

// Example usage:
console.log(minInsertions("(()))")); // Output: 1
console.log(minInsertions("())")); // Output: 0
console.log(minInsertions("))())(")); // Output: 3
