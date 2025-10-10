type fibonacciFn = (n: number) => number;

const fibonacciSum = (n: number) => {
  if (n == 1 || n == 2) {
    return 1;
  }

  // recursive relation
  const ans: number = fibonacciSum(n - 1) + fibonacciSum(n - 2);
  return ans;
};

const numbers = 6;
console.log(fibonacciSum(numbers));

// index -> 1 2 3 4 5 6 7  8  9  10 11 12
// value -> 1 1 2 3 5 8 13 21 34 55 89 144
