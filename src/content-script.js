chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "search") {
        // Tutaj możemy dodać logikę wyszukiwania na stronie
        console.log('Wyszukiwanie na stronie:', request.query);
        // Przykład: znajdź wszystkie wystąpienia tekstu na stronie
        const occurrences = document.body.innerText.match(new RegExp(request.query, 'gi'));
        sendResponse({ count: occurrences ? occurrences.length : 0 });
    }
});
