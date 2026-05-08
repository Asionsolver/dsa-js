// 3629. Minimum Jumps to Reach End via Prime Teleportation

/**
Example 1:

Input: nums = [1,2,4,6]

Output: 2

Explanation:

One optimal sequence of jumps is:

Start at index i = 0. Take an adjacent step to index 1.
At index i = 1, nums[1] = 2 is a prime number. Therefore, we teleport to index i = 3 as nums[3] = 6 is divisible by 2.
Thus, the answer is 2.

Example 2:

Input: nums = [2,3,4,7,9]

Output: 2

Explanation:

One optimal sequence of jumps is:

Start at index i = 0. Take an adjacent step to index i = 1.
At index i = 1, nums[1] = 3 is a prime number. Therefore, we teleport to index i = 4 since nums[4] = 9 is divisible by 3.
Thus, the answer is 2.

Example 3:

Input: nums = [4,6,5,8]

Output: 3

Explanation:

Since no teleportation is possible, we move through 0 → 1 → 2 → 3. Thus, the answer is 3.
*/

function minJumps(nums: number[]): number {
  const n = nums.length;
  if (n === 1) return 0;

  // Find the maximum element to bound our Prime Sieve
  let MAX = 2;
  for (let i = 0; i < n; i++) {
    if (nums[i] > MAX) {
      MAX = nums[i];
    }
  }

  // Sieve of Eratosthenes to pre-compute the smallest prime factor for every number up to MAX
  const minPrime = new Int32Array(MAX + 1);
  for (let i = 2; i <= MAX; i++) minPrime[i] = i;
  for (let i = 2; i * i <= MAX; i++) {
    if (minPrime[i] === i) {
      for (let j = i * i; j <= MAX; j += i) {
        if (minPrime[j] === j) minPrime[j] = i;
      }
    }
  }

  // Mark the primes that actually surface natively in the `nums` array
  const isPrimeInNums = new Uint8Array(MAX + 1);
  for (let i = 0; i < n; i++) {
    const x = nums[i];
    if (x >= 2 && minPrime[x] === x) {
      isPrimeInNums[x] = 1;
    }
  }

  // Typed Arrays layout to construct memory-dense adjacency lists for graph jumps
  let edgeCount = 0;
  const head = new Int32Array(MAX + 1).fill(-1);

  // The maximum number of distinct prime factors for a number up to 10^6 is strictly 7.
  // 7 * n fully guarantees preventing Out of Bound excesses.
  const MAX_EDGES = n * 7;
  const next = new Int32Array(MAX_EDGES);
  const to = new Int32Array(MAX_EDGES);

  for (let j = 0; j < n; j++) {
    let x = nums[j];
    while (x > 1) {
      const p = minPrime[x];

      // Only capture valid relation edges extending from primes actually present in nums
      if (isPrimeInNums[p]) {
        to[edgeCount] = j;
        next[edgeCount] = head[p];
        head[p] = edgeCount++;
      }

      // Strip out all duplicate identical prime factors
      while (x > 1 && minPrime[x] === p) {
        x /= p;
      }
    }
  }

  // BFS configuration setups
  const q = new Int32Array(n);
  let qHead = 0;
  let qTail = 0;
  const dist = new Int32Array(n).fill(-1);

  q[qTail++] = 0;
  dist[0] = 0;

  const visitedPrimes = new Uint8Array(MAX + 1);

  while (qHead < qTail) {
    const u = q[qHead++];
    const d = dist[u];

    // Adjacent Movement: Backwards `u - 1`
    const prev = u - 1;
    if (prev >= 0 && dist[prev] === -1) {
      dist[prev] = d + 1;
      q[qTail++] = prev;
    }

    // Adjacent Movement: Forwards `u + 1`
    const nxt = u + 1;
    if (nxt < n && dist[nxt] === -1) {
      if (nxt === n - 1) return d + 1; // Early breakout exit
      dist[nxt] = d + 1;
      q[qTail++] = nxt;
    }

    // Prime Teleportation Action
    const p = nums[u];
    if (p >= 2 && isPrimeInNums[p] && !visitedPrimes[p]) {
      visitedPrimes[p] = 1;
      let e = head[p];
      while (e !== -1) {
        const v = to[e];
        if (dist[v] === -1) {
          if (v === n - 1) return d + 1; // Early breakout exit
          dist[v] = d + 1;
          q[qTail++] = v;
        }
        e = next[e];
      }
    }
  }

  return -1;
}

// Example usage:
const nums1 = [1, 2, 4, 6];
console.log(minJumps(nums1)); // Output: 2

const nums2 = [2, 3, 4, 7, 9];
console.log(minJumps(nums2)); // Output: 2

const nums3 = [4, 6, 5, 8];
console.log(minJumps(nums3)); // Output: 3
