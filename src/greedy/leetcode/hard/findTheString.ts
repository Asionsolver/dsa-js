// 2573. Find the String with LCP

/**
Example 1:

Input: lcp = [[4,0,2,0],[0,3,0,1],[2,0,2,0],[0,1,0,1]]
Output: "abab"
Explanation: lcp corresponds to any 4 letter string with two alternating letters. The lexicographically smallest of them is "abab".
Example 2:

Input: lcp = [[4,3,2,1],[3,3,2,1],[2,2,2,1],[1,1,1,1]]
Output: "aaaa"
Explanation: lcp corresponds to any 4 letter string with a single distinct letter. The lexicographically smallest of them is "aaaa". 
Example 3:

Input: lcp = [[4,3,2,1],[3,3,2,1],[2,2,2,1],[1,1,1,3]]
Output: ""
Explanation: lcp[3][3] cannot be equal to 3 since word[3,...,3] consists of only a single letter; Thus, no answer exists.

*/

const lcp = [
  [4, 0, 2, 0],
  [0, 3, 0, 1],
  [2, 0, 2, 0],
  [0, 1, 0, 1],
];

const findTheString = function (lcp: number[][]): string {
  const n = lcp.length;
  const word: string[] = new Array(n).fill("");
  let c = 97; // ASCII decimal value for 'a'

  // Step 1: Construct the candidate string
  for (let i = 0; i < n; i++) {
    if (word[i] === "") {
      if (c > 122) {
        // 122 is the ASCII decimal value for 'z'
        return ""; // Requires more than 26 distinct characters
      }
      const charC = String.fromCharCode(c);
      for (let j = i; j < n; j++) {
        if (lcp[i][j] > 0) {
          word[j] = charC;
        }
      }
      c++; // Increment character representation to uniformly fetch next distinct alphabetical letter
    }
  }

  // Step 2: Verify the candidate string fully aligns with the given LCP matrix properties
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (word[i] !== word[j]) {
        if (lcp[i][j] !== 0) {
          return "";
        }
      } else {
        let expected = 1;
        if (i + 1 < n && j + 1 < n) {
          expected += lcp[i + 1][j + 1];
        }
        if (lcp[i][j] !== expected) {
          return "";
        }
      }
    }
  }

  return word.join("");
};

console.log(findTheString(lcp));
