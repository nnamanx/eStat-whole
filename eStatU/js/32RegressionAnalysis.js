      var chart = d3.select("#chart"); 
      var i, r;
      var svgWidth    = 600;
      var svgHeight   = 600;
      var margin      = {top: 80, bottom: 80, left: 80, right: 80};
      var buffer      = 40;
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var checkTitle  = true;
      var mTitle, yTitle, xTitle, xobs, yobs, tobs;
      var fontsize = "1em";
      var stat      = new Array(30);
      var scatterS  = new Array(10);
      var rowmax    = 200;
      var xdata     = new Array(rowmax);
      var ydata     = new Array(rowmax);
      var yhat      = new Array(rowmax);
      var residual  = new Array(rowmax);

      document.getElementById("nn41").disabled    = true;    
      document.getElementById("nn42").disabled    = true;    
      document.getElementById("xbar41").disabled  = true;    
      document.getElementById("xbar42").disabled  = true;    
      document.getElementById("var41").disabled   = true;       
      document.getElementById("var42").disabled   = true;       
      document.getElementById("var43").disabled   = true;       
      document.getElementById("std41").disabled   = true;       
      document.getElementById("std42").disabled   = true;       
      document.getElementById("std43").disabled   = true;    
      document.getElementById("msgMean").innerHTML       = svgStr[34][langNum];    
      document.getElementById("msgCovariance").innerHTML = svgStr[121][langNum]+" / "+svgStr[60][langNum]; 

      chart.selectAll("*").remove();
      // input data control ===================================================
      d3.select("#data1").on("input", function() {
        stat = simplestat("#data1");  
        xdata = data;  
        xobs = stat.n;
      });
      d3.select("#data2").on("input", function() {
        stat = simplestat("#data2");  
        ydata = data; 
        yobs = stat.n;
      });

      updateData = function() {
        document.getElementById("data1").value = '';
        document.getElementById("data2").value = '';    
      }

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        chart.selectAll("*").remove();
        document.getElementById("regressBand").checked = false;
        document.getElementById("data1").value  = "";
        document.getElementById("data2").value  = "";
        document.getElementById("nn41").value  = ""; 
        document.getElementById("nn42").value  = "";   
        document.getElementById("xbar41").value  = "";    
        document.getElementById("xbar42").value  = "";   
        document.getElementById("var41").value  = "";       
        document.getElementById("var42").value  = "";       
        document.getElementById("var43").value  = "";       
        document.getElementById("std41").value  = "";      
        document.getElementById("std42").value  = "";       
        document.getElementById("std43").value  = "";   
      })

      d3.select("#executeRegression").on("click", function(){  
          chart.selectAll("*").remove();  // 전화면 제거
          document.getElementById("regressBand").checked = false;
          // 입력행이 같은지 체크
          if (xobs != yobs ) {
            chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
               .text(alertMsg[54][langNum]).style("stroke","red").style("font-size","1em");
            return;
          }
          tobs = xobs;
          // 입력 도수에 숫자 문자 빈칸 있나 체크
          for (i=0; i<tobs; i++) {
            if (isNaN(xdata[i]) || isNaN(ydata[i]) ) {
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                 .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
          }
          // title
          mTitle = d3.select("#mtitle").node().value;
          yTitle = d3.select("#ytitle").node().value;
          xTitle = d3.select("#xtitle").node().value;
          // 통계량
          basicScatterStat(tobs, xdata, ydata, yhat, residual, stat, scatterS);
          document.getElementById("nn41").value   = tobs;    
          document.getElementById("nn42").value   = tobs;    
          document.getElementById("xbar41").value = f2(stat[1]);
          document.getElementById("xbar42").value = f2(stat[11]);
          document.getElementById("var41").value  = f2(stat[17]); 
          document.getElementById("var42").value  = f2(stat[18]);    
          document.getElementById("var43").value  = f2(stat[19]);    
          document.getElementById("std41").value  = f2(stat[2]); 
          document.getElementById("std42").value  = f2(stat[12]);    
          document.getElementById("std43").value  = f3(stat[9]);    
          showScatterPlot(tobs, xdata, ydata, stat[5], stat[6], stat[15], stat[16], graphWidth, graphHeight, checkTitle);
          showRegression2(stat[7], stat[8], stat[9], stat[10], stat[5], stat[6], stat[15], stat[16], checkTitle);
//          regressionTable(nobs, xavg, xstd, yavg, ystd, alphaR, betaR, corr, rsquare, sxx, ssr, sse, stderr)
          regressionTable(tobs, stat[1], stat[2], stat[11], stat[12], stat[7], stat[8], stat[9], stat[10], stat[20], stat[23], stat[24], stat[26]);
      })

      // 회귀 scatterplot 그리기
      d3.select("#scatterPlot").on("click", function() {
          chart.selectAll("*").remove();  // 전화면 제거
          if (tobs < 1) return;
          showScatterPlot(tobs, xdata, ydata, stat[5], stat[6], stat[15], stat[16], graphWidth, graphHeight, checkTitle);
      })
      // 회귀신뢰대 그리기
      d3.select("#regressBand").on("click", function() {
          if (tobs < 1) return;
          if (this.checked) {
//              showRegressionBand(tobs, alphaR, betaR, xavg, sxx, stderr, scatterS);
              showRegressionBand(tobs, stat[7], stat[8], stat[1], stat[20], stat[26], scatterS);
          } else {
             removeRegressionBand();
          }
      })
      // 회귀분석 잔차와 예측값
      d3.select("#regressResidual").on("click", function() {
          if (tobs < 1) return;
          document.getElementById("regressBand").checked = false;
          document.getElementById("regressBand").disabled = true;
          title = svgStr[95][langNum]; // "잔차와 예측값의 산점도"
          regressionResidual(tobs,yhat,residual,title);
      })
      // 회귀분석 잔차 Q-Q Plot
      d3.select("#regressQQ").on("click", function() {
          if (tobs < 1) return;
          document.getElementById("regressBand").checked = false;
          document.getElementById("regressBand").disabled = true;
          regressionQQ(tobs,yhat,residual);
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

// Two variable Basic Statistics
function basicScatterStat(nobs, xdata, ydata, yhat, residual, stat, scatterS) {
        var temp, tempx, tempy, yhat;
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
        var xvar = sxx / (nobs-1);
        var xstd = Math.sqrt(xvar);
        var yvar = syy / (nobs-1);
        var ystd = Math.sqrt(yvar);
        var beta    = sxy / sxx;
        var alpha   = yavg - beta*xavg;
        var cov     = sxy / (nobs-1);
        var corr    = sxy / Math.sqrt(sxx * syy);
        var rsquare = corr * corr;
        var xmin = xdata[0];
        var xmax = xdata[0];
        var ymin = ydata[0];
        var ymax = ydata[0];
        var rss = 0;
        var ess = 0;
        for (i=0; i<nobs; i++) {
          yhat[i] = alpha + beta*xdata[i]
          temp    = yhat[i] - yavg;
          rss    += temp*temp;
          tempy   = ydata[i] - yhat[i];
          ess    += tempy*tempy;
          residual[i] = tempy;
          if (xmin > xdata[i]) xmin = xdata[i];
          if (xmax < xdata[i]) xmax = xdata[i];
          if (ymin > ydata[i]) ymin = ydata[i];
          if (ymax < ydata[i]) ymax = ydata[i];
        } 
        var mse    = ess / (nobs - 2);    // MSE
        var stderr = Math.sqrt(stat[25]); // s
        for (i=0; j<nobs; j++) {
          tempx = xdata[i] - xavg;
          temp  = stderr * Math.sqrt(1 - 1./nobs - tempx*tempx/sxx )
          residual[i] = residual[i] / temp;
        }

        // 그래프 화면 정의 
        var xgap    = (xmax - xmin) / 8;
        var ygap    = (ymax - ymin) / 8;
        var gxmin   = xmin - xgap;
        var gxmax   = xmax + xgap;
        var gymin   = ymin - ygap;
        var gymax   = ymax + ygap;
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
        stat[7]  = alpha;   stat[17] = xvar;
        stat[8]  = beta;    stat[18] = yvar;
        stat[9]  = corr;    stat[19] = cov;
        stat[10] = rsquare; 
        stat[20] = sxx
        stat[21] = syy;
        stat[22] = sxy;
        stat[23] = rss;  
        stat[24] = ess; 
        stat[25] = ess / (nobs - 2);    // MSE
        stat[26] = Math.sqrt(stat[25]); // s
        // save Graph Stat
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
}
// 산점도 그리기 함수 -------------------------------------------------------------
function showScatterPlot(nobs, xdata, ydata, gxmin, gxmax, gymin, gymax, graphWidth, graphHeight, checkTitle) {
     var gxrange = gxmax - gxmin;
     var gyrange = gymax - gymin;
     var xgrid    = new Array(nobs);
     var ygrid    = new Array(nobs);
     var i, tx, ty;
         // 주제목
         chart.append("text")
            .attr("x", margin.left + graphWidth/2)
            .attr("y", margin.top / 2 + 10)
            .style("font-size", "1.8em")
            .style("font-family", "sans-seirf")
            .style("stroke", "black")
            .style("text-anchor", "middle")
            .text(mTitle)
         // X축 제목
         chart.append("text")
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
         chart.append("text")
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
          chart.append("line")
           .attr("x1", tx)
           .attr("x2", tx)
           .attr("y1", margin.top)
           .attr("y2", margin.top + graphHeight)
           .style("stroke", "lightgrey")
        }
        ty = margin.top + graphHeight;
        chart.append("g")
             .attr("transform","translate("+margin.left+","+ty+")")
	     .attr("class", "main axis date")
             .call(d3.axisBottom(xScale)) 
        chart.append("g")
             .attr("transform","translate("+margin.left+","+margin.top+")")
	     .attr("class", "main axis date")
             .call(d3.axisTop(xScale)) 
        // y축 그리기
        var yScale = d3.scaleLinear().domain([gymin,gymax]).range([graphHeight, 0])
        ygrid = yScale.ticks();
        // Y축 그리드
        for (i = 1; i < ygrid.length; i++) {
          ty = margin.top + yScale(ygrid[i]);
          chart.append("line")
           .attr("x1", margin.left)
           .attr("x2", margin.left + graphWidth)
           .attr("y1", ty)
           .attr("y2", ty)
           .style("stroke", "lightgrey")
        }
        ty = margin.top;
        chart.append("g")
             .attr("transform","translate("+margin.left+","+ty+")")
	     .attr("class", "main axis date")
             .call(d3.axisLeft(yScale)) 
        var tx = margin.left + graphWidth;
        chart.append("g")
             .attr("transform","translate("+tx+","+ty+")")
	     .attr("class", "main axis date")
             .call(d3.axisRight(yScale)) 
        // 산점도 점 그리기
        chart.selectAll("circle")
             .data(xdata)
             .enter()
             .append("circle")
             .attr("cx", function(d,i){ return margin.left + graphWidth*Math.random() })
             .attr("cy", margin.top + 20)
             .transition()                           // 애니매이션 효과 지정
             .delay(function(d,i) {return i*50;})   // 0.5초마다 그리도록 대기시간 설정
             .duration(500) 
             .attr("cx", function(d,i){ return margin.left+graphWidth*(d-gxmin)/gxrange;})
             .attr("cy", function(d,i){ return margin.top+graphHeight-graphHeight*(ydata[i]-gymin)/gyrange;})         
             .attr("r", 5)
             .attr("class","circle")
             .style("fill",function(d,i){return myColor[i] })
}

// 회귀선 그리기 함수
function showRegression2(alpha, beta, corr, rsquare, gxmin, gxmax, gymin, gymax, checkTitle) {
        var gxrange = gxmax - gxmin;
        var gyrange = gymax - gymin;
        var x1  = margin.left + graphWidth*(stat[3]-gxmin)/gxrange;
        var y1  = margin.top  + graphHeight - graphHeight*((alpha+beta*stat[3])-gymin)/gyrange;
        var x2  = margin.left + graphWidth*(stat[4]-gxmin)/gxrange;
        var y2  = margin.top  + graphHeight - graphHeight*((alpha+beta*stat[4])-gymin)/gyrange;
        chart.append("line").attr("class","reglabel2")
                .attr("x1",x1)
                .attr("y1",y1)
                .attr("x2",x2)
                .attr("y2",y2)
                .style("stroke","green") 
     if(checkTitle) {   
        chart.append("text").attr("class","reglabel2")
                .attr("x", margin.left + 20)
                .attr("y", margin.top +  20)
                .text(svgStrU[31][langNum]+" :  y = ("+f2(alpha)+") + ("+f2(beta)+ ") x")
        
        chart.append("text").attr("class","reglabel2")
                .attr("x", margin.left + 80)
                .attr("y", margin.top +  40)
                .text("r = "+f2(corr)+" r\u00B2 = "+f2(rsquare))
      }
}
// Show Regression Band
function showRegressionBand(nobs, alphaR, betaR, xavg, sxx, stderr, scatterS) {
    var x1, y1, z1, x2, y2, z2, tx, ty, tz, temp, info;
    var tx1, ty1, tz1, tx2, ty2, tz2, xbuffer, ybuffer, delta;
    var ninterval = 100;

    xbuffer = (scatterS[1] - scatterS[0]) / 8;
    delta = (scatterS[1] - scatterS[0]) / ninterval;
    gxmin = scatterS[4];
    gxmax = scatterS[5];
    gxrange = gxmax - gxmin;
    gymin = scatterS[6];
    gymax = scatterS[7];
    gyrange = gymax - gymin;
    graphWidth = scatterS[8];
    graphHeight = scatterS[9];

    var e = 0.975;
    var df = nobs - 2;
    var tvalue = t_inv(e, df, info);

    tx1 = gxmin + xbuffer;
    temp = tvalue * stderr * Math.sqrt(1. / nobs + (tx1 - xavg) * (tx1 - xavg) / sxx)
    ty1 = alphaR + betaR * tx1 + temp;
    tz1 = alphaR + betaR * tx1 - temp;
    // 그래프 영역을 벗어났을때의 처리
    if (ty1 > gymax) ty1 = gymax;
    else if (ty1 < gymin) ty1 = gymin;
    if (tz1 > gymax) tz1 = gymax;
    else if (tz1 < gymin) tz1 = gymin;

    x1 = margin.left + graphWidth * (tx1 - gxmin) / gxrange;
    y1 = margin.top + graphHeight - graphHeight * (ty1 - gymin) / gyrange;
    z1 = margin.top + graphHeight - graphHeight * (tz1 - gymin) / gyrange;

    for (j = 0; j < ninterval; j++) {

        tx2 = tx1 + delta;
        temp = tvalue * stderr * Math.sqrt(1. / nobs + (tx2 - xavg) * (tx2 - xavg) / sxx)
        ty2 = alphaR + betaR * tx2 + temp;
        tz2 = alphaR + betaR * tx2 - temp;
        // 그래프 영역을 벗어났을때의 처리
        if (ty2 > gymax) ty2 = gymax;
        else if (ty2 < gymin) ty2 = gymin;
        if (tz2 > gymax) tz2 = gymax;
        else if (tz2 < gymin) tz2 = gymin;

        x2 = margin.left + graphWidth * (tx2 - gxmin) / gxrange;
        y2 = margin.top + graphHeight - graphHeight * (ty2 - gymin) / gyrange;
        z2 = margin.top + graphHeight - graphHeight * (tz2 - gymin) / gyrange;

        chart.append("line")
            .attr("class", "regband")
            .attr("x1", x1)
            .attr("y1", y1)
            .attr("x2", x2)
            .attr("y2", y2)
            .style("stroke", myColor[1])
        chart.append("line")
            .attr("class", "regband")
            .attr("x1", x1)
            .attr("y1", z1)
            .attr("x2", x2)
            .attr("y2", z2)
            .style("stroke", myColor[1])
        tx1 = tx2;
        x1 = x2;
        y1 = y2;
        z1 = z2;

    } // end of j
}

// Remove Regression Band
function removeRegressionBand() {
    chart.selectAll("line.regband").remove();
}

// 회귀분석표 --------------------------------------------------------------------------------------------------
function regressionTable(nobs, xavg, xstd, yavg, ystd, alphaR, betaR, corr, rsquare, sxx, ssr, sse, stderr) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, tobs, pvalue, temp, df, info, fobs, mse, str;
    var row;
    var num = 0;
    var ncol = 6;
    var k = 0;
    var df = nobs - 2;

    var cell = new Array(ncol);

    table.style.fontSize = "13px";
    table.style.cellPadding = "10";

    row = table.insertRow(num);
    cell[0] = row.insertCell(0);
    cell[0].innerHTML = svgStr[79][langNum]; // "<h3>회귀분석</h3>";
    cell[0].style.textAlign = "center";
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.border = "1px solid black";

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.width = "80px";
    }
    cell[0].style.width = "130px";
    cell[0].innerHTML = svgStrU[31][langNum]; // "회귀선";
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.textAlign = "center";
    cell[0].style.border = "1px solid black";
    cell[1].innerHTML = "y = ";
    cell[1].style.textAlign = "right";
    cell[2].innerHTML = f3(alphaR).toString() + " + ";
    cell[2].style.textAlign = "right";
    cell[3].innerHTML = f3(betaR).toString() + "  x";
    cell[3].style.textAlign = "center";

    tobs = Math.sqrt(nobs - 2) * corr / Math.sqrt(1 - corr * corr);
    pvalue = t_cdf(tobs, df, info);
    if (pvalue < 0.5) pvalue = 2 * pvalue;
    else pvalue = 2 * (1 - pvalue)
    row = table.insertRow(++num);
    for (j = 0; j < 5; j++) cell[j] = row.insertCell(j);
    cell[0].innerHTML = svgStr[60][langNum]; // "상관계수";
    cell[1].innerHTML = "r = " + f3(corr).toString();
    cell[2].innerHTML = "H<sub>0</sub>: &rho; = 0<br>H<sub>1</sub>: &rho; &ne; 0";
    cell[3].innerHTML = "t " + svgStr[69][langNum] + " = " + f3(tobs); // "t관찰값";    
    if (pvalue < 0.0001) str = "p " + svgStr[69][langNum] + " < 0.0001";
    else str = "p " + svgStr[69][langNum] + " = " + f4(pvalue).toString();
    cell[4].innerHTML = str;
    for (j = 0; j < 5; j++) {
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
    }

    row = table.insertRow(++num);
    for (j = 0; j < 2; j++) cell[j] = row.insertCell(j);
    cell[0].innerHTML = svgStr[61][langNum]; // "결정계수";  
    cell[1].innerHTML = "r<sup>2</sup> = " + f3(rsquare).toString();
    for (j = 0; j < 2; j++) {
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
    }

    row = table.insertRow(++num);
    for (j = 0; j < 2; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
    }
    cell[0].innerHTML = svgStr[62][langNum]; // "추정오차";  
    cell[1].innerHTML = "s = " + f3(stderr).toString();

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) cell[j] = row.insertCell(j);

    row = table.insertRow(++num);
    for (j = 0; j < ncol - 1; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
    }
    cell[0].innerHTML = svgStr[63][langNum]; // "변량";
    cell[1].innerHTML = svgStr[64][langNum]; // "변량명";
    cell[2].innerHTML = svgStr[44][langNum]; // "자료수";  
    cell[3].innerHTML = svgStr[34][langNum]; // "평균";  
    cell[4].innerHTML = svgStr[35][langNum]; // "표준편차";       

    row = table.insertRow(++num);
    for (j = 0; j < ncol - 1; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.border = "1px solid black";
        cell[j].style.textAlign = "right";
    }
    cell[0].style.textAlign = "center";
    cell[0].style.backgroundColor = "#eee";
    cell[1].style.textAlign = "center";
    cell[0].innerHTML = svgStr[65][langNum] + " x"; // "독립변량 x";
    cell[1].innerHTML = "X";
    cell[2].innerHTML = nobs.toString();
    cell[3].innerHTML = f3(xavg).toString();
    cell[4].innerHTML = f3(xstd).toString();

    row = table.insertRow(++num);
    for (j = 0; j < ncol - 1; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.border = "1px solid black";
        cell[j].style.textAlign = "right";
    }
    cell[0].style.textAlign = "center";
    cell[0].style.backgroundColor = "#eee";
    cell[1].style.textAlign = "center";
    cell[0].innerHTML = svgStr[66][langNum] + " y"; // "종속변량 y";
    cell[1].innerHTML = "Y";
    cell[2].innerHTML = nobs.toString();
    cell[3].innerHTML = f3(yavg).toString();
    cell[4].innerHTML = f3(ystd).toString();

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) cell[j] = row.insertCell(j);
    for (j = 0; j < ncol; j++) cell[j].style.textAlign = "right";

    row = table.insertRow(++num);
    for (j = 0; j < ncol - 1; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
    }
    cell[0].innerHTML = svgStr[67][langNum]; // "모수";
    cell[1].innerHTML = svgStr[68][langNum]; // "추정치";  
    cell[2].innerHTML = svgStrU[18][langNum]; // "표준오차";  
    cell[3].innerHTML = "t " + svgStr[69][langNum]; // "t관찰값";  
    cell[4].innerHTML = "p " + svgStr[69][langNum]; // "p-값 ";   

    temp = stderr * Math.sqrt(1. / nobs + xavg * xavg / sxx);
    tobs = alphaR / temp;
    pvalue = t_cdf(tobs, df, info);
    if (pvalue < 0.5) pvalue = 2 * pvalue;
    else pvalue = 2 * (1 - pvalue);
    row = table.insertRow(++num);
    for (j = 0; j < ncol - 1; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.border = "1px solid black";
    }
    cell[0].style.textAlign = "center";
    cell[0].style.backgroundColor = "#eee";
    cell[0].innerHTML = svgStr[70][langNum]; // "절편";
    cell[1].innerHTML = f3(alphaR).toString();
    cell[2].innerHTML = f3(temp).toString();
    cell[3].innerHTML = f3(tobs).toString();
    if (pvalue < 0.0001) str = "< 0.0001";
    else str = f4(pvalue).toString();
    cell[4].innerHTML = str;

    temp = stderr / Math.sqrt(sxx);
    tobs = betaR / temp;
    pvalue = t_cdf(tobs, df, info);
    if (pvalue < 0.5) pvalue = 2 * pvalue;
    else pvalue = 2 * (1 - pvalue);
    row = table.insertRow(++num);
    for (j = 0; j < ncol - 1; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.border = "1px solid black";
    }
    cell[0].style.textAlign = "center";
    cell[0].style.backgroundColor = "#eee";
    cell[0].innerHTML = svgStr[71][langNum]; // "기울기";
    cell[1].innerHTML = f3(betaR).toString();
    cell[2].innerHTML = f3(temp).toString();
    cell[3].innerHTML = f3(tobs).toString();
    if (pvalue < 0.0001) str = "< 0.0001";
    else str = f4(pvalue).toString();
    cell[4].innerHTML = str;

    row = table.insertRow(++num);
    cell[0] = row.insertCell(0);

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

    mse = sse / (nobs - 2);
    fobs = ssr / mse;
    pvalue = 1 - f_cdf(fobs, 1, nobs - 2, info);
    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.border = "1px solid black";
        cell[j].style.textAlign = "right";
    }
    cell[0].style.textAlign = "center";
    cell[0].style.backgroundColor = "#eee";
    cell[0].innerHTML = svgStr[76][langNum]; // "회귀";
    cell[1].innerHTML = f3(ssr).toString();
    cell[2].innerHTML = "1";
    cell[3].innerHTML = f3(ssr).toString();
    cell[4].innerHTML = f3(fobs).toString();
    if (pvalue < 0.0001) str = "< 0.0001";
    else str = f4(pvalue).toString();
    cell[5].innerHTML = str;

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.border = "1px solid black";
        cell[j].style.textAlign = "right";
    }
    cell[0].style.textAlign = "center";
    cell[0].style.backgroundColor = "#eee";
    cell[0].innerHTML = svgStr[77][langNum]; // "오차";
    cell[0].style.textAlign = "center";
    cell[1].innerHTML = f3(sse).toString();
    cell[2].innerHTML = nobs - 2;
    cell[3].innerHTML = f3(mse).toString();

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.border = "1px solid black";
        cell[j].style.textAlign = "right";
        cell[j].style.backgroundColor = "#eee";
    }
    cell[0].style.textAlign = "center";
    cell[0].style.backgroundColor = "#eee";
    cell[0].innerHTML = svgStr[78][langNum]; // "전체";
    cell[1].innerHTML = f3(ssr + sse).toString();
    cell[2].innerHTML = nobs - 1;

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";
}

