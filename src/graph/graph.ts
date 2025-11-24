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

  removeEdge(vertexOne: string, vertexTwo: string) {
    if (!this.adjacencyList.has(vertexOne)) {
      return null;
    }
    if (!this.adjacencyList.has(vertexTwo)) {
      return null;
    }
    const vertexOneEdges = this.adjacencyList.get(vertexOne);
    const filteredOneEdges = vertexOneEdges?.filter((v) => v !== vertexTwo);

    if (filteredOneEdges) {
      this.adjacencyList.set(vertexOne, filteredOneEdges);
    }
    const vertexTwoEdges = this.adjacencyList.get(vertexTwo);
    const filteredTwoEdges = vertexTwoEdges?.filter((v) => v !== vertexOne);

    if (filteredTwoEdges) {
      this.adjacencyList.set(vertexTwo, filteredTwoEdges);
    }
  }

  removeVertex(vertex: string) {
    if (!this.adjacencyList.has(vertex)) {
      return null;
    }
    if (this.adjacencyList.has(vertex)) {
      const edges = this.adjacencyList.get(vertex);
      for (const edge of edges!) {
        this.removeEdge(vertex, edge);
      }
      this.adjacencyList.delete(vertex);
    }
  }
}

let myGraph = new Graph();

myGraph.addEdge("ashis", "ram");
myGraph.addEdge("ashis", "suresh");
myGraph.addEdge("ashis", "shyam");

myGraph.addEdge("ram", "shyam");
myGraph.addEdge("ram", "monoj");

myGraph.addEdge("suresh", "shyam");
myGraph.addEdge("suresh", "monoj");

myGraph.addEdge("ghansyam", "shyam");
myGraph.addEdge("ghansyam", "monoj");

myGraph.removeEdge("suresh", "shyam");
myGraph.removeEdge("ghansyam", "monoj");
console.log("Before Removing Vertex");
myGraph.print();

myGraph.removeVertex("ashis");
console.log("After Removing Vertex");
myGraph.print();
