chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "search") {
    sendResponse({ content: document.body.innerText });
  }
});
