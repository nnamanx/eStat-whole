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
var colors = d3.scaleLinear().domain([0,1]).range(["yellow","red"]);
// 그래프버튼의 string
var strGraph = new Array(40);
strGraph[1]  = "separate1";     // 수직 분리형 막대
strGraph[2]  = "stack2V";       // 수직 쌓는형 막대
strGraph[3]  = "ratio2V";       // 수직 비율형 막대
strGraph[4]  = "side2V";        // 수직 나란형 막대
strGraph[5]  = "bothbar2V";     // 수직 양쪽형 막대
strGraph[6]  = "separate2H";    // 수평 분리형 막대
strGraph[7]  = "stack2H";       // 수평 쌓는형 막대
strGraph[8]  = "ratio2H";       // 수평 비율형 막대
strGraph[9]  = "side2H";        // 수평 나란형 막대
strGraph[10] = "bothbar2H";     // 수평 양쪽형 막대
strGraph[11] = "pie1";          // 파이차트
strGraph[12] = "donut2";        // 도넛 그래프
strGraph[13] = "band1";         // 띠그래프
strGraph[14] = "line1";         // 꺽은선그래프
strGraph[15] = "dot1";          // 점그래프
strGraph[16] = "box1";          // 상자그래프
strGraph[17] = "stem1";         // 줄기잎그래프
strGraph[18] = "bothstem2";     // 양쪽형 줄기잎그
strGraph[19] = "hist1";         // 히스토그램
strGraph[20] = "scatter1";      // 산점도
strGraph[21] = "scatterRedraw"; // 산점도 Redraw
strGraph[22] = "statTable";     // 기초통계량
strGraph[23] = "freqTable";     // 도수분포표-꺽은선
strGraph[24] = "testM1";        // 가설검정 mu
strGraph[25] = "executeTH8";    // 가설검정 mu 실행
strGraph[26] = "testS1";        // 가설검정 sigma
strGraph[27] = "executeTH9";    // 가설검정 sigma 실행
strGraph[28] = "testM12";       // 가설검정 mu12
strGraph[29] = "executeTH10";   // 가설검정 mu12
strGraph[30] = "testS12";       // 가설검정 sigma
strGraph[31] = "executeTH11";   // 가설검정 sigma
strGraph[32] = "anova";         // 가설검정 anova 
strGraph[33] = "executeTH12";   // 가설검정 anova 
strGraph[34] = "regression";    // 회귀분석

// 한글 체크 
function is_hangul_char(ch) {
  c = ch.charCodeAt(0);
  if( 0x1100<=c && c<=0x11FF ) return true;
  if( 0x3130<=c && c<=0x318F ) return true;
  if( 0xAC00<=c && c<=0xD7A3 ) return true;
  return false;
}
// 그래프 top 선택 초기화
function graphTopInitialize() {
  numVar = 0;
  document.getElementById("analysisSelect").options[0].selected = true
  document.getElementById("analysisSelectMain").options[0].selected = true
  document.getElementById("groupSelectMain").options[0].selected = true
  document.getElementById("selectScatterY").options[0].selected = true
  document.getElementById("selectScatterX").options[0].selected = true
  document.getElementById("analysisANOVA").options[0].selected = true
  document.getElementById("factor1Select").options[0].selected = true
  document.getElementById("factor2Select").options[0].selected = true
  document.getElementById("selectRegressionY").options[0].selected = true
  document.getElementById("selectRegressionX").options[0].selected = true
  document.getElementById("analysisMu12").options[0].selected = true
  document.getElementById("groupMu12").options[0].selected = true
  document.getElementById("analysisSigma12").options[0].selected = true
  document.getElementById("groupSigma12").options[0].selected = true
//  document.getElementById("analysisLine").options[0].selected = true
  document.getElementById("xaxisLine").options[0].selected = true 
  document.getElementById("groupSelect").options[0].selected = true
  document.getElementById("sizeSelect").options[0].selected = true 
}
// 그래프 top Hide
function graphTopHide() {
  checkPastColSelection = false;
  top0Visited = false;
  top1Visited = false;
  top2Visited = false;
  top3Visited = false;
  top4Visited = false;
  top5Visited = false;
  top6Visited = false;
  top7Visited= false;
  document.getElementById("top0").style.display = "none";  // 분석변수 선택 감추기
  document.getElementById("top1").style.display = "none";  // 분석-그룹 변수선택 감추기
  document.getElementById("top2").style.display = "none";  // 산점도 Y변수, X변수 감추기
  document.getElementById("top3").style.display = "none";  // 분산분석 분석, Factor1, Factor2 감추기
  document.getElementById("top4").style.display = "none";  // 회귀분석 Y변수, X변수 감추기
  document.getElementById("top5").style.display = "none";  // TH Mu12 분석-그룹변수 감추기
  document.getElementById("top6").style.display = "none";  // 꺽은선 감추기
  document.getElementById("top7").style.display = "none"; // TH Sigma 분석-그룹변수 감추기
}
// 그래프 top0 변수선택 표시 - TH mu, sigma
function graphTop0Show() {
   graphTopInitialize();
   graphTopHide();
   top0Visited = true;
   document.getElementById("top0").style.display = "block"; // 분석변수 선택 표시
}
// 그래프 top1 변수선택 표시 - 막대/원/띠/   점/히스토/줄기/상자/THSigma12
function graphTop1Show() { 
   graphTopInitialize();
   graphTopHide();
   top1Visited = true;
   document.getElementById("top1").style.display = "block"; // 분석-그룹 변수선택 표시
/*
   j = parseInt(document.getElementById("analysisSelectMain").value)
   k = parseInt(document.getElementById("groupSelectMain").value)
   document.getElementById("analysisSelectMain").options[j].selected = true
   document.getElementById("groupSelectMain").options[k].selected = true
*/
}
// 그래프 top2 변수선택 표시 -  산점도
function graphTop2Show() {
   graphTopInitialize();
   graphTopHide();
   top2Visited = true;
   document.getElementById("top2").style.display = "block"; // 산점도 Y변수, X변수  표시
}
// 그래프 top3 변수선택 표시 - 분산분석
function graphTop3Show() {
   graphTopInitialize();
   graphTopHide();
   top3Visited = true;
   document.getElementById("top3").style.display = "block"; // 분산분석 분석, Factor1, Factor2  표시
}
// 그래프 top4 변수선택 표시 - 회귀분석
function graphTop4Show() {
   graphTopInitialize();
   graphTopHide();
   top4Visited = true;
   document.getElementById("top4").style.display = "block"; // 회귀분석 Y변수, X변수 표시
}
// 그래프 top5 변수선택 표시 - TH Mu12
function graphTop5Show() {
   graphTopInitialize();
   graphTopHide();
   top5Visited = true;
   document.getElementById("top5").style.display = "block"; // TH Mu12 분석-그룹변수 표시
}
// 그래프 top6 변수선택 표시 - 꺽은선
function graphTop6Show() {
   graphTopInitialize();
   graphTopHide();
   top6Visited = true;
   document.getElementById("top6").style.display = "block"; // 꺽은선 표시
}
// 그래프 top7 변수선택 표시 - TH Sigma12
function graphTop7Show() {
   graphTopInitialize();
   graphTopHide();
   top7Visited = true;
   document.getElementById("top7").style.display = "block"; // TH Sigma12 분석-그룹변수 표시
}
// 그래프 sub 선택사항 감추기
function graphSubHide() {
      document.getElementById("freq").checked     = false;
      document.getElementById("mean").checked     = false;
      document.getElementById("DotMean").checked  = false;
//      document.getElementById("DotStd").checked   = false;
      document.getElementById("regress").checked  = false;
      document.getElementById("HistMean").checked = false;
      document.getElementById("HistFreq").checked = false;
      document.getElementById("HistLine").checked = false;
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
      document.getElementById("sub15").style.display = "none";  //Two way ANOVA
      document.getElementById("sub16").style.display = "none";  //Simple Linear Regression 감추기
}
// Button Color Change
function buttonColorChange() {
      graphSubHide(); // 그래프 sub 선택사항 감추기
      document.getElementById("SVG").style.width  = svgWidth;
      document.getElementById("SVG").style.height = svgHeight;
      svgWidth2    = svgWidth;
      svgHeight2   = svgHeight;
      margin       = {top:80, bottom:80, left:80, right:100};
      graphWidth   = svgWidth - margin.left - margin.right;   // 그래프 영역의 너비
      graphHeight  = svgHeight - margin.top - margin.bottom;  // 그래프 영역의 높이
//      tableLoc     = svgHeight + 160;

      checkFreq     = false;
      checkBandFreq = false;
      checkDotMean  = false;
      checkDotStd   = false;
      checkHistMean = false;
      checkHistFreq = false;
      checkHistLine = false;
      checkRegress  = false;
      checkPairedT  = false;
      checkRBD      = false;
      checkScatterMatrix = false;

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
      document.getElementById("regression").style.backgroundColor = buttonColorB;
}

// 초기 그래프 제목
function graphTitle() {
    var str, gstr;
    // 주제목
    for (i = 1; i < graphNumMax; i++) {
      mTitle[i] = "";
      switch (i) {
        case  1: gstr = svgStr[1][langNum];     break; // 막대
        case  2: gstr = svgStr[1][langNum];     break;
        case  3: gstr = svgStr[1][langNum];     break;
        case  4: gstr = svgStr[1][langNum];     break;
        case  5: gstr = svgStr[1][langNum];     break;
        case  6: gstr = svgStr[1][langNum];     break;
        case  7: gstr = svgStr[1][langNum];     break;
        case  8: gstr = svgStr[1][langNum];     break;
        case  9: gstr = svgStr[1][langNum];     break;
        case 10: gstr = svgStr[1][langNum];     break;
        case 11: gstr = svgStr[2][langNum];     break; // 원
        case 12: gstr = svgStr[3][langNum];    	break; // 도넛
        case 13: gstr = svgStr[4][langNum]; 	break; // 띠
        case 14: gstr = svgStr[5][langNum];    	break; // 꺽은선
        case 15: gstr = svgStr[6][langNum];   	break; // 점
        case 16: gstr = svgStr[7][langNum];    	break; // 상자
        case 17: gstr = svgStr[8][langNum];   	break; // 줄기
        case 18: gstr = svgStr[8][langNum];    	break; 
        case 19: gstr = svgStr[9][langNum];    	break; // 히스토
        case 20: gstr = svgStr[10][langNum];   	break; // 산점도
        case 21: gstr = svgStr[10][langNum];    break; 
        case 22: gstr = svgStr[111][langNum];  	break; // GIS
        case 23: gstr = svgStr[5][langNum];     break; // 도수분포표의 꺽은선
        case 24: gstr = svgStr[86][langNum];    break; // 신뢰구간 그래프
        case 25: gstr = svgStr[11][langNum];    break; // TH mu
        case 26: gstr = svgStr[86][langNum];    break; // 신뢰구간 그래프
        case 27: gstr = svgStr[12][langNum];    break; // TH sigma
        case 28: gstr = svgStr[86][langNum];    break; // 신뢰구간 그래프
        case 29: gstr = svgStr[13][langNum];    break; // TH mu12
        case 30: gstr = svgStr[86][langNum];   	break; // 신뢰구간 그래프
        case 31: gstr = svgStr[14][langNum];    break; // TH sigma12
        case 32: gstr = svgStr[86][langNum];  	break; // 신뢰구간 그래프
        case 33: gstr = svgStr[13][langNum];    break; // ANOVA
        case 34: gstr = svgStr[89][langNum];    break; // 산점도행렬
        case 35: gstr = svgStr[83][langNum];    break; // 잔차산점도
        case 36: gstr = svgStr[80][langNum];    break; // Q-Q plot
        case 37: gstr = svgStr[86][langNum];    break; // 신뢰구간 그래프
        case 38: gstr = svgStr[97][langNum];    break; // Cook Graph
        case 39: gstr = svgStr[85][langNum];    break; // 이원분산분석
      }
      iTitle[i] = gstr;
    }
 
    initYTitle(); // y제목 초기화
    initXTitle(); // x제목 초기화
}
// y축제목 초기화
function initYTitle() {
    for (var i = 1; i <= 25; i++) {
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
        case 19: str = "";    	                break;
        case 20: str = "";        		break;
        case 21: str = "";        		break;
        case 22: str = "";        		break;
        case 23: str = "";        		break;
        case 24: str = "";        		break;
        case 25: str = "";        		break;
        case 26: str = "";        		break;
        case 27: str = "";        		break;
        case 28: str = "";        		break;
        case 29: str = "";    	                break;
        case 30: str = "";        		break;
        case 31: str = "";        		break;
        case 32: str = "";        		break;
        case 33: str = "";        		break;
        case 34: str = "";        		break;
        case 35: str = "";        		break;
        case 36: str = "";        		break;
        case 37: str = "";        		break;
        case 38: str = "";        		break;
        case 39: str = "";    	                break;
      }
      yTitle[i] = str;
    }
}
// x축제목 초기화
function initXTitle() {
    for (var i = 1; i <= 25; i++) {
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
        case 19: str = "";    	                break;
        case 20: str = "";        		break;
        case 21: str = "";        		break;
        case 22: str = "";        		break;
        case 23: str = "";        		break;
        case 24: str = "";        		break;
        case 25: str = "";        		break;
        case 26: str = "";        		break;
        case 27: str = "";        		break;
        case 28: str = "";        		break;
        case 29: str = "";    	                break;
        case 30: str = "";        		break;
        case 31: str = "";        		break;
        case 32: str = "";        		break;
        case 33: str = "";        		break;
        case 34: str = "";        		break;
        case 35: str = "";        		break;
        case 36: str = "";        		break;
        case 37: str = "";        		break;
        case 38: str = "";        		break;
        case 39: str = "";    	                break;
      }
      xTitle[i] = str;
    }
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
//       alert(alertMsg[2][langNum]);
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
        // 같은 번호 선택했는지 체크
        checkVarSame = false;
        for (i = 1; i < numVar; i++) {
           if (tdvarNumber[0] == tdvarNumber[i]) {
              checkVarSame = true;
              alert(alertMsg[46][langNum]);  // 같은 변수 선택
              return;
           }
        }

        gobs        = tdobs[1];
        gvarNumber  = tdvarNumber[1];
        gvarName    = tdvarName[1];
        ngvalue     = tdvalueNum[1]  
        for (k=0; k<ngvalue; k++) {
          gdataValue[k]  = tdvalue[1][k];
          if ( tdvalueLabel[1][k] == null ) {
            if (isNaN(tdvalue[1][k])) gvalueLabel[k] = tdvalue[1][k]; 
            else gvalueLabel[k] = svgStr[18][langNum]+(k+1).toString();
          }
          else {
            gvalueLabel[k] = tdvalueLabel[1][k];
          }
        } 
        for (i = 0; i < gobs; i++) gvar[i] = tdvar[1][i];

        dobs        = tdobs[0];
        dvarNumber  = tdvarNumber[0];
        dvarName    = tdvarName[0];
        ndvalue     = tdvalueNum[0];
        for (k = 0; k < ndvalue; k++) {
          dataValue[k]   = tdvalue[0][k];
          if (tdvalueLabel[0][k] == null ) {
            dvalueLabel[k] = tdvalue[0][k];
          }
          else {
            dvalueLabel[k] = tdvalueLabel[0][k];
          }
        } 
        for (i = 0; i < dobs; i++) dvar[i] = tdvar[0][i]; 

        // check 원시자료
        rawData = true;
        if (dobs == ndvalue) rawData = false; 
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
        ngvalue = ngroup;
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
        if (freqMin < 0) {
          alert(alertMsg[22][langNum]); // 음수
          return;
        };    
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
        if (freqMin < 0) freqMin += Math.floor(freqMin/8.-1);
        else { 
          freqMin -= Math.floor(freqMin/8.-1);
          if (freqMin > 0) freqMin = 0;   
        }
        freqMax += Math.floor(freqMax/8.+1); 
      }
}
function dataClassifyLine() { // 꺽은선 데이터
      // 자료가 없으면 경고
      checkData = true;
      for (k = 0; k < numVar; k++) {
        if (tdobs[k] == 0) {
          checkData = false;
//          alert(alertMsg[1][langNum]);
          return;
        }
      }
      // 변량선택 안하면 경고
      checkVarSelect = true;
      if (numVar == 0) {
        checkVarSelect = false;
//       alert(alertMsg[2][langNum]);
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
      if (numVar < 2) { // 꺽은선의 변수 하나는 허용안함
        checkVarSelect = false;
        return
      } 
      else { // 두 개 이상의 변수는 요약자료
        // check missing
        checkMissing = false;
        for (k=1; k<numVar; k++) {
          if (tdobs[k] != tdobs[0]) {
            checkMissing = true;
            alert(alertMsg[4][langNum]);
            return;
          }
        }
        // 같은 번호 선택했는지 체크
        checkVarSame = false;
        for (i = 0; i < numVar-1; i++) {
          for (j = i+1; j<numVar; j++) {
            if (tdvarNumber[i] == tdvarNumber[j]) {
              checkVarSame = true;
              alert(alertMsg[46][langNum]);  // 같은 변수 선택
              return;
            }
          }
        }


        dobs        = tdobs[0];
        dvarNumber  = tdvarNumber[0];
        dvarName    = tdvarName[0];
        ndvalue     = tdvalueNum[0];
        for (k = 0; k < ndvalue; k++) {
          dataValue[k]   = tdvalue[0][k];
          if (tdvalueLabel[0][k] == null ) {
            dvalueLabel[k] = tdvalue[0][k];
          }
          else {
            dvalueLabel[k] = tdvalueLabel[0][k];
          }
        } 
        for (i = 0; i < dobs; i++) dvar[i] = tdvar[0][i]; 

        ngroup = numVar - 1;
        if (ngroup > 9)  alert(alertMsg[5][langNum]);
        // 요약자료의 분석변량들의 Numeric 여부 체크
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

      } // endof else

      // 요약자료 ---------------------------------------
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
        if (freqMin < 0) freqMin += Math.floor(freqMin/8.-1);
        else { 
          freqMin -= Math.floor(freqMin/8.-1);
          if (freqMin > 0) freqMin = 0;   
        }
        freqMax += Math.floor(freqMax/8.+1); 
      }
}

// Sorting in ascending and count each value frequency
function sortAscend(dobs, dataA, dataValue, dvalueFreq) {
        var i, j, temp;
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
// Sorting in ascending and find index
function sortAscendIndex(dobs, dataA, index) {
        var i, j, temp, tempi;
        var nvalue = 0;
        for (i=0; i<dobs; i++) index[i] = i;
        for (i=0; i<dobs-1; i++) {
          for (j=i; j<dobs; j++) {
            if(dataA[i] > dataA[j]) {
              temp     = dataA[i];  tempi    = index[i];
              dataA[i] = dataA[j];  index[i] = index[j];
              dataA[j] = temp;      index[j] = tempi;
            }
          }
        } 
}
// 이산형 그래프 제목 쓰기 함수
function drawTitle(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName) { 
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
        xTitle[graphNum] = xstr;

        // 주제목
        chart.append("text")
             .attr("x",margin.left + titleBuffer)
             .attr("y",margin.top/2 + 10)
             .style("font-size","17px")
             .style("font-family","sans-seirf")
             .style("stroke","black")
             .style("text-anchor","middle")
             .text(str)
       
        // 축제목
        if (PieChart || DonutGraph || BandGraph) {
          // X축 제목
          chart.append("text")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
             .style("font-size","12px")
             .style("font-family","sans-seirf")
             .style("stroke","black")
             .style("text-anchor","middle")
             .text(xstr)
        }
        else if (LineGraph) {
          // X축 제목
          chart.append("text")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
             .style("font-size","12px")
             .style("font-family","sans-seirf")
             .style("stroke","black")
             .style("text-anchor","middle")
             .text(xstr)

          // Y축 제목
          var tx = margin.left/2 - 30;
          var ty = margin.top + 15;

          chart.append("text")
               .style("font-size","12px")
               .style("font-family","sans-seirf")
               .style("stroke","black")
               .style("text-anchor","end")
               .attr("x",margin.left/2-15)
               .attr("y",margin.top+ 15)
               .text(ystr)
               .attr("transform", "rotate(-90 30 100)")
        } 
        else if(VerticalBar) {  // 세로형 막대그래프
          // X축 제목
          chart.append("text")
             .style("font-size","12px")
             .style("font-family","sans-seirf")
             .style("stroke","black")
             .style("text-anchor","middle")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
             .text(xstr)
          // Y축 제목
          var tx = margin.left/2 - 30;
          var ty = margin.top + 15;

          chart.append("text")
               .style("font-size","12px")
               .style("font-family","sans-seirf")
               .style("stroke","black")
               .style("text-anchor","end")
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
             .style("font-size","12px")
             .style("font-family","sans-seirf")
             .style("stroke","black")
             .style("text-anchor","middle")
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
                    .style("text-anchor",str)
                    .style("font-family","sans-serif")
                    .style("font-size","8pt")
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
                  .style("text-anchor",str)
                  .style("font-family","sans-serif")
                  .style("font-size","9px")
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
                   .style("text-anchor","middle")
                   .style("font-family","sans-serif")
                   .style("font-size","8pt")
                   .attr("x",margin.left + graphWidth/2)
                   .attr("y",margin.top + tgapHeight + barHeight/2 + j*betweenbarHeight)
                   .text(label[ndvalue-j-1])
              }
          }
          else if (StackBar || RatioBar || SideBar ) {
              for (j=0; j<ndvalue; j++) {
                chart.append("text")
                   .attr("class", "barnameh")
                   .style("text-anchor","end")
                   .style("font-family","sans-serif")
                   .style("font-size","8pt")
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
                   .style("text-anchor","end")
                   .style("font-family","sans-serif")
                   .style("font-size","8pt")
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

          yScale  = d3.scaleLinear().domain([0,freqMax]).range([height,0]);
          yScale2 = d3.scaleLinear().domain([freqMax,0]).range([height,0]);
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
                   .style("font-size","12px")
                   .style("font-family","sans-seirf")
                   .style("stroke","black")
                   .style("text-anchor","start")
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
                 .style("font-size","12px")
                 .style("font-family","sans-seirf")
                 .style("stroke","black")
                 .style("text-anchor","start")
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
                 .style("font-size","12px")
                 .style("font-family","sans-seirf")
                 .style("stroke","black")
                 .style("text-anchor","start")
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
                 .style("font-size","12px")
                 .style("font-family","sans-seirf")
                 .style("stroke","black")
                 .style("text-anchor","start")
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
                 .style("font-size","12px")
                 .style("font-family","sans-seirf")
                 .style("stroke","black")
                 .style("text-anchor","start")
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
                   .style("font-size","12px")
                   .style("font-family","sans-seirf")
                   .style("stroke","black")
                   .style("text-anchor","start")
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
                 .style("font-size","12px")
                 .style("font-family","sans-seirf")
                 .style("stroke","black")
                 .style("text-anchor","start")
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
                 .style("font-size","12px")
                 .style("font-family","sans-seirf")
                 .style("stroke","black")
                 .style("text-anchor","start")
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
                   .style("font-size","12px")
                   .style("font-family","sans-seirf")
                   .style("stroke","black")
                   .style("text-anchor","start")
                   .style("stroke",myColor[k])
                   .attr("x",x1 )
                   .attr("y",margin.top)
                   .style("text-anchor","end")
                   .text(str);
            }
            else {
              chart.append("text")
                   .style("font-size","12px")
                   .style("font-family","sans-seirf")
                   .style("stroke","black")
                   .style("text-anchor","start")
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

        var row, header, sum, x, t, str, maxDeci, temp1, temp2;
        var i, j, k, g, ncol, df, info, pvalue;
        var cell = new Array(10);
        var sumRow = new Array(ngroupMax);
        var sumCol = new Array(ngroupMax);

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
          cell[0].innerHTML = svgStr[23][langNum];
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
          cell[0].innerHTML = svgStr[23][langNum];
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
            sumRow[g] = sum;
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
            cell[k].style.backgroundColor = "#eee";
          }
          cell[0].innerHTML = svgStr[23][langNum];
          cell[0].style.textAlign = "center";
          for (k=1; k<ndvalue+1; k++) {
            sum = 0;
            for (g=0; g<ngroup; g++) sum += dataSet[g][k-1];
            sumCol[k-1] = sum / totsum;
            cell[k].innerHTML = f0(sum).toString()+"<br>"+f1(100*sum/totsum).toString()+"%";
            cell[k].style.textAlign = "right";
          }  
          cell[ndvalue+1].innerHTML = f0(totsum).toString()+"<br>"+(100).toString()+"%";
          cell[ndvalue+1].style.textAlign = "right";

          // Chisqure test of independence
          sum = 0;
          for (g=0; g<ngroup; g++) {
            for (k=0; k<ndvalue; k++) {
              temp1 = sumRow[g]*sumCol[k]; // expected cell frequency
              temp2 = dataSet[g][k] - temp1;
              sum  += temp2 * temp2 / temp1;  
            }
          }
          df = (ngroup-1)*(ndvalue-1);
          pvalue = 1 - chisq_cdf(sum, df, info)

          row = table.insertRow(ngroup+3);
          for (k=0; k<1; k++) {
            cell[k] = row.insertCell(k)
            cell[k].style.border = "1px solid black";
            cell[k].style.backgroundColor = "#eee";
          }
          cell[0].innerHTML = "독립성검정";
          cell[0].style.textAlign = "center";
 
          row = table.insertRow(ngroup+4);
          for (k=0; k<6; k++) {
            cell[k] = row.insertCell(k)
            cell[k].style.border = "1px solid black";
            cell[k].style.backgroundColor = "#eee";
          }
          cell[0].innerHTML = "카이제곱값";
          cell[0].style.textAlign = "center"; 
          cell[1].innerHTML = f3(sum).toString();
          cell[1].style.textAlign = "right";
          cell[2].innerHTML = "자유도";
          cell[2].style.textAlign = "center"; 
          cell[3].innerHTML = f0(df).toString();
          cell[3].style.textAlign = "right";
          cell[4].innerHTML = "p값";
          cell[4].style.textAlign = "center"; 
          if (pvalue < 0.0001) str = "< 0.0001";
          else str = f4(pvalue).toString();  
          cell[5].innerHTML = str;
          cell[5].style.textAlign = "right";
          // 다음 표를 위한 빈 행
          row = table.insertRow(ngroup+5);
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
                  .style("font-size","12px")
                  .style("font-family","sans-seirf")
                  .style("stroke","black")
                  .style("text-anchor","start")
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
                  .style("font-size","10px")
                  .style("font-family","sans-seirf")
                  .style("stroke","white")
                  .style("text-anchor","middle")
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
                  .style("font-size","12px")
                  .style("font-family","sans-seirf")
                  .style("stroke","black")
                  .style("text-anchor","start")
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
                    .style("font-size","10px")
                    .style("font-family","sans-seirf")
                    .style("text-anchor","middle")
                    .style("stroke","white")
               chart.append("text")
                    .style("font-size","10px")
                    .style("font-family","sans-seirf")
                    .style("text-anchor","middle")
                    .style("stroke",myColor[j])
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
                 .style("font-size","12px")
                 .style("font-family","sans-seirf")
                 .style("text-anchor","start")
                 .style("stroke",myColor[j])
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
//        if (ngroup == 1) drawXaxis(ndvalue, currentLabel, betweenbarWidth, barWidth, gapWidth)
//        else 
        drawXaxis(ndvalue, dvalueLabel, betweenbarWidth, barWidth, gapWidth)
        drawYaxis(freqMin, freqMax);

        // 점 그리기
/*
        if (ngroup == 1) {
          for (i=0; i<ndvalue; i++) ydata[i] = currentDataSet[i];
          drawLine(0, freqMin, freqMax, ydata, betweenbarWidth, barWidth, gapWidth ) 
        }
        else {
*/
          for (k=0; k<ngroup; k++ ) {
            for (i=0; i<ndvalue; i++) ydata[i] = dataSet[k][i];
            drawLine(k, freqMin, freqMax, ydata, betweenbarWidth, barWidth, gapWidth ) 
          }

//        }

        // 범례 그리기
        drawLegend(gvalueLabel);

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
        ty = margin.top + graphHeight;        
        if (ndvalue < 10)     {angle = 0;  str = "middle";  y1 =  ty + 15; }
        else if(ndvalue < 30) {angle = 30; str = "start";   y1 =  ty + 10;}
        else                  {angle = 90; str = "start";   y1 =  ty + 5;}

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
               .style("text-anchor",str)
               .style("font-size","9px")
               .style("font-family","sans-serif")
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
               .style("font-size","12px")
               .style("font-family","sans-seirf")
               .style("stroke","black")
               .style("text-anchor","start")  
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
//        alert(alertMsg[2][langNum]);
          return;
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
      else { // 두 개 변량일 경우 첫째는 그룹변량 둘째는 분석변량
        // check missing
        checkMissing = false;
        for (k=1; k<numVar; k++) {
          if (tdobs[k] != tdobs[0]) {
            checkMissing = true;
            alert(alertMsg[13][langNum]);
            return;
          }
        }
        // 같은 번호 선택했는지 체크
        checkVarSame = false;
        for (i = 1; i < numVar; i++) {
           if (tdvarNumber[0] == tdvarNumber[i]) {
              checkVarSame = true;
              alert(alertMsg[46][langNum]);  // 같은 변수 선택
              return;
           }
        }

        // 그룹변수
        gobs        = tdobs[1];
        gvarNumber  = tdvarNumber[1];
        gvarName    = tdvarName[1];
        ngvalue     = tdvalueNum[1];
        for (k=0; k<ngvalue; k++) {
          gdataValue[k]  = tdvalue[1][k];
          if ( tdvalueLabel[1][k] == null ) {
            if (isNaN(tdvalue[1][k])) gvalueLabel[k] = tdvalue[1][k]; 
            else {
              if(graphNum == 32) gvalueLabel[k] = svgStr[92][langNum]+"1 : "+(k+1).toString(); // 인자
              else gvalueLabel[k] = svgStr[18][langNum]+(k+1).toString();  // 그룹
            }
          }
          else {
            gvalueLabel[k] = tdvalueLabel[1][k];
          }
        } 
        for (i = 0; i < gobs; i++) {
          gvar[i] = tdvar[1][i];    
          gcolor[i] = myColor[gvar[i]];   
        }
        // 분석변수
        dobs        = tdobs[0];
        dvarNumber  = tdvarNumber[0];
        dvarName    = tdvarName[0];
        ndvalue     = tdvalueNum[0]
        for (k = 0; k < ndvalue; k++) {
          dataValue[k]   = tdvalue[0][k];
          dvalueLabel[k] = tdvalueLabel[0][k];
        } 
        for (i = 0; i < dobs; i++) dvar[i] = tdvar[0][i];

        // check 요약자료 => 분산분석 자료 검정
        rawData   = true;
        checkData = true;    
        if (dobs == ndvalue) { // 요약자료
          rawData = false;
          ngroup  = ngvalue;
          if (graphNum > 14) { 
            checkData = false;
            alert(alertMsg[14][langNum]);
            return;
          }
        }
 
        // numeric check of dependent variable
        checkNumeric = true;
        for (i=0; i<dobs; i++) {
            if (isNaN(dvar[i])) {
              checkNumeric = false;
              alert(alertMsg[15][langNum]);
              return;
            } // endof if
            dvar[i] = parseFloat(dvar[i]);
        } // endof i

      } // endof else 두개 변량

      // gvar에서 ngroup 게산
      ngroup = ngvalue;
      checkData = true;
/*
      if (graphNum == 28) { // 그룹변수가 모두 숫자이면 paird test 대비 difference 데이터 저장 => 요약자료와 혼동으로 포기 => eStatU로 처리
        // numeric check of group variable
        checkNumeric = true;
        for (i=0; i<gobs; i++) {
            if (isNaN(gvar[i])) { checkNumeric = false; break;}
            else tdata[i] = parseFloat(gvar[i]) - parseFloat(dvar[i]);
        } // endof i
      }
*/
      if (graphNum == 28 || graphNum == 30) {  // 두 모평균, 두 모분산 가설검정
        if (ngroup > 2) { 
          alert(alertMsg[16][langNum]); // 두개의 그룹보다 많은 경우 처리 못함 경고
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
// 두그룹 평균비교 가설검정
function dataClassifyM12() {
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
      if (numVar < 2) {  // 두 그룹 t-test는 무조건 두 변수 선택하여야 함
        checkVarSelect = false;
//        alert(alertMsg[2][langNum]);
        return;
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


      // 두그룹 t-test는 (경우1) 첫째는 그룹변량 둘째는 분석변량 (경우2) paired t-test
      // check missing
      checkMissing = false;
      for (k=1; k<numVar; k++) {
          if (tdobs[k] != tdobs[0]) {
            checkMissing = true;
            alert(alertMsg[13][langNum]);
            return;
          }
      }
      // 같은 번호 선택했는지 체크
        checkVarSame = false;
        for (i = 1; i < numVar; i++) {
           if (tdvarNumber[0] == tdvarNumber[i]) {
              checkVarSame = true;
              alert(alertMsg[46][langNum]);  // 같은 변수 선택
              return;
           }
        }

      gobs        = tdobs[1];
      gvarNumber  = tdvarNumber[1];
      gvarName    = tdvarName[1];
      ngvalue     = tdvalueNum[1];
      for (k=0; k<ngvalue; k++) {
          gdataValue[k]  = tdvalue[1][k];
          if ( tdvalueLabel[1][k] == null ) {
            if (isNaN(tdvalue[1][k])) gvalueLabel[k] = tdvalue[1][k]; 
            else gvalueLabel[k] = svgStr[18][langNum]+(k+1).toString();
          }
          else {
            gvalueLabel[k] = tdvalueLabel[1][k];
          }
      } 
      for (i = 0; i < gobs; i++) gvar[i] = tdvar[1][i];       

      dobs        = tdobs[0];
      dvarNumber  = tdvarNumber[0];
      dvarName    = tdvarName[0];
      ndvalue     = tdvalueNum[0]
      for (k = 0; k < ndvalue; k++) {
          dataValue[k]   = tdvalue[0][k];
          dvalueLabel[k] = tdvalueLabel[0][k];
      } 
      for (i = 0; i < dobs; i++) dvar[i] = tdvar[0][i];
/*
      // check 요약자료 => 분산분석 자료 검정
      rawData   = true;
      checkData = true;    
      if (dobs == ndvalue) { // 요약자료
          rawData = false;
          ngroup  = ngvalue;
          if (graphNum > 14) { 
            checkData = false;
            alert(alertMsg[14][langNum]);
            return;
          }
      }
*/
      // independent Two Group t-test 인지 Paired T-test인지 체크
      ngroup = ngvalue;
      checkPairedT = false;
      if (ngroup == 2) { // independent Two Group t-test
        // numeric check of dependent variable
        checkNumeric = true;
        for (i=0; i<dobs; i++) {
            if (isNaN(dvar[i])) {
              checkNumeric = false;
              alert(alertMsg[15][langNum]);
              return;
            } // endof if
            dvar[i] = parseFloat(dvar[i]);
        } // endof i

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
      else { // paired t-test
        checkPairedT = true;
        // 그룹변수도 모두 숫자인지 체크 => difference 데이터 저장 
        // numeric check of group variable
        checkNumeric = true;
        for (i=0; i<gobs; i++) { // paird t에서는 모두 숫자
            if (isNaN(gvar[i])) { 
               checkNumeric = false; 
               numVar--;
               alert(alertMsg[19][langNum]);
               return;
            }
            else tdata[i] = parseFloat(gvar[i]) - parseFloat(dvar[i]);
        } // endof i

/*
        dvarNumber  = tdvarNumber[0];
        dvarName    = tdvarName[0];
        ndvalue     = tdvalueNum[0]
        for (k = 0; k < ndvalue; k++) {
          dataValue[k] = tdvalue[0][k];
          dvalueLabel[k] = tdvalueLabel[0][k];
        } 
*/
        for (i = 0; i < dobs; i++) dvar[i] = tdata[i];
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
        nobs[0] = dobs;
        for (i=0; i<dobs; i++) dataSet[0][i] = dvar[i];

      }

}
// 산점도 데이터 - 점을 그룹으로 구분
function dataClassifyS() {
        var trange, tratio, temp ;	
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
//          alert(alertMsg[2][langNum]);
          return;
        }
        else if (numVar == 1) {
          checkVarSelect = false;
          alert(alertMsg[17][langNum]);
          return;
        }
        else if (numVar > 2) {
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
        // 같은 번호 선택했는지 체크
        checkVarSame = false;
        for (i = 1; i < numVar; i++) {
           if (tdvarNumber[0] == tdvarNumber[i]) {
              checkVarSame = true;
              alert(alertMsg[46][langNum]);  // 같은 변수 선택
              return;
           }
        }
      
        // y data
          yobs        = tdobs[0];
          yvarNumber  = 2;
          yvarName    = tdvarName[0];
          yvalueLabel = [];
          for (i=0; i<yobs; i++) ydata[i] = tdvar[0][i];
          // numeric check 
          for (i=0; i<yobs; i++) {
            if (isNaN(ydata[i])) {
              checkNumeric = false;
              alert(alertMsg[19][langNum]);
              return;
            } // endof if
          } // endof i
        // x data
          xobs        = tdobs[1];
          xvarNumber  = 3;
          xvarName    = tdvarName[1];
          xvalueLabel = [];
          for (i=0; i<xobs; i++) xdata[i] = tdvar[1][i];
          // numeric check 
          checkNumeric = true;
          for (i=0; i<xobs; i++) {
            if (isNaN(xdata[i])) {
              checkNumeric = false;
              alert(alertMsg[19][langNum]);
              return;
            } // endof if
          } // endof i

        for (i=0; i<xobs; i++) {
            xdata[i] = parseFloat(xdata[i]);
            ydata[i] = parseFloat(ydata[i]);
        }  
        // 그룹변량 없는 경우 처리 : 모두 1

        // group 변수
        if (gvarNumber < 0) { // group 변수가 없으면
          ngroup = 1;
          gvarName    = "";
          gvalueLabel[0] = null;
          for (j=0; j<xobs; j++) {gdata[j] = 1; gcolor[j] = myColor[0];}
        }
        else { // group 변량이 있는 경우
          // group data
          gobs        = robs[gvarNumber];
          gvarName    = rvarName[gvarNumber];
          ngvalue     = rvalueNum[gvarNumber];
          ngroup      = ngvalue;
          // check missing
          if (gobs != xobs) {
            checkMissing = true;
            alert(alertMsg[4][langNum]);
            return;
          }
          for (k=0; k<ngvalue; k++) {
            gdataValue[k]  = rvalue[gvarNumber][k];
            if ( rvalueLabel[gvarNumber][k] == null ) {
              if (isNaN(rvalue[gvarNumber][k])) gvalueLabel[k] = rvalue[gvarNumber][k]; 
              else gvalueLabel[k] = svgStr[18][langNum]+(k+1).toString();
            }
            else {
              gvalueLabel[k] = rvalueLabel[gvarNumber][k];
            }
          } 
//          if (ngvalue < 10) {
            for (i=0; i<gobs; i++) { // 그룹변량의 컬러지정, 원의 크기 지정
              gdata[i] = rvar[gvarNumber][i]; 
              for (k=0; k<ngvalue; k++) {
                if (gdata[i] == gdataValue[k]) {
                  gcolor[i] = myColor[k];
                }
              }
            }
//          }

        }
        // size 변수
        if (wvarNumber < 0) { // size 변수가 없으면
          for (j=0; j<xobs; j++) {wdata[j] = 4;}      
        }
        else { // size 변량이 있는 경우
          // w data
          wobs        = robs[wvarNumber];
          wvarName    = rvarName[wvarNumber];
          // check missing
          if (wobs != xobs) {
            checkMissing = true;
            alert(alertMsg[4][langNum]);
            return;
          }
          // numeric check 
          checkNumeric = true;
          for (i=0; i<xobs; i++) {
            wdata[i] = rvar[wvarNumber][i];
            if (isNaN(wdata[i])) {
              checkNumeric = false;
              alert(alertMsg[19][langNum]);
              return;
            } // endof if
          } // endof i
          nwvalue     = rvalueNum[wvarNumber]
          for (k=0; k<nwvalue; k++) {
            wdataValue[k]  = rvalue[wvarNumber][k];
          } 
          trange = Math.sqrt(parseFloat(wdataValue[nwvalue-1])) - Math.sqrt(parseFloat(wdataValue[0]));
          for (i=0; i<xobs; i++) {
            temp     = Math.sqrt(parseFloat(wdata[i])) - Math.sqrt(parseFloat(wdataValue[0]));
            tratio   = temp / trange;
            wdata[i] = 1 + 10*tratio;
            if (gvarNumber < 0) gcolor[i] = colors(tratio);
          }
        } // endof if
      
        // 시트의 기타 데이터가 null로 되어있어 NaN로 수정
        for (i=xobs; i<rowMax; i++) {
            gdata[i] = NaN;
            xdata[i] = NaN;
            ydata[i] = NaN;
            wdata[i] = NaN
        }

}

// GIS 데이터 
function dataClassifyGIS() {
        var trange, tratio, temp ;
		
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
//          alert(alertMsg[2][langNum]);
          return;
        }
        else if (numVar < 3) {
          checkVarSelect = false;
          alert(alertMsg[44][langNum]);
          return;
        }
        else if (numVar > 4) {
          checkVarSelect = false;
          alert(alertMsg[45][langNum]);
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
        // 같은 번호 선택했는지 체크
        checkVarSame = false;
        for (i = 1; i < numVar; i++) {
           if (tdvarNumber[0] == tdvarNumber[i]) {
              checkVarSame = true;
              alert(alertMsg[46][langNum]);  // 같은 변수 선택
              return;
           }
        }
      
        if (numVar == 3) { // name, latitude(y축), longitude(x축)
          // name data
          gobs        = tdobs[0];
          gvarNumber  = tdvarNumber[0];
          gvarName    = tdvarName[0];
          for (i=0; i<gobs; i++) { // name변량의 컬러지정, 원의 크기 지정
              gdata[i] = tdvar[0][i]; 
              gcolor[i] = myColor[1];
              wdata[i] = 4;
          }
          // y data : latitude
          yobs        = tdobs[1];
          yvarNumber  = tdvarNumber[1];
          yvarName    = tdvarName[1];
          // numeric check 
          for (i=0; i<yobs; i++) {
            yvalueLabel[i] = null;
            ydata[i] = tdvar[1][i];
            if (isNaN(ydata[i])) {
              checkNumeric = false;
              alert(alertMsg[19][langNum]);
              return;
            } // endof if
          } // endof i
          // x data : longitude
          xobs        = tdobs[2];
          xvarNumber  = tdvarNumber[2];
          xvarName    = tdvarName[2];
          // numeric check 
          checkNumeric = true;
          for (i=0; i<xobs; i++) {
            xvalueLabel[i] = null;
            xdata[i] = tdvar[2][i];
            if (isNaN(xdata[i])) {
              checkNumeric = false;
              alert(alertMsg[19][langNum]);
              return;
            } // endof if
          } // endof i

          for (i=0; i<xobs; i++) {
            xdata[i] = parseFloat(xdata[i]);
            ydata[i] = parseFloat(ydata[i]);
          }
        }
        else if (numVar == 4) { // name, latitude(y축), longitude(x축), analysisVar 경우
          // name data
          gobs        = tdobs[0];
          gvarNumber  = tdvarNumber[0];
          gvarName    = tdvarName[0];
          for (i=0; i<gobs; i++) { // 그룹변량의 컬러지정
            gdata[i] = tdvar[0][i]; 
            gcolor[i] = myColor[1]; 
          }
          // y data : latitude
          yobs        = tdobs[1];
          yvarNumber  = tdvarNumber[1];
          yvarName    = tdvarName[1];
          // numeric check 
          for (i=0; i<yobs; i++) {
            yvalueLabel[i] = null;
            ydata[i] = tdvar[1][i];
            if (isNaN(ydata[i])) {
              checkNumeric = false;
              alert(alertMsg[19][langNum]);
              return;
            } // endof if
          } // endof i
          // x data : longitude
          xobs        = tdobs[2];
          xvarNumber  = tdvarNumber[2];
          xvarName    = tdvarName[2];
          // numeric check 
          checkNumeric = true;
          for (i=0; i<xobs; i++) {
            xvalueLabel[i] = null;
            xdata[i] = tdvar[2][i];
            if (isNaN(xdata[i])) {
              checkNumeric = false;
              alert(alertMsg[19][langNum]);
              return;
            } // endof if
          } // endof i
          // w data : size 변수
          wobs        = tdobs[3];
          wvarNumber  = tdvarNumber[3];
          wvarName    = tdvarName[3];
          // numeric check 
          checkNumeric = true;
          for (i=0; i<xobs; i++) {
            wdata[i] = tdvar[3][i];
            if (isNaN(wdata[i])) {
              checkNumeric = false;
              alert(alertMsg[19][langNum]);
              return;
            } // endof if
          } // endof i
          nwvalue     = tdvalueNum[3]
          for (k=0; k<nwvalue; k++) {
            wdataValue[k]  = tdvalue[3][k];
          } 
          trange = Math.sqrt(parseFloat(wdataValue[nwvalue-1])) - Math.sqrt(parseFloat(wdataValue[0]));
          for (i=0; i<xobs; i++) {
            xdata[i] = parseFloat(xdata[i]);
            ydata[i] = parseFloat(ydata[i]);
            wdata[i] = 1 + 10*(Math.sqrt(parseFloat(wdata[i])) - Math.sqrt(parseFloat(wdataValue[0])))/trange;
          }
        } // endof if
      
        // 시트의 기타 데이터가 null로 되어있어 NaN로 수정
        for (i=xobs; i<rowMax; i++) {
            gdata[i] = NaN;
            xdata[i] = NaN;
            ydata[i] = NaN;
            wdata[i] = NaN
        }
}
// 이원분산분석 데이터 분류
function dataClassifyANOVA2() {
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
      if (numVar != 3) {
        checkVarSelect = false;
//        alert(alertMsg[44][langNum]);
        return;
      }
      // 같은 번호 선택했는지 체크
      checkVarSame = false;
      for (i = 0; i < numVar-1; i++) {
        for (j = i+1; j <numVar; j++) {
           if (tdvarNumber[i] == tdvarNumber[j]) {
              checkVarSame = true;
              alert(alertMsg[46][langNum]);  // 같은 변수 선택
              return;
           }
        }
      }

      // 초기화 - 그래프를 여러 번 그리거나 변수를 추가할때 필요
      for (k = 0; k < rowMax; k++) {
        gvar[k]        = null;
        gdataValue[k]  = null;
        gvalueLabel[k] = null;
        gvar2[k]        = null;
        gdataValue2[k]  = null;
        gvalueLabel2[k] = null;
        dvar[k]        = null;
        dataValue[k]   = null;
        dvalueLabel[k] = null;
      } 

      // 세변수 중 첫째 dvar, 둘째 gvar, 셋째 gvar2 변량값, 도수 계산  -- 도수분포표 -------------------------  
      // check missing
      checkMissing = false;
      for (k=1; k<numVar; k++) {
          if (tdobs[k] != tdobs[0]) {
            checkMissing = true;
            alert(alertMsg[13][langNum]);
            return;
          }
      }
      // 둘째 gvar
      gobs        = tdobs[1];
      gvarNumber  = tdvarNumber[1];
      gvarName    = tdvarName[1];
      ngvalue     = tdvalueNum[1];
      ngroup      = ngvalue;
      for (k=0; k<ngvalue; k++) {
          gdataValue[k]  = tdvalue[1][k];
          if ( tdvalueLabel[1][k] == null ) {
            if (isNaN(tdvalue[1][k])) gvalueLabel[k] = tdvalue[1][k]; 
            else gvalueLabel[k] = svgStr[18][langNum]+(k+1).toString();
          }
          else {
            gvalueLabel[k] = tdvalueLabel[1][k];
          }
      } 
      for (i = 0; i < gobs; i++) gvar[i] = tdvar[1][i];       

      // 셋째 gvar
      gobs2        = tdobs[2];
      gvarNumber2  = tdvarNumber[2];
      gvarName2    = tdvarName[2];
      ngvalue2     = tdvalueNum[2];
      ngroup2      = ngvalue2;
      for (k=0; k<ngvalue2; k++) {
          gdataValue2[k]  = tdvalue[2][k];
          if ( tdvalueLabel[2][k] == null ) {
            if (isNaN(tdvalue[2][k])) gvalueLabel2[k] = tdvalue[2][k]; 
            else gvalueLabel2[k] = svgStr[18][langNum]+(k+1).toString();
          }
          else {
            gvalueLabel2[k] = tdvalueLabel[2][k];
          }
      } 
      for (i = 0; i < gobs; i++) gvar2[i] = tdvar[2][i];       

      // 첫째 dvar
      dobs        = tdobs[0];
      dvarNumber  = tdvarNumber[0];
      dvarName    = tdvarName[0];
      ndvalue     = tdvalueNum[0]
      for (k = 0; k < ndvalue; k++) {
          dataValue[k]   = tdvalue[0][k];
          dvalueLabel[k] = tdvalueLabel[0][k];
      } 
      for (i = 0; i < dobs; i++) dvar[i] = tdvar[0][i];

      // check 그룹의 수가 너무 많은지 
      rawData   = true;
      if (ngvalue > 9 || ngvalue2 > 9) { 
         checkData = false;
         alert(alertMsg[5][langNum]);
         return;
      }
 
      // numeric check of dependent variable
      checkNumeric = true;
      for (i=0; i<dobs; i++) {
            if (isNaN(dvar[i])) {
              checkNumeric = false;
              alert(alertMsg[15][langNum]);
              return;
            } // endof if
            dvar[i] = parseFloat(dvar[i]);
      } // endof i

      // gvar에서 ngroup 게산

      oneHeight = graphHeight / ngroup;

      // gvar 변량값별 dvar 각 값 rearrange ----------------   
      if (ngroup == 1) {
        nobs[0] = dobs;
        for (i=0; i<dobs; i++) {
          dataSet[0][i] = dvar[i];
          dataSetG2[0][i] = dvar[i];
        }
      }
      else { // 그룹이 있을 경우
        for (k=0; k<ngroup; k++) {
          nobs[k] = 0; 
          nobs2[k] = 0;
        }  
        for (i=0; i<dobs; i++) {
          for (j=0; j<ngroup; j++) {
            if (gvar[i] == gdataValue[j]) {k=j; break;}  // gvar[i]의 gdataValue에서 위치파악
          }        
          dataSet[k][nobs[k]] = dvar[i];
          dataSetG2[k][nobs[k]] = gvar2[i];
          nobs[k]++;
        }
      }

      // Two way 평균, 분산 테이블 ----------------   
      for (k=0; k<ngroup; k++) {
        for (m=0; m<ngroup2; m++) {
          nobsTwoWay[k][m] = 0;
          meanTwoWay[k][m] = 0;
          stdTwoWay[k][m]  = 0;
        }
      }
      for (i=0; i<dobs; i++) {
          for (j=0; j<ngroup; j++) {
            if (gvar[i] == gdataValue[j]) {k=j; break;}  // gvar[i]의 gdataValue에서 위치파악
          }        
          for (j=0; j<ngroup2; j++) {
            if (gvar2[i] == gdataValue2[j]) {m=j; break;}  // gvar2[i]의 gdataValue에서 위치파악
          }        
          nobsTwoWay[k][m]++;
          meanTwoWay[k][m] += dvar[i];
          stdTwoWay[k][m]  += dvar[i]*dvar[i];
      }

      // row mean, std
      for (k=0; k<ngroup; k++) {
        robsTwoWay[k]  = 0;  
        rmeanTwoWay[k] = 0; 
        rstdTwoWay[k]  = 0;
        for (m=0; m<ngroup2; m++) {
          robsTwoWay[k]  += nobsTwoWay[k][m];
          rmeanTwoWay[k] += meanTwoWay[k][m];
          rstdTwoWay[k]  += stdTwoWay[k][m];
        }
      }
      // col mean std
      for (m=0; m<ngroup2; m++) {
        cobsTwoWay[m]  = 0;  
        cmeanTwoWay[m] = 0; 
        cstdTwoWay[m]  = 0;
        for (k=0; k<ngroup; k++) {
          cobsTwoWay[m]  += nobsTwoWay[k][m];
          cmeanTwoWay[m] += meanTwoWay[k][m];
          cstdTwoWay[m]  += stdTwoWay[k][m];
        }
      }

      for (k=0; k<ngroup; k++) {
        for (m=0; m<ngroup2; m++) {
          if (nobsTwoWay[k][m] == 0) meanTwoWay[k][m] = NaN;
          else meanTwoWay[k][m] /= nobsTwoWay[k][m];
          if (nobsTwoWay[k][m] < 2) stdTwoWay[k][m] = NaN;
          else stdTwoWay[k][m]  = Math.sqrt( (stdTwoWay[k][m] - nobsTwoWay[k][m]*meanTwoWay[k][m]*meanTwoWay[k][m]) / (nobsTwoWay[k][m] - 1) );
        }
      }

      for (k=0; k<ngroup; k++) {
          if (robsTwoWay[k] == 0) rmeanTwoWay[k] = NaN;
          else rmeanTwoWay[k] /= robsTwoWay[k];
          if (robsTwoWay[k] < 2) rstdTwoWay[k] = NaN;
          else rstdTwoWay[k]  = Math.sqrt( (rstdTwoWay[k] - robsTwoWay[k]*rmeanTwoWay[k]*rmeanTwoWay[k]) / (robsTwoWay[k] - 1) );
      }

      for (m=0; m<ngroup2; m++) {
          if (cobsTwoWay[m] == 0) cmeanTwoWay[m] = NaN;
          else cmeanTwoWay[m] /= cobsTwoWay[m];
          if (cobsTwoWay[m] < 2) cstdTwoWay[m] = NaN;
          else cstdTwoWay[m]  = Math.sqrt( (cstdTwoWay[m] - cobsTwoWay[m]*cmeanTwoWay[m]*cmeanTwoWay[m]) / (cobsTwoWay[m] - 1) );
      }

      // ANOVA 2 Statistics
      TotalStat(dobs, dvar, tstat);
      var SSR, SSC, SSRC, SSE, SST, temp, gmean;
      
      checkRBD = false;
      var temp = 1;
      for (k=0; k<ngroup; k++) {
        for (m=0; m<ngroup2; m++) {
          temp *= nobsTwoWay[k][m];
        }
      }
      if (temp == 1) checkRBD = true;
      gmean = tstat[1];
      SSR  = 0;
      SSC  = 0;
      SSRC = 0;
      SSE  = 0;
      SST  = 0;
      for (i=0; i<dobs; i++) {
          for (j=0; j<ngroup; j++) {
            if (gvar[i] == gdataValue[j]) {k=j; break;}  // gvar[i]의 gdataValue에서 위치파악
          }        
          for (j=0; j<ngroup2; j++) {
            if (gvar2[i] == gdataValue2[j]) {m=j; break;}  // gvar2[i]의 gdataValue에서 위치파악
          }   
          temp  = dvar[i] - gmean;
          SST  += temp * temp;
          temp  = rmeanTwoWay[k] - gmean;
          SSR  += temp * temp;
          temp  = cmeanTwoWay[m] - gmean;
          SSC  += temp * temp;
          temp  = meanTwoWay[k][m] - rmeanTwoWay[k] - cmeanTwoWay[m] + gmean;
          SSRC += temp * temp;
          temp  = dvar[i] - meanTwoWay[k][m];
          SSE  += temp * temp;
          if (checkRBD) yhat[i] = gmean;
          else yhat[i] = meanTwoWay[k][m];
          residual[i] = dvar[i] - yhat[i];
      }
      if (checkRBD) SSE = SSRC;
      statF[1]  = SSR;
      statF[2]  = SSC;
      statF[3]  = SSRC;
      statF[4]  = SSE;
      statF[5]  = SST;
      statF[6]  = ngroup - 1;
      statF[7]  = ngroup2 - 1;
      statF[8]  = statF[6]*statF[7];
      statF[10] = dobs - 1;
      statF[9]  = statF[10] - statF[6] - statF[7] - statF[8];
      if (checkRBD) statF[9] = statF[8];
      statF[11] = SSR  / statF[6];
      statF[12] = SSC  / statF[7];
      statF[13] = SSRC / statF[8];
      statF[14] = SSE  / statF[9];
      statF[15] = statF[11] / statF[14];
      statF[16] = statF[12] / statF[14];
      statF[17] = statF[13] / statF[14];
      statF[18] = 1 - f_cdf(statF[15], statF[6], statF[9], info);
      statF[19] = 1 - f_cdf(statF[16], statF[7], statF[9], info);
      statF[20] = 1 - f_cdf(statF[17], statF[8], statF[9], info);

}
// 회귀분석 데이터 - 점을 그룹으로 구분
function dataClassifyRegression() {

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
//          alert(alertMsg[2][langNum]);
          return;
        }
        else if (numVar == 1) {
          checkVarSelect = false;
          alert(alertMsg[17][langNum]);
          return;
        }
        // check missing & numeric
        checkNumeric = true;
        checkMissing = false;
        for (k=0; k<numVar; k++) {
          if (tdobs[k] != tdobs[0]) {
            checkMissing = true;
            alert(alertMsg[4][langNum]);
            return;
          }
          // numeric check 
          for (i=0; i<tdobs[0]; i++) {
            if (isNaN(tdvar[k][i])) {
              checkNumeric = false;
              alert(alertMsg[19][langNum]);
              return;
            } // endof if
          } // endof i
        }
        // 같은 번호 선택했는지 체크
        checkVarSame = false;
        for (i = 0; i < numVar-1; i++) {
          for (j = i+1; j<numVar; j++) {
            if (tdvarNumber[i] == tdvarNumber[j]) {
              checkVarSame = true;
              alert(alertMsg[46][langNum]);  // 같은 변수 선택
              return;
            }
          }
        }

        for (i=0; i<tdobs[0]; i++) wdata[i] = 3;
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
        var i, j, temp;
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
// Sorting in ascending and count each value frequency together with group variable - Two way ANOVA 용
function sortAscendG2(dobs, dataA, dataValue, dvalueFreq, dataY, dataG2) {
        var i, j, temp, temp2;
        var nvalue = 0;
        for (i=0; i<dobs-1; i++) {
          for (j=i; j<dobs; j++) {
            if(dataA[i] > dataA[j]) {
              temp     = dataA[i];  temp2 = dataG2[i];
              dataA[i] = dataA[j];  dataG2[i] = dataG2[j];
              dataA[j] = temp;      dataG2[j] = temp2;
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
      if (tobs == 0) tavg = NaN;
      else tavg = sum/tobs;
      sqsum  = 0;
      for (i=0; i<tobs; i++) {
          temp   = dataA[i] - tavg;
          sqsum += temp*temp;
      } // endof i
      if (tobs < 2) tstd = NaN;
      else tstd = Math.sqrt(sqsum/(tobs-1));
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
        if (tobs == 0) avg[k] = NaN; 
        else avg[k] = sum/tobs;
        sqsum  = 0;
        for (i=0; i<tobs; i++) {
          temp   = dataA[i] - avg[k];
          sqsum += temp*temp;
        } // endof i
        if (tobs <= 1) std[k] = NaN;
        else std[k] = Math.sqrt(sqsum/(tobs-1));
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
          else {
            if(graphNum == 32) str = "("+svgStr[92][langNum]+"1 : "+gvarName+ ") " + " "+dvarName+svgStr[19][langNum]+iTitle[graphNum]; // 인자
            else str = "("+svgStr[18][langNum]+" "+gvarName+ ") " + " "+dvarName+svgStr[19][langNum]+iTitle[graphNum];
          }
        }
        else str = mTitle[graphNum];
    
        chart.append("text")
             .attr("x",margin.left + titleBuffer)
             .attr("y",margin.top/2 + 10)
             .style("font-size","17px")
             .style("font-family","sans-seirf")
             .style("stroke","black")
             .style("text-anchor","middle")
             .text(str)
}



// 점그래프 함수 ----------------------------------------------------------------------------------
function drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName) {

        var i, j, k, tobs, temp, temp2, stdErr, tlabel;
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
        stdErr  = tstat[2] / Math.sqrt(tstat[0]);
        temp2 = 1.5 * stdErr;
        temp    = (parseFloat(tstat[7]) - parseFloat(tstat[3])) / 10;  // (전체 최대 - 최소) / 10  : 그래프 양 끝쪽 buffer 
        if (temp2 > temp) temp = temp2;
        gxmin   = parseFloat(tstat[3]) - temp;
        gxmax   = parseFloat(tstat[7]) + temp;
        gxrange = gxmax - gxmin;

        // 전체 제목
        if (checkPairedT == false) 
          drawTitleM(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);
        else {
          str = svgStr[94][langNum]; // "대응비교 데이터 점그래프";
          chart.append("text")
           .attr("x",margin.left + titleBuffer)
           .attr("y",margin.top/2)
           .style("font-size","17px")
           .style("font-family","sans-seirf")
           .style("stroke","black")
           .style("text-anchor","middle")
           .text(str)   
        }
        // X축 제목
        chart.append("text")
             .style("font-size","12px")
             .style("font-family","sans-seirf")
             .style("stroke","black")
             .style("text-anchor","middle")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
             .text(dvarName)
        xTitle[graphNum] = dvarName;

        // 그룹별 점그래프
        for (k=0; k<ngroup; k++) {
            // 범례
            str = gvalueLabel[k];  
            chart.append("text")
                 .style("font-size","12px")
                 .style("font-family","sans-seirf")
                 .style("stroke","black")
                 .style("text-anchor","start")
                 .style("stroke",myColor[k])
                 .attr("x",margin.left + graphWidth + 20)
                 .attr("y",margin.top + oneHeight/2 + oneHeight*k)
                 .text(str);

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
                 .attr("stroke","black")
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

// 이원분산분석 점그래프 함수 ----------------------------------------------------------------------------------
function drawDotGraph2(ngroup, ngroup2, gvalueLabel, gvalueLabel2, dvarName, nobs, avg, std, gvar, gvar2, dvar, tstat) {

        var i, j, k, m, p, tobs, temp, tlabel;
        var sx, sy, tx, ty, x1, x2, y1, y2;
        var nvalue, freqmax;
        var gxmin, gxmax, gxrange, height;
        var oneHeight = graphHeight / ngroup;
        var tdata     = new Array(rowMax);
        var dataA     = new Array(rowMax);
        var dataValue = new Array(rowMax);
        var dvalueFreq= new Array(rowMax);
        var dataY     = new Array(rowMax);

        var buffer      = 0;
        var radius      = 3;

        // 점그래프 전체 데이터 최소 최대 계산
        temp    = (parseFloat(tstat[7]) - parseFloat(tstat[3])) / 10;  // (전체 최대 - 최소) / 10  : 그래프 양 끝쪽 buffer 
        gxmin   = parseFloat(tstat[3]) - temp;
        gxmax   = parseFloat(tstat[7]) + temp;
        gxrange = gxmax - gxmin;

        // 전체 제목
        chart.append("text")
             .attr("x",margin.left + titleBuffer)
             .attr("y",margin.top/2)
             .style("font-size","17px")
             .style("font-family","sans-seirf")
             .style("stroke","black")
             .style("text-anchor","middle")
             .text(svgStr[109][langNum]) // "인자1 및 인자2 각 수준별 평균 그래프") 

        // X축 제목
        chart.append("text")
             .style("font-size","12px")
             .style("font-family","sans-seirf")
             .style("stroke","black")
             .style("text-anchor","middle")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top + graphHeight + margin.bottom/2)
             .text(dvarName)
        xTitle[graphNum] = dvarName;
        // 인자 2의 범례
        str = svgStr[92][langNum]+"2 : ";  //인자
        chart.append("text")
                 .style("font-size","12px")
                 .style("font-family","sans-seirf")
                 .style("stroke","black")
                 .style("text-anchor","start")
                 .style("stroke","black")
                 .attr("x",margin.left )
                 .attr("y",margin.top + graphHeight + 2*margin.bottom/3 + 10)
                 .text(str);
        for (k=0; k<ngroup2; k++) {
            m  = ngroup + (k+1);
            str = svgStr[93][langNum]+(k+1).toString()+"("+gdataValue2[k]+")";;  // 수준 
            chart.append("text")
                 .style("font-size","12px")
                 .style("font-family","sans-seirf")
                 .style("stroke","black")
                 .style("text-anchor","start")
                 .style("stroke",myColor[m])
                 .attr("x",margin.left + k*graphWidth/6 + 50)
                 .attr("y",margin.top + graphHeight + 2*margin.bottom/3 + 10)
                 .text(str);
        }
        // 인자1 범례 헤딩
        str = svgStr[92][langNum]+"1 : ";
        chart.append("text")
                 .style("font-size","12px")
                 .style("font-family","sans-seirf")
                 .style("stroke","black")
                 .style("text-anchor","start")
                 .style("stroke","black")
                 .attr("x",margin.left + graphWidth + 20 )
                 .attr("y",margin.top + 10)
                 .text(str);

        // 그룹별 점그래프
        for (k=0; k<ngroup; k++) {
          // 범례
          if (ngroup > 1) {
//            str = gvalueLabel[k];  
            str = svgStr[93][langNum]+(k+1).toString()+"("+gdataValue[k]+")";  
            chart.append("text")
                 .style("font-size","12px")
                 .style("font-family","sans-seirf")
                 .style("stroke","black")
                 .style("text-anchor","start")
                 .style("stroke",myColor[k])
                 .attr("x",margin.left + graphWidth + 20)
                 .attr("y",margin.top + oneHeight/2 + oneHeight*k)
                 .text(str);
          }

          tobs = nobs[k];
          for (i=0; i<tobs; i++) {
            tdata[i] = dataSet[k][i];
            tdataG2[i] = dataSetG2[k][i];
          }

          for (i=0; i<tobs; i++) dataA[i]=tdata[i];
          nvalue = sortAscendG2(tobs, dataA, dataValue, dvalueFreq, dataY, tdataG2);
  
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
            for (p=0; p<ngvalue2; p++) { // 인자2의 수준의 위치 
              if (tdataG2[j] == gdataValue2[p]) {
                m = ngroup + (p+1);
                break;
              }
            }
            chart.append("circle")
               .attr("class","circle")
               .attr("tooltip","circle")
               .style("fill",myColor[m])
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
function showDotMean(ngroup, nobs, avg, std, tstat) {
       var k, avgx, ty, temp, gxmin, gxmax, gxrange;

       gxmin = tstat[11];
       gxmax = tstat[12];
       gxrange = gxmax - gxmin;

       var oneHeight = graphHeight / ngroup;
       temp = 5;

       for (k=0; k<ngroup; k++) {
         if (isNaN(avg[k])) continue;
         avgx  = margin.left + graphWidth*(avg[k]-gxmin)/gxrange;  
         ty    = margin.top + k*oneHeight;    
         chart.append("line")
            .attr("class","mean")
            .attr("x1",avgx)
            .attr("y1",ty + temp)
            .attr("x2",avgx)
            .attr("y2",ty + oneHeight)
            .style("stroke",myColor[1])            
         chart.append("text")
              .attr("class","mean")
              .style("text-anchor","start")
              .style("font-size","9px")
              .style("font-family","sans-serif")
              .style("stroke",myColor[1])
              .attr("x", avgx+temp)
              .attr("y", ty + oneHeight/2)
              .text("m="+f2(avg[k]))
         chart.append("text")
              .attr("class","mean")
              .style("text-anchor","end")
              .style("font-size","9px")
              .style("font-family","sans-serif")
              .style("stroke","#0055FF")
              .attr("x", margin.left + graphWidth - 15)
              .attr("y", ty + 15)
              .text("n="+f0(nobs[k]))
         chart.append("text")
              .attr("class","mean")
              .style("text-anchor","end")
              .style("font-size","9px")
              .style("font-family","sans-serif")
              .style("stroke","#0055FF")
              .attr("x", margin.left + graphWidth - 10)
              .attr("y", ty + 30)
              .text("s="+f2(std[k]))
       }
}

// 점그래프 평균 제거 함수
function removeDotMean() {
	 chart.selectAll("line.mean").remove();
	 chart.selectAll("text.mean").remove();
}

// 점그래프 표준편차 표시 함수
function showDotStd(nroup, nobs, avg, std, tstat) {
       var k, avgx, ty;
       var df, info, MSE, stdErr, stdmx, stdpx, temp, temp2;
       var gxmin, gxmax, gxrange;
       var oneHeight = graphHeight / ngroup;
/*   
       df  = 0;
       MSE = 0;
       for (k=0; k<ngroup; k++) {
         df      += nobs[k];
         temp     = nobs[k] - 1;
         if (nobs[k] > 1) MSE += temp*std[k]*std[k];
         else std[k] = 0;
       }
       df     = df - ngroup;
       MSE   /= df;
       stdErr = Math.sqrt(MSE);
*/
       gxmin = tstat[11];
       gxmax = tstat[12];
       gxrange = gxmax - gxmin;

       for (k=0; k<ngroup; k++) {
         if ( isNaN(avg[k]) || isNaN(std[k]) ) continue;
         avgx  = margin.left + graphWidth*(avg[k]-gxmin)/gxrange;
         ty    = margin.top + (k+1)*oneHeight - oneHeight/2 + 5;
         df    = nobs[k] - 1;
         if (nobs[k] > 1) temp  = t_inv(0.975, df, info) * std[k] / Math.sqrt(nobs[k]);
         else temp = 0;
         stdmx = margin.left + graphWidth*(avg[k]-temp-gxmin)/gxrange;
         stdpx = margin.left + graphWidth*(avg[k]+temp-gxmin)/gxrange;
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
            .style("stroke","yellowgreen")            
         chart.append("line")
            .attr("class","std")
            .attr("x1",stdpx)
            .attr("y1",ty)
            .attr("x2",avgx)
            .attr("y2",ty)
            .style("stroke","yellowgreen")          
          chart.append("circle")
            .attr("class","std")
            .attr("cx",stdmx)
            .attr("cy",ty)
            .attr("r",1)
            .style("fill","yellowgreen")           
         chart.append("circle")
            .attr("class","std")
            .attr("cx",stdpx)
            .attr("cy",ty)
            .attr("r",1)
            .style("fill","yellowgreen")   
         chart.append("text")
              .attr("class","std")
              .style("text-anchor","middle")
              .style("font-size","9px")
              .style("font-family","sans-serif")
              .style("stroke","yellowgreen")          
              .attr("x", stdmx)
              .attr("y", ty-5)
              .text("95% CI")
/*        
         chart.append("text")   // 표준오차
              .attr("class","std")
              .style("text-anchor","end")
              .style("font-size","9px")
              .style("font-family","sans-serif")
              .style("stroke","#0055FF")
              .attr("x", margin.left + graphWidth - 10)
              .attr("y", margin.top + k*oneHeight + 45)
              .text(svgStrU[18][langNum]+"="+f2(stdErr))
*/
       }
}
// 2원분산분석 평균 표시 함수
function showDotMean2(nroup, ngroup2, graphWidth, graphHeight) {
       var k, m, p, avgx, ty, tx1, tx2, ty1, ty2;
       var df, info, MSE, stdErr, stdmx, stdpx, temp2;
       var gxmin, gxma, gxrange;
       var oneHeight = graphHeight / ngroup;

       MSE    = statF[14];
       stdErr = Math.sqrt(MSE);
       // 점그래프 전체 데이터 최소 최대 계산
       temp2 = 1.5 * stdErr;
       temp    = (parseFloat(tstat[7]) - parseFloat(tstat[3])) / 10;  // (전체 최대 - 최소) / 10  : 그래프 양 끝쪽 buffer 
       if (temp2 > temp) temp = temp2;
       gxmin   = parseFloat(tstat[3]) - temp;
       gxmax   = parseFloat(tstat[7]) + temp;
       gxrange = gxmax - gxmin;
   
     for (m=0; m<ngroup2; m++) {
       if (isNaN(meanTwoWay[0][m])) continue;
       tx1 = margin.left + graphWidth*(meanTwoWay[0][m]-gxmin)/gxrange;
       ty1 = margin.top + oneHeight - oneHeight/2 ;
       for (k=1; k<ngroup; k++) {
         tx2 = margin.left + graphWidth*(meanTwoWay[k][m]-gxmin)/gxrange;
         ty2 = margin.top + (k+1)*oneHeight - oneHeight/2;
         p = ngroup + m + 1;
         chart.append("circle")
            .attr("class","std")
            .attr("cx",tx1)
            .attr("cy",ty1)
            .attr("r",5)
            .style("fill",myColor[p])    
         chart.append("line")
            .attr("class","std")
            .attr("x1",tx1)
            .attr("y1",ty1)
            .attr("x2",tx2)
            .attr("y2",ty2)
            .style("stroke-width","3px")
            .style("stroke",myColor[p])                    
         chart.append("circle")
            .attr("class","std")
            .attr("cx",tx2)
            .attr("cy",ty2)
            .attr("r",5)
            .style("fill",myColor[p])           
         tx1 = tx2;
         ty1 = ty2;
       }
     }
}
// 점그래프 표준편차 표시 함수
function showDotStd2(nroup, ngroup2, graphWidth, graphHeight) {
       var k, m, p, avgx, ty, tx1, tx2, ty1, ty2;
       var df, info, MSE, stdErr, stdmx, stdpx, temp2;
       var gxmin, gxma, gxrange;
       var oneHeight = graphHeight / ngroup;

       // 점그래프 전체 데이터 최소 최대 계산
       temp    = (parseFloat(tstat[7]) - parseFloat(tstat[3])) / 10;  // (전체 최대 - 최소) / 10  : 그래프 양 끝쪽 buffer 
       gxmin   = parseFloat(tstat[3]) - temp;
       gxmax   = parseFloat(tstat[7]) + temp;
       gxrange = gxmax - gxmin;
   
     for (m=0; m<ngroup2; m++) {
       for (k=1; k<ngroup; k++) {
         if (isNaN(meanTwoWay[k-1][m]) || isNaN(meanTwoWay[k][m])) continue;
         tx1 = margin.left + graphWidth*(meanTwoWay[k-1][m]-gxmin)/gxrange;
         ty1 = margin.top + k*oneHeight - oneHeight/2 ;
         tx2 = margin.left + graphWidth*(meanTwoWay[k][m]-gxmin)/gxrange;
         ty2 = margin.top + (k+1)*oneHeight - oneHeight/2;
         p = ngroup + m + 1;
         chart.append("circle")
            .attr("class","std")
            .attr("cx",tx1)
            .attr("cy",ty1)
            .attr("r",5)
            .style("fill",myColor[p])    
         chart.append("line")
            .attr("class","std")
            .attr("x1",tx1)
            .attr("y1",ty1)
            .attr("x2",tx2)
            .attr("y2",ty2)
            .style("stroke-width","3px")
            .style("stroke",myColor[p])                    
         chart.append("circle")
            .attr("class","std")
            .attr("cx",tx2)
            .attr("cy",ty2)
            .attr("r",5)
            .style("fill",myColor[p])           
//         tx1 = tx2;
//         ty1 = ty2;
       }
     }
/*
     for (k=0; k<ngroup; k++) {
       for (m=0; m<ngroup2; m++) {
         if (isNaN(cmeanTwoWay[m]) || isNaN(stdErr)) continue;
         avgx  = margin.left + graphWidth*(cmeanTwoWay[m] -gxmin)/gxrange;
         ty    = margin.top + (k+1)*oneHeight - 0.7*oneHeight + (m+1)*0.3*oneHeight/(ngroup2+1) + 5;
         df    = nobsTwoWay[k][m] - 1;
         if (nobsTwoWay[k][m] > 1) temp = t_inv(0.975, df, info) * stdErr/Math.sqrt(nobsTwoWay[k][m]);  //  check formula
         else temp = 0;
         stdmx = margin.left + graphWidth*(cmeanTwoWay[m]-temp-gxmin)/gxrange;
         stdpx = margin.left + graphWidth*(cmeanTwoWay[m]+temp-gxmin)/gxrange;
         p = ngroup + m + 1;
         chart.append("circle")
            .attr("class","std")
            .attr("cx",avgx)
            .attr("cy",ty)
            .attr("r",1)
            .style("fill",myColor[p])    
         chart.append("line")
            .attr("class","std")
            .attr("x1",stdmx)
            .attr("y1",ty)
            .attr("x2",avgx)
            .attr("y2",ty)
            .style("stroke",myColor[p])            
         chart.append("line")
            .attr("class","std")
            .attr("x1",stdpx)
            .attr("y1",ty)
            .attr("x2",avgx)
            .attr("y2",ty)
            .style("stroke",myColor[p])          
          chart.append("circle")
            .attr("class","std")
            .attr("cx",stdmx)
            .attr("cy",ty)
            .attr("r",1)
            .style("fill",myColor[p])           
         chart.append("circle")
            .attr("class","std")
            .attr("cx",stdpx)
            .attr("cy",ty)
            .attr("r",1)
            .style("fill",myColor[p])   
       }
     }
*/
}
     
// 점그래프 표준편차 제거 함수
function removeDotStd() {
	 chart.selectAll("line.std").remove();
	 chart.selectAll("circle.std").remove();
	 chart.selectAll("text.std").remove();
}

// 점그래프 함수 ----------------------------------------------------------------------------------
function drawMeanGraph(ngroup, gvalueLabel, nobs, avg, std, graphWidth, graphHeight, buffer, tstat, dvarName) {

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
      var df, info, MSE, stdErr, stdmx, stdpx;
      var oneHeight = graphHeight / ngroup;
   
      df  = 0;
      MSE = 0;
      for (k=0; k<ngroup; k++) {
         df      += nobs[k];
         temp     = nobs[k] - 1;
         if (nobs[k] > 1) MSE += temp*std[k]*std[k];
      }
      df     = df - ngroup;
      MSE   /= df;
      stdErr = Math.sqrt(MSE);
      temp   = t_inv(0.975, df, info) * stdErr;

        // 점그래프 전체 데이터 최소 최대 계산
        temp    = (parseFloat(tstat[7]) - parseFloat(tstat[3])) / 10;  // (전체 최대 - 최소) / 10  : 그래프 양 끝쪽 buffer 
        gxmin   = parseFloat(tstat[3]) - temp;
        gxmax   = parseFloat(tstat[7]) + temp;
        gxrange = gxmax - gxmin;

        // 전체 제목
        drawTitleM(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);

        // X축 제목
        chart.append("text")
             .style("font-size","12px")
             .style("font-family","sans-seirf")
             .style("stroke","black")
             .style("text-anchor","middle")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
             .text(dvarName)
        xTitle[graphNum] = dvarName;
        // 그룹별 점그래프
        for (k=0; k<ngroup; k++) {
          // 범례
          if (ngroup > 1) {
            str = gvalueLabel[k];  
            chart.append("text")
                 .style("font-size","12px")
                 .style("font-family","sans-seirf")
                 .style("stroke","black")
                 .style("text-anchor","start")
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
      drawHistAxis(ngroup, nvalueH, dataValueH, gxminH, gxmaxH, gyminH, gymaxH, graphWidth, graphHeight);
      // X축 제목
      chart.append("text")
           .style("font-size","12px")
           .style("font-family","sans-seirf")
           .style("stroke","black")
           .style("text-anchor","middle")
           .attr("x",margin.left + graphWidth/2)
           .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
           .text(dvarName)
      xTitle[graphNum] = dvarName;
      // Y축 제목
      str = svgStr[16][langNum];
      chart.append("text")
           .style("font-size","12px")
           .style("font-family","sans-seirf")
           .style("stroke","black")
           .style("text-anchor","end")
           .attr("x",margin.left/2-15)
           .attr("y",margin.top+ 15)
           .text(str)
           .attr("transform", "rotate(-90 30 100)")
      yTitle[graphNum] = str;
      // 그룹 히스토그램
      for (k=0; k<ngroup; k++) {
        // 범례
        if (ngroup > 1) {
          str = gvalueLabel[k];  
          chart.append("text")
               .style("font-size","12px")
               .style("font-family","sans-seirf")
               .style("stroke","black")
               .style("text-anchor","start")
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
                .style("stroke","black")
                .style("stroke-width","1px")
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
// 정규성검정 히스토그램 함수 -----------------------------------------------------------------------------------------------
function drawHistNormal(ngroup, nobs, avg, std, dataSet, freq, dvarName) {
      var i, j, k, tx1,tx2,ty1,ty2,gx1,gx2,gy1,gy2;
      var label, temp, tempx, tempy, tempw, temph, xstep, maxNormal;
      var nvaluH, gxminH, gxmaxH, gxrangeH, gyminH, gymaxH, gyrangeH, freqmax, tobs;

      var oneHeight   = graphHeight / ngroup;

      // 히스토그램 bins    
      nvalueH  = 17;  
      gxminH   = tstat[1] - 4 * tstat[2];
      gxmaxH   = tstat[1] + 4 * tstat[2];
      gxrangeH = gxmaxH - gxminH;
      xstep    = (gxmaxH - gxminH) / (nvalueH-1);
      for (j=0; j<nvalueH+1; j++) {
        dataValueH[j] = gxminH + j * xstep;
      }
      var ninterval = 101;
      var step = (dataValueH[nvalueH-1]-dataValueH[0]) / ninterval;

      // 구간별 도수구하기
      freqmax = 0;
      gymaxH  = 0;
      for (k=0; k<ngroup; k++) {
          tobs = nobs[k];
          for (j=1; j<nvalueH; j++) freq[k][j] = 0;
          for (i=0; i<tobs; i++) {
            tdata[i] = dataSet[k][i];
            for (j=1; j<nvalueH; j++) {
              if (tdata[i] < dataValueH[j]) {
                freq[k][j]++;
                break;
              }
            } // endof j
          } // endof i
          for (j=1; j<nvalueH; j++) {
            if (freq[k][j] > freqmax) freqmax = freq[k][j]; 
            temp = freq[k][j] / (nobs[k] * xstep) 
            if (temp > gymaxH) gymaxH = temp;  // 히스토그램 막대의 최대 높이
          }
      } // endof k

      gyminH    = 0;
      temp = 10000000000;
      for (k = 0; k <ngroup; k++) { // std[k]의 최소값
         if (isNaN(std[k])) continue;
         else if (std[k] < temp) temp = std[k];
      }
      maxNormal = 1 / (temp * Math.sqrt(2*Math.PI))
      if (maxNormal > gymaxH) gymaxH = maxNormal;
      gymaxH    = gymaxH + (gymaxH/8);
      gyrangeH  = gymaxH - gyminH; 

      // 전체 제목
      if (checkPairedT == false) str = svgStr[57][langNum]; // "확률 히스토그램과 정규분포"
      else str = "대응비교 데이터 히스토그램";
      chart.append("text")
           .attr("x",margin.left + titleBuffer)
           .attr("y",margin.top/2)
           .style("font-size","17px")
           .style("font-family","sans-seirf")
           .style("stroke","black")
           .style("text-anchor","middle")
           .text(str)   
      // 아래 축그리기
      drawHistAxis(ngroup, nvalueH-1, dataValueH, gxminH, gxmaxH, gyminH, gymaxH, graphWidth, graphHeight);
      // X축 제목
      chart.append("text")
           .style("font-size","12px")
           .style("font-family","sans-seirf")
           .style("stroke","black")
           .style("text-anchor","middle")
           .attr("x",margin.left + graphWidth/2)
           .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
           .text(dvarName)
      // 정규성 검정을 위한 그룹별 히스토그램
      for (k=0; k<ngroup; k++) {
        // 범례
        if (ngroup > 1) {
          str = gvalueLabel[k];  
          chart.append("text")
               .style("font-size","12px")
               .style("font-family","sans-seirf")
               .style("stroke","black")
               .style("text-anchor","start")
               .style("stroke",myColor[k])
               .attr("x",margin.left + graphWidth + 20)
               .attr("y",margin.top + oneHeight/2 + oneHeight*k)
               .text(str);
        }
        // 히스토그램
        for (i=0; i<nvalueH-1; i++) {
            temp  = freq[k][i+1] / (nobs[k]*xstep);
            tempx = margin.left + graphWidth*(dataValueH[i]-gxminH)/gxrangeH;
            tempy = margin.top + (k+1)*oneHeight - oneHeight*(temp-gyminH)/gyrangeH;
            tempw = graphWidth*xstep/gxrangeH;
            temph = oneHeight*(temp-gyminH)/gyrangeH;
            chart.append("rect")
                .style("fill",myColor[k])
                .attr("class","bar")
                .style("stroke","black")
                .style("stroke-width","1px")
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
        // 평균 표준편차표시
        if (isNaN(avg[k])) continue;
        tempx = margin.left + graphWidth*(avg[k]-gxminH)/gxrangeH;
        tempy = margin.top  + (k+1)*oneHeight - oneHeight*(maxNormal-gyminH)/gyrangeH;
        chart.append("line")
           .style("stroke","red")
           .attr("x1",tempx)
           .attr("y1",tempy)
           .attr("x2",tempx)
           .attr("y2",margin.top + (k+1)*oneHeight + 5)
        chart.append("text")
           .style("stroke","red")
           .style("text-anchor","middle")
           .style("font-family","sans-serif")
           .style("font-size","7pt")
           .attr("x", tempx)
           .attr("y", margin.top + (k+1)*oneHeight + 12)
           .text(svgStr[34][langNum]+"="+f2(avg[k]))
        if (isNaN(std[k])) continue;
        chart.append("text")
           .style("stroke","red")
           .style("text-anchor","middle")
           .style("font-family","sans-serif")
           .style("font-size","7pt")
           .attr("x", tempx + 80)
           .attr("y", margin.top + (k+1)*oneHeight + 12)
           .text(svgStr[35][langNum]+"="+f2(std[k]))
        // Normal curve
        tx1 = dataValueH[0];
        ty1 = normal_pdf(avg[k],std[k],tx1);
        gx1 = margin.left + graphWidth*(tx1-gxminH)/gxrangeH;
        gy1 = margin.top + (k+1)*oneHeight - oneHeight*(ty1-gyminH)/gyrangeH;
        for (i=1; i<ninterval; i++) {
          tx2 = tx1 + step;
          ty2 = normal_pdf(avg[k],std[k],tx2);
          gx2 = margin.left + graphWidth*(tx2-gxminH)/gxrangeH;
          gy2 = margin.top + (k+1)*oneHeight - oneHeight*(ty2-gyminH)/gyrangeH;
          chart.append("line")
            .attr("x1",gx1)
            .attr("x2",gx2)
            .attr("y1",gy1)
            .attr("y2",gy2) 
            .style("stroke","red")
          tx1 = tx2;
          ty1 = ty2;
          gx1 = gx2;
          gy1 = gy2;
        }
      } // endof k

}
// 히스토그램 정규성검정 Q-Q Plot 그리기 ----------------------------------------------------------------------------------------------
function drawHistQQ(tobs,tdata,dvarName,option) {
        var i,j,k,mean,std,info,temp;
        var x1,y1,x2,y2;
        var normalQ = new Array(tobs);
        var normalY = new Array(tobs);

        mean = 0;
        for (j=0; j<tobs; j++) {
          normalY[j] = tdata[j];
          mean += tdata[j];
          normalQ[j] = stdnormal_inv((j+1)/(tobs+1), info);
        }
        mean /= tobs;
        std = 0;
        for (j=0; j<tobs; j++) {
          temp = normalY[j] - mean;
          std += temp * temp;
        }
        std = Math.sqrt(std/(tobs-1));
        normalY.sort(function(a, b){return a-b});

        // 그래프 화면 정의 
        xmin = gmin(tobs, normalQ);
        xmax = gmax(tobs, normalQ);
        ymin = gmin(tobs, normalY);
        ymax = gmax(tobs, normalY);
        xbuffer = (xmax-xmin) / 5;     // 경계점이 보이기위한 완충거리
        ybuffer = (ymax-ymin) / 3;     // 경계점이 보이기위한 완충거리
        gxmin   = xmin-xbuffer;
        gxmax   = xmax+xbuffer;
        gymin   = ymin-ybuffer;
        gymax   = ymax+ybuffer;
        if (option == 1) { // 잔차 그래프의 경우 y축을 +- 같은 값으로 보이게
          if (gymax > Math.abs(gymin)) gymin = - gymax;
          else gymax = (-1) * gymin;
        }
        gxrange = gxmax - gxmin;
        gyrange = gymax - gymin;

        chart.selectAll("*").remove();
        margin = {top: 90, bottom: 90, left: 100, right: 120};

        var bufferScatter = 40;
        graphWidth  = svgWidth - margin.left - margin.right;
        graphHeight = svgHeight - margin.top - margin.bottom;

      // 제목
      chart.append("text")
           .attr("x",margin.left + titleBuffer)
           .attr("y",margin.top/2)
           .style("font-size","17px")
           .style("font-family","sans-seirf")
           .style("stroke","black")
           .style("text-anchor","middle")
           .text(svgStr[58][langNum]) // "정규 Q-Q 산점도"

      // 축 그리기
      drawScatterAxis(gxmin, gxmax, gymin, gymax, graphWidth, graphHeight);      
      // X축 제목
      chart.append("text")
           .style("font-size","12px")
           .style("font-family","sans-seirf")
           .style("stroke","black")
           .style("text-anchor","middle")
           .attr("x",margin.left + graphWidth/2)
           .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
           .text(svgStr[59][langNum])  // "정규백분위수"
      // Y축 제목
      chart.append("text")
           .style("font-size","12px")
           .style("font-family","sans-seirf")
           .style("stroke","black")
           .style("text-anchor","end")
           .attr("x",margin.left/2-15)
           .attr("y",margin.top+ 15)
           .text(dvarName) 
           .attr("transform", "rotate(-90 120 170)")
      // 점 그리기
      for (j=0; j<tobs; j++) {
        chart.append("circle")
             .attr("class","circle")
             .style("fill",myColor[0])
             .attr("r", 4)
             .attr("cx", margin.left+graphWidth*(normalQ[j]-gxmin)/gxrange )
             .attr("cy", margin.top+graphHeight-graphHeight*(normalY[j]-gymin)/gyrange)
      }
      // 정규성 여부 직선 그리기 
      x1 = margin.left + graphWidth*(stdnormal_inv(0.10, info) - gxmin) / gxrange;
      y1 = margin.top + graphHeight - graphHeight*(d3.quantile(normalY, 0.10) - gymin) / gyrange;
      x2 = margin.left + graphWidth*(stdnormal_inv(0.90, info) - gxmin) / gxrange;
      y2 = margin.top + graphHeight - graphHeight*(d3.quantile(normalY, 0.90) - gymin) / gyrange;
      chart.append("line")
            .attr("x1",x1)
            .attr("y1",y1)
            .attr("x2",x2)
            .attr("y2",y2) 
            .style("stroke","green") 

}

// 히스토그램 y축, x축 그리기
function drawHistAxis(ngroup, nvalueH, dataValueH, gxminH, gxmaxH, gyminH, gymaxH, graphWidth, graphHeight) {
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
          x2 = x1;
          chart.append("line")
              .attr("x1",x1)
              .attr("x2",x2)
              .attr("y1",y1)
              .attr("y2",y2) 
              .style("stroke","black") 
          chart.append("text")
              .attr("class","myaxis")
              .style("text-anchor","middle")
              .style("font-family","sans-serif")
              .style("font-size","7px")
              .style("font-family","sans-serif")
              .style("stroke","#0055FF")
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
          if (isNaN(avg[k])) continue;
          tempx = margin.left + graphWidth*(avg[k]-gxminH)/gxrangeH;
          tempy = margin.top + k*oneHeight + 5;
          chart.append("line")
                .attr("class","histmean")
                .attr("x1",tempx)
                .attr("y1",tempy+30)
                .attr("x2",tempx)
                .attr("y2",tempy + oneHeight)
          chart.append("text")
                .attr("class","histmean")
                .style("stroke","red")
                .style("text-anchor","middle")
                .style("font-family","sans-serif")
                .style("font-size","7pt")
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
                .style("stroke","red")
                .style("text-anchor","middle")
                .style("font-family","sans-serif")
                .style("font-size","8pt")
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
              .style("stroke","lime")
              .style("stroke-width","2px")
              .attr("cx",x1)
              .attr("cy",y1)
              .attr("r",3)
       
            chart.append("line")
              .attr("class","histline")
              .style("stroke","lime")
              .style("stroke-width","2px")
              .attr("x1",x1)
              .attr("x2",x2)
              .attr("y1",y1)
              .attr("y2",y2)
 
            chart.append("circle")
              .attr("class","histline")
              .style("stroke","lime")
              .style("stroke-width","2px")
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
          k = 0;
          row = table.insertRow(k);
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

          k++;
          row = table.insertRow(k);
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
            k++;
            row = table.insertRow(k);
            for (j=0; j<ngroup+2; j++) {
              cell[j] = row.insertCell(j);
              cell[j].style.width ="90px";
            }          
            cell[0].innerHTML = (i+1).toString()+"<br> ["+f2(dataValueH[i])+", "+f2(dataValueH[i+1])+")";
            cell[0].style.backgroundColor = "#eee";
            cell[0].style.textAlign = "center";
            cell[ngroup+1].style.backgroundColor = "#eee";
            cell[ngroup+1].style.textAlign = "right";
            rowsum = 0;
            for (j=0; j<ngroup; j++) {
              rowsum += freq[j][i+1];
              cell[j+1].innerHTML = freq[j][i+1].toString()+"<br> ("+f1(100*freq[j][i+1]/colsum[j]).toString()+"%)";
              cell[j+1].style.textAlign = "right";
            }
            cell[ngroup+1].innerHTML = rowsum.toString()+"<br> ("+f1(100*rowsum/totsum).toString()+"%)";
          }

          k++;
          row = table.insertRow(k);
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
          // 다음 표와의 공백을 위한 것
          k++;
          row = table.insertRow(k);
          row.style.height = "20px";
}
// 일반 히스토그램 disable
function disableHist() {
  document.getElementById("HistMean").checked = false;
  document.getElementById("HistFreq").checked = false;
  document.getElementById("HistLine").checked = false;
  document.getElementById("HistMean").disabled = true;
  document.getElementById("HistFreq").disabled = true;
  document.getElementById("HistLine").disabled = true;
  document.getElementById("HistTable").disabled = true;
  document.getElementById("HistRedraw").disabled = true;
}
// 일반 히스토그램 enable
function enableHist() {
  document.getElementById("HistMean").checked = false;
  document.getElementById("HistFreq").checked = false;
  document.getElementById("HistLine").checked = false;
  document.getElementById("HistMean").disabled = false;
  document.getElementById("HistFreq").disabled = false;
  document.getElementById("HistLine").disabled = false;
  document.getElementById("HistTable").disabled = false;
  document.getElementById("HistRedraw").disabled = false;
}
// 카이제곱 정규성검정 도수분포표 
function showHistNormalTable(nobs, avg, std, nvalueH, freq, dataValueH, dvarName) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

          var i, j, k, chiobs, sum, temp1, temp2, temp3, temp4;
          var pvalue, df, info, ncell, row;
          var obsFreq = new Array(nvalueH);
          var cell    = new Array(5);

          k = 0;          
          ncell  = 5;
          table.style.fontSize = "13px";
          row = table.insertRow(k);
          row.style.height = "30px";
          for (j=0; j<3; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.width ="90px";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
          }
          cell[0].style.width = "130px";
          cell[0].innerHTML = svgStr[49][langNum]; // "<h3>정규성 검정</h3>";
          cell[1].innerHTML = "N("+f2(avg[0])+" , "+f2(std[0])+"<sup>2</sup>)";
          cell[2].innerHTML = svgStr[50][langNum]; // "적합성검정은<br> 기대도수가<br> 5보다 클때 권장";
          k++
          row = table.insertRow(k);
          row.style.height = "30px";
          for (j=0; j<ncell; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.width ="90px";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
          }
          cell[0].style.width = "130px";
          cell[0].innerHTML = svgStr[51][langNum]; // "카이제곱 적합성검정<br>구간 i <br>[a<sub>i</sub> , b<sub>i</sub>)";
          cell[1].innerHTML = svgStr[52][langNum]; // "데이터<br>관찰도수<br>(O<sub>i</sub>)";
          cell[2].innerHTML = svgStr[53][langNum]; // "정규분포<br>기대확률<br>P([a<sub>i</sub> , b<sub>i</sub>))";
          cell[3].innerHTML = svgStr[54][langNum]; // "정규분포<br>기대도수<br>(E<sub>i</sub>)";
          cell[4].innerHTML = svgStr[55][langNum]; // "각 구간<br>카이제곱값<br>(O<sub>i</sub>-E<sub>i</sub>)<sup>2</sup> / E<sub>i</sub>";

          chiobs = 0;
            // 첫구간 
            k++;
            row = table.insertRow(k);
            for (j=0; j<ncell; j++) {
              cell[j] = row.insertCell(j);
            }          
            cell[0].style.textAlign = "center";
            for (j=1; j<ncell; j++) {
              cell[j].style.textAlign = "right";
            }          
            cell[0].style.backgroundColor = "#eee";
            cell[ncell-1].style.backgroundColor = "#eee";

            temp1 = stdnormal_cdf((dataValueH[6]-avg[0])/std[0]);
            temp2 = nobs[0] * temp1; // 6구간까지 기대도수
            sum   = 0;
            for (i=1; i<=6; i++) sum += freq[0][i];   // 6구간까지 관찰도수합
            temp3 = sum - temp2;
            temp4 = temp3 * temp3 / temp2; // 카이제곱값
            chiobs += temp4;
            cell[0].innerHTML = (k-1).toString()+"<br> ( ----, "+f2(dataValueH[6])+")";
            cell[1].innerHTML = f0(sum);
            cell[2].innerHTML = f3(temp1);   
            cell[3].innerHTML = f2(temp2);
            cell[4].innerHTML = f3(temp4);
          for (i=7; i<11; i++) {
            k++;
            row = table.insertRow(k);
            for (j=0; j<ncell; j++) {
              cell[j] = row.insertCell(j);
            }          
            cell[0].style.textAlign = "center";
            for (j=1; j<ncell; j++) {
              cell[j].style.textAlign = "right";
            }          
            cell[0].style.backgroundColor = "#eee";
            cell[ncell-1].style.backgroundColor = "#eee";

            temp1 = stdnormal_cdf((dataValueH[i]-avg[0])/std[0]) - stdnormal_cdf((dataValueH[i-1]-avg[0])/std[0]);
            temp2 = nobs[0] * temp1; // 기대도수
            temp3 = (freq[0][i] - temp2);
            temp4 = temp3 * temp3 / temp2; // 카이제곱값
            chiobs += temp4;
            cell[0].innerHTML = (k-1).toString()+"<br> ["+f2(dataValueH[i-1])+", "+f2(dataValueH[i])+")";
            cell[1].innerHTML = freq[0][i].toString();
            cell[2].innerHTML = f3(temp1);   
            cell[3].innerHTML = f2(temp2);
            cell[4].innerHTML = f3(temp4);
          }
            // 마지막 구간 
            k++;
            row = table.insertRow(k);
            for (j=0; j<ncell; j++) {
              cell[j] = row.insertCell(j);
            }          
            cell[0].style.textAlign = "center";
            for (j=1; j<ncell; j++) {
              cell[j].style.textAlign = "right";
            }          
            cell[0].style.backgroundColor = "#eee";
            cell[ncell-1].style.backgroundColor = "#eee";

            temp1 = 1 - stdnormal_cdf((dataValueH[10]-avg[0])/std[0]);
            temp2 = nobs[0] * temp1; // 11구간이후 기대도수
            sum   = 0;
            for (i=11; i<nvalueH; i++) sum += freq[0][i];   // 11구간이후 관찰도수합
            temp3 = sum - temp2;
            temp4 = temp3 * temp3 / temp2; // 카이제곱값
            chiobs += temp4;
            cell[0].innerHTML = (k-1).toString()+"<br> ["+f2(dataValueH[10])+" , ---- )";
            cell[1].innerHTML = f0(sum);
            cell[2].innerHTML = f3(temp1);   
            cell[3].innerHTML = f2(temp2);
            cell[4].innerHTML = f3(temp4);
          // 합계
          df = 8 - 1 - 2;   // 정규분포 모수 2개 추정으로 자유도 감소
          pvalue = chisq_cdf(chiobs, df, info)
          k++
          row = table.insertRow(k);
          for (j=0; j<ncell; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "right";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
          }  
          cell[0].style.textAlign = "center";   
          cell[0].innerHTML = svgStr[23][langNum];
          cell[1].innerHTML = nobs[0];
          cell[2].innerHTML = "1.000";
          cell[3].innerHTML = svgStr[56][langNum]; // "카이제곱값 합계";
          if (pvalue < 0.0001) str = "< 0.0001";
          else str = f4(pvalue).toString();  
          cell[4].innerHTML = f3(chiobs)+"<br>(p값 = "+str+")";
          // 다음 표와의 공백을 위한 것
          k++;
          row = table.insertRow(k);
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
                 .style("font-size","12px")
                 .style("font-family","sans-seirf")
                 .style("stroke","black")
                 .style("text-anchor","start")               .style("stroke",myColor[k])
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
               .style("font-size","9px")
               .style("font-family","sans-seirf")
               .style("stroke","black")
               .style("text-anchor","middle")

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
               .style("font-size","9px")
               .style("font-family","sans-seirf")
               .style("stroke","black")
               .style("text-anchor","middle")

          // 상자
          x1 = margin.left + graphWidth*(Q1[k]-gxmin)/gxrange;
          width = graphWidth*(Q3[k]-Q1[k])/gxrange;
          height = oneHeight/2;
          chart.append("rect").attr("x",x1).attr("y",y1).attr("width",width).attr("height",height)
             .style("stroke","black").style("fill",myColor[k])
          
          // Q1
          chart.append("text").attr("class","stat").attr("x", x1+3).attr("y", y2+25).text("Q1="+f2(Q1[k]))
               .style("font-size","9px")
               .style("font-family","sans-seirf")
               .style("stroke","black")
               .style("text-anchor","middle")

          // Q3
          chart.append("text").attr("class","stat").attr("x", x1+width+6).attr("y", y2+25).text("Q3="+f2(Q3[k]))
               .style("font-size","9px")
               .style("font-family","sans-seirf")
               .style("stroke","black")
               .style("text-anchor","middle")

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
               .style("font-size","9px")
               .style("font-family","sans-seirf")
               .style("stroke","black")
               .style("text-anchor","middle")

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
          if (temp == 0) { stemStr[j] = "0"; }
	  else { stemStr[j] = temp.substr(0, len-1); }
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
          for (j=0; j<5; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.width ="70px";
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
          }
          cell[0].style.width ="100px";
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
            cell[0].innerHTML = svgStr[21][langNum]+"<br> ("+gvarName+")";
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
            cell[j].style.width ="70px";
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
function bivarStatByGroup(ngroup,tobs,xdata,ydata,gdata,nobs,xavg,yavg,xstd,ystd,alphaR,betaR,corr,rsquare,sxx,syy,sxy,ssr,sse,stderr) {
      var i, j, k, tempx, tempy, temp1, temp2;
      var xsum = new Array(ngroup+1);
      var ysum = new Array(ngroup+1);

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
        if (nobs[k] == 0) {
          xavg[k] = NaN;
          yavg[k] = NaN;
          continue;
        }
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
        if (nobs[k] == 1) {
          xstd[k] = NaN;
          ystd[k] = NaN;
          betaR[k] = NaN;
          alphaR[k] = NaN;
          corr[k]   = NaN;
          rsquare[k]= NaN;
          continue;
        }
        xstd[k]    = Math.sqrt(sxx[k] / (nobs[k]-1));
        ystd[k]    = Math.sqrt(syy[k] / (nobs[k]-1));
        if (sxx[k] == 0) betaR[k] = NaN;
        else betaR[k]   = sxy[k] / sxx[k];
        alphaR[k]  = yavg[k] - betaR[k]*xavg[k];
        if (sxx[k] == 0 || syy[k] == 0) corr[k] = NaN;
        else corr[k]    = sxy[k] / Math.sqrt(sxx[k] * syy[k]);
        rsquare[k] = corr[k] * corr[k];
        ssr[k]     = betaR[k] * betaR[k] * sxx[k];
        sse[k]     = syy[k] - ssr[k];
        if (nobs[k] == 2) stderr[k] = NaN;
        else stderr[k]  = Math.sqrt(sse[k]/(nobs[k]-2));
      }
      xstd[ngroup]    = Math.sqrt(sxx[ngroup] / tobs);
      ystd[ngroup]    = Math.sqrt(syy[ngroup] / tobs);
      if (sxx[ngroup] == 0) betaR[ngroup] = NaN;
      else betaR[ngroup]   = sxy[ngroup] / sxx[ngroup];
      alphaR[ngroup]  = yavg[ngroup] - betaR[ngroup]*xavg[ngroup];
      if (sxx[ngroup] == 0 || syy[ngroup] == 0) corr[ngroup] = NaN;
      else corr[ngroup]    = sxy[ngroup] / Math.sqrt(sxx[ngroup] * syy[ngroup]);
      rsquare[ngroup] = corr[ngroup] * corr[ngroup];

    if (ngroup < 2) {
        for (j=0; j<tobs; j++) {
          yhat[j]     = alphaR[0] + betaR[0]*xdata[j];
          residual[j] = ydata[j] - yhat[j];
          temp1 = xdata[j] - xavg[0];
          temp2 = stderr[0] *Math.sqrt(1 - 1./nobs[0] - temp1*temp1/sxx[0] )
          residual[j] = residual[j] / temp2;
        }
    }     
}
// 산점도 제목 쓰기 함수
function drawScatterTitle(mainTitle, gvarNumber, xvarNumber, yvarNumber, gvarName, xvarName, yvarName) { 
        var str, wstr;
        // 주제목
        if (mTitle[graphNum] == "") {
          if (numVar == 2) {
            if (graphNum == 34)  str = yvarName + "(y) : "+xvarName+"(x)"+svgStr[19][langNum]+iTitle[20];
            else str = yvarName + "(y) : "+xvarName+"(x)"+svgStr[19][langNum]+iTitle[graphNum];
          }
          else {
            str = "("+svgStr[18][langNum]+" "+gvarName+") " + yvarName + ", "+xvarName+svgStr[19][langNum]+iTitle[graphNum];
            if (numVar == 3 && ngroup > 6) str = "("+svgStr[24][langNum]+" "+gvarName+") " + yvarName + ", "+xvarName+svgStr[19][langNum]+iTitle[graphNum];
          }        
        }
        else str = mTitle[graphNum];

        chart.append("text")
             .attr("x",margin.left + titleBuffer)
             .attr("y",margin.top/2)
             .style("font-size","17px")
             .style("font-family","sans-seirf")
             .style("stroke","black")
             .style("text-anchor","middle")
             .text(str)

        // Y축 제목
        chart.append("text")
             .style("font-size","12px")
             .style("font-family","sans-seirf")
             .style("stroke","black")
             .style("text-anchor","end")
             .attr("x",-margin.top - 50)
             .attr("y",margin.top + 20)
             .text(yvarName)
             .attr("transform", "rotate(-90 30 100)")
        yTitle[graphNum] = yvarName;
        // X축 제목
        chart.append("text")
             .style("font-size","12px")
             .style("font-family","sans-seirf")
             .style("stroke","black")
             .style("text-anchor","middle")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
             .text(xvarName)
        xTitle[graphNum] = xvarName;
}

// 산점도 그리기 ----------------------------------------------------------------------------------------------
function drawScatter(ngroup, gvalueLabel,tobs,xdata,ydata,gdata,scatterS) {
        // 그래프 화면 정의 
        xmin = gmin(tobs, xdata);
        xmax = gmax(tobs, xdata);
        ymin = gmin(tobs, ydata);
        ymax = gmax(tobs, ydata);
        xbuffer = (xmax-xmin) / 8;     // 경계점이 보이기위한 완충거리
        ybuffer = (ymax-ymin) / 8;     // 경계점이 보이기위한 완충거리
        gxmin   = xmin-xbuffer;
        gxmax   = xmax+xbuffer;
        gymin   = ymin-ybuffer;
        gymax   = ymax+ybuffer;
        gxrange = gxmax - gxmin;
        gyrange = gymax - gymin;

        chart.selectAll("*").remove();
 
        if (ngroup > 1 && ngroup < 10) margin = {top: 90, bottom: 70, left: 70, right:150};
        else            margin = {top: 90, bottom: 70, left: 90, right: 90};

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
   	     .attr("data-sheetrowid", k)
             .attr("class","datapoint")
             .attr("stroke","black")
             .style("fill",gcolor[k])
//             .attr("cx",margin.left+10)
//             .attr("cy",margin.top+10)
//             .attr("r", 0)
//             .transition()                           // 애니매이션 효과 지정
//             .delay(function(d,i) {return i*200;})   // 0.5초마다 그리도록 대기시간 설정
//             .duration(1000)          
             .attr("cx", margin.left+graphWidth*(xdata[k]-gxmin)/gxrange)
             .attr("cy", margin.top+graphHeight-graphHeight*(ydata[k]-gymin)/gyrange)
             .attr("r", wdata[k])
             .append("title")
             .text(str)
      }

      // y축 범례 그리기
      if (ngroup > 1 && ngroup < 10) drawLegendS(ngroup, gvalueLabel,graphWidth, bufferScatter);
      // x축 범례 그리기
      if (wvarNumber >= 0) {
        var wstr = "- "+svgStr[24][langNum]+" : "+wvarName+" -";
        chart.append("text")
             .attr("x",margin.left + titleBuffer)
             .attr("y",margin.top/2 + 20)
             .style("font-size","12px")
             .style("font-family","sans-seirf")
             .style("stroke","black")
             .style("text-anchor","middle")
             .text(wstr)
      }
}
// GIS 그래프 그리기 ----------------------------------------------------------------------------------------------
function drawGIS(gobs,gdata,xdata,ydata,wdata) {

    var map = chart.append("g").attr("id", "map");
//        places = chart.append("g").attr("id", "places");
    var projection = d3.geoMercator()
        .center([126.9895, 37.5651])
        .scale(120000)
        .translate([svgWidth/2, svgHeight/2]);
 
    var path = d3.geoPath().projection(projection);
 
    d3.json("map/seoul_municipalities_topo_simple.json", function(error, data) {
      var features = topojson.feature(data, data.objects.seoul_municipalities_geo).features;
//    d3.json("map/skorea_municipalities_topo_simple.json", function(error, data) {
//      var features = topojson.feature(data, data.objects.skorea_municipalities_geo).features;
      map.selectAll("path")
         .data(features)
         .enter().append("path")
         .attr("class", function(d) { return "municipality c" + d.properties.code })
         .attr("d", path)
         .attr("stroke","black")
         .attr("stroke-width","1px")
      map.selectAll("text")
         .data(features)
         .enter().append("text")
         .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
         .attr("dy", ".35em")
         .attr("class", "municipality-label")
         .text(function(d) { return d.properties.name; })
/*
      d3.csv("map/places.csv", function(data) {
        places.selectAll("circle")
           .data(data)
           .enter().append("circle")
           .attr("class","circleGIS")
           .attr("cx", function(d) { return projection([d.lon, d.lat])[0]; })
           .attr("cy", function(d) { return projection([d.lon, d.lat])[1]; })
           .attr("r", 10);
        places.selectAll("text")
           .data(data)
           .enter().append("text")
           .attr("class","textGIS")
           .attr("x", function(d) { return projection([d.lon, d.lat])[0]; })
           .attr("y", function(d) { return projection([d.lon, d.lat])[1] + 8; })
           .text(function(d) { return d.name });
      });
*/
    });


//        drawScatterTitle(mTitle[graphNum], gvarNumber, xvarNumber, yvarNumber, gvarName, xvarName, yvarName);


      // 점 그리기
      for (k=0; k<gobs; k++) {
        str = gdata[k];
        chart.append("circle")
   	     .attr("data-sheetrowid", k)
             .attr("class","datapoint")
             .attr("stroke","black")
             .style("fill",gcolor[k])     
             .attr("cx", function(d) { return projection([xdata[k], ydata[k]])[0]; })
             .attr("cy", function(d) { return projection([xdata[k], ydata[k]])[1]; })
             .attr("r", wdata[k])
             .append("title")
             .text(str)
        chart.append("text")
             .attr("class","textGIS")
             .attr("stroke","black")
             .attr("font-size","9px")
             .attr("text-anchor","middle")
             .attr("x", function(d) { return projection([xdata[k], ydata[k]])[0]; })
             .attr("y", function(d) { return projection([xdata[k], ydata[k]])[1] + 13; })
             .text(str)
      }

      // 범례 그리기
//      if (numVar == 3 && ngroup > 1 && ngroup < 6) drawLegendS(ngroup, gvalueLabel,graphWidth, bufferScatter);

}
// 산점도행렬 그리기 ----------------------------------------------------------------------------------------------
function drawScatterMatrix(tdvarName,tdobs,tdvar) {

        var i, j, k, m, p, q, tx, ty;
        var subWidth, subHeight;
        var temp, tempx, tempy, tempw, temph, xstep, maxNormal;
        var nvaluH, gxminH, gxmaxH, gxrangeH, gyminH, gymaxH, gyrangeH, freqmax, tobs;
        var ninterval = 101;
        margin = {top: 80, bottom: 50, left: 80, right: 80};

        // 히스토그램 bins    
        nvalueH  = 17;  
        graphWidth  = svgWidth - margin.left - margin.right;
        graphHeight = svgHeight - margin.top - margin.bottom;
        subWidth    = graphWidth / numVar;
        subHeight   = graphHeight / numVar;
   // 주제목
        chart.append("text")
              .style("stroke","black")
             .style("font-size","17px")
             .style("font-family","sans-seirf")
             .style("text-anchor","middle")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top/2)
             .text(svgStr[89][langNum])
   // y제목
   for (i=0; i<numVar; i++) {
        chart.append("text")   // y 왼쪽
             .style("stroke",myColor[0])
             .style("font-size","8px")
             .style("font-family","sans-seirf")
             .style("text-anchor","end")
             .attr("x",margin.left - 5)
             .attr("y",margin.top + i*subHeight + subHeight/2)
             .text(tdvarName[i])
        chart.append("text")   // y 오른쪽
             .style("stroke",myColor[0])
             .style("font-size","8px")
             .style("font-family","sans-seirf")
             .style("text-anchor","start")
             .attr("x",margin.left + graphWidth + 5)
             .attr("y",margin.top + i*subHeight + subHeight/2)
             .text(tdvarName[i])
   }
   // x제목
   for (j=0; j<numVar; j++) {
        chart.append("text")   // x 아래
             .style("stroke",myColor[0])
             .style("font-size","8px")
             .style("font-family","sans-seirf")
             .style("text-anchor","middle")
             .attr("x",margin.left + j*subWidth + subWidth/2)
             .attr("y",margin.top + graphHeight + 15)
             .text(tdvarName[j])
        chart.append("text")   // x 위에 
             .style("stroke",myColor[0])
             .style("font-size","8px")
             .style("font-family","sans-seirf")
             .style("text-anchor","middle")
             .attr("x",margin.left + j*subWidth + subWidth/2)
             .attr("y",margin.top - 10)
             .text(tdvarName[j])
   }

   for (i=0; i<numVar; i++) {
     for (j=0; j<numVar; j++) {

        tobs = tdobs[i];
        for (k=0; k<tobs; k++) {
          xdata[k] = parseFloat(tdvar[i][k]);
          ydata[k] = parseFloat(tdvar[j][k]);
        }

        // 그래프 화면 정의 
        xmin = gmin(tobs, xdata);
        xmax = gmax(tobs, xdata);
        ymin = gmin(tobs, ydata);
        ymax = gmax(tobs, ydata);
        xbuffer = (xmax-xmin) / 5;     // 경계점이 보이기위한 완충거리
        ybuffer = (ymax-ymin) / 3;     // 경계점이 보이기위한 완충거리
        gxmin   = xmin-xbuffer;
        gxmax   = xmax+xbuffer;
        gymin   = ymin-ybuffer;
        gymax   = ymax+ybuffer;
        gxrange = gxmax - gxmin;
        gyrange = gymax - gymin;

        // 산점도 행렬 박스
        tx = margin.left + i*subWidth;
        ty = margin.top + j*subHeight;
        chart.append("rect")
             .attr("x",tx)
             .attr("y",ty)
             .attr("width",subWidth)
             .attr("height",subHeight)
             .attr("fill","white") 
             .style("stroke","black")
             .style("stroke-width","1px")
                  
 
//        drawScatterTitle(mTitle[graphNum], gvarNumber, xvarNumber, yvarNumber, gvarName, xvarName, yvarName);


      if (i == j) {  // 히스토그램
        TotalStat(tobs, xdata, tstat);
        // 히스토그램 bins    
        gxminH   = tstat[1] - 4 * tstat[2];
        gxmaxH   = tstat[1] + 4 * tstat[2];
        gxrangeH = gxmaxH - gxminH;
        xstep    = (gxmaxH - gxminH) / (nvalueH-1);
        for (m=0; m<nvalueH+1; m++) {
          dataValueH[m] = gxminH + m * xstep;
        }
        // 구간별 도수구하기
        for (m=1; m<nvalueH; m++) tdata[m] = 0;
        for (k=0; k<tobs; k++) {
            for (m=1; m<nvalueH; m++) {
              if (xdata[k] < dataValueH[m]) {
                tdata[m]++;
                break;
              }
            } // endof m
        } // endof k
        freqmax = 0;
        for (m=1; m<nvalueH; m++) { // 최대도수
            if (tdata[m] > freqmax) freqmax = tdata[m]; 
        }
        gyminH    = 0;
        gymaxH    = freqmax / (tobs * xstep) ;  // 확률 히스토그램 높이
        maxNormal = 1 / (std[0] * Math.sqrt(2*Math.PI))
        if (maxNormal > gymaxH) gymaxH = maxNormal;
        gymaxH    = gymaxH + (gymaxH/8);
        gyrangeH  = gymaxH - gyminH; 
        // 정규성 검정을 위한 히스토그램
        for (m=0; m<nvalueH-1; m++) {
           temp  = tdata[m+1] / (tobs*xstep);
           tempx = tx + subWidth*(dataValueH[m]-gxminH)/gxrangeH;
           tempy = ty + subHeight - subHeight*(temp-gyminH)/gyrangeH;
           tempw = subWidth*xstep/gxrangeH;
           temph = subHeight*(temp-gyminH)/gyrangeH;
           chart.append("rect")
                .style("fill",myColor[i*numVar+j])
                .attr("class","bar")
                .style("stroke","black")
                .style("stroke-width","1px")
                .attr("x",tempx)
                .attr("y",tempy)
                .attr("width",tempw)
                .attr("height",temph)
        } // endof m
        // Normal curve
        var step = (dataValueH[nvalueH-1]-dataValueH[0]) / ninterval;
        tx1 = dataValueH[0];
        ty1 = normal_pdf(tstat[1],tstat[2],tx1);
        gx1 = tx + subWidth*(tx1-gxminH)/gxrangeH;
        gy1 = ty + subHeight - subHeight*(ty1-gyminH)/gyrangeH;
        for (k=1; k<ninterval; k++) {
          tx2 = tx1 + step;
          ty2 = normal_pdf(tstat[1],tstat[2],tx2);
          gx2 = tx + subWidth*(tx2-gxminH)/gxrangeH;
          gy2 = ty + subHeight - subHeight*(ty2-gyminH)/gyrangeH;
          chart.append("line")
               .attr("x1",gx1)
               .attr("x2",gx2)
               .attr("y1",gy1)
               .attr("y2",gy2) 
               .style("stroke","red")
          tx1 = tx2;
          ty1 = ty2;
          gx1 = gx2;
          gy1 = gy2;
        } // endof k
      }
      else {  // 산점도
        for (k=0; k<tobs; k++) {
          str = "("+xdata[k]+","+ydata[k]+")";
          chart.append("circle")
               .attr("data-sheetrowid", k)
               .attr("class","datapoint")
               .style("fill",myColor[i*numVar+j])
               .style("stroke","black")
               .attr("r", wdata[k])
               .attr("cx", tx+subWidth*(xdata[k]-gxmin)/gxrange)
               .attr("cy", ty+subHeight-subHeight*(ydata[k]-gymin)/gyrange)
               .append("title")
               .text(str)
        } // endof k
      }
    } // endof j
  } // endof i

}

// 회귀분석 통계량 ----------------------------------------------------------------------------------------------
function statRegression(numVar, tdobs, tdvar) {

   var i, j, k, nAug;
   var temp, tempx, tempy, sum;
   var SSR, SSE, SST, MSE, info, multpleR, stdErr;
   var avgY, avgYhat, avgResid, SSYH;

   prow = tdobs[0];
   nAug = 2*numVar;
   var X        = new Array(prow);  // 2차원 행렬
   var Y        = new Array(prow);
//   var yhat     = new Array(prow);
//   var residual = new Array(prow);
   var T        = new Array(numVar);
//   var Beta     = new Array(numVar);
   var XP       = new Array(numVar); // 2차원 행렬
   var XPX      = new Array(numVar); // 2차원 행렬
   var XPY      = new Array(numVar);
   var L        = new Array(numVar); // 2차원 행렬
   var U        = new Array(numVar); // 2차원 행렬
   var invL     = new Array(numVar); // 2차원 행렬
   var invU     = new Array(numVar); // 2차원 행렬
   var invXPX   = new Array(numVar); // 2차원 행렬
   for (i=0; i<prow; i++) {
     X[i] = new Array(numVar);      
   }
   for (j=0; j<numVar; j++) {
     XP[j]     = new Array(prow);
     XPX[j]    = new Array(numVar);
     L[j]      = new Array(nAug);
     U[j]      = new Array(nAug);
     invL[j]   = new Array(numVar);
     invU[j]   = new Array(numVar);
     invXPX[j] = new Array(numVar);
   }

   // vector Y, matrix X
   for (i=0; i<prow; i++) {
     Y[i] = parseFloat(tdvar[0][i]);
     X[i][0]  = 1;
     for (j=1; j<numVar; j++) {
        X[i][j] = parseFloat(tdvar[j][i]);
     } // endof j
   } // endof i
   // matrix XP
   for (i=0; i<prow; i++) {
     for (j=0; j<numVar; j++) {
        XP[j][i] = X[i][j];
     } // endof j
   } // endof i
   // matrix XPX
   for (i=0; i<numVar; i++) {
     for (j=0; j<numVar; j++) {
       temp = 0;
       for (k=0; k<prow; k++) {
         temp += XP[i][k]*X[k][j];
       }
       XPX[i][j] = temp;
       L[i][j]   = temp;
     }
   }
   // vector XPY
   for (i=0; i<numVar; i++) {
       sum  = 0;
       for (k=0; k<prow; k++) {
         sum  += XP[i][k]*Y[k];
       }
       XPY[i] = sum;
   }
   // Cholesky Decomposition LU
   for (k=0; k<numVar; k++) {  
     for (i=0; i<=k-1; i++) {
       sum = 0; 
       for (j=0; j<=i-1; j++) {
         sum += L[i][j]*L[k][j];
       }
       L[k][i] = (L[k][i]- sum) / L[i][i];
     }
     sum = 0;
     for (j=0; j<=k-1; j++) sum += L[k][j]*L[k][j];
     L[k][k] = Math.sqrt(L[k][k] - sum);
   }
   for (i=0; i<numVar; i++) {
     for (j=0; j<numVar; j++) {
       if (j>i) L[i][j] = 0;
       U[j][i] = L[i][j];
     }
   }

   // Solve linear Eq  Lt = XPY by forward substitution
   for (k=0; k <numVar; k++) {
     sum = 0;
     for (j=0; j<k; j++) sum += L[k][j]*T[j];
     T[k] = (XPY[k] - sum) / L[k][k];
   }
   // Solve linear Eq  Ub = T by forward substitution
   for (k=numVar-1; k >=0; k--) {
     sum = 0;
     for (j=numVar-1; j>k; j--) sum += U[k][j]*Beta[j];
     Beta[k] = (T[k] - sum) / U[k][k];
   }
   // Augment matrix
   for (i=0; i<numVar; i++) {
     for (k=numVar; k<nAug; k++) {
       if (k == i+numVar) {
         L[i][k] = 1;
         U[i][k] = 1;
       }
       else {
         L[i][k] = 0;
         U[i][k] = 0;
       }
     }
   }
   // inverse of L by Gauss Elimination
   for (k=0; k<numVar; k++) {
     temp = L[k][k];
     for (j=k; j<nAug; j++) L[k][j] = L[k][j] / temp;
     for (i=k+1; i<numVar; i++) {
       temp = L[i][k];
       for (j=k; j<nAug; j++) {
         L[i][j] = L[i][j] - temp*L[k][j];
       }
     }
   }
   for (i=0; i<numVar; i++) {
     for (j=numVar; j<nAug; j++) invL[i][j-numVar] = L[i][j];
   }
   // inverse of U = (invL)^T
   for (i=0; i<numVar; i++) {
     for (j=0; j<numVar; j++) invU[i][j] = invL[j][i];
   }
   // inverse of XPX = (invU)(invL)
   for (i=0; i<numVar; i++) {
     for (j=0; j<numVar; j++) {
       sum = 0;
       for (k=0; k<numVar; k++) sum += invU[i][k]*invL[k][j];
       invXPX[i][j] = sum;
       if (i == j) Cii[i] = invXPX[i][j];
     }
   }
   // Final Test for identity
   for (i=0; i<numVar; i++) {
     for (j=0; j<numVar; j++) {
       sum = 0;
       for (k=0; k<numVar; k++) sum += XPX[i][k]*invXPX[k][j];
     }
   }
   // residual, multiple correlation
   avgY    = 0;
   avgYhat = 0;
   for (i=0; i<prow; i++) {
     sum = Beta[0];
     for (j=1; j<numVar; j++) {
        sum += Beta[j]*X[i][j];
     } // endof j
     yhat[i]     = sum;
     residual[i] = Y[i] - yhat[i];
     avgY    += Y[i];
     avgYhat += yhat[i]; 
   } // endof i
   avgY    /= prow;
   avgYhat /= prow;
   // ANOVA Statistics
   SSR  = 0;
   SSE  = 0;
   SST  = 0;
   SSYH = 0;
   for (i=0; i<prow; i++) {
     tempx = Y[i] - avgY;
     tempy = yhat[i] - avgY;
     SST  += tempx * tempx;
     SSR  += tempy * tempy;
     SSYH += tempx * tempy;
     SSE  += residual[i] * residual[i];
   } // endof i
   MSE = SSE / (prow - numVar);
   stdErr = Math.sqrt(MSE);
   multipleR = SSYH / Math.sqrt(SST*SSR);
   // Hii Leverage : x_i' inv(X'X) x_i
   for (i=0; i<prow; i++) {
     for (k=0; k<numVar; k++) {
       T[k] = 0;
       for (j=0; j<numVar; j++) {
         T[k] += X[i][j]*invXPX[j][k]
       }
     } // endof k
     Hii[i] = 0;
     for (j=0; j<numVar; j++) {
         Hii[i] += T[j] * X[i][j]
     } 
     stdResidual[i] = residual[i] / ( stdErr * Math.sqrt(1-Hii[i]) );
     Cook[i] = stdResidual[i]*stdResidual[i]*Hii[i] / ( (numVar-1)*(1-Hii[i]) );
   } // endof i

      statF[0]  = prow;
      statF[1]  = SSR;
      statF[2]  = SSE;
      statF[3]  = SST;
      statF[4]  = numVar - 1;
      statF[5]  = prow - numVar;
      statF[6]  = prow - 1;
      statF[7]  = SSR / statF[4];  // MSR
      statF[8]  = MSE;  // MSE
      statF[9]  = statF[7] / statF[8]; // Fobs
      statF[10] = 1 - f_cdf(statF[9], statF[4], statF[5], info);
      statF[11] = stdErr;
      statF[12] = multipleR;


/*
console.log("i=0 "+invXPX[0][0]+" "+invXPX[0][1]+" "+invXPX[0][2]);  
console.log("i=1 "+invXPX[1][0]+" "+invXPX[1][1]+" "+invXPX[1][2]);  
console.log("i=2 "+invXPX[2][0]+" "+invXPX[2][1]+" "+invXPX[2][2]);  

console.log("i="+i+" "+L[i][0]+" "+L[i][1]+" "+L[i][2]+" "+L[i][3]+" "+L[i][4]+" "+L[i][5]);
console.log("k="+k+" "+L[k][0]+" "+L[k][1]+" "+L[k][2]+" "+L[k][3]+" "+L[k][4]+" "+L[k][5]);  
console.log("k="+k+" "+L[0][0]+" "+L[0][1]+" "+L[0][2]+" "+L[0][3]+" "+L[0][4]+" "+L[0][5]);  
console.log("k="+k+" "+L[1][0]+" "+L[1][1]+" "+L[1][2]+" "+L[1][3]+" "+L[1][4]+" "+L[1][5]);  
console.log("k="+k+" "+L[2][0]+" "+L[2][1]+" "+L[2][2]+" "+L[2][3]+" "+L[2][4]+" "+L[2][5]);  
*/


}

// 다변량 통계량 ----------------------------------------------------------------------------------------------
function statMultivariate(numVar, tdobs, tdvar) {

   var i, j, k, nAug;
   var temp, tempx, tempy, sum;

   prow = tdobs[0];
   nAug = 2*numVar;
   var X        = new Array(prow);  // 2차원 행렬
   var T        = new Array(numVar);
//   var avgX     = new Array(numVar);
//   var Cov      = new Array(numVar);
//   var Corr     = new Array(numVar);
   var SS       = new Array(numVar); // 2차원 행렬
   var XP       = new Array(numVar); // 2차원 행렬
   var XPX      = new Array(numVar); // 2차원 행렬
   var L        = new Array(numVar); // 2차원 행렬
   var U        = new Array(numVar); // 2차원 행렬
   var invL     = new Array(numVar); // 2차원 행렬
   var invU     = new Array(numVar); // 2차원 행렬
//   var invXPX   = new Array(numVar); // 2차원 행렬
   for (i=0; i<prow; i++) {
     X[i] = new Array(numVar);      
   }
   for (j=0; j<numVar; j++) {
//     Cov[j]    = new Array(numVar);
//     Corr[j]   = new Array(numVar);
     XP[j]     = new Array(prow);
     XPX[j]    = new Array(numVar);
     L[j]      = new Array(nAug);
     U[j]      = new Array(nAug);
     invL[j]   = new Array(numVar);
     invU[j]   = new Array(numVar);
//     invXPX[j] = new Array(numVar);
   }

   // vector Y, matrix X
   for (i=0; i<prow; i++) {
     for (j=0; j<numVar; j++) {
        X[i][j] = parseFloat(tdvar[j][i]);
     } // endof j
   } // endof i
   // matrix XP
   for (i=0; i<prow; i++) {
     for (j=0; j<numVar; j++) {
        XP[j][i] = X[i][j];
     } // endof j
   } // endof i
   // matrix XPX
   for (i=0; i<numVar; i++) {
     for (j=0; j<numVar; j++) {
       temp = 0;
       for (k=0; k<prow; k++) {
         temp += XP[i][k]*X[k][j];
       }
       XPX[i][j] = temp;
       L[i][j]   = temp;
     }
   }

   // Cholesky Decomposition LU
   for (k=0; k<numVar; k++) {  
     for (i=0; i<=k-1; i++) {
       sum = 0; 
       for (j=0; j<=i-1; j++) {
         sum += L[i][j]*L[k][j];
       }
       L[k][i] = (L[k][i]- sum) / L[i][i];
     }
     sum = 0;
     for (j=0; j<=k-1; j++) sum += L[k][j]*L[k][j];
     L[k][k] = Math.sqrt(L[k][k] - sum);
   }
   for (i=0; i<numVar; i++) {
     for (j=0; j<numVar; j++) {
       if (j>i) L[i][j] = 0;
       U[j][i] = L[i][j];
     }
   }

   // Augment matrix
   for (i=0; i<numVar; i++) {
     for (k=numVar; k<nAug; k++) {
       if (k == i+numVar) {
         L[i][k] = 1;
         U[i][k] = 1;
       }
       else {
         L[i][k] = 0;
         U[i][k] = 0;
       }
     }
   }
   // inverse of L by Gauss Elimination
   for (k=0; k<numVar; k++) {
     temp = L[k][k];
     for (j=k; j<nAug; j++) L[k][j] = L[k][j] / temp;
     for (i=k+1; i<numVar; i++) {
       temp = L[i][k];
       for (j=k; j<nAug; j++) {
         L[i][j] = L[i][j] - temp*L[k][j];
       }
     }
   }
   for (i=0; i<numVar; i++) {
     for (j=numVar; j<nAug; j++) invL[i][j-numVar] = L[i][j];
   }
   // inverse of U = (invL)^T
   for (i=0; i<numVar; i++) {
     for (j=0; j<numVar; j++) invU[i][j] = invL[j][i];
   }
   // inverse of XPX = (invU)(invL)
   for (i=0; i<numVar; i++) {
     for (j=0; j<numVar; j++) {
       sum = 0;
       for (k=0; k<numVar; k++) sum += invU[i][k]*invL[k][j];
       invXPX[i][j] = sum;
     }
   }
   // Final Test for identity
   for (i=0; i<numVar; i++) {
     for (j=0; j<numVar; j++) {
       sum = 0;
       for (k=0; k<numVar; k++) sum += XPX[i][k]*invXPX[k][j];
   // console.log(sum)
     }
   }
   // Mean Vector
   for (j=0; j<numVar; j++) {
     if (prow == 0) {
       avgX[j] = NaN;
       continue;
     }
     avgX[j] = 0;
     for (i=0; i<prow; i++) {
       avgX[j] += X[i][j];
     } // endof i
     avgX[j] /= prow; 
   } // endof j
   // Covariance Matrix   
   for (i=0; i<numVar; i++) {
     for (j=0; j<numVar; j++) {
       Cov[i][j] = 0;
       for (k=0; k<prow; k++) {
         Cov[i][j] += (X[k][i] - avgX[i]) * (X[k][j] - avgX[j]);
       }      
     }
   }
   // Correlation Matrix
   for (i=0; i<numVar; i++) {
     for (j=0; j<numVar; j++) {
       if(Cov[i][i] == 0 || Cov[j][j] == 0) Corr[i][j] = NaN;
       else Corr[i][j] = Cov[i][j] / Math.sqrt(Cov[i][i] * Cov[j][j]);
     }
   }
   for (i=0; i<numVar; i++) {
     for (j=0; j<numVar; j++) {
       if (prow == 1) Cov[i][j] = NaN;
       else Cov[i][j] /= (prow - 1);
     }
   }

/*
console.log("i=0 "+invXPX[0][0]+" "+invXPX[0][1]+" "+invXPX[0][2]);  
console.log("i=1 "+invXPX[1][0]+" "+invXPX[1][1]+" "+invXPX[1][2]);  
console.log("i=2 "+invXPX[2][0]+" "+invXPX[2][1]+" "+invXPX[2][2]);  

console.log("i="+i+" "+L[i][0]+" "+L[i][1]+" "+L[i][2]+" "+L[i][3]+" "+L[i][4]+" "+L[i][5]);
console.log("k="+k+" "+L[k][0]+" "+L[k][1]+" "+L[k][2]+" "+L[k][3]+" "+L[k][4]+" "+L[k][5]);  
console.log("k="+k+" "+L[0][0]+" "+L[0][1]+" "+L[0][2]+" "+L[0][3]+" "+L[0][4]+" "+L[0][5]);  
console.log("k="+k+" "+L[1][0]+" "+L[1][1]+" "+L[1][2]+" "+L[1][3]+" "+L[1][4]+" "+L[1][5]);  
console.log("k="+k+" "+L[2][0]+" "+L[2][1]+" "+L[2][2]+" "+L[2][3]+" "+L[2][4]+" "+L[2][5]);  
*/

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
             .attr("fill",myColor[k])
             .attr("stroke","black")
             .attr("r", 4);
        chart.append("text")
             .attr("stroke",myColor[k])
             .style("font-size","12px")
             .style("font-family","sans-seirf")
             .style("text-anchor","start")
             .attr("x",tx+8)
             .attr("y",ty+5)
             .text(str)
      } // end of k
}

// Show Regression line
function showRegression(ngroup, alphaR, betaR, corr, rsquare, scatterS) {
        var x1, y1, x2, y2, tx, ty;
        var tx1, ty1, tx2, ty2;

        if (ngroup > 1 && ngroup < 10) margin = {top: 90, bottom: 70, left: 70, right:150};
        else            margin = {top: 90, bottom: 70, left: 90, right: 90};

        xmin        = scatterS[0];
        xmax        = scatterS[1];
        gxmin       = scatterS[4];
        gxmax       = scatterS[5];
        gxrange     = gxmax - gxmin;
        gymin       = scatterS[6];
        gymax       = scatterS[7];
        gyrange     = gymax - gymin;
        graphWidth  = scatterS[8];
        graphHeight = scatterS[9];

        for (var k=0; k<ngroup; k++) {  
          // 그래프 영역을 벗어났을때의 처리
          tx1 = xmin;
          ty1 = alphaR[k]+betaR[k]*tx1;
          if (!isNaN(alphaR[k]) && !isNaN(betaR[k])) {
            if (ty1 > gymax) {
              tx1 = (gymax - alphaR[k]) / betaR[k];
              ty1 = alphaR[k] + betaR[k]*tx1; 
            }
            if (ty1 < gymin) {
              tx1 = (gymin - alphaR[k]) / betaR[k];
              ty1 = alphaR[k] + betaR[k]*tx1; 
            }
            tx2 = xmax;
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
          }
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
// Show Regression Band
function showRegressionBand(nobs, alphaR, betaR, xavg, sxx, stderr, scatterS) {
        var x1, y1, z1, x2, y2, z2, tx, ty, tz, temp, info;
        var tx1, ty1, tz1, tx2, ty2, tz2, xbuffer, ybuffer, delta;
        var ninterval = 100;

        if (ngroup > 1) return;
        margin = {top: 90, bottom: 70, left: 90, right: 90};

        xbuffer     = (scatterS[1] - scatterS[0]) / 8;
        delta       = (scatterS[1] - scatterS[0]) / ninterval;
        gxmin       = scatterS[4];
        gxmax       = scatterS[5];
        gxrange     = gxmax - gxmin;
        gymin       = scatterS[6];
        gymax       = scatterS[7];
        gyrange     = gymax - gymin;
        graphWidth  = scatterS[8];
        graphHeight = scatterS[9];

        k = 0; // group이 없을 경우만
        var e  = 0.975;
        var df = nobs[k] - 2;
        var tvalue = t_inv(e, df, info);

        tx1 = gxmin + xbuffer;       
        temp = tvalue * stderr[k] *Math.sqrt(1./nobs[k] + (tx1-xavg[k])*(tx1-xavg[k])/sxx[k] )
        ty1 = alphaR[k] + betaR[k]*tx1 + temp;
        tz1 = alphaR[k] + betaR[k]*tx1 - temp;
        // 그래프 영역을 벗어났을때의 처리
        if (ty1 > gymax)      ty1 = gymax;
        else if (ty1 < gymin) ty1 = gymin;
        if (tz1 > gymax)      tz1 = gymax;
        else if (tz1 < gymin) tz1 = gymin;

        x1  = margin.left + graphWidth*(tx1-gxmin)/gxrange;
        y1  = margin.top  + graphHeight - graphHeight*(ty1-gymin)/gyrange;
        z1  = margin.top  + graphHeight - graphHeight*(tz1-gymin)/gyrange;

        for (j=0; j<ninterval; j++) {

          tx2 = tx1 + delta;
          temp = tvalue * stderr[k] *Math.sqrt(1./nobs[k] + (tx2-xavg[k])*(tx2-xavg[k])/sxx[k] )
          ty2 = alphaR[k] + betaR[k]*tx2 + temp;
          tz2 = alphaR[k] + betaR[k]*tx2 - temp;
          // 그래프 영역을 벗어났을때의 처리
          if (ty2 > gymax)      ty2 = gymax;
          else if (ty2 < gymin) ty2 = gymin;
          if (tz2 > gymax)      tz2 = gymax;
          else if (tz2 < gymin) tz2 = gymin;

          x2  = margin.left + graphWidth*(tx2-gxmin)/gxrange;
          y2  = margin.top  + graphHeight - graphHeight*(ty2-gymin)/gyrange;
          z2  = margin.top  + graphHeight - graphHeight*(tz2-gymin)/gyrange;
          
          chart.append("line")
                 .attr("class","regband")
                 .attr("x1",x1)
                 .attr("y1",y1)
                 .attr("x2",x2)
                 .attr("y2",y2)
                 .style("stroke",myColor[1]) 
          chart.append("line")
                 .attr("class","regband")
                 .attr("x1",x1)
                 .attr("y1",z1)
                 .attr("x2",x2)
                 .attr("y2",z2)
                 .style("stroke",myColor[1]) 
          tx1 = tx2;
          x1 = x2;
          y1 = y2;
          z1 = z2;

       } // end of j
}

// Remove Regression Line
function removeRegression() {
	 chart.selectAll("line.reglabel").remove();
         chart.selectAll("text.reglabel").remove();
}
// Remove Regression Band
function removeRegressionBand() {
	 chart.selectAll("line.regband").remove();

}

// ANOVA F-test statistics
function anovaStat(ngroup,tobs,nobs,avg,std,statF,gvar,dvar,yhat,residual) {
    var ntot,ssb,ssw,df1,df2,msb,msw,pvalue,Fobs,info;
    df1 = ngroup - 1;
    ntot = 0;
    ssb = 0;
    ssw = 0;
    for (i = 0; i < ngroup; i++) ntot += nobs[i];
    df2 = ntot - ngroup;
    // total mean
    mtot = 0;
    for (i = 0; i < ngroup; i++) mtot += nobs[i] * avg[i];
    mtot /= ntot;
    // between & within sum of squares
    ssb = 0;
    ssw = 0;
    for (i = 0; i < ngroup; i++) {
        temp = (avg[i] - mtot);
        ssb += nobs[i] * temp * temp;
        if (!isNaN(std[i])) ssw += (nobs[i] - 1) * std[i] * std[i];
    }
    msb = ssb / df1;
    msw = ssw / df2;
    Fobs= msb / msw;
    pvalue = 1 - f_cdf(Fobs, df1, df2, info);
    statF[0] = msb / msw;
    statF[1] = ssb;
    statF[2] = ssw;
    statF[3] = ssb + ssw;
    statF[4] = msb;
    statF[5] = msw;
    statF[6] = df1;
    statF[7] = df2;
    statF[8] = ntot - 1
    statF[9] = pvalue;
    // residual calculation 
    tobs = gobs;
    for (j=0; j<tobs; j++) {
          k = parseInt(gvar[j])-1;
          yhat[j]     = avg[k];
          residual[j] = dvar[j] - yhat[j];
    }
}

// 가설검정용 그룹통계량표 --------------------------------------------------------------------------------------------------
function statTable2(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg, std, mini, Q1, median, Q3, maxi, tstat) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

        var row, nrow, str, df, info, stderr, temp, left, right;
        var ncol = 6;
        var cell = new Array(7);
        
          table.style.fontSize = "13px";
 
          var header = table.createTHead()
          nrow = 0;
          row  = table.insertRow(nrow);
          row.style.height ="40px";
          for (j=0; j<5; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.width ="70px";
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
          }
          cell[0].style.width ="100px";
          cell[0].innerHTML = "<h3>"+svgStr[91][langNum]+"</h3>"; //통계량
          cell[1].innerHTML = svgStr[26][langNum];
          if (checkPairedT == false) str = dvarName;
          else str = "("+tdvarName[0] + " - " + tdvarName[1]+")";
          cell[2].innerHTML = str;
          if (ngroup > 1) {
            cell[3].innerHTML = svgStr[37][langNum];
            cell[4].innerHTML = "("+gvarName+")";
          }

          row  = table.insertRow(++nrow);
          row.style.height ="40px";
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.border = "1px solid black";
          }
          if (ngroup > 1) {
            cell[0].innerHTML = svgStr[21][langNum]+"<br> ("+gvarName+")";
          }
          else cell[0].innerHTML = "";
          cell[1].innerHTML = svgStr[44][langNum];  // 자료수 
          cell[2].innerHTML = svgStr[34][langNum];  // 평균 
          cell[3].innerHTML = svgStr[35][langNum];  // 표준편차  
          cell[4].innerHTML = svgStrU[18][langNum]; // 표준오차
          cell[5].innerHTML = "95% "+svgStrU[20][langNum]; // 신뢰구간
          for (j=0; j<ncol; j++) {
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.width ="80px";
          }
          cell[5].style.width = "120px";

          for (g=0; g<ngroup; g++) {
            row = table.insertRow(++nrow);
            for (j=0; j<ncol; j++) {
              cell[j] = row.insertCell(j);  
              cell[j].style.border = "1px solid black";
            }
            str ="";
            if (ngroup > 1) str = (g+1).toString()+" ("+gvalueLabel[g]+")";        
            cell[0].innerHTML = str;
            cell[0].style.backgroundColor = "#eee";
            cell[1].innerHTML = nobs[g].toString();  
            cell[2].innerHTML = f3(avg[g]).toString();  
            cell[3].innerHTML = f3(std[g]).toString();  
            stderr = std[g] / Math.sqrt(nobs[g]);
            df     = nobs[g] - 1;
            temp   = t_inv(0.975,df,info)*stderr;
            left   = avg[g] - temp;
            right  = avg[g] + temp;
            cell[4].innerHTML = f3(stderr).toString();   
            cell[5].innerHTML = "("+f3(left)+", "+f3(right)+")";   
            cell[0].style.textAlign = "center";
            for (j=1; j<ncol-1; j++) cell[j].style.textAlign = "right";         
            cell[5].style.textAlign = "center";
          }

          if (ngroup > 1) {
            row = table.insertRow(++nrow);
            for (j=0; j<ncol; j++) {
              cell[j] = row.insertCell(j);          
              cell[j].style.border = "1px solid black";
            }
            cell[0].innerHTML = svgStr[48][langNum]
            cell[0].style.backgroundColor = "#eee";
            cell[1].innerHTML = tstat[0].toString(); 
            cell[2].innerHTML = f3(tstat[1]).toString();  
            cell[3].innerHTML = f3(tstat[2]).toString();  
            stderr = tstat[2] / Math.sqrt(tstat[0]);
            df     = tstat[0] - 1;
            temp   = t_inv(0.975,df,info)*stderr;
            left   = tstat[1] - temp;
            right  = tstat[1] + temp;
            cell[4].innerHTML = f3(stderr).toString();   
            cell[5].innerHTML = "("+f3(left)+", "+f3(right)+")";   

            cell[0].style.textAlign = "center";
            for (j=1; j<ncol; j++) {
              cell[j].style.textAlign = "right";          
              cell[j].style.backgroundColor = "#eee";
            }
            cell[5].style.textAlign = "center";
          }

          row = table.insertRow(++nrow);
          row.style.height ="20px";
}
   
// 분산분석표 --------------------------------------------------------------------------------------------------
function AnovaTable(gvarName,dvarName,nobs,avg,std,statF) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

        var i, j, tobs, pvalue, temp, df, info, fobs, mse, str;
        var row;
        var num  = 0;
        var ncol = 6;
        var k    = 0;
        var df   = nobs[k] - 2;

          var cell = new Array(ncol);

          table.style.fontSize = "13px";
          table.style.cellPadding = "10";

          row  = table.insertRow(num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = "<h3>"+svgStr[15][langNum]+"</h3>"; // "분산분석표";
          cell[0].style.textAlign = "center";   
          cell[0].style.backgroundColor = "#eee";
          cell[0].style.border = "1px solid black";
//          row.style.height ="40px";
          cell[0].style.width ="100px";

          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = svgStr[72][langNum]; // "요인";
          cell[1].innerHTML = svgStr[73][langNum]; // "제곱합";  
          cell[2].innerHTML = svgStr[74][langNum]; // "자유도";  
          cell[3].innerHTML = svgStr[75][langNum]; // "평균제곱";  
          cell[4].innerHTML = "F "+svgStr[69][langNum]; // "F관찰값";   
          cell[5].innerHTML = "p "+svgStr[69][langNum]; // "p-값 =";    
          for (j=0; j<ncol; j++) {
            cell[j].style.textAlign = "center";   
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
            cell[j].style.width ="70px";
          }
   
          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = svgStr[102][langNum]; // "처리";
          cell[0].style.textAlign = "center";
          cell[1].innerHTML = f3(statF[1]).toString();  
          cell[2].innerHTML = f0(statF[6]).toString();  
          cell[3].innerHTML = f3(statF[4]).toString();  
          cell[4].innerHTML = f3(statF[0]).toString();
          if(statF[9] < 0.0001) str = " < 0.0001";
          else str = f4(statF[9]).toString();  
          cell[5].innerHTML = str;
          cell[0].style.backgroundColor = "#eee"; 
          for (j=1; j<ncol; j++) cell[j].style.textAlign = "right";   

          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = svgStr[77][langNum]; // "오차";
          cell[0].style.textAlign = "center";
          cell[1].innerHTML = f3(statF[2]).toString();  
          cell[2].innerHTML = f0(statF[7]).toString();  
          cell[3].innerHTML = f3(statF[5]).toString();  
          cell[0].style.backgroundColor = "#eee"; 
          for (j=1; j<ncol; j++) cell[j].style.textAlign = "right";   

          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);          
            cell[j].style.border = "1px solid black";
          }
          cell[0].innerHTML = svgStr[78][langNum]; // "전체";
          cell[0].style.textAlign = "center";
          cell[0].style.backgroundColor = "#eee";   
          cell[1].innerHTML = f3(statF[3]).toString();  
          cell[2].innerHTML = f0(statF[8]).toString();
          for (j=1; j<ncol; j++) {
            cell[j].style.textAlign = "right";   
            cell[j].style.backgroundColor = "#eee"; 
          }

          // 다음 표와의 공백을 위한 것
          row = table.insertRow(++num);
          row.style.height = "20px";

}    
// 2 way 평균/표준편차표 --------------------------------------------------------------------------------------------------
function stat2Table(ngroup, ngroup2, dvarName, gvarName, gvalueLabel, gvarName2, gvalueLabel2) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

        var i,j, row, nrow, str;
        var ncol = ngroup2 + 2;
        var cell = new Array(ncol);

          nrow = 0;
          table.style.fontSize = "13px";
 
          var header = table.createTHead()
          row  = table.insertRow(nrow);
          row.style.height ="40px";
          cell[0] = row.insertCell(0);
          cell[0].style.textAlign = "center";
          cell[0].style.backgroundColor = "#eee";
          cell[0].style.border = "1px solid black";
          cell[0].style.width ="100px";
          cell[0].innerHTML = "<h3>"+svgStr[88][langNum]+"</h3>";

          row  = table.insertRow(++nrow);
          row.style.height ="40px";
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.border = "1px solid black";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.width ="90px";
            cell[j].style.textAlign = "center";
          }
          cell[0].innerHTML = svgStr[44][langNum]+"<br>"+svgStr[34][langNum]+"<br>"+svgStr[35][langNum]; // "자료수<br>"+"평균<br>"+"표준편차";
          cell[0].style.textAlign = "center";
          for (j=0; j<ngroup2; j++) {
            cell[j+1].innerHTML = svgStr[21][langNum]+" ("+gvarName2+")<br>"+(j+1).toString()+" ("+gvalueLabel2[j]+")"
          }
          cell[ngroup2+1].innerHTML = svgStr[104][langNum]; // "행의 합";

          for (g=0; g<ngroup; g++) {
            row = table.insertRow(++nrow);
            for (j=0; j<ncol; j++) {
              cell[j] = row.insertCell(j);  
              cell[j].style.border = "1px solid black";
              cell[j].style.textAlign = "right";         
            }                  
            cell[0].innerHTML = svgStr[21][langNum]+" ("+gvarName+")<br>"+(g+1).toString()+" ("+gvalueLabel[g]+")";
            cell[0].style.backgroundColor = "#eee";
            for (j=0; j<ngroup2; j++) {
              cell[j+1].innerHTML = nobsTwoWay[g][j]+"<br>"+f2(meanTwoWay[g][j])+"<br>"+f2(stdTwoWay[g][j]);   
            }
            cell[ngroup2+1].innerHTML = robsTwoWay[g]+"<br>"+f2(rmeanTwoWay[g])+"<br>"+f2(rstdTwoWay[g]);   
            cell[ngroup2+1].style.backgroundColor = "#eee";
          }

          row  = table.insertRow(++nrow);
          row.style.height ="40px";
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.border = "1px solid black";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.textAlign = "right";
          }
          cell[0].innerHTML = svgStr[105][langNum]; // "열의 합";
          cell[0].style.textAlign = "center";
          for (j=0; j<ngroup2; j++) {
            cell[j+1].innerHTML = cobsTwoWay[j]+"<br>"+f2(cmeanTwoWay[j])+"<br>"+f2(cstdTwoWay[j]);  
          }
          cell[ngroup2+1].innerHTML = tstat[0]+"<br>"+f2(tstat[1])+"<br>"+f2(tstat[2]);

          row = table.insertRow(++nrow);
          row.style.height ="20px";

}

// 이원분산분석표 --------------------------------------------------------------------------------------------------
function Anova2Table(gvarName,dvarName,nobs,avg,std,statF) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

        var i, j, tobs, pvalue, temp, df, info, fobs, mse, str;
        var row;
        var num  = 0;
        var ncol = 6;
        var k    = 0;
        var df   = nobs[k] - 2;

          var cell = new Array(ncol);

          table.style.fontSize = "13px";
          table.style.cellPadding = "10";

          row  = table.insertRow(num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = "<h3>"+svgStr[15][langNum]+"</h3>"; // "분산분석표";
          cell[0].style.textAlign = "center";   
          cell[0].style.backgroundColor = "#eee";
          cell[0].style.border = "1px solid black";
//          row.style.height ="40px";
          cell[0].style.width ="100px";

          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = svgStr[72][langNum]; // "요인";
          cell[1].innerHTML = svgStr[73][langNum]; // "제곱합";  
          cell[2].innerHTML = svgStr[74][langNum]; // "자유도";  
          cell[3].innerHTML = svgStr[75][langNum]; // "평균제곱";  
          cell[4].innerHTML = "F "+svgStr[69][langNum]; // "F관찰값";   
          cell[5].innerHTML = "p "+svgStr[69][langNum]; // "p-값 =";    
          for (j=0; j<ncol; j++) {
            cell[j].style.textAlign = "center";   
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
            cell[j].style.width ="70px";
          }
   
          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = svgStr[92][langNum]+" 1"; // "인자";
          cell[0].style.textAlign = "center";
          cell[1].innerHTML = f3(statF[1]).toString();  
          cell[2].innerHTML = f0(statF[6]).toString();  
          cell[3].innerHTML = f3(statF[11]).toString();  
          cell[4].innerHTML = f3(statF[15]).toString(); 
          if(statF[18] < 0.0001) str = " < 0.0001";
          else str = f4(statF[18]).toString();  
          cell[5].innerHTML = str;  
          cell[0].style.backgroundColor = "#eee"; 
          for (j=1; j<ncol; j++) cell[j].style.textAlign = "right";   

          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = svgStr[92][langNum]+" 2"; // "인자";
          cell[0].style.textAlign = "center";
          cell[1].innerHTML = f3(statF[2]).toString();  
          cell[2].innerHTML = f0(statF[7]).toString();  
          cell[3].innerHTML = f3(statF[12]).toString();  
          cell[4].innerHTML = f3(statF[16]).toString(); 
          if(statF[19] < 0.0001) str = " < 0.0001";
          else str = f4(statF[19]).toString();  
          cell[5].innerHTML = str;  
          cell[0].style.backgroundColor = "#eee"; 
          for (j=1; j<ncol; j++) cell[j].style.textAlign = "right";   
       if (!checkRBD) {
          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = svgStr[103][langNum]; // "교호작용"
          cell[0].style.textAlign = "center";
          cell[1].innerHTML = f3(statF[3]).toString();  
          cell[2].innerHTML = f0(statF[8]).toString();  
          cell[3].innerHTML = f3(statF[13]).toString();  
          cell[4].innerHTML = f3(statF[17]).toString();  
          if(statF[18] < 0.0001) str = " < 0.0001";
          else str = f4(statF[20]).toString();  
          cell[5].innerHTML = str;  
          cell[0].style.backgroundColor = "#eee"; 
          for (j=1; j<ncol; j++) cell[j].style.textAlign = "right";   
       }
          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = svgStr[77][langNum]; // "오차";
          cell[0].style.textAlign = "center";
          cell[1].innerHTML = f3(statF[4]).toString();  
          cell[2].innerHTML = f0(statF[9]).toString();  
          cell[3].innerHTML = f3(statF[14]).toString();  
          cell[0].style.backgroundColor = "#eee"; 
          for (j=1; j<ncol; j++) cell[j].style.textAlign = "right";   

          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);          
            cell[j].style.border = "1px solid black";
          }
          cell[0].innerHTML = svgStr[78][langNum]; // "전체";
          cell[0].style.textAlign = "center";
          cell[0].style.backgroundColor = "#eee";   
          cell[1].innerHTML = f3(statF[5]).toString();  
          cell[2].innerHTML = f0(statF[10]).toString();
          for (j=1; j<ncol; j++) {
            cell[j].style.textAlign = "right";   
            cell[j].style.backgroundColor = "#eee"; 
          }

          // 다음 표와의 공백을 위한 것
          row = table.insertRow(++num);
          row.style.height = "20px";

}    

// 다중비교표 --------------------------------------------------------------------------------------------------
function multipleComparisonTable(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

        var g,k, row, nrow, str, temp, info, avgDiff, HSD95, HSD99;
        var ncol = 10;
        var cell = new Array(ncol);
          nrow = 0;
          table.style.fontSize = "13px";
 
          var header = table.createTHead()
          row  = table.insertRow(nrow);
          row.style.height ="40px";
          for (j=0; j<5; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.width ="70px";
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
            cell[j].style.width ="80px";
          }
          cell[0].innerHTML = "<h3>"+svgStr[90][langNum]+"<h3>"; // "다중비교"
          cell[1].innerHTML = svgStr[26][langNum]
          cell[2].innerHTML = "("+dvarName+")";
          if (ngroup > 1) {
            cell[3].innerHTML = svgStr[37][langNum];
            cell[4].innerHTML = "("+gvarName+")";
          }

          row  = table.insertRow(++nrow);
          row.style.height ="40px";
          for (g=0; g<ngroup+1; g++) {
            cell[g] = row.insertCell(g);
            cell[g].style.border = "1px solid black";
            cell[g].style.backgroundColor = "#eee";
          }
          if (ngroup > 1) {
            cell[0].innerHTML = svgStr[100][langNum]+"<br> (95%HSD)";  // "평균차"
          }
          else cell[0].innerHTML = svgStr[21][langNum]+" ("+gvarName+")";
          for (g=1; g<ngroup+1; g++) {
            str ="";
            if (ngroup > 1) str = (g).toString()+" ("+gvalueLabel[g-1]+")<br>"+f2(avg[g-1]);        
            cell[g].innerHTML = str;
            cell[g].style.textAlign = "center";
          }
          // 다중비교 - 평균차, HSD
          for (g=0; g<ngroup; g++) {
            row = table.insertRow(++nrow);
            for (j=0; j<ngroup+1; j++) {
              cell[j] = row.insertCell(j);  
              cell[j].style.border = "1px solid black";
            }
            str ="";
            if (ngroup > 1) str = (g+1).toString()+" ("+gvalueLabel[g]+")<br>"+f2(avg[g]);        
            cell[0].innerHTML = str;
            cell[0].style.backgroundColor = "#eee";
            cell[0].style.textAlign = "center";
            for (k=0; k<ngroup; k++) {
              if (g == k) continue;
              avgDiff = Math.abs(avg[g]-avg[k]);
              HSD95   = q_inv(0.95,ngroup,dobs-ngroup,info)*Math.sqrt(0.5*(1/nobs[g] + 1/nobs[k])*statF[5] );
              cell[k+1].innerHTML = f2(avgDiff).toString()+"<br>("+f2(HSD95)+")";  
              cell[k+1].style.textAlign = "right";   
              cell[k+1].style.width ="80px";      
            }
          }

          row = table.insertRow(++nrow); // 공란
          row.style.height ="20px";

          for (g=0; g<ngroup; g++) tdata[g] = avg[g];
          sortAscendIndex(ngroup,tdata,indexA);

          row  = table.insertRow(++nrow);
          row.style.height ="40px";
          for (g=0; g<ngroup+1; g++) {
            cell[g] = row.insertCell(g);
            cell[g].style.border = "1px solid black";
            cell[g].style.backgroundColor = "#eee";
          }
          if (ngroup > 1) {
            cell[0].innerHTML = svgStr[101][langNum]+"<br> * 95%, ** 99%"; // "평균차 검정"
          }
          else cell[0].innerHTML = svgStr[21][langNum]+" ("+gvarName+")";
          for (g=1; g<ngroup+1; g++) {
            str ="";
            if (ngroup > 1) str = (indexA[g-1]+1).toString()+" ("+gvalueLabel[indexA[g-1]]+")<br>"+f2(avg[indexA[g-1]]);        
            cell[g].innerHTML = str;
            cell[g].style.textAlign = "center";
          }

          // 다중비교 - 평균 sorting
          for (g=0; g<ngroup; g++) {
            row = table.insertRow(++nrow);
            for (j=0; j<ngroup+1; j++) {
              cell[j] = row.insertCell(j);  
              cell[j].style.border = "1px solid black";
            }
            str ="";
            if (ngroup > 1) str = (indexA[g]+1).toString()+" ("+gvalueLabel[indexA[g]]+")<br>"+f2(avg[indexA[g]]);        
            cell[0].innerHTML = str;
            cell[0].style.backgroundColor = "#eee";
            cell[0].style.textAlign = "center";
            for (k=0; k<ngroup; k++) {
              if (g == k) continue;
              avgDiff = Math.abs(avg[indexA[g]]-avg[indexA[k]]);
              HSD95   = q_inv(0.95,ngroup,dobs-ngroup,info)*Math.sqrt(0.5*(1/nobs[indexA[g]] + 1/nobs[indexA[k]])*statF[5] );
              HSD99   = q_inv(0.99,ngroup,dobs-ngroup,info)*Math.sqrt(0.5*(1/nobs[indexA[g]] + 1/nobs[indexA[k]])*statF[5] );
              temp    = "  ";
              if (avgDiff > HSD99) temp = "**";
              else if (avgDiff > HSD95) temp = "*";  
              cell[k+1].innerHTML = temp;  
              cell[k+1].style.textAlign = "right";         
            }
          }

          row = table.insertRow(++nrow);
          row.style.height ="20px";

}

// 다중비교표 --------------------------------------------------------------------------------------------------
function multipleComparisonTable2(ngroup,ngroup2, dvarName,gvarName,gvarName2, gvalueLabel,gvalueLabel2, nobs, avg, cobsTwoWay, cmeanTwoWay) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

        var g,k, row, nrow, str, temp, info, avgDiff, HSD95, HSD99;
        var ncol = 20;
        var cell = new Array(ncol);
          nrow = 0;
          table.style.fontSize = "13px";
 
          var header = table.createTHead()
          row  = table.insertRow(nrow);
          row.style.height ="40px";
          for (j=0; j<5; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.width ="70px";
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
            cell[j].style.width ="80px";
          }
          cell[0].innerHTML = "<h3>"+svgStr[90][langNum]+"</h3>"+svgStr[92][langNum]+" 1"; // "다중비교 인자 1"
          cell[1].innerHTML = svgStr[26][langNum];
          cell[2].innerHTML = "("+dvarName+")";
          if (ngroup > 1) {
            cell[3].innerHTML = svgStr[37][langNum];
            cell[4].innerHTML = "("+gvarName+")";
          }

          row  = table.insertRow(++nrow);
          row.style.height ="40px";
          for (g=0; g<ngroup+1; g++) {
            cell[g] = row.insertCell(g);
            cell[g].style.border = "1px solid black";
            cell[g].style.backgroundColor = "#eee";
          }
          if (ngroup > 1) {
            cell[0].innerHTML = svgStr[100][langNum] +"<br> (95%HSD)"; // "평균차"
          }
          else cell[0].innerHTML = svgStr[21][langNum]+" ("+gvarName+")";
          for (g=1; g<ngroup+1; g++) {
            str = (g).toString()+" ("+gvalueLabel[g-1]+")<br>"+f2(avg[g-1]);        
            cell[g].innerHTML = str;
            cell[g].style.textAlign = "center";
          }
          // 다중비교 - 평균차, HSD
          for (g=0; g<ngroup; g++) {
            row = table.insertRow(++nrow);
            for (j=0; j<ngroup+1; j++) {
              cell[j] = row.insertCell(j);  
              cell[j].style.border = "1px solid black";
            }
            str ="";
            if (ngroup > 1) str = (g+1).toString()+" ("+gvalueLabel[g]+")<br>"+f2(avg[g]);        
            cell[0].innerHTML = str;
            cell[0].style.backgroundColor = "#eee";
            cell[0].style.textAlign = "center";
            for (k=0; k<ngroup; k++) {
              if (g == k) continue;
              avgDiff = Math.abs(avg[g]-avg[k]);
              HSD95   = q_inv(0.95,ngroup,dobs-ngroup,info)*Math.sqrt(0.5*(1/nobs[g] + 1/nobs[k])*statF[14] );
              cell[k+1].innerHTML = f2(avgDiff).toString()+"<br>("+f2(HSD95)+")";  
              cell[k+1].style.textAlign = "right";   
              cell[k+1].style.width ="80px";      
            }
          }

          row = table.insertRow(++nrow); // 공란
          row.style.height ="20px";

          for (g=0; g<ngroup; g++) tdata[g] = avg[g];
          sortAscendIndex(ngroup,tdata,indexA);

          row  = table.insertRow(++nrow);
          row.style.height ="40px";
          for (g=0; g<ngroup+1; g++) {
            cell[g] = row.insertCell(g);
            cell[g].style.border = "1px solid black";
            cell[g].style.backgroundColor = "#eee";
          }
          if (ngroup > 1) {
            cell[0].innerHTML = svgStr[101][langNum]+"<br> * 95%, ** 99%"; //  "평균차 검정"
          }
          else cell[0].innerHTML = svgStr[21][langNum]+" ("+gvarName+")";
          for (g=1; g<ngroup+1; g++) {
            str ="";
            if (ngroup > 1) str = (indexA[g-1]+1).toString()+" ("+gvalueLabel[indexA[g-1]]+")<br>"+f2(avg[indexA[g-1]]);        
            cell[g].innerHTML = str;
            cell[g].style.textAlign = "center";
          }

          // 다중비교 - 평균 sorting
          for (g=0; g<ngroup; g++) {
            row = table.insertRow(++nrow);
            for (j=0; j<ngroup+1; j++) {
              cell[j] = row.insertCell(j);  
              cell[j].style.border = "1px solid black";
            }
            str ="";
            if (ngroup > 1) str = (indexA[g]+1).toString()+" ("+gvalueLabel[indexA[g]]+")<br>"+f2(avg[indexA[g]]);        
            cell[0].innerHTML = str;
            cell[0].style.backgroundColor = "#eee";
            cell[0].style.textAlign = "center";
            for (k=0; k<ngroup; k++) {
              if (g == k) continue;
              avgDiff = Math.abs(avg[indexA[g]]-avg[indexA[k]]);
              HSD95   = q_inv(0.95,ngroup,dobs-ngroup,info)*Math.sqrt(0.5*(1/nobs[indexA[g]] + 1/nobs[indexA[k]])*statF[14] );
              HSD99   = q_inv(0.99,ngroup,dobs-ngroup,info)*Math.sqrt(0.5*(1/nobs[indexA[g]] + 1/nobs[indexA[k]])*statF[14] );
              temp    = "  ";
              if (avgDiff > HSD99) temp = "**";
              else if (avgDiff > HSD95) temp = "*";  
              cell[k+1].innerHTML = temp;  
              cell[k+1].style.textAlign = "right";         
            }
          }

          row = table.insertRow(++nrow);
          row.style.height ="20px";

          row  = table.insertRow(++nrow);
          row.style.height ="40px";
          for (j=0; j<5; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.width ="70px";
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
            cell[j].style.width ="80px";
          }
          cell[0].innerHTML = "<h3>"+svgStr[90][langNum]+"</h3>"+svgStr[92][langNum]+" 2"; // "다중비교 인자 2"
          cell[1].innerHTML = svgStr[26][langNum]
          cell[2].innerHTML = "("+dvarName+")";
          if (ngroup2 > 1) {
            cell[3].innerHTML = svgStr[37][langNum];
            cell[4].innerHTML = "("+gvarName+")";
          }

          row  = table.insertRow(++nrow);
          row.style.height ="40px";
          for (g=0; g<ngroup2+1; g++) {
            cell[g] = row.insertCell(g);
            cell[g].style.border = "1px solid black";
            cell[g].style.backgroundColor = "#eee";
          }
          if (ngroup2 > 1) {
            cell[0].innerHTML = svgStr[100][langNum]+"<br> (95%HSD)"; // "평균차"
          }
          else cell[0].innerHTML = svgStr[21][langNum]+" ("+gvarName+")";
          for (g=1; g<ngroup2+1; g++) {
            str = (g).toString()+" ("+gvalueLabel[g-1]+")<br>"+f2(cmeanTwoWay[g-1]);        
            cell[g].innerHTML = str;
            cell[g].style.textAlign = "center";
          }
          // 다중비교 - 평균차, HSD
          for (g=0; g<ngroup2; g++) {
            row = table.insertRow(++nrow);
            for (j=0; j<ngroup2+1; j++) {
              cell[j] = row.insertCell(j);  
              cell[j].style.border = "1px solid black";
            }
            str ="";
            if (ngroup2 > 1) str = (g+1).toString()+" ("+gvalueLabel[g]+")<br>"+f2(cmeanTwoWay[g]);        
            cell[0].innerHTML = str;
            cell[0].style.backgroundColor = "#eee";
            cell[0].style.textAlign = "center";
            for (k=0; k<ngroup2; k++) {
              if (g == k) continue;
              avgDiff = Math.abs(cmeanTwoWay[g]-cmeanTwoWay[k]);
              HSD95   = q_inv(0.95,ngroup2,dobs-ngroup2,info)*Math.sqrt(0.5*(1/cobsTwoWay[g] + 1/cobsTwoWay[k])*statF[14] );
              cell[k+1].innerHTML = f2(avgDiff).toString()+"<br>("+f2(HSD95)+")";  
              cell[k+1].style.textAlign = "right";   
              cell[k+1].style.width ="80px";      
            }
          }

          row = table.insertRow(++nrow); // 공란
          row.style.height ="20px";

          for (g=0; g<ngroup2; g++) tdata[g] = cmeanTwoWay[g];
          sortAscendIndex(ngroup2,tdata,indexA);

          row  = table.insertRow(++nrow);
          row.style.height ="40px";
          for (g=0; g<ngroup2+1; g++) {
            cell[g] = row.insertCell(g);
            cell[g].style.border = "1px solid black";
            cell[g].style.backgroundColor = "#eee";
          }
          if (ngroup2 > 1) {
            cell[0].innerHTML = svgStr[101][langNum]+"<br> * 95%, ** 99%"; // "평균차 검정"
          }
          else cell[0].innerHTML = svgStr[21][langNum]+" ("+gvarName+")";
          for (g=1; g<ngroup2+1; g++) {
            str ="";
            if (ngroup2 > 1) str = (indexA[g-1]+1).toString()+" ("+gvalueLabel[indexA[g-1]]+")<br>"+f2(cmeanTwoWay[indexA[g-1]]);        
            cell[g].innerHTML = str;
            cell[g].style.textAlign = "center";
          }

          // 다중비교 - 평균 sorting
          for (g=0; g<ngroup2; g++) {
            row = table.insertRow(++nrow);
            for (j=0; j<ngroup2+1; j++) {
              cell[j] = row.insertCell(j);  
              cell[j].style.border = "1px solid black";
            }
            str ="";
            if (ngroup2 > 1) str = (indexA[g]+1).toString()+" ("+gvalueLabel[indexA[g]]+")<br>"+f2(cmeanTwoWay[indexA[g]]);        
            cell[0].innerHTML = str;
            cell[0].style.backgroundColor = "#eee";
            cell[0].style.textAlign = "center";
            for (k=0; k<ngroup2; k++) {
              if (g == k) continue;
              avgDiff = Math.abs(cmeanTwoWay[indexA[g]]-cmeanTwoWay[indexA[k]]);
              HSD95   = q_inv(0.95,ngroup2,dobs-ngroup2,info)*Math.sqrt(0.5*(1/cobsTwoWay[indexA[g]] + 1/cobsTwoWay[indexA[k]])*statF[14] );
              HSD99   = q_inv(0.99,ngroup2,dobs-ngroup2,info)*Math.sqrt(0.5*(1/cobsTwoWay[indexA[g]] + 1/cobsTwoWay[indexA[k]])*statF[14] );
              temp    = "  ";
              if (avgDiff > HSD99) temp = "**";
              else if (avgDiff > HSD95) temp = "*";  
              cell[k+1].innerHTML = temp;  
              cell[k+1].style.textAlign = "right";         
            }
          }

          row = table.insertRow(++nrow);
          row.style.height ="20px";

}
// 회귀분석표 --------------------------------------------------------------------------------------------------
function regressionTable(xvarName,yvarName,nobs,xavg,xstd,yavg,ystd,alphaR,betaR,corr,rsquare,sxx,ssr,sse,stderr) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

        var i, j, tobs, pvalue, temp, df, info, fobs, mse, str;
        var row;
        var num  = 0;
        var ncol = 6;
        var k    = 0;
        var df   = nobs[k] - 2;

          var cell = new Array(ncol);

          table.style.fontSize = "13px";
          table.style.cellPadding = "10";

          row = table.insertRow(num);
          cell[0] = row.insertCell(0);
          cell[0].innerHTML = svgStr[79][langNum]; // "<h3>회귀분석</h3>";
          cell[0].style.textAlign = "center";
          cell[0].style.backgroundColor = "#eee";
          cell[0].style.border = "1px solid black";
    
          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.width ="80px";
          }
          cell[0].style.width ="120px";
          cell[0].innerHTML = svgStrU[31][langNum]; // "회귀선";
          cell[0].style.backgroundColor = "#eee";
          cell[0].style.textAlign = "center";
          cell[0].style.border = "1px solid black";
          cell[1].innerHTML = "y = ";
          cell[1].style.textAlign = "right";
          cell[2].innerHTML = f3(alphaR[k]).toString()+" + ";
          cell[2].style.textAlign = "right";
          cell[3].innerHTML = f3(betaR[k]).toString() + "  x";   
          cell[3].style.textAlign = "center";

          tobs = corr[k] * Math.sqrt( (nobs[k]-2)/(1-corr[k]*corr[k]) );
          pvalue = t_cdf(tobs,df,info);
          if (pvalue < 0.5) pvalue = 2*pvalue;
          else pvalue = 2*(1-pvalue)
          row  = table.insertRow(++num);
          for (j=0; j<5; j++) cell[j] = row.insertCell(j);
          cell[0].innerHTML = svgStr[60][langNum]; // "상관계수";
          cell[1].innerHTML = "r = "+f3(corr[k]).toString();    
          cell[2].innerHTML = "H<sub>0</sub>: &rho;=0 ";   
          cell[3].innerHTML = "t "+svgStr[69][langNum]+" = "+f3(tobs); // "t관찰값";    
          if (pvalue < 0.0001) str = "p "+svgStr[69][langNum]+" < 0.0001";
          else str = "p "+svgStr[69][langNum]+" = "+f4(pvalue).toString(); 
          cell[4].innerHTML = str;   
          for (j=0; j<5; j++) {
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
          }

          row  = table.insertRow(++num);
          for (j=0; j<2; j++) cell[j] = row.insertCell(j);
          cell[0].innerHTML = svgStr[61][langNum]; // "결정계수";  
          cell[1].innerHTML = "r<sup>2</sup> = "+f3(rsquare[k]).toString();   
          for (j=0; j<2; j++) {
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
          }

          row  = table.insertRow(++num);
          for (j=0; j<2; j++) cell[j] = row.insertCell(j);
          cell[0].innerHTML = svgStr[62][langNum]; // "추정오차";  
          cell[1].innerHTML = "s = "+f3(stderr[k]).toString();    
          for (j=0; j<2; j++) {
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
          }

          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          

          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
          }
          cell[0].innerHTML = svgStr[63][langNum]; // "변량";
          cell[1].innerHTML = svgStr[64][langNum]; // "변량명";
          cell[2].innerHTML = svgStr[44][langNum]; // "자료수";  
          cell[3].innerHTML = svgStr[34][langNum]; // "평균";  
          cell[4].innerHTML = svgStr[35][langNum]; // "표준편차";       
          for (j=0; j<ncol-1; j++) {
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
          }

          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = svgStr[65][langNum]+" x"; // "독립변량 x";
          cell[0].style.backgroundColor = "#eee";
          cell[1].innerHTML = xvarName;            
          cell[2].innerHTML = nobs[k].toString();  
          cell[3].innerHTML = f3(xavg[k]).toString();  
          cell[4].innerHTML = f3(xstd[k]).toString();  
          cell[0].style.textAlign = "center";
          cell[1].style.textAlign = "center";
          for (j=2; j<ncol; j++) cell[j].style.textAlign = "right";         

          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);                
          cell[0].innerHTML = svgStr[66][langNum]+" y"; // "종속변량 y";
          cell[0].style.backgroundColor = "#eee";
          cell[1].innerHTML = yvarName;            
          cell[2].innerHTML = nobs[k].toString();  
          cell[3].innerHTML = f3(yavg[k]).toString();  
          cell[4].innerHTML = f3(ystd[k]).toString();  
          cell[0].style.textAlign = "center";
          cell[1].style.textAlign = "center";
          for (j=2; j<ncol; j++) cell[j].style.textAlign = "right";          

          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          for (j=0; j<ncol; j++) cell[j].style.textAlign = "right";         

          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);          
          }
          cell[0].innerHTML = svgStr[67][langNum]; // "모수";
          cell[1].innerHTML = svgStr[68][langNum]; // "추정치";  
          cell[2].innerHTML = svgStrU[18][langNum]; // "표준오차";  
          cell[3].innerHTML = "t "+svgStr[69][langNum]; // "t관찰값";  
          cell[4].innerHTML = "p "+svgStr[69][langNum]; // "p-값 ";   
          for (j=0; j<ncol-1; j++) {
            cell[j].style.textAlign = "center";   
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
          }

          temp = stderr[k]*Math.sqrt(1./nobs[k] + xavg[k]*xavg[k]/sxx[k]);
          tobs = alphaR[k]/temp;
          pvalue = t_cdf(tobs,df,info);
          if (pvalue < 0.5) pvalue = 2*pvalue;
          else pvalue = 2*(1-pvalue);
          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = svgStr[70][langNum]; // "절편";
          cell[0].style.textAlign = "center";
          cell[1].innerHTML = f3(alphaR[k]).toString();  
          cell[2].innerHTML = f3(temp).toString();  
          cell[3].innerHTML = f3(tobs).toString();  
          if (pvalue < 0.0001) str = "< 0.0001";
          else str = f4(pvalue).toString();  
          cell[4].innerHTML = str;
          cell[0].style.backgroundColor = "#eee"; 
          for (j=1; j<ncol; j++) cell[j].style.textAlign = "right";   

          temp = stderr[k]/Math.sqrt(sxx[k]);
          tobs = betaR[k]/temp;
          pvalue = t_cdf(tobs,df,info);
          if (pvalue < 0.5) pvalue = 2*pvalue;
          else pvalue = 2*(1-pvalue);
          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = svgStr[71][langNum]; // "기울기";
          cell[0].style.textAlign = "center";
          cell[1].innerHTML = f3(betaR[k]).toString();  
          cell[2].innerHTML = f3(temp).toString();  
          cell[3].innerHTML = f3(tobs).toString();  
          if (pvalue < 0.0001) str = "< 0.0001";
          else str = f4(pvalue).toString();  
          cell[4].innerHTML = str;  
          cell[0].style.backgroundColor = "#eee"; 
          for (j=1; j<ncol; j++) cell[j].style.textAlign = "right";  

          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          for (j=0; j<ncol; j++) cell[j].style.textAlign = "right";         

          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = svgStrU[29][langNum]; // "분산분석표";
          cell[0].style.textAlign = "center";   
          cell[0].style.backgroundColor = "#eee";
          cell[0].style.border = "1px solid black";

          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = svgStr[72][langNum]; // "요인";
          cell[1].innerHTML = svgStr[73][langNum]; // "제곱합";  
          cell[2].innerHTML = svgStr[74][langNum]; // "자유도";  
          cell[3].innerHTML = svgStr[75][langNum]; // "평균제곱";  
          cell[4].innerHTML = "F "+svgStr[69][langNum]; // "F관찰값";   
          cell[5].innerHTML = "p "+svgStr[69][langNum]; // "p-값 =";    
          for (j=0; j<ncol; j++) {
            cell[j].style.textAlign = "center";   
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
          }
   
          mse  = sse[k]/(nobs[k]-2);
          fobs = ssr[k]/mse;
          pvalue = 1 - f_cdf(fobs,1,nobs[k]-2,info);
          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = svgStr[76][langNum]; // "회귀";
          cell[0].style.textAlign = "center";
          cell[1].innerHTML = f3(ssr[k]).toString();  
          cell[2].innerHTML = "1";  
          cell[3].innerHTML = f3(ssr[k]).toString();  
          cell[4].innerHTML = f3(fobs).toString();  
          if (pvalue < 0.0001) str = "< 0.0001";
          else str = f4(pvalue).toString();  
          cell[5].innerHTML = str; 
          cell[0].style.backgroundColor = "#eee"; 
          for (j=1; j<ncol; j++) cell[j].style.textAlign = "right";   

          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = svgStr[77][langNum]; // "오차";
          cell[0].style.textAlign = "center";
          cell[1].innerHTML = f3(sse[k]).toString();  
          cell[2].innerHTML = nobs[k]-2;  
          cell[3].innerHTML = f3(mse).toString();  
          cell[0].style.backgroundColor = "#eee"; 
          for (j=1; j<ncol; j++) cell[j].style.textAlign = "right";   

          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);          
            cell[j].style.border = "1px solid black";
          }
          cell[0].innerHTML = svgStr[78][langNum]; // "전체";
          cell[0].style.textAlign = "center";
          cell[0].style.backgroundColor = "#eee";   
          cell[1].innerHTML = f3(ssr[k]+sse[k]).toString();  
          cell[2].innerHTML = nobs[k]-1;
          for (j=1; j<ncol; j++) {
            cell[j].style.textAlign = "right";   
            cell[j].style.backgroundColor = "#eee"; 
          }
          // 다음 표와의 공백을 위한 것
          row = table.insertRow(++num);
          row.style.height = "20px";
} 
// 다중 선형 회귀분석표 --------------------------------------------------------------------------------------------------
function regressionTable2(numVar, tdobs, tdvar) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

        var i, j, k, stderr, tobs, pvalue, temp, df, info, tleft, tright, str;
        var row;
        var num  = 0;
        var ncol = numVar + 1;
        if (ncol < 6) ncol = 6;

          var cell = new Array(ncol);

          table.style.fontSize = "13px";
          table.style.cellPadding = "10";

          row = table.insertRow(num);
          cell[0] = row.insertCell(0);
          cell[0].innerHTML = svgStr[79][langNum]; // "<h3>회귀분석</h3>";
          cell[0].style.textAlign = "center";
          cell[0].style.backgroundColor = "#eee";
          cell[0].style.border = "1px solid black";
    
          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.width ="90px";
          }
          cell[0].style.width ="120px";
          cell[0].innerHTML = svgStrU[31][langNum] + " y ="; // "회귀선";
          cell[0].style.backgroundColor = "#eee";
          cell[0].style.textAlign = "center";
          cell[0].style.border = "1px solid black";
          cell[1].innerHTML = "("+f3(Beta[0]).toString()+")";
          cell[1].style.textAlign = "right";
          for (k=1; k<numVar; k++) {
            cell[k+1].innerHTML = "+ &nbsp; ("+f3(Beta[k]).toString()+")" + " X<sub>"+k+"</sub>";   
            cell[k+1].style.textAlign = "center";
          }

          row  = table.insertRow(++num);
          for (j=0; j<6; j++) cell[j] = row.insertCell(j);
          cell[0].innerHTML = svgStr[106][langNum]; // "중상관계수"
          cell[1].innerHTML = f3(statF[12]);    
          cell[2].innerHTML = svgStr[61][langNum]; // "결정계수";  
          cell[3].innerHTML = f3(statF[12]*statF[12]); 
          cell[4].innerHTML = svgStr[62][langNum]; // "추정오차"   
          cell[5].innerHTML = f3(statF[11]); 
          for (j=0; j<6; j++) {
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
          }
        // 공백
          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
        // 회귀 추정 모수
          row  = table.insertRow(++num);
          for (j=0; j<6; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = svgStr[67][langNum]; // "모수";
          cell[1].innerHTML = svgStr[68][langNum]; // "추정치";  
          cell[2].innerHTML = svgStrU[18][langNum]; // "표준오차";  
          cell[3].innerHTML = "t "+svgStr[69][langNum]; // "t관찰값";  
          cell[4].innerHTML = "p "+svgStr[69][langNum]; // "p-값 =";   
          cell[5].innerHTML = "95% "+svgStrU[20][langNum]; // 신뢰구간
          for (j=0; j<6; j++) {
            cell[j].style.textAlign = "center";   
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
          }
          cell[5].style.width ="100px";
          df = statF[5];
          temp = t_inv(0.95,df,info);

        for (k=0; k<numVar; k++) {
          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);  
          if (k == 0) cell[0].innerHTML = "&beta;<sub>"+k+"</sub>";         
          else cell[0].innerHTML = "&beta;<sub>"+k+"</sub> "+" "+tdvarName[k]; 
          cell[0].style.textAlign = "left";
          cell[0].style.backgroundColor = "#eee"; 
          cell[1].innerHTML = f3(Beta[k]).toString(); 
          stderr = Math.sqrt(Cii[k]*statF[8]);
          tobs   = Beta[k] / stderr; 
          pvalue = t_cdf(tobs,df,info);
          if (pvalue < 0.5) pvalue = 2*pvalue;
          else pvalue = 2*(1-pvalue);
          tleft  = Beta[k] - temp*stderr;
          tright = Beta[k] + temp*stderr;
          cell[2].innerHTML = f3(stderr).toString();  
          cell[3].innerHTML = f3(tobs).toString();  
          if (pvalue < 0.0001) str = "< 0.0001";
          else str = f4(pvalue).toString();  
          cell[4].innerHTML = str;  
          cell[5].innerHTML = "("+f3(tleft)+" ,"+f3(tright)+")";  

          for (j=1; j<ncol; j++) cell[j].style.textAlign = "right";   
        }
        // 공백
          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          for (j=0; j<ncol; j++) cell[j].style.textAlign = "right";         
        // 분산분석표
          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = svgStrU[29][langNum]; // "분산분석표";
          cell[0].style.textAlign = "center";   
          cell[0].style.backgroundColor = "#eee";
          cell[0].style.border = "1px solid black";

          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = svgStr[72][langNum]; // "요인";
          cell[1].innerHTML = svgStr[73][langNum]; // "제곱합";  
          cell[2].innerHTML = svgStr[74][langNum]; // "자유도";  
          cell[3].innerHTML = svgStr[75][langNum]; // "평균제곱";  
          cell[4].innerHTML = "F "+svgStr[69][langNum]; // "F관찰값";   
          cell[5].innerHTML = "p "+svgStr[69][langNum]; // "p-값 =";    
          for (j=0; j<ncol; j++) {
            cell[j].style.textAlign = "center";   
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
          }
   
          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = svgStr[76][langNum]; // "회귀";
          cell[0].style.textAlign = "center";
          cell[1].innerHTML = f4(statF[1]).toString();  
          cell[2].innerHTML = f0(statF[4]).toString();  
          cell[3].innerHTML = f4(statF[7]).toString();  
          cell[4].innerHTML = f4(statF[9]).toString(); 
          if (statF[10] < 0.0001)  str ="< 0.0001"
          else str = f4(statF[10]).toString();
          cell[5].innerHTML = str ;  
          cell[0].style.backgroundColor = "#eee"; 
          for (j=1; j<ncol; j++) cell[j].style.textAlign = "right";   

          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = svgStr[77][langNum]; // "오차";
          cell[0].style.textAlign = "center";
          cell[1].innerHTML = f4(statF[2]).toString();  
          cell[2].innerHTML = f0(statF[5]).toString();  
          cell[3].innerHTML = f4(statF[8]).toString();  
          cell[0].style.backgroundColor = "#eee"; 
          for (j=1; j<ncol; j++) cell[j].style.textAlign = "right";   

          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);          
            cell[j].style.border = "1px solid black";
          }
          cell[0].innerHTML = svgStr[78][langNum]; // "전체";
          cell[0].style.textAlign = "center";
          cell[0].style.backgroundColor = "#eee";   
          cell[1].innerHTML = f4(statF[3]).toString();  
          cell[2].innerHTML = f0(statF[6]).toString();
          for (j=1; j<ncol; j++) {
            cell[j].style.textAlign = "right";   
            cell[j].style.backgroundColor = "#eee"; 
          }
          // 다음 표와의 공백을 위한 것
          row = table.insertRow(++num);
          row.style.height = "20px";

} 
// 다변량 통계표 --------------------------------------------------------------------------------------------------
function multivariateTable(numVar, tdobs, tdvar) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

        var i, j, tobs, pvalue, temp, df, info, t95, stderr, tleft, tright;
        var row;
        var num   = 0;
        var ncol  = 22;
        var ncol2 = 7;

        var cell = new Array(ncol);
        df  = tdobs[0] -1;
        t95 = t_inv(0.975,df,info);

        table.style.fontSize = "13px";
        table.style.cellPadding = "10";
        // 헤더
          row = table.insertRow(num);
          cell[0] = row.insertCell(0);
          cell[0].innerHTML = svgStr[43][langNum]; // "<h3>기초통계량</h3>"; 
          cell[0].style.textAlign = "center";
          cell[0].style.backgroundColor = "#eee";
          cell[0].style.border = "1px solid black";
          cell[0].style.width ="110px";
        // 변량별 평균 및 분산
          row  = table.insertRow(++num);
          for (j=0; j<ncol2; j++) {
            cell[j] = row.insertCell(j);
          }
          cell[0].innerHTML = svgStr[63][langNum]; // "변량";
          cell[1].innerHTML = svgStr[64][langNum]; // "변량명";
          cell[2].innerHTML = svgStr[44][langNum]; // "자료수";  
          cell[3].innerHTML = svgStr[34][langNum]; // "평균";  
          cell[4].innerHTML = svgStr[35][langNum]; // "표준편차";  
          cell[5].innerHTML = svgStrU[18][langNum];// "표준오차";  
          cell[6].innerHTML = "95% "+svgStrU[20][langNum]; // 95% 신뢰구간  
                
          for (j=0; j<ncol2; j++) {
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
            cell[j].style.width ="80px";  
          }
          cell[6].style.width ="150px"; 

        for (k=0; k<numVar; k++) {
          row  = table.insertRow(++num);
          for (j=0; j<ncol2; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = svgStr[63][langNum]+" "+(k+1).toString(); // "변량";
          cell[0].style.backgroundColor = "#eee";
          cell[1].innerHTML = tdvarName[k];            
          cell[2].innerHTML = tdobs[0];  
          cell[3].innerHTML = f3(avgX[k]).toString();  
          temp   = Math.sqrt(Cov[k][k]);  // std dev
          stderr = temp/Math.sqrt(tdobs[0]); // std err
          tleft  = avgX[k] - t95*stderr;
          tright = avgX[k] + t95*stderr; 
          cell[4].innerHTML = f3(temp).toString();  
          cell[5].innerHTML = f3(stderr).toString(); 
          cell[6].innerHTML = "("+f3(tleft)+", "+f3(tright)+")";  
          cell[0].style.textAlign = "center";
          cell[1].style.textAlign = "center";
          for (j=2; j<ncol2; j++) cell[j].style.textAlign = "right"; 
          cell[6].style.textAlign = "center";        
        }

          row  = table.insertRow(++num);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          for (j=0; j<ncol; j++) cell[j].style.textAlign = "right";         

        // 상관계수 행렬
          row = table.insertRow(++num);
          cell[0] = row.insertCell(0);
          cell[0].innerHTML = svgStr[107][langNum]; // "<h3>상관분석</h3>"
          cell[0].style.textAlign = "center";
          cell[0].style.backgroundColor = "#eee";
          cell[0].style.border = "1px solid black";
          cell[0].style.width ="120px";

          row  = table.insertRow(++num);
          for (j=0; j<numVar+2; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.border = "1px solid black";
            cell[j].style.width ="80px";  
          }
          cell[0].innerHTML = svgStr[108][langNum]+"<br>H<sub>0</sub>: &rho;=0 &nbsp; t-"+svgStr[69][langNum]+"<br>(p-"+svgStr[69][langNum]+")"; // "상관계수행렬"
          cell[1].innerHTML = svgStr[64][langNum]; // "변량명";              
          for (k=0; k<numVar; k++) {
            cell[k+2].innerHTML = svgStr[63][langNum]+" "+(k+1); // "변수 "
          }
     
          for (i=0; i<numVar; i++) {

            row  = table.insertRow(++num);
            for (j=0; j<numVar+2; j++) cell[j] = row.insertCell(j);          
            cell[0].innerHTML = svgStr[63][langNum]+" "+(i+1).toString(); // "변량";
            cell[0].style.backgroundColor = "#eee";
            cell[1].innerHTML = tdvarName[i];            
            for (j=0; j<2; j++) {
              cell[j].style.textAlign = "center";
              cell[j].style.backgroundColor = "#eee";
              cell[j].style.border = "1px solid black";
            }

            for (k=0; k<numVar; k++) {
              if (i == k || Corr[i][k] == 1) str = "1";
              else {
                 tobs = Corr[i][k] * Math.sqrt( (tdobs[0]-2)/(1-Corr[i][k]*Corr[i][k]) );
                 pvalue = t_cdf(tobs,tdobs[0]-2,info);
                 if (pvalue < 0.5) pvalue = 2*pvalue;
                 else pvalue = 2*(1-pvalue);
                 if (pvalue < 0.0001) str = "< 0.0001";
                 else str = f4(pvalue).toString();  
                 str = f3(Corr[i][k]).toString()+"<br>"+f3(tobs)+"<br>("+str+")"; 
              }
              cell[k+2].innerHTML = str;   
              cell[k+2].style.textAlign = "right";
              cell[k+2].style.border = "1px solid black";
            }

          }

          // 다음 표와의 공백을 위한 것
          row = table.insertRow(++num);
          row.style.height = "20px";

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

// 회귀분석 Q-Q Plot 그리기 ----------------------------------------------------------------------------------------------
function regressionQQ(tobs,yhat,residual) {
        var i, j, k, info, temp1, temp2;
        var normalQ  = new Array(tobs);
        var tdata    = new Array(tobs);

        for (j=0; j<tobs; j++) {
          tdata[j]   = residual[j];          // residual 임시저장 sorting때문에 변하기 때문
          normalQ[j] = stdnormal_inv((j+0.5)/tobs, info);
        }
        tdata.sort(function(a, b){return a-b});

        // 그래프 화면 정의 
        gxmin   = -3;
        gxmax   = 3;
        gymin   = -3;
        gymax   = 3;
        gxrange = gxmax - gxmin;
        gyrange = gymax - gymin;

        chart.selectAll("*").remove();
 
        margin = {top: 90, bottom: 90, left: 100, right: 120};
        graphWidth  = svgWidth - margin.left - margin.right;
        graphHeight = svgHeight - margin.top - margin.bottom;

        // 제목
        chart.append("text")
             .attr("x",margin.left + titleBuffer)
             .attr("y",margin.top/2)
             .style("font-size","17px")
             .style("font-family","sans-seirf")
             .style("stroke","black")
             .style("text-anchor","middle")
             .text(svgStr[80][langNum]) // "표준화 잔차의 Q-Q Plot"
      // y축 제목
      chart.append("text")
           .attr("x",margin.left/2)
           .attr("y",margin.top+graphHeight/2+5)
           .style("font-size","10px")
           .style("font-family","sans-seirf")
           .style("stroke","black")
           .style("text-anchor","middle")
           .text(svgStr[81][langNum]) // "표준화 잔차"
           .attr("transform", "rotate(-90 50 280)")
//           .attr("transform", "rotate(-90 10 240)")
      // x축 제목
      chart.append("text")
           .attr("x",margin.left + graphWidth/2)
           .attr("y",margin.top+graphHeight+margin.bottom/2)
           .style("font-size","10px")
           .style("font-family","sans-seirf")
           .style("stroke","black")
           .style("text-anchor","middle")
           .text(svgStr[82][langNum]) // "정규 분위수"

      // 축 그리기
      drawScatterAxis(gxmin, gxmax, gymin, gymax, graphWidth, graphHeight); 
      // y = x 그리기     
      chart.append("line")
           .attr("x1",margin.left)
           .attr("y1",margin.top+graphHeight)
           .attr("x2",margin.left+graphWidth)
           .attr("y2",margin.top)
           .style("stroke","greenyellow") 
      // 점 그리기
      for (j=0; j<tobs; j++) {
        chart.append("circle")
             .attr("class","circle")
             .style("fill",myColor[1])
             .attr("r", 4)
             .attr("cx", margin.left+graphWidth*(normalQ[j]-gxmin)/gxrange)
             .attr("cy", margin.top+graphHeight-graphHeight*(tdata[j]-gymin)/gyrange)
      }

}

// Residual Plot 그리기 ----------------------------------------------------------------------------------------------
function regressionResidual(tobs, yhat, residual, title) {
        var i, j, k, tobs, temp1, temp2, temp;
        var tdata    = new Array(tobs);
/*
        var yhat     = new Array(nobs[0]);
        var residual = new Array(nobs[0]);

        k    = 0;
        tobs = nobs[k];
        for (j=0; j<tobs; j++) {
          yhat[j]     = alphaR[k] + betaR[k]*xdata[j];
          residual[j] = ydata[j] - yhat[j];
          temp1 = xdata[j] - xavg[k];
          temp2 = stderr[k] *Math.sqrt(1 - 1./nobs[k] - temp1*temp1/sxx[k] )
          residual[j] = residual[j] / temp2;
        }

*/
        // residual 임시저장 
        for (i=0; i<tobs; i++) tdata[i] = residual[i];
      
        // 그래프 화면 정의 
        xmin = gmin(tobs, yhat);
        xmax = gmax(tobs, yhat);
        ymin = gmin(tobs, tdata);
        ymax = gmax(tobs, tdata);
        xbuffer = (xmax-xmin) / 5;     // 경계점이 보이기위한 완충거리
        ybuffer = (ymax-ymin) / 3;     // 경계점이 보이기위한 완충거리
        gxmin   = xmin-xbuffer;
        gxmax   = xmax+xbuffer;
        gymin   = -3.0;
        gymax   = 3.0;
        gxrange = gxmax - gxmin;
        gyrange = gymax - gymin;

        chart.selectAll("*").remove();
 
        margin = {top: 90, bottom: 90, left: 100, right: 120};

        var bufferScatter = 40;
        graphWidth  = svgWidth - margin.left - margin.right;
        graphHeight = svgHeight - margin.top - margin.bottom;

      // 제목
      chart.append("text")
           .attr("x",margin.left + titleBuffer)
           .attr("y",margin.top/2)
           .style("font-size","17px")
           .style("font-family","sans-seirf")
           .style("stroke","black")
           .style("text-anchor","middle")
           .text(title) // "잔차와 예측값/지렛값의 산점도"
      // y축 제목
      chart.append("text")
           .attr("x",margin.left/2)
           .attr("y",margin.top+graphHeight/2+5)
           .style("font-size","10px")
           .style("font-family","sans-seirf")
           .style("stroke","black")
           .style("text-anchor","middle")
           .text(svgStr[81][langNum]) // "표준화 잔차"
           .attr("transform", "rotate(-90 50 280)")

      // x축 제목
      chart.append("text")
           .attr("x",margin.left + graphWidth/2)
           .attr("y",margin.top+graphHeight+margin.bottom/2)
           .style("font-size","10px")
           .style("font-family","sans-seirf")
           .style("stroke","black")
           .style("text-anchor","middle")
           .text(xstr) // "예측값"
      // 축 그리기
      drawScatterAxis(gxmin, gxmax, gymin, gymax, graphWidth, graphHeight);  
      // 가운데 y=0 직선 그리기   
      x1 = margin.left;
      x2 = margin.left + graphWidth;
      y1 = margin.top + graphHeight/2;
      y2 = y1; 
      chart.append("line")
           .attr("x1",x1)
           .attr("y1",y1)
           .attr("x2",x2)
           .attr("y2",y2)
           .style("stroke","greenyellow") 
      // 점 그리기
      for (j=0; j<tobs; j++) {
        chart.append("circle")
             .attr("data-sheetrowid", j)
             .attr("class","datapoint")
             .style("stroke","black")
             .style("fill",myColor[1])
             .attr("r", wdata[j])
             .attr("cx", margin.left+graphWidth*(yhat[j]-gxmin)/gxrange)
             .attr("cy", margin.top+graphHeight-graphHeight*(tdata[j]-gymin)/gyrange)
      }

}

// Cook's Plot 그리기 ----------------------------------------------------------------------------------------------
function regressionCook(tobs, Cook) {
        var i, j, k, tobs, temp1, temp2, temp;
        var tdata    = new Array(tobs);

        // residual 임시저장 
        for (i=0; i<tobs; i++) tdata[i] = i+1;
      
        // 그래프 화면 정의 
        xmin = 1;
        xmax = tobs;
        ymin = gmin(tobs, Cook);
        ymax = gmax(tobs, Cook);
        xbuffer = (xmax-xmin) / (tobs-1);     // 경계점이 보이기위한 완충거리
        ybuffer = (ymax-ymin) / 3;     // 경계점이 보이기위한 완충거리
        gxmin   = xmin-xbuffer;
        gxmax   = xmax+xbuffer;
        gymin   = ymin-ybuffer;
        gymax   = ymax+ybuffer;
        gxrange = gxmax - gxmin;
        gyrange = gymax - gymin;

        chart.selectAll("*").remove();
 
        margin = {top: 90, bottom: 90, left: 100, right: 120};

        var bufferScatter = 40;
        graphWidth  = svgWidth - margin.left - margin.right;
        graphHeight = svgHeight - margin.top - margin.bottom;

      // 제목
      chart.append("text")
           .attr("x",margin.left + titleBuffer)
           .attr("y",margin.top/2)
           .style("font-size","17px")
           .style("font-family","sans-seirf")
           .style("stroke","black")
           .style("text-anchor","middle")
           .text(svgStr[97][langNum]) // "Cook 거리 그래프";
      // y축 제목
      chart.append("text")
           .attr("x",margin.left/2)
           .attr("y",margin.top+graphHeight/2+5)
           .style("font-size","10px")
           .style("font-family","sans-seirf")
           .style("stroke","black")
           .style("text-anchor","middle")
           .text(svgStr[98][langNum]) // "Cook 거리";
           .attr("transform", "rotate(-90 50 280)")
      // x축 제목
      chart.append("text")
           .attr("x",margin.left + graphWidth/2)
           .attr("y",margin.top+graphHeight+margin.bottom/2)
           .style("font-size","10px")
           .style("font-family","sans-seirf")
           .style("stroke","black")
           .style("text-anchor","middle")
           .text(svgStr[99][langNum]) // "데이터 순서"
      // 축 그리기
      drawScatterAxis(gxmin, gxmax, gymin, gymax, graphWidth, graphHeight);  
      // 점-선 그리기
      for (j=0; j<tobs; j++) {
        x1 = margin.left+graphWidth*(tdata[j]-gxmin)/gxrange;
        x2 = x1;
        y1 = margin.top + graphHeight-graphHeight*(Cook[j]-gymin)/gyrange;
        y2 = margin.top + graphHeight;
        chart.append("circle")
             .attr("data-sheetrowid", j)
             .attr("class","datapoint")
             .style("stroke","black")
             .style("fill",myColor[1])
             .attr("r", wdata[j])
             .attr("cx",x1)
             .attr("cy",y1)
        chart.append("line")
             .attr("x1",x1)
             .attr("y1",y1+4)
             .attr("x2",x2)
             .attr("y2",y2)
             .style("stroke","green") 
      }

}

// ANOVAResidual Plot 그리기 ----------------------------------------------------------------------------------------------
function AnovaResidual(ngroup,tobs,yhat,residual) {
        var i, j, k, tobs, temp1, temp2, temp;

        // 그래프 화면 정의 
        xmin = gmin(tobs, yhat);
        xmax = gmax(tobs, yhat);
        if (checkRBD) {
          xmin = tstat[1] - 2*tstat[2];
          xmax = tstat[1] + 2*tstat[2]
        }
        ymin = gmin(tobs, residual);
        ymax = gmax(tobs, residual);
        xbuffer = (xmax-xmin) / 5;     // 경계점이 보이기위한 완충거리
        ybuffer = (ymax-ymin) / 3;     // 경계점이 보이기위한 완충거리
        gxmin   = xmin-xbuffer;
        gxmax   = xmax+xbuffer;
        gymin   = ymin-ybuffer;
        gymax   = ymax+ybuffer;
        if (gymax > Math.abs(gymin)) gymin = - gymax;
        else gymax = (-1) * gymin;
        gxrange = gxmax - gxmin;
        gyrange = gymax - gymin;

        chart.selectAll("*").remove();
 
        margin = {top: 90, bottom: 90, left: 100, right: 120};

        var bufferScatter = 40;
        graphWidth  = svgWidth - margin.left - margin.right;
        graphHeight = svgHeight - margin.top - margin.bottom;

      // 제목
      chart.append("text")
           .attr("x",margin.left + titleBuffer)
           .attr("y",margin.top/2)
           .style("font-size","17px")
           .style("font-family","sans-seirf")
           .style("stroke","black")
           .style("text-anchor","middle")
           .text(svgStr[83][langNum]) // "잔차와 예측값의 산점도"
      // y축 제목
      chart.append("text")
           .attr("x",margin.left/2)
           .attr("y",margin.top+graphHeight/2+5)
           .style("font-size","10px")
           .style("font-family","sans-seirf")
           .style("stroke","black")
           .style("text-anchor","middle")
           .text(svgStr[87][langNum]) // "잔차"
           .attr("transform", "rotate(-90 10 240)")
      // x축 제목
      chart.append("text")
           .attr("x",margin.left + graphWidth/2)
           .attr("y",margin.top+graphHeight+margin.bottom/2)
           .style("font-size","10px")
           .style("font-family","sans-seirf")
           .style("stroke","black")
           .style("text-anchor","middle")
           .text(svgStr[84][langNum]) // "예측값"
      // 축 그리기
      drawScatterAxis(gxmin, gxmax, gymin, gymax, graphWidth, graphHeight);  
      // 가운데 y=0 직선 그리기   
      x1 = margin.left;
      x2 = margin.left + graphWidth;
      y1 = margin.top + graphHeight/2;
      y2 = y1; 
      chart.append("line")
           .attr("x1",x1)
           .attr("y1",y1)
           .attr("x2",x2)
           .attr("y2",y2)
           .style("stroke","greenyellow") 
      // 점 그리기
      for (j=0; j<tobs; j++) {
        chart.append("circle")
             .attr("class","circle")
             .style("fill",myColor[k])
             .attr("r", 4)
             .attr("cx", margin.left+graphWidth*(yhat[j]-gxmin)/gxrange)
             .attr("cy", margin.top+graphHeight-graphHeight*(residual[j]-gymin)/gyrange)
      }

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
           str = "H\u2080: \u03bc = \u03BC\u2080 , ";
           if (h1Type == 1)      str +=" H\u2081: \u03bc \u2260 \u03BC\u2080 ";
           else if (h1Type == 2) str +=" H\u2081: \u03bc > \u03BC\u2080 ";  
           else                  str +=" H\u2081: \u03bc < \u03BC\u2080 ";
           str += ", \u03BC\u2080 = "+ f2(statT[0]);
           if (testType == 1) str += " , \u03c3 = " + f2(statT[1]);
         }
         else if (hypoType == 41 || hypoType == 42 || hypoType == 43) {
           str = "H\u2080: \u03BC\u2081 - \u03BC\u2082 = D, ";
           if (h1Type == 1)      str +=" H\u2081: \u03BC\u2081 - \u03BC\u2082 \u2260 D , ";
           else if (h1Type == 2) str +=" H\u2081: \u03BC\u2081 - \u03BC\u2082 > 0 ";  
           else                  str +=" H\u2081: \u03BC\u2081 - \u03BC\u2082 < 0 ";
           str += "D = " + f2(statT[0]); 
         }
         chart.append("text").attr("x", tx).attr("y", ty).text(str)
              .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")

         ty += 20;
         if (hypoType == 1)       str = svgStrU[23][langNum]+"(m - \u03BC\u2080) / ( s/\u221A n )  ~  t("+df+") "+svgStrU[24][langNum];
         else if (hypoType == 41) str = svgStrU[23][langNum]+"(m\u2081-m\u2082-D) / (pooledStd * \u221A(1/n\u2081+1/n\u2082))  ~  t("+df+") "+svgStrU[24][langNum];
         else if (hypoType == 42) str = svgStrU[23][langNum]+"(m\u2081 - m\u2082 - D) / ( sqrt(s\u2081\u00B2/n\u2081 + s\u2082\u00B2/n\u2082) )  ~  t("+f1(df)+") "+svgStrU[24][langNum];
         else if (hypoType == 43) str = svgStrU[23][langNum]+"(m\u2081 - m\u2082 - D) / ( sqrt(sd\u00B2/n\u2081) )  ~  t("+df+") "+svgStrU[24][langNum];
         chart.append("text").attr("x", tx).attr("y", ty).text(str)
              .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")

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
                .style("stroke","black").style("stroke-width","2px")
           x1   = x2;
           y1   = y2;    
         }

         if (a < gxmin) a = gxmin;
         if (b > gxmax) b = gxmax;
         var tempx, tempy;
         var tempx = a;
         do { 
           tempy = t_pdf(tempx, df, info);
           x1   = margin.left + graphWidth2*(tempx-gxmin)/gxrange;
           x2   = x1;
           y1   = margin.top  + graphHeight2;
           y2   = margin.top  + graphHeight2 - graphHeight2*(tempy-gymin)/gyrange;
           chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
                .style("stroke","#0055FF").style("stroke-width","2px")
           tempx += step;        
         } while( tempx <= b ) 

         // a, b, prob 표시
         ta = margin.left + graphWidth2*(a-gxmin)/gxrange;
         tb = margin.left + graphWidth2*(b-gxmin)/gxrange;
         ty = svgHeight2 - margin.bottom + 40;
         chart.append("line").attr("x1",ta).attr("y1",ty-40).attr("x2",ta).attr("y2",ty-15)
              .style("stroke","#0055FF").style("stroke-width","2px")
         chart.append("line").attr("x1",tb).attr("y1",ty-40).attr("x2",tb).attr("y2",ty-15)
              .style("stroke","#0055FF").style("stroke-width","2px")
         chart.append("text").attr("x", ta).attr("y", ty+5).text(f3(a))
              .style("stroke","#0055FF").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         chart.append("text").attr("x", tb).attr("y", ty+5).text(f3(b))
              .style("stroke","#0055FF").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")

         // Accept, Reject regions
         chart.append("text").attr("x", (ta+tb)/2).attr("y", ty).text("<- "+svgStrU[26][langNum]+" ->")
              .style("stroke","#0055FF").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")

         if (h1Type == 1) {  
           chart.append("text").attr("x", ta-60).attr("y", ty).text(svgStrU[25][langNum]+" ->")
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
           chart.append("text").attr("x", tb+60).attr("y", ty).text("<- "+svgStrU[25][langNum])
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
           chart.append("text").attr("x", ta-40).attr("y", ty-60).text(f3(prob))
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
           chart.append("text").attr("x", tb+45).attr("y", ty-60).text(f3(prob))
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")

         }
         else if (h1Type == 2) {
           chart.append("text").attr("x", tb+50).attr("y", ty).text("<- "+svgStrU[25][langNum])
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
           chart.append("text").attr("x", tb+50).attr("y", ty-60).text(f3(prob))
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         }
         else {
           chart.append("text").attr("x", ta-60).attr("y", ty).text(svgStrU[25][langNum]+" ->")
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
           chart.append("text").attr("x", ta-50).attr("y", ty-60).text(f3(prob))
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         }

         // draw test statistics
         if (teststat < gxmin) x1 = margin.left / 2 + 20;
         else if (teststat > gxmax) x1 = margin.left + graphWidth2 + margin.right/2 - 20;
         else x1 = margin.left + graphWidth2*(teststat-gxmin)/gxrange;
         x2 = x1;
         y1 = margin.top + graphHeight2;
         y2 = y1 + 60;
         chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
              .style("stroke","green").style("stroke-width","2px");
         chart.append("text").attr("x", x1).attr("y", y2+15)
              .text(svgStrU[23][langNum]+f3(teststat))
              .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         if (pvalue < 0.0001) str = "< 0.0001";
         else str = f4(pvalue).toString();  
         chart.append("text").attr("x", x1).attr("y", y2+30)
              .text(svgStrU[27][langNum]+str)
              .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")

         // Decision
         var checkAccept;
         if (h1Type == 1) {
           if (teststat > a && teststat < b) checkAccept = true;
           else checkAccept = false;
         }
         else if (h1Type == 2) {
           if (teststat < b) checkAccept = true;
           else checkAccept = false;
         }
         else {
           if (teststat > a) checkAccept = true;
           else checkAccept = false;
         }
         if (checkAccept) {
           chart.append("text").attr("x", tx).attr("y", y2+50)
                .text(svgStrU[28][langNum]+svgStrU[26][langNum])
                .style("stroke","#0055FF").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         }
         else {
           chart.append("text").attr("x", tx).attr("y", y2+50)
                .text(svgStrU[28][langNum]+svgStrU[25][langNum])
                .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         }
         chart.append("line").attr("class","line2")
              .attr("x1",0).attr("y1",y2+60).attr("x2",svgWidth2).attr("y2",y2+60);

         // print sample stat & confidence interval
         tx = 20;
         ty = margin.top + graphHeight2 + 140;
         if (hypoType == 1) {
           str  = svgStrU[54][langNum]+" "+svgStrU[44][langNum]+" n = "  + statT[3] + ", ";
           str += svgStrU[34][langNum]+" m = " + f2(statT[4]) + ", ";
           str += svgStrU[35][langNum]+" s = "  + f2(statT[5]) ;
           chart.append("text").attr("x", tx).attr("y", ty).text(str)
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
           str  = "["+svgStrU[20][langNum]+"] ";
           str += " "+(100*(1-alpha)).toString()+"% "+svgStrU[57][langNum]+" ";
           str += " ( "+ f2(statT[6]) +" , " + f2(statT[7]) + " )";
           chart.append("text").attr("x", tx).attr("y", ty+20).text(str)
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
         }
         else if (hypoType == 41 || hypoType == 42) {
           str  = svgStrU[55][langNum]+" "+svgStrU[44][langNum]+" n\u2081 = "  + statT[3] + ", ";
           str += svgStrU[34][langNum]+" m\u2081 = " + f2(statT[4]) + ", ";
           str += svgStrU[35][langNum]+" s\u2081 = " + f2(statT[5]) ;
           chart.append("text").attr("x", tx).attr("y", ty).text(str)
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
           str  = svgStrU[56][langNum]+" "+svgStrU[44][langNum]+" n\u2082 = "  + statT[6] + ", ";
           str += svgStrU[34][langNum]+" m\u2082 = " + f2(statT[7]) + ", ";
           str += svgStrU[35][langNum]+" s\u2082 = " + f2(statT[8]) ;
           chart.append("text").attr("x", tx).attr("y", ty+20).text(str)
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
         }
         else if (hypoType == 43) {
           str  = svgStrU[54][langNum]+" "+svgStrU[44][langNum]+" n = "  + statT[3] + ", ";
           str += svgStrU[34][langNum]+" m = " + f2(statT[4]) + ", ";
           str += svgStrU[35][langNum]+" s = "  + f2(statT[5]) ;
           chart.append("text").attr("x", tx).attr("y", ty).text(str)
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
           str  = "["+svgStrU[20][langNum]+"] ";
           str += " "+(100*(1-alpha)).toString()+"% "+svgStrU[57][langNum]+" ";
           str += " ( "+ f2(statT[6]) +" , " + f2(statT[7]) + " )";
           chart.append("text").attr("x", tx).attr("y", ty+20).text(str)
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
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
           str = "H\u2080: \u03bc = \u03BC\u2080 , ";
           if (h1Type == 1)      str +=" H\u2081: \u03bc \u2260 \u03BC\u2080 ";
           else if (h1Type == 2) str +=" H\u2081: \u03bc > \u03BC\u2080 ";  
           else                  str +=" H\u2081: \u03bc < \u03BC\u2080 ";
           str += ", \u03BC\u2080 = "+ f2(statT[0]);
         }
         else if (hypoType == 3) {
           str = "H\u2080: P = P\u2080 , ";
           if (h1Type == 1)      str +=" H\u2081: P \u00b1 P\u2080 ";
           else if (h1Type == 2) str +=" H\u2081: P > P\u2080 ";  
           else                  str +=" H\u2081: P < P\u2080 ";
           str += ", P\u2080 = "+ f2(statT[0]);
         }
         else if (hypoType == 6) {
           str = "H\u2080: P\u2081 = P2 ";
           if (h1Type == 1)      str +=" H\u2081: P\u2081 \u00b1 P2";
           else if (h1Type == 2) str +=" H\u2081: P\u2081 > P";  
           else                  str +=" H\u2081: P\u2081 < P";
         }
         chart.append("text").attr("x", tx).attr("y", ty).text(str)
              .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")

         ty += 20;
         if (hypoType == 1)      str = svgStrU[23][langNum]+"(m - mu) / ( \u03C3 / sqrt(n) )  ~  N(0,1)";
         else if (hypoType == 3) str = svgStrU[23][langNum]+"(p - P\u2080) / ( sqrt(p*(1-p)/n) )  ~  N(0,1)";
         else if (hypoType == 6) str = svgStrU[23][langNum]+"(p\u2081 - p\u2082 - D) / (sqrt(pbar*(1-pbar)(1/n\u2081 + 1/n\u2082) )  ~  N(0,1)";
         chart.append("text").attr("x", tx).attr("y", ty).text(str)
              .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")

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
                .style("stroke","black").style("stroke-width","2px")
           x1   = x2;
           y1   = y2;    
         }

         // draw [a, b] region
         if (a < gxmin) a = gxmin;
         if (b > gxmax) b = gxmax;
         var tempx, tempy;
         var tempx = a;
         do { 
           tempy = normal_pdf(mu, sigma, tempx );
           x1   = margin.left + graphWidth2*(tempx-gxmin)/gxrange;
           x2   = x1;
           y1   = margin.top  + graphHeight2;
           y2   = margin.top  + graphHeight2 - graphHeight2*(tempy-gymin)/gyrange;
           chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
                .style("stroke","#0055FF").style("stroke-width","2px")
           tempx += step;        
         } while( tempx <= b ) 

         // a, b, prob 표시
         ta = margin.left + graphWidth2*(a-gxmin)/gxrange;
         tb = margin.left + graphWidth2*(b-gxmin)/gxrange;
         ty = svgHeight2 - margin.bottom + 40;
         chart.append("line").attr("x1",ta).attr("y1",ty-40).attr("x2",ta).attr("y2",ty-15)
              .style("stroke","#0055FF").style("stroke-width","2px")
         chart.append("line").attr("x1",tb).attr("y1",ty-40).attr("x2",tb).attr("y2",ty-15)
              .style("stroke","#0055FF").style("stroke-width","2px")
         chart.append("text").attr("x", ta).attr("y", ty+5).text(f3(a))
              .style("stroke","#0055FF").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         chart.append("text").attr("x", tb).attr("y", ty+5).text(f3(b))
              .style("stroke","#0055FF").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")

         // Accept, Reject regions
         chart.append("text").attr("x", (ta+tb)/2).attr("y", ty).text("<- "+svgStrU[26][langNum]+" ->")
              .style("stroke","#0055FF").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
 
         if (h1Type == 1) {  
           chart.append("text").attr("x", ta-60).attr("y", ty).text(svgStrU[25][langNum]+" ->")
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
           chart.append("text").attr("x", tb+60).attr("y", ty).text("<- "+svgStrU[25][langNum])
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
           chart.append("text").attr("x", ta-40).attr("y", ty-60).text(f3(prob))
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
           chart.append("text").attr("x", tb+45).attr("y", ty-60).text(f3(prob))
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")

         }
         else if (h1Type == 2) {
           chart.append("text").attr("x", tb+50).attr("y", ty).text("<- "+svgStrU[25][langNum])
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
           chart.append("text").attr("x", tb+50).attr("y", ty-60).text(f3(prob))
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         }
         else {
           chart.append("text").attr("x", ta-60).attr("y", ty).text(svgStrU[25][langNum]+" ->")
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
           chart.append("text").attr("x", ta-50).attr("y", ty-60).text(f3(prob))
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         }

         // draw test statistics
         if (teststat < gxmin) x1 = margin.left / 2 + 20;
         else if (teststat > gxmax) x1 = margin.left + graphWidth2 + margin.right/2 - 20;
         else x1 = margin.left + graphWidth2*(teststat-gxmin)/gxrange;
         x2 = x1;
         y1 = margin.top + graphHeight2;
         y2 = y1 + 60;
         chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
              .style("stroke-width","2px").style("stroke","green");
         chart.append("text").attr("x", x1).attr("y", y2+15).text(svgStrU[23][langNum]+f3(teststat))
              .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         if (pvalue < 0.0001) str = "< 0.0001";
         else str = f4(pvalue).toString();  
         chart.append("text").attr("x", x1).attr("y", y2+30).text(svgStrU[27][langNum]+str)
              .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")

         // Decision
         var checkAccept;
         if (h1Type == 1) {
           if (teststat > a && teststat < b) checkAccept = true;
           else checkAccept = false;
         }
         else if (h1Type == 2) {
           if (teststat < b) checkAccept = true;
           else checkAccept = false;
         }
         else {
           if (teststat > a) checkAccept = true;
           else checkAccept = false;
         }
         if (checkAccept) {
           chart.append("text").attr("x", tx).attr("y", y2+50).text(svgStrU[28][langNum]+svgStrU[26][langNum])
                .style("stroke","#0055FF").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         }
         else {
           chart.append("text").attr("x", tx).attr("y", y2+50).text(svgStrU[28][langNum]+svgStrU[25][langNum])
                .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         }
         chart.append("line").attr("x1",0).attr("y1",y2+60).attr("x2",svgWidth2).attr("y2",y2+60)
              .style("stroke-width","0.7px").style("stroke","black");

         // print sample stat & confidence interval
         tx = 20;
         ty = margin.top + graphHeight2 + 140;
         if (hypoType == 1) {
           str  = svgStrU[54][langNum]+" "+svgStrU[44][langNum]+" n = "  + statT[3] + ", ";
           str += svgStrU[34][langNum]+" m = " + f2(statT[4]) + ", ";
           str += svgStrU[35][langNum]+" s = "  + f2(statT[5]) ;
           chart.append("text").attr("x", tx).attr("y", ty).text(str)
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
           str  = "["+svgStrU[20][langNum]+"] ";
           str += " "+(100*(1-alpha)).toString()+"% "+svgStrU[57][langNum]+" ";
           str += " ( "+ f2(statT[6]) +" , " + f2(statT[7]) + " )";
           chart.append("text").attr("x", tx).attr("y", ty+20).text(str)
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
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
         var ymax, gxmin, gxmax, gymin, gymax, gxrange, gyrange, temp;

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
           str = "H\u2080: \u03C3\u00B2 = \u03C3\u2080\u00B2  , ";
           if (h1Type == 1)      str +=" H\u2081: \u03C3\u00B2 \u2260 \u03C3\u2080\u00B2 ";
           else if (h1Type == 2) str +=" H\u2081: \u03C3\u00B2 > \u03C3\u2080\u00B2 ";  
           else                  str +=" H\u2081: \u03C3\u00B2 < \u03C3\u2080\u00B2 ";
           str += ", \u03C3\u2080\u00B2 = "+ f2(statT[0]);
         }
         else if (hypoType == 8) {
           str  = "H\u2080: row and column are independent , ";
           str +=" H\u2081: row and columen are dependent";
         }
         chart.append("text").attr("x", tx).attr("y", ty).text(str)
              .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")

         ty += 20;
         if (hypoType == 2)      str = svgStrU[23][langNum]+"(n - 1) s\u00B2 / \u03C3\u2080\u00B2 ~ \u03C7\u00B2("+df+") "+svgStrU[24][langNum];
         else if (hypoType == 8) str = svgStrU[23][langNum]+"Sum( EF - OF)^2 / EF ) ~  ChiSq("+df+") "+svgStrU[24][langNum];
         chart.append("text").attr("x", tx).attr("y", ty).text(str)
              .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")

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
                .style("stroke","black").style("stroke-width","2px")
           x1   = x2;
           y1   = y2;    
         }

         // draw [a, b] region
         if (a < gxmin) a = gxmin;
         if (b > gxmax) b = gxmax;
         var tempx, tempy;
         var tempx = a;
         do { 
           tempy = chisq_pdf(tempx, df, info);
           x1   = margin.left + graphWidth2*(tempx-gxmin)/gxrange;
           x2   = x1;
           y1   = margin.top  + graphHeight2;
           y2   = margin.top  + graphHeight2 - graphHeight2*(tempy-gymin)/gyrange;
           chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
                .style("stroke","#0055FF").style("stroke-width","2px")
           tempx += step;        
         } while( tempx <= b ) 

         // a, b, prob 표시
         ta = margin.left + graphWidth2*(a-gxmin)/gxrange;
         tb = margin.left + graphWidth2*(b-gxmin)/gxrange;
         ty = svgHeight2 - margin.bottom + 40;
         chart.append("line").attr("x1",ta).attr("y1",ty-40).attr("x2",ta).attr("y2",ty-15)
              .style("stroke","#0055FF").style("stroke-width","2px")
         chart.append("line").attr("x1",tb).attr("y1",ty-40).attr("x2",tb).attr("y2",ty-15)
              .style("stroke","#0055FF").style("stroke-width","2px")
         chart.append("text").attr("x", ta).attr("y", ty+5).text(f3(a))
              .style("stroke","#0055FF").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         chart.append("text").attr("x", tb).attr("y", ty+5).text(f3(b))
              .style("stroke","#0055FF").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")

         // Accept, Reject regions
         chart.append("text").attr("x", (ta+tb)/2).attr("y", ty).text("<- "+svgStrU[26][langNum]+" ->")
              .style("stroke","#0055FF").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
 
         if (h1Type == 1) {  
           chart.append("text").attr("x", ta-60).attr("y", ty).text(svgStrU[25][langNum]+" ->")
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
           chart.append("text").attr("x", tb+60).attr("y", ty).text("<- "+svgStrU[25][langNum])
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
           chart.append("text").attr("x", ta-40).attr("y", ty-60).text(f3(prob))
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
           chart.append("text").attr("x", tb+45).attr("y", ty-60).text(f3(prob))
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")

         }
         else if (h1Type == 2) {
           chart.append("text").attr("x", tb+50).attr("y", ty).text("<- "+svgStrU[25][langNum])
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
           chart.append("text").attr("x", tb+50).attr("y", ty-60).text(f3(prob))
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         }
         else {
           chart.append("text").attr("x", ta-60).attr("y", ty).text(svgStrU[25][langNum]+" ->")
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
           chart.append("text").attr("x", ta-50).attr("y", ty-60).text(f3(prob))
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         }

         // draw test statistics
         if (teststat < gxmin) x1 = margin.left / 2 + 20;
         else if (teststat > gxmax) x1 = margin.left + graphWidth2 + margin.right/2 - 20;
         else x1 = margin.left + graphWidth2*(teststat-gxmin)/gxrange;
         x2 = x1;
         y1 = margin.top + graphHeight2;
         y2 = y1 + 60;
         chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
              .style("stroke-width","2px").style("stroke","green");
         chart.append("text").attr("x", x1).attr("y", y2+15).text(svgStrU[23][langNum]+f3(teststat))
              .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         if (pvalue < 0.0001) str = "< 0.0001";
         else str = f4(pvalue).toString();  
         chart.append("text").attr("x", x1).attr("y", y2+30).text(svgStrU[27][langNum]+str)
              .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")

         // Decision
         var checkAccept;
         if (h1Type == 1) {
           if (teststat > a && teststat < b) checkAccept = true;
           else checkAccept = false;
         }
         else if (h1Type == 2) {
           if (teststat < b) checkAccept = true;
           else checkAccept = false;
         }
         else {
           if (teststat > a) checkAccept = true;
           else checkAccept = false;
         }
         if (checkAccept) {
           chart.append("text").attr("x", tx).attr("y", y2+50).text(svgStrU[28][langNum]+svgStrU[26][langNum])
                .style("stroke","#0055FF").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         }
         else {
           chart.append("text").attr("x", tx).attr("y", y2+50).text(svgStrU[28][langNum]+svgStrU[25][langNum])
                .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         }
         chart.append("line").attr("x1",0).attr("y1",y2+60).attr("x2",svgWidth2).attr("y2",y2+60)
              .style("stroke-width","0.7px").style("stroke","black");

         // print sample stat & confidence interval
         tx = 20;
         ty = margin.top + graphHeight2 + 140;
         if (hypoType == 2) {
           str  = svgStrU[54][langNum]+" "+svgStrU[44][langNum]+" n = "  + statT[3] + ", ";
           str += svgStrU[34][langNum]+" m = " + f2(statT[4]) + ", ";
           str += svgStrU[35][langNum]+" s = " + f2(statT[5]) ;
           chart.append("text").attr("x", tx).attr("y", ty).text(str)
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
           str  = "["+svgStrU[20][langNum]+"] ";
           str += " "+(100*(1-alpha)).toString()+"% "+svgStrU[57][langNum]+" ";
           str += " ( "+ f2(statT[6]) +" , " + f2(statT[7]) + " )";
           chart.append("text").attr("x", tx).attr("y", ty+20).text(str)
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")  
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
         var ymax, gxmin, gxmax, gymin, gymax, gxrange, gyrange, temp;

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
           str = "H\u2080: \u03C3\u2081\u00B2 = \u03C3\u2082\u00B2  , ";
           if (h1Type == 1)      str +=" H\u2081: \u03C3\u2081\u00B2 \u2260 \u03C3\u2082\u00B2 ";
           else if (h1Type == 2) str +=" H\u2081: \u03C3\u2081\u00B2 > \u03C3\u2082\u00B2 ";  
           else                  str +=" H\u2081: \u03C3\u2081\u00B2 < \u03C3\u2082\u00B2 ";
         }
         else if (hypoType == 7) {
           str  = "H\u2080: \u03BC\u2081 = \u03BC\u2082 = ... = \u03BC\u2096 , ";
//           str +=" H\u2081: at least one pair of means is no equal ";
         }
         chart.append("text").attr("x", tx).attr("y", ty).text(str)
              .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")

         // 통계량 
         ty += 20;
         if (hypoType == 5)       str = svgStrU[23][langNum]+"( s\u2081\u00B2 / s\u2082\u00B2 )  ~  F("+df1+","+df2+") "+svgStrU[24][langNum];
         else if (hypoType == 7)  str = svgStrU[23][langNum]+"(BSS / (k-1)) / (ESS / (n-k))  ~  F("+df1+","+df2+") "+svgStrU[24][langNum];
         chart.append("text").attr("x", tx).attr("y", ty).text(str)
              .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")

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
                .style("stroke","black").style("stroke-width","2px")
           x1   = x2;
           y1   = y2;    
         }

         // draw [a, b] region
         if (a < gxmin) a = gxmin;
         if (b > gxmax) b = gxmax;
         var tempx, tempy;
         var tempx = a;
         do { 
           tempy = f_pdf(tempx, df1, df2, info);
           x1   = margin.left + graphWidth2*(tempx-gxmin)/gxrange;
           x2   = x1;
           y1   = margin.top  + graphHeight2;
           y2   = margin.top  + graphHeight2 - graphHeight2*(tempy-gymin)/gyrange;
           chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
                .style("stroke","#0055FF").style("stroke-width","2px")
           tempx += step;        
         } while( tempx <= b ) 

         // a, b, prob 표시
         ta = margin.left + graphWidth2*(a-gxmin)/gxrange;
         tb = margin.left + graphWidth2*(b-gxmin)/gxrange;
         ty = svgHeight2 - margin.bottom + 30;
         chart.append("line").attr("x1",ta).attr("y1",ty-30).attr("x2",ta).attr("y2",ty-10)
              .style("stroke","#0055FF").style("stroke-width","2px")
         chart.append("line").attr("x1",tb).attr("y1",ty-30).attr("x2",tb).attr("y2",ty-10)
              .style("stroke","#0055FF").style("stroke-width","2px")
         chart.append("text").attr("x", ta).attr("y", ty+10).text(f3(a))
              .style("stroke","#0055FF").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         chart.append("text").attr("x", tb).attr("y", ty+10).text(f3(b))
              .style("stroke","#0055FF").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")

         // Accept, Reject regions
         chart.append("text").attr("x", (ta+tb)/2).attr("y", ty).text("<- "+svgStrU[26][langNum]+" ->")
              .style("stroke","#0055FF").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")

         if (h1Type == 1) {  
           chart.append("text").attr("x", ta-60).attr("y", ty).text(svgStrU[25][langNum]+" ->")
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
           chart.append("text").attr("x", tb+60).attr("y", ty).text("<- "+svgStrU[25][langNum])
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
           chart.append("text").attr("x", ta-40).attr("y", ty-60).text(f3(prob))
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
           chart.append("text").attr("x", tb+45).attr("y", ty-60).text(f3(prob))
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")

         }
         else if (h1Type == 2) {
           chart.append("text").attr("x", tb+50).attr("y", ty).text("<- "+svgStrU[25][langNum])
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
           chart.append("text").attr("x", tb+50).attr("y", ty-60).text(f3(prob))
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         }
         else {
           chart.append("text").attr("x", ta-60).attr("y", ty).text(svgStrU[25][langNum]+" ->")
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
           chart.append("text").attr("x", ta-50).attr("y", ty-60).text(f3(prob))
              .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         }

         // draw test statistic 
         if (statF[0] > gxmax) x1 = margin.left + graphWidth2 + margin.right/2 - 20;
         else x1 = margin.left + graphWidth2*(statF[0]-gxmin)/gxrange;
         x2 = x1;
         y1 = margin.top + graphHeight2;
         y2 = y1 + 50;
         chart.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
              .style("stroke-width","2px").style("stroke","green");
         if (pvalue < 0.0001) str = "< 0.0001";
         else str = f4(pvalue).toString();  
         chart.append("text").attr("x", x1).attr("y", y2+10)
              .text("Fo = "+f2(statF[0])+", "+svgStrU[27][langNum]+str )
              .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         // decision
         if (statF[0] > a && statF[0] < b) {
           chart.append("text").attr("x", tx).attr("y", y2+25).text(svgStrU[28][langNum]+svgStrU[26][langNum])
                .style("stroke","#0055FF").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         }
         else {
           chart.append("text").attr("x", tx).attr("y", y2+25).text(svgStrU[28][langNum]+svgStrU[25][langNum])
                .style("stroke","red").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","middle")
         }

         if (hypoType == 5) ty = y2 + 45;
         else if (hypoType == 7) ty = y2 +35;
         chart.append("line").attr("x1",0).attr("y1",ty).attr("x2",svgWidth2).attr("y2",ty)
              .style("stroke-width","0.7px").style("stroke","black");

         // sample statistics & anova table
         if (hypoType == 7) {
           tx = 10;
           ty = y2 + 53;
           str = svgStrU[54][langNum];  // [표본통계량]
           chart.append("text").attr("x", tx).attr("y", ty).text(str)
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
           tx += 20;
           ty += 15;
           str  = svgStrU[44][langNum]+" : ";  // 자료수
           chart.append("text").attr("x", tx).attr("y", ty).text(str)
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
           str = "";
           for (k=0; k<ngroup; k++) {str += "n"+(k+1).toString()+"="+nobs[k]+", ";}
           chart.append("text").attr("x", tx+60).attr("y", ty).text(str)
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
           ty += 15;
           str  = svgStrU[34][langNum]+" : "; // 평균
           chart.append("text").attr("x", tx).attr("y", ty).text(str)
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
           str = "";
           for (k=0; k<ngroup; k++) {str += "m"+(k+1).toString()+"="+f2(avg[k])+", ";}
           chart.append("text").attr("x", tx+60).attr("y", ty).text(str)
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
           ty += 15;
           str  = svgStrU[35][langNum]+" : "; // 표준편차
           chart.append("text").attr("x", tx).attr("y", ty).text(str)
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
           str = "";
           for (k=0; k<ngroup; k++) {str += "s"+(k+1).toString()+"="+f2(std[k])+", ";}
           chart.append("text").attr("x", tx+60).attr("y", ty).text(str)
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
           // 분산분석표
           ta = 70; tb = ta + 100; tc = tb + 60; td = tc + 100; te = td + 80;
           t1 = ty + 5; t2 = t1 + 15;  t3 = t2 + 15; t4 = t3 + 15;
           chart.append("text").attr("x", ta-60).attr("y", t2).text("[ANOVA]")
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")

           chart.append("text").attr("x", ta).attr("y", t2).text("BSS="+f2(statF[1]) )
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
           chart.append("text").attr("x", tb).attr("y", t2).text("df="+df1)
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
           chart.append("text").attr("x", tc).attr("y", t2).text("MSB="+f2(statF[4]) )
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
           chart.append("text").attr("x", td).attr("y", t2).text("F="+f2(statF[0]) )
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
           chart.append("text").attr("x", te).attr("y", t2).text("p="+f3(statF[9]) )
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")

           chart.append("text").attr("x", ta).attr("y", t3).text("ESS="+f2(statF[2]) )
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
           chart.append("text").attr("x", tb).attr("y", t3).text("df="+df2)
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
           chart.append("text").attr("x", tc).attr("y", t3).text("MSE="+f2(statF[5]) )
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")

           chart.append("text").attr("x", ta).attr("y", t4).text("TSS="+f2(statF[3]) )
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
         }
         else if (hypoType == 5){
           tx = 20;
           ty = margin.top + graphHeight2 + 130;

           str  = svgStrU[55][langNum]+" "+svgStrU[44][langNum]+" n\u2081 = "  + statF[3] + ", ";
           str += svgStrU[34][langNum]+" m\u2081 = " + f2(statF[4]) + ", ";
           str += svgStrU[35][langNum]+" s\u2081 = " + f2(statF[5]) ;
           chart.append("text").attr("x", tx).attr("y", ty).text(str)
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")
           str  = svgStrU[56][langNum]+" "+svgStrU[44][langNum]+" n\u2082 = "  + statF[6] + ", ";
           str += svgStrU[34][langNum]+" m\u2082 = " + f2(statF[7]) + ", ";
           str += svgStrU[35][langNum]+" s\u2082 = " + f2(statF[8]) ;
           chart.append("text").attr("x", tx).attr("y", ty+20).text(str)
                .style("stroke","green").style("font-size","9pt").style("font-family","sans-serif").style("text-anchor","start")  
         }

}     

