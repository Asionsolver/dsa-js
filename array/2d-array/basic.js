// JS 2d Array
// 2D Array is an array of arrays. In 2D array, the position of an data is referred by two indices. The first index represents the row number and the second index represents the column number.




// Creating 2D Array
let arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Accessing 2D Array
// To access an element in a 2D array, we use the row index and column index.
// ! Syntax: arr[row][column]

// ! Formula = c * i + j
// Formula = c * i + j
// i = row index
// j = column index
// c = number of columns

// Example: arr[0][0] = 1
//          3 * 0 + 0 = 0 + 0 = 0

// Example: arr[1][1] = 5
//          3 * 1 + 1 = 4 + 1 = 5      

// Example: arr[2][1] = 8
//         3 * 2 + 1 = 6 + 2 = 8

// console.log(arr[0][0]); // 1
// console.log(arr[1][1]); // 5
// console.log(arr[2][1]); // 9

console.log("row-wise traversal")
// outer loop for row
for (let i = 0; i < arr.length; i++) {
    // inner loop for column. For every row, we need to print values of all columns.
    for (let j = 0; j < arr[i].length; j++) {
        console.log(arr[i][j]);
    }
    // new  line after every row
    console.log("\n");


}

console.log("column-wise traversal")
// outer loop for column
for (let i = 0; i < arr[0].length; i++) {
    // inner loop for row. For every column, we need to print values of all rows.
    for (let j = 0; j < arr.length; j++) {
        console.log(arr[j][i]);
    }
    // new line after every column
    console.log("\n");
}
