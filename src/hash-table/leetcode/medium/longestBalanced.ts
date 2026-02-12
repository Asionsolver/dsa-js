// 3713. Longest Balanced Substring I

/**
 Example 1:

Input: s = "abbac"

Output: 4

Explanation:

The longest balanced substring is "abba" because both distinct characters 'a' and 'b' each appear exactly 2 times.

Example 2:

Input: s = "zzabccy"

Output: 4

Explanation:

The longest balanced substring is "zabc" because the distinct characters 'z', 'a', 'b', and 'c' each appear exactly 1 time.​​​​​​​

Example 3:

Input: s = "aba"

Output: 2

Explanation:

​​​​​​​One of the longest balanced substrings is "ab" because both distinct characters 'a' and 'b' each appear exactly 1 time. Another longest balanced substring is "ba".
 */

const s = "aba";

const longestBalancedSubstring =function (s: string): number {
    const n = s.length;
    let maxLen = 0;

    for (let i = 0; i < n; i++) {
        // Optimization: If the remaining substring length is less than or equal to 
        // the maxLen found so far, we cannot find a longer balanced substring starting at i.
        if (n - i <= maxLen) {
            break;
        }

        // Frequency array for characters 'a' to 'z'
        const freq = new Int16Array(26);
        let distinctCount = 0;
        let maxFreq = 0;

        for (let j = i; j < n; j++) {
            const charCode = s.charCodeAt(j) - 97; // Map 'a' to 0, 'b' to 1, etc.

            if (freq[charCode] === 0) {
                distinctCount++;
            }
            
            freq[charCode]++;
            
            // Update maxFreq efficiently
            if (freq[charCode] > maxFreq) {
                maxFreq = freq[charCode];
            }

            const currentLen = j - i + 1;
            
            // Check if the substring is balanced.
            // A substring is balanced if all distinct characters appear the same number of times.
            // This implies: distinctCount * frequency_of_each_char === length_of_substring
            if (maxFreq * distinctCount === currentLen) {
                if (currentLen > maxLen) {
                    maxLen = currentLen;
                }
            }
        }
    }

    return maxLen;
};

console.log(longestBalancedSubstring(s))