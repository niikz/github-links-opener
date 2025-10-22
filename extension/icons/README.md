# Chrome拡張機能 アイコン

このディレクトリには、Chrome拡張機能用のアイコン画像を配置します。

## 必要なアイコンサイズ

- `icon16.png` - 16x16px
- `icon32.png` - 32x32px  
- `icon48.png` - 48x48px
- `icon128.png` - 128x128px

## アイコンの作成方法

以下のいずれかの方法でアイコンを作成してください:

### 1. オンラインツールを使用

- [Favicon Generator](https://favicon.io/)
- [RealFaviconGenerator](https://realfavicongenerator.net/)

### 2. 画像編集ソフトを使用

Photoshop、GIMP、Figmaなどで、GitHubとリンクをイメージしたアイコンをデザインしてください。

推奨デザイン:
- GitHubのロゴ + リンクのアイコン
- 色: GitHub緑 (#238636) をベースに

### 3. 仮のアイコン

開発中は、単色の正方形などの簡単なアイコンで代用できます。

```bash
# ImageMagickを使って簡単なアイコンを生成する例
convert -size 128x128 xc:#238636 -pointsize 60 -fill white -gravity center -annotate +0+0 "PR" icon128.png
convert icon128.png -resize 48x48 icon48.png
convert icon128.png -resize 32x32 icon32.png
convert icon128.png -resize 16x16 icon16.png
```

## 注意事項

- PNG形式で保存してください
- 透過背景を使用することを推奨します
- GitHubの商標ガイドラインに注意してください
