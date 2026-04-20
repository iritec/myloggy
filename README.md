![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Platform: macOS](https://img.shields.io/badge/Platform-macOS-lightgrey)

# myloggy

myloggy is a fully local-first work logging app for macOS. Screenshots, analysis, summaries, settings, and log data stay on your Mac by default, which helps preserve both security and privacy.

## Screenshots

### Day view

![Day view](docs/screenshots/day-view.png)

### Week view

![Week view](docs/screenshots/week-view.png)

### Month view

![Month view](docs/screenshots/month-view.png)

## Features

- Automatic screenshot capture every minute
- AI checkpoint generation with Ollama
- Daily, weekly, and monthly work log views
- Manual editing of work units
- Configurable exclusion rules and Ollama model
- Local storage with SQLite and files on disk

## Requirements

- macOS
- Node.js `20.19+` or `22.12+`
- Ollama
- A local model for analysis
  Example: `ollama pull gemma4:27b`

`pnpm` is not required. If your Node.js version meets the requirement, `npm install` and `npm run dev` are enough. `nodenv exec npm run dev` is also fine if you use nodenv. Use `pnpm` only if you prefer it.

## Quick Start

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

## Download

Prebuilt macOS binaries:
[GitHub Releases](https://github.com/iritec/myloggy/releases)

## Storage

Data is stored under Electron's `userData` directory.

- `myloggy.sqlite`
- `temp-snaps/`

## Contact

For implementation support, AI transformation consulting, or related inquiries:
https://lab.lancers-ai.com/

## License

[MIT](LICENSE)
