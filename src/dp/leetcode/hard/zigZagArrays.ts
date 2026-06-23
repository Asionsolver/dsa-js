// 3699. Number of ZigZag Arrays I

/**

Example 1:

Input: n = 3, l = 4, r = 5

Output: 2

Explanation:

There are only 2 valid ZigZag arrays of length n = 3 using values in the range [4, 5]:

[4, 5, 4]
[5, 4, 5]​​​​​​​
Example 2:

Input: n = 3, l = 1, r = 3

Output: 10

Explanation:

There are 10 valid ZigZag arrays of length n = 3 using values in the range [1, 3]:

[1, 2, 1], [1, 3, 1], [1, 3, 2]
[2, 1, 2], [2, 1, 3], [2, 3, 1], [2, 3, 2]
[3, 1, 2], [3, 1, 3], [3, 2, 3]
All arrays meet the ZigZag conditions.

*/

function zigZagArrays(n: number, l: number, r: number): number {
  const MOD = 1_000_000_007;
  const d = r - l + 1;

  // u[i] is the count of zigzag arrays of current length ending at value i (0-indexed) with an 'up' step
  let u = new Array<number>(d);
  // d_arr[i] is the count of zigzag arrays of current length ending at value i (0-indexed) with a 'down' step
  let d_arr = new Array<number>(d);

  // Base Case: Initialize for length = 2
  for (let i = 0; i < d; i++) {
    u[i] = i;
    d_arr[i] = d - 1 - i;
  }

  // Transition for lengths from 3 to n
  for (let len = 3; len <= n; len++) {
    const next_u = new Array<number>(d).fill(0);
    const next_d = new Array<number>(d).fill(0);

    // Optimize u_new[i] = sum_{j=0..i-1} d_arr[j] using prefix sums
    let pref = 0;
    for (let i = 0; i < d; i++) {
      next_u[i] = pref;
      pref = (pref + d_arr[i]) % MOD;
    }

    // Optimize d_new[i] = sum_{j=i+1..d-1} u[j] using suffix sums
    let suff = 0;
    for (let i = d - 1; i >= 0; i--) {
      next_d[i] = suff;
      suff = (suff + u[i]) % MOD;
    }

    u = next_u;
    d_arr = next_d;
  }

  // Sum up all valid arrays of length n
  let ans = 0;
  for (let i = 0; i < d; i++) {
    ans = (ans + u[i]) % MOD;
    ans = (ans + d_arr[i]) % MOD;
  }

  return ans;
}

// Example usage:
console.log(zigZagArrays(3, 4, 5)); // Output: 2
console.log(zigZagArrays(3, 1, 3)); // Output: 10
