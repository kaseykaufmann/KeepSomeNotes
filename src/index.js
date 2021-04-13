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
    <>
      <Notes />
    </>,
    insertionPoint
  );

optionsRoot &&
  ReactDOM.render(
    <>
      <Options />
    </>,
    optionsRoot
  );
