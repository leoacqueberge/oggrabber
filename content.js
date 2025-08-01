// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getOgImage') {
    // Find the og:image meta tag in the page
    const meta = document.querySelector('meta[property="og:image"]');
    sendResponse({ ogImage: meta ? meta.content : null });
  }
  // Return true to indicate async response (not needed here, but good practice)
  return true;
});