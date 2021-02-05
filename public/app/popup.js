let createNote = document.getElementById("createNote");
let deleteAllNotes = document.getElementById("deleteAllNotes");
let dashboard = document.getElementById("dashboard");

document.addEventListener(
  "DOMContentLoaded",
  () => {
    createNote.onclick = () => {
      chrome.tabs.getSelected(null, () => {
        alert("How Do I Make Some NOTES!!!!");
      });
    };
  },
  false
);
