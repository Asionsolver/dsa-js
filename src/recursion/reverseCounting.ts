type countingReverseFn = (count: number) => void;

const countingReverse: countingReverseFn = (n: number) => {
  // base case
  if (n == 0) {
    return;
  }

  console.log(n);

  // small problem with recursive relation
  countingReverse(n - 1);
};

const reverseCount = 5;

countingReverse(reverseCount);
