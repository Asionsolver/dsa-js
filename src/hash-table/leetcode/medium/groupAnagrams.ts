// 49. Group Anagrams

/**
Given an array of strings strs, group the anagrams together. You can return the answer in any order.
*/

/**
 Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]

Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Explanation:

There is no string in strs that can be rearranged to form "bat".
The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.
Example 2:

Input: strs = [""]

Output: [[""]]

Example 3:

Input: strs = ["a"]

Output: [["a"]]
 */

/**
 Constraints:

1 <= strs.length <= 104
0 <= strs[i].length <= 100
strs[i] consists of lowercase English letters.
 */

const groupAnagrams = function (strs: string[]) {
  let strMap = new Map();

  for (const word of strs) {
    const key = word.split("").sort().join(""); // sorted string key
    if (!strMap.has(key)) {
      strMap.set(key, []);
    }
    strMap.get(key).push(word);
  }
  return Array.from(strMap.values());
};

// Test cases
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])); // [["eat","tea","ate"],["tan","nat"],["bat"]]
console.log(groupAnagrams([""])); // [[""]]
console.log(groupAnagrams(["a"])); // [["a"]]
