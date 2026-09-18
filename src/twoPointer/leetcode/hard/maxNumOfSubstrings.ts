// 1520. Maximum Number of Non-Overlapping Substrings

/**
Given a string s of lowercase letters, you need to find the maximum number of non-empty substrings of s that meet the following conditions:

The substrings do not overlap, that is for any two substrings s[i..j] and s[x..y], either j < x or i > y is true.
A substring that contains a certain character c must also contain all occurrences of c.
Find the maximum number of substrings that meet the above conditions. If there are multiple solutions with the same number of substrings, return the one with minimum total length. It can be shown that there exists a unique solution of minimum total length.

Notice that you can return the substrings in any order.


*/

/**
Example 1:

Input: s = "adefaddaccc"
Output: ["e","f","ccc"]
Explanation: The following are all the possible substrings that meet the conditions:
[
  "adefaddaccc"
  "adefadda",
  "ef",
  "e",
  "f",
  "ccc",
]
If we choose the first string, we cannot choose anything else and we'd get only 1. If we choose "adefadda", we are left with "ccc" which is the only one that doesn't overlap, thus obtaining 2 substrings. Notice also, that it's not optimal to choose "ef" since it can be split into two. Therefore, the optimal way is to choose ["e","f","ccc"] which gives us 3 substrings. No other solution of the same number of substrings exist.
Example 2:

Input: s = "abbaccd"
Output: ["d","bb","cc"]
Explanation: Notice that while the set of substrings ["d","abba","cc"] also has length 3, it's considered incorrect since it has larger total length.
 
*/

/**

Constraints:

1 <= s.length <= 105
s contains only lowercase English letters.
*/

// Brute Force: Massive Search Space + Redundant Search + Overlapping Sub-problems
// function maxNumOfSubstrings(s: string): string[] {
//   const n = s.length;

//   // Track the first and last occurrence of each character.
//   const first: number[] = new Array(26).fill(-1);
//   const last: number[] = new Array(26).fill(-1);

//   for (let i = 0; i < n; i++) {
//     const code = s.charCodeAt(i) - 97;
//     if (first[code] === -1) first[code] = i;
//     last[code] = i;
//   }

//   // Step 1: Collect all valid intervals [i, j].
//   const validIntervals: [number, number][] = [];

//   for (let i = 0; i < n; i++) {
//     for (let j = i; j < n; j++) {
//       let isValid = true;
//       for (let k = i; k <= j; k++) {
//         const code = s.charCodeAt(k) - 97;
//         // If any character starts before i or ends after j, this substring is invalid.
//         if (first[code] < i || last[code] > j) {
//           isValid = false;
//           break;
//         }
//       }
//       if (isValid) {
//         validIntervals.push([i, j]);
//       }
//     }
//   }

//   // Step 2: Use recursion to find the optimal combination.
//   let bestCount = 0;
//   let bestLength = Infinity;
//   let bestResult: [number, number][] = [];

//   function backtrack(
//     index: number,
//     current: [number, number][],
//     totalLen: number,
//   ) {
//     if (index === validIntervals.length) {
//       if (
//         current.length > bestCount ||
//         (current.length === bestCount && totalLen < bestLength)
//       ) {
//         bestCount = current.length;
//         bestLength = totalLen;
//         bestResult = [...current];
//       }
//       return;
//     }

//     // Option 1: Skip current interval.
//     backtrack(index + 1, current, totalLen);

//     // Option 2: Include current interval if it doesn't overlap.
//     const [start, end] = validIntervals[index];
//     const overlaps = current.some(([s, e]) => !(end < s || start > e));
//     if (!overlaps) {
//       current.push([start, end]);
//       backtrack(index + 1, current, totalLen + (end - start + 1));
//       current.pop();
//     }
//   }

//   backtrack(0, [], 0);

//   return bestResult.map(([start, end]) => s.substring(start, end + 1));
// }

function maxNumOfSubstrings(s: string): string[] {
  const n = s.length;

  // Arrays to store the first and last occurrence of each character.
  const first: number[] = new Array(26).fill(-1);
  const last: number[] = new Array(26).fill(-1);

  for (let i = 0; i < n; i++) {
    const code = s.charCodeAt(i) - 97;
    if (first[code] === -1) {
      first[code] = i;
    }
    last[code] = i;
  }

  // List to collect all minimal valid intervals [start, end].
  const validIntervals: [number, number][] = [];

  // Check each character as a potential starting point.
  for (let c = 0; c < 26; c++) {
    if (first[c] === -1) continue;

    const L = first[c];
    let R = last[c];
    let isValid = true;

    // Expand the right boundary to include all occurrences of internal characters.
    for (let k = L; k <= R; k++) {
      const charCode = s.charCodeAt(k) - 97;

      // If a character appeared before L, this interval cannot start at L.
      if (first[charCode] < L) {
        isValid = false;
        break;
      }

      // Expand R to cover all occurrences of s[k].
      R = Math.max(R, last[charCode]);
    }

    if (isValid) {
      validIntervals.push([L, R]);
    }
  }

  // Sort intervals primarily by their end index (earliest deadline first).
  validIntervals.sort((a, b) => a[1] - b[1]);

  const result: string[] = [];
  let lastEnd = -1;

  // Greedily pick non-overlapping intervals.
  for (const [start, end] of validIntervals) {
    // If current interval starts after the previous chosen interval ends.
    if (start > lastEnd) {
      result.push(s.substring(start, end + 1));
      lastEnd = end;
    }
  }

  return result;
}
