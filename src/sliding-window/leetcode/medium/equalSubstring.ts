// 1208. Get Equal Substrings Within Budget

/**
Example 1:

Input: s = "abcd", t = "bcdf", maxCost = 3
Output: 3
Explanation: "abc" of s can change to "bcd".
That costs 3, so the maximum length is 3.
Example 2:

Input: s = "abcd", t = "cdef", maxCost = 3
Output: 1
Explanation: Each character in s costs 2 to change to character in t,  so the maximum length is 1.
Example 3:

Input: s = "abcd", t = "acde", maxCost = 0
Output: 1
Explanation: You cannot make any change, so the maximum length is 1.
*/

function equalSubstring(s: string, t: string, maxCost: number): number {
  let left = 0;
  let currentCost = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    // Add the cost of the current characters to the window
    currentCost += Math.abs(s.charCodeAt(right) - t.charCodeAt(right));

    // If the cost exceeds maxCost, shrink the window from the left
    while (currentCost > maxCost) {
      currentCost -= Math.abs(s.charCodeAt(left) - t.charCodeAt(left));
      left++;
    }

    // Update the maximum length found so far
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

//example use
console.log(equalSubstring("abcd", "bcdf", 3)); // Output: 3
console.log(equalSubstring("abcd", "cdef", 3)); // Output: 1
console.log(equalSubstring("abcd", "acde", 0)); // Output: 1
