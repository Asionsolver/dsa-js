// 3612. Process String with Special Operations I

/**
Example 1:

Input: s = "a#b%*"

Output: "ba"

Explanation:

i	s[i]	Operation	Current result
0	'a'	Append 'a'	"a"
1	'#'	Duplicate result	"aa"
2	'b'	Append 'b'	"aab"
3	'%'	Reverse result	"baa"
4	'*'	Remove the last character	"ba"
Thus, the final result is "ba".

Example 2:

Input: s = "z*#"

Output: ""

Explanation:

i	s[i]	Operation	Current result
0	'z'	Append 'z'	"z"
1	'*'	Remove the last character	""
2	'#'	Duplicate the string	""
Thus, the final result is "".
*/

function processString(s: string): string {
  let result: string[] = [];

  for (const char of s) {
    if (char === "*") {
      result.pop();
    } else if (char === "#") {
      result = [...result, ...result];
    } else if (char === "%") {
      result.reverse();
    } else {
      result.push(char);
    }
  }

  return result.join("");
}

// Test cases
console.log(processString("a#b%*")); // Output: "ba"
console.log(processString("z*#")); // Output: ""
