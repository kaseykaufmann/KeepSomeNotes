import React from "react";
import ReactDOM from "react-dom";
import Notes from "./Notes";
import { Options } from "./Options";

import "./index.css";

const optionsRoot = document.getElementById("options-root");

const insertionPoint = document.createElement("div");
insertionPoint.id = "insertion-point";
document.body.parentNode.insertBefore(insertionPoint, document.body);

!optionsRoot &&
  ReactDOM.render(
    <React.StrictMode>
      <Notes />
    </React.StrictMode>,
    insertionPoint
  );

optionsRoot &&
  ReactDOM.render(
    <React.StrictMode>
      <Options />
    </React.StrictMode>,
    optionsRoot
  );
