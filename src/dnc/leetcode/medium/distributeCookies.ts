// 2305. Fair Distribution of Cookies

/**
Example 1:

Input: cookies = [8,15,10,20,8], k = 2
Output: 31
Explanation: One optimal distribution is [8,15,8] and [10,20]
- The 1st child receives [8,15,8] which has a total of 8 + 15 + 8 = 31 cookies.
- The 2nd child receives [10,20] which has a total of 10 + 20 = 30 cookies.
The unfairness of the distribution is max(31,30) = 31.
It can be shown that there is no distribution with an unfairness less than 31.
Example 2:

Input: cookies = [6,1,3,2,2,4,1,2], k = 3
Output: 7
Explanation: One optimal distribution is [6,1], [3,2,2], and [4,1,2] 
- The 1st child receives [6,1] which has a total of 6 + 1 = 7 cookies.
- The 2nd child receives [3,2,2] which has a total of 3 + 2 + 2 = 7 cookies.
- The 3rd child receives [4,1,2] which has a total of 4 + 1 + 2 = 7 cookies.
The unfairness of the distribution is max(7,7,7) = 7.
It can be shown that there is no distribution with an unfairness less than 7.

*/

const cookies = [6, 1, 3, 2, 2, 4, 1, 2],
  k = 3;
const distributeCookies = function (cookies: number[], k: number): number {
  // Current best answer initialized to Infinity
  let minUnfairness = Number.MAX_SAFE_INTEGER;

  // Array to keep track of how many cookies each child has
  const distribute = new Array(k).fill(0);

  // Optimization: Sorting cookies in descending order helps the pruning
  // kick in earlier by filling buckets faster, hitting the limit sooner.
  // However, given N <= 8, this is optional but good practice.
  // cookies.sort((a, b) => b - a);

  /**
   * Backtracking function
   * @param idx - The index of the current cookie bag we are distributing
   */
  const backtrack = (idx: number) => {
    // Base Case: If all bags are distributed
    if (idx === cookies.length) {
      const currentMax = Math.max(...distribute);
      minUnfairness = Math.min(minUnfairness, currentMax);
      return;
    }

    // Try giving the current cookie bag to each of the k children
    for (let i = 0; i < k; i++) {
      // Pruning 1: If giving this cookie to child 'i' makes their total
      // >= the best unfairness we've already found, this path won't yield a better result.
      // (Note: Since cookies are positive, the sum can only grow).
      if (distribute[i] + cookies[idx] >= minUnfairness) {
        continue;
      }

      // Action: Give cookie to child i
      distribute[i] += cookies[idx];

      // Recurse: Move to the next cookie bag
      backtrack(idx + 1);

      // Backtrack: Take cookie back from child i
      distribute[i] -= cookies[idx];

      // Pruning 2: Symmetry Breaking
      // If distribute[i] is 0 after backtracking, it means child 'i' was empty
      // before we gave them the cookie.
      // If we move to the next iteration (i+1) and that child is also empty,
      // it creates an identical distribution structure (permutations of empty bins don't matter).
      // So, we break the loop here.
      if (distribute[i] === 0) {
        break;
      }
    }
  };

  backtrack(0);
  return minUnfairness;
};

console.log(distributeCookies(cookies, k));
