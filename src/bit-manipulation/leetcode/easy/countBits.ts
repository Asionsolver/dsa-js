// 338. Counting Bits

/**
Example 1:

Input: n = 2
Output: [0,1,1]
Explanation:
0 --> 0
1 --> 1
2 --> 10
Example 2:

Input: n = 5
Output: [0,1,1,2,1,2]
Explanation:
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101

*/

function countBits(n: number): number[] {
  const ans: number[] = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    // ans[i >> 1] gives the bit count of the number shifted right by 1.
    // (i & 1) checks if the least significant bit of i is 1.
    ans[i] = ans[i >> 1] + (i & 1);
  }

  return ans;
}

// Example usage:
console.log(countBits(2)); // Output: [0, 1, 1]
console.log(countBits(5)); // Output: [0, 1, 1, 2, 1, 2]
