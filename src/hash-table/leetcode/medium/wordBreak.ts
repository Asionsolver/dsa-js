// 139. Word Break

/**
Example 1:

Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
Example 2:

Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false

*/

// const s = "leetcode",
//   wordDict = ["leet", "code"];
const s = "catsandog",
  wordDict = ["cats", "dog", "sand", "and", "cat"];
const wordBreak = function (s: string, wordDict: string[]) {
  const wordSet = new Set(wordDict);
  const memo = new Map(); // memo[index] = true/false

  function dfs(start: number) {
    if (start === s.length) return true;
    if (memo.has(start)) return memo.get(start);

    for (let end = start + 1; end <= s.length; end++) {
      const word = s.slice(start, end);

      if (wordSet.has(word) && dfs(end)) {
        memo.set(start, true);
        return true;
      }
    }

    memo.set(start, false);
    return false;
  }

  return dfs(0);
};
console.log(wordBreak(s, wordDict));
