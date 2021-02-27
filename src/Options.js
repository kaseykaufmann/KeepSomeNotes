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

const StyledTitle = styled.h1`
  min-width: 450px;
  max-width: 750px;
  width: 450px;
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
`;

const StyledFilterButton = styled.button`
  width: 15%;
  margin: 0px;
  top: 0px;
  left: 1%;

  position: absolute;
  font-size: 16px;
  height: 50px;
  border-radius: 10px;
  background: #c4c4c4;
  border: 0px;
  padding: 0px;
`;

const StyledSearchBar = styled.input`
  width: 80%;
  top: 0px;
  left: 18%;

  position: absolute;
  height: 50px;
  margin: 0px;
  font-size: 24px;
  border-radius: 10px;
  padding: 0px 10px;
  border: 0px;
`;

const StyledBody = styled.div`
  background: #909090;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 30px;
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
  padding-top: 25px;
  border: 1px solid gray;
  border-radius: 5px;
  height: 50px;
  margin: 0px;
  margin-top: 10px;
  background: #bdbdbd;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const StyledNote = styled.textarea.attrs((props) => ({
  color: props.color || "white",
  backgroundColor: props.backgroundColor || "gray",
}))`
  height: 200px;
  width: 200px;
  margin: 0px;
  margin-right: 10px;
  border: none;
  color: ${(props) => props.color || "white"};
  background-color: ${(props) => props.backgroundColor || "gray"};
`;

const UrlEntry = ({ entry }) => {
  const [open, setOpen] = useState(false);
  const url = entry[0];
  const notes = entry[1];

  return (
    <StyledUrlList>
      <Urls onClick={() => setOpen(!open)}>
        <div style={{ margin: "0px 10px", width: "auto" }}>
          {url}{" "}
          <a href={url} target="_blank" style={{ float: "right" }}>
            Go to website
          </a>
        </div>
      </Urls>
      {notes && (
        <StyledBody style={{ display: open ? "inherit" : "none" }}>
          {notes.map((note) => (
            <StyledNote
              backgroundColor={note.color || "gray"}
              color={note.textColor || "black"}
            >
              {note.note}
            </StyledNote>
          ))}
        </StyledBody>
      )}
    </StyledUrlList>
  );
};

export const Options = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("Your");

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
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>{title} Notes</StyledTitle>
      </StyledHeader>
      <StyledSubHeader>
        <StyledFilterButton>Filter By: Alphabetical</StyledFilterButton>
        <StyledSearchBar placeholder="Search..." />
      </StyledSubHeader>
      {notes && (
        <StyledList>
          {notes.map((entry) => (
            <UrlEntry entry={entry} />
          ))}
        </StyledList>
      )}
    </StyledContainer>
  );
};
