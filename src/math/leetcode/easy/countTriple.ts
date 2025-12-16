// 1925. Count Square Sum Triples

/**
Example 1:

Input: n = 5
Output: 2
Explanation: The square triples are (3,4,5) and (4,3,5).
Example 2:

Input: n = 10
Output: 4
Explanation: The square triples are (3,4,5), (4,3,5), (6,8,10), and (8,6,10).

*/

const n = 5;
const countTriples = function (n: number) {
  let count = 0;

  // Iterate through all possible values for a and b
  for (let a = 1; a <= n; a++) {
    for (let b = 1; b <= n; b++) {
      const sumOfSquares = a * a + b * b;
      const c = Math.sqrt(sumOfSquares);

      // Check if c is an integer and within the valid range [1, n]
      if (Number.isInteger(c) && c <= n) {
        count++;
      }
    }
  }

  return count;
};

console.log(countTriples(n));
