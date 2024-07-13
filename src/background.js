chrome.commands.onCommand.addListener((command) => {
  console.log(command);
  if (command === "open-ai-search") {
    chrome.action.openPopup();
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveConfig') {
    chrome.storage.local.remove(['config']);
    chrome.storage.local.set({ config: request.config }, () => {
    });
  } else if (request.action === 'getConfig') {
    chrome.storage.local.get(['config'], (result) => {
      sendResponse({ config: result.config });
    });
    return true;
  }
});