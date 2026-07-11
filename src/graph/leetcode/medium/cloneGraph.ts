// 133. Clone Graph

/**
Example 1:


Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
Explanation: There are 4 nodes in the graph.
1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
Example 2:


Input: adjList = [[]]
Output: [[]]
Explanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.
Example 3:

Input: adjList = []
Output: []
Explanation: This an empty graph, it does not have any nodes.

*/

class _Node {
  val: number;
  neighbors: _Node[];

  constructor(val?: number, neighbors?: _Node[]) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
  }
}

function cloneGraph(node: _Node | null): _Node | null {
  if (node === null) {
    return null;
  }

  const visited = new Map<_Node, _Node>();
  const queue: _Node[] = [node];

  // Clone the starting node and map it
  visited.set(node, new _Node(node.val));

  while (queue.length > 0) {
    const curr = queue.shift()!;

    for (const neighbor of curr.neighbors) {
      if (!visited.has(neighbor)) {
        // Clone the neighbor and map it
        visited.set(neighbor, new _Node(neighbor.val));
        // Add the original neighbor to the queue to process its connections later
        queue.push(neighbor);
      }
      // Link the cloned current node to the cloned neighbor
      visited.get(curr)!.neighbors.push(visited.get(neighbor)!);
    }
  }

  return visited.get(node) || null;
}

// 3. Helper: Build a graph from an adjacency list
function buildGraph(adjList: number[][]): _Node | null {
  if (adjList.length === 0) {
    return null;
  }

  // Create all node instances first (nodes are 1-indexed)
  const nodes: _Node[] = Array.from(
    { length: adjList.length },
    (_, i) => new _Node(i + 1),
  );

  // Link the neighbors
  for (let i = 0; i < adjList.length; i++) {
    for (const neighborVal of adjList[i]) {
      nodes[i].neighbors.push(nodes[neighborVal - 1]);
    }
  }

  return nodes[0]; // Return the first node
}

// 4. Helper: Convert a graph back to an adjacency list for printing
function graphToAdjList(node: _Node | null): number[][] {
  if (node === null) {
    return [];
  }

  const visited = new Map<number, _Node>();

  // Traverse the graph to collect all unique nodes
  function traverse(curr: _Node) {
    if (visited.has(curr.val)) {
      return;
    }
    visited.set(curr.val, curr);
    for (const neighbor of curr.neighbors) {
      traverse(neighbor);
    }
  }

  traverse(node);

  // Sort node keys to match LeetCode's sequential structure
  const sortedVals = Array.from(visited.keys()).sort((a, b) => a - b);
  const adjList: number[][] = [];

  for (const val of sortedVals) {
    const currNode = visited.get(val)!;
    adjList.push(currNode.neighbors.map((n) => n.val));
  }

  return adjList;
}

// 5. Test Cases
function runTest(testId: number, adjList: number[][]) {
  console.log(`--- Test Case ${testId} ---`);
  console.log("Input Adjacency List: ", JSON.stringify(adjList));

  // Construct original graph
  const originalGraph = buildGraph(adjList);

  // Clone the graph
  const clonedGraph = cloneGraph(originalGraph);

  // Verify cloning output
  const outputAdjList = graphToAdjList(clonedGraph);
  console.log("Cloned Adjacency List:", JSON.stringify(outputAdjList));

  // Simple memory reference verification to make sure it's a deep copy
  if (originalGraph !== null && clonedGraph !== null) {
    const isDeepCopy = originalGraph !== clonedGraph;
    console.log("Is deep copy (different memory reference)?", isDeepCopy);
  }
  console.log("\n");
}

// Run Example 1
runTest(1, [
  [2, 4],
  [1, 3],
  [2, 4],
  [1, 3],
]);

// Run Example 2 (One empty node, represented as an empty array nested)
runTest(2, [[]]);

// Run Example 3 (Empty graph)
runTest(3, []);
