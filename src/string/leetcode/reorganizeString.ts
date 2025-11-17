// 767. Reorganize String

/**
Example 1:

Input: s = "aab"
Output: "aba"
Example 2:

Input: s = "aaab"
Output: ""
*/
const s = "aab";

const reorganizeString = function (s: string) {
  const hash = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    const index = s[i].charCodeAt(0) - 97;
    hash[index]++;
  }

  // find most frequent char
  let most_freq_char: string = "";
  let max_freq = -Infinity;
  for (let i = 0; i < hash.length; i++) {
    if (hash[i] > max_freq) {
      max_freq = hash[i];
      most_freq_char = String.fromCharCode(i + 97);
    }
  }
  //   console.log("Most frequent char:", most_freq_char);
  // build result array (string immutable, so we use array)
  const result = new Array(s.length).fill("");
  let index = 0;
  while (max_freq > 0 && index < s.length) {
    result[index] = most_freq_char;
    max_freq--;
    index += 2;
  }

  if (max_freq !== 0) {
    return "";
  }
  // mark this char as used
  const mostIndex = most_freq_char.charCodeAt(0) - 97;
  hash[mostIndex] = 0;
  // let's place the rest of the characters
  for (let i = 0; i < 26; i++) {
    while (hash[i] > 0) {
      index = index >= s.length ? 1 : index;
      result[index] = String.fromCharCode(i + 97);
      hash[i]--;
      index += 2;
    }
  }

  return result.join("");
};

console.log(reorganizeString(s));

// T.C-O(n)
