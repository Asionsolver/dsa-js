// 868. Binary Gap

/**
Example 1:

Input: n = 22
Output: 2
Explanation: 22 in binary is "10110".
The first adjacent pair of 1's is "10110" with a distance of 2.
The second adjacent pair of 1's is "10110" with a distance of 1.
The answer is the largest of these two distances, which is 2.
Note that "10110" is not a valid pair since there is a 1 separating the two 1's underlined.
Example 2:

Input: n = 8
Output: 0
Explanation: 8 in binary is "1000".
There are not any adjacent pairs of 1's in the binary representation of 8, so we return 0.
Example 3:

Input: n = 5
Output: 2
Explanation: 5 in binary is "101".
*/
const n = 8;

const binaryGap = function (n: number): number {
  let maxDistance = 0;
  let lastPosition = -1;
  let currentPosition = 0;

  while (n > 0) {
    // Check if the current bit (Least Significant Bit) is 1
    if ((n & 1) === 1) {
      // If we have previously seen a 1, calculate the distance
      if (lastPosition !== -1) {
        maxDistance = Math.max(maxDistance, currentPosition - lastPosition);
      }
      // Update the last seen position of '1' to the current position
      lastPosition = currentPosition;
    }

    // Unsigned right shift n by 1 to process the next bit
    n >>>= 1;
    // Increment the position counter
    currentPosition++;
  }

  return maxDistance;
};

console.log(binaryGap(n));
