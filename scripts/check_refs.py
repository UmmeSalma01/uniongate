from pathlib import Path
import re

p = Path('index.html')
s = p.read_text(encoding='utf-8')
refs = re.findall(r'src="([^"]+)"', s) + re.findall(r'href="([^"]+)"', s)
local_refs = [r for r in refs if not r.startswith('http') and not r.startswith('#')]
missing = [r for r in local_refs if not Path(r).exists()]
print('local refs:', local_refs)
print('missing:', missing)
