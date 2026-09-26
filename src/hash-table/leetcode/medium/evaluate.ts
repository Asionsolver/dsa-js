// 1807. Evaluate the Bracket Pairs of a String

/**
You are given a string s that contains some bracket pairs, with each pair containing a non-empty key.

For example, in the string "(name)is(age)yearsold", there are two bracket pairs that contain the keys "name" and "age".
You know the values of a wide range of keys. This is represented by a 2D string array knowledge where each knowledge[i] = [keyi, valuei] indicates that key keyi has a value of valuei.

You are tasked to evaluate all of the bracket pairs. When you evaluate a bracket pair that contains some key keyi, you will:

Replace keyi and the bracket pair with the key's corresponding valuei.
If you do not know the value of the key, you will replace keyi and the bracket pair with a question mark "?" (without the quotation marks).
Each key will appear at most once in your knowledge. There will not be any nested brackets in s.

Return the resulting string after evaluating all of the bracket pairs.
*/

/**
Example 1:

Input: s = "(name)is(age)yearsold", knowledge = [["name","bob"],["age","two"]]
Output: "bobistwoyearsold"
Explanation:
The key "name" has a value of "bob", so replace "(name)" with "bob".
The key "age" has a value of "two", so replace "(age)" with "two".
Example 2:

Input: s = "hi(name)", knowledge = [["a","b"]]
Output: "hi?"
Explanation: As you do not know the value of the key "name", replace "(name)" with "?".
Example 3:

Input: s = "(a)(a)(a)aaa", knowledge = [["a","yes"]]
Output: "yesyesyesaaa"
Explanation: The same key can appear multiple times.
The key "a" has a value of "yes", so replace all occurrences of "(a)" with "yes".
Notice that the "a"s not in a bracket pair are not evaluated.

*/

/**
Constraints:

1 <= s.length <= 105
0 <= knowledge.length <= 105
knowledge[i].length == 2
1 <= keyi.length, valuei.length <= 10
s consists of lowercase English letters and round brackets '(' and ')'.
Every open bracket '(' in s will have a corresponding close bracket ')'.
The key in each bracket pair of s will be non-empty.
There will not be any nested bracket pairs in s.
keyi and valuei consist of lowercase English letters.
Each keyi in knowledge is unique.
*/

// Brute Force Approach: Use a linear search to find the value of each key in the knowledge array.
// function evaluate(s: string, knowledge: string[][]): string {
//   const result: string[] = [];
//   let i = 0;

//   while (i < s.length) {
//     if (s[i] === "(") {
//       let key = "";
//       i++; // Skip the '(' character.
//       // Collect characters until the closing bracket is reached.
//       while (i < s.length && s[i] !== ")") {
//         key += s[i];
//         i++;
//       }

//       // Linearly search for the key in knowledge array.
//       let foundValue: string | null = null;
//       for (let j = 0; j < knowledge.length; j++) {
//         if (knowledge[j][0] === key) {
//           foundValue = knowledge[j][1];
//           break;
//         }
//       }

//       // Append the found value or '?' if the key is missing.
//       if (foundValue !== null) {
//         result.push(foundValue);
//       } else {
//         result.push("?");
//       }
//     } else {
//       // Normal character outside brackets.
//       result.push(s[i]);
//     }
//     i++;
//   }

//   return result.join("");
// }

// Optimized Approach: Use a Map for O(1) lookups of key-value pairs.
function evaluate(s: string, knowledge: string[][]): string {
  // Populate the Hash Map for O(1) average lookup time.
  const knowledgeMap = new Map<string, string>();
  for (const [key, value] of knowledge) {
    knowledgeMap.set(key, value);
  }

  const result: string[] = [];
  let currentKey = "";
  let isInsideBracket = false;

  // Traverse the string in a single pass.
  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char === "(") {
      // Entering a bracket pair.
      isInsideBracket = true;
    } else if (char === ")") {
      // Exiting the bracket pair; evaluate the collected key.
      isInsideBracket = false;

      if (knowledgeMap.has(currentKey)) {
        result.push(knowledgeMap.get(currentKey)!);
      } else {
        result.push("?");
      }

      // Reset the key buffer for the next pair.
      currentKey = "";
    } else {
      // If inside brackets, build the key; otherwise, keep the original character.
      if (isInsideBracket) {
        currentKey += char;
      } else {
        result.push(char);
      }
    }
  }

  // Join the array into the final evaluated string.
  return result.join("");
}

// Example usage:
const s1 = "(name)is(age)yearsold";
const knowledge1 = [
  ["name", "bob"],
  ["age", "two"],
];
console.log(evaluate(s1, knowledge1)); // Output: "bobistwoyearsold"

const s2 = "hi(name)";
const knowledge2 = [["a", "b"]];
console.log(evaluate(s2, knowledge2)); // Output: "hi?"

const s3 = "(a)(a)(a)aaa";
const knowledge3 = [["a", "yes"]];
console.log(evaluate(s3, knowledge3)); // Output: "yesyesyesaaa"
