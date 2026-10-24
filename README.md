# Kang Ju Yeong · Portfolio

A one-page portfolio. Each activity is one STAGE, and scrolling stops at every stage. Korean/English, light/dark.

## Editing copy
All copy (Korean and English) is in `src/content.ts`. Images are in `src/assets/`.

## Local development
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static output in out/
```

## Deploy
- **GitHub Pages**: pushing to `main` deploys automatically through `.github/workflows/deploy.yml`.
  The first time, set the repo's Settings → Pages → Source to **GitHub Actions**.
- **Vercel (later)**: import the repo and deploy with the default settings.
  The base path is only applied in the GitHub Actions build, so no code change is needed.
