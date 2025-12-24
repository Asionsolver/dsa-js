// 3074. Apple Redistribution into Boxes

/**
Example 1:

Input: apple = [1,3,2], capacity = [4,3,1,5,2]
Output: 2
Explanation: We will use boxes with capacities 4 and 5.
It is possible to distribute the apples as the total capacity is greater than or equal to the total number of apples.
Example 2:

Input: apple = [5,5,5], capacity = [2,4,2,7]
Output: 4
Explanation: We will need to use all the boxes.
*/
const apple = [1, 3, 2],
  capacity = [4, 3, 1, 5, 2];

const minimumBoxes = function (apple: number[], capacity: number[]) {
  // 1. Calculate the total number of apples
  const totalApples = apple.reduce((sum, count) => sum + count, 0);

  // 2. Sort capacity in descending order to use largest boxes first
  capacity.sort((a, b) => b - a);

  let currentCapacity = 0;
  let boxCount = 0;

  // 3. Iterate through boxes until we have enough space
  for (let i = 0; i < capacity.length; i++) {
    currentCapacity += capacity[i];
    boxCount++;

    if (currentCapacity >= totalApples) {
      return boxCount;
    }
  }

  return boxCount;
};
console.log(minimumBoxes(apple, capacity));
