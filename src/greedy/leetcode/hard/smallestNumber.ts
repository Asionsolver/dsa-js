// 3348. Smallest Divisible Digit Product II

/**
Example 1:

Input: num = "1234", t = 256

Output: "1488"

Explanation:

The smallest zero-free number that is greater than 1234 and has the product of its digits divisible by 256 is 1488, with the product of its digits equal to 256.

Example 2:

Input: num = "12355", t = 50

Output: "12355"

Explanation:

12355 is already zero-free and has the product of its digits divisible by 50, with the product of its digits equal to 150.

Example 3:

Input: num = "11111", t = 26

Output: "-1"

Explanation:

No number greater than 11111 has the product of its digits divisible by 26.

 

Constraints:

2 <= num.length <= 2 * 105
num consists only of digits in the range ['0', '9'].
num does not contain leading zeros.
1 <= t <= 1014
*/

const kFactorCounts: { [digit: number]: { [prime: number]: number } } = {
  0: {},
  1: {},
  2: { 2: 1 },
  3: { 3: 1 },
  4: { 2: 2 },
  5: { 5: 1 },
  6: { 2: 1, 3: 1 },
  7: { 7: 1 },
  8: { 2: 3 },
  9: { 3: 2 },
};

// Factor t into prime counts of 2, 3, 5, 7
function getPrimeCount(t: bigint): [{ [prime: number]: number }, boolean] {
  const count: { [prime: number]: number } = { 2: 0, 3: 0, 5: 0, 7: 0 };
  const primes = [2n, 3n, 5n, 7n];
  for (const prime of primes) {
    const primeNum = Number(prime);
    while (t % prime === 0n) {
      t /= prime;
      count[primeNum]++;
    }
  }
  return [count, t === 1n];
}

// Get prime counts of a given string representation of a number
function getPrimeCountFromString(num: string): { [prime: number]: number } {
  const count: { [prime: number]: number } = { 2: 0, 3: 0, 5: 0, 7: 0 };
  for (let i = 0; i < num.length; i++) {
    const d = num.charCodeAt(i) - 48; // Faster alternative to parseInt
    const factors = kFactorCounts[d];
    if (factors) {
      for (const primeStr in factors) {
        const prime = Number(primeStr);
        count[prime] += factors[prime];
      }
    }
  }
  return count;
}

// Greedily compress the counts of 2, 3, 5, 7 into digits to minimize length
function getFactorCount(count: { [prime: number]: number }): {
  [digit: number]: number;
} {
  const res: { [digit: number]: number } = {};
  const count8 = Math.floor((count[2] || 0) / 3);
  const remaining2 = (count[2] || 0) % 3;
  const count9 = Math.floor((count[3] || 0) / 2);
  let count3 = (count[3] || 0) % 2;
  let count4 = Math.floor(remaining2 / 2);
  let count2 = remaining2 % 2;
  let count6 = 0;

  // Combine 2 and 3 into 6 if both are present
  if (count2 === 1 && count3 === 1) {
    count2 = 0;
    count3 = 0;
    count6 = 1;
  }
  // Combine 3 and 4 to 2 and 6 if both are present ({2, 6} is smaller than {3, 4})
  if (count3 === 1 && count4 === 1) {
    count2 = 1;
    count6 = 1;
    count3 = 0;
    count4 = 0;
  }

  res[2] = count2;
  res[3] = count3;
  res[4] = count4;
  res[5] = count[5] || 0;
  res[6] = count6;
  res[7] = count[7] || 0;
  res[8] = count8;
  res[9] = count9;
  return res;
}

function sumValues(count: { [key: number]: number }): number {
  let sum = 0;
  for (const key in count) {
    sum += count[key];
  }
  return sum;
}

function isSubset(
  a: { [prime: number]: number },
  b: { [prime: number]: number },
): boolean {
  for (const keyStr in a) {
    const key = Number(keyStr);
    if ((b[key] || 0) < (a[key] || 0)) {
      return false;
    }
  }
  return true;
}

function subtract(
  a: { [prime: number]: number },
  b: { [prime: number]: number },
): { [prime: number]: number } {
  const res: { [prime: number]: number } = {};
  for (const keyStr in a) {
    const key = Number(keyStr);
    res[key] = Math.max(0, (a[key] || 0) - (b[key] || 0));
  }
  return res;
}

// Convert digit factor map into sorted string representation
function construct(factors: { [digit: number]: number }): string {
  let res = "";
  for (let digit = 2; digit < 10; digit++) {
    const count = factors[digit] || 0;
    if (count > 0) {
      res += String(digit).repeat(count);
    }
  }
  return res;
}

function smallestNumber(num: string, t: number): string {
  const tBig = BigInt(t);
  const [primeCount, isDivisible] = getPrimeCount(tBig);
  if (!isDivisible) {
    return "-1";
  }

  const factorCount = getFactorCount(primeCount);
  // If t requires more digits than num's length, the smallest number will be constructed directly
  if (sumValues(factorCount) > num.length) {
    return construct(factorCount);
  }

  let primeCountPrefix = getPrimeCountFromString(num);
  let firstZeroIndex = num.indexOf("0");
  if (firstZeroIndex === -1) {
    firstZeroIndex = num.length;
    if (isSubset(primeCount, primeCountPrefix)) {
      return num;
    }
  }

  // Try to replace digits backwards
  for (let i = num.length - 1; i >= 0; i--) {
    const d = num.charCodeAt(i) - 48;
    primeCountPrefix = subtract(primeCountPrefix, kFactorCounts[d]);
    const spaceAfterThisDigit = num.length - 1 - i;
    if (i > firstZeroIndex) {
      continue;
    }
    for (let biggerDigit = d + 1; biggerDigit < 10; biggerDigit++) {
      const factorsAfterReplacement = getFactorCount(
        subtract(
          subtract(primeCount, primeCountPrefix),
          kFactorCounts[biggerDigit],
        ),
      );
      if (sumValues(factorsAfterReplacement) <= spaceAfterThisDigit) {
        const fillOnes =
          spaceAfterThisDigit - sumValues(factorsAfterReplacement);
        return (
          num.substring(0, i) +
          String(biggerDigit) +
          "1".repeat(fillOnes) +
          construct(factorsAfterReplacement)
        );
      }
    }
  }

  // If no same-length combination is found, extend the length by 1
  const factorsAfterExtension = getFactorCount(primeCount);
  const onesCount = num.length + 1 - sumValues(factorsAfterExtension);
  return "1".repeat(onesCount) + construct(factorsAfterExtension);
}

// Example usage
console.log(smallestNumber("1234", 256)); // Output: "1488"
console.log(smallestNumber("12355", 50)); // Output: "12355"
console.log(smallestNumber("11111", 26)); // Output: "-1"
