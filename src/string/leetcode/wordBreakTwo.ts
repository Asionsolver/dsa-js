// 140. Word Break II

/**
Example 1: Input: s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"] 
Output: ["cats and dog","cat sand dog"] 

Example 2: Input: s = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"] 
Output: ["pine apple pen apple","pineapple pen apple","pine applepen apple"] 
Explanation: Note that you are allowed to reuse a dictionary word. 

Example 3: Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"] 
Output: []
 */
const s = "catsanddog";
const wordDict = ["cat", "cats", "and", "sand", "dog"];

var wordBreak = function (s: string, wordDict: string[]): string[] {
  const wordSet = new Set<string>(wordDict);
  const memo = new Map<number, string[]>();

  function dfs(start: number): string[] {
    if (memo.has(start)) return memo.get(start)!;
    if (start === s.length) return [""]; // Base: empty sentence

    const result: string[] = [];

    for (let word of wordSet) {
      if (s.startsWith(word, start)) {
        const subs: string[] = dfs(start + word.length);
        for (let sub of subs) {
          result.push(sub === "" ? word : word + " " + sub);
        }
      }
    }

    memo.set(start, result);
    return result;
  }

  return dfs(0);
};

console.log(wordBreak(s, wordDict));
