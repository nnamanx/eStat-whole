      var svg     = d3.select("#chart"); 
      var i, r;
      var svgWidth    = 620;
      var svgHeight   = 400;
      var margin      = {top: 80, bottom: 50, left: 60, right: 60};
      var buffer      = 40;
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var checkTitle  = true;
      var mTitle, yTitle, xTitle;
      var tobs, temp, temp1, temp2, model, str;
      var sst, sse, mse, rmse, alpha, tvalue, info;
      var nforecast = 0;
      var xobs, xmin, xmax, xgap, gxmin, gxmax, gxrange;
      var yobs, ymin, ymax, ygap, gymin, gymax, gyrange;
      var x1, x2, y1, y2;
      var fontsize = "1em";
      var stat1     = new Array(30);
      var stat2     = new Array(30);
      var stat3     = new Array(30);
      var stat4     = new Array(30);
      var stat5     = new Array(30);
      var stat6     = new Array(30);
      var stat7     = new Array(30);
      var beta2     = new Array(30);
      var beta3     = new Array(30);
      var tstat     = new Array(30);
      var rowmax    = 200;
      var tdata     = new Array(rowmax);
      var xdata     = new Array(rowmax);
      var ydata     = new Array(rowmax);
      var yhat      = new Array(rowmax);
      var ylog      = new Array(rowmax);
      var clow1     = new Array(rowmax);
      var clow2     = new Array(rowmax);
      var clow3     = new Array(rowmax);
      var clow4     = new Array(rowmax);
      var clow5     = new Array(rowmax);
      var clow6     = new Array(rowmax);
      var clow7     = new Array(rowmax);
      var chigh1    = new Array(rowmax);
      var chigh2    = new Array(rowmax);
      var chigh3    = new Array(rowmax);
      var chigh4    = new Array(rowmax);
      var chigh5    = new Array(rowmax);
      var chigh6    = new Array(rowmax);
      var chigh7    = new Array(rowmax);
      var checkModel    = new Array(10);
      var nvar      = 10;
      var X         = new Array(nvar)
      var sumX      = new Array(nvar)
      var invXPX    = new Array(nvar);
      for (j = 0; j < nvar; j++) {
        invXPX[j] = new Array(nvar);
      }
      var checkForecast = false;
      for (i=1; i<=7; i++) checkModel[i] = false;
      xTitle = "t";
      document.getElementById("nn41").disabled      = true;    
      document.getElementById("rsquare1").disabled  = true;    
      document.getElementById("rsquare2").disabled  = true;    
      document.getElementById("rsquare3").disabled  = true;       
      document.getElementById("rsquare4").disabled  = true;       
      document.getElementById("rsquare5").disabled  = true;       
      document.getElementById("rsquare6").disabled  = true;       
      document.getElementById("rsquare7").disabled  = true;       
      document.getElementById("equation1").disabled = true;    
      document.getElementById("equation2").disabled = true;    
      document.getElementById("equation3").disabled = true;       
      document.getElementById("equation4").disabled = true;       
      document.getElementById("equation5").disabled = true;       
      document.getElementById("equation6").disabled = true;       
      document.getElementById("equation7").disabled = true;
      svg.selectAll("*").remove();
      alpha = 0.05;
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
        document.getElementById("rsquare1").value  = "";    
        document.getElementById("rsquare2").value  = "";    
        document.getElementById("rsquare3").value  = "";       
        document.getElementById("rsquare4").value  = "";       
        document.getElementById("rsquare5").value  = "";       
        document.getElementById("rsquare6").value  = "";       
        document.getElementById("rsquare7").value  = "";       
        document.getElementById("equation1").value = "";    
        document.getElementById("equation2").value = "";    
        document.getElementById("equation3").value = "";       
        document.getElementById("equation4").value = "";       
        document.getElementById("equation5").value = "";       
        document.getElementById("equation6").value = "";       
        document.getElementById("equation7").value = "";
        document.getElementById("model1").checked  = false;
        document.getElementById("model2").checked  = false;
        document.getElementById("model3").checked  = false;
        document.getElementById("model4").checked  = false;
        document.getElementById("model5").checked  = false;
        document.getElementById("model6").checked  = false;
        document.getElementById("model7").checked  = false;
      })
    
      d3.select("#execute").on("click", function(){  
          clearExecute();
          for (i = 0; i < yobs; i++) {
              tdata[i] = i + 1;   
              xdata[i] = tdata[i];
          }
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
          // 시계열그림
          nforecast = 0;
          model1Stat(tobs, tdata, tdata, ydata, stat1);
          sst = stat1[20];
          document.getElementById("nn41").value   = yobs;
          initialCordinate(tobs, xdata, ydata);    
          model = 1;
          showTimeSeriesPlot(model, tobs, nforecast, tdata, ydata, checkTitle);
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
          if ( checkModel[1] ) {
            for (j=0; j<30; j++) tstat[j] = stat1[j];
            forecastTable(1, tobs, nforecast, tstat, clow1, chigh1);  
          }
          if ( checkModel[2] ) {
            for (j=0; j<30; j++) tstat[j] = beta2[j];
            forecastTable(2, tobs, nforecast, tstat, clow2, chigh2);  
          }
          if ( checkModel[3] ) {
            for (j=0; j<30; j++) tstat[j] = beta3[j];
            forecastTable(3, tobs, nforecast, tstat, clow3, chigh3);  
          }
          if ( checkModel[4] ) {
            for (j=0; j<30; j++) tstat[j] = stat4[j];
            forecastTable(4, tobs, nforecast, tstat, clow4, chigh4);  
          }
          if ( checkModel[5] ) {
            for (j=0; j<30; j++) tstat[j] = stat5[j];
            forecastTable(5, tobs, nforecast, tstat, clow5, chigh5);  
          }
          if ( checkModel[6] ) {
            for (j=0; j<30; j++) tstat[j] = stat6[j];
            forecastTable(6, tobs, nforecast, tstat, clow6, chigh6);  
          }
          if ( checkModel[7] ) {
            for (j=0; j<30; j++) tstat[j] = stat7[j];
            forecastTable(7, tobs, nforecast, tstat, clow7, chigh7);            
          }
      });
      // save Table
      d3.select("#saveTable").on("click", function() {
        head = '<html><head><meta charset="UTF-8"></head><body>';
        tail = '</body></html>';
        saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatULog.html");
      });

      // 회귀선 그리기
      d3.select("#model1").on("click",function() {
          if(this.checked) {
            model = 1;
            checkModel[model] = true;
            drawModel1()
          } else {
	    removeRegression1();
          }
      })
      d3.select("#model2").on("click",function() {
          if(this.checked) {
            model = 2;
            checkModel[model] = true;
            drawModel2();
          } else {
	    removeRegression2();
          }
      })
      d3.select("#model3").on("click",function() {
          if(this.checked) {
            model = 3;
            checkModel[model] = true;
            drawModel3();
          } else {
	    removeRegression3();
          }
      })
      // Model4: y = a + b * sqrt(t) 
      d3.select("#model4").on("click",function() {
          if(this.checked) {
            model = 4;
            checkModel[model] = true;
            drawModel4();
          } else {
	    removeRegression4();
          }
      })
      // Model5: y = a + b * ln(t) 
      d3.select("#model5").on("click",function() {
          if(this.checked) {
            model = 5;
            checkModel[model] = true;
            drawModel5();
          } else {
	    removeRegression5();
          }
      })
      // Model6: y = a t^b  =>  ln(y) = ln(a) + b * ln(t) 
      d3.select("#model6").on("click",function() {
          if(this.checked) {
            model = 6;
            checkModel[model] = true;
            drawModel6();
          } else {
	    removeRegression6();
          }
      })
      // Model7: y = a e^(bt)  =>  ln(y) = ln(a) + b t 
      d3.select("#model7").on("click",function() {
          if(this.checked) {
            model = 7;
            checkModel[model] = true;
            drawModel7();
          } else {
	    removeRegression7();
          }
      })

function drawModel1() {
        for (i=0; i<tobs; i++) xdata[i] = tdata[i];  
        model1Stat(tobs, tdata, xdata, ydata, stat1);           
        for (i=tobs; i<tobs+nforecast; i++) tdata[i] = i+1;
        for (i=tobs; i<tobs+nforecast; i++) ydata[i] = stat1[7] + stat1[8]*tdata[i];
        showTimeSeriesPlot(model, tobs, nforecast, tdata, ydata, checkTitle);
        if (nforecast > 0) {
            // confidence interval
            temp1 = stat1[21];   // Sxx
            df = tobs - 2;
            tvalue = t_inv(1-alpha/2, df, info);
            for (i=tobs; i<tobs+nforecast; i++) {
               temp2 = tdata[i] - (tobs+1)/2;
               temp = tvalue * stat1[24] * Math.sqrt(1/tobs + temp2*temp2/temp1)
               clow1[i]  = ydata[i] - temp;
               chigh1[i] = ydata[i] + temp;
            }
        }
        showModel1(model, tobs, nforecast, stat1, clow1, chigh1, checkTitle);
        document.getElementById("rsquare1").value = "r\u00B2 = " + f4(stat1[10]);    
        document.getElementById("equation1").value = "y = ("+f4(stat1[7])+") + ("+f4(stat1[8])+")t";  
}
function drawModel2() {
            var nindep = 3;
            statRegression(nindep, tobs, ydata, beta2, stat2);
            beta2[10] = stat2[13];
            for (i=tobs; i<tobs+nforecast; i++) tdata[i] = i+1;
            for (i=tobs; i<tobs+nforecast; i++) ydata[i] = beta2[0] + beta2[1]*tdata[i] + beta2[2]*tdata[i]*tdata[i];
            showTimeSeriesPlot(model, tobs, nforecast, tdata, ydata, checkTitle);
        if (nforecast > 0) {
            // confidence interval
            df = tobs - 3;
            tvalue = t_inv(1-alpha/2, df, info);
            // x' (X'X)^-1 x
            for (i=tobs; i<tobs+nforecast; i++) {
              X[0] = 1;
              X[1] = tdata[i];
              X[2] = tdata[i]*tdata[i]; 
              for (j=0; j<nindep; j++) {
                sumX[j] = 0;
                for (k=0; k<nindep; k++) {
                  sumX[j] += X[k]*invXPX[k][j];
                }
              }
              temp = 0;
              for (j=0; j<nindep; j++) {
                temp += sumX[j]*X[j];
              }
              temp1 = tvalue * Math.sqrt(stat2[8]*temp);
              clow2[i]  = ydata[i] - temp1;
              chigh2[i] = ydata[i] + temp1;
            }
        }
        showModel2(model, tobs, nforecast, beta2, clow2, chigh2, checkTitle);
        document.getElementById("rsquare2").value = "r\u00B2 = " + f4(stat2[13]);    
        document.getElementById("equation2").value = "y = ("+f4(beta2[0])+") + ("+f4(beta2[1])+")t +("+f4(beta2[2])+")t\u00B2";  
}
function drawModel3() {
            var nindep = 4;
            statRegression(nindep, tobs, ydata, beta3, stat3);
            beta3[10] = stat3[13];
            for (i=tobs; i<tobs+nforecast; i++) tdata[i] = i+1;
            for (i=tobs; i<tobs+nforecast; i++) ydata[i] = beta3[0] + beta3[1]*tdata[i] + beta3[2]*tdata[i]*tdata[i] + beta3[3]*tdata[i]*tdata[i]*tdata[i];
            showTimeSeriesPlot(model, tobs, nforecast, tdata, ydata, checkTitle);
        if (nforecast > 0) {
            // confidence interval
            df = tobs - 4;
            tvalue = t_inv(1-alpha/2, df, info);
            // x' (X'X)^-1 x
            for (i=tobs; i<tobs+nforecast; i++) {
              X[0] = 1;
              X[1] = tdata[i];
              X[2] = tdata[i]*tdata[i]; 
              X[3] = X[2]*tdata[i];
              for (j=0; j<nindep; j++) {
                sumX[j] = 0;
                for (k=0; k<nindep; k++) {
                  sumX[j] += X[k]*invXPX[k][j];
                }
              }
              temp = 0;
              for (j=0; j<nindep; j++) {
                temp += sumX[j]*X[j];
              }
              temp1 = tvalue * Math.sqrt(stat3[8]*temp);
              clow3[i]  = ydata[i] - temp1;
              chigh3[i] = ydata[i] + temp1;
            }
        }
        showModel3(model, tobs, nforecast, beta3, clow3, chigh3, checkTitle);
        document.getElementById("rsquare3").value = "r\u00B2 = " + f4(stat3[13]);    
        document.getElementById("equation3").value = "y=("+f4(beta3[0])+")+("+f4(beta3[1])+")t+("+f4(beta3[2])+")t\u00B2+("+f4(beta3[3])+")t\u00B3";  
}
function drawModel4() {
        for (i=0; i<tobs; i++) xdata[i] = Math.sqrt(tdata[i])  
        model1Stat(tobs, tdata, xdata, ydata, stat4);
        for (i=tobs; i<tobs+nforecast; i++) tdata[i] = i+1;
        for (i=tobs; i<tobs+nforecast; i++) ydata[i] = stat4[7] + stat4[8]*Math.sqrt(tdata[i]);
        showTimeSeriesPlot(model, tobs, nforecast, tdata, ydata, checkTitle);
        if (nforecast > 0) {
            // confidence interval
            temp1 = stat4[21]; // Sxx
            df = tobs - 2;
            tvalue = t_inv(1-alpha/2, df, info);
            for (i=tobs; i<tobs+nforecast; i++) {
               temp2 = Math.sqrt(tdata[i]) - stat4[1];
               temp = tvalue * stat4[24] * Math.sqrt(1/tobs + temp2*temp2/temp1)
               clow4[i]  = ydata[i] - temp;
               chigh4[i] = ydata[i] + temp;
            }
        }
        showModel4(model, tobs, nforecast, stat4, clow4, chigh4, checkTitle);
        document.getElementById("rsquare4").value  = "r\u00B2 = " + f4(stat4[10]);    
        document.getElementById("equation4").value = "y = ("+f4(stat4[7])+") + ("+f4(stat4[8])+") √t";  
}
function drawModel5() {
        for (i=0; i<tobs; i++) xdata[i] = Math.log(tdata[i])  
        model1Stat(tobs, tdata, xdata, ydata, stat5);
        for (i=tobs; i<tobs+nforecast; i++) tdata[i] = i+1;
        for (i=tobs; i<tobs+nforecast; i++) ydata[i] = stat5[7] + stat5[8]*Math.log(tdata[i]);
        showTimeSeriesPlot(model, tobs, nforecast, tdata, ydata, checkTitle);
        if (nforecast > 0) {
            // confidence interval
            temp1 = stat5[21]; // Sxx
            df = tobs - 2;
            tvalue = t_inv(1-alpha/2, df, info);
            for (i=tobs; i<tobs+nforecast; i++) {
               temp2 = Math.log(tdata[i]) - stat5[1];
               temp = tvalue * stat5[24] * Math.sqrt(1/tobs + temp2*temp2/temp1)
               clow5[i]  = ydata[i] - temp;
               chigh5[i] = ydata[i] + temp;
            }
        }
        showModel5(model, tobs, nforecast, stat5, clow5, chigh5, checkTitle);
        document.getElementById("rsquare5").value  = "r\u00B2 = " + f4(stat5[10]);    
        document.getElementById("equation5").value = "y = ("+f4(stat5[7])+") + ("+f4(stat5[8])+") ln(t)"; 
}
function drawModel6() {
            for (i=0; i<tobs; i++) {
              xdata[i] = Math.log(tdata[i]);
              ylog[i]  = Math.log(ydata[i]);
            }
            model1Stat(tobs, tdata, xdata, ylog, stat6);
            sse = 0;
            for (i=0; i<tobs; i++) {
              temp = ydata[i] - Math.exp(stat6[7]) * Math.pow(tdata[i],stat6[8]);  
              sse += temp * temp;
            }
            stat6[10] = 1 - sse/sst;
            for (i=tobs; i<tobs+nforecast; i++) tdata[i] = i+1;
            for (i=tobs; i<tobs+nforecast; i++) ydata[i] = Math.exp(stat6[7]) * Math.pow(tdata[i],stat6[8]);
            showTimeSeriesPlot(model, tobs, nforecast, tdata, ydata, checkTitle);
        if (nforecast > 0) {
            // confidence interval
            temp1 = stat6[21]; // Sxx
            df = tobs - 2;
            tvalue = t_inv(1-alpha/2, df, info);
            for (i=tobs; i<tobs+nforecast; i++) {
               temp2 = Math.log(tdata[i]) - stat6[1];
               temp  = tvalue * stat6[24] * Math.sqrt(1/tobs + temp2*temp2/temp1)
               clow6[i]  = Math.exp( stat6[7] + stat6[8]*Math.log(tdata[i]) - temp );
               chigh6[i] = Math.exp( stat6[7] + stat6[8]*Math.log(tdata[i]) + temp );
            }
        }
        showModel6(model, tobs, nforecast, stat6, clow6, chigh6, checkTitle);
        document.getElementById("rsquare6").value  = "r\u00B2 = " + f4(stat6[10]);    
        document.getElementById("equation6").value = "y = ("+f4(Math.exp(stat6[7]))+") t ^ ("+f4(stat6[8])+")"; 
}
function drawModel7() {
            for (i=0; i<tobs; i++) {
              xdata[i] = tdata[i];  
              ylog[i]  = Math.log(ydata[i])  
            }
            model1Stat(tobs, tdata, xdata, ylog, stat7);
            sse = 0;
            for (i=0; i<tobs; i++) {
              temp = ydata[i] - Math.exp(stat7[7]) * Math.exp(stat7[8]*tdata[i]); 
              sse += temp * temp;
            }
            stat7[10] = 1 - sse/sst;
            for (i=tobs; i<tobs+nforecast; i++) tdata[i] = i+1;
            for (i=tobs; i<tobs+nforecast; i++) ydata[i] = Math.exp(stat7[7]) * Math.exp(stat7[8]*tdata[i]);
            showTimeSeriesPlot(model, tobs, nforecast, tdata, ydata, checkTitle);
        if (nforecast > 0) {
            // confidence interval
            temp1 = stat7[21]; // Sxx
            df = tobs - 2;
            tvalue = t_inv(1-alpha/2, df, info);
            for (i=tobs; i<tobs+nforecast; i++) {
               temp2 = tdata[i] - stat7[1];
               temp  = tvalue * stat7[24] * Math.sqrt(1/tobs + temp2*temp2/temp1)
               clow7[i]  = Math.exp( stat7[7] + stat7[8]*tdata[i] - temp );
               chigh7[i] = Math.exp( stat7[7] + stat7[8]*tdata[i] + temp );
            }
        }
        showModel7(model, tobs, nforecast, stat7, clow7, chigh7, checkTitle);
        document.getElementById("rsquare7").value  = "r\u00B2 = " + f4(stat7[10]);    
        document.getElementById("equation7").value = "y = ("+f4(Math.exp(stat7[7]))+") exp( "+f4(stat7[8])+" t )";    
}
// 회귀선 그리기 함수
function showModel1(model, tobs, nforecast, stat, clow, chigh, checkTitle) {
     var cx, cy, x1, y1, x2, y2;
     // confidence interval
     confidenceBand(model, tobs, nforecast, clow, chigh);
     // forecast
     for (i=tobs; i<tobs+nforecast; i++) {
          cx = margin.left+graphWidth*(tdata[i]-gxmin)/gxrange;
          cy = margin.top+graphHeight-graphHeight*(stat[7]+stat[8]*tdata[i]-gymin)/gyrange; 
          svg.append("circle").attr("class","reglabel1")
             .attr("cx", cx)
             .attr("cy", cy)         
             .attr("r", 3)
             .style("fill",myColor[1])
     }
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
function showModel2(model, tobs, nforecast, stat, clow, chigh, checkTitle) {
     var cx, cy;
     // confidence interval
     confidenceBand(model, tobs, nforecast, clow, chigh);
     for (i=tobs; i<tobs+nforecast; i++) {
          cx = margin.left+graphWidth*(tdata[i]-gxmin)/gxrange;
          cy = margin.top+graphHeight-graphHeight*(stat[0]+stat[1]*tdata[i]+ stat[2]*tdata[i]*tdata[i]-gymin)/gyrange; 
          svg.append("circle").attr("class","reglabel2")
             .attr("cx", cx)
             .attr("cy", cy)         
             .attr("r", 3)
             .style("fill",myColor[1])
     }
     var ninterval = 100;
     var gxgap     = (tobs + nforecast) / ninterval;
     var x1, y1, x2, y2, temp;
     x1  = margin.left + graphWidth*(1-gxmin)/gxrange;
     y1  = margin.top  + graphHeight - graphHeight*((stat[0]+stat[1]*1+ stat[2]*1*1 )-gymin)/gyrange;
     temp = 1;
     for (i = 1; i < ninterval-6; i++) {
          temp += gxgap;
          x2  = margin.left + graphWidth*(temp-gxmin)/gxrange;
          y2  = margin.top  + graphHeight - graphHeight*((stat[0]+stat[1]*temp+stat[2]*temp*temp)-gymin)/gyrange;
          svg.append("line").attr("class","reglabel2")
                .attr("x1",x1)
                .attr("y1",y1)
                .attr("x2",x2)
                .attr("y2",y2)
                .style("stroke",myColor[2]) 
          x1 = x2;
          y1 = y2;
     }
     if(checkTitle) {   
        svg.append("text").attr("class","reglabel2")
                .attr("x", margin.left + 20)
                .attr("y", margin.top +  40)
                .text("y = ("+f4(stat[0])+") + ("+ f4(stat[1])+ ")t +("+ f4(stat[2])+")t\u00B2 , " + " r\u00B2 = "+f4(stat[10]))
                .style("stroke",myColor[2]) 
     }
}
function showModel3(model, tobs, nforecast, stat, clow, chigh, checkTitle) {
     var cx, cy;
     // confidence interval
     confidenceBand(model, tobs, nforecast, clow, chigh);
     for (i=tobs; i<tobs+nforecast; i++) {
          cx = margin.left+graphWidth*(tdata[i]-gxmin)/gxrange;
          cy = margin.top+graphHeight-graphHeight*(stat[0]+stat[1]*tdata[i]+ stat[2]*tdata[i]*tdata[i] + stat[3]*tdata[i]*tdata[i]*tdata[i] -gymin)/gyrange; 
          svg.append("circle").attr("class","reglabel3")
             .attr("cx", cx)
             .attr("cy", cy)         
             .attr("r", 3)
             .style("fill",myColor[1])
     }
     var ninterval = 100;
     var gxgap     = gxrange / ninterval;
     var x1, y1, x2, y2, temp;
     x1  = margin.left + graphWidth*(1-gxmin)/gxrange;
     y1  = margin.top  + graphHeight - graphHeight*((stat[0]+stat[1]*1+ stat[2]*1*1 + stat[3] )-gymin)/gyrange;
     for (i = 1; i < ninterval-6; i++) {
          temp = 1+i*gxgap;
          x2  = margin.left + graphWidth*(temp-gxmin)/gxrange;
          y2  = margin.top  + graphHeight - graphHeight*((stat[0]+stat[1]*temp+stat[2]*temp*temp+stat[3]*temp*temp*temp)-gymin)/gyrange;
          svg.append("line").attr("class","reglabel3")
                .attr("x1",x1)
                .attr("y1",y1)
                .attr("x2",x2)
                .attr("y2",y2)
                .style("stroke",myColor[3]) 
          x1 = x2;
          y1 = y2;
     }
     if(checkTitle) {   
        svg.append("text").attr("class","reglabel3")
                .attr("x", margin.left + 20)
                .attr("y", margin.top +  60)
                .text("y = ("+f4(stat[0])+") + ("+ f4(stat[1])+ ")t +("+ f4(stat[2])+")t\u00B2 "+f4(stat[3])+")t\u00B3 , " + " r\u00B2 = "+f4(stat[10]))
                .style("stroke",myColor[3]) 
     }
}
function showModel4(model, tobs, nforecast, stat, clow, chigh, checkTitle){
     var cx, cy;
     // confidence interval
     confidenceBand(model, tobs, nforecast, clow, chigh);
     // forecast value
     for (i=tobs; i<tobs+nforecast; i++) {
          cx = margin.left+graphWidth*(tdata[i]-gxmin)/gxrange;
          cy = margin.top+graphHeight-graphHeight*(stat[7]+stat[8]*Math.sqrt(tdata[i])-gymin)/gyrange; 
          svg.append("circle").attr("class","reglabel4")
             .attr("cx", cx)
             .attr("cy", cy)         
             .attr("r", 3)
             .style("fill",myColor[1])
     }
     var ninterval = 100;
     var gxgap     = gxrange / ninterval;
     var x1, y1, x2, y2;
     x1  = margin.left + graphWidth*(stat[3]-gxmin)/gxrange;
     y1  = margin.top  + graphHeight - graphHeight*((stat[7]+stat[8]*Math.sqrt(stat[3]))-gymin)/gyrange;
     for (i = 1; i < ninterval-6; i++) {
          x2  = margin.left + graphWidth*(stat[3]+i*gxgap-gxmin)/gxrange;
          y2  = margin.top  + graphHeight - graphHeight*((stat[7]+stat[8]*Math.sqrt(stat[3]+i*gxgap))-gymin)/gyrange;
          svg.append("line").attr("class","reglabel4")
                .attr("x1",x1)
                .attr("y1",y1)
                .attr("x2",x2)
                .attr("y2",y2)
                .style("stroke",myColor[4]) 
          x1 = x2;
          y1 = y2;
     }
     if(checkTitle) {   
        svg.append("text").attr("class","reglabel4")
                .attr("x", margin.left + 20)
                .attr("y", margin.top +  80)
                .text("y = ("+f4(stat[7])+") + ("+ f4(stat[8])+ ") √ t , " + " r\u00B2 = "+f4(stat[10]))
                .style("stroke",myColor[4]) 
     }
}
function showModel5(model, tobs, nforecast, stat, clow, chigh, checkTitle) {
     var cx, cy;
     // confidence interval
     confidenceBand(model, tobs, nforecast, clow, chigh);
     for (i=tobs; i<tobs+nforecast; i++) {
          cx = margin.left+graphWidth*(tdata[i]-gxmin)/gxrange;
          cy = margin.top+graphHeight-graphHeight*(stat[7]+stat[8]*Math.log(tdata[i])-gymin)/gyrange; 
          svg.append("circle").attr("class","reglabel5")
             .attr("cx", cx)
             .attr("cy", cy)         
             .attr("r", 3)
             .style("fill",myColor[1])
     }
     var ninterval = 100;
     var gxgap     = gxrange / ninterval;
     var x1, y1, x2, y2;
     x1  = margin.left + graphWidth*(stat[3]-gxmin)/gxrange;
     y1  = margin.top  + graphHeight - graphHeight*((stat[7]+stat[8]*Math.log(stat[3]))-gymin)/gyrange;
     for (i = 1; i < ninterval-6; i++) {
          x2  = margin.left + graphWidth*(stat[3]+i*gxgap-gxmin)/gxrange;
          y2  = margin.top  + graphHeight - graphHeight*((stat[7]+stat[8]*Math.log(stat[3]+i*gxgap))-gymin)/gyrange;
          svg.append("line").attr("class","reglabel5")
                .attr("x1",x1)
                .attr("y1",y1)
                .attr("x2",x2)
                .attr("y2",y2)
                .style("stroke",myColor[5]) 
          x1 = x2;
          y1 = y2;
     }
     if(checkTitle) {   
        svg.append("text").attr("class","reglabel5")
                .attr("x", margin.left + 20)
                .attr("y", margin.top +  100)
                .text("y = ("+f4(stat[7])+") + ("+ f4(stat[8])+ ") log(t) , " + " r\u00B2 = "+f4(stat[10]))
                .style("stroke",myColor[5]) 
     }
}
function showModel6(model, tobs, nforecast, stat, clow, chigh, checkTitle) {
     var cx, cy;
     // confidence interval
     confidenceBand(model, tobs, nforecast, clow, chigh);
     for (i=tobs; i<tobs+nforecast; i++) {
          cx = margin.left+graphWidth*(tdata[i]-gxmin)/gxrange;
          cy = margin.top+graphHeight-graphHeight*(Math.exp(stat[7])*Math.pow(tdata[i],stat[8])-gymin)/gyrange; 
          svg.append("circle").attr("class","reglabel6")
             .attr("cx", cx)
             .attr("cy", cy)         
             .attr("r", 3)
             .style("fill",myColor[1])
     }
     var ninterval = 100;
     var gxgap     = gxrange / ninterval;
     var x1, y1, x2, y2;
     x1  = margin.left + graphWidth*(stat[3]-gxmin)/gxrange;
     y1  = margin.top  + graphHeight - graphHeight*(Math.exp(stat[7])*Math.pow(stat[3],stat[8])-gymin)/gyrange;
     for (i = 1; i < ninterval-6; i++) {
          x2  = margin.left + graphWidth*(stat[3]+i*gxgap-gxmin)/gxrange;
          y2  = margin.top  + graphHeight - graphHeight*(Math.exp(stat[7])*Math.pow(stat[3]+i*gxgap,stat[8])-gymin)/gyrange;
          svg.append("line").attr("class","reglabel6")
                .attr("x1",x1)
                .attr("y1",y1)
                .attr("x2",x2)
                .attr("y2",y2)
                .style("stroke",myColor[6]) 
          x1 = x2;
          y1 = y2;
     }
     if(checkTitle) {   
        svg.append("text").attr("class","reglabel6")
                .attr("x", margin.left + 20)
                .attr("y", margin.top +  120)
                .text("y = ("+f4(Math.exp(stat[7]))+") * t ^("+ f4(stat[8])+ ") , " + " r\u00B2 = "+f4(stat[10]))
                .style("stroke",myColor[6]) 
     }
}

function showModel7(model, tobs, nforecast, stat, clow, chigh, checkTitle) {
     var cx, cy;
     // confidence interval
     confidenceBand(model, tobs, nforecast, clow, chigh);
     for (i=tobs; i<tobs+nforecast; i++) {
          cx = margin.left+graphWidth*(tdata[i]-gxmin)/gxrange;
          cy = margin.top+graphHeight-graphHeight*(Math.exp(stat[7])*Math.exp(stat[8]*tdata[i])-gymin)/gyrange; 
          svg.append("circle").attr("class","reglabel7")
             .attr("cx", cx)
             .attr("cy", cy)         
             .attr("r", 3)
             .style("fill",myColor[1])
     }
     var ninterval = 100;
     var gxgap     = gxrange / ninterval;
     var x1, y1, x2, y2;
     x1  = margin.left + graphWidth*(stat[3]-gxmin)/gxrange;
     y1  = margin.top  + graphHeight - graphHeight*(Math.exp(stat[7])*Math.exp(stat[8]*(stat[3]))-gymin)/gyrange;
     for (i = 1; i < ninterval-6; i++) {
          x2  = margin.left + graphWidth*(stat[3]+i*gxgap-gxmin)/gxrange;
          y2  = margin.top  + graphHeight - graphHeight*(Math.exp(stat[7])*Math.exp(stat[8]*(stat[3]+i*gxgap))-gymin)/gyrange;
          svg.append("line").attr("class","reglabel7")
                .attr("x1",x1)
                .attr("y1",y1)
                .attr("x2",x2)
                .attr("y2",y2)
                .style("stroke",myColor[7]) 
          x1 = x2;
          y1 = y2;
     }
     if(checkTitle) {   
        svg.append("text").attr("class","reglabel7")
                .attr("x", margin.left + 20)
                .attr("y", margin.top +  140)
                .text("y = ("+f4(Math.exp(stat[7]))+") + * exp("+ f4(stat[8])+ " t ), " + " r\u00B2 = "+f4(stat[10]))
                .style("stroke",myColor[7]) 
     }
}
// Remove Regression Line of Simulation
function clearExecute() {
     svg.selectAll("*").remove();
     document.getElementById("model1").checked=false;
     document.getElementById("model2").checked=false;
     document.getElementById("model3").checked=false;
     document.getElementById("model4").checked=false;
     document.getElementById("model5").checked=false;
     document.getElementById("model6").checked=false;
     document.getElementById("model7").checked=false;
     for (i=1; i<=7; i++) checkModel[i] = false;
     document.getElementById("nn42").value = 0;
     removeRegression1();
     removeRegression2();
     removeRegression3();
     removeRegression4();
     removeRegression5();
     removeRegression6();
     removeRegression7();
}
function clearScreen(){
     svg.selectAll("*").remove();
     nforecast = parseFloat(d3.select("#nn42").node().value);

     for (i=0; i<tobs; i++) xdata[i] = tdata[i];  
     model1Stat(tobs, tdata, xdata, ydata, stat1);
     for (i=tobs; i<tobs+nforecast; i++) {
       tdata[i] = i+1;
       xdata[i] = tdata[i];
       ydata[i] = stat1[7] + stat1[8]*tdata[i];
     }
     initialCordinate(tobs+nforecast, tdata, ydata);
     model = 1;
     showTimeSeriesPlot(model, tobs, nforecast, tdata, ydata, checkTitle);
     if ( checkModel[1] ) drawModel1(stat1, checkTitle);
     if ( checkModel[2] ) drawModel2(stat1, checkTitle);
     if ( checkModel[3] ) drawModel3(stat1, checkTitle);
     if ( checkModel[4] ) drawModel4(stat1, checkTitle);
     if ( checkModel[5] ) drawModel5(stat1, checkTitle);
     if ( checkModel[6] ) drawModel6(stat1, checkTitle);
     if ( checkModel[7] ) drawModel7(stat1, checkTitle);
}

function removeRegression1() {
     checkModel[1] = false;
     document.getElementById("rsquare1").value  = "";    
     document.getElementById("equation1").value = "";    
     svg.selectAll("circle.reglabel1").remove();
     svg.selectAll("line.reglabel1").remove();
     svg.selectAll("text.reglabel1").remove();
     svg.selectAll("path.reglabel1").remove();
     svg.selectAll("circle.forecast1").remove();
}
function removeRegression2() {
     checkModel[2] = false;
     document.getElementById("rsquare2").value  = "";    
     document.getElementById("equation2").value = "";    
     svg.selectAll("circle.reglabel2").remove();
     svg.selectAll("line.reglabel2").remove();
     svg.selectAll("text.reglabel2").remove();
     svg.selectAll("path.reglabel2").remove();
     svg.selectAll("circle.forecast2").remove();
}
function removeRegression3() {
     checkModel[3] = false;
     document.getElementById("rsquare3").value  = "";    
     document.getElementById("equation3").value = "";    
     svg.selectAll("circle.reglabel3").remove();
     svg.selectAll("line.reglabel3").remove();
     svg.selectAll("text.reglabel3").remove();
     svg.selectAll("path.reglabel3").remove();
     svg.selectAll("circle.forecast3").remove();
}
function removeRegression4() {
     checkModel[4] = false;
     document.getElementById("rsquare4").value  = "";    
     document.getElementById("equation4").value = "";    
     svg.selectAll("circle.reglabel4").remove();
     svg.selectAll("line.reglabel4").remove();
     svg.selectAll("text.reglabel4").remove();
     svg.selectAll("path.reglabel4").remove();
     svg.selectAll("circle.forecast4").remove();
}
function removeRegression5() {
     checkModel[5] = false;
     document.getElementById("rsquare5").value  = "";    
     document.getElementById("equation5").value = "";    
     svg.selectAll("circle.reglabel5").remove();
     svg.selectAll("line.reglabel5").remove();
     svg.selectAll("text.reglabel5").remove();
     svg.selectAll("path.reglabel5").remove();
     svg.selectAll("circle.forecast5").remove();
}
function removeRegression6() {
     checkModel[6] = false;
     document.getElementById("rsquare6").value  = "";    
     document.getElementById("equation6").value = "";    
     svg.selectAll("circle.reglabel6").remove();
     svg.selectAll("line.reglabel6").remove();
     svg.selectAll("text.reglabel6").remove();
     svg.selectAll("path.reglabel6").remove();
     svg.selectAll("circle.forecast6").remove();
}
function removeRegression7() {
     checkModel[7] = false;
     document.getElementById("rsquare7").value  = "";    
     document.getElementById("equation7").value = "";    
     svg.selectAll("circle.reglabel7").remove();
     svg.selectAll("line.reglabel7").remove();
     svg.selectAll("text.reglabel7").remove();
     svg.selectAll("path.reglabel7").remove();
     svg.selectAll("circle.forecast7").remove();
}
function forecastTable(model, nobs, nforecast, stat, clow, chigh) {
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
        strModel = "y = "+f4(stat[7])+" + "+f4(stat[8])+" t";
        break;
      case 2:
        strModel = "y = "+f4(stat[0])+" + "+f4(stat[1])+" t +"+f4(stat[2])+" t\u00B2";
        break;
      case 3:
        strModel = "y = "+f4(stat[0])+" + "+f4(stat[1])+" t +"+f4(stat[2])+" t\u00B2"+f4(stat[3])+" t\u00B3";
        break;
      case 4:
        strModel = "y = "+f4(stat[7])+" + "+f4(stat[8])+" √t";
        break;
      case 5:
        strModel = "y = "+f4(stat[7])+" + "+f4(stat[8])+" ln(t)";
        break;
      case 6:
        strModel = "y = "+f4(stat[7])+" t^("+f4(stat[8])+")";
        break;
      case 7:
        strModel = "y = "+f4(stat[7])+" exp("+f4(stat[8])+" t)";
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

    for (i=nobs+1; i<=nobs+nforecast; i++) {
       row = table.insertRow(k++);
       for (j=0; j<ncol; j++) {
              cell[j] = row.insertCell(j)          
              cell[j].style.textAlign = "center";
              cell[j].style.border = "1px solid black";
       }
       cell[0].innerHTML = i;
       switch (model) {
         case 1:
           temp = stat[7] + stat[8]*i;
           break;
         case 2:
           temp = stat[0] + stat[1]*i + stat[2]*i*i; 
           break;
         case 3:
           temp = stat[0] + stat[1]*i + stat[2]*i*i + stat[3]*i*i*i; 
           break;
         case 4:
           temp = stat[7] + stat[8]*Math.sqrt(i);
           break;
         case 5:
           temp = stat[7] + stat[8]*Math.log(i);
           break;
         case 6:
           temp = Math.exp(stat[7]) * Math.pow(i, stat[8]);
           break;
         case 7:
           temp = Math.exp(stat[7]) * Math.exp(stat[8]*i);
           break;
       }
       cell[1].innerHTML = f4(temp);
       cell[2].innerHTML = "( "+f4(clow[i-1])+ " , "+f4(chigh[i-1])+ ")";
       cell[0].style.backgroundColor = "#eee";
       cell[0].style.textAlign = "center";
    }
}

// Multiple Linear Regression for polynomial
function statRegression(numVar, prow, ydata, Beta, statF) {
    var i, j, k, nAug;
    var temp, tempx, tempy, sum;
    var SSR, SSE, SST, MSE, info, multpleR, stdErr;
    var avgY, avgYhat, avgResid, SSYH;
    var nAug = 2 * numVar;
    var X = new Array(prow); // 2차원 행렬
    var Y = new Array(prow);
    var yhat        = new Array(prow);
    var residual    = new Array(prow);
    var stdResidual = new Array(prow);
    var Hii         = new Array(prow);
    var Cook        = new Array(prow);
    var T    = new Array(numVar);
//    var Beta = new Array(numVar);
    var Cii  = new Array(numVar);
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
    for (i = 0; i < prow; i++) {
        Y[i] = ydata[i];
        X[i][0] = 1;
        for (j = 1; j < numVar; j++) {
            X[i][j] = Math.pow(i+1,j);
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
//    statF[10] = 1 - f_cdf(statF[9], statF[4], statF[5], info);
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

