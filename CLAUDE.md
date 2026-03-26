@AGENTS.md

# VTCL — 縦型Webマガジン プロジェクトメモ

## 概要
- 縦スクロール型Webマガジン。写真・文章・動画がシームレスに一体化
- Next.js + Tailwind CSS + Vercel デプロイ
- URL: https://vtcl.vercel.app
- 号ごとにページを分けて運用（/1, /2, /3...）

## フォルダ構造（重要）
```
src/app/
  page.tsx           ← トップ（最新号へリダイレクト）
  1/page.tsx         ← #1 沖永良部
  2/page.tsx         ← #2（将来）
  layout.tsx         ← 共通レイアウト（フォント読み込み等）
  globals.css        ← 共通CSS

public/
  images/
    1-okinoerabu/    ← #1の画像（44枚）
    2-xxx/           ← #2の画像（将来）
  videos/            ← 動画（.gitignore済み、Vercelにデプロイされない）
  favicon.png        ← 共通
  apple-touch-icon.png
  icon-192.png / icon-512.png
  manifest.json
```

## 新しい号を作るとき
1. `public/images/N-テーマ名/` フォルダを作成
2. `src/app/N/page.tsx` を作成（#1のpage.tsxをコピーして編集）
3. `src/app/page.tsx` のリダイレクト先を最新号に変更
4. 画像パスは `/images/N-テーマ名/ファイル名` で参照

## デプロイ
- Vercel: GitHub push で自動デプロイ
- 動画はYouTube限定公開で埋め込み（Vercelの容量制限回避）

---

## ⚠️ 過去に何度も修正した問題（次回は絶対に最初から正しく実装すること）

### 1. 編集後記の波の上の「青い線」問題（6回以上修正）

**症状**: 白背景セクションと青背景（#77DBF1）の波形トランジションの境界に、1pxの青い横線が表示される。

**失敗したアプローチ**:
- ❌ SVG要素を別セクションに配置 → HTML要素の境界でサブピクセルのギャップ発生
- ❌ SVGを青セクション内に配置して白パスを描画 → 同じ問題
- ❌ SVG内にrect+pathで両色描画 → デスクトップでは消えたがiOS Safariで再発
- ❌ absoluteで波SVGを青divの上に重ねる → 波が表示されない
- ❌ overflow:visibleでSVGをはみ出させる → iOSで効かない

**正解（CSS background-image方式）**:
```jsx
<div style={{
  background: `#77DBF1 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 393 40' preserveAspectRatio='none'%3E%3Cpath d='M0 40C20 12 50 2 80 10C110 18 130 32 160 28C190 24 210 8 240 4C270 0 300 12 330 22C355 30 375 20 393 26V0H0Z' fill='white'/%3E%3C/svg%3E") top center/100% 40px no-repeat`,
  paddingTop: 80,
  paddingBottom: 56
}}>
```
**なぜこれが正解か**: 波がCSS background-imageなので、HTML要素の境界が存在しない。サブピクセルレンダリングの差異が発生する余地がない。

**教訓**: 色の異なるセクション間のSVG波形トランジションは、SVG要素ではなくCSS background-imageで実装する。

### 2. えらぶメシの波も同じ問題（SVG rect+path方式で解決済み）

えらぶメシセクションの波は、SVG内にrectとpathの両方を描画する方式で解決している。この方式もiOS Safariで機能した。ただし編集後記ではなぜか効かなかったため、CSS background-image方式が最も確実。

### 3. テキストの左右余白バランス問題（複数回修正）

**症状**: 日本語テキストが左に寄って見え、右の余白が大きく感じる。

**原因**: paddingの数値が同じでも、日本語の全角文字は視覚的に左寄りに見える。

**対処法**: 左右paddingを同じ値にせず、右を少し狭くする（例: left: 40px, right: 36px）。毎回実機で確認すること。

### 4. VTCLロゴ周辺の余白バランス

- VTCL、2026/4、No.1/Vertical Magazine は1つのグループとして左右余白を統一
- 小文字（2026, 4, No.1, Vertical Magazine）はVTCLの文字幅に合わせてパーセント指定（6.5%）

### 5. カバー写真の右端が切れる問題

- `object-position: center` では右側が切れる場合がある
- 写真の被写体に合わせて `object-position` を微調整（例: `65% center`）

### 6. 動画埋め込みの変遷

- ❌ Google Drive iframe → サムネが縦に圧縮されて醜い
- ❌ Google Drive直接URL(<video>タグ) → 361MBは直接ダウンロード不可
- ❌ ポスター画像+Drive iframe → タップ3回必要
- ❌ Driveリンクで新タブ → ページ外に飛んでしまう
- ✅ YouTube限定公開 + iframe埋め込み → 綺麗で1タップ再生

### 7. 初回ズーム問題

- `viewport` の `maximumScale: 1, userScalable: false` で解決
- layout.tsxの `export const viewport` で設定

### 8. section2の画像テキスト

- コード内のHTML/CSSテキストでは画像との重なりの制御が困難
- 最終的にFigmaで画像として書き出して使用（section2.png）

---

## デザイン仕様メモ

### フォント
- 見出し: `Liu Jian Mao Cao`（font-baoli クラス）
- 本文: `Noto Sans JP` 300 weight
- 欧文混在: `Balthazar` + `Noto Sans JP`
- カバー: `Imbue`（VTCL）

### 色
- メイン水色: `#77DBF1`
- 本文: `#333`
- 背景: `#fff` / `#000`（映像セクション）

### 本文テキストスタイル
```js
const bodyText = {
  fontFamily: "'Noto Sans JP', sans-serif",
  fontSize: 16,
  fontWeight: 300,
  lineHeight: "2.57em",
  color: "#333",
};
```

### 横スクロールギャラリーのスタイル
- `display: flex`, `overflowX: auto`, `scrollSnapType: x mandatory`
- 各写真: `scrollSnapAlign: start`, `flex: 0 0 85%`
- キャプション: 上部にフロート表示

### 名所めぐりカラードット
地図のピンと写真キャプションの色を対応させる:
- 国頭小学校のガジュマル: `#4ADE80`（緑）
- フーチャ: `#F43F5E`（ピンク）
- 越山展望所: `#A855F7`（紫）
- ひみつのビーチ: `#3B82F6`（青）
- 田皆岬: `#22D3EE`（シアン）
- アーニマガヤトゥール墓: `#F59E0B`（オレンジ）
