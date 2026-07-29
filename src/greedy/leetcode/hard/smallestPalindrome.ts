// 3518. Smallest Palindromic Rearrangement II

/**
Example 1:

Input: s = "abba", k = 2

Output: "baab"

Explanation:

The two distinct palindromic rearrangements of "abba" are "abba" and "baab".
Lexicographically, "abba" comes before "baab". Since k = 2, the output is "baab".
Example 2:

Input: s = "aa", k = 2

Output: ""

Explanation:

There is only one palindromic rearrangement: "aa".
The output is an empty string since k = 2 exceeds the number of possible rearrangements.
Example 3:

Input: s = "bacab", k = 1

Output: "abcba"

Explanation:

The two distinct palindromic rearrangements of "bacab" are "abcba" and "bacab".
Lexicographically, "abcba" comes before "bacab". Since k = 1, the output is "abcba".
 


*/

function smallestPalindrome(s: string, k: number): string {
  const MAX_K = 1000001; // Since k <= 1e6, we can safely truncate any count at 1,000,001
  const n = s.length;
  const halfLen = Math.floor(n / 2);
  const half = s.substring(0, halfLen);
  const mid = n % 2 === 1 ? s[halfLen] : "";

  // Count the frequency of each character in the left half
  const cnt: number[] = new Array(26).fill(0);
  for (let i = 0; i < halfLen; i++) {
    cnt[half.charCodeAt(i) - 97]++;
  }

  // Helper to calculate combination C(n, r) with truncation
  function comb(n: number, r: number, maxVal: number): number {
    r = Math.min(r, n - r);
    let res = 1;
    for (let i = 1; i <= r; i++) {
      res = Math.floor((res * (n - i + 1)) / i);
      if (res >= maxVal) {
        return maxVal;
      }
    }
    return res;
  }

  // Helper to calculate the multiset permutation count:
  // n! / (cnt[0]! * cnt[1]! * ... * cnt[25]!) computed using combinations to prevent overflow
  function countArrangements(cnt: number[], maxVal: number): number {
    let total = 0;
    for (let i = 0; i < 26; i++) {
      total += cnt[i];
    }
    let res = 1;
    for (let i = 0; i < 26; i++) {
      const c = cnt[i];
      if (c === 0) continue;
      res *= comb(total, c, maxVal);
      if (res >= maxVal) {
        return maxVal;
      }
      total -= c;
    }
    return res;
  }

  // If the total number of distinct palindromic rearrangements is less than k
  if (countArrangements(cnt, MAX_K) < k) {
    return "";
  }

  const ans: string[] = [];
  for (let step = 0; step < halfLen; step++) {
    for (let i = 0; i < 26; i++) {
      if (cnt[i] === 0) continue;

      // Tentatively place the character (i + 'a')
      cnt[i]--;
      const ways = countArrangements(cnt, MAX_K);

      if (k <= ways) {
        ans.push(String.fromCharCode(97 + i));
        break; // Found the correct character for this position
      } else {
        // Backtrack and reduce k by the number of permutations skipped
        cnt[i]++;
        k -= ways;
      }
    }
  }

  const left = ans.join("");
  const right = [...ans].reverse().join("");
  return left + mid + right;
}

// Example usage:
console.log(smallestPalindrome("abba", 2)); // Output: "baab"
console.log(smallestPalindrome("aa", 2)); // Output: ""
console.log(smallestPalindrome("bacab", 1)); // Output: "abcba"
