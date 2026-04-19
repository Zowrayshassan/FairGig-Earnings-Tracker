import json
import urllib.request
import os

output_file = r"C:\Users\zowra\.gemini\antigravity\brain\99403a58-75d4-4553-a6c7-9326e2d1c176\.system_generated\steps\45\output.txt"
dest_folder = r"C:\Users\zowra\OneDrive\Desktop\softec26\fairgig-frontend\src\screens_html"

os.makedirs(dest_folder, exist_ok=True)

with open(output_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

for screen in data.get('screens', []):
    title = screen.get('title', 'Untitled').replace(' ', '_').replace('/', '_').replace('(', '').replace(')', '')
    html_info = screen.get('htmlCode', {})
    download_url = html_info.get('downloadUrl')
    
    if download_url:
        print(f"Downloading {title}...")
        try:
            req = urllib.request.Request(download_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response:
                html_content = response.read()
                
            file_path = os.path.join(dest_folder, f"{title}.html")
            with open(file_path, 'wb') as out_f:
                out_f.write(html_content)
            print(f"Saved {title}.html")
        except Exception as e:
            print(f"Failed to download {title}: {e}")
