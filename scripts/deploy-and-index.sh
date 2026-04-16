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

# Step 0: Sovereign Mastery Hardening (Architectural Integrity)
echo "🛡️ Step 0: Running Sovereign Mastery Engine..."
node scripts/sovereign-mastery-engine.js
node scripts/harden-cluster-seo.js
node scripts/harden-faq-matrix.js
echo ""

# Step 0.1: Generation & Sitemaps
echo "🗺️ Step 0.1: Generating fresh Sitemaps & Search Index..."
node scripts/generate-sitemap.js
node scripts/generate-search-index.js
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

# Step 4: Run Hard-Force Indexing Engine (Stage 51)
echo "🤖 Step 4: Running Hard-Force Indexing Suite..."
node scripts/google-indexing-worker.js || echo "  ⚠️  Google Indexing API skipped (Missing service-account.json)"
node scripts/index-now-worker.js || echo "  ⚠️  IndexNow skipped"
echo ""

echo "╔══════════════════════════════════════════════════╗"
echo "║  ✅ DEPLOY + INDEX COMPLETE                      ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""
echo "📋 Next steps:"
echo "  1. Check Google Search Console for new pages"
echo "  2. Run 'URL Inspection' for priority pages"
echo "  3. Monitor indexing status over next 24-48 hours"
