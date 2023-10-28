      var svg     = d3.select("#chart"); 
      var i, ibegin;
      var svgWidth    = 620;
      var svgHeight   = 400;
      var margin      = {top: 80, bottom: 50, left: 60, right: 60};
      var buffer      = 40;
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var checkTitle  = true;
      var mTitle, yTitle, xTitle;
      var tobs, sse, mse1, mse2, mse3, mse4; 
      var temp, model, str, strLabel, strModel, yavg;
      var nforecast = 0;
      var ma1N, ma2N, b1, b2, es1Alpha, S0, holtAlpha, holtBeta, holtL0, hlotT0;
      var xobs, xmin, xmax, xgap, gxmin, gxmax, gxrange;
      var yobs, ymin, ymax, ygap, gymin, gymax, gyrange;
      var fontsize = "1em";
      var stat1     = new Array(30);
      var rowmax    = 200;
      var tstat     = new Array(rowmax);
      var tdata     = new Array(rowmax);
      var xdata     = new Array(rowmax);
      var ydata     = new Array(rowmax);
      var yhat1     = new Array(rowmax);
      var yhat2     = new Array(rowmax);
      var yhat3     = new Array(rowmax);
      var yhat4     = new Array(rowmax);
      var MA1       = new Array(rowmax);
      var MA2       = new Array(rowmax);
      var ES1       = new Array(rowmax);
      var ES2       = new Array(rowmax);
      var S         = new Array(rowmax);
      var L         = new Array(rowmax);
      var T         = new Array(rowmax);
      var clow1     = new Array(rowmax);
      var clow2     = new Array(rowmax);
      var clow3     = new Array(rowmax);
      var clow4     = new Array(rowmax);
      var chigh1    = new Array(rowmax);
      var chigh2    = new Array(rowmax);
      var chigh3    = new Array(rowmax);
      var chigh4    = new Array(rowmax);
      var checkModel    = new Array(10);
      var checkForecast = false;
      for (i=1; i<=4; i++) checkModel[i] = false;
      xTitle = "t";
      document.getElementById("nn41").disabled = true;    
      document.getElementById("yavg").disabled = true;    
      document.getElementById("mse1").disabled = true;    
      document.getElementById("mse2").disabled = true;    
      document.getElementById("mse3").disabled = true;    
      document.getElementById("mse4").disabled = true;    
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
        document.getElementById("data2").value  = "";
        document.getElementById("mtitle").value = "";
        document.getElementById("ytitle").value = "";
        document.getElementById("nn41").value   = "";
        document.getElementById("nn42").value   = "0";
        document.getElementById("yavg").value   = "";
        document.getElementById("mse1").value   = "";    
        document.getElementById("mse2").value   = "";       
        document.getElementById("mse3").value   = "";       
        document.getElementById("mse4").value   = "";       
        document.getElementById("S0").value     = "";       
        document.getElementById("holtL0").value = "";       
        document.getElementById("holtT0").value = "";       
        document.getElementById("model1").checked  = false;
        document.getElementById("model2").checked  = false;
        document.getElementById("model3").checked  = false;
        document.getElementById("model4").checked  = false;
      })
    
      d3.select("#execute").on("click", function(){ 
          clearExecute();
          document.getElementById("nn42").value = 0;
          document.getElementById("model1").checked=false;
          document.getElementById("model2").checked=false;
          document.getElementById("model3").checked=false;
          document.getElementById("model4").checked=false;
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
          document.getElementById("nn41").value = yobs;
          yavg = stat1[11];
          document.getElementById("yavg").value = f2(yavg);
          initialCordinate(tobs, tdata, ydata);    
          model = 1;
          showTimeSeriesPlot(model, tobs, nforecast, tdata, ydata, checkTitle);
      })

      // Single MA 그리기
      d3.select("#model1").on("click",function() {
          if(this.checked) drawModel1();
          else clearModel1();
      })
      // Single ES 그리기
      d3.select("#model2").on("click",function() {
          if(this.checked) drawModel2();
          else clearModel2();
      })
      // Double MA 그리기
      d3.select("#model3").on("click",function() {
          if(this.checked) drawModel3();
          else clearModel3();
      })
      // Holt's Linear ES 그리기
      d3.select("#model4").on("click",function() {
          if(this.checked) drawModel4();
          else clearModel4();
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
          if ( checkModel[1] ) forecastTable(1, tobs, nforecast, yhat1, clow1, chigh1);  
          if ( checkModel[2] ) forecastTable(2, tobs, nforecast, yhat2, clow2, chigh2);  
          if ( checkModel[3] ) forecastTable(3, tobs, nforecast, yhat3, clow3, chigh3);  
          if ( checkModel[4] ) forecastTable(4, tobs, nforecast, yhat4, clow4, chigh4);  
      });
      // save Table
      d3.select("#saveTable").on("click", function() {
        head = '<html><head><meta charset="UTF-8"></head><body>';
        tail = '</body></html>';
        saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatULog.html");
      });
// Single MA
function drawModel1(){
            model = 1;
            ma1N = parseFloat(d3.select("#ma1N").node().value);
            checkModel[1] = true;
            document.getElementById("model1").checked = true;
            for (i=ma1N-1; i<tobs; i++) {
              sum = 0;
              for (j=i; j>i-ma1N; j--) sum += ydata[j];
              yhat1[i+1] = sum / ma1N;
            }
            sse = 0;
            for (i=ma1N; i <tobs; i++) {
              temp = ydata[i] - yhat1[i];
              sse += temp*temp;
            }
            mse1 = sse / (tobs-ma1N);
            document.getElementById("mse1").value = f4(Math.sqrt(mse1));
            for (i=tobs+1; i<tobs+nforecast; i++) yhat1[i] = yhat1[tobs];
        if (nforecast > 0) {
            // confidence interval
            for (i=tobs; i<tobs+nforecast; i++) {
               temp = Math.sqrt(mse1/ma1N)
               clow1[i]  = yhat1[i] - 1.96*temp*Math.sqrt(i-tobs+1);
               chigh1[i] = yhat1[i] + 1.96*temp*Math.sqrt(i-tobs+1);;
            }
        }
            ibegin = ma1N;
            strLabel = "reglabel"+model;
            strModel = svgStrU[128][langNum]+" MA(N="+ma1N+")"; // single Moving Average
            showModel(strModel, strLabel, tobs, nforecast, ibegin, xdata, yhat1, clow1, chigh1);
}
// Single ES
function drawModel2() {
            model = 2;
            checkModel[2] = true;
            document.getElementById("model2").checked = true;
            es1Alpha = parseFloat(d3.select("#es1Alpha").node().value);
            S0 = parseFloat(d3.select("#S0").node().value);
            if ( isNaN(S0) ) {
              S0 = ydata[0];
              document.getElementById("S0").value = f2(S0);
            }
            S[0] = es1Alpha*ydata[0] + (1-es1Alpha)*S0;
            yhat2[0] = S0;
            for (i=1; i<tobs; i++) {
              S[i] = es1Alpha*ydata[i] + (1-es1Alpha)*S[i-1];
              yhat2[i] = S[i-1];
            }
            sse  = 0;
            for (i=0; i<tobs; i++) {
              temp = ydata[i] - yhat2[i];
              sse += temp * temp;
            }
            mse2 = sse / tobs;
            document.getElementById("mse2").value = f4(Math.sqrt(mse2));
            for (i=tobs; i<tobs+nforecast; i++) yhat2[i] = S[tobs-1];
        if (nforecast > 0) {
            // confidence interval
            for (i=tobs; i<tobs+nforecast; i++) {
               temp1 = Math.sqrt(mse2);
               temp = temp1*Math.sqrt(es1Alpha/(2-es1Alpha));
               clow2[i]  = yhat2[i] - 1.96*temp*Math.sqrt(i-tobs+1);
               chigh2[i] = yhat2[i] + 1.96*temp*Math.sqrt(i-tobs+1);
            }
        }
            ibegin = 0;
            strLabel = "reglabel"+model;
            strModel = svgStrU[125][langNum]+" ES(α="+es1Alpha+")"; //지수평활
            showModel(strModel, strLabel, tobs, nforecast, ibegin, xdata, yhat2, clow2, chigh2);
}
// Double MA
function drawModel3() {
            model = 3;
            ma2N = parseFloat(d3.select("#ma2N").node().value);
            ma1N = ma2N;
            checkModel[3] = true;
            document.getElementById("model3").checked = true;
            for (i=ma1N-1; i<tobs; i++) {
              sum = 0;
              for (j=i; j>i-ma1N; j--) sum += ydata[j];
              MA1[i] = sum / ma1N;
            }
            for (i=ma1N+ma2N-2; i<tobs; i++) {
              sum = 0;
              for (j=i; j>i-ma2N; j--) sum += MA1[j];
              MA2[i] = sum / ma2N;
              b2 = 2*(MA1[i] - MA2[i])/(ma1N-1);        // slope at time i
              yhat3[i+1] = 2*MA1[i] - MA2[i] + b2;  // one time forecast
            }
            sse = 0;
            for (i=ma1N+ma2N-1; i <tobs; i++) {
              temp = ydata[i] - yhat3[i];
              sse += temp*temp;
            }
            mse3 = sse / (tobs-ma1N-ma2N+1);
            document.getElementById("mse3").value = f4(Math.sqrt(mse3));
            for (i=tobs+1; i<tobs+nforecast; i++) yhat3[i] = yhat3[tobs] + b2*(i-tobs);
        if (nforecast > 0) {
            // confidence interval
            for (i=tobs; i<tobs+nforecast; i++) {
               temp = Math.sqrt(mse3/(ma1N+ma2N-1));
               clow3[i]  = yhat3[i] - 1.96*temp*Math.sqrt(i-tobs+1);
               chigh3[i] = yhat3[i] + 1.96*temp*Math.sqrt(i-tobs+1);
            }
        }
            ibegin = ma1N+ma2N-1;
            strLabel = "reglabel"+model;
            strModel = svgStrU[129][langNum]+" (N="+ma2N+")"; // 이중이동평균
            showModel(strModel, strLabel, tobs, nforecast, ibegin, xdata, yhat3, clow3, chigh3);
}
// Holt's Linear ES
function drawModel4() {
            model = 4;
            checkModel[4] = true;
            document.getElementById("model4").checked = true;
            holtAlpha = parseFloat(d3.select("#holtAlpha").node().value);
            holtBeta  = parseFloat(d3.select("#holtBeta").node().value);
            holtL0    = parseFloat(d3.select("#holtL0").node().value);
            holtT0    = parseFloat(d3.select("#holtT0").node().value);
            if ( isNaN(holtL0) ) {
              holtL0 = stat1[7];
              document.getElementById("holtL0").value = f2(holtL0);
            }
            if ( isNaN(holtT0) ) {
              holtT0 = stat1[8];
              document.getElementById("holtT0").value = f2(holtT0);
            }
            L[0] = holtAlpha*ydata[0] + (1-holtAlpha)*(holtL0+holtT0);
            T[0] = holtBeta*(L[0]-holtL0) + (1-holtBeta)*holtT0;
            yhat4[0] = holtL0 + holtT0;
            temp = ydata[0] - yhat4[0];
            sse  = temp * temp;
            for (i=1; i<tobs; i++) {
              L[i] = holtAlpha*ydata[i] + (1-holtAlpha)*(L[i-1]+T[i-1]);
              T[i] = holtBeta*(L[i]-L[i-1]) + (1-holtBeta)*T[i-1];
              yhat4[i] = L[i-1] + T[i-1];
              temp = ydata[i] - yhat4[i];
              sse += temp * temp;
            }
            mse4 = sse / tobs;
            document.getElementById("mse4").value = f4(Math.sqrt(mse4));
            for (i=tobs; i<tobs+nforecast; i++) yhat4[i] = L[tobs-1] + (i+1-tobs)*T[tobs-1];
        if (nforecast > 0) {
            // confidence interval
            for (i=tobs; i<tobs+nforecast; i++) {
               temp = Math.sqrt(mse4);
               clow4[i]  = yhat4[i] - 1.96*temp*Math.sqrt(i-tobs+1);
               chigh4[i] = yhat4[i] + 1.96*temp*Math.sqrt(i-tobs+1);
            }
        }
            ibegin = 0;
            strLabel = "reglabel"+model;
            strModel = svgStrU[130][langNum]+" (α="+holtAlpha+", β="+holtBeta+")";
            showModel(strModel, strLabel, tobs, nforecast, ibegin, xdata, yhat4, clow4, chigh4);
}
function redrawModel1() {
  clearModel1();
  drawModel1();
}
function redrawModel2() {
  clearModel2();
  drawModel2();
}
function redrawModel3() {
  clearModel3();
  drawModel3();
}
function redrawModel4() {
  clearModel4();
  drawModel4();
}
function clearModel1() {
     checkModel[1] = false;
     document.getElementById("model1").checked = false;
     document.getElementById("mse1").value = "";
     svg.selectAll("circle.reglabel1").remove();
     svg.selectAll("line.reglabel1").remove();
     svg.selectAll("text.reglabel1").remove();
     svg.selectAll("path.reglabel1").remove();
     svg.selectAll("circle.forecast1").remove();
}
function clearModel2() {
     checkModel[2] = false;
     document.getElementById("model2").checked = false;
     document.getElementById("S0").value = "";
     document.getElementById("mse2").value = "";
     svg.selectAll("circle.reglabel2").remove();
     svg.selectAll("line.reglabel2").remove();
     svg.selectAll("text.reglabel2").remove();
     svg.selectAll("path.reglabel2").remove();
     svg.selectAll("circle.forecast2").remove();
}
function clearModel3() {
     checkModel[3] = false;
     document.getElementById("model3").checked = false;
     document.getElementById("mse3").value = "";
     svg.selectAll("circle.reglabel3").remove();
     svg.selectAll("line.reglabel3").remove();
     svg.selectAll("text.reglabel3").remove();
     svg.selectAll("path.reglabel3").remove();
     svg.selectAll("circle.forecast3").remove();
}
function clearModel4() {
     checkModel[4] = false;
     document.getElementById("model4").checked = false;
     document.getElementById("holtL0").value = "";
     document.getElementById("holtT0").value = "";
     document.getElementById("mse4").value = "";
     svg.selectAll("circle.reglabel4").remove();
     svg.selectAll("line.reglabel4").remove();
     svg.selectAll("text.reglabel4").remove();
     svg.selectAll("path.reglabel4").remove();
     svg.selectAll("circle.forecast4").remove();
}
function showModel(strModel, strLabel, nobs, nforecast, ibegin, xdata, yhat, clow, chigh) {
     // confidence interval
     confidenceBand(model, tobs, nforecast, clow, chigh);
    var ty = margin.top + model*20;;
    for (i=ibegin; i<nobs+nforecast; i++) {
          svg.append("circle").attr("class",strLabel)
             .attr("cx", margin.left+graphWidth*(xdata[i]-gxmin)/gxrange)
             .attr("cy", margin.top+graphHeight-graphHeight*(yhat[i]-gymin)/gyrange)         
             .attr("r", 3)
             .style("fill",myColor[model])
    }

    var x1  = margin.left + graphWidth*(xdata[ibegin]-gxmin)/gxrange;
    var y1  = margin.top  + graphHeight - graphHeight*(yhat[ibegin]-gymin)/gyrange;
    for (i=ibegin+1; i<nobs+nforecast; i++) {
      var x2  = margin.left + graphWidth*(xdata[i]-gxmin)/gxrange;
      var y2  = margin.top  + graphHeight - graphHeight*(yhat[i]-gymin)/gyrange;
      svg.append("line").attr("class",strLabel)
                .attr("x1",x1)
                .attr("y1",y1)
                .attr("x2",x2)
                .attr("y2",y2)
                .style("stroke",myColor[model]) 
      x1 = x2;
      y1 = y2;
    }
    if(checkTitle) {   
        svg.append("text").attr("class",strLabel)
                .attr("x", margin.left + 20)
                .attr("y", ty)
                .text(strModel)
                .style("stroke",myColor[model]) 
     }
}
// clear parameter
function clearExecute() {
     svg.selectAll("*").remove();
     document.getElementById("ma1N").value = 3;
     document.getElementById("ma2N").value = 3;
     document.getElementById("es1Alpha").value = 0.3;
     document.getElementById("holtAlpha").value = 0.3;
     document.getElementById("holtBeta").value = 0.3;
     document.getElementById("S0").value = "";
     document.getElementById("holtL0").value = "";
     document.getElementById("holtT0").value = "";
     document.getElementById("mse1").value = "";
     document.getElementById("mse2").value = "";
     document.getElementById("mse3").value = "";
     document.getElementById("mse4").value = "";
} 
function clearScreen(){
     clearExecute();
     nforecast = parseFloat(d3.select("#nn42").node().value);
     for (i=0; i<tobs; i++) xdata[i] = tdata[i];  
     model1Stat(tobs, tdata, xdata, ydata, stat1);
     for (i=tobs; i<tobs+nforecast; i++) {
       tdata[i] = i+1;
       xdata[i] = tdata[i];
       ydata[i] = stat1[7] + stat1[8]*tdata[i];
     }
     initialCordinate(tobs+nforecast, tdata, ydata);
     showTimeSeriesPlot(model, tobs, nforecast, tdata, ydata, checkTitle);
     if ( checkModel[1] ) drawModel1();
     if ( checkModel[2] ) drawModel2();
     if ( checkModel[3] ) drawModel3();
     if ( checkModel[4] ) drawModel4();
}
function forecastTable(model, nobs, nforecast, yhat, clow, chigh) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);
    var row, header;
    var i, j, k, strModel, temp;
    var ncol = 3;
    var cell = new Array(4);
    table.style.fontSize = "13px";
    switch (model) {
      case 1:
        strModel = svgStrU[128][langNum]+" (N="+ma1N+")"; //"Single Moving Average 
        break;
      case 2:
        strModel = svgStrU[125][langNum]+" (α="+es1Alpha+")";
        break;
      case 3:
        strModel = svgStrU[129][langNum]+" (N="+ma2N+")";
        break;
      case 4:
        strModel = svgStrU[130][langNum]+" (α="+holtAlpha+", β="+holtBeta+")";
        break;
    }

    k = 0;
    row = table.insertRow(k++);
    row.style.height ="30px";
    for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
    }
    cell[0].innerHTML = "<b>"+svgStrU[127][langNum]+"</b> "+model;
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
