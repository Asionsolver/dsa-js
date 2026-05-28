// 3093. Longest Common Suffix Queries

/**

Example 1:

Input: wordsContainer = ["abcd","bcd","xbcd"], wordsQuery = ["cd","bcd","xyz"]

Output: [1,1,1]

Explanation:

Let's look at each wordsQuery[i] separately:

For wordsQuery[0] = "cd", strings from wordsContainer that share the longest common suffix "cd" are at indices 0, 1, and 2. Among these, the answer is the string at index 1 because it has the shortest length of 3.
For wordsQuery[1] = "bcd", strings from wordsContainer that share the longest common suffix "bcd" are at indices 0, 1, and 2. Among these, the answer is the string at index 1 because it has the shortest length of 3.
For wordsQuery[2] = "xyz", there is no string from wordsContainer that shares a common suffix. Hence the longest common suffix is "", that is shared with strings at index 0, 1, and 2. Among these, the answer is the string at index 1 because it has the shortest length of 3.
Example 2:

Input: wordsContainer = ["abcdefgh","poiuygh","ghghgh"], wordsQuery = ["gh","acbfgh","acbfegh"]

Output: [2,0,2]

Explanation:

Let's look at each wordsQuery[i] separately:

For wordsQuery[0] = "gh", strings from wordsContainer that share the longest common suffix "gh" are at indices 0, 1, and 2. Among these, the answer is the string at index 2 because it has the shortest length of 6.
For wordsQuery[1] = "acbfgh", only the string at index 0 shares the longest common suffix "fgh". Hence it is the answer, even though the string at index 2 is shorter.
For wordsQuery[2] = "acbfegh", strings from wordsContainer that share the longest common suffix "gh" are at indices 0, 1, and 2. Among these, the answer is the string at index 2 because it has the shortest length of 6.
*/

function stringIndices(
  wordsContainer: string[],
  wordsQuery: string[],
): number[] {
  const n = wordsContainer.length;
  let totalChars = 0;

  // Cache lengths to prevent repetitive property access overhead
  const lengths = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    lengths[i] = wordsContainer[i].length;
    totalChars += lengths[i];
  }

  // A flat array approach significantly mitigates the overhead and garbage collection
  // constraints of using custom node objects. It dramatically increases allocation and traversal speed.
  const MAX_NODES = totalChars + 2;
  const children = new Int32Array(MAX_NODES * 26).fill(-1);
  const bestIndex = new Int32Array(MAX_NODES).fill(-1);

  let nodeCount = 1; // 0 serves as the root node

  // Build the Trie via inverted insertion
  for (let i = 0; i < n; i++) {
    const word = wordsContainer[i];
    const len = lengths[i];
    let curr = 0;

    // Root node tracks the overall best fit string fallback (i.e. if no common suffix exists)
    if (bestIndex[0] === -1 || len < lengths[bestIndex[0]]) {
      bestIndex[0] = i;
    }

    // Add characters simulating the reversed word
    for (let j = len - 1; j >= 0; j--) {
      const charCode = word.charCodeAt(j) - 97; // 'a' code stands at 97
      const childIdx = curr * 26 + charCode;
      let next = children[childIdx];

      if (next === -1) {
        next = nodeCount++;
        children[childIdx] = next;
      }

      curr = next;

      // Maintain tying standards globally downward
      if (bestIndex[curr] === -1 || len < lengths[bestIndex[curr]]) {
        bestIndex[curr] = i;
      }
    }
  }

  // Seek solutions iteratively traversing nodes for the matching suffix components
  const m = wordsQuery.length;
  const ans: number[] = new Array(m);

  for (let i = 0; i < m; i++) {
    const word = wordsQuery[i];
    let curr = 0;

    for (let j = word.length - 1; j >= 0; j--) {
      const charCode = word.charCodeAt(j) - 97;
      const next = children[curr * 26 + charCode];

      // Break from evaluating if the character's line does not exist in our Trie mappings
      if (next === -1) {
        break;
      }

      curr = next;
    }
    ans[i] = bestIndex[curr];
  }

  return ans;
}

// Example Uses
console.log(stringIndices(["abcd", "bcd", "xbcd"], ["cd", "bcd", "xyz"])); // Output: [1, 1, 1]
console.log(
  stringIndices(["abcdefgh", "poiuygh", "ghghgh"], ["gh", "acbfgh", "acbfegh"]),
); // Output: [2, 0, 2]
