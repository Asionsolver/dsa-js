# Tree Data Structure

- A tree is a hierarchical and non-linear data structure that consists of nodes connected by edges.
- Linear: Organized in a sequential manner (e.g., arrays, stacks, queues).
- Non-linear: Organized in a hierarchical manner (e.g., trees, graphs).

## Binary Tree

- Full Binary Tree
- Complete Binary Tree
- Perfect Binary Tree

### Full Binary Tree

- A full binary tree is a tree in which every node other than the leaves has two children.

### Complete Binary Tree

- A complete binary tree is a binary tree in which all the levels are completely filled except possibly for the last level, which is filled from left to right.

### Perfect Binary Tree

- A perfect binary tree is a binary tree in which all the internal nodes have two children and all leaves are at the same level.

## AVL Tree

- An AVL tree is a self-balancing binary search tree where the difference in heights between the left and right subtrees of any node is at most one.
- Balance Factor = Height of Left Subtree - Height of Right Subtree
- Balance Factor can be -1, 0, or +1 for all nodes in an AVL tree.

### Height of a Tree

- For any non-leaf node:
  - Height = 1 + max(Height of Left Subtree, Height of Right Subtree)
- For leaf nodes always have a height of 1
  - Height = 1 + max(0, 0) = 1
- Empty Subtree: No nodes at all, height = 0

### AVL Tree Rotations

- Right Rotation (LL Rotation)
- Left Rotation (RR Rotation) (Example: A -> B -> C)
  - Occurs when a node's balance factor is -2 and its right child has a balance factor of -1 or 0.
  - Right Rotation is performed on the unbalanced node.
  - Imbalance is caused by its right child's subtree.
  - Right-Right case.
    - Step 1: Make B the new root.
    - Step 2: Make A the left child of B.
    - Step 3: Update the heights.
- Left-Right Rotation (LR Rotation)
- Right-Left Rotation (RL Rotation)

  - Occurs when a node's balance factor is +2 and its left child has a balance factor of +1 or 0.
  <!--
  
         40*    ← Delete this
        /   \
      20     60
     /  \    / \
    10  30  50  70
  
       50    ← 40 replaced with 50
      /   \
    20     60
   /  \    / \
  10  30  50  70
  
       50
      /   \
    20     60
   /  \      \
  10  30      70

-->

## Trie Tree

- A Trie is a specialized tree used for storing strings.
- Useful for tasks like prefix-based searching, autocomplete and spell checking.

## N-ary Tree

- An N-ary tree is a tree data structure where each node can have at most N children.
- Generalization of binary trees (where N=2).
- Used in scenarios like file systems, organizational hierarchies, and game trees.

### N-Ary Tree - Key Characteristics

- Node Structure
  - Each node contains data and links to its child nodes.
  - The root node is the topmost node of the tree.
- Child Nodes
  - A code can have n children.
- Parent and Siblings
  - Each node (except the root) has one parent node.
  - Nodes with the same parent are called siblings.
- Levels
  - The tree grows downward in levels. Root is at level 0, its children at level 1, and so on.
- Height
  - The height of the tree is the number of edges on the longest path from the root to a leaf node.
- Leaf Nodes
  - Nodes that do not have any children are called leaf nodes.
- Fixed or Variable N
  - N can be fixed (e.g., ternary tree with N=3) or variable (each node can have a different number of children).
- Traversal
  - N-ary trees can be traversed using methods like depth-first search (DFS) and breadth-first search (BFS).
  - BFS
    - Start at the root node(or the starting node).
    - Visit all nodes at the current level before moving to the next level.
  - DFS
    - Start at the root node (or the starting node).
    - Move to the first unvisited child node, continuing this process until reaching a leaf node.
    - Backtrack to the most recent node with unvisited children and repeat the process until all nodes are visited.
