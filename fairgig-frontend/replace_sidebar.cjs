const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'pages', 'worker');

const files = fs.readdirSync(directoryPath);

files.forEach(file => {
    if (file.endsWith('.tsx')) {
        const filePath = path.join(directoryPath, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Regex to replace <aside>...</aside> across multiple lines
        const asideRegex = /<aside[\s\S]*?<\/aside>/;
        
        if (asideRegex.test(content)) {
            content = content.replace(asideRegex, '<WorkerSidebar />');

            // Add import if not present
            if (!content.includes('import WorkerSidebar')) {
                // Find first import and put it after
                const firstImportIndex = content.indexOf('import ');
                if (firstImportIndex !== -1) {
                    content = content.slice(0, firstImportIndex) + "import WorkerSidebar from '../../components/WorkerSidebar';\n" + content.slice(firstImportIndex);
                } else {
                    content = "import WorkerSidebar from '../../components/WorkerSidebar';\n" + content;
                }
            }

            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${file}`);
        }
    }
});
