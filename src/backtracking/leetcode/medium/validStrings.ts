// 3211. Generate Binary Strings Without Adjacent Zeros

/**

Example 1:

Input: n = 3

Output: ["010","011","101","110","111"]

Explanation:

The valid strings of length 3 are: "010", "011", "101", "110", and "111".

Example 2:

Input: n = 1

Output: ["0","1"]

Explanation:

The valid strings of length 1 are: "0" and "1".
*/

function validStrings(n: number): string[] {
  const result: string[] = [];

  function backtrack(currentStr: string): void {
    // Base case: if the string has reached the required length, add to results
    if (currentStr.length === n) {
      result.push(currentStr);
      return;
    }

    // We can append '0' ONLY if the string is empty or the last character is '1'
    if (currentStr.length === 0 || currentStr[currentStr.length - 1] === "1") {
      backtrack(currentStr + "0");
    }

    // We can always append '1'
    backtrack(currentStr + "1");
  }

  backtrack("");
  return result;
}

// Example usage:
console.log(validStrings(3)); // Output: ["010","011","101","110","111"]
console.log(validStrings(1)); // Output: ["0","1"]
