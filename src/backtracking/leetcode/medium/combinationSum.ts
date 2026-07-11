// 39. Combination Sum

/**
Example 1:

Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
Example 2:

Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
Example 3:

Input: candidates = [2], target = 1
Output: []

*/

function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = [];

  // Sort candidates to enable early pruning
  candidates.sort((a, b) => a - b);

  function backtrack(
    startIndex: number,
    currentCombination: number[],
    currentSum: number,
  ): void {
    if (currentSum === target) {
      result.push([...currentCombination]);
      return;
    }

    for (let i = startIndex; i < candidates.length; i++) {
      const candidate = candidates[i];

      // If adding the current candidate exceeds the target,
      // we can stop early because candidates are sorted in ascending order.
      if (currentSum + candidate > target) {
        break;
      }

      // Choose the candidate
      currentCombination.push(candidate);

      // Explore: we pass 'i' as the startIndex so the same element can be reused
      backtrack(i, currentCombination, currentSum + candidate);

      // Unchoose the candidate (backtrack)
      currentCombination.pop();
    }
  }

  backtrack(0, [], 0);
  return result;
}

// Example usage:
const candidates1 = [2, 3, 6, 7];
const target1 = 7;
console.log(combinationSum(candidates1, target1)); // Output: [[2,2,3],[7]]

const candidates2 = [2, 3, 5];
const target2 = 8;
console.log(combinationSum(candidates2, target2)); // Output: [[2,2,2,2],[2,3,3],[3,5]]

const candidates3 = [2];
const target3 = 1;
console.log(combinationSum(candidates3, target3)); // Output: []
