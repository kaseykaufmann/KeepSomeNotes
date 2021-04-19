/* global chrome */
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { v4 as uuid } from "uuid";
// import { localMode } from "./constants";
import { ShadowRoot } from "./ShadowRoot";
import {
  Container,
  Header,
  RichTextGroup,
  StyledButton,
  RichTextButton,
  StyledTextArea,
  LockOpenIcon,
  LockIcon,
  ListUlIcon,
  ColorButtonGroup,
  SizeButtonGroup,
  ColorListItems,
  SizeButton,
  ColorButton,
} from "./StyledComponents/note";

import "./App.css";

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
 *
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

  useEffect(() => {
    // creates note/deletes all notes from popup
    // if (!localMode)
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

      if (msg.from === "popup" && msg.subject === "screenshot") {
        chrome.storage.local.get("screenshots", (data) => {
          let screenshots = data["screenshots"];

          if (
            screenshots &&
            !screenshots.find((item) => Object.entries(item)[0][0] === url)
          ) {
            screenshots.push({
              [url]: [{ id: uuid(), href: msg.href }],
            });
            chrome.storage.local.set({ screenshots: screenshots });
            return;
          }

          chrome.storage.local.set({
            screenshots: [
              screenshots
                ? screenshots.find((item) => {
                    if (Object.entries(item)[0][0] === url) {
                      let newURL = item[url].push({
                        id: uuid(),
                        href: msg.href,
                      });
                      return {
                        [url]: newURL,
                      };
                    }
                  })
                : { [url]: [{ id: uuid(), href: msg.href }] },
            ],
          });
        });

        res({ msg: "Screenshot successfully created!" });
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
    chrome.storage.sync.get(url, (items) => {
      items[url] && setNotes(items[url]);
    });
    // }
  }, []);

  // set()
  useEffect(() => {
    // if (!localMode) {
    notes.length > 0
      ? chrome.storage.sync.set({ [url]: notes })
      : chrome.storage.sync.remove(url);
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
        const handleSize = (size) => {
          setNotes((prevNotes) =>
            prevNotes.reduce(
              (acc, cv) =>
                cv.id === note.id &&
                ((size === "decrement" && note.size > 200) ||
                  (size === "increment" && note.size < 500))
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
                  <RichTextGroup>
                    <RichTextButton>
                      <b>B</b>
                    </RichTextButton>
                    <RichTextButton>
                      <i>i</i>
                    </RichTextButton>
                    <RichTextButton>
                      <u>u</u>
                    </RichTextButton>
                    <RichTextButton>
                      <s>s</s>
                    </RichTextButton>
                    <RichTextButton>
                      <ListUlIcon />
                    </RichTextButton>
                  </RichTextGroup>
                  <StyledButton onClick={handleDelete}>X</StyledButton>
                  <StyledButton onClick={handlePin}>
                    {note.pinned ? <LockIcon /> : <LockOpenIcon />}
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
