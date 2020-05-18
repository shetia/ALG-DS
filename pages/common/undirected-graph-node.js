/**
 * Undirected Graph Node 无向图节点
 */

export default class UndirectedGraphNode {
  constructor(label) {
    this.label = label;
    this.neighbors = []; // Array of UndirectedGraphNode
  }
}
