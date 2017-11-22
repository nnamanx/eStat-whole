// eStat.js
    svgWidth     = 600;
    svgHeight    = 560;
    margin       = {top:80, bottom:80, left:80, right:100};
    graphWidth   = svgWidth - margin.left - margin.right;   // 그래프 영역의 너비
    graphHeight  = svgHeight - margin.top - margin.bottom;  // 그래프 영역의 높이

var bufferLegend = 20;   // 우측 y선과 범례와  간격
var bothBarGap   = 35;   // 양쪽막대의 갭
var titleBuffer  = graphWidth / 2 ;   // 주제목 margin.left 다음 간격

var f0   = d3.format(".0f");
var f1   = d3.format(".1f");
var f2   = d3.format(".2f");
var f3   = d3.format(".3f");
var f4   = d3.format(".4f");

var   myColor = ["#0055FF","#FF4500","#00AA00","#FFE400","#FF00DD","#808000","#0000CD","#FFA500","#7CFC00","#87CEEB","#FF1493",
                 "#008000","#6495ED","#FFD700","#BDB76B","#000080","#800000","#778899","#CD853F","#8B008B","#00FFFF","#FFC0CB",
                 "#B0C4DE","#DDA0DD","#A9A9A9","#ADFF2F","#ADD8E6","#FFDAB9","#F0E68C","#E6E6FA","#000099","#00FF99","#009999",
                 "#003399","#333399","#330099","#339999","#336699","#666699","#663399","#669999","#999999","#99CC99","#993399",
                 "#996699","#CCCC99","#CC9999","#FFFF99","#FFCC99","#FF0099","#000033","#00FF33","#003333","#333333","#336633",
                 "#330033","#666633","#663333","#999933","#996633","#99CC33","#CCCC33","#CC9933","#CC9933","#CC3333","#CCFF33",
                 "#FFFF33","#FFCC33","#FF3333","#000066","#00FF66","#006666","#003366","#333366","#330066","#336666","#666666",
                 "#669966","#663366","#999966","#996666","#CCCC66","#CC9966","#CC6666","#CCFF66","#FFFF66","#FFCC66","#FF0066",
                 "#0000CC","#00FFCC","#0033CC","#3333CC","#3300CC","#33CCCC","#3366CC","#6666CC","#6633CC","#66CCCC","#6699CC",
                 "#9999CC","#9966CC","#99CCCC","#CCCCCC","#CCFFCC","#CC33CC","#CC99CC","#FFFFCC","#FFCCCC","#003300","#666600"];

var nLanguage = 2;
var nString   = 50;
var appStr    = new Array(nString);
var svgStr    = new Array(nString);
var alertMsg  = new Array(nString);
for (j = 0; j < nString; j++) {
  appStr[j]   = new Array(nLanguage);
  svgStr[j]   = new Array(nLanguage);
  alertMsg[j] = new Array(nLanguage);
}

appStr[1][0] = "../eStatH/index.html";
appStr[2][0] = "../eStatU/index.html";
appStr[3][0] = "../eStatE/index.html";
appStr[4][0] = "../ExLearning/index.html";
appStr[5][0] = "index_en.html";

alertMsg[1][0]  = "선택된 변량중에 자료가 없는 것이 있습니다!";
alertMsg[2][0]  = "시트에서 분석을 원하는 변량를 선택(변량번호 클릭)한 후 버튼을 눌러주세요!  변량이 2개 이상일 경우 첫 선택변량는 그룹변량이 됩니다. ";
alertMsg[3][0]  = "선택된 열에 결측치가 있습니다.";
alertMsg[4][0]  = "각 열의 자료수가 다르거나 결측치가 있으면 처리를 할 수 없습니다.";
alertMsg[5][0]  = "그룹의 수가 너무 많으면 화면의 사이즈가 작아 그래프가 겹처보일 수 있습니다.";
alertMsg[6][0]  = "요약자료의 분석변량에 문자가 있어 그래프를 그리거나 도수분포표를 출력할 수 없습니다.";
alertMsg[7][0]  = "원시자료에서 두 개이상 선택된 변량에 대해서는 그래프를 그리거나 표를 만들 수 없습니다.";
alertMsg[8][0]  = "점그림은 데이터 수가 200개 이하일때 가능합니다.";
alertMsg[9][0]  = "줄기와 잎 그림은 데이터 수가 100개 이하일때 가능합니다.";
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

svgStr[1][0]  = " 막대그래프";        	
svgStr[2][0]  = " 원그래프";   		
svgStr[3][0]  = " 도넛그래프";       	
svgStr[4][0]  = " 띠그래프";          	
svgStr[5][0]  = " 꺽은선그래프";       	
svgStr[6][0]  = " 점그래프";         	
svgStr[7][0]  = " 상자그래프";         	
svgStr[8][0]  = " 줄기와 잎 그림";     	
svgStr[9][0]  = " 히스토그램";         	
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
svgStr[34][0] = "평균"
svgStr[35][0] = "표준편차"
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

appStr[1][1] = "../eStatH/index_en.html";
appStr[2][1] = "../eStatU/index_en.html";
appStr[3][1] = "../eStatE/index_en.html";
appStr[4][1] = "../ExLearning/index_en.html";
appStr[5][1] = "index.html";

alertMsg[1][1]  = "One of the selected variables does not have data.";
alertMsg[2][1]  = "Select variables for analysis (clicking column names) one by one. If two variables, first one is group variable. ";
alertMsg[3][1]  = "Missing data on the selected variable.";
alertMsg[4][1]  = "If observations of the selected variables are different or observations are different, analysis is not allowed.";
alertMsg[5][1]  = "Too many groups! Graphs may be overlapped due to size of the screen.";
alertMsg[6][1]  = "If the analysis variable in summary data includes character, analysis or creating table is not allowed.";
alertMsg[7][1]  = "If more than three variables are selected on raw data, analysis or creating table is not allowed.";
alertMsg[8][1]  = "Dot Graph is allowd if the number of observation is less than 200.";
alertMsg[9][1]  = "Stem & Leaf Plot is allowd if the number of observation is less than 100.";
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

svgStr[1][1]  = " Bar Graph";        	
svgStr[2][1]  = " Pie Chart";   		
svgStr[3][1]  = " Donut Graph";       	
svgStr[4][1]  = " Band Graph";          	
svgStr[5][1]  = " Line Graph";       	
svgStr[6][1]  = " Dot Graph";         	
svgStr[7][1]  = " Box-Whisker Plot";         	
svgStr[8][1]  = " Stem and Leaf Plot";     	
svgStr[9][1]  = " Histogram";         	
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

// 한글 체크 
function is_hangul_char(ch) {
  c = ch.charCodeAt(0);
  if( 0x1100<=c && c<=0x11FF ) return true;
  if( 0x3130<=c && c<=0x318F ) return true;
  if( 0xAC00<=c && c<=0xD7A3 ) return true;
  return false;
}

// Button Color Change
function buttonColorChange() {

      document.getElementById("SVG").style.width  = svgWidth;
      document.getElementById("SVG").style.height = svgHeight;
      svgWidth2    = svgWidth;
      svgHeight2   = svgHeight;
      margin       = {top:80, bottom:80, left:80, right:100};
      graphWidth   = svgWidth - margin.left - margin.right;   // 그래프 영역의 너비
      graphHeight  = svgHeight - margin.top - margin.bottom;  // 그래프 영역의 높이
//      tableLoc     = svgHeight + 160;

      document.getElementById("freq").checked     = false;
      document.getElementById("mean").checked     = false;
      document.getElementById("DotMean").checked  = false;
      document.getElementById("DotStd").checked   = false;
      document.getElementById("regress").checked  = false;
      document.getElementById("HistMean").checked = false;
      document.getElementById("HistFreq").checked = false;
      document.getElementById("HistLine").checked = false;

      checkFreq     = false;
      checkBandFreq = false;
      checkDotMean  = false;
      checkDotStd   = false;
      checkHistMean = false;
      checkHistFreq = false;
      checkHistLine = false;
      checkRegress  = false;

      SeparateBar = false;
      StackBar    = false;
      RatioBar    = false;
      SideBar     = false;
      BothBar     = false;
      LineGraph   = false;
      PieChart    = false;
      DonutGraph  = false;
      BandGraph   = false;
      FreqTable   = false;
      DotGraph    = false;
      Histogram   = false;
      BoxGraph    = false;
      StemLeaf    = false;
      StemBoth    = false;
      StatTable   = false;
      Scatter     = false;
      THmean1     = false;
      THmean12    = false;
      THsigma1    = false;
      THsigma12   = false;
      THanova     = false;
      EditGraph   = false;

      // 각 그래프 선택사항 컨트롤
      document.getElementById("sub1").style.display  = "none";  //분리형 막대 도수표시 감추기
      document.getElementById("sub2").style.display  = "none";  //분리형 막대 정렬 감추기
      document.getElementById("sub3").style.display  = "none";  //띠그래프 도수표시 감추기
      document.getElementById("sub4").style.display  = "none";  //꺽은선그래프 정렬 감추기
      document.getElementById("sub5").style.display  = "none";  //점그래프 평균 표준편차 감추기
      document.getElementById("sub6").style.display  = "none";  //산점도 회귀선 감추기
      document.getElementById("sub7").style.display  = "none";  //히스토그램 선택사항 감추기
      document.getElementById("sub8").style.display  = "none";  //가설검정 Mu 1 선택사항 감추기
      document.getElementById("sub9").style.display  = "none";  //가설검정 Sigma 1 선택사항 감추기
      document.getElementById("sub10").style.display = "none";  //가설검정 Mu 12 선택사항 감추기
      document.getElementById("sub11").style.display = "none";  //가설검정 Sigma 12 선택사항 감추기
      document.getElementById("sub12").style.display = "none";  //가설검정 ANOVA 선택사항 감추기
      document.getElementById("sub13").style.display = "none";  //그래프 제목편집 선택사항 감추기
      document.getElementById("sub14").style.display = "none";  //변량편집 선택사항 감추기

      document.getElementById("separate1").style.backgroundColor  = buttonColorB;
      document.getElementById("pie1").style.backgroundColor       = buttonColorB;
      document.getElementById("band1").style.backgroundColor      = buttonColorB;
      document.getElementById("line1").style.backgroundColor      = buttonColorB;
      document.getElementById("freqTable").style.backgroundColor  = buttonColorB;

      document.getElementById("dot1").style.backgroundColor       = buttonColorB;
      document.getElementById("box1").style.backgroundColor       = buttonColorB;
      document.getElementById("stem1").style.backgroundColor      = buttonColorB;
      document.getElementById("hist1").style.backgroundColor      = buttonColorB;
      document.getElementById("scatter1").style.backgroundColor   = buttonColorB;
      document.getElementById("statTable").style.backgroundColor  = buttonColorB;

      document.getElementById("separate2V").style.backgroundColor = buttonColorB;
      document.getElementById("stack2V").style.backgroundColor    = buttonColorB;
      document.getElementById("ratio2V").style.backgroundColor    = buttonColorB;
      document.getElementById("side2V").style.backgroundColor     = buttonColorB;
      document.getElementById("bothbar2V").style.backgroundColor  = buttonColorB;
      document.getElementById("separate2H").style.backgroundColor = buttonColorB;
      document.getElementById("stack2H").style.backgroundColor    = buttonColorB;
      document.getElementById("ratio2H").style.backgroundColor    = buttonColorB;
      document.getElementById("side2H").style.backgroundColor     = buttonColorB;
      document.getElementById("bothbar2H").style.backgroundColor  = buttonColorB;
      document.getElementById("donut2").style.backgroundColor     = buttonColorB;
      document.getElementById("bothstem2").style.backgroundColor  = buttonColorB;

      document.getElementById("testM1").style.backgroundColor     = buttonColorB;
      document.getElementById("testS1").style.backgroundColor     = buttonColorB;
      document.getElementById("testM12").style.backgroundColor    = buttonColorB;
      document.getElementById("testS12").style.backgroundColor    = buttonColorB;
      document.getElementById("anova").style.backgroundColor      = buttonColorB;

}

// 초기 그래프 제목
function graphTitle() {
    var str, gstr;
    // 주제목
    for (i = 1; i < graphNumMax; i++) {
      mTitle[i] = "";
      switch (i) {
        case  1: gstr = svgStr[1][langNum];     break;
        case  2: gstr = svgStr[1][langNum];     break;
        case  3: gstr = svgStr[1][langNum];     break;
        case  4: gstr = svgStr[1][langNum];     break;
        case  5: gstr = svgStr[1][langNum];     break;
        case  6: gstr = svgStr[1][langNum];     break;
        case  7: gstr = svgStr[1][langNum];     break;
        case  8: gstr = svgStr[1][langNum];     break;
        case  9: gstr = svgStr[1][langNum];     break;
        case 10: gstr = svgStr[1][langNum];     break;
        case 11: gstr = svgStr[2][langNum];     break;
        case 12: gstr = svgStr[3][langNum];    	break;
        case 13: gstr = svgStr[4][langNum]; 	break;
        case 14: gstr = svgStr[5][langNum];    	break;
        case 15: gstr = svgStr[6][langNum];   	break;
        case 16: gstr = svgStr[7][langNum];    	break;
        case 17: gstr = svgStr[8][langNum];   	break;
        case 18: gstr = svgStr[8][langNum];    	break;
        case 19: gstr = svgStr[9][langNum];    	break;
        case 20: gstr = svgStr[10][langNum];   	break;
        case 21: gstr = svgStr[11][langNum];    break;
        case 22: gstr = svgStr[12][langNum];  	break;
        case 23: gstr = svgStr[13][langNum];    break;
        case 24: gstr = svgStr[14][langNum];    break;
        case 25: gstr = svgStr[15][langNum];    break;
      }
      iTitle[i] = gstr;
    }

    // y축제목
    for (i = 1; i <= 25; i++) {
      yTitle[i] = "";
      switch (i) {
        case  1: str = svgStr[16][langNum];     break;
        case  2: str = svgStr[16][langNum];     break;
        case  3: str = svgStr[17][langNum];     break;
        case  4: str = svgStr[16][langNum];     break;
        case  5: str = svgStr[16][langNum];     break;
        case  6: str = "";        		break;
        case  7: str = "";        		break;
        case  8: str = "";        		break;
        case  9: str = "";        		break;
        case 10: str = "";        		break;
        case 11: str = "";        		break;
        case 12: str = "";        		break;
        case 13: str = "";        		break;
        case 14: str = "";        		break;
        case 15: str = "";        		break;
        case 16: str = "";        		break;
        case 17: str = "";        		break;
        case 18: str = "";        		break;
        case 19: str = svgStr[16][langNum];    	break;
        case 20: str = "";        		break;
        case 21: str = "";        		break;
        case 22: str = "";        		break;
        case 23: str = "";        		break;
        case 24: str = "";        		break;
        case 25: str = "";        		break;
      }
      yTitle[i] = str;
    }

    // x축제목
    for (i = 1; i <= 25; i++) {
      xTitle[i] = "";
      switch (i) {
        case  1: str = "";       		break;
        case  2: str = "";       		break;
        case  3: str = "";       		break;
        case  4: str = "";       		break;
        case  5: str = "";       		break;
        case  6: str = svgStr[16][langNum];    	break;
        case  7: str = svgStr[16][langNum];   	break;
        case  8: str = svgStr[17][langNum];    	break;
        case  9: str = svgStr[16][langNum];    	break;
        case 10: str = svgStr[16][langNum];    	break;
        case 11: str = "";        		break;
        case 12: str = "";        		break;
        case 13: str = "";        		break;
        case 14: str = "";        		break;
        case 15: str = "";        		break;
        case 16: str = "";        		break;
        case 17: str = "";        		break;
        case 18: str = "";        		break;
        case 19: str = svgStr[16][langNum];    	break;
        case 20: str = "";        		break;
        case 21: str = "";        		break;
        case 22: str = "";        		break;
        case 23: str = "";        		break;
        case 24: str = "";        		break;
        case 25: str = "";        		break;
      }
      xTitle[i] = str;
    }

}


function redrawGraph(graphNum) {
  
    switch (graphNum) {
      case  1: str = "separate2V";  break;
      case  2: str = "stack2V";     break;
      case  3: str = "ration2V";    break;
      case  4: str = "side2V";      break;
      case  5: str = "bothbar2V";   break;
      case  6: str = "separate2H";  break;
      case  7: str = "stack2H";     break;
      case  8: str = "ratio2H";     break;
      case  9: str = "side2H";      break;
      case 10: str = "bothbar2H";   break;
      case 11: str = "pie1";        break;
      case 12: str = "donut2";      break;
      case 13: str = "band1";       break;
      case 14: str = "line1";       break;
      case 15: str = "dot1";        break;
      case 16: str = "box1";        break;
      case 17: str = "stem1";       break;
      case 18: str = "bothstem2";   break;
      case 19: str = "hist1";       break;
      case 20: str = "scatter1";    break;
      case 21: str = "executeTH8";  break;
      case 22: str = "executeTH9";  break;
      case 23: str = "executeTH10"; break;
      case 24: str = "executeTH11"; break;
      case 25: str = "executeTH12"; break;
      default: str = "separate2V";
    }

    document.getElementById(str).click();
}


//  =================================================================================
//  eStatE.js 이산형그래프 함수 -----------------------------------------------------
//  =================================================================================


function dataClassify() {
      // 자료가 없으면 경고
      checkData = true;
      for (k = 0; k < numVar; k++) {
        if (tdobs[k] == 0) {
          checkData = false;
          alert(alertMsg[1][langNum]);
          return;
        }
      }
      // 변량선택 안하면 경고
      checkVarSelect = true;
      if (numVar == 0) {
        checkVarSelect = false;
        alert(alertMsg[2][langNum]);
        return;
      }

      // 초기화 - 그래프를 여러 번 그리거나 변수를 추가할때 필요
      for (k = 0; k < rowMax; k++) {
        gvar[k]        = null;
        gdataValue[k]  = null;
        gvalueLabel[k] = null;
        dvar[k]        = null;
        dataValue[k]   = null;
        dvalueLabel[k] = null;
      } 

      freqMin = 0;
      if (numVar < 2) { // 변수 하나는 원시자료
        checkMissing = false;
        for (i = 0; i < tdobs[0]; i++) {
            if( tdvar[0][i] == null || tdvar[0][i] == "" || tdvar[0][i] == NaN) {  
              alert(alertMsg[3][langNum]);
              checkMissing = true;
              return; 
            }
        }  

        dobs        = tdobs[0];
        dvarNumber  = tdvarNumber[0];
        dvarName    = tdvarName[0];
        ndvalue     = tdvalueNum[0];
        for (k = 0; k < ndvalue; k++) {
          dataValue[k] = tdvalue[0][k];
          if (tdvalueLabel[0][k] == null ) {
            dvalueLabel[k] = tdvalue[0][k];
          }
          else {
            dvalueLabel[k] = tdvalueLabel[0][k];
          }
        } 
        for (i = 0; i < dobs; i++) dvar[i] = tdvar[0][i]; 

        ngroup      = 1;
        gobs        = dobs;
        gvarNumber  = "";
        gvarName    = "";
        for (k=0; k<ngroup; k++) gvalueLabel[k] = null;
        for (i=0; i<gobs; i++) {
          gvar[i] = 1;
          dataA[i] = gvar[i];
        }  
        ngvalue = sortAscend(dobs, dataA, gdataValue, gvalueFreq);

        rawData = true;
      } 
      else { // 두 개 이상의 변수는 원시자료 또는 요약자료
        // check missing
        checkMissing = false;
        for (k=1; k<numVar; k++) {
          if (tdobs[k] != tdobs[0]) {
            checkMissing = true;
            alert(alertMsg[4][langNum]);
            return;
          }
        }

        gobs        = tdobs[0];
        gvarNumber  = tdvarNumber[0];
        gvarName    = tdvarName[0];
        ngvalue     = tdvalueNum[0]  
        for (k=0; k<ngvalue; k++) {
          gdataValue[k]  = tdvalue[0][k];
          if ( tdvalueLabel[0][k] == null ) {
            if (isNaN(tdvalue[0][k])) gvalueLabel[k] = tdvalue[0][k]; 
            else gvalueLabel[k] = svgStr[18][langNum]+(k+1).toString();
          }
          else {
            gvalueLabel[k] = tdvalueLabel[0][k];
          }
        } 
        for (i = 0; i < gobs; i++) gvar[i] = tdvar[0][i];

        dobs        = tdobs[1];
        dvarNumber  = tdvarNumber[1];
        dvarName    = tdvarName[1];
        ndvalue     = tdvalueNum[1];
        for (k = 0; k < ndvalue; k++) {
          dataValue[k]   = tdvalue[1][k];
          if (tdvalueLabel[1][k] == null ) {
            dvalueLabel[k] = tdvalue[1][k];
          }
          else {
            dvalueLabel[k] = tdvalueLabel[1][k];
          }
        } 
        for (i = 0; i < dobs; i++) dvar[i] = tdvar[1][i]; 

        // check 원시자료
        rawData = true;
        if (gobs == ngvalue) rawData = false; 
        if (rawData) ngroup = ngvalue;
        else ngroup = numVar - 1;

        if (ngroup > 9)  alert(alertMsg[5][langNum]);
        // 요약자료는 분석변량들의 Numeric 여부 체크
        if (rawData == false) {
          checkNumeric = true;
          for (k=1; k<numVar; k++) {
            for (i=0; i<dobs; i++) {
              if (isNaN(tdvar[k][i])) {
                checkNumeric = false;
                alert(alertMsg[6][langNum]);
                return;
              } // endof if
              else {
                tdvar[k][i] = parseFloat(tdvar[k][i]);   // 숫자화
              }
            } // endof i
          } // endof k
        } // endof if

      } // endof else

      if (rawData) { // 원시자료 ---------------------------------
 
        checkVarSelect = true;
        if (numVar > 2 ) {
          checkVarSelect = false;
          alert(alertMsg[7][langNum]);
          return;
        }

        for (k=0; k<ngroup; k++) {
          nobs[k]    = gvalueFreq[k];
          dataSet[k] = new Array(ndvalue);
          for (j=0; j<ndvalue; j++) dataSet[k][j] = 0;
        }

        // gvar 변량값별 dvar 각 값의 도수 count   -----교차표 ----------------      
        for (i=0; i<dobs; i++) {
          for (j=0; j<ngvalue; j++) {
            if (gvar[i] == gdataValue[j]) {k=j; break;}  // gvar[i]의 gdataValue에서 위치파악
          }
          for (j=0; j<ndvalue; j++) {
            if (dvar[i] == dataValue[j]) {m=j; break;}   // dvar[i]의 dataValue에서 위치파악
          }
          dataSet[k][m]++;
        }

      } else { // 요약자료 ---------------------------------------
        if (numVar == 2) gvarName = tdvarName[1];
        else {
          gvarName = "";
          for (j=1; j<numVar; j++) gvarName += "V"+tdvarNumber[j]+" ";
        }
 
        for (k=0; k<ngroup; k++) {
          dataSet[k]     = tdvar[k+1];
          gvalueLabel[k] = tdvarName[k+1];
        }   
        ndvalue = dobs;
        dvarName = tdvarName[0];

        for (i=0; i<dobs; i++) {
          dataValue[i]   = "";
          dvalueLabel[i] = tdvar[0][i];
        }
      }

      // Main Program Logic ================================================

      if (ngroup == 1) { // 분리형 막대와 선그래프에서 작동

        currentDataSet = dataSet[0];
        currentLabel   = dvalueLabel;
         

        for (i=0; i<ndvalue; i++) {
          dataR[i]=dataSet[0][i]
          dataA[i]=dataSet[0][i];
          indexA[i] = i;
          indexR[i] = i;
          vlabelR[i]= dvalueLabel[i];
        }
        

        for (i=0; i<ndvalue-1; i++) {
          for (j=i; j<ndvalue; j++) {
            if(dataA[i] > dataA[j]) {
              temp     = dataA[i];  tempi     = indexA[i];
              dataA[i] = dataA[j];  indexA[i] = indexA[j];
              dataA[j] = temp;      indexA[j] = tempi;
            }
          }
        } 

        for (i=0; i<ndvalue; i++) {
          dataD[i]  = dataA[ndvalue-i-1];
          indexD[i] = indexA[ndvalue-i-1];
        }

        for (i=0; i<ndvalue; i++) {
          vlabelA[i] = dvalueLabel[indexA[i]];
          vlabelD[i] = dvalueLabel[indexD[i]];
        }

        // 막대 너비/높이 계산
        freqMin  = dataA[0];  
        if (freqMin > 0) freqMin = 0;     
        freqMax  = dataA[ndvalue-1];
        freqMax += Math.floor(freqMax/8+1);      
      }
      else {
        freqMin = 0;
        freqMax = 0;
        for (k=0; k<ngroup; k++) {
          for (j=0; j<=ndvalue+1; j++) {
            if (dataSet[k][j] < freqMin) freqMin = dataSet[k][j];
            if (dataSet[k][j] > freqMax) freqMax = dataSet[k][j]; 
          }
        } 

        if (freqMin < 0) freqMin += Math.floor(freqMin/8-1);
        else { 
          freqMin -= Math.floor(freqMin/8-1);
          if (freqMin > 0) freqMin = 0;   
        }
        freqMax += Math.floor(freqMax/8+1); 
      }
}


// Sorting in ascending and count each value frequency
function sortAscend(dobs, dataA, dataValue, dvalueFreq) {
        var i, j;
        var nvalue = 0;
        for (i=0; i<dobs-1; i++) {
          for (j=i; j<dobs; j++) {
            if(dataA[i] > dataA[j]) {
              temp     = dataA[i];  
              dataA[i] = dataA[j];  
              dataA[j] = temp;     
            }
          }
        } 
        for(i=0; i<dobs; i++) {dvalueFreq[i]=0;} 
        dataValue[nvalue]  = dataA[0];  
        dvalueFreq[nvalue] = 1;   
        for (i=1; i<dobs; i++) {
          if (dataA[i] == dataA[i-1]) {
            dvalueFreq[nvalue]++;
          } 
          else {
            nvalue++;
            dataValue[nvalue] = dataA[i];
            dvalueFreq[nvalue]++;
          }
        }
        nvalue++;
        return nvalue;
}


// 이산형 그래프 제목 쓰기 함수
function drawTitle(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName) { 
        var str, gstr, xstr, ystr;
        var chekmTitle = false;

        // 주제목 값설정
        if (mTitle[graphNum] == "") {
          if (rawData) {
            if (ngroup == 1) str = dvarName+svgStr[19][langNum]+iTitle[graphNum];
            else str = "("+svgStr[18][langNum]+" "+gvarName+") " + " "+dvarName+svgStr[19][langNum]+ iTitle[graphNum];
          } 
          else str = iTitle[graphNum];   
        } else {
          str = mTitle[graphNum];
        }     

        // y축제목 값설정
        ystr = "";
        if (yTitle[graphNum] != "") ystr = yTitle[graphNum]; 

        // x축제목 값설정
        xstr = dvarName;
        if (xTitle[graphNum] != "") xstr = xTitle[graphNum];

        // 주제목
        chart.append("text")
             .attr("x",margin.left + titleBuffer)
             .attr("y",margin.top/2 + 10)
             .attr("font-size","17px")
             .attr("font-family","sans-seirf")
             .attr("stroke","black")
             .attr("text-anchor","middle")
             .text(str)
       
        // 축제목
        if (PieChart || DonutGraph || BandGraph) {
          // X축 제목
          chart.append("text")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
             .attr("font-size","12px")
             .attr("font-family","sans-seirf")
             .attr("stroke","black")
             .attr("text-anchor","middle")
             .text(xstr)
        }
        else if (LineGraph) {
          // X축 제목
          chart.append("text")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
             .attr("font-size","12px")
             .attr("font-family","sans-seirf")
             .attr("stroke","black")
             .attr("text-anchor","middle")
             .text(xstr)

          // Y축 제목
          var tx = margin.left/2 - 30;
          var ty = margin.top + 15;

          chart.append("text")
               .attr("font-size","12px")
               .attr("font-family","sans-seirf")
               .attr("stroke","black")
               .attr("text-anchor","end")
               .attr("x",margin.left/2-15)
               .attr("y",margin.top+ 15)
               .text(ystr)
               .attr("transform", "rotate(-90 30 100)")
        } 
        else if(VerticalBar) {  // 세로형 막대그래프
          // X축 제목
          chart.append("text")
             .attr("font-size","12px")
             .attr("font-family","sans-seirf")
             .attr("stroke","black")
             .attr("text-anchor","middle")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
             .text(xstr)
          // Y축 제목
          var tx = margin.left/2 - 30;
          var ty = margin.top + 15;

          chart.append("text")
               .attr("font-size","12px")
               .attr("font-family","sans-seirf")
               .attr("stroke","black")
               .attr("text-anchor","end")
               .attr("x",tx)
               .attr("y",ty)
               .text(ystr)
               .attr("transform", "rotate(-90 30 100)")

        }
        else {   // 가로형 막대그래프
          // X축 제목
//          str = xTitle[graphNum];
//          else str = gvarName;
          chart.append("text")
             .attr("font-size","12px")
             .attr("font-family","sans-seirf")
             .attr("stroke","black")
             .attr("text-anchor","middle")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
             .text(xstr)
        } // endof else

}

// 변량값명 쓰기 함수
function drawLabel(ngroup, ndvalue, label, betweenbarWidth, barWidth, gapWidth, betweenbarHeight, barHeight, gapHeight, oneHeight) { 
        var i, j, k, x1, y1, tx, ty, str, strAnchor;
        var tgapHeight       = gapHeight + 5;
        var angle;

        if(VerticalBar) {  // 세로형 막대그래프
 
          if (BothBar) {
            ty = margin.top + graphHeight/2;
            if (ndvalue < 10)     {angle = 0;  str = "middle";  y1 =  ty + 15;}
            else if(ndvalue < 30) {angle = 30; str = "start";   y1 =  ty + 10;}
            else                  {angle = 90; str = "start";   y1 =  ty + 5;}
          }
          else {   
            ty = margin.top + graphHeight;        
            if (ndvalue < 10)     {angle = 0;  str = "middle";  y1 =  ty + 15; }
            else if(ndvalue < 30) {angle = 30; str = "start";   y1 =  ty + 10;}
            else                  {angle = 90; str = "start";   y1 =  ty + 5;}
          }

          for (j=0; j<ndvalue; j++) {
             tx = margin.left + gapWidth + barWidth/2 + j*betweenbarWidth;
             if (ndvalue < 10)     {x1 = margin.left + gapWidth + barWidth/2 + j*betweenbarWidth;}
             else if(ndvalue < 30) {x1 = margin.left + gapWidth + j*betweenbarWidth;}
             else                  {x1 = margin.left + gapWidth + j*betweenbarWidth;}

             if (BothBar) {              
               chart.append("text")
                    .attr("text-anchor",str)
                    .attr("font-family","sans-serif")
                    .attr("font-size","8pt")
                    .attr("x",x1)
                    .attr("y",y1)
                    .attr("transform","rotate("+angle+","+x1+","+y1+")  ")
                    .text(label[j])
             }
             else {
               chart.append("line")   // tick
                  .attr("x1",tx)
                  .attr("x2",tx)
                  .attr("y1",ty)
                  .attr("y2",ty+5) 
                  .style("stroke","black") 
                  .style("stroke-width","0.5")                    
               chart.append("text")
                  .attr("text-anchor",str)
                  .attr("font-family","sans-serif")
                  .attr("font-size","9px")
                  .attr("x",x1)
                  .attr("y",y1)
                  .attr("transform","rotate("+angle+","+x1+","+y1+")  ")
                  .text(label[j])
             }
          }

        }
        else {   // 가로형 막대그래프

          if (BothBar) {
              for (j=0; j<ndvalue; j++) {
                chart.append("text")
                   .attr("class", "barname")
                   .attr("text-anchor","middle")
                   .attr("font-family","sans-serif")
                   .attr("font-size","8pt")
                   .attr("x",margin.left + graphWidth/2)
                   .attr("y",margin.top + tgapHeight + barHeight/2 + j*betweenbarHeight)
                   .text(label[ndvalue-j-1])
              }
          }
          else if (StackBar || RatioBar || SideBar ) {
              for (j=0; j<ndvalue; j++) {
                chart.append("text")
                   .attr("class", "barnameh")
                   .attr("text-anchor","end")
                   .attr("font-family","sans-serif")
                   .attr("font-size","8pt")
                   .attr("x",margin.left - 5)
                   .attr("y",margin.top + tgapHeight + barHeight/2 +j*betweenbarHeight)
                   .text(label[j])
              }
          }
          else {
            for (k=0; k<ngroup; k++) {
              for (j=0; j<ndvalue; j++) {
                chart.append("text")
                   .attr("class", "barnameh")
                   .attr("text-anchor","end")
                   .attr("font-family","sans-serif")
                   .attr("font-size","8pt")
                   .attr("x",margin.left - 5)
                   .attr("y",margin.top + k*oneHeight +  tgapHeight + barHeight/2 + j*betweenbarHeight)
                   .text(label[j])
              }
            }
          }
        }
}

// 막대그래프 축 그리기
function drawAxis(freqMax, height, ngroup) {
        var i, j, k, tx, ty, temp; 
        var xScale, yScale, yScale2;
        var verticalBothGap = 15;

        if(VerticalBar) {  // 세로형 막대그래프 Y축        

          yScale  = d3.scaleLinear().domain([0,freqMax]).range([height,10]);
          yScale2 = d3.scaleLinear().domain([freqMax,0]).range([height,10]);
          for (k=0; k<ngroup; k++) {
            tx = margin.left;
            ty = margin.top + k*height;
            if (k==1 && BothBar) {
              yScale = yScale2;
              ty += verticalBothGap;
            } 
            chart.append("g")
               .attr("transform","translate("+tx+","+ty+")")
               .call(d3.axisLeft(yScale))             // 눈금을 표시할 함수 호출

            if (!BothBar) { // y축 좌우측
              chart.append("line").attr("class","line")
                 .attr("x1",margin.left)
                 .attr("x2",margin.left)
                 .attr("y1",margin.top)
                 .attr("y2",margin.top + graphHeight)
                 .style("stroke","black") 
              chart.append("line").attr("class","line")
                 .attr("x1",margin.left + graphWidth)
                 .attr("x2",margin.left + graphWidth)
                 .attr("y1",margin.top)
                 .attr("y2",margin.top + graphHeight) 
                 .style("stroke","black") 

//              tx = margin.left + graphWidth;
//              chart.append("g")
//                 .attr("transform","translate("+tx+","+ty+")")
//                 .call(d3.axisRight(yScale))             // 눈금을 표시할 함수 호출

            }
          } // endof k
        }
        else {   // 가로형 막대그래프 X축

          ty = margin.top + graphHeight;
          if (BothBar) {
            temp = graphWidth/2 - bothBarGap;
            xScale = d3.scaleLinear().domain([freqMax,0]).range([0,temp]);
            chart.append("g")
             .attr("transform","translate("+margin.left+","+ty+")")
             .call(d3.axisBottom(xScale)                 // 눈금을 표시할 함수 호출
            )
            xScale = d3.scaleLinear().domain([0,freqMax]).range([0,temp]);
            tx = margin.left + graphWidth/2 + bothBarGap;
            chart.append("g")
             .attr("transform","translate("+tx+","+ty+")")
             .call(d3.axisBottom(xScale)                 // 눈금을 표시할 함수 호출
            )

          }
          else {
            xScale = d3.scaleLinear().domain([0,freqMax]).range([0,graphWidth])
            chart.append("g")
             .attr("transform","translate("+margin.left+","+ty+")")
             .call(d3.axisBottom(xScale)                 // 눈금을 표시할 함수 호출
            )
          }
        }
}

// 분리형 막대그래프 함수 --------------------------------------------------
function drawSeparateBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, 
            freqMax, currentLabel, currentDataSet, dataSet, checkFreq) {
        var i, j, k, str, tx, ty;
        var tdata = new Array(ndvalue);
        var oneHeight        = graphHeight / ngroup;
        var betweenbarWidth  = graphWidth / ndvalue;   // 막대와 막대 사이의 너비
        var barWidth         = betweenbarWidth * 0.6;  // 막대의 너비
        var gapWidth         = betweenbarWidth * 0.2;
        var betweenbarHeight = oneHeight / ndvalue;    // 막대와 막대 사이의 높이
        var barHeight        = betweenbarHeight * 0.6; // 막대의 높이
        var gapHeight        = betweenbarHeight * 0.2;

        var freqRatioV       = oneHeight / freqMax;        // 그래프 영역과 데이터 영역의 비율
        var freqRatioH       = graphWidth / freqMax;      // 그래프 영역과 데이터 영역의 비율

        drawTitle(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);
        drawLabel(ngroup, ndvalue, currentLabel, betweenbarWidth, barWidth, gapWidth, betweenbarHeight, barHeight, gapHeight, oneHeight);
        drawAxis(freqMax, oneHeight, ngroup); 


        if(VerticalBar) { // 세로형 막대그래프

          // x축 위 선
          y1 = margin.top;
          chart.append("line")
               .attr("class","line")
               .attr("x1",margin.left)
               .attr("x2",margin.left + graphWidth)
               .attr("y1",y1)
               .attr("y2",y1) 
               .style("stroke","black") 

          for (k=0; k<ngroup; k++) {
            // x축 선
            y1 = margin.top + (k+1)*oneHeight;
            chart.append("line")
               .attr("class","line")
               .attr("x1",margin.left)
               .attr("x2",margin.left + graphWidth)
               .attr("y1",y1)
               .attr("y2",y1) 
               .style("stroke","black") 
            if (ngroup == 1) {tdata = currentDataSet;}
            else {  // 그룹명 범례
              for (j=0; j<ndvalue; j++) tdata[j] = dataSet[k][j];
              str = gvalueLabel[k];
              chart.append("rect")
                   .style("fill",myColor[k])
                   .attr("x",margin.left + graphWidth + bufferLegend - 5)
                   .attr("y",margin.top + oneHeight/2 + oneHeight*k)
                   .attr("width",8)
                   .attr("height",8)
          
              chart.append("text")
                   .attr("font-size","12px")
                   .attr("font-family","sans-seirf")
                   .attr("stroke","black")
                   .attr("text-anchor","start")
                   .style("stroke",myColor[k])
                   .attr("x",margin.left + graphWidth + bufferLegend + 10)
                   .attr("y",margin.top + oneHeight/2 + oneHeight*k + 10)
                   .text(str);
            }

            for (j=0; j<ndvalue; j++) {
              if (tdata[j] >= 0) {
                 var b = chart.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("height",0)
                   .attr("width",barWidth)
                   .attr("x",margin.left + gapWidth + j*betweenbarWidth)
                   .attr("y",margin.top + oneHeight*(k+1))
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("y",margin.top + oneHeight*(k+1) - tdata[j]*freqRatioV)
                   .attr("height",tdata[j]*freqRatioV);
//
//                   b.enter().append("svg:title") 
//                      .text(tdata[j])
              }
              else {
                chart.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("height",0)
                   .attr("width",barWidth)
                   .attr("x",margin.left + gapWidth + j*betweenbarWidth)
                   .attr("y",margin.top + oneHeight*(k+1))
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("height",-tdata[j]*freqRatioV)
              }
            }
          } // end of k
        }
        else { // 가로형 막대그래프
          for (k=0; k<ngroup; k++) {
            y1 = margin.top + k*oneHeight;
            if (ngroup == 1) {tdata = currentDataSet;}
            else {
              for (j=0; j<ndvalue; j++) tdata[j] = dataSet[k][j];
/*
              if (rawData) {
                if (tdvalueLabel[0][k] == null) str = svgStr[18][langNum]+ (k+1).toString();
                else str = gvalueLabel[k]; 
              }
              else 
*/
              str = gvalueLabel[k];
  
              chart.append("rect")
                 .style("fill",myColor[k])
                 .attr("x",margin.left + graphWidth + bufferLegend - 5)
                 .attr("y",margin.top + oneHeight/2 + oneHeight*k)
                 .attr("width",8)
                 .attr("height",8)
          
              chart.append("text")
                 .attr("class","legend")
                 .style("stroke",myColor[k])
                 .attr("x",margin.left + graphWidth + bufferLegend + 10)
                 .attr("y",margin.top + oneHeight/2 + oneHeight*k + 10)
                 .text(str);
            }
            for (j=0; j<ndvalue; j++) {
              chart.append("rect")
                 .attr("class","bar")
                 .style("fill",myColor[k])
                 .attr("x",margin.left)
                 .attr("y",y1 + gapHeight + j*betweenbarHeight)
                 .attr("width","0px")                    // 최초 막대의 너비를 0 px 로 지정
                 .transition()                           // 애니매이션 효과 지정
                 .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                 .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                 .attr("width",graphWidth*tdata[j]/freqMax)
                 .attr("height",barHeight)
            } // end of j
          } // endof k
        }

        if(checkFreq) {
          showFreq(ngroup, ndvalue, currentDataSet, dataSet, freqMax, freqRatioV, gapWidth, barWidth, betweenbarWidth, 
                   gapHeight, barHeight, betweenbarHeight, oneHeight);
          return;
        }
       
}


// 분리형 막대그래프 도수 쓰기 함수
function showFreq(ngroup, ndvalue, currentDataSet, dataSet, freqMax, freqRatioV, gapWidth, barWidth, betweenbarWidth, 
          gapHeight, barHeight, betweenbarHeight, oneHeight) {
        var i, j, k;
        var tdata = new Array(rowMax);

        if (StackBar || RatioBar || SideBar || BothBar) return;
        if (PieChart || DonutGraph || BandGraph || LineGraph) return;
 
        if(VerticalBar) { // 세로형 막대그래프
          if (ngroup == 1) {
              for (j=0; j<ndvalue; j++) tdata[j] = currentDataSet[j];
              for (j=0; j<ndvalue; j++) {
                chart.append("text")
                   .attr("class","freqfont")
                   .attr("x",margin.left + gapWidth + barWidth/2  + j*betweenbarWidth)
                   .attr("y",svgHeight - margin.bottom - tdata[j]*freqRatioV - 5)
                   .text(tdata[j]);
              }
          }
          else {
            for (k=0; k<ngroup; k++) {
              for (j=0; j<ndvalue; j++) tdata[j] = dataSet[k][j];
              for (j=0; j<ndvalue; j++) {
                chart.append("text")
                   .attr("class","freqfont")
                   .attr("x",margin.left + gapWidth + barWidth/2  + j*betweenbarWidth)
                   .attr("y",margin.top + oneHeight*(k+1) - tdata[j]*freqRatioV - 5)
                   .text(tdata[j]);
              }
            }
          } // endif (ngroup == 1)
        }
        else  { // 가로형 막대그래프
          if (ngroup == 1) {
              for (j=0; j<ndvalue; j++) tdata[j] = currentDataSet[j];
              for (j=0; j<ndvalue; j++) {
                chart.append("text")
                   .attr("class","freqfont")
                   .attr("x",margin.left + graphWidth*tdata[j]/freqMax + 10)
                   .attr("y",margin.top + gapHeight + barHeight/2 + j*betweenbarHeight)
                   .text(tdata[j]);
              }
          }
          else {
            for (k=0; k<ngroup; k++) {
              for (j=0; j<ndvalue; j++) tdata[j] = dataSet[k][j];
              for (j=0; j<ndvalue; j++) {
                chart.append("text")
                   .attr("class","freqfont")
                   .attr("x",margin.left + graphWidth*tdata[j]/freqMax + 10)
                   .attr("y",margin.top + k*oneHeight + gapHeight + barHeight/2 +j*betweenbarHeight)
                   .text(tdata[j]);
              }
            }
          } // endif (ngroup == 1)
        } // endif (VerticalBar)
} 

// 막대그래프 도수 제거 함수
function removeFreq() {
	 chart.selectAll("text.freqfont").remove();
}

// 쌓는형 막대그래프 함수  --------------------------------------------------
function drawStackBar(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet) {
         var i, j, k, str, x1, y1;
         var tfreqMax, tfreqRatioV, tfreqRatioH, temp;
         var tdata     = new Array(ndvalue);
         var px = new Array(ndvalue);
         var py = new Array(ndvalue);

         var oneHeight        = graphHeight;

         var betweenbarWidth  = graphWidth / ndvalue;   // 막대와 막대 사이의 너비
         var barWidth         = betweenbarWidth * 0.6;    // 막대의 너비
         var gapWidth         = betweenbarWidth * 0.2;
         var betweenbarHeight = oneHeight / ndvalue;    // 막대와 막대 사이의 너비
         var barHeight        = betweenbarHeight * 0.6;   // 막대의 높이
         var gapHeight        = betweenbarHeight * 0.2;

         var freqRatioV       = oneHeight / freqMax;        // 그래프 영역과 데이터 영역의 비율
         var freqRatioH       = graphWidth / freqMax;      // 그래프 영역과 데이터 영역의 비율

         drawTitle(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);
         drawLabel(ngroup, ndvalue, dvalueLabel, betweenbarWidth, barWidth, gapWidth, betweenbarHeight, barHeight, gapHeight, oneHeight);

         tfreqMax = 0;
         for (j=0; j<ndvalue; j++) {
            temp = 0;
            for(k=0; k<ngroup; k++) temp += dataSet[k][j];
            if (temp > tfreqMax) tfreqMax = temp;
         }
         tfreqMax += Math.floor(tfreqMax/8+1);
  
         tfreqRatioV = graphHeight / tfreqMax;
         tfreqRatioH = graphWidth  / tfreqMax;
         drawAxis(tfreqMax, graphHeight, 1);


        if(VerticalBar) { // 세로형 막대그래프

          y1 = margin.top + graphHeight;
          chart.append("line")
             .attr("x1",margin.left)
             .attr("x2",margin.left + graphWidth)
             .attr("y1",y1)
             .attr("y2",y1)
             .style("stroke","black") 
          chart.append("line")
             .attr("x1",margin.left)
             .attr("x2",margin.left + graphWidth)
             .attr("y1",margin.top)
             .attr("y2",margin.top)
             .style("stroke","black") 

          for (k=0; k<ngroup; k++) {
            for (j=0; j<ndvalue; j++) tdata[j] = dataSet[k][j];
            // 범례
            str = gvalueLabel[k];

            chart.append("rect")
                 .style("fill",myColor[k])
                 .attr("x",margin.left + graphWidth + bufferLegend - 5)
                 .attr("y",margin.top + 20 + k*20)
                 .attr("width",8)
                 .attr("height",8)
            chart.append("text")
                 .attr("font-size","12px")
                 .attr("font-family","sans-seirf")
                 .attr("stroke","black")
                 .attr("text-anchor","start")
                 .style("stroke",myColor[k])
                 .attr("x",margin.left + graphWidth + bufferLegend + 10)
                 .attr("y",margin.top + 20 + k*20 + 10)
                 .text(str);


            if (k==0) { // 첫 그룹
              for (j=0; j<ndvalue; j++) {
                py[j] = margin.top + graphHeight - tdata[j]*tfreqRatioV
                chart.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("height",0)
                   .attr("width",barWidth)
                   .attr("x",margin.left + gapWidth + j*betweenbarWidth)
                   .attr("y",margin.top + graphHeight)
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("y",py[j])
                   .attr("height",tdata[j]*tfreqRatioV)
              }
            }
            else {  // 둘째 그룹 이하   
              for (j=0; j<ndvalue; j++) {
                chart.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("height",0)
                   .attr("width",barWidth)
                   .attr("x",margin.left + gapWidth + j*betweenbarWidth)
                   .attr("y",py[j])
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("y",py[j] - tdata[j]*tfreqRatioV)
                   .attr("height",tdata[j]*tfreqRatioV)
                py[j] = py[j] - tdata[j]*tfreqRatioV;
              } // endof j
            } // endof else
          } // endof k
        } // endof 세로형
        else { // 가로형 막대그래프

          // 범례
          for (k=0; k<ngroup; k++) {
            str = gvalueLabel[k];

            chart.append("rect")
                 .style("fill",myColor[k])
                 .attr("x",margin.left + graphWidth + bufferLegend - 5)
                 .attr("y",margin.top + 20 + k*20)
                 .attr("width",8)
                 .attr("height",8)
            chart.append("text")
                 .attr("font-size","12px")
                 .attr("font-family","sans-seirf")
                 .attr("stroke","black")
                 .attr("text-anchor","start")
                 .style("stroke",myColor[k])
                 .attr("x",margin.left + graphWidth + bufferLegend + 10)
                 .attr("y",margin.top + 20 + k*20 + 10)
                 .text(str);

          }

          for (k=0; k<ngroup; k++) {
            y1 = margin.top;
            if (ngroup == 1) {tdata = currentDataSet;}
            else {
              for (j=0; j<ndvalue; j++) tdata[j] = dataSet[k][j];
            }
            if (k==0) { // 첫 그룹
              for (j=0; j<ndvalue; j++) {
                px[j] = margin.left + graphWidth*tdata[j]/tfreqMax;
                chart.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("x",margin.left)
                   .attr("y",y1 + gapHeight + j*betweenbarHeight)
                   .attr("width",0)
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("width",graphWidth*tdata[j]/tfreqMax)
                   .attr("height",barHeight)
              }
            }
            else {  // 둘째 그룹 이하   
              for (j=0; j<ndvalue; j++) {
                chart.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("x",px[j])
                   .attr("y",y1 + gapHeight + j*betweenbarHeight)
                   .attr("width","0px")                    // 최초 막대의 너비를 0 px 로 지정
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("width",graphWidth*tdata[j]/tfreqMax)
                   .attr("height",barHeight)
                px[j] = px[j] + graphWidth*tdata[j]/tfreqMax;
              } // endof j
            } // endof else
          } // endof k
        } // endof 가로형
}

// 비율형 막대 그래프 함수   --------------------------------------------------
function drawRatioBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet) {

         var i, j, k, str, x1, y1;
         var tdata = new Array(ndvalue);
         var tsum  = new Array(ndvalue);
         var px    = new Array(ndvalue);
         var py    = new Array(ndvalue);

         var oneHeight        = graphHeight;
         var betweenbarWidth  = graphWidth / ndvalue;   // 막대와 막대 사이의 너비
         var barWidth         = betweenbarWidth * 0.6;    // 막대의 너비
         var gapWidth         = betweenbarWidth * 0.2;
         var betweenbarHeight = oneHeight / ndvalue;    // 막대와 막대 사이의 너비
         var barHeight        = betweenbarHeight * 0.6;   // 막대의 높이
         var gapHeight        = betweenbarHeight * 0.2;

         var freqRatioV       = oneHeight / freqMax;        // 그래프 영역과 데이터 영역의 비율
         var freqRatioH       = graphWidth / freqMax;      // 그래프 영역과 데이터 영역의 비율

         drawTitle(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);
         drawLabel(ngroup, ndvalue, dvalueLabel, betweenbarWidth, barWidth, gapWidth, betweenbarHeight, barHeight, gapHeight, oneHeight);
         drawAxis(1, graphHeight, 1); 


        // 각 변량값의 합
        for (j=0; j<ndvalue; j++) {
          tsum[j] = 0;
          for (k=0; k<ngroup; k++) tsum[j] += dataSet[k][j];
        }

        if(VerticalBar) { // 세로형 막대그래프

 
          y1 = margin.top + graphHeight;
          chart.append("line")
             .attr("x1",margin.left)
             .attr("x2",margin.left + graphWidth)
             .attr("y1",y1)
             .attr("y2",y1)
             .style("stroke","black") 
          chart.append("line")
             .attr("x1",margin.left)
             .attr("x2",margin.left + graphWidth)
             .attr("y1",margin.top)
             .attr("y2",margin.top)
             .style("stroke","black")

          for (k=0; k<ngroup; k++) {
            for (j=0; j<ndvalue; j++) tdata[j] = dataSet[k][j]/tsum[j];
            // 범례
            str = gvalueLabel[k];

            chart.append("rect")
                 .style("fill",myColor[k])
                 .attr("x",margin.left + graphWidth + bufferLegend - 5)
                 .attr("y",margin.top + 20 + k*20)
                 .attr("width",8)
                 .attr("height",8)
            chart.append("text")
                 .attr("font-size","12px")
                 .attr("font-family","sans-seirf")
                 .attr("stroke","black")
                 .attr("text-anchor","start")
                 .style("stroke",myColor[k])
                 .attr("x",margin.left + graphWidth + bufferLegend + 10)
                 .attr("y",margin.top + 20 + k*20 + 10)
                 .text(str);

            if (k==0) { // 첫 그룹의 그래프
              for (j=0; j<ndvalue; j++) {
                py[j] = margin.top + graphHeight - tdata[j]*graphHeight;
                chart.append("rect")
                  .attr("class","bar")
                  .style("fill",myColor[k])
                  .attr("height",0)
                  .attr("width",barWidth)
                  .attr("x",margin.left + gapWidth + j*betweenbarWidth)
                  .attr("y",margin.top + graphHeight)
                  .transition()                           // 애니매이션 효과 지정
                  .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                  .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                  .attr("y",py[j])
                  .attr("height",tdata[j]*graphHeight)
              }
            }
            else { // 둘째 이후의 그래프
              for (j=0; j<ndvalue; j++) {
                chart.append("rect")
                  .attr("class","bar")
                  .style("fill",myColor[k])
                  .attr("height",0)
                  .attr("width",barWidth)
                  .attr("x",margin.left + gapWidth + j*betweenbarWidth)
                  .attr("y",py[j])
                  .transition()                           // 애니매이션 효과 지정
                  .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                  .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                  .attr("y",py[j] - tdata[j]*graphHeight)
                  .attr("height",tdata[j]*graphHeight)
                py[j] = py[j] - tdata[j]*graphHeight;
              }
            }
          }
        }
        else { // 가로형 막대그래프
          // 범례
          for (k=0; k<ngroup; k++) {
            str = gvalueLabel[k];

            chart.append("rect")
                 .style("fill",myColor[k])
                 .attr("x",margin.left + graphWidth + bufferLegend - 5)
                 .attr("y",margin.top + 20 + k*20)
                 .attr("width",8)
                 .attr("height",8)
            chart.append("text")
                 .attr("font-size","12px")
                 .attr("font-family","sans-seirf")
                 .attr("stroke","black")
                 .attr("text-anchor","start")
                 .style("stroke",myColor[k])
                 .attr("x",margin.left + graphWidth + bufferLegend + 10)
                 .attr("y",margin.top + 20 + k*20 + 10)
                 .text(str);

          }
          for (k=0; k<ngroup; k++) {
            for (j=0; j<ndvalue; j++) tdata[j] = dataSet[k][j]/tsum[j];
            y1 = margin.top;
 
            if (k==0) { // 첫 그룹
              for (j=0; j<ndvalue; j++) {
                px[j] = margin.left + graphWidth*tdata[j];
                chart.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("x",margin.left)
                   .attr("y",y1 + gapHeight + j*betweenbarHeight)
                   .attr("width",0)
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("width",graphWidth*tdata[j])
                   .attr("height",barHeight)
              }
            }
            else {  // 둘째 그룹 이하   
              for (j=0; j<ndvalue; j++) {
                chart.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("x",px[j])
                   .attr("y",y1 + gapHeight + j*betweenbarHeight)
                   .attr("width","0px")                    // 최초 막대의 너비를 0 px 로 지정
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("width",graphWidth*tdata[j])
                   .attr("height",barHeight)
                px[j] = px[j] + graphWidth*tdata[j];
              } // endof j
            } // endof else
          } // endof k

        } // endof 가로형
        
}

// 나란형 막대그래프 함수 --------------------------------------------------
function drawSideBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet) {
 
        var i, j, k, str, x1, y1;
        var tdata   = new Array(ndvalue);

        var oneHeight        = graphHeight;
        var betweenbarWidth  = graphWidth / ndvalue;   // 막대와 막대 사이의 너비
        var barWidth         = betweenbarWidth * 0.6;    // 막대의 너비
        var gapWidth         = betweenbarWidth * 0.2;
        var betweenbarHeight = oneHeight / ndvalue;    // 막대와 막대 사이의 너비
        var barHeight        = betweenbarHeight * 0.6;   // 막대의 높이
        var gapHeight        = betweenbarHeight * 0.2;

        var freqRatioV = graphHeight / freqMax;
        var freqRatioH = graphWidth  / freqMax;
        var theight    = barHeight / ngroup;
 
        drawTitle(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);
        drawAxis(freqMax, graphHeight, 1); 
        drawLabel(ngroup, ndvalue, dvalueLabel, betweenbarWidth, barWidth, gapWidth, betweenbarHeight, barHeight, gapHeight, oneHeight);

        if(VerticalBar) { // 세로형 막대그래프

          var twidth = barWidth/ngroup;
          y1 = margin.top + graphHeight;
          chart.append("line")
             .attr("x1",margin.left)
             .attr("x2",margin.left + graphWidth)
             .attr("y1",y1)
             .attr("y2",y1) 
             .style("stroke","black") 
          chart.append("line")
             .attr("x1",margin.left)
             .attr("x2",margin.left + graphWidth)
             .attr("y1",margin.top)
             .attr("y2",margin.top) 
             .style("stroke","black") 
          // 범례
          for (k=0; k<ngroup; k++) {
              str = gvalueLabel[k];
              chart.append("rect")
                   .style("fill",myColor[k])
                   .attr("x",margin.left + graphWidth + bufferLegend - 5)
                   .attr("y",margin.top + 20 + k*20)
                   .attr("width",8)
                   .attr("height",8)
              chart.append("text")
                   .attr("font-size","12px")
                   .attr("font-family","sans-seirf")
                   .attr("stroke","black")
                   .attr("text-anchor","start")
                   .style("stroke",myColor[k])
                   .attr("x",margin.left + graphWidth + bufferLegend + 10)
                   .attr("y",margin.top + 20 + k*20 + 10)
                   .text(str);
          }

          for (k=0; k<ngroup; k++) {

            for (j=0; j<ndvalue; j++) tdata[j] = dataSet[k][j];
      
            for (j=0; j<ndvalue; j++) {
              chart.append("rect")
                 .attr("class","bar")
                 .style("fill",myColor[k])
                 .attr("height",0)
                 .attr("width",twidth)
                 .attr("x",margin.left + gapWidth + j*betweenbarWidth + k*twidth)
                 .attr("y",margin.top + graphHeight)
                 .transition()                           // 애니매이션 효과 지정
                 .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                 .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                 .attr("y",margin.top + graphHeight - tdata[j]*freqRatioV)
                 .attr("height",tdata[j]*freqRatioV)
            } // end of j
          } // end of k
        }
        else { // 가로형 막대그래프
          // 범례
          for (k=0; k<ngroup; k++) {
            str = gvalueLabel[k];
            chart.append("rect")
                 .style("fill",myColor[k])
                 .attr("x",margin.left + graphWidth + bufferLegend - 5)
                 .attr("y",margin.top + 20 + k*20)
                 .attr("width",8)
                 .attr("height",8)
            chart.append("text")
                 .attr("font-size","12px")
                 .attr("font-family","sans-seirf")
                 .attr("stroke","black")
                 .attr("text-anchor","start")
                 .style("stroke",myColor[k])
                 .attr("x",margin.left + graphWidth + bufferLegend + 10)
                 .attr("y",margin.top + 20 + k*20 + 10)
                 .text(str);

          }


          for (j=0; j<ndvalue; j++) {
            for (k=0; k<ngroup; k++) tdata[k] = dataSet[k][j];
            y1 = margin.top + gapHeight + j*betweenbarHeight;
            for (k=0; k<ngroup; k++) {
                chart.append("rect")
                 .attr("class","bar")
                 .style("fill",myColor[k])
                 .attr("x",margin.left)
                 .attr("y",y1 + k*theight)
                 .attr("width","0px")                    // 최초 막대의 너비를 0 px 로 지정
                 .transition()                           // 애니매이션 효과 지정
                 .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                 .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                 .attr("width",graphWidth*tdata[k]/freqMax)
                 .attr("height",theight)
            } // end of k
          } // end of j
        }
}

// 양쪽형 막대그래프 함수  --------------------------------------------------
function drawBothBar(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet) {
        var i, j, k, str, x1, y1, x2, y2, temp, tx, ty;
        var gapBoth = 25;
        var tdata = new Array(ndvalue);
        var py    = new Array(ndvalue);

        var oneHeight        = graphHeight;

        var betweenbarWidth  = graphWidth / ndvalue;   // 막대와 막대 사이의 너비
        var barWidth         = betweenbarWidth * 0.6;  // 막대의 너비
        var gapWidth         = betweenbarWidth * 0.2;
        var betweenbarHeight = oneHeight / ndvalue;    // 막대와 막대 사이의 너비
        var barHeight        = betweenbarHeight * 0.6; // 막대의 높이
        var gapHeight        = betweenbarHeight * 0.2;

        var tfreqRatioV = (graphHeight/2) / freqMax;
        var tfreqRatioH = ((graphWidth-20)/2) / freqMax;

        drawTitle(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);
        drawAxis(freqMax, graphHeight/2, 2); 
        drawLabel(ngroup, ndvalue, dvalueLabel, betweenbarWidth, barWidth, gapWidth, betweenbarHeight, barHeight, gapHeight, oneHeight);

        if(VerticalBar) { // 세로형 막대그래프

          // x 축 위 중간 아래 선
          x2 = margin.left + graphWidth
          y1 = margin.top + graphHeight/2;
          y2 = y1 + gapBoth;  // 위 아래 막대 갭
          chart.append("line")
             .attr("x1",margin.left)
             .attr("x2",margin.left)
             .attr("y1",margin.top)
             .attr("y2",y1)
             .style("stroke","black") 
          chart.append("line")
             .attr("x1",margin.left)
             .attr("x2",margin.left)
             .attr("y1",margin.top+graphHeight/2+gapBoth)
             .attr("y2",margin.top+graphHeight+gapBoth)
             .style("stroke","black") 

          chart.append("line")
             .attr("x1",margin.left)
             .attr("x2",x2)
             .attr("y1",margin.top)
             .attr("y2",margin.top)
             .style("stroke","black") 
          chart.append("line")
             .attr("x1",margin.left)
             .attr("x2",x2)
             .attr("y1",y1)
             .attr("y2",y1)
             .style("stroke","black") 
          chart.append("line")
             .attr("x1",margin.left)
             .attr("x2",x2)
             .attr("y1",y2)
             .attr("y2",y2)
             .style("stroke","black") 
          chart.append("line")
             .attr("x1",margin.left)
             .attr("x2",x2)
             .attr("y1",margin.top + graphHeight + gapBoth)
             .attr("y2",margin.top + graphHeight + gapBoth)
             .style("stroke","black")
          chart.append("line")
             .attr("x1",x2)
             .attr("x2",x2)
             .attr("y1",margin.top)
             .attr("y2",y1)
             .style("stroke","black")
          chart.append("line")
             .attr("x1",x2)
             .attr("x2",x2)
             .attr("y1",y1 + gapBoth)
             .attr("y2",y1 + gapBoth +graphHeight/2)
             .style("stroke","black")

          for (k=0; k<ngroup; k++) {
            for (j=0; j<ndvalue; j++) tdata[j] = dataSet[k][j];

            // 범례
            str = gvalueLabel[k];

            if (k == 0) {
              ty = margin.top + graphHeight/4 - 5;
            } else {
              ty = margin.top + gapBoth + 3*graphHeight/4 - 5;
            }
            chart.append("rect")
                 .style("fill",myColor[k])
                 .attr("x",margin.left + graphWidth + bufferLegend - 5)
                 .attr("y",ty)
                 .attr("width",8)
                 .attr("height",8)
            chart.append("text")
                 .attr("font-size","12px")
                 .attr("font-family","sans-seirf")
                 .attr("stroke","black")
                 .attr("text-anchor","start")
                 .style("stroke",myColor[k])
                 .attr("x",margin.left + graphWidth + bufferLegend + 10)
                 .attr("y",ty+10)
                 .text(str);

            if (k==0) { // 첫 그룹
              for (j=0; j<ndvalue; j++) {
                py[j] = margin.top + graphHeight/2 - tdata[j]*tfreqRatioV;
                chart.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("height",0)
                   .attr("width",barWidth)
                   .attr("x",margin.left + gapWidth + j*betweenbarWidth)
                   .attr("y",y1)
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("y",py[j])
                   .attr("height",tdata[j]*tfreqRatioV)
              } // endof j
            } // endof if
            else {  // 둘째 그룹  

              for (j=0; j<ndvalue; j++) {
                chart.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("height",0)
                   .attr("width",barWidth)
                   .attr("x",margin.left + gapWidth + j*betweenbarWidth)
                   .attr("y",y2)
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("height",tdata[j]*tfreqRatioV)
              } // endof j
            } // endof else
          } // endof k
        } // endof 세로형
        else { // 가로형 막대그래프
          x1 = margin.left + graphWidth/2 - bothBarGap;
          x2 = margin.left + graphWidth/2 + bothBarGap;
          y1 = margin.top;
          y2 = margin.top + graphHeight;
/*
          chart.append("line")
             .attr("x1",x1)
             .attr("x2",x1)
             .attr("y1",y1)
             .attr("y2",y2)
             .style("stroke","black") 
          chart.append("line")
             .attr("x1",x2)
             .attr("x2",x2)
             .attr("y1",y1)
             .attr("y2",y2)
             .style("stroke","black") 
*/

          // 범례
          for (k=0; k<ngroup; k++) {
            str = gvalueLabel[k];

            if (k==0) {
              chart.append("text")
                   .attr("font-size","12px")
                   .attr("font-family","sans-seirf")
                   .attr("stroke","black")
                   .attr("text-anchor","start")
                   .style("stroke",myColor[k])
                   .attr("x",x1 )
                   .attr("y",margin.top)
                   .style("text-anchor","end")
                   .text(str);
            }
            else {
              chart.append("text")
                   .attr("font-size","12px")
                   .attr("font-family","sans-seirf")
                   .attr("stroke","black")
                   .attr("text-anchor","start")
                   .style("stroke",myColor[k])
                   .attr("x",x1 + 2*bothBarGap )
                   .attr("y",margin.top)
                   .style("text-anchor","start")
                   .text(str);
            }
          }

          for (k=0; k<ngroup; k++) {
            y1 = margin.top;
            for (j=0; j<ndvalue; j++) tdata[j] = dataSet[k][j];

            if (k==0) { // 첫 그룹
              for (j=0; j<ndvalue; j++) {
                temp = (graphWidth/2-bothBarGap)*tdata[ndvalue-j-1] / freqMax;
                chart.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("x",x1)
                   .attr("y",margin.top + gapHeight + j*betweenbarHeight)
                   .attr("width",0)
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("x",x1-temp)
                   .attr("width",temp)
                   .attr("height",barHeight)
              }
            }
            else {  // 둘째 그룹    
              for (j=0; j<ndvalue; j++) {
                chart.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("x",x2)
                   .attr("y",margin.top + gapHeight + j*betweenbarHeight)
                   .attr("width","0px")                    // 최초 막대의 너비를 0 px 로 지정
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("width",(graphWidth/2-bothBarGap)*tdata[ndvalue-j-1]/freqMax)
                   .attr("height",barHeight)
              } // endof j
            } // endof else
          } // endof k
        } // endof 가로형
}

// 띠그래프 도수 제거 함수
function removeBandFreq() {
	 chart.selectAll("text.bandfreq").remove();
}

// 도수분포표와 교차표
function freqTable(numVar, tdvarNumber, ndvalue, dvarName, dataValue, dvalueLabel, ngroup, gvarName, gvalueLabel) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

        var row, header, sum, x, t, str, maxDeci;
        var i, j, k, g, ncol;
        var cell = new Array(10);

        table.style.fontSize = "13px";

        if (!rawData) { // 요약자료 도수분포표
          row  = table.insertRow(0);
          row.style.height ="40px";
          for (k=0; k<3; k++) {
            cell[k] = row.insertCell(k);
            cell[k].style.backgroundColor = "#eee";
            cell[k].style.textAlign = "center";
            cell[k].style.border = "1px solid black";
          }
          cell[0].innerHTML = svgStr[20][langNum];
          cell[1].innerHTML = svgStr[21][langNum];
          cell[2].innerHTML = "("+gvarName+")";
          cell[0].style.width ="120px";  

          row  = table.insertRow(1);
          row.style.height ="40px";
          for (g=0; g<ngroup+2; g++) {
            cell[g] = row.insertCell(g);
            cell[g].style.border = "1px solid black";
          }
          cell[0].innerHTML = svgStr[26][langNum]+" ("+dvarName+")";
          for (g=0; g<ngroup; g++) cell[g+1].innerHTML = gvalueLabel[g]; 
          cell[ngvalue+1].innerHTML = svgStr[23][langNum];   
          for (g=0; g<ngvalue+2; g++) {
            cell[g].style.width ="60px";
            cell[g].style.textAlign = "center";
            cell[g].style.backgroundColor = "#eee";
          }
          cell[0].style.width ="110px";

          // 선택된 변수중에서 소수점이하 최대 자리수
          maxDeci = 0;
          for (g=0; g<ngvalue; g++) {
            if(rvarDeci[tdvarNumber[g+1]-1] > maxDeci) maxDeci = rvarDeci[tdvarNumber[g+1]-1];
          }

          var totsum = 0;
          for (i=0; i<ndvalue; i++) {
            row = table.insertRow(i+2);
            for (g=0; g<ngvalue+2; g++) {
              cell[g] = row.insertCell(g);
              cell[g].style.border = "1px solid black";
            }
            cell[0].innerHTML = dvalueLabel[i];
            cell[0].style.textAlign = "center";
            cell[0].style.backgroundColor = "#eee";
            cell[0].style.width ="110px";
            sum = 0;
            for (g=0; g<ngvalue; g++) sum += dataSet[g][i];
            totsum += sum;
            for (g=0; g<ngvalue; g++) {
              if (maxDeci == 0) {
                cell[g+1].innerHTML = f0(dataSet[g][i]).toString()+"<br>"+f1(100*dataSet[g][i]/sum).toString()+"%";
              } else if (maxDeci == 1) {
                cell[g+1].innerHTML = f1(dataSet[g][i]).toString()+"<br>"+f1(100*dataSet[g][i]/sum).toString()+"%";
              } else {
                cell[g+1].innerHTML = f2(dataSet[g][i]).toString()+"<br>"+f1(100*dataSet[g][i]/sum).toString()+"%";
              }  
              cell[g+1].style.textAlign = "right";
            }
            if (maxDeci == 0) {
              cell[ngvalue+1].innerHTML = f0(sum).toString()+"<br>"+f0(100).toString()+"%";
            } else if(maxDeci == 1) {
              cell[ngvalue+1].innerHTML = f1(sum).toString()+"<br>"+f0(100).toString()+"%";
            } else {
              cell[ngvalue+1].innerHTML = f2(sum).toString()+"<br>"+f0(100).toString()+"%";
            }
            cell[ngvalue+1].style.textAlign = "right";
            cell[ngvalue+1].style.backgroundColor = "#eee";
          }// endof g

          row = table.insertRow(ndvalue+2);
          for (g=0; g<ngvalue+2; g++) {
            cell[g] = row.insertCell(g);
            cell[g].style.border = "1px solid black";
          }
          cell[0].innerHTML = svgStr[24][langNum];
          cell[0].style.textAlign = "center";
 
          for (g=0; g<ngvalue; g++) {
            sum = 0;
            for (i=0; i<ndvalue; i++) sum += dataSet[g][i];
            if (maxDeci == 0) {
                cell[g+1].innerHTML = f0(sum).toString()+"<br>"+f1(100*sum/totsum).toString()+"%";
            } else if (maxDeci == 1) {
                cell[g+1].innerHTML = f1(sum).toString()+"<br>"+f1(100*sum/totsum).toString()+"%";
            } else {
                cell[g+1].innerHTML = f2(sum).toString()+"<br>"+f1(100*sum/totsum).toString()+"%";
            }  
            cell[g+1].style.textAlign = "right";
          }  
          if (maxDeci == 0) {
            cell[ngvalue+1].innerHTML = f0(totsum).toString()+"<br>"+f0(100).toString()+"%";
          } else if (maxDeci == 1) {
            cell[ngvalue+1].innerHTML = f1(totsum).toString()+"<br>"+f0(100).toString()+"%";
          } else {
            cell[ngvalue+1].innerHTML = f2(totsum).toString()+"<br>"+f0(100).toString()+"%";
          }
       
          cell[ngvalue+1].style.textAlign = "right";
          for (g=0; g<ngvalue+2; g++) cell[g].style.backgroundColor = "#eee";

          row = table.insertRow(ndvalue+3);   // 공란
          row.style.height ="20px";

        } else if (ngroup < 2) { // ngroup=1일때는 도수분포표
          ncol = 4;
          sum  = 0;
          for (j=0; j<ndvalue; j++) sum += dataSet[0][j];

          row  = table.insertRow(0);
          row.style.height ="30px";
          for (k=0; k<3; k++) {
            cell[k] = row.insertCell(k);
            cell[k].style.backgroundColor = "#eee";
            cell[k].style.textAlign = "center";
            cell[k].style.border = "1px solid black";
          }
          cell[0].innerHTML = svgStr[25][langNum];
          cell[1].innerHTML = svgStr[26][langNum];
          cell[2].innerHTML = "("+dvarName+")";
          cell[0].style.width ="120px";

          row  = table.insertRow(1);
          for (k=0; k<ncol; k++) {
            cell[k] = row.insertCell(k);
            cell[k].style.width ="80px";
          }
          cell[0].innerHTML = svgStr[27][langNum];
          cell[1].innerHTML = svgStr[28][langNum];
          cell[2].innerHTML = svgStr[29][langNum];
          cell[3].innerHTML = svgStr[30][langNum];   
          for (k=0; k<ncol; k++) {
            cell[k].style.textAlign = "center";
            cell[k].style.backgroundColor = "#eee";
            cell[k].style.border = "1px solid black";
          }
          for (j=0; j<ndvalue; j++) {
            row = table.insertRow(j+2);
            for (k=0; k<ncol; k++) {
              cell[k] = row.insertCell(k);
              cell[k].style.border = "1px solid black";
            }
            if (dataValue[j] == dvalueLabel[j]) {
              cell[0].innerHTML = dataValue[j];
              cell[1].innerHTML = "";
            }
            else {
              cell[0].innerHTML = dataValue[j];
              cell[1].innerHTML = dvalueLabel[j];
            }
            cell[2].innerHTML = dataSet[0][j];
            cell[3].innerHTML = f1(100*dataSet[0][j]/sum);
            cell[0].style.textAlign = "left";
            cell[1].style.textAlign = "left";
            cell[2].style.textAlign = "right";
            cell[3].style.textAlign = "right";
          }

          row = table.insertRow(ndvalue+2);
          for (k=0; k<ncol; k++) {
            cell[k] = row.insertCell(k);
            cell[k].style.backgroundColor = "#eee";
            cell[k].style.border = "1px solid black";
          }
          cell[0].innerHTML = svgStr[24][langNum];
          cell[1].innerHTML = "";
          cell[2].innerHTML = sum;
          cell[3].innerHTML = "100";
          cell[0].style.textAlign = "center";
          cell[1].style.textAlign = "center";
          cell[2].style.textAlign = "right";
          cell[3].style.textAlign = "right";

          row = table.insertRow(ndvalue+3);
          row.style.height ="20px";
        }
        else { // ngroup>=2 일때는 교차표 원시자료 경우
          row  = table.insertRow(0);
          row.style.height ="40px";
          for (k=0; k<3; k++) {
            cell[k] = row.insertCell(k);
            cell[k].style.backgroundColor = "#eee";
            cell[k].style.textAlign = "center";
            cell[k].style.border = "1px solid black";
          }
          cell[0].innerHTML = svgStr[31][langNum];
          cell[1].innerHTML = svgStr[32][langNum];
          cell[2].innerHTML = "("+dvarName+")";
          cell[0].style.width ="120px";  

          row  = table.insertRow(1);
          row.style.height ="40px";
          for (k=0; k<ndvalue+2; k++) cell[k] = row.insertCell(k)
          cell[0].innerHTML = svgStr[33][langNum]+" ("+gvarName+")";
          for (k=1; k<ndvalue+1; k++) cell[k].innerHTML = dvalueLabel[k-1]; 
          cell[ndvalue+1].innerHTML = svgStr[23][langNum];   
          for (k=0; k<ndvalue+2; k++) {
            cell[k].style.width ="60px";
            cell[k].style.textAlign = "center";
            cell[k].style.backgroundColor = "#eee";
            cell[k].style.border = "1px solid black";
          }
          cell[0].style.width ="110px";

          var totsum = 0;
          for (g=0; g<ngroup; g++) {
            row = table.insertRow(g+2);
            for (k=0; k<ndvalue+2; k++) {
              cell[k] = row.insertCell(k)          
              cell[k].style.border = "1px solid black";
            }
            cell[0].innerHTML = gvalueLabel[g];
            cell[0].style.textAlign = "center";
            cell[0].style.backgroundColor = "#eee";
            cell[0].style.width ="110px";
            sum = 0;
            for (k=1; k<ndvalue+1; k++) sum += dataSet[g][k-1];
            totsum += sum;
            for (k=1; k<ndvalue+1; k++) {
              cell[k].innerHTML = f0(dataSet[g][k-1]).toString()+"<br>"+f1(100*dataSet[g][k-1]/sum).toString()+"%";
              cell[k].style.textAlign = "right";
            }
            cell[ndvalue+1].innerHTML = f0(sum).toString()+"<br>"+(100).toString()+"%";
            cell[ndvalue+1].style.textAlign = "right";
            cell[ndvalue+1].style.backgroundColor = "#eee";
          }// endof g

          row = table.insertRow(ngroup+2);
          for (k=0; k<ndvalue+2; k++) {
            cell[k] = row.insertCell(k)
            cell[k].style.border = "1px solid black";
          }
          cell[0].innerHTML = svgStr[24][langNum];
          cell[0].style.textAlign = "center";
 
          for (k=1; k<ndvalue+1; k++) {
            sum = 0;
            for (g=0; g<ngroup; g++) sum += dataSet[g][k-1];
            cell[k].innerHTML = f0(sum).toString()+"<br>"+f1(100*sum/totsum).toString()+"%";
            cell[k].style.textAlign = "right";
          }  
          cell[ndvalue+1].innerHTML = f0(totsum).toString()+"<br>"+(100).toString()+"%";
          cell[ndvalue+1].style.textAlign = "right";
          for (k=0; k<ndvalue+2; k++) cell[k].style.backgroundColor = "#eee";
          row = table.insertRow(ngroup+3);
          row.style.height ="20px";

        } 

}


// sheet Print를 위한 데이터 테이블
function dataTable() {
//    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
//    loc.appendChild(table);
        var i, k;
        var row;
        var cell = new Array(numCol+1);

        table.style.fontSize = "13px";

        row  = table.insertRow(0);
        row.style.height ="40px";
        for (k=0; k<numCol+1; k++) {
            cell[k] = row.insertCell(k);
            cell[k].style.backgroundColor = "#eee";
            cell[k].style.textAlign = "center";
            cell[k].style.width ="50px"; 
        }
        for (k=0; k<numCol; k++) {
            cell[k+1].innerHTML = rvarName[k];
        }

        for (i=0; i<numRow; i++) {
          row = table.insertRow(i+1);
          for (k=0; k<numCol+1; k++) {
            cell[k] = row.insertCell(k);
            cell[k].style.textAlign = "center";
          }
          cell[0].style.backgroundColor = "#eee";
          cell[0].innerHTML = (i+1).toString();
          for (k=0; k<numCol; k++) {
            cell[k+1].innerHTML = rvar[k][i];
          }
        }
    return table;
}



// 원그래프 함수 --------------------------------------------------------------
function drawPieChart(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet)  {
        var i, j, k, tx, ty, str;
        var radiusIn, radiusOut;
        var datafreq = new Array(ndvalue);

        var oneHeight = graphHeight / ngroup;
        if (PieChart) {
          radiusIn  = 0;
          radiusOut = 0.9*oneHeight/2;
        }
        else {
          radiusOut = 0.9*oneHeight / 2;
          radiusIn  = radiusOut / 3;
        }

        var pie = d3.pie();
        var arc = d3.arc().innerRadius(radiusIn).outerRadius(radiusOut);

        drawTitle(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);

        tx = margin.left + graphWidth/2;
        for (k=0; k<ngroup; k++) {   
          ty  = margin.top  + oneHeight/2 + oneHeight*k;	     
          for (i=0; i<ndvalue; i++) datafreq[i] = dataSet[k][i];

          var piechart = chart.append("g")
                  .attr("class", "piechart")
	          .attr("id", "piechart" + k);
           // 범례
           if (ngroup > 1) {
             str = gvalueLabel[k];
             chart.append("text")
                  .attr("font-size","12px")
                  .attr("font-family","sans-seirf")
                  .attr("stroke","black")
                  .attr("text-anchor","start")
                  .style("stroke",myColor[k])
                  .attr("x",margin.left + graphWidth + bufferLegend)
                  .attr("y",margin.top + oneHeight/2 + oneHeight*k)
                  .text(str)
           }

          var pieSlice = piechart.selectAll("g")
                  .data(pie(datafreq))
                  .enter()
                  .append("g")
                  .attr("transform", "translate("+tx+","+ty+")")

          pieSlice.append("path")
                .attr("class","pie")
                .attr("d",arc)
                .style("fill",function(d,i){ return myColor[i];})
                .transition()
                .delay(function(d,i){ return i*200;})
                .duration(1000)
              //  .easeLinear(0.5)
                .attrTween("d", function(d,i) {
                  var interpolate = d3.interpolate(
                    { startAngle:d.startAngle, endAngle: d.startAngle },
                    { startAngle:d.startAngle, endAngle: d.endAngle }
                  );
                  return function(t) { return arc(interpolate(t));
                  }
                })
          pieSlice.append("text")
                  .attr("font-size","10px")
                  .attr("font-family","sans-seirf")
                  .attr("stroke","white")
                  .attr("text-anchor","middle")
                  .attr("transform",function(d,i){ return "translate("+arc.centroid(d)+")";})
                  .text(function(d,i){ return dvalueLabel[i]+": "+d.value;})
        } 
}

      
// 띠그래프 함수
function drawBandGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet) {
    
        var i, j, k, sum, tx, ty, t2, str, oneWidth;
        var tdata     = new Array(ndvalue);
        var tratio    = new Array(ndvalue);
        var bandWidth = new Array(ndvalue);
        var bandX     = new Array(ndvalue);

        var oneHeight = graphHeight / ngroup;
        var oneline   = 6;
        var bandHeight= oneHeight*2/3;

        drawTitle(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);

        for (k=0; k<ngroup; k++) {
           // 범례
           if (ngroup > 1) {
             str = gvalueLabel[k];
             chart.append("rect")
                  .style("fill",myColor[k])
                  .attr("x",margin.left + graphWidth + bufferLegend - 10)
                  .attr("y",margin.top + bandHeight/2 + oneHeight*k -5)
                  .attr("width",8)
                  .attr("height",8)

             chart.append("text")
                  .attr("font-size","12px")
                  .attr("font-family","sans-seirf")
                  .attr("stroke","black")
                  .attr("text-anchor","start")
                  .style("stroke",myColor[k])
                  .attr("x",margin.left + graphWidth + bufferLegend + 5)
                  .attr("y",margin.top + bandHeight/2 + oneHeight*k +5)
                  .text(str)
           }

           sum = 0;   
           for (i=0; i<ndvalue; i++) {
             tdata[i]  = dataSet[k][i];
             sum      += tdata[i];
           } 
           for (i=0; i<ndvalue; i++) {
             tratio[i] = 100*tdata[i]/sum;
             bandWidth[i]  = graphWidth*tdata[i]/sum;
           }
           bandX[0] = margin.left;
           for (i=1; i<ndvalue; i++) {
             bandX[i]  = bandX[i-1]  + bandWidth[i-1];
           }

           ty = margin.top + bandHeight/2 + k*oneHeight;
           t2 = margin.top + bandHeight + k*oneHeight + 13;
           for (j=0; j<ndvalue; j++) {
             chart.append("rect")
                    .attr("x",bandX[j])
                    .attr("y",margin.top + k*oneHeight)
                    .attr("width","0px")                    // 최초 막대의 너비를 0 px 로 지정
                    .transition()                           // 애니매이션 효과 지정
                    .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                    .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                    .attr("width",bandWidth[j])
                    .attr("height",bandHeight)
                    .style("fill",myColor[j])
             if (checkBandFreq) {   // 도수와 % 쓰기
               chart.append("text")
                    .attr("x",bandX[j]+bandWidth[j]/2)
                    .attr("y",ty+5)
                    .text(tdata[j])
                    .attr("font-size","10px")
                    .attr("font-family","sans-seirf")
                    .attr("text-anchor","middle")
                    .style("stroke","white")
               chart.append("text")
                    .attr("font-size","10px")
                    .attr("font-family","sans-seirf")
                    .attr("text-anchor","middle")
                    .attr("stroke",myColor[j])
                    .attr("x",bandX[j]+bandWidth[j]/2)
                    .attr("y",t2)
                    .text(f1(tratio[j])+"%")
             }
           } // endof j

        } // endof k

        // 분석변량의 색 설명  bandfreq
        if (ndvalue <= oneline) oneWidth = graphWidth/ndvalue;
        else oneWidth = graphWidth / oneline;

        for (j=0; j<ndvalue; j++) {
            if (dvalueLabel == null) str = (j+1).toString();
            else str = dvalueLabel[j];
            tx = margin.left + 20 + (j%oneline)*oneWidth
            ty = margin.top + graphHeight + Math.floor(j/oneline)*15;
            chart.append("rect")
                 .style("fill",myColor[j])
                 .attr("x",tx)
                 .attr("y",ty)
                 .attr("width",8)
                 .attr("height",8)
            chart.append("text")
                 .attr("font-size","12px")
                 .attr("font-family","sans-seirf")
                 .attr("text-anchor","start")
                 .attr("stroke",myColor[j])
                 .attr("x",tx + 13)
                 .attr("y",ty + 8)
                 .text(str);
        }

}


// 꺽은선 그래프 함수
function drawLineGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMin, freqMax, currentLabel, currentDataSet, dataSet) {

        var i, j, k;
        var ydata = new Array(ndvalue);

        var oneHeight        = graphHeight;

        var betweenbarWidth  = graphWidth / ndvalue;   // 막대와 막대 사이의 너비
        var barWidth         = betweenbarWidth * 0.6;  // 막대의 너비
        var gapWidth         = betweenbarWidth * 0.2;
        var betweenbarHeight = oneHeight / ndvalue;    // 막대와 막대 사이의 높이
        var barHeight        = betweenbarHeight * 0.6; // 막대의 높이
        var gapHeight        = betweenbarHeight * 0

        var ydata = new Array(ndvalue);

        // 축 그리기
        drawTitle(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);
        if (ngroup == 1) drawXaxis(ndvalue, currentLabel, betweenbarWidth, barWidth, gapWidth)
        else drawXaxis(ndvalue, dvalueLabel, betweenbarWidth, barWidth, gapWidth)
        drawYaxis(freqMin, freqMax);

        // 점 그리기
        if (ngroup == 1) {
          for (i=0; i<ndvalue; i++) ydata[i] = currentDataSet[i];
          drawLine(0, freqMin, freqMax, ydata, betweenbarWidth, barWidth, gapWidth ) 
        }
        else {
          for (k=0; k<ngroup; k++ ) {
            for (i=0; i<ndvalue; i++) ydata[i] = dataSet[k][i];
            drawLine(k, freqMin, freqMax, ydata, betweenbarWidth, barWidth, gapWidth ) 
          }
        }

        // 범례 그리기
        if (ngroup > 1) drawLegend(gvalueLabel);

}

// x축 그리기 , x축 레이블
function drawXaxis(ndvalue, dvalueLabel, betweenbarWidth, barWidth, gapWidth) {
        var x1, x2, y1, y2, tx, ty;
        // draw x축
        y1 = margin.top  + graphHeight;
        y2 = y1 + 5;
        chart.append("line")  // x축 아래
             .attr("x1",margin.left)
             .attr("x2",margin.left + graphWidth)
             .attr("y1",y1)
             .attr("y2",y1) 
             .style("stroke","black") 
        chart.append("line")  // x축 위
             .attr("x1",margin.left)
             .attr("x2",margin.left + graphWidth)
             .attr("y1",margin.top)
             .attr("y2",margin.top) 
             .style("stroke","black") 

        // draw x축 레이블
        var angle, str;
        ty = y1;
        if (ndvalue < 10)     {angle = 0;  str = "barname";  y1 =  svgHeight - margin.bottom + 15; }
        else if(ndvalue < 30) {angle = 30; str = "barnames"; y1 =  svgHeight - margin.bottom + 10;}
        else                  {angle = 90; str = "barnames"; y1 =  svgHeight - margin.bottom + 5;}

        for (var i=0; i<ndvalue; i++) {
          tx = margin.left + gapWidth + barWidth/2 + i*betweenbarWidth;
          if (ndvalue < 10)     {x1 = margin.left + gapWidth + barWidth/2 + i*betweenbarWidth;}
          else if(ndvalue < 30) {x1 = margin.left + gapWidth + i*betweenbarWidth;}
          else                  {x1 = margin.left + gapWidth + i*betweenbarWidth;}

          chart.append("line")   // tick
               .attr("x1",tx)
               .attr("x2",tx)
               .attr("y1",ty)
               .attr("y2",ty+5) 
               .style("stroke","black") 
               .style("stroke-width","0.5")    
          chart.append("text")   // x축 레이블
               .attr("text-anchor","middle")
               .attr("font-size","9px")
               .attr("font-family","sans-serif")
               .attr("x", x1)
               .attr("y", y1)
               .attr("transform","rotate("+angle+","+x1+","+y1+")  ")
               .text(dvalueLabel[i])
        } // endof i

}

// y축 그리기
function drawYaxis(freqMin, freqMax) {
        var yScale  = d3.scaleLinear().domain([freqMax,freqMin]).range([0, graphHeight]);
        chart.append("g")
             .attr("transform","translate("+margin.left+","+margin.top+")")
             .call(d3.axisLeft(yScale))   
        chart.append("line")  // y축 우측
               .attr("x1",margin.left + graphWidth)
               .attr("x2",margin.left + graphWidth)
               .attr("y1",margin.top)
               .attr("y2",margin.top + graphHeight) 
               .style("stroke","black") 
}

// 선그래프 선그리기 함수
function drawLine(k, freqMin, freqMax, ydata, betweenbarWidth, barWidth, gapWidth ) {
        var x1 = margin.left + gapWidth + barWidth/2;
        var y1 = margin.top  + graphHeight - graphHeight*(ydata[0]-freqMin)/(freqMax-freqMin);
        // 첫째 점
        chart.append("circle").attr("cx",x1).attr("cy",y1).attr("r",4).style("fill",myColor[k])    
             .append("title").text(ydata[0]);

        for (j=1; j<ndvalue; j++) {  // 둘째 이후 애니메이션
          x2 = margin.left + gapWidth + barWidth/2 + j*betweenbarWidth;
          y2 = margin.top  + graphHeight - graphHeight*(ydata[j]-freqMin)/(freqMax-freqMin);
	  chart.append("circle")
//               .attr("cx", x1)
//               .attr("cy", y1)
               .style("fill",myColor[k])
//               .transition()                           // 애니매이션 효과 지정
//               .delay(function(d,i) {return i*200;})   // 0.5초마다 그리도록 대기시간 설정
//               .duration(1000)   
               .attr("cx", x2)
               .attr("cy", y2)       
               .attr("r", 4)
               .append("title")
               .text(ydata[j])

          chart.append("line")
               .attr("x1",x1)
               .attr("x2",x2)
               .attr("y1",y1)
               .attr("y2",y2) 
               .style("stroke",myColor[k]) 
          x1 = x2;
          y1 = y2;
        } // endof j
}

// 범례
function drawLegend(gvalueLabel) {
        var x1 = margin.left + graphWidth + bufferLegend;
        var y1;

        for (k=0; k<ngroup; k++) {
          str = gvalueLabel[k];
          y1 = margin.top + 20 + k*20;
          chart.append("circle")
               .attr("cx",x1-5)
               .attr("cy",y1)
               .style("fill",myColor[k])
               .attr("r", 4);
          chart.append("text")
               .attr("font-size","12px")
               .attr("font-family","sans-seirf")
               .attr("stroke","black")
               .attr("text-anchor","start")  
               .attr("x",x1+5)
               .attr("y",y1+5)
               .text(str)
               .style("stroke",myColor[k])
        } // endof k
}

// *********  eStatM.js **************************************************************************************************
//  eStatM.js 
// =====================================================================================
// 연속형 그래프 함수 모음 **************************************************************
// =====================================================================================

function dataClassifyM() {
      // 자료가 없으면 경고
      checkData = true;
      for (k = 0; k < numVar; k++) {
        if (tdobs[k] == 0) {
          checkData = false;
          alert(alertMsg[1][langNum]);
          return;
        }
        if (graphNum == 15 && tdobs[k] > 200) { // 점그림 데이터수 제한
          checkData = false;
          alert(alertMsg[8][langNum]);
          return;
        }
        if (graphNum == 17 || graphNum == 18) { // 줄기잎 그림 데이터수 제한
          if(tdobs[k] > 100) { 
            checkData = false;
            alert(alertMsg[9][langNum]);
            return;
          }
        }
      }
      // 변량 선택 안하면 경고
      checkVarSelect = true;
      if (numVar == 0) {
        checkVarSelect = false;
        alert(alertMsg[2][langNum]);
      }
      else if (numVar > 2) {
        checkVarSelect = false;
        alert(alertMsg[7][langNum]);
        return;
      }

      // 초기화 - 그래프를 여러 번 그리거나 변수를 추가할때 필요
      for (k = 0; k < rowMax; k++) {
        gvar[k]        = null;
        gdataValue[k]  = null;
        gvalueLabel[k] = null;
        dvar[k]        = null;
        dataValue[k]   = null;
        dvalueLabel[k] = null;
      } 

      // gvar, dvar 변량값, 도수 계산  -- 도수분포표 -------------------------  
      if (numVar < 2) { // 변량 하나는 원시자료
        checkMissing = false;
        for (i = 0; i < tdobs[0]; i++) {
            if( tdvar[0][i] == null || tdvar[0][i] == "" || tdvar[0][i] == NaN) {  
              alert(alertMsg[3][langNum]);
              checkMissing = true;
              return; 
            }
        }  

        dobs        = tdobs[0];
        dvarNumber  = tdvarNumber[0];
        dvarName    = tdvarName[0];
        ndvalue     = tdvalueNum[0]
        for (k = 0; k < ndvalue; k++) {
          dataValue[k] = tdvalue[0][k];
          dvalueLabel[k] = tdvalueLabel[0][k];
        } 
        for (i = 0; i < dobs; i++) dvar[i] = tdvar[0][i];

        ngroup      = 1;
        gobs        = dobs;
        gvarNumber  = "";
        gvarName    = "";
        for (k=0; k<ngroup; k++) gvalueLabel[k] = null;
        for (i=0; i<gobs; i++) {
          gvar[i]  = 1;
          dataA[i] = gvar[i];
        }  
        ngvalue = sortAscendM(dobs, dataA, gdataValue, gvalueFreq, dataY);

        rawData = true;

        // numeric check 
        checkNumeric = true;
        for (i=0; i<dobs; i++) {
            if (isNaN(dvar[i])) {
              checkNumeric = false;
              alert(alertMsg[12][langNum]);
              return;
            } // endof if
            dvar[i] = parseFloat(dvar[i]);
        } // endof i

      } 
      else { // 두 개 이상의 변량은 첫째는 그룹변량 둘째는 분석변량
        // check missing
        checkMissing = false;
        for (k=1; k<numVar; k++) {
          if (tdobs[k] != tdobs[0]) {
            checkMissing = true;
            alert(alertMsg[13][langNum]);
            return;
          }
        }

        gobs        = tdobs[0];
        gvarNumber  = tdvarNumber[0];
        gvarName    = tdvarName[0];
        ngvalue     = tdvalueNum[0];
        for (k=0; k<ngvalue; k++) {
          gdataValue[k]  = tdvalue[0][k];

          if ( tdvalueLabel[0][k] == null ) {
            if (isNaN(tdvalue[0][k])) gvalueLabel[k] = tdvalue[0][k]; 
            else gvalueLabel[k] = svgStr[18][langNum]+(k+1).toString();
          }
          else {
            gvalueLabel[k] = tdvalueLabel[0][k];
          }
        } 
        for (i = 0; i < gobs; i++) gvar[i] = tdvar[0][i];       

        dobs        = tdobs[1];
        dvarNumber  = tdvarNumber[1];
        dvarName    = tdvarName[1];
        ndvalue     = tdvalueNum[1]
        for (k = 0; k < ndvalue; k++) {
          dataValue[k]   = tdvalue[1][k];
          dvalueLabel[k] = tdvalueLabel[1][k];
        } 
        for (i = 0; i < dobs; i++) dvar[i] = tdvar[1][i];

        // check 요약자료 => 분산분석 자료 검정
        rawData   = true;
        checkData = true;    
        if (gobs == ngvalue) { // 요약자료
          rawData = false;
          ngroup  = ngvalue;
          if (graphNum > 14) { 
            checkData = false;
            alert(alertMsg[14][langNum]);
            return;
          }
        }
 
        // numeric check 
        checkNumeric = true;
        for (i=0; i<dobs; i++) {
            if (isNaN(dvar[i])) {
              checkNumeric = false;
              alert(alertMsg[15][langNum]);
              return;
            } // endof if
            dvar[i] = parseFloat(dvar[i]);
        } // endof i

      } // endof else

      // gvar에서 ngroup 게산
      ngroup = ngvalue;
      checkData = true;
      if (graphNum == 23 || graphNum == 24) {
        if (ngroup > 2) {
          alert(alertMsg[16][langNum]);
          checkData = false;
          return;
        }
      }

      ngroup1 = ngroup + 1;
      oneHeight = graphHeight / ngroup;

      // gvar 변량값별 dvar 각 값 rearrange ----------------   
      if (ngroup == 1) {
        nobs[0] = dobs;
        for (i=0; i<dobs; i++) dataSet[0][i] = dvar[i];
      }
      else { // 그룹이 있을 경우
        for (k=0; k<ngroup; k++) nobs[k] = 0;   
        for (i=0; i<dobs; i++) {
          for (j=0; j<ngroup; j++) {
            if (gvar[i] == gdataValue[j]) {k=j; break;}  // gvar[i]의 gdataValue에서 위치파악
          }        
          dataSet[k][nobs[k]] = dvar[i];
          nobs[k]++;
        }
      }

}

function dataClassifyS() {
        // 자료가 없으면 경고
        checkData = true;
        for (k = 0; k < numVar; k++) {
          if (tdobs[k] == 0) {
            checkData = false;
            alert(alertMsg[1][langNum]);
            return;
          }
        }
        // 변량 선택 안하면 경고
        checkVarSelect = true;
        if (numVar == 0) {
          checkVarSelect = false;
          alert(alertMsg[2][langNum]);
          return;
        }
        else if (numVar == 1) {
          checkVarSelect = false;
          alert(alertMsg[17][langNum]);
          return;
        }
        else if (numVar > 3) {
          checkVarSelect = false;
          alert(alertMsg[18][langNum]);
          return;
        }

        // check missing
        checkMissing = false;
        for (k=1; k<numVar; k++) {
          if (tdobs[k] != tdobs[0]) {
            checkMissing = true;
            alert(alertMsg[4][langNum]);
            return;
          }
        }
      
        if (numVar == 2) { // x축 y축 변량만 있는 경우
          xobs        = tdobs[0];
          xvarNumber  = 2;
          xvarName    = tdvarName[0];
          xvalueLabel = [];
          xdata       = tdvar[0];

          // numeric check 
          checkNumeric = true;
          for (i=0; i<xobs; i++) {
            if (isNaN(xdata[i])) {
              checkNumeric = false;
              alert(alertMsg[19][langNum]);
              return;
            } // endof if
          } // endof i

          yobs        = tdobs[1];
          yvarNumber  = 3;
          yvarName    = tdvarName[1];
          yvalueLabel = [];
          ydata       = tdvar[1];
          // numeric check 
          for (i=0; i<yobs; i++) {
            if (isNaN(ydata[i])) {
              checkNumeric = false;
              alert(alertMsg[20][langNum]);
              return;
            } // endof if
          } // endof i

          for (i=0; i<xobs; i++) {
            xdata[i] = parseFloat(xdata[i]);
            ydata[i] = parseFloat(ydata[i]);
          }
  
          // 그룹변량 없는것 처리 : 모두 1
          gvarNumber  = 1;
          gvarName    = "";
          gvalueLabel[0] = null;
          for (j=0; j<xobs; j++) gdata[j] = 1;
        }
        else if (numVar == 3) { // group, x축 y축 변량이 있는 경우

          gobs        = tdobs[0];
          gvarNumber  = tdvarNumber[0];
          gvarName    = tdvarName[0];
          ngvalue     = tdvalueNum[0]
          for (k=0; k<ngvalue; k++) {
            gdataValue[k]  = tdvalue[0][k];

            if ( tdvalueLabel[0][k] == null ) {
              if (isNaN(tdvalue[0][k])) gvalueLabel[k] = tdvalue[0][k]; 
              else gvalueLabel[k] = svgStr[18][langNum]+(k+1).toString();
            }
            else {
              gvalueLabel[k] = tdvalueLabel[0][k];
            }
          } 
          for (i=0; i<gobs; i++) { // 그룹변량의 컬러지정
            gdata[i] = tdvar[0][i]; 
            for (k=0; k<ngvalue; k++) {
              if (gdata[i] == gdataValue[k]) {gcolor[i]=k; break;}
            }
          }

          xobs        = tdobs[1];
          xvarNumber  = tdvarNumber[1];
          xvarName    = tdvarName[1];
          // numeric check 
          checkNumeric = true;
          for (i=0; i<xobs; i++) {
            xvalueLabel[i] = null;
            xdata[i] = tdvar[1][i];
            if (isNaN(xdata[i])) {
              checkNumeric = false;
              alert(alertMsg[19][langNum]);
              return;
            } // endof if
          } // endof i

          yobs        = tdobs[2];
          yvarNumber  = tdvarNumber[2];
          yvarName    = tdvarName[2];
          // numeric check 
          for (i=0; i<yobs; i++) {
            yvalueLabel[i] = null;
            ydata[i] = tdvar[2][i];
            if (isNaN(ydata[i])) {
              checkNumeric = false;
              alert(alertMsg[20][langNum]);
              return;
            } // endof if
          } // endof i

          for (i=0; i<xobs; i++) {
            xdata[i] = parseFloat(xdata[i]);
            ydata[i] = parseFloat(ydata[i]);
          }
        }
        
        // 시트의 기타 데이터가 null로 되어있어 NaN로 수정
        for (i=xobs; i<rowMax; i++) {
            gdata[i] = NaN;
            xdata[i] = NaN;
            ydata[i] = NaN;
        }

}
   
// Find Maximum
function gmax(ngroup, maxi) {
      var gxmax = maxi[0];
      for (var k=1; k<ngroup; k++) {
        if (gxmax < maxi[k]) gxmax = maxi[k];
      }
      return gxmax;
}

// Find Minimum
function gmin(ngroup, mini) {
      var gxmin = mini[0];
      for (var k=1; k<ngroup; k++) {
        if (gxmin > mini[k]) gxmin = mini[k];
      }
      return gxmin
}

// Sorting in ascending and count each value frequency
function sortAscendM(dobs, dataA, dataValue, dvalueFreq, dataY) {
        var i, j;
        var nvalue = 0;
        for (i=0; i<dobs-1; i++) {
          for (j=i; j<dobs; j++) {
            if(dataA[i] > dataA[j]) {
              temp     = dataA[i];  
              dataA[i] = dataA[j];  
              dataA[j] = temp;     
            }
          }
        } 
        for(i=0; i<dobs; i++) {dvalueFreq[i]=0;} 
        dataValue[nvalue]  = dataA[0];  
        dvalueFreq[nvalue] = 1;   
        nvalue = 0;
        dataY[nvalue] = 1;
        for (i=1; i<dobs; i++) {
          if (dataA[i] == dataA[i-1]) {
            dvalueFreq[nvalue]++;
          } 
          else {
            nvalue++;
            dataValue[nvalue] = dataA[i];
            dvalueFreq[nvalue]++;
          }
          dataY[i] = dvalueFreq[nvalue];
        }
        nvalue++;
        return nvalue;
}

// Counting frequency of each histogram interval
function HistIntervalFreq(tobs, nvalueH, dataA, dataValueH, dvalueFreq) {
        var i,j,k;
        for(i=0; i<=nvalueH+2; i++) {dvalueFreq[i]=0;} 
        for (i=0; i<tobs; i++) {
//          if (nvalueH > tobs) document.write(" nvalueH > nobs : wrong <p>" );
          k = 1;
          for (j=k; j<=nvalueH+1; j++) {
            if (dataA[i] < dataValueH[j]) {
              dvalueFreq[j]++;
              break;
            } 
            else {k++;}
          } // endof j
        } // endof i
}

// Statistics for array in tdata[i], i=0,..,tobs-1 
function TotalStat(tobs, tdata, tstat) {
      var i;
      var sum, sqsum, tavg, tstd, tmini, tQ1, tmedian, tQ3, tmaxi;
      var dataA = new Array(tobs);

      for (i=0; i<tobs; i++) dataA[i]=tdata[i];
      sortAscendM(tobs, dataA, dataValue, dvalueFreq, dataY);
      for (i=0; i<tobs; i++) dataA[i] = parseFloat(dataA[i]);

      sum     = dataA[0];
      for (i=1; i<tobs; i++) {sum += dataA[i];}
      tavg = sum/tobs;
      sqsum  = 0;
      for (i=0; i<tobs; i++) {
          temp   = dataA[i] - tavg;
          sqsum += temp*temp;
      } // endof i
      tstd = Math.sqrt(sqsum/tobs);
      tmini   = dataA[0];
      tmaxi   = dataA[tobs-1];
      tQ1     = d3.quantile(dataA, 0.25);
      tmedian = d3.quantile(dataA, 0.5);
      tQ3     = d3.quantile(dataA, 0.75);
      tstat[0] = tobs;
      tstat[1] = tavg;
      tstat[2] = tstd;
      tstat[3] = tmini;
      tstat[4] = tQ1;
      tstat[5] = tmedian;
      tstat[6] = tQ3;
      tstat[7] = tmaxi;
}

// 각 그룹의 통계량 계산 mini[ngroup] ... std[ngroup]에는 total statistic
function GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, std) {
      var i, j, k, sum, sqsum, temp;
      var tobs,tavg, tstd, tmini, tQ1, tmedian, tQ3, tmaxi;
      for (k=0; k<ngroup; k++) {
        tobs = nobs[k];
        var tdata = new Array(tobs);
        var dataA = new Array(tobs);
        for (i=0; i<tobs; i++) tdata[i] = dataSet[k][i];

        for (i=0; i<tobs; i++) dataA[i]=tdata[i];
        sortAscendM(tobs, dataA, dataValue, dvalueFreq, dataY);

        sum     = dataA[0];
        for (i=1; i<tobs; i++) {sum += dataA[i];}
        avg[k] = sum/tobs;
        sqsum  = 0;
        for (i=0; i<tobs; i++) {
          temp   = dataA[i] - avg[k];
          sqsum += temp*temp;
        } // endof i
        std[k] = Math.sqrt(sqsum/tobs);
        mini[k]   = dataA[0];
        maxi[k]   = dataA[tobs-1];
        Q1[k]     = d3.quantile(dataA, 0.25);
        median[k] = d3.quantile(dataA, 0.5);
        Q3[k]     = d3.quantile(dataA, 0.75);
      } // endof k
    
}


// 연속형 그래프 주제목 쓰기 함수
function drawTitleM(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName) { 
        var str, gstr;

        // 주제목
        if (mTitle[graphNum] == "") {
          if (ngroup == 1) str = dvarName+svgStr[19][langNum]+iTitle[graphNum];
          else str = "("+svgStr[18][langNum]+" "+gvarName+ ") " + " "+dvarName+svgStr[19][langNum]+iTitle[graphNum];
//          mTitle[graphNum] = str;
        }
        else str = mTitle[graphNum];
    
        chart.append("text")
             .attr("x",margin.left + titleBuffer)
             .attr("y",margin.top/2 + 10)
             .attr("font-size","17px")
             .attr("font-family","sans-seirf")
             .attr("stroke","black")
             .attr("text-anchor","middle")
             .text(str)
}



// 점그래프 함수 ----------------------------------------------------------------------------------
function drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName) {

        var i, j, k, tobs, temp, tlabel;
        var sx, sy, tx, ty, x1, x2, y1, y2;
        var nvalue, freqmax;
        var gxmin, gxmax, gxrange, height
        var oneHeight = graphHeight / ngroup;
        var tdata     = new Array(rowMax);
        var dataA     = new Array(rowMax);
        var dataValue = new Array(rowMax);
        var dvalueFreq= new Array(rowMax);
        var dataY     = new Array(rowMax);

        var buffer      = 0;
        var radius      = 4;

        // 점그래프 전체 데이터 최소 최대 계산
        temp    = (parseFloat(tstat[7]) - parseFloat(tstat[3])) / 10;  // (전체 최대 - 최소) / 10  : 그래프 양 끝쪽 buffer 
        gxmin   = parseFloat(tstat[3]) - temp;
        gxmax   = parseFloat(tstat[7]) + temp;
        gxrange = gxmax - gxmin;

        // 전체 제목
        drawTitleM(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);

        // X축 제목
        chart.append("text")
             .attr("font-size","12px")
             .attr("font-family","sans-seirf")
             .attr("stroke","black")
             .attr("text-anchor","middle")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
             .text(dvarName)

        // 그룹별 점그래프
        for (k=0; k<ngroup; k++) {
          // 범례
          if (ngroup > 1) {
            str = gvalueLabel[k];  
            chart.append("text")
                 .attr("font-size","12px")
                 .attr("font-family","sans-seirf")
                 .attr("stroke","black")
                 .attr("text-anchor","start")
                 .style("stroke",myColor[k])
                 .attr("x",margin.left + graphWidth + 20)
                 .attr("y",margin.top + oneHeight/2 + oneHeight*k)
                 .text(str);
          }

          tobs = nobs[k];
          for (i=0; i<tobs; i++) tdata[i] = dataSet[k][i];

          for (i=0; i<tobs; i++) dataA[i]=tdata[i];
          nvalue = sortAscendM(tobs, dataA, dataValue, dvalueFreq, dataY);
  
          freqmax = gmax(nvalue,dataY);         // max of dot frequency
     
          // x축 선그리기 
          ty = margin.top + k*oneHeight;
          chart.append("line").attr("x1",margin.left).attr("x2",margin.left + graphWidth)
             .attr("y1",ty).attr("y2",ty) 
             .style("stroke","black") 
          drawDotXaxis(gxmin, gxmax, graphWidth, graphHeight, buffer)

          // y축 선그리기 
          x1 = margin.left;
          x2 = margin.left;
          y1 = margin.top;
          y2 = margin.top + graphHeight;
          chart.append("line").attr("x1",x1).attr("x2",x2).attr("y1",y1).attr("y2",y2).style("stroke","black") 
          x1 += graphWidth;
          chart.append("line").attr("x1",x1).attr("x2",x1).attr("y1",y1).attr("y2",y2).style("stroke","black") 

          // 점그리기
          sx = margin.left + graphWidth/2;
          sy = margin.top; 
          for (j=0; j<tobs; j++) {
            tx = margin.left + graphWidth*(dataA[j]-gxmin)/gxrange;
            ty = margin.top  + (k+1)*oneHeight - dataY[j]*2*radius;
            chart.append("circle")
               .attr("class","circle")
               .attr("tooltip","circle")
               .style("fill",myColor[k])
               .attr("cx", sx)
               .attr("cy", sy)
               .attr("r", radius)
               .transition()                           // 애니매이션 효과 지정
               .delay(function(d,i) {return i*200;})   // 0.5초마다 그리도록 대기시간 설정
               .duration(1000)                         // 2초동안 애니매이션이 진행되도록 설정
               .attr("cx", tx)
               .attr("cy", ty)
           } // endof j

        } // endof k
      
        // return values  
        tstat[11] = gxmin;
        tstat[12] = gxmax;
        tstat[13] = graphWidth;
        tstat[14] = graphHeight;
 
}

// 점그래프 x축 눈금 표시
function drawDotXaxis(gxmin, gxmax, graphWidth, graphHeight, buffer) {
        var xScale = d3.scaleLinear().domain([gxmin,gxmax]).range([0,graphWidth])
        var ty = margin.top + graphHeight - buffer;
        chart.append("g")
           .attr("transform","translate("+margin.left+","+ty+")")
           .call(d3.axisBottom(xScale))                    // 눈금을 표시할 함수 호출
}

// 점그래프 평균 표시 함수
function showDotMean(ngroup, avg, gxmin, gxmax, graphWidth, graphHeight) {
       var k, avgx, ty;
       var gxrange   = gxmax - gxmin;
       var oneHeight = graphHeight / ngroup;

       for (k=0; k<ngroup; k++) {
         avgx  = margin.left + graphWidth*(avg[k]-gxmin)/gxrange;  
         ty    = margin.top + k*oneHeight;      
         chart.append("line")
            .attr("class","mean")
            .attr("x1",avgx)
            .attr("y1",ty + 30)
            .attr("x2",avgx)
            .attr("y2",ty + 20 + oneHeight)
            .style("stroke","red")            
         chart.append("text")
              .attr("class","mean")
              .attr("text-anchor","middle")
              .attr("font-size","9px")
              .attr("font-family","sans-serif")
              .attr("stroke","#0055FF")
              .attr("x", avgx)
              .attr("y", ty + 32 + oneHeight)
             .text(svgStr[34][langNum]+"="+f2(avg[k]))
       }
}

// 점그래프 평균 제거 함수
function removeDotMean() {
	 chart.selectAll("line.mean").remove();
	 chart.selectAll("text.mean").remove();
}

// 점그래프 표준편차 표시 함수
function showDotStd(avg, std, gxmin, gxmax, graphWidth, graphHeight) {
       var k, avgx, ty, stdmx, stdpx;
       var gxrange = gxmax - gxmin;
       var oneHeight = graphHeight / ngroup;

       for (k=0; k<ngroup; k++) {
         avgx  = margin.left + graphWidth*(avg[k]-gxmin)/gxrange;
         ty    = margin.top + (k+1)*oneHeight +20;
         stdmx = margin.left + graphWidth*(avg[k]-std[k]-gxmin)/gxrange;
         stdpx = margin.left + graphWidth*(avg[k]+std[k]-gxmin)/gxrange;
         chart.append("circle")
            .attr("class","std")
            .attr("cx",avgx)
            .attr("cy",ty)
            .attr("r",1)
            .style("fill","green")    
         chart.append("line")
            .attr("class","std")
            .attr("x1",stdmx)
            .attr("y1",ty)
            .attr("x2",avgx)
            .attr("y2",ty)
            .style("stroke","blue")            
         chart.append("line")
            .attr("class","std")
            .attr("x1",stdpx)
            .attr("y1",ty)
            .attr("x2",avgx)
            .attr("y2",ty)
            .style("stroke","blue")          
          chart.append("circle")
            .attr("class","std")
            .attr("cx",stdmx)
            .attr("cy",ty)
            .attr("r",1)
            .style("fill","blue")           
         chart.append("circle")
            .attr("class","std")
            .attr("cx",stdpx)
            .attr("cy",ty)
            .attr("r",1)
            .style("fill","blue")           
         chart.append("text")
              .attr("class","std")
              .attr("text-anchor","middle")
              .attr("font-size","9px")
              .attr("font-family","sans-serif")
              .attr("stroke","#0055FF")
              .attr("x", avgx+80)
              .attr("y", ty+12)
              .text(svgStr[35][langNum]+"="+f2(std[k]))
       }
}
     
// 점그래프 표준편차 제거 함수
function removeDotStd() {
	 chart.selectAll("line.std").remove();
	 chart.selectAll("circle.std").remove();
	 chart.selectAll("text.std").remove();
}

// 히스토그램 그리기 함수 -----------------------------------------------------------------------------------------------
function drawHistGraph(ngroup, gxminH, xstep, dataSet, freq, gvalueLabel, dvalueLabel, dvarName) {
      var i, j, k;
      var label, tempx, tempy, tempw, temph;
      var nvaluH, gxminH, gxmaxH, gxrangeH, gyminH, gymaxH, gyrangeH, freqmax, tobs;

      var tdata      = new Array(rowMax);
      var dataA      = new Array(rowMax);
      var dataValue  = new Array(rowMax);  // 각 구간값: 최대 구간의 수 =199개
      var dvalueFreq = new Array(rowMax);  // 각 구간도수  

//      var graphWidth  = svgWidth - margin.left - margin.right;   // 그래프 영역의 너비
//      var graphHeight = svgHeight - margin.top - margin.bottom;  // 그래프 영역의 높이
      var oneHeight   = graphHeight / ngroup;

      // 히스토그램 bins, 전체 데이터 최소 최대 계산
      nvalueH = 0;  
      dataValueH[0] = gxminH;
      while (dataValueH[nvalueH] <= tstat[7]) {
          nvalueH++;
          dataValueH[nvalueH] = dataValueH[nvalueH-1] + xstep;
       } 
      nvalueH++;
      dataValueH[nvalueH] = dataValueH[nvalueH-1] + xstep;
      dataValueH[nvalueH+1] = dataValueH[nvalueH] + xstep;
      gxmaxH   = dataValueH[nvalueH];
      gxrangeH = gxmaxH - gxminH;

      // 여러 그룹의 히스토그램 그리기
      freqmax = 0;
      for (k=0; k<ngroup; k++) {
          tobs = nobs[k];
          for (i=0; i<tobs; i++) tdata[i] = dataSet[k][i];

          for (i=0; i<tobs; i++) dataA[i]=tdata[i];
          sortAscendM(tobs, dataA, dataValue, dvalueFreq, dataY);
          HistIntervalFreq(tobs, nvalueH, dataA, dataValueH, dvalueFreq);
          for (j=0; j<=nvalueH+1; j++) {
            freq[k][j] = dvalueFreq[j];
            if (dvalueFreq[j] > freqmax) freqmax = dvalueFreq[j]; 
          }
      } // endof k

      gyminH   = 0;
      gymaxH   = freqmax + Math.floor(freqmax/8 + 1);
      gyrangeH = gymaxH - gyminH; 

      // 전체 제목
      drawTitleM(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);
      // 아래 축그리기
      drawHistAxis(ngroup, dataValueH, gxminH, gxmaxH, gyminH, gymaxH, graphWidth, graphHeight);
      // X축 제목
      chart.append("text")
           .attr("font-size","12px")
           .attr("font-family","sans-seirf")
           .attr("stroke","black")
           .attr("text-anchor","middle")
           .attr("x",margin.left + graphWidth/2)
           .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
           .text(dvarName)
      // Y축 제목
      str = svgStr[16][langNum];
      chart.append("text")
           .attr("font-size","12px")
           .attr("font-family","sans-seirf")
           .attr("stroke","black")
           .attr("text-anchor","end")
           .attr("x",margin.left/2-15)
           .attr("y",margin.top+ 15)
           .text(str)
           .attr("transform", "rotate(-90 30 100)")

      // 그룹 히스토그램
      for (k=0; k<ngroup; k++) {
        // 범례
        if (ngroup > 1) {
          str = gvalueLabel[k];  
          chart.append("text")
               .attr("font-size","12px")
               .attr("font-family","sans-seirf")
               .attr("stroke","black")
               .attr("text-anchor","start")
               .style("stroke",myColor[k])
               .attr("x",margin.left + graphWidth + 20)
               .attr("y",margin.top + oneHeight/2 + oneHeight*k)
               .text(str);
        }
        // 히스토그램
        for (i=1; i<=nvalueH+1; i++) {
            tempx = margin.left + graphWidth*(dataValueH[i-1]-gxminH)/gxrangeH;
            tempy = margin.top + (k+1)*oneHeight - oneHeight*(freq[k][i]-gyminH)/gyrangeH;
            tempw = graphWidth*xstep/gxrangeH;
            temph = oneHeight*(freq[k][i]-gyminH)/gyrangeH;
            chart.append("rect")
                .style("fill",myColor[k])
                .attr("class","bar")
                .attr("stroke","black")
                .attr("stroke-width","1px")
                .attr("x",tempx)
                .attr("width",tempw)
                .attr("height",0)
                .attr("y",margin.top+(k+1)*oneHeight)
                .transition()                           // 애니매이션 효과 지정
                .delay(function(d,i) {return i*250;})   // 0.5초마다 그리도록 대기시간 설정
                .duration(1000)                         // 2초동안 애니매이션이 진행되도록 설정
                .attr("y",tempy)
                .attr("height",temph)
        } // endof i
      }

//      return {gxmaxH; gyminH, gymaxH};
      return {a:gxmaxH, b:gyminH, c:gymaxH};

}

// 히스토그램 y축, x축 그리기
function drawHistAxis(ngroup, dataValueH, gxminH, gxmaxH, gyminH, gymaxH, graphWidth, graphHeight) {
        var i, j, k;
        var tx, ty, x1, x2, y1, y2, z1, z2;
        var oneHeight = graphHeight / ngroup;
        var gxrangeH  = gxmaxH - gxminH;

        // Y축 그리기
        var yScale = d3.scaleLinear().domain([gyminH, gymaxH]).range([oneHeight, 0]);

        for (k=0; k<ngroup; k++) {
          tx = margin.left;
          ty = k*oneHeight + margin.top;
          chart.append("g")
              .attr("class","axis")
              .attr("transform","translate("+tx+", "+ty+") ")
              .call(d3.axisLeft(yScale))
        }
        chart.append("line")
            .attr("x1",margin.left+graphWidth)
            .attr("x2",margin.left+graphWidth)
            .attr("y1",margin.top)
            .attr("y2",margin.top+graphHeight) 
            .style("stroke","black") 

        /// 각 히스토그램의 x축 선
        for (k=0; k<=ngroup; k++) {           
          tx = margin.left;
          ty = k*oneHeight + margin.top;
          chart.append("line")
              .attr("x1",tx)
              .attr("x2",margin.left+graphWidth)
              .attr("y1",ty)
              .attr("y2",ty) 
              .style("stroke","black") 
        }
 
        // 히스토그램의 x축 아래 tick, value 값선
        y1 = margin.top  + graphHeight;
        y2 = y1 + 5;
        for (i=0; i<=nvalueH; i++) {
          x1 = margin.left+graphWidth*(dataValueH[i]-gxminH)/gxrangeH;
          x2 = x1
          chart.append("line")
              .attr("x1",x1)
              .attr("x2",x2)
              .attr("y1",y1)
              .attr("y2",y2) 
              .style("stroke","black") 
          chart.append("text")
              .attr("class","myaxis")
              .attr("text-anchor","middle")
              .attr("font-family","sans-serif")
              .attr("font-size","7px")
              .attr("font-family","sans-serif")
              .attr("stroke","#0055FF")
              .attr("x",x1)
              .attr("y",y2+15)
              .text(f2(dataValueH[i]))
        }
}

// 히스토그램 평균 표시 함수
function showHistMean(ngroup, avg, gxminH, gxmaxH) {
        var tempx, tempy;

//        var graphWidth  = svgWidth - margin.left - margin.right;   // 그래프 영역의 너비
//        var graphHeight = svgHeight - margin.top - margin.bottom;  // 그래프 영역의 높이
        var oneHeight   = graphHeight / ngroup;
        var gxrangeH    = gxmaxH - gxminH;

        for (var k=0; k<ngroup; k++) {
          tempx = margin.left + graphWidth*(avg[k]-gxminH)/gxrangeH;
          tempy = margin.top + k*oneHeight + 5;
          chart.append("line")
                .attr("class","histmean")
                .attr("x1",tempx)
                .attr("y1",tempy+20)
                .attr("x2",tempx)
                .attr("y2",tempy + oneHeight)
          chart.append("text")
                .attr("class","histmean")
                .attr("stroke","red")
                .attr("text-anchor","middle")
                .attr("font-family","sans-serif")
                .attr("font-size","7pt")
                .attr("x", tempx)
                .attr("y", tempy + oneHeight+5)
                .text(svgStr[34][langNum]+"="+f2(avg[k]))
        }
}   

// 히스토그램 평균표시 제거 함수
function removeHistMean() {
	 chart.selectAll("line.histmean").remove();
         chart.selectAll("circle.histmean").remove();
         chart.selectAll("text.histmean").remove();   
}

// 히스토그램 도수 표시 함수
function showHistFreq(ngroup, nvalueH, xstep, freq, dataValueH, gxminH, gxmaxH, gyminH, gymaxH) {
        var x1, y1;

//        var graphWidth  = svgWidth - margin.left - margin.right;   // 그래프 영역의 너비
//        var graphHeight = svgHeight - margin.top - margin.bottom;  // 그래프 영역의 높이
        var oneHeight   = graphHeight / ngroup;
        var gxrangeH    = gxmaxH - gxminH;
        var gyrangeH    = gymaxH - gyminH;

        for (var k=0; k<ngroup; k++) {
          for (var i=1; i<=nvalueH; i++) {
            x1 = margin.left + graphWidth*(dataValueH[i-1]+xstep/2-gxminH)/gxrangeH;
            y1 = margin.top + (k+1)*oneHeight - oneHeight*(freq[k][i]-gyminH)/gyrangeH;
            chart.append("text")
                .attr("class","histfreq")
                .attr("stroke","red")
                .attr("text-anchor","middle")
                .attr("font-family","sans-serif")
                .attr("font-size","8pt")
                .attr("x", x1)
                .attr("y", y1-4)
                .text(freq[k][i])
          }
        }
}

// 히스토그램 도수 제거 함수
function removeHistFreq() {
	 chart.selectAll("text.histfreq").remove();
}


// 히스토그램 도수분포다각형 표시 함수
function showHistLine(ngroup, nvalueH, xstep, freq, dataValueH, gxminH, gxmaxH, gyminH, gymaxH) {
        var i, k;

//        var graphWidth  = svgWidth - margin.left - margin.right;   // 그래프 영역의 너비
//        var graphHeight = svgHeight - margin.top - margin.bottom;  // 그래프 영역의 높이
        var oneHeight   = graphHeight / ngroup;
        var gxrangeH    = gxmaxH - gxminH;
        var gyrangeH    = gymaxH - gyminH;

        for (k=0; k<ngroup; k++) {
          for (i=1; i<nvalueH; i++) {
            x1 = margin.left + graphWidth*(dataValueH[i-1]+xstep/2-gxminH)/gxrangeH;
            y1 = margin.top + (k+1)*oneHeight - oneHeight*(freq[k][i]-gyminH)/gyrangeH;
            x2 = margin.left + graphWidth*(dataValueH[i]+xstep/2-gxminH)/gxrangeH;
            y2 = margin.top + (k+1)*oneHeight - oneHeight*(freq[k][i+1]-gyminH)/gyrangeH;
            chart.append("circle")
              .attr("class","histline")
              .attr("stroke","lime")
              .attr("stroke-width","2px")
              .attr("cx",x1)
              .attr("cy",y1)
              .attr("r",3)
       
            chart.append("line")
              .attr("class","histline")
              .attr("stroke","lime")
              .attr("stroke-width","2px")
              .attr("x1",x1)
              .attr("x2",x2)
              .attr("y1",y1)
              .attr("y2",y2)
 
            chart.append("circle")
              .attr("class","histline")
              .attr("stroke","lime")
              .attr("stroke-width","2px")
              .attr("cx",x2)
              .attr("cy",y2)
              .attr("r",3)

          }
        }
}

// 히스토그램 도수분포다각형 제거
function removeHistLine() {
	 chart.selectAll("line.histline").remove();
         chart.selectAll("circle.histline").remove();
}

// 히스토그램 도수분포표 
function showHistTable(ngroup, nvalueH, freq, dataValueH, dvarName, gvarName,gvalueLabel) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

          var i, j, k, rowsum, totsum, row;
          var colsum = new Array(ngroup);
          var cell = new Array(5);

          totsum = 0;
          for (j=0; j<ngroup; j++) {
            colsum[j] = 0;
            for (i=1; i<nvalueH+1; i++) { 
              colsum[j] += freq[j][i];
            }
            totsum += colsum[j];
          }

          table.style.fontSize = "13px";
 
          row = table.insertRow(0);
          row.style.height = "30px";
          for (j=0; j<3; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.width ="90px";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
          }
          cell[0].style.width = "130px";
          cell[0].innerHTML = svgStr[36][langNum];
          cell[1].innerHTML = svgStr[37][langNum];
          cell[2].innerHTML = "("+gvarName+")";

          row = table.insertRow(1);
          row.style.height = "40px";
          for (j=0; j<ngroup+2; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
          }
          cell[0].innerHTML = svgStr[38][langNum]+" ("+dvarName+")";
          for (j=0; j<ngroup; j++) {
            cell[j+1].innerHTML = svgStr[18][langNum]+(j+1).toString()+" ("+gvalueLabel[j]+")";
          }
          cell[ngroup+1].innerHTML = svgStr[23][langNum];

          for (i=0; i<nvalueH; i++) {
            row = table.insertRow(i+2);
 
            for (j=0; j<ngroup+2; j++) {
              cell[j] = row.insertCell(j);
              cell[j].style.border = "1px solid black";
            }          
            cell[0].innerHTML = (i+1).toString()+"<br> ["+f2(dataValueH[i])+", "+f2(dataValueH[i+1])+")";
            cell[0].style.backgroundColor = "#eee";
            cell[0].style.textAlign = "center";
            cell[ngroup+1].style.backgroundColor = "#eee";
            cell[ngroup+1].style.textAlign = "right";
            rowsum = 0;
            for (j=0; j<ngroup; j++) {
              rowsum += freq[j][i];
              cell[j+1].innerHTML = freq[j][i].toString()+"<br> ("+f1(100*freq[j][i]/colsum[j]).toString()+"%)";
              cell[j+1].style.textAlign = "right";
            }
            cell[ngroup+1].innerHTML = rowsum.toString()+"<br> ("+f1(100*rowsum/totsum).toString()+"%)";
          }

          row = table.insertRow(2+nvalueH);
          for (j=0; j<ngroup+2; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "right";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
          }  
          cell[0].style.textAlign = "right";   
          cell[0].innerHTML = svgStr[23][langNum];
          for (j=0; j<ngroup; j++) {
              cell[j+1].innerHTML = colsum[j].toString()+"<br> ("+f0(100).toString()+"%)";
          }
          cell[ngroup+1].innerHTML = totsum.toString()+"<br> ("+f0(100).toString()+"%)";

          row = table.insertRow(3+nvalueH);
          row.style.height = "20px";
}

// 상자그래프 함수 ---------------------------------------------------------------------------------------------
function drawBoxGraph(ngroup, gvalueLabel, mini, Q1, median, Q3, maxi, graphWidth, oneHeight, tstat) {
       var x1, x2, y1, y2;
       var width, height, tlabel, temp;

//       graphHeight = svgHeight - margin.top - margin.bottom;


       // 전체 제목
       drawTitleM(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);

       // 전체 데이터 최소 최대 계산
       temp    = (parseFloat(tstat[7]) - parseFloat(tstat[3])) / 10;  // (전체 최대 - 최소) / 10  : 그래프 양 끝쪽 buffer 
       gxmin   = parseFloat(tstat[3]) - temp;
       gxmax   = parseFloat(tstat[7]) + temp;
       gxrange = gxmax - gxmin;

       for (var k=0; k<ngroup; k++) {

          // 범례
          if (ngroup > 1) {
            str = gvalueLabel[k];  
            chart.append("text")
                 .attr("font-size","12px")
                 .attr("font-family","sans-seirf")
                 .attr("stroke","black")
                 .attr("text-anchor","start")               .style("stroke",myColor[k])
                 .attr("x",margin.left + graphWidth + 10)
                 .attr("y",margin.top + oneHeight/4 + oneHeight*k + 20)
                 .text(str);
          }
          // 최소
          x1 = margin.left + graphWidth*(mini[k]-gxmin)/gxrange;
          y1 = margin.top + k*oneHeight +20;
          x2 = x1;
          y2 = y1 + oneHeight/2;
          chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
             .style("stroke",myColor[k]).style("stroke-width","2px")       
          chart.attr("class","stat").append("text").attr("x", x2-3).attr("y", y2+13).text("min="+mini[k])
               .attr("font-size","9px")
               .attr("font-family","sans-seirf")
               .attr("stroke","black")
               .attr("text-anchor","middle")

          // 최소 => Q1
          x2 = x1 + graphWidth*(Q1[k]-mini[k])/gxrange;
          chart.append("line").attr("x1",x1).attr("y1",y1+oneHeight/4).attr("x2",x2).attr("y2",y1+oneHeight/4)
             .style("stroke",myColor[k]).style("stroke-width","2px")

          // 최대
          x1 = margin.left + graphWidth*(maxi[k]-gxmin)/gxrange;
          x2 = x1;
          chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
             .style("stroke",myColor[k]).style("stroke-width","2px")
          chart.attr("class","stat").append("text").attr("x", x2-3).attr("y", y2+13).text("max="+maxi[k])
               .attr("font-size","9px")
               .attr("font-family","sans-seirf")
               .attr("stroke","black")
               .attr("text-anchor","middle")

          // 상자
          x1 = margin.left + graphWidth*(Q1[k]-gxmin)/gxrange;
          width = graphWidth*(Q3[k]-Q1[k])/gxrange;
          height = oneHeight/2;
          chart.append("rect").attr("x",x1).attr("y",y1).attr("width",width).attr("height",height)
             .style("stroke",myColor[k]).style("fill",myColor[k])
          
          // Q1
          chart.append("text").attr("class","stat").attr("x", x1+3).attr("y", y2+25).text("Q1="+f2(Q1[k]))
               .attr("font-size","9px")
               .attr("font-family","sans-seirf")
               .attr("stroke","black")
               .attr("text-anchor","middle")

          // Q3
          chart.append("text").attr("class","stat").attr("x", x1+width+6).attr("y", y2+25).text("Q3="+f2(Q3[k]))
               .attr("font-size","9px")
               .attr("font-family","sans-seirf")
               .attr("stroke","black")
               .attr("text-anchor","middle")

          // Q3 => max
          x1 = margin.left + graphWidth*(Q3[k]-gxmin)/gxrange;
          x2 = x1 + graphWidth*(maxi[k]-Q3[k])/gxrange;
          chart.append("line").attr("x1",x1).attr("y1",y1+oneHeight/4).attr("x2",x2).attr("y2",y1+oneHeight/4)
             .style("stroke",myColor[k]).style("stroke-width","2px")

          // median
          x1 = margin.left + graphWidth*(median[k]-gxmin)/gxrange;
          x2 = x1;
          chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
             .style("stroke","lime").style("stroke-width","2px")
          chart.append("text").attr("class","stat").attr("x", x1+6).attr("y", y2+13).text("m="+f2(median[k]))
               .attr("font-size","9px")
               .attr("font-family","sans-seirf")
               .attr("stroke","black")
               .attr("text-anchor","middle")

       }
}

// 줄기잎그림 함수 -----------------------------------------------------------------------------
function drawStemLeaf(ngroup, nobs, dataSet, tstat, graphWidth, buffer) {
        var i, j, k, kk, digitMax, digitDeci, digit10, len, pos, temp, temp1, temp2, ty, x1, y1, x2, y2;
        var tobs, nvalue;
        var tdata = new Array(rowMax);
        var lineSpace  = 15;

        var stem       = new Array(rowMax);
        var stemStr    = new Array(rowMax);
        var leaf       = new Array(rowMax);
        var dataValue  = new Array(rowMax);
        var dvalueFreq = new Array(rowMax);

        // 전체 제목
        drawTitleM(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);

        // 소수아래 자리수 계산
        digitDeci = 0;
        for (kk=0; kk<ngroup; kk++) { 
          tobs  = nobs[kk];
          for (i=0; i<tobs; i++) {
            temp = dataSet[kk][i].toString();
            pos  = temp.indexOf(".");
            if (pos < 0) len = 0;
            else len = temp.length - pos - 1;
            if (len > digitDeci) digitDeci = len;
          }
        }
        if (digitDeci < 0) digitDeci = 0;
        digit10 = 1;
        if (digitDeci > 0) {
          for (j=0; j<digitDeci; j++) digit10 *= 10;
        }

        // Counting Stem 
        temp1  = tstat[3]*digit10 - tstat[3]*digit10%10;
        temp2  = tstat[7]*digit10 - tstat[7]*digit10%10;
        nvalue = temp2/10 - temp1/10 + 2;

        svgHeight   = margin.top + margin.bottom + ngroup*40 + ngroup*nvalue*lineSpace;
        if (svgHeight < 560) svgHeight = 560;
        graphHeight = svgHeight - margin.top - margin.bottom;
        margin.left  = 20;
        margin.right = 20;
        graphWidth   = svgWidth - margin.left - margin.right;
        document.getElementById("SVG").style.height = svgHeight;


        stem[0] = temp1;
        for (j=1; j<nvalue; j++) {
          stem[j]  = stem[j-1] + 10;
        }

        for (j=0; j<nvalue; j++) {
          temp = stem[j].toFixed(0);
          len  = temp.length;
          stemStr[j]    = temp.substr(0,len-1); 
          if (stemStr[j] == null) stemStr[j] = "0";
          dvalueFreq[j] = 0;
          leaf[j] = new Array(100);
        }

        ty = 20;
        for (kk=0; kk<ngroup; kk++) { 

          tobs  = nobs[kk];
//          for (i=0; i<tobs; i++) {tdata[i] = (dataSet[kk][i]*digit10).toPrecision(12);}
          for (i=0; i<tobs; i++) {tdata[i] = dataSet[kk][i]*digit10;}

          CountLeaf(nvalue, tobs, tdata, dataValue, dvalueFreq, stem, leaf);

          chart.append("text").attr("class","titleStem").attr("x", margin.left + 20).attr("y", margin.top + ty)
             .text(svgStr[39][langNum]).style("stroke",myColor[kk]);
          if (ngroup ==1) temp = svgStr[40][langNum];
          else temp = svgStr[18][langNum] + (kk+1).toString() + svgStr[40][langNum];
          chart.append("text").attr("class","titleStem").attr("x", margin.left + 90).attr("y", margin.top + ty)
              .text(temp).style("stroke",myColor[kk]);  
          chart.append("line").attr("x1",margin.left).attr("x2",margin.left+graphWidth)
              .attr("y1",margin.top+10 + ty).attr("y2",margin.top+10 + ty).style("stroke","black") 

          for (j=0; j<nvalue-1; j++) {
            x1 = margin.left + 50;
            y1 = ty + margin.top  + 30 + j*lineSpace;
            temp = stemStr[j];
            if (digitDeci > 1) temp = ( parseInt(stemStr[j]) / (digit10/10) ).toFixed(digitDeci-1);
            chart.append("text").attr("class","stem").attr("x", x1).attr("y", y1).text(temp).style("stroke",myColor[kk]) ;
            for (k=1; k<=dvalueFreq[j]; k++) {
              x2 = x1 + 40 + k*8;
              temp = leaf[j][k].toFixed(0);
              chart.append("text")
                .attr("class","leaf")
                .attr("x", x2)
                .attr("y", y1)
                .text(temp.toString()) 
                .transition()                           // 애니매이션 효과 지정
                .delay(function(d,i) {return i*100;})   // 0.5초마다 그리도록 대기시간 설정
                .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                .style("stroke",myColor[temp]) 
            } // endfof k
          }  // endof j 

          for (j=0; j<nvalue-1; j++) {
             for (k=1; k<=dvalueFreq[j]; k++) {
               leaf[j][k]= 0; 
            }
          }  // endof j  

          ty += nvalue*lineSpace + 50;
        } // end of kk

        svgHeight   = 560;
        graphHeight = svgHeight - margin.top - margin.bottom;
}


// 양쪽형 줄기잎그림
function drawStemLeafBoth(ngroup, nobs, dataSet, tstat, graphWidth, buffer) {
        var i, j, k, kk, digitMax, digitDeci, digit10, len, pos, temp, temp1, temp2, ty, x1, y1, x2, y2;
        var tobs, nvalue;

        // 전체 제목
        drawTitleM(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);

        var lineSpace  = 15;
        var tdata      = new Array(rowMax);
        var stem       = new Array(rowMax);
        var stemStr    = new Array(rowMax);
        var leaf       = new Array(rowMax);
        var dataValue  = new Array(rowMax);
        var dvalueFreq = new Array(rowMax);


        // 소수아래 자리수 계산
        digitDeci = 0;
        for (kk=0; kk<ngroup; kk++) { 
          tobs  = nobs[kk];
          for (i=0; i<tobs; i++) {
            temp = dataSet[kk][i].toString();
            pos  = temp.indexOf(".");
            if (pos < 0) len = 0;
            else len = temp.length - pos - 1;
            if (len > digitDeci) digitDeci = len;
          }
        }
        if (digitDeci < 0) digitDeci = 0;
        digit10 = 1;
        if (digitDeci > 0) {
          for (j=0; j<digitDeci; j++) digit10 *= 10;
        }

        // Counting Stem 
        temp1  = tstat[3]*digit10 - tstat[3]*digit10%10;
        temp2  = tstat[7]*digit10 - tstat[7]*digit10%10;
        nvalue = temp2/10 - temp1/10 + 2;


        stem[0] = temp1;
        for (j=1; j<nvalue; j++) {
          stem[j]  = stem[j-1] + 10;
        }

        for (j=0; j<nvalue; j++) {
          temp = stem[j].toFixed(0);
          len  = temp.length;
          stemStr[j]    = temp.substr(0,len-1); 
          if (stemStr[j] == "") stemStr[j] = "0";
          dvalueFreq[j] = 0;
          leaf[j] = new Array(100);
        }

//////////////////////////////////////////////////////////


           // heading
          tx = margin.left + graphWidth/2 - buffer - 20;
          chart.append("text").attr("class","titleStem")
              .attr("x", tx).attr("y", margin.top+5)
              .text(svgStr[39][langNum]).style("stroke","black");
          chart.append("text")
              .attr("class","titleStem")
              .attr("x", tx - 110)
              .attr("y", margin.top+5)
              .text(svgStr[41][langNum])
              .style("stroke",myColor[0])  
          chart.append("text")
              .attr("class","titleStem")
              .attr("x", tx + 80)
              .attr("y", margin.top+5)
              .text(svgStr[42][langNum])
              .style("stroke",myColor[1])  
          chart.append("line")
              .attr("x1",20)
              .attr("x2",svgWidth-20)
              .attr("y1",margin.top+17)
              .attr("y2",margin.top+17) 
              .style("stroke","black") 


        // 줄기잎그림 ---------------------------------
        for (kk = 0; kk<ngroup; kk++) {
          tobs  = nobs[kk];

          for (i=0; i<tobs; i++) {tdata[i] = (dataSet[kk][i]*digit10).toPrecision(12);}
          CountLeaf(nvalue, tobs, tdata, dataValue, dvalueFreq, stem, leaf);


          tx = margin.left + graphWidth/2 - buffer;
          ty = 0;

          for (j=0; j<nvalue-1; j++) {
            x1 = tx;
            y1 = ty + margin.top  + 40 + j*lineSpace;

            temp = stemStr[j];
            if (digitDeci > 1) temp = ( parseInt(stemStr[j]) / (digit10/10) ).toFixed(digitDeci-1);
            chart.append("text").attr("class","stem").attr("x", x1+10).attr("y", y1).text(temp)

            for (k=1; k<=dvalueFreq[j]; k++) {
              if (kk==0) x2 = x1 - 40 - k*8;
              else x2 = x1 + 50 + k*10;
              chart.append("text")
                .attr("class","leaf")
                .attr("x", x2)
                .attr("y", y1)
                .text(leaf[j][k]) 
                .transition()                           // 애니매이션 효과 지정
                .delay(function(d,i) {return i*100;})   // 0.5초마다 그리도록 대기시간 설정
                .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                .style("stroke",myColor[leaf[j][k]]) 
            } // endof k
          }  // endof j  

          for (j=0; j<nvalue-1; j++) {
             for (k=1; k<=dvalueFreq[j]; k++) {
               leaf[j][k]= 0; 
             }
           }  

        } // endof kk
        
}

// Sorting freq in ascending order and determine leaf
function CountLeaf(nvalue, tobs, tdata, dataValue, dvalueFreq, stem, leaf) {
        var i, j, k;
        var dataA = new Array(tobs);

        for (i=0; i<tobs; i++) dataA[i]=tdata[i];
        sortAscendM(tobs, dataA, dataValue, dvalueFreq, dataY);
        for (j=0; j<nvalue; j++) dvalueFreq[j] = 0;
        k = 1;   
        for (i=0; i<tobs; i++) {
          for (j=k; j<nvalue; j++) {
            if (dataA[i] < stem[j]) {
              dvalueFreq[j-1]++;
              if (dataA[i] >= 0)  leaf[j-1][dvalueFreq[j-1]] = dataA[i]%10;
              else  leaf[j-1][dvalueFreq[j-1]] = -dataA[i]%10;  
              break;
            }
            else {k++;} 
          }
        }

}

// 기초통계량표 --------------------------------------------------------------------------------------------------
function statTable(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg, std, mini, Q1, median, Q3, maxi, tstat) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

        var row, nrow, str;
        var ncol = 7;
        var cell = new Array(7);

          table.style.fontSize = "13px";
 
          var header = table.createTHead()
          row  = table.insertRow(0);
          row.style.height ="40px";
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.width ="70px";
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
          }
          cell[0].style.width ="100px";
          cell[1].style.width ="60px";
          cell[0].innerHTML = svgStr[43][langNum];
          cell[1].innerHTML = svgStr[26][langNum]
          cell[2].innerHTML = "("+dvarName+")";
          if (ngroup > 1) {
            cell[3].innerHTML = svgStr[37][langNum];
            cell[4].innerHTML = "("+gvarName+")";
          }

          row  = table.insertRow(1);
          row.style.height ="40px";
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.border = "1px solid black";
          }
          if (ngroup > 1) {
            cell[0].innerHTML = svgStr[21][langNum]+" ("+gvarName+")";
          }
          else cell[0].innerHTML = svgStr[21][langNum]+" ("+gvarName+")";
          cell[1].innerHTML = svgStr[44][langNum] 
          cell[2].innerHTML = svgStr[34][langNum];  
          cell[3].innerHTML = svgStr[35][langNum]  
          cell[4].innerHTML = svgStr[45][langNum]
          cell[5].innerHTML = svgStr[46][langNum]
          cell[6].innerHTML = svgStr[47][langNum] 
          for (j=0; j<ncol; j++) {
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
          }

          for (g=0; g<ngroup; g++) {
            row = table.insertRow(g+2);
            for (j=0; j<ncol; j++) {
              cell[j] = row.insertCell(j);  
              cell[j].style.border = "1px solid black";
            }
            str ="";
            if (ngroup > 1) str = (g+1).toString()+" ("+gvalueLabel[g]+")";        
            cell[0].innerHTML = str;
            cell[0].style.backgroundColor = "#eee";
            cell[1].innerHTML = nobs[g].toString();  
            cell[2].innerHTML = f2(avg[g]).toString();  
            cell[3].innerHTML = f2(std[g]).toString();   
            cell[4].innerHTML = f2(mini[g]).toString();   
            cell[5].innerHTML = f2(median[g]).toString();   
            cell[6].innerHTML = f2(maxi[g]).toString();   
            cell[0].style.textAlign = "center";
            for (j=1; j<ncol; j++) cell[j].style.textAlign = "right";         
          }
          nrow = ngroup+1;
          if (ngroup > 1) {
            nrow++;
            row = table.insertRow(nrow);
            for (j=0; j<ncol; j++) {
              cell[j] = row.insertCell(j);          
              cell[j].style.border = "1px solid black";
            }
            cell[0].innerHTML = svgStr[48][langNum]
            cell[0].style.backgroundColor = "#eee";
            cell[1].innerHTML = tstat[0].toString(); 
            for (j=2; j<ncol; j++) cell[j].innerHTML = f2(tstat[j-1]).toString();  
            cell[0].style.textAlign = "center";
            for (j=1; j<ncol; j++) {
              cell[j].style.textAlign = "right";          
              cell[j].style.backgroundColor = "#eee";
            }
          }
          nrow++;
          row = table.insertRow(nrow);
          row.style.height ="20px";

}

// ================================================================================================     
//   Scatterplot Modules ==========================================================================
// ================================================================================================

// Sort in Ascending
function SortAscendBasic(tobs, tdata, dataA) {
        var i, j, temp;
        for (i=0; i<tobs; i++) {dataA[i] = tdata[i];}
        for (i=0; i<tobs-1; i++) {
          for (j=i; j<tobs; j++) {
            if(dataA[i] > dataA[j]) {
              temp     = dataA[i];  
              dataA[i] = dataA[j];  
              dataA[j] = temp;     
            }
          }
        } 
}

// Count Number of dot value and its frequecny
function DotValueFreq(tobs, dataA, dataValue, dataY ) {
        var dvalueFreq = new Array(tobs);
        var i, nvalue;
        for(i=0; i<tobs; i++) {
          dvalueFreq[i]=0; 
          dataY[i]=1;
        } 
        nvalue = 0;
        dataValue[nvalue]  = dataA[0];  
        dvalueFreq[nvalue] = 1;   
        for (i=1; i<tobs; i++) {
          if (dataA[i] == dataA[i-1]) {
            dvalueFreq[nvalue]++;
          } 
          else {
            nvalue++;
            dataValue[nvalue] = dataA[i];
            dvalueFreq[nvalue]++;
          }
          dataY[i] = dvalueFreq[nvalue];
        }
        nvalue++;
        return nvalue;
}
// Basic Statistics for two variables with group
function bivarStatByGroup(ngroup,tobs,xdata,ydata,gdata,nobs,xavg,yavg,xstd,ystd,alphaR,betaR,corr,rsquare) {
      var i, j, k, tempx, tempy;
      var xsum = new Array(ngroup+1);
      var xsqs = new Array(ngroup+1);
      var ysum = new Array(ngroup+1);
      var ysqs = new Array(ngroup+1);
      var sxx  = new Array(ngroup+1);
      var syy  = new Array(ngroup+1);
      var sxy  = new Array(ngroup+1);

      for (k=0; k<=ngroup; k++) {
        xsum[k] = 0; ysum[k] = 0; sxx[k] = 0; sxy[k] = 0; syy[k] = 0; nobs[k] = 0;
      }
      for (i=0; i<tobs; i++) {
        // gdata[i]의 gdataValue에서 위치파악
        for (j=0; j<ngroup; j++) {
          if (gdata[i] == gdataValue[j]) {k=j; break;}  
        }     
        nobs[k]++;
        xsum[k] += xdata[i];
        ysum[k] += ydata[i];   
        xsum[ngroup]     += xdata[i];
        ysum[ngroup]     += ydata[i];
      }
      nobs[ngroup] = tobs;
      for (k=0; k<ngroup; k++) {
        xavg[k] = xsum[k] / nobs[k];
        yavg[k] = ysum[k] / nobs[k];
      }
      xavg[ngroup] = xsum[ngroup] / tobs;
      yavg[ngroup] = ysum[ngroup] / tobs;
 
      for (i=0; i<tobs; i++) {
        // gdata[i]의 gdataValue에서 위치파악
        for (j=0; j<ngroup; j++) {
          if (gdata[i] == gdataValue[j]) {k=j; break;}  
        }
        tempx = xdata[i] - xavg[k];
        tempy = ydata[i] - yavg[k];
        sxx[k] += tempx*tempx;
        syy[k] += tempy*tempy;
        sxy[k] += tempx*tempy; 

        tempx = xdata[i] - xavg[ngroup];
        tempy = ydata[i] - yavg[ngroup];
        sxx[ngroup] += tempx*tempx;
        syy[ngroup] += tempy*tempy;
        sxy[ngroup] += tempx*tempy; 
      }
      for (k=0; k<ngroup; k++) {
        xstd[k]    = Math.sqrt(sxx[k] / nobs[k]);
        ystd[k]    = Math.sqrt(syy[k] / nobs[k]);
        betaR[k]   = sxy[k] / sxx[k];
        alphaR[k]  = yavg[k] - betaR[k]*xavg[k];
        corr[k]    = sxy[k] / Math.sqrt(sxx[k] * syy[k]);
        rsquare[k] = corr[k] * corr[k];
      }
      xstd[ngroup]    = Math.sqrt(sxx[ngroup] / tobs);
      ystd[ngroup]    = Math.sqrt(syy[ngroup] / tobs);
      betaR[ngroup]   = sxy[ngroup] / sxx[ngroup];
      alphaR[ngroup]  = yavg[ngroup] - betaR[ngroup]*xavg[ngroup];
      corr[ngroup]    = sxy[ngroup] / Math.sqrt(sxx[ngroup] * syy[ngroup]);
      rsquare[ngroup] = corr[ngroup] * corr[ngroup];
     
}

// 산점도 제목 쓰기 함수
function drawScatterTitle(mainTitle, gvarNumber, xvarNumber, yvarNumber, gvarName, xvarName, yvarName) { 
        var str, gstr;
        // 주제목
        if (mTitle[graphNum] == "") {
          if (numVar == 2) str = xvarName + " : "+yvarName+svgStr[19][langNum]+iTitle[graphNum];
          else str = "("+svgStr[18][langNum]+" "+gvarName+") " + xvarName + ", "+yvarName+svgStr[19][langNum]+iTitle[graphNum];
//          mTitle[graphNum] = str;
        }
        else str = mTitle[graphNum];

        chart.append("text")
             .attr("x",margin.left + titleBuffer)
             .attr("y",margin.top/2)
             .attr("font-size","17px")
             .attr("font-family","sans-seirf")
             .attr("stroke","black")
             .attr("text-anchor","middle")
             .text(str)
        // Y축 제목
        chart.append("text")
             .attr("font-size","12px")
             .attr("font-family","sans-seirf")
             .attr("stroke","black")
             .attr("text-anchor","end")
             .attr("x",-margin.top - 50)
             .attr("y",margin.top + 20)
             .text(yvarName)
             .attr("transform", "rotate(-90 30 100)")
        // X축 제목
        chart.append("text")
             .attr("font-size","12px")
             .attr("font-family","sans-seirf")
             .attr("stroke","black")
             .attr("text-anchor","middle")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
             .text(xvarName)

}

// 산점도 그리기 ----------------------------------------------------------------------------------------------
function drawScatter(ngroup, gvalueLabel,tobs,xdata,ydata,gdata,scatterS) {

         // 그래프 화면 정의 
        xmin = gmin(tobs, xdata);
        xmax = gmax(tobs, xdata);
        ymin = gmin(tobs, ydata);
        ymax = gmax(tobs, ydata);
        xbuffer = (xmax-xmin) / 10;     // 경계점이 보이기위한 완충거리
        ybuffer = (ymax-ymin) / 10;     // 경계점이 보이기위한 완충거리
        gxmin   = xmin-xbuffer;
        gxmax   = xmax+xbuffer;
        gymin   = ymin-ybuffer;
        gymax   = ymax+ybuffer;
        gxrange = gxmax - gxmin;
        gyrange = gymax - gymin;

        chart.selectAll("*").remove();
 
        if (ngroup > 1) margin = {top: 90, bottom: 90, left: 70, right:150};
        else            margin = {top: 90, bottom: 90, left: 100, right: 120};

        var bufferScatter = 40;
        graphWidth  = svgWidth - margin.left - margin.right;
        graphHeight = svgHeight - margin.top - margin.bottom;

        scatterS[0] = xmin;
        scatterS[1] = xmax;
        scatterS[2] = ymin;
        scatterS[3] = ymax;
        scatterS[4] = gxmin;
        scatterS[5] = gxmax;
        scatterS[6] = gymin;
        scatterS[7] = gymax;
        scatterS[8] = graphWidth;
        scatterS[9] = graphHeight;


        drawScatterTitle(mTitle[graphNum], gvarNumber, xvarNumber, yvarNumber, gvarName, xvarName, yvarName);

      // 축 그리기
      drawScatterAxis(gxmin, gxmax, gymin, gymax, graphWidth, graphHeight)       

      // 점 그리기
      for (k=0; k<tobs; k++) {
        str = "("+xdata[k]+","+ydata[k]+")";
        chart.append("circle")
             .attr("class","circle")
             .style("fill",myColor[gcolor[k]])
//             .attr("cx",margin.left+10)
//             .attr("cy",margin.top+10)
             .attr("r", 4)
//             .transition()                           // 애니매이션 효과 지정
//             .delay(function(d,i) {return i*200;})   // 0.5초마다 그리도록 대기시간 설정
//             .duration(1000)          
             .attr("cx", margin.left+graphWidth*(xdata[k]-gxmin)/gxrange)
             .attr("cy", margin.top+graphHeight-graphHeight*(ydata[k]-gymin)/gyrange)
             .append("title")
             .text(str)

      }

      // 범례 그리기
      if (ngroup > 1) drawLegendS(ngroup, gvalueLabel,graphWidth, bufferScatter);
}

// 산점도 축 그리고 눈금 표시
function drawScatterAxis(gxmin, gxmax, gymin, gymax, graphWidth, graphHeight) {
        var tx, ty;
        // x축
        var xScale = d3.scaleLinear().domain([gxmin,gxmax]).range([0,graphWidth])
        ty = margin.top + graphHeight;
        chart.append("g")
           .attr("transform","translate("+margin.left+","+ty+")")
           .call(d3.axisBottom(xScale))                    // 눈금을 표시할 함수 호출
        chart.append("g")
           .attr("transform","translate("+margin.left+","+margin.top+")")
           .call(d3.axisTop(xScale))                    // 눈금을 표시할 함수 호출
        // y축
        var yScale = d3.scaleLinear().domain([gymin, gymax]).range([graphHeight, 0]);
        tx = margin.left + graphWidth;
        ty = margin.top ;
        chart.append("g")
           .attr("transform","translate("+margin.left+","+ty+")")
           .call(d3.axisLeft(yScale))                    // 눈금을 표시할 함수 호출
        chart.append("g")
           .attr("transform","translate("+tx+","+ty+")")
           .call(d3.axisRight(yScale))                    // 눈금을 표시할 함수 호출
}

// 산점도 범례 그리기
function drawLegendS(ngroup, gvalueLabel,graphWidth, bufferScatter) {
      var tx, ty;
      for (var k=0; k<ngroup; k++) {
        str = gvalueLabel[k];  
        tx = margin.left + graphWidth + bufferScatter;
        ty = margin.top+10 + k*20;
        chart.append("circle")
             .attr("cx",tx)
             .attr("cy",ty)
             .style("fill",myColor[k])
             .attr("r", 4);
        chart.append("text")
             .style("stroke",myColor[k])
             .attr("font-size","12px")
             .attr("font-family","sans-seirf")
             .attr("stroke","black")
             .attr("text-anchor","start")
             .attr("x",tx+8)
             .attr("y",ty+5)
             .text(str)
      } // end of k
}

// Show Regression line
function showRegression(ngroup, alphaR, betaR, corr, rsquare, scatterS) {
        var x1, y1, x2, y2, tx, ty;
        var tx1, ty1, tx2, ty2;

        if (ngroup > 1) margin = {top: 90, bottom: 90, left: 70, right:150};
        else            margin = {top: 90, bottom: 90, left: 100, right: 120};

        gxmin       = scatterS[4];
        gxmax       = scatterS[5];
        gxrange     = gxmax - gxmin;
        gymin       = scatterS[6];
        gymax       = scatterS[7];
        gyrange     = gymax - gymin;
        graphWidth  = scatterS[8];
        graphHeight = scatterS[9];

        for (var k=0; k<ngroup; k++) {
/*
          x1  = margin.left;
          y1  = margin.top  + graphHeight - graphHeight*((alphaR[k]+betaR[k]*gxmin)-gymin)/gyrange;
          x2  = margin.left + graphWidth;
          y2  = margin.top  + graphHeight - graphHeight*((alphaR[k]+betaR[k]*gxmax)-gymin)/gyrange;
*/          
          // 그래프 영역을 벗어났을때의 처리
          tx1 = gxmin;
          ty1 = alphaR[k]+betaR[k]*tx1;
          if (ty1 > gymax) {
            tx1 = (gymax - alphaR[k]) / betaR[k];
            ty1 = alphaR[k] + betaR[k]*tx1; 
          }
          if (ty1 < gymin) {
            tx1 = (gymin - alphaR[k]) / betaR[k];
            ty1 = alphaR[k] + betaR[k]*tx1; 
          }
          tx2 = gxmax;
          ty2 = alphaR[k]+betaR[k]*tx2;
          if (ty2 > gymax) {
            tx2 = (gymax - alphaR[k]) / betaR[k];
            ty2 = alphaR[k] + betaR[k]*tx2; 
          }
          if (ty2 < gymin) {
            tx2 = (gymin - alphaR[k]) / betaR[k];
            ty2 = alphaR[k] + betaR[k]*tx2; 
          }

          x1  = margin.left + graphWidth*(tx1-gxmin)/gxrange;
          y1  = margin.top  + graphHeight - graphHeight*(ty1-gymin)/gyrange;
          x2  = margin.left + graphWidth*(tx2-gxmin)/gxrange;
          y2  = margin.top  + graphHeight - graphHeight*(ty2-gymin)/gyrange;
          
          chart.append("line")
                 .attr("class","reglabel")
                 .attr("x1",x1)
                 .attr("y1",y1)
                 .attr("x2",x2)
                 .attr("y2",y2)
                 .style("stroke",myColor[k]) 

          if (ngroup > 1) {          
            tx = margin.left + graphWidth +30;
            ty = margin.top +  (ngroup+1)*20 + k*35;
          }
          else {
            tx = margin.left / 2;
            ty = margin.top + graphHeight + margin.bottom/2;
          }
          chart.append("text").attr("class","reglabel")
                 .style("stroke",myColor[k]) 
                 .attr("x", tx)
                 .attr("y", ty)
                 .text("y = ("+f2(alphaR[k])+")+("+f2(betaR[k])+ ")x")
          
          chart.append("text").attr("class","reglabel")
                 .style("stroke",myColor[k]) 
                 .attr("x", tx)
                 .attr("y", ty +15)
                 .text("r = "+f2(corr[k])+" "+" r\u00B2 = "+f2(rsquare[k]))
        } // endof k  
}

// Remove Regression Line
function removeRegression() {
	 chart.selectAll("line.reglabel").remove();
         chart.selectAll("text.reglabel").remove();
}

// 산점도 통계량표 --------------------------------------------------------------------------------------------------
function scatterTable(ngroup,tobs,xvarName,yvarName,gvarName,gvalueLabel,nobs, xavg,xstd, yavg,ystd,
       alphaR, betaR, corr, rsquare) {

        
        var table = document.getElementById("ScatterTable");
        var i, j, k, tempx, tempy;
        var row;
        var ncol = 10;

          var cell = new Array(9);
//          var header = table.createTHead();

          table.style.fontSize = "13px";
          table.style.cellPadding = "10";

          row = table.insertRow(0);
          row.innerHTML = ",<h3>산점도 통계량</h3>";
          row.style.textAlign = "center";
 
          row  = table.insertRow(1);
//          row.style.height ="40px";
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.width ="70px";
          }
          cell[0].style.width ="120px";
          cell[0].innerHTML = "분석변량명:";
          cell[0].style.backgroundColor = "#eee";
          cell[1].innerHTML = xvarName;
          cell[2].innerHTML = yvarName;
          cell[3].innerHTML = "그룹명:";
          cell[3].style.backgroundColor = "#eee";
          cell[4].innerHTML = gvarName;
          for (j=0; j<ncol; j++) cell[j].style.textAlign = "center";

          row  = table.insertRow(2);
//          row.style.height ="40px";
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);
          cell[0].innerHTML = "그룹 | 통계량";
          cell[1].innerHTML = "자료수";  
          cell[2].innerHTML = "X평균";  
          cell[3].innerHTML = "X표준편차";    
          cell[4].innerHTML = "Y평균";  
          cell[5].innerHTML = "Y표준편차";
          cell[6].innerHTML = "alpha";
          cell[7].innerHTML = "beta";
          cell[8].innerHTML = "상관계수";
          cell[9].innerHTML = "결정계수";    
          for (j=0; j<ncol; j++) {
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
          }

          for (g=0; g<ngroup; g++) {
            row = table.insertRow(g+3);
            for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
            cell[0].innerHTML = svgStr[18][langNum]+(g+1).toString()+" ("+gvalueLabel[g]+")";
            cell[0].style.backgroundColor = "#eee";
            cell[1].innerHTML = nobs[g].toString();  
            cell[2].innerHTML = f2(xavg[g]).toString();  
            cell[3].innerHTML = f2(xstd[g]).toString();  
            cell[4].innerHTML = f2(yavg[g]).toString();   
            cell[5].innerHTML = f2(ystd[g]).toString();   
            cell[6].innerHTML = f2(alphaR[g]).toString();   
            cell[7].innerHTML = f2(betaR[g]).toString();   
            cell[8].innerHTML = f2(corr[g]).toString();   
            cell[9].innerHTML = f2(rsquare[g]).toString();   
            cell[0].style.textAlign = "center";
            for (j=1; j<ncol; j++) cell[j].style.textAlign = "right";         
          }

          row = table.insertRow(ngroup+3);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = "전체";
          cell[1].innerHTML = nobs[ngroup].toString();  
          cell[2].innerHTML = f2(xavg[ngroup]).toString();  
          cell[3].innerHTML = f2(xstd[ngroup]).toString();  
          cell[4].innerHTML = f2(yavg[ngroup]).toString();   
          cell[5].innerHTML = f2(ystd[ngroup]).toString();   
          cell[6].innerHTML = f2(alphaR[ngroup]).toString();   
          cell[7].innerHTML = f2(betaR[ngroup]).toString();   
          cell[8].innerHTML = f2(corr[ngroup]).toString();   
          cell[9].innerHTML = f2(rsquare[ngroup]).toString();   
          cell[0].style.textAlign = "center";
          cell[0].style.backgroundColor = "#eee";
          for (j=1; j<ncol; j++) cell[j].style.textAlign = "right";   
}    

// Two variable Basic Statistics
function basicStat(nobs, xdata, ydata, stat) {
        var tempx, tempy;
        var xsum = 0;
        var ysum = 0;
        for (i=0; i<nobs; i++) {
          xsum += xdata[i];
          ysum += ydata[i];
        }
        var xavg = xsum / nobs;
        var yavg = ysum / nobs;

        var sxx = 0;
        var sxy = 0;
        var syy = 0;
        for (i=0; i<nobs; i++) {
          tempx = xdata[i] - xavg;
          tempy = ydata[i] - yavg;
          sxx += tempx*tempx;
          syy += tempy*tempy;
          sxy += tempx*tempy; 
        }
        var xstd = Math.sqrt(sxx / nobs);
        var ystd = Math.sqrt(syy / nobs);
        var betaR   = sxy / sxx;
        var alphaR  = yavg - betaR*xavg;
        var corr    = sxy / Math.sqrt(sxx * syy);
        var rsquare = corr * corr;

        var xmin = xdata[0];
        var xmax = xdata[0];
        var ymin = ydata[0];
        var ymax = ydata[0];
        for (i=1; i<nobs; i++) {
          if (xmin > xdata[i]) xmin = xdata[i];
          if (xmax < xdata[i]) xmax = xdata[i];
          if (ymin > ydata[i]) ymin = ydata[i];
          if (ymax < ydata[i]) ymax = ydata[i];
        } 

        // 그래프 화면 정의 
        var gxmin   = -4;
        var gxmax   =  4;
        var gymin   = -4;
        var gymax   =  4;
        var gxrange = gxmax - gxmin;
        var gyrange = gymax - gymin;

        // save statistic
        stat[0]  = nobs;
        stat[1]  = xavg;    stat[11] = yavg;
        stat[2]  = xstd;    stat[12] = ystd;
        stat[3]  = xmin;    stat[13] = ymin;
        stat[4]  = xmax;    stat[14] = ymax;
        stat[5]  = gxmin;   stat[15] = gymin
        stat[6]  = gxmax;   stat[16] = gymax;
        stat[7]  = alphaR; 
        stat[8]  = betaR;
        stat[9]  = corr;
        stat[10] = rsquare;    
}


// =============================================================================================================
// Testing Hypothesis : mu
// =============================================================================================================

// t분포 testing hypothesis 그래프 함수 --------------------------------------------------
function drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, a, b, prob, pvalue) {

         var margin  = {top: 100, bottom: 190, left: 80, right: 80};
         var graphWidth2   = svgWidth2 - margin.left - margin.right;
         var graphHeight2  = svgHeight2 - margin.top - margin.bottom;
         var x1, y1, x2, y2, info, ta, tb, tx, ty, str;
         var gxmin   = - 5;
         var gxmax   = 5;
         var gxrange = gxmax - gxmin;
         var gymin   = 0;
         var ymax    = 1/(Math.sqrt(2*Math.PI));
         var gymax   = ymax + ymax/5; 
         var gyrange = gymax - gymin;

         // 전체 제목
         drawTitleM(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);

         // 통계량 제목
         tx = margin.left + graphWidth2/2;
         ty = margin.top - 20;
         if (hypoType == 1) {
           str = "Ho: \u03bc = \u03bco , ";
           if (h1Type == 1)      str +=" H1: \u03bc \u2260 \u03bco ";
           else if (h1Type == 2) str +=" H1: \u03bc > \u03bco ";  
           else                  str +=" H1: \u03bc < \u03bco ";
           str += ", \u03bco = "+ f2(statT[0]);
           if (testType == 1) str += " , \u03c3 = " + f2(statT[1]);
         }
         else if (hypoType == 41 || hypoType == 42) {
           str = "Ho: \u03bc1 - \u03bc2 = D, ";
           if (h1Type == 1)      str +=" H1: \u03bc1 - \u03bc2 \u2260 D , ";
           else if (h1Type == 2) str +=" H1: \u03bc1 - \u03bc2 > 0 ";  
           else                  str +=" H1: \u03bc1 - \u03bc2 < 0 ";
           str += "D = " + f2(statT[0]); 
         }
         chart.append("text").attr("x", tx).attr("y", ty).text(str)
              .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")

         ty += 20;
         if (hypoType == 1)       str = "[TestStat] = (m - \u03bco) / ( s/\u221A n )  ~  t("+df+") Distribution";
         else if (hypoType == 41) str = "[TestStat] = (m1-m2-D) / (pooledStd * \u221A(1/n1+1/n2))  ~  t("+df+") Distribution";
         else if (hypoType == 42) str = "[TestStat] = (m1-m2-D) / (sqrt(var1/n1 + var2/n2))  ~  t'("+df+") Distribution";  
         chart.append("text").attr("x", tx).attr("y", ty).text(str)
              .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")

         drawAxisNormal(margin.top, margin.bottom, margin.left, margin.right, gxmin, gxmax, gymin, gymax);
         
         var x = [];
         var y = [];
         var step = (gxmax - gxmin)/graphWidth2;
         x[0] = gxmin;
         y[0] = t_pdf(x[0], df, info);
         x1   = margin.left + graphWidth2*(x[0]-gxmin)/gxrange;
         y1   = margin.top + graphHeight2 - graphHeight2*(y[0]-gymin)/gyrange;

         for (var k=1; k<=graphWidth2; k++) {
           x[k] = x[k-1] + step;
           y[k] = t_pdf(x[k], df, info);
           x2   = margin.left + graphWidth2*(x[k]-gxmin)/gxrange;
           y2   = margin.top + graphHeight2 - graphHeight2*(y[k]-gymin)/gyrange;
           chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
                .attr("stroke","black").attr("stroke-width","2px")
           x1   = x2;
           y1   = y2;    
         }

         var tempx, tempy;
         var tempx = a;
         do { 
           tempy = t_pdf(tempx, df, info);
           x1   = margin.left + graphWidth2*(tempx-gxmin)/gxrange;
           x2   = x1;
           y1   = margin.top  + graphHeight2;
           y2   = margin.top  + graphHeight2 - graphHeight2*(tempy-gymin)/gyrange;
           chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
                .attr("stroke","#0055FF").attr("stroke-width","2px")
           tempx += step;        
         } while( tempx <= b ) 

         // a, b, prob 표시
         ta = margin.left + graphWidth2*(a-gxmin)/gxrange;
         tb = margin.left + graphWidth2*(b-gxmin)/gxrange;
         ty = svgHeight2 - margin.bottom + 40;
         chart.append("line").attr("x1",ta).attr("y1",ty-40).attr("x2",ta).attr("y2",ty-15)
              .attr("stroke","#0055FF").attr("stroke-width","2px")
         chart.append("line").attr("x1",tb).attr("y1",ty-40).attr("x2",tb).attr("y2",ty-15)
              .attr("stroke","#0055FF").attr("stroke-width","2px")
         chart.append("text").attr("x", ta).attr("y", ty+5).text(f2(a))
              .attr("stroke","#0055FF").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         chart.append("text").attr("x", tb).attr("y", ty+5).text(f2(b))
              .attr("stroke","#0055FF").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")

         // Accept, Reject regions
         chart.append("text").attr("x", (ta+tb)/2).attr("y", ty).text("<- Accept Ho ->")
              .attr("stroke","#0055FF").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")

         if (h1Type == 1) {  
           chart.append("text").attr("x", ta-60).attr("y", ty).text("Reject Ho ->")
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
           chart.append("text").attr("x", tb+60).attr("y", ty).text("<- Rejectt Ho")
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
           chart.append("text").attr("x", ta-40).attr("y", ty-60).text(f3(prob))
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
           chart.append("text").attr("x", tb+45).attr("y", ty-60).text(f3(prob))
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")

         }
         else if (h1Type == 2) {
           chart.append("text").attr("class","mean").attr("x", tb+50).attr("y", ty).text("<- Rejectt Ho")
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
           chart.append("text").attr("class","mean").attr("x", tb+50).attr("y", ty-60).text(f3(prob))
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         }
         else {
           chart.append("text").attr("class","mean").attr("x", ta-60).attr("y", ty).text("Reject Ho ->")
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
           chart.append("text").attr("class","mean").attr("x", ta-50).attr("y", ty-60).text(f3(prob))
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         }

         // draw test statistics
         x1 = margin.left + graphWidth2*(teststat-gxmin)/gxrange;
         x2 = x1;
         y1 = margin.top + graphHeight2;
         y2 = y1 + 60;
         chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
              .attr("stroke-width","2px").attr("stroke","green");
         chart.append("text").attr("x", x1).attr("y", y2+15).text("[TestStat] = "+f3(teststat))
              .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         chart.append("text").attr("x", x1).attr("y", y2+30).text(" p-value  = "+f3(pvalue))
              .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")

         // Decision
         if (teststat > a && teststat < b) {
           chart.append("text").attr("x", tx).attr("y", y2+50).text("[Decision] Accept Ho")
                .attr("stroke","#0055FF").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         }
         else {
           chart.append("text").attr("x", tx).attr("y", y2+50).text("[Decision] Reject Ho")
                .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         }
         chart.append("line").attr("class","line2")
              .attr("x1",0).attr("y1",y2+60).attr("x2",svgWidth2).attr("y2",y2+60);

         // print sample stat & confidence interval
         tx = 20;
         ty = margin.top + graphHeight2 + 140;
         if (hypoType == 1) {
           str  = "[Sample Statistics] size n = "  + statT[3] + ", ";
           str += " mean m = " + f2(statT[4]) + ", ";
           str += " std s = "  + f2(statT[5]) ;
           chart.append("text").attr("x", tx).attr("y", ty).text(str)
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")
           str  = "[Confidence Interval] ";
           str += " "+(100*(1-alpha)).toString()+"% confidence level ";
           str += " ( "+ f2(statT[6]) +" , " + f2(statT[7]) + " )";
           chart.append("text").attr("x", tx).attr("y", ty+20).text(str)
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")
         }
         else if (hypoType == 41 || hypoType == 42) {
           str  = "[Sample 1 Statistics] size n1 = "  + statT[3] + ", ";
           str += " mean m1 = " + f2(statT[4]) + ", ";
           str += " std s1 = "  + f2(statT[5]) ;
           chart.append("text").attr("x", tx).attr("y", ty).text(str)
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")
           str  = "[Sample 2 Statistics] size n2 = "  + statT[6] + ", ";
           str += " mean m2 = " + f2(statT[7]) + ", ";
           str += " std s2 = "  + f2(statT[8]) ;
           chart.append("text").attr("x", tx).attr("y", ty+20).text(str)
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")
         }

}     

// 정규분포 그래프 함수 --------------------------------------------------
function drawNormalGraphTH(hypoType, h1Type, testType, statT, teststat, mu, sigma, a, b, prob, pvalue) {

         var margin  = {top: 100, bottom: 190, left: 80, right: 80};
         var graphWidth2   = svgWidth2 - margin.left - margin.right;
         var graphHeight2  = svgHeight2 - margin.top - margin.bottom;
         var x1, y1, x2, y2, ta, tb, tx, ty, str;
         var gxmin   = mu - 5*sigma;
         var gxmax   = mu + 5*sigma;
         var gxrange = gxmax - gxmin;
         var gymin   = 0;
         var ymax    = 1/(sigma*Math.sqrt(2*Math.PI));
         var gymax   = ymax + ymax/5; 
         var gyrange = gymax - gymin;

         // 전체 제목
         drawTitleM(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);

         // 통계량 제목
         tx = margin.left + graphWidth2/2;
         ty = margin.top - 20;
         if (hypoType == 1) {
           str = "Ho: \u03bc = \u03bco , ";
           if (h1Type == 1)      str +=" H1: \u03bc \u2260 \u03bco ";
           else if (h1Type == 2) str +=" H1: \u03bc > \u03bco ";  
           else                  str +=" H1: \u03bc < \u03bco ";
           str += ", \u03bco = "+ f2(statT[0]);
         }
         else if (hypoType == 3) {
           str = "Ho: P = Po , ";
           if (h1Type == 1)      str +=" H1: P \u00b1 Po ";
           else if (h1Type == 2) str +=" H1: P > Po ";  
           else                  str +=" H1: P < Po ";
           str += ", Po = "+ f2(statT[0]);
         }
         else if (hypoType == 6) {
           str = "Ho: P1 = P2 ";
           if (h1Type == 1)      str +=" H1: P1 \u00b1 P2";
           else if (h1Type == 2) str +=" H1: P1 > P";  
           else                  str +=" H1: P1 < P";
         }
         chart.append("text").attr("x", tx).attr("y", ty).text(str)
              .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")

         ty += 20;
         if (hypoType == 1)      str = "[TestStat] = (m - mu) / ( s / sqrt(n) )  ~  N(0,1) Distribution";
         else if (hypoType == 3) str = "[TestStat] = (p - Po) / ( sqrt(p*(1-p)/n) )  ~  N(0,1) Distribution";
         else if (hypoType == 6) str = "[TestStat] = (p1 - p2 - D) / (sqrt(pbar*(1-pbar)(1/n1 + 1/n2) )  ~  N(0,1) Distribution";
         chart.append("text").attr("x", tx).attr("y", ty).text(str)
              .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")

         drawAxisNormal(margin.top, margin.bottom, margin.left, margin.right, gxmin, gxmax, gymin, gymax);
         
         var x = [];
         var y = [];
         var step = (gxmax - gxmin)/graphWidth2;
         x[0] = gxmin;
         y[0] = normal_pdf(mu, sigma, x[0] );
         x1   = margin.left + graphWidth2*(x[0]-gxmin)/gxrange;
         y1   = margin.top + graphHeight2 - graphHeight2*(y[0]-gymin)/gyrange;

         for (var k=1; k<=graphWidth2; k++) {
           x[k] = x[k-1] + step;
           y[k] = normal_pdf(mu, sigma, x[k] );
           x2   = margin.left + graphWidth2*(x[k]-gxmin)/gxrange;
           y2   = margin.top + graphHeight2 - graphHeight2*(y[k]-gymin)/gyrange;
           chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
                .attr("stroke","black").attr("stroke-width","2px")
           x1   = x2;
           y1   = y2;    
         }

         var tempx, tempy;
         var tempx = a;
         do { 
           tempy = normal_pdf(mu, sigma, tempx );
           x1   = margin.left + graphWidth2*(tempx-gxmin)/gxrange;
           x2   = x1;
           y1   = margin.top  + graphHeight2;
           y2   = margin.top  + graphHeight2 - graphHeight2*(tempy-gymin)/gyrange;
           chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
                .attr("stroke","#0055FF").attr("stroke-width","2px")
           tempx += step;        
         } while( tempx <= b ) 

         // a, b, prob 표시
         ta = margin.left + graphWidth2*(a-gxmin)/gxrange;
         tb = margin.left + graphWidth2*(b-gxmin)/gxrange;
         ty = svgHeight2 - margin.bottom + 40;
         chart.append("line").attr("x1",ta).attr("y1",ty-40).attr("x2",ta).attr("y2",ty-15)
              .attr("stroke","#0055FF").attr("stroke-width","2px")
         chart.append("line").attr("x1",tb).attr("y1",ty-40).attr("x2",tb).attr("y2",ty-15)
              .attr("stroke","#0055FF").attr("stroke-width","2px")
         chart.append("text").attr("x", ta).attr("y", ty+5).text(f2(a))
              .attr("stroke","#0055FF").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         chart.append("text").attr("x", tb).attr("y", ty+5).text(f2(b))
              .attr("stroke","#0055FF").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")


         // Accept, Reject regions
         chart.append("text").attr("x", (ta+tb)/2).attr("y", ty).text("<- Accept Ho ->")
              .attr("stroke","#0055FF").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
 
         if (h1Type == 1) {  
           chart.append("text").attr("x", ta-60).attr("y", ty).text("Reject Ho ->")
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
           chart.append("text").attr("x", tb+60).attr("y", ty).text("<- Rejectt Ho")
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
           chart.append("text").attr("x", ta-40).attr("y", ty-60).text(f3(prob))
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
           chart.append("text").attr("x", tb+45).attr("y", ty-60).text(f3(prob))
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")

         }
         else if (h1Type == 2) {
           chart.append("text").attr("class","mean").attr("x", tb+50).attr("y", ty).text("<- Rejectt Ho")
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
           chart.append("text").attr("class","mean").attr("x", tb+50).attr("y", ty-60).text(f3(prob))
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         }
         else {
           chart.append("text").attr("class","mean").attr("x", ta-60).attr("y", ty).text("Reject Ho ->")
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
           chart.append("text").attr("class","mean").attr("x", ta-50).attr("y", ty-60).text(f3(prob))
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         }

         // draw test statistics
         x1 = margin.left + graphWidth2*(teststat-gxmin)/gxrange;
         x2 = x1;
         y1 = margin.top + graphHeight2;
         y2 = y1 + 60;
         chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
              .attr("stroke-width","2px").attr("stroke","green");
         chart.append("text").attr("x", x1).attr("y", y2+15).text("[TestStat] = "+f3(teststat))
              .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         chart.append("text").attr("x", x1).attr("y", y2+30).text(" p-value  = "+f3(pvalue))
              .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")

         // Decision
         if (teststat > a && teststat < b) {
           chart.append("text").attr("x", tx).attr("y", y2+50).text("[Decision] Accept Ho")
                .attr("stroke","#0055FF").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         }
         else {
           chart.append("text").attr("x", tx).attr("y", y2+50).text("[Decision] Reject Ho")
                .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         }
         chart.append("line").attr("x1",0).attr("y1",y2+60).attr("x2",svgWidth2).attr("y2",y2+60)
              .attr("stroke-width","0.7px").attr("stroke","black");

         // print sample stat & confidence interval
         tx = 20;
         ty = margin.top + graphHeight2 + 140;
         if (hypoType == 1) {
           str  = "[Sample Statistics] size n = "  + statT[3] + ", ";
           str += " mean m = " + f2(statT[4]) + ", ";
           str += " std s = "  + f2(statT[5]) ;
           chart.append("text").attr("x", tx).attr("y", ty).text(str)
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")
           str  = "[Confidence Interval] ";
           str += " with "+(100*(1-alpha)).toString()+"% Confidence level ";
           str += " ( "+ f2(statT[6]) +" , " + f2(statT[7]) + " )";
           chart.append("text").attr("x", tx).attr("y", ty+20).text(str)
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")
         }

}     

// 축 그리기
function drawAxisNormal(top, bottom, left, right, gxmin, gxmax, gymin, gymax) {
        var margin  = {top, bottom, left, right};
        margin.top    = top;
        margin.bottom = bottom;
        margin.left   = left;
        margin.right  = right;

        var graphWidth2   = svgWidth2 - margin.left - margin.right;
        var graphHeight2  = svgHeight2 - margin.top - margin.bottom;

        var xScale = d3.scaleLinear().domain([gxmin,gxmax]).range([0,graphWidth2]);
        var yScale = d3.scaleLinear().domain([gymax,0]).range([0,graphHeight2]);
        var ty =  margin.top + graphHeight2;

        chart.append("g")
          .attr("transform","translate("+margin.left+","+ty+")")
          .call(d3.axisBottom(xScale))     

        chart.append("g")
          .attr("transform","translate("+margin.left+","+margin.top+")")
          .call(d3.axisLeft(yScale))                  // 눈금을 표시할 함수 호출
}


// =============================================================================================================
// Testing Hypothesis : sigma
// =============================================================================================================

// chisq 분포 가설검정 그래프 함수 --------------------------------------------------
function drawChisqGraphTH(hyphType, h1Type, statT, teststat, df, a, b, prob, pvalue) {

         var margin  = {top: 100, bottom: 190, left: 100, right: 100};
         var graphWidth2   = svgWidth2 - margin.left - margin.right;
         var graphHeight2  = svgHeight2 - margin.top - margin.bottom;
         var x1, y1, x2, y2, info, ta, tb, tx, ty, str;
         var ymax, gxmin, gxmax, gymin, gymax, gxrange, gyrange;

         gxmin = 0;
         gymin = 0;
         if (df < 2)       {gxmax = 12;  ymax = 1.5;}
         else if (df < 5)  {gxmax = 12;  ymax = 0.6;}
         else if (df < 10) {gxmax = 30;  ymax = 0.15;}
         else {gxmin = chisq_inv(0.0001, df, info), gxmax = chisq_inv(0.9999, df, info);  ymax = 0.1;}
  
         gxrange = gxmax - gxmin;
         gymax   = ymax + ymax/5; 
         gyrange = gymax - gymin;

         // 전체 제목
         drawTitleM(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);

         // 통계량 제목
         tx = margin.left + graphWidth2/2;
         ty = margin.top - 20;
         if (hypoType == 2) {
           str = "Ho: \u03C3\u00B2 = \u03C3o\u00B2  , ";
           if (h1Type == 1)      str +=" H1: \u03C3\u00B2 \u2260 \u03C3o\u00B2 ";
           else if (h1Type == 2) str +=" H1: \u03C3\u00B2 > \u03C3o\u00B2 ";  
           else                  str +=" H1: \u03C3\u00B2 < \u03C3o\u00B2 ";
           str += ", \u03C3o\u00B2 = "+ f2(statT[0]);
         }
         else if (hypoType == 8) {
           str  = "Ho: row and column are independent , ";
           str +=" H1: row and columen are dependent";
         }
         chart.append("text").attr("x", tx).attr("y", ty).text(str)
              .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")

         ty += 20;
         if (hypoType == 2)      str = "[TestStat] = (n - 1) s\u00B2 / \u03C3o\u00B2 ~ \u03C7\u00B2("+df+") Distribution";
         else if (hypoType == 8) str = "[TestStat] = Sum( EF - OF)^2 / EF ) ~  ChiSq("+df+") Distribution";
         chart.append("text").attr("x", tx).attr("y", ty).text(str)
              .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")

         drawAxisNormal(margin.top, margin.bottom, margin.left, margin.right, gxmin, gxmax, gymin, gymax);
         
         var x = [];
         var y = [];
         var step = (gxmax - gxmin)/graphWidth2;
         x[0] = gxmin;
         y[0] = chisq_pdf(x[0], df, info);
         x1   = margin.left + graphWidth2*(x[0]-gxmin)/gxrange;
         y1   = margin.top + graphHeight2 - graphHeight2*(y[0]-gymin)/gyrange;

         for (var k=1; k<=graphWidth2; k++) {
           x[k] = x[k-1] + step;
           y[k] = chisq_pdf(x[k], df, info);
           x2   = margin.left + graphWidth2*(x[k]-gxmin)/gxrange;
           y2   = margin.top + graphHeight2 - graphHeight2*(y[k]-gymin)/gyrange;
           chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
                .attr("stroke","black").attr("stroke-width","2px")
           x1   = x2;
           y1   = y2;    
         }

         var tempx, tempy;
         var tempx = a;
         do { 
           tempy = chisq_pdf(tempx, df, info);
           x1   = margin.left + graphWidth2*(tempx-gxmin)/gxrange;
           x2   = x1;
           y1   = margin.top  + graphHeight2;
           y2   = margin.top  + graphHeight2 - graphHeight2*(tempy-gymin)/gyrange;
           chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
                .attr("stroke","#0055FF").attr("stroke-width","2px")
           tempx += step;        
         } while( tempx <= b ) 

         // a, b, prob 표시
         ta = margin.left + graphWidth2*(a-gxmin)/gxrange;
         tb = margin.left + graphWidth2*(b-gxmin)/gxrange;
         ty = svgHeight2 - margin.bottom + 40;
         chart.append("line").attr("x1",ta).attr("y1",ty-40).attr("x2",ta).attr("y2",ty-15)
              .attr("stroke","#0055FF").attr("stroke-width","2px")
         chart.append("line").attr("x1",tb).attr("y1",ty-40).attr("x2",tb).attr("y2",ty-15)
              .attr("stroke","#0055FF").attr("stroke-width","2px")
         chart.append("text").attr("x", ta).attr("y", ty+5).text(f2(a))
              .attr("stroke","#0055FF").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         chart.append("text").attr("x", tb).attr("y", ty+5).text(f2(b))
              .attr("stroke","#0055FF").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")

         // Accept, Reject regions
         chart.append("text").attr("x", (ta+tb)/2).attr("y", ty).text("<- Accept Ho ->")
              .attr("stroke","#0055FF").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
 
         if (h1Type == 1) {  
           chart.append("text").attr("x", ta-60).attr("y", ty).text("Reject Ho ->")
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
           chart.append("text").attr("x", tb+60).attr("y", ty).text("<- Rejectt Ho")
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
           chart.append("text").attr("x", ta-40).attr("y", ty-60).text(f3(prob))
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
           chart.append("text").attr("x", tb+45).attr("y", ty-60).text(f3(prob))
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")

         }
         else if (h1Type == 2) {
           chart.append("text").attr("class","mean").attr("x", tb+50).attr("y", ty).text("<- Rejectt Ho")
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
           chart.append("text").attr("class","mean").attr("x", tb+50).attr("y", ty-60).text(f3(prob))
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         }
         else {
           chart.append("text").attr("class","mean").attr("x", ta-60).attr("y", ty).text("Reject Ho ->")
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
           chart.append("text").attr("class","mean").attr("x", ta-50).attr("y", ty-60).text(f3(prob))
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         }

         // draw test statistics
         x1 = margin.left + graphWidth2*(teststat-gxmin)/gxrange;
         x2 = x1;
         y1 = margin.top + graphHeight2;
         y2 = y1 + 60;
         chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
              .attr("stroke-width","2px").attr("stroke","green");
         chart.append("text").attr("x", x1).attr("y", y2+15).text("[TestStat] = "+f3(teststat))
              .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         chart.append("text").attr("x", x1).attr("y", y2+30).text(" p-value  = "+f3(pvalue))
              .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")

         // Decision
         if (teststat > a && teststat < b) {
           chart.append("text").attr("x", tx).attr("y", y2+50).text("[Decision] Accept Ho")
                .attr("stroke","#0055FF").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         }
         else {
           chart.append("text").attr("x", tx).attr("y", y2+50).text("[Decision] Reject Ho")
                .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         }
         chart.append("line").attr("x1",0).attr("y1",y2+60).attr("x2",svgWidth2).attr("y2",y2+60)
              .attr("stroke-width","0.7px").attr("stroke","black");

         // print sample stat & confidence interval
         tx = 20;
         ty = margin.top + graphHeight2 + 140;
         if (hypoType == 2) {
           str  = "[Sample Statistics] size n = "  + statT[3] + ", ";
           str += " mean m = " + f2(statT[4]) + ", ";
           str += " std s = "  + f2(statT[5]) ;
           chart.append("text").attr("x", tx).attr("y", ty).text(str)
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")
           str  = "[Confidence Interval] ";
           str += " "+(100*(1-alpha)).toString()+"% confidence level ";
           str += " ( "+ f2(statT[6]) +" , " + f2(statT[7]) + " )";
           chart.append("text").attr("x", tx).attr("y", ty+20).text(str)
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")  
         }

}     

// =============================================================================================================
// Testing Hypothesis : (sigma1, sigma2),   ANOVA
// =============================================================================================================

// F 분포 가설검정 그래프 함수 --------------------------------------------------
function drawFdistGraphTH(hypoType, h1Type, statF, df1, df2, a, b, prob, pvalue, ngroup, nobs, avg, std) {

         var k;
         var margin  = {top: 90, bottom: 200, left: 100, right: 100};
         var graphWidth2   = svgWidth2 - margin.left - margin.right;
         var graphHeight2  = svgHeight2 - margin.top - margin.bottom;
         var x1, y1, x2, y2, info, ta, tb, tc, td, te, t1, t2, t3, tx, ty, str;
         var ymax, gxmin, gxmax, gymin, gymax, gxrange, gyrange;

         gxmin = 0;
         gxmax = 10;
         gymin = 0;
         ymax  = 1.5;
 
         gxrange = gxmax - gxmin;
         gymax   = ymax + ymax/5; 
         gyrange = gymax - gymin;

         // 전체 제목
         drawTitleM(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);

         // 가설 제목
         tx = margin.left + graphWidth2/2;
         ty = margin.top - 20;
         if (hypoType == 5) {
           str = "Ho: \u03C31\u00B2 = \u03C32\u00B2  , ";
           if (h1Type == 1)      str +=" H1: \u03C31\u00B2 \u2260 \u03C32\u00B2 ";
           else if (h1Type == 2) str +=" H1: \u03C31\u00B2 > \u03C32\u00B2 ";  
           else                  str +=" H1: \u03C31\u00B2 < \u03C32\u00B2 ";
         }
         else if (hypoType == 7) {
           str  = "Ho: \u03BC1 = \u03BC2 = ... = \u03BCk , ";
           str +=" H1: at least one pair of means is no equal ";
         }
         chart.append("text").attr("x", tx).attr("y", ty).text(str)
              .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")

         // 통계량 
         ty += 20;
         if (hypoType == 5)       str = "[TestStat] = ( s1\u00B2 / s2\u00B2 )  ~  F("+df1+","+df2+") Distribution";
         else if (hypoType == 7)  str = "[TestStat] = (BSS / (k-1)) / (ESS / (n-k))  ~  F("+df1+","+df2+") Distribution";
         chart.append("text").attr("x", tx).attr("y", ty).text(str)
              .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")

         drawAxisNormal(margin.top, margin.bottom, margin.left, margin.right, gxmin, gxmax, gymin, gymax);
         
         var x = [];
         var y = [];
         var step = (gxmax - gxmin)/graphWidth2;
         x[0] = gxmin;
         y[0] = f_pdf(x[0], df1, df2, info);
         x1   = margin.left + graphWidth2*(x[0]-gxmin)/gxrange;
         y1   = margin.top + graphHeight2 - graphHeight2*(y[0]-gymin)/gyrange;

         for (var k=1; k<=graphWidth2; k++) {
           x[k] = x[k-1] + step;
           y[k] = f_pdf(x[k], df1, df2, info);
           x2   = margin.left + graphWidth2*(x[k]-gxmin)/gxrange;
           y2   = margin.top + graphHeight2 - graphHeight2*(y[k]-gymin)/gyrange;
           chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
                .attr("stroke","black").attr("stroke-width","2px")
           x1   = x2;
           y1   = y2;    
         }

         var tempx, tempy;
         var tempx = a;
         do { 
           tempy = f_pdf(tempx, df1, df2, info);
           x1   = margin.left + graphWidth2*(tempx-gxmin)/gxrange;
           x2   = x1;
           y1   = margin.top  + graphHeight2;
           y2   = margin.top  + graphHeight2 - graphHeight2*(tempy-gymin)/gyrange;
           chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
                .attr("stroke","#0055FF").attr("stroke-width","2px")
           tempx += step;        
         } while( tempx <= b ) 

         // a, b, prob 표시
         ta = margin.left + graphWidth2*(a-gxmin)/gxrange;
         tb = margin.left + graphWidth2*(b-gxmin)/gxrange;
         ty = svgHeight2 - margin.bottom + 30;
         chart.append("line").attr("x1",ta).attr("y1",ty-30).attr("x2",ta).attr("y2",ty-10)
              .attr("stroke","#0055FF").attr("stroke-width","2px")
         chart.append("line").attr("x1",tb).attr("y1",ty-30).attr("x2",tb).attr("y2",ty-10)
              .attr("stroke","#0055FF").attr("stroke-width","2px")
         chart.append("text").attr("x", ta).attr("y", ty+10).text(f2(a))
              .attr("stroke","#0055FF").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         chart.append("text").attr("x", tb).attr("y", ty+10).text(f2(b))
              .attr("stroke","#0055FF").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")

         // Accept, Reject regions
         chart.append("text").attr("x", (ta+tb)/2).attr("y", ty).text("<- Accept Ho ->")
              .attr("stroke","#0055FF").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")

         if (h1Type == 1) {  
           chart.append("text").attr("x", ta-60).attr("y", ty).text("Reject Ho ->")
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
           chart.append("text").attr("x", tb+60).attr("y", ty).text("<- Rejectt Ho")
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
           chart.append("text").attr("x", ta-40).attr("y", ty-60).text(f3(prob))
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
           chart.append("text").attr("x", tb+45).attr("y", ty-60).text(f3(prob))
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")

         }
         else if (h1Type == 2) {
           chart.append("text").attr("x", tb+50).attr("y", ty).text("<- Rejectt Ho")
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
           chart.append("text").attr("x", tb+50).attr("y", ty-60).text(f3(prob))
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         }
         else {
           chart.append("text").attr("x", ta-60).attr("y", ty).text("Reject Ho ->")
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
           chart.append("text").attr("x", ta-50).attr("y", ty-60).text(f3(prob))
              .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         }

         // draw test statistic & decision
         x1 = margin.left + graphWidth2*(statF[0]-gxmin)/gxrange;
         if (x1 > margin.left + graphWidth2) x1 = margin.left + graphWidth2 + 10;
         x2 = x1;
         y1 = margin.top + graphHeight2;
         y2 = y1 + 50;
         chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
              .attr("stroke-width","2px").attr("stroke","green");
         chart.append("text").attr("x", x1).attr("y", y2+10).text("[TestStat] = "+f2(statF[0])+", p-value  = "+f3(pvalue) )
              .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")

         if (statF[0] > a && statF[0] < b) {
           chart.append("text").attr("x", tx).attr("y", y2+25).text("[Decision] Accept Ho")
                .attr("stroke","#0055FF").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         }
         else {
           chart.append("text").attr("x", tx).attr("y", y2+25).text("[Decision] Reject Ho")
                .attr("stroke","red").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","middle")
         }

         if (hypoType == 5) ty = y2 + 45;
         else if (hypoType == 7) ty = y2 +35;
         chart.append("line").attr("x1",0).attr("y1",ty).attr("x2",svgWidth2).attr("y2",ty)
              .attr("stroke-width","0.7px").attr("stroke","black");

         // sample statistics & anova table
         if (hypoType == 7) {
           tx = 10;
           ty = y2 + 53;

           str  = "Sample Size : "
           for (k=0; k<ngroup; k++) {str += "n"+(k+1).toString()+"="+nobs[k]+", ";}
           chart.append("text").attr("x", tx).attr("y", ty).text(str)
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")
           str  = "Sample Mean : "
           for (k=0; k<ngroup; k++) {str += "m"+(k+1).toString()+"="+f2(avg[k])+", ";}
           chart.append("text").attr("x", tx).attr("y", ty+15).text(str)
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")
           str  = "Sample Stdev: "
           for (k=0; k<ngroup; k++) {str += "s"+(k+1).toString()+"="+f2(std[k])+", ";}
           chart.append("text").attr("x", tx).attr("y", ty+30).text(str)
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")

           ta = 70;      tb = ta + 100; tc = tb + 60; td = tc + 100; te = td + 80;
           t1 = ty + 35; t2 = t1 + 15; t3 = t2 + 15; t4 = t3 + 15;
           chart.append("text").attr("x", ta-60).attr("y", t2).text("[ANOVA]")
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")

           chart.append("text").attr("x", ta).attr("y", t2).text("BSS="+f2(statF[1]) )
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")
           chart.append("text").attr("x", tb).attr("y", t2).text("df="+df1)
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")
           chart.append("text").attr("x", tc).attr("y", t2).text("MSB="+f2(statF[4]) )
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")
           chart.append("text").attr("x", td).attr("y", t2).text("Fobs="+f2(statF[0]) )
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")
           chart.append("text").attr("x", te).attr("y", t2).text("p-value="+f3(pvalue) )
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")

           chart.append("text").attr("x", ta).attr("y", t3).text("ESS="+f2(statF[2]) )
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")
           chart.append("text").attr("x", tb).attr("y", t3).text("df="+df2)
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")
           chart.append("text").attr("x", tc).attr("y", t3).text("MSE="+f2(statF[5]) )
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")

           chart.append("text").attr("x", ta).attr("y", t4).text("TSS="+f2(statF[3]) )
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")
         }
         else if (hypoType == 5){
           tx = 20;
           ty = margin.top + graphHeight2 + 130;

           str  = "[Sample 1 Statistics] size n1 = "  + statF[3] + ", ";
           str += " mean m1 = " + f2(statF[4]) + ", ";
           str += " std s1 = "  + f2(statF[5]) ;
           chart.append("text").attr("x", tx).attr("y", ty).text(str)
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")
           str  = "[Sample 2 Statistics] size n2 = "  + statF[6] + ", ";
           str += " mean m2 = " + f2(statF[7]) + ", ";
           str += " std s2 = "  + f2(statF[8]) ;
           chart.append("text").attr("x", tx).attr("y", ty+20).text(str)
                .attr("stroke","green").attr("font-size","9pt").attr("font-family","sans-serif").attr("text-anchor","start")  
         }

}     

