// 3714. Longest Balanced Substring II

/**
Example 1:

Input: s = "abbac"

Output: 4

Explanation:

The longest balanced substring is "abba" because both distinct characters 'a' and 'b' each appear exactly 2 times.

Example 2:

Input: s = "aabcc"

Output: 3

Explanation:

The longest balanced substring is "abc" because all distinct characters 'a', 'b' and 'c' each appear exactly 1 time.

Example 3:

Input: s = "aba"

Output: 2

Explanation:

One of the longest balanced substrings is "ab" because both distinct characters 'a' and 'b' each appear exactly 1 time. Another longest balanced substring is "ba".
*/

const s = "abbac";
const longestBalancedSubstring = function (s: string): number {
  const n = s.length;
  let maxLen = 0;

  // Case 1: Substrings with exactly 1 distinct character
  // We simply look for the longest contiguous sequence of the same character.
  if (n > 0) {
    let currentRun = 0;
    let lastChar = "";
    for (let i = 0; i < n; i++) {
      if (s[i] === lastChar) {
        currentRun++;
      } else {
        currentRun = 1;
        lastChar = s[i];
      }
      maxLen = Math.max(maxLen, currentRun);
    }
  }

  // Case 2: Substrings with exactly 2 distinct characters
  // We check for pairs (a,b), (a,c), and (b,c).
  // The third character acts as a "forbidden" delimiter that resets the current segment.
  const solvePair = (c1: string, c2: string, forbidden: string) => {
    // Map stores: balance -> first index encountered
    // balance = count(c1) - count(c2)
    const map = new Map<number, number>();
    // Initialize with balance 0 at index -1
    map.set(0, -1);
    let balance = 0;

    for (let i = 0; i < n; i++) {
      if (s[i] === forbidden) {
        // Reset state when forbidden char is found
        map.clear();
        balance = 0;
        // The new potential balanced substring could start after this forbidden char
        map.set(0, i);
      } else {
        if (s[i] === c1) balance++;
        else if (s[i] === c2) balance--;

        if (map.has(balance)) {
          // If we have seen this balance before, the substring between
          // the previous index and current index has equal number of c1 and c2.
          maxLen = Math.max(maxLen, i - map.get(balance)!);
        } else {
          map.set(balance, i);
        }
      }
    }
  };

  solvePair("a", "b", "c");
  solvePair("a", "c", "b");
  solvePair("b", "c", "a");

  // Case 3: Substrings with exactly 3 distinct characters (a, b, c)
  // Condition: count(a) == count(b) == count(c)
  // We track the relative differences.
  // Key: "diff1,diff2" where diff1 = a-b, diff2 = b-c
  let ca = 0,
    cb = 0,
    cc = 0;
  const map3 = new Map<string, number>();
  map3.set("0,0", -1);

  for (let i = 0; i < n; i++) {
    const char = s[i];
    if (char === "a") ca++;
    else if (char === "b") cb++;
    else if (char === "c") cc++;

    const diff1 = ca - cb;
    const diff2 = cb - cc;
    const key = `${diff1},${diff2}`;

    if (map3.has(key)) {
      // If the same difference state occurred before, the substring in between
      // has maintained the equality of relative counts.
      maxLen = Math.max(maxLen, i - map3.get(key)!);
    } else {
      map3.set(key, i);
    }
  }

  return maxLen;
};

console.log(longestBalancedSubstring(s));
