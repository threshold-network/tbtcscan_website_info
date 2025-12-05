#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-staging}"

case "$MODE" in
  staging)
    ENDPOINT="https://threshold-api-staging.ops-keep.workers.dev/subgraph/mainnet"
    ;;
  production|prod)
    ENDPOINT="https://api.threshold.network/subgraph/mainnet"
    ;;
  *)
    echo "Usage: $0 [staging|production]" >&2
    exit 1
    ;;
esac

cat > .graphclientrc.yml <<EOF
sources:
  - name: tbtc-mainnet
    handler:
      graphql:
        endpoint: $ENDPOINT
    transforms:
      - autoPagination:
          limitOfRecords: 2000
plugins:
  - pollingLive:
      defaultInterval: 1000
documents:
  - ./src/pages/query.graphql
EOF

echo "Wrote .graphclientrc.yml for $MODE ($ENDPOINT)"
