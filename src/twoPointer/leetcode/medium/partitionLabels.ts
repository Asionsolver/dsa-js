// 763. Partition Labels

/**
Example 1:

Input: s = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.
Example 2:

Input: s = "eccbbbbdec"
Output: [10]

*/

const s = "ababcbacadefegdehijhklij";

// Approach: Two Pointer
// const partitionLabels = function (s: string): number[] {
//   const lastOccurrence = new Map<string, number>();

//   // Step 1: Record the last occurrence of each character
//   for (let i = 0; i < s.length; i++) {
//     lastOccurrence.set(s[i], i);
//   }

//   const result: number[] = [];
//   let start = 0;
//   let end = 0;

//   // Step 2: Traverse the string and find the boundary of each part
//   for (let i = 0; i < s.length; i++) {
//     end = Math.max(end, lastOccurrence.get(s[i])!);

//     // If we reach the end of the current partition
//     if (i === end) {
//       result.push(i - start + 1);
//       start = i + 1; // Move start to the next character
//     }
//   }

//   return result;
// };

// Approach: Two Pointer with Object
const partitionLabels = function (s: string): number[] {
  const lastOccurrence: { [char: string]: number } = {};
  for (let i = 0; i < s.length; i++) {
    lastOccurrence[s[i]] = i;
  }

  const result: number[] = [];
  let start = 0;
  let end = 0;

  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, lastOccurrence[s[i]]);
    if (i === end) {
      result.push(end - start + 1);
      start = i + 1;
    }
  }

  return result;
};
console.log(partitionLabels(s));
