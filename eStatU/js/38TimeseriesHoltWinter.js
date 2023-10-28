      var svg     = d3.select("#chart"); 
      var i, r, k, k1, k2;
      var svgWidth    = 620;
      var svgHeight   = 400;
      var margin      = {top: 80, bottom: 50, left: 60, right: 60};
      var buffer      = 40;
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var checkTitle  = true;
      var mTitle, yTitle, xTitle;
      var tobs, sst, sse, temp, model, mse, rmse;
      var nforecast = 0;
      var xobs, xmin, xmax, xgap, gxmin, gxmax, gxrange;
      var yobs, ymin, ymax, ygap, gymin, gymax, gyrange;
      var x1, x2, y1, y2;
      var fontsize = "1em";
      var sumS      = new Array(30);      
      var numS      = new Array(30);      
      var minS      = new Array(30);      
      var maxS      = new Array(30);      
      var stat1     = new Array(30);
      var tstat     = new Array(30);
      var rowmax    = 200;
      var tdata     = new Array(rowmax);
      var xdata     = new Array(rowmax);
      var ydata     = new Array(rowmax);
      var MA        = new Array(rowmax);
      var CMA       = new Array(rowmax);
      var yhat      = new Array(rowmax);
      var clow      = new Array(rowmax);
      var chigh     = new Array(rowmax);
      var S         = new Array(rowmax);
      var SI        = new Array(rowmax);
      var L         = new Array(rowmax);
      var T         = new Array(rowmax);
      var dseason   = new Array(rowmax);
      var checkForecast = false;
      xTitle = "t";
      document.getElementById("nn41").disabled = true;    
      document.getElementById("mse").disabled  = true;       
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

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        svg.selectAll("*").remove();
        document.getElementById("data2").value   = "";
        document.getElementById("mtitle").value  = "";
        document.getElementById("ytitle").value  = "";
        document.getElementById("nn41").value    = "";
        document.getElementById("nn42").value    = "0";
        document.getElementById("holtL0").value  = "";    
        document.getElementById("holtT0").value  = "";    
        document.getElementById("mse").value     = "";       
        document.getElementById("holtS01").value = "";    
        document.getElementById("holtS02").value = "";    
        document.getElementById("holtS03").value = "";       
        document.getElementById("holtS04").value = "";       
        document.getElementById("holtS05").value = "";       
        document.getElementById("holtS06").value = "";       
        document.getElementById("holtS07").value = "";       
        document.getElementById("holtS08").value = "";       
        document.getElementById("holtS09").value = "";       
        document.getElementById("holtS10").value = "";       
        document.getElementById("holtS11").value = "";       
        document.getElementById("holtS12").value = "";       
     })

      d3.select("#execute").on("click", function(){  
          svg.selectAll("*").remove();  // 전화면 제거
          document.getElementById("nn42").value = 0;
          tobs = yobs;
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
          }
          model1Stat(tobs, tdata, xdata, ydata, stat1);
          sst = stat1[20];
          document.getElementById("nn41").value = yobs;
          initialCordinate(tobs, tdata, ydata);    
          model = 1;
          showTimeSeriesPlot(model, tobs, nforecast, tdata, ydata, checkTitle);
          // Centered Moving Average for N season period => CMA[i]
            ma1N = parseFloat(d3.select("#ma1N").node().value);
            document.getElementById("nn42").max   = ma1N;
            for (i=0; i<tobs-ma1N+1; i++) {
              sum = 0;
              for (j=i; j<i+ma1N; j++) sum += ydata[j];
              MA[i] = sum / ma1N;
            }
            // N이 홀수 경우
            if (ma1N % 2 == 1) {
              k  = Math.floor((ma1N+1)/2);
              k1 = k-1;
              k2 = tobs - k1;
              for (i=k1; i<k2; i++) {
                CMA[i] = MA[i-k1]
              }
            }
            else {
              k = Math.floor((ma1N)/2);
              k1 = k;
              k2 = tobs - k;
              for (i=k1; i<k2; i++) {
                CMA[i] = 0.5*(MA[i-k1] + MA[i-k1+1]);
              }
            }
          // Seasonal 
            for (i=k1; i<k2; i++)  S[i] = ydata[i] / CMA[i];
            tmin = S[k1];
            tmax = S[k1];
            for (i=k1; i<k2; i++)  {
              if (S[i] > tmax) tmax = S[i];
              if (S[i] < tmin) tmin = S[i];
            }
            for (i=0; i<ma1N; i++) {
              numS[i] = 0;
              sumS[i] = 0; 
              minS[i] = tmax;
              maxS[i] = tmin
            }
            for (i=k1; i<k2; i++) {
              k = i % ma1N;
              numS[k]++;
              sumS[k] += S[i];
              if (S[i] > maxS[k]) maxS[k] = S[i];
              if (S[i] < minS[k]) minS[k] = S[i];
            }
          // Adjusted Seasonal Index
            temp = 0;
            for (k=0; k<ma1N; k++) {
              SI[k] = (sumS[k]-maxS[k]-minS[k]) / (numS[k]-2); 
              temp += SI[k];
            }
            for (k=0; k<ma1N; k++) {
              SI[k] = SI[k] * ma1N / temp;
            }
          // Deseasonal data
            for (i=0; i<tobs; i++) {
              k = i % ma1N;
              S[i] = SI[k];
              dseason[i] = ydata[i] / S[i];
            }
            drawModel1();
/*
          showModel0(tobs, k1, k2, tdata, CMA, dseason);
*/
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
      // create Table
      d3.select("#createTable").on("click", function() {
          if ( nforecast == 0 ) {alert("Enter forecasting period"); return;}
          else forecastTableS(tobs, nforecast, yhat);  
      });
      // save Table
      d3.select("#saveTable").on("click", function() {
        head = '<html><head><meta charset="UTF-8"></head><body>';
        tail = '</body></html>';
        saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatULog.html");
      });
// Holt Winter's Seasonal Model
function drawModel1() {
            var t, strS;
            holtAlpha = parseFloat(d3.select("#holtAlpha").node().value);
            holtBeta  = parseFloat(d3.select("#holtBeta").node().value);
            holtGamma = parseFloat(d3.select("#holtGamma").node().value);
            holtL0    = parseFloat(d3.select("#holtL0").node().value);
            holtT0    = parseFloat(d3.select("#holtT0").node().value);
            holtS01   = parseFloat(d3.select("#holtS01").node().value);
            if (isNaN(holtAlpha) || holtAlpha <= 0 || holtAlpha >=1) {
              alert("Wrong input, α !!!");
              return;
            }
            if (isNaN(holtBeta) || holtBeta <= 0 || holtBeta >=1) {
              alert("Wrong input, β !!!");
              return;
            }
            if (isNaN(holtGamma) || holtGamma <= 0 || holtGamma >=1) {
              alert("Wrong input, γ !!!");
              return;
            }
            if ( isNaN(holtL0) ) {
              holtL0 = stat1[7];
              document.getElementById("holtL0").value = f2(holtL0);
            }
            if ( isNaN(holtT0) ) {
              holtT0 = stat1[8];
              document.getElementById("holtT0").value = f2(holtT0);
            }
            if ( isNaN(holtS01) ) {
              for(i=0; i<ma1N; i++) {
                strS = "holtS0"+(i+1).toString();
                document.getElementById(strS).value = f3(SI[i]);
              }
            }
            else {
              for(i=0; i<ma1N; i++) {
                strS = "#holtS0"+(i+1).toString();
                SI[i] = parseFloat(d3.select(strS).node().value); 
              }
            }
            // Holt-Winter
              L[0] = holtAlpha*ydata[0]/SI[0] + (1-holtAlpha)*(holtL0+holtT0);
              T[0] = holtBeta*(L[0]-holtL0) + (1-holtBeta)*holtT0;
              S[0] = holtGamma*ydata[0]/(holtL0+holtT0) + (1-holtGamma)*SI[0];
              yhat[0] = (holtL0 + holtT0)*SI[0];
              temp = ydata[0] - yhat[0];
              sse  = temp * temp;
            for (i=1; i<ma1N; i++) {
              L[i] = holtAlpha*ydata[i]/SI[i] + (1-holtAlpha)*(L[i-1]+T[i-1]);
              T[i] = holtBeta*(L[i]-L[i-1]) + (1-holtBeta)*T[i-1];
              S[i] = holtGamma*ydata[i]/(L[i-1]+T[i-1]) + (1-holtGamma)*SI[i];
              yhat[i] = (L[i-1] + T[i-1])*SI[i];
              temp = ydata[i] - yhat[i];
              sse  = temp * temp;
            }
            for (i=ma1N; i<tobs; i++) {
              L[i] = holtAlpha*ydata[i]/S[i-ma1N] + (1-holtAlpha)*(L[i-1]+T[i-1]);
              T[i] = holtBeta*(L[i]-L[i-1]) + (1-holtBeta)*T[i-1];
              S[i] = holtGamma*ydata[i]/(L[i-1]+T[i-1]) + (1-holtGamma)*S[i-ma1N];
              yhat[i] = (L[i-1] + T[i-1])*S[i-ma1N];
              temp = ydata[i] - yhat[i];
              sse  = temp * temp;
            }
            mse = sse / tobs;
            rmse = Math.sqrt(mse);
            document.getElementById("mse").value = f4(rmse);
            if (nforecast > 0) {
              for (i=tobs; i<tobs+nforecast; i++) {
                yhat[i] = (L[tobs-1] + (i+1-tobs)*T[tobs-1])*S[i-ma1N];
                clow[i]  = yhat[i] - 1.96*rmse*Math.sqrt(k);
                chigh[i] = yhat[i] + 1.96*rmse*Math.sqrt(k);
              }
              confidenceBand(model, tobs, nforecast, clow, chigh);
            }
            ibegin = 0;
            strLabel = "reglabel"+model;
            strModel = svgStrU[132][langNum]+" (α="+holtAlpha+", β="+holtBeta+", γ="+holtGamma+")";
            showModel(strModel, strLabel, tobs, nforecast, ibegin, xdata, yhat);

}
// 
function showModel0(tobs, k1, k2, tdata, yhat, ydata) {
     var cx, cy;
     var x1, y1, x2, y2;
     // plot CMA yhat[i]
     for (i=k1; i<k2; i++) {
       cx = margin.left+graphWidth*(tdata[i]-gxmin)/gxrange;
       cy = margin.top+graphHeight-graphHeight*(yhat[i]-gymin)/gyrange; 
       svg.append("circle").attr("class","reglabel0")
          .attr("cx", cx)
          .attr("cy", cy)         
          .attr("r", 3)
          .style("fill",myColor[13])
     }
     x1  = margin.left + graphWidth*(tdata[k1]-gxmin)/gxrange;
     y1  = margin.top  + graphHeight - graphHeight*(yhat[k1]-gymin)/gyrange;
     for (i=k1+1; i<k2; i++) {
       x2  = margin.left + graphWidth*(tdata[i]-gxmin)/gxrange;
       y2  = margin.top  + graphHeight - graphHeight*(yhat[i]-gymin)/gyrange;
       svg.append("line").attr("class","reglabel0")
          .attr("x1",x1)
          .attr("y1",y1)
          .attr("x2",x2)
          .attr("y2",y2)
          .style("stroke",myColor[13]) 
       x1 = x2;
       y1 = y2;
     }
     // plot Deseasonal ydata[i]
     for (i=0; i<tobs; i++) {
       cx = margin.left+graphWidth*(tdata[i]-gxmin)/gxrange;
       cy = margin.top+graphHeight-graphHeight*(ydata[i]-gymin)/gyrange; 
       svg.append("circle").attr("class","reglabel0")
          .attr("cx", cx)
          .attr("cy", cy)         
          .attr("r", 3)
          .style("fill","red")
     }
     x1  = margin.left + graphWidth*(tdata[0]-gxmin)/gxrange;
     y1  = margin.top  + graphHeight - graphHeight*(ydata[0]-gymin)/gyrange;
     for (i=1; i<tobs; i++) {
       x2  = margin.left + graphWidth*(tdata[i]-gxmin)/gxrange;
       y2  = margin.top  + graphHeight - graphHeight*(ydata[i]-gymin)/gyrange;
       svg.append("line").attr("class","reglabel0")
          .attr("x1",x1)
          .attr("y1",y1)
          .attr("x2",x2)
          .attr("y2",y2)
          .style("stroke","red") 
       x1 = x2;
       y1 = y2;
     }
     // title   
     svg.append("text").attr("class","reglabel0")
                .attr("x", margin.left + graphWidth/2)
                .attr("y", margin.top + graphHeight - 40)
                .text("Centered MA("+ma1N+")")
                .style("stroke",myColor[13]) 
     svg.append("text").attr("class","reglabel0")
                .attr("x", margin.left + graphWidth/2)
                .attr("y", margin.top + graphHeight - 20)
                .text("Deseasonalized Data")
                .style("stroke","red") 

}
// 회귀선 그리기 함수
function showModel1(stat, checkTitle) {
     var cx, cy, temp;
     var x1, y1, x2, y2;
     // forecasting
     for (i=tobs; i<tobs+nforecast; i++) {
          temp = (stat[7]+stat[8]*tdata[i])*SI[i % ma1N];
          cx = margin.left+graphWidth*(tdata[i]-gxmin)/gxrange;
          cy = margin.top+graphHeight-graphHeight*(temp-gymin)/gyrange; 
          svg.append("circle").attr("class","reglabel1")
             .attr("cx", cx)
             .attr("cy", cy)         
             .attr("r", 3)
             .style("fill",myColor[1])
     }
     x1  = margin.left + graphWidth*(tdata[tobs-1]-gxmin)/gxrange;
     y1  = margin.top  + graphHeight - graphHeight*(ydata[tobs-1]-gymin)/gyrange;
     for (i=tobs; i<tobs+nforecast; i++) {
          temp = (stat[7]+stat[8]*tdata[i])*SI[i % ma1N];
          x2 = margin.left+graphWidth*(tdata[i]-gxmin)/gxrange;
          y2 = margin.top+graphHeight-graphHeight*(temp-gymin)/gyrange; 
          svg.append("line").attr("class","reglabel1")
                .attr("x1",x1)
                .attr("y1",y1)
                .attr("x2",x2)
                .attr("y2",y2)
                .style("stroke",myColor[1])
          x1 = x2;
          y1 = y2; 
     }

     // trend line
     x1  = margin.left + graphWidth*(stat[3]-gxmin)/gxrange;
     y1  = margin.top  + graphHeight - graphHeight*((stat[7]+stat[8]*stat[3])-gymin)/gyrange;
     x2  = margin.left + graphWidth*(xmax-gxmin)/gxrange;
     y2  = margin.top  + graphHeight - graphHeight*((stat[7]+stat[8]*xmax)-gymin)/gyrange;
     svg.append("line").attr("class","reglabel1")
                .attr("x1",x1)
                .attr("y1",y1)
                .attr("x2",x2)
                .attr("y2",y2)
                .style("stroke",myColor[1]) 


     if(checkTitle) {   
        svg.append("text").attr("class","reglabel1")
                .attr("x", margin.left + 20)
                .attr("y", margin.top +  20)
                .text("y = ("+f4(stat[7])+") + ("+f4(stat[8])+ ") t , " + " r\u00B2 = "+f4(stat[10]))
                .style("stroke",myColor[1]) 
     }
}
function redrawModel1() {
     clearModel1();
     drawModel1();
}
function clearModel1() {
     svg.selectAll("circle.reglabel1").remove();
     svg.selectAll("line.reglabel1").remove();
     svg.selectAll("text.reglabel1").remove();
     svg.selectAll("circle.forecast1").remove();
}
// Remove Regression Line of Simulation
function clearScreen(){
     svg.selectAll("*").remove();
     svg.selectAll("circle.reglabel1").remove();
     svg.selectAll("line.reglabel1").remove();
     svg.selectAll("text.reglabel1").remove();
     svg.selectAll("circle.forecast1").remove();
     nforecast = parseFloat(d3.select("#nn42").node().value);
     for (i=0; i<tobs; i++) xdata[i] = tdata[i];  
     model1Stat(tobs, tdata, xdata, ydata, stat1);
     for (i=tobs; i<tobs+nforecast; i++) {
       tdata[i] = i+1;
       xdata[i] = tdata[i];
       ydata[i] = stat1[7] + stat1[8]*tdata[i];
     }
     initialCordinateS(tobs+nforecast, tdata, ydata);
     checkForecast = false;
     model = 1;
     showTimeSeriesPlot(model, tobs, nforecast, tdata, ydata, checkTitle);
     drawModel1()
}
function removeRegression1() {
     svg.selectAll("circle.reglabel1").remove();
     svg.selectAll("line.reglabel1").remove();
     svg.selectAll("text.reglabel1").remove();
     svg.selectAll("circle.forecast1").remove();
}

function forecastTableS(nobs, nforecast, yhat) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);
    var row, header;
    var i, j, k, strModel, temp;
    var ncol = 3;
    var cell = new Array(4);
    table.style.fontSize = "13px";

    k = 0;
    row = table.insertRow(k++);
    row.style.height ="30px";
    for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
    }
    cell[0].innerHTML = "<b>"+svgStrU[127][langNum]+"</b>";
    cell[1].innerHTML = svgStrU[132][langNum]; // Holt-Winters Seasonal Model;
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
       cell[0].innerHTML = i;
       cell[1].innerHTML = f4(yhat[i]);
       cell[2].innerHTML = "( "+f4(clow[i])+ " , "+f4(chigh[i])+ ")";
       cell[0].style.backgroundColor = "#eee";
       cell[0].style.textAlign = "center";
    }
}

// Seasonal time series plot 좌표 계산
function initialCordinateS(tobs, tdata, ydata) {
     xmin = 1;
     xmax = tobs;
     xgap = xmax - xmin;
     xgap = (xmax - xmin) / 20;
     gxmin   = xmin - xgap;
     gxmax   = xmax + xgap;
     gxrange = gxmax - gxmin;
     // Yt 통계량
     ymin = ydata[0];
     ymax = ydata[0];
     for (i=1; i<tobs; i++) {
        if (ymin > ydata[i]) ymin = ydata[i];
        if (ymax < ydata[i]) ymax = ydata[i];
     } 
     ygap    = (ymax*1.2 - ymin) / 10;
     gymin   = ymin - ygap;
     gymax   = ymax*1.2 + ygap;
     gyrange = gymax - gymin;
}

