#!/usr/bin/env node
/**
 * Sovereign Ledger Sync (Phase 12.2)
 * Synchronizes Technical Ledger data from MD to HTML.
 */
const fs = require('fs');
const path = require('path');

const LEDGER_PATH = '/Users/vikasyewle/.gemini/antigravity/brain/ebfdb84e-4a87-409d-9cc0-7ac11765f024/township_intelligence_ledger.md';
const INDEX_PATH = path.join(__dirname, '../index.html');

function syncLedger() {
    console.log("🔄 Starting Technical Ledger Synchronization...");

    if (!fs.existsSync(LEDGER_PATH)) {
        console.error("❌ Ledger file not found at:", LEDGER_PATH);
        return;
    }

    const ledgerContent = fs.readFileSync(LEDGER_PATH, 'utf-8');
    const indexContent = fs.readFileSync(INDEX_PATH, 'utf-8');

    // Parse Technicals (List items with RERA)
    const clusters = {};
    const lines = ledgerContent.split('\n');
    lines.forEach(line => {
        if (line.includes('RERA P52')) {
            const match = line.match(/-\s*\*\*([^*]+)\*\*:\s*RERA\s+(P52\d+)\s*\|?\s*([^|]*)\|?\s*(.*)/);
            if (match) {
                const name = match[1].trim();
                clusters[name] = {
                    rera: match[2].trim(),
                    possession: match[3] ? match[3].trim() : 'Contact for Details',
                    status: match[4] ? match[4].trim() : 'Booking Open'
                };
            }
        }
    });

    // Handle name aliases for the interactive map
    if (clusters['Everglades II']) {
        clusters['Alpha'] = clusters['Everglades II'];
        clusters['Everglades II'] = clusters['Everglades II']; // Keep both
    }
    if (clusters['Highgardens']) clusters['Highgarden'] = clusters['Highgardens'];

    console.log(`📊 Found ${Object.keys(clusters).length} clusters in ledger.`);

    let updatedIndex = indexContent;

    // Update index.html SVG paths
    // Search for paths/circles with data-title="Cluster Name"
    for (const [name, data] of Object.entries(clusters)) {
        const regex = new RegExp(`(data-title="${name}"[^>]*data-ledger=')({[^'}]*})(')`, 'g');
        const newData = JSON.stringify({
            rera: data.rera,
            possession: data.possession,
            status: data.status
        });
        
        if (updatedIndex.match(regex)) {
            updatedIndex = updatedIndex.replace(regex, `$1${newData}$3`);
            console.log(`✅ Synced: ${name}`);
        }
    }

    fs.writeFileSync(INDEX_PATH, updatedIndex, 'utf-8');
    console.log("✨ Master Plan HTML Synchronized Successfully.");
}

syncLedger();
