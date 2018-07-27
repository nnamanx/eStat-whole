function highlight_datapoint() {
	console.log("Click Here!");
        k = $(this).data('sheetrowid');	
	datasheet.selectCell(k, 0, k, 0, true);
	datasheet.selectRows(k);
	d3.selectAll(".highlight_datapoint")
          .attr("class", "datapoint")
          .attr("r", wdata[k])
          .style("stroke", "black")
          .style("stroke-width", 1) ;
          
	d3.select(this)
          .attr("class", "datapoint highlight_datapoint")
          .attr("r", wdata[k] + 5)
          .style("stroke", "orange")
          .style("stroke-width", 5) ;
}

$(document).ready(function() {
    if(window.navigator.userAgent.indexOf("Chrome") <= 0) {
	alert("Chrome 웹브라우저를 사용하면 100% 기능이 작동됩니다. 다른 웹브라우저에서는 일부 기능이 작동하지 않을 수 있습니다.");
    };
});
		  
var chart = d3.select("#SVG");
// 기본 버튼 칼러색 설정
var buttonColorB = "#E0FFFF";
var buttonColorH = "#FF4500";
// log 스크린 컨트롤
var screenTablePixelHeight = 1000;
// 메뉴 칼러
var exampleDataNo = 10
var menuColor = new Array(exampleDataNo + 1);
var i, j, k, m, temp, tempi;
var freqMin, freqMax, numVar, rawData, checkNumeric, checkVarSelect;
var svgWidth, svgHeight, margin, graphWidth, graphHeight;
var svgWidth2, svgHeight2;
var title, graphNum;
var langNum = 0;
var rowMax = 10000; // 시트행 최대
var colMax = 20; // 시트열 최대
var buffer = 20; // 우측 y선과 범례와  간격
var bothBarGap = 35; // 양쪽막대의 갭
var maxNumEdit = 9; // 변량편집시 최대 변량값 수
var jj = 0; // 변량편집시 초기 컬럼 번호
var graphNumMax = 30; // 그래프 종류의 최대 개수  현재 25개
// 그래프별 초기제목, 주제목, x제목, y제목
var iTitle = new Array(graphNumMax);
var mTitle = new Array(graphNumMax);
var yTitle = new Array(graphNumMax);
var xTitle = new Array(graphNumMax);
// datasheet raw variable
var numCol, numRow;
var robs = new Array(colMax);
var rvarName = new Array(colMax);
var defaultColHeaders = Array(colMax).fill(1).map((x,y) => "V" + (x+y));
var rvarDeci = new Array(colMax);
var rvalueNum = new Array(colMax);
var rvar = new Array(colMax); // 2차원 배열로 아래에 정의
var rvalue = new Array(colMax); // 2차원 배열로 아래에 정의
var rvalueLabel = new Array(colMax); // 2차원 배열로 아래에 정의
// 그룹변수 크기변수를 위한 변수리스트
    var groupSelect, sizeSelect, option;
// selected variable for analysis
var selected, selected_point, numOfSelectedColumns;
var tdobs = new Array(colMax);
var tdvarNumber = new Array(colMax);
var tdvarName = new Array(colMax);
var tdvalueNum = new Array(colMax);
var tdvar = new Array(colMax); // 2차원 배열로 아래에 정의
var tdvalue = new Array(colMax); // 2차원 배열로 아래에 정의
var tdvalueLabel = new Array(colMax); // 2차원 배열로 아래에 정의
for (j = 0; j < colMax; j++) {
    rvarName[j] = "V" + (j + 1).toString();
    rvar[j] = new Array(rowMax);
    rvalue[j] = new Array(rowMax);
    rvalueLabel[j] = new Array(rowMax);
    tdvar[j] = new Array(rowMax);
    tdvalue[j] = new Array(rowMax);
    tdvalueLabel[j] = new Array(rowMax);
    for (i = 0; i < rowMax; i++) {
        rvalueLabel[j][i] = null;
        tdvalueLabel[j][i] = null;
    }
};
// Sorting freq and Ascend/Descend Indexing Label
var dataR = new Array(rowMax);
var dataA = new Array(rowMax);
var dataD = new Array(rowMax);
var indexR = new Array(rowMax);
var indexA = new Array(rowMax);
var indexD = new Array(rowMax);
var vlabelR = new Array(rowMax);
var vlabelA = new Array(rowMax);
var vlabelD = new Array(rowMax);
// dependent variable
var dobs, dvarNumber, dvarName, ndvalue;
var dvar = new Array(rowMax);
var dvalueNum = new Array(rowMax);
var dataValue = new Array(rowMax);
var dvalueLabel = new Array(rowMax);
var dvalueFreq = new Array(rowMax);
var dataY = new Array(rowMax);
// group variable
var gobs, gvarNumber, gvarName, ngvalue, ngroup, ngroup1;
var gvar = new Array(rowMax);
var gvalueNum = new Array(rowMax);
var gdataValue = new Array(rowMax);
var gvalueLabel = new Array(rowMax);
var gvalueFreq = new Array(rowMax);
var currentDataSet = new Array(rowMax);
var currentLabel = new Array(rowMax);
// group2 variable
var gobs2, gvarNumber2, gvarName2, ngvalue2, ngroup2;
var gvar2 = new Array(rowMax);
var gvalueNum2 = new Array(rowMax);
var gdataValue2 = new Array(rowMax);
var gvalueLabel2 = new Array(rowMax);
var gvalueFreq2 = new Array(rowMax);
// 연속형 그래프 변량 정의
var tobs;
var tdata = new Array(rowMax);
var tdataG2 = new Array(rowMax);
var tstat = new Array(20);
var stat = new Array(30);
var xmin, xmax, ymin, ymax, xbuffer, ybuffer;
var gxmin, gxmax, gxrange, gymin, gymax, gyrange;
// 그룹 변량 정의
var ngroupMax = 50;
var nobs        = new Array(ngroupMax);
var nobs2       = new Array(ngroupMax);
var dataSet     = new Array(ngroupMax);
var dataSetG2   = new Array(ngroupMax);
var groupFreq   = new Array(ngroupMax);
var nobsTwoWay  = new Array(ngroupMax);
var robsTwoWay  = new Array(ngroupMax);
var cobsTwoWay  = new Array(ngroupMax);
var meanTwoWay  = new Array(ngroupMax);
var rmeanTwoWay = new Array(ngroupMax);
var cmeanTwoWay = new Array(ngroupMax);
var stdTwoWay   = new Array(ngroupMax);
var rstdTwoWay  = new Array(ngroupMax);
var cstdTwoWay  = new Array(ngroupMax);
for (k = 0; k < ngroupMax; k++) {
    nobsTwoWay[k] = new Array(ngroupMax);
    meanTwoWay[k] = new Array(ngroupMax);
    stdTwoWay[k]  = new Array(ngroupMax);
    dataSet[k]    = new Array(rowMax);
    dataSetG2[k]  = new Array(rowMax);
}
var mini = new Array(ngroupMax);
var Q1 = new Array(ngroupMax);
var median = new Array(ngroupMax);
var Q3 = new Array(ngroupMax);
var maxi = new Array(ngroupMax);
var avg = new Array(ngroupMax);
var std = new Array(ngroupMax);
// 산점도 변량 정의
var xobs, xvarNumber, xvarName, yobs, yvarNumber, yvarName, nwvalue, wobs, wvarNumber, wvarName;
var scatterS = new Array(20);
var gdata  = new Array(rowMax);
var gcolor = new Array(rowMax);
var xdata  = new Array(rowMax);
var xvalueLabel = new Array(rowMax);
var xavg   = new Array(ngroupMax);
var xstd   = new Array(ngroupMax);
var ydata  = new Array(rowMax);
var yvalueLabel = new Array(rowMax);
var yavg   = new Array(ngroupMax);
var ystd   = new Array(ngroupMax);
var alphaR = new Array(ngroupMax);
var betaR  = new Array(ngroupMax);
var corr   = new Array(ngroupMax);
var rsquare= new Array(ngroupMax);
var sxx    = new Array(ngroupMax);
var syy    = new Array(ngroupMax);
var sxy    = new Array(ngroupMax);
var ssr    = new Array(ngroupMax);
var sse    = new Array(ngroupMax);
var stderr = new Array(ngroupMax);
var wdata  = new Array(rowMax);
var wdataValue = new Array(rowMax);
// 히스토그램 변량
var nint, xstep, freqmax;
var gxminH, gxmaxH, gyminH, gymaxH;
var dataValueH = new Array(rowMax); // 히스토그램 각 구간값: 최대 구간의 수 =199개
var freq = new Array(ngroupMax);
for (k = 0; k < ngroupMax; k++) freq[k] = new Array(rowMax);
// 가설검정 변량
var df, info, alpha, pvalue, b, c, d, e, f, g, h;
var mu, nn, xbar, stdev, vari, variS, teststat, left, right;
var hypoType, h1Type;
var df1, df2, t1, t2;
var nn1, nn2, xbar1, xbar2, var1, var2, varPooled, varAdd;
var statT = new Array(30);
var statF = new Array(30);
var ntot, mtot, ssb, ssw, msb, msw, temp;
// 분산분석/회귀분석 변량
var yhat     = new Array(rowMax);
var residual = new Array(rowMax);
var stdResidual = new Array(rowMax);
var Cook     = new Array(rowMax);
var Hii      = new Array(rowMax); // leverage (nx1) 벡터
// 다중회귀분석 변량
var Beta     = new Array(colMax);
var avgX     = new Array(colMax);
var Cii      = new Array(colMax); // invXPX의 대각원소 (px1) 벡터
// 다변량분석 변량
var Cov      = new Array(colMax); // 2차원 행렬
var Corr     = new Array(colMax); // 2차원 행렬
var invXPX   = new Array(colMax); // 2차원 행렬
for (j=0; j<colMax; j++) {
   Cov[j]    = new Array(colMax);
   Corr[j]   = new Array(colMax);
   invXPX[j] = new Array(colMax);
}

// 그래프 종류, 체크버튼	블린 변량들
var VerticalBar, HorizontalBar;
var SeparateBar, StackBar, RatioBar, SideBar, BothBar;
var PieChart, DonutGraph, BandGraph, LineGraph, FreqTable;
var DotGraph, Histogram, BoxGraph, StemLeaf, StemBoth, StatTable, Scatter;
var THmean1, THmean12, THsigma1, THsigma12, THanova, EditGraph;
var checkFreq, checkBandFreq, checkMissing, checkData, checkSave;
var checkDotMean, checkDotStd, checkHistMean, checkHistFreq, checkHistLine;
var checkPairedT; // Paired T-test
var checkRegress;
var checkRBD; // Radomized Block Design
var checkScatterMatrix;
buttonColorChange(); // svg 크기, 모든 버튼 체크 초기화
graphTitle(); // 디폴트 그래프 제목
// 학습수준 컨트롤
var levelNum = localStorage.getItem("level");
if (levelNum == null) levelNum = "4";
document.myForm1.type1.value = parseInt(levelNum);
if (levelNum == "1") { // 초등
    document.getElementById("tool-group-graph-numeric").style.display = "none"; // 연속형 그래프 감추기
    document.getElementById("bothstem2").style.display = "none"; // 양쪽형 줄기잎 감추기
    document.getElementById("statTable").style.display = "none"; // 기초통계량 감추기
    document.getElementById("estatH").style.display = "none"; // 고등 모듈 감추기
    document.getElementById("estatU").style.display = "none"; // 대학 모듈 감추기
    document.getElementById("estatE").style.display = "block"; // 예제 보이기
    document.getElementById("tool-group-testing").style.display = "none"; // 가설검정 감추기
    document.getElementById("estat").style.display = "block"; // 예제학습 보이기
} else if (levelNum == "2") { // 중등
    document.getElementById("tool-group-graph-numeric").style.display = "inline-block"; // 연속형 그래프
    document.getElementById("bothstem2").style.display = "block"; // 양쪽형 줄기
    document.getElementById("statTable").style.display = "block"; // 기초통계량
    document.getElementById("tool-group-testing").style.display = "none"; // 가설검정 감추기
    document.getElementById("estatH").style.display = "none"; // 고등 모듈 감추기
    document.getElementById("estatU").style.display = "none"; // 대학 모듈 감추기
    document.getElementById("estatE").style.display = "block"; // 예제 보이기
    document.getElementById("estat").style.display = "block"; // 예제학습 보이기
} else if (levelNum == "3") { // 고등
    document.getElementById("tool-group-graph-numeric").style.display = "inline-block"; // 연속형 그래프
    document.getElementById("bothstem2").style.display = "block"; // 양쪽형 줄기
    document.getElementById("statTable").style.display = "block"; // 기초통계량
    document.getElementById("tool-group-testing").style.display = "none"; // 가설검정
    document.getElementById("estatH").style.display = "block"; // 고등모듈 보이기
    document.getElementById("estatU").style.display = "none"; // 대학 모듈 감추기
    document.getElementById("estatE").style.display = "block"; // 예제 보이기
    document.getElementById("estat").style.display = "block"; // 예제학습 보이기
} else if (levelNum == "4") { // 대학
    document.getElementById("tool-group-graph-numeric").style.display = "inline-block"; // 연속형 그래프
    document.getElementById("bothstem2").style.display = "block"; // 양쪽형 줄기
    document.getElementById("statTable").style.display = "block"; // 기초통계량
    document.getElementById("tool-group-testing").style.display = "inline-block"; // 가설검정
    document.getElementById("estatH").style.display = "block"; // 고등모듈 보이기
    document.getElementById("estatU").style.display = "block"; // 대학 모듈
    document.getElementById("estatE").style.display = "block"; // 예제 보이기
    document.getElementById("estat").style.display = "block"; // 예제학습 보이기
}
// =================================================================
// 시트 컨트롤
// =================================================================
// sheet 초기화 및 만들기
var colWidth = [];
var data = [
    []
];
numVar = 0;
for (j = 0; j < colMax; j++) colWidth[j] = 50;
document.getElementById("loadFileName").value = "Untitled.csv";
container = document.getElementById('datasheet');
datasheet = new Handsontable(container, {
    data: data,
    minRows: rowMax,
    minCols: colMax,
    minSpareRows: 1,
    colWidths: colWidth,
    colHeaders: rvarName,
    className: "htRight",
    rowHeaders: true,
    rowHeaderWidth: 30,
    contextMenu: true,
    outsideClickDeselects: false,
    multiSelect: true,
    fragmentSelection: false,
});
initEventControl(datasheet);
// 변량 선택 취소
d3.select("#debugBtn").on("click", function() {
    variableSelectClear();
})
// 변량 선택 초기화 함수
function variableSelectClear() {
    document.getElementById("selectedVars").value = "";
    for (j = 0; j < numVar; j++) {
        tdvarNumber[j] = null;
        tdvarName[j] = null;
        for (k = 0; k < rowMax; k++) {
            tdvalueLabel[j][k] = null;
            tdvar[j][k] = null;
        }
    }
    numVar = 0;
}
// 새 시트
d3.select("#new").on("click", function() {
    try {
        datasheet.destroy();
    } catch (e) {
        // alert("");
    }
    numVar = 0;
    for (j = 0; j < colMax; j++) {
        colWidth[j] = 50;
        rvarName[j] = "V" + (j + 1).toString();
    }
    datasheet = new Handsontable(container, {
        minRows: rowMax,
        minCols: colMax,
        minSpareRows: 1,
        colWidths: colWidth,
        colHeaders: rvarName,
        className: "htRight",
        rowHeaders: true,
        rowHeaderWidth: 30,
        contextMenu: true,
        outsideClickDeselects: false,
        multiSelect: true,
        fragmentSelection: false,
    });
    datasheet.selectCell(0, 0); // 커서 위치를 (0,0)으로
    variableSelectClear();
    document.getElementById("loadFileName").value = "Untitled.csv";
    for (j = 0; j < colMax; j++) {
        robs[j] = 0;
        for (i = 0; i < rowMax; i++) {
            rvar[j][i] = null;
            rvalue[j][i] = null;
            rvalueLabel[j][i] = null;
        }
        tdvarNumber[j] = null;
        tdvarName[j] = null;
        tdvalueLabel[j] = [];
        tdvar[j] = [];
    }
    numVar = 0;
    initEventControl(datasheet);
}) // endof new sheet
/*
 *  Common functions for initializing the handsontable
 *  when the datasheet is updated
 *
 */
//
// Hook Handsontable Events
//
function initEventControl(datasheet) {
    // 시트 셀 어느 이벤트 발생하든 cell alignment : 문자 left, 숫자 right
    datasheet.addHook('afterChange', function(change, source) {
        //	  console.log(change.length);
        var row = change[0][0];
        var col = change[0][1];
        if (isNaN(change[0][3])) {
            datasheet.setCellMeta(row, col, "className", "htLeft");
        } else {
            datasheet.setCellMeta(row, col, "className", "htRight");
        }
        // update raw data & obs
        for (j = 0; j < colMax; j++) {
            rvar[j] = datasheet.getDataAtCol(j);
            robs[j] = 0;
            for (i = 0; i < rowMax; i++) {
                if (rvar[j][i] == null || rvar[j][i] == "") {} else robs[j]++;
            }
            // 소수점이하 자리수 체크
            rvarDeci[j] = 0;
            for (i = 0; i < robs[j]; i++) {
                m = rvar[j][i].indexOf(".");
                if (m > -1) {
                    k = rvar[j][i].length - (m + 1);
                    if (k > rvarDeci[j]) rvarDeci[j] = k;
                }
            } // endof i
        }
        // 각 변량별 변량값 계산
        numRow = robs[0];
        numCol = 0;
        for (j = 0; j < colMax; j++) {
            if (robs[j] != 0) {
                numCol++;
                for (i = 0; i < robs[j]; i++) dataA[i] = rvar[j][i];
                rvalueNum[j] = sortAscend(robs[j], dataA, dataValue, dvalueFreq);
                for (k = 0; k < rvalueNum[j]; k++) rvalue[j][k] = dataValue[k];
            }
        }
        datasheet.render();
        // 선택된 변수 초기화
        document.getElementById("selectedVars").value = "";
        numVar = 0;
    });
    // 시트 컬럼 이벤트 컨트롤
    datasheet.addHook('afterOnCellMouseDown', function(event, coords) {
        //	  console.log(coords);
        //	  console.log(coords.row+" "+coords.col);

        if (coords.row == -1) { // 컬럼번호 클릭
            selected = datasheet.getSelected();
            numOfSelectedColumns = selected[0][3] - selected[0][1] + 1;
            for (j = 0; j < numOfSelectedColumns; j++) {
                k = j + parseInt(selected[0][1]);
                tdvarNumber[numVar + j] = k + 1;
                tdobs[numVar + j] = robs[k];
                tdvalueNum[numVar + j] = rvalueNum[k];
                tdvarName[numVar + j] = datasheet.getColHeader(j + selected[0][1]);
                /*
                		tdvalue[numVar + j] = rvalue[k];
                                tdvalueLabel[numVar + j] = rvalueLabel[k];
                */
                // tdvalue 와 rvalue가 메모리 공유하는 문제로 분리
                for (m = 0; m < robs[k]; m++) {
                    tdvalue[numVar + j][m] = rvalue[k][m];
                    tdvalueLabel[numVar + j][m] = rvalueLabel[k][m];
                }
                tdvar[numVar + j] = datasheet.getDataAtCol(j + selected[0][1]);
            }
            numVar += numOfSelectedColumns;
            var str = "";
            for (i = 0; i < numVar; i++) {
                str += " " + tdvarNumber[i].toString() + ",";
            }
            d3.select("#selectedVars").node().value = str;
            buttonColorChange(); // svg 크기, 모든 버튼 체크 초기화
        } 
	if (checkScatterMatrix == false && coords.col == -1) { // 행번호 클릭		
	    k = coords.row;			
	    d3.selectAll(".highlight_datapoint")
	      .attr("class", "datapoint")
	      .attr("r", wdata[k])
	      .style("stroke", "black")
	      .style("stroke-width", 1) 					  
	    selected_point = $("[data-sheetrowid=" + k + "]")[0];
	    d3.select(selected_point)
	      .attr("class", "datapoint highlight_datapoint")
	      .attr("r", wdata[k] + 5)
	      .style("stroke", "orange")
	      .style("stroke-width", 5) 			 
        }					
    });
}
// 데이터시트 이벤트 초기화 함수 끝 --------------------------------------------
// automatically set alignment and colWidth
// according to the data types (string, numeric)
//
function updateCellMeta() {
    var colCharMax = [];
    var m, strRead;
    for (j = 0; j < datasheet.countCols(); j++) {
        colCharMax[j] = 0;
        rvarDeci[j] = 0;
        for (i = 0; i < datasheet.countRows(); i++) {
            strRead = datasheet.getDataAtCell(i, j);
            if (strRead == null) continue;
            // count # of char, 영어 1, 한글 2
            k = 0;
            for (m = 0; m < strRead.length; m++) {
                if (is_hangul_char(strRead[m])) k = k + 2;
                else k++;
            }
            if (k > colCharMax[j]) colCharMax[j] = k;
            // 문자 왼쪽정렬, 숫자 오른쪽정렬
            if (isNaN(datasheet.getDataAtCell(i, j))) {
                datasheet.setCellMeta(i, j, "className", "htLeft");
            } else {
                datasheet.setCellMeta(i, j, "className", "htRight");
            }
            // 소수점이하 자리수 체크
            m = strRead.indexOf(".");
            if (m > -1) {
                k = strRead.length - (m + 1);
                if (k > rvarDeci[j]) rvarDeci[j] = k;
            }
        } // endof i
        if (colCharMax[j] < 6) colWidth[j] = 55;
        else colWidth[j] = 5 + colCharMax[j] * 8;
    } // endof j
    datasheet.getSettings().colWidths = colWidth;
    datasheet.render();
}
// update global data variables:
// rvar, rvarName, robs, numRow, numCol, rvalue
//
function updateGlobalDataVariables() {
    // 새 파일 값으로 변량 입력 : To be finished with system file
    for (j = 0; j < colMax; j++) {
        rvar[j] = datasheet.getDataAtCol(j);
        rvarName[j] = datasheet.getColHeader(j);
        robs[j] = 0;
        for (i = 0; i < rowMax; i++) {
            if (rvar[j][i] == null || rvar[j][i] == "") {} else robs[j]++;
        }
    }
    // 각 변량별 변량값 계산  To be finished with system file
    numRow = robs[0];
    numCol = 0;
    for (j = 0; j < colMax; j++) {
        if (robs[j] != 0) {
            numCol++;
            for (i = 0; i < robs[j]; i++) dataA[i] = rvar[j][i];
            rvalueNum[j] = sortAscend(robs[j], dataA, dataValue, dvalueFreq);
            for (k = 0; k < rvalueNum[j]; k++) {
                rvalue[j][k] = dataValue[k];
                rvalueLabel[j][k] = null; // 시스템 파일 읽으면 정정 요
            }
        }
    }
}
/*
 * open an example
 *
*/
d3.select("#icon_openExample").on("click", function() {
    $("#exampleFileListing").dialog("open");
});
$(document).ready(function() {
    $("#exampleFileListing").fileTree({
        root: '../Example/'
    }, function(file) {
        document.getElementById("loadFileName").value = file.split('/').pop();
        d3.csv(file, function(csvdata) {
            data = csvdata.map(Object.values);
            updateDatasheetWithArrayOfRows(data, csvdata.columns);
        });
        $("#exampleFileListing").dialog("close");
    });
});
/*
 *  read data from URL
 *
 */
$("#button_readFromURL").click(function() {
    $("#dialog_readFromURL").dialog("open");
});
$("#button_readFromURLSubmit").click(function() {
    $("#dialog_readFromURL").dialog("close");
    var url = $("#text_readFromURL").val();
    $("#text_readFromURL").val("");
    document.getElementById("loadFileName").value = url.split('/').pop();
    d3.csv(url, function(csvdata) {
        data = csvdata.map(Object.values);
        updateDatasheetWithArrayOfRows(data, csvdata.columns);
    });
});
/*
 * import a CSV file
 *
 *
 */
$("#icon_importCSV").click(function() {
    $("#input_importCSV").click();
});
$("#input_importCSV").change(importCSV);
function importCSV(evt) {
    var fr = new FileReader();
    str = evt.target.files[0].name;
    document.getElementById("loadFileName").value = str;
    fr.onload = function(e) {
        csvdata = d3.csvParse(fr.result); // parse csv into [{}, {}, .., {}]
        data = csvdata.map(Object.values); // convert it to [[], [], ..., []]
        updateDatasheetWithArrayOfRows(data, csvdata.columns);
    }
    fr.readAsText(evt.target.files[0]);
    $("#input_importCSV").val("");
}
function updateDatasheetWithArrayOfRows(data, colHeaders) {
    datasheet.destroy();
    datasheet = new Handsontable(container, {
        data: data,
        minRows: rowMax, // 파일 읽을때는 데이터 개수만큼만 되어야
        minCols: colMax,
        minSpareRows: 0,
        colWidths: colWidth,
        colHeaders: colHeaders.concat(defaultColHeaders.slice(colHeaders.length)),
        rowHeaders: true,
        rowHeaderWidth: 30,
        contextMenu: true,
        outsideClickDeselects: false,
        multiSelect: true,
        fragmentSelection: false,
    });
    // initialize
    updateCellMeta();
    variableSelectClear();
    buttonColorChange(); // svg 크기, 모든 버튼 체크 초기화
    graphTitle(); // set default graph title
    initEventControl(datasheet);
    updateGlobalDataVariables();
/*
    // 그룹변수 선택리스트
    groupSelect = document.getElementById("groupSelect");
    groupSelect.innerHTML = '<option value="0" selected> --- </option>'
    for (i=0; i<numCol; i++) {
        var option = document.createElement("option");
        option.text  = "V"+(i+1).toString()+": "+rvarName[i];
        option.value = i+1;
        groupSelect.options.add(option);
    }
    // 크기변수 선택리스트
    sizeSelect = document.getElementById("sizeSelect");
    sizeSelect.innerHTML = '<option value="0" selected> --- </option>'	
    for (i=0; i<numCol; i++) {
        option = document.createElement("option");
        option.text  = "V"+(i+1).toString()+": "+rvarName[i];
        option.value = i+1;
        sizeSelect.options.add(option);
    }
*/
}
/*
 * open a data file (JSON)
 *
 *
*/
$("#icon_openFile").click(function() {
    $("#input_openFile").click();
})
$("#input_openFile").change(openFile);
function openFile(evt) {
    var fr = new FileReader();
    str = evt.target.files[0].name;
    document.getElementById("loadFileName").value = str;
    fr.onload = function(e) {
        var dataobj = JSON.parse(fr.result);
        updateDatasheetWith(dataobj);
    }
    fr.readAsText(evt.target.files[0]);
    $("#input_openFile").val("");
}
function updateDatasheetWith(dataobj) {
    datasheet.destroy();
    datasheet = new Handsontable(container, {
        data: dataobj.data,
        minRows: rowMax,
        minCols: colMax,
        minSpareRows: 1,
        colWidths: colWidth,
        colHeaders: dataobj.colHeaders.concat(defaultColHeaders.slice(dataobj.colHeaders.length)),
        rowHeaders: true,
        rowHeaderWidth: 30,
        contextMenu: true,
        outsideClickDeselects: false,
        multiSelect: true,
        fragmentSelection: false,
    });
    // initialize
    updateCellMeta();
    variableSelectClear();
    buttonColorChange(); // svg 크기, 모든 버튼 체크 초기화
    graphTitle(); // set default graph title
    initEventControl(datasheet);
    // 새 파일 값으로 변량 입력 : To be finished with system file
    for (j = 0; j < colMax; j++) {
        rvar[j] = datasheet.getDataAtCol(j);
    }
    // 기타 시스템 변수 불러오기
    rvarName = dataobj.rvarName;
    robs = dataobj.robs;
    rvalueNum = dataobj.rvalueNum;
    rvalue = dataobj.rvalue;
    rvalueLabel = dataobj.rvalueLabel;
    numCol = dataobj.numCol;
    numRow = dataobj.numRow;
}
// crop a sheet data with empty cells to a complete rectangular data
function cropData(data) {
    var newdata = [];
    data.forEach(function(row) {
        var i = row.findIndex(function(x) {
            return x == null || x == '';
        });
        if (i > 0) {
            newdata.push(row.slice(0, i));
        } else if (i == -1) {
            newdata.push(row);
        }
    });
    return newdata;
} 
// export datasheet to csv ------------------------------------------
d3.select("#exportCSV").on("click", function() {
    checkDataSave();
    if (checkSave == false) return;
    var croppedData = cropData(datasheet.getData());
    var csvhead = datasheet
        .getColHeader()
        .slice(0, croppedData[0].length)
        .map(function(s) {
            return "\"" + s + "\"";
        });
    var csvbody = croppedData.reduce(function(a, b) {
        return a + "\n" + b;
    });
    var text = csvhead + "\n" + csvbody;
    var filename = $("#loadFileName").val().replace(/\.json$/, ".csv");
    $("#loadFileName").val(filename);
    var blob = new Blob([text], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, filename);
}) 
//----------------------------------------------------------------
// save file ---------------------------------------------------------
d3.select("#save").on("click", function() {
    checkDataSave();
    if (checkSave == false) return;
    var croppedData = cropData(datasheet.getData());
    var croppedColHeader = datasheet.getColHeader()
        .slice(0, data[0].length);
    // rvar, rvarName, robs, rvalueNum, rvalue, rvalueLabel
    var dataobj = {
        data: croppedData,
        colHeaders: croppedColHeader,
        rvarName: rvarName,
        robs: robs,
        rvalueNum: rvalueNum,
        rvalue: rvalue,
        rvalueLabel: rvalueLabel,
        numCol: numCol,
        numRow: numRow,
    }
    var jsonstr = JSON.stringify(dataobj);
    var filename = $("#loadFileName").val().replace(/\.csv$/, ".json");
    $("#loadFileName").val(filename);
    var blob = new Blob([jsonstr], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, filename);
}) 
// ------------------------------------------------------------------
// Data Save 가능여부 체크
function checkDataSave() {
    checkSave = true;
    for (j = 0; j < numCol; j++) {
        for (i = 0; i < numRow; i++) {
            if (rvar[j][i] == null || rvar[0][i] == "") {
                alert(alertMsg[21][0]);
                checkSave = false;
                return;
            }
        }
    }
} 
// From https://milooy.wordpress.com/2017/03/28/javascript-print-page/
// sheet Print
d3.select("#printSheet").on("click", function() {
    const html = document.querySelector('html');
    //	const printContents = document.querySelector('#datasheet').innerHTML;
    const printContents = dataTable().innerHTML;
    const printDiv = document.createElement('table');
    printDiv.className = 'print-div';
    html.appendChild(printDiv);
    printDiv.innerHTML = printContents;
    document.body.style.display = 'none';
    window.print();
    document.body.style.display = 'block';
    printDiv.style.display = 'none';
});
// svg Graph Save
d3.select("#saveGraph").on("click", function() {
    var svg = d3.select("#SVG");
    var width = svgWidth;
    var height = svgHeight;
    var svgString = getSVGString(svg.node());
    svgString2Image(svgString, width, height, 'png', save);
    function save(dataBlob, filesize) {
        saveAs(dataBlob, 'eStatGraph.png');
    }
});
// svg Graph Print
d3.select("#printGraph").on("click", function() {
    const html = document.querySelector('html');
    const printContents = document.querySelector('#graph-main-container').innerHTML;
    const printDiv = document.createElement('DIV');
    printDiv.className = 'print-div';
    html.appendChild(printDiv);
    printDiv.innerHTML = printContents;
    document.body.style.display = 'none';
    window.print();
    document.body.style.display = 'block';
    printDiv.style.display = 'none';
});
// svg Graph Move
d3.select("#moveGraph").on("click", function() {
    var svg = d3.select("#SVG");
    var width = svgWidth;
    var height = svgHeight;
    var txt = "<br><p>";
    var svgString = getSVGString(svg.node());
    $("#loc").append(svgString);
    $("#loc").append(txt, txt);
//    screenTablePixelHeight = svgHeight + 100;
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
    // var imgsrc = 'data:image/svg+xml;utf8,'+svgString;
    //	  $("#screenTable").append(svgString);
    //	$("<img>").attr("src", imgsrc)
    //			     .attr("width", width)
    //			     .attr("height", height));
});
// save Table
d3.select("#saveTable").on("click", function() {
    head = '<html><head><meta charset="UTF-8"></head><body>';
    tail = '</body></html>';
    saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatLog.html");
});
// print Table
d3.select("#printTable").on("click", function() {
    const html = document.querySelector('html');
    const printContents = document.querySelector('#screenTable').innerHTML;
    const printDiv = document.createElement('DIV');
    printDiv.className = 'print-div';
    html.appendChild(printDiv);
    printDiv.innerHTML = printContents;
    document.body.style.display = 'none';
    window.print();
    document.body.style.display = 'block';
    printDiv.style.display = 'none';
});
// =================================================================
// 버튼, 라디오버튼, 체크박스 클릭
// =================================================================
// 학습수준 버튼
var rad1 = document.myForm1.type1;
rad1[0].onclick = function() { // 초등
    localStorage.removeItem("level");
    levelNum = document.myForm1.type1.value;
    localStorage.setItem("level", levelNum);
    document.getElementById("tool-group-graph-numeric").style.display = "none"; // 연속형 그래프 감추기
    document.getElementById("bothstem2").style.display = "none"; // 양쪽형 줄기잎 감추기
    document.getElementById("statTable").style.display = "none"; // 기초통계량 감추기
    document.getElementById("tool-group-testing").style.display = "none"; // 가설검정 감추기
    document.getElementById("estatH").style.display = "none"; // 고등 모듈 감추기
    document.getElementById("estatU").style.display = "none"; // 대학 모듈 감추기
    document.getElementById("estatE").style.display = "block"; // 예제 보이기
    document.getElementById("estat").style.display = "block"; // 예제학습 보이기
}
rad1[1].onclick = function() { // 중등
    localStorage.removeItem("level");
    levelNum = document.myForm1.type1.value;
    localStorage.setItem("level", levelNum);
    document.getElementById("tool-group-graph-numeric").style.display = "inline-block"; // 연속형 그래프
    document.getElementById("bothstem2").style.display = "block"; // 양쪽형 줄기
    document.getElementById("statTable").style.display = "block"; // 기초통계량
    document.getElementById("tool-group-testing").style.display = "none"; // 가설검정 감추기
    document.getElementById("estatH").style.display = "none"; // 고등 모듈 감추기
    document.getElementById("estatU").style.display = "none"; // 대학 모듈 감추기
    document.getElementById("estatE").style.display = "block"; // 예제 보이기
    document.getElementById("estat").style.display = "block"; // 예제학습 보이기
}
rad1[2].onclick = function() { // 고등
    localStorage.removeItem("level");
    levelNum = document.myForm1.type1.value;
    localStorage.setItem("level", levelNum);
    document.getElementById("tool-group-graph-numeric").style.display = "inline-block"; // 연속형 그래프
    document.getElementById("bothstem2").style.display = "block"; // 양쪽형 줄기
    document.getElementById("statTable").style.display = "block"; // 기초통계량
    document.getElementById("tool-group-testing").style.display = "none"; // 가설검정 감추기
    document.getElementById("estatH").style.display = "block"; // 고등 모듈 보이기
    document.getElementById("estatU").style.display = "none"; // 대학 모듈 감추기
    document.getElementById("estatE").style.display = "block"; // 예제 보이기
    document.getElementById("estat").style.display = "block"; // 예제학습 보이기
}
rad1[3].onclick = function() { // 대학
    localStorage.removeItem("level");
    levelNum = document.myForm1.type1.value;
    localStorage.setItem("level", levelNum);
    document.getElementById("tool-group-graph-numeric").style.display = "inline-block"; // 연속형 그래프
    document.getElementById("bothstem2").style.display = "block"; // 양쪽형 줄기
    document.getElementById("statTable").style.display = "block"; // 기초통계량
    document.getElementById("tool-group-testing").style.display = "inline-block"; // 가설검정
    document.getElementById("estatH").style.display = "block"; // 고등 모듈 보이기
    document.getElementById("estatU").style.display = "block"; // 대학 모듈
    document.getElementById("estatE").style.display = "block"; // 예제 보이기
    document.getElementById("estat").style.display = "block"; // 예제학습 보이기
}
// 분리형 막대그래프 : 주메뉴
d3.select("#separate1").on("click", function() {
    graphNum = 1;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[22][langNum]);
        return;
    };
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    SeparateBar = true;
    VerticalBar = true;
    HorizontalBar = false;
    document.getElementById("separate1").style.backgroundColor = buttonColorH;
    chart.selectAll("*").remove();
    if (ngroup == 1) currentDataSet = dataSet[0];
    currentLabel = dvalueLabel;
    drawSeparateBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel,
        freqMax, currentLabel, currentDataSet, dataSet, checkFreq);
    document.getElementById("sub1").style.display = "block"; //분리형 막대 도수표시
    if (ngroup == 1) {
        document.getElementById("sub2").style.display = "block"; //분리형 막대 정렬 표시
        document.myForm2.type2.value = 1;
    }
})
// 분리형 수직 막대그래프 : 부메뉴
d3.select("#separate2V").on("click", function() {
    graphNum = 1;
    dataClassify();
    if (freqMin < 0 && SeparateBar) {
        alert(alertMsg[22][langNum]);
        return;
    };
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    SeparateBar = true;
    VerticalBar = true;
    HorizontalBar = false;
    document.getElementById("separate2V").style.backgroundColor = buttonColorH;
    chart.selectAll("*").remove();
    if (ngroup == 1) currentDataSet = dataSet[0];
    currentLabel = dvalueLabel;
    drawSeparateBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel,
        freqMax, currentLabel, currentDataSet, dataSet, checkFreq);
    document.getElementById("sub1").style.display = "block"; //분리형 막대 도수표시
    if (ngroup == 1) {
        document.getElementById("sub2").style.display = "block"; //분리형 막대 정렬 표시
        document.myForm2.type2.value = 1;
    }
})
// 분리형 수평 막대그래프 : 부메뉴
d3.select("#separate2H").on("click", function() {
    graphNum = 6;
    dataClassify();
    if (freqMin < 0 && HorizontalBar) {
        alert(alertMsg[23][langNum]);
        return;
    };
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    SeparateBar = true;
    VerticalBar = false;
    HorizontalBar = true;
    document.getElementById("separate2H").style.backgroundColor = buttonColorH;
    chart.selectAll("*").remove();
    if (ngroup == 1) currentDataSet = dataSet[0];
    currentLabel = dvalueLabel;
    drawSeparateBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel,
        freqMax, currentLabel, currentDataSet, dataSet, checkFreq);
    if (ngroup == 1) {
        document.getElementById("sub2").style.display = "block"; //분리형 막대 정렬 표시
        document.myForm2.type2.value = 1;
    }
})
// 막대그래프 도수표시 버튼 클릭
d3.select("#freq").on("click", function() {
    if (SeparateBar) {
        if (this.checked) {
            checkFreq = true;
            drawSeparateBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel,
                freqMax, currentLabel, currentDataSet, dataSet, checkFreq);
        } else {
            checkFreq = false;
            removeFreq();
        }
    }
})
// 그룹이 없을 경우 막대그래프 내림차순, 올림차순 버튼
var rad2 = document.myForm2.type2;
rad2[0].onclick = function() { // 원자료
    if (SeparateBar && ngroup == 1) {
        chart.selectAll("*").remove();
        currentDataSet = dataR;
        currentLabel = vlabelR;
        drawSeparateBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel,
            freqMax, currentLabel, currentDataSet, dataSet, checkFreq);
    }
}
rad2[1].onclick = function() { // 내림차순
    if (SeparateBar && ngroup == 1) {
        chart.selectAll("*").remove();
        currentDataSet = dataD;
        currentLabel = vlabelD;
        drawSeparateBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel,
            freqMax, currentLabel, currentDataSet, dataSet, checkFreq);
    }
}
rad2[2].onclick = function() { // 올림차순
    if (SeparateBar && ngroup == 1) {
        chart.selectAll("*").remove();
        currentDataSet = dataA;
        currentLabel = vlabelA;
        drawSeparateBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel,
            freqMax, currentLabel, currentDataSet, dataSet, checkFreq);
    }
}
// 쌓는형 수직 막대 버튼 클릭
d3.select("#stack2V").on("click", function() {
    graphNum = 2;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[24][langNum]);
        return;
    };
    if (ngroup == 1) {
        alert(alertMsg[25][langNum]);
        return;
    };
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    StackBar = true
    VerticalBar = true;
    HorizontalBar = false;
    document.getElementById("stack2V").style.backgroundColor = buttonColorH;
    chart.selectAll("*").remove();
    drawStackBar(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
})
// 쌓는형 수평 막대 버튼 클릭
d3.select("#stack2H").on("click", function() {
    graphNum = 7;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[24][langNum]);
        return;
    };
    if (ngroup == 1) {
        alert(alertMsg[25][langNum]);
        return;
    };
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    StackBar = true;
    VerticalBar = false;
    HorizontalBar = true;
    document.getElementById("stack2H").style.backgroundColor = buttonColorH;
    chart.selectAll("*").remove();
    drawStackBar(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
})
// 비율형 수직 막대 버튼 클릭
d3.select("#ratio2V").on("click", function() {
    graphNum = 3;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[26][langNum]);
        return;
    };
    if (ngroup == 1) {
        alert(alertMsg[27][langNum]);
        return;
    };
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    RatioBar = true;
    VerticalBar = true;
    HorizontalBar = false;
    document.getElementById("ratio2V").style.backgroundColor = buttonColorH;
    chart.selectAll("*").remove();
    drawRatioBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
})
// 비율형 수평 막대 버튼 클릭
d3.select("#ratio2H").on("click", function() {
    graphNum = 8;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[26][langNum]);
        return;
    };
    if (ngroup == 1) {
        alert(alertMsg[27][langNum]);
        return;
    };
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    RatioBar = true;
    VerticalBar = false;
    HorizontalBar = true;
    document.getElementById("ratio2H").style.backgroundColor = buttonColorH;
    chart.selectAll("*").remove();
    drawRatioBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
})
// 나란형 수직 막대그래프
d3.select("#side2V").on("click", function() {
    graphNum = 4;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[28][langNum]);
        return;
    };
    if (ngroup == 1) {
        alert(alertMsg[29][langNum]);
        return;
    };
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    SideBar = true;
    VerticalBar = true;
    HorizontalBar = false;
    document.getElementById("side2V").style.backgroundColor = buttonColorH;
    chart.selectAll("*").remove();
    drawSideBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
})
// 나란형 수평 막대그래프
d3.select("#side2H").on("click", function() {
    graphNum = 9;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[28][langNum]);
        return;
    };
    if (ngroup == 1) {
        alert(alertMsg[29][langNum]);
        return;
    };
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    SideBar = true;
    VerticalBar = false;
    HorizontalBar = true;
    document.getElementById("side2H").style.backgroundColor = buttonColorH;
    chart.selectAll("*").remove();
    drawSideBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
})
// 양쪽형 수직 막대 버튼 클릭
d3.select("#bothbar2V").on("click", function() {
    graphNum = 5;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[30][langNum]);
        return;
    };
    if (ngroup == 1) {
        alert(alertMsg[31][langNum]);
        return;
    };
    if (ngroup == 2) {
        if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
        buttonColorChange();
        BothBar = true;
        VerticalBar = true;
        HorizontalBar = false;
        document.getElementById("bothbar2V").style.backgroundColor = buttonColorH;
        chart.selectAll("*").remove();
        drawBothBar(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
    }
})
// 양쪽형 수평 막대 버튼 클릭
d3.select("#bothbar2H").on("click", function() {
    graphNum = 10;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[30][langNum]);
        return;
    };
    if (ngroup == 1) {
        alert(alertMsg[31][langNum]);
        return;
    };
    if (ngroup == 2) {
        if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
        buttonColorChange();
        BothBar = true;
        VerticalBar = false;
        HorizontalBar = true;
        document.getElementById("bothbar2H").style.backgroundColor = buttonColorH;
        chart.selectAll("*").remove();
        drawBothBar(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
    }
})
// 원그래프 버튼 클릭 : 주메뉴
d3.select("#pie1").on("click", function() {
    graphNum = 11;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[32][langNum]);
        return;
    };
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    PieChart = true;
    document.getElementById("pie1").style.backgroundColor = buttonColorH;
    chart.selectAll("*").remove();
    drawPieChart(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
})
// 도넛그래프 버튼 클릭
d3.select("#donut2").on("click", function() {
    graphNum = 12;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[33][langNum]);
        return;
    };
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    document.getElementById("mean").checked = false;
    buttonColorChange();
    DonutGraph = true;
    document.getElementById("donut2").style.backgroundColor = buttonColorH;
    chart.selectAll("*").remove();
    drawPieChart(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
})
// 띠그래프 버튼 클릭 : 주메뉴
d3.select("#band1").on("click", function() {
    graphNum = 13;
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[34][langNum]);
        return;
    };
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    document.getElementById("mean").checked = false;
    buttonColorChange();
    BandGraph = true;
    document.getElementById("band1").style.backgroundColor = buttonColorH;
    chart.selectAll("*").remove();
    drawBandGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
    document.getElementById("sub3").style.display = "block"; //띠그래프 도수표시
})
// 띠그래프 도수표시 버튼 클릭
d3.select("#mean").on("click", function() {
    if (!BandGraph) return;
    if (this.checked) {
        if (BandGraph) {
            checkBandFreq = true;
            chart.selectAll("*").remove();
            drawBandGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet);
        }
    } else {
        checkBandFreq = false;
        removeBandFreq();
    }
})
// 꺽은선그래프 클릭 : 주메뉴
d3.select("#line1").on("click", function() {
    graphNum = 14;
    dataClassify();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    LineGraph = true;
    document.getElementById("line1").style.backgroundColor = buttonColorH;
    chart.selectAll("*").remove();
    currentLabel = dvalueLabel;
    drawLineGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMin, freqMax, currentLabel, currentDataSet, dataSet);
    if (ngroup == 1) {
        document.getElementById("sub4").style.display = "block"; //꺽은선그래프 정렬 표시
        document.myForm3.type3.value = 1;
    }
})
// 그룹이 없을 경우 꺽은선그래프 내림차순, 올림차순 버튼
var rad3 = document.myForm3.type3;
rad3[0].onclick = function() { // 원자료
    if (LineGraph && ngroup == 1) {
        chart.selectAll("*").remove();
        currentDataSet = dataR;
        currentLabel = vlabelR;
        drawLineGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMin, freqMax, currentLabel, currentDataSet, dataSet);
    }
}
rad3[1].onclick = function() { // 내림차순
    if (LineGraph && ngroup == 1) {
        chart.selectAll("*").remove();
        currentDataSet = dataD;
        currentLabel = vlabelD;
        drawLineGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMin, freqMax, currentLabel, currentDataSet, dataSet);
    }
}
rad3[2].onclick = function() { // 올림차순
    if (LineGraph && ngroup == 1) {
        chart.selectAll("*").remove();
        currentDataSet = dataA;
        currentLabel = vlabelA;
        drawLineGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMin, freqMax, currentLabel, currentDataSet, dataSet);
    }
} 
// 도수분포표 버튼 클릭
d3.select("#freqTable").on("click", function() {
    dataClassify();
    if (freqMin < 0) {
        alert(alertMsg[35][langNum]);
        return;
    };
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    document.getElementById("mean").checked = false;
    buttonColorChange();
    FreqTable = true;
    document.getElementById("freqTable").style.backgroundColor = buttonColorH;
    ngvalue = ngroup;
    freqTable(numVar, tdvarNumber, ndvalue, dvarName, dataValue, dvalueLabel, ngroup, gvarName, gvalueLabel);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// ==========================================================================================
// 연속형 변량 그래프 ========================================================================
//===========================================================================================
// 그룹 점그래프 : 주메뉴
d3.select("#dot1").on("click", function() {
    graphNum = 15;
    dataClassifyM();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    DotGraph = true;
    document.getElementById("dot1").style.backgroundColor = buttonColorH;
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, std);
    chart.selectAll("*").remove();
    drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName);
    document.getElementById("sub5").style.display = "block"; //점그래프 평균, 표준편차표시
})
// 점그래프 평균 표준편차표시
d3.select("#DotMean").on("click", function() {
    if (DotGraph) {
        if (this.checked) {
            checkDotMean = true;
            showDotMean(ngroup, nobs, avg, std, tstat);
        } else {
            checkDotMean = false;
            removeDotMean();
        }
    }
})
/*
// 점그래프 95%신뢰구간표시
d3.select("#DotStd").on("click", function() {
    if (DotGraph) {
        if (this.checked) {
            checkDotStd = true;
            gxmin = tstat[11];
            gxmax = tstat[12];
            showDotStd(ngroup, nobs, avg, std, gxmin, gxmax, tstat[13], tstat[14]);
        } else {
            checkDotStd = false;
            removeDotStd();
        }
    }
})
*/

// 히스토그램 주메뉴 -----------------------------------------------------------------------------------------
d3.select("#hist1").on("click", function() {
    graphNum = 19;
    dataClassifyM();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    Histogram = true;
    document.getElementById("hist1").style.backgroundColor = buttonColorH;
    chart.selectAll("*").remove();
//    enableHist();
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, std);
    nint = 7;
    xstep = (tstat[7] - tstat[3]) / nint; // (전체 최대 - 최소) / 인터발수	: 양쪽 그래프 buffer
    gxminH = tstat[3] - xstep;
    var para = drawHistGraph(ngroup, gxminH, xstep, dataSet, freq, gvalueLabel, dvalueLabel, dvarName);
    gxmaxH = para.a;
    gyminH = para.b;
    gymaxH = para.c;
    document.getElementById("sub7").style.display = "block"; //히스토그램 선택사항 표시
})
// 히스토그램 평균표시
d3.select("#HistMean").on("click", function() {
    if (Histogram == false) return;
    if (this.checked) {
        checkHistMean = true;
        showHistMean(ngroup, avg, gxminH, gxmaxH);
    } else {
        checkHistMean = false;
        removeHistMean();
    }
})
// 히스토그램 도수표시
d3.select("#HistFreq").on("click", function() {
    if (Histogram == false) return;
    if (this.checked) {
        checkHistFreq = true;
        showHistFreq(ngroup, nvalueH, xstep, freq, dataValueH, gxminH, gxmaxH, gyminH, gymaxH);
    } else {
        checkHistFreq = false;
        removeHistFreq();
    }
})
// 히스토그램 꺽은선그래프 표시
d3.select("#HistLine").on("click", function() {
    if (Histogram == false) return;
    if (this.checked) {
        checkHistLine = true;
        showHistLine(ngroup, nvalueH, xstep, freq, dataValueH, gxminH, gxmaxH, gyminH, gymaxH);
    } else {
        checkHistLine = false;
        removeHistLine()
    }
})
// 히스토그램 도수분포표 표시
d3.select("#HistTable").on("click", function() {;
    if (Histogram == false) return;
    showHistTable(ngroup, nvalueH, freq, dataValueH, dvarName, gvarName, gvalueLabel)
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 새 구간으로 히스토그램 업데이트
d3.select("#HistRedraw").on("click", function() {
    if (Histogram == false) return;
    chart.selectAll("*").remove(); // 전화면 제거
    var start = parseFloat(d3.select("#HistInit").node().value); // 시작값
    xstep = parseFloat(d3.select("#HistStep").node().value); // 구간너비
    if (start > tstat[3]) start = tstat[3];
    if (xstep <= 0) xstep = (tstat[7] - tstat[3]) / nint;
    gxminH = start - xstep;
    var para = drawHistGraph(ngroup, gxminH, xstep, dataSet, freq, gvalueLabel, dvalueLabel, dvarName);
    gxmaxH = para.a;
    gyminH = para.b;
    gymaxH = para.c;
    if (checkHistMean) showHistMean(ngroup, avg, gxminH, gxmaxH); // 평균 표시
    if (checkHistFreq) showHistFreq(ngroup, nvalueH, xstep, freq, dataValueH, gxminH, gxmaxH, gyminH, gymaxH); // 도수 표시
    if (checkHistLine) showHistLine(ngroup, nvalueH, xstep, freq, dataValueH, gxminH, gxmaxH, gyminH, gymaxH); // 꺽은선 표시
})
// 상자그래프 : 주메뉴 -----------------------------------------------------------------------------------------
d3.select("#box1").on("click", function() {
    graphNum = 16;
    dataClassifyM();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    BoxGraph = true;
    document.getElementById("box1").style.backgroundColor = buttonColorH;
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, std);
    chart.selectAll("*").remove();
    //	  chart.append("text").attr("class","title").attr("x",margin.left).attr("y",margin.top/2).text(title);
    drawBoxGraph(ngroup, gvalueLabel, mini, Q1, median, Q3, maxi, graphWidth, oneHeight, tstat);
})
// 줄기잎그래프 : 주메뉴 -----------------------------------------------------------------------------------------
d3.select("#stem1").on("click", function() {
    graphNum = 17;
    dataClassifyM();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    StemLeaf = true;
    document.getElementById("stem1").style.backgroundColor = buttonColorH;
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, std);
    chart.selectAll("*").remove();
    drawStemLeaf(ngroup, nobs, dataSet, tstat, graphWidth, buffer);
})
// 양쪽형 줄기와 잎 그림 버튼 클릭
d3.select("#bothstem2").on("click", function() {
    graphNum = 18;
    dataClassifyM();
    if (ngroup != 2) {
        alert(alertMsg[36][langNum]);
        return;
    }
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    StemBoth = true;
    document.getElementById("bothstem2").style.backgroundColor = buttonColorH;
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, std);
    chart.selectAll("*").remove();
    drawStemLeafBoth(ngroup, nobs, dataSet, tstat, graphWidth, buffer);
})
// 기초통계량 버튼 클릭 -------------------------------------------------------------------------------
d3.select("#statTable").on("click", function() {
    dataClassifyM();
    if (rawData == false) return;
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    StatTable = true;
    document.getElementById("statTable").style.backgroundColor = buttonColorH;
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, std);
    statTable(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg, std, mini, Q1, median, Q3, maxi, tstat);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 산점도 버튼 클릭 -------------------------------------------------------------------------------
d3.select("#scatter1").on("click", function() {
    graphNum = 20;
    gvarNumber = -1;
    wvarNumber = -1;
    dataClassifyS();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    document.getElementById("regress").checked = false;
    document.getElementById("regress").disabled = false;
    document.getElementById("scatter1").style.backgroundColor = buttonColorH;
    tobs = xobs;
    SortAscendBasic(tobs, gdata, dataA); // Sorting data in ascending order
    ngroup = DotValueFreq(tobs, dataA, gdataValue, gvalueFreq)
    bivarStatByGroup(ngroup,tobs,xdata,ydata,gdata,nobs,xavg,yavg,xstd,ystd,alphaR,betaR,corr,rsquare,sxx,syy,sxy,ssr,sse,stderr);
    drawScatter(ngroup, gvalueLabel, tobs, xdata, ydata, gdata, scatterS);
    document.getElementById("sub6").style.display = "block"; //회귀선 표시
    // 그룹변수 선택
    var groupSelect = document.getElementById("groupSelect");
    groupSelect.innerHTML = '<option value="0" selected> --- </option>'
    for (var i=0; i<numCol; i++) {
        var option = document.createElement("option");
        option.text  = "V"+(i+1).toString()+": "+rvarName[i];
        option.value = i+1;
        groupSelect.options.add(option);
    }
    // 크기변수 선택
    var sizeSelect = document.getElementById("sizeSelect");
    sizeSelect.innerHTML = '<option value="0" selected> --- </option>'	
    for (var i=0; i<numCol; i++) {
        var option = document.createElement("option");
        option.text  = "V"+(i+1).toString()+": "+rvarName[i];
        option.value = i+1;
        sizeSelect.options.add(option);
    }
    Scatter = true;
    if (ngroup > 10) document.getElementById("regress").disabled = true;
    // 점과 시트의 연결
    d3.selectAll(".datapoint").on("click", function() {
        k = $(this).data('sheetrowid');	
	datasheet.selectCell(k, 0, k, 0, true);
	datasheet.selectRows(k);
	d3.selectAll(".highlight_datapoint")
          .attr("class", "datapoint")
          .attr("r", wdata[k])
          .style("stroke", "black")
          .style("stroke-width", 1) ;        
	d3.select(this)
          .attr("class", "datapoint highlight_datapoint")
          .attr("r", wdata[k] + 5)
          .style("stroke", "orange")
          .style("stroke-width", 5) ;
    })
})
// 산점도 회귀선 그리기
d3.select("#regress").on("click", function() {
    if (Scatter == false) return;
    if (this.checked) {
        showRegression(ngroup, alphaR, betaR, corr, rsquare, scatterS);
    } else {
        removeRegression();
    }
})
// 산점도 Redraw
d3.select("#scatterRedraw").on("click", function() {
    gvarNumber = parseInt(document.getElementById("groupSelect").value) - 1; 
    wvarNumber = parseInt(document.getElementById("sizeSelect").value) - 1;
    dataClassifyS();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    chart.selectAll("*").remove();
    document.getElementById("regress").checked = false;
    document.getElementById("regress").disabled = false;
    tobs = xobs;
    SortAscendBasic(tobs, gdata, dataA); // Sorting data in ascending order
    ngroup = DotValueFreq(tobs, dataA, gdataValue, gvalueFreq)
    bivarStatByGroup(ngroup,tobs,xdata,ydata,gdata,nobs,xavg,yavg,xstd,ystd,alphaR,betaR,corr,rsquare,sxx,syy,sxy,ssr,sse,stderr);
    drawScatter(ngroup, gvalueLabel, tobs, xdata, ydata, gdata, scatterS);
    if (ngroup > 10) document.getElementById("regress").disabled = true;
    // 점과 시트의 연결
    d3.selectAll(".datapoint").on("click", function() {
        k = $(this).data('sheetrowid');	
	datasheet.selectCell(k, 0, k, 0, true);
	datasheet.selectRows(k);
	d3.selectAll(".highlight_datapoint")
          .attr("class", "datapoint")
          .attr("r", wdata[k])
          .style("stroke", "black")
          .style("stroke-width", 1) ;        
	d3.select(this)
          .attr("class", "datapoint highlight_datapoint")
          .attr("r", wdata[k] + 5)
          .style("stroke", "orange")
          .style("stroke-width", 5) ;
    })
})
// GIS 버튼 클릭 -------------------------------------------------------------------------------
d3.select("#gis").on("click", function() {
    graphNum = 20;
    dataClassifyGIS();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    chart.selectAll("*").remove();
    buttonColorChange();
    drawGIS(gobs,gdata,xdata,ydata,wdata)    
    // 점과 시트의 연결
 
    d3.selectAll(".datapoint").on("click", function() {
       var projection = d3.geoMercator()
        .center([126.9895, 37.5651])
        .scale(120000)
        .translate([svgWidth/2, svgHeight/2]);

	datasheet.selectRows($(this).data('sheetrowid'));
        k = $(this).data('sheetrowid');
        str = gdata[k];
        chart.append("circle")
   	     .attr("data-sheetrowid", k)
             .attr("class","datapoint")
             .attr("stroke","black")
             .style("fill",gcolor[k])     
             .attr("cx", function(d) { return projection([xdata[k], ydata[k]])[0]; })
             .attr("cy", function(d) { return projection([xdata[k], ydata[k]])[1]; })
             .attr("r", wdata[k]*2)
             .append("title")
             .text(str)
    })
})

// 모평균 가설검정
d3.select("#testM1").on("click", function() {
    if (numVar > 1) {
        alert(alertMsg[37][langNum]);
        return;
    };
    dataClassifyM();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    chart.selectAll("*").remove();
    graphNum = 21;
    THmean1 = true;
    buttonColorChange();
    document.getElementById("testM1").style.backgroundColor = buttonColorH;
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, std);
    drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName);
    showDotMean(ngroup, nobs, avg, std, tstat);
    showDotStd(ngroup, nobs, avg, std, tstat);
    document.getElementById("sub8").style.display = "block"; //가설검정 선택사항표시
})
// 모평균 가설검정 실행
d3.select("#executeTH8").on("click", function() {
    // input value mu0
    mu = parseFloat(d3.select("#mu8").node().value);
    if (isNaN(mu)) {
        alert(alertMsg[38][langNum]);
        return;
    }
    chart.selectAll("*").remove();
    document.getElementById("testM1").style.backgroundColor = buttonColorH;
    graphNum = 21;
    THmean1 = true;
    buttonColorChange();
    document.getElementById("testM1").style.backgroundColor = buttonColorH;
    document.getElementById("sub8").style.display = "block"; //가설검정 선택사항표시
    hypoType = 1;
    // 대립가설 Type
    if (document.myForm80.type0.value == "1")      h1Type = 1;
    else if (document.myForm80.type0.value == "2") h1Type = 2;
    else if (document.myForm80.type0.value == "3") h1Type = 3;
    // Test Type 1: t-test 2: Z-test
    if (document.myForm81.type1.value == "2")      {testType = 2}
    else if (document.myForm81.type1.value == "1") {testType = 1}
    // alpha
    if (document.myForm82.type2.value == "1") alpha = 0.05;
    else alpha = 0.01;
    // Test Statistics Calculation
    nn = tstat[0];
    df = nn - 1;
    xbar = tstat[1];
    stdev = tstat[2];
    if (testType == 1) {
        stdev = parseFloat(d3.select("#std8").node().value);
        if (stdev == 0. || isNaN(stdev)) {
            alert(alertMsg[39][langNum]);
            return;
        }
    }
    // confidence interval
    if (testType == 1) temp = stdnormal_inv(1 - alpha / 2, info) * stdev / Math.sqrt(nn);
    else temp = t_inv(1 - alpha / 2, df, info) * stdev / Math.sqrt(nn);
    left = xbar - temp;
    right = xbar + temp;
    // test statistics
    teststat = (xbar - mu) / (stdev / Math.sqrt(nn));
    statT[0] = mu; // 초기 mu
    statT[1] = stdev; // Z test 경우 sigma
    statT[2] = alpha;
    statT[3] = nn;
    statT[4] = xbar;
    statT[5] = tstat[2];
    statT[6] = left;
    statT[7] = right;
    chart.selectAll("*").remove();
    if (isNaN(mu) || isNaN(nn) || isNaN(xbar) || isNaN(stdev) || nn < 2 || stdev <= 0) { // wrong input
        chart.append("text").attr("class", "mean")
            .attr("x", 150)
            .attr("y", 100)
            .text("No input or wrong input !!	 Try again.")
            .style("stroke", "red")
    } else if (testType == 1) { // Z-test
        if (h1Type == 1) {
            h = alpha / 2;
            f = stdnormal_inv(h, info);
            g = -f;
            if (teststat < 0) pvalue = 2 * stdnormal_cdf(teststat);
            else pvalue = 2 * (1 - stdnormal_cdf(teststat));
            drawNormalGraphTH(hypoType, h1Type, testType, statT, teststat, 0, 1, f, g, h, pvalue);
        } else if (h1Type == 2) {
            h = alpha;
            f = -5
            g = stdnormal_inv(1 - h, info);
            pvalue = 1 - stdnormal_cdf(teststat);
            drawNormalGraphTH(hypoType, h1Type, testType, statT, teststat, 0, 1, f, g, h, pvalue);
        } else {
            h = alpha;
            f = stdnormal_inv(h, info);
            g = 5;
            pvalue = stdnormal_cdf(teststat);
            drawNormalGraphTH(hypoType, h1Type, testType, statT, teststat, 0, 1, f, g, h, pvalue);
        }
    } else { // t-test
        if (h1Type == 1) {
            h = alpha / 2;
            f = t_inv(h, df, info);
            g = -f;
            if (teststat < 0) pvalue = 2 * t_cdf(teststat, df, info);
            else pvalue = 2 * (1 - t_cdf(teststat, df, info));
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
        } else if (h1Type == 2) {
            h = alpha;
            f = -5; //t_inv(0.0001, df, info);
            g = t_inv(1 - h, df, info);
            pvalue = 1 - t_cdf(teststat, df, info);
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
        } else {
            h = alpha;
            f = t_inv(h, df, info);
            g = 5; //t_inv(0.9999, df, info);
            pvalue = t_cdf(teststat, df, info);
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
        }
    }
})
// 평균점그래프 
d3.select("#DotMu1").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName);
    showDotMean(ngroup, nobs, avg, std, tstat);
    showDotStd(ngroup, nobs, avg, std, tstat);
})
// 평균 검정결과표 그리기
d3.select("#executeTH8Table").on("click", function() {
    statTable2(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg, std, mini, Q1, median, Q3, maxi, tstat);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 확률 히스토그램 
d3.select("#HistNormal").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawHistNormal(ngroup, nobs, avg, std, dataSet, freq, dvarName);
})
// 정규성 카이제곱검정 
d3.select("#HistChisq").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawHistNormal(ngroup, nobs, avg, std, dataSet, freq, dvarName);
    showHistNormalTable(nobs, avg, std, nvalueH, freq, dataValueH, dvarName);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 정규성 Q-Q Plot 
d3.select("#HistNormalQQ").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    for (i=0; i<nobs[0]; i++) tdata[i] = dataSet[0][i];
    drawHistQQ(nobs[0], tdata, dvarName,0)
})

// 모분산 가설검정
d3.select("#testS1").on("click", function() {
    if (numVar > 1) {
        alert(alertMsg[37][langNum]);
        return;
    };
    dataClassifyM();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    chart.selectAll("*").remove();
    graphNum = 22;
    THsigma1 = true;
    buttonColorChange();
    document.getElementById("testS1").style.backgroundColor = buttonColorH;
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, std);
    drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName);
    showDotMean(ngroup, nobs, avg, std, tstat);
    showDotStd(ngroup, nobs, avg, std, tstat);
    document.getElementById("sub9").style.display = "block"; //가설검정 선택사항표시
})

// 모분산 가설검정 실행
d3.select("#executeTH9").on("click", function() {
    // input value sigma0
    vari = parseFloat(d3.select("#vari9").node().value);
    if (isNaN(vari)) {
        alert(alertMsg[40][langNum]);
        return;
    }
    chart.selectAll("*").remove();
    document.getElementById("testM1").style.backgroundColor = buttonColorH;
    graphNum = 22;
    THsigma1 = true;
    buttonColorChange();
    document.getElementById("testS1").style.backgroundColor = buttonColorH;
    document.getElementById("sub9").style.display = "block"; //가설검정 선택사항표시
    hypoType = 2;
    // 대립가설 Type
    if (document.myForm90.type0.value == "1")      h1Type = 1;
    else if (document.myForm90.type0.value == "2") h1Type = 2;
    else if (document.myForm90.type0.value == "3") h1Type = 3;
    // alpha
    if (document.myForm92.type2.value == "1") alpha = 0.05;
    else alpha = 0.01;
    // confidence interval
    h = alpha / 2;
    nn = tstat[0];
    df = nn - 1;
    stdev = tstat[2];
    variS  = stdev * stdev
    left = df * variS / chisq_inv(1 - alpha / 2, df, info)
    right = df * variS / chisq_inv(alpha / 2, df, info)
    // test statistics
    teststat = df * variS / vari;
    statT[0] = vari; // 초기 variance
    statT[2] = alpha;
    statT[3] = tstat[0]; // nn
    statT[4] = tstat[1]; // xbar
    statT[5] = tstat[2]; // stdev
    statT[6] = left;
    statT[7] = right;
    chart.selectAll("*").remove();
    df = statT[3] - 1;
    if (isNaN(vari) || isNaN(nn) || isNaN(variS) || vari <= 0 || nn < 2 || variS <= 0) { // wrong input
        chart.append("text").attr("class", "mean").attr("x", 150).attr("y", 100)
            .text("No input or wrong input !!	 Try again.").style("stroke", "red");
        return;
    } else { // chisq-test
        if (h1Type == 1) {
            h = alpha / 2;
            f = chisq_inv(h, df, info);
            g = chisq_inv(1 - h, df, info);
            pvalue = chisq_cdf(teststat, df, info);
            if (pvalue > 0.5) pvalue = 1 - pvalue;
            pvalue = 2 * pvalue;
            drawChisqGraphTH(hypoType, h1Type, statT, teststat, df, f, g, h, pvalue);
        } else if (h1Type == 2) {
            h = alpha;
            if (df < 10) f = 0;
            else f = chisq_inv(0.0001, df, info);
            g = chisq_inv(1 - h, df, info);
            pvalue = 1 - chisq_cdf(teststat, df, info);
            drawChisqGraphTH(hypoType, h1Type, statT, teststat, df, f, g, h, pvalue);
        } else {
            h = alpha;
            f = chisq_inv(h, df, info);
            if (df < 5) g = 12;
            else if (df < 10) g = 30;
            else g = chisq_inv(0.9999, df, info);
            pvalue = chisq_cdf(teststat, df, info);
            drawChisqGraphTH(hypoType, h1Type, statT, teststat, df, f, g, h, pvalue);
        }
    }
})
// 평균점그래프 
d3.select("#DotSigma1").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName);
    showDotMean(ngroup, nobs, avg, std, tstat);
    showDotStd(ngroup, nobs, avg, std, tstat);
})
// 분산 검정결과표 그리기
d3.select("#executeTH9Table").on("click", function() {
    statTable2(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg, std, mini, Q1, median, Q3, maxi, tstat);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 확률 히스토그램 
d3.select("#HistNormalS").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawHistNormal(ngroup, nobs, avg, std, dataSet, freq, dvarName);
})
// 정규성 카이제곱검정 
d3.select("#HistChisqS").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawHistNormal(ngroup, nobs, avg, std, dataSet, freq, dvarName);
    showHistNormalTable(nobs, avg, std, nvalueH, freq, dataValueH, dvarName);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 정규성 Q-Q Plot 
d3.select("#HistNormalQQS").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    for (i=0; i<nobs[0]; i++) tdata[i] = dataSet[0][i];
    drawHistQQ(nobs[0], tdata, dvarName,0)
})

// 두 모평균 가설검정
d3.select("#testM12").on("click", function() {
    if (numVar < 2) {
        alert(alertMsg[41][langNum]);
        return;
    };
    buttonColorChange();
    dataClassifyM12();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    chart.selectAll("*").remove();
    graphNum = 23;
    THmean12 = true;
    document.getElementById("testM12").style.backgroundColor = buttonColorH;
    document.getElementById("sub10").style.display = "block"; //가설검정 선택사항표시 
    if (checkPairedT == false) {
      TotalStat(dobs, dvar, tstat);
      GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, std);
      drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName);
      gxmin = tstat[11];
      gxmax = tstat[12];
      showDotMean(ngroup, nobs, avg, std, tstat);
      showDotStd(ngroup, nobs, avg, std, tstat);
    }
    else {  // paired t-test 
      TotalStat(dobs, tdata, tstat);
      GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, std);
      str = "d = ("+tdvarName[0] + " - " + tdvarName[1]+")";
      drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, str);
      showDotMean(ngroup, nobs, avg, std, tstat);
      showDotStd(ngroup, nobs, avg, std, tstat);
    } 
})
// 가설검정 Mu 12 재실행
d3.select("#executeTH10").on("click", function() {
    graphNum = 23;

    // mu0 입력
    mu = parseFloat(d3.select("#mu10").node().value);
    // 대립가설
    if (document.myForm100.type0.value == "1")      h1Type = 1;
    else if (document.myForm100.type0.value == "2") h1Type = 2;
    else if (document.myForm100.type0.value == "3") h1Type = 3;
    // 분산 가정 1: same variance 2: diff variance
    if (document.myForm101.type1.value == "1")      {testType = 1; hypoType = 41}
    else if (document.myForm101.type1.value == "2") {testType = 2; hypoType = 42}
    // alpha
    if (document.myForm102.type2.value == "1") alpha = 0.05;
    else alpha = 0.01;

    chart.selectAll("*").remove();
  if (checkPairedT == false) { // independent T-test
    nn1 = nobs[0];
    xbar1 = avg[0];
    var1 = std[0] * std[0];
    nn2 = nobs[1];
    xbar2 = avg[1];
    var2 = std[1] * std[1];
    // test statistics
    df = nn1 + nn2 - 2;
    df1 = nn1 - 1;
    df2 = nn2 - 1;
    varPooled = (df1 * var1 + df2 * var2) / df;
    t1 = var1 / nn1;
    t2 = var2 / nn2;
    varAdd = t1 + t2;
    if (testType == 1) teststat = (xbar1 - xbar2 - mu) / Math.sqrt(varPooled / nn1 + varPooled / nn2);
    else teststat = (xbar1 - xbar2 - mu) / Math.sqrt(varAdd);
    statT[0] = mu; // 초기 D
    if (testType == 1) statT[1] = Math.sqrt(varPooled / nn1 + varPooled / nn2);
    else statT[1] = Math.sqrt(varAdd);
    statT[2] = alpha;
    statT[3] = nn1;
    statT[4] = xbar1;
    statT[5] = std[0];
    statT[6] = nn2;
    statT[7] = xbar2;
    statT[8] = std[1];
    if (isNaN(nn1) || isNaN(nn2) || isNaN(xbar1) || isNaN(xbar2) || isNaN(var1) || isNaN(var2) ||
        nn1 < 2 || nn2 < 2 || var1 <= 0 || var2 <= 0) { // wrong input
        chart.append("text").attr("class", "mean").attr("x", 150).attr("y", 100)
            .text("No input or wrong input !!	 Try again.").style("stroke", "red");
        return;
    } else { // t-test
        if (h1Type == 1) {
            h = alpha / 2;
            if (testType == 1) {
                f = t_inv(h, df, info);
                g = -f;
                if (teststat < 0) pvalue = 2 * t_cdf(teststat, df, info);
                else pvalue = 2 * (1 - t_cdf(teststat, df, info));
            } else if (testType == 2) {
                df = varAdd * varAdd / ((t1*t1/df1) + (t2*t2/df2));
                f = t_inv(h, df, info);
                g = -f;
                if (teststat < 0) pvalue = 2 * t_cdf(teststat, df, info);
                else pvalue = 2 * (1 - t_cdf(teststat, df, info));
/*
                f = (t1 * t_inv(h, df1, info) + t2 * t_inv(h, df2, info)) / varAdd;
                g = -f;
                if (teststat < 0) pvalue = 2 * (t1 * t_cdf(teststat, df1, info) + t2 * t_cdf(teststat, df2, info)) / varAdd;
                else pvalue = 2 * (1 - (t1 * t_cdf(teststat, df1, info) + t2 * t_cdf(teststat, df2, info)) / varAdd);
*/
            }
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
        } else if (h1Type == 2) {
            h = alpha;
            if (testType == 1) {
                f = t_inv(0.0001, df, info);
                g = t_inv(1 - h, df, info);
                pvalue = 1 - t_cdf(teststat, df, info);
            } else if (testType == 2) {
                df = varAdd * varAdd / ((t1*t1/df1) + (t2*t2/df2));
                f = t_inv(0.0001, df, info);
                g = t_inv(1 - h, df, info);
                pvalue = 1 - t_cdf(teststat, df, info);
/*
                f = t_inv(0.0001, df, info);
                g = (t1 * t_inv(1 - h, df1, info) + t2 * t_inv(1 - h, df2, info)) / varAdd;
                pvalue = 1 - ((t1 * t_cdf(teststat, df1, info) + t2 * t_cdf(teststat, df2, info)) / varAdd);
*/
            }
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
        } else {
            h = alpha;
            if (testType == 1) {
                f = t_inv(h, df, info);
                g = t_inv(0.9999, df, info);
                pvalue = t_cdf(teststat, df, info);
            } else if (testType == 2) {
                df = varAdd * varAdd / ((t1*t1/df1) + (t2*t2/df2));
                f = t_inv(h, df, info);
                g = t_inv(0.9999, df, info);
                pvalue = t_cdf(teststat, df, info);
/*
                f = (t1 * t_inv(h, df1, info) + t2 * t_inv(h, df2, info)) / varAdd;
                g = t_inv(0.9999, df, info);
                pvalue = (t1 * t_cdf(teststat, df1, info) + t2 * t_cdf(teststat, df2, info)) / varAdd;
*/
            }
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);        }
    }
    statT[9]  = teststat;
    statT[10] = pvalue;
  } 
  else {// Paired T-test
      hypoType = 43;
      df = dobs - 1;
      teststat = (tstat[1] - mu) / (tstat[2] / Math.sqrt(dobs));
      temp  = t_inv(1 - alpha / 2, df, info) * tstat[2] / Math.sqrt(tstat[0]);
      left  = tstat[1] - temp;
      right = tstat[1] + temp;
      statT[0] = mu; // 초기 D
      statT[2] = alpha;
      statT[3] = tstat[0];
      statT[4] = tstat[1];
      statT[5] = tstat[2];
      statT[6] = left;
      statT[7] = right;

      if (h1Type == 1) {
            h = alpha / 2;
            f = t_inv(h, df, info);
            g = -f;
            if (teststat < 0) pvalue = 2 * t_cdf(teststat, df, info);
            else pvalue = 2 * (1 - t_cdf(teststat, df, info));
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
      } else if (h1Type == 2) {
            h = alpha;
            f = -5; //t_inv(0.0001, df, info);
            g = t_inv(1 - h, df, info);
            pvalue = 1 - t_cdf(teststat, df, info);
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
      } else {
            h = alpha;
            f = t_inv(h, df, info);
            g = 5; //t_inv(0.9999, df, info);
            pvalue = t_cdf(teststat, df, info);
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
      }
    statT[9]  = teststat;
    statT[10] = pvalue;
  }

})
// 그룹별 평균점그래프 
d3.select("#DotMu12").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName);
    showDotMean(ngroup, nobs, avg, std, tstat);
    showDotStd(ngroup, nobs, avg, std, tstat);
})
// 두그룹 평균 검정결과표 그리기
d3.select("#executeTH10Table").on("click", function() {
    statTable2(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg, std, mini, Q1, median, Q3, maxi, tstat);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 확률 히스토그램 
d3.select("#HistNormalMu12").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawHistNormal(ngroup, nobs, avg, std, dataSet, freq, dvarName);
})
// 두 모분산 가설검정
d3.select("#testS12").on("click", function() {
    if (numVar < 2) {
        alert(alertMsg[41][langNum]);
        return;
    };
    dataClassifyM();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    chart.selectAll("*").remove();
    graphNum = 24;
    THsigma12 = true;
    buttonColorChange();
    document.getElementById("testS12").style.backgroundColor = buttonColorH;
    document.getElementById("sub11").style.display = "block"; //가설검정 선택사항표시
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, std);
    drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName);
    showDotMean(ngroup, nobs, avg, std, tstat);
    showDotStd(ngroup, nobs, avg, std, tstat);
})
// 두 모분산 가설검정 실행
d3.select("#executeTH11").on("click", function() {
    graphNum = 24;
    hypoType = 5;

    // 대립가설
    if (document.myForm110.type0.value == "1")      h1Type = 1;  // 양측
    else if (document.myForm110.type0.value == "2") h1Type = 2;  // 우측
    else if (document.myForm110.type0.value == "3") h1Type = 3;  // 좌측
    // alpha
    if (document.myForm112.type2.value == "1") alpha = 0.05;
    else alpha = 0.01;

    nn1 = nobs[0];
    nn2 = nobs[1];
    df1 = nn1 - 1;
    df2 = nn2 - 1;
    var1 = std[0] * std[0];
    var2 = std[1] * std[1];
    // test statistics
    teststat = var1 / var2;
    statF[0] = teststat;
    statF[2] = alpha;
    statF[3] = nobs[0]; // nn1
    statF[4] = avg[0]; // xbar1
    statF[5] = std[0]; // std1
    statF[6] = nobs[1]; // nn2
    statF[7] = avg[1]; // xbar2
    statF[8] = std[1]; // std2
    chart.selectAll("*").remove();
    if (isNaN(nn1) || isNaN(nn2) || isNaN(var1) || isNaN(var2) ||
        nn1 < 2 || nn2 < 2 || var1 <= 0 || var2 <= 0) { // wrong input
        chart.append("text").attr("class", "mean").attr("x", 150).attr("y", 100)
            .text("No input or wrong input !!	 Try again.").style("stroke", "red");
        return;
    } else { // F-test
        if (h1Type == 1) {
            h = alpha / 2;
            f = f_inv(h, df1, df2, info);
            g = f_inv(1 - h, df1, df2, info);
            pvalue = f_cdf(teststat, df1, df2, info);
            if (teststat > 0.5) pvalue = 1 - pvalue;
            pvalue = 2 * pvalue;
            if (pvalue > 1.0) pvalue = 1.0;
            drawFdistGraphTH(hypoType, h1Type, statF, df1, df2, f, g, h, pvalue, ngroup, nobs, avg, std);
        } else if (h1Type == 2) {
            h = alpha;
            f = 0;
            g = f_inv(1 - h, df1, df2, info);
            pvalue = 1 - f_cdf(teststat, df1, df2, info);
            drawFdistGraphTH(hypoType, h1Type, statF, df1, df2, f, g, h, pvalue, ngroup, nobs, avg, std);
        } else {
            h = alpha;
            f = f_inv(h, df1, df2, info);
            g = 10;
            pvalue = f_cdf(teststat, df1, df2, info);
            drawFdistGraphTH(hypoType, h1Type, statF, df1, df2, f, g, h, pvalue, ngroup, nobs, avg, std);
        }
    }
})
// 그룹별 평균점그래프 
d3.select("#DotSigma12").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName);
    showDotMean(ngroup, nobs, avg, std, tstat);
    showDotStd(ngroup, nobs, avg, std, tstat);
})
// 두그룹 분산 검정결과표 그리기
d3.select("#executeTH11Table").on("click", function() {
    statTable2(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg, std, mini, Q1, median, Q3, maxi, tstat);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 확률 히스토그램 
d3.select("#HistNormalSigma12").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawHistNormal(ngroup, nobs, avg, std, dataSet, freq, dvarName);
})
// 1원 2원분산분석
d3.select("#anova").on("click", function() {
  if (numVar < 2 || numVar > 3) {
        alert(alertMsg[41][langNum]);
        return;
  }
  else if (numVar == 2) { // 1원 분산분석
    graphNum = 27;
    dataClassifyM();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, std);
    chart.selectAll("*").remove();
    drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName);
    showDotMean(ngroup, nobs, avg, std, tstat);
    showDotStd(ngroup, nobs, avg, std, tstat);
    document.getElementById("sub12").style.display = "block"; // ANOVA 선택사항표시
    anovaStat(ngroup,gobs,nobs,avg,std,statF,gvar,dvar,yhat,residual);
  }
  else { // 2원 분산분석
    graphNum = 27;
    dataClassifyANOVA2();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, std);
    chart.selectAll("*").remove();
    drawDotGraph2(ngroup, ngroup2, gvalueLabel, gvalueLabel2, dvarName, nobs, avg, std, gvar, gvar2, dvar, tstat);
    if (!checkRBD) showDotStd2(ngroup, ngroup2, graphWidth, graphHeight);
    document.getElementById("sub15").style.display = "block"; // ANOVA2 선택사항표시
  }
})
// 1원분산분석 실행
d3.select("#executeTH12").on("click", function() {
    graphNum = 25;
    chart.selectAll("*").remove();
    if (document.myForm122.type2.value == "1") alpha = 0.05;
    else alpha = 0.01;
    hypoType = 7;
    h1Type = 2;
    df1 = statF[6];
    df2 = statF[7];
    pvalue = statF[9]
    h = alpha;
    f = 0;
    g = f_inv(1 - h, df1, df2, info);
    drawFdistGraphTH(hypoType, h1Type, statF, df1, df2, f, g, h, pvalue, ngroup, nobs, avg, std);
})
// 1원분산분석표 그리기
d3.select("#anovaTable").on("click", function() {
    statTable2(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg, std, mini, Q1, median, Q3, maxi, tstat);
    AnovaTable(gvarName,dvarName,nobs,avg,std,statF);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 그룹별 평균점그래프 
d3.select("#DotANOVA").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName);
    showDotMean(ngroup, nobs, avg, std, tstat);
    showDotStd(ngroup, nobs, avg, std, tstat);
})
// 1원분산분석 다중비교표
d3.select("#multipleComparison").on("click", function() {
    multipleComparisonTable(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 확률 히스토그램 
d3.select("#HistNormalANOVA").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawHistNormal(ngroup, nobs, avg, std, dataSet, freq, dvarName);
})
// 1원분산분석 잔차 Plot
d3.select("#anovaResidual").on("click", function() {
    AnovaResidual(ngroup,gobs,yhat,residual)
})
// 1원분산분석 잔차 Q-Q Plot
d3.select("#anovaQQ").on("click", function() {
    drawHistQQ(gobs,residual,svgStr[87][langNum],1)
})
// 그룹별 평균점그래프 
d3.select("#DotANOVA2").on("click", function() {
    chart.selectAll("*").remove(); // 전화면 제거
    drawDotGraph2(ngroup, ngroup2, gvalueLabel, gvalueLabel2, dvarName, nobs, avg, std, gvar, gvar2, dvar, tstat);
    if (!checkRBD) showDotStd2(ngroup, ngroup2, graphWidth, graphHeight)
})
// 2원분산분석표 
d3.select("#anova2Table").on("click", function() {
    stat2Table(ngroup, ngroup2, dvarName, gvarName, gvalueLabel, gvarName2, gvalueLabel2);
    Anova2Table(gvarName,dvarName,nobs,avg,std,statF);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 2원분산분석 다중비교표
d3.select("#multipleComparison2").on("click", function() {
    // 행 요인
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, std);
    multipleComparisonTable2(ngroup,ngroup2, dvarName,gvarName,gvarName2, gvalueLabel,gvalueLabel2, nobs, avg, cobsTwoWay, cmeanTwoWay);
    document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 2원분산분석 잔차 Plot
d3.select("#anova2Residual").on("click", function() {
    AnovaResidual(ngroup,gobs,yhat,residual)
})
// 2원분산분석 잔차 Q-Q Plot
d3.select("#anova2QQ").on("click", function() {
    for (j=0; j<gobs; j++) tdata[j] = residual[j];
    drawHistQQ(gobs,tdata,svgStr[87][langNum],1)
})
// 회귀분석 버튼 클릭 -------------------------------------------------------------------------------
d3.select("#regression").on("click", function() {
  graphNum = 20;
  buttonColorChange();
  if (numVar == 2) { // 단순선형회귀
    gvarNumber = -1;
    wvarNumber = -1;
    dataClassifyS();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    document.getElementById("regressBand").checked = false;
    document.getElementById("regressBand").disabled = false;
    document.getElementById("regression").style.backgroundColor = buttonColorH;
    tobs = xobs;
    SortAscendBasic(tobs, gdata, dataA); // Sorting data in ascending order
    ngroup = DotValueFreq(tobs, dataA, gdataValue, gvalueFreq)
    bivarStatByGroup(ngroup,tobs,xdata,ydata,gdata,nobs,xavg,yavg,xstd,ystd,alphaR,betaR,corr,rsquare,sxx,syy,sxy,ssr,sse,stderr);
    chart.selectAll("*").remove();
    drawScatter(ngroup, gvalueLabel, tobs, xdata, ydata, gdata, scatterS);
    showRegression(ngroup, alphaR, betaR, corr, rsquare, scatterS);
    // 점과 시트의 연결
    d3.selectAll(".datapoint").on("click", function() {
        k = $(this).data('sheetrowid');	
	datasheet.selectCell(k, 0, k, 0, true);
	datasheet.selectRows(k);
	d3.selectAll(".highlight_datapoint")
          .attr("class", "datapoint")
          .attr("r", wdata[k])
          .style("stroke", "black")
          .style("stroke-width", 1)           
	d3.select(this)
          .attr("class", "datapoint highlight_datapoint")
          .attr("r", wdata[k] + 5)
          .style("stroke", "orange")
          .style("stroke-width", 5) 
    })
  } 
  else { // 다중선형회귀
    dataClassifyRegression();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    document.getElementById("regressBand").checked = false;
    document.getElementById("regressBand").disabled = true;
    document.getElementById("regression").style.backgroundColor = buttonColorH;
    chart.selectAll("*").remove();
    tobs = tdobs[0];
    drawScatterMatrix(tdvarName,tdobs,tdvar);
    checkScatterMatrix = true;
    // 점과 시트의 연결
    d3.selectAll(".datapoint").on("click", function() {
        k = $(this).data('sheetrowid');	
	datasheet.selectCell(k, 0, k, 0, true);
	datasheet.selectRows(k);
	d3.selectAll(".highlight_datapoint")
          .attr("class", "datapoint")
          .attr("r", wdata[k])
          .style("stroke", "black")
          .style("stroke-width", 1)          
	d3.select(this)
          .attr("class", "datapoint highlight_datapoint")
          .attr("r", wdata[k] + 5)
          .style("stroke", "orange")
          .style("stroke-width", 5) 
    })
  }
  statRegression(numVar, tdobs, tdvar);
  statMultivariate(numVar, tdobs, tdvar);
  document.getElementById("sub16").style.display = "block"; // 회귀선 옵션 표시
})
// 회귀신뢰대 그리기
d3.select("#regressBand").on("click", function() {
    if (ngroup > 1) return;
    if (this.checked) {
        showRegressionBand(nobs, alphaR, betaR, xavg, sxx, stderr, scatterS);
    } else {
        removeRegressionBand();
    }
})
// 회귀산점도 그래프 
d3.select("#ScatterRegression").on("click", function() {
  if (numVar == 2) { // 산점도
    drawScatter(ngroup, gvalueLabel, tobs, xdata, ydata, gdata, scatterS);
    showRegression(ngroup, alphaR, betaR, corr, rsquare, scatterS);
    // 점과 시트의 연결
    d3.selectAll(".datapoint").on("click", function() {
        k = $(this).data('sheetrowid');	
	datasheet.selectCell(k, 0, k, 0, true);
	datasheet.selectRows(k);
	d3.selectAll(".highlight_datapoint")
          .attr("class", "datapoint")
          .attr("r", wdata[k])
          .style("stroke", "black")
          .style("stroke-width", 1) ;         
	d3.select(this)
          .attr("class", "datapoint highlight_datapoint")
          .attr("r", wdata[k] + 5)
          .style("stroke", "orange")
          .style("stroke-width", 5) ;
    })
    document.getElementById("regressBand").checked = false;
    document.getElementById("regressBand").disabled = false;
  } 
  else { // 산점도행렬
    chart.selectAll("*").remove();
    drawScatterMatrix(tdvarName,tdobs,tdvar);
    checkScatterMatrix = true;
    // 점과 시트의 연결
    d3.selectAll(".datapoint").on("click", function() {
        k = $(this).data('sheetrowid');	
	datasheet.selectCell(k, 0, k, 0, true);
	datasheet.selectRows(k);
	d3.selectAll(".highlight_datapoint")
          .attr("class", "datapoint")
          .attr("r", wdata[k])
          .style("stroke", "black")
          .style("stroke-width", 1)         
	d3.select(this)
          .attr("class", "datapoint highlight_datapoint")
          .attr("r", wdata[k] + 5)
          .style("stroke", "orange")
          .style("stroke-width", 5)
    })
  }
})

// 회귀분석표 그리기
d3.select("#regressTable").on("click", function() {
  if (numVar < 3) 
    regressionTable(xvarName,yvarName,nobs,xavg,xstd,yavg,ystd,alphaR,betaR,corr,rsquare,sxx,ssr,sse,stderr);
  else {
    multivariateTable(numVar, tdobs, tdvar);
    regressionTable2(numVar, tdobs, tdvar);
  }
  document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
})
// 회귀분석 잔차와 예측값
d3.select("#regressResidual").on("click", function() {
    checkScatterMatrix = false;
    document.getElementById("regressBand").checked = false;
    document.getElementById("regressBand").disabled = true;
    title = svgStr[95][langNum]; // "잔차와 예측값의 산점도"
    regressionResidual(tobs,yhat,stdResidual,title);
    // 점과 시트의 연결
    d3.selectAll(".datapoint").on("click", function() {
        k = $(this).data('sheetrowid');	
	datasheet.selectCell(k, 0, k, 0, true);
	datasheet.selectRows(k);
	d3.selectAll(".highlight_datapoint")
          .attr("class", "datapoint")
          .attr("r", wdata[k])
          .style("stroke", "black")
          .style("stroke-width", 1)         
	d3.select(this)
          .attr("class", "datapoint highlight_datapoint")
          .attr("r", wdata[k] + 5)
          .style("stroke", "orange")
          .style("stroke-width", 5) 
    })
})
// 회귀분석 잔차와 지렛값(leverage)
d3.select("#regressResidualLeverage").on("click", function() {
    checkScatterMatrix = false;
    document.getElementById("regressBand").checked = false;
    document.getElementById("regressBand").disabled = true;
    title = svgStr[96][langNum]; // "잔차와 지렛값의 산점도"
    regressionResidual(tobs,Hii,stdResidual,title);
    // 점과 시트의 연결
    d3.selectAll(".datapoint").on("click", function() {
        k = $(this).data('sheetrowid');	
	datasheet.selectCell(k, 0, k, 0, true);
	datasheet.selectRows(k);
	d3.selectAll(".highlight_datapoint")
          .attr("class", "datapoint")
          .attr("r", wdata[k])
          .style("stroke", "black")
          .style("stroke-width", 1)         
	d3.select(this)
          .attr("class", "datapoint highlight_datapoint")
          .attr("r", wdata[k] + 5)
          .style("stroke", "orange")
          .style("stroke-width", 5) 
    })
})
// 회귀분석 Cook's distance
d3.select("#regressCook").on("click", function() {
    checkScatterMatrix = false;
    document.getElementById("regressBand").checked = false;
    document.getElementById("regressBand").disabled = true;
    regressionCook(tobs,Cook);
    // 점과 시트의 연결
    d3.selectAll(".datapoint").on("click", function() {
        k = $(this).data('sheetrowid');	
	datasheet.selectCell(k, 0, k, 0, true);
	datasheet.selectRows(k);
	d3.selectAll(".highlight_datapoint")
          .attr("class", "datapoint")
          .attr("r", wdata[k])
          .style("stroke", "black")
          .style("stroke-width", 1)         
	d3.select(this)
          .attr("class", "datapoint highlight_datapoint")
          .attr("r", wdata[k] + 5)
          .style("stroke", "orange")
          .style("stroke-width", 5) 
    })
})
// 회귀분석 잔차 Q-Q Plot
d3.select("#regressQQ").on("click", function() {
    document.getElementById("regressBand").checked = false;
    document.getElementById("regressBand").disabled = true;
    regressionQQ(tobs,yhat,stdResidual);
})
// eStatH 메뉴
d3.select("#estatH").on("click", function() {
    window.open(appStr[1][langNum]);
})
// eStatU 메뉴
d3.select("#estatU").on("click", function() {
    window.open(appStr[2][langNum]);
})
// eStatE 메뉴
d3.select("#estatE").on("click", function() {
    window.open(appStr[3][langNum]);
})
// eStat 메뉴
d3.select("#estat").on("click", function() {
    window.open(appStr[4][langNum]);
})
// eStaLecture 메뉴
d3.select("#estatLecture").on("click", function() {
    window.open(appStr[6][langNum]);
})
// language Button
d3.select("#langBtn").on("click", function() {
    window.open(appStr[5][langNum], "_self");
})
// Example Download Button
d3.select("#downBtn").on("click", function() {
    // to be done
})


// 시트 변량편집
// 그래프 제목편집
d3.select("#editGraph").on("click", function() {
    if (graphNum > 20) {
        alert(alertMsg[42][langNum]);
        return;
    }
    buttonColorChange();
    EditGraph = true;
    document.getElementById("editGraph").style.backgroundColor = buttonColorH;
    document.getElementById("sub13").style.display = "block"; //그래프 제목편집 선택사항표시
    // 현재 제목 쓰기
    d3.select("#titleMain").node().value = mTitle[graphNum];
    d3.select("#titleY").node().value = yTitle[graphNum];
    d3.select("#titleX").node().value = xTitle[graphNum];
})
// 그래프 제목편집 실행
d3.select("#executeTH13").on("click", function() {
    mTitle[graphNum] = d3.select("#titleMain").node().value;
    yTitle[graphNum] = d3.select("#titleY").node().value;
    xTitle[graphNum] = d3.select("#titleX").node().value;
    redrawGraph(graphNum);
})
// jQuery 대화상자 초기화?
$(".dialog").dialog({
    autoOpen: false,
    modal: true,
    width: 'auto',
});
// 변량 편집 버튼 : V1 (jj=0) 만 해당
d3.select("#variableBtn").on("click", function() {
    variableSelectClear();
    jj = 0;
    document.getElementById("varlist").value = 1;
    buttonColorChange();
    $("#sub14").dialog("open");
    selectVarInit();
})
// 편집창 varlist에 이벤트 발생시 update 처리 함수 --------------------------
$("#varlist").change(selectVarUpdate);
function selectVarUpdate() {
    // 변량명을 rvarName에 입력
    rvarName[jj] = d3.select("#vname").node().value;
    // 변량값명을 rvaluelabel에 입력  : rvalueNum[jj]가 증가할 수도 있음
    rvalueNum[jj] = 0;
    for (k = 0; k < maxNumEdit; k++) {
        str1 = "#cell" + (k + 1).toString() + (1).toString();
        str2 = "#cell" + (k + 1).toString() + (2).toString();
        temp = d3.select(str1).node().value;
        if (temp == "") {
            break;
        } else {
            rvalueNum[jj]++;
            rvalue[jj][k] = temp;
            rvalueLabel[jj][k] = d3.select(str2).node().value;
        }
    }
    jj = parseInt(document.getElementById("varlist").value) - 1;
    selectVarInit();
} // endof selectVarUpdate()  ---------------------------------------------
// 편집창 varlist에 초기값 표시 함수 ---------------------------------------
function selectVarInit() {
    // 변량명 초기화
    d3.select("#vname").node().value = rvarName[jj];
    // 편집창 셀에 변량값 입력
    for (k = 0; k < maxNumEdit; k++) {
        str1 = "#cell" + (k + 1).toString() + (1).toString();
        str2 = "#cell" + (k + 1).toString() + (2).toString();
        if (k < rvalueNum[jj]) {
            d3.select(str1).node().value = rvalue[jj][k];
            d3.select(str2).node().value = rvalueLabel[jj][k];
        } else {
            d3.select(str1).node().value = null;
            d3.select(str2).node().value = null;
        }
    }
} // endof selectVarInit -------------------------------------------------
// 변량편집 저장 (최종 편집 변량에 적용)
d3.select("#vconfirm").on("click", function() {
    selectVarUpdate();
    datasheet.updateSettings({
        colHeaders: rvarName
    });
})
// 변량편집 나가기
d3.select("#vcancel").on("click", function() {
    selectVarUpdate();
    datasheet.updateSettings({
        colHeaders: rvarName
    });
    $("#sub14").dialog("close");
})
// Language Selector
languageNumber = {
    'ko': 0,
    'en': 1,
    'ja': 2,
    'zh': 10,
    'zhTW': 3,
    'fr': 4,
    'de': 5,
    'es': 6,
    'pt': 11,
    'vi': 7,
    'id': 8,
    'mn': 9,
}
$(document).ready(function() {
    var lang = localStorage.getItem("lang");
    if(lang == null) {
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
    graphTitle()
}
