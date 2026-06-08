from pathlib import Path
import re
base = Path(r'c:\Users\Hp\Desktop\webapp by s')
pages = ['index.html','courses.html','trading-bots.html','ai-automation.html','intelligence.html','resources.html','contact.html']
for fname in pages:
    path = base / fname
    text = path.read_text(encoding='utf-8')
    new_text = re.sub(r'<a class="button button-outline" href="admin.html">Admin</a>', '<a class="button button-outline admin-link hidden" href="admin.html">Admin</a>', text)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        print('patched', fname)
    else:
        print('no change', fname)
