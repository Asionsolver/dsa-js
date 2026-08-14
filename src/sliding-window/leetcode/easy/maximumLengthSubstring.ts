// 3090. Maximum Length Substring With Two Occurrences

/**
Given a string s, return the maximum length of a substring such that it contains at most two occurrences of each character.
 */

/**
Example 1:

Input: s = "bcbbbcba"

Output: 4

Explanation:

The following substring has a length of 4 and contains at most two occurrences of each character: "bcbbbcba".
Example 2:

Input: s = "aaaa"

Output: 2

Explanation:

The following substring has a length of 2 and contains at most two occurrences of each character: "aaaa".

 */

/**
 Constraints:

2 <= s.length <= 100
s consists only of lowercase English letters.
 */


// Approach: Sliding Window with Frequency Map
function maximumLengthSubstring(s: string): number {
    let left = 0;
    let maxLen = 0;
    // Frequency map for lowercase English letters
    const count: Map<string, number> = new Map();

    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        // Update frequency count for the current character
        count.set(char, (count.get(char) || 0) + 1);

        // Shrink the window if the current character appears more than twice
        while (count.get(char)! > 2) {
            const leftChar = s[left];
            count.set(leftChar, count.get(leftChar)! - 1);
            left++;
        }

        // Calculate the maximum length of the valid window
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

// Example usage:
const s1 = "bcbbbcba";
console.log(maximumLengthSubstring(s1)); // Output: 4

const s2 = "aaaa";
console.log(maximumLengthSubstring(s2)); // Output: 2