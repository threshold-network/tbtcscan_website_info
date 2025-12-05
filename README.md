# tBTC website

Provide insight into the workings of the tBTC systems - deposits, redemptions, who bonds for what, governance actions, etc.

It incorporates work from️:

[@miracle2k](https://github.com/miracle2k): Thanks for his [allthekeep](https://github.com/miracle2k/keep-subgraph) subgraph.

Live at : https://tbtcscan.com/

## Subgraph proxy and codegen

1. Environment files
   - `.env.production` and `.env.staging` define `VITE_SUBGRAPH_PROXY_BASE` plus explicit overrides `VITE_SUBGRAPH_PROXY_MAINNET` / `VITE_SUBGRAPH_PROXY_TESTNET` for each environment.
   - `yarn build` uses `.env.production`; `yarn build:staging` uses `.env.staging`. Local dev can override inline, e.g. `VITE_SUBGRAPH_PROXY_BASE=... yarn start`.

2. Codegen endpoint
   - Graphclient reads its endpoint from `.graphclientrc.yml`; env interpolation was unreliable, so we rewrite that file before codegen/build.
   - Use `scripts/set-graph-endpoint.sh staging|prod` to set `.graphclientrc.yml` to the correct proxy before `yarn codegen`.

3. Common commands (endpoint + codegen + build)
   - `yarn start:staging`: set staging endpoint → `yarn codegen` → `yarn build:staging` → `yarn preview`.
   - `yarn start:prod`: set prod endpoint → `yarn codegen` → `yarn build-prod` → `yarn preview`.
   - `yarn deploy:staging` / `yarn deploy:prod`: set endpoint → `yarn codegen` → build (no preview). Use these for CI or manual deploys.

4. CORS expectations (proxy side)
   - Staging proxy allows `http://localhost:4001` for local preview.
   - Production proxy allows `https://tbtcscan.com` and `https://threshold.network` only.

5. Preflight checklist
   - Confirm you edited the right env file for the target (`.env.production` or `.env.staging`).
   - Run `scripts/set-graph-endpoint.sh staging|prod` (or rely on the commands above) so `.graphclientrc.yml` matches the build target.
   - Run `yarn codegen` after switching endpoints.
   - (Optional) Run `scripts/which-endpoint.sh` to print the active codegen endpoint and current proxy env values.

## Installation

```bash
git clone https://github.com/suntzu93/tbtcv2_website_info.git
cd tbtcv2_website_info
npm install -g yarn
yarn install
yarn codegen

# run in dev mode
yarn start

# run in produce mode
yarn build-prod
yarn preview

# http://localhost:4401
```

``
