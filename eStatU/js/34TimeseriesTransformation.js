      var svg     = d3.select("#chart"); 
      var i, k, ibegin;
      var svgWidth    = 620;
      var svgHeight   = 400;
      var margin      = {top: 80, bottom: 50, left: 60, right: 60};
      var buffer      = 40;
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var checkTitle  = true;
      var mTitle, yTitle, xTitle;
      var tobs, model, lag, diff; 
      var temp, str, strLabel, strModel, yavg, corr;
      var xobs, xmin, xmax, xgap, gxmin, gxmax, gxrange;
      var yobs, ymin, ymax, ygap, gymin, gymax, gyrange;
      var yminR, ymaxR, ygapR, gyminR, gymaxR, gyrangeR;
      var wobs, baseT1, baseT2, boxP;
      var fontsize  = "1em";
      var numACF    = 12;
      var stat1     = new Array(30);
      var rowmax    = 200;
      var tdata     = new Array(rowmax);
      var xdata     = new Array(rowmax);
      var ydata     = new Array(rowmax);
      var ydiff     = new Array(rowmax);
      var yhat0     = new Array(rowmax);
      var yhat1     = new Array(rowmax);
      var yhat2     = new Array(rowmax);
      var yhat3     = new Array(rowmax);
      var yhat4     = new Array(rowmax);
      var yhat5     = new Array(rowmax);
      var yhat6     = new Array(rowmax);
      var tstat     = new Array(rowmax);
      var tempw     = new Array(rowmax);
      var tempx     = new Array(rowmax);
      var tempy     = new Array(rowmax);
      var acf       = new Array(rowmax);
      xTitle = "t";
      document.getElementById("nn41").disabled = true;    
      document.getElementById("yavg").disabled = true;    
      svg.selectAll("*").remove();
      var weightType = 1;
function weight1() {weightType = 1}
function weight2() {weightType = 2}

      // input data control ===================================================
      d3.select("#data2").on("input", function() {
        stat = simplestat("#data2");  
        ydata = data; 
        yobs = stat.n;
      });
      d3.select("#data1").on("input", function() {
        stat = simplestat("#data1");  
        xdata = data; 
        xobs = stat.n;
      });
      updateData = function() {
        document.getElementById("data1").value = '';
        document.getElementById("data2").value = '';    
      }

      // model type
      var modelType = document.modelForm.model;
      modelType[0].onclick = function() { drawModel0();}    
      modelType[1].onclick = function() { drawModel1();}    
      modelType[2].onclick = function() { drawModel2();}    
      modelType[3].onclick = function() { drawModel3();}    
      modelType[4].onclick = function() { drawModel4();}    
      modelType[5].onclick = function() { drawModel5();}    
      modelType[6].onclick = function() { drawModel6();}    
 
      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        svg.selectAll("*").remove();
        document.getElementById("data1").value  = "";
        document.getElementById("data2").value  = "";
        document.getElementById("mtitle").value = "";
        document.getElementById("ytitle").value = "";
        document.getElementById("nn41").value   = "";
        document.getElementById("yavg").value   = "";
        document.getElementById("model0").checked = false;
        document.getElementById("model1").checked = false;
        document.getElementById("model2").checked = false;
        document.getElementById("model3").checked = false;
        document.getElementById("model4").checked = false;
        document.getElementById("model5").checked = false;
        document.getElementById("model6").checked = false;
        document.getElementById("acf").checked = false;
        document.getElementById("acfDiff").checked = false;
      })     
 
      d3.select("#execute").on("click", function(){  
          svg.selectAll("*").remove();  // 전화면 제거
          modelClear();
          document.getElementById("baseT1").value   = 1; 
          document.getElementById("baseT2").value   = 1; 
          document.getElementById("diff").value     = 1; 
          document.getElementById("boxP").value     = 2; 
          if (xobs > 0) {
            if (yobs != xobs) {alert("size of Y data is not the same as X data"); return;}
          }
          else {
            for (i = 0; i < yobs; i++) {
              tdata[i] = i + 1;   
              xdata[i] = tdata[i];
            }
          }
          tobs = yobs;
          if (tobs < numACF) numACF = tobs-3;
          else if (tobs > 20) {
            numACF = Math.floor( (tobs+1)/ 2);
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
          // 시계열 그림
          nforecast = 0;
          model1Stat(tobs, tdata, xdata, ydata, stat1);
          document.getElementById("nn41").value = yobs;
          yavg = stat1[11];
          document.getElementById("yavg").value = f2(yavg);
          initialCordinate(tobs, xdata, ydata);    
          ibegin = 0;
          strModel = "model0";
          showTimeSeriesPlot2(strModel, tobs, ibegin, xdata, ydata, ydata);
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
          if (model==0) for (j=0; j<30; j++) tstat[j] = yhat0[j];
          else if (model==1) for (j=0; j<30; j++) tstat[j] = yhat1[j];
          else if (model==2) for (j=0; j<30; j++) tstat[j] = yhat2[j];
          else if (model==3) for (j=0; j<30; j++) tstat[j] = yhat3[j];
          else if (model==4) for (j=0; j<30; j++) tstat[j] = yhat4[j];
          else if (model==5) for (j=0; j<30; j++) tstat[j] = yhat5[j];
          else if (model==6) for (j=0; j<30; j++) tstat[j] = yhat6[j];
          transformationTable(strModel, tobs, ydata, tstat); 
      });

      // save Table
      d3.select("#saveTable").on("click", function() {
        head = '<html><head><meta charset="UTF-8"></head><body>';
        tail = '</body></html>';
        saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatULog.html");
      });
      // ACF 그리기
      d3.select("#acf").on("click",function() {
          if(this.checked) drawACF();
          else drawModel2();
      })
      // Diff ACF 그리기
      d3.select("#acfDiff").on("click",function() {
          if(this.checked) drawDiffACF();
          else drawModel3();
      })
function modelClear() {
          document.getElementById("model0").checked = false; 
          document.getElementById("model1").checked = false; 
          document.getElementById("model2").checked = false; 
          document.getElementById("model3").checked = false; 
          document.getElementById("model4").checked = false; 
          document.getElementById("model5").checked = false; 
          document.getElementById("model6").checked = false; 
          document.getElementById("acf").checked    = false; 
          document.getElementById("acfDiff").checked= false; 
}
// Percent change
function drawModel0() {
            model = 0;
            for (i=1; i<tobs; i++) {
              yhat0[i] = 100*((ydata[i]-ydata[i-1])/ydata[i-1]);
            }
            ibegin = 1;
            strModel = svgStrU[115][langNum]; // Percent Change;
            initialCordinate(tobs, xdata, ydata);    
            showTimeSeriesPlot2(strModel, tobs, ibegin, xdata, ydata, yhat0);
}
// Index
function drawModel1(){
            model = 1;
            modelClear();
            document.getElementById("model1").checked = true; 
            baseT1 = parseInt(d3.select("#baseT1").node().value);
            for (i=0; i<tobs; i++) {
              yhat1[i] = 100 * ydata[i] / ydata[baseT1-1];
            }
            ibegin = 0;
            strModel = svgStrU[116][langNum]+" ("+svgStrU[123][langNum]+"="+baseT1+")"; // 단순지수
            initialCordinate(tobs, xdata, ydata);    
            showTimeSeriesPlot2(strModel, tobs, ibegin, xdata, ydata, yhat1);
}
// Lag
function drawModel2(){
            model = 2;
            modelClear();
            document.getElementById("model2").checked = true; 
            document.getElementById("baseT1").value   = 1; 
            document.getElementById("diff").value     = 1; 
            document.getElementById("boxP").value     = 2; 
            lag = parseInt(d3.select("#baseT2").node().value);
            for (i=lag; i<tobs; i++) {
              yhat2[i] = ydata[i-lag];
            }
            autocorrelation(tobs, ydata, acf)
            strModel = svgStrU[117][langNum] + " ("+lag+"), r = "+f3(acf[lag-1]); // 시차
            ibegin = lag;
            initialCordinate(tobs, xdata, ydata);    
            showTimeSeriesPlot2(strModel, tobs, ibegin, xdata, ydata, yhat2);
}
// Draw ACF
function drawACF(){
    drawModel2();
    document.getElementById("model2").checked = true; 
    document.getElementById("acf").checked = true; 
    autocorrelation(tobs, ydata, acf) 
    str = "Autocorrelation function";
    ibegin = 0;
    initialCordinate(tobs, xdata, ydata);    
    showTimeSeriesPlot2(str, tobs, ibegin, xdata, ydata, acf);
    transformationTable(str, numACF-1, yhat2, acf); 
}
// Draw Diff ACF
function drawDiffACF(){
    drawModel3();
    document.getElementById("model3").checked = true; 
    document.getElementById("acfDiff").checked = true; 
    num = tobs-diff;
    for (i=0; i<num; i++) ydiff[i] = yhat3[i+diff];
    autocorrelation(num, ydiff, acf) 
    str = "Autocorrelation function";
    ibegin = diff;
    initialCordinate(num, xdata, ydiff);    
    showTimeSeriesPlot2(str, num, ibegin, xdata, ydiff, acf);
    transformationTable(str, numACF-1, yhat3, acf); 
}
function autocorrelation(num, ylag, acf) {
    var i, temp, meany, variy, covxy, corr;
    // Total y sum of squares
    meany = 0;
    for (i=0; i<num; i++) meany += ylag[i];
    meany = meany / num;
    variy = 0;
    for (i=0; i<num; i++) {
      temp = ylag[i] - meany;
      variy += temp*temp
    }
    // Cross product sum of squares
    for (k=1; k<numACF; k++) {
      covxy = 0;
      for (i=0; i<num-k; i++) covxy += (ylag[i]-meany)*(ylag[i+k]-meany);
      if (covxy == 0) corr = 0;
      else    corr = covxy / variy;
      acf[k-1] = corr;  
    }
}
// Difference
function drawModel3(){
         model = 3;
         modelClear();
         document.getElementById("model3").checked = true; 
         document.getElementById("baseT1").value   = 1; 
         document.getElementById("baseT2").value   = 1; 
         document.getElementById("boxP").value     = 2; 
         for (i=0; i<tobs; i++) yhat3[i] = NaN;
         diff = parseInt(d3.select("#diff").node().value);
         for (i=1; i<tobs; i++) {
            tempw[i] = ydata[i] - ydata[i-1];
            yhat3[i] = tempw[i];
         }
         if (diff > 1) {
            for (i=0; i<tobs; i++) yhat3[i] = NaN;
            for (i=2; i<tobs; i++) {
              tempx[i] = tempw[i] - tempw[i-1];
              yhat3[i] = tempx[i];
            }
         }
         if (diff > 2) {
            for (i=0; i<tobs; i++) yhat3[i] = NaN;
            for (i=3; i<tobs; i++) {
              tempy[i] = tempx[i] - tempx[i-1];
              yhat3[i] = tempy[i];
            }
         }
         ibegin = diff;
         strModel = svgStrU[118][langNum]+" ("+diff+")"; // differencing
         initialCordinate(tobs, xdata, ydata);    
         showTimeSeriesPlot2(strModel, tobs, ibegin, xdata, ydata, yhat3);
}
// Log
function drawModel4() {
            model = 4;
            for (i=0; i<tobs; i++) {
              if (ydata[i] <= 0) {alert("Negative data is not allowed"); return;}
              yhat4[i] = Math.log(ydata[i]);
            }
            ibegin = 0;
            strModel = "Log(Y)";
            initialCordinate(tobs, xdata, ydata);    
            showTimeSeriesPlot2(strModel, tobs, ibegin, xdata, ydata, yhat4);
}
// SQRT
function drawModel5() {
            model = 5;
            for (i=0; i<tobs; i++) {
              if (ydata[i] <= 0) {alert("Negative data is not allowed"); return;}
              yhat5[i] = Math.sqrt(ydata[i]);
            }
            ibegin = 0;
            strModel = "√Y";
            initialCordinate(tobs, xdata, ydata);    
            showTimeSeriesPlot2(strModel, tobs, ibegin, xdata, ydata, yhat5);
}
// Box-Cox
function drawModel6(){
            model = 6;
            modelClear();
            document.getElementById("model6").checked = true; 
            document.getElementById("baseT1").value   = 1; 
            document.getElementById("baseT2").value   = 1; 
            document.getElementById("diff").value     = 1; 
            boxP = parseFloat(d3.select("#boxP").node().value);
            for (i=0; i<tobs; i++) {
              if (ydata[i] <= 0) {alert("Negative data is not allowed"); return;}
              yhat6[i] = (Math.pow(ydata[i],boxP) - 1) / boxP;
            }
            ibegin = 0;
            strModel = "Box-Cox (p="+boxP+")";
            initialCordinate(tobs, xdata, ydata);    
            showTimeSeriesPlot2(strModel, tobs, ibegin, xdata, ydata, yhat6);
}


function transformationTable(strModel, nobs, ydiff, yhat) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);
    var row, header;
    var i, j, k, strModel, temp;
    var ncol = 4;
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
    if (strModel == "Autocorrelation function") {
       cell[0].innerHTML = svgStrU[119][langNum]; //자기상관함수 
    }
    else cell[0].innerHTML = strModel;

    row  = table.insertRow(k++);
    row.style.height ="25px";
    for (j=0; j<ncol; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.backgroundColor = "#eee";
      cell[j].style.textAlign = "center";
      cell[j].style.border = "1px solid black";
    }
    cell[0].innerHTML = "<b>t</b>";
    cell[1].innerHTML = "X(t)";
    if (strModel == "Autocorrelation function") {
       if (model == 2) cell[2].innerHTML = "Y(t-"+lag+")";
       else if (model == 3) cell[2].innerHTML = "▽<sup>"+diff+"</sup>Y(t)";
       cell[3].innerHTML = svgStrU[119][langNum]; //자기상관함수 
    }
    else {
       cell[2].innerHTML = "Y(t)";
       cell[3].innerHTML = strModel;  
    }

    for (i=0; i<nobs; i++) {
       row = table.insertRow(k++);
       for (j=0; j<ncol; j++) {
              cell[j] = row.insertCell(j)          
              cell[j].style.textAlign = "center";
              cell[j].style.border = "1px solid black";
       }
       cell[0].innerHTML = i+1;
       cell[1].innerHTML = xdata[i];
       cell[2].innerHTML = f3(ydiff[i]);
       cell[3].innerHTML = f4(yhat[i]);
       cell[0].style.backgroundColor = "#eee";
       cell[0].style.textAlign = "center";
    }
}
// Time Series Transformation 그리기 함수 -------------------------------------------------------------
function showTimeSeriesPlot2(strModel, nobs, ibegin, xdata, ydata, yhat) {
     svg.selectAll("*").remove();  // 전화면 제거
     var xgrid    = new Array(tobs);
     var ygrid    = new Array(tobs);
     var ygridR   = new Array(tobs);
     var tempx    = new Array(tobs);
     var tempy    = new Array(tobs);
     var i, tx, ty;
     var radius = 3;
     // Yt Right 통계량
     if ( (strModel == "Autocorrelation function") ) {
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
     if ( (strModel == "Autocorrelation function") ) {
       svg.append("text").attr("class","acf")
          .attr("x", margin.left + 20)
          .attr("y", ty)
          .text(svgStrU[119][langNum])     //autocorrelation
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
        var yScaleR = d3.scaleLinear().domain([gyminR,gymaxR]).range([graphHeight, 0])
        ygridR = yScaleR.ticks();
        var tx = margin.left + graphWidth;
/*
        for (i = 1; i < ygridR.length; i++) {
          ty = margin.top + yScaleR(ygridR[i]);
          svg.append("line")
           .attr("x1", margin.left)
           .attr("x2", margin.left + graphWidth)
           .attr("y1", ty)
           .attr("y2", ty)
           .style("stroke", "lightgrey")
        }
*/
        ty = margin.top;
        svg.append("g")
             .attr("transform","translate("+tx+","+ty+")")
	     .attr("class", "main axis date")
             .call(d3.axisRight(yScaleR)) 
             .style("stroke",myColor[1]) 

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
         .style("stroke",myColor[0]) 
      x1 = x2;
      y1 = y2;
    }
     if ( (strModel == "Autocorrelation function") ) {
      // ACF 점 그리기
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
    else if (strModel != "model0") {
      // Transformation 산점도 점 그리기
      for (i=ibegin; i<nobs; i++) {
          svg.append("circle")
             .attr("cx", margin.left+graphWidth*(xdata[i]-gxmin)/gxrange)
             .attr("cy", margin.top+graphHeight-graphHeight*(yhat[i]-gyminR)/gyrangeR)         
             .attr("r", radius)
             .attr("class","circle")
             .style("fill",myColor[1])
      }
      x1  = margin.left + graphWidth*(xdata[ibegin]-gxmin)/gxrange;
      y1  = margin.top  + graphHeight - graphHeight*(yhat[ibegin]-gyminR)/gyrangeR;
      for (i=ibegin+1; i<nobs; i++) {
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
