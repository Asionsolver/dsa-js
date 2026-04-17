// 429. N-ary Tree Level Order Traversal

/**
Example 1:

Input: root = [1,null,3,2,4,null,5,6]
Output: [[1],[3,2,4],[5,6]]
Example 2:

Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]
*/

// class _Node {
//   val: number;
//   children: _Node[];

//   constructor(val?: number, children?: _Node[]) {
//     this.val = val === undefined ? 0 : val;
//     this.children = children === undefined ? [] : children;
//   }
// }

// function levelOrder(root: _Node | null): number[][] {
//   // If the tree is empty, return an empty array
//   if (!root) {
//     return [];
//   }

//   const result: number[][] = [];
//   let currentLevel: _Node[] = [root];

//   // Continue traversing while there are nodes in the current level
//   while (currentLevel.length > 0) {
//     const nextLevel: _Node[] = [];
//     const levelValues: number[] = [];

//     // Process each node in the current level
//     for (const node of currentLevel) {
//       levelValues.push(node.val); // Add the value of the current node to the level values

//       // Add all children of the current node to the next level
//       for (const child of node.children) {
//         nextLevel.push(child);
//       }
//     }

//     result.push(levelValues); // Add the values of the current level to the result
//     currentLevel = nextLevel; // Move to the next level
//   }

//   return result; // Return the final level order traversal
// }

// let root: _Node = new _Node(1, [
//   new _Node(3, [new _Node(5), new _Node(6)]),
//   new _Node(2),
//   new _Node(4),
// ]);

// console.log(levelOrder(root));

// 1. Define the Node class
class _Node {
  val: number;
  children: _Node[];
  constructor(val?: number, children?: _Node[]) {
    this.val = val === undefined ? 0 : val;
    this.children = children === undefined ? [] : children;
  }
}

// 2. The Solution Function
function levelOrder(root: _Node | null): number[][] {
  if (!root) return [];

  const result: number[][] = [];
  let currentLevelNodes: _Node[] = [root];

  while (currentLevelNodes.length > 0) {
    const currentLevelValues: number[] = [];
    const nextLevelNodes: _Node[] = [];

    for (const node of currentLevelNodes) {
      // Store the current node's value
      currentLevelValues.push(node.val);

      // Push all children of the current node to the next level array
      for (const child of node.children) {
        if (child) {
          nextLevelNodes.push(child);
        }
      }
    }

    // Add the current level's values to our final result
    result.push(currentLevelValues);

    // Move to the next level
    currentLevelNodes = nextLevelNodes;
  }

  return result;
}

// 3. Test the code locally with Example 1
/*
   Example 1 Tree Structure:
        1
      / | \
     3  2  4
    / \
   5   6
*/

// Create leaf nodes first
const node5 = new _Node(5);
const node6 = new _Node(6);

// Create parent nodes and attach children
const node3 = new _Node(3, [node5, node6]);
const node2 = new _Node(2);
const node4 = new _Node(4);

// Create root node
const root = new _Node(1, [node3, node2, node4]);

// 4. Show output in local console
console.log("Output for Example 1:");
console.log(levelOrder(root));
