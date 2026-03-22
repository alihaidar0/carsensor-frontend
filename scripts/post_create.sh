#!/usr/bin/env bash
# ============================================================
#  post_create.sh — Runs ONCE after container is first created
#
#  This script:
#    1. Configures git (safe directory + identity)
#    2. Installs Husky git hooks
#    3. Copies .env.example → .env
#    4. Prints the full React project scaffold guide
#
#  The container is a blank canvas — no React project exists yet.
#  Follow the printed guide to scaffold your project.
# ============================================================
set -euo pipefail

cd /workspace

echo ""
echo "════════════════════════════════════════════════════════"
echo "  ⚛️  React Dev Container — Ready"
echo "════════════════════════════════════════════════════════"

# ── Git safe directory ────────────────────────────────────────
git config --global --add safe.directory /workspace 2>/dev/null || true
git config --local core.autocrlf false 2>/dev/null || true
echo "✅ Git configured"

# ── Husky git hooks ───────────────────────────────────────────
if [ -f "package.json" ]; then
  echo "📦 Installing git hooks..."
  pnpm install --silent
  echo "✅ Git hooks ready"
fi

# ── Copy .env if missing ─────────────────────────────────────
if [ ! -f ".env" ] && [ -f ".env.example" ]; then
  cp .env.example .env
  echo "📋 Created .env from .env.example"
fi

echo ""
echo "════════════════════════════════════════════════════════"
echo "  🚀 Scaffold your React project:"
echo ""
echo "  ── Step 1: Scaffold with Vite ──────────────────────"
echo "  pnpm create vite@latest . --template react-ts"
echo ""
echo "  ── Step 2: Install base dependencies ───────────────"
echo "  pnpm install"
echo ""
echo "  ── Step 3: Add the modern 2026 stack ───────────────"
echo ""
echo "  # Routing"
echo "  pnpm add react-router-dom"
echo ""
echo "  # Server state"
echo "  pnpm add @tanstack/react-query @tanstack/react-query-devtools"
echo ""
echo "  # Client state"
echo "  pnpm add zustand"
echo ""
echo "  # Forms + validation"
echo "  pnpm add react-hook-form @hookform/resolvers zod"
echo ""
echo "  # HTTP client"
echo "  pnpm add axios"
echo ""
echo "  # Styling"
echo "  pnpm add -D tailwindcss @tailwindcss/vite"
echo "  pnpm add class-variance-authority clsx tailwind-merge lucide-react"
echo ""
echo "  # Testing"
echo "  pnpm add -D vitest @testing-library/react @testing-library/user-event"
echo "  pnpm add -D @testing-library/jest-dom @vitest/coverage-v8 @vitest/ui jsdom"
echo "  pnpm add -D @playwright/test"
echo ""
echo "  # Code quality"
echo "  pnpm add -D @biomejs/biome knip"
echo ""
echo "  ── Step 4: Update vite.config.ts ───────────────────"
echo "  Add: host: '0.0.0.0' and watch: { usePolling: true }"
echo "  (Required for Docker port forwarding + HMR on Windows)"
echo ""
echo "  ── Step 5: Start dev server ─────────────────────────"
echo "  pnpm dev"
echo "  # → http://localhost:5173"
echo ""
echo "  See README.md for the full setup guide."
echo "════════════════════════════════════════════════════════"
