import json
import os

log_path = r"C:\Users\Alberto\.gemini\antigravity\brain\8058ead9-002a-495b-9b80-c55d15d942dc\.system_generated\logs\overview.txt"
output_path = r"c:\Users\Alberto\Downloads\UNIDOS-AI\TESIS_PROLAB_COMPLETA.md"

if os.path.exists(log_path):
    with open(log_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        for line in lines:
            try:
                data = json.loads(line)
                if data.get('step_index') == 147:
                    content = data.get('content', '')
                    # Clean up the <USER_REQUEST> tags if present
                    if content.startswith('<USER_REQUEST>'):
                        content = content.replace('<USER_REQUEST>', '', 1)
                    if content.endswith('</USER_REQUEST>'):
                        content = content.rsplit('</USER_REQUEST>', 1)[0]
                    
                    with open(output_path, 'w', encoding='utf-8') as out:
                        out.write("# TESIS COMPLETA: MODELO PROLAB (UNIDOS)\n\n")
                        out.write(content.strip())
                    print(f"Successfully saved thesis to {output_path}")
                    break
            except Exception as e:
                continue
else:
    print(f"Log file not found at {log_path}")
