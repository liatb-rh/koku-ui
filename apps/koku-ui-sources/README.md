# koku-ui-sources

Sources / Integrations UI for Cost Management on-prem. Migrated from sources-ui; runs as a standalone app in Phase 1 and will integrate as a micro frontend with koku-ui-onprem in Phase 2.

## Tech stack

- TypeScript, React 18, React Router 6, Redux, PatternFly 6
- Mock API layer for development (no backend required)
- Uses `@koku-ui/ui-lib` and `@koku-ui/onprem-cloud-deps` for on-prem stubs

## Scripts

- `npm start` — Dev server at http://localhost:9010
- `npm run build` — Production build to `dist/`
- `npm run clean` — Remove `dist/`

## From repo root

- `npm run start:sources` — Start the sources app dev server

## Mock API

By default the app uses in-app mocks for Sources and Cost Management APIs. Set `USE_MOCK_API=false` to use real backends (and configure proxy in webpack if needed).
