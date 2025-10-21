# Mozart — macOS desktop player (Electron)

This repository contains a ready-to-upload Electron app that builds a macOS `.dmg` installer via GitHub Actions.

What you get:
- An Electron desktop app named "Mozart" with Spotify-style layout
- Import FLAC/MP3/WAV files and read album art via metadata extraction
- Local library saved in the user's app data folder
- A GitHub Actions workflow that builds a macOS `.dmg` artifact (unsigned by default)

Important:
- I cannot produce signed/notarized macOS binaries from this environment.
- The included GitHub Actions workflow builds an **unsigned** `.dmg` on `macos-latest` and uploads it as an artifact. You can download it directly from the Actions run.
- If you want a signed & notarized .dmg (recommended for smooth Gatekeeper install), you'll need an Apple Developer ID and to add `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD`, and signing cert secrets to the repo (instructions included below).

Quick steps (no coding required):
1. Download this zip and extract.
2. Create a **new GitHub repository** and push these files (instructions below).
3. In GitHub, go to Actions → run the `build-mac.yml` workflow (it runs on push to `main`).
4. After the run completes, download the `.dmg` from the workflow's artifacts and drag it into `/Applications` on your Mac.

If you want, I can now generate this zip file for you (already done). Download link is provided by the assistant output.

