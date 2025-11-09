// Given an length of stick n. You need to determine maximum number of segment you can make of this stick provided that each segment length x, y, z.
// Cut into segments
const size = 8;
const x = 2,
  y = 2,
  z = 3;

// const size = 7;
// const x = 5,
//   y = 2,
//   z = 1;

const cutIntoSegments = function (
  size: number,
  x: number,
  y: number,
  z: number
) {
  if (size === 0) {
    return 0;
  }

  if (size < 0) {
    return -Infinity;
  }

  let cutOne = cutIntoSegments(size - x, x, y, z) + 1;
  let cutTwo = cutIntoSegments(size - y, x, y, z) + 1;
  let cutThree = cutIntoSegments(size - z, x, y, z) + 1;

  let max = Math.max(cutOne, Math.max(cutTwo, cutThree));

  return max;
};

if (cutIntoSegments(size, x, y, z) > 0) {
  console.log(cutIntoSegments(size, x, y, z));
} else {
  console.log(0);
}
