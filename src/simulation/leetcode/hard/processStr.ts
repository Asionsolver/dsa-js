// 3614. Process String with Special Operations II

/**
Example 1:

Input: s = "a#b%*", k = 1

Output: "a"

Explanation:

i	s[i]	Operation	Current result
0	'a'	Append 'a'	"a"
1	'#'	Duplicate result	"aa"
2	'b'	Append 'b'	"aab"
3	'%'	Reverse result	"baa"
4	'*'	Remove the last character	"ba"
The final result is "ba". The character at index k = 1 is 'a'.

Example 2:

Input: s = "cd%#*#", k = 3

Output: "d"

Explanation:

i	s[i]	Operation	Current result
0	'c'	Append 'c'	"c"
1	'd'	Append 'd'	"cd"
2	'%'	Reverse result	"dc"
3	'#'	Duplicate result	"dcdc"
4	'*'	Remove the last character	"dcd"
5	'#'	Duplicate result	"dcddcd"
The final result is "dcddcd". The character at index k = 3 is 'd'.

Example 3:

Input: s = "z*#", k = 0

Output: "."

Explanation:

i	s[i]	Operation	Current result
0	'z'	Append 'z'	"z"
1	'*'	Remove the last character	""
2	'#'	Duplicate the string	""
The final result is "". Since index k = 0 is out of bounds, the output is '.'.
*/

function processStr(s: string, k: number): string {
  const n = s.length;
  const sizes: number[] = new Array(n);
  let sz = 0;

  // Step 1: Forward pass to compute intermediate string sizes
  for (let i = 0; i < n; i++) {
    const c = s[i];
    if (c === "*") {
      if (sz > 0) {
        sz--;
      }
    } else if (c === "#") {
      sz *= 2;
    } else if (c === "%") {
      // Reversal does not change the size of the string
    } else {
      sz++;
    }
    sizes[i] = sz;
  }

  // If k is out of bounds of the final string
  if (k >= sz) {
    return ".";
  }

  // Step 2: Backward pass to find the kth character
  for (let i = n - 1; i >= 0; i--) {
    const c = s[i];
    const currentSz = sizes[i];

    if (c === "*") {
      continue;
    } else if (c === "#") {
      const half = Math.floor(currentSz / 2);
      if (k >= half) {
        k -= half;
      }
    } else if (c === "%") {
      k = currentSz - 1 - k;
    } else {
      // If the character is a lowercase English letter
      if (k === currentSz - 1) {
        return c;
      }
    }
  }

  return ".";
}

// Example usage:
console.log(processStr("a#b%*", 1)); // Output: "a"
console.log(processStr("cd%#*#", 3)); // Output: "d"
console.log(processStr("z*#", 0)); // Output: "."
