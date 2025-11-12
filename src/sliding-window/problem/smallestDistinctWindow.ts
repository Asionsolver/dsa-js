// Smallest Distinct Window.
const s = "AABBBCBBAC";
console.log(s);
const findSmallestSubString = function (s: string) {
  const count: number[] = new Array(256).fill(0);
  let first = 0;
  let second = 0;
  let length = s.length;
  let difference = 0;

  // calculate unique character
  while (first < s.length) {
    if (count[s.charCodeAt(first)] === 0) {
      difference++;
    }
    count[s.charCodeAt(first)]++;
    first++;
  }

  for (let i = 0; i < count.length; i++) {
    count[i] = 0;
  }
  first = 0;
  while (second < s.length) {
    // difference exists
    while (difference && second < s.length) {
      if (count[s.charCodeAt(second)] === 0) {
        difference--;
      }
      count[s.charCodeAt(second)]++;
      second++;
    }

    length = Math.min(length, second - first);

    // prevent the difference value from becoming 1
    while (difference !== 1) {
      length = Math.min(length, second - first);
      count[s.charCodeAt(first)]--;

      if (count[s.charCodeAt(first)] === 0) {
        difference++;
      }
      first++;
    }
  }

  return length;
};

console.log(findSmallestSubString(s));
