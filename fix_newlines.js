const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf-8');
    // Replace all literal \n strings with <br> tag
    content = content.replace(/\\n/g, '<br>');
    fs.writeFileSync(path.join(dir, file), content);
});

console.log('Replaced all literal \\n strings with <br> tags in all HTML files.');
