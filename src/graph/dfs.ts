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

  dfs(node: string, visited = new Set(), result: string[] = []) {
    if (!this.adjacencyList.has(node)) {
      return [];
    }

    visited.add(node);
    result.push(node);

    const allNeighbors = this.adjacencyList.get(node!) || [];

    for (let neighbor of allNeighbors) {
      if (!visited.has(neighbor)) {
        this.dfs(neighbor, visited, result);
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
console.log("DFS: ", myGraph.dfs("a"));
