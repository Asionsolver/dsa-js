// 3043. Find the Length of the Longest Common Prefix

/**
Example 1:

Input: arr1 = [1,10,100], arr2 = [1000]
Output: 3
Explanation: There are 3 pairs (arr1[i], arr2[j]):
- The longest common prefix of (1, 1000) is 1.
- The longest common prefix of (10, 1000) is 10.
- The longest common prefix of (100, 1000) is 100.
The longest common prefix is 100 with a length of 3.
Example 2:

Input: arr1 = [1,2,3], arr2 = [4,4,4]
Output: 0
Explanation: There exists no common prefix for any pair (arr1[i], arr2[j]), hence we return 0.
Note that common prefixes between elements of the same array do not count.

*/

function longestCommonPrefix(arr1: number[], arr2: number[]): number {
  const prefixes = new Set<number>();

  // Step 1: Build a set of all possible prefixes from arr1
  for (let num of arr1) {
    while (num > 0) {
      prefixes.add(num);
      num = Math.floor(num / 10);
    }
  }

  let maxLen = 0;

  // Step 2: Check each number in arr2 for common prefixes
  for (let num of arr2) {
    // Optimization: If the current number's length is already <= maxLen,
    // it cannot provide a longer prefix than what we already found.
    let numStr = num.toString();
    if (numStr.length <= maxLen) continue;

    let current = num;
    while (current > 0) {
      // Check if this prefix exists in the Set
      if (prefixes.has(current)) {
        let currentLen = current.toString().length;
        maxLen = Math.max(maxLen, currentLen);
        // Since we start from the longest prefix of 'num',
        // the first match we find is the longest for this specific 'num'.
        break;
      }
      current = Math.floor(current / 10);
    }
  }

  return maxLen;
}

// Example usage:
const arr1 = [1, 10, 100];
const arr2 = [1000];
console.log(longestCommonPrefix(arr1, arr2)); // Output: 3

const arr3 = [1, 2, 3];
const arr4 = [4, 4, 4];
console.log(longestCommonPrefix(arr3, arr4)); // Output: 0
