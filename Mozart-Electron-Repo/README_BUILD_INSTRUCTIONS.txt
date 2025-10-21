How to get a .dmg (no coding):

1) Create a new GitHub repository (private or public).
2) Unzip this project locally and `git init` / commit, then push to the new repo:
   git remote add origin https://github.com/YOURNAME/mozart.git
   git branch -M main
   git push -u origin main
3) Go to GitHub → Actions → you'll see the "Build macOS .dmg" workflow. Click "Run workflow" or push a commit.
4) When the workflow completes, open the run and download the artifact `mozart-mac-dmg`.
5) Downloaded `.dmg` is unsigned. On macOS, you may need to right-click the app and choose "Open" once to bypass Gatekeeper.

Optional: If you want signed & notarized .dmg (recommended):
- Enroll in Apple Developer Program.
- Add APPLE_ID and APPLE_APP_SPECIFIC_PASSWORD as GitHub repo secrets.
- Add your code signing certificate to the macOS runner or use Electron Builder's notarize config.
