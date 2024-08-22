let arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Min and Max in 2D Array
let min = arr[0][0];

let max = arr[0][0];

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] < min) {
            min = arr[i][j];
        }
        if (arr[i][j] > max) {
            max = arr[i][j];
        }
    }
}

console.log("Minimum element in 2D array is: " + min);
console.log("Maximum element in 2D array is: " + max);