// 3445. Maximum Difference Between Even and Odd Frequency II

/**
Example 1:

Input: s = "12233", k = 4

Output: -1

Explanation:

For the substring "12233", the frequency of '1' is 1 and the frequency of '3' is 2. The difference is 1 - 2 = -1.

Example 2:

Input: s = "1122211", k = 3

Output: 1

Explanation:

For the substring "11222", the frequency of '2' is 3 and the frequency of '1' is 2. The difference is 3 - 2 = 1.

Example 3:

Input: s = "110", k = 3

Output: -1


*/

function maxDifference(s: string, k: number): number {
  const n = s.length;
  let maxDiff = -Infinity;

  // Iterate over all possible pairs of characters (a, b)
  for (let a = 0; a <= 4; a++) {
    for (let b = 0; b <= 4; b++) {
      if (a === b) continue;

      let curr_R = -1;
      let cA = 0;
      let cB = 0;
      let curA = 0;
      let curB = 0;
      let pos_B = -1;

      // Arrays or distinct variables to keep track of minimum prefix differences per parity combination
      let min_P0 = Infinity;
      let min_P1 = Infinity;
      let min_P2 = Infinity;
      let min_P3 = Infinity;

      for (let i = 0; i < n; i++) {
        const charCode = s.charCodeAt(i) - 48;
        if (charCode === a) {
          curA++;
        } else if (charCode === b) {
          curB++;
          pos_B = i;
        }

        // Substring length must be at least k, and must include at least one 'b'
        const target_R = Math.min(i + 1 - k, pos_B);

        // Unfurl valid earlier prefixes into the optimal min state
        while (curr_R < target_R) {
          curr_R++;
          if (curr_R > 0) {
            const prevChar = s.charCodeAt(curr_R - 1) - 48;
            if (prevChar === a) cA++;
            else if (prevChar === b) cB++;
          }

          const pVal = cA - cB;
          // State format: (cA_parity << 1) | cB_parity
          const st = ((cA & 1) << 1) | (cB & 1);

          if (st === 0) {
            if (pVal < min_P0) min_P0 = pVal;
          } else if (st === 1) {
            if (pVal < min_P1) min_P1 = pVal;
          } else if (st === 2) {
            if (pVal < min_P2) min_P2 = pVal;
          } else {
            if (pVal < min_P3) min_P3 = pVal;
          }
        }

        if (curr_R >= 0) {
          const curP = curA - curB;
          // We require curA - cA to be odd, meaning cA must have the opposite parity to curA
          // We require curB - cB to be even, meaning cB must have the identical parity as curB
          const req_st = (((curA & 1) ^ 1) << 1) | (curB & 1);

          let minP = Infinity;
          if (req_st === 0) minP = min_P0;
          else if (req_st === 1) minP = min_P1;
          else if (req_st === 2) minP = min_P2;
          else minP = min_P3;

          if (minP !== Infinity) {
            const diff = curP - minP;
            if (diff > maxDiff) {
              maxDiff = diff;
            }
          }
        }
      }
    }
  }

  return maxDiff;
}
