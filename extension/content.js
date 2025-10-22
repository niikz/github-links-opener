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

  // ボタンを無効化
  const btn = document.getElementById('github-open-unread-prs-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = '⏳ 開いています...';
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
      // ボタンを元に戻す
      if (btn) {
        btn.disabled = false;
        btn.textContent = '🔗 未読PRを一括で開く';
      }

      if (response && response.success) {
        alert(`✅ ${response.opened}件の未読PRを開きました！`);
      }
    }
  );
}

// ボタンを追加
function addButton() {
  // 既にボタンがあれば追加しない
  if (document.getElementById('github-open-unread-prs-btn')) {
    return;
  }

  // subnavまたはissues-listingを探す
  const subnav = document.querySelector('.subnav') || document.querySelector('.issues-listing');
  if (!subnav) {
    console.warn('GitHub Open Unread PRs: ボタンを配置する場所が見つかりませんでした');
    return;
  }

  // ボタンを作成
  const btn = document.createElement('button');
  btn.id = 'github-open-unread-prs-btn';
  btn.textContent = '🔗 未読PRを一括で開く';
  btn.className = 'btn btn-sm';
  btn.style.cssText = `
    margin: 8px;
    padding: 6px 12px;
    border-radius: 6px;
    background: #238636;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background 0.2s;
  `;

  // ホバー効果
  btn.addEventListener('mouseenter', () => {
    btn.style.background = '#2ea043';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.background = '#238636';
  });

  subnav.appendChild(btn);

  // ボタンクリック時の処理
  btn.addEventListener('click', openUnreadPRs);
}

// ページ読み込み後にボタンを追加
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addButton);
} else {
  addButton();
}

// SPAのページ遷移を監視
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setTimeout(addButton, 500); // 少し遅延させてDOMが更新されるのを待つ
  }
}).observe(document, { subtree: true, childList: true });

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
