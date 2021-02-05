console.log("This is the test");

let paragraphs = document.getElementsByTagName("p");

for (elt of paragraphs) {
  elt.style["background-color"] = "white";
}

const gotMessage = (request, sender, response) => {
  console.log(request);
};

chrome.runtime.onMessage.addListener(gotMessage);
