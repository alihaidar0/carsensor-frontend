#!/usr/bin/env bash
# ============================================================
#  post_start.sh — Runs every time the container starts
# ============================================================
set -euo pipefail

cd /workspace

echo "⚛️  React Dev Container — Started"
echo "   Node:  $(node --version)"
echo "   pnpm:  $(pnpm --version)"
echo "   Bun:   $(bun --version 2>/dev/null || echo 'n/a')"
echo "   Git:   $(git --version | cut -d' ' -f3)"
echo "   gh:    $(gh --version 2>/dev/null | head -1 | cut -d' ' -f3 || echo 'n/a')"

git config --global --add safe.directory /workspace 2>/dev/null || true
