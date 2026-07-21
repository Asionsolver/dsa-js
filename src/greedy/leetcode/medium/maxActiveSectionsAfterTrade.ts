// 3499. Maximize Active Section with Trade I

/**
Example 1:

Input: s = "01"

Output: 1

Explanation:

Because there is no block of '1's surrounded by '0's, no valid trade is possible. The maximum number of active sections is 1.

Example 2:

Input: s = "0100"

Output: 4

Explanation:

String "0100" → Augmented to "101001".
Choose "0100", convert "101001" → "100001" → "111111".
The final string without augmentation is "1111". The maximum number of active sections is 4.
Example 3:

Input: s = "1000100"

Output: 7

Explanation:

String "1000100" → Augmented to "110001001".
Choose "000100", convert "110001001" → "110000001" → "111111111".
The final string without augmentation is "1111111". The maximum number of active sections is 7.
Example 4:

Input: s = "01010"

Output: 4

Explanation:

String "01010" → Augmented to "1010101".
Choose "010", convert "1010101" → "1000101" → "1111101".
The final string without augmentation is "11110". The maximum number of active sections is 4.
*/

function maxActiveSectionsAfterTrade(s: string): number {
  const n = s.length;
  let ans = 0;
  let i = 0;

  // pre stores the length of the previously seen '0' block.
  // Initialize to -Infinity to handle strings with fewer than two '0' blocks.
  let pre = -Infinity;
  let mx = 0; // Stores the maximum gain from merging two adjacent '0' blocks

  while (i < n) {
    let j = i + 1;
    // Find the boundary of the current contiguous block
    while (j < n && s[j] === s[i]) {
      j++;
    }

    const cur = j - i;
    if (s[i] === "1") {
      ans += cur; // Accumulate original active sections
    } else {
      // Update the maximum combined length of adjacent '0' blocks
      mx = Math.max(mx, pre + cur);
      pre = cur; // Update 'pre' to be the current '0' block length
    }
    i = j;
  }

  return ans + mx;
}

// Example usage:
console.log(maxActiveSectionsAfterTrade("01")); // Output: 1
console.log(maxActiveSectionsAfterTrade("0100")); // Output: 4
console.log(maxActiveSectionsAfterTrade("1000100")); // Output: 7
console.log(maxActiveSectionsAfterTrade("01010")); // Output: 4
