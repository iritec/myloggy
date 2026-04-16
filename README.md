![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Platform: macOS](https://img.shields.io/badge/Platform-macOS-lightgrey)

# Myloggy

A local-first work logging app for macOS. Captures screenshots every minute, generates AI-powered checkpoints every 10 minutes via Ollama, and organizes your work into daily / weekly / monthly views.

<!-- screenshot -->

## Features

- Automatic screenshot capture (1-min interval, multi-display support)
- AI checkpoint generation using Ollama (e.g. `gemma3:27b`)
- Cursor position tracking as an attention signal for the LLM
- Work unit aggregation from checkpoints
- Daily timeline, weekly summary, monthly calendar
- Recording ON/OFF toggle
- Configurable Ollama model and exclusion rules
- Manual editing of work units
- All data stays local (SQLite + filesystem)

## Requirements

- **macOS** (uses native `screencapture` / `osascript`)
- **Node.js** 20.19+ or 22.12+
- **pnpm**
- **Ollama** running locally with a model pulled (e.g. `ollama pull gemma3:27b`)

## Quick Start

```bash
git clone https://github.com/iritec/myloggy.git
cd myloggy
pnpm install
pnpm dev
```

On first launch, grant **Screen Recording** and **Accessibility** permissions to Electron when prompted.

## Build

```bash
APPLE_KEYCHAIN_PROFILE=<your-profile> pnpm dist:mac:prod
```

The notarization flow uses `xcrun notarytool` with a keychain profile, matching the setup used in `personal_assistant` and `multi_agent`.

If you have not stored a profile yet:

```bash
xcrun notarytool store-credentials "<your-profile>" \
  --apple-id "<apple-id-email>" \
  --team-id "<team-id>" \
  --password "<app-specific-password>"
```

## Download

Pre-built binaries are available on the [Releases](https://github.com/iritec/myloggy/releases) page.

## CI / Release

Pushing a version tag, or running the workflow manually, builds signed + notarized macOS artifacts for both Apple Silicon and Intel and uploads `.dmg` / `.zip` files to GitHub Releases.

```bash
git tag v0.1.0
git push origin v0.1.0
```

### Required GitHub Secrets

| Secret | Description |
|---|---|
| `CERTIFICATE_P12_BASE64` | Base64-encoded Apple Developer certificate (.p12) |
| `CERTIFICATE_PASSWORD` | Password for the .p12 file |
| `APPLE_ID` | Apple Developer account email |
| `APPLE_APP_SPECIFIC_PASSWORD` | App-specific password (generated at appleid.apple.com) |
| `APPLE_TEAM_ID` | Apple Developer Team ID |

Locally, `pnpm dist:mac:prod` now runs a preflight check and fails fast unless exactly one notarization method is configured and code signing credentials are present.

## Data Storage

All data is stored under Electron's `userData` directory:

- `myloggy.sqlite` - work log database
- `temp-snaps/` - temporary screenshots (deleted after checkpoint generation)

## Troubleshooting

### `Cannot find module @rollup/rollup-darwin-x64` / `darwin-arm64`

Architecture mismatch between the shell that ran `pnpm install` and the one running `pnpm dev`. Fix:

```bash
arch -arm64 zsh
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

## License

[MIT](LICENSE)
