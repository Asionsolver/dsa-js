// print the unique element
let arrOne = [10, 45, 18, 9, 9, 10, 45, 10, 10];
let uniqueElement = new Set();

for (const element of arrOne) {
  if (uniqueElement.has(element)) {
    uniqueElement.delete(element);
  } else {
    uniqueElement.add(element);
  }
}
console.log("Unique element: ", uniqueElement);
