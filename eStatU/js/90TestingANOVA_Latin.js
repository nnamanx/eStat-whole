      var chart = d3.select("#chart");
      var svgWidth    = 600;
      var svgHeight   = 400;
      var margin      = {top: 80, bottom: 60, left: 80, right: 60};
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var i, j, k, dfR, dfC, dfTr, dfe, info, pvalue;
      var sst, ssR, ssC, ssTr, sse, msR, msC, msTr, temp, str; 
      var dmax, dmin;
      var maxk   = 6;
      var maxrow = 6;
      var maxcol = 6;
      var nrow, ncol, nkk, ntot;
      var y = new Array(maxrow);
      for (j=0; j<maxcol; j++) y[j] = new Array(maxcol); 
      var data = new Array(maxk);
      var indx = new Array(maxk);
      var nobs = new Array(maxk);
      for (k=0; k<maxk; k++) {
        data[k] = new Array(maxk); 
        indx[k] = new Array(maxk); 
      }
      var totbar;
      var rowbar = new Array(maxrow);
      var colbar = new Array(maxcol);
      var trtbar = new Array(maxk);
      var treat  = new Array(maxk);
      var tchar  = ["A", "B", "C", "D", "E", "F"];
      for (j=0; j<maxk; j++) treat[j] = svgStr[102][langNum]  + " " + (j+1).toString(); // Treatment

      document.getElementById("rowbar1").disabled = true;  
      document.getElementById("rowbar2").disabled = true;  
      document.getElementById("rowbar3").disabled = true;  
      document.getElementById("rowbar4").disabled = true;  
      document.getElementById("rowbar5").disabled = true;  
      document.getElementById("rowbar6").disabled = true;  
      document.getElementById("colbar1").disabled = true;  
      document.getElementById("colbar2").disabled = true;  
      document.getElementById("colbar3").disabled = true;  
      document.getElementById("colbar4").disabled = true;  
      document.getElementById("colbar5").disabled = true;  
      document.getElementById("colbar6").disabled = true;  
      document.getElementById("trtbar1").disabled = true;  
      document.getElementById("trtbar2").disabled = true;  
      document.getElementById("trtbar3").disabled = true;  
      document.getElementById("trtbar4").disabled = true;  
      document.getElementById("trtbar5").disabled = true;  
      document.getElementById("trtbar6").disabled = true;  
      document.getElementById("totbar").disabled  = true; 
      // 초기 nkk = 3 
      nkk  = 3;
      nrow = nkk;
      ncol = nkk;
      document.getElementById("tkk").innerHTML  = "A, B, C";  
      for (i=0; i<maxrow; i++) {
        for (j=0; j<maxcol; j++) {
          if (i >= nkk || j >= nkk) {
            str = "t"+(i+1).toString()+(j+1).toString();
            document.getElementById(str).innerHTML = "";  
            str = "data"+(i+1).toString()+(j+1).toString();
            document.getElementById(str).disabled = true;  
          }
        }
      }

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        chart.selectAll("*").remove();
        document.getElementById("data11").value = ""; 
        document.getElementById("data12").value = ""; 
        document.getElementById("data13").value = ""; 
        document.getElementById("data14").value = ""; 
        document.getElementById("data15").value = ""; 
        document.getElementById("data16").value = ""; 
        document.getElementById("data21").value = ""; 
        document.getElementById("data22").value = ""; 
        document.getElementById("data23").value = ""; 
        document.getElementById("data24").value = ""; 
        document.getElementById("data25").value = ""; 
        document.getElementById("data26").value = ""; 
        document.getElementById("data31").value = ""; 
        document.getElementById("data32").value = ""; 
        document.getElementById("data33").value = ""; 
        document.getElementById("data34").value = ""; 
        document.getElementById("data35").value = ""; 
        document.getElementById("data36").value = ""; 
        document.getElementById("data41").value = ""; 
        document.getElementById("data42").value = ""; 
        document.getElementById("data43").value = ""; 
        document.getElementById("data44").value = ""; 
        document.getElementById("data45").value = ""; 
        document.getElementById("data46").value = ""; 
        document.getElementById("data51").value = ""; 
        document.getElementById("data52").value = ""; 
        document.getElementById("data53").value = ""; 
        document.getElementById("data54").value = ""; 
        document.getElementById("data55").value = ""; 
        document.getElementById("data56").value = ""; 
        document.getElementById("data61").value = ""; 
        document.getElementById("data62").value = ""; 
        document.getElementById("data63").value = ""; 
        document.getElementById("data64").value = ""; 
        document.getElementById("data65").value = ""; 
        document.getElementById("data66").value = ""; 
        document.getElementById("rowbar1").value = ""; 
        document.getElementById("rowbar2").value = ""; 
        document.getElementById("rowbar3").value = ""; 
        document.getElementById("rowbar4").value = ""; 
        document.getElementById("rowbar5").value = ""; 
        document.getElementById("rowbar6").value = ""; 
        document.getElementById("colbar1").value = ""; 
        document.getElementById("colbar2").value = ""; 
        document.getElementById("colbar3").value = ""; 
        document.getElementById("colbar4").value = ""; 
        document.getElementById("colbar5").value = ""; 
        document.getElementById("colbar6").value = ""; 
        document.getElementById("trtbar1").value = ""; 
        document.getElementById("trtbar2").value = ""; 
        document.getElementById("trtbar3").value = ""; 
        document.getElementById("trtbar4").value = ""; 
        document.getElementById("trtbar5").value = ""; 
        document.getElementById("trtbar6").value = ""; 
      })

      // Testing Hypothesis ===========================================================
      d3.select("#execute").on("click",function() {
        chart.selectAll("*").remove();
        nkk  = parseFloat(document.getElementById("nkk").value);
        nrow = nkk;
        ncol = nkk;      
        // check data, nrow and nkk (treatment)
        for (i=0; i<nkk; i++) {
          for (j=0; j<nkk; j++) {
            str = "data"+(i+1).toString()+(j+1).toString();
            y[i][j] = parseFloat(document.getElementById(str).value); 
            if ( isNaN(y[i][j]) )  {  // wrong input 
              chart.append("text").attr("class","mean").attr("x", 150).attr("y", 100)
                   .text("No input or wrong input of data!!   Try again.")
                   .style("stroke","red");
              return;
            }
          }
        }
        // Latin Square
        testingLatin();
        if (sse > 0) {
          drawGraphLatin(nkk);
          // 1원분산분석표 그리기
          AnovaTableLatin();
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

// ANOVA Latin Square Design
function testingLatin() {
          // test statistics
          ntot = nrow * ncol;
          dfR  = nrow - 1;
          dfC  = ncol - 1;
          dfTr = nkk - 1;
          dfe  = nkk*nkk - 3*nkk + 2;
          dft  = nkk * nkk -1;
          // total row, col mean
          dmax   = -99999999;
          dmin   =  99999999;
          totbar = 0;
          for (j=0; j<ncol; j++) colbar[j] = 0;
          for (i=0; i<nrow; i++) {
            rowbar[i] = 0;
            for (j=0; j<ncol; j++) {
              rowbar[i] += y[i][j];
              colbar[j] += y[i][j];
              if (y[i][j] > dmax) dmax = y[i][j];
              if (y[i][j] < dmin) dmin = y[i][j];
            }
            totbar += rowbar[i];
          }
          for (j=0; j<ncol; j++) {
            colbar[j] /= nrow;
            str = "colbar"+(j+1);
            document.getElementById(str).value = f3(colbar[j]);
          }
          for (i=0; i<nrow; i++) {
            rowbar[i] /= ncol;
            str = "rowbar"+(i+1);
            document.getElementById(str).value = f3(rowbar[i]);
          }
          totbar = totbar / ntot;
          document.getElementById("totbar").value = f3(totbar);
          // total sum of squares
          sst = 0;
          for (i=0; i<nrow; i++) {
            for (j=0; j<nkk; j++) {
              temp = y[i][j] - totbar
              sst += temp*temp;
            }
          }
          // row & col sum of squares
          ssR = 0;
          for (i=0; i<nrow; i++) {
            temp = rowbar[i]-totbar;
            ssR += nrow*temp*temp;
          }
          ssC = 0;
          for (j=0; j<ncol; j++) {
            temp = colbar[j]-totbar;
            ssC += nrow*temp*temp;
          }
          // treatment sum of squares
          for (k=0; k<nkk; k++) {
            trtbar[k] = 0;
            nobs[k]   = 0;
          }
          for (i=0; i<nrow; i++) {
            for (j=0; j<ncol; j++) {
              k = (i+j) % nkk
              data[k][nobs[k]] = y[i][j];
              indx[k][nobs[k]] = "R"+(i+1).toString()+"C"+(j+1).toString();
              trtbar[k] += y[i][j];
              nobs[k]++;
            }
          }
          for (k=0; k<nkk; k++) {
            trtbar[k] /= nkk;
            str = "trtbar"+(k+1);
            document.getElementById(str).value = f3(trtbar[k]);
          }
          ssTr = 0;
          for (k=0; k<nkk; k++) {
            temp = trtbar[k]-totbar;
            ssTr += nkk*temp*temp;
          }

          sse = sst - ssR - ssC - ssTr;
          if (sse <= 0) {  // wrong input k
            chart.append("text").attr("class","mean").attr("x", 150).attr("y", 100)
                 .text("Error sum of square is zero!!   Try again.").style("stroke","red");
            return;
          }
          // mean squares  
          msTr = ssTr / dfTr     
          msR  = ssR  / dfR;
          msC  = ssC  / dfC;
          mse  = sse  / dfe;
          // pvalue
          fobs = msTr / mse;
          pvalue = 1 - f_cdf(fobs, dfTr, dfe, info);

}  
// 분산분석표 --------------------------------------------------------------------------------------------------
function AnovaTableLatin() {
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
    cell[1].innerHTML = f3(ssTr).toString();
    cell[2].innerHTML = f0(dfTr).toString();
    cell[3].innerHTML = f3(msTr).toString();
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
    cell[0].innerHTML = svgStrU[32][langNum]; // Row var
    cell[1].innerHTML = f3(ssR).toString();
    cell[2].innerHTML = f0(dfR).toString();
    cell[3].innerHTML = f3(msR).toString();

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.border = "1px solid black";
    }
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStrU[33][langNum]; // column var
    cell[1].innerHTML = f3(ssC).toString();
    cell[2].innerHTML = f0(dfC).toString();
    cell[3].innerHTML = f3(msC).toString();

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
// Latin 그래프 함수 ----------------------------------------------------------------------------------
function drawGraphLatin(nkk) {
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
    str = svgStr[6][langNum] + " by " + svgStr[102][langNum];
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
    str = "---  " + svgStr[34][langNum];
    chart.append("text")
         .style("font-size", "12px")
         .style("font-family", "sans-seirf")
         .style("text-anchor", "start")
         .style("stroke", "red")
         .attr("x", margin.left + graphWidth + 10)
         .attr("y", margin.top + 20)
         .text(str);
    // Treatment
    ty = margin.top + graphHeight + 15;
    for (k = 0; k < nkk; k++) {
        str = (k+1).toString();
        tx  = margin.left + graphWidth * (k+1-gxmin) / gxrange;
        chart.append("text")
            .style("font-size", "10px")
            .style("font-family", "sans-seirf")
            .style("stroke", myColor[k+1])
            .style("text-anchor", "middle")
            .attr("x", tx)
            .attr("y", ty)
            .text(treat[k]);
    }
    // 각 treatment의 data 별로 점그래프
    for (k=0; k<nkk; k++) {
      for (j=0; j<nkk; j++) {
           tx = margin.left + graphWidth*(k+1-gxmin)/gxrange;
           ty = margin.top + graphHeight - graphHeight * (data[k][j] - gymin) / gyrange;
           chart.append("circle")
                .attr("class", "circle")
                .style("fill", myColor[k+1])
                .attr("cx", tx)
                .attr("cy", ty)
                .attr("r", "3")
           chart.append("text")
                .style("font-size", "8px")
                .style("font-family", "sans-seirf")
                .style("text-anchor", "start")
                .style("stroke", myColor[k+1])
                .attr("x", tx+5)
                .attr("y", ty+3)
                .text(indx[k][j]);
       } // endof j
    } // endo of k
    // 점그래프 - 평균 line 그래프
       sx = margin.left + graphWidth*(1-gxmin)/gxrange;
       sy = margin.top+graphHeight - graphHeight * (trtbar[0] - gymin) / gyrange;        
       chart.append("circle")
            .attr("class", "circle")
            .style("fill", "red")
            .attr("cx", sx)
            .attr("cy", sy)
            .attr("r", radius)
       // 점그리기 선그리기
       for (j = 1; j < nkk; j++) {
           tx = margin.left + graphWidth*(j+1-gxmin)/gxrange;
           ty = margin.top + graphHeight - graphHeight * (trtbar[j] - gymin) / gyrange;
           chart.append("circle")
                .attr("class", "circle")
                .style("fill", "red")
                .attr("cx", tx)
                .attr("cy", ty)
                .attr("r", radius)
           chart.append("line")
                .attr("x1", sx)
                .attr("y1", sy)
                .attr("x2", tx)
                .attr("y2", ty)
                .style("stroke", "red")
                .style("stroke-width", "3px")
           sx = tx;
           sy = ty;
       } // endof j
}
// Treatment character 
function showValueAlpha(newValue) {
      nkk  = parseFloat(document.getElementById("nkk").value);
      nrow = nkk;
      ncol = nkk;
      str  = "A";
      for (k=1; k<nkk; k++) str = str + "," + tchar[k] ;
      document.getElementById("tkk").innerHTML = str; 

      for (i=0; i<maxrow; i++) {
          for (j=0; j<maxcol; j++) {
            str = "t"+(i+1).toString()+(j+1).toString();
            document.getElementById(str).innerHTML = "";  
            str = "data"+(i+1).toString()+(j+1).toString();
            document.getElementById(str).disabled = false  
          }
      }
      for (i=0; i<nrow; i++) {
          for (j=0; j<ncol; j++) {
            str = "t"+(i+1).toString()+(j+1).toString();
            document.getElementById(str).innerHTML = tchar[(i+j) % nkk];  
          }
      }
      for (i=0; i<maxrow; i++) {
        for (j=0; j<maxcol; j++) {
          if (i >= nkk || j >= nkk) {
            str = "t"+(i+1).toString()+(j+1).toString();
            document.getElementById(str).innerHTML = "";  
            str = "data"+(i+1).toString()+(j+1).toString();
            document.getElementById(str).disabled = true;  
          }
        }
      }

} 
