import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const g1 = {
  A: ["B", "C"],
  I: ["D", "F"],
  G: ["C"],
  C: ["A", "G", "H", "K"],
  B: ["A", "D"],
  D: ["B", "I", "F", "L"],
  L: ["D"],
  H: ["C"],
  K: ["C"],
  J: [],
  F: ["D", "I"],
};

const g2 = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "F"],
  D: ["B", "F"],
  F: ["C", "D"],
};

const g3 = {
  A: ["B", "C"],
  B: ["A"],
  C: ["A"],
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App graph={g1} />);
