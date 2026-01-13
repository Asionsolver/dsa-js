// 3414. Maximum Score of Non-overlapping Intervals

/**
Example 1:

Input: intervals = [[1,3,2],[4,5,2],[1,5,5],[6,9,3],[6,7,1],[8,9,1]]

Output: [2,3]

Explanation:

You can choose the intervals with indices 2, and 3 with respective weights of 5, and 3.

Example 2:

Input: intervals = [[5,8,1],[6,7,7],[4,7,3],[9,10,6],[7,8,2],[11,14,3],[3,5,5]]

Output: [1,3,5,6]

Explanation:

You can choose the intervals with indices 1, 3, 5, and 6 with respective weights of 7, 6, 3, and 5.


*/

const intervals = [
  [1, 3, 2],
  [4, 5, 2],
  [1, 5, 5],
  [6, 9, 3],
  [6, 7, 1],
  [8, 9, 1],
];

// ! better version
// function maximumScore(intervals: number[][]): number[] {
//   const n = intervals.length;

//   // 1. Map to object to preserve original id, then sort by start time
//   const sortedIntervals = intervals
//     .map((interval, index) => ({
//       l: interval[0],
//       r: interval[1],
//       w: interval[2],
//       id: index,
//     }))
//     .sort((a, b) => a.l - b.l);

//   // 2. Precompute the next valid interval index for each interval
//   // nextValid[i] is the index of the first interval that starts strictly after interval i ends
//   const nextValid = new Int32Array(n);
//   for (let i = 0; i < n; i++) {
//     let left = i + 1;
//     let right = n;
//     let res = n;
//     const currentEnd = sortedIntervals[i].r;

//     // Binary search
//     while (left < right) {
//       const mid = (left + right) >>> 1;
//       if (sortedIntervals[mid].l > currentEnd) {
//         res = mid;
//         right = mid;
//       } else {
//         left = mid + 1;
//       }
//     }
//     nextValid[i] = res;
//   }

//   // Structure for DP state
//   type Result = { score: number; indices: number[] };

//   // 3. Initialize DP table
//   // dp[i][k] = best result using exactly k intervals from suffix starting at i
//   // Dimensions: (n+1) rows, 5 columns (0 to 4)
//   const dp: Result[][] = new Array(n + 1);
//   for (let i = 0; i <= n; i++) {
//     dp[i] = [
//       { score: 0, indices: [] }, // k=0
//       { score: -1, indices: [] }, // k=1
//       { score: -1, indices: [] }, // k=2
//       { score: -1, indices: [] }, // k=3
//       { score: -1, indices: [] }, // k=4
//     ];
//   }

//   // Helper to compare two arrays of indices lexicographically
//   const isLexicographicallySmaller = (a: number[], b: number[]): boolean => {
//     const len = Math.min(a.length, b.length);
//     for (let i = 0; i < len; i++) {
//       if (a[i] < b[i]) return true;
//       if (a[i] > b[i]) return false;
//     }
//     return a.length < b.length;
//   };

//   // 4. Fill DP table iteratively backwards
//   for (let i = n - 1; i >= 0; i--) {
//     for (let k = 1; k <= 4; k++) {
//       // Option 1: Skip current interval
//       let bestScore = dp[i + 1][k].score;
//       let bestIndices = dp[i + 1][k].indices;

//       // Option 2: Take current interval
//       const nextIdx = nextValid[i];
//       const prevRes = dp[nextIdx][k - 1];

//       // Can only take if the recursive sub-problem is valid
//       if (prevRes.score !== -1) {
//         const currentScore = sortedIntervals[i].w + prevRes.score;

//         // Compare Take vs Skip
//         if (currentScore > bestScore) {
//           bestScore = currentScore;
//           // Construct new sorted indices array
//           bestIndices = [...prevRes.indices, sortedIntervals[i].id].sort(
//             (a, b) => a - b
//           );
//         } else if (currentScore === bestScore) {
//           // Tie-breaker: Lexicographical comparison
//           const currentIndices = [
//             ...prevRes.indices,
//             sortedIntervals[i].id,
//           ].sort((a, b) => a - b);
//           // If bestScore was -1 (Skip impossible), we take this one
//           // Otherwise check lexicographical order
//           if (
//             bestScore === -1 ||
//             isLexicographicallySmaller(currentIndices, bestIndices)
//           ) {
//             bestScore = currentScore;
//             bestIndices = currentIndices;
//           }
//         }
//       }

//       dp[i][k] = { score: bestScore, indices: bestIndices };
//     }
//   }

//   // 5. Find the best solution among choosing 1, 2, 3, or 4 intervals
//   let finalRes = dp[0][1];

//   for (let k = 2; k <= 4; k++) {
//     const candidate = dp[0][k];

//     if (candidate.score > finalRes.score) {
//       finalRes = candidate;
//     } else if (candidate.score === finalRes.score && candidate.score !== -1) {
//       if (isLexicographicallySmaller(candidate.indices, finalRes.indices)) {
//         finalRes = candidate;
//       }
//     }
//   }

//   return finalRes.indices;
// }

// * best version. This solution take 187ms
// function maximumScore(intervals: number[][]): number[] {
//   const n = intervals.length;

//   // 1. Preprocess Data: Use TypedArrays for better performance (Structure of Arrays)
//   // We need to sort based on start time but keep track of original indices.
//   const indices = new Int32Array(n);
//   for (let i = 0; i < n; i++) indices[i] = i;

//   // Sort indices based on interval start times (Ascending)
//   indices.sort((a, b) => intervals[a][0] - intervals[b][0]);

//   // Unpack sorted data into typed arrays
//   const starts = new Int32Array(n);
//   const ends = new Int32Array(n);
//   const weights = new Int32Array(n); // Individual weights fit in Int32 (max 10^9)
//   const originalIds = new Int32Array(n);

//   for (let i = 0; i < n; i++) {
//     const idx = indices[i];
//     starts[i] = intervals[idx][0];
//     ends[i] = intervals[idx][1];
//     weights[i] = intervals[idx][2];
//     originalIds[i] = idx;
//   }

//   // 2. Precompute nextValid index using Binary Search
//   // nextValid[i] = lowest index j such that starts[j] > ends[i]
//   const nextValid = new Int32Array(n);
//   for (let i = 0; i < n; i++) {
//     const currentEnd = ends[i];
//     let l = i + 1,
//       r = n;
//     let res = n;
//     while (l < r) {
//       const mid = (l + r) >>> 1;
//       if (starts[mid] > currentEnd) {
//         res = mid;
//         r = mid;
//       } else {
//         l = mid + 1;
//       }
//     }
//     nextValid[i] = res;
//   }

//   // 3. Dynamic Programming Initialization
//   // We need to select at most 4 intervals.
//   // dpWeight: flattened 2D array of size (N + 1) * 5.
//   // Access: dpWeight[i * 5 + k]
//   // Use Float64 for sums to ensure no overflow (max sum ~4e9 > Int32 range)
//   const ROW_SIZE = 5;
//   const dpWeight = new Float64Array((n + 1) * ROW_SIZE).fill(-1);

//   // dpIds: flattened 3D array of size (N + 1) * 5 * 4.
//   // Stores the sorted original IDs for the corresponding state.
//   // Access: dpIds[(i * 5 + k) * 4 + offset]
//   const dpIds = new Int32Array((n + 1) * ROW_SIZE * 4).fill(-1);

//   // Base case: 0 intervals selected gives score 0
//   for (let i = 0; i <= n; i++) {
//     dpWeight[i * ROW_SIZE + 0] = 0;
//   }

//   // Helper: Compare "Take" vs "Skip" lexicographically without array allocation
//   // Returns true if the "Take" set is lexicographically smaller than "Skip" set
//   function isTakeSmaller(
//     takeBaseIdx: number,
//     currentId: number,
//     skipBaseIdx: number,
//     k: number
//   ): boolean {
//     let takePtr = 0;
//     let inserted = false;

//     for (let x = 0; x < k; x++) {
//       // Determine the x-th element of the merged "Take" list on the fly
//       let valTake = -1;
//       const srcVal = takePtr < k - 1 ? dpIds[takeBaseIdx + takePtr] : -1;

//       if (!inserted) {
//         if (srcVal === -1 || currentId < srcVal) {
//           valTake = currentId;
//           inserted = true;
//         } else {
//           valTake = srcVal;
//           takePtr++;
//         }
//       } else {
//         valTake = srcVal;
//         takePtr++;
//       }

//       // Get the x-th element of the "Skip" list
//       const valSkip = dpIds[skipBaseIdx + x];

//       if (valTake !== valSkip) {
//         // If one ends earlier (-1), it is "smaller" (shorter prefix)
//         // But normally we compare actual values. -1 is larger than any valid ID?
//         // Actually, filled array vs filled array: -1 shouldn't happen within valid range 'k'.
//         return valTake < valSkip;
//       }
//     }
//     return false;
//   }

//   // 4. Fill DP Table (Backwards)
//   for (let i = n - 1; i >= 0; i--) {
//     for (let k = 1; k <= 4; k++) {
//       const currIdx = i * ROW_SIZE + k;

//       // --- Option 1: Skip interval i ---
//       const skipNextIdx = (i + 1) * ROW_SIZE + k;
//       const skipW = dpWeight[skipNextIdx];

//       // --- Option 2: Take interval i ---
//       const nextIdx = nextValid[i];
//       const takePrevIdx = nextIdx * ROW_SIZE + (k - 1);
//       const prevW = dpWeight[takePrevIdx];

//       let chooseTake = false;
//       let bestW = -1;

//       // Logic to choose between Skip and Take
//       if (prevW !== -1) {
//         const takeW = weights[i] + prevW;

//         if (takeW > skipW) {
//           chooseTake = true;
//           bestW = takeW;
//         } else if (takeW === skipW) {
//           if (skipW === -1) {
//             bestW = -1;
//           } else {
//             // Scores equal: Tie-break using indices
//             const takeBaseIds = takePrevIdx * 4;
//             const skipBaseIds = skipNextIdx * 4;
//             if (isTakeSmaller(takeBaseIds, originalIds[i], skipBaseIds, k)) {
//               chooseTake = true;
//             } else {
//               chooseTake = false;
//             }
//             bestW = takeW;
//           }
//         } else {
//           chooseTake = false;
//           bestW = skipW;
//         }
//       } else {
//         // Cannot take (subproblem invalid), must skip
//         chooseTake = false;
//         bestW = skipW;
//       }

//       dpWeight[currIdx] = bestW;

//       // Store indices for the chosen path
//       if (bestW !== -1) {
//         const destBase = currIdx * 4;
//         if (chooseTake) {
//           // Merge sort / Insert originalIds[i] into the ids from the subproblem
//           const srcBase = takePrevIdx * 4;
//           const newId = originalIds[i];
//           let ptr = 0;
//           let inserted = false;

//           for (let x = 0; x < k; x++) {
//             const srcVal = ptr < k - 1 ? dpIds[srcBase + ptr] : -1;
//             if (!inserted) {
//               if (srcVal === -1 || newId < srcVal) {
//                 dpIds[destBase + x] = newId;
//                 inserted = true;
//               } else {
//                 dpIds[destBase + x] = srcVal;
//                 ptr++;
//               }
//             } else {
//               dpIds[destBase + x] = srcVal;
//               ptr++;
//             }
//           }
//         } else {
//           // Copy indices from skip state
//           const srcBase = skipNextIdx * 4;
//           dpIds[destBase] = dpIds[srcBase];
//           dpIds[destBase + 1] = dpIds[srcBase + 1];
//           dpIds[destBase + 2] = dpIds[srcBase + 2];
//           dpIds[destBase + 3] = dpIds[srcBase + 3];
//         }
//       }
//     }
//   }

//   // 5. Find best result among choosing 1, 2, 3, or 4 intervals
//   let bestK = 0;
//   let maxVal = -1;

//   for (let k = 1; k <= 4; k++) {
//     const w = dpWeight[0 * ROW_SIZE + k];
//     if (w > maxVal) {
//       maxVal = w;
//       bestK = k;
//     } else if (w === maxVal && w !== -1) {
//       // Lexicographical check between result sets of different sizes (or same size)
//       const idxK = 0 * ROW_SIZE + k;
//       const idxBest = 0 * ROW_SIZE + bestK;

//       let isBetter = false;
//       for (let x = 0; x < 4; x++) {
//         // -1 indicates end of valid IDs
//         const valK = x < k ? dpIds[idxK * 4 + x] : -1;
//         const valBest = x < bestK ? dpIds[idxBest * 4 + x] : -1;

//         if (valK === -1 && valBest === -1) break;
//         // Shorter valid prefix is lexicographically smaller?
//         // [1, 2] vs [1, 2, 3] -> [1, 2] is smaller.
//         if (valK === -1) {
//           isBetter = true;
//           break;
//         }
//         if (valBest === -1) {
//           isBetter = false;
//           break;
//         }

//         if (valK < valBest) {
//           isBetter = true;
//           break;
//         }
//         if (valK > valBest) {
//           isBetter = false;
//           break;
//         }
//       }
//       if (isBetter) bestK = k;
//     }
//   }

//   if (maxVal === -1) return [];

//   // Extract result
//   const result: number[] = [];
//   const finalBase = (0 * ROW_SIZE + bestK) * 4;
//   for (let i = 0; i < bestK; i++) {
//     result.push(dpIds[finalBase + i]);
//   }

//   return result;
// }

// * slightly improve runtime (176ms)
function maximumScore(intervals: number[][]): number[] {
  const n = intervals.length;

  // 1. Sort indices based on start times (using indirect sort to preserve original indices)
  const indices = new Int32Array(n);
  for (let i = 0; i < n; i++) indices[i] = i;
  indices.sort((a, b) => intervals[a][0] - intervals[b][0]);

  // 2. Flatten data into Struct of Arrays (SoA) for cache efficiency
  const starts = new Int32Array(n);
  const ends = new Int32Array(n);
  const weights = new Int32Array(n);
  const originalIds = new Int32Array(n);

  for (let i = 0; i < n; i++) {
    const idx = indices[i];
    const interval = intervals[idx];
    starts[i] = interval[0];
    ends[i] = interval[1];
    weights[i] = interval[2];
    originalIds[i] = idx;
  }

  // 3. Precompute nextValid index using Binary Search
  // nextValid[i] is the first index j where starts[j] > ends[i]
  const nextValid = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    const target = ends[i];
    let l = i + 1,
      r = n;
    let res = n;
    while (l < r) {
      const mid = (l + r) >>> 1;
      if (starts[mid] > target) {
        res = mid;
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    nextValid[i] = res;
  }

  // 4. Initialize DP Structures
  // Dimensions: (N + 1) rows, 5 columns. Flattened.
  const ROW_SIZE = 5;
  const dpWeight = new Float64Array((n + 1) * ROW_SIZE).fill(-1);
  const dpRef = new Int32Array((n + 1) * ROW_SIZE).fill(0);

  // Pool to store arrays of indices. Each block is 4 integers.
  // We allocate enough space for worst-case "Take" scenarios.
  // Bitwise shifts (<< 2) are used later for efficient indexing * 4.
  const pool = new Int32Array(n * 16 + 64);
  let poolPtr = 0; // Points to the next available block index

  // Base Case: 0 intervals selected has weight 0
  for (let i = 0; i <= n; i++) {
    dpWeight[i * ROW_SIZE] = 0;
  }

  // Helper: Compare constructed "Take" set vs existing "Skip" set lexicographically
  // Returns true if "Take" is smaller (better)
  function isTakeSmaller(
    takePrevRef: number,
    currentId: number,
    skipRef: number,
    k: number
  ): boolean {
    const baseTake = takePrevRef << 2;
    const baseSkip = skipRef << 2;

    let ptrTake = 0; // cursor for previous indices
    let inserted = false; // has currentId been processed?

    for (let x = 0; x < k; x++) {
      // --- Simulate the x-th element of the "Take" set ---
      let valTake = 2147483647; // Infinity
      const fromPrev = ptrTake < k - 1 ? pool[baseTake + ptrTake] : 2147483647;

      if (!inserted) {
        if (currentId < fromPrev) {
          valTake = currentId;
          inserted = true;
        } else {
          valTake = fromPrev;
          ptrTake++;
        }
      } else {
        valTake = fromPrev;
        ptrTake++;
      }

      // --- Get x-th element of the "Skip" set ---
      const valSkip = pool[baseSkip + x];

      if (valTake < valSkip) return true;
      if (valTake > valSkip) return false;
    }
    return false;
  }

  // 5. Main DP Loop (Iterate backwards)
  for (let i = n - 1; i >= 0; i--) {
    const rowOffset = i * ROW_SIZE;
    const skipRowOffset = (i + 1) * ROW_SIZE;

    // Data for "Take" option
    const currentId = originalIds[i];
    const currentWeight = weights[i];
    const nextIdx = nextValid[i];
    const takeRowOffset = nextIdx * ROW_SIZE;

    for (let k = 1; k <= 4; k++) {
      // --- Option 1: Skip ---
      const skipW = dpWeight[skipRowOffset + k];
      const skipRef = dpRef[skipRowOffset + k];

      // --- Option 2: Take ---
      // We need results for (k-1) from the next valid interval
      const prevW = dpWeight[takeRowOffset + (k - 1)];

      let finalW = -1;
      let finalRef = 0;
      let canTake = false;

      if (prevW !== -1) {
        const takeW = currentWeight + prevW;

        if (takeW > skipW) {
          canTake = true;
          finalW = takeW;
        } else if (takeW === skipW) {
          // Tie-break: if scores equal, check lexicographical order
          if (skipW !== -1) {
            const takePrevRef = dpRef[takeRowOffset + (k - 1)];
            if (isTakeSmaller(takePrevRef, currentId, skipRef, k)) {
              canTake = true;
            }
            finalW = takeW;
          } else {
            // Skip was impossible, Take is the only option
            canTake = true;
            finalW = takeW;
          }
        } else {
          // Skip is better
          finalW = skipW;
        }
      } else {
        // Cannot Take
        finalW = skipW;
      }

      dpWeight[rowOffset + k] = finalW;

      if (finalW !== -1) {
        if (canTake) {
          // Performance Critical: Write new set to Pool
          poolPtr++;
          finalRef = poolPtr;

          const baseDest = finalRef << 2;
          const baseSrc = dpRef[takeRowOffset + (k - 1)] << 2;

          // Merge currentId with previous indices into the pool
          let ptr = 0;
          let inserted = false;
          for (let x = 0; x < k; x++) {
            let val = 2147483647;
            if (ptr < k - 1) val = pool[baseSrc + ptr];

            if (!inserted) {
              if (currentId < val) {
                pool[baseDest + x] = currentId;
                inserted = true;
              } else {
                pool[baseDest + x] = val;
                ptr++;
              }
            } else {
              pool[baseDest + x] = val;
              ptr++;
            }
          }
        } else {
          // Optimization: Zero-Copy. Just point to the existing block.
          finalRef = skipRef;
        }
        dpRef[rowOffset + k] = finalRef;
      }
    }
  }

  // 6. Find the best result among k=1..4
  let bestK = 1;
  let maxVal = dpWeight[1]; // Result at index 0 (start of array), k=1
  let bestRef = dpRef[1];

  for (let k = 2; k <= 4; k++) {
    const w = dpWeight[k];
    const ref = dpRef[k];

    if (w > maxVal) {
      maxVal = w;
      bestK = k;
      bestRef = ref;
    } else if (w === maxVal && w !== -1) {
      // Lexicographical compare between sets of potentially different sizes
      const baseBest = bestRef << 2;
      const baseCurr = ref << 2;

      let isBetter = false;
      const len = bestK > k ? bestK : k;
      for (let x = 0; x < len; x++) {
        // -1 denotes "end of valid indices" if we treated them as padded
        // Here we simulate padding logic: shorter prefix is smaller
        const valBest = x < bestK ? pool[baseBest + x] : -1;
        const valCurr = x < k ? pool[baseCurr + x] : -1;

        if (valCurr === -1) {
          isBetter = true;
          break;
        }
        if (valBest === -1) {
          isBetter = false;
          break;
        }
        if (valCurr < valBest) {
          isBetter = true;
          break;
        }
        if (valCurr > valBest) {
          isBetter = false;
          break;
        }
      }
      if (isBetter) {
        bestK = k;
        bestRef = ref;
      }
    }
  }

  if (maxVal === -1) return [];

  // Extract result from pool
  const res = new Array(bestK);
  const base = bestRef << 2;
  for (let i = 0; i < bestK; i++) res[i] = pool[base + i];

  return res;
}
console.log(maximumScore(intervals));
