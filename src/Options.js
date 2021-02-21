/* global chrome */
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { localMode } from "./constants";

const ListNoMarker = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const UrlP = styled.p`
  background: yellow;
  margin: 0.5em;
  padding: 0.5em;
  overflow: scroll;
`;

const UrlEntry = ({ entry }) => {
  const [open, setOpen] = useState(false);
  const url = entry[0];
  const notes = entry[1];

  return (
    <li onClick={() => setOpen(!open)}>
      <UrlP>
        <b>{url}</b>
      </UrlP>
      {notes && (
        <ul style={{ display: open ? "inherit" : "none" }}>
          {notes.map((note) => (
            <li>{note.note}</li>
          ))}
        </ul>
      )}
    </li>
  );
};

export const Options = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // if (!localMode) {
    chrome.storage.local.get((items) => {
      let tempNotes = [];
      Object.entries(items).map((note) => tempNotes.push(note));
      setNotes(tempNotes);
    });
    // }
  }, []);

  return (
    <div>
      <h3>Hello from sticky notes</h3>
      <p>
        Press{" "}
        <strong>
          <i>Shift</i>
        </strong>
        + click to make a new note
      </p>
      <h4>Your notes: </h4>
      {notes && (
        <ListNoMarker>
          {notes.map((entry) => (
            <UrlEntry entry={entry} />
          ))}
        </ListNoMarker>
      )}
    </div>
  );
};
