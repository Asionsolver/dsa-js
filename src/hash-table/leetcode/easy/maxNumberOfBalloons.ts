// 1189. Maximum Number of Balloons

/**
Example 1:



Input: text = "nlaebolko"
Output: 1
Example 2:



Input: text = "loonbalxballpoon"
Output: 2
Example 3:

Input: text = "leetcode"
Output: 0
*/

function maxNumberOfBalloons(text: string): number {
  // Initialize a frequency map for only the characters in "balloon"
  const counts: Record<string, number> = { b: 0, a: 0, l: 0, o: 0, n: 0 };

  // Count the occurrences of each relevant character in the input text
  for (const char of text) {
    if (char in counts) {
      counts[char]++;
    }
  }

  // Calculate the maximum number of times we can form "balloon".
  // For 'l' and 'o', we divide the count by 2 since each "balloon" requires two of them.
  return Math.min(
    counts["b"],
    counts["a"],
    Math.floor(counts["l"] / 2),
    Math.floor(counts["o"] / 2),
    counts["n"],
  );
}
