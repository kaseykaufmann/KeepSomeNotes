/* global chrome */
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import "./App.css";
import { v4 as uuid } from "uuid";
// import { localMode } from "./constants";
import { ShadowRoot } from "./ShadowRoot";

// const sampleNotesShape = [{ id: uuid, x: 2, y: 2, offsetY: 100, pinned: false, note: "some note text", color: "white", textColor: "black" }];

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
}))`
  color: ${(props) => props.color || "black"};
  height: 200px;
  width: 200px;
  border: none;
  color: ${(props) => props.color || "white"};
  background-color: ${(props) => props.backgroundColor || "gray"};
`;

const Footer = styled.footer`
  width: 200px;
  border: none;
`;

const ColorButton = styled.button.attrs((props) => ({
  backgroundColor: props.color,
}))`
  width: calc(200px / (7 * 2));
  height: calc(200px / (7 * 2));
  margin: 0px calc(200px / (7 * 4));
  padding: 0px;
  border: 0px;
  border-radius: 100%;
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

  // listen for shift + click to add note
  useEffect(() => {
    function clickListener(e) {
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
          },
        ]);
      }
    }

    function scrollListener() {
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
          };
        })
      );
    }
    document.addEventListener("click", clickListener);
    window.addEventListener("scroll", scrollListener);

    return () => {
      document.removeEventListener("click", clickListener);
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

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
                <StyledTextArea
                  onChange={handleChange}
                  value={note.note ? note.note : ""}
                  backgroundColor={note.color || "gray"}
                  color={note.textColor || "black"}
                />
                <Footer>
                  <ColorButton
                    color="#333333"
                    onClick={() => handleColor("#333333", "white")}
                  />
                  <ColorButton
                    color="#EB5757"
                    onClick={() => handleColor("#EB5757", "black")}
                  />
                  <ColorButton
                    color="#F2994A"
                    onClick={() => handleColor("#F2994A", "black")}
                  />
                  <ColorButton
                    color="#F2C94C"
                    onClick={() => handleColor("#F2C94C", "black")}
                  />
                  <ColorButton
                    color="#219653"
                    onClick={() => handleColor("#219653", "black")}
                  />
                  <ColorButton
                    color="#2F80ED"
                    onClick={() => handleColor("#2F80ED", "white")}
                  />
                  <ColorButton
                    color="#9B51E0"
                    onClick={() => handleColor("#9B51E0", "white")}
                  />
                </Footer>
              </Container>
            </Draggable>
          </ShadowRoot>
        );
      })}
    </div>
  );
};

export default Notes;
