// 717. 1-bit and 2-bit Characters

/**
Example 1:

Input: bits = [1,0,0]
Output: true
Explanation: The only way to decode it is two-bit character and one-bit character.
So the last character is one-bit character.
Example 2:

Input: bits = [1,1,1,0]
Output: false
Explanation: The only way to decode it is two-bit character and two-bit character.
So the last character is not one-bit character.
*/

const bits = [1, 0, 0];
const isOneBitCharacter = function (bits: number[]): boolean {
  let i = 0;
  const n = bits.length;

  // Traverse the array until we reach the last element or beyond
  while (i < n - 1) {
    if (bits[i] === 1) {
      // It's a 2-bit character, skip the next bit
      i += 2;
    } else {
      // It's a 1-bit character, move to the next bit
      i += 1;
    }
  }

  // If i is exactly at the last index, the last character is a 1-bit character
  return i === n - 1;
};

console.log(isOneBitCharacter(bits));
