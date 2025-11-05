// Print the frequency of each number

let arrNumber = [10, 3, 5, 6, 10, 1, 3, 5, 5, 7];

let freqMap = new Map();

for (const element of arrNumber) {
  if (freqMap.has(element)) {
    freqMap.set(element, freqMap.get(element) + 1);
  } else {
    freqMap.set(element, 1);
  }
}

console.log(freqMap);
