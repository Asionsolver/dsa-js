const arr = [
  [7, 1, -6, 3, 13],
  [10, 5, -1, 0, 9],
  [6, 4, -3, 8, 11],
  [13, -8, -5, 12, 4],
  [3, 2, 1, 9, 8],
  [4, 3, -2, 6, 5],
];

function buildPrefix(arr: number[][]) {
  const m = arr.length;
  const n = arr[0].length;
  const pref = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      pref[i][j] =
        arr[i - 1][j - 1] +
        pref[i - 1][j] +
        pref[i][j - 1] -
        pref[i - 1][j - 1];
    }
  }
  return pref;
}

function query(pref: number[][], topLeft: number[], bottomRight: number[]) {
  const [r1, c1] = topLeft;
  const [r2, c2] = bottomRight;

  return (
    pref[r2 + 1][c2 + 1] - pref[r1][c2 + 1] - pref[r2 + 1][c1] + pref[r1][c1]
  );
}

const pref = buildPrefix(arr);

console.log("Query 1:", query(pref, [2, 1], [4, 3]));
console.log("Query 2:", query(pref, [3, 2], [5, 4]));
