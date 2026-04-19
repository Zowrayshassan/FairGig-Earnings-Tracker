const fs = require('fs');
const https = require('https');
const path = require('path');

const outputFile = 'C:\\Users\\zowra\\.gemini\\antigravity\\brain\\99403a58-75d4-4553-a6c7-9326e2d1c176\\.system_generated\\steps\\45\\output.txt';
const destFolder = path.join(__dirname, 'public', 'screens_html');

if (!fs.existsSync(destFolder)) {
    fs.mkdirSync(destFolder, { recursive: true });
}

fs.readFile(outputFile, 'utf8', (err, dataStr) => {
    if (err) {
        console.error(err);
        return;
    }
    const data = JSON.parse(dataStr);
    const screens = data.screens || [];
    
    screens.forEach(screen => {
        const title = (screen.title || 'Untitled').replace(/[\s\/\(\)]/g, '_');
        const url = screen.htmlCode && screen.htmlCode.downloadUrl;
        
        if (url) {
            const dest = path.join(destFolder, `${title}.html`);
            const file = fs.createWriteStream(dest);
            https.get(url, (response) => {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`Downloaded ${title}.html`);
                });
            }).on('error', (err) => {
                fs.unlink(dest, () => {});
                console.error(`Error downloading ${title}: ${err.message}`);
            });
        }
    });
});
