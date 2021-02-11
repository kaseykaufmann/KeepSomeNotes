// // Inform the background page that
// // this tab should have a page-action.
// chrome.runtime.sendMessage({
//   from: "content",
//   subject: "showPageAction",
// });

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // First, validate the message's structure.
  if (msg.from === "popup" && msg.subject === "DOMInfo") {
    // Collect the necessary data.
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`.)

    const example = document.createElement("div");
    example.innerHTML = "AHHHHHHHHHHH";
    document.body.appendChild(example);

    var domInfo = {
      msg: "Info has been loaded successfully!",
    };

    console.log(domInfo.msg);

    // Directly respond to the sender (popup),
    // through the specified callback.
    response(domInfo);
  }
});

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // First, validate the message's structure.
  if (msg.from === "popup" && msg.subject === "newNote") {
    // Collect the necessary data.
    const example = document.createElement("div");
    example.innerHTML = "AHHHHHHHHHHH";
    document.body.appendChild(example);

    var domInfo = {
      msg: "The new note has been loaded successfully!",
    };

    const root = chrome.extension.getURL("./index.html");
    console.log(domInfo.msg, root);

    // Directly respond to the sender (popup),
    // through the specified callback.
    response(domInfo);
  }
});

// const modal = document.createElement("dialog");
// modal.setAttribute("style", "height:40%");
// modal.innerHTML = `<iframe id="NoteFetcher" style="height:100%"></iframe>
//         <div style="position:absolute; top:0px; left:5px;">
//             <button>x</button>
//         </div>`;
// document.body.appendChild(modal);
// const dialog = document.querySelector("dialog");
// dialog.showModal();

// const iframe = document.getElementById("NoteFetcher");
// iframe.src = chrome.extension.getURL("./index.html");
// iframe.frameBorder = 0;
// dialog.querySelector("button").addEventListener("click", () => {
//   dialog.close();
// });
