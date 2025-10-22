// background.js (Service Worker for Manifest V3)

// content scriptからのメッセージを受信
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openTabs') {
    openTabsWithoutDelay(request.urls)
      .then((result) => {
        sendResponse({ success: true, opened: result.opened });
      })
      .catch((error) => {
        console.error('Error opening tabs:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true; // 非同期レスポンスを有効にする
  }
});

// タブを遅延なしで開く
async function openTabsWithoutDelay(urls) {
  let opened = 0;

  for (const url of urls) {
    try {
      await chrome.tabs.create({ url: url, active: false });
      opened++;
    } catch (error) {
      console.error(`Error opening tab for ${url}:`, error);
    }
  }

  return { opened };
}
