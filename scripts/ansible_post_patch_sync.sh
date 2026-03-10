#!/usr/bin/env bash
set -euo pipefail

API_URL="${API_URL:-http://localhost:8000/api/sync-inventory}"
API_TOKEN="${API_TOKEN:-operator}"

curl -sS -X POST "$API_URL" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H 'Content-Type: application/json'

echo "Inventory sync triggered"
