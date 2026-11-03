#!/bin/bash

# ==============================================================================
# PARANJAPE FOREST TRAILS — ENTERPRISE MULTI-ENGINE INDEXING PIPELINE
# ==============================================================================

# Setup Environment
export PATH=$PATH:/usr/local/bin:/opt/homebrew/bin
cd /Users/vikasyewle/paranjapeplots

# Log file
LOG_FILE="/Users/vikasyewle/paranjapeplots/scratch/cron_indexing.log"

echo "=====================================================" >> $LOG_FILE
echo "Enterprise Sovereign Sweep Initiated: $(date)" >> $LOG_FILE

# 1. Execute Enterprise Google & Multi-Engine Indexing Suite
echo ">> Running Enterprise Google & Multi-Engine Suite (Batch API + SHA-256 Differential + WebSub + IndexNow)..." >> $LOG_FILE
node scripts/enterprise_google_indexing.js >> $LOG_FILE 2>&1

echo "Enterprise Sovereign Sweep Completed: $(date)" >> $LOG_FILE
echo "=====================================================" >> $LOG_FILE
