// 2078. Two Furthest Houses With Different Colors

/**
Example 1:


Input: colors = [1,1,1,6,1,1,1]
Output: 3
Explanation: In the above image, color 1 is blue, and color 6 is red.
The furthest two houses with different colors are house 0 and house 3.
House 0 has color 1, and house 3 has color 6. The distance between them is abs(0 - 3) = 3.
Note that houses 3 and 6 can also produce the optimal answer.
Example 2:


Input: colors = [1,8,3,8,3]
Output: 4
Explanation: In the above image, color 1 is blue, color 8 is yellow, and color 3 is green.
The furthest two houses with different colors are house 0 and house 4.
House 0 has color 1, and house 4 has color 3. The distance between them is abs(0 - 4) = 4.
Example 3:

Input: colors = [0,1]
Output: 1
Explanation: The furthest two houses with different colors are house 0 and house 1.
House 0 has color 0, and house 1 has color 1. The distance between them is abs(0 - 1) = 1.
*/

const maxDistance = (colors: number[]): number => {
  const n = colors.length;
  let maxDist = 0;

  // 1. Find the furthest house from the FIRST house (index 0) with a different color
  for (let i = n - 1; i >= 0; i--) {
    if (colors[i] !== colors[0]) {
      maxDist = Math.max(maxDist, i);
      break; // Stop at the first differently colored house from the right
    }
  }

  // 2. Find the furthest house from the LAST house (index n - 1) with a different color
  for (let i = 0; i < n; i++) {
    if (colors[i] !== colors[n - 1]) {
      maxDist = Math.max(maxDist, n - 1 - i);
      break; // Stop at the first differently colored house from the left
    }
  }

  return maxDist;
};

// Example usage:
console.log(maxDistance([1, 1, 1, 6, 1, 1, 1])); // Output: 3
console.log(maxDistance([1, 8, 3, 8, 3])); // Output: 4
console.log(maxDistance([0, 1])); // Output: 1
