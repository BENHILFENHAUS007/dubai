#!/usr/bin/env bash
set -euo pipefail

ANSIBLE_FACTS_JSON="${1:-/opt/ansible/facts/latest.json}"
API_URL="${API_URL:-http://localhost:8080/api/sync-inventory}"
API_USER="${API_USER:-operator}"
API_PASS="${API_PASS:-operator123}"

if [[ ! -f "$ANSIBLE_FACTS_JSON" ]]; then
  echo "Facts file not found: $ANSIBLE_FACTS_JSON" >&2
  exit 1
fi

curl -sS -u "$API_USER:$API_PASS" -X POST "$API_URL" \
  -H 'Content-Type: application/json' \
  -d "{\"factsPath\":\"$ANSIBLE_FACTS_JSON\"}"

echo "Inventory sync triggered successfully"
