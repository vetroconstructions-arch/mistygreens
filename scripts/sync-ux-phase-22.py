import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # 1. Overlay Hardening
    content = content.replace('background: rgba(0,0,0,0.8); backdrop-filter: blur(20px)', 'background: rgba(0,0,0,0.85); backdrop-filter: blur(8px)')
    content = content.replace('-webkit-backdrop-filter: blur(20px)', '-webkit-backdrop-filter: blur(8px)')

    # 2. Panel Hardening
    content = content.replace('box-shadow: 0 40px 100px rgba(0,0,0,0.4); border: none', 'box-shadow: 0 40px 100px rgba(0,0,0,0.5); border: 1px solid rgba(0,0,0,0.1)')

    # 3. Header Hardening
    content = content.replace('font-size: 2.6rem; margin-top: 0.5rem; color: #1a1a1a; line-height: 1.1;', 'font-size: 2.8rem; margin-top: 0.5rem; color: #000; line-height: 1.1; font-weight: 700;')
    content = content.replace('color: #666; font-size: 0.9rem; margin-top: 1rem; letter-spacing: 0.02em;', 'color: #444; font-size: 0.95rem; margin-top: 1rem; letter-spacing: 0.02em; font-weight: 500;')

    # 4. Form Options & Inputs Hardening
    content = content.replace('background: #f5f5f0; border: 2px solid #b0a890;', 'background: #ffffff; border: 2px solid #ddd;')
    content = content.replace('background: transparent; color: #666; font-size: 0.8rem;', 'background: #eee; color: #333; font-size: 0.8rem; font-weight: 700;')
    content = content.replace('font-weight: 800; cursor: pointer;">FINALIZE ADVISORY', 'font-weight: 900; cursor: pointer; letter-spacing: 0.05em; text-transform: uppercase;">Finalize Advisory')

    # 5. Mobile Compatibility Styles
    mobile_style = """
        @media (max-width: 768px) {
            .concierge-panel { max-width: 95% !important; border-radius: 15px !important; }
            .concierge-panel > div { padding: 2.5rem 1.5rem 2rem !important; }
            .form-header h3 { font-size: 2.2rem !important; }
            .advisory-opt { padding: 1rem !important; }
        }
    </style>"""
    
    if '</style>' in content and '.concierge-panel { max-width: 95% !important;' not in content:
        content = content.replace('</style>', mobile_style)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    base_dir = '.'
    files_updated = 0
    total_files = 0
    
    for root, dirs, files in os.walk(base_dir):
        if 'node_modules' in root or '.git' in root or 'brain' in root:
            continue
            
        for file in files:
            if file.endswith('.html'):
                total_files += 1
                if process_file(os.path.join(root, file)):
                    files_updated += 1
                    print(f"Updated UX: {os.path.join(root, file)}")

    print(f"\nPhase 22 UX Hardening Complete.")
    print(f"Total HTML files scanned: {total_files}")
    print(f"Files updated with hardened contrast: {files_updated}")

if __name__ == "__main__":
    main()
