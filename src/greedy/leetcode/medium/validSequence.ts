// 3302. Find the Lexicographically Smallest Valid Sequence

/**
Example 1:

Input: word1 = "vbcca", word2 = "abc"

Output: [0,1,2]

Explanation:

The lexicographically smallest valid sequence of indices is [0, 1, 2]:

Change word1[0] to 'a'.
word1[1] is already 'b'.
word1[2] is already 'c'.
Example 2:

Input: word1 = "bacdc", word2 = "abc"

Output: [1,2,4]

Explanation:

The lexicographically smallest valid sequence of indices is [1, 2, 4]:

word1[1] is already 'a'.
Change word1[2] to 'b'.
word1[4] is already 'c'.
Example 3:

Input: word1 = "aaaaaa", word2 = "aaabc"

Output: []

Explanation:

There is no valid sequence of indices.

Example 4:

Input: word1 = "abc", word2 = "ab"

Output: [0,1]


*/

function validSequence(word1: string, word2: string): number[] {
  const n = word1.length;
  const m = word2.length;

  // last[j] stores the largest index in word1 that can match word2[j]
  // such that the suffix word2[j:] is matched exactly.
  const last = new Int32Array(m).fill(-1);

  let i = n - 1;
  let j = m - 1;
  while (i >= 0 && j >= 0) {
    if (word1[i] === word2[j]) {
      last[j] = i;
      j--;
    }
    i--;
  }

  const ans: number[] = [];
  let canSkip = true;
  j = 0;

  // Greedily build the lexicographically smallest valid index array
  for (i = 0; i < n; i++) {
    if (j === m) {
      break;
    }
    if (word1[i] === word2[j]) {
      ans.push(i);
      j++;
    } else if (canSkip && (j === m - 1 || i < last[j + 1])) {
      canSkip = false; // Use the single allowed mismatch/change
      ans.push(i);
      j++;
    }
  }

  return j === m ? ans : [];
}

// Example usage:
console.log(validSequence("vbcca", "abc")); // Output: [0, 1, 2]
console.log(validSequence("bacdc", "abc")); // Output: [1, 2, 4]
console.log(validSequence("aaaaaa", "aaabc")); // Output: []
console.log(validSequence("abc", "ab")); // Output: [0, 1]
