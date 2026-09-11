// 10. Regular Expression Matching

/**
Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

'.' Matches any single character.​​​​
'*' Matches zero or more of the preceding element.
Return a boolean indicating whether the matching covers the entire input string (not partial).
*/

/**
Example 1:

Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
Example 2:

Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
Example 3:

Input: s = "ab", p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".
*/

/**
Constraints:

1 <= s.length <= 20
1 <= p.length <= 20
s contains only lowercase English letters.
p contains only lowercase English letters, '.', and '*'.
It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.
*/

// Brute Force
function isMatch(s: string, p: string): boolean {
  // Base case: If pattern is empty, string must also be empty.
  if (p.length === 0) {
    return s.length === 0;
  }

  // Check if the first character matches.
  const firstMatch = s.length > 0 && (p[0] === s[0] || p[0] === ".");

  // If the next character is '*', we have two choices.
  if (p.length >= 2 && p[1] === "*") {
    // Choice 1: Treat '*' as 0 occurrences (skip pattern by 2).
    // Choice 2: Treat '*' as 1+ occurrences (if first matched, consume one char from s).
    return (
      isMatch(s, p.substring(2)) || (firstMatch && isMatch(s.substring(1), p))
    );
  } else {
    // If no '*', move both string and pattern forward by 1 character.
    return firstMatch && isMatch(s.substring(1), p.substring(1));
  }
}

// Example usage:
console.log(isMatch("aa", "a")); // Output: false
console.log(isMatch("aa", "a*")); // Output: true
console.log(isMatch("ab", ".*")); // Output: true
