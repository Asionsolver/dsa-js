// 3653. XOR After Range Multiplication Queries I

/**
Example 1:

Input: nums = [1,1,1], queries = [[0,2,1,4]]

Output: 4

Explanation:

A single query [0, 2, 1, 4] multiplies every element from index 0 through index 2 by 4.
The array changes from [1, 1, 1] to [4, 4, 4].
The XOR of all elements is 4 ^ 4 ^ 4 = 4.
Example 2:

Input: nums = [2,3,1,5,4], queries = [[1,4,2,3],[0,2,1,2]]

Output: 31

Explanation:

The first query [1, 4, 2, 3] multiplies the elements at indices 1 and 3 by 3, transforming the array to [2, 9, 1, 15, 4].
The second query [0, 2, 1, 2] multiplies the elements at indices 0, 1, and 2 by 2, resulting in [4, 18, 2, 15, 4].
Finally, the XOR of all elements is 4 ^ 18 ^ 2 ^ 15 ^ 4 = 31.​​​​​​​
*/

const nums = [2, 3, 1, 5, 4],
  queries = [
    [1, 4, 2, 3],
    [0, 2, 1, 2],
  ];

function xorAfterQueries(nums: number[], queries: number[][]): number {
  const MOD = 1000000007;

  // Process each query
  for (let i = 0; i < queries.length; i++) {
    const [li, ri, ki, vi] = queries[i];

    // Multiply element with jump steps of `ki` within the range [li, ri]
    for (let idx = li; idx <= ri; idx += ki) {
      nums[idx] = (nums[idx] * vi) % MOD;
    }
  }

  // Calculate the total bitwise XOR of the manipulated array elements
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    ans ^= nums[i];
  }

  return ans;
}

console.log(xorAfterQueries(nums, queries));
