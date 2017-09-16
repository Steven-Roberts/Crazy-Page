const cssTagOptions = {
    id: '__crazy_page__',
    href: chrome.extension.getURL('animations.css'),
    type: 'text/css',
    rel: 'stylesheet'
};

const cssTag = document.getElementById(cssTagOptions.id);

if (cssTag) {
    cssTag.remove();
} else {
    // Get the head or create it if it does not exists
    const head = document.head || document.documentElement
        .insertBefore(document.createElement('head'), document.body);

    head.appendChild(
        Object.assign(document.createElement('link'), cssTagOptions)
    );
}
