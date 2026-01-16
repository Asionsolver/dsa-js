// 1625. Lexicographically Smallest String After Applying Operations

/**
Example 1:

Input: s = "5525", a = 9, b = 2
Output: "2050"
Explanation: We can apply the following operations:
Start:  "5525"
Rotate: "2555"
Add:    "2454"
Add:    "2353"
Rotate: "5323"
Add:    "5222"
Add:    "5121"
Rotate: "2151"
Add:    "2050"​​​​​
There is no way to obtain a string that is lexicographically smaller than "2050".
Example 2:

Input: s = "74", a = 5, b = 1
Output: "24"
Explanation: We can apply the following operations:
Start:  "74"
Rotate: "47"
​​​​​​​Add:    "42"
​​​​​​​Rotate: "24"​​​​​​​​​​​​
There is no way to obtain a string that is lexicographically smaller than "24".
Example 3:

Input: s = "0011", a = 4, b = 2
Output: "0011"
Explanation: There are no sequence of operations that will give us a lexicographically smaller string than "0011".
*/

const s = "5525",
  a = 9,
  b = 2;
function findLexSmallestString(s: string, a: number, b: number): string {
  const n = s.length;
  let smallest = s;

  // Set to keep track of visited states to avoid cycles
  const visited = new Set<string>();

  // Stack for DFS (Depth-First Search)
  const stack: string[] = [s];
  visited.add(s);

  while (stack.length > 0) {
    // Pop the current string to process
    const current = stack.pop()!;

    // Update result if the current string is smaller than what we've seen
    if (current < smallest) {
      smallest = current;
    }

    // Operation 1: Add 'a' to all odd indices
    const chars = current.split("");
    for (let i = 1; i < n; i += 2) {
      const digit = parseInt(chars[i], 10);
      // Apply (digit + a) % 10
      chars[i] = ((digit + a) % 10).toString();
    }
    const addedString = chars.join("");

    // If we haven't seen this state, add to stack
    if (!visited.has(addedString)) {
      visited.add(addedString);
      stack.push(addedString);
    }

    // Operation 2: Rotate string to the right by 'b' positions
    // Logic: The last 'b' characters move to the front
    const rotatedString =
      current.substring(n - b) + current.substring(0, n - b);

    // If we haven't seen this state, add to stack
    if (!visited.has(rotatedString)) {
      visited.add(rotatedString);
      stack.push(rotatedString);
    }
  }

  return smallest;
}
console.log(findLexSmallestString(s, a, b));
