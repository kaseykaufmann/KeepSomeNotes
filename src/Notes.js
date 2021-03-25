/* global chrome */
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import styled, { keyframes } from "styled-components";
import "./App.css";
import { v4 as uuid } from "uuid";
import { ShadowRoot } from "./ShadowRoot";

/**
 * const sampleNotesShape = [{
 *    id: uuid,
 *    x: 2,
 *    y: 2,
 *    offsetY: 100,
 *    pinned: true | false,
 *    note: "some note text",
 *    color: "white",
 *    textColor: "black",
 *    size: 200
 * }];
 */

const Container = styled.div`
  z-index: 99;
  position: absolute;
  border: none;
`;

const Header = styled.div`
  height: 20px;
  border: none;
  opacity: 0.5;
`;

const StyledButton = styled.button`
  height: 20px;
  border: none;
  float: right;
`;

const StyledTextArea = styled.textarea.attrs((props) => ({
  color: props.color || "white",
  backgroundColor: props.backgroundColor || "gray",
  size: props.size,
}))`
  color: ${(props) => props.color || "black"};
  height: ${(props) => props.size || "200px"};
  width: ${(props) => props.size || "200px"};
  border: none;
  color: ${(props) => props.color || "white"};
  background-color: ${(props) => props.backgroundColor || "gray"};
`;

const ColorButtonGroup = styled.div`
  position: absolute;
  right: -60px;
  top: 20px;
  width: 60px;
  height: 90%;
  margin: 0px;
  padding: 0px;
`;

const SizeButtonGroup = styled.div`
  position: absolute;
  left: -20px;
  top: 20px;
  height: 90%;
  margin: 0px;
  padding: 0px;
`;

const ColorListItems = styled.div.attrs((props) => ({
  backgroundColor: props.color,
}))``;

const show = keyframes`
  from {
    width: 20px;
  }
  to {
    width: 100%;
  }
`;

const SizeButton = styled.button`
  width: 20px;
  padding: 0px;
  &:focus {
    outline: none;
  }
`;

const ColorButton = styled.button.attrs((props) => ({
  backgroundColor: props.color,
}))`
  width: 14px;
  height: 18px;
  padding: 0px;
  border: 3px solid ${(props) => props.backgroundColor || "gray"};
  &:hover {
    animation: ${show} 1s ease-out forwards;
  }
  &:focus {
    outline: none;
  }
  background-color: ${(props) => props.backgroundColor || "gray"};
`;

/**
 * Gray 1: #333333; textColor: white;
 * Gray 2: #4F4F4F; textColor: white;
 * Gray 3: #828282; textColor: white;
 * Gray 4: #BDBDBD; textColor: black;
 * Gray 5: #E0E0E0; textColor: black;
 * Gray 6: #F2F2F2; textColor: black;
 *
 * Red: #EB5757; textColor: black;
 * Orange: #F2994A; textColor: black;
 * Yellow: #F2C94C; textColor: black;
 *
 * Green 1: #219653; textColor: black;
 * Green 2: #27AE60; textColor: black;
 * Green 3: #6FCF97; textColor: black;
 *
 * Blue 1: #2F80ED; textColor: white;
 * Blue 2: #2D9CDB; textColor: white;
 * Blue 3: #56CCF2; textColor: black;
 *
 * Purple 1: #9B51E0; textColor: white;
 * Purple 2: #BB6BD9; textColor: black;
 */

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const url = window.location.href;

  useEffect(() => {
    // listen for shift + click to add note
    const clickListener = (e) => {
      if (e.shiftKey) {
        setNotes((prevNotes) => [
          ...prevNotes,
          {
            id: uuid(),
            x: e.pageX,
            y: e.pageY,
            offsetY: e.pageY - window.scrollY,
            pinned: false,
            textColor: "white",
            color: "#333333",
            size: 200,
          },
        ]);
      }
    };

    // moves notes onscroll
    const scrollListener = () => {
      setNotes((prevNotes) =>
        prevNotes.map((note) => {
          return {
            id: note.id,
            x: note.x,
            y: note.pinned ? note.y : window.scrollY + note.offsetY,
            offsetY: note.offsetY,
            note: note.note,
            pinned: note.pinned,
            textColor: note.textColor,
            color: note.color,
            size: note.size,
          };
        })
      );
    };
    document.addEventListener("click", clickListener);
    window.addEventListener("scroll", scrollListener);

    return () => {
      document.removeEventListener("click", clickListener);
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  // creates note/deletes all notes from popup
  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (msg, sender, res) {
      if (msg.from === "popup" && msg.subject === "newNote") {
        setNotes((prevNotes) => [
          ...prevNotes,
          {
            id: uuid(),
            x: 100,
            y: window.scrollY + 100,
            offsetY: 100,
            pinned: false,
            textColor: "white",
            color: "#333333",
            size: 200,
          },
        ]);
        res({ msg: "Note successfully created!" });
      }

      if (msg.from === "popup" && msg.subject === "deleteAllNotes") {
        setNotes([]);
        res({ msg: "All Notes Deleted!" });
      }
    });
  }, []);

  // get notes if they're there
  useEffect(() => {
    chrome.storage.sync.get(["notes"], (items) => {
      let tempNotes = [];
      console.log(items);
      Object.entries(items.notes).map((note) => tempNotes.push(note));
      setNotes(tempNotes);
    });
  }, []);
  console.log(notes);

  // set()
  useEffect(() => {
    console.log(notes);
    if (notes.length > 0) {
      chrome.storage.sync.set(
        {
          allNotes: notes.map((note) => {
            console.log(note);
            if (note.url === url) {
              return {
                [url]: notes,
              };
            } else {
              return note;
            }
          }),
        },
        (items) => {
          console.log(items);
        }
      );
    } else {
      chrome.storage.sync.remove(url);
    }
  }, [notes]);

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
                  ? acc.push({
                      ...cv,
                      x: data.x,
                      y: data.y,
                      offsetY: data.y - window.scrollY,
                    }) && acc
                  : acc.push(cv) && acc,
              []
            )
          );
        };
        const handleColor = (backgroundColor, color) => {
          setNotes((prevNotes) =>
            prevNotes.reduce(
              (acc, cv) =>
                cv.id === note.id
                  ? acc.push({
                      ...cv,
                      textColor: color,
                      color: backgroundColor,
                    }) && acc
                  : acc.push(cv) && acc,
              []
            )
          );
        };
        const handleSize = (size) => {
          setNotes((prevNotes) =>
            prevNotes.reduce(
              (acc, cv) =>
                cv.id === note.id &&
                ((size === "decrement" && note.size > 200) ||
                  (size === "increment" && note.size < 700))
                  ? acc.push({
                      ...cv,
                      size:
                        size === "increment"
                          ? note.size + 100
                          : note.size - 100,
                    }) && acc
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
              position={{ x: note.x, y: note.y }}
              scale={1}
            >
              <Container id={`${note.id}`}>
                <Header>
                  <StyledButton onClick={handleDelete}>X</StyledButton>
                  <StyledButton onClick={handlePin}>
                    {note.pinned ? "Pinned" : "Not Pinned"}
                  </StyledButton>
                </Header>
                <SizeButtonGroup>
                  <div>
                    <SizeButton onClick={() => handleSize("decrement")}>
                      -
                    </SizeButton>
                  </div>
                  <div>
                    <SizeButton onClick={() => handleSize("increment")}>
                      +
                    </SizeButton>
                  </div>
                </SizeButtonGroup>
                <StyledTextArea
                  onChange={handleChange}
                  value={note.note ? note.note : ""}
                  backgroundColor={note.color || "gray"}
                  color={note.textColor || "black"}
                  size={note.size + "px" || "200px"}
                />
                {/* color buttons */}
                <ColorButtonGroup>
                  <ColorListItems color="#333333">
                    <ColorButton
                      color="#333333"
                      onClick={() => handleColor("#333333", "white")}
                    />
                  </ColorListItems>
                  <ColorListItems color="#EB5757">
                    <ColorButton
                      color="#EB5757"
                      onClick={() => handleColor("#EB5757", "black")}
                    />
                  </ColorListItems>
                  <ColorListItems color="#F2994A">
                    <ColorButton
                      color="#F2994A"
                      onClick={() => handleColor("#F2994A", "black")}
                    />
                  </ColorListItems>
                  <ColorListItems color="#F2C94C">
                    <ColorButton
                      color="#F2C94C"
                      onClick={() => handleColor("#F2C94C", "black")}
                    />
                  </ColorListItems>
                  <ColorListItems color="#219653">
                    <ColorButton
                      color="#219653"
                      onClick={() => handleColor("#219653", "black")}
                    />
                  </ColorListItems>
                  <ColorListItems color="#2F80ED">
                    <ColorButton
                      color="#2F80ED"
                      onClick={() => handleColor("#2F80ED", "white")}
                    />
                  </ColorListItems>
                  <ColorListItems color="#9B51E0">
                    <ColorButton
                      color="#9B51E0"
                      onClick={() => handleColor("#9B51E0", "white")}
                    />
                  </ColorListItems>
                </ColorButtonGroup>
              </Container>
            </Draggable>
          </ShadowRoot>
        );
      })}
    </div>
  );
};

export default Notes;
