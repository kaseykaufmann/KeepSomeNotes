import { Lock } from "@styled-icons/boxicons-regular/Lock";
import { LockOpen } from "@styled-icons/boxicons-regular/LockOpen";
import { ListUl } from "@styled-icons/boxicons-regular/ListUl";
import styled, { keyframes } from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
`;

export const StyledHeader = styled.span`
  width: 100%;
  text-align: center;
`;

export const EditButton = styled.button`
  background: none;
  position: absolute;
  color: gray;
  top: 10px;
  right: 10px;
  border: 0px;
`;

export const EditInput = styled.input`
  height: 75px;
  min-width: 150px;
  width: 30%;
  background: #8eb5ff;
  border-radius: 5px;
  font-size: 72px;
  top: 10px;
  left: 10px;
`;

export const StyledTitle = styled.h1`
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

export const StyledSubHeader = styled.div`
  height: 50px;
  position: relative;
  padding: 0px 15px;
`;

export const StyledSearchBar = styled.input`
  width: calc(100% - 10px);
  height: 50px;
  font-size: 24px;

  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border: 0px;
  padding: 0px;
  padding-left: 15px;
  display: inline-block;
`;

export const StyledBody = styled.div`
  background: #909090;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 20px;
`;

export const Divider = styled.div`
  width: 100%;
  margin: 10px auto;
  position: relative;
`;

export const StyledList = styled.div`
  min-width: 550px;
  width: 98%;
  margin-left: 1%;
`;

export const StyledUrlList = styled.div`
  width: 100%;
  margin: 10px 0px;
`;

export const Urls = styled.h4`
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

export const URLTitle = styled.div`
  min-height: 40px;
  max-width: 50%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-top: 15px;
  padding-left: 15px;
  width: auto;
  float: left;
`;

export const ButtonGroup = styled.div`
  height: 50px;
  max-width: 50%;
  width: auto;
  float: right;
  margin-right: 10px;
  padding-top: 5px;
`;

export const DeleteButton = styled.button`
  color: red;
  decoration: none;
  border: 1px solid red;
  border-radius: 5px;
  background: #bdbdbd;
  margin: 3px 10px;
  padding: 10px;
`;

export const Header = styled.div`
  height: 20px;
  border: none;
  opacity: 0.5;
`;

export const StyledButton = styled.button`
  height: 20px;
  border: none;
  float: right;
`;

export const StyledNote = styled.textarea.attrs((props) => ({
  color: props.color || "white",
  backgroundColor: props.backgroundColor || "gray",
}))`
  height: 200px;
  width: 200px;
  border: none;
  color: ${(props) => props.color || "white"};
  background-color: ${(props) => props.backgroundColor || "gray"};
`;

// NOTES COMPONENTS

export const LockOpenIcon = styled(LockOpen)`
  height: 20px;
  width: 20px;
  color: black;
`;

export const LockIcon = styled(Lock)`
  height: 20px;
  width: 20px;
  color: black;
`;

export const ListUlIcon = styled(ListUl)`
  height: 20px;
  color: black;
`;

export const ColorButtonGroup = styled.div`
  position: absolute;
  right: -60px;
  top: 20px;
  width: 60px;
  height: 80%;
  margin: 0px;
  padding: 0px;
`;

export const SizeButtonGroup = styled.div`
  position: absolute;
  left: -20px;
  top: 20px;
  height: 90%;
  margin: 0px;
  padding: 0px;
`;

export const ColorListItems = styled.div.attrs((props) => ({
  backgroundColor: props.color,
}))`
  height: 18px;
`;

const show = keyframes`
  from {
    width: 20px;
  }
  to {
    width: 100%;
  }
`;

export const SizeButton = styled.button`
  width: 20px;
  padding: 0px;
  &:focus {
    outline: none;
  }
`;

export const ColorButton = styled.button.attrs((props) => ({
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

export const RichTextGroup = styled.div``;

export const RichTextButton = styled.button`
  height: 20px;
  border: none;
  float: left;
  &:focus {
    outline: none;
  }
  &:hover {
    opacity: 0.5;
  }
`;

const imgChange = keyframes`
  from {
    height: 205px;
    width: 205px;
  }
  to {
    height: 100%;
    width: 100%;
  }
`;

export const ImgGroup = styled.div`
  width: calc(33% - 10px);
  display: inline-block;
  border: 1px black dashed;
  border-radius: 10px;
  margin: 5px;
`;

export const SSHeader = styled.div`
  height: 20px;
  border: none;
  opacity: 0.5;
  width: 205px;
`;

export const StyledImg = styled.img`
  height: 205px;
  width: 205px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  &:focus {
    animation: ${imgChange} 1s ease-out forwards;
  }
  &:hover {
    animation: ${imgChange} 1s ease-out forwards;
  }
`;
