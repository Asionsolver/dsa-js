// 2657. Find the Prefix Common Array of Two Arrays

/**
Example 1:

Input: A = [1,3,2,4], B = [3,1,2,4]
Output: [0,2,3,4]
Explanation: At i = 0: no number is common, so C[0] = 0.
At i = 1: 1 and 3 are common in A and B, so C[1] = 2.
At i = 2: 1, 2, and 3 are common in A and B, so C[2] = 3.
At i = 3: 1, 2, 3, and 4 are common in A and B, so C[3] = 4.
Example 2:

Input: A = [2,3,1], B = [3,1,2]
Output: [0,1,3]
Explanation: At i = 0: no number is common, so C[0] = 0.
At i = 1: only 3 is common in A and B, so C[1] = 1.
At i = 2: 1, 2, and 3 are common in A and B, so C[2] = 3.

*/

function findThePrefixCommonArray(A: number[], B: number[]): number[] {
  const n = A.length;
  // Frequency array to track occurrences of elements from 1 to n
  const freq = new Array(n + 1).fill(0);
  const C: number[] = new Array(n);
  let commonCount = 0;

  for (let i = 0; i < n; i++) {
    // Process element from array A
    freq[A[i]]++;
    if (freq[A[i]] === 2) {
      commonCount++;
    }

    // Process element from array B
    freq[B[i]]++;
    if (freq[B[i]] === 2) {
      commonCount++;
    }

    // Record the number of common elements found so far
    C[i] = commonCount;
  }

  return C;
}

// Example usage:
const A1 = [1, 3, 2, 4];
const B1 = [3, 1, 2, 4];
console.log(findThePrefixCommonArray(A1, B1)); // Output: [0, 2, 3, 4]

const A2 = [2, 3, 1];
const B2 = [3, 1, 2];
console.log(findThePrefixCommonArray(A2, B2)); // Output: [0, 1, 3]
