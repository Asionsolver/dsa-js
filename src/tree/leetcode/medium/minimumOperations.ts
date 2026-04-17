// 2471. Minimum Number of Operations to Sort a Binary Tree by Level

/**
Example 1:


Input: root = [1,4,3,7,6,8,5,null,null,null,null,9,null,10]
Output: 3
Explanation:
- Swap 4 and 3. The 2nd level becomes [3,4].
- Swap 7 and 5. The 3rd level becomes [5,6,8,7].
- Swap 8 and 7. The 3rd level becomes [5,6,7,8].
We used 3 operations so return 3.
It can be proven that 3 is the minimum number of operations needed.
Example 2:


Input: root = [1,3,2,7,6,5,4]
Output: 3
Explanation:
- Swap 3 and 2. The 2nd level becomes [2,3].
- Swap 7 and 4. The 3rd level becomes [4,6,5,7].
- Swap 6 and 5. The 3rd level becomes [4,5,6,7].
We used 3 operations so return 3.
It can be proven that 3 is the minimum number of operations needed.
Example 3:


Input: root = [1,2,3,4,5,6]
Output: 0
Explanation: Each level is already sorted in increasing order so return 0.
*/

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function minimumOperations(root: TreeNode | null): number {
  if (!root) return 0;

  let operations = 0;
  let queue: TreeNode[] = [root];

  // Process the tree level by level (BFS)
  while (queue.length > 0) {
    const nextQueue: TreeNode[] = [];
    const currentLevelValues = new Int32Array(queue.length);

    for (let i = 0; i < queue.length; i++) {
      const node = queue[i];
      currentLevelValues[i] = node.val;

      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
    }

    operations += getMinSwaps(currentLevelValues);
    queue = nextQueue;
  }

  return operations;
}

function getMinSwaps(arr: Int32Array): number {
  const n = arr.length;
  // Create an array to keep track of the original indexes
  const indices = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    indices[i] = i;
  }

  // Sort indices based on the values in the original array
  indices.sort((a, b) => arr[a] - arr[b]);

  let swaps = 0;
  const visited = new Uint8Array(n);

  // Find cycles to determine the minimum required swaps
  for (let i = 0; i < n; i++) {
    // If the element is already processed or it's already in the correct position
    if (visited[i] || indices[i] === i) {
      continue;
    }

    let cycleSize = 0;
    let j = i;

    // Follow the mapped index references to form a closed cycle
    while (!visited[j]) {
      visited[j] = 1;
      j = indices[j];
      cycleSize++;
    }

    // A cycle of size `L` requires `L - 1` swaps to sort
    if (cycleSize > 0) {
      swaps += cycleSize - 1;
    }
  }

  return swaps;
}

// Example usage:
let root: TreeNode = new TreeNode(1);
root.left = new TreeNode(4);
root.right = new TreeNode(3);
root.left.left = new TreeNode(7);
root.left.right = new TreeNode(6);
root.right.left = new TreeNode(8);
root.right.right = new TreeNode(5);
root.left.left.left = null;
root.left.left.right = null;
root.left.right.left = null;
root.left.right.right = null;
root.right.left.left = null;
root.right.left.right = null;
root.right.right.left = null;
root.right.right.right = null;

console.log(minimumOperations(root)); // Output: 3
