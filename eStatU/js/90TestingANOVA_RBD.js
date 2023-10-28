      var chart = d3.select("#chart");
      var svgWidth    = 600;
      var svgHeight   = 400;
      var margin      = {top: 80, bottom: 60, left: 80, right: 80};
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var i, j, dft, dfb, dfw, dfe, info, alpha, pvalue;
      var ntot, sst, ssb, ssw, sse, msb, msw, temp; 
      var dmax, dmin;
      var maxk     = 8;
      var maxblock = 9;
      var nblock, nkk;
      var totbar;
      var y      = new Array(maxblock);
      var kobs   = new Array(maxblock+1);
      var rowbar = new Array(maxblock);
      var colbar = new Array(maxk);
      var treat  = new Array(maxk);
      var block  = new Array(maxblock);
      for (j=0; j<maxk; j++)     treat[j] = svgStr[102][langNum]  + " " + (j+1).toString(); // Treatment
      for (i=0; i<maxblock; i++) block[i] = svgStrU[134][langNum] + " " + (i+1).toString(); // block

      document.getElementById("rowbar1").disabled = true;  
      document.getElementById("rowbar2").disabled = true;  
      document.getElementById("rowbar3").disabled = true;  
      document.getElementById("rowbar4").disabled = true;  
      document.getElementById("rowbar5").disabled = true;  
      document.getElementById("rowbar6").disabled = true;  
      document.getElementById("rowbar7").disabled = true;  
      document.getElementById("rowbar8").disabled = true;  
      document.getElementById("rowbar9").disabled = true;  
      document.getElementById("colbar1").disabled = true;  
      document.getElementById("colbar2").disabled = true;  
      document.getElementById("colbar3").disabled = true;  
      document.getElementById("colbar4").disabled = true;  
      document.getElementById("colbar5").disabled = true;  
      document.getElementById("colbar6").disabled = true;  
      document.getElementById("colbar7").disabled = true;  
      document.getElementById("colbar8").disabled = true;  
      document.getElementById("totbar").disabled  = true;  

      // input data control ===================================================
      d3.select("#data1").on("input", function() {
        stat = simplestat("#data1");  
        y[0] = data;
        if (document.getElementById("data1").value == "") kobs[1] = 0;
        else kobs[1] = y[0].length;
      });
      d3.select("#data2").on("input", function() {
        stat = simplestat("#data2");  
        y[1] = data; 
        if (document.getElementById("data2").value == "") kobs[2] = 0;
        else kobs[2] = y[1].length;
      });
      d3.select("#data3").on("input", function() {
        stat = simplestat("#data3");  
        y[2] = data;
        if (document.getElementById("data3").value == "") kobs[3] = 0;
        else kobs[3] = y[2].length;
      });
      d3.select("#data4").on("input", function() {
        stat = simplestat("#data4");  
        y[3] = data;
        if (document.getElementById("data4").value == "") kobs[4] = 0;
        else kobs[4] = y[3].length;
      });
      d3.select("#data5").on("input", function() {
        stat = simplestat("#data5");  
        y[4] = data;
        if (document.getElementById("data5").value == "") kobs[5] = 0;
        else kobs[5] = y[4].length;
      });
      d3.select("#data6").on("input", function() {
        stat = simplestat("#data6");  
        y[5] = data;
        if (document.getElementById("data6").value == "") kobs[5] = 0;
        else kobs[6] = y[5].length;
      });
      d3.select("#data7").on("input", function() {
        stat = simplestat("#data7");  
        y[6] = data;
        if (document.getElementById("data7").value == "") kobs[5] = 0;
        else kobs[7] = y[6].length;
      });
      d3.select("#data8").on("input", function() {
        stat = simplestat("#data8");  
        y[7] = data;
        if (document.getElementById("data8").value == "") kobs[5] = 0;
        else kobs[8] = y[7].length;
      });
      d3.select("#data9").on("input", function() {
        stat = simplestat("#data9");  
        y[8] = data;
        if (document.getElementById("data9").value == "") kobs[5] = 0;
        else kobs[9] = y[8].length;
      });

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        chart.selectAll("*").remove();
        document.getElementById("data1").value  = "";
        document.getElementById("data2").value  = "";
        document.getElementById("data3").value  = "";
        document.getElementById("data4").value  = "";
        document.getElementById("data5").value  = "";
        document.getElementById("data6").value  = "";
        document.getElementById("data7").value  = "";
        document.getElementById("data8").value  = "";
        document.getElementById("data9").value  = "";
        document.getElementById("rowbar1").value  = "";  
        document.getElementById("rowbar2").value  = "";  
        document.getElementById("rowbar3").value  = "";  
        document.getElementById("rowbar4").value  = "";  
        document.getElementById("rowbar5").value  = "";  
        document.getElementById("rowbar6").value  = "";  
        document.getElementById("rowbar7").value  = "";  
        document.getElementById("rowbar8").value  = "";  
        document.getElementById("rowbar9").value  = "";  
        document.getElementById("colbar1").value  = "";  
        document.getElementById("colbar2").value  = "";  
        document.getElementById("colbar3").value  = "";  
        document.getElementById("colbar4").value  = "";  
        document.getElementById("colbar5").value  = "";  
        document.getElementById("colbar6").value  = "";  
        document.getElementById("colbar7").value  = "";  
        document.getElementById("colbar8").value  = "";  
        document.getElementById("totbar").disabled  = true;  
      })

      // Testing Hypothesis ===========================================================
      d3.select("#execute").on("click",function() {
        // check data, nblock and nkk (treatment)
        nblock = 0;
        for (i=1; i<=5; i++) {
          if(kobs[i] > 0) nblock++;
        }
        for (i=2; i<=nblock; i++) if (kobs[i] != kobs[i-1]) {alert("number of data in each block should be equal"); return;}
        nkk = kobs[1];
        if (nkk < 3 || nkk > 8) {  // wrong input k
          chart.append("text").attr("class","mean").attr("x", 150).attr("y", 100)
             .text("No input or wrong input of data!!   Try again.").style("stroke","red");
          return;
        }
        // RBD
        testingRBD();
        if (sse > 0) {
          drawGraphRBD(nkk, nblock);
          // 1원분산분석표 그리기
          AnovaTableRBD();
        }
      })

      // svg Graph Save
      d3.select("#saveGraphU").on("click", function() {
        var svg = d3.select("#chart");
        var width = svgWidth;
        var height = svgHeight;
        var svgString = getSVGString(svg.node());
        svgString2Image(svgString, width, height, 'png', save);
        function save(dataBlob, filesize) {
          saveAs(dataBlob, 'eStatGraphU.png');
        }
      });

      // save Table
      d3.select("#saveTable").on("click", function() {
        head = '<html><head><meta charset="UTF-8"></head><body>';
        tail = '</body></html>';
        saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatULog.html");
      });

// ANOVA RBD
function testingRBD() {
          // test statistics
          ntot = nkk * nblock;
          dft  = ntot - 1;
          dfb  = nkk - 1;
          dfw  = nblock - 1;
          dfe  = dfb * dfw;
          // total row, col mean
          dmax   = -99999999;
          dmin   =  99999999;
          totbar = 0;
          for (j=0; j<nkk; j++) colbar[j] = 0;
          for (i=0; i<nblock; i++) {
            rowbar[i] = 0;
            for (j=0; j<nkk; j++) {
              rowbar[i] += y[i][j];
              colbar[j] += y[i][j];
              if (y[i][j] > dmax) dmax = y[i][j];
              if (y[i][j] < dmin) dmin = y[i][j];
            }
            totbar += rowbar[i];
          }
          for (j=0; j<nkk; j++) {
            colbar[j] /= nblock;
            str = "colbar"+(j+1);
            document.getElementById(str).value = f3(colbar[j]);
          }
          for (i=0; i<nblock; i++) {
            rowbar[i] /= nkk;
            str = "rowbar"+(i+1);
            document.getElementById(str).value = f3(rowbar[i]);
          }
          totbar = totbar / ntot;
          document.getElementById("totbar").value = f3(totbar);
          // total sum of squares
          sst = 0;
          for (i=0; i<nblock; i++) {
            for (j=0; j<nkk; j++) {
              temp = y[i][j] - totbar
              sst += temp*temp;
            }
          }
          // between & block sum of squares
          ssb = 0;
          for (j=0; j<nkk; j++) {
            temp = colbar[j]-totbar;
            ssb += nblock*temp*temp;
          }
          ssw = 0;
          for (i=0; i<nblock; i++) {
            temp = rowbar[i]-totbar;
            ssw += nkk*temp*temp;
          }
          sse = sst - ssb - ssw;
          if (sse <= 0) {  // wrong input k
            chart.append("text").attr("class","mean").attr("x", 150).attr("y", 100)
                 .text("Error sum of square is zero!!   Try again.").style("stroke","red");
            return;
          }
          // mean squares       
          msb  = ssb / dfb;
          msw  = ssw / dfw;
          mse  = sse / dfe;
          // pvalue
          fobs = msb / mse;
          pvalue = 1 - f_cdf(fobs, dfb, dfe, info);
}  
// 분산분석표 --------------------------------------------------------------------------------------------------
function AnovaTableRBD() {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, temp, info, str;
    var row;
    var num = 0;
    var ncol = 6;
    var k = 0;

    var cell = new Array(ncol);
    table.style.fontSize = "13px";
    table.style.cellPadding = "10";

    row = table.insertRow(num);
    for (j = 0; j < ncol; j++) cell[j] = row.insertCell(j);
    cell[0].innerHTML = "<h3>" + svgStr[15][langNum] + "</h3>"; // "분산분석표";
    cell[0].style.textAlign = "center";
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.border = "1px solid black";
    //          row.style.height ="40px";
    cell[0].style.width = "130px";

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "80px";
    }
    cell[0].innerHTML = svgStr[72][langNum]; // "요인";
    cell[1].innerHTML = svgStr[73][langNum]; // "제곱합";  
    cell[2].innerHTML = svgStr[74][langNum]; // "자유도";  
    cell[3].innerHTML = svgStr[75][langNum]; // "평균제곱";  
    cell[4].innerHTML = "F " + svgStr[69][langNum]; // "F관찰값";   
    cell[5].innerHTML = "p " + svgStr[69][langNum]; // "p-값 =";    

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.border = "1px solid black";
    }
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStr[102][langNum]; // "처리";
    cell[1].innerHTML = f3(ssb).toString();
    cell[2].innerHTML = f0(dfb).toString();
    cell[3].innerHTML = f3(msb).toString();
    cell[4].innerHTML = f3(fobs).toString();
    if (pvalue < 0.0001) str = " < 0.0001";
    else str = f4(pvalue).toString();
    cell[5].innerHTML = str;

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.border = "1px solid black";
    }
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStrU[134][langNum]; // block
    cell[1].innerHTML = f3(ssw).toString();
    cell[2].innerHTML = f0(dfw).toString();
    cell[3].innerHTML = f3(msw).toString();

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.border = "1px solid black";
    }
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStr[77][langNum]; // "오차";
    cell[1].innerHTML = f3(sse).toString();
    cell[2].innerHTML = f0(dfe).toString();
    cell[3].innerHTML = f3(mse).toString();

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.border = "1px solid black";
        cell[j].style.textAlign = "right";
        cell[j].style.backgroundColor = "#eee";
    }
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStr[78][langNum]; // "전체";
    cell[1].innerHTML = f3(sst).toString();
    cell[2].innerHTML = f0(dft).toString();

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";

}
// RBD 그래프 함수 ----------------------------------------------------------------------------------
function drawGraphRBD(nkk, nblock) {
    chart.selectAll("*").remove();
    var i, j, k, m, p, tobs, temp, tlabel, df, info;
    var sx, sy, tx, ty, x1, x2, y1, y2;
    var radius = 4;

    // 점그래프 전체 데이터 최소 최대 계산
    temp    = (dmax - dmin) / 10; // (전체 최대 - 최소) / 10  : 그래프 양 끝쪽 buffer 
    gymin   = dmin - temp;
    gymax   = dmax + temp;
    gyrange = gymax - gymin;
    gxmin   = 0.5;
    gxmax   = nkk + 0.5;
    gxrange = gxmax - gxmin;

    // 그림 캔버스
    chart.append("rect")
        .style("fill", "white")
        .style("stroke", "black")
        .attr("x", margin.left)
        .attr("y", margin.top)
        .attr("width", graphWidth)
        .attr("height", graphHeight)
    // 전체 제목
    str = svgStr[5][langNum] + " by " + svgStrU[134][langNum];
    chart.append("text")
        .attr("x", margin.left + graphWidth/2)
        .attr("y", margin.top / 2 + 10)
        .style("font-size", "17px")
        .style("font-family", "sans-seirf")
        .style("stroke", "black")
        .style("text-anchor", "middle")
        .text(str) // line graph by block
    // X축 제목
    chart.append("text")
        .attr("x", margin.left + graphWidth/2)
        .attr("y", margin.top + graphHeight + margin.bottom / 2 + 10)
        .style("font-size", "14px")
        .style("font-family", "sans-seirf")
        .style("stroke", "black")
        .style("text-anchor", "middle")
        .text(svgStr[102][langNum]) // Treatment
    // Y축
    var yScale = d3.scaleLinear().domain([gymin, gymax]).range([graphHeight, 0]);
    chart.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ") ")
        .call(d3.axisLeft(yScale))

    // 범례
    for (i = 0; i < nblock; i++) {
       chart.append("text")
            .style("font-size", "12px")
            .style("font-family", "sans-seirf")
            .style("text-anchor", "start")
            .style("stroke", myColor[i+1])
            .attr("x", margin.left + graphWidth + 10)
            .attr("y", margin.top + (i+1) * 20)
            .text(block[i]);
    }
    // Treatment
    ty = margin.top + graphHeight + 15;
    for (j = 0; j < nkk; j++) {
        str = (j+1).toString();
        tx  = margin.left + graphWidth * (j+1-gxmin) / gxrange;
        chart.append("text")
            .style("font-size", "10px")
            .style("font-family", "sans-seirf")
            .style("stroke", "black")
            .style("text-anchor", "middle")
            .attr("x", tx)
            .attr("y", ty)
            .text(treat[j]);
    }

    // 블록별 line 그래프
    for (i = 0; i < nblock; i++) {
       sx = margin.left + graphWidth*(1-gxmin)/gxrange;
       sy = margin.top+graphHeight - graphHeight*(y[i][0]-gymin)/gyrange;        
       chart.append("circle")
            .attr("class", "circle")
            .style("fill", myColor[i+1])
            .attr("cx", sx)
            .attr("cy", sy)
            .attr("r", radius)
        // 점그리기 선그리기
        for (j = 1; j < nkk; j++) {
           tx = margin.left + graphWidth*(j+1-gxmin)/gxrange;
           ty = margin.top + graphHeight - graphHeight * (y[i][j] - gymin) / gyrange;
           chart.append("circle")
                .attr("class", "circle")
                .style("fill", myColor[i+1])
                .attr("cx", tx)
                .attr("cy", ty)
                .attr("r", radius)
           chart.append("line")
                .attr("x1", sx)
                .attr("y1", sy)
                .attr("x2", tx)
                .attr("y2", ty)
                .style("stroke", myColor[i+1])
                .style("stroke-width", "3px")
           sx = tx;
           sy = ty;
        } // endof j
    } // endof i

}


