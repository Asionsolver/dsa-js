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

const separateSquares = function (squares: number[][]): number {
  // Step 1: Coordinate compression for X
  // Collect all vertical boundaries
  const xCoords = new Set<number>();
  for (const [x, y, l] of squares) {
    xCoords.add(x);
    xCoords.add(x + l);
  }
  // Sort unique x coordinates
  const sortedX = Array.from(xCoords).sort((a, b) => a - b);
  const xMap = new Map<number, number>();
  for (let i = 0; i < sortedX.length; i++) {
    xMap.set(sortedX[i], i);
  }

  // Step 2: Create Sweep Line Events
  // Map y-coordinate to a list of events (add or remove square x-interval)
  type Event = { type: number; x1: number; x2: number };
  const eventsByY = new Map<number, Event[]>();

  for (const [x, y, l] of squares) {
    const x1 = xMap.get(x)!;
    const x2 = xMap.get(x + l)!;

    // Bottom edge: add square (+1)
    let list = eventsByY.get(y);
    if (!list) {
      list = [];
      eventsByY.set(y, list);
    }
    list.push({ type: 1, x1, x2 });

    // Top edge: remove square (-1)
    const yTop = y + l;
    list = eventsByY.get(yTop);
    if (!list) {
      list = [];
      eventsByY.set(yTop, list);
    }
    list.push({ type: -1, x1, x2 });
  }

  // Sort unique Y coordinates to process intervals in order
  const sortedY = Array.from(eventsByY.keys()).sort((a, b) => a - b);

  // Step 3: Initialize Segment Tree
  // The tree covers elementary intervals 0 to m-1
  const m = sortedX.length - 1;
  // Arrays for segment tree nodes (1-based index)
  // Size 4*m is sufficient
  const count = new Int32Array(4 * m);
  const length = new Float64Array(4 * m);

  // Update function for Segment Tree
  // node: current tree node index
  // start, end: range of elementary intervals covered by this node [start, end)
  // l, r: range to update [l, r)
  // val: +1 or -1
  function update(
    node: number,
    start: number,
    end: number,
    l: number,
    r: number,
    val: number
  ) {
    if (l >= end || r <= start) return; // No overlap
    if (l <= start && end <= r) {
      // Total overlap
      count[node] += val;
    } else {
      // Partial overlap
      const mid = (start + end) >> 1;
      update(node * 2, start, mid, l, r, val);
      update(node * 2 + 1, mid, end, l, r, val);
    }

    // Recalculate covered length for this node
    if (count[node] > 0) {
      // If this node is fully covered by at least one square, its length is the physical width
      length[node] = sortedX[end] - sortedX[start];
    } else if (end - start === 1) {
      // Leaf node, count is 0
      length[node] = 0;
    } else {
      // Internal node, count is 0, sum of children
      length[node] = length[node * 2] + length[node * 2 + 1];
    }
  }

  // Step 4: Sweep and Collect Strips
  interface Strip {
    y: number;
    height: number;
    width: number;
  }
  const strips: Strip[] = [];

  // Iterate through intervals between consecutive unique y coordinates
  for (let i = 0; i < sortedY.length - 1; i++) {
    const y = sortedY[i];
    const nextY = sortedY[i + 1];

    // Process all events happening at current y
    const evs = eventsByY.get(y)!;
    for (const ev of evs) {
      update(1, 0, m, ev.x1, ev.x2, ev.type);
    }

    // The union width of active squares
    const width = length[1];
    const h = nextY - y;

    if (width > 0 && h > 0) {
      strips.push({ y, height: h, width });
    }
  }

  // Step 5: Calculate Total Area and Find Split Point
  let totalArea = 0;
  for (const s of strips) {
    totalArea += s.width * s.height;
  }

  const target = totalArea / 2;
  let currentArea = 0;

  for (const s of strips) {
    const stripArea = s.width * s.height;
    // Check if adding this strip reaches or exceeds the target
    if (currentArea + stripArea >= target) {
      const needed = target - currentArea;
      // Since width is constant in this strip, height needed is area / width
      return s.y + needed / s.width;
    }
    currentArea += stripArea;
  }

  return sortedY[sortedY.length - 1];
};
console.log(separateSquares(squares));
