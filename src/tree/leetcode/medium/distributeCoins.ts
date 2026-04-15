// 979. Distribute Coins in Binary Tree

/**
Example 1:


Input: root = [3,0,0]
Output: 2
Explanation: From the root of the tree, we move one coin to its left child, and one coin to its right child.
Example 2:


Input: root = [0,3,0]
Output: 3
Explanation: From the left child of the root, we move two coins to the root [taking two moves]. Then, we move one coin from the root of the tree to the right child.
*/
// 1. Define the TreeNode class
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

// 2. Helper function to build a tree from a level-order array (LeetCode format)
function buildTree(arr: (number | null)[]): TreeNode | null {
    if (arr.length === 0 || arr[0] === null) return null;
    
    const root = new TreeNode(arr[0] as number);
    const queue: TreeNode[] = [root];
    let i = 1;
    
    while (i < arr.length) {
        const curr = queue.shift()!;
        
        // Process left child
        if (i < arr.length && arr[i] !== null) {
            curr.left = new TreeNode(arr[i] as number);
            queue.push(curr.left);
        }
        i++;
        
        // Process right child
        if (i < arr.length && arr[i] !== null) {
            curr.right = new TreeNode(arr[i] as number);
            queue.push(curr.right);
        }
        i++;
    }
    return root;
}

// 3. The algorithm
function distributeCoins(root: TreeNode | null): number {
    let moves = 0;

    function dfs(node: TreeNode | null): number {
        if (node === null) return 0;
        
        const leftBalance = dfs(node.left);
        const rightBalance = dfs(node.right);
        
        const balance = node.val - 1 + leftBalance + rightBalance;
        moves += Math.abs(balance);
        
        return balance;
    }

    dfs(root);
    return moves;
}

// 4. Test the code locally
console.log("--- Distribute Coins in Binary Tree ---");

// Example 1
const root1 = buildTree([3, 0, 0]);
console.log("Example 1 Input: [3, 0, 0]");
console.log("Example 1 Output:", distributeCoins(root1)); // Expected: 2

console.log("---------------------------------------");

// Example 2
const root2 = buildTree([0, 3, 0]);
console.log("Example 2 Input: [0, 3, 0]");
console.log("Example 2 Output:", distributeCoins(root2)); // Expected: 3