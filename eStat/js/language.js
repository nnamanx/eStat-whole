// language.js
var langNum;
var nLanguage = 15;
var nString = 110;
var appStr = new Array(nString);
var svgStr = new Array(nString);
var svgStrU = new Array(nString);
var alertMsg = new Array(nString);
for (var j = 0; j < nString; j++) {
    appStr[j] = new Array(nLanguage);
    svgStr[j] = new Array(nLanguage);
    svgStrU[j] = new Array(nLanguage);
    alertMsg[j] = new Array(nLanguage);
}
// 언어 코드
languageNumber = {
    'ko': 0,
    'en': 1,
    'ja': 2,
    'zh': 10,
    'zhTW': 3,
    'fr': 4,
    'de': 5,
    'es': 6,
    'vi': 7,
    'id': 8,
    'mn': 9,
};
$(document).ready(function() {
    var lang = localStorage.getItem("lang");
    if (lang == null) {
        var navLang = navigator.language || navigator.userLanguage;
        lang = navLang.split("-")[0];
    }
    $('#select_language').val(lang);
    setLanguage(lang);
});
$('#select_language').change(function() {
    var lang = $("#select_language option:selected").val();
    setLanguage(lang);
});
function setLanguage(lang) {
    langNum = languageNumber[lang];
    localStorage.setItem("lang", lang);
    $('[data-msgid]').each(function() {
        var $this = $(this);
        $this.html($.message[lang][$this.data('msgid')]);
    });
};
// 언어 컨트롤
var lang = localStorage.getItem("lang");
if (lang == null) lang = "en";
if (lang == "ko") langNum = 0;
else if (lang == "en") langNum = 1;
else if (lang == "ja") langNum = 2;
else if (lang == "zh") langNum = 10;
else if (lang == "zhTW") langNum = 3;
else if (lang == "fr") langNum = 4;
else if (lang == "de") langNum = 5;
else if (lang == "es") langNum = 6;
else if (lang == "vi") langNum = 7;
else if (lang == "id") langNum = 8;
else if (lang == "mn") langNum = 9;
// console.log("eStatU.js langNum="+langNum);
$.message = {}
// Korean
$.message.ko = {
    "eStat : Stat Education SW": "eStat: 통계교육SW",
    "Filename": "파일이름",
    "Selected Variables": "선택변량",
    "Cancel": "취소",
    "Edit Variables": "변량편집",
    "Level": "수준",
    "ElementaryLevel": "초",
    "MiddleLevel": "중",
    "HighLevel": "고",
    "UniversityLevel": "대",
    "Example": "예제 불러오기",
    "New Sheets": "새시트",
    "csv Open": "csv 불러오기",
    "www Open": "www 불러오기",
    "json Open": "json 불러오기",
    "csv Save": "csv 저장",
    "json Save": "json 저장",
    "Print Sheet": "시트 Print",
    "Bar Graph": "막대그래프",
    "Pie Chart": "원그래프",
    "Band Graph": "띠그래프",
    "Line Graph": "꺽은선그래프",
    "Dot Graph": "점그래프",
    "Histogram": "히스토그램",
    "Stem & Leaf Plot": "줄기와 잎그림",
    "Box-Whisker Plot": "상자그래프",
    "Scatterplot": "산점도",
    "Frequency Table": "도수분포표",
    "Basic Statistics": "기초통계량",
    "Testing Hypothesis &mu;": "추검정 &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "추검정 &sigma;<sup>2</sup>",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "검정 &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "검정 &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Analysis of Variance": "분산분석",
    "High School Stat Education": "고등 통계교육",
    "University Stat Education": "대학 통계교육",
    "Elem Stat Graph Example": "초중그래프 예",
    "Learning eStat w Example": "eStat 예제학습",
    "Vertical Separated Bar": "수직 분리형",
    "Vertical Stacked Bar": "수직 쌓는형",
    "Vertical Ratio Bar": "수직 비율형",
    "Vertical Side by Side Bar": "수직 나란형",
    "Vertical Two Sided Bar": "수직 양쪽형",
    "Horizontal Separated Bar": "수평 분리형",
    "Horizontal Stacked Bar": "수평 쌓는형",
    "Horizontal Ratio Bar": "수평 비율형",
    "Horizontal Side by Side Bar": "수평 나란형",
    "Horizontal Two Sided Bar": "수평 양쪽형",
    "Doughnut Graph": "도넛그래프",
    "Two Sided Stem & Leaf Plot": "양쪽형 줄기",
    "Graph Save": "그래프 저장",
    "Graph Print": "그래프 Print",
    "Move to Table": "테이블로 이동",
    "Edit Title": "제목편집",
    "Table Save": "테이블 저장",
    "Table Print": "테이블 인쇄",
    "Frequency": "도수표시",
    "(Sorting)": "(정렬)",
    "Raw Data": "원자료",
    "Descending": "내림차순",
    "Ascending": "올림차순",
    "Mean": "평균",
    "Std Deviation": "표준편차",
    "MeanStd": "평균/표준편차",
    "95CI": "95%신뢰구간",
    "RegressionAnalysis": "회귀분석",
    "ANOVA2": "2원 분산분석",
    "Regression": "회귀선",
    "RegressionLine": "회귀선",
    "Frequency Polygon": "도수분포다각형",
    "Frequency Table": "도수분포표",
    "Execute New Interval": "새 구간으로 실행",
    "Interval Start": "구간시작",
    "Interval Width": "구간너비",
    "t-test": "t-검정",
    "Z-test": "Z-검정",
    "(if Z-test, enter &sigma;)": "(Z-검정이면 &sigma;입력)",
    "Significance Level": "유의수준",
    "Execute": "검정실행",
    "(Confidence Interval)": "(신뢰구간)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Z-검정이면, Z, &sigma; )",
    "&chi;<sup>2</sup> test": "&chi;<sup>2</sup> 검정",
    "Variance Assumption": "분산가정",
    "F test": "F 검정",
    "At least one pair of means is different": "적어도 한쌍 이상의 평균이 다름",
    "Main Title : ": "주 제목 : ",
    "y title : ": "y축제목 : ",
    "x title : ": "x축제목 : ",
    "Modify": "수정",
    "Confirm": "확인",
    "Variable Name": "변량명",
    "Variable Value": "변량값",
    "Value Label": "변량값명",
    "* Less than nine value labels allowed.": "* 9개 이하의 변량값명을 지정할 수 있음",
    "Save": "저장",
    "Exit": "나가기",
    "eStatU UnivStatEdu": "eStatU - 대학 통계교육 SW",
    "eStatH HighStatEdu": "eStatH - 고등 통계교육 SW",
    "Menu": "메뉴",
    "Binomial Experiment": "이항분포실험",
    "Binomial Distribution": "이항분포",
    "Binomial Prob Table": "이항분포표",
    "Poisson Distribution": "포아송분포",
    "Poisson Prob Table": "포아송분포표",
    "Geometric Distribution": "기하분포",
    "Geometric Prob Table": "기하분포표",
    "HyperGeometric Distribution": "초기하분포",
    "HyperGeometric Prob Table": "초기하분포표",
    "Exponential Distribution": "지수분포",
    "Normal Experiment": "정규분포실험",
    "Normal Distribution": "정규분포",
    "Normal Approx": "정규분포근사",
    "t Distribution": "t 분포",
    "ChiSquare Distribution": "카이제곱분포",
    "F Distribution": "F 분포",
    "Sampling": "표본추출",
    "Population vs Sample": "모집단과 표본",
    "Population": "모집단",
    "Sample": "표본",
    "Exponential": "지수분포(0.3)",
    "Uniform": "균등분포(0,1)",
    "Sample05": "5% 표본추출",
    "Sample10": "10% 표본추출",
    "Sample20": "20% 표본추출",
    "Statistics/BoxPlot": "통계량/상자그림",
    "Law of Large Number": "대수의 법칙",
    "Dist of Sample Means": "표본평균의 표집분포",
    "Sample Size": "표본크기",
    "Confidence Interval": "신뢰구간",
    "Estimation Accuracy": "추정 정확도",
    "Repetition": "반복수",
    "Confidence Level": "신뢰수준",
    "Testing Hypothesis mu_titleAB": "가설검정 모평균",
    "Testing Hypothesis mu_title": "추검정 모평균",
    "Testing Hypothesis sigma_title": "추검정 모분산",
    "Testing Hypothesis P_title": "추검정 모비율",
    "Testing Hypothesis mu12_title": "두 모평균 가설검정",
    "Testing Hypothesis sigma12_title": "두 모분산 가설검정",
    "Testing Hypothesis P12_title": "두 모비율 검정",
    "Testing Hypothesis muAB": "모평균 가설검정 : &alpha;, &beta;",
    "Testing Hypothesis mu": "추정 및 가설검정 : 모평균 &mu;",
    "Testing Hypothesis sigma": "추정 및 가설검정 : 모분산 &sigma;<sup>2</sup>",
    "Testing Hypothesis P": "추정 및 가설검정 : 모비율 P",
    "Testing Hypothesis mu12": "가설검정 : &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "가설검정 : &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Testing Hypothesis P12": "가설검정 : P<sub>1</sub>, P<sub>2</sub>",
    "Testing Hypothesis ANOVA": "분산분석",
    "Testing Independence": "독립성 검정",
    "Correlation Coefficient": "상관계수",
    "Regression Experiment": "회귀실험",
    "Hypothesis": "가  설",
    "Test Type": "검정형태",
    "Z-test": "Z-검정",
    "t-test": "t-검정",
    "Chi-test": "&chi;<sup>2</sup>-검정",
    "F-test": "F-검정",
    "Sampling Type": "표본",
    "Independent Sample": "독립표본",
    "Paired Sample": "종속표본",
    "Sample Data": "표본자료",
    "input either sample data": "(표본자료를 여기 입력, 아니면 다음 표본통계량을 입력(공란 구분)",
    "Sample Statistics": "표본통계량",
    "Sample Mean": "표본평균",
    "Sample Variance": "표본분산",
    "Sample Proportion": "표본비율",
    "if Z-test-1": "(Z-검정이면, 모분산 입력)",
    "if Z-test-2": "(Z-검정이면, Z<sub>1-&alpha;/2 </sub> 이용)",
    "Variance Assumption": "분산가정",
    "At least one pair": "적어도 한쌍 이상의 평균이 다름",
    "Row-Col-0": "행변량과 열변량이 독립",
    "Row-Col-1": "행변량과 열변량이 독립 아님",
    "Enter any number of row": "(왼쪽 위 셀부터 데이터 입력)",
    "Row": "행",
    "Column": "열",
    "Show Probability": "확률표시",
    "Regression Line": "회귀선",
    "Erase All": "화면 지우기",
    "Add Point": "점 더하기",
    "Erase Point": "점 지우기",
    "Reference Site": "참고사이트",
    "Lot Size": "로트 개수",
    "Defect Size": "불량 개수",
    "If typed": "(숫자입력한 경우)",
    "Stat/BoxPlot": "통계량/상자그림",
    "Mean": "평균",
    "Std Dev": "표준편차",
    "SimulationWarning": "(시뮬레이션이 끝나기 전에 다른 실험을 위한 '실행' 버튼을 누르면 에러가 발생함)",
    "OneGroup": "(한그룹)",
    "RegressionBand": "신뢰대",
    "RegressionTable": "상관 및 회귀분석",
    "RegressionResidual": "잔차와 예측값",
    "RegressionResidualLeverage": "잔차와 지렛값",
    "RegressionCook": "Cook 거리 그래프",
    "RegressionQQ": "잔차 Q-Q 산점도",
    "HistogramNormal": "히스토그램",
    "HistogramChisq": "정규 적합성검정",
    "HistogramNormalQQ": "정규 Q-Q 산점도",
    "PopulationStd": "모표준편차",
    "Type1Error": "1종오류",
    "Type2Error": "2종오류",
    "AnovaTable": "분산분석표",
    "AnovaMeanGraph": "평균신뢰구간도",
    "MultipleComparison": "다중비교",
    "AnovaResidual": "잔차와 예측값 산점도",
    "AnovaQQ": "잔차 Q-Q 산점도",
    "TestingFit": "적합성 검정",
    "FitTest0": "관찰분포와 이론분포가 같음",
    "FitTest1": "관찰분포와 이론분포가 다름",
    "ObservedFreq": "관찰도수 O",
    "ExpectedProb": "기대확률 p",
    "ExpectedFreq": "기대도수 E(>5)",
    "InputFitData": "왼쪽 위부터 관찰도수, 기대확률 입력",
    "ExecuteTable": "통계량",
    "MeanDotGraph": "평균점그래프",
    "ScatterRegression": "산점도",
    "Factor": "인자",
    "Interaction": "교호작용",
    "NoInteraction": "교호작용 없음",
    "ExistInteraction": "교호작용 있음",
    "eStatLecture": "eStat 강의",
    "NonParametricMu12_title": "윌콕슨 순위합검정", 
    "NonParametricMu12": "윌콕슨 순위합 가설검정 : 위치모수 &mu;<sub>1</sub>, &mu;<sub>2</sub>", 
    "Sample Range": "표본범위",
    "DistributionTable": "분포표",
    "SignedRankTest": "윌콕슨 부호순위검정",
    "SignTest": "부호검정",
    "SignCount": "부호 수",
    "WilcoxonTest": "윌콕슨 순위합 검정",
    "KruskalTest": "크루스칼-월리스 검정",
    "KruskalTestANOVA": "크루스칼-월리스 검정 : 위치모수 &mu;<sub>1</sub>, &mu;<sub>2</sub>, ...,  &mu;<sub>k</sub> ",
    "Total": "합계",
    "FriedmanTest": "프리드만 검정",
    "FriedmanTestANOVA": "프리드만 검정 : 위치모수 &mu;<sub>1</sub>, &mu;<sub>2</sub>, ... , &mu;<sub>k</sub> ",
    "Block": "블록",
    "Treatment": "처리",
    "At least one locations is different": "적어도 한쌍 이상의 위치모수가 다름",
    "SignCondition": "n ≤ 100 이면 이항분포 검정,  n > 100 근사 정규분포 검정",
    "WilcoxonSignCondition": "n ≤ 20 이면 윌콕슨 순위합 분포 검정,  n > 20 근사 정규분포 검정",
    "WilcoxonRankCondition": "n=n<sub>1</sub>+n<sub>2</sub> ≤ 25 이면 순위합 분포 검정,  n > 25 근사 정규분포 검정",
    "KruskalCondition": "n ≤ 10 이면 H 분포 검정,  n>10 근사 카이제곱 검정",
};
// Korean
appStr[1][0] = "../eStatH/index.html";
appStr[2][0] = "../eStatU/index.html";
appStr[3][0] = "../eStatE/index.html";
appStr[4][0] = "../ExLearning/index.html";
appStr[5][0] = "index_en.html";
appStr[6][0] = "../ExLecture/index.html";
alertMsg[1][0] = "선택된 변량중에 자료가 없는 것이 있습니다!";
alertMsg[2][0] = "시트에서 분석을 원하는 변량를 선택(변량번호 클릭)한 후 버튼을 눌러주세요!  변량이 2개 이상일 경우 첫 선택변량는 그룹변량이 됩니다. ";
alertMsg[3][0] = "선택된 열에 결측치가 있습니다.";
alertMsg[4][0] = "각 열의 자료수가 다르거나 결측치가 있으면 처리를 할 수 없습니다.";
alertMsg[5][0] = "그룹의 수가 너무 많습니다. ";
alertMsg[6][0] = "요약자료의 분석변량에 문자가 있어 그래프를 그리거나 도수분포표를 출력할 수 없습니다.";
alertMsg[7][0] = "원시자료에서 두 개이상 선택된 변량에 대해서는 그래프를 그리거나 표를 만들 수 없습니다.";
alertMsg[8][0] = "점그림은 데이터 수가 200개 이하일때 가능합니다.";
alertMsg[9][0] = "줄기와 잎 그림은 데이터 수가 100개 이하일때 가능합니다.";
alertMsg[12][0] = "분석변량에 문자가 있어 그래프를 그리거나 도수분포표를 출력할 수 없습니다.";
alertMsg[14][0] = "요약자료는 연속형 그래프나 가설검정에 적합치 않습니다";
alertMsg[16][0] = "두 개의 그룹에 대해서만 가설검정을 할 수 있습니다.";
alertMsg[17][0] = "산점도는 최소 x축변량 y축량이 필요합니다.";
alertMsg[18][0] = "네 개이상 선택된 변량에 대해서는 산점도를 그릴 수 없습니다.";
alertMsg[19][0] = "X축데이터에 문자가 있어 산점도를 처리할수 없습니다";
alertMsg[20][0] = "Y축데이터에 문자가 있어 산점도를 처리할수 없습니다";
alertMsg[21][0] = "자료에 결측치가 있으면 저장할 수 없습니다.";
alertMsg[22][0] = "음수자료의 막대그래프는 그릴 수 없습니다.";
alertMsg[25][0] = "한그룹의 경우 쌓는형 막대그래프는 그릴 수 없습니다.";
alertMsg[27][0] = "한그룹의 경우 비율형 막대그래프는 그릴 수 없습니다.";
alertMsg[29][0] = "한그룹의 경우 나란형 막대그래프는 그릴 수 없습니다.";
alertMsg[31][0] = "한그룹의 경우 양쪽형 막대그래프는 그릴 수 없습니다.";
alertMsg[32][0] = "음수자료의 원그래프는 그릴 수 없습니다.";
alertMsg[33][0] = "음수자료의 도넛그래프는 그릴 수 없습니다.";
alertMsg[34][0] = "음수자료의 띠그래프는 그릴 수 없습니다.";
alertMsg[35][0] = "음수자료의 도수분포표는 표시할 수 없습니다.";
alertMsg[36][0] = "두 그룹에 대해서만 양쪽형 그래프를 그릴 수 있습니다.";
alertMsg[37][0] = "한 (분석변량)에 대해서만 가설검정을 할 수 있습니다.";
alertMsg[38][0] = "mu is NaN . Ener value and then retry!";
alertMsg[39][0] = "Standard deviation is either zero or NaN . Retry!";
alertMsg[40][0] = "input variance is NaN . Ener value and then retry!";
alertMsg[41][0] = "두 변량 (그룹변량과 분석변량)에 대해서만 가설검정을 할 수 있습니다.";
alertMsg[42][0] = "가설검정의 제목은 편집할 수 없습니다! ";
alertMsg[43][0] = "단순 선형 회귀분석은 그룹이 없는 경우에 분석할 수 있습니다";
svgStr[1][0] = " 막대그래프";
svgStr[2][0] = " 원그래프";
svgStr[3][0] = " 도넛그래프";
svgStr[4][0] = " 띠그래프";
svgStr[5][0] = " 꺽은선그래프";
svgStr[6][0] = " 점그래프";
svgStr[7][0] = " 상자그래프";
svgStr[8][0] = " 줄기와 잎 그림";
svgStr[9][0] = " 히스토그램";
svgStr[10][0] = " 산점도";
svgStr[11][0] = " 모평균 가설검정";
svgStr[12][0] = " 모분산 가설검정";
svgStr[13][0] = " 두 모평균 가설검정";
svgStr[14][0] = " 두 모분산 가설검정";
svgStr[15][0] = " 분산분석";
svgStr[16][0] = "도 수";
svgStr[17][0] = "비 율";
svgStr[18][0] = "그룹";
svgStr[19][0] = "의 ";
svgStr[20][0] = "<h3>요약자료<br>도수분포표</h3>";
svgStr[21][0] = "그룹변량";
svgStr[22][0] = "행변량";
svgStr[23][0] = "합계";
svgStr[24][0] = "합  계";
svgStr[25][0] = "<h3>도수분포표</h3>";
svgStr[26][0] = "분석변량";
svgStr[27][0] = "변량값";
svgStr[28][0] = "변량값명";
svgStr[29][0] = "도수";
svgStr[30][0] = "백분률(%)";
svgStr[31][0] = "<h3>교차표</h3>";
svgStr[32][0] = "열변량";
svgStr[33][0] = "행변량";
svgStr[34][0] = "평균";
svgStr[35][0] = "표준편차";
svgStr[36][0] = "<h3> 구간별<br>도수분포표</h3>";
svgStr[37][0] = "그룹명";
svgStr[38][0] = "계급구간";
svgStr[39][0] = "줄기";
svgStr[40][0] = " 잎";
svgStr[41][0] = "그룹 1  잎";
svgStr[42][0] = "그룹 2  잎"
svgStr[43][0] = "<h3>기초통계량</h3>";
svgStr[44][0] = "자료수";
svgStr[45][0] = "최솟값";
svgStr[46][0] = "중앙값";
svgStr[47][0] = "최댓값";
svgStr[48][0] = "전체";
svgStr[49][0] = "<h3>정규성 검정</h3>";
svgStr[50][0] = "적합성검정은<br> 기대도수가<br> 5보다 클때 권장";
svgStr[51][0] = "카이제곱 적합성검정<br>구간 i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][0] = "데이터<br>관찰도수<br>(O<sub>i</sub>)";
svgStr[53][0] = "정규분포<br>기대확률<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][0] = "정규분포<br>기대도수<br>(E<sub>i</sub>)";
svgStr[55][0] = "각 구간<br>카이제곱값<br>(O<sub>i</sub>-E<sub>i</sub>)<sup>2</sup> / E<sub>i</sub>";
svgStr[56][0] = "카이제곱값 합계";
svgStr[57][0] = "확률 히스토그램과 정규분포";
svgStr[58][0] = "정규 Q-Q 산점도";
svgStr[59][0] = "정규 백분위수";
svgStr[60][0] = "상관계수";
svgStr[61][0] = "결정계수";
svgStr[62][0] = "추정오차";
svgStr[63][0] = "변량";
svgStr[64][0] = "변량명";
svgStr[65][0] = "독립변량";
svgStr[66][0] = "종속변량";
svgStr[67][0] = "모수";
svgStr[68][0] = "추정값";
svgStr[69][0] = "값";
svgStr[70][0] = "절편";
svgStr[71][0] = "기울기";
svgStr[72][0] = "요인";
svgStr[73][0] = "제곱합";
svgStr[74][0] = "자유도";
svgStr[75][0] = "평균제곱";
svgStr[76][0] = "회귀";
svgStr[77][0] = "오차";
svgStr[78][0] = "전체";
svgStr[79][0] = "<h3>회귀분석</h3>";
svgStr[80][0] = "표준화 잔차의 Q-Q Plot";
svgStr[81][0] = "표준화 잔차";
svgStr[82][0] = "정규 분위수";
svgStr[83][0] = "잔차 산점도";
svgStr[84][0] = "예측값";
svgStr[85][0] = "2원 분산분석";
svgStr[86][0] = "평균-신뢰구간 그래프";
svgStr[87][0] = "잔차";
svgStr[88][0] = "2차원 평균표";
svgStr[89][0] = "산점도 행렬";
svgStr[90][0] = "다중비교";
svgStr[91][0] = "통계량";
svgStr[92][0] = "인자";
svgStr[93][0] = "수준";
svgStr[94][0] = "대응비교 데이터 점그래프";
svgStr[95][0] = "잔차와 예측값 산점도";
svgStr[96][0] = "잔차와 지렛값 산점도";
svgStr[97][0] = "Cook 거리 그래프";
svgStr[98][0] = "Cook 거리";
svgStr[99][0] = "데이터 순서";
svgStr[100][0]= "평균차";
svgStr[101][0]= "평균차검정";
svgStr[102][0]= "처리";
svgStr[103][0]= "교호작용";
svgStr[104][0]= "행 합";
svgStr[105][0]= "열 합";
svgStr[106][0]= "중상관계수";
svgStr[107][0]= "<h3>상관분석</h3>";
svgStr[108][0]= "상관계수행렬";
svgStr[109][0]= "인자1 - 인자2 평균 그래프";

svgStrU[1][0] = "이항분포";
svgStrU[2][0] = "반복수";
svgStrU[3][0] = "평균";
svgStrU[4][0] = "표준편차";
svgStrU[5][0] = "포아송분포";
svgStrU[6][0] = "기하분포";
svgStrU[7][0] = "초기하분포";
svgStrU[8][0] = "모집단";
svgStrU[9][0] = "표본의 분포";
svgStrU[10][0] = "대수의 법칙";
svgStrU[11][0] = "뒷면";
svgStrU[12][0] = "앞면";
svgStrU[13][0] = "동전 앞면";
svgStrU[14][0] = "  앞면의 수  ";
svgStrU[15][0] = "  시행 횟수  ";
svgStrU[16][0] = "표본평균들의 분포";
svgStrU[17][0] = "반복";
svgStrU[18][0] = "표준오차";
svgStrU[19][0] = "모평균";
svgStrU[20][0] = "신뢰구간";
svgStrU[21][0] = "추정정확도";
svgStrU[22][0] = "표본평균";
svgStrU[23][0] = "[검정통계량] = ";
svgStrU[24][0] = "분포";
svgStrU[25][0] = "기각 H\u2080";
svgStrU[26][0] = "채택 H\u2080";
svgStrU[27][0] = "p-값 = ";
svgStrU[28][0] = "[의사결정] ";
svgStrU[29][0] = "[분산분석]";
svgStrU[30][0] = "상관계수를 입력하고 실행버튼을 누르세요.";
svgStrU[31][0] = "회귀선";
svgStrU[32][0] = "열변량";
svgStrU[33][0] = "행변량";
svgStrU[34][0] = "평균"
svgStrU[35][0] = "표준편차"
svgStrU[36][0] = "<h3> 구간별<br>도수분포표</h3>";
svgStrU[37][0] = "그룹명";
svgStrU[38][0] = "계급구간";
svgStrU[39][0] = "줄기";
svgStrU[40][0] = " 잎";
svgStrU[41][0] = "그룹 1  잎";
svgStrU[42][0] = "그룹 2  잎"
svgStrU[43][0] = "<h3>기초통계량</h3>";
svgStrU[44][0] = "자료수";
svgStrU[45][0] = "최솟값";
svgStrU[46][0] = "중앙값";
svgStrU[47][0] = "최댓값";
svgStrU[48][0] = "전체";
svgStrU[49][0] = "지수분포";
svgStrU[50][0] = "균등분포";
svgStrU[51][0] = "추정 정확도";
svgStrU[52][0] = "- 마우스 클릭으로 점을 세 개 이상 만들면 회귀선이 그려짐";
svgStrU[53][0] = "- 마우스로 한 점을 이동/지우기 하면서 회귀선 변화를 관측";
svgStrU[54][0] = "[표본 통계량] ";
svgStrU[55][0] = "[표본 1 통계량] ";
svgStrU[56][0] = "[표본 2 통계량] ";
svgStrU[57][0] = "신뢰수준";
svgStrU[58][0] = "행과 열이 독립";
svgStrU[59][0] = "행과 열이 종속";
svgStrU[60][0] = "관찰분포";
svgStrU[61][0] = "이론분포";
svgStrU[62][0] = "관찰분포 적합성검정";
svgStrU[63][0] = "윌콕슨 순위합 검정";
svgStrU[64][0] = "윌콕슨 순위합 분포표";
svgStrU[65][0] = "크루스칼-왈리스 검정";
svgStrU[66][0] = "크루스칼-왈리스 분포표";
svgStrU[67][0] = "크루스칼-왈리스 H 통계량";
svgStrU[68][0] = "윌콕슨 부호순위 검정";
svgStrU[69][0] = "부호검정";
svgStrU[70][0] = "프리드만 검정";
svgStrU[71][0] = "프리드만 S 통계량";
svgStrU[72][0] = "프리드만 분포표";


// English
$.message.en = {
    "eStat : Stat Education SW": "eStat : Stat Education SW",
    "Filename": "File Name",
    "Selected Variables": "Var Select",
    "Cancel": "Cancel",
    "Edit Variables": "EditVar",
    "Level": "Level",
    "ElementaryLevel": "E",
    "MiddleLevel": "M",
    "HighLevel": "H",
    "UniversityLevel": "U",
    "Example": "Example",
    "New Sheets": "New Sheets",
    "csv Open": "csv Open",
    "www Open": "www Open",
    "json Open": "json Open",
    "csv Save": "csv Save",
    "json Save": "json Save",
    "Print Sheet": "Print Sheet",
    "Bar Graph": "Bar Graph",
    "Pie Chart": "Pie Chart",
    "Band Graph": "Band Graph",
    "Line Graph": "Line Graph",
    "Dot Graph": "Dot Graph",
    "Histogram": "Histogram",
    "Stem & Leaf Plot": "Stem & Leaf Plot",
    "Box-Whisker Plot": "Box-Whisker Plot",
    "Scatterplot": "Scatterplot",
    "Frequency Table": "Frequency Table",
    "Basic Statistics": "Basic Statistics",
    "Testing Hypothesis &mu;": "Testing Hypothesis &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "Testing Hypothesis &sigma;<sup>2</sup>",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Analysis of Variance": "Analysis of Variance",
    "High School Stat Education": "High School Stat Education",
    "University Stat Education": "University Stat Education",
    "Elem Stat Graph Example": "Elem Stat Graph Example",
    "Learning eStat w Example": "Learning eStat w Example",
    "Vertical Separated Bar": "Vertical Separated Bar",
    "Vertical Stacked Bar": "Vertical Stacked Bar",
    "Vertical Ratio Bar": "Vertical Ratio Bar",
    "Vertical Side by Side Bar": "Vertical Side by Side Bar",
    "Vertical Two Sided Bar": "Vertical Two Sided Bar",
    "Horizontal Separated Bar": "Horizontal Separated Bar",
    "Horizontal Stacked Bar": "Horizontal Stacked Bar",
    "Horizontal Ratio Bar": "Horizontal Ratio Bar",
    "Horizontal Side by Side Bar": "Horizontal Side by Side Bar",
    "Horizontal Two Sided Bar": "Horizontal Two Sided Bar",
    "Doughnut Graph": "Doughnut Graph",
    "Two Sided Stem & Leaf Plot": "Two Sided Stem & Leaf Plot",
    "Graph Save": "Graph Save",
    "Graph Print": "Graph Print",
    "Move to Table": "Move to Table",
    "Edit Title": "Edit Title",
    "Table Save": "Table Save",
    "Table Print": "Table Print",
    "Frequency": "Frequency",
    "(Sorting)": "(Sorting)",
    "Raw Data": "Raw Data",
    "Descending": "Descending",
    "Ascending": "Ascending",
    "Mean": "Mean",
    "Std Deviation": "Std Deviation",
    "MeanStd": "Mean/StdDev",
    "95CI": "95% Confidence Interval",
    "RegressionAnalysis": "Regression Analysis",
    "ANOVA2": "Two way ANOVA",
    "Regression": "Regression",
    "RegressionLine": "Regression Line",
    "RegressionBand": "Confidence Band",
    "RegressionTable": "Regression Analysis",	
    "Frequency Polygon": "Frequency Polygon",
    "Frequency Table": "Frequency Table",
    "Execute New Interval": "Execute New Interval",
    "Interval Start": "Interval Start",
    "Interval Width": "Interval Width",
    "t-test": "t-test",
    "Z-test": "Z-test",
    "(if Z-test, enter &sigma;)": "(if Z-test, enter &sigma;)",
    "Significance Level": "Significance Level",
    "Execute": "Execute",
    "(Confidence Interval)": "(Confidence Interval)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(if Z-test, Z, &sigma;is used)",
    "&chi;<sup>2</sup> test": "&chi;<sup>2</sup> test",
    "Variance Assumption": "Variance Assumption",
    "F test": "F test",
    "At least one pair of means is different": "At least one pair of means is different",
    "Main Title : ": "Main Title : ",
    "y title : ": "y title : ",
    "x title : ": "x title : ",
    "Modify": "Modify",
    "Confirm": "Confirm",
    "Variable Name": "Variable Name",
    "Variable Value": "Variable Value",
    "Value Label": "Value Label",
    "* Less than nine value labels allowed.": "* Less than nine value labels allowed.",
    "Save": "Save",
    "Exit": "Exit",
    "eStatU UnivStatEdu": "eStatU - University Statistics Education SW",
    "eStatH HighStatEdu": "eStatH - High School Statistics Education SW",
    "Menu": "Menu",
    "Binomial Experiment": "Binomial Experiment",
    "Binomial Distribution": "Binomial Distribution",
    "Binomial Prob Table": "Binomial Prob Table",
    "Poisson Distribution": "Poisson Distribution",
    "Poisson Prob Table": "Poisson Prob Table",
    "Geometric Distribution": "Geometric Distribution",
    "Geometric Prob Table": "Geometric Prob Table",
    "HyperGeometric Distribution": "HyperGeometric Distribution",
    "HyperGeometric Prob Table": "HyperGeometric Prob Table",
    "Exponential Distribution": "Exponential Distribution",
    "Normal Experiment": "Normal Experiment",
    "Normal Distribution": "Normal Distribution",
    "Normal Approx": "Normal Approx",
    "t Distribution": "t Distribution",
    "ChiSquare Distribution": "ChiSquare Distribution",
    "F Distribution": "F Distribution",
    "Sampling": "Sampling",
    "Population vs Sample": "Population vs Sample",
    "Population": "Population",
    "Sample": "Sample",
    "Exponential": "Exponential(0.3)",
    "Uniform": "Uniform(0,1)",
    "Sample05": "Sampling 5%",
    "Sample10": "Sampling 10%",
    "Sample20": "Sampling 20%",
    "Statistics/BoxPlot": "Statistics/BoxPlot",
    "Law of Large Number": "Law of Large Number",
    "Dist of Sample Means": "Dist of Sample Means",
    "Sample Size": "Sample Size",
    "Confidence Interval": "Confidence Interval",
    "Estimation Accuracy": "Estimation Accuracy",
    "Repetition": "Repetition",
    "Confidence Level": "Confidence Level",
    "Testing Hypothesis mu_titleAB": "Testing Hypothesis Mean",
    "Testing Hypothesis mu_title": "Testing Mean",
    "Testing Hypothesis sigma_title": "Testing Variance",
    "Testing Hypothesis P_title": "Testing Proportion",
    "Testing Hypothesis mu12_title": "Testing Two Means",
    "Testing Hypothesis sigma12_title": "Testing Two Variances",
    "Testing Hypothesis P12_title": "Testing Two Proportions",
    "Testing Hypothesis muAB": "Testing &mu; with &alpha;, &beta;",
    "Testing Hypothesis mu": "Testing Hypothesis &mu;",
    "Testing Hypothesis sigma": "Testing Hypothesis &sigma;<sup>2</sup>",
    "Testing Hypothesis P": "Testing Hypothesis P",
    "Testing Hypothesis mu12": "Testing Hypothesis &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Testing Hypothesis P12": "Testing Hypothesis P<sub>1</sub>, P<sub>2</sub>",
    "Testing Hypothesis ANOVA": "Testing Hypothesis ANOVA",
    "Testing Independence": "Testing Independence",
    "Correlation Coefficient": "Correlation Coeff",
    "Regression Experiment": "Regression Experiment",
    "Hypothesis": "Hypothesis",
    "Test Type": "Test Type",
    "Z-test": "Z-test",
    "t-test": "t-test",
    "Chi-test": "&chi;<sup>2</sup>-test",
    "F-test": "F-test",
    "Sampling Type": "Sampling Type",
    "Independent Sample": "independent",
    "Paired Sample": "paired",
    "Sample Data": "Sample Data",
    "input either sample data": "Input either sample data, or sample statistics at the next boxes usign bsv",
    "Sample Statistics": "Sample Statistics",
    "Sample Mean": "Sample Mean",
    "Sample Variance": "Sample Variance",
    "Sample Proportion": "Sample Proportion",
    "if Z-test-1": "(if Z-test, enter population variance &sigma;<sup>2</sup>)",
    "if Z-test-2": "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used.)",
    "Variance Assumption": "Variance Assumption",
    "At least one pair": "At least one pair of means is different",
    "Row-Col-0": "Row and column variables are independent",
    "Row-Col-1": "Row and column variables are not independent",
    "Enter any number of row": "(Enter observation from upper left cell)",
    "Row": "Row",
    "Column": "Column",
    "Show Probability": "Show Probability",
    "Regression Line": "Regression Line",
    "Erase All": "Erase Screen",
    "Add Point": "Add Point",
    "Erase Point": "Erase Point",
    "Reference Site": "Reference Site",
    "Lot Size": "Lot Size",
    "Defect Size": "Defect Size",
    "If typed": "(If number is typed)",
    "Stat/BoxPlot": "Stat/BoxPlot",
    "Mean": "Mean",
    "Std Dev": "Std Dev",
    "SimulationWarning": "(Current simulation should be finished before you start the next simulation)",
    "OneGroup": "(one group)",
    "RegressionBand": "Confidence Band",
    "RegressionTable": "Regression Analysis",
    "RegressionResidual": "Residual Plot",
    "RegressionResidualLeverage": "Residual vs Leverage",
    "RegressionCook": "Cook's Distance Graph",
    "RegressionQQ": "Residual Q-Q Plot",
    "HistogramNormal": "Histogram",
    "HistogramChisq": "Normality Test",
    "HistogramNormalQQ": "Normal Q-Q Plot",
    "PopulationStd": "Population Standard Deviation",
    "Type1Error": "Type 1 Error",
    "Type2Error": "Type 2 Error",
    "AnovaTable": "ANOVA Table",
    "AnovaMeanGraph": "Mean Confidence Interval",
    "MultipleComparison": "Multiple Comparison",
    "AnovaResidual": "Residual Plot",
    "AnovaQQ": "Residual Q-Q Plot",
    "TestingFit": "Goodness of Fit Test",
    "FitTest0": "Observed & theoretical Distributions are the same",
    "FitTest1": "Observed & theoretical Distributions are different",
    "ObservedFreq": "Observed Frequency O",
    "ExpectedProb": "Expected Probability p",
    "ExpectedFreq": "Expected Frequency E(>5)",
    "InputFitData": "Enter cell from upper left cell",
    "ExecuteTable": "Statistics",
    "MeanDotGraph": "Confidence Interval Graph",
    "ScatterRegression": "Scatter Plot",
    "Factor": "Factor",
    "Interaction": "Interaction",
    "NoInteraction": "No Interaction",
    "ExistInteraction": "Exist Interaction",
    "eStatLecture": "eStat Intro Lecture",
    "NonParametricMu12_title": "Wilcoxon Rank Sum Test", 
    "NonParametricMu12": "Wilcoxon Rank Sum Test : Location Parameter &mu;<sub>1</sub>, &mu;<sub>2</sub>", 
    "WilcoxonTest": "Wilcoxon Rank Sum Test",
    "Sample Range": "Sample Range",
    "DistributionTable": "Distribution Table",
    "SignedRankTest": "Wilcoxon Signed Rank Sum Test",
    "SignTest": "Sign Test",
    "SignCount": "Sign Count",
    "KruskalTest": "Kruskal-Wallis Test",
    "KruskalTestANOVA": "Kruskal-Wallis Test : Location Parameter &mu;<sub>1</sub>, &mu;<sub>2</sub>, &mu;<sub>3</sub> ",
    "Total": "Total",
    "FriedmanTest": "Friedman Test",
    "FriedmanTestANOVA": "Friedman Test : Location Parameter &mu;<sub>1</sub>, &mu;<sub>2</sub>, ... , &mu;<sub>k</sub> ",
    "Block": "Block",
    "Treatment": "Treatment",
    "At least one locations is different": "At least one pair of locations is different",
    "SignCondition": "If n ≤ 100 Binomial Test,  n > 100 Normal Approximation Test",
    "WilcoxonSignCondition": "If n ≤ 20 Wilcoxon Rank Sum Test,  n > 20 Nomal Approximation Test",
    "WilcoxonRankCondition": "If n=n<sub>1</sub>+n<sub>2</sub> ≤ 25 Wilcoxon Rank Sum Test,  n>25 Nomal Approximation Test",
    "KruskalCondition": "If n ≤ 10 H Distribution Test,  else &chi;<sup>2</sup> approximation test",
};
// English
appStr[1][1] = "../eStatH/index.html";
appStr[2][1] = "../eStatU/index.html";
appStr[3][1] = "../eStatE/index_en.html";
appStr[4][1] = "../ExLearning/index_en.html";
appStr[5][1] = "index.html";
appStr[6][1] = "../ExLecture/index_en.html";
alertMsg[1][1] = "One of the selected variables does not have data.";
alertMsg[2][1] = "Select variables for analysis (clicking column names) one by one. If two variables, first one is group variable. ";
alertMsg[3][1] = "Missing data on the selected variable.";
alertMsg[4][1] = "If observations of the selected variables are different or observations are different, analysis is not allowed.";
alertMsg[5][1] = "Too many groups! Graphs may be overlapped due to size of the screen.";
alertMsg[6][1] = "If the analysis variable in summary data includes character, analysis or creating table is not allowed.";
alertMsg[7][1] = "If more than three variables are selected on raw data, analysis or creating table is not allowed.";
alertMsg[8][1] = "Dot Graph is allowd if the number of observation is less than 200.";
alertMsg[9][1] = "Stem & Leaf Plot is allowd if the number of observation is less than 100.";
alertMsg[12][1] = "If the analysis variable includes characters, analysis or creating table is not allowed.";
alertMsg[14][1] = "Summary data is not allowed for continuous graphs and testing hypothesis.";
alertMsg[16][1] = "Only two groups are allowed for this tesitng hypothesis.";
alertMsg[17][1] = "Scatter plot requires at least x variable and y variable.";
alertMsg[18][1] = "More than three variables are not allowed for scatter plot.";
alertMsg[19][1] = "If there is a character on X variable, scatter plot cannot be drawn.";
alertMsg[20][1] = "If there is a character on Y variable, scatter plot cannot be drawn.";
alertMsg[21][1] = "If there is a missing data, save is not allowed.";
alertMsg[22][1] = "If there is a negative number, bargraph cannot be drawn.";
alertMsg[25][1] = "If there is only one group, stacked bar graph is not allowed.";
alertMsg[27][1] = "If there is only one group, ratio bar graph is not allowed.";
alertMsg[29][1] = "If there is only one group, side-by-side bar graph is not allowed.";
alertMsg[31][1] = "If there is only one group, both-side bar graph is not allowed.";
alertMsg[32][1] = "If there is a negative number, piechart cannot be drawn.";
alertMsg[33][1] = "If there is a negative number, donut graph cannot be drawn.";
alertMsg[34][1] = "If there is a negative number, band graph cannot be drawn.";
alertMsg[35][1] = "If there is a negative number, frequency table cannot be drawn.";
alertMsg[36][1] = "This bar graph is allowed only for two groups.";
alertMsg[37][1] = "This testing hypothesis is allowed only for one variable.";
alertMsg[38][1] = "mu is NaN . Ener value and then retry!";
alertMsg[39][1] = "Standard deviation is either zero or NaN . Retry!";
alertMsg[40][1] = "input variance is NaN . Ener value and then retry!";
alertMsg[41][1] = "This testing hypothesis is allowed only for two variable. Group variable should have only two groups";
alertMsg[42][1] = "Title editing of testing hypothesis is not allowed! ";
alertMsg[43][1] = "Simple Linear Regression is only for one group";
svgStr[1][1] = " Bar Graph";
svgStr[2][1] = " Pie Chart";
svgStr[3][1] = " Doughnut Graph";
svgStr[4][1] = " Band Graph";
svgStr[5][1] = " Line Graph";
svgStr[6][1] = " Dot Graph";
svgStr[7][1] = " Box-Whisker Plot";
svgStr[8][1] = " Stem and Leaf Plot";
svgStr[9][1] = " Histogram";
svgStr[10][1] = " Scatter Plot";
svgStr[11][1] = " Testing Hypothesis: Population Mean";
svgStr[12][1] = " Testing Hypothesis: Population Variance";
svgStr[13][1] = " Testing Hypothesis: Two Population Means";
svgStr[14][1] = " Testing Hypothesis: Two Population Variances";
svgStr[15][1] = " Analysis of Variance";
svgStr[16][1] = "Frequency";
svgStr[17][1] = "Ratio";
svgStr[18][1] = "Group ";
svgStr[19][1] = " ";
svgStr[20][1] = "<h3>Summary Data<br>Frequency Table</h3>";
svgStr[21][1] = "Group Variable";
svgStr[22][1] = "Row Variable";
svgStr[23][1] = "Total";
svgStr[24][1] = "Total";
svgStr[25][1] = "<h3>Frequency Table</h3>";
svgStr[26][1] = "Analysis Variable";
svgStr[27][1] = "Var Value";
svgStr[28][1] = "Value Label";
svgStr[29][1] = "Frequency";
svgStr[30][1] = "Percent(%)";
svgStr[31][1] = "<h3>Cross Table</h3>";
svgStr[32][1] = "Col Variable";
svgStr[33][1] = "Row Variable";
svgStr[34][1] = "Mean"
svgStr[35][1] = "Std Dev"
svgStr[36][1] = "<h3> Histogram<br>Frequency Table</h3>";
svgStr[37][1] = "Group Name";
svgStr[38][1] = "Interval";
svgStr[39][1] = "Stem";
svgStr[40][1] = " Leaf";
svgStr[41][1] = "Group 1  Leaf";
svgStr[42][1] = "Group 2  Leaf"
svgStr[43][1] = "<h3>Basic Statistics</h3>";
svgStr[44][1] = "Observation";
svgStr[45][1] = "Minimum";
svgStr[46][1] = "Median";
svgStr[47][1] = "Maximum";
svgStr[48][1] = "Total";
svgStr[49][1] = "<h3>Normality Test</h3>";
svgStr[50][1] = "Expected frequency > 5 <br> is recommended";
svgStr[51][1] = "&chi;<sup>2</sup> Test<br>Interval i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][1] = "Data<br>Observed Frequency<br>(O<sub>i</sub>)";
svgStr[53][1] = "Normal Distribution<br>Expected Probability<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][1] = "Normal Distribution<br>Expected Frequency<br>(E<sub>i</sub>)";
svgStr[55][1] = "Each interval<br>&chi;<sup>2</sup> value<br>(O<sub>i</sub>-E<sub>i</sub>)<sup>2</sup> / E<sub>i</sub>";
svgStr[56][1] = "Sum of &chi;<sup>2</sup> value";
svgStr[57][1] = "Probility Hitogram and Normal Distribution";
svgStr[58][1] = "Normal Q-Q Plot";
svgStr[59][1] = "Normal Quantile";
svgStr[60][1] = "Correlation Coefficient";
svgStr[61][1] = "Coefficient of Determination";
svgStr[62][1] = "Standard Error";
svgStr[63][1] = "Variable";
svgStr[64][1] = "Variable Name";
svgStr[65][1] = "Independent Variable";
svgStr[66][1] = "Dependent Variable";
svgStr[67][1] = "Parameter";
svgStr[68][1] = "Estimated Value";
svgStr[69][1] = "value";
svgStr[70][1] = "Intercept";
svgStr[71][1] = "Slope";
svgStr[72][1] = "Factor";
svgStr[73][1] = "Sum of Squares";
svgStr[74][1] = "deg of freedom";
svgStr[75][1] = "Mean Squares";
svgStr[76][1] = "Regression";
svgStr[77][1] = "Error";
svgStr[78][1] = "Total";
svgStr[79][1] = "<h3>Regression Analysis</h3>";
svgStr[80][1] = "Standardized Residual Q-Q Plot";
svgStr[81][1] = "Standardized Residual";
svgStr[82][1] = "Normal Quantile";
svgStr[83][1] = "Residual Plot";
svgStr[84][1] = "Predicted Value";
svgStr[85][1] = "Two way ANOVA";
svgStr[86][1] = "Confidence Interval Graph";
svgStr[87][1] = "Residual";
svgStr[88][1] = "Two way Mean Table";
svgStr[89][1] = "Scatter Plot Matrix";
svgStr[90][1] = "Multiple Comparison";
svgStr[91][1] = "Statistics";
svgStr[92][1] = "Factor";
svgStr[93][1] = "Level";
svgStr[94][1] = "Paired Sample Data Graph";
svgStr[95][1] = "Residual vs Forecasting Plot";
svgStr[96][1] = "Residual vs Leverage Plot";
svgStr[97][1] = "Cook's Distance Graph";
svgStr[98][1] = "Cook's Distance";
svgStr[99][1] = "Data Order";
svgStr[100][1]= "Mean Difference";
svgStr[101][1]= "Testing Means";
svgStr[102][1]= "Treatment";
svgStr[103][1]= "Interaction";
svgStr[104][1]= "Row Total";
svgStr[105][1]= "Column Total";
svgStr[106][1]= "Multiple Correlation Coeff";
svgStr[107][1]= "<h3>Correlation Analysis</h3>";
svgStr[108][1]= "Correlation Matrix";
svgStr[109][1]= "Factor1 - Factor2 Mean Graph";

svgStrU[1][1] = "Binomial Distribution";
svgStrU[2][1] = "repetition";
svgStrU[3][1] = "Mean";
svgStrU[4][1] = "Std Dev";
svgStrU[5][1] = "Poissson Distribution";
svgStrU[6][1] = "Geometric Distribution";
svgStrU[7][1] = "HyperGeometric Distribution";
svgStrU[8][1] = "Population";
svgStrU[9][1] = "Sample Dist";
svgStrU[10][1] = "Law of Large Number";
svgStrU[11][1] = "Tail";
svgStrU[12][1] = "Head";
svgStrU[13][1] = "Coin Head";
svgStrU[14][1] = "Number of Heads";
svgStrU[15][1] = "Number of Trials";
svgStrU[16][1] = "Dist of Sample Means";
svgStrU[17][1] = "repetition";
svgStrU[18][1] = "std err";
svgStrU[19][1] = "Population Mean";
svgStrU[20][1] = "Confidence Interval";
svgStrU[21][1] = "Estimation Accuracy";
svgStrU[22][1] = "sample mean";
svgStrU[23][1] = "[TestStat] = ";
svgStrU[24][1] = "Distribution";
svgStrU[25][1] = "Reject H\u2080";
svgStrU[26][1] = "Accept H\u2080";
svgStrU[27][1] = " p-value  = ";
svgStrU[28][1] = "[Decision] ";
svgStrU[29][1] = "[ANOVA]";
svgStrU[30][1] = "Enter Correlation Coefficient and click Execute button";
svgStrU[31][1] = "Regression";
svgStrU[32][1] = "Row Var";
svgStrU[33][1] = "Col Var";
svgStrU[34][1] = "Mean"
svgStrU[35][1] = "Std Dev"
svgStrU[36][1] = "<h3> Histogram<br>Frequency Table</h3>";
svgStrU[37][1] = "Group Name";
svgStrU[38][1] = "Interval";
svgStrU[39][1] = "Stem";
svgStrU[40][1] = " Leaf";
svgStrU[41][1] = "Group 1  Leaf";
svgStrU[42][1] = "Group 2  Leaf"
svgStrU[43][1] = "<h3>Basic Statistics</h3>";
svgStrU[44][1] = "Observation";
svgStrU[45][1] = "Minimum";
svgStrU[46][1] = "Median";
svgStrU[47][1] = "Maximum";
svgStrU[48][1] = "Total";
svgStrU[49][1] = "Exponential";
svgStrU[50][1] = "Uniform";
svgStrU[51][1] = "Estimation Accuracy";
svgStrU[52][1] = "- Create points by click, then eStat finds a regression line.";
svgStrU[53][1] = "- Move or erase a point. Watch change of the regression line.";
svgStrU[54][1] = "[Sample Statistics] ";
svgStrU[55][1] = "[Sample 1 Statistics] ";
svgStrU[56][1] = "[Sample 2 Statistics] ";
svgStrU[57][1] = "confidence level";
svgStrU[58][1] = "Row & Col Independent";
svgStrU[59][1] = "Row & Col Dependent";
svgStrU[60][1] = "Observed Distribution";
svgStrU[61][1] = "Theoretical Distribution";
svgStrU[62][1] = "Goodness of Fit Test for Observed Frequency";
svgStrU[63][1] = "Wilcoxon Rank Sum Test";
svgStrU[64][1] = "Wilcoxon Rank Sum Test Table";
svgStrU[65][1] = "Kruskal-Wallis Test";
svgStrU[66][1] = "Kruskal-Wallis Test Table";
svgStrU[67][1] = "Kruskal-Wallis H Statistics";
svgStrU[68][1] = "Wilcoxon Signed Rank Test";
svgStrU[69][1] = "Sign Test";
svgStrU[70][1] = "Friedman Test";
svgStrU[71][1] = "Friedman S Statistic";
svgStrU[72][1] = "Friedman Distribution Table";

// Japanese
$.message.ja = {
    "eStat : Stat Education SW": "eStat: 統計教育SW",
    "Filename": "ファイル名",
    "Selected Variables": "選択変数",
    "Cancel": "キャンセル",
    "Edit Variables": "変数編集",
    "Level": "レベル",
    "ElementaryLevel": "小学生",
    "MiddleLevel": "中学生",
    "HighLevel": "高学生",
    "UniversityLevel": "大学生",
    "Example": "例題データ読み込み",
    "New Sheets": "新規シート",
    "csv Open": "csv読み込み",
    "www Open": "wwwから読み込み",
    "json Open": "json読み込み",
    "csv Save": "csv保存",
    "json Save": "json保存",
    "Print Sheet": "シートプリント",
    "Bar Graph": "棒グラフ",
    "Pie Chart": "円グラフ",
    "Band Graph": "帯グラフ",
    "Line Graph": "折れ線グラフ",
    "Dot Graph": "ドットグラフ",
    "Histogram": "ヒストグラム",
    "Stem & Leaf Plot": "幹葉図",
    "Box-Whisker Plot": "箱ひげ図",
    "Scatterplot": "散布図",
    "Frequency Table": "度数分布表",
    "Basic Statistics": "基礎統計量",
    "Testing Hypothesis &mu;": "推定・検定 &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "推定・検定 &sigma;<sup>2</sup>",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "母平均の仮説検定 (2集団) &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "母分散の仮説検定 (2集団) &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Analysis of Variance": "分散分析",
    "High School Stat Education": "高校統計教育",
    "University Stat Education": "大学統計教育",
    "Elem Stat Graph Example": "小中学グラフの例",
    "Learning eStat w Example": "eStat例題学習",
    "Vertical Separated Bar": "縦分離型",
    "Vertical Stacked Bar": "縦積み重ね型",
    "Vertical Ratio Bar": "縦比率型",
    "Vertical Side by Side Bar": "縦並び型",
    "Vertical Two Sided Bar": "縦両側型",
    "Horizontal Separated Bar": "横分離型",
    "Horizontal Stacked Bar": "横積み重ね型",
    "Horizontal Ratio Bar": "横比率型",
    "Horizontal Side by Side Bar": "横並び型",
    "Horizontal Two Sided Bar": "横両側型",
    "Doughnut Graph": "ドーナツグラフ",
    "Two Sided Stem & Leaf Plot": "両側幹葉図",
    "Graph Save": "グラフ保存",
    "Graph Print": "グラフ印刷",
    "Move to Table": "テーブルへ移動",
    "Edit Title": "タイトル編集",
    "Table Save": "テーブル保存",
    "Table Print": "テーブル印刷",
    "Frequency": "度数",
    "(Sorting)": "(並べ替え)",
    "Raw Data": "元データ",
    "Descending": "降順",
    "Ascending": "昇順",
    "Mean": "平均",
    "Std Deviation": "標準偏差",
    "MeanStd": "平均/標準偏差",
    "95CI": "95%信頼区間",
    "RegressionAnalysis": "回帰分析",
    "ANOVA2": "2元分散分析",

    "Regression": "回帰直線",
    "RegressionLine": "回帰直線",
    "RegressionBand": "Confidence Band",
    "RegressionTable": "Regression Analysis Table",		
    "Frequency Polygon": "度数分布多角形",
    "Frequency Table": "度数分布表",
    "Execute New Interval": "区間を変えて実行",
    "Interval Start": "区間始点",
    "Interval Width": "区間の幅",
    "t-test": "t-検定",
    "Z-test": "Z-検定",
    "(if Z-test, enter &sigma;)": "(Z-検定のとき入力)",
    "Significance Level": "有意水準",
    "Execute": "実行",
    "(Confidence Interval)": "(信頼区間)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Z-検定のとき, Z &sigma;利用)",
    "&chi;<sup>2</sup> test": "&chi;<sup>2</sup> 検定",
    "Variance Assumption": "分散の仮定",
    "F test": "F 検定",
    "At least one pair of means is different": "少なくとも一つ以上のペアの平均が異なる",
    "F test": "F 検定",
    "Main Title : ": "タイトル : ",
    "y title : ": "y軸タイトル : ",
    "x title : ": "x軸タイトル : ",
    "Modify": "修正",
    "Confirm": "確認",
    "Variable Name": "変数名",
    "Variable Value": "変数値",
    "Value Label": "変数ラベル",
    "* Less than nine value labels allowed.": "* 9個以下の変数名を指定することができます.",
    "Save": "保存",
    "Exit": "閉じる",
    "eStatU UnivStatEdu": "eStatU - 大学統計教育",
    "eStatH HighStatEdu": "eStatH - 高校統計教育",
    "Menu": "メニュー",
    "Binomial Experiment": "二項分布シミュレーション",
    "Binomial Distribution": "二項分布",
    "Binomial Prob Table": "二項分布表",
    "Poisson Distribution": "ポアソン分布",
    "Poisson Prob Table": "ポアソン分布表",
    "Geometric Distribution": "幾何分布",
    "Geometric Prob Table": "幾何分布表",
    "HyperGeometric Distribution": "超幾何分布",
    "HyperGeometric Prob Table": "超幾何分布表",
    "Exponential Distribution": "指数分布",
    "Normal Experiment": "正規分布シミュレーション",
    "Normal Distribution": "正規分布",
    "Normal Approx": "正規近似",
    "t Distribution": "t 分布",
    "ChiSquare Distribution": "カイ二乗分布",
    "F Distribution": "F 分布",
    "Sampling": "サンプル抽出",
    "Population vs Sample": "母集団とサンプル",
    "Population": "母集団",
    "Sample": "サンプル",
    "Exponential": "指数分布(0.3)",
    "Uniform": "一様分布(0,1)",
    "Sample05": "5% 標本抽出",
    "Sample10": "10% 標本抽出",
    "Sample20": "20% 標本抽出",
    "Statistics/BoxPlot": "統計量/箱ひげ図",
    "Law of Large Number": "大数の法則",
    "Dist of Sample Means": "標本平均の標本分布",
    "Sample Size": "サンプルサイズ",
    "Confidence Interval": "信頼区間",
    "Estimation Accuracy": "推定精度",
    "Repetition": "反復数",
    "Confidence Level": "信頼水準",
    "Testing Hypothesis mu_titleAB": "仮説検定母平均",
    "Testing Hypothesis mu_title": "母平均の推定・検定",
    "Testing Hypothesis sigma_title": "母分散の推定・検定",
    "Testing Hypothesis P_title": "母比率の推定・検定",
    "Testing Hypothesis mu12_title": "母平均の仮説検定 (2集団)",
    "Testing Hypothesis sigma12_title": "母分散の仮説検定 (2集団)",
    "Testing Hypothesis P12_title": "母比率の仮説検定 (2集団)",
    "Testing Hypothesis muAB": "仮説検定 &mu; - &alpha;, &beta;",
    "Testing Hypothesis mu": "母平均&mu;の推定・検定",
    "Testing Hypothesis sigma": "母分散&sigma;<sup>2</sup>の推定・検定",
    "Testing Hypothesis P": "母比率Pの推定・検定",
    "Testing Hypothesis mu12": "母平均の仮説検定 (2集団) : &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "母分散の仮説検定 (2集団) : &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Testing Hypothesis P12": "母比率の仮説検定 (2集団) : P<sub>1</sub>, P<sub>2</sub>",
    "Testing Hypothesis ANOVA": "分散分析",
    "Testing Independence": "独立性検定",
    "Correlation Coefficient": "相関係数",
    "Regression Experiment": "回帰シミュレーション",
    "Hypothesis": "仮説",
    "Test Type": "検定タイプ",
    "Z-test": "Z-検定",
    "t-test": "t-検定",
    "Chi-test": "カイ2乗検定",
    "F-test": "F-検定",
    "Sampling Type": "標本",
    "Independent Sample": "獨立標本",
    "Paired Sample": "対応のある２標本",
    "Sample Data": "標本データ",
    "input either sample data": "(標本データをここに入力, あるいは 次の標本統計量を入力(空白またはカンマ区切り)",
    "Sample Statistics": "標本統計量",
    "Sample Mean": "標本平均",
    "Sample Variance": "標本分散",
    "Sample Proportion": "標本比率",
    "if Z-test-1": "(Z-検定の場合, 母分散を入力)",
    "if Z-test-2": "(Z-検定の場合, Z<sub>1-&alpha;/2 </sub> 使用)",
    "Variance Assumption": "分散の仮定",
    "At least one pair": "少なくとも一つのペアの平均が異なる",
    "Row-Col-0": "行変数と列変数は独立である",
    "Row-Col-1": "行変数と列変数は独立ではない",
    "Enter any number of row": "(左上のセルから行と列の観測度数入力)",
    "Row": "行",
    "Column": "列",
    "Show Probability": "確率表示",
    "Regression Line": "回帰直線",
    "Erase All": "画面クリア",
    "Add Point": "点追加",
    "Erase Point": "点クリア",
    "Reference Site": "参考サイト",
    "Lot Size": "ロットの数",
    "Defect Size": "不良品の数",
    "If typed": "(数字を入力した場合)",
    "Stat/BoxPlot": "統計量/箱ひげ図",
    "Mean": "平均",
    "Std Dev": "標準偏差",
    "SimulationWarning": "(現在シミュレーションが終わるまで、お待ちください。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;シミュレーション途中で設定を変更して実行すると正しく表示されません。)",
    "OneGroup": "(1 グループ)",
    "RegressionBand": "信頼帯",
    "RegressionTable": "回帰分析",
    "RegressionResidual": "殘差プロット",
    "RegressionResidualLeverage": "殘差 - Leverage",
    "RegressionCook": "Cook 距離グラフ",
    "RegressionQQ": "殘差Q-Qプロット",
    "HistogramNormal": "ヒストグラム",
    "HistogramChisq": "正規性検定",
    "HistogramNormalQQ": "正規Q-Qプロット",
    "PopulationStd": "母標準偏差",
    "Type1Error": "第一種過誤",
    "Type2Error": "第二種過誤",
    "AnovaTable": "分散分析表",
    "AnovaMeanGraph": "信賴區間圖",
    "MultipleComparison": "多重比較",
    "AnovaResidual": "殘差プロット",
    "AnovaQQ": "殘差Q-Qプロット",
    "TestingFit": "適合性檢定",
    "FitTest0": "観測分布 = 理論分布",
    "FitTest1": "観測分布 != 理論分布",
    "ObservedFreq": "観測度數 O",
    "ExpectedProb": "期待確率 p",
    "ExpectedFreq": "期待度數 E(>5)",
    "InputFitData": "左上のセルから入力",
    "ExecuteTable": "統計量",
    "MeanDotGraph": "信頼区間図",
    "ScatterRegression": "散布図",
    "Factor": "因子",
    "Interaction": "交互作用",
    "NoInteraction": "交互作用無",
    "ExistInteraction": "交互作用有",
    "eStatLecture": "eStat 入門講義",
    "NonParametricMu12_title": "Wilcoxon 順位合檢定", 
    "NonParametricMu12": "Wilcoxon 順位合檢定 : 位置母數 &mu;<sub>1</sub>, &mu;<sub>2</sub>", 
    "Sample Range": "標本範圍",
    "DistributionTable": "分布表",
    "SignedRankTest": "Wilcoxon 符號順位檢定",
    "SignTest": "符號檢定",
    "SignCount": "符號數",
    "WilcoxonTest": "Wilcoxon 順位合檢定",
    "KruskalTest": "Kruskal-Wallis 檢定",
    "KruskalTestANOVA": "Kruskal-Wallis 檢定 : 位置母數 &mu;<sub>1</sub>, &mu;<sub>2</sub>, &mu;<sub>3</sub> ",
    "Total": "全体",
    "FriedmanTest": "Friedman檢定",
    "FriedmanTestANOVA": "Friedman檢定 : 位置母数 &mu;<sub>1</sub>, &mu;<sub>2</sub>, ... , &mu;<sub>k</sub> ",
    "Block": "Block",
    "Treatment": "處理",
    "At least one locations is different": "位置母数 !=",
    "SignCondition": "n ≤ 100 二項分布檢定,  n > 100 正規近似檢定",
    "WilcoxonSignCondition": "n ≤ 20 Wilcoxon 順位合檢定,  n > 20 正規近似檢定",
    "WilcoxonRankCondition": "n=n<sub>1</sub>+n<sub>2</sub> ≤ 25  順位合檢定,  n>25 正規近似檢定",
    "KruskalCondition": "n ≤ 10 H 分布檢定,  n > 100 &chi;<sup>2</sup>近似檢定",

};
// Japanese
appStr[1][2] = "../eStatH/index.html";
appStr[2][2] = "../eStatU/index.html";
appStr[3][2] = "../eStatE/index_en.html";
appStr[4][2] = "../ExLearning/index_en.html";
appStr[5][2] = "index.html";
appStr[6][2] = "../ExLecture/index_en.html";
alertMsg[1][2] = "選択した変数の中に、欠損値が含まれています!";
alertMsg[2][2] = "変数の番号をクリックし，シートから変数を選んでください. 変数が2つ以上の場合は，1番目の変数がグループ変数として指定されます. ";
alertMsg[3][2] = "選択した列に欠損値があります.";
alertMsg[4][2] = "各列のデータ数が異なるか欠損値が存在すると処理できません.";
alertMsg[5][2] = "グループの数が多すぎると画面の都合によりグラフが重なることがあります.";
alertMsg[6][2] = "要約データの変数に文字が入っているので、グラフの作成と度数分布表の出力ができません.";
alertMsg[7][2] = "元データから2個以上の変数を選択した場合はグラフや表を作成できません.";
alertMsg[8][2] = "ドットプロットはデータの数が200個以下のとき可能です.";
alertMsg[9][2] = "幹葉図はデータ数が100個以下のときのみ可能です.";
alertMsg[12][2] = "選択変数が文字を含んでいるためグラフや度数分布表が出力できません.";
alertMsg[14][2] = "要約データの形式は連続型グラフおよび仮説検定に適用できません";
alertMsg[16][2] = "仮説検定が可能なのは，グループが2つの場合のみです.";
alertMsg[17][2] = "散布図を作成するためにはx軸変数とy軸変数が必要です.";
alertMsg[18][2] = "4つ以上の変数については散布図を描くことができません.";
alertMsg[19][2] = "X軸データの中に文字が入っているため散布図を描けません";
alertMsg[20][2] = "Y軸データの中に文字が入っているため散布図を描けません";
alertMsg[21][2] = "データに欠損値があると保存できません.";
alertMsg[22][2] = "負の値での棒グラフは描けません.";
alertMsg[25][2] = "１つのグループの場合, 積み重ね型棒グラフは描けません.";
alertMsg[27][2] = "１つのグループの場合, 比率型グラフは描けません.";
alertMsg[29][2] = "１つのグループの場合, 並び型グラフは描けません.";
alertMsg[31][2] = "１つのグループの場合, 両側型グラフは描けません.";
alertMsg[32][2] = "負の値での円グラフは描けません.";
alertMsg[33][2] = "負の値でのドーナツグラフは描けません.";
alertMsg[34][2] = "負の値での帯グラフは描けません.";
alertMsg[35][2] = "負の値での度数分布表は表示できません.";
alertMsg[36][2] = "2グループに対する両側型グラフは描けません.";
alertMsg[37][2] = "一つの変数のみ仮説検定することが可能です.";
alertMsg[38][2] = "mu の値がはいっていません。値を入力してから再度おこなってください.";
alertMsg[39][2] = "標準偏差が0かはいっていません。再度おこなってください.";
alertMsg[40][2] = "分散の値がはいっていません。値を入力してから再度おこなってください.";
alertMsg[41][2] = "仮説検定を行うには，2つの変数(グループ変数と解析する変数)を指定します.";
alertMsg[42][2] = "仮説検定のタイトルは編集できません! ";
alertMsg[43][2] = "Simple Linear Regression is only for one group";
svgStr[1][2] = " 棒グラフ";
svgStr[2][2] = " 円グラフ";
svgStr[3][2] = " ドーナツグラフ";
svgStr[4][2] = " 帯グラフ";
svgStr[5][2] = " 折れ線グラフ";
svgStr[6][2] = " 点グラフ";
svgStr[7][2] = " 箱ひげ図";
svgStr[8][2] = " 幹葉図";
svgStr[9][2] = " ヒストグラム";
svgStr[10][2] = " 散布図";
svgStr[11][2] = " 母平均仮説検定";
svgStr[12][2] = " 母分散仮説検定";
svgStr[13][2] = " 2群 母平均仮説検定";
svgStr[14][2] = " 2群 母分散仮説検定";
svgStr[15][2] = " 分散分析";
svgStr[16][2] = "度数";
svgStr[17][2] = "比率";
svgStr[18][2] = "グループ";
svgStr[19][2] = "の ";
svgStr[20][2] = "<h3>要約データ<br>度数分布表</h3>";
svgStr[21][2] = "グループ変数";
svgStr[22][2] = "行変数";
svgStr[23][2] = "合計";
svgStr[24][2] = "合計";
svgStr[25][2] = "<h3>度数分布表</h3>";
svgStr[26][2] = "分析変数";
svgStr[27][2] = "変数値";
svgStr[28][2] = "変数値ラベル";
svgStr[29][2] = "度数";
svgStr[30][2] = "百分率(%)";
svgStr[31][2] = "<h3>クロス表</h3>";
svgStr[32][2] = "列変数";
svgStr[33][2] = "行変数";
svgStr[34][2] = "平均";
svgStr[35][2] = "標準偏差";
svgStr[36][2] = "<h3> 区間別<br>度数分布表</h3>";
svgStr[37][2] = "グループ名";
svgStr[38][2] = "階級区間";
svgStr[39][2] = "幹";
svgStr[40][2] = "葉";
svgStr[41][2] = "グループ1の葉";
svgStr[42][2] = "グループ2の葉";
svgStr[43][2] = "<h3>基礎統計量</h3>";
svgStr[44][2] = "データ数";
svgStr[45][2] = "最小値";
svgStr[46][2] = "中央値";
svgStr[47][2] = "最大値";
svgStr[48][2] = "全体";
svgStr[49][2] = "<h3>正規性檢定</h3>";
svgStr[50][2] = "期待度数 > 5 <br> 推奨";
svgStr[51][2] = "&chi;<sup>2</sup> 檢定<br>區間 i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][2] = "データ<br>観測度数<br>(O<sub>i</sub>)";
svgStr[53][2] = "正規分布<br>期待確率<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][2] = "正規分布<br>期待度数<br>(E<sub>i</sub>)";
svgStr[55][2] = "&chi;<sup>2</sup> 値<br>(O<sub>i</sub>-E<sub>i</sub>)<sup>2</sup> / E<sub>i</sub>";
svgStr[56][2] = "総&chi;<sup>2</sup>値";
svgStr[57][2] = "確率ヒストグラム, 正規分布";
svgStr[58][2] = "正規Q-Qプロット";
svgStr[59][2] = "正規分位数";
svgStr[60][2] = "相關係数";
svgStr[61][2] = "決定係数";
svgStr[62][2] = "標準誤差";
svgStr[63][2] = "變数";
svgStr[64][2] = "變数名";
svgStr[65][2] = "獨立變数";
svgStr[66][2] = "從屬變数";
svgStr[67][2] = "母数";
svgStr[68][2] = "推定値";
svgStr[69][2] = "値";
svgStr[70][2] = "切片";
svgStr[71][2] = "傾き";
svgStr[72][2] = "要因";
svgStr[73][2] = "二乗和";
svgStr[74][2] = "自由度";
svgStr[75][2] = "偏差二乗和";
svgStr[76][2] = "回帰";
svgStr[77][2] = "誤差";
svgStr[78][2] = "全体";
svgStr[79][2] = "<h3>回帰分析</h3>";
svgStr[80][2] = "標準化残差Q-Qプロット";
svgStr[81][2] = "標準化残差";
svgStr[82][2] = "正規分位數";
svgStr[83][2] = "残差プロット";
svgStr[84][2] = "豫測値";
svgStr[85][2] = "二元分散分析";
svgStr[86][2] = "信頼区間プロット";
svgStr[87][2] = "残差";
svgStr[88][2] = "二元平均表";
svgStr[89][2] = "散布図行列";
svgStr[90][2] = "多重比較";
svgStr[91][2] = "統計量";
svgStr[92][2] = "因子";
svgStr[93][2] = "水準";
svgStr[94][2] = "対応標本差プロット";
svgStr[95][2] = "残差-豫測";
svgStr[96][2] = "残差-Leverage";
svgStr[97][2] = "Cook距離図";
svgStr[98][2] = "Cook距離";
svgStr[99][2] = "資料順序";
svgStr[100][2]= "平均差";
svgStr[101][2]= "平均差檢定";
svgStr[102][2]= "處理";
svgStr[103][2]= "交互作用";
svgStr[104][2]= "行合";
svgStr[105][2]= "列合";
svgStr[106][2]= "重相關係數";
svgStr[107][2]= "<h3>相關分析</h3>";
svgStr[108][2]= "相關係數行列";
svgStr[109][2]= "因子1-因子2 平均図";

svgStrU[1][2] = "二項分布";
svgStrU[2][2] = "反復数";
svgStrU[3][2] = "平均";
svgStrU[4][2] = "標準偏差";
svgStrU[5][2] = "ポアソン分布";
svgStrU[6][2] = "幾何分布";
svgStrU[7][2] = "超幾何分布";
svgStrU[8][2] = "母集団";
svgStrU[9][2] = "標本分布";
svgStrU[10][2] = "大数の法則";
svgStrU[11][2] = "裏";
svgStrU[12][2] = "表";
svgStrU[13][2] = "コイン表";
svgStrU[14][2] = "  表の数  ";
svgStrU[15][2] = "  試行回数  ";
svgStrU[16][2] = "標本平均の分布";
svgStrU[17][2] = "反復";
svgStrU[18][2] = "標準誤差";
svgStrU[19][2] = "母平均";
svgStrU[20][2] = "信頼区間";
svgStrU[21][2] = "推定精度";
svgStrU[22][2] = "標本平均";
svgStrU[23][2] = "[検定統計量] = ";
svgStrU[24][2] = "分布";
svgStrU[25][2] = "棄却 H\u2080";
svgStrU[26][2] = "採択 H\u2080";
svgStrU[27][2] = "p-値 = ";
svgStrU[28][2] = "[意思決定] ";
svgStrU[29][2] = "[分散分析]";
svgStrU[30][2] = "相関係数を入力し、実行ボタンをクリックしてください.";
svgStrU[31][2] = "回帰直線";
svgStrU[32][2] = "列変数";
svgStrU[33][2] = "行変数";
svgStrU[34][2] = "平均";
svgStrU[35][2] = "標準偏差";
svgStrU[36][2] = "<h3> 区間別<br>度数分布表</h3>";
svgStrU[37][2] = "グループ名";
svgStrU[38][2] = "階級区間";
svgStrU[39][2] = "幹";
svgStrU[40][2] = " 葉";
svgStrU[41][2] = "グループ 1  葉";
svgStrU[42][2] = "グループ 2  葉";
svgStrU[43][2] = "<h3>基本統計量</h3>";
svgStrU[44][2] = "データの数";
svgStrU[45][2] = "最小値";
svgStrU[46][2] = "中央値";
svgStrU[47][2] = "最大値";
svgStrU[48][2] = "全体";
svgStrU[49][2] = "指数分布";
svgStrU[50][2] = "一様分布";
svgStrU[51][2] = "推定の精度";
svgStrU[52][2] = "- マウスクリックして3個以上の点を配置すると回帰直線が作成される";
svgStrU[53][2] = "- クリックして1つの点を移動/削除しながら回帰直線の変化を観察";
svgStrU[54][2] = "[標本統計量] ";
svgStrU[55][2] = "[標本 1 統計量] ";
svgStrU[56][2] = "[標本 2 統計量] ";
svgStrU[57][2] = "信頼水準";
svgStrU[58][2] = "行列独立";
svgStrU[59][2] = "行列独立ない";
svgStrU[60][2] = "観測分布";
svgStrU[61][2] = "理論分布";
svgStrU[62][2] = "観測分布適合性檢定";
svgStrU[63][2] = "Wilcoxon順位合檢定";
svgStrU[64][2] = "Wilcoxon順位合檢定分布表";
svgStrU[65][2] = "Kruskal-Wallis檢定";
svgStrU[66][2] = "Kruskal-Wallis檢定 分布表";
svgStrU[67][2] = "Kruskal-Wallis H統計量";
svgStrU[68][2] = "Wilcoxon 符號順位檢定";
svgStrU[69][2] = "符號檢定";
svgStrU[70][2] = "Friedman檢定";
svgStrU[71][2] = "Friedman S 統計量";
svgStrU[72][2] = "Friedman檢定分布表";
// Chinese
$.message.zhTW = {
    "eStat : Stat Education SW": "eStat: 統計教育軟體",
    "Filename": "檔名",
    "Selected Variables": "選擇變數",
    "Cancel": "取消",
    "Edit Variables": "編輯變數",
    "Level": "級別",
    "ElementaryLevel": "小學",
    "MiddleLevel": "中學",
    "HighLevel": "高學",
    "UniversityLevel": "大學",
    "Example": "例題",
    "New Sheets": "新工作表",
    "csv Open": "開啟csv檔",
    "www Open": "開啟網頁",
    "json Open": "開啟json檔",
    "csv Save": "儲存csv",
    "json Save": "儲存json",
    "Print Sheet": "列印工作表",
    "Bar Graph": "長條圖",
    "Pie Chart": "圓餅圖",
    "Band Graph": "帶狀圖",
    "Line Graph": "折線圖",
    "Dot Graph": "點圖",
    "Histogram": "直方圖",
    "Stem & Leaf Plot": "莖葉圖",
    "Box-Whisker Plot": "盒形圖",
    "Scatterplot": "散佈圖",
    "Frequency Table": "次數分佈表",
    "Basic Statistics": "基本統計量",
    "Testing Hypothesis &mu;": "假設檢定 &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "假設檢定 &sigma;<sup>2</sup>",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "假設檢定 &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "假設檢定 &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Analysis of Variance": "變異數分析",
    "High School Stat Education": "高級中學統計教育",
    "University Stat Education": "大學統計教育",
    "Elem Stat Graph Example": "小中學圖表例題",
    "Learning eStat w Example": "eStat例題學習",
    "Vertical Separated Bar": "縱向分離長條圖",
    "Vertical Stacked Bar": "縱向堆壘長條圖",
    "Vertical Ratio Bar": "縱向比率長條圖",
    "Vertical Side by Side Bar": "縱向並排長條圖",
    "Vertical Two Sided Bar": "縱向雙邊長條圖圖",
    "Horizontal Separated Bar": "橫向分離長條圖",
    "Horizontal Stacked Bar": "橫向堆壘長條圖",
    "Horizontal Ratio Bar": "橫向比率長條圖",
    "Horizontal Side by Side Bar": "橫向並排長條圖",
    "Horizontal Two Sided Bar": "横向雙邊長條圖",
    "Doughnut Graph": "圓環圖",
    "Two Sided Stem & Leaf Plot": "雙邊莖葉圖",
    "Graph Save": "儲存圖形",
    "Graph Print": "列印圖形",
    "Move to Table": "移動至表格",
    "Edit Title": "編輯標題",
    "Table Save": "儲存表格",
    "Table Print": "列印表格",
    "Frequency": "次數",
    "(Sorting)": "(排序)",
    "Raw Data": "原始資料",
    "Descending": "下降的",
    "Ascending": "上昇的",
    "Mean": "平均數",
    "Std Deviation": "標準差",
    "MeanStd": "平均/標準差",
    "95CI": "95%信頼区間",
    "RegressionAnalysis": "回歸分析",
    "ANOVA2": "2元分散分析",

    "Regression": "回歸",
    "Frequency Polygon": "次數分佈多邊形",
    "Frequency Table": "次數分佈表",
    "Execute New Interval": "執行新區間",
    "Interval Start": "區間起點",
    "Interval Width": "區間間幅",
    "t-test": "t-檢定",
    "Z-test": "Z-檢定",
    "(if Z-test, enter &sigma;)": "(Z-檢定, &sigma)",
    "Significance Level": "顯著水準",
    "Execute": "執行",
    "(Confidence Interval)": "(信頼區間)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Z-檢定, Z, &sigma;使用)",
    "&chi;<sup>2</sup> test": "&chi;<sup>2</sup> 檢定",
    "Variance Assumption": "變異數假設",
    "F test": "F 檢定",
    "At least one pair of means is different": "至少有一對平均數不相等",
    "Main Title : ": "主標題 : ",
    "y title : ": "y軸標題 : ",
    "x title : ": "x軸標題 : ",
    "Modify": "修正",
    "Confirm": "確認",
    "Variable Name": "變數名",
    "Variable Value": "變數値",
    "Value Label": "變數標號",
    "* Less than nine value labels allowed.": "* 准許9個以下變數標號。",
    "Save": "儲存",
    "Exit": "離開",
    "eStatU UnivStatEdu": "eStatU - 大學統計教育軟體",
    "eStatH HighStatEdu": "eStatH - 中學統計教育軟體",
    "Menu": "選單",
    "Binomial Experiment": "二項式分佈實驗",
    "Binomial Distribution": "二項式分佈",
    "Binomial Prob Table": "二項分佈機率表",
    "Poisson Distribution": "卜瓦松分佈",
    "Poisson Prob Table": "卜瓦松機率分佈表",
    "Geometric Distribution": "幾何分佈",
    "Geometric Prob Table": "幾何機率分佈表",
    "HyperGeometric Distribution": "超幾何分佈",
    "HyperGeometric Prob Table": "超幾何機率分佈表",
    "Exponential Distribution": "指數分佈",
    "Normal Experiment": "常態分佈實驗",
    "Normal Distribution": "常態分佈",
    "Normal Approx": "常態分佈逼近",
    "t Distribution": "t 分佈",
    "ChiSquare Distribution": "卡方分佈",
    "F Distribution": "F 分佈",
    "Sampling": "抽樣",
    "Population vs Sample": "母體 vs 樣本",
    "Population": "母體",
    "Sample": "樣本",
    "Exponential": "指數分佈(0.3)",
    "Uniform": "均勻分佈(0,1)",
    "Sample05": "5% 樣本抽出",
    "Sample10": "10% 樣本抽出",
    "Sample20": "20% 樣本抽出",
    "Statistics/BoxPlot": "統計量/盒形圖",
    "Law of Large Number": "大數法則",
    "Dist of Sample Means": "樣本平均的分佈",
    "Sample Size": "樣本數",
    "Confidence Interval": "信頼區間",
    "Estimation Accuracy": "估計準確率",
    "Repetition": "重覆數",
    "Confidence Level": "信頼水準",
    "Testing Hypothesis mu_titleAB": "假設檢定平均數",
    "Testing Hypothesis mu_title": "平均數檢定",
    "Testing Hypothesis sigma_title": "變異數檢定",
    "Testing Hypothesis P_title": "比例檢定",
    "Testing Hypothesis mu12_title": "兩母體平均數檢定",
    "Testing Hypothesis sigma12_title": "兩母體變異數檢定",
    "Testing Hypothesis P12_title": "兩母體比例檢定",
    "Testing Hypothesis muAB": "假設檢定 &mu; - &alpha;, &beta;",
    "Testing Hypothesis mu": "區間估計/假設檢定: 平均數&mu;",
    "Testing Hypothesis sigma": "區間估計/假設檢定: 變異數&sigma;<sup>2</sup>",
    "Testing Hypothesis P": "區間估計/假設檢定: 比例 P",
    "Testing Hypothesis mu12": "假設檢定 : &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "假設檢定 : &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Testing Hypothesis P12": "假設檢定 : P<sub>1</sub>, P<sub>2</sub>",
    "Testing Hypothesis ANOVA": "變異數分析",
    "Testing Independence": "獨立性檢定",
    "Correlation Coefficient": "相關係數",
    "Regression Experiment": "迴歸實驗",
    "Hypothesis": "假設",
    "Test Type": "檢定型式",
    "Z-test": "Z-檢定",
    "t-test": "t-檢定",
    "Chi-test": "卡方檢定",
    "F-test": "F-檢定",
    "Sampling Type": "標本",
    "Independent Sample": "独立２標本",
    "Paired Sample": "対応のある２標本",
    "Sample Data": "樣本資料",
    "input either sample data": "於接下來的對話視窗，使用csv/bsv格式輸入樣本資料或樣本統計量",
    "Sample Statistics": "樣本統計量",
    "Sample Mean": "樣本平均",
    "Sample Variance": "樣本變異數",
    "Sample Proportion": "樣本比例",
    "if Z-test-1": "(Z-檢定, 母分散入力)",
    "if Z-test-2": "(Z-檢定, Z<sub>1-&alpha;/2 </sub> 使用)",
    "Variance Assumption": "變異數假設",
    "At least one pair": "至少有一對平均數不相等",
    "Row-Col-0": "列變數與行變數獨立",
    "Row-Col-1": "列變數與行變數不獨立",
    "Enter any number of row": "(由左上角儲存格輸入數字)",
    "Row": "列",
    "Column": "行",
    "Show Probability": "顯示機率",
    "Regression Line": "迴歸線",
    "Erase All": "清除營幕",
    "Add Point": "增加點",
    "Erase Point": "刪除點",
    "Reference Site": "参考站",
    "Lot Size": "Lot數",
    "Defect Size": "不良品數",
    "If typed": "(若數字已輸入)",
    "Stat/BoxPlot": "統計量/盒形圖",
    "Mean": "平均",
    "Std Dev": "標準差",
    "SimulationWarning": "(Current simulation should be finished before you start the next simulation.)",
    "OneGroup": "(1群)",
    "RegressionBand": "信頼帯",
    "RegressionTable": "回帰分析",
    "RegressionResidual": "殘差図",
    "RegressionResidualLeverage": "殘差 - Leverage",
    "RegressionCook": "Cook距離図",
    "RegressionQQ": "殘差Q-Q図",
    "HistogramNormal": "直方圖",
    "HistogramChisq": "正規性検定",
    "HistogramNormalQQ": "正規Q-Q図",
    "PopulationStd": "母標準差",
    "Type1Error": "1種誤謬",
    "Type2Error": "2種誤謬",
    "AnovaTable": "分散分析表",
    "AnovaMeanGraph": "信賴區間圖",
    "MultipleComparison": "多重比較",
    "AnovaResidual": "殘差図",
    "AnovaQQ": "殘差Q-Q図",
    "TestingFit": "適合性檢定",
    "FitTest0": "觀察分布 = 理論分布",
    "FitTest1": "觀察分布 = 理論分布",
    "ObservedFreq": "觀察度數 O",
    "ExpectedProb": "期待確率 p",
    "ExpectedFreq": "期待度數 E(>5)",
    "InputFitData": "左上入力始作",
    "ExecuteTable": "統計量",
    "MeanDotGraph": "信賴區間圖",
    "ScatterRegression": "散布図",
    "Factor": "因子",
    "Interaction": "交互作用",
    "NoInteraction": "交互作用無",
    "ExistInteraction": "交互作用有",
    "eStatLecture": "eStat 入門講義",
    "NonParametricMu12_title": "Wilcoxon 順位合檢定", 
    "NonParametricMu12": "Wilcoxon 順位合檢定 : 位置母數 &mu;<sub>1</sub>, &mu;<sub>2</sub>", 
    "Sample Range": "標本範圍",
    "DistributionTable": "分布表",
    "SignedRankTest": "Wilcoxon 符號順位檢定",
    "SignTest": "符號檢定",
    "SignCount": "符號數",
    "WilcoxonTest": "Wilcoxon 順位合檢定",
    "KruskalTest": "Kruskal-Wallis 檢定",
    "KruskalTestANOVA": "Kruskal-Wallis 檢定 : 位置母數 &mu;<sub>1</sub>, &mu;<sub>2</sub>, &mu;<sub>3</sub> ",
    "Total": "全体",
    "FriedmanTest": "Friedman檢定",
    "FriedmanTestANOVA": "Friedman檢定 : 位置母数 &mu;<sub>1</sub>, &mu;<sub>2</sub>, ... , &mu;<sub>k</sub> ",
    "Block": "Block",
    "Treatment": "處理",
    "At least one locations is different": "位置母数 !=",
    "SignCondition": "n ≤ 100 二項分布檢定,  n > 100 正規近似檢定",
    "WilcoxonSignCondition": "n ≤ 20 Wilcoxon 順位合檢定t,  n > 20 正規近似檢定",
    "WilcoxonRankCondition": "n=n<sub>1</sub>+n<sub>2</sub> ≤ 25  順位合檢定,  n>25 正規近似檢定",
    "KruskalCondition": "n ≤ 10 H 分布檢定,  n > 100 &chi;<sup>2</sup>近似檢定",

};
appStr[1][3] = "../eStatH/index.html";
appStr[2][3] = "../eStatU/index.html";
appStr[3][3] = "../eStatE/index_en.html";
appStr[4][3] = "../ExLearning/index_en.html";
appStr[5][3] = "index.html";
appStr[6][3] = "../ExLecture/index_en.html";
alertMsg[1][3] = "所選擇的變數，其中之一沒有包含資料。";
alertMsg[2][3] = "逐一選取變數進行分析(選按欄位名稱)。若是同時選取兩變數，則第一個視為群組變數。";
alertMsg[3][3] = "所選的變數有缺失值。";
alertMsg[4][3] = "若選取的變數觀察值不同，則無法進行分析。";
alertMsg[5][3] = "群組數太多! 圖形可能因營幕太小而互相重疊。";
alertMsg[6][3] = "若摘要資料中要進行分析的變數包含文字，則無法進行分析及製作圖表。";
alertMsg[7][3] = "若原始資料有超過3個變數被選擇，則無法進行分析及製作圖表。";
alertMsg[8][3] = "點圖可使用於觀察值個數少於200的資料。";
alertMsg[9][3] = "莖葉圖可使用於觀察值個數少於100的資料。";
alertMsg[12][3] = "若分析的變數包含文字，則無法進行分析及製作圖表。";
alertMsg[14][3] = "連續型圖形及假設檢定無法進行摘要資料。";
alertMsg[16][3] = "此假設檢定僅限定於兩群母體。";
alertMsg[17][3] = "繪製散佈圖至少需要橫軸變數及縱軸變數。";
alertMsg[18][3] = "繪製散佈圖不得超過3個變數。";
alertMsg[19][3] = "若X變數包含文字，則散佈圖無法繪製。";
alertMsg[20][3] = "若Y變數包含文字，則散佈圖無法繪製。";
alertMsg[21][3] = "若資料有缺失值，則無法儲存。";
alertMsg[22][3] = "若資料有負值，長條圖無法繪製。";
alertMsg[25][3] = "若資料只有一個群組，則堆壘長條圖無法繪製。";
alertMsg[27][3] = "若資料只有一個群組，則比例長條圖無法繪製。";
alertMsg[29][3] = "若資料只有一個群組，則並排長條圖無法繪製。";
alertMsg[31][3] = "若資料只有一個群組，則雙邊長條圖無法繪製。";
alertMsg[32][3] = "若資料有負值，則圓餅圖無法繪製。";
alertMsg[33][3] = "若資料有負值，則圓環圖無法繪製。";
alertMsg[34][3] = "若資料有負值，則帶狀圖無法繪製。";
alertMsg[35][3] = "若資料有負值，則次數分配表格無法繪製。";
alertMsg[36][3] = "此長條圖僅限於兩群組。";
alertMsg[37][3] = "此假設檢定僅限於單一變數。";
alertMsg[38][3] = "mu 不是一個數字。請輸入一數值並重新執行!";
alertMsg[39][3] = "標準差為0或不是一個數字，請重新執行!";
alertMsg[40][3] = "輸入的變異數不是一個數字，請輸入一數值並重新執行!";
alertMsg[41][3] = "此假設檢定僅限於兩變數。群組變數則需包含兩群。";
alertMsg[42][3] = "假設檢定的標題不可編輯! ";
alertMsg[43][3] = "Simple Linear Regression is only for one group";
svgStr[1][3] = " 長條圖";
svgStr[2][3] = " 圓餅圖";
svgStr[3][3] = " 圓環圖";
svgStr[4][3] = " 帶狀圖";
svgStr[5][3] = " 折線圖";
svgStr[6][3] = " 點圖";
svgStr[7][3] = " 盒形圖";
svgStr[8][3] = " 莖葉圖";
svgStr[9][3] = " 直方圖";
svgStr[10][3] = " 散佈圖";
svgStr[11][3] = " 假設檢定: 母體平均數";
svgStr[12][3] = " 假設檢定: 母體變異數";
svgStr[13][3] = " 假設檢定: 兩母體平均數";
svgStr[14][3] = " 假設檢定: 兩母體變異數";
svgStr[15][3] = " 變異數分析";
svgStr[16][3] = "次數";
svgStr[17][3] = "比例";
svgStr[18][3] = "群組";
svgStr[19][3] = " ";
svgStr[20][3] = "<h3>摘要資料<br>次數分配表</h3>";
svgStr[21][3] = "群組變數";
svgStr[22][3] = "列變數";
svgStr[23][3] = "總和";
svgStr[24][3] = "總和";
svgStr[25][3] = "<h3>次數分配表</h3>";
svgStr[26][3] = "變異數分析";
svgStr[27][3] = "變數値";
svgStr[28][3] = "變數值標號";
svgStr[29][3] = "次數";
svgStr[30][3] = "百分比(%)";
svgStr[31][3] = "<h3>交叉表</h3>";
svgStr[32][3] = "行變數";
svgStr[33][3] = "列變數";
svgStr[34][3] = "平均"
svgStr[35][3] = "標準差"
svgStr[36][3] = "<h3> 直方圖<br>次數分配表</h3>";
svgStr[37][3] = "群組名稱";
svgStr[38][3] = "階級區間";
svgStr[39][3] = "莖";
svgStr[40][3] = "葉";
svgStr[41][3] = "群組一 葉";
svgStr[42][3] = "群組二 葉"
svgStr[43][3] = "<h3>基本統計量</h3>";
svgStr[44][3] = "觀察值";
svgStr[45][3] = "最小値";
svgStr[46][3] = "中位値";
svgStr[47][3] = "最大値";
svgStr[48][3] = "全體";
svgStr[49][3] = "<h3>正規性檢定</h3>";
svgStr[50][3] = "期待度數 > 5 <br> 勸獎";
svgStr[51][3] = "&chi;<sup>2</sup> 檢定<br>Interval i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][3] = "資料<br>觀察度數<br>(O<sub>i</sub>)";
svgStr[53][3] = "正規分布<br>期待確率<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][3] = "正規分布<br>期待度數<br>(E<sub>i</sub>)";
svgStr[55][3] = "各區間l<br>&chi;<sup>2</sup> 値<br>(O<sub>i</sub>-E<sub>i</sub>)<sup>2</sup> / E<sub>i</sub>";
svgStr[56][3] = "合&chi;<sup>2</sup>値";
svgStr[57][3] = "確率直方圖,正規分布";
svgStr[58][3] = "正規 Q-Q圖";
svgStr[59][3] = "正規 分位數";
svgStr[60][3] = "相関係数";
svgStr[61][3] = "決定係數";
svgStr[62][3] = "標準誤差";
svgStr[63][3] = "変数";
svgStr[64][3] = "変数名";
svgStr[65][3] = "独立変数";
svgStr[66][3] = "従属変数";
svgStr[67][3] = "母數";
svgStr[68][3] = "推定値";
svgStr[69][3] = "値";
svgStr[70][3] = "切片";
svgStr[71][3] = "斜率";
svgStr[72][3] = "要因";
svgStr[73][3] = "平方和";
svgStr[74][3] = "自由度";
svgStr[75][3] = "平均和";
svgStr[76][3] = "回帰";
svgStr[77][3] = "誤差";
svgStr[78][3] = "全體";
svgStr[79][3] = "<h3>回帰分析</h3>";
svgStr[80][3] = "標準化残差 Q-Q圖";
svgStr[81][3] = "標準化残差";
svgStr[82][3] = "正規分位數";
svgStr[83][3] = "残差圖";
svgStr[84][3] = "豫測値";
svgStr[85][3] = "二元分散分析";
svgStr[86][3] = "信頼区間圖";
svgStr[87][3] = "残差";
svgStr[88][3] = "二元平均表";
svgStr[89][3] = "散佈圖行列";
svgStr[90][3] = "多重比較";
svgStr[91][3] = "統計量";
svgStr[92][3] = "因子";
svgStr[93][3] = "水準";
svgStr[94][3] = "対応標本差圖";
svgStr[95][3] = "残差-豫測";
svgStr[96][3] = "残差-Leverage";
svgStr[97][3] = "Cook距離図";
svgStr[98][3] = "Cook距離";
svgStr[99][3] = "資料順序";
svgStr[100][3]= "平均差";
svgStr[101][3]= "平均差檢定";
svgStr[102][3]= "處理";
svgStr[103][3]= "交互作用";
svgStr[104][3]= "行合";
svgStr[105][3]= "列合";
svgStr[106][3]= "重相關係數";
svgStr[107][3]= "<h3>相關分析</h3>";
svgStr[108][3]= "相關係數行列";
svgStr[109][3]= "因子1-因子2 平均図";

svgStrU[1][3] = "二項式分佈";
svgStrU[2][3] = "重覆數";
svgStrU[3][3] = "平均";
svgStrU[4][3] = "標準差";
svgStrU[5][3] = "卜瓦松分佈";
svgStrU[6][3] = "幾何分佈";
svgStrU[7][3] = "超幾何分佈";
svgStrU[8][3] = "母體";
svgStrU[9][3] = "樣本分佈";
svgStrU[10][3] = "大數法則";
svgStrU[11][3] = "反面";
svgStrU[12][3] = "正面";
svgStrU[13][3] = "硬幣正面";
svgStrU[14][3] = "  正面個數  ";
svgStrU[15][3] = "  試驗次數  ";
svgStrU[16][3] = "樣本平均分佈";
svgStrU[17][3] = "重覆";
svgStrU[18][3] = "標準誤差";
svgStrU[19][3] = "母體平均";
svgStrU[20][3] = "信頼區間";
svgStrU[21][3] = "估計準確率";
svgStrU[22][3] = "樣本平均";
svgStrU[23][3] = "[檢定統計量] = ";
svgStrU[24][3] = "分佈";
svgStrU[25][3] = "拒絕虛無假設";
svgStrU[26][3] = "接受虛無假設";
svgStrU[27][3] = "p-値 = ";
svgStrU[28][3] = "[決策] ";
svgStrU[29][3] = "[變異數分析]";
svgStrU[30][3] = "輸入相關係數後按執行";
svgStrU[31][3] = "迴歸分析";
svgStrU[32][3] = "列變量";
svgStrU[33][3] = "行變量";
svgStrU[34][3] = "平均"
svgStrU[35][3] = "標準差"
svgStrU[36][3] = "<h3> 直方圖<br>次數分佈表</h3>";
svgStrU[37][3] = "群組名稱";
svgStrU[38][3] = "階級區間";
svgStrU[39][3] = "莖";
svgStrU[40][3] = " 葉";
svgStrU[41][3] = "群組1 葉";
svgStrU[42][3] = "群組2 葉";
svgStrU[43][3] = "<h3>基本統計量</h3>";
svgStrU[44][3] = "資料數";
svgStrU[45][3] = "最小値";
svgStrU[46][3] = "中位數";
svgStrU[47][3] = "最大値";
svgStrU[48][3] = "全體";
svgStrU[49][3] = "指數分佈";
svgStrU[50][3] = "均勻分佈";
svgStrU[51][3] = "估計準確率";
svgStrU[52][3] = "- 按一下滑鼠來制造觀察點，eStat會計算出回歸線。";
svgStrU[53][3] = "- 移動或刪除一個觀察點，觀看迴歸線的變化。";
svgStrU[54][3] = "[樣本統計量] ";
svgStrU[55][3] = "[樣本 1 統計量] ";
svgStrU[56][3] = "[樣本 2 統計量] ";
svgStrU[57][3] = "信頼水準";
svgStrU[58][3] = "列行獨立";
svgStrU[59][3] = "列行不獨立";
svgStrU[60][3] = "觀察分布";
svgStrU[61][3] = "理論分布";
svgStrU[62][3] = "觀察分布 適合性檢定";
svgStrU[63][3] = "Wilcoxon 順位合檢定";
svgStrU[64][3] = "Wilcoxon 順位合檢定 分布表";
svgStrU[65][3] = "Kruskal-Wallis 檢定";
svgStrU[66][3] = "Kruskal-Wallis 檢定 分布表";
svgStrU[67][3] = "Kruskal-Wallis H 統計量";
svgStrU[68][3] = "Wilcoxon 符號順位檢定";
svgStrU[69][3] = "符號檢定";
svgStrU[70][3] = "Friedman檢定";
svgStrU[71][3] = "Friedman S 統計量";
svgStrU[72][3] = "Friedman檢定分布表";

// French
$.message.fr = {
    "eStat : Stat Education SW": "eStat : Stat éducation SW",
    "Filename": "Nom de fichier",
    "Selected Variables": "Var Sélectionnées",
    "Cancel": "Annuler",
    "Edit Variables": "EditVar",
    "Level": "Niveau",
    "ElementaryLevel": "E",
    "MiddleLevel": "I",
    "HighLevel": "H",
    "UniversityLevel": "U",
    "Example": "Exemple",
    "New Sheets": "Nouvelles feuilles de calcul",
    "csv Open": "csv Ouvert",
    "www Open": "www Ouvert",
    "json Open": "json Ouvert",
    "csv Save": "csv Sauvegarder",
    "json Save": "json Sauvegarder",
    "Print Sheet": "Imprimer la page",
    "Bar Graph": "Diagramme en barres",
    "Pie Chart": "Camembert",
    "Band Graph": "Graphique à bandes",
    "Line Graph": "Graphique en courbe",
    "Dot Graph": "Graphique à points",
    "Histogram": "Histogramme",
    "Stem & Leaf Plot": "Diagramme tige-feuille",
    "Box-Whisker Plot": "Boîte à moustaches",
    "Scatterplot": "Diagramme de dispersion",
    "Frequency Table": "Tableau des fréquences",
    "Basic Statistics": "Statistiques élémentaires",
    "Testing Hypothesis &mu;": "Test d'hypothèse &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "Test d'hypothèse &sigma;<sup>2</sup>",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "Test d'hypothèse &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Analysis of Variance": "Analyse de la variance",
    "High School Stat Education": "L'enseignement de la statistique au lycée",
    "University Stat Education": "Enseignement de la statistique à l'université",
    "Elem Stat Graph Example": "élémentaire Statistiques graphique Exemple",
    "Learning eStat w Example": "Apprendre eStat par l'exemple",
    "Vertical Separated Bar": "Barre verticale séparée",
    "Vertical Stacked Bar": "Barre verticale empiléer",
    "Vertical Ratio Bar": "Barre verticale de ratio",
    "Vertical Side by Side Bar": "Barre verticale accolée",
    "Vertical Two Sided Bar": "Barre verticale double face",
    "Horizontal Separated Bar": "Barre horizontal séparée",
    "Horizontal Stacked Bar": "Barre horizontal empiléer",
    "Horizontal Ratio Bar": "Barre horizontale de ratio",
    "Horizontal Side by Side Bar": "Barre horizontal accolée",
    "Horizontal Two Sided Bar": "Barre horizontal double face",
    "Doughnut Graph": "Graphique en anneau",
    "Two Sided Stem & Leaf Plot": "Diagramme tige-feuille double face",
    "Graph Save": "Sauvegarder le graphique",
    "Graph Print": "Imprimer le graphique",
    "Move to Table": "Aller à la table",
    "Edit Title": "éditer le titre",
    "Table Save": "Sauvegarder le tableau",
    "Table Print": "Imprimer le tableau",
    "Frequency": "Fréquence",
    "(Sorting)": "(Tri)",
    "Raw Data": "Donnée brute",
    "Descending": "Descendant",
    "Ascending": "Ascendant",
    "Mean": "Moyenne",
    "Std Deviation": "Ecart-type",
    "MeanStd": "Moyenne/Ecart-type",
    "95CI": "95% Intervalle de confinace",
    "RegressionAnalysis": "Régression Analyse",
    "ANOVA2": "Two way ANOVA",
    "Regression": "Régression",
    "Frequency Polygon": "Polygone des fréquences",
    "Frequency Table": "Tableau des fréquences",
    "Execute New Interval": "Faire un nouvel intervallel",
    "Interval Start": "Début de l'intervalle",
    "Interval Width": "Largeur de l'intervalle",
    "t-test": "t-test",
    "Z-test": "Z-test",
    "(if Z-test, enter &sigma;)": "(Pour le Z-test entrez &sigma;)",
    "Significance Level": "Niveau de signification",
    "Execute": "Exécuter",
    "(Confidence Interval)": "(Intervalle de confinace)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Pour le Z-test, Z, &sigma;utilisé)",
    "&chi;<sup>2</sup> test": "&chi;<sup>2</sup> test",
    "Variance Assumption": "Hypothèse de variance",
    "F test": "F test",
    "At least one pair of means is different": "Au moins deux moyennes sont différentes",
    "Main Title : ": "Titre principal : ",
    "y title : ": "y Titre : ",
    "x title : ": "x Titre : ",
    "Modify": "Modifiez",
    "Confirm": "Confirmer",
    "Variable Name": "Nom de variable",
    "Variable Value": "Valeur de la variable",
    "Value Label": "Libellé  d'une valeurl",
    "* Less than nine value labels allowed.": "* Il faut moins de neuf libellésd.",
    "Save": "Sauvegarder",
    "Exit": "Terminer",
    "eStatU UnivStatEdu": "eStatU - Enseignement de la statistique à l'université SW",
    "eStatH HighStatEdu": "eStatH - L'enseignement de la statistique au lycée SW",
    "Menu": "Menu",
    "Binomial Experiment": "Essai binomialt",
    "Binomial Distribution": "Loi binomiale",
    "Binomial Prob Table": "Table de la loi binomiale",
    "Poisson Distribution": "Loi Poisson",
    "Poisson Prob Table": "Table de la loi de Poisson",
    "Geometric Distribution": "Loi géométrique",
    "Geometric Prob Table": "Table de la loi géométrique",
    "HyperGeometric Distribution": "Loi hypergéométrique",
    "HyperGeometric Prob Table": "Table de la loi hypergéométrique",
    "Exponential Distribution": "Loi exponentielle",
    "Normal Experiment": "Expérience gaussienne",
    "Normal Distribution": "Loi normale",
    "Normal Approx": "Approximation normale",
    "t Distribution": "t Distribution",
    "ChiSquare Distribution": "ChiSquare Distribution",
    "F Distribution": "F Distribution",
    "Sampling": "Echantillonnage",
    "Population vs Sample": "Population vs Echantillon",
    "Population": "Population",
    "Sample": "Echantillon",
    "Exponential": "Exponentiellel(0.3)",
    "Uniform": "Uniforme(0,1)",
    "Sample05": "Echantillonnage 5%",
    "Sample10": "Echantillonnage 10%",
    "Sample20": "Echantillonnage 20%",
    "Statistics/BoxPlot": "Statistiques/Boîte à moustaches",
    "Law of Large Number": "Loi des grands nombres",
    "Dist of Sample Means": "Distribution des moyennes d'échantillon",
    "Sample Size": "Taille de l'échantillon",
    "Confidence Interval": "Intervalle de confinace",
    "Estimation Accuracy": "Précision de l'estimation",
    "Repetition": "Répétition",
    "Confidence Level": "Niveau de confiance",
    "Testing Hypothesis mu_titleAB": "Test d'hypothèse : &mu;",
    "Testing Hypothesis mu_title": "Test moyenne",
    "Testing Hypothesis sigma_title": "Test variance",
    "Testing Hypothesis P_title": "Test proportion",
    "Testing Hypothesis mu12_title": "Test deux moyennes de population",
    "Testing Hypothesis sigma12_title": "Test deux variances de population",
    "Testing Hypothesis P12_title": "Test deux proportion de population",
    "Testing Hypothesis muAB": "Test d'hypothèse &mu; - &alpha;, &beta;",
    "Testing Hypothesis mu": "Test d'hypothèse &mu;",
    "Testing Hypothesis sigma": "Test d'hypothèse &sigma;<sup>2</sup>",
    "Testing Hypothesis P": "Test d'hypothèse P",
    "Testing Hypothesis mu12": "Test d'hypothèse &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "Test d'hypothèse &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Testing Hypothesis P12": "Test d'hypothèse P<sub>1</sub>, P<sub>2</sub>",
    "Testing Hypothesis ANOVA": "Test d'hypothèse ANOVA",
    "Testing Independence": "Test d'indépendance",
    "Correlation Coefficient": "Coefficient de corrélation",
    "Regression Experiment": "Essai de régression",
    "Hypothesis": "Hypothèse",
    "Test Type": "Type de test",
    "Z-test": "Z-test",
    "t-test": "t-test",
    "Chi-test": "&chi;<sup>2</sup>-test",
    "F-test": "F-test",
    "Sampling Type": "Sampling Type",
    "Independent Sample": "independent",
    "Paired Sample": "paired",
    "Sample Data": "Données échantillonnées",
    "input either sample data": "Entrez soit la taille de l'échantillon, soit  les statistiques de l'échantillon dans les cases suivantes en séparant par  des virgules ou des blancs",
    "Sample Statistics": "Statistiques de l'échantillon",
    "Sample Mean": "Moyenne de l'échantillon",
    "Sample Variance": "Variance de l'échantillon",
    "Sample Proportion": "Pourcentage de l'échantillon",
    "if Z-test-1": "(if Z-test, Pour le Z-test, entrez la variance de la population &sigma;<sup>2</sup>)",
    "if Z-test-2": "(if Z-test, Z<sub>1-&alpha;/2 </sub> utilisé.)",
    "Variance Assumption": "Hypothèse de variance",
    "At least one pair": "Au moins deux moyennes sont différentes ",
    "Row-Col-0": "Les variables en ligne et en colonne sont indépendantes",
    "Row-Col-1": "Les variables en ligne et en colonne ne sont pas indépendantes",
    "Enter any number of row": "(Entrez les observations à partir de la case en haut à gauche)",
    "Row": "Ligne",
    "Column": "Colonne",
    "Show Probability": "Montrez la probabilité",
    "Regression Line": "Droite de régressione",
    "Erase All": "Effacer tout",
    "Add Point": "Ajouter un point",
    "Erase Point": "Effacer le point",
    "Reference Site": "Site de référence",
    "Lot Size": "Taille du lot",
    "Defect Size": "Taille du défaute",
    "If typed": "(Si le numéro est saisi)",
    "Stat/BoxPlot": "Statistiques/Boîte à moustaches",
    "Mean": "Moyenne",
    "Std Dev": "Ecart-type",
    "SimulationWarning": "(Current simulation should be finished before you start the next simulation.)",
    "OneGroup": "(1 groupe)",
    "RegressionBand": "Confinace Bandes",
    "RegressionTable": "Régressione Analysis",
    "RegressionResidual": "Residual Diagramme",
    "RegressionResidualLeverage": "Residual vs Leverage",
    "RegressionCook": "Cook's Distance Graph",
    "RegressionQQ": "Residual Q-Q Diagramme",
    "HistogramNormal": "Histogramme",
    "HistogramChisq": "Normale Test",
    "HistogramNormalQQ": "Normale Q-Q Diagramme",
    "PopulationStd": "Population Ecart-type",
    "Type1Error": "Type 1 Error",
    "Type2Error": "Type 2 Error",
    "AnovaTable": "ANOVA Table",
    "AnovaMeanGraph": "Mean Confidence Interval",
    "MultipleComparison": "Multiple Comparison",
    "AnovaResidual": "Residual Plot",
    "AnovaQQ": "Residual Q-Q Plot",
    "TestingFit": "Goodness of Fit Test",
    "FitTest0": "Observed & theoretical Distributions are the same",
    "FitTest1": "Observed & theoretical Distributions are different",
    "ObservedFreq": "Observed Frequency O",
    "ExpectedProb": "Expected Probability p",
    "ExpectedFreq": "Expected Frequency E(>5)",
    "InputFitData": "Enter cell from upper left cell",
    "ExecuteTable": "Statistics",
    "MeanDotGraph": "Confidence Interval Graph",
    "ScatterRegression": "Scatter Plot",
    "Factor": "Factor",
    "Interaction": "Interaction",
    "NoInteraction": "No Interaction",
    "ExistInteraction": "Exist Interaction",
    "eStatLecture": "eStat Intro Lecture",
    "NonParametricMu12_title": "Wilcoxon Rank Sum Test", 
    "NonParametricMu12": "Wilcoxon Rank Sum Test : Location Parameter &mu;<sub>1</sub>, &mu;<sub>2</sub>", 
    "WilcoxonTest": "Wilcoxon Rank Sum Test",
    "Sample Range": "Sample Range",
    "DistributionTable": "Distribution Table",
    "SignedRankTest": "Wilcoxon Signed Rank Sum Test",
    "SignTest": "Sign Test",
    "SignCount": "Sign Count",
    "KruskalTest": "Kruskal-Wallis Test",
    "KruskalTestANOVA": "Kruskal-Wallis Test : Location Parameter &mu;<sub>1</sub>, &mu;<sub>2</sub>, &mu;<sub>3</sub> ",
    "Total": "Total",
    "FriedmanTest": "Friedman Test",
    "FriedmanTestANOVA": "Friedman Test : Location Parameter &mu;<sub>1</sub>, &mu;<sub>2</sub>, ... , &mu;<sub>k</sub> ",
    "Block": "Block",
    "Treatment": "Treatment",
    "At least one locations is different": "At least one pair of locations is different",
    "SignCondition": "If n ≤ 100 Binomial Test,  n > 100 Normal Approximation Test",
    "WilcoxonSignCondition": "If n≤ 20 Wilcoxon Rank Sum Test,  n > 20 Nomal Approximation Test",
    "WilcoxonRankCondition": "if n=n<sub>1</sub>+n<sub>2</sub> ≤ 25 Wilcoxon Rank Sum Test,  n>25 Nomal Approximation Test",
    "KruskalCondition": "If n≤ 10 H Distribution Test,  else &chi;<sup>2</sup> approximation test",

};
// French
appStr[1][4] = "../eStatH/index.html";
appStr[2][4] = "../eStatU/index.html";
appStr[3][4] = "../eStatE/index_en.html";
appStr[4][4] = "../ExLearning/index_en.html";
appStr[5][4] = "index.html";
appStr[6][4] = "../ExLecture/index_en.html";
alertMsg[1][4] = "Une des variables sélectionnées ne contient pas de données.";
alertMsg[2][4] = "Selectionnez une par une les variables à analyser en cliquant sur chaque nom de colonne. Pour deux variables, la premiere est la variable de groupe. ";
alertMsg[3][4] = "Données manquantes dans la variable sélectionnée.";
alertMsg[4][4] = "Les observations correspondants aux variables sélectionnées doivent être identiques.";
alertMsg[5][4] = "Trop de groupes! Les graphiques risquent de se superposer à cause de lataille de l'écran.";
alertMsg[6][4] = "La variable d'analyse ne doit pas contenir de valeurs non numériques.";
alertMsg[7][4] = "On ne peut pas sélectionner plus de trois variables dans les données brutes ou dans des tableaux.";
alertMsg[8][4] = "Un graphique à points est traçable si le nombre d'observations ne dépasse pas 200.";
alertMsg[9][4] = "Le diagramme tige-feuille n'est autorisé que si le nombre d'observations est inférieur à 100.";
alertMsg[12][4] = "La variable d'analyse ne doit pas contenir de valeurs non numériques.";
alertMsg[14][4] = "Les résumés ne sont pas acceptés pour les graphiques continus et les tests.";
alertMsg[16][4] = "Pour ce test , il faut uniquement deux groupes.";
alertMsg[17][4] = "Un diagramme de dispersion nécessite au moins une variable x et une variable y.";
alertMsg[18][4] = "Plus de trois variables ne sont pas autorisée pour les diagrammes de dispersion.";
alertMsg[19][4] = "Si X contient une valeur non numérique, le graphique ne peut pas être tracé.";
alertMsg[20][4] = "Si Y contient une valeur non numérique, le graphique ne peut pas être tracé.";
alertMsg[21][4] = "La sauvegarde n'est pas autorisée s'il y a une donnée manquante.";
alertMsg[22][4] = "Diagramme en barres n'est pas autorisée s'il y a une donnée manquante.";
alertMsg[25][4] = "S'il n'ya qu'un seul groupe on ne peut pas tracer des diagrammes en barre empilés.";
alertMsg[27][4] = "S'il n'y a qu'un seul groupe on ne peut pas tracer un graphique de ratio.";
alertMsg[29][4] = "S'il n'y a qu'un seul groupe on ne peut pas tracer des graphiques en barre accolés.";
alertMsg[31][4] = "S'il n'y a qu'un seul groupe on ne peut pas tracer des graphiques en barre double face.";
alertMsg[32][4] = "Un camembert ne peut pas être tracé si une valeur est négative.";
alertMsg[33][4] = "Le graphique en anneau ne peut pas être tracé s'il y a des valeurs négatives.";
alertMsg[34][4] = "Le graphique à bandes ne peut pas être tracé si une valeur est négative.";
alertMsg[35][4] = "S'il y a une valeur négative, on ne peut pas calculer un tableau de fréquences.";
alertMsg[36][4] = "Ce diagramme en barres ne s'utilise que pour deux groupes.";
alertMsg[37][4] = "Ce test d'hypothese n'est valable que pour une seule variable.";
alertMsg[38][4] = "mu n'est pas un nombre. Entrer une valeur et recommencez!!";
alertMsg[39][4] = "L'écart-type est soit nul ou n'est pas un nombre. Recommencez!!";
alertMsg[40][4] = "La variance saisie n'est pas un nombre. Entrez une valeur et recommencez!";
alertMsg[41][4] = "Ce test d'hypothese n'est valable que pour deux variables. La variable de groupe ne doit avoir que deux  modalités";
alertMsg[42][4] = "Modifier le titre du test n'est pas autorisé! ";
alertMsg[43][4] = "Simple Linear Regression is only for one group";
svgStr[1][4] = " Diagramme en barres";
svgStr[2][4] = " Camembert";
svgStr[3][4] = " Graphique en anneau";
svgStr[4][4] = " Graphique à bandes";
svgStr[5][4] = " Graphique en courbe";
svgStr[6][4] = " Graphique à points";
svgStr[7][4] = " Boîte à moustaches ";
svgStr[8][4] = " Diagramme tige-feuille";
svgStr[9][4] = " Histogramme";
svgStr[10][4] = " Diagramme de dispersion ";
svgStr[11][4] = " Test d'hypothèse: Population moyenne";
svgStr[12][4] = " Test d'hypothèse: Population variance";
svgStr[13][4] = " Test d'hypothèses: Deux moyennes de population";
svgStr[14][4] = " Test d'hypothèses: Deux variances de population";
svgStr[15][4] = " Analyse de la variance";
svgStr[16][4] = "Fréquence";
svgStr[17][4] = "Ratio";
svgStr[18][4] = "Groupe";
svgStr[19][4] = " ";
svgStr[20][4] = "<h3>Les résumés<br>Tableau des fréquences</h3>";
svgStr[21][4] = "Variable de groupe";
svgStr[22][4] = "Variable ligne";
svgStr[23][4] = "Total";
svgStr[24][4] = "Total";
svgStr[25][4] = "<h3>Tableau des fréquences</h3>";
svgStr[26][4] = "Analysis Variable";
svgStr[27][4] = "valeur de la variable";
svgStr[28][4] = "Libellé  d'une valeur";
svgStr[29][4] = "Fréquence";
svgStr[30][4] = "Pourcentage(%)";
svgStr[31][4] = "<h3>Tableau croisé</h3>";
svgStr[32][4] = "Variable colonne";
svgStr[33][4] = "Ligne Variable";
svgStr[34][4] = "Moyenne"
svgStr[35][4] = "Ecart-type"
svgStr[36][4] = "<h3> Histogramme<br>Tableau des fréquences</h3>";
svgStr[37][4] = "Nom de groupe";
svgStr[38][4] = "Intervalle";
svgStr[39][4] = "Tige";
svgStr[40][4] = " Feuille";
svgStr[41][4] = "Group 1  Feuille";
svgStr[42][4] = "Group 2  Feuille"
svgStr[43][4] = "<h3>Statistiques élémentairess</h3>";
svgStr[44][4] = "Observation";
svgStr[45][4] = "Minimum";
svgStr[46][4] = "Médiane";
svgStr[47][4] = "Maximum";
svgStr[48][4] = "Total";
svgStr[49][4] = "<h3>Normale Test</h3>";
svgStr[50][4] = "*** E<sub>i</sub> > 5";
svgStr[51][4] = "&chi;<sup>2</sup> Test<br>Interval i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][4] = "Données<br>Fréquence<br>(O<sub>i</sub>)";
svgStr[53][4] = "Normal Distribution<br>Expected Probability<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][4] = "Normal Distribution<br>Expected Frequency<br>(E<sub>i</sub>)";
svgStr[55][4] = "&chi;<sup>2</sup> valeur<br>(O<sub>i</sub>-E<sub>i</sub>)<sup>2</sup> / E<sub>i</sub>";
svgStr[56][4] = "résumés &chi;<sup>2</sup> value";
svgStr[57][4] = "Probabilité Histogramme and Loi normale";
svgStr[58][4] = "Normale Q-Q Plot";
svgStr[59][4] = "Normale Quantile";
svgStr[60][4] = "Coefficient de Corrélation";
svgStr[61][4] = "Coefficient of Determination";
svgStr[62][4] = "Erreur standard";
svgStr[63][4] = "Variable";
svgStr[64][4] = "Nom de variable";
svgStr[65][4] = "Indépendantes Variable";
svgStr[66][4] = "Dépendantes Variable";
svgStr[67][4] = "Parameter";
svgStr[68][4] = "Estimated Valeur";
svgStr[69][4] = "valeur";
svgStr[70][4] = "Intercept";
svgStr[71][4] = "Slope";
svgStr[72][4] = "Factor";
svgStr[73][4] = "Sum of Squares";
svgStr[74][4] = "deg of freedom";
svgStr[75][4] = "Mean Squares";
svgStr[76][4] = "Régression";
svgStr[77][4] = "Erreur";
svgStr[78][4] = "Total";
svgStr[79][4] = "<h3>Régression Analyse</h3>";
svgStr[80][4] = "Standardized Residual Q-Q Diagramme";
svgStr[81][4] = "Standardized Residual";
svgStr[82][4] = "Normal Quantile";
svgStr[83][4] = "Residual Diagramme";
svgStr[84][4] = "Predicted Valeur";
svgStr[85][4] = "Two way ANOVA";
svgStr[86][4] = "Confidence Interval Graph";
svgStr[87][4] = "Residual";
svgStr[88][4] = "Two way Mean Table";
svgStr[89][4] = "Scatter Plot Matrix";
svgStr[90][4] = "Multiple Comparison";
svgStr[91][4] = "Statistics";
svgStr[92][4] = "Factor";
svgStr[93][4] = "Level";
svgStr[94][4] = "Paired Sample Data Graph";
svgStr[95][4] = "Residual vs Forecasting Plot";
svgStr[96][4] = "Residual vs Leverage Plot";
svgStr[97][4] = "Cook's Distance Graph";
svgStr[98][4] = "Cook's Distance";
svgStr[99][4] = "Data Order";
svgStr[100][4]= "Mean Difference";
svgStr[101][4]= "Testing Means";
svgStr[102][4]= "Treatment";
svgStr[103][4]= "Interaction";
svgStr[104][4]= "Row Total";
svgStr[105][4]= "Column Total";
svgStr[106][4]= "Multiple Correlation Coeff";
svgStr[107][4]= "<h3>Correlation Analysis</h3>";
svgStr[108][4]= "Correlation Matrix";
svgStr[109][4]= "Factor1 - Factor2 Mean Graph";

svgStrU[1][4] = "Loi binomiale";
svgStrU[2][4] = "Répétition";
svgStrU[3][4] = "Moyenne";
svgStrU[4][4] = "Ecart-type";
svgStrU[5][4] = "Loi de Poisson";
svgStrU[6][4] = "Loi géométrique";
svgStrU[7][4] = "Loi hypergéométrique";
svgStrU[8][4] = "Population";
svgStrU[9][4] = "Distribution d'échantillonnage";
svgStrU[10][4] = "Loi des grands nombres";
svgStrU[11][4] = "Queue";
svgStrU[12][4] = "Face";
svgStrU[13][4] = "Face d'une pièce";
svgStrU[14][4] = "Nombre de faces";
svgStrU[15][4] = "Nombre d'essais";
svgStrU[16][4] = "Distribution des moyennes d'échantillon";
svgStrU[17][4] = "Répétition";
svgStrU[18][4] = "Erreur standard";
svgStrU[19][4] = "Moyenne de la population";
svgStrU[20][4] = "Intervalle de confinace";
svgStrU[21][4] = "Précision de l'estimation";
svgStrU[22][4] = "Moyenne de l'échantillon";
svgStrU[23][4] = "[TestStat] = ";
svgStrU[24][4] = "Distribution";
svgStrU[25][4] = "Rejeter H\u2080";
svgStrU[26][4] = "Accepter H\u2080";
svgStrU[27][4] = " p-valeur = ";
svgStrU[28][4] = "[Décision] ";
svgStrU[29][4] = "[ANOVA]";
svgStrU[30][4] = "Entrer le coefficient de corrélation et cliquer sur le bouton Executer";
svgStrU[31][4] = "Régression";
svgStrU[32][4] = "Ligne Var";
svgStrU[33][4] = "Colonne Var";
svgStrU[34][4] = "Moyenne"
svgStrU[35][4] = "Ecart-type"
svgStrU[36][4] = "<h3> Histogramme<br>Tableau des fréquences</h3>";
svgStrU[37][4] = "Nom de groupe";
svgStrU[38][4] = "Intervalle";
svgStrU[39][4] = "Tige";
svgStrU[40][4] = " Feuille";
svgStrU[41][4] = "Groupe 1 Feuille";
svgStrU[42][4] = "Groupe 2 Feuille"
svgStrU[43][4] = "<h3>Statistiques élémentaires</h3>";
svgStrU[44][4] = "Observation";
svgStrU[45][4] = "Minimum";
svgStrU[46][4] = "Médiane";
svgStrU[47][4] = "Maximum";
svgStrU[48][4] = "Total";
svgStrU[49][4] = "Exponentielle";
svgStrU[50][4] = "Uniforme";
svgStrU[51][4] = "Précision de l'estimation";
svgStrU[52][4] = "- Ajouter des points en cliquant et eStat trouve la droite de régression.";
svgStrU[53][4] = "- Déplacez ou enlevez un point. Regardez comment change la droite de régression.";
svgStrU[54][4] = "[Statistiques de l'échantillon] ";
svgStrU[55][4] = "[Statistiques de l'échantillon 1] ";
svgStrU[56][4] = "[Statistiques de l'échantillon 2] ";
svgStrU[57][4] = "intervalle de confinace";
svgStrU[58][4] = "Ligne Colonne indépendantes;";
svgStrU[59][4] = "Ligne Colonne ne indépendantes";
svgStrU[60][4] = "Observed Distribution";
svgStrU[61][4] = "Theoretical Distribution";
svgStrU[62][4] = "Goodness of Fit Test for Observed Frequency";
svgStrU[63][4] = "Wilcoxon Rank Sum Test";
svgStrU[64][4] = "Wilcoxon Rank Sum Test Table";
svgStrU[65][4] = "Kruskal-Wallis Test";
svgStrU[66][4] = "Kruskal-Wallis Test Table";
svgStrU[67][4] = "Kruskal-Wallis H Statistics";
svgStrU[68][4] = "Wilcoxon Signed Rank Test";
svgStrU[69][4] = "Sign Test";
svgStrU[70][4] = "Friedman Test";
svgStrU[71][4] = "Friedman S Statistic";
svgStrU[72][4] = "Friedman Distribution Table";

// German
$.message.de = {
    "eStat : Stat Education SW": "eStat : Statistikausbildung SW",
    "Filename": "Dateiname",
    "Selected Variables": "Wähle Variablen aus",
    "Cancel": "Entfernen",
    "Edit Variables": "Editiere Variablen",
    "Level": "Niveau",
    "ElementaryLevel": "Basis",
    "MiddleLevel": "mittleres",
    "HighLevel": "H",
    "UniversityLevel": "Universitäres",
    "Example": "Beispiel",
    "New Sheets": "Neue Blätter",
    "csv Open": "csv Offen",
    "www Open": "www Offen",
    "json Open": "json Offen",
    "csv Save": "csv Speichern",
    "json Save": "json Speichern",
    "Print Sheet": "Blatt drucken",
    "Bar Graph": "Balkendiagramm",
    "Pie Chart": "Kreisdiagramm",
    "Band Graph": "Banddiagramm",
    "Line Graph": "Gerade",
    "Dot Graph": "eindimensionales Streudiagramm",
    "Histogram": "Histogramm",
    "Stem & Leaf Plot": "Stamm-Blatt-Diagramm",
    "Box-Whisker Plot": "Box-Whisker-Plot",
    "Scatterplot": "Streudiagramm",
    "Frequency Table": "Häufigkeitstabelle",
    "Basic Statistics": "Basisstatistik",
    "Testing Hypothesis &mu;": "Hypothesen testen  &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "Hypothesen testen  &sigma;<sup>2</sup>",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "Hypothesen testen  &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "Hypothesen testen &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Analysis of Variance": "Varianzanalyse",
    "High School Stat Education": "Statistikausbildung an High Schools",
    "University Stat Education": "Statistikausausbildung an Universitäten",
    "Elem Stat Graph Example": "Diagramm Beispiel",
    "Learning eStat w Example": "eStat lernen mit Beispielen",
    "Vertical Separated Bar": "getrennte Balkendiagramme",
    "Vertical Stacked Bar": "Diagramm mit vertikal gestapelten Balken",
    "Vertical Ratio Bar": "Verhaeltniss-Balkendiagramm",
    "Vertical Side by Side Bar": "Nebeneinander-Balkendiagramme",
    "Vertical Two Sided Bar": "Doppel-Balkendiagramm",
    "Horizontal Separated Bar": "Horizontal getrennte Balkendiagramme",
    "Horizontal Stacked Bar": "Diagramm mit horizontal gestapelten Balken",
    "Horizontal Ratio Bar": "Horizontal Verhaeltniss-Balkendiagramm",
    "Horizontal Side by Side Bar": "Horizontal Nebeneinander-Balkendiagramme",
    "Horizontal Two Sided Bar": "Horizontal Nebeneinander-Balkendiagramme",
    "Doughnut Graph": "Ringdiagramm",
    "Two Sided Stem & Leaf Plot": "zweiseitiges Stamm-Blatt-Diagramm",
    "Graph Save": "Graph speichern",
    "Graph Print": "Graph drucken",
    "Move to Table": "Bewege zur Tabelle",
    "Edit Title": "Titel editieren",
    "Table Save": "Tabelle speichern",
    "Table Print": "Tabelle drucken",
    "Frequency": "Häufigkeit",
    "(Sorting)": "(Sortieren)",
    "Raw Data": "Rohdaten",
    "Descending": "absteigend",
    "Ascending": "aufsteigend",
    "Mean": "Mittelwert",
    "Std Deviation": "Standardabweichung",
    "MeanStd": "Mittelwert/Standardabweichung",
    "95CI": "95% Konfidenzintervall",
    "RegressionAnalysis": "Regression Analysis",
    "ANOVA2": "2 way ANOVA",

    "Regression": "Regression",
    "Frequency Polygon": "Häufigkeitspolygon",
    "Frequency Table": "Häufigkeitstabelle",
    "Execute New Interval": "Erzeuge ein neues Intervall",
    "Interval Start": "linke Intervallgrenze",
    "Interval Width": "Intervallbreite",
    "t-test": "t-test",
    "Z-test": "Z-test",
    "(if Z-test, enter &sigma;)": "(Fall Z-Test vorliegt, gib &sigma; ein)",
    "Significance Level": "Signifikanzniveau",
    "Execute": "Führe aus",
    "(Confidence Interval)": "(Konfidenzintervall)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Fall Z-Test vorliegt, Z, &sigma)",
    "&chi;<sup>2</sup> test": "&chi;<sup>2</sup> test",
    "Variance Assumption": "Annahme für die Varianz",
    "F test": "F test",
    "At least one pair of means is different": "mindestens ein Paar von Mittelwerten ist verschieden",
    "Main Title : ": "Hauptüberschrift : ",
    "y title : ": "y titel : ",
    "x title : ": "x titel : ",
    "Modify": "Verändern",
    "Confirm": "Bestätige",
    "Variable Name": "Variablenname",
    "Variable Value": "Variablenwert",
    "Value Label": "Wertname",
    "* Less than nine value labels allowed.": "* weniger als neun Werte zulässig.",
    "Save": "Speichern",
    "Exit": "Exit",
    "eStatU UnivStatEdu": "eStatU - Statistikausausbildung an Universitäten",
    "eStatH HighStatEdu": "eStatH - Statistikausbildung an High Schools",
    "Menu": "Menü",
    "Binomial Experiment": "Binomialexperiment",
    "Binomial Distribution": "Binomialverteilung",
    "Binomial Prob Table": "Tabelle mit Werten der Wahrscheinlicheitsfunktion der Binomialverteilung",
    "Poisson Distribution": "Poisson-Verteilung",
    "Poisson Prob Table": "Tabelle mit Werten der Wahrscheinlicheitsfunktion der Poisson-Verteilung",
    "Geometric Distribution": "geometrische Verteilung",
    "Geometric Prob Table": "Tabelle mit Werten der Wahrscheinlicheitsfunktion der geometrischen Verteilung",
    "HyperGeometric Distribution": "Hypergeometrische Verteilung ",
    "HyperGeometric Prob Table": "Tabelle mit Werten der Wahrscheinlicheitsfunktion der hypergeometrischen Verteilung",
    "Exponential Distribution": "Exponentailverteilung",
    "Normal Experiment": "Normalverteilungsexperiment",
    "Normal Distribution": "Normalverteilung",
    "Normal Approx": "Normalapproximation",
    "t Distribution": "t Verteilung",
    "ChiSquare Distribution": "&chi;<sup>2</sup> Verteilung",
    "F Distribution": "F Verteilung",
    "Sampling": "Ziehen von Stichproben",
    "Population vs Sample": "Population vs Stichproben",
    "Population": "Grundgesamtheit",
    "Sample": "Stichproben",
    "Exponential": "Exponentail(0.3)",
    "Uniform": "Gleichverteilung(0,1)",
    "Sample05": "Stichproben 5%",
    "Sample10": "Stichproben 10%",
    "Sample20": "Stichproben 20%",
    "Statistics/BoxPlot": "Statistik/BoxPlot",
    "Law of Large Number": "Gesetz der Großen Zahlen",
    "Dist of Sample Means": "Verteilung der Stichprobenmittelwerte",
    "Sample Size": "Stichprobenumfang",
    "Confidence Interval": "Konfidenzintervall",
    "Estimation Accuracy": "Schätzgenauigkeit",
    "Repetition": "Wiederholung",
    "Confidence Level": "Konfidenzniveau",
    "Testing Hypothesis mu_titleAB": "Hypothesen testen &mu",
    "Testing Hypothesis mu_title": "Hypothesen testen &mu;",
    "Testing Hypothesis sigma_title": "Hypothesen testen &sigma;<sup>2</sup>",
    "Testing Hypothesis P_title": "Hypothesen testen P",
    "Testing Hypothesis mu12_title": "Hypothesen testen &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12_title": "Hypothesen testen  &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Testing Hypothesis P12_title": "Hypothesen testen P<sub>1</sub>, P<sub>2</sub>",
    "Testing Hypothesis muAB": "Hypothesen testen &mu; - &alpha;, &beta;",
    "Testing Hypothesis mu": "Hypothesen testen &mu;",
    "Testing Hypothesis sigma": "Hypothesen testen &sigma;<sup>2</sup>",
    "Testing Hypothesis P": "Hypothesen testen P",
    "Testing Hypothesis mu12": "Hypothesen testen &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "Hypothesen testen  &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Testing Hypothesis P12": "Hypothesen testen  P<sub>1</sub>, P<sub>2</sub>",
    "Testing Hypothesis ANOVA": "Hypothesen testen ANOVA",
    "Testing Independence": "Hypothesen testen auf Unabhängigkeit",
    "Correlation Coefficient": "Korrelationskoeffizient",
    "Regression Experiment": "Regressionsexperiment",
    "Hypothesis": "Hypothese",
    "Test Type": "Testtyp",
    "Chi-test": "&chi;<sup>2</sup>-test",
    "Sampling Type": "Sampling Type",
    "Independent Sample": "independent",
    "Paired Sample": "paired",
    "Sample Data": "Stichprobendaten",
    "input either sample data": "Gib entweder Stichprobenwerte oder Stichprobenstatistik ein.",
    "Sample Statistics": "Stichprobenstatistik",
    "Sample Mean": "Stichprobenmittelwert",
    "Sample Variance": "Stichprobenvarianz",
    "Sample Proportion": "Stichprobenanteil",
    "if Z-test-1": "(Falls Z-Text vorliegt, gib Varianz ein)",
    "if Z-test-2": "(Falls Z-Text vorliegt, Z<sub>1-&alpha;/2 </sub>)",
    "Variance Assumption": "Annahme für die Varianz",
    "At least one pair": "mindestens ein Paar von Mittelwerten ist verschieden",
    "Row-Col-0": "Zeilen- und  Spaltenvariablen sind unabhängig",
    "Row-Col-1": "Zeilen- und  Spaltenvariablen sind nicht unabhängig",
    "Enter any number of row": "(Füge den Wert aus der oberen licnken Zelle ein)",
    "Row": "Zeile",
    "Column": "Spalte",
    "Show Probability": "Zeige Wahrscheinlichkeit an",
    "Regression Line": "Regressionsgerade",
    "Erase All": "alles löschen",
    "Add Point": "Füge einen Punkt hinzu",
    "Erase Point": "Punkt löschen",
    "Reference Site": "Referenzseite",
    "Lot Size": "Losgröße",
    "Defect Size": "Defektzahl",
    "If typed": "(Falls eine Nummer getippt wird)",
    "Stat/BoxPlot": "Statistik/BoxPlot",
    "Mean": "Mittelwert",
    "Std Dev": "Standardabweichung",
    "SimulationWarning": "(Current simulation should be finished before you start the next simulation.)",
    "OneGroup": "(1 grouppe)",
    "RegressionBand": "Konfidenzband",
    "RegressionTable": "Regressionanalyse",
    "RegressionResidual": "Residualdiagramm",
    "RegressionResidualLeverage": "Residual vs Leverage",
    "RegressionCook": "Cook's Distance Graph",
    "RegressionQQ": "ResidualQ-Q-diagramm",
    "HistogramNormal": "Histogramm",
    "HistogramChisq": "Normal Test",
    "HistogramNormalQQ": "Normal-Q-Q-diagramm",
    "PopulationStd": "Grundgesamtheit Standardabweichung",
    "Type1Error": "Type 1 Error",
    "Type2Error": "Type 2 Error",
    "AnovaTable": "ANOVA Table",
    "AnovaMeanGraph": "Mean Confidence Interval",
    "MultipleComparison": "Multiple Comparison",
    "AnovaResidual": "Residual Plot",
    "AnovaQQ": "Residual Q-Q Plot",
    "TestingFit": "Goodness of Fit Test",
    "FitTest0": "Observed & theoretical Distributions are the same",
    "FitTest1": "Observed & theoretical Distributions are different",
    "ObservedFreq": "Observed Frequency O",
    "ExpectedProb": "Expected Probability p",
    "ExpectedFreq": "Expected Frequency E(>5)",
    "InputFitData": "Enter cell from upper left cell",
    "ExecuteTable": "Statistics",
    "MeanDotGraph": "Confidence Interval Graph",
    "ScatterRegression": "Scatter Plot",
    "Factor": "Factor",
    "Interaction": "Interaction",
    "NoInteraction": "No Interaction",
    "ExistInteraction": "Exist Interaction",
    "eStatLecture": "eStat Intro Lecture",
    "NonParametricMu12_title": "Wilcoxon Rank Sum Test", 
    "NonParametricMu12": "Wilcoxon Rank Sum Test : Location Parameter &mu;<sub>1</sub>, &mu;<sub>2</sub>", 
    "WilcoxonTest": "Wilcoxon Rank Sum Test",
    "Sample Range": "Sample Range",
    "DistributionTable": "Distribution Table",
    "SignedRankTest": "Wilcoxon Signed Rank Sum Test",
    "SignTest": "Sign Test",
    "SignCount": "Sign Count",
    "KruskalTest": "Kruskal-Wallis Test",
    "KruskalTestANOVA": "Kruskal-Wallis Test : Location Parameter &mu;<sub>1</sub>, &mu;<sub>2</sub>, &mu;<sub>3</sub> ",
    "Total": "Total",
    "FriedmanTest": "Friedman Test",
    "FriedmanTestANOVA": "Friedman Test : Location Parameter &mu;<sub>1</sub>, &mu;<sub>2</sub>, ... , &mu;<sub>k</sub> ",
    "Block": "Block",
    "Treatment": "Treatment",
    "At least one locations is different": "At least one pair of locations is different",
    "SignCondition": "If n ≤ 100 Binomial Test,  n > 100 Normal Approximation Test",
    "WilcoxonSignCondition": "If n≤ 20 Wilcoxon Rank Sum Test,  n > 20 Nomal Approximation Test",
    "WilcoxonRankCondition": "if n=n<sub>1</sub>+n<sub>2</sub> ≤ 25 Wilcoxon Rank Sum Test,  n>25 Nomal Approximation Test",
    "KruskalCondition": "If n≤ 10 H Distribution Test,  else &chi;<sup>2</sup> approximation test",

};
// German
appStr[1][5] = "../eStatH/index.html";
appStr[2][5] = "../eStatU/index.html";
appStr[3][5] = "../eStatE/index_en.html";
appStr[4][5] = "../ExLearning/index_en.html";
appStr[5][5] = "index.html";
appStr[6][5] = "../ExLecture/index_en.html";
alertMsg[1][5] = "Zu einer der ausgewählten Variablen fehlen Daten.";
alertMsg[2][5] = "Wähle Variablen durch Ankliken für die  Analyse aus.  If two variables, first one is group variable. ";
alertMsg[3][5] = "Wähle Variablen durch Ankliken für die  Analyse aus.";
alertMsg[4][5] = "Falls die Werte der ausgewählten Variablen oder die Beobachtungen verschieden sind, ist keine Analyse möglich .";
alertMsg[5][5] = "Zu viele Gruppen! Grafiken können sich aufgrund der Bildschirmgröße überlappen.";
alertMsg[6][5] = "Falls die Analysis-Variable in den zusammengefassten Daten Charaktere einschliesst, ist Analyse, oder Tabelle nicht moeglich.";
alertMsg[7][5] = "Falls mehr als drei Variablen aus den Rohdaten ausgewählt sind.";
alertMsg[8][5] = "Ein dimensionales Streudiagramm ist  möglich, wenn die Anzahl der  Beobachtungen kleiner als 200 ist.";
alertMsg[9][5] = "Stamm-Blatt-Diagramm ist nicht möglich, wenn die Anzahl der Beobachtungen.";
alertMsg[12][5] = "Falls die Analysis-Variable Charaktere einschliesst, ist Analyse, oder Tabelle nicht moeglich.";
alertMsg[14][5] = "Im Falle zusammengefasster Daten sind weder Dauerdiagramme noch Hypothesen Testen moeglich.";
alertMsg[16][5] = "Nur zwei Gruppen soind für diesen Hypothesentest zugelassen.";
alertMsg[17][5] = "Streudiagramm erfordert mindestens Variablen x und y.";
alertMsg[18][5] = "mehr als drei Variablen sind nicht zugelassen für ein Streudiagramm.";
alertMsg[19][5] = "Falls die Variable X ein charakter, kann kein Streudiagramm gezeichnet werden. ";
alertMsg[20][5] = "Falls die Variable Y ein charakter, kann kein Streudiagramm gezeichnet werden. ";
alertMsg[21][5] = "Bei fehlenden Daten kann nicht gespeichert werden.";
alertMsg[22][5] = "Falls der Wert negativ ist, kann kein Balkendiagramm gezeichnet werden.";
alertMsg[25][5] = "Falls es nur eine Gruppe gibt, kann kein gestapeltes Balkendiagramm gezeichnet werden.";
alertMsg[27][5] = "Falls es nur eine Gruppe gibt, kann kein Balkendiagramm gezeichnet werden.";
alertMsg[29][5] = "Falls es nur eine Gruppe gibt, kann kein Balkendiagramm gezeichnet werden.";
alertMsg[31][5] = "Falls es nur eine Gruppe gibt, kann kein Balkendiagramm gezeichnet werden.";
alertMsg[32][5] = "Falls Anzahl negativ ist, kann kein Kreisdiagramm gezeicnet werden.";
alertMsg[33][5] = "Falls der Wert negativ ist, kann kein Ringdiagramm gezeichnet werden.";
alertMsg[34][5] = "Falls der Wert negativ ist, kann kein Bandediagramm gezeichnet werden.";
alertMsg[35][5] = "Falls der Wert negativ ist, kann keine Häufigkeitstabelle angegeben werden.";
alertMsg[36][5] = "Dieses Balkendiagramm ist nur für zwei Gruppen erklärt.";
alertMsg[37][5] = "Diese Hypothese bezieht sich auf nur eine Variable.";
alertMsg[38][5] = "µ ist nicht-numerisch. Füge Zahlenwert ein und versuche erneut!";
alertMsg[39][5] = "Standardabweichung ist entweder Null oder  ";
alertMsg[40][5] = "Eingegebene Varianz ist nicht-numerisch. Gib Zahlenwert ein und versuche erneut!";
alertMsg[41][5] = "Diese Hypothese kann sich auf zwei Variablen beziehen. Gruppenvariable darf nur zwei Gruppen umfassen.";
alertMsg[42][5] = "Editieren der Bezeichnung der zu testenden Hypothesen ist nicht zulässig. ";
alertMsg[43][5] = "Simple Linear Regression is only for one group";
svgStr[1][5] = " Balkendiagramm";
svgStr[2][5] = " Kreisdiagramm";
svgStr[3][5] = " Doughnut Graph";
svgStr[4][5] = " Bandediagramm";
svgStr[5][5] = " Gerade";
svgStr[6][5] = " eindimensionales Streudiagramm";
svgStr[7][5] = " Box-Whisker-Plot";
svgStr[8][5] = " Stamm-Blatt-Diagramm";
svgStr[9][5] = " Histogramm";
svgStr[10][5] = " Streudiagramm";
svgStr[11][5] = " Hypothesen testen : Grundgesamtheit Mittelwert";
svgStr[12][5] = " Hypothesen testen : Grundgesamtheit Varianz";
svgStr[13][5] = " Hypothesen testen : Zwei Grundgesamtheit Mittelwert";
svgStr[14][5] = " Hypothesen testen : Zwei Grundgesamtheit Varianz";
svgStr[15][5] = " Varianzanalyse";
svgStr[16][5] = "Häufigkeit";
svgStr[17][5] = "Verhältnis";
svgStr[18][5] = "Gruppe ";
svgStr[19][5] = " ";
svgStr[20][5] = "<h3>Summarischdatan<br>Häufigkeitstabelle</h3>";
svgStr[21][5] = "Variable gruppieren";
svgStr[22][5] = "Zeilenvariable";
svgStr[23][5] = "Total";
svgStr[24][5] = "Total";
svgStr[25][5] = "<h3>Häufigkeitstabelle</h3>";
svgStr[26][5] = "Analysis Variable";
svgStr[27][5] = "Variablenwert";
svgStr[28][5] = "Wertname";
svgStr[29][5] = "Häufigkeit";
svgStr[30][5] = "Prozent(%)";
svgStr[31][5] = "<h3>Zweidimensionentabelle</h3>";
svgStr[32][5] = "Spaltenvariable";
svgStr[33][5] = "Zeilenvariable";
svgStr[34][5] = "Mittelwert"
svgStr[35][5] = "Standardabweichung"
svgStr[36][5] = "<h3> Histogramm<br>Häufigkeitstabelle</h3>";
svgStr[37][5] = "Gruppe benennen";
svgStr[38][5] = "Intervall";
svgStr[39][5] = "Stamm";
svgStr[40][5] = " Blatt";
svgStr[41][5] = "Gruppe 1  Blatt";
svgStr[42][5] = "Gruppe 2  Blatt"
svgStr[43][5] = "<h3>Basisstatistik</h3>";
svgStr[44][5] = "Beobachtung";
svgStr[45][5] = "Minimum";
svgStr[46][5] = "Median";
svgStr[47][5] = "Maximum";
svgStr[48][5] = "Total";
svgStr[49][5] = "<h3>Normal Test</h3>";
svgStr[50][5] = "*** E<sub>i</sub> > 5";
svgStr[51][5] = "&chi;<sup>2</sup> Test<br>Interval i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][5] = "Daten<br>Observed Häufigkeit<br>(O<sub>i</sub>)";
svgStr[53][5] = "Normalverteilung<br>Expected Wahrscheinlichkeit<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][5] = "Normalverteilung<br>Expected Häufigkeit<br>(E<sub>i</sub>)";
svgStr[55][5] = "&chi;<sup>2</sup> wert<br>(O<sub>i</sub>-E<sub>i</sub>)<sup>2</sup> / E<sub>i</sub>";
svgStr[56][5] = "Total &chi;<sup>2</sup> wert";
svgStr[57][5] = "Wahrscheinlichkeit Histogramm, Normalverteilung";
svgStr[58][5] = "Normal Q-Q Diagramm";
svgStr[59][5] = "Normal Quantile";
svgStr[60][5] = "Korrelationskoeffizient";
svgStr[61][5] = "Determinationkoeffizient";
svgStr[62][5] = "Standardfehler";
svgStr[63][5] = "Variable";
svgStr[64][5] = "Variablenname";
svgStr[65][5] = "Unabhängigvariable";
svgStr[66][5] = "Abhängigvariable";
svgStr[67][5] = "Parameter";
svgStr[68][5] = "Estimated wert";
svgStr[69][5] = "wert";
svgStr[70][5] = "Intercept";
svgStr[71][5] = "Slope";
svgStr[72][5] = "Factor";
svgStr[73][5] = "Sum of Squares";
svgStr[74][5] = "deg of freedom";
svgStr[75][5] = "Mean Squares";
svgStr[76][5] = "Regression";
svgStr[77][5] = "Fehler";
svgStr[78][5] = "Total";
svgStr[79][5] = "<h3>Regression Analysis</h3>";
svgStr[80][5] = "Standardized Residual Q-Q Diagramm";
svgStr[81][5] = "Standardized Residual";
svgStr[82][5] = "Normal Quantile";
svgStr[83][5] = "Residual Diagramm";
svgStr[84][5] = "Predicted wert";
svgStr[85][5] = "Two way ANOVA";
svgStr[86][5] = "Confidence Interval Graph";
svgStr[87][5] = "Residual";
svgStr[88][5] = "Two way Mean Table";
svgStr[89][5] = "Scatter Plot Matrix";
svgStr[90][5] = "Multiple Comparison";
svgStr[91][5] = "Statistics";
svgStr[92][5] = "Factor";
svgStr[93][5] = "Level";
svgStr[94][5] = "Paired Sample Data Graph";
svgStr[95][5] = "Residual vs Forecasting Plot";
svgStr[96][5] = "Residual vs Leverage Plot";
svgStr[97][5] = "Cook's Distance Graph";
svgStr[98][5] = "Cook's Distance";
svgStr[99][5] = "Data Order";
svgStr[100][5]= "Mean Difference";
svgStr[101][5]= "Testing Means";
svgStr[102][5]= "Treatment";
svgStr[103][5]= "Interaction";
svgStr[104][5]= "Row Total";
svgStr[105][5]= "Column Total";
svgStr[106][5]= "Multiple Correlation Coeff";
svgStr[107][5]= "<h3>Correlation Analysis</h3>";
svgStr[108][5]= "Correlation Matrix";
svgStr[109][5]= "Factor1 - Factor2 Mean Graph";

svgStrU[1][5] = "Binomialverteilung";
svgStrU[2][5] = "Wiederholung";
svgStrU[3][5] = "Mittelwert";
svgStrU[4][5] = "Standardabweichung";
svgStrU[5][5] = "Poisson-Verteilung";
svgStrU[6][5] = "Geometrische Verteilung";
svgStrU[7][5] = "Hypergeometrische Verteilung ";
svgStrU[8][5] = "Grundgesamtheit";
svgStrU[9][5] = "Stichprobenverteilung";
svgStrU[10][5] = "Gesetz der Großen Zahlen";
svgStrU[11][5] = "Flanke";
svgStrU[12][5] = "Kopf";
svgStrU[13][5] = "Kopf einer Münze";
svgStrU[14][5] = "Anzahl Kopf";
svgStrU[15][5] = "Anzahl der Versuche";
svgStrU[16][5] = "Verteilung der Stichprobenmittelwerte";
svgStrU[17][5] = "Wiederholung";
svgStrU[18][5] = "Standardfehler";
svgStrU[19][5] = "Mittelwert der Grundgesamtheit";
svgStrU[20][5] = "Konfidenzintervall";
svgStrU[21][5] = "Schätzgenauigkeit";
svgStrU[22][5] = "Stichprobenmittelwert";
svgStrU[23][5] = "[TestStat] = ";
svgStrU[24][5] = "Verteilung";
svgStrU[25][5] = "lehne H\u2080 ab";
svgStrU[26][5] = "Akzeptiere H\u2080";
svgStrU[27][5] = " p-Wert  = ";
svgStrU[28][5] = "[Entscheidung] ";
svgStrU[29][5] = "[ANOVA]";
svgStrU[30][5] = "Gib den Korrelationskoeffizienten ein und klicke auf den Button Ausführen";
svgStrU[31][5] = "Regression";
svgStrU[32][5] = "Zeilenvariable";
svgStrU[33][5] = "Spaltenvariable";
svgStrU[34][5] = "Mittelwert"
svgStrU[35][5] = "Standardabweichung"
svgStrU[36][5] = "<h3> Histogramm<br>Häufigkeitstabelle</h3>";
svgStrU[37][5] = "Gruppe benennen";
svgStrU[38][5] = "Intervall";
svgStrU[39][5] = "Stamm";
svgStrU[40][5] = " Blatt";
svgStrU[41][5] = "Gruppe 1 Blatt";
svgStrU[42][5] = "Gruppe 2 Blatt"
svgStrU[43][5] = "<h3>Basisstatistik</h3>";
svgStrU[44][5] = "Beobachtung";
svgStrU[45][5] = "Minimum";
svgStrU[46][5] = "Median";
svgStrU[47][5] = "Maximum";
svgStrU[48][5] = "Total";
svgStrU[49][5] = "Exponentail";
svgStrU[50][5] = "Gleichverteilung";
svgStrU[51][5] = "Schätzgenauigkeit";
svgStrU[52][5] = "- Erzeuge Punkt per Mausklick. eStat ermittelt dann die Regressiongerade.";
svgStrU[53][5] = "- Erzeuge Punkt per Mausklick. eStat ermittelt dann die Regressiongerade.";
svgStrU[54][5] = "[Stichprobenstatistik] ";
svgStrU[55][5] = "[Stichproben 1 statistik] ";
svgStrU[56][5] = "[Stichproben 2 statistik] ";
svgStrU[57][5] = "Konfidenzniveau";
svgStrU[58][5] = "Zeilen Spalten unabhängig";
svgStrU[59][5] = "Zeilen Spalten nicht unabhängig";
svgStrU[60][5] = "Observed Distribution";
svgStrU[61][5] = "Theoretical Distribution";
svgStrU[62][5] = "Goodness of Fit Test for Observed Frequency";
svgStrU[63][5] = "Wilcoxon Rank Sum Test";
svgStrU[64][5] = "Wilcoxon Rank Sum Test Table";
svgStrU[65][5] = "Kruskal-Wallis Test";
svgStrU[66][5] = "Kruskal-Wallis Test Table";
svgStrU[67][5] = "Kruskal-Wallis H Statistics";
svgStrU[68][5] = "Wilcoxon Signed Rank Test";
svgStrU[69][5] = "Sign Test";
svgStrU[70][5] = "Friedman Test";
svgStrU[71][5] = "Friedman S Statistic";
svgStrU[72][5] = "Friedman Distribution Table";
// Spanish
$.message.es = {
    "eStat : Stat Education SW": "eStat : Software para Educación Estadística",
    "Filename": "Nombre del archivo",
    "Selected Variables": "Variables seleccionadas",
    "Cancel": "Cancelar",
    "Edit Variables": "Editar Variables",
    "Level": "Nivel",
    "ElementaryLevel": "E",
    "MiddleLevel": "M",
    "HighLevel": "H",
    "UniversityLevel": "U",
    "Example": "Ejemplo",
    "New Sheets": "Nuevas hojas",
    "csv Open": "csv Abierto",
    "www Open": "www Abierto",
    "json Open": "json Abierto",
    "csv Save": "csv Grabar",
    "json Save": "json Grabar",
    "Print Sheet": "Imprimir hoja",
    "Bar Graph": "Diagrama de barras",
    "Pie Chart": "Diagrama de tarta",
    "Band Graph": "Gráfico de partes componentes",
    "Line Graph": "Gráfico de líneas",
    "Dot Graph": "Gráfico de puntos",
    "Histogram": "Histograma",
    "Stem & Leaf Plot": "Diagrama de Tallo y Hojas",
    "Box-Whisker Plot": "Box-Whisker Plot",
    "Scatterplot": "Diagrama de dispersión",
    "Frequency Table": "Tabla de frecuencias",
    "Basic Statistics": "Estadística básica",
    "Testing Hypothesis &mu;": "Prueba de hipótesis &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "Prueba de hipótesis &sigma;<sup>2</sup>",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "Prueba de hipótesis &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "Prueba de hipótesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Analysis of Variance": "Análisis de Varianza",
    "High School Stat Education": "Educación Estadística de Bachillerato",
    "University Stat Education": "Educación Estadística Universitaria",
    "Elem Stat Graph Example": "Estadística Gráfico Ejemplo",
    "Learning eStat w Example": "Aprendiendo eStat con Ejemplo",
    "Vertical Separated Bar": "Barra vertical separada",
    "Vertical Stacked Bar": "Barra vertical apilada",
    "Vertical Ratio Bar": "Barra vertical de proporciones",
    "Vertical Side by Side Bar": "Barra vertical lateral",
    "Vertical Two Sided Bar": "Barra vertical bilateral",
    "Horizontal Separated Bar": "Barra horizontal separada",
    "Horizontal Stacked Bar": "Barra horizontal apilada",
    "Horizontal Ratio Bar": "Barra horizontal de proporciones",
    "Horizontal Side by Side Bar": "Barra horizontal lateral",
    "Horizontal Two Sided Bar": "Barra horizontal bilateral",
    "Doughnut Graph": "Gráfico de dónut",
    "Two Sided Stem & Leaf Plot": "Diagrama de Tallo y Hojas Bilateral",
    "Graph Save": "Grabar Gráfico",
    "Graph Print": "Imprimir Gráfico",
    "Move to Table": "Mover  a la Tabla",
    "Edit Title": "Editar titulo",
    "Table Save": "Grabar Tabla",
    "Table Print": "Imprimir Tabla",
    "Frequency": "Frecuencia",
    "(Sorting)": "(Ordenar)",
    "Raw Data": "Datos crudos",
    "Descending": "Descendiente",
    "Ascending": "Ascendiente",
    "Mean": "Media",
    "Std Deviation": "Desviación estándar",
    "MeanStd": "Media/Desviación estándar",
    "95CI": "95% Nivel de confianza",
    "RegressionAnalysis": "Regresión Análisis",
    "ANOVA2": "Two way ANOVA",

    "Regression": "Regresión",
    "Frequency Polygon": "Polígono de frecuencias",
    "Frequency Table": "Tabla de frecuencias",
    "Execute New Interval": "Ejecutar Nuevo Intervalo",
    "Interval Start": "Origen Intervalo",
    "Interval Width": "Ancho del Intervalo",
    "t-test": "Prueba t",
    "Z-test": "Prueba Z",
    "(if Z-test, enter &sigma;)": "(Si prueba Z entrar &sigma;)",
    "Significance Level": "Nivel de significación",
    "Execute": "Ejecutar",
    "(Confidence Interval)": "(Intervalo de confianza)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Si prueba Z  Z, &sigma)",
    "&chi;<sup>2</sup> test": "Prueba &chi;<sup>2</sup>",
    "Variance Assumption": "Premisa sobre la varianza",
    "F test": "Prueba F",
    "At least one pair of means is different": "Al menos un par de medias es diferente",
    "Main Title : ": "Titulo principal : ",
    "y title : ": "y titulo : ",
    "x title : ": "x titulo : ",
    "Modify": "Modificar",
    "Confirm": "Confirmar",
    "Variable Name": "Nombre de la Variable",
    "Variable Value": "Valor de la Variable",
    "Value Label": "Valor de la etiqueta",
    "* Less than nine value labels allowed.": "* Menos de nueve etiquetas permitidas",
    "Save": "Grabar",
    "Exit": "Salir",
    "eStatU UnivStatEdu": "eStatU - Educación Estadística Universitaria SW",
    "eStatH HighStatEdu": "eStatH - Educación Estadística de Bachillerato SW",
    "Menu": "Menú",
    "Binomial Experiment": "Experimento Binomial",
    "Binomial Distribution": "Distribución Binomial",
    "Binomial Prob Table": "Tabla de Probabilidad Binomial",
    "Poisson Distribution": "Distribución Poisson",
    "Poisson Prob Table": "Tabla de Probabilidad Poisson",
    "Geometric Distribution": "Distribución Geométrica",
    "Geometric Prob Table": "Tabla de Probabilidad Geométrica",
    "HyperGeometric Distribution": "Distribución Hipergeométrica",
    "HyperGeometric Prob Table": "Tabla de Probabilidad Hipergeométrica",
    "Exponential Distribution": "Distribución Exponencial",
    "Normal Experiment": "Experimento Normal",
    "Normal Distribution": "Distribución Normal",
    "Normal Approx": "Aproximación Normal",
    "t Distribution": "Distribución t ",
    "ChiSquare Distribution": "Distribución &chi;<sup>2</sup>",
    "F Distribution": "Distribución F",
    "Sampling": "Muestreo",
    "Population vs Sample": "Población vs Muestra",
    "Population": "Población",
    "Sample": "Muestra",
    "Exponential": "Exponencial(0.3)",
    "Uniform": "Uniforme(0,1)",
    "Sample05": "Muestreo 5%",
    "Sample10": "Muestreo 10%",
    "Sample20": "Muestreo 20%",
    "Statistics/BoxPlot": "Estadísticos/Diagrama de Box",
    "Law of Large Number": "Ley de los Grandes Números",
    "Dist of Sample Means": "Distribución de Medias Muestrales",
    "Sample Size": "Tamaño muestral",
    "Confidence Interval": "Nivel de confianza",
    "Estimation Accuracy": "Precisión de la estimación",
    "Repetition": "Repetición",
    "Confidence Level": "Nivel de confianza",
    "Testing Hypothesis mu_titleAB": "Prueba de hipótesis media",
    "Testing Hypothesis mu_title": "Prueba de hipótesis media",
    "Testing Hypothesis sigma_title": "Prueba de hipótesis varianza",
    "Testing Hypothesis P_title": "Prueba de hipótesis proporción",
    "Testing Hypothesis mu12_title": "Prueba de hipótesis dos medias",
    "Testing Hypothesis sigma12_title": "Prueba de hipótesis dos varianza",
    "Testing Hypothesis P12_title": "Prueba de hipótesis dos proporción",
    "Testing Hypothesis muAB": "Prueba de hipótesis &mu; - &alpha;, &beta;",
    "Testing Hypothesis mu": "Prueba de hipótesis &mu;",
    "Testing Hypothesis sigma": "Prueba de hipótesis &sigma;<sup>2</sup>",
    "Testing Hypothesis P": "Prueba de hipótesis P",
    "Testing Hypothesis mu12": "Prueba de hipótesis &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "Prueba de hipótesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Testing Hypothesis P12": "Prueba de hipótesis P<sub>1</sub>, P<sub>2</sub>",
    "Testing Hypothesis ANOVA": "Prueba de hipótesis ANOVA",
    "Testing Independence": "Prueba de independencia",
    "Correlation Coefficient": "Coeficiente de correlación",
    "Regression Experiment": "Experimento de Regresión",
    "Hypothesis": "Hipótesis",
    "Test Type": "Tipo de prueba",
    "Z-test": " Prueba Z",
    "t-test": " Prueba t",
    "Chi-test": "Prueba &chi;<sup>2</sup>",
    "F-test": "Prueba F",
    "Sampling Type": "Sampling Type",
    "Independent Sample": "independent",
    "Paired Sample": "paired",
    "Sample Data": "Datos muestrales",
    "input either sample data": "Introducir datos muestrales o estadísticos muestrales en las siguientes cajas usando csv/bsv",
    "Sample Statistics": "Estadísticos muestrales",
    "Sample Mean": "Media muestral",
    "Sample Variance": "Varianza muestral",
    "Sample Proportion": "Proporción muestral",
    "if Z-test-1": "(Si test Z entrar la varianza de la población &sigma;<sup>2</sup>)",
    "if Z-test-2": "(Si test Z Z<sub>1-&alpha;/2 </sub> )",
    "Variance Assumption": "Premisa sobre la varianza",
    "At least one pair": "Al menos un par de medias es diferente",
    "Row-Col-0": "La variables fila y columna son independientes",
    "Row-Col-1": "La variables fila y columna no  son independientes",
    "Enter any number of row": "(Entrar observación de la casilla superior izquierda)",
    "Row": "Fila",
    "Column": "Columna",
    "Show Probability": "Muestra probabildad",
    "Regression Line": "Recta de Regresión",
    "Erase All": "Borrar todo",
    "Add Point": "Añadir punto",
    "Erase Point": "Borrar punto",
    "Reference Site": "Enlace de referencia",
    "Lot Size": "Tamaño del lote",
    "Defect Size": "Tamaño del defecto",
    "If typed": "(Si el número está escrito)",
    "Stat/BoxPlot": "Estadísticos/Diagrama de Box",
    "Mean": "Media",
    "Std Dev": "Desviación estándar",
    "SimulationWarning": "(Current simulation should be finished before you start the next simulation.)",
    "OneGroup": "(1 groupo)",
    "RegressionBand": "Confianza Bandes",
    "RegressionTable": "Regresión Analysis",
    "RegressionResidual": "Residual Diagrama",
    "RegressionResidualLeverage": "Residual vs Leverage",
    "RegressionCook": "Cook's Distance Graph",
    "RegressionQQ": "Residual Q-Q Diagrama",
    "HistogramNormal": "Histograma",
    "HistogramChisq": "Normal Prueba",
    "HistogramNormalQQ": "Normal Q-Q Diagrama",
    "PopulationStd": "Población Desviación estándar",
    "Type1Error": "Type 1 Error",
    "Type2Error": "Type 2 Error",
    "AnovaTable": "ANOVA Table",
    "AnovaMeanGraph": "Mean Confidence Interval",
    "MultipleComparison": "Multiple Comparison",
    "AnovaResidual": "Residual Plot",
    "AnovaQQ": "Residual Q-Q Plot",
    "TestingFit": "Goodness of Fit Test",
    "FitTest0": "Observed & theoretical Distributions are the same",
    "FitTest1": "Observed & theoretical Distributions are different",
    "ObservedFreq": "Observed Frequency O",
    "ExpectedProb": "Expected Probability p",
    "ExpectedFreq": "Expected Frequency E(>5)",
    "InputFitData": "Enter cell from upper left cell",
    "ExecuteTable": "Statistics",
    "MeanDotGraph": "Confidence Interval Graph",
    "ScatterRegression": "Scatter Plot",
    "Factor": "Factor",
    "Interaction": "Interaction",
    "NoInteraction": "No Interaction",
    "ExistInteraction": "Exist Interaction",
    "eStatLecture": "eStat Intro Lecture",
    "NonParametricMu12_title": "Wilcoxon Rank Sum Test", 
    "NonParametricMu12": "Wilcoxon Rank Sum Test : Location Parameter &mu;<sub>1</sub>, &mu;<sub>2</sub>", 
    "WilcoxonTest": "Wilcoxon Rank Sum Test",
    "Sample Range": "Sample Range",
    "DistributionTable": "Distribution Table",
    "SignedRankTest": "Wilcoxon Signed Rank Sum Test",
    "SignTest": "Sign Test",
    "SignCount": "Sign Count",
    "KruskalTest": "Kruskal-Wallis Test",
    "KruskalTestANOVA": "Kruskal-Wallis Test : Location Parameter &mu;<sub>1</sub>, &mu;<sub>2</sub>, &mu;<sub>3</sub> ",
    "Total": "Total",
    "FriedmanTest": "Friedman Test",
    "FriedmanTestANOVA": "Friedman Test : Location Parameter &mu;<sub>1</sub>, &mu;<sub>2</sub>, ... , &mu;<sub>k</sub> ",
    "Block": "Block",
    "Treatment": "Treatment",
    "At least one locations is different": "At least one pair of locations is different",
    "SignCondition": "If n ≤ 100 Binomial Test,  n > 100 Normal Approximation Test",
    "WilcoxonSignCondition": "If n≤ 20 Wilcoxon Rank Sum Test,  n > 20 Nomal Approximation Test",
    "WilcoxonRankCondition": "if n=n<sub>1</sub>+n<sub>2</sub> ≤ 25 Wilcoxon Rank Sum Test,  n>25 Nomal Approximation Test",
    "KruskalCondition": "If n≤ 10 H Distribution Test,  else &chi;<sup>2</sup> approximation test",

};
// Spanish
appStr[1][6] = "../eStatH/index.html";
appStr[2][6] = "../eStatU/index.html";
appStr[3][6] = "../eStatE/index_en.html";
appStr[4][6] = "../ExLearning/index_en.html";
appStr[5][6] = "index.html";
appStr[6][6] = "../ExLecture/index_en.html";
alertMsg[1][6] = "Una de las variables seleccionadas no contiene datos";
alertMsg[2][6] = "Seleccionar una a una las  variables para el análisis (clicando los nombres de las columnas). Si hay dos variables, la primera es la variable grupo";
alertMsg[3][6] = "Datos faltantes en la variable seleccionada";
alertMsg[4][6] = "Si observaciones de las variables seleccionadas son diferentes o las observaciones son diferentes el análisis no está permitido";
alertMsg[5][6] = "Demasiados grupos! Los gráficos pueden solaparse debido al tamaño de la pantalla";
alertMsg[6][6] = "No están permitidos análisis estadísticos o crear tablas si la variable de análisisen el resumen de datos incluye datos de tipo carácter";
alertMsg[7][6] = "Si más de tres variables son seleccionadas en el análsisi de datos crudo o crear una tabla no está permitido";
alertMsg[8][6] = "Gráfico de puntos permitido si el número de observaciones es menor que 200";
alertMsg[9][6] = "Se permite el Diagrama de Tallo y Hojas  si el número de observaciones es menor que 100";
alertMsg[12][6] = "No están permitidos análisis o crear tablas si la variable de análisis incluye datos de tipo carácter";
alertMsg[14][6] = "No están permitidos los datos resumidos  para gráficos continuos y pruebas de hipótesis";
alertMsg[16][6] = "Solo dos grupos permitidos";
alertMsg[17][6] = "El diagrama de dispersión requiere al menos la variable x y la variable y";
alertMsg[18][6] = "No se permiten más de tres variables en el diagrama de dispersión";
alertMsg[19][6] = "Si hay un carácter en la variable X el gráfico de dispersión no se puede dibujar";
alertMsg[20][6] = "Si hay un carácter en la variable Y el gráfico de dispersión no se puede dibujar";
alertMsg[21][6] = "Si hay datos no observados grabar no está permitido";
alertMsg[22][6] = "Si hay un número negativo, no se puede dibujar un Diagrama de barras";
alertMsg[25][6] = "Si hay un solo grupo el diagrama de barras apilado no está permitido";
alertMsg[27][6] = "Si hay un solo grupo el diagrama de barras de proporciones no está permitido";
alertMsg[29][6] = "Si hay un solo grupo el diagrama de barras lateral no está permitido";
alertMsg[31][6] = "Si hay un solo grupo el diagrama de barras bilateral no está permitido";
alertMsg[32][6] = "Si hay un número negativo, no se puede dibujar un diagrama de tarta";
alertMsg[33][6] = "Si hay un número negativo, no se puede dibujar un diagrama de dónut";
alertMsg[34][6] = "Si hay un número negativo, no se puede dibujar un gráfico de partes componentes";
alertMsg[35][6] = "Si hay un número negativo, no se puede calcular una tabla de frecuencias";
alertMsg[36][6] = "Este diagrama de barras solo se permite para dos grupos";
alertMsg[37][6] = "Este prueba de hipótesis  solo se permite para una variable";
alertMsg[38][6] = "mu es NaN. Entrar valor y reintentar!";
alertMsg[39][6] = "Desviación estándar o bien es cero o NaN. Reintentalo!";
alertMsg[40][6] = "Varianza de entrada es NaN. Entrar valor y reintentar!";
alertMsg[41][6] = "Esta prueba de hipótesis solo es posible para dos variables. La variable grupo solo debe tenir dos grupos";
alertMsg[42][6] = "No se permite la edición del titulo de la prueba de hipótesis! ";
alertMsg[43][6] = "Simple Linear Regression is only for one group";
svgStr[1][6] = " Diagrama de barras";
svgStr[2][6] = " Diagrama de tarta";
svgStr[3][6] = " Gráfico tipo dónut";
svgStr[4][6] = " Diagrama de bandas";
svgStr[5][6] = " Gráfico de líneas";
svgStr[6][6] = " Gráfico de puntos";
svgStr[7][6] = " Diagrama de Box-Whisker";
svgStr[8][6] = " Diagrama de Tallo y Hojas";
svgStr[9][6] = " Histograma";
svgStr[10][6] = " Diagrama de dispersión";
svgStr[11][6] = " Prueba de hipótesis: Media Poblacional";
svgStr[12][6] = " Prueba de hipótesis: Varianza Poblacional";
svgStr[13][6] = " Prueba de hipótesis: Dos Medias Poblacional";
svgStr[14][6] = " Prueba de hipótesis: Dos Varianzas Poblacional";
svgStr[15][6] = " Análisis de Varianza";
svgStr[16][6] = "Frecuencia";
svgStr[17][6] = "Proporción";
svgStr[18][6] = "Grupo ";
svgStr[19][6] = " ";
svgStr[20][6] = "<h3>Datos Resumidos<br>Tabla de frecuencias</h3>";
svgStr[21][6] = "Variable de Grupo";
svgStr[22][6] = "Variable Fila";
svgStr[23][6] = "Total";
svgStr[24][6] = "Total";
svgStr[25][6] = "<h3>Tabla de frecuencias</h3>";
svgStr[26][6] = "Análisis Variable";
svgStr[27][6] = "Valor de la Variable";
svgStr[28][6] = "Valor de la etiqueta";
svgStr[29][6] = "Frecuencia";
svgStr[30][6] = "Porcentaje(%)";
svgStr[31][6] = "<h3>Tabla cruzada</h3>";
svgStr[32][6] = "Variable columna";
svgStr[33][6] = "Variable fila";
svgStr[34][6] = "Media"
svgStr[35][6] = "Desviación estándar"
svgStr[36][6] = "<h3> Histograma<br>Tabla de frecuencias</h3>";
svgStr[37][6] = "Nombre del Grupo";
svgStr[38][6] = "Intervalo";
svgStr[39][6] = "Tallo";
svgStr[40][6] = " Hoja";
svgStr[41][6] = "Grupo 1  Hoja";
svgStr[42][6] = "Grupo 2  Hoja"
svgStr[43][6] = "<h3>Estadística básica</h3>";
svgStr[44][6] = "Observación";
svgStr[45][6] = "Mínimo";
svgStr[46][6] = "Mediana";
svgStr[47][6] = "Máximo";
svgStr[48][6] = "Total";
svgStr[49][6] = "<h3>Normal prueba</h3>";
svgStr[50][6] = "*** E<sub>i</sub> > 5";
svgStr[51][6] = "&chi;<sup>2</sup> prueba<br>Interval i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][6] = "Data<br>Observed Frecuencias<br>(O<sub>i</sub>)";
svgStr[53][6] = "Normal Distribución<br>Expected Probabilidad<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][6] = "Normal Distribución<br>Expected Frecuencias<br>(E<sub>i</sub>)";
svgStr[55][6] = "&chi;<sup>2</sup> valor<br>(O<sub>i</sub>-E<sub>i</sub>)<sup>2</sup> / E<sub>i</sub>";
svgStr[56][6] = "Total &chi;<sup>2</sup> valor";
svgStr[57][6] = "Probabilidad Hitograma, Normal Distribución";
svgStr[58][6] = "Normal Q-Q Diagrama";
svgStr[59][6] = "Normal Quantile";
svgStr[60][6] = "Coeficiente de correlación";
svgStr[61][6] = "Coeficiente of Determination";
svgStr[62][6] = "Error estándar";
svgStr[63][6] = "Variable";
svgStr[64][6] = "Nombre de la Variable";
svgStr[65][6] = "Independientes Variable";
svgStr[66][6] = "Dependientes Variable";
svgStr[67][6] = "Parameter";
svgStr[68][6] = "Estimated valor";
svgStr[69][6] = "valor";
svgStr[70][6] = "Intercept";
svgStr[71][6] = "Slope";
svgStr[72][6] = "Factor";
svgStr[73][6] = "Sum of Squares";
svgStr[74][6] = "deg of freedom";
svgStr[75][6] = "Mean Squares";
svgStr[76][6] = "Regresión";
svgStr[77][6] = "Error";
svgStr[78][6] = "Total";
svgStr[79][6] = "<h3>Regresión Análisis</h3>";
svgStr[80][6] = "Standardized Residual Q-Q Diagrama";
svgStr[81][6] = "Standardized Residual";
svgStr[82][6] = "Normal Quantile";
svgStr[83][6] = "Residual Diagrama";
svgStr[84][6] = "Predicted valor";
svgStr[85][6] = "Two way ANOVA";
svgStr[86][6] = "Confidence Interval Graph";
svgStr[87][6] = "Residual";
svgStr[88][6] = "Two way Mean Table";
svgStr[89][6] = "Scatter Plot Matrix";
svgStr[90][6] = "Multiple Comparison";
svgStr[91][6] = "Statistics";
svgStr[92][6] = "Factor";
svgStr[93][6] = "Level";
svgStr[94][6] = "Paired Sample Data Graph";
svgStr[95][6] = "Residual vs Forecasting Plot";
svgStr[96][6] = "Residual vs Leverage Plot";
svgStr[97][6] = "Cook's Distance Graph";
svgStr[98][6] = "Cook's Distance";
svgStr[99][6] = "Data Order";
svgStr[100][6]= "Mean Difference";
svgStr[101][6]= "Testing Means";
svgStr[102][6]= "Treatment";
svgStr[103][6]= "Interaction";
svgStr[104][6]= "Row Total";
svgStr[105][6]= "Column Total";
svgStr[106][6]= "Multiple Correlation Coeff";
svgStr[107][6]= "<h3>Correlation Analysis</h3>";
svgStr[108][6]= "Correlation Matrix";
svgStr[109][6]= "Factor1 - Factor2 Mean Graph";

svgStrU[1][6] = "Distribución Binomial";
svgStrU[2][6] = "Repetición";
svgStrU[3][6] = "Media";
svgStrU[4][6] = "Desviación estándar";
svgStrU[5][6] = "Distribución Poisson";
svgStrU[6][6] = "Distribución Geométrica";
svgStrU[7][6] = "Distribución Hipergeométrica";
svgStrU[8][6] = "Población";
svgStrU[9][6] = "Distribución muestral";
svgStrU[10][6] = "Ley de los Grandes Números";
svgStrU[11][6] = "Cruz";
svgStrU[12][6] = "Cara";
svgStrU[13][6] = "Cara";
svgStrU[14][6] = "Número de caras";
svgStrU[15][6] = "Número de ensayos";
svgStrU[16][6] = "Distribución de Medias Muestrales";
svgStrU[17][6] = "Repetición";
svgStrU[18][6] = "Error estándar";
svgStrU[19][6] = "Media Poblacional";
svgStrU[20][6] = "Intervalo de confianza";
svgStrU[21][6] = "Precisión de la estimación";
svgStrU[22][6] = "Media muestral";
svgStrU[23][6] = "[Prueba Estadísticos] = ";
svgStrU[24][6] = "Distribución";
svgStrU[25][6] = "Rechazar H\u2080";
svgStrU[26][6] = "Aceptar H\u2080";
svgStrU[27][6] = " p-valor  = ";
svgStrU[28][6] = "[Decisión] ";
svgStrU[29][6] = "[ANOVA]";
svgStrU[30][6] = "Entrar el coeficiente de correlación y clicar el botón ejecutar";
svgStrU[31][6] = "Regresión";
svgStrU[32][6] = "Variable Fila";
svgStrU[33][6] = "Variable columna";
svgStrU[34][6] = "Media"
svgStrU[35][6] = "Desviación estándar"
svgStrU[36][6] = "<h3> Histograma<br>Tabla de frecuencias</h3>";
svgStrU[37][6] = "Nombre del Grupo";
svgStrU[38][6] = "Intervalo";
svgStrU[39][6] = "Tallo";
svgStrU[40][6] = " Hoja";
svgStrU[41][6] = "Grupo 1  Hoja";
svgStrU[42][6] = "Grupo 2  Hoja";
svgStrU[43][6] = "<h3>Estadística básica</h3>";
svgStrU[44][6] = "Observación";
svgStrU[45][6] = "Mínimo";
svgStrU[46][6] = "Mediana";
svgStrU[47][6] = "Máximo";
svgStrU[48][6] = "Total";
svgStrU[49][6] = "Exponencial";
svgStrU[50][6] = "Uniforme";
svgStrU[51][6] = "Precisión de la estimación";
svgStrU[52][6] = "- Crear puntos clicándolos y eStat encuentra una recta de regresión";
svgStrU[53][6] = "- Mover o borrar un punto. Observar cambio en la recta de regresión";
svgStrU[54][6] = "[Estadísticos muestrales] ";
svgStrU[55][6] = "[Estadísticos muestrales 1] ";
svgStrU[56][6] = "[Estadísticos muestrales 2] ";
svgStrU[57][6] = "Nivel de confianza";
svgStrU[58][6] = "Fila y columna independientes";
svgStrU[59][6] = "Fila y columna no independientes";
svgStrU[60][6] = "Observed Distribution";
svgStrU[61][6] = "Theoretical Distribution";
svgStrU[62][6] = "Goodness of Fit Test for Observed Frequency";
svgStrU[63][6] = "Wilcoxon Rank Sum Test";
svgStrU[64][6] = "Wilcoxon Rank Sum Test Table";
svgStrU[65][6] = "Kruskal-Wallis Test";
svgStrU[66][6] = "Kruskal-Wallis Test Table";
svgStrU[67][6] = "Kruskal-Wallis H Statistics";
svgStrU[68][6] = "Wilcoxon Signed Rank Test";
svgStrU[69][6] = "Sign Test";
svgStrU[70][6] = "Friedman Test";
svgStrU[71][6] = "Friedman S Statistic";
svgStrU[72][6] = "Friedman Distribution Table";
// Vietnamese
$.message.vi = {
    "eStat : Stat Education SW": "eStat : Phần mềm thống kê học",
    "Filename": "Tên tệp",
    "Selected Variables": "Biến đã chọn",
    "Cancel": "Thoát",
    "Edit Variables": "Sửa biến",
    "Level": "Level",
    "ElementaryLevel": "Cơ bản",
    "MiddleLevel": "Trung cấp",
    "HighLevel": "H",
    "UniversityLevel": "Đại học",
    "Example": "Ví dụ",
    "New Sheets": "Tạo bảng mới",
    "csv Open": "Mở csv",
    "www Open": "Mở www",
    "json Open": "Mở json",
    "csv Save": "Lưu csv",
    "json Save": "Lưu json",
    "Print Sheet": "In bảng",
    "Bar Graph": "Biểu đồ cột",
    "Pie Chart": "Biểu đồ tròn",
    "Band Graph": "Biểu đồ thanh",
    "Line Graph": "Biểu đồ đường",
    "Dot Graph": "Biểu đồ điểm ",
    "Histogram": "Histogram",
    "Stem & Leaf Plot": "Đồ thị Stem-Leaf",
    "Box-Whisker Plot": "Biểu đồ Box-Whisker",
    "Scatterplot": "Biểu đồ phân tán",
    "Frequency Table": "Bảng tần số",
    "Basic Statistics": "Thống kê cơ bản",
    "Testing Hypothesis &mu;": "Kiểm định giả thuyết &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "Kiểm định giả thuyết &sigma;<sup>2</sup>",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "Kiểm định giả thuyết &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "Kiểm định giả thuyết &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Analysis of Variance": "Phân tích ANOVA",
    "High School Stat Education": "Thống kê trung học",
    "University Stat Education": "Thống kê Đại học",
    "Elem Stat Graph Example": "biểu đồ Ví dụ",
    "Learning eStat w Example": "Học eStat bằng ví dụ",
    "Vertical Separated Bar": "Biểu đồ cột",
    "Vertical Stacked Bar": "Biểu đồ cột chồng",
    "Vertical Ratio Bar": "Thanh tỉ số dọc",
    "Vertical Side by Side Bar": "Biểu đồ cột ghép",
    "Vertical Two Sided Bar": "Biểu đồ cột hai bên",
    "Horizontal Separated Bar": "Biểu đồ cột (ngang)",
    "Horizontal Stacked Bar": "Biểu đồ cột chồng (ngang)",
    "Horizontal Ratio Bar": "Thanh tỉ số (ngang)",
    "Horizontal Side by Side Bar": "Biểu đồ cột ghép (ngang)",
    "Horizontal Two Sided Bar": "Biểu đồ cột ghép (ngang)",
    "Doughnut Graph": "Biểu đồ tròn",
    "Two Sided Stem & Leaf Plot": "Biểu đồ Stem-Leaf kép",
    "Graph Save": "Lưu biểu đồ",
    "Graph Print": "In biểu đồ",
    "Move to Table": "Chuyển đến bảng",
    "Edit Title": "Sửa tiêu đề",
    "Table Save": "Lưu bảng",
    "Table Print": "In bảng",
    "Frequency": "Tần số",
    "(Sorting)": "(Sắp xếp)",
    "Raw Data": "Dữ liệu thô",
    "Descending": "S/x giảm dần",
    "Ascending": "S/x tăng dần",
    "Mean": "Trung bình",
    "Std Deviation": "Độ lệch chuẩn",
    "Regression": "Hồi quy",
    "MeanStd": "Trung bình/Độ lệch chuẩn",
    "95CI": "95% Khoảng tin cậy",
    "RegressionAnalysis": "Regression Analysis",
    "ANOVA2": "Two way ANOVA",

    "Frequency Polygon": "Miền tần số",
    "Frequency Table": "Bảng tần số",
    "Execute New Interval": "Thực thi khoảng mới",
    "Interval Start": "Đầu khoảng",
    "Interval Width": "Độ rộng khoảng",
    "t-test": "Kiểm định t",
    "Z-test": "Kiểm định Z",
    "(if Z-test, enter &sigma;)": "(Nếu kiểm định Z, hãy nhập &sigma;)",
    "Significance Level": "Mức ý nghĩa",
    "Execute": "Thực thi",
    "(Confidence Interval)": "(Khoảng tin cậy)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Nếu kiểm định Z, Z, &sigma;)",
    "&chi;<sup>2</sup> test": "Kiểm định &chi;<sup>2</sup>",
    "Variance Assumption": "Giả thiết về phương sai",
    "F test": "Kiểm định F",
    "At least one pair of means is different": "Có ít nhất một cặp trung bình khác nhau",
    "Main Title : ": "Tên chính : ",
    "y title : ": "Tên y : ",
    "x title : ": "Tên x : ",
    "Modify": "Chỉnh sửa",
    "Confirm": "Xác nhận",
    "Variable Name": "Tên biến",
    "Variable Value": "Giá trị biến",
    "Value Label": "Nhãn giá trị",
    "* Less than nine value labels allowed.": "* Chỉ cho phép ít hơn 9 nhãn giá trị.",
    "Save": "Lưu",
    "Exit": "Thoát",
    "eStatU UnivStatEdu": "eStatU - T/kê Đại học",
    "eStatH HighStatEdu": "eStatH - T/kê Trung học",
    "Menu": "Menu",
    "Binomial Experiment": "Thí nghiệm nhị thức",
    "Binomial Distribution": "Phân phối nhị thức",
    "Binomial Prob Table": "Xác suất nhị thức",
    "Poisson Distribution": "Phân phối Poisson",
    "Poisson Prob Table": "Xác suất Poisson",
    "Geometric Distribution": "Phân phối hình học",
    "Geometric Prob Table": "Xác suất p/p hình học",
    "HyperGeometric Distribution": "Phân phối siêu hình học",
    "HyperGeometric Prob Table": "Xác suất p/p Siêu hình học",
    "Exponential Distribution": "Phân phối mũ",
    "Normal Experiment": "Thí nghiệm p/p chuẩn",
    "Normal Distribution": "Phân phối chuẩn",
    "Normal Approx": "Xấp xỉ chuẩn",
    "t Distribution": "Phân phối t",
    "ChiSquare Distribution": "Phân phối ChiSquare",
    "F Distribution": "Phân phối F",
    "Sampling": "Lấy mẫu",
    "Population vs Sample": "Tổng thể vs mẫu",
    "Population": "Tổng thể",
    "Sample": "mẫu",
    "Exponential": "Thí nghiệm p/p chuẩn(0.3)",
    "Uniform": "P/p Đều(0,1)",
    "Sample05": "Lấy mẫu 5%",
    "Sample10": "Lấy mẫu 10%",
    "Sample20": "Lấy mẫu 20%",
    "Statistics/BoxPlot": "Thống kê/Biểu đồ Box",
    "Law of Large Number": "Luật số lớn",
    "Dist of Sample Means": "P/p của trung bình mẫu",
    "Sample Size": "Cỡ mẫu",
    "Confidence Interval": "Khoảng tin cậy",
    "Estimation Accuracy": "Độ chính xác của ước lượng",
    "Repetition": "Sự lặp lại",
    "Confidence Level": "Độ tin cậy",
    "Testing Hypothesis mu_titleAB": "Kiểm định Trung bình",
    "Testing Hypothesis mu_title": "Kiểm định Trung bình",
    "Testing Hypothesis sigma_title": "Kiểm định Phương sai",
    "Testing Hypothesis P_title": "Kiểm định Tỉ lệ ",
    "Testing Hypothesis mu12_title": "Kiểm định Trung bình hai tổng thể",
    "Testing Hypothesis sigma12_title": "Kiểm định Phương sai hai tổng thể",
    "Testing Hypothesis P12_title": "Kiểm định P1, P2",
    "Testing Hypothesis muAB": "Kiểm định giả thuyết &mu; - &alpha;, &beta;",
    "Testing Hypothesis mu": "Kiểm định giả thuyết &mu;",
    "Testing Hypothesis sigma": "Kiểm định giả thuyết &sigma;<sup>2</sup>",
    "Testing Hypothesis P": "Kiểm định P",
    "Testing Hypothesis mu12": "Kiểm định giả thuyết &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "Kiểm định giả thuyết &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Testing Hypothesis P12": "Kiểm định giả thuyết P<sub>1</sub>, P<sub>2</sub>",
    "Testing Hypothesis ANOVA": "Kiểm định ANOVA",
    "Testing Independence": "Kiểm định độc lập",
    "Correlation Coefficient": "Hệ số tương quan",
    "Regression Experiment": "Thí nghiệm hồi quy",
    "Hypothesis": "Giả thuyết",
    "Test Type": "Loại kiểm định",
    "Z-test": "Kiểm định Z",
    "t-test": "Kiểm định t",
    "Chi-test": "kiểm định &chi;<sup>2</sup>",
    "F-test": "Kiểm định F",
    "Sampling Type": "Sampling Type",
    "Independent Sample": "independent",
    "Paired Sample": "paired",
    "Sample Data": "Dữ liệu mẫu",
    "input either sample data": "Nhập dữ vào bảng kế tiếp bằng file csv/bsv",
    "Sample Statistics": "Thống kê mẫu",
    "Sample Mean": "Trung bình mẫu",
    "Sample Variance": " Phương sai mẫu",
    "Sample Proportion": "Tỉ lệ mẫu",
    "if Z-test-1": "(Nếu kiểm định Z, nhập phương sai tổng thể &sigma;<sup>2</sup>)",
    "if Z-test-2": "(Nếu kiểm định Z, Z<sub>1-&alpha;/2 </sub>.)",
    "Variance Assumption": "Giả thiết về phương sai",
    "At least one pair": "Có ít nhất một cặp trung bình khác nhau",
    "Row-Col-0": "Biến cột và biến dòng độc lập ",
    "Row-Col-1": "Biến cột và biến dòng độc lập ",
    "Enter any number of row": "(Nhập số vào ô trên cùng bên trái)",
    "Row": "Dòng",
    "Column": "Cột",
    "Show Probability": "Xem xác suất",
    "Regression Line": "Đường hồi quy",
    "Erase All": "Xóa tất cả",
    "Add Point": "Thêm điểm",
    "Erase Point": "Xóa điểm",
    "Reference Site": "Tham khảo",
    "Lot Size": "Kích thước lô",
    "Defect Size": "Có vấn đề về cỡ mẫu",
    "If typed": "(Nhập số bằng tay)",
    "Stat/BoxPlot": "Thống kê / Biểu đồ Box",
    "Mean": "Trung bình",
    "Std Dev": "Độ lệch chuẩn",
    "SimulationWarning": "Kết thúc giả lập trước khi tiếp tục",
    "OneGroup": "(Một nhóm)",
    "RegressionBand": "Khoảng tin cậy",
    "RegressionTable": "Phân Tích hồi quy",
    "RegressionResidual": "Đồ thị phần dư",
    "RegressionResidualLeverage": "Residual vs Leverage",
    "RegressionCook": "Cook's Distance Graph",
    "RegressionQQ": "Đồ thị Q-Q lot cho phần dư",
    "HistogramNormal": "Histogram",
    "HistogramChisq": "Kiểm định chuẩn và phương",
    "HistogramNormalQQ": "Đồ thị Q-Q Plot pp chuẩn",
    "PopulationStd": "Độ lệch chuẩn tổng thể",
    "Type1Error": "Sai lầm loại 1",
    "Type2Error": "Sai lầm loại 2",
    "AnovaTable": "Bảng ANOVA",
    "AnovaMeanGraph": "Khoảng tin cậy cho trung bình",
    "MultipleComparison": "So sánh kép",
    "AnovaResidual": "Biểu đồ phần dư",
    "AnovaQQ": "Biểu đồ Q-Q Plot cho phần dư",
    "TestingFit": "Kiểm định độ phù hợp của mô hình",
    "FitTest0": " Phân phối thực và lý thuyết giống nhau ",
    "FitTest1": " Phân phối thực và lý thuyết khác nhau ",
    "ObservedFreq": "Tần số quan sát O",
    "ExpectedProb": "Xác suất kì vọng p",
    "ExpectedFreq": "Tần số kì vọng E(>5)",
    "InputFitData": "Điền giá trị vào ô trên cùng bên trái",
    "ExecuteTable": "Thống kê",
    "MeanDotGraph": "Đồ thị khoảng tin cậy",
    "ScatterRegression": "Ma trận đồ thị phân tán",
    "Factor": "Factor",
    "Interaction": "Interaction",
    "NoInteraction": "No Interaction",
    "ExistInteraction": "Exist Interaction",
    "eStatLecture": "eStat Intro Lecture",
    "NonParametricMu12_title": "Wilcoxon Rank Sum Test", 
    "NonParametricMu12": "Wilcoxon Rank Sum Test : Location Parameter &mu;<sub>1</sub>, &mu;<sub>2</sub>", 
    "WilcoxonTest": "Wilcoxon Rank Sum Test",
    "Sample Range": "Sample Range",
    "DistributionTable": "Distribution Table",
    "SignedRankTest": "Wilcoxon Signed Rank Sum Test",
    "SignTest": "Sign Test",
    "SignCount": "Sign Count",
    "KruskalTest": "Kruskal-Wallis Test",
    "KruskalTestANOVA": "Kruskal-Wallis Test : Location Parameter &mu;<sub>1</sub>, &mu;<sub>2</sub>, &mu;<sub>3</sub> ",
    "Total": "Total",
    "FriedmanTest": "Friedman Test",
    "FriedmanTestANOVA": "Friedman Test : Location Parameter &mu;<sub>1</sub>, &mu;<sub>2</sub>, ... , &mu;<sub>k</sub> ",
    "Block": "Block",
    "Treatment": "Treatment",
    "At least one locations is different": "At least one pair of locations is different",
    "SignCondition": "If n ≤ 100 Binomial Test,  n > 100 Normal Approximation Test",
    "WilcoxonSignCondition": "If n≤ 20 Wilcoxon Rank Sum Test,  n > 20 Nomal Approximation Test",
    "WilcoxonRankCondition": "if n=n<sub>1</sub>+n<sub>2</sub> ≤ 25 Wilcoxon Rank Sum Test,  n>25 Nomal Approximation Test",
    "KruskalCondition": "If n≤ 10 H Distribution Test,  else &chi;<sup>2</sup> approximation test",

};
// Vietnamese
appStr[1][7] = "../eStatH/index.html";
appStr[2][7] = "../eStatU/index.html";
appStr[3][7] = "../eStatE/index_en.html";
appStr[4][7] = "../ExLearning/index_en.html";
appStr[5][7] = "index.html";
appStr[6][7] = "../ExLecture/index_en.html";
alertMsg[1][7] = "Đã chọn biến không chứa dữ liệu";
alertMsg[2][7] = "Chọn từng biến để phân tích (click tên cột). Nếu chọn 2 biến, biến đầu tiên là biến định tính";
alertMsg[3][7] = "Biến đã chọn thiếu số liệu";
alertMsg[4][7] = "Nếu số liệu của biến đã chọn khác nhau, không thể phân tích";
alertMsg[5][7] = "Quá nhiều nhóm! Các đồ thị sẽ chồng lên nhau do kích thước của màn hình";
alertMsg[6][7] = "Nếu biến có chứa chuỗi (chữ cái),không thể phân tích/tạo bảng";
alertMsg[7][7] = "Nếu chọn hơn 3 biến, việc phân tích hoặc tạo bảng sẽ không thực thi";
alertMsg[8][7] = "Biểu đồ chấm chỉ cho cỡ mẫu nhỏ hơn 200";
alertMsg[9][7] = "Đồ thị Stem and Leaf chỉ cho cỡ mẫu nhỏ hơn 100";
alertMsg[12][7] = "Nếu biến chứa chuỗi, không thể phân tích hay tạo bảng";
alertMsg[14][7] = "Bảng tóm tắt không thể tạo cho đồ thị liên tục và kiểm định giả thuyết";
alertMsg[16][7] = "Kiểm định này chỉ cho phép 2 nhóm";
alertMsg[17][7] = "Biểu đồ phân tán cần ít nhất biến x và biến y";
alertMsg[18][7] = "Biểu đồ phân tán chỉ cho ít hơn 3 biến";
alertMsg[19][7] = "Nếu biến X chứa chuỗi, không thể vẽ biểu đồ phân tán";
alertMsg[20][7] = "Không thể vẽ biều đồ phân tán nếu biến Y chứa chuỗi";
alertMsg[21][7] = "Nếu dữ liệu bị thiếu, không thể lưu";
alertMsg[22][7] = "Nếu có giá trị âm, không thể vẽ biểu đồ cột";
alertMsg[25][7] = "Nếu chỉ có 1 nhóm, không thể vẽ biểu đồ cột chồng ";
alertMsg[27][7] = "Nếu chỉ chọn 1 nhóm, không thể vẽ biểu đồ cột tỉ lệ";
alertMsg[29][7] = "Nếu chỉ có 1 nhóm, không thể vẽ biểu đồ cột ghép";
alertMsg[31][7] = "Nếu chỉ chọn 1 nhóm, không thể vẽ biểu đồ cột hai bên ";
alertMsg[32][7] = "Nếu có giá trị âm, không thể vẽ biểu đồ Pie";
alertMsg[33][7] = "Nếu có giá trị âm, không thể vẽ biểu đồ Donut)";
alertMsg[34][7] = "Nếu có giá trị âm, không thể vẽ biểu đồ Band";
alertMsg[35][7] = "Nếu có giá trị âm, không thể tạo bảng tần số";
alertMsg[36][7] = "Biểu đồ cột chỉ cho phép 2 nhóm";
alertMsg[37][7] = "Chỉ có thể kiểm định cho 1 biến";
alertMsg[38][7] = "Giá trị trung bình là NaN. Hãy nhập giá trị khác và thử lại!";
alertMsg[39][7] = "Độ lệch chuẩn là 0 hoặc NaN. Hãy thử lại!!";
alertMsg[40][7] = "Phương sai đã nhập là NaN. Hãy nhập giá trị khác và thử lại!!";
alertMsg[41][7] = "Chỉ có thể kiểm định giả thuyết thống kê cho 2 biến";
alertMsg[42][7] = "Không thể thay đổi tên của kiểm định! ";
alertMsg[43][7] = "Simple Linear Regression is only for one group";
svgStr[1][7] = " B/đồ cột";
svgStr[2][7] = " B/đồ Pie";
svgStr[3][7] = " B/đồ Donut";
svgStr[4][7] = " B/đồ Band";
svgStr[5][7] = " B/đồ Line";
svgStr[6][7] = " B/đồ Dot";
svgStr[7][7] = " B/đồ Box-Whisker";
svgStr[8][7] = " B/đồ Stem-Leaf";
svgStr[9][7] = " Histogram";
svgStr[10][7] = " B/đồ phân tán";
svgStr[11][7] = " Kiểm định: Trung bình tổng thể";
svgStr[12][7] = " Kiểm định: Phương sai tổng thể";
svgStr[13][7] = " Kiểm định: Trung bình 2 tổng thể";
svgStr[14][7] = " Kiểm định: Phương sai 2 tổng thể";
svgStr[15][7] = " Phân tích ANOVA";
svgStr[16][7] = "Tần số";
svgStr[17][7] = "Tỉ số";
svgStr[18][7] = "Nhóm";
svgStr[19][7] = " ";
svgStr[20][7] = "<h3>Bảng tóm tắt <br> Bảng tần số</h3>";
svgStr[21][7] = "Biến nhóm";
svgStr[22][7] = "Biến dòng";
svgStr[23][7] = "Tổng cộng";
svgStr[24][7] = "Tổng cộng";
svgStr[25][7] = "<h3>Bảng tần số</h3>";
svgStr[26][7] = "Biến phân tích";
svgStr[27][7] = "Giá trị biến";
svgStr[28][7] = "Nhãn giá trị";
svgStr[29][7] = "Tần số";
svgStr[30][7] = "Phần trăm (%)";
svgStr[31][7] = "<h3>Bảng chéo</h3>";
svgStr[32][7] = "Biến cột";
svgStr[33][7] = "Biến dòng";
svgStr[34][7] = "Trung bình"
svgStr[35][7] = "Độ lệch chuẩn"
svgStr[36][7] = "<h3> Histogram<br>Bảng tần số</h3>";
svgStr[37][7] = "Tên nhóm";
svgStr[38][7] = "Khoảng";
svgStr[39][7] = "Stem";
svgStr[40][7] = " Leaf";
svgStr[41][7] = "Nhóm 1  Leaf";
svgStr[42][7] = "Nhóm 2  Leaf"
svgStr[43][7] = "<h3>Thống kê cơ bản</h3>";
svgStr[44][7] = "Quan trắc";
svgStr[45][7] = "Giá trị nhỏ nhất";
svgStr[46][7] = "Trung vị";
svgStr[47][7] = "Lớn nhất";
svgStr[48][7] = "Tổng cộng";
svgStr[49][7] = "<h3>Kiểm định chuẩn</h3>";
svgStr[50][7] = "Tần số kì vọng nên > 5 <br>";
svgStr[51][7] = "&chi;<sup>2</sup> Test<br>Interval i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][7] = "Dữ liệu<br>Tần số quan sát<br>(O<sub>i</sub>)";
svgStr[53][7] = "P/p Chuẩn<br>Xác suất kì vọng<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][7] = "P/p Chuẩn<br>Tần số kì vọng<br>(E<sub>i</sub>)";
svgStr[55][7] = "Each interval<br>&chi;<sup>2</sup> value<br>(O<sub>i</sub>-E<sub>i</sub>)<sup>2</sup> / E<sub>i</sub>";
svgStr[56][7] = "Sum of &chi;<sup>2</sup> value";
svgStr[57][7] = "Histogram x/suất và p/p chuẩn";
svgStr[58][7] = "Đồ thị Q-Q Plot p/p chuẩn";
svgStr[59][7] = "Phân vị chuẩn";
svgStr[60][7] = "Hệ số tương quan";
svgStr[61][7] = "Hệ số xác định";
svgStr[62][7] = "Sai số chuẩn";
svgStr[63][7] = "Biến";
svgStr[64][7] = "Tên biến";
svgStr[65][7] = "Biến độc lập";
svgStr[66][7] = "Biến phụ thuộc";
svgStr[67][7] = "Tham số";
svgStr[68][7] = "Giá trị ước lượng";
svgStr[69][7] = "Giá trị";
svgStr[70][7] = "Intercept";
svgStr[71][7] = "Slope";
svgStr[72][7] = "Factor";
svgStr[73][7] = "Sum of Squares";
svgStr[74][7] = "Bậc tự do";
svgStr[75][7] = "Mean Squares";
svgStr[76][7] = "Hồi quy";
svgStr[77][7] = "Lỗi";
svgStr[78][7] = "Tổng cộng";
svgStr[79][7] = "<h3>Phân tích hồi quy</h3>";
svgStr[80][7] = "Đồ thị Q-Q Plot phần dư chuẩn hóa";
svgStr[81][7] = "Phần dư chuẩn hóa";
svgStr[82][7] = "Phân vị chuẩn";
svgStr[83][7] = "Đồ thị phần dư";
svgStr[84][7] = "Giá trị dự báo";
svgStr[85][7] = "ANOVA 2 chiều";
svgStr[86][7] = "Đồ thị khoảng tin cậy";
svgStr[87][7] = "Phần dư";
svgStr[88][7] = "Bảng giá trị trung bình 2 chiều";
svgStr[89][7] = "Ma trận đồ thị phân tán";
svgStr[90][7] = "So sánh kép";
svgStr[91][7] = "Thống kê";
svgStr[92][7] = "Nhân tố";
svgStr[93][7] = "Level";
svgStr[94][7] = "Đồ thị cho dữ liệu mẫu cặp";
svgStr[95][7] = "Residual vs Forecasting Plot";
svgStr[96][7] = "Residual vs Leverage Plot";
svgStr[97][7] = "Cook's Distance Graph";
svgStr[98][7] = "Cook's Distance";
svgStr[99][7] = "Data Order";
svgStr[100][7]= "Mean Difference";
svgStr[101][7]= "Testing Means";
svgStr[102][7]= "Treatment";
svgStr[103][7]= "Interaction";
svgStr[104][7]= "Row Total";
svgStr[105][7]= "Column Total";
svgStr[106][7]= "Multiple Correlation Coeff";
svgStr[107][7]= "<h3>Correlation Analysis</h3>";
svgStr[108][7]= "Correlation Matrix";
svgStr[109][7]= "Factor1 - Factor2 Mean Graph";

svgStrU[1][7] = "Phân phối nhị thức";
svgStrU[2][7] = "Lặp lại";
svgStrU[3][7] = "Trung bình";
svgStrU[4][7] = "Độ lệch chuẩn";
svgStrU[5][7] = "Phân phối Poisson";
svgStrU[6][7] = "Phân phối hình học";
svgStrU[7][7] = "Phân phối siêu hình học";
svgStrU[8][7] = "Tổng thể";
svgStrU[9][7] = "Phân phối mẫu";
svgStrU[10][7] = "Luật số lớn";
svgStrU[11][7] = "Đuôi";
svgStrU[12][7] = "Mặt sấp";
svgStrU[13][7] = "Đồng xu xuất hiện mặt sấp";
svgStrU[14][7] = "Số lần xuất hiện mặt sấp";
svgStrU[15][7] = "Số lần thử";
svgStrU[16][7] = "Phân phối của trung bình mẫu";
svgStrU[17][7] = "Sự lặp lại";
svgStrU[18][7] = "Sai số chuẩn";
svgStrU[19][7] = "Trung bình tổng thể";
svgStrU[20][7] = "Khoảng tin cậy";
svgStrU[21][7] = "Độ chính xác của ước lượng";
svgStrU[22][7] = "Trung bình mẫu";
svgStrU[23][7] = "[Thống kê kiểm định] = ";
svgStrU[24][7] = "Phân phối";
svgStrU[25][7] = "Bác bỏ H\u2080";
svgStrU[26][7] = "Chấp nhận H\u2080";
svgStrU[27][7] = " Giá trị p-value = ";
svgStrU[28][7] = "[Quyết định] ";
svgStrU[29][7] = "[ANOVA]";
svgStrU[30][7] = "Nhập hệ số tương quan và nhấn Thực thi";
svgStrU[31][7] = "Hồi quy";
svgStrU[32][7] = "Biến dòng";
svgStrU[33][7] = "Biến cột";
svgStrU[34][7] = "Trung bình"
svgStrU[35][7] = "Độ lệch chuẩn"
svgStrU[36][7] = "<h3> Histogram<br>Bảng tần số</h3>";
svgStrU[37][7] = "Tên nhóm";
svgStrU[38][7] = "Khoảng";
svgStrU[39][7] = "Stem";
svgStrU[40][7] = " Leaf";
svgStrU[41][7] = "Nhóm 1  Leaf";
svgStrU[42][7] = "Nhóm 2  Leaf"
svgStrU[43][7] = "<h3>Thống kê cơ bản</h3>";
svgStrU[44][7] = "Quan trắc";
svgStrU[45][7] = "Giá trị nhỏ nhất";
svgStrU[46][7] = "Trung vị";
svgStrU[47][7] = "Lớn nhất";
svgStrU[48][7] = "Tổng cộng";
svgStrU[49][7] = "Phân phối mũ";
svgStrU[50][7] = "Phân phối đều";
svgStrU[51][7] = "Độ chính xác của ước lượng";
svgStrU[52][7] = "- Click chuột trên hệ tọa độ, eStat sẽ tìm đường hồi quy.";
svgStrU[53][7] = "- Di chuyển/xóa bớt số liệu, đường hồi quy sẽ thay đổi .";
svgStrU[54][7] = "[Thống kê mẫu] ";
svgStrU[55][7] = "[Thống kê mẫu 1] ";
svgStrU[56][7] = "[Thống kê mẫu 2] ";
svgStrU[57][7] = "Độ tin cậy";
svgStrU[58][7] = "Biến cột và biến dòng độc lập";
svgStrU[59][7] = "Biến cột và biến dòng độc lập";
svgStrU[60][7] = "Phân phối thực";
svgStrU[61][7] = "Phân phối lý thuyết";
svgStrU[62][7] = "Kiểm định độ phù hợp cho tần số quan sát";
svgStrU[63][7] = "Wilcoxon Rank Sum Test";
svgStrU[64][7] = "Wilcoxon Rank Sum Test Table";
svgStrU[65][7] = "Kruskal-Wallis Test";
svgStrU[66][7] = "Kruskal-Wallis Test Table";
svgStrU[67][7] = "Kruskal-Wallis H Statistics";
svgStrU[68][7] = "Wilcoxon Signed Rank Test";
svgStrU[69][7] = "Sign Test";
svgStrU[70][7] = "Friedman Test";
svgStrU[71][7] = "Friedman S Statistic";
svgStrU[72][7] = "Friedman Distribution Table";

// Indonesian
$.message.id = {
    "eStat : Stat Education SW": "eStat : Stat Education SW",
    "Filename": "Nama File",
    "Selected Variables": "Pilih Variabel",
    "Cancel": "Batal",
    "Edit Variables": "Edit Variabel",
    "Level": "Level",
    "ElementaryLevel": "Dasar",
    "MiddleLevel": "Menengah",
    "HighLevel": "H",
    "UniversityLevel": "Universitas",
    "Example": "Contoh",
    "New Sheets": "Lembar Baru",
    "csv Open": "Buka csv",
    "www Open": "Buka www",
    "json Open": "Buka json",
    "csv Save": "Simpan csv",
    "json Save": "Simpan json",
    "Print Sheet": "Cetak Lembar",
    "Bar Graph": "Diagram Batang",
    "Pie Chart": "Diagram Pai",
    "Band Graph": "Diagram Band",
    "Line Graph": " Diagram Garis",
    "Dot Graph": "Diagram Dot",
    "Histogram": "Histogram",
    "Stem & Leaf Plot": " Diagram Dahan dan Daun",
    "Box-Whisker Plot": "Diagram Box-Whisker",
    "Scatterplot": "Diagram Pencar",
    "Frequency Table": "Tabel Frekuensi",
    "Basic Statistics": "Statistika Dasar",
    "Testing Hypothesis &mu;": "Pengujian Hipotesis &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": " Pengujian Hipotesis &sigma;<sup>2</sup>",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": " Pengujian Hipotesis &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": " Pengujian Hipotesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Analysis of Variance": "Analisis Varians",
    "High School Stat Education": "Pelajaran Statistika tingkat Sekolah Menengah Atas",
    "University Stat Education": "Pelajaran Statistika tingkat Universitas",
    "Elem Stat Graph Example": "Contoh Diagram Statistik Dasar",
    "Learning eStat w Example": "Contoh Pelajaran eStat w",
    "Vertical Separated Bar": "Batang Terpisah Vertikal",
    "Vertical Stacked Bar": "Batang Bertumpuk Vertikal",
    "Vertical Ratio Bar": "Batang Rasio Vertikal",
    "Vertical Side by Side Bar": "Batang Vertikal Besebelahan",
    "Vertical Two Sided Bar": "Batang Vertikal Dua Arah",
    "Horizontal Separated Bar": "Batang Terpisah Horisontal",
    "Horizontal Stacked Bar": "Batang Bertumpuk Horisontal",
    "Horizontal Ratio Bar": "Batang Rasio Horisontal",
    "Horizontal Side by Side Bar": "Batang Vertikal Bersebelahan",
    "Horizontal Two Sided Bar": "Batang Horisontal Dua Arah",
    "Doughnut Graph": "Diagram Donat",
    "Two Sided Stem & Leaf Plot": "Diagram Dahan dan Daun Dua Arah",
    "Graph Save": "Simpan Diagram",
    "Graph Print": "Cetak Diagram",
    "Move to Table": "Pindah ke Tabel",
    "Edit Title": "Edit Judul",
    "Table Save": "Simpan Tabel",
    "Table Print": "Cetak Tabel",
    "Frequency": "Frekuensi",
    "(Sorting)": "(Mengurutkan)",
    "Raw Data": "Data Mentah",
    "Descending": "Mengurutkan dari Besar ke Kecil",
    "Ascending": "Mengurutkan dari Kecil ke Besar",
    "Mean": "Rata-rata",
    "Std Deviation": "Standar Deviasi",
    "MeanStd": "Rata-rata/Standar Deviasi",
    "95CI": "95% Selang Kepercayaan",
    "RegressionAnalysis": "Regression Analysis",
    "ANOVA2": "2 way ANOVA",

    "Regression": "Regresi",
    "Frequency Polygon": "Frekuensi Poligon",
    "Frequency Table": "Tabel Frekuensi",
    "Execute New Interval": "Jalankan Interval Baru",
    "Interval Start": "Mulai Interval",
    "Interval Width": "Lebar Interval",
    "t-test": "uji-t",
    "Z-test": "uji-Z",
    "(if Z-test, enter &sigma;)": "(if uji-Z, masukkan &sigma;)",
    "Significance Level": "Taraf Nyata",
    "Execute": "Jalankan",
    "(Confidence Interval)": "(Selang Kepercayaan)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(if uji-Z, Z, &sigma;digunakan)",
    "&chi;<sup>2</sup> test": "uji &chi;<sup>2</sup>",
    "Variance Assumption": "Asumsi Varians",
    "F test": "Uji F",
    "At least one pair of means is different": "Setidaknya ada satu pasang Rata-rata yang berbeda",
    "Main Title : ": "Judul Utama : ",
    "y title : ": "Judul y : ",
    "x title : ": "Judul x : ",
    "Modify": "Modifikasi",
    "Confirm": "Konfirmasi",
    "Variable Name": "Nama Variabel",
    "Variable Value": "Nilai Variabel",
    "Value Label": "Label Nilai",
    "* Less than nine value labels allowed.": "* Kurang dari sembilan label nilai diperbolehkan.",
    "Save": "Simpan",
    "Exit": "Keluar",
    "eStatU UnivStatEdu": "eStatU ? Pelajaran Statistika Tingkat Universitas SW",
    "eStatH HighStatEdu": "eStatH ? Pelajaran Statistika Tingkat Sekolah Menengah Atas SW",
    "Menu": "Menu",
    "Binomial Experiment": "Percobaan Binomial",
    "Binomial Distribution": "Distribusi Binomial ",
    "Binomial Prob Table": "Tabel Peluang Binomial ",
    "Poisson Distribution": "Distribusi Poisson ",
    "Poisson Prob Table": "Tabel Peluang Poisson",
    "Geometric Distribution": "Distribusi Geometri",
    "Geometric Prob Table": "Tabel Peluang Geometri",
    "HyperGeometric Distribution": "Distribusi Hipergeometri",
    "HyperGeometric Prob Table": "Tabel Peluang Hipergeometri",
    "Exponential Distribution": "Distribusi Eksponensial",
    "Normal Experiment": "Percobaan Normal",
    "Normal Distribution": "Distribusi Normal",
    "Normal Approx": "Pendekatan Normal",
    "t Distribution": "Distribusi t",
    "ChiSquare Distribution": "Distribusi Khi-Kuadrat",
    "F Distribution": "Distribusi F",
    "Sampling": "Pengambilan Sampel",
    "Population vs Sample": "Populasi vs Sampel",
    "Population": "Populasi",
    "Sample": "Sampel",
    "Exponential": "Eksponensial(0.3)",
    "Uniform": "Seragam(0,1)",
    "Sample05": "Pengambilan Sampel 5%",
    "Sample10": "Pengambilan Sampel 10%",
    "Sample20": "Pengambilan Sampel 20%",
    "Statistics/BoxPlot": "Statistik/Diagram Kotak Garis",
    "Law of Large Number": "Hukum Bilangan Besar",
    "Dist of Sample Means": "Distribusi dari Rata-rata Sampel",
    "Sample Size": "Ukuran Sampel",
    "Confidence Interval": "Selang Kepercayaan",
    "Estimation Accuracy": "Keakurasian Nilai Estimasi",
    "Repetition": "Ulangan",
    "Confidence Level": "Taraf Nyata",
    "Testing Hypothesis mu_titleAB": "Uji Hipotesis Rata-rata Satu Populasi",
    "Testing Hypothesis mu_title": "Uji Hipotesis Rata-rata Satu Populasi",
    "Testing Hypothesis sigma_title": "Uji Hipotesis Varians Satu Populasi",
    "Testing Hypothesis P_title": "Uji Hipotesis Proporsi Satu Populasi",
    "Testing Hypothesis mu12_title": "Uji Hipotesis Rata-rata Dua Populasi",
    "Testing Hypothesis sigma12_title": "Uji Hipotesis Varians Dua Populasi",
    "Testing Hypothesis P12_title": "Uji Hipotesis Proporsi Dua Populasi",
    "Testing Hypothesis muAB": "Pengujian Hipotesis &mu; - &alpha;, &beta;",
    "Testing Hypothesis mu": "Pengujian Hipotesis &mu;",
    "Testing Hypothesis sigma": "Pengujian Hipotesis &sigma;<sup>2</sup>",
    "Testing Hypothesis P": "Pengujian Hipotesis P",
    "Testing Hypothesis mu12": "Pengujian Hipotesis &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "Pengujian Hipotesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Testing Hypothesis P12": "Pengujian Hipotesis P<sub>1</sub>, P<sub>2</sub>",
    "Testing Hypothesis ANOVA": "Pengujian Hipotesis ANOVA",
    "Testing Independence": "Uji Independensi",
    "Correlation Coefficient": "Koefisien Korelasi",
    "Regression Experiment": "Percobaan Regresi",
    "Hypothesis": "Hipotesis",
    "Test Type": "Tipe Uji",
    "Z-test": "uji-Z ",
    "t-test": "uji-t",
    "Chi-test": "uji-&chi;<sup>2</sup>",
    "F-test": "uji-F",
    "Sampling Type": "Sampling Type",
    "Independent Sample": "independent",
    "Paired Sample": "paired",
    "Sample Data": "Data Sampel",
    "input either sample data": " Masukan Data Sampel atau Statistik Sampel di Kotak Selanjutnya menggunakan csv/bsv ",
    "Sample Statistics": "Statistik Sampel",
    "Sample Mean": "Rata-rata Sampel",
    "Sample Variance": "Varians Sampel",
    "Sample Proportion": "Proporsi Sampel",
    "if Z-test-1": "(if uji-Z, Masukkan Varians Populasi &sigma;<sup>2</sup>)",
    "if Z-test-2": "(if uji-Z, Z<sub>1-&alpha;/2 </sub> digunakan.)",
    "Variance Assumption": "Asumsi Varians",
    "At least one pair": " Setidaknya Ada Satu Pasang Rata-rata yang Berbeda",
    "Row-Col-0": "Baris dan Kolom Variabel saling bebas/independen",
    "Row-Col-1": " Baris dan Kolom Variabel tidak saling bebas/independen",
    "Enter any number of row": "( Masukkan amatan dari entri pojok kiri atas)",
    "Row": "Baris",
    "Column": "Kolom",
    "Show Probability": "Tampilkan Peluang",
    "Regression Line": "Garis Regresi",
    "Erase All": "Hapus Layar",
    "Add Point": "Tambahkan Titik",
    "Erase Point": "Hapus Titik",
    "Reference Site": "Situs Referensi",
    "Lot Size": "Jumlah Lot",
    "Defect Size": "Jumlah Cacat",
    "If typed": "(Jika Bilangan di Ketik)",
    "Stat/BoxPlot": "Stat/Diagram Kotak Garis",
    "Mean": "Rata-rata",
    "Std Dev": "Standar Deviasi",
    "SimulationWarning": "( Simulasi yang sekarang harus terlebih dahulu diselesaikan sebelum anda memulai simulasi yang selanjutnya)",
    "OneGroup": "(Satu Grup)",
    "RegressionBand": "Selang Kepercayaan",
    "RegressionTable": "Analisis Regresi",
    "RegressionResidual": "Plot Residual",
    "RegressionResidualLeverage": "Residual vs Leverage",
    "RegressionCook": "Cook's Distance Graph",
    "RegressionQQ": "Q-Q Plot Residual",
    "HistogramNormal": "Histogram",
    "HistogramChisq": "Uji Normal",
    "HistogramNormalQQ": "Q-Q Plot Normal",
    "PopulationStd": "Standar Deviasi dari Populasi",
    "Type1Error": "Eror Tipe 1",
    "Type2Error": "Eror Tipe 2",
    "AnovaTable": "Tabel ANOVA",
    "AnovaMeanGraph": "Selang kepercayaan dari Rata-rata",
    "MultipleComparison": "Perbandingan Berganda",
    "AnovaResidual": "Plot Residual",
    "AnovaQQ": "Q-Q Plot dari Residual",
    "TestingFit": "Uji Kebaikan/kelayakan Model",
    "FitTest0": "Distribusi empirik sama dengan distribusi teoritik",
    "FitTest1": " Distribusi empirik berbeda dengan distribusi teoritik",
    "ObservedFreq": "Frekuensi amatan O",
    "ExpectedProb": "Peluang harapan p",
    "ExpectedFreq": "Frekuensi harapan E(>5)",
    "InputFitData": "Masukkan sel dari sel kiri atas",
    "ExecuteTable": "Statistik",
    "MeanDotGraph": "Grafik Selang Kepercayaan",
    "ScatterRegression": "Diagram Pencar",
    "Factor": "Factor",
    "Interaction": "Interaction",
    "NoInteraction": "No Interaction",
    "ExistInteraction": "Exist Interaction",
    "eStatLecture": "eStat Intro Lecture",
    "NonParametricMu12_title": "Wilcoxon Rank Sum Test", 
    "NonParametricMu12": "Wilcoxon Rank Sum Test : Location Parameter &mu;<sub>1</sub>, &mu;<sub>2</sub>", 
    "WilcoxonTest": "Wilcoxon Rank Sum Test",
    "Sample Range": "Sample Range",
    "DistributionTable": "Distribution Table",
    "SignedRankTest": "Wilcoxon Signed Rank Sum Test",
    "SignTest": "Sign Test",
    "SignCount": "Sign Count",
    "KruskalTest": "Kruskal-Wallis Test",
    "KruskalTestANOVA": "Kruskal-Wallis Test : Location Parameter &mu;<sub>1</sub>, &mu;<sub>2</sub>, &mu;<sub>3</sub> ",
    "Total": "Total",
    "FriedmanTest": "Friedman Test",
    "FriedmanTestANOVA": "Friedman Test : Location Parameter &mu;<sub>1</sub>, &mu;<sub>2</sub>, ... , &mu;<sub>k</sub> ",
    "Block": "Block",
    "Treatment": "Treatment",
    "At least one locations is different": "At least one pair of locations is different",
    "SignCondition": "If n ≤ 100 Binomial Test,  n > 100 Normal Approximation Test",
    "WilcoxonSignCondition": "If n≤ 20 Wilcoxon Rank Sum Test,  n > 20 Nomal Approximation Test",
    "WilcoxonRankCondition": "if n=n<sub>1</sub>+n<sub>2</sub> ≤ 25 Wilcoxon Rank Sum Test,  n>25 Nomal Approximation Test",
    "KruskalCondition": "If n≤ 10 H Distribution Test,  else &chi;<sup>2</sup> approximation test",

};
// Indonesian 
appStr[1][8] = "../eStatH/index.html";
appStr[2][8] = "../eStatU/index.html";
appStr[3][8] = "../eStatE/index_en.html";
appStr[4][8] = "../ExLearning/index_en.html";
appStr[5][8] = "index.html";
appStr[6][8] = "../ExLecture/index_en.html";
alertMsg[1][8] = "Salah satu variabel yang dipilih tidak memiliki data.";
alertMsg[2][8] = " Pilih variabel untuk analisis (klik nama kolom) satu per satu. Jika dua variabel, maka yang pertama adalah variabel grup. ";
alertMsg[3][8] = "Data hilang pada variabel yang dipilih.";
alertMsg[4][8] = " Jika amatan dari variabel yang dipilih berbeda atau amatan berbeda, analisis tidak diperbolehkan.";
alertMsg[5][8] = "Terlalu banyak grup! Grafik mungkin tumpang tindih karena ukuran layar.";
alertMsg[6][8] = "Jika analisis variabel di data ringkasan mengandung karakter, analisis atau membuat tabel tidak dapat dilakukan.";
alertMsg[7][8] = "Jika terdapat lebih dari tiga variabel terpilih dari data awal, analisis atau membuat tabel tidak dapat dilakukan.";
alertMsg[8][8] = "Diagram Dot dapat dibuat jika jumlah amatan kurang dari 200.";
alertMsg[9][8] = "Diagram Dahan dan Daun dapat dibuat jika banyak amatan kurang dari 100.";
alertMsg[12][8] = "Jika analisis variabel mengandung karakter, analisis atau membuat tabel tidak dapat dilakukan.";
alertMsg[14][8] = "Data ringkasan tidak dapat digunakan untuk grafik kontinu dan uji hipotesis.";
alertMsg[16][8] = "Hanya dua grup yang diperbolehkan untuk uji hipotesis ini.";
alertMsg[17][8] = "Diagram pencar membutuhkan setidaknya variabel x dan variabel y.";
alertMsg[18][8] = "Lebih dari tiga variabel tidak dapat dilakukan untuk diagram pencar.";
alertMsg[19][8] = "Jika terdapat karakter di variabel X, diagram pencar tidak dapat digambar.";
alertMsg[20][8] = "Jika terdapat karakter di variabel Y, diagram pencar tidak dapat digambar.";
alertMsg[21][8] = "Jika terdapat data hilang, menyimpan tidak dapat dilakukan.";
alertMsg[22][8] = " Jika terdapat angka negatif, diagram batang tidak dapat digambar.";
alertMsg[25][8] = "Jika hanya terdapat satu grup, diagram batang bertumpuk tidak dapat dilakukan.";
alertMsg[27][8] = "Jika hanya terdapat satu grup, diagram batang rasio tidak dapat dilakukan.";
alertMsg[29][8] = "Jika hanya terdapat satu grup, diagram batang bersebelahan tidak dapat dilakukan.";
alertMsg[31][8] = "Jika hanya terdapat satu grup, diagram batang dua arah tidak dapat dilakukan.";
alertMsg[32][8] = "Jika terdapat angka negatif, diagram pai tidak dapat digambar.";
alertMsg[33][8] = "Jika terdapat angka negatif, diagram donat tidak dapat digambar.";
alertMsg[34][8] = "Jika terdapat angka negatif, diagram band tidak dapat digambar.";
alertMsg[35][8] = "Jika terdapat angka negatif, tabel frekuensi tidak dapat dibangun.";
alertMsg[36][8] = "Diagram batang ini hanya diperbolehkan untuk dua grup.";
alertMsg[37][8] = "Uji Hipotesis ini hanya diperbolehkan untuk satu variabel.";
alertMsg[38][8] = "mu bukan angka. Masukkan angka dan coba lagi!";
alertMsg[39][8] = "Standar deviasi bernilai nol atau bukan angka. Coba lagi!";
alertMsg[40][8] = "Varians input bukan angka. Masukkan angka dan coba lagi!";
alertMsg[41][8] = "Uji Hipotesis ini hanya diperbolehkan untuk dua variabel. Variabel grup harus hanya memiliki dua grup";
alertMsg[42][8] = "Mengubah judul dari uji hipotesis tidak diperbolehkan!";
alertMsg[43][8] = "Simple Linear Regression is only for one group";
svgStr[1][8] = " Diagram Batang";
svgStr[2][8] = " Diagram Pai";
svgStr[3][8] = " Diagram Donat";
svgStr[4][8] = " Diagram Band";
svgStr[5][8] = " Diagram Garis";
svgStr[6][8] = " Diagram Dot";
svgStr[7][8] = " Diagram Box-Whisker";
svgStr[8][8] = " Diagram Dahan dan Daun";
svgStr[9][8] = " Histogram";
svgStr[10][8] = " Diagram Pencar";
svgStr[11][8] = " Pengujian hipotesis: Rata-rata Satu Populasi ";
svgStr[12][8] = " Pengujian Hipotesis: Varians Satu Populasi";
svgStr[13][8] = " Pengujian Hipotesis: Rata-rata Dua Populasi ";
svgStr[14][8] = " Pengujian Hipotesis: Varians Dua Populasi ";
svgStr[15][8] = " Analisis Varians";
svgStr[16][8] = "Frekuensi";
svgStr[17][8] = "Rasio";
svgStr[18][8] = "Grup ";
svgStr[19][8] = " ";
svgStr[20][8] = "<h3>Data Ringkasan<br>Tabel Frekuensi </h3>";
svgStr[21][8] = "Variabel Grup";
svgStr[22][8] = "Variabel Baris";
svgStr[23][8] = "Total";
svgStr[24][8] = "Total";
svgStr[25][8] = "<h3>Tabel Frekuensi</h3>";
svgStr[26][8] = "Variabel Analisis";
svgStr[27][8] = "Nilai Var";
svgStr[28][8] = "Label Nilai";
svgStr[29][8] = "Frekuensi";
svgStr[30][8] = "Persen(%)";
svgStr[31][8] = "<h3>Tabel Silang</h3>";
svgStr[32][8] = "Variabel Kolom";
svgStr[33][8] = "Variabel Baris";
svgStr[34][8] = "Rata-rata"
svgStr[35][8] = "Standar Deviasi"
svgStr[36][8] = "<h3> Histogram<br>Tabel Frekuensi</h3>";
svgStr[37][8] = "Nama Grup";
svgStr[38][8] = "Interval";
svgStr[39][8] = "Dahan";
svgStr[40][8] = " Daun";
svgStr[41][8] = "Daun Grup 1";
svgStr[42][8] = "Daun Grup 2"
svgStr[43][8] = "<h3>Statistika Dasar</h3>";
svgStr[44][8] = "Amatan";
svgStr[45][8] = "Minimum";
svgStr[46][8] = "Median";
svgStr[47][8] = "Maksimum";
svgStr[48][8] = "Total";
svgStr[49][8] = "<h3>Uji Kenormalan</h3>";
svgStr[50][8] = "Frekuensi harapan > 5 <br> disarankan";
svgStr[51][8] = "&chi;<sup>2</sup> Test<br>Interval i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][8] = "Data<br>Frekuensi Amatan<br>(O<sub>i</sub>)";
svgStr[53][8] = "Distribusi Normal<br>Peluang Harapan<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][8] = "Distribusi Normal<br>Frekuensi Harapan<br>(E<sub>i</sub>)";
svgStr[55][8] = "Setiap interval<br>&chi;<sup>2</sup> nilai<br>(O<sub>i</sub>-E<sub>i</sub>)<sup>2</sup> / E<sub>i</sub>";
svgStr[56][8] = "Jumlah dari nilai &chi;<sup>2</sup>";
svgStr[57][8] = "Histogram Peluang dan Distribusi Normal";
svgStr[58][8] = "Q-Q Plot Normal";
svgStr[59][8] = "Kuantil Normal";
svgStr[60][8] = "Koefisien Korelasi";
svgStr[61][8] = "Koefisien Determinasi";
svgStr[62][8] = "Standar Eror";
svgStr[63][8] = "Variabel";
svgStr[64][8] = "Nama Variabel";
svgStr[65][8] = "Variable bebas";
svgStr[66][8] = "Variabel tak bebas";
svgStr[67][8] = "Parameter";
svgStr[68][8] = "Nilai Harapan";
svgStr[69][8] = "Nilai";
svgStr[70][8] = "Intersep";
svgStr[71][8] = "Slope";
svgStr[72][8] = "Faktor";
svgStr[73][8] = "Jumlah Kuadrat";
svgStr[74][8] = "Derajat Bebas";
svgStr[75][8] = "Kuadrat Tengah";
svgStr[76][8] = "Regresi";
svgStr[77][8] = "Eror";
svgStr[78][8] = "Total";
svgStr[79][8] = "<h3>Analisis Regresi</h3>";
svgStr[80][8] = "Q-Q Plot Residual terbakukan";
svgStr[81][8] = "Residual Terbakukan";
svgStr[82][8] = "Kuantil Normal";
svgStr[83][8] = "Plot Residual";
svgStr[84][8] = "Nilai Prediksi";
svgStr[85][8] = "ANOVA dua arah";
svgStr[86][8] = "Grafik Selang Kepercayaan";
svgStr[87][8] = "Residual";
svgStr[88][8] = "Tabel rata-rata dua arah";
svgStr[89][8] = "Matriks Diagram Pencar";
svgStr[90][8] = "Perbandingan Berganda";
svgStr[91][8] = "Statistik";
svgStr[92][8] = "Faktor";
svgStr[93][8] = "Level";
svgStr[94][8] = "Grafik Data Sampel Berpasangan";
svgStr[95][8] = "Residual vs Forecasting Plot";
svgStr[96][8] = "Residual vs Leverage Plot";
svgStr[97][8] = "Cook's Distance Graph";
svgStr[98][8] = "Cook's Distance";
svgStr[99][8] = "Data Order";
svgStr[100][8]= "Mean Difference";
svgStr[101][8]= "Testing Means";
svgStr[102][8]= "Treatment";
svgStr[103][8]= "Interaction";
svgStr[104][8]= "Row Total";
svgStr[105][8]= "Column Total";
svgStr[106][8]= "Multiple Correlation Coeff";
svgStr[107][8]= "<h3>Correlation Analysis</h3>";
svgStr[108][8]= "Correlation Matrix";
svgStr[109][8]= "Factor1 - Factor2 Mean Graph";

svgStrU[1][8] = "Distribusi Binomial";
svgStrU[2][8] = "Ulangan";
svgStrU[3][8] = "Rata-rata";
svgStrU[4][8] = "Standar Deviasi";
svgStrU[5][8] = "Distribusi Poisson";
svgStrU[6][8] = "Distribusi Geometri";
svgStrU[7][8] = "Distribusi Hipergeometri";
svgStrU[8][8] = "Populasi";
svgStrU[9][8] = "Distribusi Sampel";
svgStrU[10][8] = " Hukum Bilangan Besar";
svgStrU[11][8] = "Angka";
svgStrU[12][8] = "Gambar";
svgStrU[13][8] = "Gambar Koin";
svgStrU[14][8] = "Banyaknya Gambar";
svgStrU[15][8] = "Banyaknya Ulangan";
svgStrU[16][8] = "Distribusi dari Rataan Sampel";
svgStrU[17][8] = "Ulangan";
svgStrU[18][8] = "Standar Eror";
svgStrU[19][8] = "Rata-rata Populasi";
svgStrU[20][8] = "Selang Kepercayaan";
svgStrU[21][8] = "Keakurasian Nilai Estimasi";
svgStrU[22][8] = "Rata-rata Sampel";
svgStrU[23][8] = "[TestStat] = ";
svgStrU[24][8] = "Distribusi";
svgStrU[25][8] = "Tolak H\u2080";
svgStrU[26][8] = "Terima H\u2080";
svgStrU[27][8] = " nilai-p  = ";
svgStrU[28][8] = "[Keputusan] ";
svgStrU[29][8] = "[ANOVA]";
svgStrU[30][8] = "Masukkan Koefisien Korelasi dan klik Tombol Jalankan";
svgStrU[31][8] = "Regresi";
svgStrU[32][8] = "Variabel Baris";
svgStrU[33][8] = "Variabel Kolom";
svgStrU[34][8] = "Rata-rata"
svgStrU[35][8] = "Standar Deviasi"
svgStrU[36][8] = "<h3> Histogram<br>Tabel Frekuensi</h3>";
svgStrU[37][8] = "Nama Grup";
svgStrU[38][8] = "Interval";
svgStrU[39][8] = "Dahan";
svgStrU[40][8] = " Daun";
svgStrU[41][8] = "Daun Grup 1";
svgStrU[42][8] = "Daun Grup 2"
svgStrU[43][8] = "<h3>Statistika Dasar</h3>";
svgStrU[44][8] = "Amatan";
svgStrU[45][8] = "Minimum";
svgStrU[46][8] = "Median";
svgStrU[47][8] = "Maksimum";
svgStrU[48][8] = "Total";
svgStrU[49][8] = "Eksponensial";
svgStrU[50][8] = "Seragam";
svgStrU[51][8] = "Keakurasian Nilai Estimasi";
svgStrU[52][8] = "Buat titik dengan klik, lalu eStat menemukan garis regresi. ";
svgStrU[53][8] = "Pindahkan atau hapus titik. Perhatikan perubahan pada garis regresi.";
svgStrU[54][8] = "[Statistik Sampel] ";
svgStrU[55][8] = "[Sampel 1 Statistik] ";
svgStrU[56][8] = "[Sampel 2 Statistik] ";
svgStrU[57][8] = "Selang Kepercayaan";
svgStrU[58][8] = "Baris dan Kolom Variabel saling bebas/independen";
svgStrU[59][8] = "Row & Col Dependent";
svgStrU[60][8] = "Distribusi Empirik";
svgStrU[61][8] = "Distribusi Teoritik";
svgStrU[62][8] = "Uji Kebaikan Model untuk Frekuensi Amatan";
svgStrU[63][8] = "Wilcoxon Rank Sum Test";
svgStrU[64][8] = "Wilcoxon Rank Sum Test Table";
svgStrU[65][8] = "Kruskal-Wallis Test";
svgStrU[66][8] = "Kruskal-Wallis Test Table";
svgStrU[67][8] = "Kruskal-Wallis H Statistics";
svgStrU[68][8] = "Wilcoxon Signed Rank Test";
svgStrU[69][8] = "Sign Test";
svgStrU[70][8] = "Friedman Test";
svgStrU[71][8] = "Friedman S Statistic";
svgStrU[72][8] = "Friedman Distribution Table";

// Mongolian
$.message.mn = {
    "eStat : Stat Education SW": "eStat : Статистикийн боловсролын програм хангамж",
    "Filename": "Файлын нэр",
    "Selected Variables": "Сонгогдсон хувьсагч",
    "Cancel": "Цуцлах",
    "Edit Variables": "Хувьсагчийг засварлах",
    "Level": "Түвшин",
    "ElementaryLevel": "Анхан шатны",
    "MiddleLevel": "Дунд талын",
    "HighLevel": "H",
    "UniversityLevel": "Их сургуулийн",
    "Example": "Жишээ",
    "New Sheets": "Шинэ хуудас",
    "csv Open": "csv Нээх/ эхлүүлэх",
    "www Open": "www Нээх/ эхлүүлэх",
    "json Open": "json Нээх/ эхлүүлэх",
    "csv Save": "csv Хадаглах",
    "json Save": "json Хадаглах",
    "Print Sheet": "Хуудас хэвлэх",
    "Bar Graph": "Баганан график",
    "Pie Chart": "Бялуун график",
    "Band Graph": "Туузан график",
    "Line Graph": "Шугаман график",
    "Dot Graph": "Цэгэн график",
    "Histogram": "Гистограм",
    "Stem & Leaf Plot": "Модны их бие ба навчист (Stem & Leaf) график",
    "Box-Whisker Plot": "Boxplot график",
    "Scatterplot": "Тархалтын график",
    "Frequency Table": "Давтамжит хүснэгт",
    "Basic Statistics": "Суурь, үндсэн статистик",
    "Testing Hypothesis &mu;": "Тестэн таамаглал &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "Тестэн таамаглал &sigma;<sup>2</sup>",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "Тестэн таамаглал &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "Тестэн таамаглал &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Analysis of Variance": "Дундаж кватрат хазайлтын шинжилгээ",
    "High School Stat Education": "Ахлах сургуулийн статистикийн боловсрол",
    "University Stat Education": "Их сургуулийн статистикийн боловсрол ",
    "Elem Stat Graph Example": "Elem Stat Graph Example",
    "Learning eStat w Example": "eStat-ийг жишээтэй суралцах",
    "Vertical Separated Bar": "Босоо тусгаарлагдсан багана",
    "Vertical Stacked Bar": "Босоо багц багана ",
    "Vertical Ratio Bar": "Босоо багц багана",
    "Vertical Side by Side Bar": "Босоо зэрэгцээ багана",
    "Vertical Two Sided Bar": "Босоо хоёр талт багана",
    "Horizontal Separated Bar": "Туузан завсартай диаграм",
    "Horizontal Stacked Bar": "Багцын туузан диаграм",
    "Horizontal Ratio Bar": "Харьцангуй үзүүлэлтийн туузан диаграм",
    "Horizontal Side by Side Bar": "Нийлсэн туузан диаграм",
    "Horizontal Two Sided Bar": "Хоёр талт туузан  диаграм",
    "Doughnut Graph": "Цагирган график",
    "Two Sided Stem & Leaf Plot": "Хоёр талт Stem & Leaf Plot график",
    "Graph Save": "График хадаглалт",
    "Graph Print": "График хэвлэлт",
    "Move to Table": "Хүснэгт рүү шилжүүлэх",
    "Edit Title": "Гарчигийг засварлах",
    "Table Save": "Хүснэгт хадаглах",
    "Table Print": "Хүснэгт хэвлэх",
    "Frequency": "Давтамж",
    "(Sorting)": "(Эрэмблэх)",
    "Raw Data": "Бүрэн болоогүй өгөгдөл",
    "Descending": "Буурч буй",
    "Ascending": "өгсөж буй, өгсөх хандлага",
    "Mean": "Дундаж  утга",
    "Std Deviation": "Стандарт хэлбэлзэл ",
    "MeanStd": "Дундаж  утга/Стандарт хэлбэлзэл",
    "95CI": "95% Найдварт завсар",
    "RegressionAnalysis": "Регрессийн шинжилгээ",
    "ANOVA2": "2 way ANOVA",

    "Regression": "Регресси",
    "Frequency Polygon": "давтамжит олон өнцөг",
    "Frequency Table": "Давтамжит хүснэгт",
    "Execute New Interval": "Шинэ завсарыг гүйцэтгэх",
    "Interval Start": "Завсарын эхлэл",
    "Interval Width": "Завсарын өргөн",
    "t-test": "t-Тестийн",
    "Z-test": "Z-Тестийнт",
    "(if Z-test, enter &sigma;)": "(Хэрэв Z тест байвал сигмаг оруул &sigma;)",
    "Significance Level": "Утга учиртай түвшин",
    "Execute": "Гүйцэтгэл",
    "(Confidence Interval)": "(Найдварт завсар)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Хэрэв Z тест байвал Z<sub>1-&alpha;/2</sub>)",
    "&chi;<sup>2</sup> test": "&chi;<sup>2</sup> Тест",
    "Variance Assumption": "Дундаж кватратын хазайлтын таамаглал ",
    "F test": "F Тестийн",
    "At least one pair of means is different": "Хамгийн багадаа л гэхэд утгын нэг хос нь өөр өөр. ",
    "Main Title : ": "Үндсэн гарчиг : ",
    "y title : ": "У хувьсагч : ",
    "x title : ": "Х хувьсагч : ",
    "Modify": "Өөрчлөн сайжруулах",
    "Confirm": "Батлах ",
    "Variable Name": "Хувьсагчийн нэр",
    "Variable Value": "Хувьсагчийн утга",
    "Value Label": "Утгын нэр хаяг",
    "* Less than nine value labels allowed.": "* 9-өөс бага утгын шошго нь зөвшөөрөгдөнө",
    "Save": "Хадаглах",
    "Exit": "гарах",
    "eStatU UnivStatEdu": "eStatU - Их сургуулийн статистикийн боловсрол",
    "eStatH HighStatEdu": "eStatH - Ахлах сургуулийн статистикийн боловсрол",
    "Menu": "Цэс",
    "Binomial Experiment": "Бином туршилт",
    "Binomial Distribution": "Бином тархалт",
    "Binomial Prob Table": "Пойсоны магадлалын хүснэгт",
    "Poisson Distribution": "Пойсоны тархалт ",
    "Poisson Prob Table": "Пойсоны магадлалын хүснэгт",
    "Geometric Distribution": "Геометрийн тархалт",
    "Geometric Prob Table": "Геометрийн магадлалын хүснэгт",
    "HyperGeometric Distribution": "Хайпер геометрийн тархалт",
    "HyperGeometric Prob Table": "Хайпер геометрийн магадлалын хүснэгт",
    "Exponential Distribution": "Илтгэгчийн функцийн тархалт",
    "Normal Experiment": "Хэвийн туршилт",
    "Normal Distribution": "Хэвийн тархац",
    "Normal Approx": "Хэвийн ойролцоо утга",
    "t Distribution": "t Тархалт",
    "ChiSquare Distribution": "Хи квадрат тархалт",
    "F Distribution": "F Тархалт",
    "Sampling": "Түүвэрлэлт",
    "Population vs Sample": "Хүн амын тооны эсрэг жишээ ",
    "Population": "Хүн ам",
    "Sample": "Жишээ",
    "Exponential": "Экспоненциал(0.3)",
    "Uniform": "Нэг төрлийн/ байнгын (0,1)",
    "Sample05": "Түүвэрлэлт 5%",
    "Sample10": "Түүвэрлэлт 10%",
    "Sample20": "Түүвэрлэлт 20%",
    "Statistics/BoxPlot": "Статистик/BoxPlot",
    "Law of Large Number": "Их тооны хууль",
    "Dist of Sample Means": "Жишээ дундаж утгуудын тархалт ",
    "Sample Size": "Жишээ хэмжээ ",
    "Confidence Interval": "Найдварт завсар ",
    "Estimation Accuracy": "нарийвчлалыг үнэлэх",
    "Repetition": "Давтамж",
    "Confidence Level": "Найдварт түвшинl",
    "Testing Hypothesis mu_titleAB": "Дундажийн тухай таамаглалын тест",
    "Testing Hypothesis mu_title": "Дундажийн тухай таамаглалын тест",
    "Testing Hypothesis sigma_title": "Вариацийн (дисперсийн) тест",
    "Testing Hypothesis P_title": "Түүвэр тархалтын харьцангуй хэмжигдэхүүн (пропорци)-йн тухай таамаглалын тест",
    "Testing Hypothesis mu12_title": "Хоёр дундажийн тухай таамаглалын тест",
    "Testing Hypothesis sigma12_title": "Хоёр вариацийн тухай таамаглалын тест",
    "Testing Hypothesis P12_title": "Хоёр хувийн жин буюу пропорцийн тухай таамаглалын тест",
    "Testing Hypothesis muAB": "Тестэн таамаглал &mu; - &alpha;, &beta;",
    "Testing Hypothesis mu": "Тестэн таамаглал &mu;",
    "Testing Hypothesis sigma": "Тестэн таамаглал &sigma;<sup>2</sup>",
    "Testing Hypothesis P": "Тестэн таамаглал P",
    "Testing Hypothesis mu12": "Тестэн таамаглал &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "Тестэн таамаглал &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Testing Hypothesis P12": "Тестэн таамаглал P<sub>1</sub>, P<sub>2</sub>",
    "Testing Hypothesis ANOVA": "Тестэн таамаглал ANOVA",
    "Testing Independence": "Тестэн хамааралгүй байдал",
    "Correlation Coefficient": "Хамаарлын коэфцеэнт ",
    "Regression Experiment": "Хамаарлын туршилт",
    "Hypothesis": "Таамаглал",
    "Test Type": "Тестийн төрөл",
    "Z-test": "Z-Тестийн",
    "t-test": "t-Тестийн",
    "Chi-test": "&chi;<sup>2</sup>-Тестийн",
    "F-test": "F-Тестийн",
    "Sampling Type": "Түүвэрлэлт",
    "Independent Sample": "Үл хамааран",
    "Paired Sample": "paired",
    "Sample Data": "Жишээ өгөгдөл",
    "input either sample data": "Энгийн өгөгдөл, энгийн статистикийн аль алийг нь cvs/bsv-ийг ашигласан дараагийн хайрцагт нэмж оруулах",
    "Sample Statistics": "Жишээ статистик",
    "Sample Mean": "Жишээ дундаж утга",
    "Sample Variance": "Түүврийн вариаци",
    "Sample Proportion": "жишээ харьцаа",
    "if Z-test-1": "(Хэрэв Z тест байвал хүн амын дундаж кватрат хазайлтыг оруул &sigma;<sup>2</sup>)",
    "if Z-test-2": "(Хэрэв Z тест Z<sub>1-&alpha;/2 </sub> ашиглагдсан.)",
    "Variance Assumption": "Дундаж кватратын хазайлтын таамаглал ",
    "At least one pair": "Хамгийн багадаа л гэхэд утгын нэг хос нь өөр өөр.",
    "Row-Col-0": "Мөр болон баганы хувьсагчууд хоорондоо хамааралгүй ",
    "Row-Col-1": "Мөр болон баганы хувьсагчууд хоорондоо хамааралгүй биш",
    "Enter any number of row": "(Зүүнд дээд хэсгээс шинжилгээг оруулах)",
    "Row": "Мөр",
    "Column": "Багана",
    "Show Probability": "Магадлалыг харуулах",
    "Regression Line": "Хамаарлын шулуун",
    "Erase All": "Бүгдийг устгах",
    "Add Point": "санал нэмэх",
    "Erase Point": "Цэгийг устгах",
    "Reference Site": "Иш татсан цахим хуудас",
    "Lot Size": "Их хэмжээ",
    "Defect Size": "Алдаатай хэмжээ",
    "If typed": "(Хэрэв тоо бичигдвэл)",
    "Stat/BoxPlot": "Stat/BoxPlot",
    "Mean": "Дундаж  утга",
    "Std Dev": "Стандарт хэлбэлзэл",
    "OneGroup": "(Нэг бүлэг)",
    "RegressionBand": "Итгэх түвшин",
    "RegressionTable": "Регрессийн шинжилгээ",
    "RegressionResidual": "Үлдэгдлийн диаграм/дүрслэл",
    "RegressionResidualLeverage": "Residual vs Leverage",
    "RegressionCook": "Cook's Distance Graph",
    "RegressionQQ": "Үлдэгдлийн диаграм/дүрслэл Q-Q",
    "HistogramNormal": "Магадлал Гистограм ",
    "HistogramChisq": "Нормал Тест",
    "HistogramNormalQQ": "Нормал Q-Q диаграм",
    "PopulationStd": "Эх олонлого Стандарт хэлбэлзэл ",
    "Type1Error": "Type 1 Error",
    "Type2Error": "Type 2 Error",
    "AnovaTable": "ANOVA Хүснэг",
    "AnovaMeanGraph": "Дундаж  утга Итгэх интервалl",
    "MultipleComparison": "Multiple Comparison",
    "AnovaResidual": "Үлдэгдлийн диаграм/дүрслэл",
    "AnovaQQ": "Үлдэгдлийн диаграм/дүрслэл Q-Q ",
    "TestingFit": "Goodness of Fit Test",
    "FitTest0": "Observed & theoretical Distributions are the same",
    "FitTest1": "Observed & theoretical Distributions are different",
    "ObservedFreq": "Observed Frequency O",
    "ExpectedProb": "Expected Probability p",
    "ExpectedFreq": "Expected Frequency E(>5)",
    "InputFitData": "Enter cell from upper left cell",
    "ExecuteTable": "Statistics",
    "MeanDotGraph": "Confidence Interval Graph",
    "ScatterRegression": "Scatter Plot",
    "Factor": "Factor",
    "Interaction": "Interaction",
    "NoInteraction": "No Interaction",
    "ExistInteraction": "Exist Interaction",
    "eStatLecture": "eStat Intro Lecture",
    "NonParametricMu12_title": "Wilcoxon Rank Sum Test", 
    "NonParametricMu12": "Wilcoxon Rank Sum Test : Location Parameter &mu;<sub>1</sub>, &mu;<sub>2</sub>", 
    "WilcoxonTest": "Wilcoxon Rank Sum Test",
    "Sample Range": "Sample Range",
    "DistributionTable": "Distribution Table",
    "SignedRankTest": "Wilcoxon Signed Rank Sum Test",
    "SignTest": "Sign Test",
    "SignCount": "Sign Count",
    "KruskalTest": "Kruskal-Wallis Test",
    "KruskalTestANOVA": "Kruskal-Wallis Test : Location Parameter &mu;<sub>1</sub>, &mu;<sub>2</sub>, &mu;<sub>3</sub> ",
    "Total": "Total",
    "FriedmanTest": "Friedman Test",
    "FriedmanTestANOVA": "Friedman Test : Location Parameter &mu;<sub>1</sub>, &mu;<sub>2</sub>, ... , &mu;<sub>k</sub> ",
    "Block": "Block",
    "Treatment": "Treatment",
    "At least one locations is different": "At least one pair of locations is different",
    "SignCondition": "If n ≤ 100 Binomial Test,  n > 100 Normal Approximation Test",
    "WilcoxonSignCondition": "If n≤ 20 Wilcoxon Rank Sum Test,  n > 20 Nomal Approximation Test",
    "WilcoxonRankCondition": "if n=n<sub>1</sub>+n<sub>2</sub> ≤ 25 Wilcoxon Rank Sum Test,  n>25 Nomal Approximation Test",
    "KruskalCondition": "If n≤ 10 H Distribution Test,  else &chi;<sup>2</sup> approximation test",

};
// Mongolian
appStr[1][9] = "../eStatH/index.html";
appStr[2][9] = "../eStatU/index.html";
appStr[3][9] = "../eStatE/index_en.html";
appStr[4][9] = "../ExLearning/index_en.html";
appStr[5][9] = "index.html";
appStr[6][9] = "../ExLecture/index_en.html";
alertMsg[1][9] = "Нэг сонгогдсон хувьсагч нь өгөгдөл байхгүй ";
alertMsg[2][9] = "Судалгаа шинжилгээнд хувьсагчуудыг нэг нэгээр сонгох. Хэрэв эхнийх нь 2 хувьсагч бол групп хувьсагч болно.";
alertMsg[3][9] = "Сонгогдсон хувьсагчаас өгөгдөл орхигдсон.";
alertMsg[4][9] = "Хэрэв сонгогдсон хувьсагчуудын туршилтууд / үр дүнгүүд/ өөр өөр бол шинжилгээ зөвшөөрөгдөхгүй";
alertMsg[5][9] = "Маш их группууд! Графикууд нь дэлгэцийн хэмжээнд хэт давхцсан байж магадгүй.";
alertMsg[6][9] = "Хэрэв хураангуйлсан өгөгдлийн шинжилгээний хувьсагч нь тэмдэгт, статистикийн судалгаа, эсвэл байгуулсан хүснэгт агуулсан бол хүлээн зөвшөөрөгдөхгүй";
alertMsg[7][9] = "Нэг мөрөн дэх өгөгдөлөөс хэрэв гурваас илүү хувьсагч сонгогдвол шинжилгээ болон хүснэгт үүсгэх нь зөвшөөрөгдөхгүй";
alertMsg[8][9] = "Хэрэв шинжилгээний тоо нь 200 гаас баг үед цэгэн график зөвшөөрөгдөнө ";
alertMsg[9][9] = "Хэрэв ажиглалтын тоо 100-аас бага болStem & Leaf Plot график нь зөвшөөрөгдөнө";
alertMsg[12][9] = "Хэрэв судалгааны хувьсагч нь тэмдэгт, судалгаа, хүснэгт агуулсан бол хүлээн зөвшөөрөгдөхгүй";
alertMsg[14][9] = "Үргэлжилсэн график болон тестийн таамаглалын хувьд хураангуй өгөгдөл нь зөвшөөрөгдөхгүй ";
alertMsg[16][9] = "Энэ туршилтын таамаглалд зөвхөн 2 групп зөвшөөрөгдөнө";
alertMsg[17][9] = "Тархалтын график нь хамгийн багадаа х болон у хувьсагч шаардана";
alertMsg[18][9] = "Гурван хувьсагчаас илүү  байвал тархалтын график зурагдахгүй";
alertMsg[19][9] = "Хэрэв Х хувьсагч дээр тэмдэгт байвал тархалтын график зурагдаж чадахгүй ";
alertMsg[20][9] = "Хэрэв Y хувьсагч дээр тэмдэгт байвал тархалтын график зурагдахгүй ";
alertMsg[21][9] = "Хэрэв өгөгдөл орхигдсон бол хадаглах нь зөвшөөрөгдөхгүй ";
alertMsg[22][9] = "If there is a negative number, bargraph cannot be drawn.";
alertMsg[25][9] = "Хэрэв зөвхөн нэг групп байвал овоорсон /бүгд багтсан/ баганан график зөвшөөрөгдөхгүй";
alertMsg[27][9] = "Хэрэв зөвхөн нэг групп байвал харьцаатай баганан график зөвшөөрөгдөхгүй ";
alertMsg[29][9] = "Хэрэв зөвхөн нэг групп байвал зэрэгцээ баганан график зөвшөөрөгдөхгүй";
alertMsg[31][9] = "Хэрэв зөвхөн нэг групп байвал хоёр талт баганан график зөвшөөрөгдөхгүй ";
alertMsg[32][9] = "Хэрэв сөрөг тоо байвал бялуу хүснэгт зурагдаж чадахгүй ";
alertMsg[33][9] = "Хэрэв сөрөг тоо байвал цагирган график зурагдаж чадахгүй";
alertMsg[34][9] = "Хэрэв сөрөг тоо байвал band график зурагдаж чадахгүй";
alertMsg[35][9] = "Хэрэв сөрөг тоо байвал давтамжийн хүснэгт зурагдаж чадахгүй ";
alertMsg[36][9] = "Энэ баганан график нь зөвхөн хоёр группын тухайд зөвшөөрөгдөнө";
alertMsg[37][9] = "Энэ тестэн таамаглал нь зөвхөн нэг хувьсагчийн тухайд зөвшөөрөгдөнө ";
alertMsg[38][9] = ".. бол NAN. Утгыг оруулаад дахин оролд.";
alertMsg[39][9] = "Стандарт хэлбэлзэл нь 0 эсвэл NAN-ийн аль аль нь. Дахин оролд!";
alertMsg[40][9] = "Дундаж кватратын хазайлтын орц нь NAN. Утгыг оруулаад дахин оролд. ";
alertMsg[41][9] = "Энэ тестэн таамаглал нь зөвхөн хоёр хувьсагчийн хувьд зөвшөөрөгдөнө. Групп хувьсагч нь зөвхөн хоёр групптэй байсан дээр. ";
alertMsg[42][9] = "Тестэн таамаглалын гарчигийг засварлах нь зөвшөөрөгдөхгүй";
alertMsg[43][9] = "Simple Linear Regression is only for one group";
svgStr[1][9] = " Баганан график";
svgStr[2][9] = " Бялуун график";
svgStr[3][9] = " Цагирган график";
svgStr[4][9] = " Туузан график";
svgStr[5][9] = " Шугаман график";
svgStr[6][9] = " Цэгэн график";
svgStr[7][9] = " Box Plot";
svgStr[8][9] = " Stem and Leaf Plot";
svgStr[9][9] = " Гистограм ";
svgStr[10][9] = " Тархалтын график";
svgStr[11][9] = " Тестэн таамаглал : Хүн амын дундаж утга ";
svgStr[12][9] = " Тестэн таамаглал : Хүн амын дундаж кватрат хазайлт";
svgStr[13][9] = " Тестэн таамаглал : Хоёр хүн амын тооны дундаж";
svgStr[14][9] = " Тестэн таамаглал : Хоёр хүн амын тооны дундаж кватрат хазайлт";
svgStr[15][9] = " Дундаж кватрат хазайлтын шинжилгээ";
svgStr[16][9] = "Давтамж";
svgStr[17][9] = "Харьцаа";
svgStr[18][9] = "Групп ";
svgStr[19][9] = " ";
svgStr[20][9] = "Хураангуй, товч  Өгөгдөл <br> Давтамжит хүснэгт";
svgStr[21][9] = "Группын хувьсагч";
svgStr[22][9] = "Мөрийн хувьсагч ";
svgStr[23][9] = "Нийлбэр ";
svgStr[24][9] = "Нийлбэр ";
svgStr[25][9] = "<h3>Давтамжит хүснэгт</h3>";
svgStr[26][9] = "Вариацийн шинжилгээ";
svgStr[27][9] = "Хувьсагчийн утга ";
svgStr[28][9] = "Утгын нэр хаяг";
svgStr[29][9] = "Давтамж ";
svgStr[30][9] = "Хувь (%)";
svgStr[31][9] = "<h3>Солбисон хүснэгт</h3>";
svgStr[32][9] = "Баганан хувьсагч ";
svgStr[33][9] = "Мөрийн хувьсагч";
svgStr[34][9] = "Дундаж  утга"
svgStr[35][9] = "Стандарт хэлбэлзэл "
svgStr[36][9] = "<h3> Гистограм <br>Давтамжит хүснэгт</h3>";
svgStr[37][9] = "Группын нэр";
svgStr[38][9] = "Завсар";
svgStr[39][9] = "Иш";
svgStr[40][9] = " Навчист /график/";
svgStr[41][9] = "Группp 1  Навчист";
svgStr[42][9] = "Групп 2  Навчист"
svgStr[43][9] = "<h3>Суурь, үндсэн статистик</h3>";
svgStr[44][9] = "Ажиглалт";
svgStr[45][9] = "Хамгийн бага";
svgStr[46][9] = "Гол нь , голийн утга";
svgStr[47][9] = "Хамгийн их ";
svgStr[48][9] = "Нийлбэр ";
svgStr[49][9] = "<h3>Нормал тархалтын тест</h3>";
svgStr[50][9] = "Хүлээгдэж буй давтамж > 5";
svgStr[51][9] = "&chi;<sup>2</sup> Тест<br>Интервал i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][9] = "Өгөгдөл<br>Ажиглалтын давтамж<br>(O<sub>i</sub>)";
svgStr[53][9] = "Нормал тархалт<br>Хүлээгдэж буй магадлал<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][9] = "Нормал тархалт<br>Хүлээгдэж буй давтамж<br>(E<sub>i</sub>)";
svgStr[55][9] = "Интервал<br>&chi;<sup>2</sup> Утга<br>(O<sub>i</sub>-E<sub>i</sub>)<sup>2</sup> / E<sub>i</sub>";
svgStr[56][9] = "&chi;<sup>2</sup> Утга";
svgStr[57][9] = "Магадлал Гистограм";
svgStr[58][9] = "Нормал Q-Q диаграм";
svgStr[59][9] = "Нормал Quantile";
svgStr[60][9] = "Хамаарлын коэфцеэнт ";
svgStr[61][9] = "Детерминацийн коэффициент";
svgStr[62][9] = "Стандарт алдаа ";
svgStr[63][9] = "Хувьсагчийн";
svgStr[64][9] = "Хувьсагчийн нэр ";
svgStr[65][9] = "Үл хамааран хувьсагч";
svgStr[66][9] = "Хамааран хувьсагч";
svgStr[67][9] = "Параметр буюу эх олонлогийн утга";
svgStr[68][9] = "Тооцооны утга";
svgStr[69][9] = "Утга";
svgStr[70][9] = "Огтолцоо";
svgStr[71][9] = "Регрессийн шулууны налалт буюу өнцөг";
svgStr[72][9] = "Фактор";
svgStr[73][9] = "Хэлбэлзлийн квадратуудын нийлбэр";
svgStr[74][9] = "Чөлөөний зэргүүд";
svgStr[75][9] = "Квадратуудын дундаж утга";
svgStr[76][9] = "Хамаарал ";
svgStr[77][9] = "Алдаа";
svgStr[78][9] = "Нийлбэр ";
svgStr[79][9] = "<h3>Регрессийн шинжилгээ</h3>";
svgStr[80][9] = "Үлдэгдлийн стандартчилсан утга Q-Q диаграм";
svgStr[81][9] = "Үлдэгдлийн стандартчилсан утга";
svgStr[82][9] = "Нормал Quantile";
svgStr[83][9] = "Үлдэгдлийн диаграм/дүрслэл";
svgStr[84][9] = "Хүлээгдэж/таамаглаж буй утга";
svgStr[85][9] = "Two way ANOVA";
svgStr[86][9] = "Итгэх интервал График";
svgStr[87][9] = "Үлдэгдэл";
svgStr[88][9] = "Two way Mean Table";
svgStr[89][9] = "Scatter Plot Matrix";
svgStr[90][9] = "Multiple Comparison";
svgStr[91][9] = "Statistics";
svgStr[92][9] = "Factor";
svgStr[93][9] = "Level";
svgStr[94][9] = "Paired Sample Data Graph";
svgStr[95][9] = "Residual vs Forecasting Plot";
svgStr[96][9] = "Residual vs Leverage Plot";
svgStr[97][9] = "Cook's Distance Graph";
svgStr[98][9] = "Cook's Distance";
svgStr[99][9] = "Data Order";
svgStr[100][9]= "Mean Difference";
svgStr[101][9]= "Testing Means";
svgStr[102][9]= "Treatment";
svgStr[103][9]= "Interaction";
svgStr[104][9]= "Row Total";
svgStr[105][9]= "Column Total";
svgStr[106][9]= "Multiple Correlation Coeff";
svgStr[107][9]= "<h3>Correlation Analysis</h3>";
svgStr[108][9]= "Correlation Matrix";
svgStr[109][9]= "Factor1 - Factor2 Mean Graph";

svgStrU[1][9] = "Бином тархалт ";
svgStrU[2][9] = "Давтамж";
svgStrU[3][9] = "Дундаж  утга";
svgStrU[4][9] = "Стандарт хэлбэлзэл";
svgStrU[5][9] = "Пойсоны тархалт ";
svgStrU[6][9] = "Геометрийн тархалт";
svgStrU[7][9] = "Хайпер геометрийн тархалт";
svgStrU[8][9] = "Хүнам";
svgStrU[9][9] = "Жишээ тархалт";
svgStrU[10][9] = "Их тооны хууль";
svgStrU[11][9] = "Үзүүр сүүл хэсэг";
svgStrU[12][9] = "Дээд, толгой хэсэг";
svgStrU[13][9] = "Зоосны тоо тал";
svgStrU[14][9] = "Эхний хэсгийн тоо";
svgStrU[15][9] = "Туршилтын тоо";
svgStrU[16][9] = "Жишээ дундаж утгуудын тархалт";
svgStrU[17][9] = "Давтамж";
svgStrU[18][9] = "Стандарт алдаа";
svgStrU[19][9] = "Хүн амын дундаж утга";
svgStrU[20][9] = "Найдварт завсар";
svgStrU[21][9] = "нарийвчлалыг үнэлэх";
svgStrU[22][9] = "Жишээ дундаж утга";
svgStrU[23][9] = "[Тестийн статистик] = ";
svgStrU[24][9] = "Тархалт";
svgStrU[25][9] = "Хүчингүй таамаглалаас татгалзах / Null таамаглал/";
svgStrU[26][9] = "Hull таамаглалыг хүлээн авах ";
svgStrU[27][9] = " п-утга  = ";
svgStrU[28][9] = "[шийдвэр ] ";
svgStrU[29][9] = "[Дундаж кватрат хазайлтын шинжилгээ]";
svgStrU[30][9] = "Хамааралын коеффициент оруулах болон гүйцэтгэх товчийг дарах";
svgStrU[31][9] = "Хамаарал";
svgStrU[32][9] = "Мөрийн хувьсагч ";
svgStrU[33][9] = "Баганан хувьсагч";
svgStrU[34][9] = "Дундаж  утга"
svgStrU[35][9] = "Стандарт хэлбэлзэл"
svgStrU[36][9] = "<h3> Гистограм <br>Давтамжит хүснэгт</h3>";
svgStrU[37][9] = "Группын нэр";
svgStrU[38][9] = "Завсар";
svgStrU[39][9] = "Иш";
svgStrU[40][9] = " Навчист /график/";
svgStrU[41][9] = "Групп 1  Навчист /график/";
svgStrU[42][9] = "Групп 2  Навчист /график/"
svgStrU[43][9] = "<h3>Суурь, үндсэн статистик</h3>";
svgStrU[44][9] = "Ажиглалт";
svgStrU[45][9] = "Хамгийн бага";
svgStrU[46][9] = "Гол нь , голийн утга";
svgStrU[47][9] = "Хамгийн их ";
svgStrU[48][9] = "Нийлбэр";
svgStrU[49][9] = "Илтгэгчийн функцийн";
svgStrU[50][9] = "Нэг төрлийн/ байнгын";
svgStrU[51][9] = "нарийвчлалыг үнэлэх";
svgStrU[52][9] = "- Нэг даралтаар цэгүүдийг үүсгээд е-Стат нь хамаарлын шулууныг олно";
svgStrU[53][9] = "- Цэгийг шилжүүлэх болон устгах. Хамаарлын шулууны өөрчлөлийг ажиглах";
svgStrU[54][9] = "[Жишээ статистик] ";
svgStrU[55][9] = "[Жишээ 1 статистик] ";
svgStrU[56][9] = "[Жишээ 2 статистик] ";
svgStrU[57][9] = "Найдварт түвшин ";
svgStrU[58][9] = "Мөр болон баганы хувьсагчууд хоорондоо хамааралгүй ";
svgStrU[59][9] = "Row & Col Dependent";
svgStrU[60][9] = "Observed Distribution";
svgStrU[61][9] = "Theoretical Distribution";
svgStrU[62][9] = "Goodness of Fit Test for Observed Frequency";
svgStrU[63][9] = "Wilcoxon Rank Sum Test";
svgStrU[64][9] = "Wilcoxon Rank Sum Test Table";
svgStrU[65][9] = "Kruskal-Wallis Test";
svgStrU[66][9] = "Kruskal-Wallis Test Table";
svgStrU[67][9] = "Kruskal-Wallis H Statistics";
svgStrU[68][9] = "Wilcoxon Signed Rank Test";
svgStrU[69][9] = "Sign Test";
svgStrU[70][9] = "Friedman Test";
svgStrU[71][9] = "Friedman S Statistic";
svgStrU[72][9] = "Friedman Distribution Table";
// Chinese - Simplified
$.message.zh = {
    "eStat : Stat Education SW": "eStat: 统计教育软件",
    "Filename": "文件名",
    "Selected Variables": "选择变量",
    "Cancel": "取消",
    "Edit Variables": "编辑变量",
    "Level": "级别",
    "ElementaryLevel": "小学",
    "MiddleLevel": "中学",
    "HighLevel": "高学",
    "UniversityLevel": "大学",
    "Example": "例题",
    "New Sheets": "新工作表",
    "csv Open": "打开csv文档",
    "www Open": "打开网页",
    "json Open": "打开json文档",
    "csv Save": "保存csv",
    "json Save": "保存json",
    "Print Sheet": "打印工作表",
    "Bar Graph": "条形图",
    "Pie Chart": "饼图",
    "Band Graph": "带状图",
    "Line Graph": "折线图",
    "Dot Graph": "点图",
    "Histogram": "直方图",
    "Stem & Leaf Plot": "茎叶图",
    "Box-Whisker Plot": "箱线图",
    "Scatterplot": "散点图",
    "Frequency Table": "频频率分布表",
    "Basic Statistics": "基本统计量",
    "Testing Hypothesis &mu;": "假设检验 &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>": "假设检验 &sigma;<sup>2</sup>",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>": "假设检验 &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>": "假设检验 &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Analysis of Variance": "方差分析",
    "High School Stat Education": "高中统计",
    "University Stat Education": "大学统计",
    "Elem Stat Graph Example": "小学统计图表示例",
    "Learning eStat w Example": "eStat例题学习",
    "Vertical Separated Bar": "纵向分离条形图",
    "Vertical Stacked Bar": "纵向堆叠条形图",
    "Vertical Ratio Bar": "纵向比率条形图",
    "Vertical Side by Side Bar": "纵向并排条形图",
    "Vertical Two Sided Bar": "纵向双边条形图",
    "Horizontal Separated Bar": "横向分离条形图",
    "Horizontal Stacked Bar": "横向堆叠条形图",
    "Horizontal Ratio Bar": "橫向比率条形图",
    "Horizontal Side by Side Bar": "橫向并排条形图",
    "Horizontal Two Sided Bar": "横向双边条形图",
    "Doughnut Graph": "圆环图",
    "Two Sided Stem & Leaf Plot": "双边茎叶图",
    "Graph Save": "保存图形",
    "Graph Print": "打印图形",
    "Move to Table": "移动至表格",
    "Edit Title": "编辑标题",
    "Table Save": "保存表格",
    "Table Print": "打印表格",
    "Frequency": "频数",
    "(Sorting)": "(排序)",
    "Raw Data": "原始数据",
    "Descending": "递减的",
    "Ascending": "递增的",
    "Mean": "平均数",
    "Std Deviation": "标准差",
    "Regression": "回归",
    "MeanStd": "平均/标准差",
    "95CI": "95%置信区间",
    "RegressionAnalysis": "回归分析",
    "ANOVA2": "2元方差分析",

    "Frequency Polygon": "频数分布多边形",
    "Frequency Table": "频数分布表",
    "Execute New Interval": "执行新区间",
    "Interval Start": "区间起点",
    "Interval Width": "区间宽度",
    "t-test": "t-检验",
    "Z-test": "Z-检验",
    "(if Z-test, enter &sigma;)": "(Z-检验, enter &sigma)",
    "Significance Level": "显著性水平",
    "Execute": "执行",
    "(Confidence Interval)": "(置信区间)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)": "(Z-检验, Z, &sigma;使用)",
    "&chi;<sup>2</sup> test": "&chi;<sup>2</sup> 检验",
    "Variance Assumption": "方差假设",
    "F test": "F 检验",
    "At least one pair of means is different": "至少有一对平均数不相等",
    "Main Title : ": "主标题 : ",
    "y title : ": "y轴标题 : ",
    "x title : ": "x轴标题 : ",
    "Modify": "修改",
    "Confirm": "确认",
    "Variable Name": "变量名",
    "Variable Value": "变量值",
    "Value Label": "变量标签",
    "* Less than nine value labels allowed.": "* 允许9个以下的变量标签。",
    "Save": "保存",
    "Exit": "退出",
    "eStatU UnivStatEdu": "eStatU - 大学统计教育软件",
    "eStatH HighStatEdu": "eStatH - 中学统计教育软件",
    "Menu": "选择",
    "Binomial Experiment": "二项式分布试验",
    "Binomial Distribution": "二项式概率分布",
    "Binomial Prob Table": "二项式分布表",
    "Poisson Distribution": "泊松分布",
    "Poisson Prob Table": "泊松概率分布表",
    "Geometric Distribution": "几何分布",
    "Geometric Prob Table": "几何概率分布表",
    "HyperGeometric Distribution": "超几何分布",
    "HyperGeometric Prob Table": "超几何概率分布表",
    "Exponential Distribution": "指数分布",
    "Normal Experiment": "正态试验",
    "Normal Distribution": "正态分布",
    "Normal Approx": "正态分布估计",
    "t Distribution": "t 分布",
    "ChiSquare Distribution": "卡方分布",
    "F Distribution": "F 分布",
    "Sampling": "抽样",
    "Population vs Sample": "总体 vs 样本",
    "Population": "总体",
    "Sample": "样本",
    "Exponential": "指数分布(0.3)",
    "Uniform": "均匀分布(0,1)",
    "Sample05": "5% 样本抽出",
    "Sample10": "10% 样本抽出",
    "Sample20": "20% 样本抽出",
    "Statistics/BoxPlot": "统计量/箱线图",
    "Law of Large Number": "大数法则",
    "Dist of Sample Means": "样本均值",
    "Sample Size": "样本数",
    "Confidence Interval": "置信区间",
    "Estimation Accuracy": "估计准确率",
    "Repetition": "重复数",
    "Confidence Level": "置信水平",
    "Testing Hypothesis mu_titleAB": "均值检验",
    "Testing Hypothesis mu_title": "均值检验",
    "Testing Hypothesis sigma_title": "方差检验",
    "Testing Hypothesis P_title": "比例检验",
    "Testing Hypothesis mu12_title": "两总体均值检验",
    "Testing Hypothesis sigma12_title": "两总体方差检验",
    "Testing Hypothesis P12_title": "两总体比例检验",
    "Testing Hypothesis muAB": "假设检验 &mu; - &alpha;, &beta;",
    "Testing Hypothesis mu": "区间估计/假设检验: 均值&mu;",
    "Testing Hypothesis sigma": "区间估计/假设检验: 变异数&sigma;<sup>2</sup>",
    "Testing Hypothesis P": "区间估计/假设检验: 比例 P",
    "Testing Hypothesis mu12": "假设检验 : &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis sigma12": "假设检验 : &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Testing Hypothesis P12": "假设检验 : P<sub>1</sub>, P<sub>2</sub>",
    "Testing Hypothesis ANOVA": "方差分析",
    "Testing Independence": "独立性检验",
    "Correlation Coefficient": "相关系数",
    "Regression Experiment": "回归实验",
    "Hypothesis": "假设",
    "Test Type": "检验类型",
    "Z-test": "Z-检验",
    "t-test": "t-检验",
    "Chi-test": "卡方检验",
    "F-test": "F-检验",
    "Sampling Type": "样本",
    "Independent Sample": "獨立样本",
    "Paired Sample": "從屬样本",
    "Sample Data": "样本数据",
    "input either sample data": "接下来的对话视窗，使用csv/bsv格式输入样本资料或样本统计量",
    "Sample Statistics": "样本统计量",
    "Sample Mean": "样本均值",
    "Sample Variance": "样本方差",
    "Sample Proportion": "样本比例",
    "if Z-test-1": "(Z-检验, 母分散入力)",
    "if Z-test-2": "(Z-检验, Z<sub>1-&alpha;/2 </sub> 使用)",
    "Variance Assumption": "方差假设",
    "At least one pair": "至少有一对平均数不相等",
    "Row-Col-0": "列变量与行变量独立",
    "Row-Col-1": "列变量与行变量不独立",
    "Enter any number of row": "(由左上角储存格输入数字)",
    "Row": "列",
    "Column": "行",
    "Show Probability": "显示概率",
    "Regression Line": "回归线",
    "Erase All": "清除全部",
    "Add Point": "增加点",
    "Erase Point": "刪除点",
    "Reference Site": "参考站",
    "Lot Size": "Lot数",
    "Defect Size": "不良品数",
    "If typed": "(若数字已输入)",
    "Stat/BoxPlot": "统计量/箱型图",
    "Mean": "均值",
    "Std Dev": "标准差",
    "SimulationWarning": "(Current simulation should be finished before you start the next simulation.)",
    "OneGroup": "(一组)",
    "RegressionBand": "置信带",
    "RegressionTable": "回归分析",
    "RegressionResidual": "残差图",
    "RegressionResidualLeverage": "残差 - Leverage",
    "RegressionCook": "Cook距離图",
    "RegressionQQ": "残差Q-Q图",
    "HistogramNormal": "直方图",
    "HistogramChisq": "正态检验",
    "HistogramNormalQQ": "正态Q-Q图",

    "PopulationStd": "人口标准差",
    "Type1Error": "第一类错误",
    "Type2Error": "第二类错误",
    "AnovaTable": "方差分析表",
    "AnovaMeanGraph": "均值置信区间",
    "MultipleComparison": "多重比较过程",
    "AnovaResidual": "残差图",
    "AnovaQQ": "残差Q-Q图",
    "TestingFit": "拟合优度检验",
    "FitTest0": "观测和理论分布是一致的",
    "FitTest1": "观测和理论分布是不一致的",
    "ObservedFreq": "观测频率O",
    "ExpectedProb": "期望概率P",
    "ExpectedFreq": "期望频率 E(>5)",
    "InputFitData": "从左上角进入单元格",
    "ExecuteTable": "统计量",
    "MeanDotGraph": "置信区间图",
    "ScatterRegression": "矩阵散点图",
    "Factor": "因子",
    "Interaction": "交互作用",
    "NoInteraction": "交互作用無",
    "ExistInteraction": "交互作用有",
    "eStatLecture": "eStat 入門講義",
    "NonParametricMu12_title": "Wilcoxon 順位合檢定", 
    "NonParametricMu12": "Wilcoxon 順位合檢定 : 位置母數 &mu;<sub>1</sub>, &mu;<sub>2</sub>", 
    "Sample Range": "標本範圍",
    "DistributionTable": "分布表",
    "SignedRankTest": "Wilcoxon 符號順位檢定",
    "SignTest": "符號檢定",
    "SignCount": "符號數",
    "WilcoxonTest": "Wilcoxon 順位檢定",
    "KruskalTest": "Kruskal-Wallis 檢定",
    "KruskalTestANOVA": "Kruskal-Wallis 檢定 : 位置母數 &mu;<sub>1</sub>, &mu;<sub>2</sub>, &mu;<sub>3</sub> ",
    "Total": "全体",
    "FriedmanTest": "Friedman檢定",
    "FriedmanTestANOVA": "Friedman檢定 : 位置母数 &mu;<sub>1</sub>, &mu;<sub>2</sub>, ... , &mu;<sub>k</sub> ",
    "Block": "Block",
    "Treatment": "處理",
    "At least one locations is different": "位置母数 !=",
    "SignCondition": "n ≤ 100 二項分布檢定,  n > 100 正規近似檢定",
    "WilcoxonSignCondition": "n ≤ 20 Wilcoxon 順位合檢定t,  n > 20 正規近似檢定",
    "WilcoxonRankCondition": "n=n<sub>1</sub>+n<sub>2</sub> ≤ 25  順位合檢定,  n>25 正規近似檢定",
    "KruskalCondition": "n ≤ 10 H 分布檢定,  n > 100 &chi;<sup>2</sup>近似檢定",

};
// Chinese Simplified
appStr[1][10] = "../eStatH/index.html";
appStr[2][10] = "../eStatU/index.html";
appStr[3][10] = "../eStatE/index_en.html";
appStr[4][10] = "../ExLearning/index_en.html";
appStr[5][10] = "index.html";
appStr[6][10] = "../ExLecture/index_en.html";
alertMsg[1][10] = "所选的变量，其中之一没有包含资料。";
alertMsg[2][10] = "逐一选取变量进行分析（选按栏位名称）。若是同事选取两个变量，则第一个视为群组变量。";
alertMsg[3][10] = "所选的变量有缺失值。";
alertMsg[4][10] = "若选取的变量观察值不同，则无法进行分析。";
alertMsg[5][10] = "群组数太多！圆形可能因荧幕太小而重叠！。";
alertMsg[6][10] = "若摘要资料中要进行分析的变量包含文字，则无法进行分析及制作图表。";
alertMsg[7][10] = "若原始资料中有超过3个变量数被选择，则无法进行分析及制作图表。";
alertMsg[8][10] = "点图可用于观察值少于200的样本。";
alertMsg[9][10] = "茎叶图可用于观察值少于100的样本。";
alertMsg[12][10] = "若分析的变量包含文字，则无法进行分析及制作图表。";
alertMsg[14][10] = "连续型图形及假设建议无法进行摘要资料。";
alertMsg[16][10] = "此假设检验仅限于两个总体。";
alertMsg[17][10] = "绘制散点图至少需要横轴变量及纵轴变量。";
alertMsg[18][10] = "绘制散点图不可超过三个变量数。";
alertMsg[19][10] = "若X变量包含文字，则散点图无法绘制。";
alertMsg[20][10] = "若Y变量包含文字，则散点图无法绘制。";
alertMsg[21][10] = "若资料有缺失值，则无法储存。";
alertMsg[22][10] = "若资料有负值，条形图无法绘制。";
alertMsg[25][10] = "若资料只有一个群组，则堆叠条形图无法绘制。";
alertMsg[27][10] = "若资料只有一个群组，则比例条形图无法绘制。";
alertMsg[29][10] = "若资料只有一个群组，则并排条形图无法绘制。";
alertMsg[31][10] = "若资料只有一个群组，则双边条形图无法绘制。";
alertMsg[32][10] = "若资料有负值，则饼图无法绘制。";
alertMsg[33][10] = "若资料有负值，则环形图无法绘制。";
alertMsg[34][10] = "若资料有负值，则带状图无法绘制。";
alertMsg[35][10] = "若资料有负值，则频数分布表无法绘制。";
alertMsg[36][10] = "此条形图仅限于两个群组。";
alertMsg[37][10] = "此假设检验仅限于单个变量。";
alertMsg[38][10] = "mu 不是一个数字。请输入一个数值并重新执行!";
alertMsg[39][10] = "标准差为0或不是一个数字，请重新执行!";
alertMsg[40][10] = "输入的方差不是一个数字，请输入一个数值并重新执行!";
alertMsg[41][10] = "此假设检验仅限于两个变量，群组变量则需包含两个群组。";
alertMsg[42][10] = "假设检验的标题不可编辑! ";
alertMsg[43][10] = "Simple Linear Regression is only for one group";
svgStr[1][10] = " 条形图";
svgStr[2][10] = " 饼图";
svgStr[3][10] = " 圆环图";
svgStr[4][10] = " 带装图";
svgStr[5][10] = " 折线图";
svgStr[6][10] = " 点图";
svgStr[7][10] = " 箱线图";
svgStr[8][10] = " 茎叶图";
svgStr[9][10] = " 直方图";
svgStr[10][10] = " 散点图";
svgStr[11][10] = " 假设检验: 总体均值";
svgStr[12][10] = " 假设检验: 总体方差";
svgStr[13][10] = " 假设检验: 两总体均值";
svgStr[14][10] = " 假设检验: 两总体方差";
svgStr[15][10] = " 方差分析";
svgStr[16][10] = "次数";
svgStr[17][10] = "比例";
svgStr[18][10] = "群组";
svgStr[19][10] = " ";
svgStr[20][10] = "<h3>摘要资料<br>次数分布表</h3>";
svgStr[21][10] = "群组变量";
svgStr[22][10] = "列变量";
svgStr[23][10] = "总和";
svgStr[24][10] = "总和";
svgStr[25][10] = "<h3>次数分布表</h3>";
svgStr[26][10] = "方差分析";
svgStr[27][10] = "变量值";
svgStr[28][10] = "变量值标号";
svgStr[29][10] = "次数";
svgStr[30][10] = "百分比(%)";
svgStr[31][10] = "<h3>交叉表</h3>";
svgStr[32][10] = "行变量";
svgStr[33][10] = "列变量";
svgStr[34][10] = "平均"
svgStr[35][10] = "标准差"
svgStr[36][10] = "<h3> 直方图<br>次数分布表</h3>";
svgStr[37][10] = "群组名称";
svgStr[38][10] = "阶级区间";
svgStr[39][10] = "茎";
svgStr[40][10] = "叶";
svgStr[41][10] = "群组一 叶";
svgStr[42][10] = "群组二 叶"
svgStr[43][10] = "<h3>基本统计量</h3>";
svgStr[44][10] = "观察值";
svgStr[45][10] = "最小值";
svgStr[46][10] = "中位数";
svgStr[47][10] = "最大值";
svgStr[48][10] = "全体";
svgStr[49][10] = "<h3>正态性检验</h3>";
svgStr[50][10] = "期望频数> 5 <br> 建议";
svgStr[51][10] = "&chi;<sup>2</sup> 检验<br>Interval i <br>[a<sub>i</sub> , b<sub>i</sub>)";
svgStr[52][10] = "资料<br>观察频数<br>(O<sub>i</sub>)";
svgStr[53][10] = "正态分布<br>期望概率<br>P([a<sub>i</sub> , b<sub>i</sub>))";
svgStr[54][10] = "正态分布<br>期望频数<br>(E<sub>i</sub>)";
svgStr[55][10] = "各区间l<br>&chi;<sup>2</sup> 值<br>(O<sub>i</sub>-E<sub>i</sub>)<sup>2</sup> / E<sub>i</sub>";
svgStr[56][10] = "合&chi;<sup>2</sup>值";
svgStr[57][10] = "概率直方图, 正态分布";
svgStr[58][10] = "正态Q-Q图";
svgStr[59][10] = "正态分位数";
svgStr[60][10] = "相关系数";
svgStr[61][10] = "决定系数";
svgStr[62][10] = "标准误差";
svgStr[63][10] = "变量";
svgStr[64][10] = "变量名";
svgStr[65][10] = "自变量";
svgStr[66][10] = "应变量";
svgStr[67][10] = "总数";
svgStr[68][10] = "推定值";
svgStr[69][10] = "值";
svgStr[70][10] = "切片";
svgStr[71][10] = "斜率";
svgStr[72][10] = "因素";
svgStr[73][10] = "平方和";
svgStr[74][10] = "自由度";
svgStr[75][10] = "均方";
svgStr[76][10] = "回归";
svgStr[77][10] = "误差";
svgStr[78][10] = "总体";
svgStr[79][10] = "<h3>回归分析</h3>";
svgStr[80][10] = "标准残差Q-Q图";
svgStr[81][10] = "标准残差";
svgStr[82][10] = "正态分位数";
svgStr[83][10] = "残差图";
svgStr[84][10] = "预测值";
svgStr[85][10] = "双向方差分析表";
svgStr[86][10] = "置信区间图";
svgStr[87][10] = "残差";
svgStr[88][10] = "双向均值表";
svgStr[89][10] = "矩阵散点图";
svgStr[90][10] = "分组统计量";
svgStr[91][10] = "统计量";
svgStr[92][10] = "因素";
svgStr[93][10] = "水平";
svgStr[94][10] = "成对样本数据图";
svgStr[95][10] = "残差-豫測";
svgStr[96][10] = "残差-Leverage";
svgStr[97][10] = "Cook距離図";
svgStr[98][10] = "Cook距離";
svgStr[99][10] = "資料順序";
svgStr[100][10]= "平均差";
svgStr[101][10]= "平均差檢定";
svgStr[102][10]= "處理";
svgStr[103][10]= "交互作用";
svgStr[104][10]= "行合";
svgStr[105][10]= "列合";
svgStr[106][10]= "重相關係數";
svgStr[107][10]= "<h3>相關分析</h3>";
svgStr[108][10]= "相關係數行列";
svgStr[109][10]= "因子1 - 因子2 平均図";

svgStrU[1][10] = "二项式分布";
svgStrU[2][10] = "重复数";
svgStrU[3][10] = "平均";
svgStrU[4][10] = "标准差";
svgStrU[5][10] = "泊松分布";
svgStrU[6][10] = "几何分布";
svgStrU[7][10] = "超几何分布";
svgStrU[8][10] = "总体";
svgStrU[9][10] = "样本分布";
svgStrU[10][10] = "大数法则";
svgStrU[11][10] = "反面";
svgStrU[12][10] = "正面";
svgStrU[13][10] = "硬币正面";
svgStrU[14][10] = "  正面个数  ";
svgStrU[15][10] = "  试验次数  ";
svgStrU[16][10] = "样本平均分布";
svgStrU[17][10] = "重复";
svgStrU[18][10] = "标准差";
svgStrU[19][10] = "总体均值";
svgStrU[20][10] = "置信区间";
svgStrU[21][10] = "估计准确率";
svgStrU[22][10] = "样本平均";
svgStrU[23][10] = "[检验统计量] = ";
svgStrU[24][10] = "分布";
svgStrU[25][10] = "拒绝原假设";
svgStrU[26][10] = "接受原假设";
svgStrU[27][10] = "p-值 = ";
svgStrU[28][10] = "[决策] ";
svgStrU[29][10] = "[方差分析]";
svgStrU[30][10] = "输入相关系数后按确认";
svgStrU[31][10] = "回归分析";
svgStrU[32][10] = "列变量";
svgStrU[33][10] = "行变量";
svgStrU[34][10] = "平均"
svgStrU[35][10] = "标准差"
svgStrU[36][10] = "<h3> 直方图<br>频数分布表</h3>";
svgStrU[37][10] = "群组名称";
svgStrU[38][10] = "阶级区间";
svgStrU[39][10] = "叶";
svgStrU[40][10] = "叶";
svgStrU[41][10] = "群组1 叶";
svgStrU[42][10] = "群组2 叶";
svgStrU[43][10] = "<h3>基本统计量</h3>";
svgStrU[44][10] = "资料数";  
svgStrU[45][10] = "最小值";  
svgStrU[46][10] = "中位数"; 
svgStrU[47][10] = "最大值";  
svgStrU[48][10] = "全体";
svgStrU[49][10] = "指数分布";
svgStrU[50][10] = "均匀分布";
svgStrU[51][10] = "估计准确率";
svgStrU[52][10] = "- 单击鼠标添加观察点，eStat会计算出回归线。";
svgStrU[53][10] = "- 移动或者删除一个观察点，观看回归线的变化。";
svgStrU[54][10] = "[样本统计量] ";
svgStrU[55][10] = "[样本 1 统计量] ";
svgStrU[56][10] = "[样本 2 统计量] ";
svgStrU[57][10] = "显著性水平";
svgStrU[58][10] = "列行独立";
svgStrU[59][10] = "列行不独立";
svgStrU[60][10] = "观测分布";
svgStrU[61][10] = "理论分布";
svgStrU[62][10] = "观测频率的拟合优度检验";
svgStrU[63][10] = "Wilcoxon 順位合檢定";
svgStrU[64][10] = "Wilcoxon 順位合檢定 分布表";
svgStrU[65][10] = "Kruskal-Wallis 檢定";
svgStrU[66][10] = "Kruskal-Wallis 檢定 分布表";
svgStrU[67][10] = "Kruskal-Wallis H 統計量";
svgStrU[68][10] = "Wilcoxon 符號順位檢定";
svgStrU[69][10] = "符號檢定";
svgStrU[70][10] = "Friedman檢定";
svgStrU[71][10] = "Friedman S 統計量";
svgStrU[72][10] = "Friedman檢定分布表";


