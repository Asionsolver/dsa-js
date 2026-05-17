// 1306. Jump Game III

/**
Example 1:

Input: arr = [4,2,3,0,3,1,2], start = 5
Output: true
Explanation: 
All possible ways to reach at index 3 with value 0 are: 
index 5 -> index 4 -> index 1 -> index 3 
index 5 -> index 6 -> index 4 -> index 1 -> index 3 
Example 2:

Input: arr = [4,2,3,0,3,1,2], start = 0
Output: true 
Explanation: 
One possible way to reach at index 3 with value 0 is: 
index 0 -> index 4 -> index 1 -> index 3
Example 3:

Input: arr = [3,0,2,1,2], start = 2
Output: false
Explanation: There is no way to reach at index 1 with value 0.
*/

function canReach(arr: number[], start: number): boolean {
  const stack: number[] = [start];
  // Using Uint8Array for a highly optimized, low-memory visited tracker
  const visited = new Uint8Array(arr.length);

  while (stack.length > 0) {
    const curr = stack.pop()!;

    // If we found the target value, return true
    if (arr[curr] === 0) {
      return true;
    }

    // If already visited, continue to the next item in stack
    if (visited[curr]) {
      continue;
    }

    // Mark the current index as visited
    visited[curr] = 1;

    const jump = arr[curr];
    const left = curr - jump;
    const right = curr + jump;

    // Push valid jump indices to stack
    if (left >= 0) {
      stack.push(left);
    }
    if (right < arr.length) {
      stack.push(right);
    }
  }

  // Exhausted all paths without finding 0
  return false;
}

// Example usage:
console.log(canReach([4, 2, 3, 0, 3, 1, 2], 5)); // true
console.log(canReach([4, 2, 3, 0, 3, 1, 2], 0)); // true
console.log(canReach([3, 0, 2, 1, 2], 2)); // false
