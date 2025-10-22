# 🔖 ブックマークレット - クイックテスト

ブックマークレットが正しく動作するか、このページでテストできます。

## 📋 テスト用コード

以下のコードをブラウザのコンソール（F12）に貼り付けて実行してみてください:

```javascript
(function(){'use strict';const e=document.getElementById('github-open-unread-prs-bookmarklet');e&&e.remove();const t=document.querySelector('.subnav')||document.querySelector('.issues-listing')||document.querySelector('[role="navigation"]');if(!t)return void alert('⚠️ ボタンを配置する場所が見つかりませんでした。\nGitHubのPRページにいることを確認してください。');const n=document.createElement('button');n.id='github-open-unread-prs-bookmarklet',n.textContent='🔗 未読PRを一括で開く',n.style.cssText='margin:8px;padding:6px 12px;border-radius:6px;background:#238636;color:white;border:none;cursor:pointer;font-size:14px;font-weight:500;transition:background 0.2s;',n.addEventListener('mouseenter',()=>{n.style.background='#2ea043'}),n.addEventListener('mouseleave',()=>{n.style.background='#238636'}),t.appendChild(n),n.addEventListener('click',async()=>{const e=10,t=document.querySelectorAll('.Box-row--unread a.js-navigation-open, .notification-unread a[data-hovercard-type="pull_request"], [data-unread="true"] a.Link--primary');if(0===t.length)return void alert('❌ 未読PRが見つかりませんでした。');const a=Math.min(t.length,e);if(!confirm(`${a}件の未読PRを開きます。よろしいですか？`))return;n.disabled=!0,n.textContent='⏳ 開いています...',n.style.background='#656d76';let o=0;for(const a of t){if(o>=e)break;const t=a.href||a.getAttribute('href');t&&(window.open(t,'_blank','noopener,noreferrer'),o++,o<e&&o<t.length&&await new Promise(e=>setTimeout(e,200)))}n.disabled=!1,n.textContent='🔗 未読PRを一括で開く',n.style.background='#238636',alert(`✅ ${o}件の未読PRを開きました！`)}),console.log('✅ GitHub Open Unread PRs ボタンを追加しました')})();
```

## ✅ 動作確認手順

### 1. GitHubでテスト

1. https://github.com/pulls にアクセス
2. ブラウザのコンソールを開く（F12 → Console）
3. 上記のコードを貼り付けて実行
4. ページ上部にボタンが追加されるか確認

### 2. ブックマークレットとして登録

1. ブックマークバーを右クリック
2. 「ページを追加」を選択
3. 名前: `🔗 未読PR開く`
4. URL: `bookmarklet-minified.txt` の内容をコピー
5. 保存

### 3. 実際に使用

1. https://github.com/pulls にアクセス
2. ブックマークの「🔗 未読PR開く」をクリック
3. ボタンが追加される
4. ボタンをクリックして未読PRを開く

## 🎯 期待される動作

### ✅ 成功時
- ページ上部に緑色のボタンが追加される
- ボタンにホバーすると色が変わる
- クリックすると確認ダイアログが表示される
- 未読PRが新しいタブで開かれる

### ❌ エラー時
- `.subnav` が見つからない → アラート表示
- 未読PRが0件 → アラート表示
- ポップアップブロック → ブラウザ設定を確認

## 🔧 デバッグ方法

### コンソールログを確認

```javascript
// ボタン追加成功
✅ GitHub Open Unread PRs ボタンを追加しました

// エラーがある場合
⚠️ ボタンを配置する場所が見つかりませんでした。
```

### 要素の確認

```javascript
// subnavの存在確認
console.log(document.querySelector('.subnav'));

// 未読PRの確認
console.log(document.querySelectorAll('.Box-row--unread a.js-navigation-open'));
```

## 📝 比較: 元のコードとの違い

### ❌ 元のコード（ブックマークレットとして動作しない）

```javascript
window.addEventListener('load', () => {
  // load イベントは既に発火済みなので実行されない
});
```

### ✅ 修正後（即座に実行）

```javascript
(function () {
  // すぐに実行される
})();
```

## 🚀 次のステップ

動作が確認できたら:

1. **そのまま使う**: ブックマークレットとして登録
2. **自動化したい**: `userscript/` のTampermonkey版を使用
3. **高機能版**: `extension/` のChrome拡張版を使用
