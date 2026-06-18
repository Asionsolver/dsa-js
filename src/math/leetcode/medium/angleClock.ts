// 1344. Angle Between Hands of a Clock

/**
Example 1:


Input: hour = 12, minutes = 30
Output: 165
Example 2:


Input: hour = 3, minutes = 30
Output: 75
Example 3:


Input: hour = 3, minutes = 15
Output: 7.5
 
*/

function angleClock(hour: number, minutes: number): number {
  // Minute hand moves 6 degrees per minute
  const minuteAngle = minutes * 6;

  // Hour hand moves 30 degrees per hour, plus 0.5 degrees per minute
  const hourAngle = (hour % 12) * 30 + minutes * 0.5;

  // Absolute difference between the two angles
  const difference = Math.abs(hourAngle - minuteAngle);

  // Return the smaller angle
  return difference > 180 ? 360 - difference : difference;
}

// Test cases
console.log(angleClock(12, 30)); // Output: 165
console.log(angleClock(3, 30)); // Output: 75
console.log(angleClock(3, 15)); // Output: 7.5
