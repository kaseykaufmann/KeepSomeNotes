// browser or page actions here

function buttonClicked(tab) {
  let msg = {
    text: "This is from this tab",
  };
  chrome.tabs.sendMessage(tab.id, msg);
}

chrome.browserAction.onClicked.addListener(buttonClicked);
