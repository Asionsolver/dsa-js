// 401. Binary Watch

/**
Example 1:

Input: turnedOn = 1
Output: ["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]
Example 2:

Input: turnedOn = 9
Output: []
*/
const turnedOn = 1;

const readBinaryWatch = function (turnedOn: number): string[] {
  const result: string[] = [];

  // Loop through all valid hours (0-11)
  for (let h = 0; h < 12; h++) {
    // Loop through all valid minutes (0-59)
    for (let m = 0; m < 60; m++) {
      // Count the number of '1' bits in hour and minute
      // h.toString(2) converts the number to a binary string
      // .split('1').length - 1 counts the occurrences of '1'
      const hBits = h.toString(2).split("1").length - 1;
      const mBits = m.toString(2).split("1").length - 1;

      if (hBits + mBits === turnedOn) {
        // Format the time string
        // Hours do not have leading zeros
        // Minutes must be 2 digits (padded with 0 if necessary)
        const time = `${h}:${m.toString().padStart(2, "0")}`;
        result.push(time);
      }
    }
  }

  return result;
};

console.log(readBinaryWatch(turnedOn));
