const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'public', 'screens_html');
const destDir = path.join(__dirname, 'src', 'pages');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.html'));

function capitalize(str) {
  return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('').replace('.html', '');
}

function kebabCase(str) {
    return str.split('_').map(w => w.toLowerCase()).join('-').replace('.html', '');
}

function convertStyle(styleStr) {
  const parts = styleStr.split(';').filter(Boolean);
  const obj = {};
  for (const part of parts) {
    const [key, val] = part.split(':').map(s => s.trim());
    if(key && val) {
       const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
       obj[camelKey] = val.replace(/'/g, '"');
    }
  }
  return `{${JSON.stringify(obj).replace(/"/g, "'")}}`;
}

let routeImports = [];
let routes = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(srcDir, file), 'utf8');
  const componentName = capitalize(file).replace(/__/g, '').replace(/[^a-zA-Z0-9]/g, '');
  
  // Extract content between body
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  let bodyContent = bodyMatch ? bodyMatch[1] : content;

  // Fix SVG tags that breaks TSX parser if purely stringified
  // Instead of complex node parser, we just do heavy regex
  bodyContent = bodyContent.replace(/class="/g, 'className="');
  bodyContent = bodyContent.replace(/for="/g, 'htmlFor="');
  bodyContent = bodyContent.replace(/<!--(.*?)-->/gs, '{/*$1*/}');
  
  // self close tags for void elements
  bodyContent = bodyContent.replace(/<(img|input|br|hr)([^>]*?)(?<!\/)>/ig, '<$1$2 />');
  
  // Style strings to objects
  bodyContent = bodyContent.replace(/style="([^"]*)"/g, (match, p1) => {
     let formatted = p1;
     if(p1.includes("font-variation-settings")) {
         return `style={{ fontVariationSettings: "'FILL' 1" }}`;
     }
     return match;
  });

  // SVG properties
  bodyContent = bodyContent.replace(/stroke-width/ig, 'strokeWidth');
  bodyContent = bodyContent.replace(/stroke-linecap/ig, 'strokeLinecap');
  bodyContent = bodyContent.replace(/stroke-linejoin/ig, 'strokeLinejoin');
  bodyContent = bodyContent.replace(/stroke-dasharray/ig, 'strokeDasharray');
  bodyContent = bodyContent.replace(/stroke-dashoffset/ig, 'strokeDashoffset');
  bodyContent = bodyContent.replace(/fill-opacity/ig, 'fillOpacity');
  bodyContent = bodyContent.replace(/stop-color/ig, 'stopColor');
  bodyContent = bodyContent.replace(/stop-opacity/ig, 'stopOpacity');
  bodyContent = bodyContent.replace(/viewbox/ig, 'viewBox');
  bodyContent = bodyContent.replace(/preserveaspectratio/ig, 'preserveAspectRatio');
  bodyContent = bodyContent.replace(/lineargradient/ig, 'linearGradient');
  
  // Fix paths and stops
  bodyContent = bodyContent.replace(/><\/path>/g, ' />');
  bodyContent = bodyContent.replace(/><\/circle>/g, ' />');
  bodyContent = bodyContent.replace(/><\/stop>/g, ' />');
  bodyContent = bodyContent.replace(/><\/pattern>/g, ' />');

  // If there are still <path ...> without closing, self close them (extremely naive)
  bodyContent = bodyContent.replace(/<path([^>]+?)(?<!\/)>(?![\s\S]*?<\/path>)/ig, '<path$1 />');
  bodyContent = bodyContent.replace(/<stop([^>]+?)(?<!\/)>(?![\s\S]*?<\/stop>)/ig, '<stop$1 />');
  bodyContent = bodyContent.replace(/<circle([^>]+?)(?<!\/)>(?![\s\S]*?<\/circle>)/ig, '<circle$1 />');

  // Any other random fixes (like checked="" turning into defaultChecked)
  bodyContent = bodyContent.replace(/checked=""/g, 'defaultChecked');
  bodyContent = bodyContent.replace(/selected=""/g, 'defaultValue');
  // class="" might still be there if it was nested weirdly, though we did it above
  bodyContent = bodyContent.replace(/class="/g, 'className="');
  bodyContent = bodyContent.replace(/for="/g, 'htmlFor="');
  
  const jsxContent = `import React from 'react';\nimport { Link } from 'react-router-dom';\n\nconst ${componentName} = () => {\n  return (\n    <>\n      ${bodyContent}\n    </>\n  );\n};\n\nexport default ${componentName};\n`;

  fs.writeFileSync(path.join(destDir, `${componentName}.tsx`), jsxContent);
  console.log(`Created ${componentName}.tsx`);
  
  routeImports.push(`import ${componentName} from './pages/${componentName}';`);
  routes.push(`        <Route path="/${kebabCase(file)}" element={<${componentName} />} />`);
});

console.log("\nAdd this to App.tsx:\n");
console.log(routeImports.join('\n'));
console.log('');
console.log(routes.join('\n'));
