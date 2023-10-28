      var svg     = d3.select("#chart"); 
      var i, j, r;
      var svgWidth    = 620;
      var svgHeight   = 400;
      var margin      = {top: 80, bottom: 50, left: 60, right: 60};
      var buffer      = 40;
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var checkTitle  = true;
      var mTitle, yTitle, xTitle;
      var tobs, sst, sse, temp, model, str, diffobs;
      var diff      = 0;
      var arP       = 0;
      var nforecast = 0;
      var xobs, xmin, xmax, xgap, gxmin, gxmax, gxrange;
      var yobs, ymin, ymax, ygap, gymin, gymax, gyrange;
      var x1, x2, y1, y2;
      var fontsize = "1em";
      var alpha = 0.05;
      var df, info, tvalue; 
      var numACF    = 20;
      var stat1     = new Array(30);
      var tstat     = new Array(30);
      var Beta      = new Array(30);
      var statF     = new Array(30);
      var Cii       = new Array(30);
      var acf       = new Array(numACF);
      var pacf      = new Array(numACF);
      var phi       = new Array(numACF);
      for (j = 0; j < numACF; j++) {
        phi[j] = new Array(numACF);
      }
      var rowmax    = 200;
      var tdata     = new Array(rowmax);
      var xdata     = new Array(rowmax);
      var ydata     = new Array(rowmax);
      var ydiff     = new Array(rowmax);
      var yhatd     = new Array(rowmax);
      var yhat      = new Array(rowmax);
      var clow      = new Array(rowmax);
      var clowd     = new Array(rowmax);
      var chigh     = new Array(rowmax);
      var chighd    = new Array(rowmax);
      var csize     = new Array(rowmax);
      var tempw     = new Array(rowmax);
      var tempx     = new Array(rowmax);
      var tempy     = new Array(rowmax);
      var checkForecast = false;
      var clickExecute  = false;
      var nvar      = 10;
      var X         = new Array(nvar)
      var sumX      = new Array(nvar)
      var invXPX    = new Array(nvar);
      for (j = 0; j < nvar; j++) {
        invXPX[j] = new Array(nvar);
      }
      xTitle = "t";
      document.getElementById("nn41").disabled = true;    
      svg.selectAll("*").remove();
      // input data control ===================================================
      d3.select("#data2").on("input", function() {
        stat = simplestat("#data2");  
        ydata = data; 
        yobs = stat.n;
      });
      updateData = function() {
        document.getElementById("data2").value = '';    
      }
    
      d3.select("#execute").on("click", function(){ 
          clickExecute = true;
          document.getElementById("diff").value = 0;
          document.getElementById("arP").value  = 0;
          document.getElementById("nn42").value = 0;
          svg.selectAll("*").remove();  // 전화면 제거
          tobs = yobs;
          if (tobs < numACF) numACF = tobs-3;
          else if (tobs > 20) {
            numACF = Math.floor( (tobs)/ 2);
          }
          // 입력 도수에 숫자 문자 빈칸 있나 체크
          for (i=0; i<tobs; i++) {
            if ( isNaN(ydata[i]) ) {
              svg.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
          }
          // title
          mTitle = d3.select("#mtitle").node().value;
          yTitle = d3.select("#ytitle").node().value;
          // time 1,2,... 통계량
          tobs = yobs;
          nforecast = 0;
          for (i = 0; i < tobs; i++) {
            tdata[i] = i + 1;   // time 1,2,3...
            xdata[i] = tdata[i];
            ydiff[i] = ydata[i];
          }
          model1Stat(tobs, tdata, xdata, ydata, stat1);
          sst = stat1[20];
          document.getElementById("nn41").value   = yobs;
          initialCordinate(tobs, tdata, ydata);    
          model = 1;
          showTimeSeriesPlot(model, tobs, nforecast, tdata, ydata, checkTitle);
          // draw ACF
          diff = 0;
          diffobs = tobs;
          for (i=0; i<tobs; i++) ydiff[i] = ydata[i];
          autocorrelation(tobs, diff, ydiff, acf)
          strModel = "Autocorrelation function";
          ibegin = 0;
          iend = numACF-1;
          showTimeSeriesPlot3(strModel, tobs, ibegin, iend, xdata, ydata, acf);
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
      // create Correlation Table
      d3.select("#corrTable").on("click", function() {
         partialACF(tobs, diff, ydiff);
         correlationTable(numACF-1, acf, pacf);
      });

      // create Regression Table
      d3.select("#regressionTable").on("click", function() {
         if (arP > 0) regressionTable2(arP+1, diffobs) 
      });
      // create forecasting Table
      d3.select("#forecastTable").on("click", function() {
          if ( nforecast == 0 ) { alert("Enter forecasting period"); return; }
          if ( document.getElementById("rawData").checked == false ) { alert("Check Raw Data"); return; }
          forecastTable(model, tobs, nforecast);  
      });
      // save Table
      d3.select("#saveTable").on("click", function() {
        head = '<html><head><meta charset="UTF-8"></head><body>';
        tail = '</body></html>';
        saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatULog.html");
      });
// AR forecasting 그리기 함수 - diff data
function drawAR() {
      if ( clickExecute == false ) {alert("No data"); return;}
      var cx, cy;
      var x1, y1, x2, y2;
      svg.selectAll("*").remove();
      arP = parseInt(d3.select("#arP").node().value);
      strModel = "AR("+arP+")";
      arPRegression(diffobs, arP, ydiff, Beta, statF)
      model = 1;
      if ( document.getElementById("diffData").checked ) {
        showTimeSeriesPlot(model, diffobs, nforecast, tdata, ydiff, checkTitle);
      }
      else { // raw data
        showTimeSeriesPlot(model, diffobs, nforecast, tdata, ydata, checkTitle);
        drawRawForecastAR(); 
        return;
      }
      // forecasting difference
        df = diffobs - arP - 1;
        tvalue = t_inv(1-alpha/2, df, info);
        for (i = arP+1; i<diffobs+nforecast+diff; i++) {
          yhatd[i] = Beta[0];
          X[0] = 1;
          for (j=1; j<arP+1; j++) {
            if ( (i-j) < diffobs ) X[j] = ydiff[i-j];
            else X[j] = yhatd[i-j];
            yhatd[i] += Beta[j]*X[j];
          }
          for (j=0; j<arP+1; j++) {
            sumX[j] = 0;
            for (k=0; k<arP+1; k++) {
              sumX[j] += X[k]*invXPX[k][j];
            }
          }
          temp = 0;
          for (j=0; j<arP+1; j++) {
            temp += sumX[j]*X[j];
          }
          csize[i] = tvalue * Math.sqrt(statF[8]*temp);
          clowd[i]  = yhatd[i] - csize[i];
          chighd[i] = yhatd[i] + csize[i];
        }
     if (nforecast > 0) {
        // confidence interval
        confidenceBand(model, diffobs, nforecast, clowd, chighd);
     }
     // draw forecasting
     for (i=arP+1; i<diffobs+nforecast; i++) {
          cx = margin.left+graphWidth*(tdata[i]-gxmin)/gxrange;
          cy = margin.top+graphHeight-graphHeight*(yhatd[i]-gymin)/gyrange; 
          svg.append("circle").attr("class","ar")
             .attr("cx", cx)
             .attr("cy", cy)         
             .attr("r", 3)
             .style("fill",myColor[1])
     }
     x1  = margin.left + graphWidth*(tdata[arP+1]-gxmin)/gxrange;
     y1  = margin.top  + graphHeight - graphHeight*(yhatd[arP+1]-gymin)/gyrange;
     for (i=arP+2; i<diffobs+nforecast; i++) {
         x2 = margin.left + graphWidth*(tdata[i]-gxmin)/gxrange;
         y2 = margin.top  + graphHeight - graphHeight*(yhatd[i]-gymin)/gyrange;
         svg.append("line").attr("class","ar")
                .attr("x1",x1)
                .attr("y1",y1)
                .attr("x2",x2)
                .attr("y2",y2)
                .style("stroke",myColor[1]) 
         x1 = x2;
         y1 = y2;
     }
     if(checkTitle) {   
        svg.append("text").attr("class","ar")
                .attr("x", margin.left + 20)
                .attr("y", margin.top + 20)
                .text(strModel)
                .style("stroke",myColor[1]) 
     }
}
// AR forecasting 그리기 함수 - Raw data
function drawRawForecastAR() {
      var cx, cy;
      var x1, y1, x2, y2;
      var temp, temp1, temp2, temp3;
      strModel = "AR("+arP+")";
      // forecasting
    if (diff == 0) {
      for (i = arP+1; i<tobs+nforecast; i++) {
         tdata[i] = i+1;
         yhat[i] = Beta[0];
         for (j=1; j<arP+1; j++) {
           if ( (i-j) < tobs ) temp = ydata[i-j];
           else temp = yhat[i-j];
           yhat[i] += Beta[j]*temp;
         }
         clow[i]  = yhat[i] - csize[i];
         chigh[i] = yhat[i] + csize[i];
      }
    } 
    else if (diff == 1) {
      for (i = arP+diff+1; i<tobs+nforecast; i++) {
         tdata[i] = i+1;
         if ( (i-1) < tobs ) temp1 = ydata[i-1];
         else temp1 = yhat[i-1];
         yhat[i] = temp1 + Beta[0];
         for (j=1; j<arP+1; j++) {
           if ( (i-j) < tobs ) temp = ydata[i-j];
           else temp = yhat[i-j];
           if ( (i-j-1) < tobs ) temp1 = ydata[i-j-1];
           else temp1 = yhat[i-j-1];
           yhat[i] += Beta[j]*(temp - temp1);
         }
         clow[i]  = yhat[i] - csize[i];
         chigh[i] = yhat[i] + csize[i];
      }
    } 
    else if (diff == 2) {
      for (i = arP+diff+1; i<tobs+nforecast; i++) {
         tdata[i] = i+1;
         if ( (i-1) < tobs ) temp1 = ydata[i-1];
         else temp1 = yhat[i-1];
         if ( (i-2) < tobs ) temp2 = ydata[i-2];
         else temp2 = yhat[i-2];
         yhat[i] = 2*temp1 - temp2 + Beta[0];
         for (j=1; j<arP+1; j++) {
           if ( (i-j) < tobs ) temp = ydata[i-j];
           else temp = yhat[i-j];
           if ( (i-j-1) < tobs ) temp1 = ydata[i-j-1];
           else temp1 = yhat[i-j-1];
           if ( (i-j-2) < tobs ) temp2 = ydata[i-j-2];
           else temp2 = yhat[i-j-2];
           yhat[i] += Beta[j]*(temp - 2*temp1 + temp2);
         }
         clow[i]  = yhat[i] - csize[i];
         chigh[i] = yhat[i] + csize[i];
      }
    } 
    else if (diff == 3) {
      for (i = arP+diff+1; i<tobs+nforecast; i++) {
         tdata[i] = i+1;
         if ( (i-1) < tobs ) temp1 = ydata[i-1];
         else temp1 = yhat[i-1];
         if ( (i-2) < tobs ) temp2 = ydata[i-2];
         else temp2 = yhat[i-2];
         if ( (i-3) < tobs ) temp3 = ydata[i-3];
         else temp3 = yhat[i-3];
         yhat[i] = 3*temp1 - 3*temp2 + temp3 + Beta[0];
         for (j=1; j<arP+1; j++) {
           if ( (i-j) < tobs ) temp = ydata[i-j];
           else temp = yhat[i-j];
           if ( (i-j-1) < tobs ) temp1 = ydata[i-j-1];
           else temp1 = yhat[i-j-1];
           if ( (i-j-2) < tobs ) temp2 = ydata[i-j-2];
           else temp2 = yhat[i-j-2];
           if ( (i-j-3) < tobs ) temp3 = ydata[i-j-3];
           else temp3 = yhat[i-j-3];
           yhat[i] += Beta[j]*(temp - 3*temp1 + 3*temp2 - temp3);
         }
         clow[i]  = yhat[i] - csize[i];
         chigh[i] = yhat[i] + csize[i];
      }
    }
    // draw confidence Band
       confidenceBand(model, tobs, nforecast, clow, chigh);
    // draw forecasting
     for (i=arP+diff+1; i<tobs+nforecast; i++) {
          cx = margin.left+graphWidth*(tdata[i]-gxmin)/gxrange;
          cy = margin.top+graphHeight-graphHeight*(yhat[i]-gymin)/gyrange; 
          svg.append("circle").attr("class","ar")
             .attr("cx", cx)
             .attr("cy", cy)         
             .attr("r", 3)
             .style("fill",myColor[1])
     }
     x1  = margin.left + graphWidth*(tdata[arP+diff+1]-gxmin)/gxrange;
     y1  = margin.top  + graphHeight - graphHeight*(yhat[arP+diff+1]-gymin)/gyrange;
     for (i=arP+diff+2; i<tobs+nforecast; i++) {
         x2 = margin.left + graphWidth*(tdata[i]-gxmin)/gxrange;
         y2 = margin.top  + graphHeight - graphHeight*(yhat[i]-gymin)/gyrange;
         svg.append("line").attr("class","ar")
                .attr("x1",x1)
                .attr("y1",y1)
                .attr("x2",x2)
                .attr("y2",y2)
                .style("stroke",myColor[1]) 
         x1 = x2;
         y1 = y2;
     }
     if(checkTitle) {   
        svg.append("text").attr("class","ar")
                .attr("x", margin.left + 20)
                .attr("y", margin.top + 20)
                .text(strModel)
                .style("stroke",myColor[1]) 
     }
}
// Difference
function drawDifference(){
         if ( clickExecute == false ) {
           document.getElementById("diff").value = 0;
           alert("No data"); 
           return;
         }
         document.getElementById("arP").value   = 0;
         document.getElementById("nn42").value  = 0; // nforecast
         document.getElementById("diffData").checked = true;
         arP = 0;
         nforecast = 0;
         diff = parseInt(d3.select("#diff").node().value);
         if (diff == 1) {
           diffobs = tobs - 1;
           for (i=0; i<diffobs; i++) {
             tempw[i] = ydata[i+1] - ydata[i];
             ydiff[i] = tempw[i];
           }
         }
         if (diff == 2) {
            diffobs = tobs - 2;
            for (i=0; i<diffobs; i++) {
              tempx[i] = tempw[i+1] - tempw[i];
              ydiff[i] = tempx[i];
            }
         }
         if (diff == 3) {
            diffobs = tobs - 3;
            for (i=0; i<tobs-3; i++) {
              tempy[i] = tempx[i+1] - tempx[i];
              ydiff[i] = tempy[i];
            }
         }
         ibegin = 0;
         iend   = diffobs;
         strModel = "Differencing ("+diff+")";
         showTimeSeriesPlot3(strModel, tobs, ibegin, iend, tdata, ydata, ydiff);
         if ( document.getElementById("acf").checked ) drawACF()
         else drawPACF()
}
// Draw ACF
function drawACF(){
    var i, k;
    clearACF();
    autocorrelation(tobs, diff, ydiff, acf);
    initialCordinate(tobs-diff, tdata, ydiff); 
    strModel = "Autocorrelation function";
    ibegin = 0;
    iend = numACF-1;
    showTimeSeriesPlot3(strModel, tobs-diff, ibegin, iend, xdata, ydiff, acf);
}
function clearACF() {
     svg.selectAll("line.acf").remove();
     svg.selectAll("text.acf").remove();
}
function autocorrelation(tobs, diff, ylag, acf) {
    var i, temp, meany, variy, covxy, corr;
    // Total y sum of squares
    meany = 0;
    for (i=0; i<tobs-diff; i++) meany += ylag[i];
    meany = meany / (tobs-diff);
    variy = 0;
    for (i=0; i<tobs-diff; i++) {
      temp = ylag[i] - meany;
      variy += temp*temp
    }
    // Cross product sum of squares
    for (k=1; k<numACF; k++) {
      num   = tobs - diff - k;
      covxy = 0;
      for (i=0; i<num; i++) covxy += (ylag[i]-meany)*(ylag[i+k]-meany);
      if (covxy == 0) corr = 0;
      else    corr = covxy / variy;
      acf[k-1] = corr;  
    }
}
function partialACF(tobs, diff, ydiff) {
    // autocorrelation
    autocorrelation(tobs, diff, ydiff, acf);
    // partial autocorrelation
    phi[0][0] = acf[0];
    for (k=1; k<numACF; k++) {
      sum1 = acf[k];
      for (j=0; j<k; j++) {
        sum1 -= phi[k-1][j] * acf[k-j]
      }
      sum2 = 1;
      for (j=0; j<k; j++) {
        sum2 -= phi[k-1][j] * acf[j+1]
      }
      if (sum1 == 0) phi[k][k] = 0;
      else phi[k][k] = sum1 / sum2;
      for (j=0; j<k; j++) {
        phi[k][j] = phi[k-1][j] - phi[k][k] * phi[k-1][k-j-1]
      }
    }
    for (k=0; k<numACF; k++) pacf[k] = phi[k][k];
}
// Draw PACF
function drawPACF(){
    var i, j, k, temp, sum1, sum2;
    partialACF(tobs, diff, ydiff);
    initialCordinate(tobs-diff, tdata, ydiff); 
    strModel = "Partial Autocorrelation function";
    ibegin = 0;
    iend = numACF-1;
    showTimeSeriesPlot3(strModel, tobs-diff, ibegin, iend, xdata, ydiff, pacf);
}
// forecasting
function forecasting(){
     if ( arP == 0 ) { 
       document.getElementById("nn42").value = 0;
       alert("Select p of AR(p) model"); 
       return;
     }
     svg.selectAll("*").remove();
     nforecast = parseFloat(d3.select("#nn42").node().value);
     if (document.getElementById("diffData").checked ) {
       for (i=0; i<diffobs; i++) xdata[i] = tdata[i];  
       model1Stat(diffobs, tdata, xdata, ydiff, stat1);
       for (i=diffobs; i<diffobs+nforecast; i++) {
         tdata[i] = i+1;
         xdata[i] = tdata[i];
         ydiff[i] = stat1[7] + stat1[8]*tdata[i];
       }
       initialCordinate(diffobs+nforecast, tdata, ydiff);
       model = 1;
       showTimeSeriesPlot(model, diffobs, nforecast, tdata, ydiff, checkTitle);
       drawAR();
    }
    else {
       for (i=0; i<tobs; i++) xdata[i] = tdata[i];  
       model1Stat(tobs, tdata, xdata, ydata, stat1);
       for (i=0; i<tobs+nforecast; i++) {
         tdata[i] = i+1;
         xdata[i] = tdata[i];
         tempy[i] = stat1[7] + stat1[8]*tdata[i];
       }
       initialCordinate(tobs+nforecast, tdata, tempy);
       model = 1;
       showTimeSeriesPlot(model, tobs, nforecast, tdata, ydata, checkTitle);
       drawRawForecastAR();
    }
}
function removeRegression1() {
     checkModel[1] = false;
     svg.selectAll("circle.reglabel1").remove();
     svg.selectAll("line.reglabel1").remove();
     svg.selectAll("text.reglabel1").remove();
     svg.selectAll("circle.forecast1").remove();
}

// 다중 선형 회귀분석표 --------------------------------------------------------------------------------------------------
function regressionTable2(numVar, tdobs) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, k, stderr, tobs, pvalue, temp, df, info, tleft, tright, str;
    var row;
    var num = 0;
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
    cell[0].style.width = "130px";

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.width = "90px";
    }
    cell[0].innerHTML = "AR(" + arP +")";   // "회귀선";
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.textAlign = "center";
    cell[0].style.border = "1px solid black";
    cell[1].innerHTML = "Y<sub>t</sub> = (" + f3(Beta[0]).toString() + ")";
    cell[1].style.textAlign = "right";
    for (k = 1; k < numVar; k++) {
        cell[k + 1].innerHTML = "+ &nbsp; (" + f3(Beta[k]).toString() + ")" + " Y<sub>t-" + k + "</sub>";
        cell[k + 1].style.textAlign = "center";
    }

    row = table.insertRow(++num);
    for (j = 0; j < 6; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
    }
    cell[0].innerHTML = svgStr[106][langNum]; // "중상관계수"
    cell[1].innerHTML = f3(statF[12]);
    cell[2].innerHTML = svgStr[61][langNum]; // "결정계수";  
    cell[3].innerHTML = f3(statF[12] * statF[12]);
    cell[4].innerHTML = svgStr[62][langNum]; // "추정오차"   
    cell[5].innerHTML = f3(statF[11]);
    // 공백
    row = table.insertRow(++num);
    cell[0] = row.insertCell(0);
    // 회귀 추정 모수
    row = table.insertRow(++num);
    for (j = 0; j < 6; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
    }
    cell[0].innerHTML = svgStr[67][langNum]; // "모수";
    cell[1].innerHTML = svgStr[68][langNum]; // "추정치";  
    cell[2].innerHTML = svgStrU[18][langNum]; // "표준오차";  
    cell[3].innerHTML = "t " + svgStr[69][langNum]; // "t관찰값";  
    cell[4].innerHTML = "p " + svgStr[69][langNum]; // "p-값 =";   
    cell[5].innerHTML = "95% " + svgStrU[20][langNum]; // 신뢰구간
    cell[5].style.width = "130px";
    df = statF[5];
    temp = t_inv(0.95, df, info);

    for (k = 0; k < numVar; k++) {
        row = table.insertRow(++num);
        for (j = 0; j < ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.border = "1px solid black";
            cell[j].style.textAlign = "right";
        }
        cell[0].style.textAlign = "left";
        cell[0].style.backgroundColor = "#eee";
        cell[5].style.textAlign = "center";
        if (k == 0) cell[0].innerHTML = "&beta;<sub>" + k + "</sub>";
        else cell[0].innerHTML = "&beta;<sub>" + k + "</sub> " + "&nbsp; (Y<sub>t-" + k+"</sub>)";
        cell[1].innerHTML = f3(Beta[k]).toString();
        stderr = Math.sqrt(Cii[k] * statF[8]);
        tobs = Beta[k] / stderr;
        pvalue = t_cdf(tobs, df, info);
        if (pvalue < 0.5) pvalue = 2 * pvalue;
        else pvalue = 2 * (1 - pvalue);
        tleft = Beta[k] - temp * stderr;
        tright = Beta[k] + temp * stderr;
        cell[2].innerHTML = f3(stderr).toString();
        cell[3].innerHTML = f3(tobs).toString();
        if (pvalue < 0.0001) str = "< 0.0001";
        else str = f4(pvalue).toString();
        cell[4].innerHTML = str;
        cell[5].innerHTML = "(" + f3(tleft) + " ," + f3(tright) + ")";
    }
    // 공백
    row = table.insertRow(++num);
    cell[0] = row.insertCell(0);
    // 분산분석표
    row = table.insertRow(++num);
    cell[0] = row.insertCell(0);
    cell[0].innerHTML = svgStrU[29][langNum]; // "분산분석표";
    cell[0].style.textAlign = "center";
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.border = "1px solid black";

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
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
    cell[0].innerHTML = svgStr[76][langNum]; // "회귀";
    cell[1].innerHTML = f4(statF[1]).toString();
    cell[2].innerHTML = f0(statF[4]).toString();
    cell[3].innerHTML = f4(statF[7]).toString();
    cell[4].innerHTML = f4(statF[9]).toString();
    if (statF[10] < 0.0001) str = "< 0.0001"
    else str = f4(statF[10]).toString();
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
    cell[1].innerHTML = f4(statF[2]).toString();
    cell[2].innerHTML = f0(statF[5]).toString();
    cell[3].innerHTML = f4(statF[8]).toString();
    cell[0].style.backgroundColor = "#eee";

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
    }
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStr[78][langNum]; // "전체";
    cell[1].innerHTML = f4(statF[3]).toString();
    cell[2].innerHTML = f0(statF[6]).toString();

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";

}
function correlationTable(nobs, acf, pacf) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);
    var row, header;
    var i, j, k, strModel, temp;
    var ncol = 3;
    var cell = new Array(ncol);
    table.style.fontSize = "13px";
    k = 0;
    row = table.insertRow(k++);
    row.style.height ="30px";
    for (j=0; j<ncol; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.textAlign = "center";
      cell[j].style.border = "1px solid black";
      cell[j].style.width ="100px";
    }
    cell[0].innerHTML = "ACF / PACF";
    cell[0].style.width ="70px";

    row  = table.insertRow(k++);
    row.style.height ="25px";
    for (j=0; j<ncol; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.backgroundColor = "#eee";
      cell[j].style.textAlign = "center";
      cell[j].style.border = "1px solid black";
    }
    cell[0].innerHTML = "<b>t</b>";
    cell[1].innerHTML = "ACF";
    cell[2].innerHTML = "PACF";

    for (i=0; i<nobs; i++) {
       row = table.insertRow(k++);
       for (j=0; j<ncol; j++) {
              cell[j] = row.insertCell(j)          
              cell[j].style.textAlign = "center";
              cell[j].style.border = "1px solid black";
       }
       cell[0].innerHTML = i+1;
       cell[1].innerHTML = f4(acf[i]);
       cell[2].innerHTML = f4(pacf[i]);
       cell[0].style.backgroundColor = "#eee";
       cell[0].style.textAlign = "center";
    }
}
function forecastTable(model, nobs, nforecast) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);
    var row, header;
    var i, j, k, strModel, temp;
    var ncol = 3;
    var cell = new Array(4);
    table.style.fontSize = "13px";
    strModel = "AR("+arP+")";

    k = 0;
    row = table.insertRow(k++);
    row.style.height ="30px";
    for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
    }
    cell[0].innerHTML = "<b>"+svgStrU[127][langNum]+"</b>";
    cell[1].innerHTML = strModel;
    cell[0].style.width ="70px";
    cell[1].style.width ="150px";
    cell[2].style.width ="200px";

    row  = table.insertRow(k++);
    row.style.height ="25px";
    for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
    }
    for (j=1; j<ncol; j++) {
            cell[j].style.width ="60px";
    }
    cell[0].innerHTML = "<b>t</b>";
    cell[1].innerHTML = "Y "+ svgStr[84][langNum]; // predicted value
    cell[2].innerHTML = "95% "+svgStrU[20][langNum];  // confidence interval

    for (i=nobs; i<nobs+nforecast; i++) {
       row = table.insertRow(k++);
       for (j=0; j<ncol; j++) {
              cell[j] = row.insertCell(j)          
              cell[j].style.textAlign = "center";
              cell[j].style.border = "1px solid black";
       }
       cell[0].innerHTML = i+1;
       cell[1].innerHTML = f4(yhat[i]);
       cell[2].innerHTML = "( "+f4(clow[i])+ " , "+f4(chigh[i])+ ")";
       cell[0].style.backgroundColor = "#eee";
       cell[0].style.textAlign = "center";
    }
}

// Multiple Linear Regression for AR(p)
function arPRegression(tobs, arP, ydata, Beta, statF) {
    var i, j, k, nAug;
    var temp, tempx, tempy, sum, diffrow;
    var SSR, SSE, SST, MSE, info, multpleR, stdErr;
    var avgY, avgYhat, avgResid, SSYH;
    var numVar = arP+1;
    var nAug = 2 * numVar;
    var prow = tobs;
    var X = new Array(prow); // 2차원 행렬
    var Y = new Array(prow);
    var yhat        = new Array(prow);
    var residual    = new Array(prow);
    var stdResidual = new Array(prow);
    var Hii         = new Array(prow);
    var Cook        = new Array(prow);
    var T    = new Array(numVar);
    var XP   = new Array(numVar); // 2차원 행렬
    var XPX  = new Array(numVar); // 2차원 행렬
    var XPY  = new Array(numVar);
    var L    = new Array(numVar); // 2차원 행렬
    var U    = new Array(numVar); // 2차원 행렬
    var invL = new Array(numVar); // 2차원 행렬
    var invU = new Array(numVar); // 2차원 행렬
//    var invXPX = new Array(numVar); // 2차원 행렬
    for (i = 0; i < prow; i++) {
        X[i] = new Array(numVar);
    }
    for (j = 0; j < numVar; j++) {
        XP[j] = new Array(prow);
        XPX[j] = new Array(numVar);
        L[j] = new Array(nAug);
        U[j] = new Array(nAug);
        invL[j] = new Array(numVar);
        invU[j] = new Array(numVar);
//        invXPX[j] = new Array(numVar);
    }

    // vector Y, matrix X
    prow = tobs - arP
    for (i = 0; i < prow; i++) {
        Y[i] = ydata[i+arP];
        X[i][0] = 1;
        for (j = 1; j < numVar; j++) { // differencing data
            X[i][j] = ydata[i+arP-j];
        } // endof j
    } // endof i
    // matrix XP
    for (i = 0; i < prow; i++) {
        for (j = 0; j < numVar; j++) {
            XP[j][i] = X[i][j];
        } // endof j
    } // endof i
    // matrix XPX
    for (i = 0; i < numVar; i++) {
        for (j = 0; j < numVar; j++) {
            temp = 0;
            for (k = 0; k < prow; k++) {
                temp += XP[i][k] * X[k][j];
            }
            XPX[i][j] = temp;
            L[i][j] = temp;
        }
    }
    // vector XPY
    for (i = 0; i < numVar; i++) {
        sum = 0;
        for (k = 0; k < prow; k++) {
            sum += XP[i][k] * Y[k];
        }
        XPY[i] = sum;
    }
    // Cholesky Decomposition LU
    for (k = 0; k < numVar; k++) {
        for (i = 0; i <= k - 1; i++) {
            sum = 0;
            for (j = 0; j <= i - 1; j++) {
                sum += L[i][j] * L[k][j];
            }
            L[k][i] = (L[k][i] - sum) / L[i][i];
        }
        sum = 0;
        for (j = 0; j <= k - 1; j++) sum += L[k][j] * L[k][j];
        L[k][k] = Math.sqrt(L[k][k] - sum);
    }
    for (i = 0; i < numVar; i++) {
        for (j = 0; j < numVar; j++) {
            if (j > i) L[i][j] = 0;
            U[j][i] = L[i][j];
        }
    }

    // Solve linear Eq  Lt = XPY by forward substitution
    for (k = 0; k < numVar; k++) {
        sum = 0;
        for (j = 0; j < k; j++) sum += L[k][j] * T[j];
        T[k] = (XPY[k] - sum) / L[k][k];
    }
    // Solve linear Eq  Ub = T by forward substitution
    for (k = numVar - 1; k >= 0; k--) {
        sum = 0;
        for (j = numVar - 1; j > k; j--) sum += U[k][j] * Beta[j];
        Beta[k] = (T[k] - sum) / U[k][k];
    }
    // Augment matrix
    for (i = 0; i < numVar; i++) {
        for (k = numVar; k < nAug; k++) {
            if (k == i + numVar) {
                L[i][k] = 1;
                U[i][k] = 1;
            } else {
                L[i][k] = 0;
                U[i][k] = 0;
            }
        }
    }
    // inverse of L by Gauss Elimination
    for (k = 0; k < numVar; k++) {
        temp = L[k][k];
        for (j = k; j < nAug; j++) L[k][j] = L[k][j] / temp;
        for (i = k + 1; i < numVar; i++) {
            temp = L[i][k];
            for (j = k; j < nAug; j++) {
                L[i][j] = L[i][j] - temp * L[k][j];
            }
        }
    }
    for (i = 0; i < numVar; i++) {
        for (j = numVar; j < nAug; j++) invL[i][j - numVar] = L[i][j];
    }
    // inverse of U = (invL)^T
    for (i = 0; i < numVar; i++) {
        for (j = 0; j < numVar; j++) invU[i][j] = invL[j][i];
    }
    // inverse of XPX = (invU)(invL)
    for (i = 0; i < numVar; i++) {
        for (j = 0; j < numVar; j++) {
            sum = 0;
            for (k = 0; k < numVar; k++) sum += invU[i][k] * invL[k][j];
            invXPX[i][j] = sum;
            if (i == j) Cii[i] = invXPX[i][j];
        }
    }
    // Final Test for identity
    for (i = 0; i < numVar; i++) {
        for (j = 0; j < numVar; j++) {
            sum = 0;
            for (k = 0; k < numVar; k++) sum += XPX[i][k] * invXPX[k][j];
        }
    }
    // residual, multiple correlation
    avgY = 0;
    avgYhat = 0;
    for (i = 0; i < prow; i++) {
        sum = Beta[0];
        for (j = 1; j < numVar; j++) {
            sum += Beta[j] * X[i][j];
        } // endof j
        yhat[i] = sum;
        residual[i] = Y[i] - yhat[i];
        avgY += Y[i];
        avgYhat += yhat[i];
    } // endof i
    avgY /= prow;
    avgYhat /= prow;
    // ANOVA Statistics
    SSR = 0;
    SSE = 0;
    SST = 0;
    SSYH = 0;
    for (i = 0; i < prow; i++) {
        tempx = Y[i] - avgY;
        tempy = yhat[i] - avgY;
        SST += tempx * tempx;
        SSR += tempy * tempy;
        SSYH += tempx * tempy;
        SSE += residual[i] * residual[i];
    } // endof i
    MSE = SSE / (prow - numVar);
    stdErr = Math.sqrt(MSE);
    multipleR = SSYH / Math.sqrt(SST * SSR);
    // Hii Leverage : x_i' inv(X'X) x_i
    for (i = 0; i < prow; i++) {
        for (k = 0; k < numVar; k++) {
            T[k] = 0;
            for (j = 0; j < numVar; j++) {
                T[k] += X[i][j] * invXPX[j][k]
            }
        } // endof k
        Hii[i] = 0;
        for (j = 0; j < numVar; j++) {
            Hii[i] += T[j] * X[i][j]
        }
        stdResidual[i] = residual[i] / (stdErr * Math.sqrt(1 - Hii[i]));
        Cook[i] = stdResidual[i] * stdResidual[i] * Hii[i] / ((numVar - 1) * (1 - Hii[i]));
    } // endof i

    statF[0] = prow;
    statF[1] = SSR;
    statF[2] = SSE;
    statF[3] = SST;
    statF[4] = numVar - 1;
    statF[5] = prow - numVar;
    statF[6] = prow - 1;
    statF[7] = SSR / statF[4]; // MSR
    statF[8] = MSE; // MSE
    statF[9] = statF[7] / statF[8]; // Fobs
    statF[10] = 1 - f_cdf(statF[9], statF[4], statF[5], info);
    statF[11] = stdErr;
    statF[12] = multipleR;
    statF[13] = SSR / SST;

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

// Time Series Transformation 그리기 함수 -------------------------------------------------------------
function showACF(nobs, xdata, yhat) {
     var xgrid    = new Array(nobs);
     var ygrid    = new Array(nobs);
     var ygridR   = new Array(nobs);
     var tempx    = new Array(nobs);
     var tempy    = new Array(nobs);
     var i, tx, ty;
     var radius = 3;
     // Yt Right 통계량
       yminR = -1.5;
       ymaxR = 1.5;
     ygapR    = (ymaxR - yminR) / 10;
     gyminR   = yminR - ygapR;
     gymaxR   = ymaxR + ygapR;
     gyrangeR = gymaxR - gyminR;
     ty = margin.top + 20;
     svg.append("text").attr("class","acf")
          .attr("x", margin.left + 20)
          .attr("y", ty)
          .text("ACF")
          .style("stroke",myColor[1])

    // y 우축 그리기
        var yScaleR = d3.scaleLinear().domain([gyminR,gymaxR]).range([graphHeight, 0])
        ygridR = yScaleR.ticks();
        var tx = margin.left + graphWidth;
        ty = margin.top;
        svg.append("g")
             .attr("transform","translate("+tx+","+ty+")")
	     .attr("class", "main axis date")
             .call(d3.axisRight(yScaleR)) 
             .style("stroke",myColor[1]) 

      // ACF 점 그리기
      y2  = margin.top  + graphHeight - graphHeight*(0-gyminR)/gyrangeR;
      for (i=0; i<numACF; i++) {
          x1  = margin.left + graphWidth*(xdata[i]-gxmin)/gxrange;
          y1  = margin.top  + graphHeight - graphHeight*(yhat[i]-gyminR)/gyrangeR;
          x2  = x1;
          svg.append("line").attr("class","acf")
             .attr("x1",x1)
             .attr("y1",y1)
             .attr("x2",x2)
             .attr("y2",y2)
             .style("stroke",myColor[1])
             .style("stroke-width","6")
      }
      // r=0 x axis
      y1  = margin.top  + graphHeight - graphHeight*(0-gyminR)/gyrangeR;
      y2  = y1;
      x1  = margin.left;
      x2  = margin.left + graphWidth;
      svg.append("line").attr("class","acf")
             .attr("x1",x1)
             .attr("y1",y1)
             .attr("x2",x2)
             .attr("y2",y2)
             .style("stroke",myColor[1])
}
// Time Series Transformation 그리기 함수 -------------------------------------------------------------
function showTimeSeriesPlot3(strModel, nobs, ibegin, iend, xdata, ydata, yhat) {
     svg.selectAll("*").remove();  // 전화면 제거
     var xgrid    = new Array(nobs);
     var ygrid    = new Array(nobs);
     var ygridR   = new Array(nobs);
     var tempx    = new Array(nobs);
     var tempy    = new Array(nobs);
     var i, tx, ty;
     var radius = 3;
     // Yt Right 통계량
     if (strModel == "Autocorrelation function" || strModel == "Partial Autocorrelation function") {
       yminR = -3;
       ymaxR = 1;
     }
     else {
       yminR = yhat[ibegin];
       ymaxR = yhat[ibegin];
       for (i=ibegin+1; i<nobs; i++) {
        if (yminR > yhat[i]) yminR = yhat[i];
        if (ymaxR < yhat[i]) ymaxR = yhat[i];
       } 
     }
     ygapR    = (ymaxR - yminR) / 10;
     gyminR   = yminR - ygapR;
     gymaxR   = ymaxR + ygapR;
     gyrangeR = gymaxR - gyminR;
     ty = margin.top + 20;
     if (strModel == "Autocorrelation function" || strModel == "Partial Autocorrelation function") {
       svg.append("text").attr("class","acf")
          .attr("x", margin.left + 20)
          .attr("y", ty)
          .text(strModel)
          .style("stroke",myColor[1])
     }
     else if (strModel != "model0") {
       svg.append("text")
          .attr("x", margin.left + 20)
          .attr("y", ty)
          .text(strModel)
          .style("stroke",myColor[1]) 
     }
     // 주제목
         svg.append("text")
            .attr("x", margin.left + graphWidth/2)
            .attr("y", margin.top / 2 + 10)
            .style("font-size", "1.8em")
            .style("font-family", "sans-seirf")
            .style("stroke", "black")
            .style("text-anchor", "middle")
            .text(mTitle)
     // X축 제목
         svg.append("text")
            .style("font-size", fontsize)
            .style("font-family", "sans-seirf")
            .style("stroke", "black")
            .style("text-anchor", "middle")
            .attr("x", margin.left + graphWidth / 2)
            .attr("y", margin.top + graphHeight + margin.bottom / 2 + 15)
            .text(xTitle)
     // Y축 제목
         tx = margin.left / 2 - 30;
         ty = margin.top + 15;
         svg.append("text")
            .style("font-size", fontsize)
            .style("font-family", "sans-seirf")
            .style("stroke", "black")
            .style("text-anchor", "end")
            .attr("x", tx)
            .attr("y", ty)
            .text(yTitle)
            .attr("transform", "rotate(-90 30 100)")
     // x축 그리기
        var xScale = d3.scaleLinear().domain([gxmin,gxmax]).range([0,graphWidth])
        xgrid = xScale.ticks();
     // x축 그리드
        for (i = 1; i < xgrid.length; i++) {
          tx = margin.left + xScale(xgrid[i]);
          svg.append("line")
           .attr("x1", tx)
           .attr("x2", tx)
           .attr("y1", margin.top)
           .attr("y2", margin.top + graphHeight)
           .style("stroke", "lightgrey")
        }
        ty = margin.top + graphHeight;
        svg.append("g")
             .attr("transform","translate("+margin.left+","+ty+")")
	     .attr("class", "main axis date")
             .call(d3.axisBottom(xScale)) 

        svg.append("g")
             .attr("transform","translate("+margin.left+","+margin.top+")")
	     .attr("class", "main axis date")
             .call(d3.axisTop(xScale)) 

    // y 좌축 그리기
        var yScale = d3.scaleLinear().domain([gymin,gymax]).range([graphHeight, 0])
        ygrid = yScale.ticks();
    // Y 좌축 그리드
        for (i = 1; i < ygrid.length; i++) {
          ty = margin.top + yScale(ygrid[i]);
          svg.append("line")
           .attr("x1", margin.left)
           .attr("x2", margin.left + graphWidth)
           .attr("y1", ty)
           .attr("y2", ty)
           .style("stroke", "lightgrey")
        }
        ty = margin.top;
        svg.append("g")
             .attr("transform","translate("+margin.left+","+ty+")")
	     .attr("class", "main axis date")
             .call(d3.axisLeft(yScale)) 
    // y 우축 그리기
     if (strModel == "Autocorrelation function" || strModel == "Partial Autocorrelation function") {
        var yScaleR = d3.scaleLinear().domain([gyminR,gymaxR]).range([graphHeight, 0])
        ygridR = yScaleR.ticks();
        var tx = margin.left + graphWidth;
        ty = margin.top;
        svg.append("g")
             .attr("transform","translate("+tx+","+ty+")")
	     .attr("class", "main axis date")
             .call(d3.axisRight(yScaleR)) 
             .style("stroke",myColor[1]) 
    }
    else {
        var yScale = d3.scaleLinear().domain([gymin,gymax]).range([graphHeight, 0])
        ygrid = yScale.ticks();
        var tx = margin.left + graphWidth;
        ty = margin.top;
        svg.append("g")
             .attr("transform","translate("+tx+","+ty+")")
	     .attr("class", "main axis date")
             .call(d3.axisRight(yScale)) 
             .style("stroke","lightgrey") 
    }
    // 산점도 점 그리기
    for (i=0; i<nobs; i++) {
          svg.append("circle")
             .attr("cx", margin.left+graphWidth*(xdata[i]-gxmin)/gxrange)
             .attr("cy", margin.top+graphHeight-graphHeight*(ydata[i]-gymin)/gyrange)         
             .attr("r", radius)
             .attr("class","circle")
             .style("fill","grey")
    }
    x1  = margin.left + graphWidth*(xdata[0]-gxmin)/gxrange;
    y1  = margin.top  + graphHeight - graphHeight*(ydata[0]-gymin)/gyrange;
    for (i=1; i<nobs; i++) {
      x2  = margin.left + graphWidth*(xdata[i]-gxmin)/gxrange;
      y2  = margin.top  + graphHeight - graphHeight*(ydata[i]-gymin)/gyrange;
      svg.append("line")
         .attr("x1",x1)
         .attr("y1",y1)
         .attr("x2",x2)
         .attr("y2",y2)
         .style("stroke","grey") 
      x1 = x2;
      y1 = y2;
    }
     if (strModel == "Autocorrelation function" || strModel == "Partial Autocorrelation function") {
      // ACF or PACF 점 그리기
      y2  = margin.top  + graphHeight - graphHeight*(0-gyminR)/gyrangeR;
      for (i=0; i<numACF-1; i++) {
          x1  = margin.left + graphWidth*(xdata[i]-gxmin)/gxrange;
          y1  = margin.top  + graphHeight - graphHeight*(yhat[i]-gyminR)/gyrangeR;
          x2  = x1;
          svg.append("line").attr("class","acf")
             .attr("x1",x1)
             .attr("y1",y1)
             .attr("x2",x2)
             .attr("y2",y2)
             .style("stroke",myColor[1])
             .style("stroke-width","6")
      }
      // ACF=0 x axis
      y1  = margin.top  + graphHeight - graphHeight*(0-gyminR)/gyrangeR;
      y2  = y1;
      x1  = margin.left;
      x2  = margin.left + graphWidth*(numACF-gxmin)/gxrange;
      svg.append("line").attr("class","acf")
             .attr("x1",x1)
             .attr("y1",y1)
             .attr("x2",x2)
             .attr("y2",y2)
             .style("stroke",myColor[1])
    }
    else if (strModel != "model0") {
      // Transformation 산점도 점 그리기
      for (i=ibegin; i<iend; i++) {
          svg.append("circle")
             .attr("cx", margin.left+graphWidth*(xdata[i]-gxmin)/gxrange)
             .attr("cy", margin.top+graphHeight-graphHeight*(yhat[i]-gyminR)/gyrangeR)         
             .attr("r", radius)
             .attr("class","circle")
             .style("fill",myColor[1])
      }
      x1  = margin.left + graphWidth*(xdata[ibegin]-gxmin)/gxrange;
      y1  = margin.top  + graphHeight - graphHeight*(yhat[ibegin]-gyminR)/gyrangeR;
      for (i=ibegin+1; i<iend; i++) {
        x2  = margin.left + graphWidth*(xdata[i]-gxmin)/gxrange;
        y2  = margin.top  + graphHeight - graphHeight*(yhat[i]-gyminR)/gyrangeR;
        svg.append("line")
           .attr("x1",x1)
           .attr("y1",y1)
           .attr("x2",x2)
           .attr("y2",y2)
           .style("stroke",myColor[1]) 
        x1 = x2;
        y1 = y2;
      }
    }
}

