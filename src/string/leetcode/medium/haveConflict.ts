// 2446. Determine if Two Events Have Conflict

/**
Example 1:

Input: event1 = ["01:15","02:00"], event2 = ["02:00","03:00"]
Output: true
Explanation: The two events intersect at time 2:00.
Example 2:

Input: event1 = ["01:00","02:00"], event2 = ["01:20","03:00"]
Output: true
Explanation: The two events intersect starting from 01:20 to 02:00.
Example 3:

Input: event1 = ["10:00","11:00"], event2 = ["14:00","15:00"]
Output: false
Explanation: The two events do not intersect.
*/

const event1 = ["01:15", "02:00"];
const event2 = ["02:00", "03:00"];
const haveConflict = function (event1: string[], event2: string[]): boolean {
  const [startTime1, endTime1] = event1;
  const [startTime2, endTime2] = event2;

  return startTime1 <= endTime2 && startTime2 <= endTime1;
};

console.log(haveConflict(event1, event2));
