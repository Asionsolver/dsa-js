// 3321. Find X-Sum of All K-Long Subarrays II

/**
Example 1:

Input: nums = [1,1,2,2,3,4,2,3], k = 6, x = 2

Output: [6,10,12]

Explanation:

For subarray [1, 1, 2, 2, 3, 4], only elements 1 and 2 will be kept in the resulting array. Hence, answer[0] = 1 + 1 + 2 + 2.
For subarray [1, 2, 2, 3, 4, 2], only elements 2 and 4 will be kept in the resulting array. Hence, answer[1] = 2 + 2 + 2 + 4. Note that 4 is kept in the array since it is bigger than 3 and 1 which occur the same number of times.
For subarray [2, 2, 3, 4, 2, 3], only elements 2 and 3 are kept in the resulting array. Hence, answer[2] = 2 + 2 + 2 + 3 + 3.
Example 2:

Input: nums = [3,8,7,8,7,5], k = 2, x = 2

Output: [11,15,15,15,12]

Explanation:

Since k == x, answer[i] is equal to the sum of the subarray nums[i..i + k - 1].


*/

const nums = [1, 1, 2, 2, 3, 4, 2, 3],
  k = 6,
  x = 2;

const findXSum = function (nums: number[], k: number, x: number) {
  // Definition of the Key used in Treaps
  type Key = { count: number; val: number };

  // Comparator for our ranking logic
  // Returns < 0 if a < b, > 0 if a > b, 0 if equal
  const compare = (a: Key, b: Key): number => {
    if (a.count !== b.count) return a.count - b.count;
    return a.val - b.val;
  };

  // Treap Node Class
  class TreapNode {
    left: TreapNode | null = null;
    right: TreapNode | null = null;
    priority: number;

    constructor(public key: Key) {
      this.priority = Math.random();
    }
  }

  // Treap Class containing necessary operations
  class Treap {
    root: TreapNode | null = null;
    _size: number = 0;

    // Split the tree into two trees: one with keys < key, one with keys >= key
    private split(
      root: TreapNode | null,
      key: Key
    ): [TreapNode | null, TreapNode | null] {
      if (!root) return [null, null];
      if (compare(root.key, key) < 0) {
        const [rightLeft, rightRight] = this.split(root.right, key);
        root.right = rightLeft;
        return [root, rightRight];
      } else {
        const [leftLeft, leftRight] = this.split(root.left, key);
        root.left = leftRight;
        return [leftLeft, root];
      }
    }

    // Merge two trees assuming all keys in left < all keys in right
    private merge(
      left: TreapNode | null,
      right: TreapNode | null
    ): TreapNode | null {
      if (!left) return right;
      if (!right) return left;
      if (left.priority > right.priority) {
        left.right = this.merge(left.right, right);
        return left;
      } else {
        right.left = this.merge(left, right.left);
        return right;
      }
    }

    // Delete a specific key
    delete(key: Key): void {
      this.root = this._delete(this.root, key);
      this._size--;
    }

    private _delete(root: TreapNode | null, key: Key): TreapNode | null {
      if (!root) return null;
      const cmp = compare(key, root.key);
      if (cmp < 0) {
        root.left = this._delete(root.left, key);
        return root;
      } else if (cmp > 0) {
        root.right = this._delete(root.right, key);
        return root;
      } else {
        return this.merge(root.left, root.right);
      }
    }

    // Insert a key
    insert(key: Key): void {
      const [left, right] = this.split(this.root, key);
      this.root = this.merge(this.merge(left, new TreapNode(key)), right);
      this._size++;
    }

    // Get the minimum key in the tree
    getMin(): Key | null {
      let node = this.root;
      if (!node) return null;
      while (node.left) node = node.left;
      return node.key;
    }

    // Get the maximum key in the tree
    getMax(): Key | null {
      let node = this.root;
      if (!node) return null;
      while (node.right) node = node.right;
      return node.key;
    }

    size(): number {
      return this._size;
    }
  }

  // --- Solution Logic ---

  const countMap = new Map<number, number>();
  const topSet = new Treap();
  const restSet = new Treap();
  let currentXSum = 0;
  const result: number[] = [];

  // Helper to add a key to the system (counts check happens outside)
  // We initially insert into restSet, then let rebalance handle it,
  // or insert directly to maintain state.
  // Simplified: Check where it belongs or just put in rest and fix.
  // Optimization: Check bounds to guess set.
  const addKeyToSets = (key: Key) => {
    // Simple heuristic: if it's better than the worst in top, put in top.
    const topMin = topSet.getMin();
    if (topSet.size() < x) {
      topSet.insert(key);
      currentXSum += key.count * key.val;
    } else if (topMin && compare(key, topMin) > 0) {
      topSet.insert(key);
      currentXSum += key.count * key.val;
    } else {
      restSet.insert(key);
    }
  };

  const removeKeyFromSets = (key: Key) => {
    // Try to delete from topSet first by checking min/logic or just try-fail?
    // Treap delete is specific. We don't know which set it is in with O(1).
    // However, we can compare with topSet.getMin().
    const topMin = topSet.getMin();
    if (topMin && compare(key, topMin) >= 0) {
      // It must be in topSet (or equal to min)
      // Note: Since keys are unique (cnt, val), distinct check is exact.
      topSet.delete(key);
      currentXSum -= key.count * key.val;
    } else {
      restSet.delete(key);
    }
  };

  const rebalance = () => {
    // 1. If Top is too big, move min to Rest
    while (topSet.size() > x) {
      const minKey = topSet.getMin()!;
      topSet.delete(minKey);
      currentXSum -= minKey.count * minKey.val;
      restSet.insert(minKey);
    }

    // 2. If Top is too small and Rest has candidates, move max from Rest to Top
    while (topSet.size() < x && restSet.size() > 0) {
      const maxKey = restSet.getMax()!;
      restSet.delete(maxKey);
      topSet.insert(maxKey);
      currentXSum += maxKey.count * maxKey.val;
    }

    // 3. Maintenance: Ensure Min(Top) > Max(Rest)
    // This handles cases where counts update and ranks shift
    while (topSet.size() > 0 && restSet.size() > 0) {
      const topMin = topSet.getMin()!;
      const restMax = restSet.getMax()!;

      if (compare(restMax, topMin) > 0) {
        // Swap them
        topSet.delete(topMin);
        currentXSum -= topMin.count * topMin.val;
        restSet.insert(topMin);

        restSet.delete(restMax);
        topSet.insert(restMax);
        currentXSum += maxKeyVal(restMax);
      } else {
        break;
      }
    }
  };

  // Helper for calculating contribution (count * val)
  const maxKeyVal = (k: Key) => k.count * k.val;

  // --- Main Loop ---

  // Function to process updating a number's count
  const update = (val: number, delta: number) => {
    const oldCnt = countMap.get(val) || 0;

    if (oldCnt > 0) {
      removeKeyFromSets({ count: oldCnt, val });
    }

    const newCnt = oldCnt + delta;
    if (newCnt > 0) {
      countMap.set(val, newCnt);
      addKeyToSets({ count: newCnt, val });
    } else {
      countMap.delete(val);
    }

    rebalance();
  };

  // Initialize first window
  for (let i = 0; i < k; i++) {
    update(nums[i], 1);
  }
  result.push(currentXSum);

  // Slide window
  for (let i = k; i < nums.length; i++) {
    const entering = nums[i];
    const leaving = nums[i - k];

    update(entering, 1);
    update(leaving, -1);

    result.push(currentXSum);
  }

  return result;
};

console.log(findXSum(nums, k, x));
