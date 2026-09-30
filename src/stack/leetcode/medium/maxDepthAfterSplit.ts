// 1111. Maximum Nesting Depth of Two Valid Parentheses Strings

/**
A string is a valid parentheses string (denoted VPS) if and only if it consists of "(" and ")" characters only, and:

It is the empty string, or
It can be written as AB (A concatenated with B), where A and B are VPS's, or
It can be written as (A), where A is a VPS.
We can similarly define the nesting depth depth(S) of any VPS S as follows:

depth("") = 0
depth(A + B) = max(depth(A), depth(B)), where A and B are VPS's
depth("(" + A + ")") = 1 + depth(A), where A is a VPS.
For example, "", "()()", and "()(()())" are VPS's (with nesting depths 0, 1, and 2), and ")(" and "(()" are not VPS's.

Given a VPS seq, split it into two disjoint subsequences A and B, such that A and B are VPS's (and A.length + B.length = seq.length). The subsequences may not necessarily be contiguous.

For example, for the sequence 123456789, one possible split is:

A = {1, 3, 5, 7, 9},

B = {2, 4, 6, 8}.

This corresponds to the output [0, 1, 0, 1, 0, 1, 0, 1, 0]  where 0 indicates membership in A and 1 indicates membership in B.

Now choose any such A and B such that max(depth(A), depth(B)) is the minimum possible value.

Return an answer array (of length seq.length) that encodes such a choice of A and B:  answer[i] = 0 if seq[i] is part of A, else answer[i] = 1.  Note that even though multiple answers may exist, you may return any of them.


*/

/**
Example 1:

Input: seq = "(()())"
Output: [0,1,1,1,1,0]
Example 2:

Input: seq = "()(())()"
Output: [0,0,0,1,1,0,1,1]

*/

/**
Constraints:

1 <= seq.size <= 10000
*/

// Brute Force Approach:TLE

// function maxDepthAfterSplit(seq: string): number[] {
//   const n = seq.length;
//   let bestAssignment: number[] = [];
//   let minMaxDepth = Infinity;

//   // Helper function to check if a sequence is VPS and calculate its depth.
//   function getVpsDepth(indices: number[]): number | null {
//     let currentDepth = 0;
//     let maxDepth = 0;

//     for (const idx of indices) {
//       if (seq[idx] === "(") {
//         currentDepth++;
//         maxDepth = Math.max(maxDepth, currentDepth);
//       } else {
//         currentDepth--;
//         if (currentDepth < 0) return null; // Invalid VPS
//       }
//     }

//     return currentDepth === 0 ? maxDepth : null;
//   }

//   // Recursive backtracking to generate all assignments.
//   function backtrack(index: number, currentAssignment: number[]) {
//     if (index === n) {
//       const groupA: number[] = [];
//       const groupB: number[] = [];

//       for (let i = 0; i < n; i++) {
//         if (currentAssignment[i] === 0) groupA.push(i);
//         else groupB.push(i);
//       }

//       const depthA = getVpsDepth(groupA);
//       const depthB = getVpsDepth(groupB);

//       // Both subsequences must be valid VPS.
//       if (depthA !== null && depthB !== null) {
//         const currentMax = Math.max(depthA, depthB);
//         if (currentMax < minMaxDepth) {
//           minMaxDepth = currentMax;
//           bestAssignment = [...currentAssignment];
//         }
//       }
//       return;
//     }

//     // Try assigning current character to group 0.
//     currentAssignment[index] = 0;
//     backtrack(index + 1, currentAssignment);

//     // Try assigning current character to group 1.
//     currentAssignment[index] = 1;
//     backtrack(index + 1, currentAssignment);
//   }

//   backtrack(0, new Array(n).fill(0));
//   return bestAssignment;
// }

// Optimized Approach: Time Complexity: O(n), Space Complexity: O(n)

function maxDepthAfterSplit(seq: string): number[] {
  const n = seq.length;
  const answer = new Array<number>(n);
  let currentDepth = 0;

  for (let i = 0; i < n; i++) {
    if (seq[i] === "(") {
      // Assign based on current depth parity before going deeper.
      answer[i] = currentDepth % 2;
      currentDepth++;
    } else {
      // Step out of the current depth level first.
      currentDepth--;
      // Assign the matching bracket to the same depth level.
      answer[i] = currentDepth % 2;
    }
  }

  return answer;
}
// Example usage:
const seq1 = "(()())";
console.log(maxDepthAfterSplit(seq1)); // Output: [0, 1, 1, 1, 1, 0]

const seq2 = "()(())()";
console.log(maxDepthAfterSplit(seq2)); // Output: [0, 0, 0, 1, 1, 0, 1, 1]
