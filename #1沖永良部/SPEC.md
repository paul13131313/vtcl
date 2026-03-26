# VERTICAL MAGAZINE vol.1 — SPEC.md

## 概要
縦スクロール型Webマガジン。写真・文章・動画・音声がシームレスに一体化。
1号目テーマ: **沖永良部**

## Figmaデザイン
https://www.figma.com/design/fMg2FABsHjngWgbyNf5nPl/Untitled?node-id=0-1&m=dev&t=0MOh7BvUqlcgejrP-1

## 技術スタック
- Next.js (App Router) + TypeScript + Tailwind CSS
- デプロイ: Vercel
- フレーム幅: 393px（モバイルファースト）
- OGP: `public/og.png` 静的配置（Python・Pillow・Canvas禁止）

## リポジトリ
- 名前: `VTCL`
- 開発ディレクトリ: `~/naganohiroshi/dev/VTCL`
- 素材ディレクトリ: `~/naganohiroshi/dev/VTCL/#1沖永良部/photo/`

## ページ構成（上から順に1ページ縦スクロール）

### 1. Cover（表紙）
- **cover-photo**: 全面背景写真（海と岩場）
- **cover-title**: 「VTCL」大文字タイポグラフィ（白・セリフ体）
- **cover-subtitle**: 「Vertical Magazine」（白・小さめ）
- **cover-number**: 「No.1」
- **cover-year**: 「2026」
- **cover-theme**: 「沖永良部」縦書き（白・大きめ明朝体）
- 実装: `writing-mode: vertical-rl` で縦書き

### 2. Wave Divider（波線トランジション）
- **wave-divider**: 表紙と記事セクションの境目
- 実装: SVGの`<path>`で波線を描画、fill白

### 3. Hero Photo（メイン写真）
- **hero-photo**: 2つの円を結合した形にクリッピングした人物写真
- 実装: CSS `clip-path` またはSVG `<clipPath>` で実現

### 4. Article（記事）
- **article-heading**: 「4年ぶり3回目」（太字・大きめ）
- **article-body**: 本文テキスト（箱組・両端揃え）
- フォント: Noto Serif JP（見出し）/ Noto Sans JP（本文）
- 本文サイズ: 14-16px、行間: 1.6-1.8倍
- 左右余白: 24-32px

### 5. Spot Sections（スポット紹介）
各スポットは写真+キャプションのセット。上から順に:

| レイヤー名 | スポット名 | 写真ファイル |
|-----------|-----------|------------|
| photo-fucha / caption-fucha | フーチャ | oke-257 |
| photo-koshiyama / caption-koshiyama | 越山展望所 | oke-127 |
| photo-beach / caption-beach | ひみつのビーチ | oke-58 |
| photo-taminamisaki / caption-taminamisaki | 田皆岬 | oke-47 |
| — / アーニマガヤトゥール墓 | アーニマガヤトゥール墓 | oke-162 |

### 6. Gallery Scroll（横スクロールギャラリー）
- **gallery-scroll**: 複数の写真が横スクロールで流れる
- 実装: `overflow-x: auto` + `scroll-snap-type: x mandatory`
- サムネイルタップで拡大表示（Lightbox）

### 7. Video Embed（動画埋め込み）
- **video-embed**: 沖永良部の映像
- 実装: `<video>` タグ、autoplay, muted, loop, playsinline
- モバイルでの自動再生のため `muted` 必須
- ユーザータップで音声ON切り替え

### 8. Audio Player（あるくラジオ）※将来追加
- 音声コンテンツ用カスタムプレーヤー
- 実装: `<audio>` + カスタムUI（再生/停止、プログレスバー、時間表示）

### 9. Footer
- 「お気に入り → ホーム画面に追加して通知オンにすると新作が届きます」
- PWA対応（manifest.json + Service Worker）
- 将来的にWeb Push通知

## デザイン仕様

### カラー
- 背景: #FFFFFF（白）
- テキスト: #000000（黒）/ #FFFFFF（白・写真上）
- アクセント: Figmaデザインに準拠

### タイポグラフィ
- 見出し: Noto Serif JP, Bold
- 本文: Noto Sans JP, Regular, 14-16px
- キャプション: Noto Sans JP, 12-14px
- 縦書き: `writing-mode: vertical-rl; text-orientation: mixed;`

### レイアウト
- max-width: 393px, margin: 0 auto（PC表示時は中央寄せ）
- 本文左右パディング: 24-32px
- セクション間余白: 48-64px

## 素材ファイル
- 写真素材: `#1沖永良部/photo/` に格納済み → ビルド時に `public/images/` へコピー
- 動画: `/public/videos/` に配置
- 音声: `/public/audio/` に配置（将来）

## CC用セットアップコマンド

```bash
cd ~/naganohiroshi/dev
npx create-next-app@latest VTCL --typescript --tailwind --app --src-dir --use-npm
cd VTCL

# 素材を public にコピー
cp -r "#1沖永良部/photo" public/images
mkdir -p public/videos public/audio

# 開発サーバー起動
npm run dev
```

## CC用Figma MCP接続コマンド

```bash
# Figma MCPプラグインインストール
claude plugin install figma@claude-plugins-official

# MCP接続確認
/mcp

# デザイン読み取り指示例
# 「このFigmaリンクのデザインをNext.jsで実装して」
# https://www.figma.com/design/fMg2FABsHjngWgbyNf5nPl/Untitled?node-id=0-1&m=dev
```

## Vercelデプロイ

```bash
cd ~/naganohiroshi/dev/VTCL
npx vercel --prod
```

## 禁止事項
- Python・Pillow・Canvas によるOGP動的生成禁止
- APIキーのフロント露出禁止
- `web_fetch` でのデータ取得禁止（curl + パイプを使う）

## スケジュール
- 3/21-24: 撮影 ✅
- 3/25-31: Figmaデザイン ✅
- 4/1-6: 実装（CC）
- 4/7〜: 公開
