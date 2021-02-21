/* global chrome */
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import "./App.css";
import { v4 as uuid } from "uuid";
import { localMode } from "./constants";
import { ShadowRoot } from "./ShadowRoot";

// const sampleNotesShape = [{ id: uuid, x: 2, y: 2, pinned: false, note: "some note text" }];

const Container = styled.div`
  z-index: 99;
  border: 1px solid grey;
  position: absolute;
  background: white;
`;

const Header = styled.div`
  height: 20px;
  background-color: papayawhip;
`;

const StyledButton = styled.button`
  height: 20px;
  border: none;
  opacity: 0.5;
  float: right;
`;

const StyledTextArea = styled.textarea`
  color: dark grey;
  height: 200px;
  width: 200px;
  border: none;
  background-color: hsla(0, 0%, 100%, 0.2);
`;

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const url = window.location.href;

  // listen for shift + click to add note
  useEffect(() => {
    function clickListener(e) {
      if (e.shiftKey) {
        setNotes((prevNotes) => [
          ...prevNotes,
          { id: uuid(), x: e.pageX, y: e.pageY, pinned: false },
        ]);
      }
    }
    document.addEventListener("click", clickListener);
    return () => document.removeEventListener("click", clickListener);
  }, []);

  // get notes if they're there
  useEffect(() => {
    // if (!localMode) {
    chrome.storage.local.get(url, (items) => {
      items[url] && setNotes(items[url]);
    });
    // }
  }, []);

  // set()
  useEffect(() => {
    // if (!localMode) {
    notes.length > 0
      ? chrome.storage.local.set({ [url]: notes })
      : chrome.storage.local.remove(url);
    // }
  }, [notes]);

  // console.log(
  //   window.screen.height / 2,
  //   window.screen.width / 2,
  //   window.screenX,
  //   window.screenY
  // );

  return (
    <div>
      {notes.map((note) => {
        const handleChange = (e) => {
          const editedText = e.target.value;
          setNotes((prevNotes) =>
            prevNotes.reduce(
              (acc, cv) =>
                cv.id === note.id
                  ? acc.push({ ...cv, note: editedText }) && acc
                  : acc.push(cv) && acc,
              []
            )
          );
        };
        const handleDelete = () => {
          setNotes(notes.filter((notes) => notes.id !== note.id));
        };
        const handlePin = () => {
          setNotes((prevNotes) =>
            prevNotes.reduce(
              (acc, cv) =>
                cv.id === note.id
                  ? acc.push({ ...cv, pinned: !note.pinned }) && acc
                  : acc.push(cv) && acc,
              []
            )
          );
        };
        const onChangeLocation = (e, data) => {
          setNotes((prevNotes) =>
            prevNotes.reduce(
              (acc, cv) =>
                cv.id === note.id
                  ? acc.push({ ...cv, x: data.x, y: data.y }) && acc
                  : acc.push(cv) && acc,
              []
            )
          );
        };

        return (
          <ShadowRoot>
            <Draggable
              className="react-sticky-note"
              onStop={onChangeLocation}
              defaultPosition={{ x: note.x, y: note.y }}
              axis={note.pinned ? "none" : "both"}
              disabled={note.pinned}
              scale={1}
            >
              <Container>
                <Header>
                  <StyledButton onClick={handleDelete}>X</StyledButton>
                  <StyledButton onClick={handlePin}>
                    {note.pinned ? "Pinned" : "Not Pinned"}
                  </StyledButton>
                </Header>
                <StyledTextArea
                  onChange={handleChange}
                  value={note.note ? note.note : ""}
                />
              </Container>
            </Draggable>
          </ShadowRoot>
        );
      })}
    </div>
  );
};

export default Notes;
