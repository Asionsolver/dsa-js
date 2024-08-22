let arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Row Sum in 2D Array

for (let i = 0; i < arr.length; i++) {
    let sum = 0;
    for (let j = 0; j < arr[i].length; j++) {
        sum += arr[i][j];
    }
    console.log("Sum of row " + i + " is: " + sum);
}