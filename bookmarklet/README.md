# ブックマークレット版

ブラウザのブックマークに登録して使用できるバージョンです。拡張機能やUserscriptマネージャーのインストールが不要で、最も手軽に使用できます。

## 📌 インストール方法

### 方法1: 手動で作成（推奨）

1. ブラウザのブックマークバーを表示（Chrome: `Cmd+Shift+B` / `Ctrl+Shift+B`）
2. ブックマークバーの任意の場所を右クリック → 「ページを追加」または「ブックマークを追加」
3. 以下の内容を設定:
   - 名前: `🔗 未読PR開く` （任意の名前でOK）
   - URL: 下記のコードをコピー&ペースト

```javascript
javascript:(function(){'use strict';const e=document.getElementById('github-open-unread-prs-bookmarklet');e&&e.remove();const t=document.querySelector('.subnav')||document.querySelector('.issues-listing')||document.querySelector('[role="navigation"]');if(!t)return void alert('⚠️ ボタンを配置する場所が見つかりませんでした。\nGitHubのPRページにいることを確認してください。');const n=document.createElement('button');n.id='github-open-unread-prs-bookmarklet',n.textContent='🔗 未読PRを一括で開く',n.style.cssText='margin:2px;padding:6px 12px;border-radius:6px;background:#238636;color:white;border:none;cursor:pointer;font-size:10px;font-weight:500;transition:background 0.2s;',n.addEventListener('mouseenter',()=>{n.style.background='#2ea043'}),n.addEventListener('mouseleave',()=>{n.style.background='#238636'}),t.appendChild(n),n.addEventListener('click',async()=>{const e=10,t=document.querySelectorAll('.Box-row--unread a.js-navigation-open, .notification-unread a[data-hovercard-type="pull_request"], [data-unread="true"] a.Link--primary');if(0===t.length)return void alert('❌ 未読PRが見つかりませんでした。');const o=Math.min(t.length,e);if(!confirm(`${o}件の未読PRを開きます。よろしいですか？\n\n⚠️ ポップアップブロッカーを許可してください。`))return;n.disabled=!0,n.textContent='⏳ 開いています...',n.style.background='#656d76';let a=0;for(const n of t){if(a>=e)break;const t=n.href||n.getAttribute('href');t&&(window.open(t,'_blank','noopener,noreferrer'),a++)}n.disabled=!1,n.textContent='🔗 未読PRを一括で開く',n.style.background='#238636',alert(`✅ ${a}件の未読PRを開きました！`)}),console.log('✅ GitHub Open Unread PRs ボタンを追加しました')})();
```

4. 保存

### 方法2: ドラッグ&ドロップ（ブラウザによる）

一部のブラウザでは、以下のリンクをブックマークバーにドラッグ&ドロップできます:

→ [🔗 未読PR開く](javascript:(function(){'use strict';const e=document.getElementById('github-open-unread-prs-bookmarklet');e&&e.remove();const t=document.querySelector('.subnav')||document.querySelector('.issues-listing')||document.querySelector('[role="navigation"]');if(!t)return void alert('⚠️ ボタンを配置する場所が見つかりませんでした。\nGitHubのPRページにいることを確認してください。');const n=document.createElement('button');n.id='github-open-unread-prs-bookmarklet',n.textContent='🔗 未読PRを一括で開く',n.style.cssText='margin:2px;padding:6px 12px;border-radius:6px;background:#238636;color:white;border:none;cursor:pointer;font-size:10px;font-weight:500;transition:background 0.2s;',n.addEventListener('mouseenter',()=>{n.style.background='#2ea043'}),n.addEventListener('mouseleave',()=>{n.style.background='#238636'}),t.appendChild(n),n.addEventListener('click',async()=>{const e=10,t=document.querySelectorAll('.Box-row--unread a.js-navigation-open, .notification-unread a[data-hovercard-type="pull_request"], [data-unread="true"] a.Link--primary');if(0===t.length)return void alert('❌ 未読PRが見つかりませんでした。');const o=Math.min(t.length,e);if(!confirm(`${o}件の未読PRを開きます。よろしいですか？\n\n⚠️ ポップアップブロッカーを許可してください。`))return;n.disabled=!0,n.textContent='⏳ 開いています...',n.style.background='#656d76';let a=0;for(const n of t){if(a>=e)break;const t=n.href||n.getAttribute('href');t&&(window.open(t,'_blank','noopener,noreferrer'),a++)}n.disabled=!1,n.textContent='🔗 未読PRを一括で開く',n.style.background='#238636',alert(`✅ ${a}件の未読PRを開きました！`)}),console.log('✅ GitHub Open Unread PRs ボタンを追加しました')})();)

## 🚀 使い方

1. GitHubの [Pull requests](https://github.com/pulls) ページにアクセス
2. ブックマークバーの「🔗 未読PR開く」をクリック
3. ページ上部に「🔗 未読PRを一括で開く」ボタンが追加されます
4. ボタンをクリックして未読PRを開く

## ⚙️ カスタマイズ

コード内の以下の値を変更してカスタマイズできます:

### 開く件数を変更

```javascript
const limit = 10; // この数値を変更（例: 20）
```

### カスタマイズ手順

1. `github-open-unread-prs.js` を編集
2. ブラウザのコンソールや[JavaScript圧縮ツール](https://javascript-minifier.com/)で圧縮
3. 先頭に `javascript:` を追加
4. ブックマークのURLを更新

## 📊 他の形式との比較

| 機能 | ブックマークレット | Userscript | Chrome拡張 |
|------|------------------|-----------|-----------|
| インストールの簡単さ | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| 自動ボタン追加 | ❌ | ✅ | ✅ |
| 設定画面 | ❌ | ⚙️ | ⭐⭐⭐ |
| ブラウザ互換性 | 全ブラウザ | 多数 | Chrome系のみ |
| メンテナンス | 手動 | 自動更新可 | 自動更新可 |

## 🔧 トラブルシューティング

### ブックマークレットが動かない

1. `javascript:` で始まっているか確認
2. コード全体が1行になっているか確認
3. ブラウザのコンソール（F12）でエラーを確認

### ボタンが表示されない

1. GitHubのPRページにいるか確認
2. ページが完全に読み込まれてからブックマークレットをクリック
3. ポップアップブロッカーが有効か確認

### コードが長すぎてエラーになる

一部のブラウザではブックマークのURL長に制限があります。
その場合は、Userscript版またはChrome拡張機能版の使用を推奨します。

## 🎯 推奨される使用ケース

### ブックマークレット版が最適な場合

- 拡張機能をインストールできない環境
- たまにしか使わない
- 複数のブラウザで使いたい
- 最もシンプルな方法を求めている

### 他の形式が最適な場合

- **Userscript版**: 毎日使う、自動化したい
- **Chrome拡張版**: 詳細な設定が必要、最高の体験を求めている

## 📝 注意事項

- ブックマークレットはページごとに実行する必要があります
- GitHubのUI変更により動作しなくなる可能性があります
- セキュリティ上、信頼できるコードのみをブックマークレットとして登録してください
