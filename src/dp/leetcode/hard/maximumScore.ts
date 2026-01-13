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

// ! slightly improve runtime (181ms)
// function maximumScore(intervals: number[][]): number[] {
//     const n = intervals.length;

//     // 1. Sort indices based on interval start times.
//     // We use an index array to avoid creating new object structures.
//     const indices = new Int32Array(n);
//     for (let i = 0; i < n; i++) indices[i] = i;
//     indices.sort((a, b) => intervals[a][0] - intervals[b][0]);

//     // 2. Flatten sorted interval data into Struct of Arrays (SoA).
//     // This improves cache locality during sequential access.
//     const starts = new Int32Array(n);
//     const ends = new Int32Array(n);
//     const weights = new Int32Array(n);
//     const originalIds = new Int32Array(n);

//     for (let i = 0; i < n; i++) {
//         const id = indices[i];
//         const inv = intervals[id];
//         starts[i] = inv[0];
//         ends[i] = inv[1];
//         weights[i] = inv[2];
//         originalIds[i] = id;
//     }

//     // 3. Precompute nextValid index using Binary Search.
//     // Maps each interval i to the first interval j such that starts[j] > ends[i].
//     const nextValid = new Int32Array(n);
//     for (let i = 0; i < n; i++) {
//         const target = ends[i];
//         let l = i + 1;
//         let r = n;
//         while (l < r) {
//             const mid = (l + r) >>> 1;
//             if (starts[mid] > target) {
//                 r = mid;
//             } else {
//                 l = mid + 1;
//             }
//         }
//         nextValid[i] = l;
//     }

//     // 4. DP Initialization.
//     // dpWeight: flattened array (N+1)*5. Stores max weight. Init to -1.
//     // dpRef: flattened array (N+1)*5. Stores pointer to index pool.
//     // Pool: Stores the actual index combinations (blocks of 4 integers).
//     const ROW_SIZE = 5;
//     const dpSize = (n + 1) * ROW_SIZE;
//     const dpWeight = new Float64Array(dpSize).fill(-1);
//     const dpRef = new Int32Array(dpSize);

//     // Pool size estimate: Max 4N entries. Safe buffer size is 16 * N.
//     const pool = new Int32Array(n * 16 + 1024);
//     let poolPtr = 0;

//     // 5. Main DP Loop (Backwards from N-1 to 0)
//     for (let i = n - 1; i >= 0; i--) {
//         const rowOff = i * ROW_SIZE;
//         const skipRowOff = (i + 1) * ROW_SIZE;

//         const cId = originalIds[i];
//         const cW = weights[i];
//         const nextIdx = nextValid[i];
//         const nextRowOff = nextIdx * ROW_SIZE;

//         // --- Unrolled Case k=1 ---
//         {
//             // Option Skip: comes from [i+1][1]
//             const sW = dpWeight[skipRowOff + 1];
//             // Option Take: current weight (next state is k=0, weight 0)
//             const tW = cW;

//             let resW = sW;
//             let resRef = dpRef[skipRowOff + 1];
//             let useTake = false;

//             if (tW > sW) {
//                 useTake = true;
//             } else if (tW === sW) {
//                 // Tie-break: Lexicographical check
//                 // Take set is [cId]. Skip set is pool[sRef] (size 1).
//                 // If sW == -1, skip is impossible, force Take.
//                 if (sW !== -1) {
//                     const sRef = dpRef[skipRowOff + 1];
//                     // Skip set start
//                     const sId = pool[sRef << 2];
//                     if (cId < sId) useTake = true;
//                 } else {
//                     useTake = true;
//                 }
//             }

//             if (useTake) {
//                 resW = tW;
//                 poolPtr++;
//                 resRef = poolPtr;
//                 // Write [cId, 0, 0, 0] to pool
//                 pool[resRef << 2] = cId;
//             }
//             dpWeight[rowOff + 1] = resW;
//             dpRef[rowOff + 1] = resRef;
//         }

//         // --- Unrolled Case k=2 ---
//         {
//             const sW = dpWeight[skipRowOff + 2];
//             const prevW = dpWeight[nextRowOff + 1];
//             let resW = sW;
//             let resRef = dpRef[skipRowOff + 2];

//             if (prevW !== -1) {
//                 const tW = cW + prevW;
//                 let useTake = false;

//                 if (tW > sW) {
//                     useTake = true;
//                 } else if (tW === sW) {
//                     if (sW !== -1) {
//                         // Compare [cId + prevSet] vs [skipSet]
//                         const prevRef = dpRef[nextRowOff + 1];
//                         const sRef = dpRef[skipRowOff + 2];
//                         const baseSrc = prevRef << 2;
//                         const baseSkip = sRef << 2;

//                         const P0 = pool[baseSrc];
//                         const S0 = pool[baseSkip];

//                         // Merge logic: Take 0th element
//                         const T0 = (cId < P0) ? cId : P0;
//                         if (T0 < S0) useTake = true;
//                         else if (T0 === S0) {
//                             // Take 1st element
//                             const T1 = (cId < P0) ? P0 : cId; // remaining one
//                             const S1 = pool[baseSkip + 1];
//                             if (T1 < S1) useTake = true;
//                         }
//                     } else {
//                         useTake = true;
//                     }
//                 }

//                 if (useTake) {
//                     resW = tW;
//                     poolPtr++;
//                     resRef = poolPtr;
//                     const baseDest = resRef << 2;
//                     const baseSrc = dpRef[nextRowOff + 1] << 2;
//                     const P0 = pool[baseSrc];
//                     // Sort insertion of cId
//                     if (cId < P0) {
//                         pool[baseDest] = cId; pool[baseDest + 1] = P0;
//                     } else {
//                         pool[baseDest] = P0; pool[baseDest + 1] = cId;
//                     }
//                 }
//             }
//             dpWeight[rowOff + 2] = resW;
//             dpRef[rowOff + 2] = resRef;
//         }

//         // --- Unrolled Case k=3 ---
//         {
//             const sW = dpWeight[skipRowOff + 3];
//             const prevW = dpWeight[nextRowOff + 2];
//             let resW = sW;
//             let resRef = dpRef[skipRowOff + 3];

//             if (prevW !== -1) {
//                 const tW = cW + prevW;
//                 let useTake = false;

//                 if (tW > sW) {
//                     useTake = true;
//                 } else if (tW === sW) {
//                     if (sW !== -1) {
//                         const prevRef = dpRef[nextRowOff + 2];
//                         const sRef = dpRef[skipRowOff + 3];
//                         const baseSrc = prevRef << 2;
//                         const baseSkip = sRef << 2;

//                         const P0 = pool[baseSrc];
//                         const P1 = pool[baseSrc + 1];
//                         const S0 = pool[baseSkip];

//                         // Unrolled Merge Compare
//                         let T0, nextP = 0;
//                         if (cId < P0) { T0 = cId; nextP = 0; }
//                         else { T0 = P0; nextP = 1; }

//                         if (T0 < S0) useTake = true;
//                         else if (T0 === S0) {
//                             let T1;
//                             // if nextP==0 (cId used), cand is P0. if nextP==1 (P0 used), cand is min(cId, P1)
//                             if (nextP === 0) { T1 = P0; nextP = 1; }
//                             else {
//                                 if (cId < P1) { T1 = cId; nextP = 1; } // logic: cId used now?
//                                 else { T1 = P1; nextP = 2; }
//                             }
//                             // Correction: The `nextP` tracking here is tricky to inline perfectly without vars.
//                             // Simplified: Just 3-way check for T1.
//                             // If cId used, next is P0. If P0 used, next is min(cId, P1).
//                             // Wait, if nextP=0, T1 is P0. T2 is P1.
//                             // If nextP=1 (T0=P0), remaining are {cId, P1}. min is T1.
//                             // Let's rely on standard logic:
//                             // If we didn't pick cId yet, compare cId vs current P.
//                             // Actually, just sorting 3 numbers is fast.
//                             // But comparison is simpler:
//                             const S1 = pool[baseSkip + 1];
//                             // Re-eval T1
//                             // T0 determined.
//                             // Determine T1:
//                             let rem1, rem2;
//                             if (T0 === cId) { rem1 = P0; rem2 = P1; }
//                             else { // T0 was P0
//                                 if (cId < P1) { rem1 = cId; rem2 = P1; }
//                                 else { rem1 = P1; rem2 = cId; }
//                             }
//                             T1 = rem1;

//                             if (T1 < S1) useTake = true;
//                             else if (T1 === S1) {
//                                 const T2 = rem2;
//                                 const S2 = pool[baseSkip + 2];
//                                 if (T2 < S2) useTake = true;
//                             }
//                         }
//                     } else {
//                         useTake = true;
//                     }
//                 }

//                 if (useTake) {
//                     resW = tW;
//                     poolPtr++;
//                     resRef = poolPtr;
//                     const baseDest = resRef << 2;
//                     const baseSrc = dpRef[nextRowOff + 2] << 2;
//                     const P0 = pool[baseSrc];
//                     const P1 = pool[baseSrc + 1];
//                     // Insert cId into sorted P0, P1
//                     if (cId < P0) {
//                         pool[baseDest] = cId; pool[baseDest+1] = P0; pool[baseDest+2] = P1;
//                     } else if (cId < P1) {
//                         pool[baseDest] = P0; pool[baseDest+1] = cId; pool[baseDest+2] = P1;
//                     } else {
//                         pool[baseDest] = P0; pool[baseDest+1] = P1; pool[baseDest+2] = cId;
//                     }
//                 }
//             }
//             dpWeight[rowOff + 3] = resW;
//             dpRef[rowOff + 3] = resRef;
//         }

//         // --- Unrolled Case k=4 ---
//         {
//             const sW = dpWeight[skipRowOff + 4];
//             const prevW = dpWeight[nextRowOff + 3];
//             let resW = sW;
//             let resRef = dpRef[skipRowOff + 4];

//             if (prevW !== -1) {
//                 const tW = cW + prevW;
//                 let useTake = false;

//                 if (tW > sW) {
//                     useTake = true;
//                 } else if (tW === sW) {
//                     if (sW !== -1) {
//                         const prevRef = dpRef[nextRowOff + 3];
//                         const sRef = dpRef[skipRowOff + 4];
//                         const baseSrc = prevRef << 2;
//                         const baseSkip = sRef << 2;
//                         const P0 = pool[baseSrc]; const P1 = pool[baseSrc+1]; const P2 = pool[baseSrc+2];
//                         const S0 = pool[baseSkip];

//                         let T0, mode = 0; // 0: cId available. 1: cId used.
//                         if (cId < P0) { T0 = cId; mode = 1; } else { T0 = P0; }

//                         if (T0 < S0) useTake = true;
//                         else if (T0 === S0) {
//                             const S1 = pool[baseSkip + 1];
//                             let T1;
//                             // Find T1
//                             if (mode === 1) T1 = P0; // cId used at T0
//                             else { // cId avail, P0 used.
//                                 if (cId < P1) { T1 = cId; mode = 1; } else T1 = P1;
//                             }

//                             if (T1 < S1) useTake = true;
//                             else if (T1 === S1) {
//                                 const S2 = pool[baseSkip + 2];
//                                 let T2;
//                                 if (mode === 1) T2 = P1; // cId used previously
//                                 else { // cId avail, P0, P1 used
//                                     if (cId < P2) { T2 = cId; mode = 1; } else T2 = P2;
//                                 }

//                                 if (T2 < S2) useTake = true;
//                                 else if (T2 === S2) {
//                                     const S3 = pool[baseSkip + 3];
//                                     const T3 = (mode === 1) ? P2 : cId;
//                                     if (T3 < S3) useTake = true;
//                                 }
//                             }
//                         }
//                     } else {
//                         useTake = true;
//                     }
//                 }

//                 if (useTake) {
//                     resW = tW;
//                     poolPtr++;
//                     resRef = poolPtr;
//                     const baseDest = resRef << 2;
//                     const baseSrc = dpRef[nextRowOff + 3] << 2;
//                     const P0 = pool[baseSrc]; const P1 = pool[baseSrc+1]; const P2 = pool[baseSrc+2];

//                     if (cId < P0) {
//                         pool[baseDest] = cId; pool[baseDest+1] = P0; pool[baseDest+2] = P1; pool[baseDest+3] = P2;
//                     } else if (cId < P1) {
//                         pool[baseDest] = P0; pool[baseDest+1] = cId; pool[baseDest+2] = P1; pool[baseDest+3] = P2;
//                     } else if (cId < P2) {
//                         pool[baseDest] = P0; pool[baseDest+1] = P1; pool[baseDest+2] = cId; pool[baseDest+3] = P2;
//                     } else {
//                         pool[baseDest] = P0; pool[baseDest+1] = P1; pool[baseDest+2] = P2; pool[baseDest+3] = cId;
//                     }
//                 }
//             }
//             dpWeight[rowOff + 4] = resW;
//             dpRef[rowOff + 4] = resRef;
//         }
//     }

//     // 6. Final Result Aggregation
//     // Find best k in [1..4]
//     let bestK = 1;
//     let maxVal = dpWeight[1];
//     let bestRef = dpRef[1];

//     // Check k=2
//     {
//         const w = dpWeight[2];
//         if (w > maxVal) { maxVal = w; bestK = 2; bestRef = dpRef[2]; }
//         else if (w === maxVal && w !== -1) {
//             // Lexicographical comparison: [bestK] vs [2].
//             // If prefix matches, shorter wins.
//             const baseBest = bestRef << 2;
//             const baseCurr = dpRef[2] << 2;
//             // bestK is 1. Check if best[0] > curr[0] (curr smaller)
//             const vB = pool[baseBest];
//             const vC = pool[baseCurr];
//             if (vC < vB) { bestK = 2; bestRef = dpRef[2]; }
//             // If vC == vB, bestK (len 1) is shorter than len 2, so bestK wins.
//         }
//     }
//     // Check k=3
//     {
//         const w = dpWeight[3];
//         if (w > maxVal) { maxVal = w; bestK = 3; bestRef = dpRef[3]; }
//         else if (w === maxVal && w !== -1) {
//             const baseBest = bestRef << 2;
//             const baseCurr = dpRef[3] << 2;
//             // Compare prefix of length bestK
//             let better = false;
//             let equal = true;
//             for(let x=0; x<bestK; x++) {
//                 const vB = pool[baseBest + x];
//                 const vC = pool[baseCurr + x];
//                 if (vC < vB) { better = true; equal = false; break; }
//                 if (vC > vB) { equal = false; break; }
//             }
//             if (better) { bestK = 3; bestRef = dpRef[3]; }
//         }
//     }
//     // Check k=4
//     {
//         const w = dpWeight[4];
//         if (w > maxVal) { maxVal = w; bestK = 4; bestRef = dpRef[4]; }
//         else if (w === maxVal && w !== -1) {
//             const baseBest = bestRef << 2;
//             const baseCurr = dpRef[4] << 2;
//             let better = false;
//             let equal = true;
//             for(let x=0; x<bestK; x++) {
//                 const vB = pool[baseBest + x];
//                 const vC = pool[baseCurr + x];
//                 if (vC < vB) { better = true; equal = false; break; }
//                 if (vC > vB) { equal = false; break; }
//             }
//             if (better) { bestK = 4; bestRef = dpRef[4]; }
//         }
//     }

//     if (maxVal === -1) return [];

//     const result = new Array(bestK);
//     const base = bestRef << 2;
//     for (let i = 0; i < bestK; i++) result[i] = pool[base + i];

//     return result;
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
