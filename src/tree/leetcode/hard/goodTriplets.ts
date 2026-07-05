// 2179. Count Good Triplets in an Array

/**
Example 1:

Input: nums1 = [2,0,1,3], nums2 = [0,1,2,3]
Output: 1
Explanation: 
There are 4 triplets (x,y,z) such that pos1x < pos1y < pos1z. They are (2,0,1), (2,0,3), (2,1,3), and (0,1,3). 
Out of those triplets, only the triplet (0,1,3) satisfies pos2x < pos2y < pos2z. Hence, there is only 1 good triplet.
Example 2:

Input: nums1 = [4,0,1,3,2], nums2 = [4,1,0,2,3]
Output: 4
Explanation: The 4 good triplets are (4,0,3), (4,0,2), (4,1,3), and (4,1,2).

*/

function goodTriplets(nums1: number[], nums2: number[]): number {
  const n = nums1.length;

  // pos1 maps each value to its index in nums1
  const pos1 = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    pos1[nums1[i]] = i;
  }

  // A maps nums2 to the corresponding indices of nums1
  const A = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    A[i] = pos1[nums2[i]];
  }

  // Fenwick Tree (Binary Indexed Tree) for dynamic prefix sum queries.
  // Since tree indexes are 1-based, we use size n + 1.
  const tree = new Int32Array(n + 1);

  function update(i: number, delta: number) {
    while (i <= n) {
      tree[i] += delta;
      i += i & -i;
    }
  }

  function query(i: number): number {
    let sum = 0;
    while (i > 0) {
      sum += tree[i];
      i -= i & -i;
    }
    return sum;
  }

  let totalTriplets = 0;

  for (let j = 0; j < n; j++) {
    const val = A[j];

    // Count elements smaller than val in the prefix.
    // val is 0-indexed, meaning we want counts for values in [0, val - 1].
    // In the Fenwick tree, this corresponds to indices [1, val].
    const left_smaller = query(val);

    // Calculate elements larger than val to the right
    const right_larger = n - 1 - val - j + left_smaller;

    totalTriplets += left_smaller * right_larger;

    // Insert the current value into the Fenwick Tree (1-indexed mapping: val + 1)
    update(val + 1, 1);
  }

  return totalTriplets;
}

// Example usage:
console.log(goodTriplets([2, 0, 1, 3], [0, 1, 2, 3])); // Output: 1
console.log(goodTriplets([4, 0, 1, 3, 2], [4, 1, 0, 2, 3])); // Output: 4
