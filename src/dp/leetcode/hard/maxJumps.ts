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
  // DP array to store the maximum jumps starting from each index.
  // Initialized to 0 to act as an "unvisited" marker.
  const dp = new Int32Array(n).fill(0);

  function dfs(i: number): number {
    // Return cached result if already computed
    if (dp[i] !== 0) {
      return dp[i];
    }

    let maxVisited = 1;

    // 1. Check jumps to the right
    // Math.min handles the right boundary constraint seamlessly
    for (let j = i + 1; j <= Math.min(i + d, n - 1); j++) {
      // We can only jump if the destination and all elements in between are strictly smaller.
      // If we encounter a larger or equal element, all further indices are blocked.
      if (arr[j] >= arr[i]) {
        break;
      }
      maxVisited = Math.max(maxVisited, 1 + dfs(j));
    }

    // 2. Check jumps to the left
    // Math.max handles the left boundary constraint seamlessly
    for (let j = i - 1; j >= Math.max(i - d, 0); j--) {
      if (arr[j] >= arr[i]) {
        break;
      }
      maxVisited = Math.max(maxVisited, 1 + dfs(j));
    }

    // Cache and return the result
    dp[i] = maxVisited;
    return maxVisited;
  }

  let result = 0;

  // We can choose any index to start jumping.
  // Find the max visited count across all possible starting positions.
  for (let i = 0; i < n; i++) {
    result = Math.max(result, dfs(i));
  }

  return result;
}

// Example usage:
console.log(maxJumps([6, 4, 14, 6, 8, 13, 9, 7, 10, 6, 12], 2)); // Output: 4
console.log(maxJumps([3, 3, 3, 3, 3], 3)); // Output: 1
console.log(maxJumps([7, 6, 5, 4, 3, 2, 1], 1)); // Output: 7
