      var svg     = d3.select("#chart"); 
      var i, k, k1, k2;
      var svgWidth    = 620;
      var svgHeight   = 400;
      var margin      = {top: 80, bottom: 50, left: 60, right: 60};
      var buffer      = 40;
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var checkTitle  = true;
      var mTitle, yTitle, xTitle;
      var tobs; 
      var temp, model, str, strLabel, strModel, yavg;
      var nforecast = 0;
      var ma1N, ma2N, mm1N, es1Alpha, es2Alpha, S01, S02;
      var xobs, xmin, xmax, xgap, gxmin, gxmax, gxrange;
      var yobs, ymin, ymax, ygap, gymin, gymax, gyrange;
      var fontsize = "1em";
      var stat1     = new Array(30);
      var tstat     = new Array(30);
      var rowmax    = 200;
      var tdata     = new Array(rowmax);
      var xdata     = new Array(rowmax);
      var ydata     = new Array(rowmax);
      var yhat1     = new Array(rowmax);
      var yhat2     = new Array(rowmax);
      var yhat3     = new Array(rowmax);
      var yhat4     = new Array(rowmax);
      var yhat5     = new Array(rowmax);
      var MA        = new Array(rowmax);
      var S         = new Array(rowmax);
      var MM        = new Array(rowmax);
      var tempd     = new Array(rowmax);
      var checkModel    = new Array(10);
      var checkForecast = false;
      xTitle = "t";
      document.getElementById("nn41").disabled = true;    
      document.getElementById("yavg").disabled = true;    
      svg.selectAll("*").remove();
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
        document.getElementById("data2").value = '';    
      }
      updateData = function() {
        document.getElementById("data1").value = '';    
      }
      
      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        svg.selectAll("*").remove();
        document.getElementById("data1").value  = "";
        document.getElementById("data2").value  = "";
        document.getElementById("mtitle").value = "";
        document.getElementById("ytitle").value = "";
        document.getElementById("nn41").value   = "";
        document.getElementById("yavg").value   = "";
        document.getElementById("S01").value    = "";
        document.getElementById("S02").value    = "";
        document.getElementById("model1").checked = false;
        document.getElementById("model2").checked = false;
        document.getElementById("model3").checked = false;
        document.getElementById("model4").checked = false;
        document.getElementById("model5").checked = false;
      })

      d3.select("#execute").on("click", function(){  
          svg.selectAll("*").remove();  // 전화면 제거
          if (xobs > 0) {
            if (yobs != xobs) {alert("size of Y data is not the same as X data"); return;}
          }
          else {
            for (i = 0; i < yobs; i++) {
              tdata[i] = i + 1;   
              xdata[i] = tdata[i];
            }
          }
          // 입력 도수에 숫자 문자 빈칸 있나 체크
          tobs = yobs;
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
          document.getElementById("model1").checked = false;
          document.getElementById("model2").checked = false;
          document.getElementById("model3").checked = false;
          document.getElementById("model4").checked = false;
          document.getElementById("model5").checked = false;
          for (i=1; i<=5; i++) checkModel[i] = false;
          document.getElementById("ma1N").value     = 3;
          document.getElementById("ma2N").value     = 7;
          document.getElementById("es1Alpha").value = 0.1;
          document.getElementById("es2Alpha").value = 0.3;
          document.getElementById("S01").value      = "";
          document.getElementById("S02").value      = "";
          document.getElementById("mm1N").value     = 3;
          // 시계열그림
          nforecast = 0;
          model1Stat(tobs, tdata, xdata, ydata, stat1);
          document.getElementById("nn41").value = yobs;
          yavg = stat1[11];
          document.getElementById("yavg").value = f2(yavg);
          model = 1;
          initialCordinate(tobs, xdata, ydata);    
          showTimeSeriesPlot(model, tobs, nforecast, xdata, ydata, checkTitle);
      })

      // Single MA1 그리기
      d3.select("#model1").on("click",function() {
          if(this.checked) drawModel1();
          else clearModel1();
      })
      // Single MA2 그리기
      d3.select("#model2").on("click",function() {
          if(this.checked) drawModel2();
          else clearModel2();
      })
      // Single ES1 그리기
      d3.select("#model3").on("click",function() {
          if(this.checked) drawModel3();
          else clearModel3();
      })
      // Single ES2 그리기
      d3.select("#model4").on("click",function() {
          if(this.checked) drawModel4();
          else clearModel4();
      })
      // Single MM1 그리기
      d3.select("#model5").on("click",function() {
          if(this.checked) drawModel5();
          else clearModel5();
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
        for (i=1; i<=5; i++) {
          if (i==1) for (j=0; j<tobs; j++) tstat[j] = yhat1[j];
          else if (i==2) for (j=0; j<tobs; j++) tstat[j] = yhat2[j];
          else if (i==3) for (j=0; j<tobs; j++) tstat[j] = yhat3[j];
          else if (i==4) for (j=0; j<tobs; j++) tstat[j] = yhat4[j];
          else if (i==5) for (j=0; j<tobs; j++) tstat[j] = yhat5[j];
          if ( checkModel[i] ) smoothingTable(i, tobs, tstat); 
        }
      });

      // save Table
      d3.select("#saveTable").on("click", function() {
        head = '<html><head><meta charset="UTF-8"></head><body>';
        tail = '</body></html>';
        saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatULog.html");
      });

// Single MA1
function drawModel1(){
            model = 1;
            checkModel[model] = true;
            for (j=0; j<tobs; j++) yhat1[j] = NaN;
            ma1N = parseFloat(d3.select("#ma1N").node().value);
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
                yhat1[i] = MA[i-k1]
              }
            }
            else {
              k = Math.floor((ma1N)/2);
              k1 = k;
              k2 = tobs - k;
              for (i=k1; i<k2; i++) {
                yhat1[i] = 0.5*(MA[i-k1] + MA[i-k1+1]);
              }
            }
            strLabel = "reglabel"+model;
            strModel = svgStrU[124][langNum]+" (N="+ma1N+")"; // 중심이동평균
            showSmoothing(strModel, strLabel, tobs, k1, k2, xdata, yhat1);
}
// Draw time series smoothing on the plot
function showSmoothing(strModel, strLabel, nobs, ibegin, iend, xdata, yhat) {
    var ty = margin.top + model*20;;
    for (i=ibegin; i<iend; i++) {
          svg.append("circle").attr("class",strLabel)
             .attr("cx", margin.left+graphWidth*(xdata[i]-gxmin)/gxrange)
             .attr("cy", margin.top+graphHeight-graphHeight*(yhat[i]-gymin)/gyrange)         
             .attr("r", 3)
             .style("fill",myColor[model])
    }

    var x1  = margin.left + graphWidth*(xdata[ibegin]-gxmin)/gxrange;
    var y1  = margin.top  + graphHeight - graphHeight*(yhat[ibegin]-gymin)/gyrange;
    for (i=ibegin+1; i<iend; i++) {
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
// Single MA
function drawModel2(){
            model = 2;
            checkModel[model] = true;
            for (j=0; j<tobs; j++) yhat2[j] = NaN;
            ma2N = parseFloat(d3.select("#ma2N").node().value);
            for (i=0; i<tobs-ma2N+1; i++) {
              sum = 0;
              for (j=i; j<i+ma2N; j++) sum += ydata[j];
              MA[i] = sum / ma2N;
            }
            // N이 홀수 경우
            if (ma2N % 2 == 1) {
              k  = Math.floor((ma2N+1)/2);
              k1 = k-1;
              k2 = tobs - k1;
              for (i=k1; i<k2; i++) {
                yhat2[i] = MA[i-k1]
              }
            }
            else {
              k = Math.floor((ma2N)/2);
              k1 = k;
              k2 = tobs - k;
              for (i=k1; i<k2; i++) {
                yhat2[i] = 0.5*(MA[i-k1] + MA[i-k1+1]);
              }
            }
            strLabel = "reglabel"+model;
            strModel = svgStrU[124][langNum]+" (N="+ma2N+")"; //중심이동평균
            showSmoothing(strModel, strLabel, tobs, k1, k2, xdata, yhat2);
}
// Single ES1
function drawModel3() {
            model = 3;
            checkModel[model] = true;
            for (j=0; j<tobs; j++) yhat3[j] = NaN;
            es1Alpha = parseFloat(d3.select("#es1Alpha").node().value);
            S01 = parseFloat(d3.select("#S01").node().value);
            if ( isNaN(S01) ) {
              S01 = ydata[0];
              document.getElementById("S01").value = f2(S01);
            }
            S[0] = es1Alpha*ydata[0] + (1-es1Alpha)*S01;
            yhat3[0] = S[0];
            for (i=1; i<tobs; i++) {
              S[i] = es1Alpha*ydata[i] + (1-es1Alpha)*S[i-1];
              yhat3[i] = S[i];
            }
            strLabel = "reglabel"+model;
            strModel = svgStrU[125][langNum]+" (α="+es1Alpha+")"; //지수평활
            showSmoothing(strModel, strLabel, tobs, 0, tobs, xdata, yhat3);
}
// Single ES2
function drawModel4() {
            model = 4;
            checkModel[model] = true;
            for (j=0; j<tobs; j++) yhat4[j] = NaN;
            es2Alpha = parseFloat(d3.select("#es2Alpha").node().value);
            S02 = parseFloat(d3.select("#S02").node().value);
            if ( isNaN(S02) ) {
              S02 = ydata[0];
              document.getElementById("S02").value = f2(S02);
            }
            S[0] = es2Alpha*ydata[0] + (1-es2Alpha)*S02;
            yhat4[0] = S[0];
            for (i=1; i<tobs; i++) {
              S[i] = es2Alpha*ydata[i] + (1-es2Alpha)*S[i-1];
              yhat4[i] = S[i];
            }
            strLabel = "reglabel"+model;
            strModel = svgStrU[125][langNum]+" (α="+es2Alpha+")"; //지수평활
            showSmoothing(strModel, strLabel, tobs, 0, tobs, xdata, yhat4);
}
// Single Moving Median
function drawModel5(){
            model = 5;
            checkModel[model] = true;
            mm1N = parseFloat(d3.select("#mm1N").node().value);
            for (j=0; j<tobs; j++) yhat5[j] = NaN;
            for (i=0; i<tobs-mm1N+1; i++) {
              for (j=i; j<i+mm1N; j++) tempd[j-i] = ydata[j];
              // sorting
              for (j=0; j<mm1N-1; j++) {
                for (k=j+1; k<mm1N; k++) {
                  if (tempd[j] > tempd[k]) {
                    temp  = tempd[j];
                    tempd[j] = tempd[k];
                    tempd[k] = temp;
                  }
                }
              }
              // N이 홀수 경우
              if (mm1N % 2 == 1) {
                k = Math.floor((mm1N+1)/2);
                MM[i] = tempd[k-1];
              }
              else {
                k = Math.floor((mm1N)/2);
                MM[i] = 0.5*(tempd[k] + tempd[k+1]);
              }
            }
            // N이 홀수 경우
            if (mm1N % 2 == 1) {
              k  = Math.floor((mm1N+1)/2);
              k1 = k-1;
              k2 = tobs - k1;
              for (i=k1; i<k2; i++) {
                yhat5[i] = MM[i-k1]
              }
            }
            else {
              k = Math.floor((mm1N)/2);
              k1 = k;
              k2 = tobs - k;
              for (i=k1; i<k2; i++) {
                yhat5[i] = 0.5*(MM[i-k1] + MM[i-k1+1]);
              }
            }
            strLabel = "reglabel"+model;
            strModel = svgStrU[126][langNum]+" (N="+mm1N+")";  //중심이동중앙값
            showSmoothing(strModel, strLabel, tobs, k1, k2, xdata, yhat5);

}
function redrawModel1() {
  document.getElementById("model1").checked = true;
  clearModel1();
  drawModel1();
}
function redrawModel2() {
  document.getElementById("model2").checked = true;
  clearModel2();
  drawModel2();
}
function redrawModel3() {
  document.getElementById("model3").checked = true;
  clearModel3();
  drawModel3();
}
function redrawModel4() {
  document.getElementById("model4").checked = true;
  clearModel4();
  drawModel4();
}
function redrawModel5() {
  document.getElementById("model5").checked = true;
  clearModel5();
  drawModel5();
}
function clearModel1() {
     checkModel[1] = false;
     svg.selectAll("circle.reglabel1").remove();
     svg.selectAll("line.reglabel1").remove();
     svg.selectAll("text.reglabel1").remove();
}
function clearModel2() {
     checkModel[2] = false;
     svg.selectAll("circle.reglabel2").remove();
     svg.selectAll("line.reglabel2").remove();
     svg.selectAll("text.reglabel2").remove();
}
function clearModel3() {
     checkModel[3] = false;
     svg.selectAll("circle.reglabel3").remove();
     svg.selectAll("line.reglabel3").remove();
     svg.selectAll("text.reglabel3").remove();
}
function clearModel4() {
     checkModel[4] = false;
     svg.selectAll("circle.reglabel4").remove();
     svg.selectAll("line.reglabel4").remove();
     svg.selectAll("text.reglabel4").remove();
}
function clearModel5() {
     checkModel[5] = false;
     svg.selectAll("circle.reglabel5").remove();
     svg.selectAll("line.reglabel5").remove();
     svg.selectAll("text.reglabel5").remove();
}

function smoothingTable(model, nobs, yhat) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);
    var row, header;
    var i, j, k, strModel, temp;
    var ncol = 4;
    var cell = new Array(ncol);
    table.style.fontSize = "13px";
    switch (model) {
      case 1:
        strModel = "MA (N="+ma1N+")";
        break;
      case 2:
        strModel = "MA (N="+ma2N+")";
        break;
      case 3:
        strModel = "ES (α="+es1Alpha+")";
        break;
      case 4:
        strModel = "ES (α="+es2Alpha+")";
        break;
      case 5:
        strModel = "Median (N="+mm1N+")";
        break;
    }

    k = 0;
    row = table.insertRow(k++);
    row.style.height ="30px";
    for (j=0; j<ncol; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.textAlign = "center";
      cell[j].style.border = "1px solid black";
      cell[j].style.width ="100px";
    }
    cell[0].innerHTML = "<b>"+svgStrU[127][langNum]+"</b> "+model;
    cell[1].innerHTML = strModel;
    cell[0].style.width ="70px";

    row  = table.insertRow(k++);
    row.style.height ="25px";
    for (j=0; j<ncol; j++) {
      cell[j] = row.insertCell(j);
      cell[j].style.backgroundColor = "#eee";
      cell[j].style.textAlign = "center";
      cell[j].style.border = "1px solid black";
    }
    for (j=1; j<ncol; j++) {
      cell[j].style.width ="100px";
    }
    cell[0].innerHTML = "<b>t</b>";
    cell[1].innerHTML = "X(t)";
    cell[2].innerHTML = "Y(t)";
    cell[3].innerHTML = strModel;

    for (i=0; i<nobs; i++) {
       row = table.insertRow(k++);
       for (j=0; j<ncol; j++) {
              cell[j] = row.insertCell(j)          
              cell[j].style.textAlign = "center";
              cell[j].style.border = "1px solid black";
       }
       cell[0].innerHTML = i+1;
       cell[1].innerHTML = xdata[i];
       cell[2].innerHTML = f4(ydata[i]);
       cell[3].innerHTML = f4(yhat[i]);
       cell[0].style.backgroundColor = "#eee";
       cell[0].style.textAlign = "center";
    }
}

