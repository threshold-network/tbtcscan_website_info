#!/usr/bin/env bash
set -euo pipefail

if [[ ! -f .graphclientrc.yml ]]; then
  echo ".graphclientrc.yml not found" >&2
  exit 1
fi

ENDPOINT=$(grep -E "^\s*endpoint:" .graphclientrc.yml | head -n1 | awk '{print $2}')

echo ".graphclientrc.yml endpoint: ${ENDPOINT:-"(not found)"}"
echo "VITE_SUBGRAPH_PROXY_BASE=${VITE_SUBGRAPH_PROXY_BASE:-"(unset)"}"
echo "VITE_SUBGRAPH_PROXY_MAINNET=${VITE_SUBGRAPH_PROXY_MAINNET:-"(unset)"}"
echo "VITE_SUBGRAPH_PROXY_TESTNET=${VITE_SUBGRAPH_PROXY_TESTNET:-"(unset)"}"
