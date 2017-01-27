const executeScripts = () => {
    chrome.tabs.executeScript({
        file: 'animations.js',
        matchAboutBlank: true,
        runAt: 'document_end'
    });
};

chrome.browserAction.onClicked.addListener(executeScripts);

chrome.commands.onCommand.addListener((command) => {
    if (command === 'toggle-animations') {
        executeScripts();
    }
});
