// Request og:image from the current tab and display it in the popup

document.addEventListener('DOMContentLoaded', () => {
  // Query the active tab in the current window
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) return;
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['content.js']
    }, () => {
      // After injecting, send a message to content script to get og:image
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getOgImage' }, (response) => {
        const imageUrl = response && response.ogImage;
        const imageContainer = document.getElementById('image-container');
        const notFound = document.getElementById('not-found');
        const img = document.getElementById('og-image');
        if (imageUrl) {
          img.src = imageUrl;
          imageContainer.style.display = 'block';
          notFound.style.display = 'none';
        } else {
          imageContainer.style.display = 'none';
          notFound.style.display = 'block';
        }
      });
    });
  });
});