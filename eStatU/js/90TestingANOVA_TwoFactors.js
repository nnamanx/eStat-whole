      var chart = d3.select("#chart");
      var svgWidth    = 600;
      var svgHeight   = 400;
      var margin      = {top: 80, bottom: 60, left: 80, right: 80};
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var i, j, k, dfa, dfb, dfab, dfe, dft, info;
      var sst, ssa, ssb, ssab, sse, msa, msb, msab, mse, temp; 
      var fobs1, fobs2, fobs3, pvalue1, pvalue2, pvalue3;
      var dmax, dmin;
      var maxA = 5;
      var maxB = 5;
      var maxK = 5;
      var nnA, nnB, nnK;
      var totbar;
      var y     = new Array(maxB);
      var yobs  = new Array(maxB);
      var ymean = new Array(maxB);
      for (i = 0; i < maxB; i++) {
        y[i]     = new Array(maxA)
        yobs[i]  = new Array(maxA)
        ymean[i] = new Array(maxA);
      }
      for (i = 0; i < maxB; i++) 
        for (j = 0; j < maxA; j++) 
          y[i][j] = new Array(maxK);
      var robs  = new Array(maxB);
      var rmean = new Array(maxB);
      var rname = new Array(maxB);
      var cobs  = new Array(maxA)
      var cmean = new Array(maxA)
      var cname = new Array(maxA)    
      var tobs, tmean;
      for (j=0; j<maxA; j++) cname[j] = "Factor A " + (j+1).toString(); 
      for (i=0; i<maxB; i++) rname[i] = "Factor B " + (i+1).toString(); 

      document.getElementById("rowbar1").disabled = true;  
      document.getElementById("rowbar2").disabled = true;  
      document.getElementById("rowbar3").disabled = true;  
      document.getElementById("rowbar4").disabled = true;  
      document.getElementById("colbar1").disabled = true;  
      document.getElementById("colbar2").disabled = true;  
      document.getElementById("colbar3").disabled = true;  
      document.getElementById("colbar4").disabled = true;  
      document.getElementById("totbar").disabled  = true;  

      // input data control ===================================================
      d3.select("#data11").on("input", function() {
        stat = simplestat("#data11");  
        y[1][1] = data;
        if (document.getElementById("data11").value == "") yobs[1][1] = 0;
        else yobs[1][1] = y[1][1].length;
      });
      d3.select("#data12").on("input", function() {
        stat = simplestat("#data12");  
        y[1][2] = data; 
        if (document.getElementById("data12").value == "") yobs[1][2] = 0;
        else yobs[1][2] = y[1][2].length;
      });
      d3.select("#data13").on("input", function() {
        stat = simplestat("#data13");  
        y[1][3] = data;
        if (document.getElementById("data13").value == "") yobs[1][3] = 0;
        else yobs[1][3] = y[1][3].length;
      });
      d3.select("#data14").on("input", function() {
        stat = simplestat("#data14");  
        y[1][4] = data;
        if (document.getElementById("data14").value == "") yobs[1][4] = 0;
        else yobs[1][4] = y[1][4].length;
      });
      d3.select("#data21").on("input", function() {
        stat = simplestat("#data21");  
        y[2][1] = data;
        if (document.getElementById("data21").value == "") yobs[2][1] = 0;
        else yobs[2][1] = y[2][1].length;
      });
      d3.select("#data22").on("input", function() {
        stat = simplestat("#data22");  
        y[2][2] = data; 
        if (document.getElementById("data22").value == "") yobs[2][2] = 0;
        else yobs[2][2] = y[2][2].length;
      });
      d3.select("#data23").on("input", function() {
        stat = simplestat("#data23");  
        y[2][3] = data;
        if (document.getElementById("data23").value == "") yobs[2][3] = 0;
        else yobs[2][3] = y[2][3].length;
      });
      d3.select("#data24").on("input", function() {
        stat = simplestat("#data24");  
        y[2][4] = data;
        if (document.getElementById("data24").value == "") yobs[2][4] = 0;
        else yobs[2][4] = y[2][4].length;
      });
      d3.select("#data31").on("input", function() {
        stat = simplestat("#data31");  
        y[3][1] = data;
        if (document.getElementById("data31").value == "") yobs[3][1] = 0;
        else yobs[3][1] = y[3][1].length;
      });
      d3.select("#data32").on("input", function() {
        stat = simplestat("#data32");  
        y[3][2] = data; 
        if (document.getElementById("data32").value == "") yobs[3][2] = 0;
        else yobs[3][2] = y[3][2].length;
      });
      d3.select("#data33").on("input", function() {
        stat = simplestat("#data33");  
        y[3][3] = data;
        if (document.getElementById("data33").value == "") yobs[3][3] = 0;
        else yobs[3][3] = y[3][3].length;
      });
      d3.select("#data34").on("input", function() {
        stat = simplestat("#data34");  
        y[3][4] = data;
        if (document.getElementById("data34").value == "") yobs[3][4] = 0;
        else yobs[3][4] = y[3][4].length;
      });
      d3.select("#data41").on("input", function() {
        stat = simplestat("#data41");  
        y[4][1] = data;
        if (document.getElementById("data41").value == "") yobs[4][1] = 0;
        else yobs[4][1] = y[4][1].length;
      });
      d3.select("#data42").on("input", function() {
        stat = simplestat("#data42");  
        y[4][2] = data; 
        if (document.getElementById("data42").value == "") yobs[4][2] = 0;
        else yobs[4][2] = y[4][2].length;
      });
      d3.select("#data43").on("input", function() {
        stat = simplestat("#data43");  
        y[4][3] = data;
        if (document.getElementById("data43").value == "") yobs[4][3] = 0;
        else yobs[4][3] = y[4][3].length;
      });
      d3.select("#data44").on("input", function() {
        stat = simplestat("#data44");  
        y[4][4] = data;
        if (document.getElementById("data44").value == "") yobs[4][4] = 0;
        else yobs[4][4] = y[4][4].length;
      });

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        chart.selectAll("*").remove();
        document.getElementById("data11").value  = "";
        document.getElementById("data12").value  = "";
        document.getElementById("data13").value  = "";
        document.getElementById("data14").value  = "";
        document.getElementById("data21").value  = "";
        document.getElementById("data22").value  = "";
        document.getElementById("data23").value  = "";
        document.getElementById("data24").value  = "";
        document.getElementById("data31").value  = "";
        document.getElementById("data32").value  = "";
        document.getElementById("data33").value  = "";
        document.getElementById("data34").value  = "";
        document.getElementById("data41").value  = "";
        document.getElementById("data42").value  = "";
        document.getElementById("data43").value  = "";
        document.getElementById("data44").value  = "";
        document.getElementById("rowbar1").value = "";  
        document.getElementById("rowbar2").value = "";  
        document.getElementById("rowbar3").value = "";  
        document.getElementById("rowbar4").value = "";  
        document.getElementById("colbar1").value = "";  
        document.getElementById("colbar2").value = "";  
        document.getElementById("colbar3").value = "";  
        document.getElementById("colbar4").value = "";  
        document.getElementById("totbar").value  = "";  
      })

      // Testing Hypothesis ===========================================================
      d3.select("#execute").on("click",function() {
        chart.selectAll("*").remove();
        // check data, nnA, nnB, nnK 
        tobs = 0;
        for (j=1; j<maxA; j++) cobs[j] = 0;
        for (i=1; i<maxB; i++) {
          robs[i] = 0;
          for(j=1; j<maxA; j++) {
             if (yobs[i][j] > 0) {
               robs[i] += yobs[i][j];
               cobs[j] += yobs[i][j];
             }
          }
          tobs += robs[i];
        }   
        nnB = 0;
        for (i=1; i<maxB; i++) {
          if (robs[i] > 0) nnB++;
        }
        nnA = 0;
        for (j=1; j<maxA; j++) {
          if (cobs[j] > 0) nnA++
        } 
        nnK = yobs[1][1];
        for (i=1; i<=nnB; i++) {
          for (j=1; j<=nnA; j++) {
            if (yobs[i][j] != nnK) {  // wrong input k
              chart.append("text").attr("class","mean").attr("x", 150).attr("y", 100)
                   .text("All data size should be the same!!   Try again.").style("stroke","red");
              return;
            }
          }
        }
        // Two way ANOVA
        testingANOVA2();
        if (sse > 0) {
          drawANOVA2(nnA,nnB);
          // 2원분산분석표 그리기
          Anova2Table();
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

// ANOVA2 
function testingANOVA2() {
          // test statistics
          dft  = tobs - 1;
          dfa  = nnA - 1;
          dfb  = nnB - 1;
          dfab = dfa * dfb;
          dfe  = tobs - nnA*nnB;
          // total row, col mean
          dmax   = -99999999;
          dmin   =  99999999;
          tmean = 0;
          for (j=1; j<=nnA; j++) cmean[j] = 0;
          for (i=1; i<=nnB; i++) {
            rmean[i] = 0;
            for (j=1; j<=nnA; j++) {
              ymean[i][j] = 0;
              for (k=0; k<nnK; k++) ymean[i][j] += y[i][j][k];
              rmean[i] += ymean[i][j];
              cmean[j] += ymean[i][j];
              ymean[i][j] /= yobs[i][j];
              if (ymean[i][j] > dmax) dmax = ymean[i][j];
              if (ymean[i][j] < dmin) dmin = ymean[i][j];
            }
            tmean += rmean[i];
          }
          for (j=1; j<=nnA; j++) {
            cmean[j] /= cobs[j];
            str = "colbar"+j;
            document.getElementById(str).value = f3(cmean[j]);
          }
          for (i=1; i<=nnB; i++) {
            rmean[i] /= robs[i];
            str = "rowbar"+i;
            document.getElementById(str).value = f3(rmean[i]);
          }

          tmean = tmean / tobs;
          document.getElementById("totbar").value = f3(tmean);
          // total sum of squares
          sst = 0;
          for (i=1; i<=nnB; i++) {
            for (j=1; j<=nnA; j++) {
              for (k=0; k<nnK; k++) {
                temp = y[i][j][k] - tmean;
                sst += temp*temp;
              }
            }
          }

          // Error SS
          sse  = 0;
          for (i=1; i<=nnB; i++) {
            for (j=1; j<=nnA; j++) {
              for (k=0; k<nnK; k++) {
                temp = y[i][j][k] - ymean[i][j];
                sse += temp*temp;
              }
            }
          }
          if (sse <= 0) {  // wrong input k
            chart.append("text").attr("class","mean").attr("x", 150).attr("y", 100)
                 .text("Error sum of square is zero!!   Try again.").style("stroke","red");
            return;
          }

          // Interaction SS
          ssab = 0;
          for (i=1; i<=nnB; i++) {
            for (j=1; j<=nnA; j++) {
              temp = ymean[i][j] - rmean[i] - cmean[j] + tmean;
              ssab += nnK*temp*temp;
            }
          }

          // Factor A and B sum of squares
          ssa = 0;
          for (j=1; j<=nnA; j++) {
            temp = cmean[j]-tmean;
            ssa += cobs[j]*temp*temp;
          }

          ssb = 0;
          for (i=1; i<=nnB; i++) {
            temp = rmean[i]-tmean;
            ssb += robs[i]*temp*temp;
          }

          // mean squares   
          msa  = ssa / dfa;
          msb  = ssb / dfb;
          msab = ssab / dfab;
          mse  = sse / dfe;
          // pvalue
          fobs1 = msa / mse;
          fobs2 = msb / mse;
          fobs3 = msab / mse;
          pvalue1 = 1 - f_cdf(fobs1, dfa, dfe, info);
          pvalue2 = 1 - f_cdf(fobs2, dfb, dfe, info);
          pvalue3 = 1 - f_cdf(fobs3, dfab, dfe, info);

}  
// 분산분석표 --------------------------------------------------------------------------------------------------
function Anova2Table() {
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
    for (j = 0; j < nnA+2; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "80px";
    }
    cell[0].innerHTML = svgStr[34][langNum]; // "Mean";
    for (j = 1; j <= nnA; j++) cell[j].innerHTML = svgStr[72][langNum] + " A " + j ; // "Factor";  
    cell[nnA+1].innerHTML = svgStr[34][langNum]; // "Mean";

    for (i=1; i<=nnB; i++) {
      row = table.insertRow(++num);
      for (j = 0; j < nnA+2; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "80px";
      }
      cell[0].style.textAlign = "center";
      for (j = 1; j < nnA+2; j++) {
        cell[j].style.textAlign = "right";
      }
      cell[0].innerHTML = svgStr[72][langNum] + " B " + i; // "요인";
      for (j=1; j<=nnA; j++) cell[j].innerHTML = f3(ymean[i][j]); 
      cell[nnA+1].innerHTML = f3(rmean[i]); 
      cell[nnA+1].style.backgroundColor = "#eee";
    }

    row = table.insertRow(++num);
    for (j = 0; j < nnA+2; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "80px";
    }
    cell[0].style.textAlign = "center";
    for (j = 1; j < nnA+2; j++) {
        cell[j].style.textAlign = "right";
    }
    cell[0].innerHTML = svgStr[34][langNum]; // "Mean";
    for (j = 1; j <= nnA; j++) cell[j].innerHTML = f3(cmean[j]);  
    cell[nnA+1].innerHTML = f3(tmean); 

    row = table.insertRow(++num);

    row = table.insertRow(++num);
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
    cell[0].innerHTML = "A"; 
    cell[1].innerHTML = f3(ssa).toString();
    cell[2].innerHTML = f0(dfa).toString();
    cell[3].innerHTML = f3(msa).toString();
    cell[4].innerHTML = f3(fobs1).toString();
    if (pvalue1 < 0.0001) str = " < 0.0001";
    else str = f4(pvalue1).toString();
    cell[5].innerHTML = str;

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.border = "1px solid black";
    }
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = "B"; 
    cell[1].innerHTML = f3(ssb).toString();
    cell[2].innerHTML = f0(dfb).toString();
    cell[3].innerHTML = f3(msb).toString();
    cell[4].innerHTML = f3(fobs2).toString();
    if (pvalue2 < 0.0001) str = " < 0.0001";
    else str = f4(pvalue2).toString();
    cell[5].innerHTML = str;

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.border = "1px solid black";
    }
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStr[103][langNum]; // Interaction
    cell[1].innerHTML = f3(ssab).toString();
    cell[2].innerHTML = f0(dfab).toString();
    cell[3].innerHTML = f3(msab).toString();
    cell[4].innerHTML = f3(fobs3).toString();
    if (pvalue3 < 0.0001) str = " < 0.0001";
    else str = f4(pvalue3).toString();
    cell[5].innerHTML = str;

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
// 그래프 함수 ----------------------------------------------------------------------------------
function drawANOVA2(nnA,nnB) {
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
    gxmax   = nnA + 0.5;
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
    chart.append("text")
        .attr("x", margin.left + graphWidth/2)
        .attr("y", margin.top / 2 + 10)
        .style("font-size", "17px")
        .style("font-family", "sans-seirf")
        .style("stroke", "black")
        .style("text-anchor", "middle")
        .text(svgStr[109][langNum]) // line graph by block
    // X축 제목
    chart.append("text")
        .attr("x", margin.left + graphWidth/2)
        .attr("y", margin.top + graphHeight + margin.bottom / 2 + 10)
        .style("font-size", "14px")
        .style("font-family", "sans-seirf")
        .style("stroke", "black")
        .style("text-anchor", "middle")
        .text(svgStr[72][langNum]+" A") // Factor
    // Y축
    var yScale = d3.scaleLinear().domain([gymin, gymax]).range([graphHeight, 0]);
    chart.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ") ")
        .call(d3.axisLeft(yScale))

    // 범례
    for (i = 0; i < nnB; i++) {
       chart.append("text")
            .style("font-size", "12px")
            .style("font-family", "sans-seirf")
            .style("text-anchor", "start")
            .style("stroke", myColor[i+1])
            .attr("x", margin.left + graphWidth + 10)
            .attr("y", margin.top + (i+1) * 20)
            .text(rname[i]);
    }
    // Treatment
    ty = margin.top + graphHeight + 15;
    for (j = 0; j < nnA; j++) {
        str = (j+1).toString();
        tx  = margin.left + graphWidth * (j+1-gxmin) / gxrange;
        chart.append("text")
            .style("font-size", "10px")
            .style("font-family", "sans-seirf")
            .style("stroke", "black")
            .style("text-anchor", "middle")
            .attr("x", tx)
            .attr("y", ty)
            .text(cname[j]);
    }

    // Factor B별 line 그래프
    for (i = 0; i < nnB; i++) {
       sx = margin.left + graphWidth*(1-gxmin)/gxrange;
       sy = margin.top+graphHeight - graphHeight*(ymean[i+1][1]-gymin)/gyrange;        
       chart.append("circle")
            .attr("class", "circle")
            .style("fill", myColor[i+1])
            .attr("cx", sx)
            .attr("cy", sy)
            .attr("r", radius)
        // 점그리기 선그리기
        for (j = 1; j < nnA; j++) {
           tx = margin.left + graphWidth*(j+1-gxmin)/gxrange;
           ty = margin.top + graphHeight - graphHeight * (ymean[i+1][j+1] - gymin) / gyrange;
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

