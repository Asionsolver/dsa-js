type countingFnOne = (count: number) => void;

const countingOne: countingFnOne = (n: number) => {
  // base case
  if (n == 0) {
    return;
  }

  // small problem with recursive relation
  countingOne(n - 1);

  console.log(n);
};

const n1 = 5;

countingOne(n1);
