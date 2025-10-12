type countingFn = (start: number, end: number) => void;

// counting with extra argument
const counting: countingFn = (start, end) => {
  // base case
  if (start > end) {
    return;
  }
  console.log(start);

  // small problem with recursive relation
  counting(start + 1, end);
};
const start: number = 1;
const end: number = 5;
counting(start, end);
