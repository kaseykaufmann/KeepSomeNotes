/* global chrome */
import React, { useEffect, useState } from "react";
import styled from "styled-components";

// import { localMode } from "./constants";

const StyledContainer = styled.div`
  width: 100%;
`;

const StyledHeader = styled.span`
  width: 100%;
  text-align: center;
`;

const EditButton = styled.button`
  background: none;
  position: absolute;
  color: gray;
  top: 10px;
  right: 10px;
  border: 0px;
`;

const EditInput = styled.input`
  height: 75px;
  min-width: 150px;
  width: 30%;
  background: #8eb5ff;
  border-radius: 5px;
  font-size: 72px;
  top: 10px;
  left: 10px;
`;

const StyledTitle = styled.h1`
  position: relative;
  min-width: 450px;
  max-width: 750px;
  height: 75px;
  font-size: 72px;
  text-align: center;
  background: #8eb5ff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 99;
  border-radius: 20px;
  margin: 15px auto;
  padding: 10px;
`;

const StyledSubHeader = styled.div`
  height: 50px;
  position: relative;
  padding: 0px 15px;
`;

const StyledSearchBar = styled.input`
  width: 100%;
  height: 50px;
  font-size: 24px;
  border-radius: 10px;
  border: 0px;
`;

const StyledBody = styled.div`
  background: #909090;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 20px;
`;

const StyledList = styled.div`
  width: 98%;
  margin-left: 1%;
`;

const StyledUrlList = styled.div`
  width: 100%;
  margin: 10px 0px;
`;

const Urls = styled.h4`
  width: 100%;
  font-size: 16px;
  border: 1px solid gray;
  border-radius: 5px;
  min-height: 50px;
  margin: 0px;
  margin-top: 10px;
  background: #bdbdbd;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const URLTitle = styled.div`
  min-height: 40px;
  max-width: 70%;
  padding-top: 15px;
  padding-left: 15px;
  width: auto;
  float: left;
`;

const ButtonGroup = styled.div`
  height: 50px;
  max-width: 50%;
  width: auto;
  float: right;
  margin-right: 10px;
  padding-top: 5px;
`;

const DeleteButton = styled.button`
  color: red;
  decoration: none;
  border: 1px solid red;
  border-radius: 5px;
  background: #bdbdbd;
  margin: 3px 10px;
  padding: 10px;
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

const StyledNote = styled.textarea.attrs((props) => ({
  color: props.color || "white",
  backgroundColor: props.backgroundColor || "gray",
}))`
  height: 200px;
  width: 200px;
  border: none;
  color: ${(props) => props.color || "white"};
  background-color: ${(props) => props.backgroundColor || "gray"};
`;

const UrlEntry = ({ entry }) => {
  const [open, setOpen] = useState(false);
  const url = entry[0];
  const [notes, setNotes] = useState(entry[1]);

  // set
  useEffect(() => {
    notes.length > 0
      ? chrome.storage.sync.set({ [url]: notes })
      : chrome.storage.sync.remove(url);
  }, [notes]);

  const deleteAllNotes = () => {
    setNotes([]);
  };

  return (
    <StyledUrlList>
      <Urls onClick={() => setOpen(!open)}>
        <URLTitle>
          {url.substring(0, 50)}
          {url.length > 50 && "..."}{" "}
        </URLTitle>
        <ButtonGroup>
          <DeleteButton onClick={deleteAllNotes}>Delete All Notes</DeleteButton>
          <a href={url} target="_blank">
            Go to website
          </a>
        </ButtonGroup>
      </Urls>
      {notes && (
        <StyledBody style={{ display: open ? "inherit" : "none" }}>
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
              <div
                style={{
                  display: "inline-block",
                  width: 205,
                  margin: 0,
                  marginRight: 10,
                }}
              >
                <Header>
                  <StyledButton onClick={handleDelete}>X</StyledButton>
                </Header>
                <StyledNote
                  onChange={handleChange}
                  value={note.note ? note.note : ""}
                  backgroundColor={note.color || "gray"}
                  color={note.textColor || "black"}
                ></StyledNote>
              </div>
            );
          })}
        </StyledBody>
      )}
    </StyledUrlList>
  );
};

export const Options = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState({
    open: false,
    name: "Your",
  });
  const [searchFilter, setSearchFilter] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const onSearchFilter = (e) => {
    setSearchFilter(e.target.value);
  };

  // ! when i backspace it deletes notes permanently for some reason
  // TODO highlight the specific words
  useEffect(() => {
    const newNotes = notes.filter((URL) => {
      const newNotes = URL[1].filter((note) =>
        note.note.toLowerCase().includes(searchFilter.toLowerCase())
      );
      if (
        URL[0].toLowerCase().includes(searchFilter.toLowerCase()) ||
        newNotes.length > 0
      ) {
        let newURL = URL;
        newURL[1] = newNotes;
        return newURL;
      }
    });
    setFilteredNotes(newNotes);
  }, [searchFilter]);

  useEffect(() => {
    chrome.storage.local.set({ name: title.name });
  }, [title.name]);

  useEffect(() => {
    chrome.storage.sync.get((items) => {
      let tempNotes = [];
      Object.entries(items).map((note) => tempNotes.push(note));
      setNotes(tempNotes);
      setFilteredNotes(tempNotes);
    });
    chrome.storage.local.set({ name: title.name });
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
              placeholder="Your"
            />
          )}{" "}
          Notes
          <EditButton onClick={() => setTitle({ ...title, open: !title.open })}>
            {title.open ? "DONE" : "EDIT"}
          </EditButton>
        </StyledTitle>
      </StyledHeader>
      <StyledSubHeader>
        <StyledSearchBar placeholder="Search..." onChange={onSearchFilter} />
      </StyledSubHeader>
      {filteredNotes && (
        <StyledList>
          {filteredNotes.map((entry) => (
            <UrlEntry entry={entry} />
          ))}
        </StyledList>
      )}
    </StyledContainer>
  );
};
