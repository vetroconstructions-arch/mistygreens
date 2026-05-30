#!/bin/bash

# ==============================================================================
# PARANJAPE FOREST TRAILS — PERMANENT OMNIPRESENT INDEXING CRON
# ==============================================================================

# Setup Environment
export PATH=$PATH:/usr/local/bin:/opt/homebrew/bin
cd /Users/vikasyewle/paranjapeplots

# Log file
LOG_FILE="/Users/vikasyewle/paranjapeplots/scratch/cron_indexing.log"

echo "=====================================================" >> $LOG_FILE
echo "Sovereign Sweep Initiated: $(date)" >> $LOG_FILE

# 1. Execute Google Indexing API (Hard-Force)
echo ">> Running Google Indexing Protocol..." >> $LOG_FILE
node scripts/google-indexing-worker.js --force >> $LOG_FILE 2>&1

# 2. Execute IndexNow Protocol (Bing, Yahoo, DuckDuckGo, Yandex)
echo ">> Running IndexNow Protocol..." >> $LOG_FILE
node scripts/index-now-worker.js >> $LOG_FILE 2>&1

# 3. Execute Google Advanced Indexing (Legacy Sitemap Pings)
echo ">> Running Legacy Sitemap Pings..." >> $LOG_FILE
node scripts/google-advanced-indexing.js >> $LOG_FILE 2>&1

# 4. Execute Unified URL Pings
echo ">> Running Unified URL Pings..." >> $LOG_FILE
node scripts/google-index-ping.js >> $LOG_FILE 2>&1

echo "Sovereign Sweep Completed: $(date)" >> $LOG_FILE
echo "=====================================================" >> $LOG_FILE
