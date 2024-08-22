let arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(arr.flat().join(' '));

// Transpose of a Matrix

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
        let temp = arr[i][j];
        arr[i][j] = arr[j][i];
        arr[j][i] = temp;
    }
}

console.log("Transpose of a Matrix: ");
// Print each row of the matrix on the same line
for (let i = 0; i < arr.length; i++) {
        console.log(arr[i].join(" "));
}



