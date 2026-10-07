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

// Brute Force Backtracking Approach
// function removeInvalidParentheses(s: string): string[] {
//   let maxValidLength = -1;
//   const validStrings = new Set<string>();

//   // Helper function to check if a string has valid parentheses.
//   function isValid(str: string): boolean {
//     let balance = 0;
//     for (const char of str) {
//       if (char === "(") {
//         balance++;
//       } else if (char === ")") {
//         balance--;
//         // More closing brackets than opening brackets means invalid.
//         if (balance < 0) return false;
//       }
//     }
//     return balance === 0;
//   }

//   // Generate all subsequences by keeping or discarding brackets.
//   function generateSubsequences(index: number, current: string): void {
//     if (index === s.length) {
//       if (isValid(current)) {
//         if (current.length > maxValidLength) {
//           // Found a longer valid string, reset results.
//           maxValidLength = current.length;
//           validStrings.clear();
//           validStrings.add(current);
//         } else if (current.length === maxValidLength) {
//           // Same maximum length, just add to set.
//           validStrings.add(current);
//         }
//       }
//       return;
//     }

//     const char = s[index];

//     if (char === "(" || char === ")") {
//       // Choice 1: Discard the bracket.
//       generateSubsequences(index + 1, current);

//       // Choice 2: Keep the bracket.
//       generateSubsequences(index + 1, current + char);
//     } else {
//       // Letters must always be kept.
//       generateSubsequences(index + 1, current + char);
//     }
//   }

//   generateSubsequences(0, "");
//   return Array.from(validStrings);
// }

// Optimized Backtracking Approach
function removeInvalidParentheses(s: string): string[] {
  let remL = 0;
  let remR = 0;

  // Step 1: Precompute the exact number of misplaced '(' and ')' to remove.
  for (const char of s) {
    if (char === "(") {
      remL++;
    } else if (char === ")") {
      if (remL > 0) {
        // Matched with a previous unmatched '('.
        remL--;
      } else {
        // No matching '(', this ')' must be removed.
        remR++;
      }
    }
  }

  const resultSet = new Set<string>();

  // Step 2: Backtracking with intelligent branch pruning.
  function backtrack(
    index: number,
    leftCount: number,
    rightCount: number,
    remL: number,
    remR: number,
    currentPath: string[],
  ): void {
    // Base case: Reached the end of the input string.
    if (index === s.length) {
      if (remL === 0 && remR === 0) {
        resultSet.add(currentPath.join(""));
      }
      return;
    }

    const char = s[index];

    // --- Option 1: Discard the current bracket (Pruned by remL and remR) ---
    if (char === "(" && remL > 0) {
      backtrack(index + 1, leftCount, rightCount, remL - 1, remR, currentPath);
    } else if (char === ")" && remR > 0) {
      backtrack(index + 1, leftCount, rightCount, remL, remR - 1, currentPath);
    }

    // --- Option 2: Keep the current character ---
    currentPath.push(char);

    if (char !== "(" && char !== ")") {
      // Keep letters without restriction.
      backtrack(index + 1, leftCount, rightCount, remL, remR, currentPath);
    } else if (char === "(") {
      // Keep opening bracket and increment leftCount.
      backtrack(index + 1, leftCount + 1, rightCount, remL, remR, currentPath);
    } else if (char === ")" && rightCount < leftCount) {
      // Only keep closing bracket if it does not invalidate the prefix.
      backtrack(index + 1, leftCount, rightCount + 1, remL, remR, currentPath);
    }

    // Backtrack: Remove the character before returning to parent call.
    currentPath.pop();
  }

  backtrack(0, 0, 0, remL, remR, []);
  return Array.from(resultSet);
}

// Example usage:
console.log(removeInvalidParentheses("()())()")); // Output: ["(())()","()()()"]
console.log(removeInvalidParentheses("(a)())()")); // Output: ["(a())()","(a)()()"]
console.log(removeInvalidParentheses(")(")); // Output: [""]
