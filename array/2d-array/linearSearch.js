let arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Linear Search in 2D Array
for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] == 5) {
            console.log("Element found at index: " + i + ", " + j);
            break;
        }
    }
}
