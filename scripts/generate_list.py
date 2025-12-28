#!/usr/bin/env python3
import os
import json

ALLOWED_EXTS = {'.mp3', '.wav', '.ogg', '.m4a', '.aac', '.webm'}

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
listening_dir = os.path.join(project_root, 'Listening')
manifest_path = os.path.join(listening_dir, 'list.json')

if not os.path.isdir(listening_dir):
    print('Listening directory not found:', listening_dir)
    print('Create the `Listening/` folder and put audio files inside, then re-run this script.')
    raise SystemExit(1)

files = [f for f in os.listdir(listening_dir) if os.path.splitext(f)[1].lower() in ALLOWED_EXTS]
files.sort()

entries = []
for fn in files:
    rel = os.path.join('Listening', fn).replace('\\', '/')
    title = os.path.splitext(fn)[0].replace('_', ' ')
    entries.append({
        'file': rel,
        'title': title,
        'transcript': ''
    })

with open(manifest_path, 'w', encoding='utf-8') as fh:
    json.dump(entries, fh, ensure_ascii=False, indent=2)

print(f'Wrote {len(entries)} entries to {manifest_path}')
