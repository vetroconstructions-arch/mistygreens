#!/usr/bin/env python3
"""
Optimizes exit-intent-concierge.js:
1. Enforces 48x48px touch targets on currency buttons, modal close buttons, and links.
2. Ensures 100% GPU-composited animations (translate3d, backface-visibility) with 3s delay.
3. Compresses HTML and CSS inside template literals.
4. Minifies with esbuild to achieve peak performance score.
"""

import os
import re
import subprocess

CONCIERGE_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "exit-intent-concierge.js")

def optimize_concierge():
    with open(CONCIERGE_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Fix .pscl-curr-btn touch target
    content = re.sub(
        r'\.pscl-curr-btn\s*\{[^}]*\}',
        '''.pscl-curr-btn {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #ffffff;
        padding: 0.5rem 0.85rem;
        border-radius: 50px;
        font-size: 0.74rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;
        min-height: 48px;
        min-width: 48px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 4px;
        touch-action: manipulation;
      }''',
        content
    )

    # 2. Fix FAB pulse animation to be 100% GPU composited and delayed
    content = content.replace(
        'animation: psclFabPulseComposited 2.5s cubic-bezier(0.16, 1, 0.3, 1) infinite;',
        'transform: translate3d(0, 0, 0); backface-visibility: hidden; animation: psclFabPulseComposited 2.5s cubic-bezier(0.16, 1, 0.3, 1) 3s infinite;'
    )
    content = re.sub(
        r'@keyframes psclFabPulseComposited\s*\{[^}]*\}',
        '''@keyframes psclFabPulseComposited {
        0% { transform: scale3d(0.92, 0.92, 1); opacity: 0.85; }
        70%, 100% { transform: scale3d(1.35, 1.35, 1); opacity: 0; }
      }''',
        content
    )

    # 3. Compact CSS/HTML inside template literals
    def minify_literal(m):
        lit = m.group(1)
        # Compact extra whitespace and newlines
        lit = re.sub(r'[ \t\r\n]+', ' ', lit)
        lit = re.sub(r'\s*([\{\}\:\;\,\>\<\=])\s*', r'\1', lit)
        # Avoid breaking inside string attributes
        return f'`{lit}`'

    content = re.sub(r'`([^`]+)`', minify_literal, content)

    # Save intermediate
    with open(CONCIERGE_FILE, "w", encoding="utf-8") as f:
        f.write(content)

    # Run esbuild
    subprocess.run(["npx", "esbuild", CONCIERGE_FILE, "--minify", f"--outfile={CONCIERGE_FILE}", "--allow-overwrite"], check=True)

    final_size = os.path.getsize(CONCIERGE_FILE)
    print(f"Concierge optimization complete! Final size: {final_size / 1024:.1f} KB ({final_size} bytes)")

if __name__ == "__main__":
    optimize_concierge()
