// Update the relevant fields with the new data.
let newInfo;
const setDOMInfo = (info) => {
  newInfo = info;
};

// Once the DOM is ready...
window.addEventListener("DOMContentLoaded", () => {
  let tab;
  const newNote = document.getElementById("newNote");
  newNote.onclick = () => {
    chrome.tabs.sendMessage(
      tab,
      { from: "popup", subject: "newNote" },
      (res) => {
        console.log(res);
      }
    );
  };
  // ...query for the active tab...
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      tab = tabs[0].id;
      // ...and send a request for the DOM info...
      chrome.tabs.sendMessage(
        tabs[0].id,
        { from: "popup", subject: "DOMInfo" },
        setDOMInfo
      );
    }
  );
});
