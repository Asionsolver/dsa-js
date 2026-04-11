// 2126. Destroying Asteroids

/**
Example 1:

Input: mass = 10, asteroids = [3,9,19,5,21]
Output: true
Explanation: One way to order the asteroids is [9,19,5,3,21]:
- The planet collides with the asteroid with a mass of 9. New planet mass: 10 + 9 = 19
- The planet collides with the asteroid with a mass of 19. New planet mass: 19 + 19 = 38
- The planet collides with the asteroid with a mass of 5. New planet mass: 38 + 5 = 43
- The planet collides with the asteroid with a mass of 3. New planet mass: 43 + 3 = 46
- The planet collides with the asteroid with a mass of 21. New planet mass: 46 + 21 = 67
All asteroids are destroyed.
Example 2:

Input: mass = 5, asteroids = [4,9,23,4]
Output: false
Explanation: 
The planet cannot ever gain enough mass to destroy the asteroid with a mass of 23.
After the planet destroys the other asteroids, it will have a mass of 5 + 4 + 9 + 4 = 22.
This is less than 23, so a collision would not destroy the last asteroid.
*/

const mass = 10;
const asteroids = [3, 9, 19, 5, 21];

function asteroidsDestroyed(mass: number, asteroids: number[]): boolean {
  // Sort the asteroids in ascending order of their mass
  asteroids.sort((a, b) => a - b);

  let currentMass = mass;

  // Iterate through the sorted asteroids
  for (const asteroid of asteroids) {
    // If the current mass is strictly less than the asteroid, it gets destroyed
    if (currentMass < asteroid) {
      return false;
    }
    // Otherwise, destroy the asteroid and absorb its mass
    currentMass += asteroid;
  }

  // If we made it through all asteroids without returning false, we win
  return true;
}

console.log(asteroidsDestroyed(mass, asteroids));
