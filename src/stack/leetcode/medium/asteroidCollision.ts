// 735. Asteroid Collision

/**
Example 1:

Input: asteroids = [5,10,-5]
Output: [5,10]
Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
Example 2:

Input: asteroids = [8,-8]
Output: []
Explanation: The 8 and -8 collide exploding each other.
Example 3:

Input: asteroids = [10,2,-5]
Output: [10]
Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.
Example 4:

Input: asteroids = [3,5,-6,2,-1,4]​​​​​​​
Output: [-6,2,4]
Explanation: The asteroid -6 makes the asteroid 3 and 5 explode, and then continues going left. On the other side, the asteroid 2 makes the asteroid -1 explode and then continues going right, without reaching asteroid 4.
*/
const asteroids = [5, 10, -5];
const asteroidCollision = function (asteroids: number[]): number[] {
  const stack: number[] = [];

  for (let asteroid of asteroids) {
    let isAsteroidAlive = true;

    // A collision can only occur if the current asteroid is moving LEFT (< 0)
    // and the top of the stack is moving RIGHT (> 0).
    while (
      isAsteroidAlive &&
      asteroid < 0 &&
      stack.length > 0 &&
      stack[stack.length - 1] > 0
    ) {
      const top = stack[stack.length - 1];

      // Calculate size difference: |current| vs |top|
      // Since top is positive and asteroid is negative:
      if (Math.abs(asteroid) > top) {
        // Current asteroid is larger; the one on stack explodes.
        stack.pop();
        // Current asteroid stays alive and checks the next one in stack.
      } else if (Math.abs(asteroid) === top) {
        // Both are same size; both explode.
        stack.pop();
        isAsteroidAlive = false;
      } else {
        // Current asteroid is smaller; it explodes.
        isAsteroidAlive = false;
      }
    }

    // If the asteroid survived all collisions (or didn't collide), add to stack.
    if (isAsteroidAlive) {
      stack.push(asteroid);
    }
  }

  return stack;
};

console.log(asteroidCollision(asteroids));
