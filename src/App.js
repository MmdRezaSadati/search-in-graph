import { useState } from "react";
import Graph from "./Graph";

function App({ graph }) {
  const [points, setPoints] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  function dfs() {
    const startNode = points[0];
    const goalNode = points[1];

    const visited = new Set();
    let stack = [startNode];
    visited.add(startNode);

    let interval = setInterval(() => {
      const currentNode = stack.pop();
      setCurrentNode(currentNode);
      console.log(goalNode);
      if (currentNode === goalNode) {
        console.log(`${goalNode} has been found!`);
        clearInterval(interval);
        return;
      }

      const destinations = graph[currentNode];

      for (const destination of destinations) {
        if (!visited.has(destination)) {
          visited.add(destination);
          stack.push(destination);
        }
      }
    }, 500);
  }

  function bfs() {
    const startNode = points[0];
    const goalNode = points[1];

    const visited = new Set();
    let queue = [startNode];
    visited.add(startNode);

    let interval = setInterval(() => {
      const currentNode = queue.shift();
      setCurrentNode(currentNode);
      if (currentNode === goalNode) {
        console.log(`${goalNode} has been found!`);
        clearInterval(interval);
        return;
      }

      const destinations = graph[currentNode];

      for (const destination of destinations) {
        if (!visited.has(destination)) {
          visited.add(destination);
          queue.push(destination);
        }
      }
    }, 500);
  }
  return (
    <div className="container">
      <Graph
        graph={graph}
        highlightNode={currentNode}
        startNode={points.length > 0 ? points[0] : null}
        goalNode={points.length > 1 ? points[1] : null}
        onNodeClick={(key) => {
          if (points.length > 0 && points.length <= 1) {
            setPoints((prev) => [...prev, key]);
          } else {
            setPoints([key]);
          }
        }}
      />
      <div className="button-group">
        <button
          onClick={() => {
            setPoints([]);
            setCurrentNode(null);
          }}>
          Clear
        </button>
        <button onClick={dfs}>DFS</button>
        <button onClick={bfs}>BFS</button>
      </div>
    </div>
  );
}

export default App;
