//1081: Smallest Subsequence of Distinct Characters

/**
Example 1:

Input: s = "bcabc"
Output: "abc"
Example 2:

Input: s = "cbacdcbc"
Output: "acdb"
*/

function smallestSubsequence(s: string): string {
  // Store the last index where each character appears
  const lastOccurrence: number[] = new Array(26).fill(-1);
  for (let i = 0; i < s.length; i++) {
    lastOccurrence[s.charCodeAt(i) - 97] = i;
  }

  const inStack: boolean[] = new Array(26).fill(false);
  const stack: string[] = [];

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const code = char.charCodeAt(0) - 97;

    // If the character is already in our stack, skip it to maintain uniqueness
    if (inStack[code]) {
      continue;
    }

    // Pop characters from the stack if:
    // 1. The stack is not empty.
    // 2. The top character is lexicographically greater than the current character.
    // 3. The top character appears again later in the string.
    while (
      stack.length > 0 &&
      stack[stack.length - 1] > char &&
      lastOccurrence[stack[stack.length - 1].charCodeAt(0) - 97] > i
    ) {
      const popped = stack.pop()!;
      inStack[popped.charCodeAt(0) - 97] = false;
    }

    // Push the current character and mark it as present in the stack
    stack.push(char);
    inStack[code] = true;
  }

  return stack.join("");
}

// Example usage:
console.log(smallestSubsequence("bcabc")); // Output: "abc"
console.log(smallestSubsequence("cbacdcbc")); // Output: "acdb"
