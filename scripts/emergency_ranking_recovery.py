#!/usr/bin/env python3
"""
EMERGENCY RANKING RECOVERY SCRIPT
===================================
Fixes two ranking-killer bugs introduced by inject_performance.py:

Bug 1: Empty <style id="critical-css"></style> blocks
  - inject_performance.py checked '<style>' not in content[:500]
  - Many pages had existing <style> blocks, so critical CSS wasn't written
  - Result: async stylesheet + empty inline style = pages load with ZERO styling
  - Fix: revert CSS from async media="print" back to normal blocking <link rel="stylesheet">
  - Keep: <link rel="preload" as="style"> for performance hint (safe)
  - Keep: dns-prefetch (harmless)
  - Remove: empty <style id="critical-css"> blocks

Bug 2: /styles/cluster-dominance.css 404
  - Non-existent CSS file referenced on 26 pages
  - Every page load makes a failed network request
  - Fix: remove the reference entirely
"""
import os, re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

stats = {
    'async_reverted': 0,
    'empty_style_removed': 0,
    'broken_css_removed': 0,
    'files_modified': 0,
}

def read(p):
    try:
        return open(p, encoding='utf-8', errors='replace').read()
    except:
        return None

def write(p, c):
    open(p, 'w', encoding='utf-8').write(c)

for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in
               {'node_modules', '.git', 'dist', '.gemini', '_astro', 'scratch'}]
    for fname in files:
        if not fname.endswith('.html'):
            continue
        fpath = os.path.join(root, fname)
        content = read(fpath)
        if not content:
            continue

        modified = False

        # BUG 1 FIX: Revert async CSS back to synchronous (blocking) stylesheet
        # Pattern we introduced: media="print" onload="this.media='all'"
        # Restore to: rel="stylesheet" (blocking — safe for ranking)
        if 'media="print"' in content and 'style.min.css' in content:
            # Also remove the now-redundant noscript wrapper we added
            # Pattern: <noscript><link rel="stylesheet" href="X"></noscript>\n  <link rel="stylesheet" href="X" media="print" ...>
            content = re.sub(
                r'<noscript><link rel="stylesheet" href="([^"]+)"></noscript>\s*\n\s*<link rel="stylesheet" href="[^"]+" media="print" onload="this\.media=\'all\'">',
                r'<link rel="preload" as="style" href="\1">\n  <link rel="stylesheet" href="\1">',
                content
            )
            # Simpler pattern fallback (no noscript wrapper)
            content = re.sub(
                r'<link rel="stylesheet" href="([^"]+style\.min\.css[^"]*)" media="print" onload="this\.media=\'all\'">',
                r'<link rel="preload" as="style" href="\1">\n  <link rel="stylesheet" href="\1">',
                content
            )
            if 'media="print"' not in content:
                stats['async_reverted'] += 1
                modified = True

        # BUG 1 FIX: Remove empty <style id="critical-css"> blocks
        if '<style id="critical-css">' in content:
            # Remove the entire empty critical CSS block
            content = re.sub(
                r'\s*<style id="critical-css">[^<]{0,200}</style>\s*',
                '\n',
                content
            )
            stats['empty_style_removed'] += 1
            modified = True

        # BUG 2 FIX: Remove broken /styles/cluster-dominance.css reference
        if 'cluster-dominance.css' in content:
            content = re.sub(
                r'\s*<link rel="stylesheet" href="/styles/cluster-dominance\.css[^"]*"[^>]*>\s*',
                '\n',
                content
            )
            stats['broken_css_removed'] += 1
            modified = True

        if modified:
            write(fpath, content)
            stats['files_modified'] += 1

print("=" * 60)
print("EMERGENCY RANKING RECOVERY — COMPLETE")
print(f"  Async CSS reverted to blocking: {stats['async_reverted']} pages")
print(f"  Empty critical-css removed:     {stats['empty_style_removed']} pages")
print(f"  Broken 404 CSS removed:         {stats['broken_css_removed']} pages")
print(f"  Total files fixed:              {stats['files_modified']}")
print("=" * 60)
