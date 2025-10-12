// climb stair

const stair = 5;

const totalStairs = (n: number): number => {
  // base case
  if (n == 0 || n == 1) {
    return 1;
  }

  // recursive relation
  const result = totalStairs(n - 1) + totalStairs(n - 2);

  return result;
};

console.log(totalStairs(stair));
