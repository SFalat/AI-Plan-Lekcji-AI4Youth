# AI-Plan-Lekcji-AI4Youth

## Quick Start

1. **Configure:** In the app directory run `pip install bottle bottle-websocket future whichcraft pyinstaller` and in the `web/` directory, run `npm install` or `yarn install`
2. **Demo:** Build static files with `npm run build` or `yarn build`. Then run the application with `python main.py`. A Chrome-app window should open running the built code from `web/dist`
3. **Distribute:** (Run `npm run build` or `yarn build` first) Build a binary distribution with PyInstaller using `python -m eel main.py web/dist --onefile` (See more detailed PyInstaller instructions at bottom of [the main README](https://github.com/ChrisKnott/Eel))
4. **Develop:** Open two prompts. In one, run `python main.py true` and the other, `npm run dev` or `yarn dev`. A browser window should open in your default web browser at: [http://localhost:3000/](http://localhost:3000/). As you make changes to the JavaScript in `src/` the browser will reload. Any changes to `main.py` will require a restart to take effect. You may need to refresh the browser window if it gets out of sync with eel.