// 28. Find the Index of the First Occurrence in a String

/**
Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.
*/

/**
Example 1:

Input: haystack = "sadbutsad", needle = "sad"
Output: 0
Explanation: "sad" occurs at index 0 and 6.
The first occurrence is at index 0, so we return 0.
Example 2:

Input: haystack = "leetcode", needle = "leeto"
Output: -1
Explanation: "leeto" did not occur in "leetcode", so we return -1.
*/

/**
Constraints:

1 <= haystack.length, needle.length <= 104
haystack and needle consist of only lowercase English characters.
*/

// Brute Force Approach: Check Each Substring of Haystack
// function strStr(haystack: string, needle: string): number {
//   const n = haystack.length;
//   const m = needle.length;

//   // Base case: if needle is empty, it matches at index 0.
//   if (m === 0) return 0;

//   // If needle is longer than haystack, match is impossible.
//   if (m > n) return -1;

//   // Step 1: Build the LPS (Longest Prefix Suffix) array for needle.
//   const lps: number[] = new Array(m).fill(0);
//   let prevLPS = 0;
//   let i = 1;

//   while (i < m) {
//     if (needle[i] === needle[prevLPS]) {
//       prevLPS++;
//       lps[i] = prevLPS;
//       i++;
//     } else {
//       if (prevLPS !== 0) {
//         // Fall back to the previous known prefix match.
//         prevLPS = lps[prevLPS - 1];
//       } else {
//         lps[i] = 0;
//         i++;
//       }
//     }
//   }

//   // Step 2: Search needle in haystack using the LPS array.
//   let haystackPtr = 0; // Pointer for haystack | haystack-এর pointer
//   let needlePtr = 0; // Pointer for needle   | needle-এর pointer

//   while (haystackPtr < n) {
//     // When characters match, advance both pointers.
//     if (haystack[haystackPtr] === needle[needlePtr]) {
//       haystackPtr++;
//       needlePtr++;
//     }

//     // Entire needle matched successfully.
//     if (needlePtr === m) {
//       return haystackPtr - needlePtr;
//     }

//     // Mismatch occurred after matching needlePtr characters.
//     if (haystackPtr < n && haystack[haystackPtr] !== needle[needlePtr]) {
//       if (needlePtr !== 0) {
//         // Do not backtrack haystackPtr, only update needlePtr using LPS.
//         needlePtr = lps[needlePtr - 1];
//       } else {
//         haystackPtr++;
//       }
//     }
//   }

//   // No occurrence found.
//   return -1;
// }

// Optimized Approach: Using Built-in String Methods
function strStr(haystack: string, needle: string): number {
  const n = haystack.length;
  const m = needle.length;

  // If needle is longer than haystack, it cannot be found.
  if (m > n) {
    return -1;
  }

  // Check every starting position where needle could fit.
  for (let i = 0; i <= n - m; i++) {
    let match = true;

    // Compare characters of needle with corresponding characters in haystack.
    for (let j = 0; j < m; j++) {
      if (haystack[i + j] !== needle[j]) {
        match = false;
        break;
      }
    }

    // If all characters matched, return the starting index.
    if (match) {
      return i;
    }
  }

  // Needle was not found anywhere in haystack.
  return -1;
}
// Example usage:
const haystack = "sadbutsad";
const needle = "sad";
console.log(strStr(haystack, needle)); // Output: 0

const haystack2 = "leetcode";
const needle2 = "leeto";
console.log(strStr(haystack2, needle2)); // Output: -1
