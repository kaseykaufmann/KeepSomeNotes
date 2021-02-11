import React from "react";
import Draggable from "react-draggable";

import "./App.css";

function App() {
  return (
    <Draggable grid={[25, 25]} scale={1}>
      <div
        style={{
          backgroundColor: "yellow",
          height: 400,
          width: 400,
          border: "1px solid black",
        }}
      >
        <button style={{ float: "right", margin: 5 }}>X</button>
        <textarea
          style={{
            backgroundColor: "yellow",
            marginTop: "10px",
            margin: "25px",
            width: "350px",
            padding: 0,
            height: "320px",
          }}
        ></textarea>
      </div>
    </Draggable>
  );
}

export default App;
