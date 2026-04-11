// 3003. Maximize the Number of Partitions After Operations

/**
Example 1:

Input: s = "accca", k = 2

Output: 3

Explanation:

The optimal way is to change s[2] to something other than a and c, for example, b. then it becomes "acbca".

Then we perform the operations:

The longest prefix containing at most 2 distinct characters is "ac", we remove it and s becomes "bca".
Now The longest prefix containing at most 2 distinct characters is "bc", so we remove it and s becomes "a".
Finally, we remove "a" and s becomes empty, so the procedure ends.
Doing the operations, the string is divided into 3 partitions, so the answer is 3.

Example 2:

Input: s = "aabaab", k = 3

Output: 1

Explanation:

Initially s contains 2 distinct characters, so whichever character we change, it will contain at most 3 distinct characters, so the longest prefix with at most 3 distinct characters would always be all of it, therefore the answer is 1.

Example 3:

Input: s = "xxyz", k = 1

Output: 4

Explanation:

The optimal way is to change s[0] or s[1] to something other than characters in s, for example, to change s[0] to w.

Then s becomes "wxyz", which consists of 4 distinct characters, so as k is 1, it will divide into 4 partitions.


*/

const s = "accca",
  k = 2;

const maxPartitionsAfterOperations = function (s: string, k: number): number {
  const n = s.length;
  // If k is 26 or more, any sequence is just 1 partition
  // as it can hold all the possible distinct English letters.
  if (k >= 26) return 1;

  // Brian Kernighan's bitwise algorithm
  function popcount(num: number): number {
    let count = 0;
    while (num !== 0) {
      num &= num - 1;
      count++;
    }
    return count;
  }

  const max_chars = 26;
  // Flattened array for cache locality preventing JS engine from instantiating ~10k tiny arrays
  const sorted_occ = new Int32Array((n + 1) * max_chars);
  const occ_length = new Int32Array(n + 1);
  const next_occ = new Int32Array(26).fill(n);
  const arr = new Int32Array(26);

  // Find the first occurrence indices of all characters mapped onto every prefix string index point
  for (let p = n - 1; p >= 0; p--) {
    let ch = s.charCodeAt(p) - 97;
    next_occ[ch] = p;

    let len = 0;
    for (let c = 0; c < 26; c++) {
      if (next_occ[c] !== n) {
        // Higher 27 bits reserved for bounds Index, Lower 5 bits allocated for the specific char
        arr[len++] = (next_occ[c] << 5) | c;
      }
    }

    // Insertion sort applied directly inline (Outperforms .sort() heavily on tinier structures)
    for (let i = 1; i < len; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }

    let offset = p * max_chars;
    for (let i = 0; i < len; i++) {
      sorted_occ[offset + i] = arr[i];
    }
    occ_length[p] = len;
  }

  // Process from end to beginning suffix bounds
  const suf = new Int32Array(n + 1);
  suf[n] = 0;
  for (let j = n - 1; j >= 0; j--) {
    let rem = k;
    let next_boundary = n;
    let offset = j * max_chars;
    let len = occ_length[j];
    for (let i = 0; i < len; i++) {
      let val = sorted_occ[offset + i];
      if (rem === 0) {
        next_boundary = val >> 5;
        break;
      }
      rem--;
    }
    suf[j] = 1 + suf[next_boundary];
  }

  let max_parts = 0;
  let completed = 0;
  let prefix_mask = 0;

  for (let i = 0; i < n; i++) {
    // Experiment with swapping out to every character (and also effectively evaluating unmodified with s.charAt(i))
    for (let c = 0; c < 26; c++) {
      let cur_completed = completed;
      let cur_mask = prefix_mask;

      let temp_mask = cur_mask | (1 << c);
      if (popcount(temp_mask) > k) {
        cur_completed += 1;
        cur_mask = 1 << c;
      } else {
        cur_mask = temp_mask;
      }

      let p = i + 1;
      let j = n;
      if (p < n) {
        let rem = k - popcount(cur_mask);
        let offset = p * max_chars;
        let len = occ_length[p];
        for (let idx = 0; idx < len; idx++) {
          let val = sorted_occ[offset + idx];
          let ch = val & 31;
          if ((cur_mask & (1 << ch)) === 0) {
            if (rem === 0) {
              j = val >> 5;
              break;
            }
            rem--;
          }
        }
      }

      let total_parts = cur_completed + 1 + suf[j];
      if (total_parts > max_parts) {
        max_parts = total_parts;
      }
    }

    // Progress actual unmodified progression logic for testing later loops
    let actual_c = s.charCodeAt(i) - 97;
    let temp_mask = prefix_mask | (1 << actual_c);
    if (popcount(temp_mask) > k) {
      completed += 1;
      prefix_mask = 1 << actual_c;
    } else {
      prefix_mask = temp_mask;
    }
  }

  return max_parts;
};

console.log(maxPartitionsAfterOperations(s, k));
