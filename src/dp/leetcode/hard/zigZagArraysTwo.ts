// 3700. Number of ZigZag Arrays II

/**
Example 1:

Input: n = 3, l = 4, r = 5

Output: 2

Explanation:

There are only 2 valid ZigZag arrays of length n = 3 using values in the range [4, 5]:

[4, 5, 4]
[5, 4, 5]
Example 2:

Input: n = 3, l = 1, r = 3

Output: 10

Explanation:

​​​​​​​There are 10 valid ZigZag arrays of length n = 3 using values in the range [1, 3]:

[1, 2, 1], [1, 3, 1], [1, 3, 2]
[2, 1, 2], [2, 1, 3], [2, 3, 1], [2, 3, 2]
[3, 1, 2], [3, 1, 3], [3, 2, 3]
All arrays meet the ZigZag conditions.
*/

function zigZagArrays(n: number, l: number, r: number): number {
  const MOD = 1000000007n;
  const d = r - l + 1;

  type Mat = bigint[]; // Representing a flat d x d matrix

  // Custom structure to represent the block-sparse form of the 2d x 2d matrix.
  // type === 1: [ 0   mat1 ]
  //              [ mat2   0  ]
  // type === 2: [ mat1   0  ]
  //              [  0   mat2 ]
  interface GenMat {
    type: 1 | 2;
    mat1: Mat;
    mat2: Mat;
  }

  // Standard d x d matrix multiplication
  function mul(A: Mat, B: Mat, d: number): Mat {
    const C = new Array<bigint>(d * d).fill(0n);
    for (let i = 0; i < d; i++) {
      const i_d = i * d;
      for (let k = 0; k < d; k++) {
        const Aik = A[i_d + k];
        if (Aik === 0n) continue;
        const k_d = k * d;
        for (let j = 0; j < d; j++) {
          C[i_d + j] = (C[i_d + j] + Aik * B[k_d + j]) % MOD;
        }
      }
    }
    return C;
  }

  // Multiply two block-sparse matrices
  function multiplyGen(G1: GenMat, G2: GenMat, d: number): GenMat {
    if (G1.type === 1 && G2.type === 1) {
      return {
        type: 2,
        mat1: mul(G1.mat1, G2.mat2, d),
        mat2: mul(G1.mat2, G2.mat1, d),
      };
    } else if (G1.type === 2 && G2.type === 2) {
      return {
        type: 2,
        mat1: mul(G1.mat1, G2.mat1, d),
        mat2: mul(G1.mat2, G2.mat2, d),
      };
    } else if (G1.type === 1 && G2.type === 2) {
      return {
        type: 1,
        mat1: mul(G1.mat1, G2.mat2, d),
        mat2: mul(G1.mat2, G2.mat1, d),
      };
    } else {
      // G1.type === 2 && G2.type === 1
      return {
        type: 1,
        mat1: mul(G1.mat1, G2.mat1, d),
        mat2: mul(G1.mat2, G2.mat2, d),
      };
    }
  }

  // Binary exponentiation for our custom GenMat representation
  function powerGen(G: GenMat, p: number, d: number): GenMat {
    const I = new Array<bigint>(d * d).fill(0n);
    for (let i = 0; i < d; i++) {
      I[i * d + i] = 1n;
    }
    let res: GenMat = {
      type: 2,
      mat1: I,
      mat2: I,
    };
    let base = G;
    while (p > 0) {
      if (p % 2 === 1) {
        res = multiplyGen(res, base, d);
      }
      base = multiplyGen(base, base, d);
      p = Math.floor(p / 2);
    }
    return res;
  }

  // Matrix-vector multiplication
  function mulMatVec(A: Mat, v: bigint[], d: number): bigint[] {
    const res = new Array<bigint>(d).fill(0n);
    for (let i = 0; i < d; i++) {
      let sum = 0n;
      const i_d = i * d;
      for (let j = 0; j < d; j++) {
        sum = (sum + A[i_d + j] * v[j]) % MOD;
      }
      res[i] = sum;
    }
    return res;
  }

  function multiplyVec(
    G: GenMat,
    v1: bigint[],
    v2: bigint[],
    d: number,
  ): { r1: bigint[]; r2: bigint[] } {
    if (G.type === 1) {
      return {
        r1: mulMatVec(G.mat1, v2, d),
        r2: mulMatVec(G.mat2, v1, d),
      };
    } else {
      return {
        r1: mulMatVec(G.mat1, v1, d),
        r2: mulMatVec(G.mat2, v2, d),
      };
    }
  }

  // Initialize block matrices U and V
  const U = new Array<bigint>(d * d).fill(0n);
  const V = new Array<bigint>(d * d).fill(0n);
  for (let i = 0; i < d; i++) {
    const i_d = i * d;
    for (let j = 0; j < d; j++) {
      if (i < j) {
        U[i_d + j] = 1n;
      }
      if (i > j) {
        V[i_d + j] = 1n;
      }
    }
  }

  const M: GenMat = {
    type: 1,
    mat1: U,
    mat2: V,
  };

  // We want to calculate M^(n-1) * vec
  const resGen = powerGen(M, n - 1, d);

  // Initial state vector at step 1:
  // v1 represents state [0..d-1] (next step must be up)
  // v2 represents state [d..2d-1] (next step must be down)
  const v1 = new Array<bigint>(d).fill(0n);
  const v2 = new Array<bigint>(d).fill(0n);
  for (let i = 0; i < d - 1; i++) {
    v1[i] = 1n; // Starting at i with next step being UP is valid if i < d-1
  }
  for (let i = 1; i < d; i++) {
    v2[i] = 1n; // Starting at i with next step being DOWN is valid if i > 0
  }

  const { r1, r2 } = multiplyVec(resGen, v1, v2, d);

  let total = 0n;
  for (let i = 0; i < d; i++) {
    total = (total + r1[i] + r2[i]) % MOD;
  }

  return Number(total);
}

// Example usage:
console.log(zigZagArrays(3, 4, 5)); // Output: 2
console.log(zigZagArrays(3, 1, 3)); // Output: 10
