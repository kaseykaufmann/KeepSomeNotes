import { Lock } from "@styled-icons/boxicons-regular/Lock";
import { LockOpen } from "@styled-icons/boxicons-regular/LockOpen";
import { ListUl } from "@styled-icons/boxicons-regular/ListUl";
import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  z-index: 99;
  position: absolute;
  border: none;
  &:focus {
    outline: none;
  }
`;

export const Header = styled.div`
  height: 20px;
  border: none;
`;

export const RichTextGroup = styled.div``;

export const StyledButton = styled.button`
  height: 20px;
  border: none;
  float: right;
  color: red;
  &:focus {
    outline: none;
  }
`;

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

export const StyledTextArea = styled.textarea.attrs((props) => ({
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
  &:focus {
    outline: none;
  }
`;

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
