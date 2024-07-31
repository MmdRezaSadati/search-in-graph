import { useEffect, useState } from "react";

function randomPosition() {
  let cxMin = 30;
  let cxMax = 770;
  let cyMin = 30;
  let cyMax = 770;
  return {
    x: Math.random() * (cxMax - cxMin) + cxMin,
    y: Math.random() * (cyMax - cyMin) + cyMin,
  };
}

function makeGraphElements(graph) {
  const nodeIds = Object.keys(graph);
  const nodes = nodeIds.reduce((acc, curr) => {
    const { x, y } = randomPosition();
    return { ...acc, [curr]: { id: curr, cx: x, cy: y } };
  }, {});
  const lines = nodeIds.flatMap((node) => {
    const children = graph[node];
    return children.map((child) => ({ from: node, to: child }));
  });
  return { nodes, lines };
}

export default function Graph({
  graph,
  highlightNode,
  startNode,
  goalNode,
  onNodeClick,
}) {
  const [state, setState] = useState(() => makeGraphElements(graph));
  const { nodes, lines } = state;
  useEffect(() => {
    let nodes = document.querySelectorAll(".node");
    nodes.forEach((node) => {
      let nodeId = node.getAttributeNS(null, "id");
      let selectedElement = false;
      let offset;

      function getMousePosition(evt) {
        let CTM = node.getScreenCTM();
        return {
          x: (evt.clientX - CTM.e) / CTM.a,
          y: (evt.clientY - CTM.f) / CTM.d,
        };
      }

      node.addEventListener("mousedown", (event) => {
        selectedElement = node;
        offset = getMousePosition(event);
        offset.x -= parseFloat(selectedElement.getAttributeNS(null, "cx"));
        offset.y -= parseFloat(selectedElement.getAttributeNS(null, "cy"));
      });

      document
        .getElementById(`text-${nodeId}`)
        .addEventListener("mousedown", (event) => {
          selectedElement = node;
          offset = getMousePosition(event);
          offset.x -= parseFloat(selectedElement.getAttributeNS(null, "cx"));
          offset.y -= parseFloat(selectedElement.getAttributeNS(null, "cy"));
        });
      document.addEventListener("mousemove", (event) => {
        if (selectedElement) {
          event.preventDefault();
          let coord = getMousePosition(event);
          let cx = coord.x - offset.x;
          let cy = coord.y - offset.y;
          setState((state) => ({
            ...state,
            nodes: {
              ...state.nodes,
              [nodeId]: { ...state.nodes[nodeId], cx, cy },
            },
          }));
        }
      });
      document.addEventListener("mouseup", () => {
        selectedElement = null;
      });
    });
  });

  return (
    <svg width="900px" height="900px">
      <g>
        {lines.map((line, index) => (
          <line
            key={index}
            x1={nodes[line.from].cx}
            y1={nodes[line.from].cy}
            x2={nodes[line.to].cx}
            y2={nodes[line.to].cy}
            className="line"
          />
        ))}
      </g>

      <g>
        {Object.keys(nodes).map((key, index) => (
          <circle
            onClick={() => onNodeClick(key)}
            key={index}
            cx={nodes[key].cx}
            cy={nodes[key].cy}
            r="25"
            id={key}
            data-testid={key}
            className={`node ${
              highlightNode === key
                ? "highlight"
                : startNode === key
                ? "start"
                : goalNode === key
                ? "goal"
                : ""
            }`}
          />
        ))}
      </g>

      <g>
        {Object.keys(nodes).map((key, index) => (
          <text
            key={index}
            onClick={() => onNodeClick(key)}
            x={nodes[key].cx}
            y={nodes[key].cy + 5}
            id={`text-${key}`}
            textAnchor="middle"
            className="label">
            {key}
          </text>
        ))}
      </g>
    </svg>
  );
}
