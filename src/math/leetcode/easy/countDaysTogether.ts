// 2409. Count Days Spent Together

/**
Alice and Bob are traveling to Rome for separate business meetings.

You are given 4 strings arriveAlice, leaveAlice, arriveBob, and leaveBob. Alice will be in the city from the dates arriveAlice to leaveAlice (inclusive), while Bob will be in the city from the dates arriveBob to leaveBob (inclusive). Each will be a 5-character string in the format "MM-DD", corresponding to the month and day of the date.

Return the total number of days that Alice and Bob are in Rome together.

You can assume that all dates occur in the same calendar year, which is not a leap year. Note that the number of days per month can be represented as: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31].


*/

/**
Example 1:

Input: arriveAlice = "08-15", leaveAlice = "08-18", arriveBob = "08-16", leaveBob = "08-19"
Output: 3
Explanation: Alice will be in Rome from August 15 to August 18. Bob will be in Rome from August 16 to August 19. They are both in Rome together on August 16th, 17th, and 18th, so the answer is 3.
Example 2:

Input: arriveAlice = "10-01", leaveAlice = "10-31", arriveBob = "11-01", leaveBob = "12-31"
Output: 0
Explanation: There is no day when Alice and Bob are in Rome together, so we return 0.

*/

/**
Constraints:

All dates are provided in the format "MM-DD".
Alice and Bob's arrival dates are earlier than or equal to their leaving dates.
The given dates are valid dates of a non-leap year.
*/

// Brute Force Approach
function countDaysTogether(
  arriveAlice: string,
  leaveAlice: string,
  arriveBob: string,
  leaveBob: string,
): number {
  const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Helper function to convert "MM-DD" into day of the year (1 - 365).
  function dateToDayOfYear(dateStr: string): number {
    const month = parseInt(dateStr.substring(0, 2), 10);
    const day = parseInt(dateStr.substring(3, 5), 10);

    let totalDays = 0;
    // Sum days of all preceding months.
    for (let m = 0; m < month - 1; m++) {
      totalDays += daysInMonths[m];
    }
    return totalDays + day;
  }

  const aliceStart = dateToDayOfYear(arriveAlice);
  const aliceEnd = dateToDayOfYear(leaveAlice);
  const bobStart = dateToDayOfYear(arriveBob);
  const bobEnd = dateToDayOfYear(leaveBob);

  // Store all days Alice was present.
  const aliceDays = new Set<number>();
  for (let day = aliceStart; day <= aliceEnd; day++) {
    aliceDays.add(day);
  }

  let sharedDays = 0;
  // Check which of Bob's days overlap with Alice's.
  for (let day = bobStart; day <= bobEnd; day++) {
    if (aliceDays.has(day)) {
      sharedDays++;
    }
  }

  return sharedDays;
}

// Example usage:
console.log(countDaysTogether("08-15", "08-18", "08-16", "08-19")); // Output: 3
console.log(countDaysTogether("10-01", "10-31", "11-01", "12-31")); // Output: 0
