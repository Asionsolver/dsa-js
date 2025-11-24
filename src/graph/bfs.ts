class Graph {
  adjacencyList = new Map<string, string[]>();
  constructor() {
    this.adjacencyList = new Map<string, string[]>();
  }
  addVertex(vertex: string) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
    // console.log(this.adjacencyList);
  }

  addEdge(vertexOne: string, vertexTwo: string) {
    if (!this.adjacencyList.has(vertexOne)) {
      this.addVertex(vertexOne);
    }
    if (!this.adjacencyList.has(vertexTwo)) {
      this.addVertex(vertexTwo);
    }

    const vertexOneEdges = this.adjacencyList.get(vertexOne);
    vertexOneEdges?.push(vertexTwo);
    const vertexTwoEdges = this.adjacencyList.get(vertexTwo);
    vertexTwoEdges?.push(vertexOne);
  }

  print() {
    for (const [vertex, edges] of this.adjacencyList) {
      console.log(`${vertex}: [ ${edges.join(", ")} ]`);
    }
  }

  bfs(startNode: string) {
    if (!this.adjacencyList.has(startNode)) {
      return [];
    }

    const queue = [startNode];
    const visited = new Set();
    const result = [];

    while (queue.length > 0) {
      let currentNode = queue.shift();

      if (!visited.has(currentNode)) {
        visited.add(currentNode);
        result.push(currentNode);

        const allNeighbors = this.adjacencyList.get(currentNode!) || [];

        for (let neighbor of allNeighbors) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }
    return result;
  }
}

let myGraph = new Graph();
myGraph.addEdge("a", "b");
myGraph.addEdge("a", "c");
myGraph.addEdge("b", "d");
myGraph.addEdge("c", "e");
myGraph.addEdge("f", "d");
myGraph.addEdge("f", "e");
myGraph.print();
console.log("BFS: ", myGraph.bfs("a"));
