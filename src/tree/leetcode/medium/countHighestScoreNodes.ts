// 2049. Count Nodes With the Highest Score

/**
Example 1:

example-1
Input: parents = [-1,2,0,2,0]
Output: 3
Explanation:
- The score of node 0 is: 3 * 1 = 3
- The score of node 1 is: 4 = 4
- The score of node 2 is: 1 * 1 * 2 = 2
- The score of node 3 is: 4 = 4
- The score of node 4 is: 4 = 4
The highest score is 4, and three nodes (node 1, node 3, and node 4) have the highest score.
Example 2:

example-2
Input: parents = [-1,2,0]
Output: 2
Explanation:
- The score of node 0 is: 2 = 2
- The score of node 1 is: 2 = 2
- The score of node 2 is: 1 * 1 = 1
The highest score is 2, and two nodes (node 0 and node 1) have the highest score.

*/
function countHighestScoreNodes(parents: number[]): number {
  const n = parents.length;

  // Stores the index of the left and right children for each node.
  // -1 indicates no child exists.
  const leftChild = new Int32Array(n).fill(-1);
  const rightChild = new Int32Array(n).fill(-1);

  // Determines how many children a node has that haven't been processed yet.
  const outDegree = new Uint32Array(n);

  // Build the tree structure
  for (let i = 1; i < n; i++) {
    const p = parents[i];
    outDegree[p]++;

    if (leftChild[p] === -1) {
      leftChild[p] = i;
    } else {
      rightChild[p] = i;
    }
  }

  // Stores the size of the subtree rooted at index i (initially 1 for the node itself)
  const subtreeSize = new Uint32Array(n).fill(1);

  // Queue for processing nodes from leaves up to the root
  const queue: number[] = [];

  // Initialize queue with leaf nodes
  for (let i = 0; i < n; i++) {
    if (outDegree[i] === 0) {
      queue.push(i);
    }
  }

  let maxScore = 0;
  let count = 0;
  let head = 0;

  while (head < queue.length) {
    const node = queue[head++];

    // Calculate Score
    let product = 1;

    // Left Subtree Size
    const l = leftChild[node];
    if (l !== -1) {
      product *= subtreeSize[l];
    }

    // Right Subtree Size
    const r = rightChild[node];
    if (r !== -1) {
      product *= subtreeSize[r];
    }

    // Rest of Tree Size (Parent side)
    const restSize = n - subtreeSize[node];
    if (restSize > 0) {
      product *= restSize;
    }

    // Update Stats
    if (product > maxScore) {
      maxScore = product;
      count = 1;
    } else if (product === maxScore) {
      count++;
    }

    // Process Parent
    const p = parents[node];
    if (p !== -1) {
      subtreeSize[p] += subtreeSize[node];
      outDegree[p]--;
      if (outDegree[p] === 0) {
        queue.push(p);
      }
    }
  }

  return count;
}

// ==========================================
// LOCAL TESTING CODE
// ==========================================

function runTests() {
  const testCases = [
    {
      parents: [-1, 2, 0, 2, 0],
      expected: 3,
      description: "Example 1",
    },
    {
      parents: [-1, 2, 0],
      expected: 2,
      description: "Example 2",
    },
    // You can add more custom cases here
    {
      parents: [-1, 0],
      expected: 2,
      description: "Simple Root + 1 Child",
    },
  ];

  console.log("Running Tests...\n");

  testCases.forEach((test, index) => {
    const result = countHighestScoreNodes(test.parents);
    const passed = result === test.expected;

    console.log(`Test Case ${index + 1}: ${test.description}`);
    console.log(`Input: [${test.parents}]`);
    console.log(`Expected: ${test.expected}`);
    console.log(`Actual:   ${result}`);
    console.log(`Status:   ${passed ? "✅ PASS" : "❌ FAIL"}`);
    console.log("------------------------------------------------");
  });
}

// Execute the tests
runTests();
