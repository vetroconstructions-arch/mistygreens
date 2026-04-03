#!/bin/bash
# ═══════════════════════════════════════════════════
# PARANJAPE FOREST TRAILS — DEPLOY & INDEX AUTOMATION
# Usage: bash scripts/deploy-and-index.sh "commit message"
# ═══════════════════════════════════════════════════

set -e

COMMIT_MSG="${1:-SEO update: content refresh and indexing ping}"

echo "╔══════════════════════════════════════════════════╗"
echo "║  DEPLOY & INDEX AUTOMATION (pSEO Phase 21)       ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

# Step 0: Advanced SEO Hardening (Programmatic Authority)
echo "🛡️ Step 0: Hardening Advanced pSEO Schema..."
node scripts/harden-advanced-schema.js
echo ""

# Step 0.1: Generation & Sitemaps
echo "🗺️ Step 0.1: Generating Sitemaps..."
node scripts/generate-sitemap.js
echo ""

# Step 1: Git commit and push
echo "📦 Step 1: Committing changes..."
cd "$(dirname "$0")/.."
git add -A
git commit -m "$COMMIT_MSG" || echo "  ℹ️  Nothing to commit"
echo ""

# Step 2: Pushing to origin/main (Triggers Cloudflare Build)
echo "🚀 Step 2: Pushing to origin/main..."
git push origin main
echo "  ✅ Push complete"
echo ""

# Step 3: Wait for Cloudflare Edge Propagation
echo "⏳ Step 3: Waiting 3s for Cloudflare propagation..."
sleep 3
echo "  ✅ Ready for indexing"
echo ""

# Step 4: Run indexing ping
echo "🤖 Step 4: Running indexing engine..."
node scripts/google-index-ping.js
echo ""

echo "╔══════════════════════════════════════════════════╗"
echo "║  ✅ DEPLOY + INDEX COMPLETE                      ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""
echo "📋 Next steps:"
echo "  1. Check Google Search Console for new pages"
echo "  2. Run 'URL Inspection' for priority pages"
echo "  3. Monitor indexing status over next 24-48 hours"
