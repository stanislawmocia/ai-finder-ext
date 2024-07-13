console.log("Content script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received message:", request);
  if (request.action === "search") {
    sendResponse({ content: document.body.innerText });
  }
});
