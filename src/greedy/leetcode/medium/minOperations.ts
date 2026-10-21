// 3863. Minimum Operations to Sort a String

/**
You are given a string s consisting of lowercase English letters.

In one operation, you can select any substring of s that is not the entire string and sort it in non-descending alphabetical order.

Return the minimum number of operations required to make s sorted in non-descending order. If it is not possible, return -1.
*/

/**
Example 1:

Input: s = "dog"

Output: 1

Explanation:​​​​​​​

Sort substring "og" to "go".
Now, s = "dgo", which is sorted in ascending order. Thus, the answer is 1.
Example 2:

Input: s = "card"

Output: 2

Explanation:

Sort substring "car" to "acr", so s = "acrd".
Sort substring "rd" to "dr", making s = "acdr", which is sorted in ascending order. Thus, the answer is 2.
Example 3:

Input: s = "gf"

Output: -1

Explanation:

It is impossible to sort s under the given constraints. Thus, the answer is -1.
 
*/

/**
Constraints:

1 <= s.length <= 105
s consists of only lowercase English letters.
*/

function minOperations(s: string): number {
  const n = s.length;

  // Check if the string is already sorted.
  let isSorted = true;
  for (let i = 1; i < n; i++) {
    if (s[i] < s[i - 1]) {
      isSorted = false;
      break;
    }
  }
  if (isSorted) return 0;

  // If length is 2 and not sorted, sorting is impossible.
  if (n === 2) return -1;

  // Find the global minimum and maximum characters.
  let minChar = s[0];
  let maxChar = s[0];
  for (let i = 1; i < n; i++) {
    if (s[i] < minChar) minChar = s[i];
    if (s[i] > maxChar) maxChar = s[i];
  }

  // If the minimum is at the start or maximum is at the end, 1 operation suffices.
  if (s[0] === minChar || s[n - 1] === maxChar) {
    return 1;
  }

  // Check if any minimum or maximum character exists in the middle substring s[1...n-2].
  let minInMiddle = false;
  let maxInMiddle = false;
  for (let i = 1; i < n - 1; i++) {
    if (s[i] === minChar) minInMiddle = true;
    if (s[i] === maxChar) maxInMiddle = true;
  }

  // If found in the middle, we can sort in 2 operations.
  if (minInMiddle || maxInMiddle) {
    return 2;
  }

  // Otherwise, maximum is uniquely at index 0 and minimum is uniquely at index n-1.
  return 3;
}

// Example usage:
console.log(minOperations("dog")); // Output: 1
console.log(minOperations("card")); // Output: 2
console.log(minOperations("gf")); // Output: -1
