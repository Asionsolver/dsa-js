// 2975. Maximum Square Area by Removing Fences From a Field

/**
Example 1:



Input: m = 4, n = 3, hFences = [2,3], vFences = [2]
Output: 4
Explanation: Removing the horizontal fence at 2 and the vertical fence at 2 will give a square field of area 4.
Example 2:



Input: m = 6, n = 7, hFences = [2], vFences = [4]
Output: -1
Explanation: It can be proved that there is no way to create a square field by removing fences.
*/

const m = 4,
  n = 3,
  hFences = [2, 3],
  vFences = [2];

/**
// *? good solution but it take too much run time
 function maximizeSquareArea(m: number, n: number, hFences: number[], vFences: number[]): number {
    // 1. Add boundary fences
    hFences.push(1, m);
    vFences.push(1, n);

    // 2. Sort fence coordinates numerically
    hFences.sort((a, b) => a - b);
    vFences.sort((a, b) => a - b);

    // 3. Define the maximum possible side length
    // A square cannot be larger than the smallest dimension of the field.
    // Any gap larger than this is irrelevant.
    const limit = (m < n ? m : n) - 1;

    // 4. Generate all possible gap distances
    // Using arrays is faster than Set.push due to lower allocation overhead.
    const hGaps: number[] = [];
    const vGaps: number[] = [];

    const hLen = hFences.length;
    for (let i = 0; i < hLen; i++) {
        for (let j = i + 1; j < hLen; j++) {
            const diff = hFences[j] - hFences[i];
            // Pruning: Since fences are sorted, if diff > limit, 
            // all subsequent j for this i will also be > limit.
            if (diff > limit) break;
            hGaps.push(diff);
        }
    }

    const vLen = vFences.length;
    for (let i = 0; i < vLen; i++) {
        for (let j = i + 1; j < vLen; j++) {
            const diff = vFences[j] - vFences[i];
            if (diff > limit) break;
            vGaps.push(diff);
        }
    }

    // 5. Sort gaps in descending order to find the largest common one first
    hGaps.sort((a, b) => b - a);
    vGaps.sort((a, b) => b - a);

    // 6. Two-pointer intersection to find max common gap
    let i = 0;
    let j = 0;
    const hGapLen = hGaps.length;
    const vGapLen = vGaps.length;

    while (i < hGapLen && j < vGapLen) {
        // Cache values to avoid repeated array access
        const hVal = hGaps[i];
        const vVal = vGaps[j];

        if (hVal === vVal) {
            // Found the maximum common square side
            const side = BigInt(hVal);
            return Number((side * side) % 1000000007n);
        } else if (hVal > vVal) {
            // Horizontal gap is larger, move h pointer to find a smaller one
            i++;
        } else {
            // Vertical gap is larger, move v pointer
            j++;
        }
    }

    return -1;
};
   */

/**
// function maximizeSquareArea(m: number, n: number, hFences: number[], vFences: number[]): number {
//     // Determine the maximum possible side of a square. 
//     // It cannot be larger than the shortest side of the entire field.
//     const limitSide = (m < n ? m : n) - 1;

//     /**
//      * Helper to process fences:
//      * 1. Adds boundary fences (1 and maxCoord)
//      * 2. Sorts the fences
//      * 3. Calculates all pairwise distances (gaps)
//      * 4. Prunes gaps larger than limitSide
//      * 5. Returns a sorted Int32Array of valid gaps
//      */
//     const getGaps = (fences: number[], maxCoord: number): Int32Array => {
//         const len = fences.length + 2;
//         // Int32Array is used for performance (no boxing, contiguous memory)
//         const f = new Int32Array(len);
//         f.set(fences);
//         f[len - 2] = 1;
//         f[len - 1] = maxCoord;

//         // TypedArray.sort() sorts numerically by default in modern JS environments
//         f.sort();

//         // Maximum possible number of gaps is N*(N-1)/2
//         // For N=600, this is ~180,000, which fits easily in memory (approx 720KB)
//         const maxGaps = (len * (len - 1)) >>> 1;
//         const gaps = new Int32Array(maxGaps);
//         let k = 0;

//         for (let i = 0; i < len; i++) {
//             for (let j = i + 1; j < len; j++) {
//                 const diff = f[j] - f[i];
//                 // Optimization: The fences are sorted. If this gap is too big,
//                 // all subsequent gaps starting from 'i' will also be too big.
//                 if (diff > limitSide) break;
//                 gaps[k++] = diff;
//             }
//         }

//         // Create a view of only the filled portion and sort it
//         const result = gaps.subarray(0, k);
//         result.sort();
//         return result;
//     }

//     // Generate sorted gap arrays for both dimensions
//     const hGaps = getGaps(hFences, m);
//     const vGaps = getGaps(vFences, n);

//     // Use Two Pointers starting from the end (largest values) to find the max common gap
//     let i = hGaps.length - 1;
//     let j = vGaps.length - 1;

//     while (i >= 0 && j >= 0) {
//         const hVal = hGaps[i];
//         const vVal = vGaps[j];

//         if (hVal === vVal) {
//             // Found the maximum square side
//             const side = BigInt(hVal);
//             return Number((side * side) % 1000000007n);
//         }

//         if (hVal > vVal) {
//             // Horizontal gap is larger, move left in hGaps to find smaller
//             i--;
//         } else {
//             // Vertical gap is larger, move left in vGaps
//             j--;
//         }
//     }

//     return -1;
// };

function maximizeSquareArea(
  m: number,
  n: number,
  hFences: number[],
  vFences: number[]
): number {
  // Add the boundary fences
  hFences.push(1, m);
  vFences.push(1, n);

  // Sort the arrays to easily find distances between any two fences
  hFences.sort((a, b) => a - b);
  vFences.sort((a, b) => a - b);

  // Store all possible distances between horizontal fences in a Set
  const hGaps = new Set<number>();
  for (let i = 0; i < hFences.length; i++) {
    for (let j = i + 1; j < hFences.length; j++) {
      hGaps.add(hFences[j] - hFences[i]);
    }
  }

  let maxSide = -1;

  // Iterate through all possible distances between vertical fences
  for (let i = 0; i < vFences.length; i++) {
    for (let j = i + 1; j < vFences.length; j++) {
      const currentGap = vFences[j] - vFences[i];

      // If this vertical gap exists as a horizontal gap, we can form a square
      if (hGaps.has(currentGap)) {
        if (currentGap > maxSide) {
          maxSide = currentGap;
        }
      }
    }
  }

  if (maxSide === -1) {
    return -1;
  }

  // Calculate area modulo 10^9 + 7
  // We use BigInt because (10^9)^2 exceeds Number.MAX_SAFE_INTEGER
  const MOD = 1_000_000_007n;
  const result = (BigInt(maxSide) * BigInt(maxSide)) % MOD;

  return Number(result);
}

console.log(maximizeSquareArea(m, n, hFences, vFences));
