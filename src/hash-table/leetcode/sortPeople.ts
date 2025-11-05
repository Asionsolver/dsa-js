// 2418. Sort the People
const names = ["Mary", "John", "Emma"];
const heights = [180, 165, 170];

const sortPeople = function (names: string[], heights: number[]) {
  const infoMap = new Map();

  for (let index = 0; index < names.length; index++) {
    const name = names[index];
    const height = heights[index];
    infoMap.set(height, name);
  }
  heights.sort((a, b) => b - a);
  for (let index = 0; index < heights.length; index++) {
    names[index] = infoMap.get(heights[index]);
  }
  return names;
};

console.log(sortPeople(names, heights));
