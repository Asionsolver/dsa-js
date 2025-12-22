// 996. Number of Squareful Arrays

/**
Example 1:

Input: nums = [1,17,8]
Output: 2
Explanation: [1,8,17] and [17,8,1] are the valid permutations.
Example 2:

Input: nums = [2,2,2]
Output: 1

*/

const nums = [1, 17, 8];

const numSquarefulPerms = function (nums: number[]): number {
  // 1. Count frequencies of each number to handle duplicates
  const countMap = new Map<number, number>();
  for (const num of nums) {
    countMap.set(num, (countMap.get(num) || 0) + 1);
  }

  // 2. Build an adjacency graph where graph[u] = [v1, v2...]
  // such that u + v is a perfect square.
  // We only care about unique numbers as keys/values here.
  const uniqueNums = Array.from(countMap.keys());
  const graph = new Map<number, number[]>();

  // Initialize graph entries
  for (const num of uniqueNums) {
    graph.set(num, []);
  }

  // Populate edges
  for (let i = 0; i < uniqueNums.length; i++) {
    for (let j = i; j < uniqueNums.length; j++) {
      const u = uniqueNums[i];
      const v = uniqueNums[j];
      if (isPerfectSquare(u + v)) {
        graph.get(u)!.push(v);
        if (u !== v) {
          graph.get(v)!.push(u);
        }
      }
    }
  }

  // 3. DFS Backtracking function
  // currentNum: The last number added to the permutation
  // itemsLeft: How many numbers still need to be added
  function dfs(currentNum: number, itemsLeft: number): number {
    // Base case: If we have placed all items, we found 1 valid permutation
    if (itemsLeft === 0) {
      return 1;
    }

    let totalPermutations = 0;
    const neighbors = graph.get(currentNum) || [];

    for (const nextNum of neighbors) {
      // Only use this neighbor if we still have copies of it available
      const count = countMap.get(nextNum) || 0;
      if (count > 0) {
        // Use the number
        countMap.set(nextNum, count - 1);

        // Recurse
        totalPermutations += dfs(nextNum, itemsLeft - 1);

        // Backtrack (restore count)
        countMap.set(nextNum, count);
      }
    }

    return totalPermutations;
  }

  // 4. Start DFS from every unique number
  let result = 0;
  for (const startNum of uniqueNums) {
    // Use the starting number
    const count = countMap.get(startNum)!;
    countMap.set(startNum, count - 1);

    // We need to fill nums.length - 1 more spots
    result += dfs(startNum, nums.length - 1);

    // Backtrack
    countMap.set(startNum, count);
  }

  return result;
};

// Helper to check if a number is a perfect square
function isPerfectSquare(num: number): boolean {
  if (num < 0) return false;
  const sqrt = Math.sqrt(num);
  // Check if the square root is an integer
  return sqrt === Math.floor(sqrt);
}
console.log(numSquarefulPerms(nums));
