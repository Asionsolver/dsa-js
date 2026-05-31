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

// function asteroidsDestroyed(mass: number, asteroids: number[]): boolean {
//   // Sort the asteroids in ascending order of their mass
//   asteroids.sort((a, b) => a - b);

//   let currentMass = mass;

//   // Iterate through the sorted asteroids
//   for (const asteroid of asteroids) {
//     // If the current mass is strictly less than the asteroid, it gets destroyed
//     if (currentMass < asteroid) {
//       return false;
//     }
//     // Otherwise, destroy the asteroid and absorb its mass
//     currentMass += asteroid;
//   }

//   // If we made it through all asteroids without returning false, we win
//   return true;
// }

// The above solution is straightforward and works, but it has a time complexity of O(n log n) due to the sorting step. We can optimize it to O(n) by using a counting sort approach, since the mass of asteroids is limited by the maximum asteroid mass.
function asteroidsDestroyed(mass: number, asteroids: number[]): boolean {
  let currentMass = mass;
  let maxAsteroid = 0;

  // 1. First, let's find the largest asteroid.
  for (let i = 0; i < asteroids.length; i++) {
    if (asteroids[i] > maxAsteroid) {
      maxAsteroid = asteroids[i];
    }
  }

  // If our current mass is equal to or greater than the largest asteroid at the start,
  // then it can destroy everything by itself.
  if (currentMass >= maxAsteroid) {
    return true;
  }

  // 2. Count the frequency using TypedArray (it is much faster and saves memory)
  const counts = new Uint32Array(maxAsteroid + 1);
  for (let i = 0; i < asteroids.length; i++) {
    counts[asteroids[i]]++;
  }

  // 3. Increase the mass by checking asteroids from small to large
  for (let i = 1; i <= maxAsteroid; i++) {
    if (counts[i] > 0) {
      // If the big one is small, the planet will be destroyed
      if (currentMass < i) {
        return false;
      }
      // Add the mass (if there are multiple asteroids of the same weight, add them all at once)
      currentMass += counts[i] * i;

      // Optimization: If the mass exceeds the largest asteroid,
      // then no further checks are needed.
      if (currentMass >= maxAsteroid) {
        return true;
      }
    }
  }

  return true;
}

console.log(asteroidsDestroyed(mass, asteroids));
