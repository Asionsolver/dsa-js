// 1665. Minimum Initial Energy to Finish Tasks

/**
Example 1:

Input: tasks = [[1,2],[2,4],[4,8]]
Output: 8
Explanation:
Starting with 8 energy, we finish the tasks in the following order:
    - 3rd task. Now energy = 8 - 4 = 4.
    - 2nd task. Now energy = 4 - 2 = 2.
    - 1st task. Now energy = 2 - 1 = 1.
Notice that even though we have leftover energy, starting with 7 energy does not work because we cannot do the 3rd task.
Example 2:

Input: tasks = [[1,3],[2,4],[10,11],[10,12],[8,9]]
Output: 32
Explanation:
Starting with 32 energy, we finish the tasks in the following order:
    - 1st task. Now energy = 32 - 1 = 31.
    - 2nd task. Now energy = 31 - 2 = 29.
    - 3rd task. Now energy = 29 - 10 = 19.
    - 4th task. Now energy = 19 - 10 = 9.
    - 5th task. Now energy = 9 - 8 = 1.
Example 3:

Input: tasks = [[1,7],[2,8],[3,9],[4,10],[5,11],[6,12]]
Output: 27
Explanation:
Starting with 27 energy, we finish the tasks in the following order:
    - 5th task. Now energy = 27 - 5 = 22.
    - 2nd task. Now energy = 22 - 2 = 20.
    - 3rd task. Now energy = 20 - 3 = 17.
    - 1st task. Now energy = 17 - 1 = 16.
    - 4th task. Now energy = 16 - 4 = 12.
    - 6th task. Now energy = 12 - 6 = 6.
 
*/

function minimumEffort(tasks: number[][]): number {
  // Sort tasks in descending order of (minimum - actual)
  tasks.sort((a, b) => b[1] - b[0] - (a[1] - a[0]));

  let maxEnergy = 0;
  let sumActual = 0;

  // Calculate the required minimum initial energy
  for (let i = 0; i < tasks.length; i++) {
    const actual = tasks[i][0];
    const minimum = tasks[i][1];

    // Update the maxEnergy if the current task's threshold demands a higher initial start
    if (minimum + sumActual > maxEnergy) {
      maxEnergy = minimum + sumActual;
    }

    // Increase the consumed energy pool
    sumActual += actual;
  }

  return maxEnergy;
}

// Example usage:
console.log(
  minimumEffort([
    [1, 2],
    [2, 4],
    [4, 8],
  ]),
); // Output: 8
console.log(
  minimumEffort([
    [1, 3],
    [2, 4],
    [10, 11],
    [10, 12],
    [8, 9],
  ]),
); // Output: 32
console.log(
  minimumEffort([
    [1, 7],
    [2, 8],
    [3, 9],
    [4, 10],
    [5, 11],
    [6, 12],
  ]),
); // Output: 27
