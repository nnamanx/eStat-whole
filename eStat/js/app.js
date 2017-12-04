var chart = d3.select("#SVG");
// 기본 버튼 칼러색 설정
var buttonColorB = "#E0FFFF";
var buttonColorH = "#FF4500";
// 메뉴 칼러
var exampleDataNo = 10
var menuColor = new Array(exampleDataNo + 1);
var i, j, k, m, temp, tempi;
var freqMin, freqMax, numVar, rawData, checkNumeric, checkVarSelect;
var svgWidth, svgHeight, margin, graphWidth, graphHeight;
var svgWidth2, svgHeight2;
var title, graphNum;
var langNum = 0;
var rowMax = 200; // 시트행 최대
var colMax = 10; // 시트열 최대
var buffer = 20; // 우측 y선과 범례와  간격
var bothBarGap = 35; // 양쪽막대의 갭
var maxNumEdit = 9; // 변량편집시 최대 변량값 수
var jj = 0; // 변량편집시 초기 컬럼 번호
var graphNumMax = 26; // 그래프 종류의 최대 개수  현재 25개
// 그래프별 초기제목, 주제목, x제목, y제목
var iTitle = new Array(graphNumMax);
var mTitle = new Array(graphNumMax);
var yTitle = new Array(graphNumMax);
var xTitle = new Array(graphNumMax);
// datasheet raw variable
var numCol, numRow;
var robs = new Array(colMax);
var rvarName = new Array(colMax);
var rvarDeci = new Array(colMax);
var rvalueNum = new Array(colMax);
var rvar = new Array(colMax); // 2차원 배열로 아래에 정의
var rvalue = new Array(colMax); // 2차원 배열로 아래에 정의
var rvalueLabel = new Array(colMax); // 2차원 배열로 아래에 정의
// selected variable for analysis
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
} // Sorting freq and Ascend/Descend Indexing Label
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
var gobs, gvarNumber, gvarName, ngvalue, ngroup;
var gvar = new Array(rowMax);
var gvalueNum = new Array(rowMax);
var gdataValue = new Array(rowMax);
var gvalueLabel = new Array(rowMax);
var gvalueFreq = new Array(rowMax);
var currentDataSet = new Array(rowMax);
var currentLabel = new Array(rowMax);
// 연속형 그래프 변량 정의
var tobs;
var tdata = new Array(rowMax);
var tstat = new Array(20);
var stat = new Array(30);
var xmin, xmax, ymin, ymax, xbuffer, ybuffer;
var gxmin, gxmax, gxrange, gymin, gymax, gyrange;
// 그룹 변량 정의
var ngroupMax = 50;
var nobs = new Array(ngroupMax);
var dataSet = new Array(ngroupMax);
var groupFreq = new Array(ngroupMax);
for (k = 0; k < ngroupMax; k++) {
    dataSet[k] = new Array(rowMax);
}
var nobs = new Array(ngroupMax);
var mini = new Array(ngroupMax);
var Q1 = new Array(ngroupMax);
var median = new Array(ngroupMax);
var Q3 = new Array(ngroupMax);
var maxi = new Array(ngroupMax);
var avg = new Array(ngroupMax);
var std = new Array(ngroupMax);
// 산점도 변량 정의
var xobs, xvarNumber, xvarName, yobs, yvarNumber, yvarName;
var scatterS = new Array(20);
var gdata = new Array(rowMax);
var gcolor = new Array(rowMax);
var xdata = new Array(rowMax);
var xvalueLabel = new Array(rowMax);
var xavg = new Array(ngroupMax);
var xstd = new Array(ngroupMax);
var ydata = new Array(rowMax);
var yvalueLabel = new Array(rowMax);
var yavg = new Array(ngroupMax);
var ystd = new Array(ngroupMax);
var alphaR = new Array(ngroupMax);
var betaR = new Array(ngroupMax);
var corr = new Array(ngroupMax);
var rsquare = new Array(ngroupMax);
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
var statT = new Array(20);
var statF = new Array(20);
var ntot, mtot, ssb, ssw, msb, msw, temp;
// 그래프 종류, 체크버튼	블린 변량들
var VerticalBar, HorizontalBar;
var SeparateBar, StackBar, RatioBar, SideBar, BothBar;
var PieChart, DonutGraph, BandGraph, LineGraph, FreqTable;
var DotGraph, Histogram, BoxGraph, StemLeaf, StemBoth, StatTable, Scatter;
var THmean1, THmean12, THsigma1, THsigma12, THanova, EditGraph;
var checkFreq, checkBandFreq, checkMissing, checkData, checkSave;
var checkDotMean, checkDotStd, checkHistMean, checkHistFreq, checkHistLine;
var checkRegress;
buttonColorChange(); // svg 크기, 모든 버튼 체크 초기화
graphTitle(); // 디폴트 그래프 제목
// 학습수준 컨트롤
var levelNum = localStorage.getItem("level");
if (levelNum == null) levelNum = "3";
document.myForm1.type1.value = parseInt(levelNum);
if (levelNum == "1") { // 초등
    document.getElementById("tool-group-graph-numeric").style.display = "none"; // 연속형 그래프 감추기
    document.getElementById("bothstem2").style.display = "none"; // 양쪽형 줄기잎 감추기
    document.getElementById("statTable").style.display = "none"; // 기초통계량 감추기
    document.getElementById("estatE").style.display = "block"; // 예제 보이기
    document.getElementById("estatU").style.display = "none"; // 대학 모듈 감추기
    document.getElementById("tool-group-testing").style.display = "none"; // 가설검정 감추기
    document.getElementById("estat").style.display = "block"; // 예제학습 보이기
} else if (levelNum == "2") { // 중등
    document.getElementById("tool-group-graph-numeric").style.display = "inline-block"; // 연속형 그래프
    document.getElementById("bothstem2").style.display = "block"; // 양쪽형 줄기
    document.getElementById("statTable").style.display = "block"; // 기초통계량
    document.getElementById("tool-group-testing").style.display = "none"; // 가설검정 감추기
    document.getElementById("estatE").style.display = "block"; // 예제 보이기
    document.getElementById("estatU").style.display = "none"; // 대학 모듈 감추기
    document.getElementById("estat").style.display = "block"; // 예제학습 보이기
} else if (levelNum == "3") { // 대학
    document.getElementById("tool-group-graph-numeric").style.display = "inline-block"; // 연속형 그래프
    document.getElementById("bothstem2").style.display = "block"; // 양쪽형 줄기
    document.getElementById("statTable").style.display = "block"; // 기초통계량
    document.getElementById("tool-group-testing").style.display = "inline-block"; // 가설검정
    document.getElementById("estatE").style.display = "block"; // 예제 보이기
    document.getElementById("estatU").style.display = "block"; // 대학 모듈
    document.getElementById("estat").style.display = "block"; // 예제학습 보이기
} // =================================================================
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
} // 새 시트
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
        var selected, numOfSelectedColumns;
        if (coords.row == -1) {
            selected = datasheet.getSelected();
            numOfSelectedColumns = selected[3] - selected[1] + 1;
            for (j = 0; j < numOfSelectedColumns; j++) {
                k = j + parseInt(selected[1]);
                tdvarNumber[numVar + j] = k + 1;
                tdobs[numVar + j] = robs[k];
                tdvalueNum[numVar + j] = rvalueNum[k];
                tdvarName[numVar + j] = datasheet.getColHeader(j + selected[1]);
                /*
                		tdvalue[numVar + j] = rvalue[k];
                                tdvalueLabel[numVar + j] = rvalueLabel[k];
                */
                // tdvalue 와 rvalue가 메모리 공유하는 문제로 분리
                for (m = 0; m < robs[k]; m++) {
                    tdvalue[numVar + j][m] = rvalue[k][m];
                    tdvalueLabel[numVar + j][m] = rvalueLabel[k][m];
                }

                tdvar[numVar + j] = datasheet.getDataAtCol(j + selected[1]);
            }
            numVar += numOfSelectedColumns;
            var str = "";
            for (i = 0; i < numVar; i++) {
                str += " " + tdvarNumber[i].toString() + ",";
            }
            d3.select("#selectedVars").node().value = str;
            buttonColorChange(); // svg 크기, 모든 버튼 체크 초기화
        }
    });
} // 데이터시트 이벤트 초기화 함수 끝 --------------------------------------------
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
} // update global data variables:
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
        colHeaders: colHeaders,
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
        colHeaders: dataobj.colHeaders,
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
} // crop a sheet data with empty cells to a complete rectangular data
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
} // export datasheet to csv ------------------------------------------
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
}) //----------------------------------------------------------------
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
}) // ------------------------------------------------------------------
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
} // From https://milooy.wordpress.com/2017/03/28/javascript-print-page/
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
    const printContents = document.querySelector('#svgArea').innerHTML;
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
    // var imgsrc = 'data:image/svg+xml;utf8,'+svgString;
    //	  $("#screenTable").append(svgString);
    //	$("<img>").attr("src", imgsrc)
    //			     .attr("width", width)
    //			     .attr("height", height));
});
// save Table
d3.select("#saveTable").on("click", function() {
    saveAs(new Blob([d3.select("#screenTable").html()]), "eStatLog.html");
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
    document.getElementById("estatE").style.display = "block"; // 예제 보이기
    document.getElementById("estatU").style.display = "none"; // 대학 모듈 감추기
    document.getElementById("tool-group-testing").style.display = "none"; // 가설검정 감추기
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
    document.getElementById("estatE").style.display = "block"; // 예제 보이기
    document.getElementById("estatU").style.display = "none"; // 대학 모듈 감추기
    document.getElementById("estat").style.display = "block"; // 예제학습 보이기
}
rad1[2].onclick = function() { // 대학
    localStorage.removeItem("level");
    levelNum = document.myForm1.type1.value;
    localStorage.setItem("level", levelNum);
    document.getElementById("tool-group-graph-numeric").style.display = "inline-block"; // 연속형 그래프
    document.getElementById("bothstem2").style.display = "block"; // 양쪽형 줄기
    document.getElementById("statTable").style.display = "block"; // 기초통계량
    document.getElementById("tool-group-testing").style.display = "inline-block"; // 가설검정
    document.getElementById("estatE").style.display = "block"; // 예제 보이기
    document.getElementById("estatU").style.display = "block"; // 대학 모듈
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
} // 도수분포표 버튼 클릭
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
// 점그래프 평균 표시
d3.select("#DotMean").on("click", function() {
    if (DotGraph) {
        if (this.checked) {
            checkDotMean = true;
            gxmin = tstat[11];
            gxmax = tstat[12];
            showDotMean(ngroup, avg, gxmin, gxmax, tstat[13], tstat[14]);
        } else {
            checkDotMean = false;
            removeDotMean();
        }
    }
})
// 점그래프 표준편차 표시
d3.select("#DotStd").on("click", function() {
    if (DotGraph) {
        if (this.checked) {
            checkDotStd = true;
            gxmin = tstat[11];
            gxmax = tstat[12];
            showDotStd(avg, std, gxmin, gxmax, tstat[13], tstat[14]);
        } else {
            checkDotStd = false;
            removeDotStd();
        }
    }
})
// 히스토그램 주메뉴 -----------------------------------------------------------------------------------------
d3.select("#hist1").on("click", function() {
    graphNum = 19;
    dataClassifyM();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    Histogram = true;
    document.getElementById("hist1").style.backgroundColor = buttonColorH;
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, std);
    chart.selectAll("*").remove();
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
d3.select("#histTable").on("click", function() {;
    if (Histogram == false) return;
    showHistTable(ngroup, nvalueH, freq, dataValueH, dvarName, gvarName, gvalueLabel)
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
})
// 산점도 버튼 클릭 -------------------------------------------------------------------------------
d3.select("#scatter1").on("click", function() {
    graphNum = 20;
    dataClassifyS();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    Scatter = true;
    document.getElementById("scatter1").style.backgroundColor = buttonColorH;
    tobs = xobs;
    SortAscendBasic(tobs, gdata, dataA); // Sorting data in ascending order
    ngroup = DotValueFreq(tobs, dataA, gdataValue, gvalueFreq)
    bivarStatByGroup(ngroup, tobs, xdata, ydata, gdata, nobs, xavg, yavg, xstd, ystd, alphaR, betaR, corr, rsquare)
    drawScatter(ngroup, gvalueLabel, tobs, xdata, ydata, gdata, scatterS);
    document.getElementById("sub6").style.display = "block"; //회귀선 표시
})
// 산점도 회귀선 그리기
d3.select("#regress").on("click", function() {
    if (Scatter == false) return;
    if (this.checked) {
        checkRegress = true;
        showRegression(ngroup, alphaR, betaR, corr, rsquare, scatterS);
    } else {
        checkRegress = false;
        removeRegression();
    }
})
// eStatH 메뉴
d3.select("#estatH").on("click", function() {
    window.open(appStr[1][langNum]);
    1
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
// language Button
d3.select("#langBtn").on("click", function() {
    window.open(appStr[5][langNum], "_self");
})
// Example Download Button
d3.select("#downBtn").on("click", function() {
    // to be done
})
// 모평균 가설검정
d3.select("#testM1").on("click", function() {
    graphNum = 21;
    if (numVar > 1) {
        alert(alertMsg[37][langNum]);
        return;
    };
    dataClassifyM();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    THmean1 = true;
    document.getElementById("testM1").style.backgroundColor = buttonColorH;
    TotalStat(dobs, dvar, tstat);
    chart.selectAll("*").remove();
    document.getElementById("sub8").style.display = "block"; //가설검정 선택사항표시
    hypoType = 1;
    h1Type = 1;
    testType = 2;
    alpha = 0.05;
    h = alpha / 2;
    nn = tstat[0];
    df = nn - 1;
    mu = tstat[1];
    xbar = tstat[1];
    stdev = tstat[2];
    teststat = (xbar - mu) / (stdev / Math.sqrt(nn));
    temp = t_inv(1 - alpha / 2, df, info) * stdev / Math.sqrt(nn);
    left = xbar - temp;
    right = xbar + temp;
    f = t_inv(h, df, info);
    g = -f;
    if (teststat < 0) pvalue = 2 * t_cdf(teststat, df, info);
    else pvalue = 2 * (1 - t_cdf(teststat, df, info));
    statT[0] = xbar; // 초기 mu
    statT[1] = stdev; // Z test 경우 sigma
    statT[2] = alpha;
    statT[3] = nn;
    statT[4] = xbar;
    statT[5] = stdev;
    statT[6] = left;
    statT[7] = right;
    drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
})
// 모평균 가설검정 재실행
// H1 type
var h8 = document.myForm80.type0;
h8[0].onclick = function() {
    h1Type = 1;
} // 양측검정
h8[1].onclick = function() {
    h1Type = 2;
} // 우측검정
h8[2].onclick = function() {
    h1Type = 3;
} // 좌측검정
// Test type
var test8 = document.myForm81.type1;
test8[0].onclick = function() {
    testType = 2;
} // Z-test
test8[1].onclick = function() {
    testType = 1;
} // t-test
// alpha
var a8 = document.myForm82.type2;
a8[0].onclick = function() {
    alpha = 0.05;
}
a8[1].onclick = function() {
    alpha = 0.01;
}
d3.select("#executeTH8").on("click", function() {
    graphNum = 21;
    // input value
    mu = parseFloat(d3.select("#mu8").node().value);
    if (isNaN(mu)) {
        alert(alertMsg[38][langNum]);
        return;
    }
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
// 모분산 가설검정
d3.select("#testS1").on("click", function() {
    graphNum = 22;
    if (numVar > 1) {
        alert(alertMsg[37][langNum]);
        return;
    };
    dataClassifyM();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    THsigma1 = true;
    document.getElementById("testS1").style.backgroundColor = buttonColorH;
    TotalStat(dobs, dvar, tstat);
    document.getElementById("sub9").style.display = "block"; //가설검정 선택사항표시
    hypoType = 2;
    h1Type = 1;
    alpha = 0.05;
    h = alpha / 2;
    nn = tstat[0];
    df = nn - 1;
    stdev = tstat[2];
    vari = stdev * stdev
    variS = vari;
    teststat = (xbar - mu) / (stdev / Math.sqrt(nn));
    temp = t_inv(1 - alpha / 2, df, info) * stdev / Math.sqrt(nn);
    left = xbar - temp;
    right = xbar + temp;
    // confidence interval
    left = df * variS / chisq_inv(1 - alpha / 2, df, info);
    right = df * variS / chisq_inv(alpha / 2, df, info);
    // test statistics
    teststat = df * variS / vari;
    statT[0] = variS; // 초기 variance
    statT[2] = alpha;
    statT[3] = tstat[0]; // nn
    statT[4] = tstat[1]; // xbar
    statT[5] = tstat[2]; // stdev
    statT[6] = left;
    statT[7] = right;
    chart.selectAll("*").remove();
    if (isNaN(vari) || isNaN(nn) || isNaN(variS) || vari <= 0 || nn < 2 || variS <= 0) { // wrong input
        chart.append("text").attr("class", "mean").attr("x", 150).attr("y", 100)
            .text("No input or wrong input !!	 Try again.").style("stroke", "red")
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
// 모분산 가설검정 재실행
// H1 type
var h9 = document.myForm90.type0;
h9[0].onclick = function() {
    h1Type = 1
} // 양측검정
h9[1].onclick = function() {
    h1Type = 2
} // 우측검정
h9[2].onclick = function() {
    h1Type = 3
} // 좌측검정
// alpha
var a9 = document.myForm92.type2;
a9[0].onclick = function() {
    alpha = 0.05;
}
a9[1].onclick = function() {
    alpha = 0.01;
}
d3.select("#executeTH9").on("click", function() {
    graphNum = 22;
    // input value
    vari = parseFloat(d3.select("#vari9").node().value);
    if (isNaN(vari)) {
        alert(alertMsg[40][langNum]);
        return;
    }
    // confidence interval
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
// 두 모평균 가설검정
d3.select("#testM12").on("click", function() {
    graphNum = 23;
    if (numVar < 2) {
        alert(alertMsg[41][langNum]);
        return;
    };
    dataClassifyM();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    THmean12 = true;
    document.getElementById("testM12").style.backgroundColor = buttonColorH;
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, std);
    chart.selectAll("*").remove();
    document.getElementById("sub10").style.display = "block"; //가설검정 선택사항표시
    hypoType = 41;
    h1Type = 1;
    testType = 1;
    alpha = 0.05;
    mu = 0;
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
    chart.selectAll("*").remove();
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
                f = (t1 * t_inv(h, df1, info) + t2 * t_inv(h, df2, info)) / varAdd;
                g = -f;
                if (teststat < 0) pvalue = 2 * (t1 * t_cdf(teststat, df1, info) + t2 * t_cdf(teststat, df2, info)) / varAdd;
                else pvalue = 2 * (1 - (t1 * t_cdf(teststat, df1, info) + t2 * t_cdf(teststat, df2, info)) / varAdd);
            }
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
        } else if (h1Type == 2) {
            h = alpha;
            if (testType == 1) {
                f = t_inv(0.0001, df, info);
                g = t_inv(1 - h, df, info);
                pvalue = 1 - t_cdf(teststat, df, info);
            } else if (testType == 2) {
                f = t_inv(0.0001, df, info);
                g = (t1 * t_inv(1 - h, df1, info) + t2 * t_inv(1 - h, df2, info)) / varAdd;
                pvalue = 1 - ((t1 * t_cdf(teststat, df1, info) + t2 * t_cdf(teststat, df2, info)) / varAdd);
            }
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
        } else {
            h = alpha;
            if (testType == 1) {
                f = t_inv(h, df, info);
                g = t_inv(0.9999, df, info);
                pvalue = t_cdf(teststat, df, info);
            } else if (testType == 2) {
                f = (t1 * t_inv(h, df1, info) + t2 * t_inv(h, df2, info)) / varAdd;
                g = t_inv(0.9999, df, info);
                pvalue = (t1 * t_cdf(teststat, df1, info) + t2 * t_cdf(teststat, df2, info)) / varAdd;
            }
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
        }
    }
})
// 가설검정 Mu 12 재실행
// H1 type
var h10 = document.myForm100.type0;
h10[0].onclick = function() {
    h1Type = 1
} // 양측검정
h10[1].onclick = function() {
    h1Type = 2
} // 우측검정
h10[2].onclick = function() {
    h1Type = 3
} // 좌측검정
// Test type
var test10 = document.myForm101.type1;
test10[0].onclick = function() {
    testType = 1;
    hypoType = 41
} // same population variance
test10[1].onclick = function() {
    testType = 2;
    hypoType = 42
} // not same population variances
// alpha
var a10 = document.myForm102.type2;
a10[0].onclick = function() {
    alpha = 0.05;
}
a10[1].onclick = function() {
    alpha = 0.01;
}
d3.select("#executeTH10").on("click", function() {
    graphNum = 23;
    mu = parseFloat(d3.select("#mu10").node().value);
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
    chart.selectAll("*").remove();
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
                f = (t1 * t_inv(h, df1, info) + t2 * t_inv(h, df2, info)) / varAdd;
                g = -f;
                if (teststat < 0) pvalue = 2 * (t1 * t_cdf(teststat, df1, info) + t2 * t_cdf(teststat, df2, info)) / varAdd;
                else pvalue = 2 * (1 - (t1 * t_cdf(teststat, df1, info) + t2 * t_cdf(teststat, df2, info)) / varAdd);
            }
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
        } else if (h1Type == 2) {
            h = alpha;
            if (testType == 1) {
                f = t_inv(0.0001, df, info);
                g = t_inv(1 - h, df, info);
                pvalue = 1 - t_cdf(teststat, df, info);
            } else if (testType == 2) {
                f = t_inv(0.0001, df, info);
                g = (t1 * t_inv(1 - h, df1, info) + t2 * t_inv(1 - h, df2, info)) / varAdd;
                pvalue = 1 - ((t1 * t_cdf(teststat, df1, info) + t2 * t_cdf(teststat, df2, info)) / varAdd);
            }
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
        } else {
            h = alpha;
            if (testType == 1) {
                f = t_inv(h, df, info);
                g = t_inv(0.9999, df, info);
                pvalue = t_cdf(teststat, df, info);
            } else if (testType == 2) {
                f = (t1 * t_inv(h, df1, info) + t2 * t_inv(h, df2, info)) / varAdd;
                g = t_inv(0.9999, df, info);
                pvalue = (t1 * t_cdf(teststat, df1, info) + t2 * t_cdf(teststat, df2, info)) / varAdd;
            }
            drawTdistGraphTH(hypoType, h1Type, testType, statT, teststat, df, f, g, h, pvalue);
        }
    }
})
// 두 모분산 가설검정
d3.select("#testS12").on("click", function() {
    graphNum = 24;
    if (numVar < 2) {
        alert(alertMsg[41][langNum]);
        return;
    };
    dataClassifyM();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    THsigma12 = true;
    document.getElementById("testS12").style.backgroundColor = buttonColorH;
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, std);
    chart.selectAll("*").remove();
    document.getElementById("sub11").style.display = "block"; //가설검정 선택사항표시
    hypoType = 5;
    h1Type = 1;
    alpha = 0.05;
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
            if (pvalue > 0.5) pvalue = 1 - pvalue;
            pvalue = 2 * pvalue;
            drawFdistGraphTH(hypoType, h1Type, statF, df1, df2, f, g, h, pvalue);
        } else if (h1Type == 2) {
            h = alpha;
            f = 0;
            g = f_inv(1 - h, df1, df2, info);
            pvalue = 1 - f_cdf(teststat, df1, df2, info);
            drawFdistGraphTH(hypoType, h1Type, statF, df1, df2, f, g, h, pvalue);
        } else {
            h = alpha;
            f = f_inv(h, df1, df2, info);
            g = 10;
            pvalue = f_cdf(teststat, df1, df2, info);
            drawFdistGraphTH(hypoType, h1Type, statF, df1, df2, f, g, h, pvalue);
        }
    }
})
// 두 모분산 가설검정 재실행
// H1 type
var h11 = document.myForm110.type0;
h11[0].onclick = function() {
    h1Type = 1
} // 양측검정
h11[1].onclick = function() {
    h1Type = 2
} // 우측검정
h11[2].onclick = function() {
    h1Type = 3
} // 좌측검정
// alpha
var a11 = document.myForm112.type2;
a11[0].onclick = function() {
    alpha = 0.05;
}
a11[1].onclick = function() {
    alpha = 0.01;
}
d3.select("#executeTH11").on("click", function() {
    graphNum = 24;
    hypoType = 5;
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
// 분산분석
d3.select("#anova").on("click", function() {
    graphNum = 25;
    if (numVar < 2) {
        alert(alertMsg[41][langNum]);
        return;
    };
    dataClassifyM();
    if (checkData == false || checkVarSelect == false || checkNumeric == false || checkMissing == true) return;
    buttonColorChange();
    THanova = true;
    document.getElementById("anova").style.backgroundColor = buttonColorH;
    TotalStat(dobs, dvar, tstat);
    GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, std);
    chart.selectAll("*").remove();
    document.getElementById("sub12").style.display = "block"; //가설검정 선택사항표시
    hypoType = 7;
    h1Type = 2;
    alpha = 0.05;
    var strnn = "";
    var strxbar = "";
    var strstd = "";
    checkData = true;
    for (i = 0; i < ngroup; i++) {
        strnn += " n" + (i + 1).toString() + "=" + nobs[i].toString() + ", ";
        strxbar += " m" + (i + 1).toString() + "=" + (f2(avg[i])).toString() + ", ";
        strstd += " s" + (i + 1).toString() + "=" + (f2(std[i])).toString() + ", ";
    }
    chart.selectAll("*").remove();
    // ANOVA F-test statistics
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
        ssw += (nobs[i] - 1) * std[i] * std[i];
    }
    msb = ssb / df1;
    msw = ssw / df2;
    statF[0] = msb / msw;
    statF[1] = ssb;
    statF[2] = ssw;
    statF[3] = ssb + ssw;
    statF[4] = msb;
    statF[5] = msw;
    h = alpha;
    f = 0;
    g = f_inv(1 - h, df1, df2, info);
    pvalue = 1 - f_cdf(statF[0], df1, df2, info);
    drawFdistGraphTH(hypoType, h1Type, statF, df1, df2, f, g, h, pvalue, ngroup, nobs, avg, std);
})
// 분산분석 재실행
// 분산분석 재실행 alpha
var a12 = document.myForm122.type2;
a12[0].onclick = function() {
    alpha = 0.05;
}
a12[1].onclick = function() {
    alpha = 0.01;
}
d3.select("#executeTH12").on("click", function() {
    graphNum = 25;
    chart.selectAll("*").remove();
    hypoType = 7;
    h1Type = 2;
    // ANOVA F-test statistics
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
        ssw += (nobs[i] - 1) * std[i] * std[i];
    }
    msb = ssb / df1;
    msw = ssw / df2;
    statF[0] = msb / msw;
    statF[1] = ssb;
    statF[2] = ssw;
    statF[3] = ssb + ssw;
    statF[4] = msb;
    statF[5] = msw;
    h = alpha;
    f = 0;
    g = f_inv(1 - h, df1, df2, info);
    pvalue = 1 - f_cdf(statF[0], df1, df2, info);
    drawFdistGraphTH(hypoType, h1Type, statF, df1, df2, f, g, h, pvalue, ngroup, nobs, avg, std);
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
$.message = {}
$.message.ko = {
    "eStat : Stat Education SW" : "eStat: 통계교육SW",
    "Filename" : "파일이름",
    "Selected Variables" : "선택변량",
    "Cancel" : "취소",
    "Edit Variables" : "변량편집",
    "Level" : "수준",
    "ElementaryLevel" : "초",
    "MiddleLevel" : "중",
    "UniversityLevel" : "대",
    "Example" : "예제 불러오기",
    "New Sheets" : "새시트",
    "csv Open" : "csv 불러오기",
    "www Open" : "www 불러오기",
    "json Open" : "json 불러오기",
    "csv Save" : "csv 저장",
    "json Save" : "json 저장",
    "Print Sheet" : "시트 Print",
    "Bar Graph" : "막대그래프",
    "Pie Chart" : "원그래프",
    "Band Graph" : "띠그래프",
    "Line Graph" : "꺽은선그래프",
    "Dot Graph" : "점그래프",
    "Histogram" : "히스토그램",
    "Stem & Leaf Plot" : "줄기와 잎그림",
    "Box-Whisker Plot" : "상자그래프",
    "Scatterplot" : "산점도",
    "Frequency Table" : "도수분포표",
    "Basic Statistics" : "기초통계량",
    "Testing Hypothesis &mu;" : "추검정 &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>" : "추검정 &sigma;<sup>2</sup>",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>" : "검정 &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>" : "검정 &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Analysis of Variance" : "분산분석",
    "High School Stat Education" : "고등 통계교육",
    "University Stat Education" : "대학 통계교육",
    "Elem Stat Graph Example" : "초중그래프 예",
    "Learning eStat w Example" : "eStat 예제학습",
    "Vertical Separated Bar" : "수직 분리형",
    "Vertical Stacked Bar" : "수직 쌓는형",
    "Vertical Ratio Bar" : "수직 비율형",
    "Vertical Side by Side Bar" : "수직 나란형",
    "Vertical Two Sided Bar" : "수직 양쪽형",
    "Horizontal Separated Bar" : "수평 분리형",
    "Horizontal Stacked Bar" : "수평 쌓는형",
    "Horizontal Ratio Bar" : "수평 비율형",
    "Horizontal Side by Side Bar" : "수평 나란형",
    "Horizontal Two Sided Bar" : "수평 양쪽형",
    "Doughnut Graph" : "도넛그래프",
    "Two Sided Stem & Leaf Plot" : "양쪽형 줄기",
    "Graph Save" : "그래프 저장",
    "Graph Print" : "그래프 Print",
    "Move to Table" : "테이블로 이동",
    "Edit Title" : "제목편집",
    "Table Save" : "테이블 저장",
    "Table Print" : "테이블 인쇄",
    "Frequency" : "도수표시",
    "(Sorting)" : "(정렬)",
    "Raw Data" : "원자료",
    "Descending" : "내림차순",
    "Ascending" : "올림차순",
    "Frequency" : "도수표시",
    "(Sorting)" : "(정렬)",
    "Raw Data" : "원자료",
    "Descending" : "내림차순",
    "Ascending" : "올림차순",
    "Mean" : "평균",
    "Std Deviation" : "표준편차",
    "Regression" : "회귀선",
    "Mean" : "평균",
    "Frequency" : "도수",
    "Frequency Polygon" : "도수분포다각형",
    "Frequency Table" : "도수분포표",
    "Execute New Interval" : "새 구간으로 실행",
    "Interval Start" : "구간시작",
    "Interval Width" : "구간너비",
    "t-test" : "t-검정",
    "Z-test" : "Z-검정",
    "(if Z-test, enter &sigma;)" : "(Z-검정이면 입력)",
    "Significance Level" : "유의수준",
    "Execute" : "실행",
    "(Confidence Interval)" : "(신뢰구간)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)" : "(Z-검정이면, Z<sub>1-&alpha;/2 </sub> 이용)",
    "&chi;<sup>2</sup> test" : "&chi;<sup>2</sup> 검정",
    "Significance Level" : "유의수준",
    "Execute" : "실행",
    "(Confidence Interval)" : "(신뢰구간)",
    "Variance Assumption" : "분산가정",
    "Significance Level" : "유의수준",
    "Execute" : "실행",
    "F test" : "F 검정",
    "Significance Level" : "유의수준",
    "Execute" : "실행",
    "At least one pair of means is different" : "적어도 한쌍 이상의 평균이 다름",
    "F test" : "F 검정",
    "Significance Level" : "유의수준",
    "Execute" : "실행",
    "Main Title : " : "주 제목 : ",
    "y title : " : "y축제목 : ",
    "x title : " : "x축제목 : ",
    "Modify" : "수정",
    "Confirm" : "확인",
    "Variable Name" : "변량명",
    "Variable Value" : "변량값",
    "Value Label" : "변량값명",
    "* Less than nine value labels allowed." : "* 9개 이하의 변량값명을 지정할 수 있음",
    "Save" : "저장",
    "Exit" : "나가기",
}
$.message.en = {
    "eStat : Stat Education SW" : "eStat : Stat Education SW",
    "Filename" : "Filename",
    "Selected Variables" : "Var Select",
    "Cancel" : "Cancel",
    "Edit Variables" : "EditVar",
    "Level" : "Level",
    "ElementaryLevel" : "E",
    "MiddleLevel" : "M",
    "UniversityLevel" : "U",
    "Example" : "Example",
    "New Sheets" : "New Sheets",
    "csv Open" : "csv Open",
    "www Open" : "www Open",
    "json Open" : "json Open",
    "csv Save" : "csv Save",
    "json Save" : "json Save",
    "Print Sheet" : "Print Sheet",
    "Bar Graph" : "Bar Graph",
    "Pie Chart" : "Pie Chart",
    "Band Graph" : "Band Graph",
    "Line Graph" : "Line Graph",
    "Dot Graph" : "Dot Graph",
    "Histogram" : "Histogram",
    "Stem & Leaf Plot" : "Stem & Leaf Plot",
    "Box-Whisker Plot" : "Box-Whisker Plot",
    "Scatterplot" : "Scatterplot",
    "Frequency Table" : "Frequency Table",
    "Basic Statistics" : "Basic Statistics",
    "Testing Hypothesis &mu;" : "Testing Hypothesis &mu;",
    "Testing Hypothesis &sigma;<sup>2</sup>" : "Testing Hypothesis &sigma;<sup>2</sup>",
    "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>" : "Testing Hypothesis  &mu;<sub>1</sub>, &mu;<sub>2</sub>",
    "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>" : "Testing Hypothesis &sigma;<sub>1</sub><sup>2</sup>, &sigma;<sub>2</sub><sup>2</sup>",
    "Analysis of Variance" : "Analysis of Variance",
    "High School Stat Education" : "High School Stat Education",
    "University Stat Education" : "University Stat Education",
    "Elem Stat Graph Example" : "Elem Stat Graph Example",
    "Learning eStat w Example" : "Learning eStat w Example",
    "Vertical Separated Bar" : "Vertical Separated Bar",
    "Vertical Stacked Bar" : "Vertical Stacked Bar",
    "Vertical Ratio Bar" : "Vertical Ratio Bar",
    "Vertical Side by Side Bar" : "Vertical Side by Side Bar",
    "Vertical Two Sided Bar" : "Vertical Two Sided Bar",
    "Horizontal Separated Bar" : "Horizontal Separated Bar",
    "Horizontal Stacked Bar" : "Horizontal Stacked Bar",
    "Horizontal Ratio Bar" : "Horizontal Ratio Bar",
    "Horizontal Side by Side Bar" : "Horizontal Side by Side Bar",
    "Horizontal Two Sided Bar" : "Horizontal Two Sided Bar",
    "Doughnut Graph" : "Doughnut Graph",
    "Two Sided Stem & Leaf Plot" : "Two Sided Stem & Leaf Plot",
    "Graph Save" : "Graph Save",
    "Graph Print" : "Graph Print",
    "Move to Table" : "Move to Table",
    "Edit Title" : "Edit Title",
    "Table Save" : "Table Save",
    "Table Print" : "Table Print",
    "Frequency" : "Frequency",
    "(Sorting)" : "(Sorting)",
    "Raw Data" : "Raw Data",
    "Descending" : "Descending",
    "Ascending" : "Ascending",
    "Frequency" : "Frequency",
    "(Sorting)" : "(Sorting)",
    "Raw Data" : "Raw Data",
    "Descending" : "Descending",
    "Ascending" : "Ascending",
    "Mean" : "Mean",
    "Std Deviation" : "Std Deviation",
    "Regression" : "Regression",
    "Mean" : "Mean",
    "Frequency" : "Frequency",
    "Frequency Polygon" : "Frequency Polygon",
    "Frequency Table" : "Frequency Table",
    "Execute New Interval" : "Execute New Interval",
    "Interval Start" : "Interval Start",
    "Interval Width" : "Interval Width",
    "t-test" : "t-test",
    "Z-test" : "Z-test",
    "(if Z-test, enter &sigma;)" : "(if Z-test, enter &sigma;)",
    "Significance Level" : "Significance Level",
    "Execute" : "Execute",
    "(Confidence Interval)" : "(Confidence Interval)",
    "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)" : "(if Z-test, Z<sub>1-&alpha;/2 </sub> is used)",
    "&chi;<sup>2</sup> test" : "&chi;<sup>2</sup> test",
    "Significance Level" : "Significance Level",
    "Execute" : "Execute",
    "(Confidence Interval)" : "(Confidence Interval)",
    "Variance Assumption" : "Variance Assumption",
    "Significance Level" : "Significance Level",
    "Execute" : "Execute",
    "F test" : "F test",
    "Significance Level" : "Significance Level",
    "Execute" : "Execute",
    "At least one pair of means is different" : "At least one pair of means is different",
    "F test" : "F test",
    "Significance Level" : "Significance Level",
    "Execute" : "Execute",
    "Main Title : " : "Main Title : ",
    "y title : " : "y title : ",
    "x title : " : "x title : ",
    "Modify" : "Modify",
    "Confirm" : "Confirm",
    "Variable Name" : "Variable Name",
    "Variable Value" : "Variable Value",
    "Value Label" : "Value Label",
    "* Less than nine value labels allowed." : "* Less than nine value labels allowed.",
    "Save" : "Save",
    "Exit" : "Exit",
}
