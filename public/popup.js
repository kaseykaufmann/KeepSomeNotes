let createNote = document.getElementById("createNote");
let screenshot = document.getElementById("screenshot");
let deleteAllNotes = document.getElementById("deleteAllNotes");
let dashboard = document.getElementById("dashboard");

// Once the DOM is ready...
window.addEventListener("DOMContentLoaded", () => {
  let tab;
  createNote.onclick = () => {
    chrome.tabs.sendMessage(
      tab,
      { from: "popup", subject: "newNote" },
      (res) => {
        console.log(res);
      }
    );
  };

  deleteAllNotes.onclick = () => {
    chrome.tabs.sendMessage(
      tab,
      { from: "popup", subject: "deleteAllNotes" },
      (res) => {
        console.log(res);
      }
    );
  };

  screenshot.onclick = () => {
    chrome.tabs.captureVisibleTab((dataURL) => {
      chrome.tabs.sendMessage(
        tab,
        { from: "popup", subject: "screenshot", href: dataURL },
        (res) => {
          console.log(res);
        }
      );
    });
  };

  dashboard.onclick = () => {
    chrome.runtime.openOptionsPage();
  };

  // ...query for the active tab...
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      tab = tabs[0].id;
    }
  );
});
