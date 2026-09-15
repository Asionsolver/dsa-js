// 2472. Maximum Number of Non-overlapping Palindrome Substrings

/**
You are given a string s and a positive integer k.

Select a set of non-overlapping substrings from the string s that satisfy the following conditions:

The length of each substring is at least k.
Each substring is a palindrome.
Return the maximum number of substrings in an optimal selection.

A substring is a contiguous sequence of characters within a string.


*/

/**
Example 1:

Input: s = "abaccdbbd", k = 3
Output: 2
Explanation: We can select the substrings underlined in s = "abaccdbbd". Both "aba" and "dbbd" are palindromes and have a length of at least k = 3.
It can be shown that we cannot find a selection with more than two valid substrings.
Example 2:

Input: s = "adbcda", k = 2
Output: 0
Explanation: There is no palindrome substring of length at least 2 in the string.
*/

/**
Constraints:

1 <= k <= s.length <= 2000
s consists of lowercase English letters.
*/

// Brute Force Approach: Backtracking
// function maxPalindromes(s: string, k: number): number {
//     // Helper function to verify if s[left...right] is a palindrome.
//     function isPalindrome(left: number, right: number): boolean {
//         while (left < right) {
//             if (s[left] !== s[right]) {
//                 return false;
//             }
//             left++;
//             right--;
//         }
//         return true;
//     }

//     // Backtracking function to explore all valid selections.
//     function backtrack(index: number): number {
//         // Base case: If we reach the end of the string, no more substrings can be picked.
//         if (index >= s.length) {
//             return 0;
//         }

//         // Option 1: Skip the current character and move forward.
//         let maxCount = backtrack(index + 1);

//         // Option 2: Try forming all valid palindromes starting at index with length >= k.
//         for (let end = index + k - 1; end < s.length; end++) {
//             if (isPalindrome(index, end)) {
//                 maxCount = Math.max(maxCount, 1 + backtrack(end + 1));
//             }
//         }

//         return maxCount;
//     }

//     return backtrack(0);
// };

// Optimized Approach: Dynamic Programming,  Two Pointers and Greedy

function maxPalindromes(s: string, k: number): number {
  const n = s.length;
  let palindromeCount = 0;
  let lastEndIndex = -1;

  // Helper function to check whether s[left...right] is a palindrome.
  function isPalindrome(left: number, right: number): boolean {
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  }

  // Traverse the string considering each index 'i' as the ending point of a palindrome.
  for (let i = 0; i < n; i++) {
    // Option 1: Check for a valid palindrome of length k ending at index i.
    const startK = i - k + 1;
    if (startK > lastEndIndex && isPalindrome(startK, i)) {
      palindromeCount++;
      lastEndIndex = i;
      // Greedily move to the next index since we picked the earliest ending palindrome.
      continue;
    }

    // Option 2: Check for a valid palindrome of length k + 1 ending at index i.
    const startKPlus1 = i - k;
    if (startKPlus1 > lastEndIndex && isPalindrome(startKPlus1, i)) {
      palindromeCount++;
      lastEndIndex = i;
    }
  }

  return palindromeCount;
}

// Example usage:
const s1 = "abaccdbbd";
const k1 = 3;
console.log(maxPalindromes(s1, k1)); // Output: 2

const s2 = "adbcda";
const k2 = 2;
console.log(maxPalindromes(s2, k2)); // Output: 0
