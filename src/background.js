chrome.commands.onCommand.addListener((command) => {
    if (command === "open-ai-search") {
        chrome.action.openPopup();
    }
});
