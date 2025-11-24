class Graph {
  size: number;
  matrix: number[][];

  constructor(size: number) {
    this.size = size;
    this.matrix = Array.from({ length: size }, () => new Array(size).fill(0));
    // console.log(this.matrix);
  }

  addEdge(i: number, j: number) {
    if (i < this.size && j < this.size) {
      this.matrix[i][j] = 1;
      this.matrix[j][i] = 1;
    }

    // console.log(this.matrix);
  }

  printGraph() {
    // for (let i = 0; i < this.matrix.length; i++) {
    //   for (let j = 0; j < this.matrix.length; j++) {
    //     console.log(i, j, "-->", this.matrix[i][j]);
    //   }
    // }
    console.log("Print");
    for (let i = 0; i < this.matrix.length; i++) {
      console.log(this.matrix[i]);
    }
  }

  removeEdge(i: number, j: number) {
    if (i < this.size && j < this.size) {
      this.matrix[i][j] = 0;
      this.matrix[j][i] = 0;
    }
  }
}

let myMatrixGraph = new Graph(6);
myMatrixGraph.addEdge(0, 1);
myMatrixGraph.addEdge(0, 2);
myMatrixGraph.printGraph();
myMatrixGraph.removeEdge(0, 1);
myMatrixGraph.printGraph();
