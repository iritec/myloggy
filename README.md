![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Platform: macOS](https://img.shields.io/badge/Platform-macOS-lightgrey)

# myloggy

myloggyは、macOS向けの完全ローカルで動作する作業ログアプリです。
スクリーンショット、解析、要約、設定、ログデータは基本的にMac内で完結するため、セキュリティとプライバシーを保ったまま作業記録を残せます。

<img width="2982" height="1890" alt="SCR-20260416-nhlt" src="https://github.com/user-attachments/assets/4b05d3e4-f40e-4baf-87bb-f430e7cf6dda" />

デモ動画:
https://www.youtube.com/watch?v=SQV6KOFrfIE

### 特徴

- 1分ごとの自動スクリーンショット記録
- Ollama（Gemma4） を使った AI チェックポイント生成
- 日次 / 週次 / 月次での作業ログ整理
- 除外ルールや Ollama モデルの設定
- 保存データはローカルファイルと SQLite に保持

### 必要なもの

- macOS
- Node.js `20.19+` または `22.12+`
- Ollama
- 解析に使うローカルモデル
  例: `ollama pull gemma4:27b`

### 使い方

```bash
git clone https://github.com/iritec/myloggy.git
cd myloggy
npm install
npm run dev
```

初回起動時は、Electron に対して **Screen Recording** と **Accessibility** の権限を許可してください。

### ダウンロード

macOS 向けの配布版:
[GitHub Releases](https://github.com/iritec/myloggy/releases)

### 保存場所

データは Electron の `userData` 配下に保存されます。

- `myloggy.sqlite`
- `temp-snaps/`

## Contact

導入相談、AX コンサルティング、運用支援などのお問い合わせはこちらまで。
https://lab.lancers-ai.com/

## English

myloggy is a fully local-first work logging app for macOS. Screenshots, analysis, summaries, settings, and log data stay on your Mac by default, which helps preserve both security and privacy.

### Features

- Automatic screenshot capture every minute
- AI checkpoint generation with Ollama
- Daily, weekly, and monthly work log views
- Manual editing of work units
- Configurable exclusion rules and Ollama model
- Local storage with SQLite and files on disk

### Requirements

- macOS
- Node.js `20.19+` or `22.12+`
- Ollama
- A local model for analysis
  Example: `ollama pull gemma4:27b`

`pnpm` is not required. If your Node.js version meets the requirement, `npm install` and `npm run dev` are enough. `nodenv exec npm run dev` is also fine if you use nodenv. Use `pnpm` only if you prefer it.

### Quick Start

```bash
git clone https://github.com/iritec/myloggy.git
cd myloggy
npm install
npm run dev
```

If you prefer `pnpm`:

```bash
pnpm install
pnpm dev
```

On first launch, allow **Screen Recording** and **Accessibility** permissions for Electron.

### Download

Prebuilt macOS binaries:
[GitHub Releases](https://github.com/iritec/myloggy/releases)

## License

[MIT](LICENSE)
