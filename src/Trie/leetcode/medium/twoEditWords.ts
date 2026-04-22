// 2452. Words Within Two Edits of Dictionary

/**
Example 1:

Input: queries = ["word","note","ants","wood"], dictionary = ["wood","joke","moat"]
Output: ["word","note","wood"]
Explanation:
- Changing the 'r' in "word" to 'o' allows it to equal the dictionary word "wood".
- Changing the 'n' to 'j' and the 't' to 'k' in "note" changes it to "joke".
- It would take more than 2 edits for "ants" to equal a dictionary word.
- "wood" can remain unchanged (0 edits) and match the corresponding dictionary word.
Thus, we return ["word","note","wood"].
Example 2:

Input: queries = ["yes"], dictionary = ["not"]
Output: []
Explanation:
Applying any two edits to "yes" cannot make it equal to "not". Thus, we return an empty array.
*/

const twoEditWords = (queries: string[], dictionary: string[]): string[] => {
  const result: string[] = [];
  const n = queries[0].length;

  for (const q of queries) {
    for (const d of dictionary) {
      let diff = 0;

      // Compare characters of the query word and dictionary word
      for (let i = 0; i < n; i++) {
        if (q[i] !== d[i]) {
          diff++;

          // Early exit if the number of edits exceeds 2
          if (diff > 2) {
            break;
          }
        }
      }

      // If we found a matching dictionary word with <= 2 edits
      if (diff <= 2) {
        result.push(q);
        break; // Stop looking for further matches for this query word
      }
    }
  }

  return result;
};

// Example usage:
const queries1 = ["word", "note", "ants", "wood"];
const dictionary1 = ["wood", "joke", "moat"];
console.log(twoEditWords(queries1, dictionary1)); // Output: ["word","note","wood"]

const queries2 = ["yes"];
const dictionary2 = ["not"];
console.log(twoEditWords(queries2, dictionary2)); // Output: []
