// popup.js - 拡張機能のポップアップ画面のスクリプト

// 未読PR数を取得して表示
function loadUnreadCount() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0] && tabs[0].url && tabs[0].url.includes('github.com')) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: 'getUnreadCount' },
        (response) => {
          if (chrome.runtime.lastError) {
            document.getElementById('count').textContent = '-';
            console.error('Error:', chrome.runtime.lastError);
            return;
          }
          if (response && typeof response.count === 'number') {
            document.getElementById('count').textContent = response.count;
          } else {
            document.getElementById('count').textContent = '0';
          }
        }
      );
    } else {
      document.getElementById('count').textContent = '-';
    }
  });
}

// 未読PRを一括で開く
function openUnreadPRs() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0] && tabs[0].url && tabs[0].url.includes('github.com')) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: 'openUnreadPRs' },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error('Error:', chrome.runtime.lastError);
            return;
          }
          // ポップアップを閉じる
          window.close();
        }
      );
    } else {
      alert('GitHubのPRページで使用してください。');
    }
  });
}

// イベントリスナーを設定
document.addEventListener('DOMContentLoaded', () => {
  // 未読数を読み込み
  loadUnreadCount();

  // メインボタン
  document.getElementById('openPRs').addEventListener('click', openUnreadPRs);
});
