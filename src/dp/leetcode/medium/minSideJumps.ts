// 1824. Minimum Sideway Jumps

/**
Example 1:


Input: obstacles = [0,1,2,3,0]
Output: 2 
Explanation: The optimal solution is shown by the arrows above. There are 2 side jumps (red arrows).
Note that the frog can jump over obstacles only when making side jumps (as shown at point 2).
Example 2:


Input: obstacles = [0,1,1,3,3,0]
Output: 0
Explanation: There are no obstacles on lane 2. No side jumps are required.
Example 3:


Input: obstacles = [0,2,1,0,3,0]
Output: 2
Explanation: The optimal solution is shown by the arrows above. There are 2 side jumps.
*/

function minSideJumps(obstacles: number[]): number {
  // Represents the minimum side jumps to reach the current point for lanes 1, 2, and 3
  let dp1 = 1;
  let dp2 = 0;
  let dp3 = 1;

  for (let i = 1; i < obstacles.length; i++) {
    const obs = obstacles[i];

    // 1. Moving forward: if there's an obstacle, that lane becomes unreachable at point i
    if (obs === 1) dp1 = Infinity;
    else if (obs === 2) dp2 = Infinity;
    else if (obs === 3) dp3 = Infinity;

    // 2. Side jumps: calculate the base cost to jump to another lane at point i
    const minJumps = Math.min(dp1, dp2, dp3) + 1;

    // Update paths utilizing side jumps if they provide a shorter alternative
    if (obs !== 1) dp1 = Math.min(dp1, minJumps);
    if (obs !== 2) dp2 = Math.min(dp2, minJumps);
    if (obs !== 3) dp3 = Math.min(dp3, minJumps);
  }

  // The result is the minimum jumps needed to reach the end point on any lane
  return Math.min(dp1, dp2, dp3);
}

// Example usage:
console.log(minSideJumps([0, 1, 2, 3, 0])); // Output: 2
console.log(minSideJumps([0, 1, 1, 3, 3, 0])); // Output: 0
console.log(minSideJumps([0, 2, 1, 0, 3, 0])); // Output: 2
