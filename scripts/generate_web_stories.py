#!/usr/bin/env python3
"""
GOOGLE WEB STORIES ECOSYSTEM DISPATCHER
======================================
Directs execution to scripts/generate_web_stories_ecosystem.py to maintain
the complete 12-story ecosystem, Media RSS feed, SVG QR codes, and interactive tray.
"""
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from generate_web_stories_ecosystem import main

if __name__ == "__main__":
    main()
