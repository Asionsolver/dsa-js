// 3454. Separate Squares II

/**
Example 1:

Input: squares = [[0,0,1],[2,2,1]]

Output: 1.00000

Explanation:



Any horizontal line between y = 1 and y = 2 results in an equal split, with 1 square unit above and 1 square unit below. The minimum y-value is 1.

Example 2:

Input: squares = [[0,0,2],[1,1,1]]

Output: 1.00000

Explanation:



Since the blue square overlaps with the red square, it will not be counted again. Thus, the line y = 1 splits the squares into two equal parts.
*/

const squares = [
  [0, 0, 2],
  [1, 1, 1],
];

// good solution
// const separateSquares = function (squares: number[][]): number {
//   // Step 1: Coordinate compression for X
//   // Collect all vertical boundaries
//   const xCoords = new Set<number>();
//   for (const [x, y, l] of squares) {
//     xCoords.add(x);
//     xCoords.add(x + l);
//   }
//   // Sort unique x coordinates
//   const sortedX = Array.from(xCoords).sort((a, b) => a - b);
//   const xMap = new Map<number, number>();
//   for (let i = 0; i < sortedX.length; i++) {
//     xMap.set(sortedX[i], i);
//   }

//   // Step 2: Create Sweep Line Events
//   // Map y-coordinate to a list of events (add or remove square x-interval)
//   type Event = { type: number; x1: number; x2: number };
//   const eventsByY = new Map<number, Event[]>();

//   for (const [x, y, l] of squares) {
//     const x1 = xMap.get(x)!;
//     const x2 = xMap.get(x + l)!;

//     // Bottom edge: add square (+1)
//     let list = eventsByY.get(y);
//     if (!list) {
//       list = [];
//       eventsByY.set(y, list);
//     }
//     list.push({ type: 1, x1, x2 });

//     // Top edge: remove square (-1)
//     const yTop = y + l;
//     list = eventsByY.get(yTop);
//     if (!list) {
//       list = [];
//       eventsByY.set(yTop, list);
//     }
//     list.push({ type: -1, x1, x2 });
//   }

//   // Sort unique Y coordinates to process intervals in order
//   const sortedY = Array.from(eventsByY.keys()).sort((a, b) => a - b);

//   // Step 3: Initialize Segment Tree
//   // The tree covers elementary intervals 0 to m-1
//   const m = sortedX.length - 1;
//   // Arrays for segment tree nodes (1-based index)
//   // Size 4*m is sufficient
//   const count = new Int32Array(4 * m);
//   const length = new Float64Array(4 * m);

//   // Update function for Segment Tree
//   // node: current tree node index
//   // start, end: range of elementary intervals covered by this node [start, end)
//   // l, r: range to update [l, r)
//   // val: +1 or -1
//   function update(
//     node: number,
//     start: number,
//     end: number,
//     l: number,
//     r: number,
//     val: number
//   ) {
//     if (l >= end || r <= start) return; // No overlap
//     if (l <= start && end <= r) {
//       // Total overlap
//       count[node] += val;
//     } else {
//       // Partial overlap
//       const mid = (start + end) >> 1;
//       update(node * 2, start, mid, l, r, val);
//       update(node * 2 + 1, mid, end, l, r, val);
//     }

//     // Recalculate covered length for this node
//     if (count[node] > 0) {
//       // If this node is fully covered by at least one square, its length is the physical width
//       length[node] = sortedX[end] - sortedX[start];
//     } else if (end - start === 1) {
//       // Leaf node, count is 0
//       length[node] = 0;
//     } else {
//       // Internal node, count is 0, sum of children
//       length[node] = length[node * 2] + length[node * 2 + 1];
//     }
//   }

//   // Step 4: Sweep and Collect Strips
//   interface Strip {
//     y: number;
//     height: number;
//     width: number;
//   }
//   const strips: Strip[] = [];

//   // Iterate through intervals between consecutive unique y coordinates
//   for (let i = 0; i < sortedY.length - 1; i++) {
//     const y = sortedY[i];
//     const nextY = sortedY[i + 1];

//     // Process all events happening at current y
//     const evs = eventsByY.get(y)!;
//     for (const ev of evs) {
//       update(1, 0, m, ev.x1, ev.x2, ev.type);
//     }

//     // The union width of active squares
//     const width = length[1];
//     const h = nextY - y;

//     if (width > 0 && h > 0) {
//       strips.push({ y, height: h, width });
//     }
//   }

//   // Step 5: Calculate Total Area and Find Split Point
//   let totalArea = 0;
//   for (const s of strips) {
//     totalArea += s.width * s.height;
//   }

//   const target = totalArea / 2;
//   let currentArea = 0;

//   for (const s of strips) {
//     const stripArea = s.width * s.height;
//     // Check if adding this strip reaches or exceeds the target
//     if (currentArea + stripArea >= target) {
//       const needed = target - currentArea;
//       // Since width is constant in this strip, height needed is area / width
//       return s.y + needed / s.width;
//     }
//     currentArea += stripArea;
//   }

//   return sortedY[sortedY.length - 1];
// };

// better solution
// const separateSquares = function (squares: number[][]): number {
//   const n = squares.length;

//   // 1. Coordinate Compression for X-axis
//   // Collect all x start and end points into a typed array
//   const xCoords = new Float64Array(2 * n);
//   for (let i = 0; i < n; i++) {
//     xCoords[i * 2] = squares[i][0];
//     xCoords[i * 2 + 1] = squares[i][0] + squares[i][2];
//   }

//   // Sort for deduplication
//   xCoords.sort();

//   // Create unique sorted X coordinates array
//   const distinctX = new Float64Array(2 * n);
//   let k = 0;
//   if (n > 0) {
//     distinctX[0] = xCoords[0];
//     k = 1;
//     for (let i = 1; i < 2 * n; i++) {
//       if (xCoords[i] > xCoords[i - 1]) {
//         distinctX[k++] = xCoords[i];
//       }
//     }
//   }

//   // Helper to find index in distinctX using Binary Search
//   function getXIndex(val: number): number {
//     let l = 0,
//       r = k - 1;
//     while (l <= r) {
//       const mid = (l + r) >>> 1;
//       if (distinctX[mid] === val) return mid;
//       if (distinctX[mid] < val) l = mid + 1;
//       else r = mid - 1;
//     }
//     return -1;
//   }

//   // 2. Prepare Events
//   // Storing events in parallel arrays to minimize object creation
//   const evY = new Float64Array(2 * n);
//   const evX1 = new Int32Array(2 * n);
//   const evX2 = new Int32Array(2 * n);
//   const evType = new Int8Array(2 * n);
//   const evIndices = new Int32Array(2 * n);

//   for (let i = 0; i < n; i++) {
//     const x = squares[i][0];
//     const y = squares[i][1];
//     const l = squares[i][2];
//     const x1 = getXIndex(x);
//     const x2 = getXIndex(x + l);

//     // Bottom edge (Enter: +1)
//     evY[2 * i] = y;
//     evX1[2 * i] = x1;
//     evX2[2 * i] = x2;
//     evType[2 * i] = 1;
//     evIndices[2 * i] = 2 * i;

//     // Top edge (Leave: -1)
//     evY[2 * i + 1] = y + l;
//     evX1[2 * i + 1] = x1;
//     evX2[2 * i + 1] = x2;
//     evType[2 * i + 1] = -1;
//     evIndices[2 * i + 1] = 2 * i + 1;
//   }

//   // Sort event indices by Y coordinate
//   evIndices.sort((a, b) => evY[a] - evY[b]);

//   // 3. Segment Tree Initialization
//   const numLeaves = k - 1;
//   // Arrays for segment tree nodes (1-based index). Size 4*k is sufficient.
//   const count = new Int32Array(4 * k);
//   const len = new Float64Array(4 * k);

//   // Recursive update function
//   function update(
//     node: number,
//     start: number,
//     end: number,
//     l: number,
//     r: number,
//     val: number
//   ) {
//     if (l >= end || r <= start) return;

//     if (l <= start && end <= r) {
//       count[node] += val;
//     } else {
//       const mid = (start + end) >>> 1;
//       update(node * 2, start, mid, l, r, val);
//       update(node * 2 + 1, mid, end, l, r, val);
//     }

//     // Update covered length for this node
//     if (count[node] > 0) {
//       // Fully covered
//       len[node] = distinctX[end] - distinctX[start];
//     } else if (end - start === 1) {
//       // Leaf node, not covered
//       len[node] = 0;
//     } else {
//       // Internal node, not fully covered, sum children
//       len[node] = len[node * 2] + len[node * 2 + 1];
//     }
//   }

//   // 4. Sweep Line Execution
//   const histY = new Float64Array(2 * n);
//   const histArea = new Float64Array(2 * n);
//   let histCount = 0;

//   let currentTotalArea = 0;
//   let prevY = evY[evIndices[0]];

//   let i = 0;
//   const totalEvents = 2 * n;

//   while (i < totalEvents) {
//     const y = evY[evIndices[i]];
//     const dy = y - prevY;

//     if (dy > 0) {
//       // Add area covered between prevY and y
//       // len[1] is the total active width (coverage of root)
//       currentTotalArea += len[1] * dy;
//       histY[histCount] = y;
//       histArea[histCount] = currentTotalArea;
//       histCount++;
//     }

//     // Process all events happening at current y
//     while (i < totalEvents && evY[evIndices[i]] === y) {
//       const idx = evIndices[i];
//       // Only update if interval is valid
//       if (evX1[idx] < evX2[idx]) {
//         update(1, 0, numLeaves, evX1[idx], evX2[idx], evType[idx]);
//       }
//       i++;
//     }
//     prevY = y;
//   }

//   // 5. Calculate Split Point
//   const target = currentTotalArea / 2;
//   let accumulated = 0;
//   let prevLimitY = evY[evIndices[0]];

//   for (let j = 0; j < histCount; j++) {
//     const currY = histY[j];
//     const currAcc = histArea[j];

//     if (currAcc >= target) {
//       // The target is reached within the interval [prevLimitY, currY]
//       // We need (target - accumulated) more area.
//       // The width of the union in this strip is (currAcc - accumulated) / (currY - prevLimitY)
//       // Or simply solve linearly:
//       return (
//         prevLimitY +
//         ((target - accumulated) * (currY - prevLimitY)) /
//           (currAcc - accumulated)
//       );
//     }

//     accumulated = currAcc;
//     prevLimitY = currY;
//   }

//   return prevLimitY;
// };

// best solution
const separateSquares = function (squares: number[][]): number {
  const n = squares.length;
  // Edge case: if no squares, return 0 (though constraints say n >= 1)
  if (n === 0) return 0;

  // ---------------------------------------------------------
  // 1. Coordinate Compression for X-axis
  // ---------------------------------------------------------
  // We need to map X coordinates to ranks [0, k].
  // Using typed arrays for memory efficiency.

  // xCoords stores [x_start_0, x_end_0, x_start_1, x_end_1, ...]
  const xCoords = new Float64Array(2 * n);
  // xIndices will be sorted to determine the rank of each coordinate
  const xIndices = new Int32Array(2 * n);

  for (let i = 0; i < n; i++) {
    const x = squares[i][0];
    const l = squares[i][2];
    const i1 = i << 1; // Index for start coordinate
    const i2 = i1 | 1; // Index for end coordinate
    xCoords[i1] = x;
    xCoords[i2] = x + l;
    xIndices[i1] = i1;
    xIndices[i2] = i2;
  }

  // Sort indices based on the coordinate values they point to.
  // This avoids sorting the heavier Float64Array directly and allows mapping back easily.
  xIndices.sort((a, b) => xCoords[a] - xCoords[b]);

  // distinctX: unique sorted x coordinates
  // rankMap: maps the original index in xCoords to its rank in distinctX
  const distinctX = new Float64Array(2 * n);
  const rankMap = new Int32Array(2 * n);

  let k = 0;
  // Initialize first element
  distinctX[0] = xCoords[xIndices[0]];
  rankMap[xIndices[0]] = 0;

  for (let i = 1; i < 2 * n; i++) {
    const idx = xIndices[i];
    const prevIdx = xIndices[i - 1];
    if (xCoords[idx] !== xCoords[prevIdx]) {
      k++;
      distinctX[k] = xCoords[idx];
    }
    rankMap[idx] = k;
  }
  k++; // k is now the number of unique x coordinates

  // ---------------------------------------------------------
  // 2. Segment Tree Initialization
  // ---------------------------------------------------------
  // The segment tree covers elementary intervals between distinct X coordinates.
  // There are k-1 such intervals.
  const numLeaves = k - 1;

  // If all x coordinates are identical (width 0), return top of last square.
  if (numLeaves <= 0) return squares[0][1];

  // Use a flat array for the segment tree to avoid object overhead.
  // Size 4 * numLeaves is sufficient.
  const treeSize = 4 * numLeaves;
  const count = new Int32Array(treeSize);
  const len = new Float64Array(treeSize);

  // Recursive update function
  // node: current tree node index (1-based)
  // start, end: current range of elementary intervals [start, end)
  // l, r: update range [l, r)
  // val: +1 (add square) or -1 (remove square)
  function update(
    node: number,
    start: number,
    end: number,
    l: number,
    r: number,
    val: number
  ) {
    // If update range covers current node range completely
    if (l <= start && end <= r) {
      count[node] += val;
    } else {
      const mid = (start + end) >>> 1;
      const left = node << 1;
      const right = left | 1;
      // Pruning: only recurse if overlap exists
      if (l < mid) update(left, start, mid, l, r, val);
      if (r > mid) update(right, mid, end, l, r, val);
    }

    // Update the length covered by this node
    if (count[node] > 0) {
      // If count > 0, the whole range is covered
      len[node] = distinctX[end] - distinctX[start];
    } else if (end - start === 1) {
      // Leaf node with count 0
      len[node] = 0;
    } else {
      // Internal node with count 0: sum of children
      len[node] = len[node << 1] + len[(node << 1) | 1];
    }
  }

  // ---------------------------------------------------------
  // 3. Prepare Sweep Line Events
  // ---------------------------------------------------------
  const evID = new Int32Array(2 * n);
  const evY = new Float64Array(2 * n);

  for (let i = 0; i < n; i++) {
    const y = squares[i][1];
    const l = squares[i][2];
    const i1 = i << 1; // Event ID for bottom edge
    const i2 = i1 | 1; // Event ID for top edge
    evY[i1] = y;
    evY[i2] = y + l;
    evID[i1] = i1;
    evID[i2] = i2;
  }

  // Sort event IDs by their Y coordinate
  evID.sort((a, b) => evY[a] - evY[b]);

  // ---------------------------------------------------------
  // 4. Sweep Line Execution
  // ---------------------------------------------------------
  // History arrays to store (y, accumulated_area) checkpoints
  const histY = new Float64Array(2 * n);
  const histArea = new Float64Array(2 * n);
  let hPtr = 0; // History pointer

  let curArea = 0;
  let prevY = evY[evID[0]];
  let i = 0;
  const limit = 2 * n;

  while (i < limit) {
    const id = evID[i];
    const y = evY[id];

    // If we advanced in Y, calculate area of the strip we just passed
    if (y > prevY) {
      // len[1] is the covered length of the root of the segment tree
      const width = len[1];
      curArea += width * (y - prevY);

      // Record checkpoint
      histY[hPtr] = y;
      histArea[hPtr] = curArea;
      hPtr++;

      prevY = y;
    }

    // Process all events at the current Y coordinate
    while (i < limit && evY[evID[i]] === y) {
      const currId = evID[i];

      // Determine type: Even ID = Bottom (+1), Odd ID = Top (-1)
      const type = (currId & 1) === 0 ? 1 : -1;

      // Retrieve ranks for start and end x-coordinates
      // If currId is start edge, start=rankMap[currId], end=rankMap[currId+1]
      // If currId is end edge, start=rankMap[currId-1], end=rankMap[currId]
      const r1 = rankMap[currId & ~1];
      const r2 = rankMap[currId | 1];

      if (r1 < r2) {
        update(1, 0, numLeaves, r1, r2, type);
      }
      i++;
    }
  }

  // ---------------------------------------------------------
  // 5. Calculate Result
  // ---------------------------------------------------------
  const target = curArea / 2;
  let acc = 0;
  let ly = evY[evID[0]]; // Last Y

  for (let j = 0; j < hPtr; j++) {
    const hy = histY[j]; // Current Y
    const ha = histArea[j]; // Current Accumulated Area

    if (ha >= target) {
      // The target area is reached within the interval [ly, hy].
      // We need 'target - acc' more area.
      // The segment area is 'ha - acc'.
      // The segment height is 'hy - ly'.
      // Interpolate: result = ly + height_needed
      // height_needed = total_height * (area_needed / total_segment_area)
      return ly + ((hy - ly) * (target - acc)) / (ha - acc);
    }

    acc = ha;
    ly = hy;
  }

  return ly;
};
console.log(separateSquares(squares));
