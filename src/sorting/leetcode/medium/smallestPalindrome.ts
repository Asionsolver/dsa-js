// 3517. Smallest Palindromic Rearrangement I

/**
Example 1:

Input: s = "z"

Output: "z"

Explanation:

A string of only one character is already the lexicographically smallest palindrome.

Example 2:

Input: s = "babab"

Output: "abbba"

Explanation:

Rearranging "babab" → "abbba" gives the smallest lexicographic palindrome.

Example 3:

Input: s = "daccad"

Output: "acddca"

Explanation:

Rearranging "daccad" → "acddca" gives the smallest lexicographic palindrome.


*/

function smallestPalindrome(s: string): string {
  const cnt: number[] = new Array(26).fill(0);
  const n = s.length;

  // Step 1: Count the occurrences of each character
  for (let i = 0; i < n; i++) {
    cnt[s.charCodeAt(i) - 97]++;
  }

  const half: string[] = [];
  let mid = "";

  // Step 2 & 3: Distribute characters to the first half and find the middle character
  for (let i = 0; i < 26; i++) {
    const char = String.fromCharCode(i + 97);
    const halfCount = Math.floor(cnt[i] / 2);

    if (halfCount > 0) {
      half.push(char.repeat(halfCount));
    }

    if (cnt[i] % 2 === 1) {
      mid = char;
    }
  }

  const firstHalf = half.join("");
  // Step 4: Reverse the array blocks of identical characters to form the second half
  const secondHalf = [...half].reverse().join("");

  // Step 5: Combine into a complete palindrome
  return firstHalf + mid + secondHalf;
}

// Example usage:
console.log(smallestPalindrome("z")); // Output: "z"
console.log(smallestPalindrome("babab")); // Output: "abbba"
console.log(smallestPalindrome("daccad")); // Output: "acddca"
