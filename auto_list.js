const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.match(/^(c_lang_|linux_wsl_|jp_n4_|life_).*\.html$/));

const getCategory = (filename) => {
    if (filename.startsWith('c_lang_')) return 'C언어 학습';
    if (filename.startsWith('linux_wsl_')) return 'Linux/WSL';
    if (filename.startsWith('jp_n4_')) return '일본어 N4';
    if (filename.startsWith('life_')) return '일상 & 취미';
    return 'Articles';
};

const dummyCards = `
            <!-- Article Card Demo 1 -->
            <article class="card">
                <div class="card-img-wrapper">
                    <div class="card-img gradient-bg-1"></div>
                </div>
                <div class="card-content">
                    <span class="tag">Tips</span>
                    <h3 class="card-title">현대적인 웹 디자인 구축하기</h3>
                    <p class="card-excerpt">부드러운 애니메이션과 다크 모드를 활용해 사용자 경험을 극대화하는 방법을 소개합니다.</p>
                    <div class="card-meta">
                        <span class="date">Oct 12, 2026</span>
                        <a href="about.html" class="read-more">Read →</a>
                    </div>
                </div>
            </article>
            <!-- Article Card Demo 2 -->
            <article class="card">
                <div class="card-img-wrapper">
                    <div class="card-img gradient-bg-2"></div>
                </div>
                <div class="card-content">
                    <span class="tag">Tech</span>
                    <h3 class="card-title">JavaScript 비동기 처리 완전 정복</h3>
                    <p class="card-excerpt">Promise부터 async/await까지, 헷갈리는 비동기 로직을 쉽게 풀어서 설명합니다.</p>
                    <div class="card-meta">
                        <span class="date">Sep 28, 2026</span>
                        <a href="about.html" class="read-more">Read →</a>
                    </div>
                </div>
            </article>
            <!-- Article Card Demo 3 -->
            <article class="card">
                <div class="card-img-wrapper">
                    <div class="card-img gradient-bg-3"></div>
                </div>
                <div class="card-content">
                    <span class="tag">Thoughts</span>
                    <h3 class="card-title">왜 코드를 기록해야 할까?</h3>
                    <p class="card-excerpt">결과보다 과정을 남기는 것이 개발자의 성장에 어떤 영향을 미치는지에 대한 짧은 회고.</p>
                    <div class="card-meta">
                        <span class="date">Sep 15, 2026</span>
                        <a href="about.html" class="read-more">Read →</a>
                    </div>
                </div>
            </article>
`;

const cardsHtml = htmlFiles.map((file, index) => {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract title
    let titleMatch = content.match(/<h1 class="hero-title"[^>]*>(.*?)<\/h1>/s);
    let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : file;
    
    // Extract snippet
    let snippet = '';
    const articleMatch = content.match(/<article class="article-content">.*?<div class="article-header">.*?<\/div>(.*?)<\/article>/s);
    if (articleMatch) {
       let rawSnippet = articleMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
       snippet = rawSnippet.substring(0, 50) + '...';
    }
    
    const category = getCategory(file);
    const bgClass = "gradient-bg-" + ((index % 3) + 1);
    const hueStyle = index > 2 ? ' style="filter: hue-rotate(' + (index * 11) + 'deg);"' : '';

    return '\n' +
        '            <!-- Article Card ' + (index + 4) + ' -->\n' +
        '            <article class="card">\n' +
        '                <div class="card-img-wrapper">\n' +
        '                    <div class="card-img ' + bgClass + '"' + hueStyle + '></div>\n' +
        '                </div>\n' +
        '                <div class="card-content">\n' +
        '                    <span class="tag">' + category + '</span>\n' +
        '                    <h3 class="card-title">' + title + '</h3>\n' +
        '                    <p class="card-excerpt">' + snippet + '</p>\n' +
        '                    <div class="card-meta">\n' +
        '                        <span class="date">Apr 19, 2026</span>\n' +
        '                        <a href="' + file + '" class="read-more">Read →</a>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </article>';
}).join('');

let articlesHtml = fs.readFileSync('articles.html', 'utf-8');
let gridStart = articlesHtml.indexOf('<div class="grid">');
let mainEnd = articlesHtml.indexOf('</main>', gridStart);
articlesHtml = articlesHtml.substring(0, gridStart) + '<div class="grid">\n' + dummyCards + cardsHtml + '\n        </div>\n    ' + articlesHtml.substring(mainEnd);
fs.writeFileSync('articles.html', articlesHtml);

console.log('Successfully updated articles.html with 53 cards.');
