// 49. Group Anagrams
// const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

// const strs = [""];
// Output: [[""]]

const strs = ["a"];
// Output: [["a"]]

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

console.log(groupAnagrams(strs));
