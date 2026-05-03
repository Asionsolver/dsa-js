// 796. Rotate String

/**
Example 1:

Input: s = "abcde", goal = "cdeab"
Output: true
Example 2:

Input: s = "abcde", goal = "abced"
Output: false

*/

function rotateString(s: string, goal: string): boolean {
  // If the lengths don't match, they can never be rotations of each other
  if (s.length !== goal.length) {
    return false;
  }

  // Concatenate s with itself and check if goal is a substring
  return (s + s).includes(goal);
}

// Test cases
console.log(rotateString("abcde", "cdeab")); // true
console.log(rotateString("abcde", "abced")); // false
