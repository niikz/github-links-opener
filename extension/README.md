# Chrome拡張機能版

Chrome/Edgeで使用できる拡張機能版です。ブラウザツールバーにアイコンが表示され、いつでもアクセスできます。

## インストール手順

### 開発者モードでインストール

1. Chromeで `chrome://extensions/` にアクセス
2. 右上の「デベロッパーモード」トグルを有効化
3. 「パッケージ化されていない拡張機能を読み込む」ボタンをクリック
4. このディレクトリ（`extension/`フォルダ）を選択

### アイコンの準備

初めて使用する場合、アイコンファイルが必要です。`icons/` ディレクトリの README.md を参照してアイコンを作成してください。

簡易的に使用する場合は、以下のコマンドでダミーアイコンを生成できます（ImageMagickが必要）:

```bash
cd icons
convert -size 128x128 xc:#238636 -pointsize 60 -fill white -gravity center -annotate +0+0 "PR" icon128.png
convert icon128.png -resize 48x48 icon48.png
convert icon128.png -resize 32x32 icon32.png
convert icon128.png -resize 16x16 icon16.png
```

## 使い方

1. GitHubの [Pull requests](https://github.com/pulls) ページにアクセス
2. ツールバーの拡張機能アイコンをクリック
3. ポップアップが開き、未読PR数が表示されます
4. 「🔗 一括で開く」ボタンをクリック
5. 未読PRが新しいタブで開かれます

## トラブルシューティング

### ボタンが表示されない

1. ページを再読み込みしてください
2. 拡張機能が有効になっているか確認してください

### タブが開かない

1. ポップアップブロッカーの設定を確認してください
2. `chrome://extensions/` で拡張機能を再読み込みしてください

### GitHubのデザイン変更により動作しない

GitHubはUIを頻繁に更新するため、セレクターが変更される可能性があります。その場合は、`content.js` のセレクターを更新する必要があります。

## ファイル構成

- `manifest.json` - 拡張機能の設定
- `content.js` - GitHubページに注入されるスクリプト
- `background.js` - バックグラウンド処理
- `popup.html` - ポップアップUI
- `popup.js` - ポップアップのスクリプト
- `popup.css` - ポップアップのスタイル
- `icons/` - 拡張機能のアイコン

## アンインストール

1. `chrome://extensions/` にアクセス
2. 拡張機能の「削除」ボタンをクリック
