type factorialFn = (n: number) => number;

const factorial: factorialFn = (n) => {
  // base case
  if (n == 1) {
    return 1;
  }
  // small problem ans with recursive relation
  const recursionFac = factorial(n - 1);

  // big problem = n * small problem
  const ans: number = n * recursionFac;

  return ans;
};

const n: number = 5;

const ans: number = factorial(n);
console.log(ans);
