// 1386. Cinema Seat Allocation

/**
A cinema has n rows of seats, numbered from 1 to n. Each row has 10 seats, numbered from 1 to 10.

You are given a 2D integer array reservedSeats, where reservedSeats[i] = [rowi, seati] means that seat seati in row rowi is already reserved.

A four-person group must be assigned to four seats in the same row. The group can be seated in one of the following seat blocks:

seats 2, 3, 4, 5
seats 4, 5, 6, 7
seats 6, 7, 8, 9
A block can be used only if none of its seats are reserved. Each seat can be assigned to at most one group.

Return an integer denoting the maximum number of four-person groups that can be assigned.


*/

/**
Example 1:



Input: n = 3, reservedSeats = [[1,2],[1,3],[1,8],[2,6],[3,1],[3,10]]
Output: 4
Explanation: The figure above shows an optimal allocation of four groups. Seats marked in blue are already reserved, and each set of four contiguous seats marked in orange is assigned to one group.
Example 2:

Input: n = 2, reservedSeats = [[2,1],[1,8],[2,6]]
Output: 2
Example 3:

Input: n = 4, reservedSeats = [[4,3],[1,4],[4,6],[1,7]]
Output: 4
*/

/**
Constraints:

1 <= n <= 109
1 <= reservedSeats.length <= min(10 * n, 104)
reservedSeats[i] == [rowi, seati]
1 <= rowi <= n
1 <= seati <= 10
All reservedSeats[i] are distinct.
 

*/

function maxNumberOfFamilies(n: number, reservedSeats: number[][]): number {
  // Map to store row number and its bitmask of reserved seats
  const rowMap = new Map<number, number>();

  for (const [row, seat] of reservedSeats) {
    // We only care about seats 2-9. Seats 1 and 10 don't affect the groups.
    if (seat > 1 && seat < 10) {
      const currentMask = rowMap.get(row) || 0;
      // Use bitwise OR to set the bit corresponding to the seat
      // Seat 2 -> bit 1, Seat 3 -> bit 2, ..., Seat 9 -> bit 8
      rowMap.set(row, currentMask | (1 << (seat - 1)));
    }
  }

  // Pre-calculate bitmasks for the three possible blocks
  // Left: 2,3,4,5  -> bits 1,2,3,4
  const LEFT_MASK = (1 << 1) | (1 << 2) | (1 << 3) | (1 << 4);
  // Right: 6,7,8,9 -> bits 5,6,7,8
  const RIGHT_MASK = (1 << 5) | (1 << 6) | (1 << 7) | (1 << 8);
  // Middle: 4,5,6,7 -> bits 3,4,5,6
  const MIDDLE_MASK = (1 << 3) | (1 << 4) | (1 << 5) | (1 << 6);

  // Start with groups from completely empty rows
  let totalGroups = (n - rowMap.size) * 2;

  for (const mask of rowMap.values()) {
    const canLeft = (mask & LEFT_MASK) === 0;
    const canRight = (mask & RIGHT_MASK) === 0;
    const canMiddle = (mask & MIDDLE_MASK) === 0;

    if (canLeft && canRight) {
      // Can fit both blocks
      totalGroups += 2;
    } else if (canLeft || canRight || canMiddle) {
      // Can fit at least one of the three blocks
      totalGroups += 1;
    }
    // Otherwise, 0 groups can be added to this row
  }

  return totalGroups;
}

// Example usage:
console.log(
  maxNumberOfFamilies(3, [
    [1, 2],
    [1, 3],
    [1, 8],
    [2, 6],
    [3, 1],
    [3, 10],
  ]),
); // Output: 4
console.log(
  maxNumberOfFamilies(2, [
    [2, 1],
    [1, 8],
    [2, 6],
  ]),
); // Output: 2
console.log(
  maxNumberOfFamilies(4, [
    [4, 3],
    [1, 4],
    [4, 6],
    [1, 7],
  ]),
); // Output: 4
