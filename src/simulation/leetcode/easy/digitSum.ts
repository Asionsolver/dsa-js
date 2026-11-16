// 2243. Calculate Digit Sum of a String

/**
You are given a string s consisting of digits and an integer k.

A round can be completed if the length of s is greater than k. In one round, do the following:

Divide s into consecutive groups of size k such that the first k characters are in the first group, the next k characters are in the second group, and so on. Note that the size of the last group can be smaller than k.
Replace each group of s with a string representing the sum of all its digits. For example, "346" is replaced with "13" because 3 + 4 + 6 = 13.
Merge consecutive groups together to form a new string. If the length of the string is greater than k, repeat from step 1.
Return s after all rounds have been completed.
*/

/**
Example 1:

Input: s = "11111222223", k = 3
Output: "135"
Explanation: 
- For the first round, we divide s into groups of size 3: "111", "112", "222", and "23".
  ​​​​​Then we calculate the digit sum of each group: 1 + 1 + 1 = 3, 1 + 1 + 2 = 4, 2 + 2 + 2 = 6, and 2 + 3 = 5. 
  So, s becomes "3" + "4" + "6" + "5" = "3465" after the first round.
- For the second round, we divide s into "346" and "5".
  Then we calculate the digit sum of each group: 3 + 4 + 6 = 13, 5 = 5. 
  So, s becomes "13" + "5" = "135" after second round. 
Now, s.length <= k, so we return "135" as the answer.
Example 2:

Input: s = "00000000", k = 3
Output: "000"
Explanation: 
We divide s into "000", "000", and "00".
Then we calculate the digit sum of each group: 0 + 0 + 0 = 0, 0 + 0 + 0 = 0, and 0 + 0 = 0. 
s becomes "0" + "0" + "0" = "000", whose length is equal to k, so we return "000".
*/

/** 

Constraints:

1 <= s.length <= 100
2 <= k <= 100
s consists of digits only.
*/

// Brute Force Approach: Simulate the process of dividing the string into groups, calculating the digit sums, and merging them until the length of the string is less than or equal to k.
// function digitSum(s: string, k: number): string {
//   // Keep simulating rounds while the string length is greater than k.
//   while (s.length > k) {
//     const groups: string[] = [];

//     // Slice the string into consecutive substrings of size k.
//     for (let i = 0; i < s.length; i += k) {
//       groups.push(s.slice(i, i + k));
//     }

//     let nextString = "";

//     // Iterate over each group to calculate its digit sum and concatenate.
//     for (const group of groups) {
//       let sum = 0;

//       for (const ch of group) {
//         // Convert the character to a number and add it to the group sum.
//         sum += Number(ch);
//       }

//       // Append the string form of the sum to build the next round's string.
//       nextString += String(sum);
//     }

//     s = nextString;
//   }

//   return s;
// }

// Optimized Approach: Instead of slicing the string into substrings, we can traverse the string in steps of k and calculate the digit sums directly, which reduces memory usage and improves performance.
function digitSum(s: string, k: number): string {
  // Repeat rounds until the string length becomes less than or equal to k.
  while (s.length > k) {
    const nextParts: string[] = [];

    // Traverse the string in steps of k without slicing into intermediate substrings.
    for (let i = 0; i < s.length; i += k) {
      let groupSum = 0;

      // Determine the end boundary so the last smaller group does not go out of bounds.
      const end = Math.min(i + k, s.length);

      for (let j = i; j < end; j++) {
        // Convert digit character to number directly using ASCII code ('0' = 48).
        groupSum += s.charCodeAt(j) - 48;
      }

      // Store each group's sum string in an array for a single join at the end of the round.
      nextParts.push(groupSum.toString());
    }

    // Merge all group sums once per round to form the new string.
    s = nextParts.join("");
  }

  return s;
}

// Example usage:
const s1 = "11111222223";
const k1 = 3;
console.log(digitSum(s1, k1)); // Output: "135"

const s2 = "00000000";
const k2 = 3;
console.log(digitSum(s2, k2)); // Output: "000"
