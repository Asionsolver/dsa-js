// 756. Pyramid Transition Matrix

/**

Example 1:


Input: bottom = "BCD", allowed = ["BCC","CDE","CEA","FFF"]
Output: true
Explanation: The allowed triangular patterns are shown on the right.
Starting from the bottom (level 3), we can build "CE" on level 2 and then build "A" on level 1.
There are three triangular patterns in the pyramid, which are "BCC", "CDE", and "CEA". All are allowed.
Example 2:


Input: bottom = "AAAA", allowed = ["AAB","AAC","BCD","BBE","DEF"]
Output: false
Explanation: The allowed triangular patterns are shown on the right.
Starting from the bottom (level 4), there are multiple ways to build level 3, but trying all the possibilites, you will get always stuck before building level 1.
*/
const bottom = "BCD",
  allowed = ["BCC", "CDE", "CEA", "FFF"];

const pyramidTransition = function (
  bottom: string,
  allowed: string[]
): boolean {
  // Map to store transitions: "LeftRight" -> ["Top1", "Top2", ...]
  const transitions = new Map<string, string[]>();

  for (const pattern of allowed) {
    const base = pattern.substring(0, 2);
    const top = pattern.substring(2);

    if (!transitions.has(base)) {
      transitions.set(base, []);
    }
    transitions.get(base)!.push(top);
  }

  // Memoization map to store results for specific row configurations
  const memo = new Map<string, boolean>();

  /**
   * Main DFS function to check if a pyramid can be built from the current row.
   */
  function canBuild(currentRow: string): boolean {
    // Base case: If the row has only 1 block, we reached the top.
    if (currentRow.length === 1) return true;

    // Check memoization cache
    if (memo.has(currentRow)) return memo.get(currentRow)!;

    // Try to generate a valid next row and recurse
    const result = buildNextRow(currentRow, 0, "");

    // Cache and return result
    memo.set(currentRow, result);
    return result;
  }

  /**
   * Helper backtracking function to generate all possible next rows
   * character by character.
   *
   * @param currentRow The full row below the one we are building
   * @param index The current index we are looking at in currentRow (left parent)
   * @param nextRowPartial The partial string of the row being built
   */
  function buildNextRow(
    currentRow: string,
    index: number,
    nextRowPartial: string
  ): boolean {
    // If we have filled the next row (length should be currentRow.length - 1)
    if (index === currentRow.length - 1) {
      // Once the next row is fully formed, recurse to the next level
      return canBuild(nextRowPartial);
    }

    // Identify the base pair (Left, Right)
    const key = currentRow[index] + currentRow[index + 1];

    // Get allowed tops for this pair
    const allowedTops = transitions.get(key);

    // If no blocks can be placed on top of this pair, this path is dead
    if (!allowedTops || allowedTops.length === 0) {
      return false;
    }

    // Try all allowed blocks for this position
    for (const top of allowedTops) {
      if (buildNextRow(currentRow, index + 1, nextRowPartial + top)) {
        return true;
      }
    }

    return false;
  }

  return canBuild(bottom);
};

console.log(pyramidTransition(bottom, allowed));
