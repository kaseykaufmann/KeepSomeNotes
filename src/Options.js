/* global chrome */
import React, { useEffect, useState } from "react";
import {
  StyledContainer,
  StyledHeader,
  EditButton,
  EditInput,
  StyledTitle,
  StyledSubHeader,
  StyledSearchBar,
  StyledBody,
  StyledList,
  StyledUrlList,
  Urls,
  URLTitle,
  ButtonGroup,
  DeleteButton,
  Header,
  StyledButton,
  StyledNote,
  LockOpenIcon,
  LockIcon,
  ListUlIcon,
  ColorButtonGroup,
  SizeButtonGroup,
  ColorListItems,
  SizeButton,
  RichTextGroup,
  RichTextButton,
  ColorButton,
  StyledImg,
  Divider,
} from "./StyledComponents/options";

const UrlEntry = ({ entry, searchFilter, screenshots }) => {
  const [open, setOpen] = useState(false);
  const url = entry[0];
  const [notes, setNotes] = useState(entry[1]);
  const [ss, setSs] = useState([]);
  // set
  useEffect(() => {
    if (searchFilter === "") {
      notes.length > 0
        ? chrome.storage.sync.set({ [url]: notes })
        : chrome.storage.sync.remove(url);
    }
  }, [notes]);

  useEffect(() => {
    screenshots &&
      screenshots[0] &&
      setSs(Object.entries(screenshots[0])[0][1]);
  }, [screenshots]);

  const deleteAllNotes = () => {
    setNotes([]);
    setSs([]);
  };

  return (
    <StyledUrlList>
      <Urls onClick={() => setOpen(!open)}>
        <URLTitle>{url}</URLTitle>
        <ButtonGroup>
          <DeleteButton onClick={deleteAllNotes}>Delete All</DeleteButton>
          <a href={url} target="_blank">
            Go to website
          </a>
        </ButtonGroup>
      </Urls>
      {(notes || ss) && (
        <StyledBody
          style={{ display: open || searchFilter !== "" ? "inherit" : "none" }}
        >
          <Divider>
            {notes &&
              notes.map((note) => {
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
                return (
                  <div
                    style={{
                      display: "inline-block",
                      position: "relative",
                      width: 205,
                      margin: 0,
                      marginRight: 100,
                    }}
                  >
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
                      <div
                        style={{
                          marginTop: 4,
                          marginLeft: 4,
                          width: "fit-content",
                          display: "inline-block",
                        }}
                      >
                        {note.size}px
                      </div>
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
                    <StyledNote
                      onChange={handleChange}
                      value={note.note ? note.note : ""}
                      backgroundColor={note.color || "gray"}
                      color={note.textColor || "black"}
                    ></StyledNote>
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
                  </div>
                );
              })}
          </Divider>
          <Divider>
            {ss &&
              ss.map((s, idx) => {
                return (
                  <div
                    key={idx}
                    style={{ width: "25%", display: "inline-block" }}
                  >
                    <Header style={{ width: 205 }}>
                      <StyledButton
                        style={{ borderRadius: 100, float: "left" }}
                      >
                        X
                      </StyledButton>
                    </Header>
                    <StyledImg src={s.href} />
                  </div>
                );
              })}
          </Divider>
        </StyledBody>
      )}
    </StyledUrlList>
  );
};

export const Options = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [screenshots, setScreenshots] = useState([]);
  const [title, setTitle] = useState({
    open: false,
    name: "Your",
  });
  const [searchFilter, setSearchFilter] = useState("");

  const onSearchFilter = (e) => {
    setSearchFilter(e.target.value);
  };

  // TODO highlight the specific words
  useEffect(() => {
    if (searchFilter === "") {
      setFilteredNotes([]);
    } else {
      const newNotes = notes.filter((URL) => {
        const newNotes = URL[1].filter((note) =>
          note.note.toLowerCase().includes(searchFilter.toLowerCase())
        );
        if (URL[0].toLowerCase().includes(searchFilter.toLowerCase())) {
          return URL;
        } else if (newNotes.length > 0) {
          let newURL = URL;
          newURL[1] = newNotes;
          return newURL;
        }
      });
      setFilteredNotes(newNotes);
    }
  }, [searchFilter]);

  useEffect(() => {
    chrome.storage.sync.get((items) => {
      let tempNotes = [];
      Object.entries(items).map((note) => tempNotes.push(note));
      setNotes(tempNotes);
    });
    chrome.storage.local.get(["name"], (name) => {
      setTitle({ ...title, name: name.name });
    });
    chrome.storage.local.get(["screenshots"], (items) => {
      let tempSS = [];
      Object.entries(items).map((SS) => tempSS.push(SS));
      setScreenshots(tempSS);
    });
  }, []);

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>
          {!title.open ? (
            title.name
          ) : (
            <EditInput
              onChange={(e) => setTitle({ ...title, name: e.target.value })}
              placeholder={title.name}
            />
          )}{" "}
          Notes
          <EditButton
            onClick={() => {
              title.open
                ? chrome.storage.local.set({ name: title.name }, (name) => {
                    setTitle({ ...title, open: false });
                  })
                : setTitle({ ...title, open: true });
            }}
          >
            {title.open ? "DONE" : "EDIT"}
          </EditButton>
        </StyledTitle>
      </StyledHeader>
      <StyledSubHeader>
        {/* <StyledSearchBar placeholder="Search..." onChange={onSearchFilter} /> */}
      </StyledSubHeader>
      <StyledList>
        {searchFilter !== ""
          ? filteredNotes.map((entry) => (
              <UrlEntry entry={entry} searchFilter={searchFilter} />
            ))
          : notes.map((entry) => (
              <UrlEntry
                entry={entry}
                screenshots={
                  screenshots[0] &&
                  screenshots[0][1].filter(
                    (url) => entry[0] === Object.entries(url)[0][0]
                  )
                }
                searchFilter=""
              />
            ))}
      </StyledList>
    </StyledContainer>
  );
};
