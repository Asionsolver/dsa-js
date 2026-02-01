// 1540. Can Convert String in K Moves

/**
Example 1:

Input: s = "input", t = "ouput", k = 9
Output: true
Explanation: In the 6th move, we shift 'i' 6 times to get 'o'. And in the 7th move we shift 'n' to get 'u'.
Example 2:

Input: s = "abc", t = "bcd", k = 10
Output: false
Explanation: We need to shift each character in s one time to convert it into t. We can shift 'a' to 'b' during the 1st move. However, there is no way to shift the other characters in the remaining moves to obtain t from s.
Example 3:

Input: s = "aab", t = "bbb", k = 27
Output: true
Explanation: In the 1st move, we shift the first 'a' 1 time to get 'b'. In the 27th move, we shift the second 'a' 27 times to get 'b'.
*/
const s = "abc",
  t = "bcd",
  k = 10;
const canConvertString = function (s: string, t: string, k: number): boolean {
  // If lengths differ, direct conversion is impossible.
  if (s.length !== t.length) {
    return false;
  }

  // Array to track how many times each shift amount (1 to 25) is needed.
  // indices 1-25 represent shifts 'a'->'b' (1) through 'a'->'z' (25).
  const shiftCounts = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    const charCodeS = s.charCodeAt(i);
    const charCodeT = t.charCodeAt(i);

    // If characters are the same, no move needed.
    if (charCodeS === charCodeT) {
      continue;
    }

    // Calculate the shift required (1 to 25)
    const diff = (charCodeT - charCodeS + 26) % 26;

    // Calculate the actual move index required for this specific instance of the shift.
    // Base move is 'diff'.
    // If we've seen this shift 'n' times before, we need to add 'n * 26'
    // to find the next available move index that satisfies (move % 26 == diff).
    const movesNeeded = diff + shiftCounts[diff] * 26;

    if (movesNeeded > k) {
      return false;
    }

    // Increment the count for this specific shift amount
    shiftCounts[diff]++;
  }

  return true;
};

console.log(canConvertString(s, t, k));
