console.log("Content script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received message:", request);
  if (request.action === "getData") {
    sendResponse({ data: document.body.innerText });
  } else if (request.action === "search") {
    console.log('Wyszukiwanie na stronie:', request.query);
    const occurrences = document.body.innerText.match(new RegExp(request.query, 'gi'));
    sendResponse({ count: occurrences ? occurrences.length : 0 });
  }
});
