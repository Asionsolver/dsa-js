// 1622. Fancy Sequence

/**
Example 1:

Input
["Fancy", "append", "addAll", "append", "multAll", "getIndex", "addAll", "append", "multAll", "getIndex", "getIndex", "getIndex"]
[[], [2], [3], [7], [2], [0], [3], [10], [2], [0], [1], [2]]
Output
[null, null, null, null, null, 10, null, null, null, 26, 34, 20]

Explanation
Fancy fancy = new Fancy();
fancy.append(2);   // fancy sequence: [2]
fancy.addAll(3);   // fancy sequence: [2+3] -> [5]
fancy.append(7);   // fancy sequence: [5, 7]
fancy.multAll(2);  // fancy sequence: [5*2, 7*2] -> [10, 14]
fancy.getIndex(0); // return 10
fancy.addAll(3);   // fancy sequence: [10+3, 14+3] -> [13, 17]
fancy.append(10);  // fancy sequence: [13, 17, 10]
fancy.multAll(2);  // fancy sequence: [13*2, 17*2, 10*2] -> [26, 34, 20]
fancy.getIndex(0); // return 26
fancy.getIndex(1); // return 34
fancy.getIndex(2); // return 20
*/

const MOD = 1000000007n;

function power(base: bigint, exp: bigint): bigint {
  let res = 1n;
  base = base % MOD;
  while (exp > 0n) {
    if ((exp & 1n) !== 0n) {
      res = (res * base) % MOD;
    }
    base = (base * base) % MOD;
    exp >>= 1n;
  }
  return res;
}

function modInverse(n: bigint): bigint {
  return power(n, MOD - 2n);
}

class Fancy {
  private arr: bigint[];
  private add: bigint;
  private mul: bigint;
  private invMul: bigint;

  constructor() {
    this.arr = [];
    this.add = 0n;
    this.mul = 1n;
    this.invMul = 1n;
  }

  append(val: number): void {
    const v = BigInt(val);
    let x = (v - this.add) % MOD;
    if (x < 0n) x += MOD;
    x = (x * this.invMul) % MOD;
    this.arr.push(x);
  }

  addAll(inc: number): void {
    this.add = (this.add + BigInt(inc)) % MOD;
  }

  multAll(m: number): void {
    const bm = BigInt(m);
    this.mul = (this.mul * bm) % MOD;
    this.add = (this.add * bm) % MOD;
    this.invMul = (this.invMul * modInverse(bm)) % MOD;
  }

  getIndex(idx: number): number {
    if (idx >= this.arr.length) return -1;
    const x = this.arr[idx];
    const res = (x * this.mul + this.add) % MOD;
    return Number(res);
  }
}

// ==========================================
// LOCAL TESTING OUTPUT (LeetCode Simulator)
// ==========================================

const commands = [
  "Fancy",
  "append",
  "addAll",
  "append",
  "multAll",
  "getIndex",
  "addAll",
  "append",
  "multAll",
  "getIndex",
  "getIndex",
  "getIndex",
];
const inputs = [[], [2], [3], [7], [2], [0], [3], [10], [2], [0], [1], [2]];

let obj: Fancy | null = null;
const output: (number | null)[] = [];

for (let i = 0; i < commands.length; i++) {
  const cmd = commands[i];
  const args = inputs[i];

  if (cmd === "Fancy") {
    obj = new Fancy();
    output.push(null);
  } else if (cmd === "append") {
    obj!.append(args[0]);
    output.push(null);
  } else if (cmd === "addAll") {
    obj!.addAll(args[0]);
    output.push(null);
  } else if (cmd === "multAll") {
    obj!.multAll(args[0]);
    output.push(null);
  } else if (cmd === "getIndex") {
    output.push(obj!.getIndex(args[0]));
  }
}

// Print the output to your local console
console.log(
  "Expected Output:[null, null, null, null, null, 10, null, null, null, 26, 34, 20]",
);
console.log("Actual Output:  ", JSON.stringify(output));
