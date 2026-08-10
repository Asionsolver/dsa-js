// Encode and Decode Strings

/**
Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.
*/

/**
Machine 1 (sender) has the function:

String encode(List<String> strs) {
    // ... your code
    return encoded_string;
}
Machine 2 (receiver) has the function:

List<String> decode(String encoded_string) {
    // ... your code
    return decoded_strs;
}
So Machine 1 does:

String encoded_string = encode(strs);
and Machine 2 does:

List<String> decoded_strs = decode(encoded_string);
decoded_strs in Machine 2 should be the same as the input strs in Machine 1.

Implement the encode and decode methods.
*/

/**
Example 1:

Input: strs = ["Hello","World"]

Output: ["Hello","World"]
Explanation:

Solution solution = new Solution();
String encoded_string = solution.encode(strs);

// Machine 1 ---encoded_string---> Machine 2

List<String> decoded_strs = solution.decode(encoded_string);

Example 2:

Input: strs = [""]

Output: [""]

*/

/**
Constraints:

0 <= strs.length < 100
0 <= strs[i].length < 200
strs[i] contains any possible characters out of 256 valid ASCII characters.

Follow up: Could you write a generalized algorithm to work on any possible set of characters?
*/

// Approach:  Length-Prefixing
class Codec {
  /**
   * Encodes an array of strings into a single string.
   */
  encode(strs: string[]): string {
    let encodedString = "";

    for (const str of strs) {
      // Formate: [length]+[#]+[main string]
      encodedString = `${str.length}#${str}`;
    }
    return encodedString;
  }

  /**
   * Decodes a single string and converts it into an array of the previous string.
   */

  decode(str: string): string[] {
    const decodedString: string[] = [];
    let i = 0;
    while (i < str.length) {
      // First find the index of the hash '#' symbol
      let j = i;
      while (str[j] !== "#") {
        j++;
      }
      // The part before '#' is the length of the next string
      const length = parseInt(str.substring(i, j), 10);

      // Cut the part of the original string according to the length
      const startOfStr = j + 1;
      const endOfStr = startOfStr + length;
      const s = str.substring(startOfStr, endOfStr);
      decodedString.push(s);

      // Move the pointer to the beginning of the next string
      i = endOfStr;
    }
    return decodedString;
  }
}

// Test the Codec class
const codec = new Codec();
const strs = ["Hello", "World"];
const encodedString = codec.encode(strs);
console.log("Encoded String:", encodedString);

const decodedStrs = codec.decode(encodedString);
console.log("Decoded Strings:", decodedStrs);

const emptyStrs = [""];
const encodedEmptyString = codec.encode(emptyStrs);
console.log("Encoded Empty String:", encodedEmptyString);

const decodedEmptyStrs = codec.decode(encodedEmptyString);
console.log("Decoded Empty Strings:", decodedEmptyStrs);

const specialStrs = ["Hello#World", "Test#String"];
const encodedSpecialString = codec.encode(specialStrs);
console.log("Encoded Special String:", encodedSpecialString);

const decodedSpecialStrs = codec.decode(encodedSpecialString);
console.log("Decoded Special Strings:", decodedSpecialStrs);

const complexStrs = ["Hello#World", "", "Test#String", "Another#Test"];
const encodedComplexString = codec.encode(complexStrs);
console.log("Encoded Complex String:", encodedComplexString);

const decodedComplexStrs = codec.decode(encodedComplexString);
console.log("Decoded Complex Strings:", decodedComplexStrs);
