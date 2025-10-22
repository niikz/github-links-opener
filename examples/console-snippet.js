/**
 * GitHub 未読PR一括オープン - コンソール版
 * 
 * 使い方:
 * 1. GitHubのPRページ（https://github.com/pulls）を開く
 * 2. ブラウザのコンソール（F12 → Console）を開く
 * 3. このコードをコピー&ペーストして Enter
 * 4. 確認ダイアログで「OK」をクリック
 * 
 * 注意:
 * - ポップアップブロッカーを許可してください
 * - 一度に開く件数はデフォルト10件です
 */

(function() {
  'use strict';
  
  console.log('🔗 GitHub 未読PR一括オープン - 開始');
  
  // 設定
  const CONFIG = {
    maxPRs: 10,           // 一度に開く最大件数
    confirmBeforeOpen: true, // 開く前に確認
  };
  
  // 未読PRを取得
  const unreadPRs = document.querySelectorAll(
    '.Box-row--unread a.js-navigation-open, ' +
    '.notification-unread a[data-hovercard-type="pull_request"], ' +
    '[data-unread="true"] a.Link--primary'
  );
  
  if (unreadPRs.length === 0) {
    console.warn('⚠️ 未読PRが見つかりませんでした。');
    alert('未読PRが見つかりませんでした。');
    return;
  }
  
  console.log(`📊 未読PR数: ${unreadPRs.length}件`);
  
  const count = Math.min(unreadPRs.length, CONFIG.maxPRs);
  
  // 確認ダイアログ
  if (CONFIG.confirmBeforeOpen) {
    const confirmed = confirm(
      `${count}件の未読PRを開きます。よろしいですか？\n\n` +
      `⚠️ ポップアップブロッカーを許可してください。`
    );
    if (!confirmed) {
      console.log('❌ キャンセルされました');
      return;
    }
  }
  
  // PRを開く
  let opened = 0;
  let blocked = 0;
  
  console.log('🚀 未読PRを開いています...');
  
  for (const a of unreadPRs) {
    if (opened >= CONFIG.maxPRs) break;
    
    const href = a.href || a.getAttribute('href');
    if (href) {
      try {
        const newWindow = window.open(href, '_blank', 'noopener,noreferrer');
        
        // ポップアップがブロックされたかチェック
        if (newWindow === null || typeof newWindow === 'undefined') {
          blocked++;
          console.warn(`❌ ブロック: ${href}`);
        } else {
          opened++;
          console.log(`✅ 開きました (${opened}/${count}): ${href}`);
        }
      } catch (e) {
        blocked++;
        console.error(`❌ エラー: ${href}`, e);
      }
    }
  }
  
  // 結果を表示
  console.log('━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ 開いたPR: ${opened}件`);
  if (blocked > 0) {
    console.warn(`⚠️ ブロックされたPR: ${blocked}件`);
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━');
  
  // アラート表示
  if (blocked > 0) {
    alert(
      `⚠️ ${opened}件のPRを開きました。\n` +
      `${blocked}件がポップアップブロックされました。\n\n` +
      `解決方法:\n` +
      `1. ブラウザのアドレスバー右側のアイコンをクリック\n` +
      `2. 「github.comのポップアップを常に許可」を選択\n` +
      `3. もう一度このコードを実行`
    );
  } else {
    alert(`✅ ${opened}件の未読PRを開きました！`);
  }
})();
