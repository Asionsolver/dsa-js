// 1340. Jump Game V

/**
Example 1:


Input: arr = [6,4,14,6,8,13,9,7,10,6,12], d = 2
Output: 4
Explanation: You can start at index 10. You can jump 10 --> 8 --> 6 --> 7 as shown.
Note that if you start at index 6 you can only jump to index 7. You cannot jump to index 5 because 13 > 9. You cannot jump to index 4 because index 5 is between index 4 and 6 and 13 > 9.
Similarly You cannot jump from index 3 to index 2 or index 1.
Example 2:

Input: arr = [3,3,3,3,3], d = 3
Output: 1
Explanation: You can start at any index. You always cannot jump to any index.
Example 3:

Input: arr = [7,6,5,4,3,2,1], d = 1
Output: 7
Explanation: Start at index 0. You can visit all the indicies. 

*/

function maxJumps(arr: number[], d: number): number {
  const n = arr.length;
  // Memoization array to store the maximum jumps possible starting from each index.
  // Initialized with 0 means unvisited.
  const dp = new Int32Array(n).fill(0);

  function dfs(i: number): number {
    // If already computed, return the cached result
    if (dp[i] !== 0) {
      return dp[i];
    }

    let maxJumpsFromI = 1; // Including the current index itself

    // Explore jumps to the right
    for (let x = 1; x <= d; x++) {
      const j = i + x;
      // Break early if we go out of bounds or encounter a taller/equal building
      if (j >= n || arr[j] >= arr[i]) {
        break;
      }
      maxJumpsFromI = Math.max(maxJumpsFromI, 1 + dfs(j));
    }

    // Explore jumps to the left
    for (let x = 1; x <= d; x++) {
      const j = i - x;
      // Break early if we go out of bounds or encounter a taller/equal building
      if (j < 0 || arr[j] >= arr[i]) {
        break;
      }
      maxJumpsFromI = Math.max(maxJumpsFromI, 1 + dfs(j));
    }

    // Cache and return the result for the current index
    dp[i] = maxJumpsFromI;
    return maxJumpsFromI;
  }

  let maxVisited = 0;

  // Evaluate the maximum jumps if we start from any of the indices
  for (let i = 0; i < n; i++) {
    maxVisited = Math.max(maxVisited, dfs(i));
  }

  return maxVisited;
}

// Example usage:
console.log(maxJumps([6, 4, 14, 6, 8, 13, 9, 7, 10, 6, 12], 2)); // Output: 4
console.log(maxJumps([3, 3, 3, 3, 3], 3)); // Output: 1
console.log(maxJumps([7, 6, 5, 4, 3, 2, 1], 1)); // Output: 7
