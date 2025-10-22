// ブックマークレット版
// このファイルの内容を javascript: の後にコピーしてブックマークに登録してください

(function () {
  'use strict';

  // 既にボタンが存在する場合は削除
  const existingBtn = document.getElementById('github-open-unread-prs-bookmarklet');
  if (existingBtn) {
    existingBtn.remove();
  }

  // subnavまたはissues-listingを探す
  const subnav = document.querySelector('.subnav') || 
                 document.querySelector('.issues-listing') ||
                 document.querySelector('[role="navigation"]');
  
  if (!subnav) {
    alert('⚠️ ボタンを配置する場所が見つかりませんでした。\nGitHubのPRページにいることを確認してください。');
    return;
  }

  // ボタンを作成
  const btn = document.createElement('button');
  btn.id = 'github-open-unread-prs-bookmarklet';
  btn.textContent = '🔗 未読PRを一括で開く';
  btn.style.cssText = `
    margin: 2px;
    padding: 6px 12px;
    border-radius: 6px;
    background: #238636;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 10px;
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
  btn.addEventListener('click', async () => {
    const limit = 10; // 一度に開く最大件数
    
    // 複数のセレクターを試す
    const unreadPRs = document.querySelectorAll(
      '.Box-row--unread a.js-navigation-open, ' +
      '.notification-unread a[data-hovercard-type="pull_request"], ' +
      '[data-unread="true"] a.Link--primary'
    );

    if (unreadPRs.length === 0) {
      alert('❌ 未読PRが見つかりませんでした。');
      return;
    }

    const count = Math.min(unreadPRs.length, limit);
    const confirmed = confirm(`${count}件の未読PRを開きます。よろしいですか？\n\n⚠️ ポップアップブロッカーを許可してください。`);
    
    if (!confirmed) return;

    // ボタンを無効化
    btn.disabled = true;
    btn.textContent = '⏳ 開いています...';
    btn.style.background = '#656d76';

    let opened = 0;
    
    // 遅延なしで一気に開く（ポップアップブロック回避）
    for (const a of unreadPRs) {
      if (opened >= limit) break;
      
      const href = a.href || a.getAttribute('href');
      if (href) {
        window.open(href, '_blank', 'noopener,noreferrer');
        opened++;
      }
    }

    // ボタンを元に戻す
    btn.disabled = false;
    btn.textContent = '🔗 未読PRを一括で開く';
    btn.style.background = '#238636';

    // 結果を表示
    alert(`✅ ${opened}件の未読PRを開きました！`);
  });

  // ボタンが追加されたことを通知
  console.log('✅ GitHub Open Unread PRs ボタンを追加しました');
})();
