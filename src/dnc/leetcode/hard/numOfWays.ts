//

/**

Given an array nums that represents a permutation of integers from 1 to n. We are going to construct a binary search tree (BST) by inserting the elements of nums in order into an initially empty BST. Find the number of different ways to reorder nums so that the constructed BST is identical to that formed from the original array nums.

For example, given nums = [2,1,3], we will have 2 as the root, 1 as a left child, and 3 as a right child. The array [2,3,1] also yields the same BST but [3,2,1] yields a different BST.
Return the number of ways to reorder nums such that the BST formed is identical to the original BST formed from nums.

Since the answer may be very large, return it modulo 109 + 7.
*/

/**
Example 1:


Input: nums = [2,1,3]
Output: 1
Explanation: We can reorder nums to be [2,3,1] which will yield the same BST. There are no other ways to reorder nums which will yield the same BST.
Example 2:


Input: nums = [3,4,5,1,2]
Output: 5
Explanation: The following 5 arrays will yield the same BST: 
[3,1,2,4,5]
[3,1,4,2,5]
[3,1,4,5,2]
[3,4,1,2,5]
[3,4,1,5,2]
Example 3:


Input: nums = [1,2,3]
Output: 0
Explanation: There are no other orderings of nums that will yield the same BST.
*/

/**
Constraints:

1 <= nums.length <= 1000
1 <= nums[i] <= nums.length
All integers in nums are distinct.
*/


// Brute Force Approach: TLE 
// Definition for a binary tree node.
// class TreeNode {
//   val: number;
//   left: TreeNode | null;
//   right: TreeNode | null;
//   constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
//     this.val = val === undefined ? 0 : val;
//     this.left = left === undefined ? null : left;
//     this.right = right === undefined ? null : right;
//   }
// }

// function numOfWays(nums: number[]): number {
//   // Helper to insert a value into BST.
//   function insert(root: TreeNode | null, val: number): TreeNode {
//     if (!root) return new TreeNode(val);
//     if (val < root.val) root.left = insert(root.left, val);
//     else root.right = insert(root.right, val);
//     return root;
//   }

//   // Helper to build a BST from an array.
//   function buildTree(arr: number[]): TreeNode | null {
//     let root: TreeNode | null = null;
//     for (const val of arr) {
//       root = insert(root, val);
//     }
//     return root;
//   }

//   // Helper to compare two BSTs.
//   function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
//     if (!p && !q) return true;
//     if (!p || !q || p.val !== q.val) return false;
//     return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
//   }

//   const baseTree = buildTree(nums);
//   let validWays = 0;
//   const used = new Array(nums.length).fill(false);
//   const currentPermutation: number[] = [];

//   // Generate all permutations using backtracking.
//   function backtrack() {
//     if (currentPermutation.length === nums.length) {
//       const candidateTree = buildTree(currentPermutation);
//       if (isSameTree(baseTree, candidateTree)) {
//         validWays++;
//       }
//       return;
//     }

//     function numOfWays(nums: number[]): number {
//       // Helper to insert a value into BST.
//       function insert(root: TreeNode | null, val: number): TreeNode {
//         if (!root) return new TreeNode(val);
//         if (val < root.val) root.left = insert(root.left, val);
//         else root.right = insert(root.right, val);
//         return root;
//       }

//       // Helper to build a BST from an array.
//       function buildTree(arr: number[]): TreeNode | null {
//         let root: TreeNode | null = null;
//         for (const val of arr) {
//           root = insert(root, val);
//         }
//         return root;
//       }

//       // Helper to compare two BSTs.
//       function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
//         if (!p && !q) return true;
//         if (!p || !q || p.val !== q.val) return false;
//         return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
//       }

//       const baseTree = buildTree(nums);
//       let validWays = 0;
//       const used = new Array(nums.length).fill(false);
//       const currentPermutation: number[] = [];

//       // Generate all permutations using backtracking.
//       function backtrack() {
//         if (currentPermutation.length === nums.length) {
//           const candidateTree = buildTree(currentPermutation);
//           if (isSameTree(baseTree, candidateTree)) {
//             validWays++;
//           }
//           return;
//         }

//         for (let i = 0; i < nums.length; i++) {
//           if (used[i]) continue;
//           used[i] = true;
//           currentPermutation.push(nums[i]);
//           backtrack();
//           currentPermutation.pop();
//           used[i] = false;
//         }
//       }

//       backtrack();
//       // Subtract the original array itself.
//       return validWays - 1;
//     }
//     for (let i = 0; i < nums.length; i++) {
//       if (used[i]) continue;
//       used[i] = true;
//       currentPermutation.push(nums[i]);
//       backtrack();
//       currentPermutation.pop();
//       used[i] = false;
//     }
//   }

//   backtrack();
//   // Subtract the original array itself.
//   return validWays - 1;
// }



// Optimized Approach using combinatorics and recursion.
function numOfWays(nums: number[]): number {

    const MOD = 1_000_000_007n;
    const n = nums.length;

    // Precompute Pascal's Triangle for combinations (nCr % MOD).
    const comb: bigint[][] = Array.from({ length: n + 1 }, () =>
        new Array(n + 1).fill(0n)
    );

    for (let i = 0; i <= n; i++) {
        comb[i][0] = 1n;
        for (let j = 1; j <= i; j++) {
            // nCr = (n-1)C(r-1) + (n-1)Cr
            comb[i][j] = (comb[i - 1][j - 1] + comb[i - 1][j]) % MOD;
        }
    }

    // Recursive function to count BST orderings.
    function countWays(arr: number[]): bigint {
        // If array has 2 or fewer elements, only 1 valid ordering exists.
        if (arr.length <= 2) {
            return 1n;
        }

        const root = arr[0];
        const left: number[] = [];
        const right: number[] = [];

        // Partition elements into left and right subtrees based on root value.
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < root) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        // Number of ways to interleave left and right subtree elements.
        const waysToInterleave = comb[left.length + right.length][left.length];

        // Recurse for both subtrees and combine results using modulo multiplication.
        const leftWays = countWays(left);
        const rightWays = countWays(right);

        return (((waysToInterleave * leftWays) % MOD) * rightWays) % MOD;
    }

    // Subtract 1 to exclude the original array permutation itself.
    const totalWays = countWays(nums);
    return Number((totalWays - 1n + MOD) % MOD);

}

// Example usage:
const nums1 = [2, 1, 3];
console.log(numOfWays(nums1)); // Output: 1

const nums2 = [3, 4, 5, 1, 2];
console.log(numOfWays(nums2)); // Output: 5

const nums3 = [1, 2, 3];
console.log(numOfWays(nums3)); // Output: 0
