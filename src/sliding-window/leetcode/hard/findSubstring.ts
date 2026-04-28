// 30. Substring with Concatenation of All Words

/**
Example 1:

Input: s = "barfoothefoobarman", words = ["foo","bar"]

Output: [0,9]

Explanation:

The substring starting at 0 is "barfoo". It is the concatenation of ["bar","foo"] which is a permutation of words.
The substring starting at 9 is "foobar". It is the concatenation of ["foo","bar"] which is a permutation of words.

Example 2:

Input: s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]

Output: []

Explanation:

There is no concatenated substring.

Example 3:

Input: s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]

Output: [6,9,12]

Explanation:

The substring starting at 6 is "foobarthe". It is the concatenation of ["foo","bar","the"].
The substring starting at 9 is "barthefoo". It is the concatenation of ["bar","the","foo"].
The substring starting at 12 is "thefoobar". It is the concatenation of ["the","foo","bar"].
*/

function findSubstring(s: string, words: string[]): number[] {
  if (!s || s.length === 0 || !words || words.length === 0) return [];

  // Hash map to store the expected frequencies of all words
  const wordCount = new Map<string, number>();
  for (const word of words) {
    wordCount.set(word, (wordCount.get(word) || 0) + 1);
  }

  const wordLen = words[0].length;
  const numWords = words.length;
  const totalLen = wordLen * numWords;
  const result: number[] = [];

  // Loop through the string with a sliding window of size totalLen
  for (let i = 0; i <= s.length - totalLen; i++) {
    const seen = new Map<string, number>();
    let j = 0;

    // Check if the current window contains all words with correct frequencies
    while (j < numWords) {
      const word = s.substring(i + j * wordLen, i + (j + 1) * wordLen);
      if (!wordCount.has(word)) break; // If the word is not in the list, break

      seen.set(word, (seen.get(word) || 0) + 1);
      if (seen.get(word)! > wordCount.get(word)!) break; // If frequency exceeds expected, break

      j++;
    }

    if (j === numWords) result.push(i); // If all words matched, add starting index to result
  }

  return result;
}

// Example usage:
console.log(findSubstring("barfoothefoobarman", ["foo", "bar"])); // Output: [0,9]
console.log(
  findSubstring("wordgoodgoodgoodbestword", ["word", "good", "best", "word"]),
); // Output: []
console.log(findSubstring("barfoofoobarthefoobarman", ["bar", "foo", "the"])); // Output: [6,9,12]
