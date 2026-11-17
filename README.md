# GloSpot - AI Sports Talent Assessment PWA

GloSpot is a prototype platform for spotting sports talent from simple fitness tests. Athletes use a
mobile-first Progressive Web App to upload a video of a test (vertical jump, push-ups, squats/sit-ups,
height); a Python/Flask backend analyses the video with MediaPipe pose estimation and OpenCV, stores
the result in SQLite and serves per-test leaderboards. Separate static pages mock up the coach and
government (SAI talent-scouting) side of the workflow.

> **Status: prototype.** The Python pose-processing packages that the backends import
> (`squat_detection/`, `pushup_detection/`, `height_detection/`, `vertical_jump/`) and the PWA's
> `icons/` folder are **not in this repository**, so the backend will not start and the PWA icons /
> service-worker cache will fail until they are added. See [Known limitations](#known-limitations).

## Features

**Athlete PWA (`index.html` + `app.js`)**
- Onboarding, sign-up (profile: age, gender, location, sports, level, organisation, consent options)
  and sign-in. Accounts are stored in the browser's `localStorage` only; sign-in does not check a password.
- Home dashboard, "All Tests" list and profile, with bottom navigation (Home / All Tests / Profile).
- **Video-analysed tests** (upload a video → backend → result → save to leaderboard):
  - Standing vertical jump (jump height and related metrics; CSV export on the standalone backend)
  - Push-ups (rep counter)
  - Squats: total, correct and incorrect reps with an accuracy percentage (reached from the
    "Sit-ups" card, which currently uses the squat upload/analysis flow)
  - Height (median/average height in cm and ft from a standing video)
- Leaderboards per test (vertical jump, squats, height, push-ups) plus an overall view, loaded from the backend.
- Pages for progress dashboard, achievements, personal bests, training recommendations, social
  sharing and test instructions, driven by local mock/progress data.
- Pages exist for weight, sit-and-reach, standing broad jump, medicine-ball throw, 30 m sprint,
  4×10 m shuttle run, 800 m and 1.6 km run, but their start/save handlers are not implemented yet.
- PWA: `manifest.json` (installable, standalone, portrait) and a service worker (`sw.js`) that
  caches the app shell and handles push notifications.

**Other pages (static HTML/CSS/JS, hard-coded demo data, no backend calls)**
- `homepage.html` - marketing/landing page linking to coach and government onboarding
- `coach-onboarding.html` → `coach-dashboard.html` - coach registration and athlete-management dashboard
- `government-onboarding.html` → `government-dashboard.html` - SAI national talent-scouting dashboard
- `demo-workflow.html` / `workflow-diagram.txt` - athlete → coach → government demo walkthrough

## Tech stack

- **Frontend:** HTML5, CSS3, vanilla JavaScript (no build step), Web App Manifest + Service Worker;
  Font Awesome and Google Fonts (Inter) from CDNs on the landing/coach/government pages
- **Backend:** Python, Flask 2.3 + Flask-CORS, OpenCV, MediaPipe 0.10, NumPy, Pillow
- **Storage:** SQLite (one database file per test) on the server; `localStorage` in the browser
- **Prototype:** `Pushup_Counter.ipynb`, a Colab notebook counting push-ups with MediaPipe pose angles

## Project structure

```
index.html, app.js, styles.css   athlete PWA (single-page app; app.js renders every page)
manifest.json, sw.js             PWA manifest and service worker (expects an icons/ folder - missing)
favicon.ico
homepage.*                       landing page
coach-onboarding.*, coach-dashboard.*            coach portal mock-up (demo data)
government-onboarding.*, government-dashboard.*  government/SAI portal mock-up (demo data)
demo-workflow.html, workflow-diagram.txt         demo walkthrough

api_server.py                    unified Flask API for all four tests, port 5001 (used by the PWA)
vertical_jump_backend.py         standalone vertical-jump API (port 5001; port 5000 via its start script)
squat_backend.py                 standalone squat API (port 5002)
height_backend.py                standalone height API (port 5003)
pushup_backend.py                standalone push-up API (port 5004)
*_database.py                    SQLite wrappers (results + leaderboard queries) for each test
start_*_backend.py               helper scripts: install requirements, create folders, start a backend
server.py                        static file server for the PWA on port 8080 (no-cache headers)
requirements.txt                 unified backend dependencies
*_requirements.txt               per-backend dependencies
test_integration.py, test_vertical_jump_integration.py   smoke tests against running servers
minimal-test.html, simple-mediapipe-test.html, test-mediapipe.html, test-cdns.html
                                 browser experiments loading MediaPipe Tasks Vision from CDNs
api-config.js                    alternative API-URL config (not loaded by index.html)
*.md (other than this file)      development notes/status logs from the build
Pushup_Counter.ipynb             MediaPipe push-up counter notebook (prototype)
```

## Getting started

### Prerequisites

- A modern browser (Chrome/Edge recommended for PWA install)
- Python 3 for the static server. For the backend, Python 3.8-3.11 is the safe range, because
  `requirements.txt` pins `mediapipe==0.10.7` and `numpy==1.24.3`, which have no wheels for newer Pythons.
- The missing processor packages (`squat_detection/`, `pushup_detection/`, `height_detection/`,
  `vertical_jump/`) placed next to `api_server.py`. Without them every backend fails at import.

### Run the frontend only

```bash
python server.py        # serves the repo at http://localhost:8080 and opens a browser
```

Then open `http://localhost:8080` (athlete PWA) or `http://localhost:8080/homepage.html` (landing page).
Opening `index.html` directly from disk also renders the UI, but the service worker needs
`http://localhost` or HTTPS. Without the backend, uploads and leaderboards show errors/empty lists.

### Run the backend (once the processor packages are present)

```bash
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
python api_server.py              # unified API on http://localhost:5001
```

Keep `python server.py` running in a second terminal. When the PWA is opened from `localhost` /
`127.0.0.1`, `app.js` sends every request to `http://localhost:5001`; on any other host it uses the
page's own origin (`window.location.origin`), so the API must be served from the same domain.

The standalone backends (`squat_backend.py`, `height_backend.py`, `pushup_backend.py`,
`vertical_jump_backend.py`, or their `start_*_backend.py` helpers) are alternatives to
`api_server.py`; the PWA is wired only to port 5001.

### Configuration

There are no API keys or `.env` files. Settings are hard-coded:

| Setting | Where | Value |
|---|---|---|
| Frontend port | `server.py` | 8080 |
| Unified API port | `api_server.py` | 5001 (`debug=True`, host `0.0.0.0`) |
| API base URL | `app.js` → `getApiConfig()` | `http://localhost:5001` on localhost, otherwise the page origin |
| Upload folder / max size | `api_server.py` | `uploads/`, 100 MB; `mp4`, `mov`, `avi`, `mkv` |
| `VERCEL` (env var, optional) | `*_database.py` | If set, SQLite files go to `/tmp/` instead of the working directory |

### Tests

There is no unit-test suite. With both servers running:

```bash
pip install requests
python test_integration.py                 # health checks for backend (5001) and frontend (8080)
python test_vertical_jump_integration.py   # vertical-jump upload/leaderboard smoke test
```

## How it works

```
Athlete PWA (app.js)  ──upload video (multipart)──►  Flask api_server.py :5001
        │                                              │  save to uploads/
        │                                              │  <Test>Processor (MediaPipe + OpenCV) → metrics
        │◄──────────────── JSON result ────────────────┘
        │──save result──► /api/save-<test>-result ──► SQLite (<test>_results.db)
        │──leaderboard──► /api/<test>-leaderboard  ◄── SQLite
        └── user profile, progress and results also kept in localStorage
```

Main endpoints in `api_server.py`: `GET /api/health`; `POST /api/upload-video` (vertical jump),
`/api/upload-squat-video`, `/api/upload-height-video`, `/api/upload-pushup-video`;
`POST /api/save-vertical-jump-result`, `/api/save-squat-result`, `/api/save-height-result`,
`/api/save-pushup-result`; `GET /api/vertical-jump-leaderboard`, `/api/squat-leaderboard`,
`/api/height-leaderboard`, `/api/pushup-leaderboard`. Any other path falls back to `index.html`.

## Known limitations

- **Backend cannot start from this repo alone:** the `*_detection/` and `vertical_jump/` processor
  packages imported by every backend are not committed.
- **`icons/` is missing:** the manifest and `index.html` reference `icons/icon-*.png`, and `sw.js`
  pre-caches them with `cache.addAll`, so service-worker installation (offline mode) fails until they exist.
- Authentication is a placeholder: sign-in stores a "Test User" with the entered email; nothing is verified.
- `app.js` calls `/api/user/sync` and `/api/user/data` for cloud sync, which no backend implements (it
  falls back to `localStorage` silently).
- Several test pages (weight, sit-and-reach, broad jump, throws, runs) call handler methods that do
  not exist yet; the "Sit-ups" page reuses the squat analysis.
- Coach and government dashboards show hard-coded sample data and placeholder avatars.
- The Flask servers run with `debug=True` and CORS open to all origins: development use only.

## Credits

- `Pushup_Counter.ipynb` carries an "Open in Colab" badge pointing to the `Hrithik-Nigam/Pushup-Counter` repository.
- The vertical-jump analysis is described in [VERTICAL_JUMP_README.md](VERTICAL_JUMP_README.md) as
  integrated from the VertMeasure project.

No license file is included in this repository.
