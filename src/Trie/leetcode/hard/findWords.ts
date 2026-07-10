// 212. Word Search II

/**
Example 1:


Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
Example 2:


Input: board = [["a","b"],["c","d"]], words = ["abcb"]
Output: []
*/

class TrieNode {
  children: { [key: string]: TrieNode } = {};
  word: string | null = null;
  childrenCount: number = 0;
}

function findWords(board: string[][], words: string[]): string[] {
  const root = new TrieNode();

  // 1. Build the Trie
  for (const word of words) {
    let node = root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
        node.childrenCount++;
      }
      node = node.children[char];
    }
    node.word = word;
  }

  const result: string[] = [];
  const rows = board.length;
  const cols = board[0].length;

  // 2. DFS function with backtracking
  function dfs(r: number, c: number, node: TrieNode) {
    const char = board[r][c];
    const nextNode = node.children[char];
    if (!nextNode) return;

    // If a word is found, add to results and clear it to avoid duplicates
    if (nextNode.word !== null) {
      result.push(nextNode.word);
      nextNode.word = null;
    }

    // Mark current cell as visited
    board[r][c] = "#";

    const dirs = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        board[nr][nc] !== "#"
      ) {
        const nextChar = board[nr][nc];
        // Only step to the neighbor if it continues a valid prefix in our Trie
        if (nextNode.children[nextChar]) {
          dfs(nr, nc, nextNode);
        }
      }
    }

    // Restore cell (backtrack)
    board[r][c] = char;

    // 3. Trie Pruning:
    // If this node is a leaf (no children) and is no longer a word node,
    // we can safely prune it from its parent.
    if (nextNode.childrenCount === 0 && nextNode.word === null) {
      delete node.children[char];
      node.childrenCount--;
    }
  }

  // 4. Initiate search from every cell matching a root prefix
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (root.children[board[r][c]]) {
        dfs(r, c, root);
      }
    }
  }

  return result;
}

// Example usage:
const board = [
  ["o", "a", "a", "n"],
  ["e", "t", "a", "e"],
  ["i", "h", "k", "r"],
  ["i", "f", "l", "v"],
];
const words = ["oath", "pea", "eat", "rain"];
console.log(findWords(board, words)); // Output: ["eat","oath"]

const board2 = [
  ["a", "b"],
  ["c", "d"],
];
const words2 = ["abcb"];
console.log(findWords(board2, words2)); // Output: []
