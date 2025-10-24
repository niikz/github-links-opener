// content.js - GitHubページに注入されるスクリプト

// デフォルト設定
const DEFAULT_CONFIG = {
  maxPRs: 10,
  delay: 200,
  confirmBeforeOpen: true,
};

// 設定を取得
async function getConfig() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(DEFAULT_CONFIG, (config) => {
      resolve(config);
    });
  });
}

// 未読PRを一括で開く
async function openUnreadPRs() {
  const config = await getConfig();

  // 未読PRを取得
  const unreadPRs = document.querySelectorAll(
    '.Box-row--unread a.js-navigation-open, .notification-unread a[data-hovercard-type="pull_request"]'
  );

  if (unreadPRs.length === 0) {
    alert('未読PRが見つかりませんでした。');
    return;
  }

  const count = Math.min(unreadPRs.length, config.maxPRs);

  // 確認ダイアログ
  if (config.confirmBeforeOpen) {
    const confirmed = confirm(
      `${count}件の未読PRを開きます。よろしいですか？\n\n⚠️ ポップアップブロッカーを許可してください。\n（拡張機能の設定から確認を無効にできます）`
    );
    if (!confirmed) return;
  }

  // PRを開く
  let opened = 0;
  const urls = [];

  for (const a of unreadPRs) {
    if (opened >= config.maxPRs) break;

    const href = a.href || a.getAttribute('href');
    if (href) {
      urls.push(href);
      opened++;
    }
  }

  // chrome.runtime.sendMessageを使って、background scriptで開く
  chrome.runtime.sendMessage(
    {
      action: 'openTabs',
      urls: urls,
    },
    (response) => {
      if (response && response.success) {
        alert(`✅ ${response.opened}件の未読PRを開きました！`);
      }
    }
  );
}

// ========================================
// ポップアップからのメッセージを受信
// ========================================

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getUnreadCount') {
    // 未読PRの数を取得
    const unreadPRs = document.querySelectorAll(
      '.Box-row--unread a.js-navigation-open, ' +
      '.notification-unread a[data-hovercard-type="pull_request"]'
    );
    sendResponse({ count: unreadPRs.length });
    return true; // 非同期レスポンスを有効にする
  }

  if (request.action === 'openUnreadPRs') {
    // 未読PRを一括で開く
    openUnreadPRs();
    sendResponse({ success: true });
    return true;
  }
});
