// 1732. Find the Highest Altitude

/**
Example 1:

Input: gain = [-5,1,5,0,-7]
Output: 1
Explanation: The altitudes are [0,-5,-4,1,1,-6]. The highest is 1.
Example 2:

Input: gain = [-4,-3,-2,-1,4,3,2]
Output: 0
Explanation: The altitudes are [0,-4,-7,-9,-10,-6,-3,-1]. The highest is 0.

*/

function largestAltitude(gain: number[]): number {
  let currentAltitude = 0;
  let maxAltitude = 0;

  for (const g of gain) {
    currentAltitude += g;
    if (currentAltitude > maxAltitude) {
      maxAltitude = currentAltitude;
    }
  }

  return maxAltitude;
}

// Test cases
console.log(largestAltitude([-5, 1, 5, 0, -7])); // Output: 1
console.log(largestAltitude([-4, -3, -2, -1, 4, 3, 2])); // Output: 0
