// 2405. Optimal Partition of String

/**
Example 1:

Input: s = "abacaba"
Output: 4
Explanation:
Two possible partitions are ("a","ba","cab","a") and ("ab","a","ca","ba").
It can be shown that 4 is the minimum number of substrings needed.
Example 2:

Input: s = "ssssss"
Output: 6
Explanation:
The only valid partition is ("s","s","s","s","s","s").
*/

const partitionString = (s: string): number => {
  let partitions = 1; // At least one partition is needed
  let seenMask = 0; // Bitmask to keep track of characters in the current partition

  for (let i = 0; i < s.length; i++) {
    // Find the bit position for the current character (0 for 'a', 1 for 'b', etc.)
    const charBit = 1 << (s.charCodeAt(i) - 97);

    // Check if the bit is already set in the seenMask
    if ((seenMask & charBit) !== 0) {
      // Duplicate found: start a new partition
      partitions++;
      // Reset the mask for the new partition and mark current character as seen
      seenMask = charBit;
    } else {
      // Add the character to the current partition's mask
      seenMask |= charBit;
    }
  }

  return partitions;
};

// Example usage:
console.log(partitionString("abacaba")); // Output: 4
console.log(partitionString("ssssss")); // Output: 6
