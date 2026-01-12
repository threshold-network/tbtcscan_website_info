#!/usr/bin/env bash
set -euo pipefail

# Deploy the built site to Cloudflare Workers via Wrangler.
# Usage: scripts/deploy-cloudflare.sh [staging|prod]

MODE="${1:-prod}"

case "$MODE" in
  staging)
    BUILD_CMD="yarn build:staging"
    ;;
  prod|production)
    BUILD_CMD="yarn build-prod"
    ;;
  *)
    echo "Usage: $0 [staging|prod]" >&2
    exit 1
    ;;
esac

./scripts/set-graph-endpoint.sh "$MODE"
yarn codegen
$BUILD_CMD

# Wrangler uses wrangler.jsonc (assets.dir=./dist, binding=ASSETS, main=worker.js)
npx wrangler deploy
