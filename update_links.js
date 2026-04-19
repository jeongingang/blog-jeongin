const fs = require('fs');
const path = require('path');

const cPagesData = [
  ['c_lang_01.html', 'C언어의 탄생과 역사', 'C언어 학습', '<p>C언어는 1972년 데니스 리치가 유닉스 운영체제를 위해 개발했습니다. 현대 프로그래밍 언어의 근간이 되는 언어로, 시스템 프로그래밍과 하드웨어 제어에 탁월합니다.</p>'],
  ['c_lang_02.html', 'Hello World 구조 분석', 'C언어 학습', '<p>가장 기본적인 C 프로그램 구조입니다.</p><pre><code>#include &lt;stdio.h&gt;\\n\\nint main() {\\n    printf("Hello World!\\\\n");\\n    return 0;\\n}</code></pre><p><code>#include</code>는 표준 입출력 헤더를 가져오며, 항상 <code>main</code> 함수에서 시작합니다.</p>'],
  ['c_lang_03.html', '변수의 선언과 초기화', 'C언어 학습', '<p>변수를 사용하기 위해 선언하고 값을 할당(초기화)합니다.</p><pre><code>int age = 20;\\nfloat height = 180.5;\\nchar grade = &#39;A&#39;;</code></pre>'],
  ['c_lang_04.html', '메모리 주소와 변수', 'C언어 학습', '<p>모든 변수는 메모리 공간에 저장되며 주소를 갖습니다. & 연산자를 통해 주소를 확인할 수 있습니다.</p><pre><code>int n = 10;\\nprintf("n의 주소: %p", &n);</code></pre>'],
  ['c_lang_05.html', '정수형 자료형의 종류', 'C언어 학습', '<p>C언어에는 크기에 따라 다양한 정수형이 존재합니다.</p><ul><li><code>short</code>: 2 bytes</li><li><code>int</code>: 4 bytes</li><li><code>long</code>: 4 or 8 bytes</li><li><code>long long</code>: 8 bytes</li></ul>'],
  ['c_lang_06.html', '정수형 오버플로우와 언더플로우', 'C언어 학습', '<p>자료형이 표현할 수 있는 최대값을 넘어가면 <strong>오버플로우</strong>, 최소값보다 작아지면 <strong>언더플로우</strong>가 발생합니다.</p><pre><code>short max = 32767;\\nmax = max + 1; // 오버플로우 발생으로 -32768이 됨</code></pre>'],
  ['c_lang_07.html', '실수형 (float, double)과 정밀도', 'C언어 학습', '<p>실수형태의 연산은 부동소수점 방식을 사용하여 미세한 오차가 발생할 수 있습니다.</p><p><code>float</code>는 4바이트, <code>double</code>은 8바이트로 <code>double</code>이 더 높은 정밀도를 가집니다.</p>'],
  ['c_lang_08.html', '문자와 문자열 (char)', 'C언어 학습', '<p>C언어는 문자열 자료형이 별도로 존재하지 않으며, char형 배열에 널문자(&#39;\\0&#39;)를 마지막에 넣어 문자열로 사용합니다.</p><pre><code>char str[] = "Hello";</code></pre>'],
  ['c_lang_09.html', '산술 연산자와 우선순위', 'C언어 학습', '<p>+, -, *, /, % 연산자를 제공합니다. 곱셈과 나눗셈이 덧셈과 뺄셈보다 우선순위가 높습니다.</p><p>기본적으로 괄호 <code>()</code>를 통해 우선순위를 제어하는 것을 권장합니다.</p>'],
  ['c_lang_10.html', '대입 연산자와 증감 연산자', 'C언어 학습', '<p>복합 대입 연산자와 증감 연산자는 코드를 간결하게 만듭니다.</p><pre><code>a += 5; // a = a + 5;\\nb++;    // b를 1 증가시킴</code></pre>'],
  ['c_lang_11.html', '관계 연산자와 논리 연산자', 'C언어 학습', '<p>관계 연산자(&gt;, &lt;, ==, !=)는 참(1)과 거짓(0)을 반환합니다. 논리 연산자(&amp;&amp;, ||, !)는 조건 여러 개를 조합할 때 씁니다.</p>'],
  ['c_lang_12.html', '비트 단위 연산자', 'C언어 학습', '<p>임베디드 제어나 최적화에서 사용하는 비트 연산자</p><ul><li>&amp; (AND)</li><li>| (OR)</li><li>^ (XOR)</li><li>~ (NOT)</li><li>&lt;&lt;, &gt;&gt; (SHIFT)</li></ul>'],
  ['c_lang_13.html', '제어문 (if, if-else)', 'C언어 학습', '<p>조건에 따라 프로그램의 흐름을 제어합니다.</p><pre><code>if (score >= 90) {\\n    printf("A 합격");\\n} else {\\n    printf("불합격");\\n}</code></pre>'],
  ['c_lang_14.html', '다중 조건 (else if, switch-case)', 'C언어 학습', '<p>조건이 여러 개일 때 <code>else if</code>를 쓰거나 떨어지는 값의 경우 <code>switch-case</code>가 유리합니다.</p>'],
  ['c_lang_15.html', '반복문 (while, do-while)', 'C언어 학습', '<p>주어진 조건이 참인 동안 반복하는 구조입니다. <code>do-while</code>은 최소 1번은 무조건 실행합니다.</p>'],
  ['c_lang_16.html', '반복문 (for문 기초)', 'C언어 학습', '<p>초기화, 조건식, 증감식을 한 줄에 모아 둔 가장 많이 사용되는 반복구조입니다.</p><pre><code>for(int i=0; i&lt;5; i++) {\\n    printf("%d", i);\\n}</code></pre>'],
  ['c_lang_17.html', '중첩 반복문 활용하기', 'C언어 학습', '<p>반복문 안에 또 다른 반복문이 들어가는 구조입니다. 별찍기나 구구단 출력에 자주 쓰입니다.</p>'],
  ['c_lang_18.html', '분기문 (break, continue)', 'C언어 학습', '<p><code>break</code>는 가장 가까운 반복문을 탈출하고, <code>continue</code>는 현재 회차를 생략하고 다음 반복으로 이어집니다.</p>'],
  ['c_lang_19.html', '배열(Array)의 이해와 활용', 'C언어 학습', '<p>동일한 자료형의 변수를 연속된 메모리 공간에 할당하여 사용하는 것을 배열이라고 합니다.</p><pre><code>int arr[5] = {1, 2, 3, 4, 5};</code></pre>'],
  ['c_lang_20.html', '다차원 배열 살펴보기', 'C언어 학습', '<p>행과 열로 이루어진 2차원 이상의 배열입니다. 행렬 연산 등에 유용합니다.</p><pre><code>int arr2d[2][3] = {{1, 2, 3}, {4, 5, 6}};</code></pre>']
];

const linuxPagesData = [
  ['linux_wsl_01.html', '리눅스와 WSL 소개', 'Linux/WSL', '<p>Windows Subsystem for Linux (WSL)를 이용하면 윈도우 환경에서도 네이티브 리눅스 터미널과 도구들을 사용할 수 있습니다.</p>'],
  ['linux_wsl_02.html', '터미널 명령어: pwd와 cd', 'Linux/WSL', '<p><code>pwd</code>는 현재 위치한 디렉토리의 절대 경로를 보여주며, <code>cd</code>는 다른 디렉토리로 이동할 때 사용합니다.</p>'],
  ['linux_wsl_03.html', '명령어: ls', 'Linux/WSL', '<p>현재 디렉토리의 파일 목록을 봅니다. <code>ls -l</code>을 사용하면 상세 정보를, <code>ls -a</code>를 사용하면 숨김 파일을 확인할 수 있습니다.</p>'],
  ['linux_wsl_04.html', '명령어: mkdir', 'Linux/WSL', '<p>새로운 디렉토리를 생성할 때는 <code>mkdir 폴더명</code>과 같이 사용합니다.</p>'],
  ['linux_wsl_05.html', '명령어: cp와 mv', 'Linux/WSL', '<p><code>cp 대상 목적지</code>로 파일을 복사하고, <code>mv 대상 목적지</code>로 파일을 이동시키거나 이름을 변경합니다.</p>'],
  ['linux_wsl_06.html', '권한 관리: chmod', 'Linux/WSL', '<p>리눅스는 파일마다 소유자, 그룹, 시스템 권한을 읽기(r=4), 쓰기(w=2), 실행(x=1)으로 나누어 <code>chmod 755 파일명</code> 처럼 관리합니다.</p>'],
  ['linux_wsl_07.html', '보안과 슈퍼유저: sudo', 'Linux/WSL', '<p>일반 사용자가 관리자 권한이 필요한 작업을 수행할 때는 명령어 앞에 <code>sudo</code>를 붙여 사용합니다.</p>'],
  ['linux_wsl_08.html', '환경 변수 설정하기', 'Linux/WSL', '<p>경로나 시스템 설정을 저장하는 변수로, <code>export PATH=$PATH:/new/path</code> 와 같이 사용하거나 <code>.bashrc</code>에 기록합니다.</p>'],
  ['linux_wsl_09.html', '명령어 조합하기 파이프(|)', 'Linux/WSL', '<p>파이프를 사용하면 명령어의 결과를 다른 명령어의 입력으로 넘길 수 있습니다. <code>ls -al | grep txt</code>와 같이 씁니다.</p>'],
  ['linux_wsl_10.html', '파일 내용 보기 (cat, less, tail)', 'Linux/WSL', '<p><code>cat</code>은 파일 전체를, <code>less</code>는 페이지 단위로 스크롤하며, <code>tail</code>은 파일 마지막 부분의 실시간 로그를 보는데 주로 사용됩니다.</p>']
];

const jpPagesData = [
  ['jp_n4_01.html', 'N4 이형용사(い형용사) 활용', '일본어 N4', '<p>~い로 끝나며 명사를 수식합니다. 부정형은 ~くない, 과거형은 ~かった, 과거부정은 ~くなかった 가 됩니다.</p>'],
  ['jp_n4_02.html', 'N4 나형용사(な형용사) 활용', '일본어 N4', '<p>~다(だ)로 끝나며 명사에 연결할 땐 ~な로 바뀝니다. 정중체 부정은 ~じゃありません.</p>'],
  ['jp_n4_03.html', '기초 조사 완벽 마스터', '일본어 N4', '<p>は(은/는), が(이/가), を(을/를), に(~에, 시간과 목적지) 등의 기초 조사를 확실히 공부했습니다.</p>'],
  ['jp_n4_04.html', '방향과 수단의 조사', '일본어 N4', '<p>へ(~로, 방향), で(~로, 수단 및 활동 장소), から(~부터), まで(~까지) 를 정리합니다.</p>'],
  ['jp_n4_05.html', '동사의 て형 만들기', '일본어 N4', '<p>1그룹 동사는 어미 규칙(우,츠,루 -> ッテ)이 있으며 2그룹, 3그룹은 규칙이 쉽습니다. 부탁이나 진행형에 사용됩니다.</p>'],
  ['jp_n4_06.html', '동사의 た형 만들기 (과거형)', '일본어 N4', '<p>て형의 활용 규칙과 완벽히 동일하며, 끝이 ~た가 됩니다. 경험(~したことがある)을 말할 때 필수적입니다.</p>'],
  ['jp_n4_07.html', '필수 단어: 날씨와 계절', '일본어 N4', '<ul><li>はれ (맑음)</li><li>あめ (비)</li><li>ゆき (눈)</li><li>はる, なつ, あき, ふゆ (사계절)</li></ul>'],
  ['jp_n4_08.html', '필수 단어: 사람과 가족', '일본어 N4', '<p>ちち, はは, あに, あね 등의 우리 가족 호칭과 おとうさん 같은 타인 가족 호칭의 차이를 외워야 합니다.</p>'],
  ['jp_n4_09.html', '필수 단어: 집안 물건과 동사', '일본어 N4', '<p>만들다(つくる), 켜다(つける), 끄다(けす) 등 N4에서 자주 나오는 생활 동사와 명사들.</p>'],
  ['jp_n4_10.html', 'N4 청해/독해 팁', '일본어 N4', '<p>존경어와 겸양어가 가끔 섞일 때는 주체가 누구인지 파악하는 가장 중요합니다.</p>']
];

const lifePagesData = [
  ['life_01.html', '배드민턴 동아리 In-N-Out 이야기', '일상 & 취미', '<p>오늘은 동아리 첫 출석일! 드라이브와 언더를 배우고 쳤다 다리가 후들들.</p>'],
  ['life_02.html', '초보를 위한 배드민턴 연습', '일상 & 취미', '<p>레슨을 통해 클리어 연습을 했다. 그립 쥐는 법이 아직도 너무 헷갈린다.</p>'],
  ['life_03.html', '라켓 텐션과 줄 교체 후기', '일상 & 취미', '<p>In-N-Out 멤버들의 조언으로 26파운드로 텐션을 감았다. 타구음이 경쾌해졌다!</p>'],
  ['life_04.html', '주식 분석: PAPL (가상)', '일상 & 취미', '<p>PAPL 사의 1분기 실적 발표. 배당 컷 이슈가 있었으나 성장 가능성 때문에 매수하기로 했다.</p>'],
  ['life_05.html', '코인 시장 동향: INJ (인젝티브)', '일상 & 취미', '<p>INJ 코인은 코스모스 텐더민트 기반으로 디파이 특화 체인이다. 최근 거래량이 심상치 않다.</p>'],
  ['life_06.html', '식단 일기: 클린 식단 1주차', '일상 & 취미', '<p>아침엔 사과 반쪽, 점심은 현미밥 130g에 닭가슴살. 단 것이 너무 먹고 싶다.</p>'],
  ['life_07.html', '식단 일기: 2주차 시작', '일상 & 취미', '<p>치팅데이라는 명목 하에 삼겹살을 조금 먹었다. 죄책감이 들지만 맛있고 행복했다.</p>'],
  ['life_08.html', '운동과 개발, 과연 병행할 수 있을까?', '일상 & 취미', '<p>코딩하다가 막힐 때는 라켓을 들고 빈스윙을 한다. 운동은 개발 능률을 올리기 위해 필수다.</p>'],
  ['life_09.html', '주간 회고 (3월 넷째 주)', '일상 & 취미', '<p>이번 주는 블로그 세팅과 C언어 공부로 바빴다. 다음주엔 WSL 세팅을 마저 해야지.</p>'],
  ['life_10.html', '앞으로의 계획', '일상 & 취미', '<p>이 블로그를 통해서 기술 뿐만 아니라 내가 좋아하는 것들을 꾸준히 기록해나가고 싶다.</p>']
];

const allData = [...cPagesData, ...linuxPagesData, ...jpPagesData, ...lifePagesData];
const featuredData = [cPagesData[0], linuxPagesData[0], lifePagesData[0]];

const createCard = (item, index) => {
    const filename = item[0];
    const title = item[1];
    const category = item[2];
    const snippet = item[3].replace(/<[^>]+>/g, '').substring(0, 50) + '...';
    const bgClass = "gradient-bg-" + ((index % 3) + 1);
    const hueStyle = index > 2 ? ' style="filter: hue-rotate(' + (index * 11) + 'deg);"' : '';
    
    return '\\n' +
        '            <!-- Article Card ' + (index + 1) + ' -->\\n' +
        '            <article class="card">\\n' +
        '                <div class="card-img-wrapper">\\n' +
        '                    <div class="card-img ' + bgClass + '"' + hueStyle + '></div>\\n' +
        '                </div>\\n' +
        '                <div class="card-content">\\n' +
        '                    <span class="tag">' + category + '</span>\\n' +
        '                    <h3 class="card-title">' + title + '</h3>\\n' +
        '                    <p class="card-excerpt">' + snippet + '</p>\\n' +
        '                    <div class="card-meta">\\n' +
        '                        <span class="date">Apr 19, 2026</span>\\n' +
        '                        <a href="' + filename + '" class="read-more">Read →</a>\\n' +
        '                    </div>\\n' +
        '                </div>\\n' +
        '            </article>';
};

// 1. Update articles.html
let articlesHtml = fs.readFileSync('articles.html', 'utf-8');
const articlesGrid = allData.map((item, index) => createCard(item, index)).join('');
let gridStart = articlesHtml.indexOf('<div class="grid">');
let mainEnd = articlesHtml.indexOf('</main>', gridStart);
articlesHtml = articlesHtml.substring(0, gridStart) + '<div class="grid">\n' + articlesGrid + '\n        </div>\n    </main>\n' + articlesHtml.substring(mainEnd + 7);
fs.writeFileSync('articles.html', articlesHtml);
console.log('articles.html has been updated with 50 links.');

// 2. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf-8');
const indexGrid = featuredData.map((item, index) => createCard(item, index)).join('');
gridStart = indexHtml.indexOf('<div class="grid">');
mainEnd = indexHtml.indexOf('</main>', gridStart);
indexHtml = indexHtml.substring(0, gridStart) + '<div class="grid">\n' + indexGrid + '\n        </div>\n    </main>\n' + indexHtml.substring(mainEnd + 7);
fs.writeFileSync('index.html', indexHtml);
console.log('index.html has been updated with 3 featured links.');
